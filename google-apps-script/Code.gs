/**
 * GOOGLE APPS SCRIPT WEB APP - SV DIGITAL STUDIO
 * Backend & Google Sheets Data Storage Layer
 * 
 * Target Google Sheets:
 * 1. Sheet: "Contact / Project Requests"
 *    Columns: Timestamp | Name | Company | Email | Phone | Service | Project Description | Budget | Timeline | Status
 * 
 * 2. Sheet: "Contact Messages"
 *    Columns: Timestamp | Name | Email | Phone | Message | Status
 * 
 * Notification Recipient: svdigitalstudio@gmail.com (with backup cc)
 */

// Configuration
var NOTIFICATION_EMAIL = 'svdigitalstudio@gmail.com';
var BACKUP_NOTIFICATION_EMAIL = 'svdigitalstudio19@gmail.com';

var SHEET_NAMES = {
  PROJECT_REQUESTS: 'Contact / Project Requests',
  CONTACT_MESSAGES: 'Contact Messages'
};

var HEADERS = {
  SHEET1_15_COLUMNS: [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'Company / University',
    'Type of Project',
    'Project Title',
    'Project Description',
    'Budget Range',
    'Expected Start Date',
    'Preferred Working Mode',
    'Reference / Similar Project',
    'Additional Notes',
    'Permission',
    'Status'
  ],
  PROJECT_REQUESTS: [
    'Timestamp',
    'Name',
    'Company',
    'Email',
    'Phone',
    'Service',
    'Project Description',
    'Budget',
    'Timeline',
    'Status'
  ],
  CONTACT_MESSAGES: [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Message',
    'Status'
  ]
};

/**
 * Helper: Obtain the target Google Spreadsheet.
 * If bound to a container, uses getActiveSpreadsheet().
 * Otherwise, retrieves from Script Properties or creates a dedicated one.
 */
function getSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {
    // Standalone script
  }

  var scriptProps = PropertiesService.getScriptProperties();
  var sheetId = scriptProps.getProperty('SPREADSHEET_ID');

  if (sheetId) {
    return SpreadsheetApp.openById(sheetId);
  }

  // Create a new spreadsheet if not configured
  var newSheet = SpreadsheetApp.create('SV Digital Studio - Form Responses');
  scriptProps.setProperty('SPREADSHEET_ID', newSheet.getId());
  setupSheets(newSheet);
  return newSheet;
}

/**
 * Initializes and styles the two sheets with their specified header schemas.
 */
function setupSheets(ss) {
  if (!ss) ss = getSpreadsheet();

  // 1. Setup "Contact / Project Requests"
  var projectSheet = ss.getSheetByName(SHEET_NAMES.PROJECT_REQUESTS);
  if (!projectSheet) {
    projectSheet = ss.insertSheet(SHEET_NAMES.PROJECT_REQUESTS);
    projectSheet.appendRow(HEADERS.PROJECT_REQUESTS);
    projectSheet.getRange(1, 1, 1, HEADERS.PROJECT_REQUESTS.length)
      .setFontWeight('bold')
      .setBackground('#7c3aed')
      .setFontColor('#ffffff');
    projectSheet.setFrozenRows(1);
  }

  // 2. Setup "Contact Messages"
  var messageSheet = ss.getSheetByName(SHEET_NAMES.CONTACT_MESSAGES);
  if (!messageSheet) {
    messageSheet = ss.insertSheet(SHEET_NAMES.CONTACT_MESSAGES);
    messageSheet.appendRow(HEADERS.CONTACT_MESSAGES);
    messageSheet.getRange(1, 1, 1, HEADERS.CONTACT_MESSAGES.length)
      .setFontWeight('bold')
      .setBackground('#1e1b4b')
      .setFontColor('#ffffff');
    messageSheet.setFrozenRows(1);
  }

  // Remove default "Sheet1" if empty
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }
}

/**
 * Helper to build standard JSON response with CORS headers
 */
function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * HTTP GET Endpoint
 * Used for health checks, connection verification, and pinging the API.
 */
function doGet(e) {
  return createJsonResponse({
    status: 'success',
    service: 'SV Digital Studio Apps Script Web App',
    message: 'Backend is active and connected to Google Sheets.',
    timestamp: new Date().toISOString(),
    sheets: [SHEET_NAMES.PROJECT_REQUESTS, SHEET_NAMES.CONTACT_MESSAGES]
  });
}

/**
 * HTTP POST Endpoint
 * Accepts form submissions from the website and saves them directly to Google Sheets.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 30 seconds for concurrent submissions
    lock.waitLock(30000);

    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback for form-encoded data
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var action = data.action || data.type || (data.message && !data.projectDescription ? 'contact_message' : 'project_request');

    var ss = getSpreadsheet();
    setupSheets(ss);

    if (action === 'contact_message') {
      return handleContactMessage(ss, data);
    } else {
      return handleProjectRequest(ss, data);
    }

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createJsonResponse({
      success: false,
      error: error.toString(),
      message: 'Failed to record submission into Google Sheets.'
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (e) {}
  }
}

/**
 * Handles Project Requests (Start Project / Google Project Form)
 * Stores data into "Contact / Project Requests"
 */
function handleProjectRequest(ss, data) {
  // Check for Sheet1 first, or Contact / Project Requests, or active first sheet
  var sheet = ss.getSheetByName('Sheet1') || ss.getSheetByName(SHEET_NAMES.PROJECT_REQUESTS) || ss.getSheets()[0];
  if (!sheet) {
    sheet = ss.insertSheet('Sheet1');
  }

  var existingHeaders = [];
  if (sheet.getLastRow() > 0) {
    try {
      existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    } catch (e) {
      existingHeaders = [];
    }
  }

  // If new sheet or row 1 is empty, append headers (default to 15 columns for Sheet1)
  if (sheet.getLastRow() === 0) {
    var headersToUse = (sheet.getName() === 'Sheet1') ? HEADERS.SHEET1_15_COLUMNS : HEADERS.PROJECT_REQUESTS;
    sheet.appendRow(headersToUse);
    sheet.getRange(1, 1, 1, headersToUse.length)
      .setFontWeight('bold')
      .setBackground('#7c3aed')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    existingHeaders = headersToUse;
  }

  // Validate required fields
  var name = (data.name || data.fullName || '').trim();
  var email = (data.email || '').trim();
  var phone = (data.phone || '').trim();
  var company = (data.company || data.university || data.companyOrUniversity || 'N/A').trim();
  var service = (data.service || data.projectType || data.typeOfProject || 'General Inquiries').trim();
  var projectDescription = (data.projectDescription || data.description || data.message || '').trim();
  var budget = (data.budget || data.budgetRange || 'Not specified').trim();
  var timeline = (data.timeline || data.expectedDeliveryDate || data.expectedStartDate || 'Flexible').trim();
  var projectTitle = (data.projectTitle || data.title || (service + ' Project')).trim();
  var expectedStartDate = (data.expectedStartDate || data.expectedDeliveryDate || timeline).trim();
  var preferredWorkingMode = (data.preferredWorkingMode || data.preferredContactMethod || 'WhatsApp').trim();
  var referenceSimilarProject = (data.referenceSimilarProject || data.referenceLinks || 'None').trim();
  var additionalNotes = (data.additionalNotes || 'None').trim();
  var permission = (data.permission || 'Granted').trim();
  var status = (data.status || 'New').trim();

  if (!name || !email || !phone) {
    return createJsonResponse({
      success: false,
      error: 'Missing required fields: name, email, and phone are mandatory.'
    });
  }

  var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'GMT', 'yyyy-MM-dd HH:mm:ss');
  var referenceId = data.id || 'REQ-' + new Date().getTime();

  // Determine if target sheet uses the 15-column schema (Sheet1 format)
  var is15Col = false;
  for (var h = 0; h < existingHeaders.length; h++) {
    var hdr = String(existingHeaders[h]).toLowerCase();
    if (hdr.indexOf('type of project') !== -1 || hdr.indexOf('full name') !== -1) {
      is15Col = true;
      break;
    }
  }
  if (!is15Col && (sheet.getName() === 'Sheet1' || existingHeaders.length === 15)) {
    is15Col = true;
  }

  var row;
  if (is15Col) {
    // Exact 15 columns: Timestamp | Full Name | Email | Phone | Company / University | Type of Project | Project Title | Project Description | Budget Range | Expected Start Date | Preferred Working Mode | Reference / Similar Project | Additional Notes | Permission | Status
    row = [
      timestamp,
      name,
      email,
      phone,
      company,
      service,
      projectTitle,
      projectDescription,
      budget,
      expectedStartDate,
      preferredWorkingMode,
      referenceSimilarProject,
      additionalNotes,
      permission,
      status
    ];
  } else {
    // 10 columns: Timestamp | Name | Company | Email | Phone | Service | Project Description | Budget | Timeline | Status
    row = [
      timestamp,
      name,
      company,
      email,
      phone,
      service,
      projectDescription,
      budget,
      timeline,
      status
    ];
  }

  sheet.appendRow(row);

  // Send Email Notification to svdigitalstudio@gmail.com
  sendProjectRequestEmail({
    id: referenceId,
    timestamp: timestamp,
    name: name,
    company: company,
    email: email,
    phone: phone,
    service: service,
    projectDescription: projectDescription,
    budget: budget,
    timeline: timeline,
    additionalNotes: data.additionalNotes || 'None'
  });

  return createJsonResponse({
    success: true,
    message: 'Project request successfully recorded in Google Sheets.',
    sheet: SHEET_NAMES.PROJECT_REQUESTS,
    referenceId: referenceId,
    timestamp: timestamp
  });
}

/**
 * Handles General Contact Messages
 * Stores data into "Contact Messages"
 */
function handleContactMessage(ss, data) {
  var sheet = ss.getSheetByName(SHEET_NAMES.CONTACT_MESSAGES);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.CONTACT_MESSAGES);
    sheet.appendRow(HEADERS.CONTACT_MESSAGES);
  }

  var name = (data.name || data.fullName || '').trim();
  var email = (data.email || '').trim();
  var phone = (data.phone || 'N/A').trim();
  var message = (data.message || data.projectDescription || '').trim();
  var status = (data.status || 'New').trim();

  if (!name || (!email && !phone) || !message) {
    return createJsonResponse({
      success: false,
      error: 'Missing required fields: name, email/phone, and message are required.'
    });
  }

  var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'GMT', 'yyyy-MM-dd HH:mm:ss');

  // Columns: Timestamp | Name | Email | Phone | Message | Status
  var row = [
    timestamp,
    name,
    email,
    phone,
    message,
    status
  ];

  sheet.appendRow(row);

  // Send Email Notification to svdigitalstudio@gmail.com
  sendContactMessageEmail({
    timestamp: timestamp,
    name: name,
    email: email,
    phone: phone,
    message: message
  });

  return createJsonResponse({
    success: true,
    message: 'Contact message successfully recorded in Google Sheets.',
    sheet: SHEET_NAMES.CONTACT_MESSAGES,
    timestamp: timestamp
  });
}

/**
 * Sends formatted email notification for Project Requests to svdigitalstudio@gmail.com
 */
function sendProjectRequestEmail(details) {
  try {
    var subject = '🔔 New Project Request – SV Digital Studio';
    
    var plainBody = 
      '🔔 NEW PROJECT REQUEST – SV DIGITAL STUDIO\n' +
      '==================================================\n\n' +
      'CLIENT & PROJECT SUMMARY:\n' +
      '• Name:         ' + details.name + '\n' +
      '• Email:        ' + details.email + '\n' +
      '• Phone:        ' + details.phone + '\n' +
      '• Company:      ' + details.company + '\n' +
      '• Service:      ' + details.service + '\n' +
      '• Budget:       ' + details.budget + '\n' +
      '• Timeline:     ' + details.timeline + '\n\n' +
      'PROJECT DESCRIPTION:\n' +
      '--------------------------------------------------\n' +
      details.projectDescription + '\n\n' +
      'SUBMISSION DETAILS:\n' +
      '• Reference ID: ' + details.id + '\n' +
      '• Timestamp:    ' + details.timestamp + '\n' +
      '• Stored in:    Google Sheets ("' + SHEET_NAMES.PROJECT_REQUESTS + '")\n\n' +
      '==================================================\n' +
      'SV Digital Studio • Design • Innovate • Elevate';

    var htmlBody = 
      '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b;">' +
      '  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">' +
      '    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%); padding: 32px 24px; text-align: center; color: #ffffff;">' +
      '      <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">🔔 New Project Request</span>' +
      '      <h2 style="margin: 0; font-size: 24px; font-weight: 800;">SV Digital Studio</h2>' +
      '      <p style="margin: 6px 0 0; color: #c7d2fe; font-size: 12px;">Saved to Google Sheets • Contact / Project Requests</p>' +
      '    </div>' +
      '    <div style="padding: 24px;">' +
      '      <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 16px; margin-bottom: 20px;">' +
      '        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">' +
      '          <tr><td style="padding: 6px 0; color: #6b21a8; font-weight: bold; width: 32%;">Name:</td><td style="font-weight: 700; color: #1e1b4b;">' + details.name + '</td></tr>' +
      '          <tr><td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Email:</td><td><a href="mailto:' + details.email + '" style="color: #4338ca;">' + details.email + '</a></td></tr>' +
      '          <tr><td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Phone:</td><td><a href="tel:' + details.phone + '" style="color: #4338ca;">' + details.phone + '</a></td></tr>' +
      '          <tr><td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Company:</td><td>' + details.company + '</td></tr>' +
      '          <tr><td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Service:</td><td><strong style="color: #4338ca;">' + details.service + '</strong></td></tr>' +
      '          <tr><td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Budget:</td><td>' + details.budget + '</td></tr>' +
      '          <tr><td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Timeline:</td><td>' + details.timeline + '</td></tr>' +
      '        </table>' +
      '      </div>' +
      '      <h4 style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Project Requirements</h4>' +
      '      <div style="background: #f8fafc; border-left: 4px solid #7c3aed; padding: 14px 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px;">' +
      '        ' + details.projectDescription.replace(/\n/g, '<br>') +
      '      </div>' +
      '      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">Submission ID: ' + details.id + ' • ' + details.timestamp + '</p>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      cc: BACKUP_NOTIFICATION_EMAIL,
      replyTo: details.email,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Failed to send project request notification email: ' + err.toString());
  }
}

/**
 * Sends formatted email notification for Contact Messages to svdigitalstudio@gmail.com
 */
function sendContactMessageEmail(details) {
  try {
    var subject = '💬 New Contact Message – SV Digital Studio';
    
    var plainBody = 
      '💬 NEW CONTACT MESSAGE – SV DIGITAL STUDIO\n' +
      '==================================================\n\n' +
      '• Name:      ' + details.name + '\n' +
      '• Email:     ' + details.email + '\n' +
      '• Phone:     ' + details.phone + '\n' +
      '• Timestamp: ' + details.timestamp + '\n\n' +
      'MESSAGE:\n' +
      '--------------------------------------------------\n' +
      details.message + '\n\n' +
      '==================================================\n' +
      'Stored in Google Sheets ("' + SHEET_NAMES.CONTACT_MESSAGES + '")';

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      cc: BACKUP_NOTIFICATION_EMAIL,
      replyTo: details.email,
      subject: subject,
      body: plainBody
    });
  } catch (err) {
    Logger.log('Failed to send contact message email: ' + err.toString());
  }
}

/**
 * Test function for Google Apps Script Editor
 * Select "testSubmitProjectRequest" in the dropdown and click "Run" to verify setup.
 */
function testSubmitProjectRequest() {
  var testPayload = {
    postData: {
      contents: JSON.stringify({
        action: 'project_request',
        name: 'Test Client',
        company: 'Innovate Labs',
        email: 'testclient@example.com',
        phone: '+91 9876543210',
        service: 'UI/UX Design',
        projectDescription: 'Test request to verify Google Apps Script and Google Sheets storage pipeline.',
        budget: '$1,500 – $3,500',
        timeline: '3 Weeks',
        status: 'New'
      })
    }
  };

  var response = doPost(testPayload);
  Logger.log('Test Response: ' + response.getContent());
}
