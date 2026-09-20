/**
 * GOOGLE APPS SCRIPT WEB APP CONFIGURATION
 * 
 * Replace the constant below with your deployed Google Apps Script Web App URL.
 * 
 * Target Architecture:
 * Website Frontend
 *       ↓
 * Google Apps Script Web App
 *       ↓
 * Google Sheets (Contact / Project Requests & Contact Messages)
 *       ↓
 * Email notification using Apps Script MailApp (svdigitalstudio@gmail.com)
 * 
 * Instructions to get your URL:
 * 1. Open your Google Spreadsheet
 * 2. Extensions → Apps Script (paste the code from /google-apps-script/Code.gs)
 * 3. Deploy → New deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL and paste it below:
 */
export const GOOGLE_APPS_SCRIPT_URL: string =
  (typeof window !== "undefined" && window.localStorage?.getItem("GOOGLE_APPS_SCRIPT_URL")) ||
  (typeof window !== "undefined" && (window as any).GOOGLE_APPS_SCRIPT_URL) ||
  ((import.meta as any).env?.VITE_GOOGLE_APPS_SCRIPT_URL) ||
  "https://script.google.com/macros/s/AKfycbwyqLDtYd3cGz93qb2NGjrHHM5rLnjejBDcY5K81i-DFU-Ao7EUD2pnIaDfrcSPcISfxg/exec";

export interface ProjectRequestPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  projectTitle?: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  preferredContactMethod?: string;
  referenceLinks?: string;
  additionalNotes?: string;
  referenceId?: string;
  [key: string]: any;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  [key: string]: any;
}

/**
 * Submits a project intake request directly to the Google Apps Script Web App.
 * Apps Script records it in "Contact / Project Requests" and triggers MailApp email notification.
 */
export async function submitProjectRequestToAppsScript(data: ProjectRequestPayload): Promise<{
  success: boolean;
  message: string;
}> {
  const targetUrl =
    (typeof window !== "undefined" && window.localStorage?.getItem("GOOGLE_APPS_SCRIPT_URL")) ||
    (typeof window !== "undefined" && (window as any).GOOGLE_APPS_SCRIPT_URL) ||
    GOOGLE_APPS_SCRIPT_URL;

  const payload = {
    name: data.name,
    fullName: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    projectType: data.service,
    typeOfProject: data.service,
    message: data.projectDescription || data.message || '',
    company: data.company || 'N/A',
    university: data.company || 'N/A',
    companyOrUniversity: data.company || 'N/A',
    projectTitle: data.projectTitle || `${data.service} Project`,
    projectDescription: data.projectDescription || data.message || '',
    budget: data.budget || 'Not specified',
    budgetRange: data.budget || 'Not specified',
    timeline: data.timeline || 'Flexible',
    expectedDeliveryDate: data.timeline || 'Flexible',
    expectedStartDate: data.timeline || 'Flexible',
    preferredContactMethod: data.preferredContactMethod || 'WhatsApp',
    preferredWorkingMode: data.preferredContactMethod || 'WhatsApp',
    referenceLinks: data.referenceLinks || 'None',
    referenceSimilarProject: data.referenceLinks || 'None',
    additionalNotes: data.additionalNotes || 'None',
    permission: 'Granted',
    status: 'New',
    referenceId: data.referenceId || `REQ-${Date.now()}`,
    action: 'project_request',
    timestamp: new Date().toISOString(),
  };

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  try {
    const result = await response.json();
    return {
      success: result.success !== false,
      message: result.message || "Project request recorded in Google Sheets successfully.",
    };
  } catch {
    if (response.ok || response.status === 200 || response.type === 'opaque') {
      return {
        success: true,
        message: "Project request submitted to Google Sheets successfully.",
      };
    }
    return {
      success: false,
      message: `Google Apps Script returned status ${response.status}.`,
    };
  }
}

/**
 * Submits a contact message directly to the Google Apps Script Web App.
 * Apps Script records it in "Contact Messages" and triggers MailApp email notification.
 */
export async function submitContactMessageToAppsScript(data: ContactMessagePayload): Promise<{
  success: boolean;
  message: string;
}> {
  const targetUrl =
    (typeof window !== "undefined" && window.localStorage?.getItem("GOOGLE_APPS_SCRIPT_URL")) ||
    (typeof window !== "undefined" && (window as any).GOOGLE_APPS_SCRIPT_URL) ||
    GOOGLE_APPS_SCRIPT_URL;

  const payload = {
    action: 'contact_message',
    timestamp: new Date().toISOString(),
    id: `MSG-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone || 'N/A',
    service: data.service || 'General Inquiry',
    message: data.message,
    status: 'New',
  };

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  try {
    const result = await response.json();
    return {
      success: result.success !== false,
      message: result.message || "Message sent and stored in Google Sheets.",
    };
  } catch {
    if (response.ok || response.status === 200 || response.type === 'opaque') {
      return {
        success: true,
        message: "Message submitted to Google Sheets successfully.",
      };
    }
    return {
      success: false,
      message: `Google Apps Script returned status ${response.status}.`,
    };
  }
}
