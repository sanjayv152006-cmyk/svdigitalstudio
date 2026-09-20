import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_DETAILS } from '../data/content';

interface ContactProps {
  onOpenStartProject?: () => void;
}

export const Contact: React.FC<ContactProps> = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="service-tag block mb-3">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Contact SV Digital Studio
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Reach out directly for project inquiries, technical audits, or design partnerships.
          </p>
        </div>

        {/* Business Details */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs">
          <div className="text-center mb-8 pb-8 border-t-0 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {CONTACT_DETAILS.studioName}
            </h3>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">
              {CONTACT_DETAILS.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* Phone */}
            <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 mx-auto md:mx-0">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Phone Numbers
              </span>
              <div className="space-y-1">
                <a
                  href="tel:7094362852"
                  id="contact-phone-1"
                  className="block text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  7094362852
                </a>
                <a
                  href="tel:8270977216"
                  id="contact-phone-2"
                  className="block text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  8270977216
                </a>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
                Tap to Call Directly
              </span>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 mx-auto md:mx-0">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Primary Studio Email
              </span>
              <a
                href="mailto:svdigitalstudio19@gmail.com"
                id="contact-email"
                className="block text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-all"
              >
                svdigitalstudio19@gmail.com
              </a>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
                Sub-24h Response
              </span>
            </div>

            {/* Location & Remote */}
            <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 mx-auto md:mx-0">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Studio Location
              </span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kongu+Main+Road%2C+Tiruppur"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-location"
                className="block text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Tiruppur, Kongu Main Road
              </a>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
                Global Remote Partnerships
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
