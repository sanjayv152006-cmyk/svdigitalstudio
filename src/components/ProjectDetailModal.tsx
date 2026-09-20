import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2, TrendingUp, Layers, Sparkles } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onStartProject: (contextTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="project-detail-modal-content"
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header Preview Banner */}
        <div className={`relative p-8 sm:p-10 bg-gradient-to-br ${project.accentGradient} border-b border-slate-200 dark:border-slate-800`}>
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="service-tag bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/60 mb-3 inline-block shadow-xs">
            {project.categoryLabel}
          </span>

          <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
            {project.description}
          </p>

          {/* Quick Metrics Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-2 text-xs"
              >
                <span className="text-slate-500 dark:text-slate-400">{m.label}:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Visual Showcase Placeholder Box */}
          <div className="w-full h-56 sm:h-72 rounded-2xl bg-zinc-900 text-white p-6 relative overflow-hidden flex flex-col justify-between border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-zinc-400">{project.id}.sv-preview.app</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-purple-400">
                Production Prototype
              </span>
            </div>

            {/* Inner Stylized UI Mockup representation */}
            <div className="my-auto grid grid-cols-3 gap-3 max-w-lg mx-auto w-full opacity-90">
              <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50">
                <div className="h-2 w-12 bg-purple-500 rounded mb-2" />
                <div className="h-4 w-16 bg-white/60 rounded" />
              </div>
              <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50">
                <div className="h-2 w-14 bg-indigo-500 rounded mb-2" />
                <div className="h-4 w-20 bg-white/60 rounded" />
              </div>
              <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50">
                <div className="h-2 w-10 bg-emerald-500 rounded mb-2" />
                <div className="h-4 w-14 bg-white/60 rounded" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
              <span>Bespoke Design & Analytics Architecture</span>
              <span className="text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> High-Fidelity Milestone
              </span>
            </div>
          </div>

          {/* Case Study Grid: Challenge, Solution, Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400 mb-2">
                The Challenge
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.fullCaseStudy.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                Our Solution
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.fullCaseStudy.solution}
              </p>
            </div>
          </div>

          {/* Measurable Results List */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Measurable Business Impact</span>
            </h4>
            <div className="space-y-2">
              {project.fullCaseStudy.impact.map((imp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider block mb-2">
              Stack & Methodologies
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
            Interested in comparable outcomes for your company?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartProject(`Inquiry regarding ${project.title}`);
              }}
              id="modal-select-project-btn"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 cursor-pointer"
            >
              <span>Select Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
