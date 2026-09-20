import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
  Layout,
  Compass,
  Globe,
  Smartphone,
  Gauge,
  FileCode2,
  PlayCircle,
  Image as ImageIcon,
  Feather,
  TrendingUp,
  BarChart2,
  FileSpreadsheet,
  Database,
  FileText,
  Target,
  Lightbulb,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ServiceCardData } from '../types';
import {
  UI_UX_SERVICES,
  DATA_ANALYTICS_SERVICES,
  SubServiceDetail,
  GOOGLE_FORM_URL
} from '../data/servicesDetailedData';
import { ServiceVisualPlaceholder } from './ServiceVisualPlaceholder';

interface ServicesProps {
  onExploreService?: (service: ServiceCardData) => void;
  onStartProject: (serviceType?: string) => void;
}

// Icon resolver helper for all 19 services
const renderServiceIcon = (iconName: string, className: string = 'w-5 h-5') => {
  switch (iconName) {
    case 'Layout':
      return <Layout className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    case 'FileCode2':
      return <FileCode2 className={className} />;
    case 'PlayCircle':
      return <PlayCircle className={className} />;
    case 'Image':
      return <ImageIcon className={className} />;
    case 'Feather':
      return <Feather className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'BarChart2':
      return <BarChart2 className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'Sparkles':
    default:
      return <Sparkles className={className} />;
  }
};

export const Services: React.FC<ServicesProps> = ({
  onStartProject
}) => {
  // Navigation states within the Services section:
  // activeCategory: null (main view) | 'ui-ux' | 'data-analytics'
  // activeServiceId: null | string (id of sub-service)
  const [activeCategory, setActiveCategory] = useState<'ui-ux' | 'data-analytics' | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  // Helper to scroll smoothly to top of services section when views switch
  const scrollToServicesTop = () => {
    const section = document.getElementById('services');
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenCategory = (category: 'ui-ux' | 'data-analytics') => {
    setActiveCategory(category);
    setActiveServiceId(null);
    scrollToServicesTop();
  };

  const handleOpenSubService = (serviceId: string) => {
    setActiveServiceId(serviceId);
    scrollToServicesTop();
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
    setActiveServiceId(null);
    scrollToServicesTop();
  };

  const handleBackToCurrentCategory = () => {
    setActiveServiceId(null);
    scrollToServicesTop();
  };

  // Connects to Google Form URL if configured, or falls back to intake modal
  const handleStartProjectClick = (serviceTitle: string) => {
    const trimmedUrl = typeof GOOGLE_FORM_URL === 'string' ? GOOGLE_FORM_URL.trim() : '';
    if (trimmedUrl.length > 0) {
      window.open(trimmedUrl, '_blank', 'noopener,noreferrer');
    } else {
      onStartProject(serviceTitle);
    }
  };

  // Find currently active service when in detail view
  const currentCategoryList = activeCategory === 'ui-ux' ? UI_UX_SERVICES : DATA_ANALYTICS_SERVICES;
  const currentService = activeServiceId
    ? currentCategoryList.find((s) => s.id === activeServiceId)
    : null;

  return (
    <section id="services" className="py-24 sm:py-32 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* LEVEL 1: MAIN TWO-CARD VIEW (UI/UX DESIGN & DATA ANALYTICS) */}
          {/* ========================================================================= */}
          {!activeCategory && (
            <motion.div
              key="main-services-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
                <span className="service-tag block mb-3">Our Offerings</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Services
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                  Two specialized pillars delivered with founder-level precision. Select a discipline to explore all individual services.
                </p>
              </div>

              {/* Two Main Cards: UI/UX Design & Data Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* 1. UI/UX DESIGN MAIN CARD */}
                <motion.div
                  id="main-card-ui-ux"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleOpenCategory('ui-ux')}
                  className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/60 shadow-xs hover:border-purple-500/60 dark:hover:border-purple-500/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                        <Palette className="w-7 h-7" />
                      </div>
                      <span className="service-tag">
                        10 Services Included
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      UI/UX Design
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
                      Digital Product & Visual Architecture
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      Bespoke user interfaces, interaction psychology, responsive web and mobile systems, and distinctive brand identities crafted for effortless conversion.
                    </p>

                    {/* Services Preview Grid */}
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2.5">
                        Key Services:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {UI_UX_SERVICES.slice(0, 6).map((srv) => (
                          <span
                            key={srv.id}
                            className="px-2.5 py-1 bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            {srv.title}
                          </span>
                        ))}
                        <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/50 rounded-lg text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                          +4 more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer / Action */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      id="start-project-btn-ui-ux"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartProjectClick('UI/UX Design');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 group/btn cursor-pointer"
                    >
                      <span>Start Project</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      type="button"
                      id="explore-services-ui-ux"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCategory('ui-ux');
                      }}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore 10 Services</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>

                {/* 2. DATA ANALYTICS MAIN CARD */}
                <motion.div
                  id="main-card-data-analytics"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleOpenCategory('data-analytics')}
                  className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/60 shadow-xs hover:border-purple-500/60 dark:hover:border-purple-500/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                        <BarChart3 className="w-7 h-7" />
                      </div>
                      <span className="service-tag">
                        9 Services Included
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Data Analytics
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
                      Business Intelligence & Decision Engines
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      Interactive Power BI and Excel dashboards, SQL database pipelines, real-time KPI scorecards, and predictive modeling that turn raw numbers into high-conviction growth.
                    </p>

                    {/* Services Preview Grid */}
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2.5">
                        Key Services:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {DATA_ANALYTICS_SERVICES.slice(0, 6).map((srv) => (
                          <span
                            key={srv.id}
                            className="px-2.5 py-1 bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            {srv.title}
                          </span>
                        ))}
                        <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/50 rounded-lg text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                          +3 more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer / Action */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      id="start-project-btn-data-analytics"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartProjectClick('Data Analytics');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 group/btn cursor-pointer"
                    >
                      <span>Start Project</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      type="button"
                      id="explore-services-data-analytics"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCategory('data-analytics');
                      }}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore 9 Services</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* LEVEL 2: DEDICATED CATEGORY VIEW (LIST OF 10 UI/UX OR 9 DATA ANALYTICS) */}
          {/* ========================================================================= */}
          {activeCategory && !activeServiceId && (
            <motion.div
              key={`category-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Category Breadcrumbs & Back Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleBackToCategories}
                  id="back-to-services-overview-btn"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-purple-600 dark:hover:text-purple-400 transition-all shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Services</span>
                </button>

                {/* Quick Toggle Switch Between UI/UX and Analytics */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCategory('ui-ux')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeCategory === 'ui-ux'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    UI/UX Design ({UI_UX_SERVICES.length})
                  </button>
                  <button
                    onClick={() => setActiveCategory('data-analytics')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeCategory === 'data-analytics'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Data Analytics ({DATA_ANALYTICS_SERVICES.length})
                  </button>
                </div>
              </div>

              {/* Category Title Banner */}
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="service-tag block mb-3">
                  {activeCategory === 'ui-ux' ? 'Creative & Product Strategy' : 'Business Intelligence & Modeling'}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {activeCategory === 'ui-ux' ? 'UI/UX Design Services' : 'Data Analytics Services'}
                </h2>
                <p className="mt-3 text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                  {activeCategory === 'ui-ux'
                    ? 'Explore our full spectrum of specialized UI/UX disciplines. Click any service card below for detailed scope, our 4-step craft process, key benefits, and project inquiry.'
                    : 'Explore our complete suite of quantitative intelligence disciplines. Click any service card below for detailed scope, our 4-step analytical process, key benefits, and project inquiry.'}
                </p>
              </div>

              {/* Grid of Individual Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {currentCategoryList.map((service, index) => (
                  <motion.div
                    key={service.id}
                    id={`subservice-card-${service.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    whileHover={{ y: -3 }}
                    onClick={() => handleOpenSubService(service.id)}
                    className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs hover:border-purple-500/60 dark:hover:border-purple-500/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Card Header: Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          {renderServiceIcon(service.iconName, 'w-5 h-5')}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                          {service.badge}
                        </span>
                      </div>

                      {/* Title & Short Description */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Bottom Link Action */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                      <span>View Details & Process</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Quick Return */}
              <div className="mt-12 text-center">
                <button
                  onClick={handleBackToCategories}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Main Services Overview</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* LEVEL 3: DETAILED EXPLANATION VIEW FOR A SINGLE SERVICE */}
          {/* ========================================================================= */}
          {activeCategory && activeServiceId && currentService && (
            <motion.div
              key={`detail-${currentService.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-w-7xl mx-auto"
            >
              {/* Navigation Bar / Breadcrumbs */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
                <button
                  id="back-to-category-services-btn"
                  onClick={handleBackToCurrentCategory}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-purple-600 dark:hover:text-purple-400 transition-all shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>
                    Back to {activeCategory === 'ui-ux' ? 'UI/UX' : 'Data Analytics'} Services
                  </span>
                </button>

                {/* Breadcrumb Path */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <button
                    onClick={handleBackToCategories}
                    className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Services
                  </button>
                  <span>/</span>
                  <button
                    onClick={handleBackToCurrentCategory}
                    className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {activeCategory === 'ui-ux' ? 'UI/UX Design' : 'Data Analytics'}
                  </button>
                  <span>/</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {currentService.title}
                  </span>
                </div>
              </div>

              {/* Main Split Layout: Left Content & Right Large Image Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* LEFT SIDE: Service title, description, details, process, benefits, and CTA */}
                <div className="lg:col-span-7 space-y-8 order-1">
                  {/* Service Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
                        {renderServiceIcon(currentService.iconName, 'w-6 h-6')}
                      </div>
                      <div>
                        <span className="service-tag">{currentService.badge}</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                          {currentService.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-2">
                      {currentService.shortDescription}
                    </p>
                  </div>

                  {/* 1. What It Is */}
                  <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-2">
                      Overview
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                      What is {currentService.title}?
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentService.whatItIs}
                    </p>
                  </div>

                  {/* 2. What We Provide */}
                  <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-2">
                      Deliverables
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                      What We Provide
                    </h3>
                    <ul className="space-y-3">
                      {currentService.whatWeProvide.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. Key Benefits */}
                  <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-2">
                      Commercial Value
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {currentService.benefits.map((benefit, bIdx) => (
                        <div
                          key={bIdx}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between"
                        >
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                            {benefit.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Process Section */}
                  <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-2">
                      Execution Framework
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                      Our {activeCategory === 'ui-ux' ? 'Design' : 'Analytics'} Process
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentService.process.map((step) => (
                        <div
                          key={step.step}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                                {step.step}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                                Phase 0{step.step}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                              {step.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                              {step.description}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                            <span className="text-slate-400 font-medium">Deliverable: </span>
                            <span className="font-semibold text-purple-600 dark:text-purple-400">
                              {step.deliverable}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. Start a Project CTA Section */}
                  <div className="rounded-3xl p-6 sm:p-8 bg-black text-white border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="max-w-md">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 block mb-1">
                        Ready to Build
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        Start Your {currentService.title} Project
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                        Collaborate directly with Sanjay & Vinjitha. Tailored scopes, precise milestones, and founder-level delivery.
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2">
                        {GOOGLE_FORM_URL ? 'Connected to official Google Form.' : 'Click below to submit your project requirements directly.'}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                      <button
                        id="start-project-service-cta-btn"
                        onClick={() => handleStartProjectClick(currentService.title)}
                        className="px-6 py-3.5 rounded-2xl text-xs font-bold bg-white text-black hover:bg-zinc-100 hover:ring-2 hover:ring-purple-500/40 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Start a Project</span>
                        <ExternalLink className="w-4 h-4 text-purple-600" />
                      </button>

                      <button
                        onClick={handleBackToCurrentCategory}
                        className="px-4 py-3.5 rounded-2xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-zinc-900 border border-zinc-700/80 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: Large rectangular image/visual placeholder */}
                <div className="lg:col-span-5 order-2 lg:sticky lg:top-24">
                  <ServiceVisualPlaceholder service={currentService} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
