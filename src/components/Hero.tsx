import React from 'react';
import { ArrowRight, Sparkles, User } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onViewPortfolio: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onViewPortfolio,
  onExploreServices,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[130px]" />
        <div className="absolute top-[50%] -right-[15%] w-[500px] h-[500px] rounded-full bg-slate-200/40 dark:bg-purple-600/10 blur-[130px]" />
        {/* Subtle Editorial Grid */}
        <div 
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Editorial Label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Independent Studio • San Francisco & Remote Worldwide
          </span>
        </div>

        {/* Main 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left 7 Columns: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1
              id="hero-heading"
              className="editorial-title text-slate-900 dark:text-white mb-6"
            >
              SV DIGITAL <br />
              <span className="text-purple-600 dark:text-purple-400">STUDIO</span>
            </h1>

            <p
              id="hero-subtitle"
              className="text-lg sm:text-xl font-semibold text-purple-600 dark:text-purple-400 tracking-tight mb-4"
            >
              Modern UI/UX Design & Data Analytics Solutions for Businesses.
            </p>

            <p
              id="hero-intro"
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-8"
            >
              We build beautiful, data-driven digital products for ambitious startups and enterprises. Specializing in high-end interfaces and actionable visual business intelligence.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                id="hero-start-project-btn"
                onClick={onStartProject}
                className="bg-black hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:ring-2 hover:ring-purple-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Start Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-portfolio-btn"
                onClick={onViewPortfolio}
                className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-400 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-semibold shadow-xs transition-all cursor-pointer"
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Editorial Glass Cards (UI/UX Lead & Data Lead) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Sanjay S / Founder 1 Glass Card */}
            <div
              onClick={onExploreServices}
              className="glass-card p-6 flex flex-col justify-between border border-slate-200/70 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="service-tag">Creative Director • UI/UX</span>
                <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/80 text-purple-600 dark:text-purple-400 shadow-xs flex items-center justify-center group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all duration-200">
                  <User className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Sanjay S
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
                  UI/UX Lead. Specializing in high-end interfaces, design systems, and mobile prototypes that scale.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    Figma
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    Design Systems
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    Prototypes
                  </span>
                </div>
              </div>
            </div>

            {/* Vinjitha R / Founder 2 Glass Card */}
            <div
              onClick={onExploreServices}
              className="glass-card p-6 flex flex-col justify-between border border-slate-200/70 dark:border-slate-800 bg-purple-50/15 dark:bg-slate-900/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="service-tag">Data Strategist • Analytics</span>
                <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/80 text-purple-600 dark:text-purple-400 shadow-xs flex items-center justify-center group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all duration-200">
                  <User className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Vinjitha R
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
                  Data Analyst. Transforming complex business datasets into actionable visual insights & executive KPI models.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    Power BI
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    SQL & Python
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    KPI Dashboards
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
