import React, { useState, useEffect, useRef } from 'react';
import { submitProjectRequestToAppsScript, GOOGLE_APPS_SCRIPT_URL } from '../config/appsScript';
import { SV_LOGO_URL } from '../assets/images';
export { GOOGLE_APPS_SCRIPT_URL };
import {
  X,
  Send,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Calendar,
  DollarSign,
  FileText,
  Link as LinkIcon,
  Phone,
  Mail,
  User,
  Building,
  CheckSquare,
  Square,
  HelpCircle,
  Paperclip,
  Trash2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export interface GoogleProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    title?: string;
    type?: string;
    description?: string;
  };
}

export interface ProjectFormResponse {
  id: string;
  timestamp: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectTitle: string;
  projectDescription: string;
  budgetRange: string;
  expectedDeliveryDate: string;
  referenceLinks: string;
  referenceFiles: string[];
  preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'Email';
  additionalNotes: string;
  isConfirmed: boolean;
}

export const PROJECT_TYPE_OPTIONS = [
  'UI/UX Design',
  'Website Design',
  'Website Development',
  'Mobile App UI/UX',
  'Dashboard UI Design',
  'Logo Design',
  'Brand Identity Design',
  'Data Analytics',
  'Power BI Dashboard',
  'Excel Dashboard',
  'SQL Data Analysis',
  'Python Data Analysis',
  'Data Visualization',
  'College Project',
  'Other',
];

export const BUDGET_OPTIONS = [
  'Less than $500 / ₹40,000',
  '$500 – $1,500 / ₹40,000 – ₹1,20,000',
  '$1,500 – $3,500 / ₹1,20,000 – ₹3,00,000',
  '$3,500 – $7,500 / ₹3,00,000 – ₹6,00,000',
  '$7,500+ / ₹6,00,000+',
  'Flexible / Open to Discussion',
];

export const GoogleProjectFormModal: React.FC<GoogleProjectFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  // Form State adhering strictly to specified field order
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('UI/UX Design');
  const [customProjectType, setCustomProjectType] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState(BUDGET_OPTIONS[1]);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [referenceLinks, setReferenceLinks] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [preferredContactMethod, setPreferredContactMethod] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Interaction State
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ProjectFormResponse | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [emailNotificationStatus, setEmailNotificationStatus] = useState<string>('');
  const [deliveryError, setDeliveryError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial prefilled data (e.g. when opened from a specific project or service)
  useEffect(() => {
    if (initialData?.title) {
      setProjectTitle(initialData.title);
    }
    if (initialData?.type) {
      // Find matching type or default
      const matched = PROJECT_TYPE_OPTIONS.find(
        (opt) => opt.toLowerCase() === initialData.type?.toLowerCase()
      );
      if (matched) {
        setProjectType(matched);
        if (matched !== 'Other') {
          setCustomProjectType('');
        }
      }
    }
    if (initialData?.description) {
      setProjectDescription(initialData.description);
    }
  }, [initialData, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setProjectType('UI/UX Design');
    setCustomProjectType('');
    setProjectTitle('');
    setProjectDescription('');
    setBudgetRange(BUDGET_OPTIONS[1]);
    setExpectedDeliveryDate('');
    setReferenceLinks('');
    setUploadedFiles([]);
    setPreferredContactMethod('WhatsApp');
    setAdditionalNotes('');
    setIsConfirmed(false);
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setValidationError(null);

    // Validation for Required Fields
    if (!fullName.trim()) {
      setValidationError('Please enter your Full Name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setValidationError('Please enter a valid Email Address.');
      return;
    }

    if (!phone.trim()) {
      setValidationError('Please enter your Phone Number or WhatsApp Number.');
      return;
    }

    if (!projectType.trim()) {
      setValidationError('Please select a Type of Project.');
      return;
    }

    if (projectType === 'Other' && !customProjectType.trim()) {
      setValidationError('Please enter your project type in the "Specify Project Type" field.');
      return;
    }

    if (!projectTitle.trim()) {
      setValidationError('Please enter your Project Title.');
      return;
    }

    if (!projectDescription.trim()) {
      setValidationError('Please provide a Project Description.');
      return;
    }

    if (!isConfirmed) {
      setValidationError('Please check the confirmation box: "I confirm that the information provided is accurate."');
      return;
    }

    setIsSubmitting(true);

    const submittedProjectType =
      projectType === 'Other' && customProjectType.trim()
        ? customProjectType.trim()
        : projectType;

    const newResponse: ProjectFormResponse = {
      id: `REQ-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      projectType: submittedProjectType,
      projectTitle: projectTitle.trim(),
      projectDescription: projectDescription.trim(),
      budgetRange,
      expectedDeliveryDate,
      referenceLinks: referenceLinks.trim(),
      referenceFiles: uploadedFiles.map((f) => f.name),
      preferredContactMethod,
      additionalNotes: additionalNotes.trim(),
      isConfirmed,
    };

    // 1. Prepare structured email with exact subject and clean layout
    const emailSubject = '🔔 New Project Request – SV Digital Studio';
    const emailBody = `🔔 NEW PROJECT REQUEST – SV DIGITAL STUDIO
==================================================
KEY PROJECT INTAKE SUMMARY:
• Name:         ${newResponse.fullName}
• Email:        ${newResponse.email}
• Phone:        ${newResponse.phone}
• Project Type: ${newResponse.projectType}
• Timeline:     ${newResponse.expectedDeliveryDate || 'Flexible / Not specified'}

ALL SUBMITTED DETAILS:
• Reference ID:             ${newResponse.id}
• Submitted At:             ${new Date().toLocaleString()}
• Client Full Name:         ${newResponse.fullName}
• Email Address:            ${newResponse.email}
• Phone / WhatsApp:         ${newResponse.phone}
• Company/Organization:     ${newResponse.company || 'N/A'}
• Preferred Contact Method: ${newResponse.preferredContactMethod}

• Type of Project:          ${newResponse.projectType}
• Project Title:            ${newResponse.projectTitle}
• Budget Range:             ${newResponse.budgetRange}
• Expected Timeline / Date: ${newResponse.expectedDeliveryDate || 'Flexible / Not specified'}

PROJECT REQUIREMENTS & DESCRIPTION:
--------------------------------------------------
${newResponse.projectDescription}

ADDITIONAL DETAILS & ATTACHMENTS:
--------------------------------------------------
• Reference Links:          ${newResponse.referenceLinks || 'None provided'}
• Uploaded Files:           ${newResponse.referenceFiles.length > 0 ? newResponse.referenceFiles.join(', ') : 'None'}
• Additional Notes:         ${newResponse.additionalNotes || 'None'}
• Accuracy Confirmed:       Yes, verified by client

==================================================
Notification Address: svdigitalstudio@gmail.com
SV Digital Studio • Design • Innovate • Elevate
==================================================`;

    // 2. Google Apps Script & Google Sheets Submission
    try {
      const targetUrl =
        (typeof window !== "undefined" && window.localStorage?.getItem("GOOGLE_APPS_SCRIPT_URL")) ||
        (typeof window !== "undefined" && (window as any).GOOGLE_APPS_SCRIPT_URL) ||
        GOOGLE_APPS_SCRIPT_URL;

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: newResponse.fullName,
          fullName: newResponse.fullName,
          email: newResponse.email,
          phone: newResponse.phone,
          company: newResponse.company,
          university: newResponse.company,
          companyOrUniversity: newResponse.company,
          service: newResponse.projectType,
          projectType: newResponse.projectType,
          typeOfProject: newResponse.projectType,
          message: newResponse.projectDescription,
          projectTitle: newResponse.projectTitle,
          projectDescription: newResponse.projectDescription,
          budget: newResponse.budgetRange,
          budgetRange: newResponse.budgetRange,
          timeline: newResponse.expectedDeliveryDate,
          expectedDeliveryDate: newResponse.expectedDeliveryDate,
          expectedStartDate: newResponse.expectedDeliveryDate,
          preferredContactMethod: newResponse.preferredContactMethod,
          preferredWorkingMode: newResponse.preferredContactMethod,
          referenceLinks: newResponse.referenceLinks,
          referenceSimilarProject: newResponse.referenceLinks,
          referenceFiles: newResponse.referenceFiles,
          additionalNotes: newResponse.additionalNotes,
          permission: 'Granted',
          status: 'New',
          referenceId: newResponse.id,
          action: 'project_request',
        }),
      });

      let isSuccess = response.ok;
      let responseMessage = 'Project request recorded in Google Sheets and notified via email';

      try {
        const resData = await response.json();
        if (resData && typeof resData === 'object') {
          if (resData.success === false) {
            isSuccess = false;
            responseMessage = resData.error || resData.message || 'Submission failed in Google Apps Script.';
          } else if (resData.message) {
            responseMessage = resData.message;
          }
        }
      } catch {
        if (response.ok || response.status === 200 || response.type === 'opaque') {
          isSuccess = true;
        }
      }

      if (isSuccess) {
        // Form submission recorded in Google Sheets and email sent via MailApp
        setIsSubmitting(false);
        setDeliveryError(null);
        setIsSubmitted(true);
        setSubmittedData(newResponse);
        setEmailNotificationStatus(responseMessage);

        // Reset form fields for subsequent entry while preserving submittedData display
        clearForm();
      } else {
        // Keep entered data intact on failure, display error message
        setIsSubmitting(false);
        setIsSubmitted(false);
        setDeliveryError(responseMessage || 'Unable to record project request into Google Sheets. Please check your connection and retry.');
      }
    } catch (apiErr: any) {
      console.error('[Project Request Submission Error]', apiErr);
      // Keep entered data intact on failure, display error message
      setIsSubmitting(false);
      setIsSubmitted(false);
      setDeliveryError(apiErr?.message || 'Network connection failed while saving request into Google Sheets. Please retry.');
    }
  };

  const handleCopySummary = () => {
    if (!submittedData) return;
    const summary = `🔔 SV DIGITAL STUDIO - PROJECT REQUEST SUMMARY
==================================================
KEY INTAKE DETAILS:
• Name:         ${submittedData.fullName}
• Email:        ${submittedData.email}
• Phone:        ${submittedData.phone}
• Project Type: ${submittedData.projectType}
• Timeline:     ${submittedData.expectedDeliveryDate || 'Flexible / Not specified'}

ALL SUBMITTED DETAILS:
• Reference ID:      ${submittedData.id}
• Company:           ${submittedData.company || 'N/A'}
• Project Title:     ${submittedData.projectTitle}
• Budget Range:      ${submittedData.budgetRange}
• Preferred Contact: ${submittedData.preferredContactMethod}
• Reference Links:   ${submittedData.referenceLinks || 'None'}
• Files Attached:    ${submittedData.referenceFiles.length > 0 ? submittedData.referenceFiles.join(', ') : 'None'}
• Additional Notes:  ${submittedData.additionalNotes || 'None'}
• Client Confirmed:  ${submittedData.isConfirmed ? 'Yes' : 'No'}

Project Requirements:
${submittedData.projectDescription}
==================================================
Notified to: svdigitalstudio@gmail.com`;

    navigator.clipboard.writeText(summary);
    alert('Project request summary copied to clipboard!');
  };

  return (
    <div
      id="google-form-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="google-form-modal-container"
        className="relative w-full max-w-3xl bg-[#f0ebf8] dark:bg-[#0f111a] rounded-2xl shadow-2xl border border-purple-200/60 dark:border-purple-900/40 my-auto max-h-[94vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
      >
        {/* Google Form Top Accent Banner (Signature Google Purple) */}
        <div className="h-3 w-full bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-600 shrink-0" />

        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-400">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
            <span>Google Forms • SV Digital Studio</span>
          </div>

          <button
            id="close-google-form-modal-btn"
            onClick={onClose}
            aria-label="Close form"
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4">
          {isSubmitted ? (
            /* Post-Submission Card */
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-10 border-t-8 border-t-purple-700 border border-slate-200 dark:border-slate-800 shadow-md text-center max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Thank you!
                </h3>
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                  Your project request has been submitted successfully. Our team will contact you soon.
                </p>
              </div>

              {/* Email Notification & Status Banner */}
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 text-left space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>Response Recorded & Dispatched</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Notification sent to <span className="font-semibold text-purple-700 dark:text-purple-300">svdigitalstudio19@gmail.com</span>. Co-founders Sanjay S & Vinjitha R will review your project brief.
                </p>
                {submittedData && (
                  <div className="pt-2 border-t border-purple-200/70 dark:border-purple-800/70 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    Submission Ref: {submittedData.id} • Contact: {submittedData.preferredContactMethod}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Copy Summary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    clearForm();
                  }}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
                >
                  Submit another response
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Top Google Form Card: Logo, Tagline & Welcome Message */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 border-t-8 border-t-purple-700 border border-slate-200 dark:border-slate-800 shadow-xs relative text-center">
                {/* Large High-Quality SV Digital Studio Logo at Top Center */}
                <div className="flex flex-col items-center justify-center pt-1 pb-2">
                  <div className="relative p-2 rounded-2xl">
                    <img
                      src={SV_LOGO_URL}
                      alt="SV Digital Studio Logo"
                      referrerPolicy="no-referrer"
                      className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain rounded-2xl mx-auto drop-shadow-[0_8px_24px_rgba(103,58,183,0.2)]"
                    />
                  </div>

                  {/* Studio Tagline */}
                  <div className="mt-2 text-sm sm:text-base font-semibold tracking-wider text-purple-700 dark:text-purple-400">
                    Design • Innovate • Elevate
                  </div>
                </div>

                {/* Short Welcome Message */}
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
                  Welcome to SV Digital Studio! Please fill out this form with your project requirements. Our team will review your request and contact you as soon as possible.
                </p>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-red-600 dark:text-red-400 font-medium gap-1 text-left">
                  <span>* Indicates required question</span>
                  <span className="text-slate-400 dark:text-slate-500 font-normal">
                    Notifications sent to svdigitalstudio19@gmail.com
                  </span>
                </div>
              </div>

              {/* Validation Warning Alert */}
              {validationError && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* 1. Full Name (Required) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'fullName'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Full Name <span className="text-red-600 font-bold">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Enter your first and last name.
                </p>
                <input
                  id="google-form-full-name"
                  type="text"
                  required
                  placeholder="Your answer"
                  value={fullName}
                  onFocus={() => setActiveField('fullName')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full sm:w-3/4 pb-2 pt-1 border-b-2 border-slate-300 dark:border-slate-700 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 transition-colors"
                />
              </div>

              {/* 2. Email Address (Required) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'email'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Email Address <span className="text-red-600 font-bold">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  We will send project updates and proposals to this email.
                </p>
                <input
                  id="google-form-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-3/4 pb-2 pt-1 border-b-2 border-slate-300 dark:border-slate-700 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 transition-colors"
                />
              </div>

              {/* 3. Phone Number or WhatsApp Number (Required) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'phone'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Phone Number or WhatsApp Number <span className="text-red-600 font-bold">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Include country code for faster coordination (e.g. +1 555-0199 or +91 9876543210).
                </p>
                <input
                  id="google-form-phone"
                  type="tel"
                  required
                  placeholder="Your phone or WhatsApp number"
                  value={phone}
                  onFocus={() => setActiveField('phone')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full sm:w-3/4 pb-2 pt-1 border-b-2 border-slate-300 dark:border-slate-700 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 transition-colors"
                />
              </div>

              {/* 4. Company or Organization (Optional) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'company'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Company or Organization <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Name of your startup, enterprise, college, or initiative.
                </p>
                <input
                  id="google-form-company"
                  type="text"
                  placeholder="Your company or university"
                  value={company}
                  onFocus={() => setActiveField('company')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full sm:w-3/4 pb-2 pt-1 border-b-2 border-slate-300 dark:border-slate-700 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 transition-colors"
                />
              </div>

              {/* 5. Type of Project (Required Dropdown) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'projectType' || activeField === 'customProjectType'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Type of Project <span className="text-red-600 font-bold">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Choose the core discipline that best matches your project.
                </p>
                <select
                  id="google-form-project-type"
                  required
                  value={projectType}
                  onFocus={() => setActiveField('projectType')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setProjectType(selected);
                    if (selected !== 'Other') {
                      setCustomProjectType('');
                    }
                  }}
                  className="w-full sm:w-3/4 py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors cursor-pointer"
                >
                  {PROJECT_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {/* Conditional "Specify Project Type" text field when "Other" is selected */}
                {projectType === 'Other' && (
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label
                      htmlFor="google-form-specify-project-type"
                      className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5"
                    >
                      Specify Project Type <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      id="google-form-specify-project-type"
                      type="text"
                      required
                      placeholder="Enter your project type..."
                      value={customProjectType}
                      onFocus={() => setActiveField('customProjectType')}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setCustomProjectType(e.target.value)}
                      className="w-full sm:w-3/4 pb-2 pt-1 border-b-2 border-slate-300 dark:border-slate-700 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* 6. Project Title (Required) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'projectTitle'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Project Title <span className="text-red-600 font-bold">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  A concise name or working title for this request.
                </p>
                <input
                  id="google-form-project-title"
                  type="text"
                  required
                  placeholder="e.g. HealthTech Mobile App Redesign or Sales Executive Dashboard"
                  value={projectTitle}
                  onFocus={() => setActiveField('projectTitle')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full sm:w-3/4 pb-2 pt-1 border-b-2 border-slate-300 dark:border-slate-700 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 transition-colors"
                />
              </div>

              {/* 7. Project Description (Long Answer, Required) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'projectDescription'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Project Description <span className="text-red-600 font-bold">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Describe what you want to build, the core problem, key features, and your target audience.
                </p>
                <textarea
                  id="google-form-project-description"
                  required
                  rows={4}
                  placeholder="Detailed project requirements, goals, and expectations..."
                  value={projectDescription}
                  onFocus={() => setActiveField('projectDescription')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors leading-relaxed"
                />
              </div>

              {/* 8. Budget Range (Dropdown) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'budgetRange'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Budget Range
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Select your estimated investment tier for this scope.
                </p>
                <select
                  id="google-form-budget-range"
                  value={budgetRange}
                  onFocus={() => setActiveField('budgetRange')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full sm:w-3/4 py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 9. Expected Delivery Date (Date Picker) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'expectedDeliveryDate'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Expected Delivery Date
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  When do you need the finished deliverables or first milestone?
                </p>
                <div className="relative w-full sm:w-1/2">
                  <input
                    id="google-form-delivery-date"
                    type="date"
                    value={expectedDeliveryDate}
                    onFocus={() => setActiveField('expectedDeliveryDate')}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  />
                </div>
              </div>

              {/* 10. Reference Website or Design Links (Optional) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'referenceLinks'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Reference Website or Design Links <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Figma links, competitor websites, Dribbble shots, inspiration boards, or datasets.
                </p>
                <input
                  id="google-form-reference-links"
                  type="text"
                  placeholder="https://..."
                  value={referenceLinks}
                  onFocus={() => setActiveField('referenceLinks')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setReferenceLinks(e.target.value)}
                  className="w-full sm:w-3/4 pb-2 pt-1 border-b-2 border-slate-300 dark:border-slate-700 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 transition-colors"
                />
              </div>

              {/* 11. Upload Reference Files (Optional) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'referenceFiles'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Upload Reference Files <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Attach briefs, screenshots, wireframes, sample spreadsheets, or project specifications.
                </p>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center hover:border-purple-500 transition-colors bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                    Click to browse files or drag and drop here
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports PDF, DOCX, PNG, JPG, CSV, XLSX, ZIP
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Uploaded Files Chips */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Paperclip className="w-4 h-4 text-purple-600 shrink-0" />
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                            {file.name}
                          </span>
                          <span className="text-slate-400 shrink-0">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 12. Preferred Contact Method (Radio Buttons) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'contactMethod'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Preferred Contact Method <span className="text-red-600 font-bold">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  How should our founders connect with you for the initial discovery call?
                </p>
                <div className="space-y-2.5">
                  {(['WhatsApp', 'Phone Call', 'Email'] as const).map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-3 cursor-pointer select-none group"
                    >
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value={method}
                        checked={preferredContactMethod === method}
                        onChange={() => setPreferredContactMethod(method)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-600 border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                      <span className="text-sm text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">
                        {method}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 13. Additional Notes (Optional) */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  activeField === 'additionalNotes'
                    ? 'border-purple-600 ring-1 ring-purple-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  Additional Notes <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Any time zone preferences, specific tools (Figma, Power BI, PostgreSQL), or questions for the founders.
                </p>
                <textarea
                  id="google-form-additional-notes"
                  rows={3}
                  placeholder="Your answer"
                  value={additionalNotes}
                  onFocus={() => setActiveField('additionalNotes')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                />
              </div>

              {/* 14. Required Confirmation Checkbox */}
              <div
                className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  !isConfirmed && validationError
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    id="google-form-confirmation-checkbox"
                    type="checkbox"
                    required
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-600 border-slate-300 dark:border-slate-700 cursor-pointer shrink-0"
                  />
                  <div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed block">
                      I confirm that the information provided is accurate. <span className="text-red-600 font-bold">*</span>
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      By submitting, you agree to allow SV Digital Studio to contact you via your preferred method regarding this request.
                    </span>
                  </div>
                </label>
              </div>

              {/* Email Delivery Error Alert & Retry Handler */}
              {deliveryError && (
                <div
                  id="google-form-delivery-error-alert"
                  className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 animate-in fade-in duration-200"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-2 flex-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        Email Notification Notice
                      </div>
                      <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                        {deliveryError}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1.5">
                        <button
                          type="button"
                          onClick={(e) => handleSubmit(e as any)}
                          disabled={isSubmitting}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                          <span>Retry Sending Email</span>
                        </button>

                        <a
                          href={`mailto:svdigitalstudio19@gmail.com?subject=${encodeURIComponent(
                            '🔔 New Project Request – SV Digital Studio'
                          )}&body=${encodeURIComponent(
                            `SV DIGITAL STUDIO - PROJECT REQUEST\n\nClient: ${fullName} (${email} | ${phone})\nCompany: ${company || 'N/A'}\nType: ${projectType === 'Other' && customProjectType.trim() ? customProjectType.trim() : projectType}\nTitle: ${projectTitle}\nBudget: ${budgetRange}\nDate: ${expectedDeliveryDate}\nPreferred Contact: ${preferredContactMethod}\n\nDescription:\n${projectDescription}`
                          )}`}
                          className="text-xs font-medium text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1"
                        >
                          <span>Open in Email App (mailto)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Bottom Controls (Submit & Clear) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  id="google-form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-semibold bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending & Dispatching Email...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={clearForm}
                  className="text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline cursor-pointer"
                >
                  Clear form
                </button>
              </div>

              {/* Google Forms Footer */}
              <div className="text-center pt-4 pb-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <p>Never submit passwords through Google Forms.</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  This form was created by SV Digital Studio • Responses notified to svdigitalstudio19@gmail.com
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
