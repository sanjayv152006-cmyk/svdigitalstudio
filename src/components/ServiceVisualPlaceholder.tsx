import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Monitor,
  Smartphone,
  Layout,
  Layers,
  Sparkles,
  BarChart3,
  PieChart,
  Table,
  Database,
  FileSpreadsheet,
  FileText,
  Activity,
  Code2,
  Workflow,
  Compass,
  Palette,
  TrendingUp,
  CheckCircle2,
  Filter,
  Check,
  RefreshCw,
  Eye
} from 'lucide-react';
import { SubServiceDetail } from '../data/servicesDetailedData';

interface ServiceVisualPlaceholderProps {
  service: SubServiceDetail;
}

export const ServiceVisualPlaceholder: React.FC<ServiceVisualPlaceholderProps> = ({ service }) => {
  const { id, title, badge, categoryId, imageUrl } = service;
  const isUIUX = categoryId === 'ui-ux';
  const [localImage, setLocalImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const displayImage = localImage || imageUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLocalImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getServicePlaceholderLabel = (serviceId: string): { title: string; subtitle: string; icon: React.ReactNode } => {
    switch (serviceId) {
      // UI/UX Services
      case 'ui-design':
        return {
          title: 'UI Design – Interface Showcase Image',
          subtitle: 'Realistic Website & App Interface Showcase with Component Library',
          icon: <Layout className="w-4 h-4 text-purple-500" />
        };
      case 'ux-design':
        return {
          title: 'UX Design – UX Research & User-Flow Workspace',
          subtitle: 'Realistic User Journey, Persona Architecture & Wireflow Canvas',
          icon: <Workflow className="w-4 h-4 text-indigo-500" />
        };
      case 'website-design':
        return {
          title: 'Website Design – Project Showcase Image',
          subtitle: 'Realistic Modern Website Screen on Desktop & Laptop Chrome',
          icon: <Monitor className="w-4 h-4 text-cyan-500" />
        };
      case 'mobile-app-design':
        return {
          title: 'Mobile App Design – Mobile UI Showcase Image',
          subtitle: 'Realistic iOS & Android Mobile UI Shown on Modern Smartphones',
          icon: <Smartphone className="w-4 h-4 text-emerald-500" />
        };
      case 'landing-page-design':
        return {
          title: 'Landing Page Design – High-Converting Landing Page',
          subtitle: 'Realistic Conversion-Optimized Desktop Screen with Sticky Hero & CTAs',
          icon: <Monitor className="w-4 h-4 text-amber-500" />
        };
      case 'dashboard-design':
        return {
          title: 'Dashboard Design – Professional Dashboard Interface',
          subtitle: 'Realistic SaaS Analytics, KPI Cockpit & Real-Time Data Tables',
          icon: <Activity className="w-4 h-4 text-violet-500" />
        };
      case 'wireframing':
        return {
          title: 'Wireframing – Interface Planning Workspace',
          subtitle: 'Realistic Low-Fidelity Wireframe & Architectural Blueprint Canvas',
          icon: <Layers className="w-4 h-4 text-slate-500" />
        };
      case 'prototyping':
        return {
          title: 'Prototyping – Interactive Prototype Workspace',
          subtitle: 'Realistic Interactive Prototyping Canvas with Logic & Screen Links',
          icon: <Compass className="w-4 h-4 text-pink-500" />
        };
      case 'graphic-design':
        return {
          title: 'Graphic Design – Poster & Brand Collateral Workspace',
          subtitle: 'Realistic Graphic Artboard, Marketing Assets & Print Collateral',
          icon: <Palette className="w-4 h-4 text-orange-500" />
        };
      case 'logo-brand-identity':
        return {
          title: 'Logo & Brand Identity – Brand Identity Presentation',
          subtitle: 'Realistic Brand Manual with Vector Marks, Palette & Typography',
          icon: <Sparkles className="w-4 h-4 text-rose-500" />
        };

      // Data Analytics Services
      case 'data-analysis':
        return {
          title: 'Data Analysis – Professional Data Analysis Workspace',
          subtitle: 'Realistic Statistical Analysis, Distribution Models & Data Memos',
          icon: <TrendingUp className="w-4 h-4 text-purple-500" />
        };
      case 'data-visualization':
        return {
          title: 'Data Visualization – Visual Analytics & Dynamic Charts',
          subtitle: 'Realistic Multi-Series Area Charts, Radial Gauges & Legend Trees',
          icon: <PieChart className="w-4 h-4 text-emerald-500" />
        };
      case 'power-bi-dashboards':
        return {
          title: 'Power BI Dashboard – Dashboard Screenshot',
          subtitle: 'Realistic Power BI Business Intelligence Canvas with DAX Slicers',
          icon: <BarChart3 className="w-4 h-4 text-amber-500" />
        };
      case 'excel-dashboards':
        return {
          title: 'Excel Dashboard – Excel-Based Dashboard Screenshot',
          subtitle: 'Realistic Excel Financial Dashboard with Formulas, Pivots & KPI Cards',
          icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
        };
      case 'sql-data-analysis':
        return {
          title: 'SQL Data Analysis – SQL / Database Analytics Workspace',
          subtitle: 'Realistic SQL Query Editor with Schema Tree & Relational Data Grid',
          icon: <Database className="w-4 h-4 text-purple-600" />
        };
      case 'business-reports':
        return {
          title: 'Business Reports – Business Report & Executive Screen',
          subtitle: 'Realistic Executive PDF Brief with Financial Breakdown & Variance',
          icon: <FileText className="w-4 h-4 text-indigo-500" />
        };
      case 'kpi-dashboards':
        return {
          title: 'KPI Dashboards – Real-Time KPI & Metrics Dashboard',
          subtitle: 'Realistic Executive KPI Monitoring Cockpit with Target Gauges',
          icon: <Activity className="w-4 h-4 text-violet-500" />
        };
      case 'data-cleaning':
        return {
          title: 'Data Cleaning – Data Preparation & Cleaning Workspace',
          subtitle: 'Realistic ETL Pipeline, Schema Validation & Null Resolution Studio',
          icon: <Filter className="w-4 h-4 text-teal-500" />
        };
      case 'business-insights':
        return {
          title: 'Business Insights – Strategic Insights & Analytics Dashboard',
          subtitle: 'Realistic Intelligence Cockpit with Growth Drivers & Impact Waterfall',
          icon: <TrendingUp className="w-4 h-4 text-cyan-500" />
        };

      default:
        return {
          title: `${title} – Project Showcase Image`,
          subtitle: 'High-Resolution Project Preview & Case Study Showcase',
          icon: <ImageIcon className="w-4 h-4 text-purple-500" />
        };
    }
  };

  const labelInfo = getServicePlaceholderLabel(id);

  // Renders the customized realistic mockup for each specific service
  const renderServiceMockup = () => {
    switch (id) {
      // 1. UI DESIGN - Component Library & Design System Showcase
      case 'ui-design':
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">Design System // Core_UI_Tokens</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-400 font-mono">v3.2 Spec</span>
            </div>

            {/* Design System Elements Grid */}
            <div className="grid grid-cols-2 gap-3 py-3">
              {/* Button Variant Showcase */}
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 flex flex-col gap-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Buttons & States</span>
                <div className="flex flex-col gap-1.5">
                  <div className="px-3 py-1.5 rounded-md bg-purple-600 text-white font-semibold text-[11px] flex items-center justify-between shadow-xs">
                    <span>Primary Action</span>
                    <span className="text-[9px] bg-purple-500 px-1 rounded">Hover</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-md bg-slate-700/80 text-slate-200 font-medium text-[11px] flex items-center justify-between">
                    <span>Secondary Action</span>
                    <span className="text-[9px] text-slate-400">Default</span>
                  </div>
                </div>
              </div>

              {/* Form Input Component */}
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 flex flex-col gap-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Form Inputs</span>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-300">Email Address</span>
                  <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-purple-500/70 text-slate-200 text-[10px] flex items-center justify-between">
                    <span>alex@studio.design</span>
                    <span className="w-1.5 h-3 bg-purple-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card & Tokens Bar */}
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                  SV
                </div>
                <div>
                  <div className="font-semibold text-slate-200 text-[11px]">Dynamic Card Surface</div>
                  <div className="text-[10px] text-slate-400">Elevation 02 • Radius 16px • 60fps Micro-interactions</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-indigo-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
        );

      // 2. UX DESIGN - Research, Persona & User Journey Flow
      case 'ux-design':
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-[11px] text-slate-200">User Flow & Journey Mapping</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Conversion Flow</span>
            </div>

            {/* Visual Node Flow Diagram */}
            <div className="py-4 flex items-center justify-between gap-2 overflow-x-hidden">
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-center flex-1">
                <div className="text-[9px] text-slate-400 font-mono">STEP 01</div>
                <div className="text-[11px] font-bold text-slate-200 mt-0.5">Landing</div>
                <div className="text-[9px] text-emerald-400 mt-1">100% Traffic</div>
              </div>
              <div className="text-slate-500 font-bold">→</div>
              <div className="p-2.5 rounded-lg bg-indigo-950/70 border border-indigo-700/80 text-center flex-1 shadow-sm">
                <div className="text-[9px] text-indigo-300 font-mono">DECISION</div>
                <div className="text-[11px] font-bold text-indigo-200 mt-0.5">Value Pitch</div>
                <div className="text-[9px] text-indigo-300 mt-1">Friction Audit</div>
              </div>
              <div className="text-slate-500 font-bold">→</div>
              <div className="p-2.5 rounded-lg bg-purple-900/60 border border-purple-600/70 text-center flex-1">
                <div className="text-[9px] text-purple-300 font-mono">GOAL</div>
                <div className="text-[11px] font-bold text-white mt-0.5">Activation</div>
                <div className="text-[9px] text-emerald-300 font-semibold mt-1">+38% Lift</div>
              </div>
            </div>

            {/* Persona & Empathy Card */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                  UX
                </div>
                <div>
                  <div className="font-bold text-slate-200 text-[11px]">Primary Persona: Tech Buyer</div>
                  <div className="text-[10px] text-slate-400">Low cognitive load • 3-step checkout • Zero ambiguity</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded">Validated</span>
            </div>
          </div>
        );

      // 3. WEBSITE DESIGN - Modern Laptop / Desktop Web Experience
      case 'website-design':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            {/* Browser Header */}
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-xs mx-auto py-1 px-3 rounded-md bg-slate-800 text-[10px] text-slate-300 font-mono text-center truncate">
                https://svdigitalstudio.com/work/enterprise
              </div>
            </div>

            {/* Website Mock Surface */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/70 my-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 text-[12px] tracking-tight">SV STUDIO</span>
                <div className="flex gap-2 text-[9px] text-slate-400">
                  <span>Work</span>
                  <span>Services</span>
                  <span>About</span>
                  <span className="text-purple-400 font-semibold">Contact</span>
                </div>
              </div>

              <div className="py-3 text-center">
                <span className="text-[9px] uppercase tracking-widest text-purple-400 font-bold">Award-Winning Digital Product</span>
                <div className="text-sm font-extrabold text-white mt-0.5">High-Performance Web Architecture</div>
                <div className="text-[10px] text-slate-300 mt-1 max-w-xs mx-auto">
                  Engineered with sub-second page loads, fluid responsive typography, and high-conversion UX.
                </div>
              </div>

              <div className="flex justify-center gap-2 pt-1">
                <span className="px-3 py-1 rounded bg-purple-600 text-white font-bold text-[10px]">Explore Case Studies</span>
                <span className="px-3 py-1 rounded bg-slate-700 text-slate-300 font-medium text-[10px]">Watch Demo</span>
              </div>
            </div>

            {/* Bottom 3 Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-slate-800/70 border border-slate-700 text-center">
                <div className="text-[9px] text-slate-400">Performance</div>
                <div className="font-bold text-emerald-400 text-[11px]">99/100</div>
              </div>
              <div className="p-2 rounded bg-slate-800/70 border border-slate-700 text-center">
                <div className="text-[9px] text-slate-400">Responsiveness</div>
                <div className="font-bold text-purple-400 text-[11px]">Fluid All Viewports</div>
              </div>
              <div className="p-2 rounded bg-slate-800/70 border border-slate-700 text-center">
                <div className="text-[9px] text-slate-400">SEO Score</div>
                <div className="font-bold text-amber-400 text-[11px]">100% Indexed</div>
              </div>
            </div>
          </div>
        );

      // 4. MOBILE APP DESIGN - Smartphone UI Showcase
      case 'mobile-app-design':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-[11px] text-slate-200">iOS & Android Screen Mockups</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">60 FPS Native</span>
            </div>

            {/* Dual Smartphone Viewports */}
            <div className="grid grid-cols-2 gap-3 py-2 flex-1">
              {/* Phone 1: Wallet Dashboard */}
              <div className="rounded-xl bg-slate-950 border-2 border-slate-700/80 p-2.5 flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono mb-1.5">
                    <span>9:41</span>
                    <span className="w-3 h-1.5 bg-slate-500 rounded-sm" />
                  </div>
                  <div className="text-[9px] text-slate-400">Account Balance</div>
                  <div className="text-xs font-bold text-white">$14,850.20</div>
                  <div className="text-[8px] text-emerald-400 font-medium mt-0.5">+14.2% this month</div>
                </div>

                <div className="my-2 p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-[8px] text-white font-mono">
                  <div>SV Black Card</div>
                  <div className="mt-1">•••• 8824</div>
                </div>

                <div className="flex justify-around py-1 border-t border-slate-800 text-[8px] text-slate-400">
                  <span className="text-purple-400 font-bold">Home</span>
                  <span>Cards</span>
                  <span>Activity</span>
                </div>
              </div>

              {/* Phone 2: Transactions & Feed */}
              <div className="rounded-xl bg-slate-950 border-2 border-slate-700/80 p-2.5 flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono mb-1.5">
                    <span>9:41</span>
                    <span className="w-3 h-1.5 bg-slate-500 rounded-sm" />
                  </div>
                  <div className="text-[9px] font-bold text-slate-200 mb-1.5">Recent Activity</div>
                  <div className="space-y-1">
                    <div className="p-1 rounded bg-slate-800/90 flex justify-between items-center text-[8px]">
                      <span className="text-slate-200">Stripe Payout</span>
                      <span className="text-emerald-400 font-semibold">+$2,400</span>
                    </div>
                    <div className="p-1 rounded bg-slate-800/90 flex justify-between items-center text-[8px]">
                      <span className="text-slate-200">Figma Sub</span>
                      <span className="text-slate-400">-$45</span>
                    </div>
                    <div className="p-1 rounded bg-slate-800/90 flex justify-between items-center text-[8px]">
                      <span className="text-slate-200">AWS Cloud</span>
                      <span className="text-slate-400">-$120</span>
                    </div>
                  </div>
                </div>

                <div className="p-1.5 rounded-md bg-emerald-600 text-center text-white text-[8px] font-bold mt-2">
                  Send Payment
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Designed for touch gestures • iOS Human Interface & Android Material You
            </div>
          </div>
        );

      // 5. LANDING PAGE DESIGN - High-Converting Landing Page
      case 'landing-page-design':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-[11px] text-slate-200">High-Conversion Landing Page</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Conversion Focused</span>
            </div>

            {/* Landing Page Mock Canvas */}
            <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-col gap-2.5 my-2">
              <div className="flex items-center justify-between text-[10px]">
                <div className="font-bold text-white">SaaS Flow</div>
                <div className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-[9px]">
                  ⭐ 4.9/5 by 1,200+ Founders
                </div>
              </div>

              <div className="text-center py-2">
                <h4 className="text-sm font-extrabold text-white">Turn Clicks Into Loyal Enterprise Customers</h4>
                <p className="text-[10px] text-slate-300 mt-1 max-w-xs mx-auto">
                  A proven visual hierarchy that cuts through hesitation and accelerates signups with zero fluff.
                </p>
              </div>

              {/* Conversion Form Box */}
              <div className="p-2.5 rounded-md bg-slate-900/90 border border-slate-700 flex gap-1.5">
                <input
                  type="text"
                  readOnly
                  value="founder@growthcompany.com"
                  className="flex-1 bg-transparent px-2 text-[10px] text-slate-300 outline-none"
                />
                <span className="px-3 py-1 rounded bg-purple-600 text-white font-bold text-[10px] shadow-sm">
                  Start Free Trial
                </span>
              </div>
            </div>

            {/* Social Proof Metric Strip */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-slate-800/60 border border-slate-700/70 text-center">
                <div className="font-bold text-emerald-400 text-[11px]">3.8x</div>
                <div className="text-[8px] text-slate-400">Conversion Rate</div>
              </div>
              <div className="p-2 rounded bg-slate-800/60 border border-slate-700/70 text-center">
                <div className="font-bold text-purple-400 text-[11px]">&lt; 0.8s</div>
                <div className="text-[8px] text-slate-400">Load Speed</div>
              </div>
              <div className="p-2 rounded bg-slate-800/60 border border-slate-700/70 text-center">
                <div className="font-bold text-amber-400 text-[11px]">-42%</div>
                <div className="text-[8px] text-slate-400">Bounce Rate</div>
              </div>
            </div>
          </div>
        );

      // 6. DASHBOARD DESIGN - Professional Dashboard Interface
      case 'dashboard-design':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-violet-400" />
                <span className="font-bold text-[11px] text-slate-200">SaaS Command Center</span>
              </div>
              <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">Real-Time Metrics</span>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2 rounded-lg bg-slate-800/90 border border-slate-700">
                <div className="text-[8px] text-slate-400">Monthly ARR</div>
                <div className="font-bold text-white text-[11px] mt-0.5">$84,200</div>
                <div className="text-[8px] text-emerald-400">+22.4% MoM</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/90 border border-slate-700">
                <div className="text-[8px] text-slate-400">Active Seats</div>
                <div className="font-bold text-white text-[11px] mt-0.5">3,490</div>
                <div className="text-[8px] text-purple-400">99.4% SLA</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/90 border border-slate-700">
                <div className="text-[8px] text-slate-400">Net Churn</div>
                <div className="font-bold text-emerald-400 text-[11px] mt-0.5">0.42%</div>
                <div className="text-[8px] text-emerald-400">Industry Top 5%</div>
              </div>
            </div>

            {/* Graphic Chart Area */}
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 flex flex-col gap-1.5 flex-1 justify-center">
              <div className="flex justify-between items-center text-[9px]">
                <span className="font-semibold text-slate-300">Revenue Velocity & Cohort Retention</span>
                <span className="text-slate-400 font-mono">Jan - Dec 2026</span>
              </div>
              {/* Simulated Chart Bars */}
              <div className="flex items-end justify-between h-16 gap-1 px-1 pt-2">
                {[35, 45, 40, 60, 55, 75, 70, 85, 90, 80, 95, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      style={{ height: `${h}%` }}
                      className="w-full rounded-t bg-gradient-to-t from-violet-600 to-purple-500 opacity-90"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Table Row Preview */}
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-between text-[9px] mt-2">
              <span className="font-medium text-slate-200">Enterprise Tenant // Stripe API Webhook</span>
              <span className="text-emerald-400 font-mono font-semibold">● 200 OK • 18ms</span>
            </div>
          </div>
        );

      // 7. WIREFRAMING - Interface Planning & Architectural Blueprints
      case 'wireframing':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-[11px] text-slate-200">Wireframe & Structural Blueprint</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Low-Fidelity</span>
            </div>

            {/* Blueprint Grid Canvas */}
            <div className="p-3 rounded-lg border-2 border-dashed border-slate-700 bg-slate-950/80 my-2 flex flex-col gap-2 relative">
              {/* Wireframe Navigation Bar */}
              <div className="h-6 rounded border border-slate-700 bg-slate-800/60 flex items-center justify-between px-2 text-[9px] text-slate-400">
                <div className="w-12 h-2.5 bg-slate-600 rounded-xs" />
                <div className="flex gap-2">
                  <div className="w-8 h-2 bg-slate-700 rounded-xs" />
                  <div className="w-8 h-2 bg-slate-700 rounded-xs" />
                  <div className="w-10 h-3 bg-purple-500/50 rounded-xs" />
                </div>
              </div>

              {/* Wireframe Hero with Box Placeholder [X] */}
              <div className="grid grid-cols-2 gap-2 my-1">
                <div className="space-y-1.5 py-1">
                  <div className="w-full h-3 bg-slate-600 rounded-xs" />
                  <div className="w-3/4 h-3 bg-slate-600 rounded-xs" />
                  <div className="w-full h-1.5 bg-slate-700 rounded-xs" />
                  <div className="w-4/5 h-1.5 bg-slate-700 rounded-xs" />
                  <div className="w-16 h-4 bg-slate-500 rounded-xs mt-1" />
                </div>
                {/* Image Placeholder Box with Diagonal Cross [X] */}
                <div className="border border-slate-700 bg-slate-900/90 rounded flex items-center justify-center relative min-h-[56px] text-slate-600 font-mono text-[9px]">
                  <span>[ Image Area ]</span>
                </div>
              </div>

              {/* Wireframe 3 Columns */}
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-10 border border-slate-700 bg-slate-900/60 rounded p-1 space-y-1">
                  <div className="w-full h-1.5 bg-slate-700 rounded-xs" />
                  <div className="w-2/3 h-1.5 bg-slate-800 rounded-xs" />
                </div>
                <div className="h-10 border border-slate-700 bg-slate-900/60 rounded p-1 space-y-1">
                  <div className="w-full h-1.5 bg-slate-700 rounded-xs" />
                  <div className="w-2/3 h-1.5 bg-slate-800 rounded-xs" />
                </div>
                <div className="h-10 border border-slate-700 bg-slate-900/60 rounded p-1 space-y-1">
                  <div className="w-full h-1.5 bg-slate-700 rounded-xs" />
                  <div className="w-2/3 h-1.5 bg-slate-800 rounded-xs" />
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Structural layout validation • Hierarchy planning before high-fidelity visual design
            </div>
          </div>
        );

      // 8. PROTOTYPING - Interactive Prototype Workspace
      case 'prototyping':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-[11px] text-slate-200">Interactive Prototyping Canvas</span>
              </div>
              <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">Figma Interactive</span>
            </div>

            {/* Connected Frames with Logic Wires */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 my-2 relative">
              {/* Artboard 1 */}
              <div className="p-2.5 rounded-lg bg-slate-800 border-2 border-purple-500/80 flex-1 text-center">
                <div className="text-[9px] text-purple-400 font-bold mb-1">Frame A (Trigger)</div>
                <div className="px-2 py-1 rounded bg-purple-600 text-white text-[9px] font-semibold">
                  On Tap 👆
                </div>
              </div>

              {/* Blue Connecting Node Line */}
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-pink-400 font-mono">Smart Animate</span>
                <span className="text-pink-400 font-bold">════►</span>
                <span className="text-[8px] text-slate-400 font-mono">300ms Ease</span>
              </div>

              {/* Artboard 2 */}
              <div className="p-2.5 rounded-lg bg-slate-800 border-2 border-pink-500/80 flex-1 text-center">
                <div className="text-[9px] text-pink-400 font-bold mb-1">Frame B (Destination)</div>
                <div className="px-2 py-1 rounded bg-pink-600 text-white text-[9px] font-semibold">
                  Modal Open ✨
                </div>
              </div>
            </div>

            {/* Prototype Settings Inspection Bar */}
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-between text-[9px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Micro-interactions, Page Swipes, Kinetic Curves Validated</span>
              </div>
              <span className="font-mono text-purple-400 font-semibold">Ready to Test</span>
            </div>
          </div>
        );

      // 9. GRAPHIC DESIGN - Posters, Brand Assets & Collateral
      case 'graphic-design':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-[11px] text-slate-200">Graphic Asset & Artboard Suite</span>
              </div>
              <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">Print & Digital</span>
            </div>

            {/* Poster & Composition Layout */}
            <div className="p-3 rounded-lg bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/40 border border-slate-800 my-2 flex flex-col justify-between h-36">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded">
                  CMYK • 300 DPI
                </span>
                <span className="text-[9px] text-slate-400 font-mono">A4 / Social Creative</span>
              </div>

              <div>
                <div className="text-xs font-bold text-white tracking-wider uppercase">Editorial Visual Narrative</div>
                <div className="text-[9px] text-slate-300">Precision Typography • Golden Ratio Layout Guides</div>
              </div>

              {/* Color swatch palette strip */}
              <div className="flex gap-1.5 pt-2 border-t border-slate-800">
                <div className="w-5 h-4 rounded bg-[#0F172A] border border-slate-700" title="#0F172A" />
                <div className="w-5 h-4 rounded bg-[#F97316]" title="#F97316" />
                <div className="w-5 h-4 rounded bg-[#2563EB]" title="#2563EB" />
                <div className="w-5 h-4 rounded bg-[#F8FAFC]" title="#F8FAFC" />
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Marketing decks • Social visual banners • Vector campaign collateral
            </div>
          </div>
        );

      // 10. LOGO & BRAND IDENTITY - Brand Presentation & Construction Guides
      case 'logo-brand-identity':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="font-bold text-[11px] text-slate-200">Brand Identity Guidelines</span>
              </div>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">Master Identity</span>
            </div>

            {/* Identity Showcase Grid */}
            <div className="grid grid-cols-2 gap-2.5 my-2">
              {/* Primary Mark Card */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 flex items-center justify-center font-extrabold text-white text-base shadow-md mb-2">
                  SV
                </div>
                <div className="font-bold text-white text-[11px]">Primary Emblem</div>
                <div className="text-[8px] text-slate-400 font-mono">Construction Grid 1.618</div>
              </div>

              {/* Color System Card */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div className="text-[9px] font-bold text-slate-300 uppercase">Core Palette</div>
                <div className="space-y-1 text-[8px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Deep Space</span>
                    <span className="text-purple-400">#0F172A</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Electric Purple</span>
                    <span className="text-purple-400">#9333EA</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Signal Rose</span>
                    <span className="text-rose-400">#F43F5E</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Specimen */}
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-between text-[9px]">
              <div>
                <span className="font-bold text-white">Typography: </span>
                <span className="text-slate-300">Plus Jakarta Sans & Space Grotesk</span>
              </div>
              <span className="text-rose-400 font-mono">Aa Bb Gg 123</span>
            </div>
          </div>
        );

      // 11. DATA ANALYSIS - Statistical Analysis Workspace
      case 'data-analysis':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-[11px] text-slate-200">Exploratory Data Analysis Notebook</span>
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Python // Pandas</span>
            </div>

            {/* Code Cell */}
            <div className="p-2 rounded bg-slate-950 font-mono text-[9px] text-slate-300 border border-slate-800 my-1">
              <span className="text-purple-400">In [14]:</span> df.groupby(<span className="text-emerald-400">'cohort'</span>)[<span className="text-emerald-400">'ltv'</span>].agg([<span className="text-amber-400">'mean'</span>, <span className="text-amber-400">'median'</span>, <span className="text-amber-400">'std'</span>])
            </div>

            {/* Statistical Output Table */}
            <div className="p-2 rounded bg-slate-800/90 border border-slate-700 overflow-x-hidden my-1">
              <div className="grid grid-cols-4 text-[9px] font-bold text-slate-300 pb-1 border-b border-slate-700 text-center">
                <span>Cohort</span>
                <span>Mean LTV</span>
                <span>Median</span>
                <span>Retention</span>
              </div>
              <div className="space-y-1 pt-1 text-[9px] font-mono text-center">
                <div className="grid grid-cols-4 text-slate-300">
                  <span className="text-purple-400">Q1_Enterprise</span>
                  <span>$18,420</span>
                  <span>$16,500</span>
                  <span className="text-emerald-400">92.4%</span>
                </div>
                <div className="grid grid-cols-4 text-slate-300">
                  <span className="text-purple-400">Q2_Growth</span>
                  <span>$8,940</span>
                  <span>$7,800</span>
                  <span className="text-emerald-400">84.1%</span>
                </div>
              </div>
            </div>

            {/* Analytical Memo Footnote */}
            <div className="p-2 rounded bg-slate-800/60 border border-slate-700/70 text-[9px] text-slate-300 flex items-center justify-between">
              <span>Statistical Significance: p-value &lt; 0.001 (High Confidence)</span>
              <span className="text-emerald-400 font-bold">Validated</span>
            </div>
          </div>
        );

      // 12. DATA VISUALIZATION - Charts & Multi-Series Visual Analytics
      case 'data-visualization':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-[11px] text-slate-200">Interactive Visual Analytics</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Multi-Chart Suite</span>
            </div>

            {/* Split Chart Area */}
            <div className="grid grid-cols-2 gap-2.5 my-2">
              {/* Donut Chart Simulation */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-purple-500 border-r-amber-400 flex items-center justify-center font-bold text-xs text-white">
                  68%
                </div>
                <div className="text-[8px] text-slate-400 mt-2 font-mono">Revenue Distribution</div>
              </div>

              {/* Stacked Bars */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div className="text-[9px] font-bold text-slate-300">Category Share</div>
                <div className="space-y-1 text-[8px]">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>Enterprise</span>
                      <span className="text-emerald-400">54%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded"><div className="w-[54%] h-full bg-emerald-500 rounded" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>Mid-Market</span>
                      <span className="text-purple-400">32%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded"><div className="w-[32%] h-full bg-purple-500 rounded" /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-between text-[9px]">
              <span className="text-slate-300">Export formats: Interactive Web Embed, High-Res SVG, PDF</span>
              <span className="text-emerald-400 font-mono">Ready</span>
            </div>
          </div>
        );

      // 13. POWER BI DASHBOARDS - Power BI Business Dashboard Screenshot
      case 'power-bi-dashboards':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            {/* Power BI Ribbon */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-xs flex items-center justify-center font-bold text-[8px] text-black">
                  P
                </div>
                <span className="font-bold text-[11px] text-slate-200">Power BI Desktop // Enterprise Sales</span>
              </div>
              <div className="flex gap-2 text-[9px] text-slate-400 font-mono">
                <span className="text-amber-400 font-bold">Home</span>
                <span>Modeling</span>
                <span>View</span>
              </div>
            </div>

            {/* Power BI Workspace */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 my-2 flex flex-col gap-2">
              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-1.5 rounded bg-slate-800/90 border border-slate-700 text-center">
                  <div className="text-[8px] text-slate-400">Total Revenue</div>
                  <div className="font-bold text-amber-400 text-[11px]">$2.48M</div>
                </div>
                <div className="p-1.5 rounded bg-slate-800/90 border border-slate-700 text-center">
                  <div className="text-[8px] text-slate-400">Units Sold</div>
                  <div className="font-bold text-white text-[11px]">48.2K</div>
                </div>
                <div className="p-1.5 rounded bg-slate-800/90 border border-slate-700 text-center">
                  <div className="text-[8px] text-slate-400">Margin %</div>
                  <div className="font-bold text-emerald-400 text-[11px]">34.6%</div>
                </div>
              </div>

              {/* Slicers & Visual Area */}
              <div className="flex justify-between items-center p-2 rounded bg-slate-800/60 border border-slate-700 text-[9px]">
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Region: North America</span>
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">Fiscal: 2026</span>
                </div>
                <span className="text-slate-400 font-mono">DAX Measures Active</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              DirectQuery SQL connected • Automated Power BI Service gateway refresh
            </div>
          </div>
        );

      // 14. EXCEL DASHBOARDS - Excel-Based Financial & Sales Dashboard
      case 'excel-dashboards':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            {/* Excel Green Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-emerald-600 rounded-xs flex items-center justify-center font-bold text-[8px] text-white">
                  X
                </div>
                <span className="font-bold text-[11px] text-slate-200">Financial_Model_v4.xlsx</span>
              </div>
              <div className="flex gap-2 text-[9px] text-slate-400 font-mono">
                <span className="text-emerald-400 font-semibold">Formulas</span>
                <span>Data</span>
                <span>Review</span>
              </div>
            </div>

            {/* Formula Bar */}
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800 font-mono text-[9px] text-slate-300 flex items-center gap-2">
              <span className="text-emerald-500 font-bold">fx</span>
              <span className="text-slate-200">=SUMIFS(Sales[Net_Rev], Sales[Quarter], "Q4", Sales[Status], "Closed")</span>
            </div>

            {/* Spreadsheet Table Preview */}
            <div className="p-2 rounded bg-slate-800/90 border border-slate-700 my-1 overflow-x-hidden">
              <div className="grid grid-cols-4 text-[9px] font-bold text-slate-300 pb-1 border-b border-slate-700 text-center">
                <span>Month</span>
                <span>Actual</span>
                <span>Budget</span>
                <span>Variance</span>
              </div>
              <div className="space-y-1 pt-1 text-[9px] font-mono text-center">
                <div className="grid grid-cols-4 text-slate-300">
                  <span className="text-slate-400">October</span>
                  <span className="text-white">$142,000</span>
                  <span className="text-slate-400">$130,000</span>
                  <span className="text-emerald-400">+9.2%</span>
                </div>
                <div className="grid grid-cols-4 text-slate-300">
                  <span className="text-slate-400">November</span>
                  <span className="text-white">$158,400</span>
                  <span className="text-slate-400">$145,000</span>
                  <span className="text-emerald-400">+9.2%</span>
                </div>
              </div>
            </div>

            {/* Excel Sheet Tabs */}
            <div className="flex gap-1 pt-1 border-t border-slate-800 text-[8px] font-mono">
              <span className="px-2 py-0.5 bg-emerald-600/30 text-emerald-300 rounded-t font-semibold">KPI Summary</span>
              <span className="px-2 py-0.5 text-slate-400">P&L Forecast</span>
              <span className="px-2 py-0.5 text-slate-400">Pivot_Sales</span>
              <span className="px-2 py-0.5 text-slate-400">RawData</span>
            </div>
          </div>
        );

      // 15. SQL DATA ANALYSIS - SQL & Database Analytics Workspace
      case 'sql-data-analysis':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-[11px] text-slate-200">PostgreSQL Query Console</span>
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">⚡ 142ms Query</span>
            </div>

            {/* SQL Code Block */}
            <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-[9px] text-slate-300 border border-slate-800 my-1 leading-relaxed">
              <span className="text-purple-400 font-bold">SELECT</span> customer_segment,
              <br />
              &nbsp;&nbsp;<span className="text-emerald-400">COUNT</span>(DISTINCT user_id) <span className="text-purple-400">AS</span> active_accounts,
              <br />
              &nbsp;&nbsp;<span className="text-emerald-400">SUM</span>(order_value) <span className="text-purple-400">AS</span> total_ltv
              <br />
              <span className="text-purple-400 font-bold">FROM</span> analytics_warehouse.orders
              <br />
              <span className="text-purple-400 font-bold">WHERE</span> payment_status = <span className="text-amber-400">'settled'</span>
              <br />
              <span className="text-purple-400 font-bold">GROUP BY</span> 1 <span className="text-purple-400 font-bold">ORDER BY</span> 3 <span className="text-purple-400 font-bold">DESC</span>;
            </div>

            {/* Output Grid */}
            <div className="p-2 rounded bg-slate-800/90 border border-slate-700 text-[9px] font-mono">
              <div className="grid grid-cols-3 text-slate-400 pb-1 border-b border-slate-700">
                <span>customer_segment</span>
                <span>active_accounts</span>
                <span>total_ltv</span>
              </div>
              <div className="grid grid-cols-3 text-slate-200 pt-1">
                <span className="text-purple-400">Enterprise_Tier</span>
                <span>1,240</span>
                <span className="text-emerald-400">$3,420,000</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 font-mono flex justify-between">
              <span>DB: Prod_Analytics_Lake</span>
              <span>1,240 rows fetched</span>
            </div>
          </div>
        );

      // 16. BUSINESS REPORTS - Business Report & Executive Summary
      case 'business-reports':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-[11px] text-slate-200">Executive Performance Report</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Board Ready PDF</span>
            </div>

            {/* Executive Document Paper Style */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 my-2 flex flex-col gap-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white">Q4 Strategic Growth & Retention Review</div>
                  <div className="text-[9px] text-slate-400">Prepared for Board of Directors • December 2026</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                  Approved
                </span>
              </div>

              <div className="text-[10px] text-slate-300 leading-relaxed">
                <strong className="text-white">Executive Summary: </strong>
                Net expansion revenue accelerated +28.4% YoY driven primarily by reduced churn in mid-market accounts.
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded bg-slate-800 border border-slate-700">
                  <div className="text-[8px] text-slate-400">Gross Margin</div>
                  <div className="font-bold text-emerald-400 text-xs">74.2% (+3.1%)</div>
                </div>
                <div className="p-2 rounded bg-slate-800 border border-slate-700">
                  <div className="text-[8px] text-slate-400">Customer Retention</div>
                  <div className="font-bold text-purple-400 text-xs">96.8% MoM</div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Executive brief structure • Data-backed charts, variance memos & strategic commentary
            </div>
          </div>
        );

      // 17. KPI DASHBOARDS - Real-Time KPI & Business Metrics Dashboard
      case 'kpi-dashboards':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-violet-400" />
                <span className="font-bold text-[11px] text-slate-200">Real-Time Executive KPI Cockpit</span>
              </div>
              <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">Live Telemetry</span>
            </div>

            {/* 4 Core KPI Gauges */}
            <div className="grid grid-cols-2 gap-2.5 my-2">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[8px] text-slate-400">MRR Velocity</div>
                <div className="text-sm font-extrabold text-white mt-0.5">$184,200</div>
                <div className="flex items-center gap-1 text-[8px] text-emerald-400 mt-1">
                  <span>▲ +18.4%</span>
                  <span className="text-slate-500">vs target</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[8px] text-slate-400">CAC Payback</div>
                <div className="text-sm font-extrabold text-emerald-400 mt-0.5">5.2 Months</div>
                <div className="flex items-center gap-1 text-[8px] text-emerald-400 mt-1">
                  <span>● Optimal</span>
                  <span className="text-slate-500">(Target &lt; 9)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[8px] text-slate-400">LTV : CAC Ratio</div>
                <div className="text-sm font-extrabold text-purple-400 mt-0.5">4.8x</div>
                <div className="flex items-center gap-1 text-[8px] text-purple-300 mt-1">
                  <span>Strong Capital Efficiency</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[8px] text-slate-400">Logo Churn</div>
                <div className="text-sm font-extrabold text-emerald-400 mt-0.5">0.45%</div>
                <div className="flex items-center gap-1 text-[8px] text-emerald-400 mt-1">
                  <span>Within Safety Bound</span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-between text-[9px]">
              <span className="text-slate-300">Target vs Actual Benchmarking • Alert triggers enabled</span>
              <span className="text-emerald-400 font-mono">100% Green</span>
            </div>
          </div>
        );

      // 18. DATA CLEANING - Data Preparation, ETL & Wrangling Studio
      case 'data-cleaning':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-[11px] text-slate-200">ETL Pipeline & Data Hygiene Studio</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">99.8% Clean Rate</span>
            </div>

            {/* Pipeline Stage Bar */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 my-2 space-y-2">
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
                <span className="text-emerald-400">Raw Ingest ✓</span>
                <span className="text-emerald-400">Deduplicate ✓</span>
                <span className="text-emerald-400">Null Fill ✓</span>
                <span className="text-teal-400 font-bold">Clean Lake ⚡</span>
              </div>

              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-400" />
              </div>

              {/* Action Log */}
              <div className="space-y-1 font-mono text-[8px] pt-1 border-t border-slate-800">
                <div className="text-emerald-400">• 1,480 Duplicate transaction records pruned</div>
                <div className="text-purple-400">• 84 Null postal codes imputed via reverse geocoding</div>
                <div className="text-teal-300">• ISO-8601 Datetime standard enforced across all tables</div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-between text-[9px]">
              <span className="text-slate-300">Status: Zero data leaks, audited schema types</span>
              <span className="text-teal-400 font-mono">Production Ready</span>
            </div>
          </div>
        );

      // 19. BUSINESS INSIGHTS - Strategic Insights & Analytics Dashboard
      case 'business-insights':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-[11px] text-slate-200">Commercial Intelligence Cockpit</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Actionable Insights</span>
            </div>

            {/* Key Growth Finding Box */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 my-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-bold text-white">Priority Strategic Finding</span>
              </div>
              <div className="text-[10px] text-slate-300 leading-relaxed">
                Accounts utilizing automated reporting within first 7 days demonstrate <strong className="text-cyan-400">3.4x higher Net Revenue Retention</strong>.
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-700/80 flex items-center justify-between text-[9px]">
                <span className="text-slate-300 font-semibold">Recommended Executive Action:</span>
                <span className="text-cyan-400 font-mono">Auto-trigger onboarding workflow</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-slate-800 border border-slate-700 text-center">
                <div className="text-[8px] text-slate-400">Projected Revenue Lift</div>
                <div className="font-bold text-emerald-400 text-xs">+$420,000 ARR</div>
              </div>
              <div className="p-2 rounded bg-slate-800 border border-slate-700 text-center">
                <div className="text-[8px] text-slate-400">Implementation Time</div>
                <div className="font-bold text-cyan-400 text-xs">2 Weeks</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300">
            <ImageIcon className="w-12 h-12 text-slate-500 mb-3" />
            <span className="text-sm font-bold text-white">{title}</span>
            <span className="text-xs text-slate-400 mt-1">Realistic showcase mockup</span>
          </div>
        );
    }
  };

  return (
    <div
      id={`service-visual-frame-${id}`}
      className="w-full glass-card p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 shadow-sm transition-all duration-300"
    >
      {/* Hidden File Input for Real Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 mb-3.5 px-1">
        <div className="flex items-center gap-2">
          {labelInfo.icon}
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight">
            {isUIUX ? 'UI/UX Visual Showcase' : 'Data Analytics Visual Showcase'}
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
          {badge}
        </span>
      </div>

      {/* Large Rectangular Image / Visual Placeholder Area */}
      <div
        id={`service-image-placeholder-${id}`}
        className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] max-h-[600px] rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 bg-slate-950 p-2 sm:p-3 flex flex-col justify-between overflow-hidden shadow-md group"
      >
        {displayImage ? (
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img
              src={displayImage}
              alt={`${title} project preview`}
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Overlay button to replace image */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-medium border border-slate-700 shadow-lg transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Image</span>
            </button>
          </div>
        ) : (
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            {/* Service-Specific Realistic Vector Mockup */}
            <div className="w-full flex-1 mb-3 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-900/50 shadow-inner">
              {renderServiceMockup()}
            </div>

            {/* Bottom Clear Placeholder Label & Upload Callout */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/95 border border-slate-800/90 text-left">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  {labelInfo.title}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase">
                  Placeholder
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-snug mb-2.5">
                {labelInfo.subtitle}
              </p>

              {/* Upload Trigger Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-[11px] font-semibold border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Upload className="w-3.5 h-3.5 text-purple-400" />
                <span>Upload Real Project Screenshot (PNG / JPG)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Frame Footer Caption */}
      <div className="mt-3 px-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
        <span className="font-mono truncate max-w-[240px]">
          {title} • Showcase Frame
        </span>
        <span className="font-medium">
          High-Res 4:3 / 16:10
        </span>
      </div>
    </div>
  );
};
