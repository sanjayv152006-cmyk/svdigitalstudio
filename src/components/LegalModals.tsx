import React, { useEffect } from 'react';
import { X, ShieldCheck, FileCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [type]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="legal-modal-card"
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
      >
        <button
          id="close-legal-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-purple-600 dark:text-purple-400">
          {isPrivacy ? <ShieldCheck className="w-6 h-6" /> : <FileCheck className="w-6 h-6" />}
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h3>
        </div>

        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-4 leading-relaxed">
          <p>
            Effective Date: March 2026. Welcome to SV Digital Studio. We value your trust and are committed to protecting all client intellectual property and data assets.
          </p>

          {isPrivacy ? (
            <>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                1. Information Collection & Client Confidentially
              </h4>
              <p>
                We only collect information willingly provided via our project intake form, such as contact names, corporate email addresses, phone numbers, and attached project briefs. All materials are treated as confidential under strict studio non-disclosure policies.
              </p>

              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                2. Data Protection & Analytics Sandboxing
              </h4>
              <p>
                During data analytics and business intelligence engagements, sample database records and operational metrics are accessed strictly within secure client-approved environments. We do not sell, rent, or trade client datasets to third parties.
              </p>

              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                3. Cookies & Analytical Metrics
              </h4>
              <p>
                We utilize essential cookies solely for theme preferences (light/dark mode) and performance analytics.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                1. Scope of Engagement
              </h4>
              <p>
                SV Digital Studio delivers custom UI/UX design, mobile prototyping, brand architecture, and data analytics modeling as agreed upon in individualized statements of work (SOW).
              </p>

              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                2. Intellectual Property Ownership
              </h4>
              <p>
                Upon final invoice settlement, full commercial ownership and intellectual property of finalized Figma files, design tokens, SQL code, and Power BI report definitions transfer directly to the client.
              </p>

              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                3. Warranties & Sprint Milestones
              </h4>
              <p>
                Work is performed to rigorous enterprise standards in accordance with our 2-week agile review milestones.
              </p>
            </>
          )}

          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-purple-600 dark:hover:bg-purple-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
