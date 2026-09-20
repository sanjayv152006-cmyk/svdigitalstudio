import React from 'react';
import { CONTACT_DETAILS } from '../data/content';
import { SV_LOGO_URL } from '../assets/images';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenStartProject?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-white/80 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/70 dark:border-slate-800">
          {/* Company Brand Column - Large Logo Filling Footer Top and Bottom */}
          <div className="lg:col-span-2 flex items-center justify-center lg:justify-start">
            <img
              src={SV_LOGO_URL}
              alt="SV Digital Studio Logo"
              referrerPolicy="no-referrer"
              className="h-64 sm:h-72 lg:h-80 w-64 sm:w-72 lg:w-80 max-w-full aspect-square object-cover rounded-2xl shadow-sm"
            />
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col justify-between py-1">
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4 sm:mb-6">
                Navigation
              </h4>
              <ul className="space-y-3 sm:space-y-3.5 text-sm sm:text-base font-medium">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    About Studio &amp; Founders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Services &amp; Workflows
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Featured Portfolio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('why-us')}
                    className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Why Choose Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Contact &amp; Intake
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Disciplines Column */}
          <div className="flex flex-col justify-between py-1">
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4 sm:mb-6">
                Disciplines
              </h4>
              <ul className="space-y-3 sm:space-y-3.5 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">
                <li>UI/UX &amp; Mobile Apps</li>
                <li>Interactive Dashboards</li>
                <li>Power BI &amp; SQL Modeling</li>
                <li>Design Systems &amp; Wireframes</li>
                <li>Brand Identity &amp; Graphics</li>
                <li>Data Cleaning &amp; KPI Trackers</li>
              </ul>
            </div>
          </div>

          {/* Contact Direct Column */}
          <div className="flex flex-col justify-between py-1">
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4 sm:mb-6">
                Studio Office
              </h4>
              <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white">Tamil Nadu, India</p>
                <p>
                  <a
                    href="mailto:svdigitalstudio19@gmail.com"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium break-all"
                  >
                    svdigitalstudio19@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+917094362852"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                  >
                    +91 7094362852
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
                  Serving clients across India &amp; globally through agile remote collaboration
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright, Privacy, Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {currentYear} {CONTACT_DETAILS.studioName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
