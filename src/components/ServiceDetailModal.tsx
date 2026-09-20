import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Layers, Workflow, BarChart3, Palette, FileText, Download } from 'lucide-react';
import { ServiceCardData } from '../types';

interface ServiceDetailModalProps {
  service: ServiceCardData | null;
  onClose: () => void;
  onStartProjectForService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onStartProjectForService,
}) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [service]);

  if (!service) return null;

  const isUIUX = service.id === 'ui-ux';

  return (
    <div
      id="service-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="service-detail-modal-content"
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-purple-50/40 via-white to-purple-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800">
          <button
            id="close-service-modal-btn"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-white/80 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 w-fit mb-3">
            {isUIUX ? <Palette className="w-3.5 h-3.5" /> : <BarChart3 className="w-3.5 h-3.5" />}
            <span>{service.badge}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            {service.title} In-Depth
          </h3>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {service.subtitle}
          </p>

          {/* Tools Badge Strip */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider">
              Tooling:
            </span>
            {service.tools.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-10">
          {/* Section 1: Detailed Overview */}
          <div>
            <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Full Capabilities & Scope</span>
            </h4>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {service.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
              {service.capabilities.map((cap, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {cap}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Step-by-Step Workflow */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Our Proven Delivery Workflow</span>
              </h4>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                4-Phase Iterative Cycle
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.workflow.map((w, wIdx) => (
                <div
                  key={wIdx}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 tracking-wider">
                        PHASE {w.step}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5">
                      {w.title}
                    </h5>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                      {w.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center gap-2 text-xs">
                    <span className="font-semibold text-zinc-500 dark:text-zinc-400">
                      Deliverable:
                    </span>
                    <span className="font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded">
                      {w.deliverable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Samples & Real Case Previews */}
          <div>
            <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Demonstrated Project Samples & Benchmarks</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.samples.map((sample, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      {sample.category}
                    </span>
                    <h5 className="text-sm font-bold text-zinc-900 dark:text-white mt-1 mb-2">
                      {sample.title}
                    </h5>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                      {sample.description}
                    </p>
                  </div>
                  <div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 mb-3">
                      <div className="text-[10px] uppercase font-bold text-zinc-400">
                        Achieved Outcome
                      </div>
                      <div className="text-sm font-extrabold text-purple-600 dark:text-purple-400">
                        {sample.keyMetric}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sample.tags.map((tg, tgIdx) => (
                        <span
                          key={tgIdx}
                          className="px-2 py-0.5 rounded text-[10px] bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-700 dark:text-zinc-300 font-medium"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Ready to collaborate on {service.title}?
            </span>
            <div className="text-sm font-bold text-zinc-900 dark:text-white">
              Direct access to the co-founder leading this discipline.
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartProjectForService(service.title);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 cursor-pointer"
            >
              <span>Commission {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
