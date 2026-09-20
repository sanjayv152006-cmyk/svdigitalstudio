# Google Apps Script & Google Sheets Integration - SV Digital Studio

This repository contains the backend and storage implementation using **Google Apps Script Web App** and **Google Sheets**.

---

## 1. Google Sheets Architecture

The backend uses one Google Spreadsheet with two dedicated sheets:

### Sheet 1: `Contact / Project Requests`
Stores all structured project intake submissions (from "Start Project", "Get a Quote", or Service detail CTAs).
- **Columns:**
  1. `Timestamp` (Auto-generated ISO date/time)
  2. `Name`
  3. `Company`
  4. `Email`
  5. `Phone`
  6. `Service`
  7. `Project Description`
  8. `Budget`
  9. `Timeline`
  10. `Status` (Defaults to `"New"`)

### Sheet 2: `Contact Messages`
Stores general contact inquiries and messages.
- **Columns:**
  1. `Timestamp`
  2. `Name`
  3. `Email`
  4. `Phone`
  5. `Message`
  6. `Status` (Defaults to `"New"`)

---

## 2. Google Apps Script Web App Deployment Instructions

1. Open [Google Sheets](https://sheets.new) and create or open your spreadsheet.
2. In the top menu, go to **Extensions** → **Apps Script**.
3. Replace any code in `Code.gs` with the code in `google-apps-script/Code.gs`.
4. Click **Save** (`Ctrl+S` or `Cmd+S`).
5. (Optional) Run the `setupSheets` function once to automatically create the two formatted sheets with violet header styling.
6. Click **Deploy** → **New deployment**.
7. In the deployment configuration dialog:
   - **Select type:** Web App
   - **Description:** `SV Digital Studio API`
   - **Execute as:** `Me (your Google account)`
   - **Who has access:** `Anyone` (required so the website frontend and backend can submit form data)
8. Click **Deploy** and authorize permissions when prompted.
9. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 3. Connecting to the Website

Open `src/config/appsScript.ts` and paste your Web App URL into the constant:
```typescript
export const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

No environment variables, SMTP credentials, or database setups are required! The frontend submits directly to your Google Apps Script Web App, which saves submissions into Google Sheets and dispatches email notifications via `MailApp.sendEmail()`.
