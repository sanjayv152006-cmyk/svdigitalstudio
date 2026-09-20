import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, Layers, Smartphone, LayoutDashboard, Monitor, BarChart2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/content';
import { PortfolioProject } from '../types';

interface PortfolioProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ui-ux' | 'data-analytics'>('all');

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const getMockupIcon = (type: string) => {
    switch (type) {
      case 'mobile-app':
        return <Smartphone className="w-5 h-5" />;
      case 'dashboard':
        return <LayoutDashboard className="w-5 h-5" />;
      case 'analytics-cockpit':
        return <BarChart2 className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="service-tag block mb-3">Selected Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Portfolio
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            A curated showcase of responsive digital products, design systems, and business intelligence models engineered for growth.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              All Projects ({PORTFOLIO_PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('ui-ux')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'ui-ux'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              UI/UX Design
            </button>
            <button
              onClick={() => setActiveFilter('data-analytics')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'data-analytics'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Data Analytics
            </button>
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 overflow-hidden shadow-xs hover:shadow-xl hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image / Mockup Placeholder Box */}
                <div
                  className={`h-52 w-full bg-gradient-to-br ${project.accentGradient} relative p-6 flex flex-col justify-between overflow-hidden border-b border-slate-100 dark:border-slate-800`}
                >
                  {/* Subtle grid pattern inside placeholder */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Top Bar inside mockup */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="service-tag bg-white/90 dark:bg-slate-900/90 shadow-xs">
                      {project.categoryLabel}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs">
                      {getMockupIcon(project.mockupType)}
                    </div>
                  </div>

                  {/* Middle UI Graphic Visualization */}
                  <div className="relative z-10 my-auto">
                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/40 dark:border-slate-800/60 shadow-md max-w-[85%] mx-auto transform group-hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-2 w-16 bg-purple-500 rounded-full" />
                        <div className="h-2 w-6 bg-slate-300 dark:bg-slate-700 rounded-full" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
                        <div className="h-1.5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Metric Indicator inside image */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300 font-semibold bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-xs border border-white/50 dark:border-slate-800">
                    <span>Impact Metric</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      {project.metrics[0]?.value}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-medium text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Select Project Action */}
              <div className="px-6 sm:px-7 pb-6 pt-0">
                <button
                  id={`select-project-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all duration-200 cursor-pointer group/btn"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Select Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
