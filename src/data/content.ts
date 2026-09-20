import { Founder, ServiceCardData, PortfolioProject, WhyChooseUsItem } from '../types';

export const FOUNDERS: Founder[] = [
  {
    id: 'founder-1',
    name: 'Sanjay S.',
    role: 'UI/UX Designer & CEO & Founder',
    focus: 'Product Strategy & Interface Architecture',
    bio: 'Specializing in converting complex business logic into intuitive, visually breathtaking digital products. Over 6 years crafting high-converting web applications, scalable mobile design systems, enterprise dashboards, and cohesive brand identities.',
    avatarSeed: 'Sanjay',
    skills: [
      'Website UI/UX',
      'Mobile Interfaces',
      'Design Systems',
      'Wireframing & Prototyping',
      'Interactive Micro-interactions',
      'Brand Identity & Logo'
    ],
    social: {
      instagram: 'https://www.instagram.com/_.sanjuzz_x___?igsi=dnF1aG1nMmZoMmdl',
      github: 'https://github.com/sanjayv152006-cmyk',
      email: 'sanjaysanju152006@gmail.com',
      linkedin: 'https://www.linkedin.com/in/s-sanjay-b34509364/'
    },
    contactEmail: 'sanjaysanju152006@gmail.com',
    contactPhone: '7094362852',
    availability: 'Available for Q2 & Q3 Design Engagements'
  },
  {
    id: 'founder-2',
    name: 'Vinjitha R',
    role: 'Data Analyst & CEO & Founder',
    focus: 'BI Architecture & Predictive Decision Modeling',
    bio: 'Expert in extracting actionable clarity from ambiguous datasets. Specializes in building real-time executive cockpits, automated ETL pipelines, SQL modeling, Power BI reports, and strategic KPI measurement frameworks for scaling startups.',
    avatarSeed: 'Vinjitha',
    skills: [
      'Interactive Dashboards',
      'Power BI & Tableau',
      'Advanced SQL Analytics',
      'Financial & Business Reports',
      'Data Cleaning & Pipeline ETL',
      'Strategic KPI Frameworks'
    ],
    social: {
      instagram: 'https://www.instagram.com/_.vinjuzz_x___?stkn=NHhoaWc4bGYycXVy',
      github: 'https://github.com/svdesignstudio-analytics',
      email: 'vinjitha15@gmail.com'
    },
    contactEmail: 'vinjitha15@gmail.com',
    contactPhone: '7094362852',
    availability: 'Open for Analytics Audits & BI Deployments'
  }
];

export const COMPANY_STORY = {
  mission: 'To empower high-growth startups and established enterprises by building modern digital products that are aesthetically captivating, effortlessly intuitive, and rigorously data-driven.',
  vision: 'A world where great design and deep analytical intelligence converge seamlessly, eliminating guesswork from product evolution and digital business growth.',
  story: 'SV Digital Studio was founded on a simple realization: the best digital products are neither purely artistic nor purely mathematical—they thrive at the exact intersection of human emotion and empirical metrics. By uniting dedicated UI/UX craft with senior-tier business intelligence under one roof, we eliminate the friction between product design and data reality.',
  values: [
    {
      title: 'Precision Craftsmanship',
      description: 'Obsessive attention to micro-typography, pixel alignment, and flawless responsive fluidity across all viewports.'
    },
    {
      title: 'Empirical Grounding',
      description: 'Every layout decision, button placement, and funnel flow is validated through clean data pipelines and measurable user behavior.'
    },
    {
      title: 'Speed Without Compromise',
      description: 'Agile 2-week sprints delivering working interactive Figma prototypes and production-ready Power BI/SQL models.'
    },
    {
      title: 'Direct Founder Partnership',
      description: 'No account managers or delegated juniors. Clients collaborate directly with the two specialist co-founders.'
    }
  ]
};

export const SERVICES: ServiceCardData[] = [
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    badge: 'Creative & Interface Craft',
    subtitle: 'Human-centered interfaces crafted for conversion, clarity, and delight.',
    description: 'We translate your vision into scalable design systems, responsive web applications, and intuitive mobile interfaces that leave a lasting impression on your users.',
    icon: 'Palette',
    accentColor: '#2563EB',
    capabilities: [
      'Modern Website UI & Landing Pages',
      'iOS & Android Mobile App Interfaces',
      'Enterprise SaaS Dashboard UI',
      'Interactive Wireframes & Prototypes',
      'Component-Driven Design Systems',
      'Brand Identity, Logo & Graphic Design',
      'Micro-animations & Interaction Specs'
    ],
    tools: ['Figma', 'Protopie', 'Tailwind', 'Spline 3D', 'Adobe Illustrator'],
    workflow: [
      {
        step: '01',
        title: 'Discovery & Architecture',
        description: 'Deep stakeholder interviews, competitor benchmarking, information architecture mapping, and user journey flows.',
        deliverable: 'IA Diagram & Moodboard'
      },
      {
        step: '02',
        title: 'Wireframing & UX Logic',
        description: 'Low-fidelity structural wireframes focusing purely on user friction elimination, content hierarchy, and conversion pathways.',
        deliverable: 'Clickable Wireframe Flow'
      },
      {
        step: '03',
        title: 'High-Fidelity Visual Design',
        description: 'Applying refined typography, bespoke color palettes, glassmorphism accents, and accessible contrast ratios.',
        deliverable: 'Complete High-Fi Artboards'
      },
      {
        step: '04',
        title: 'Design System & Dev Handoff',
        description: 'Full tokenized component library with auto-layout specs, asset exports, responsive breakpoints, and developer documentation.',
        deliverable: 'Production Figma Tokens & Assets'
      }
    ],
    samples: [
      {
        title: 'Pulse SaaS Enterprise Dashboard',
        category: 'Web App & Dashboard UI',
        description: 'High-density dark/light SaaS platform with real-time streaming widgets, modular card grid, and customizable metric views.',
        keyMetric: '+42% User Retention',
        tags: ['Figma', 'SaaS', 'Design System']
      },
      {
        title: 'Lumina Fintech Mobile Experience',
        category: 'iOS & Android App',
        description: 'Ultra-minimalist wealth management app featuring biometric auth, card management, and frictionless investment flows.',
        keyMetric: '4.9 App Store Rating',
        tags: ['Mobile UX', 'Fintech', 'Micro-interactions']
      },
      {
        title: 'Aura Health & Wellness Brand',
        category: 'Branding & Landing Page',
        description: 'Complete visual identity, custom iconography, design token library, and 3D web showcase.',
        keyMetric: '3.4x Conversion Lift',
        tags: ['Branding', 'Visual Identity', 'Typography']
      }
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    badge: 'Intelligence & Insights',
    subtitle: 'Actionable business intelligence and dashboards built on solid data pipelines.',
    description: 'We turn chaotic spreadsheets and siloed databases into crisp visual executive cockpits, automated KPI trackers, and predictive growth reports that guide confident leadership.',
    icon: 'BarChart3',
    accentColor: '#3B82F6',
    capabilities: [
      'Interactive Executive Dashboards',
      'Power BI & Tableau Implementations',
      'Financial & Operational Excel Models',
      'SQL Data Modeling & Query Optimization',
      'Custom KPI Metrics & North-Star Tracking',
      'Automated Data Cleaning & ETL Pipelines',
      'Customer Cohort & Funnel Churn Analysis'
    ],
    tools: ['Power BI', 'SQL Server / PostgreSQL', 'Excel VBA & Power Query', 'Tableau', 'Python Pandas'],
    workflow: [
      {
        step: '01',
        title: 'Data Audit & Source Mapping',
        description: 'Inventory of current databases, CRM exports, spreadsheets, and reporting pain points with precision data hygiene assessment.',
        deliverable: 'Data Health Audit Report'
      },
      {
        step: '02',
        title: 'ETL Pipeline & Data Cleaning',
        description: 'Automating extraction, transformation, normalization, deduplication, and schema modeling into clean analytical staging tables.',
        deliverable: 'Automated Refresh Pipeline'
      },
      {
        step: '03',
        title: 'KPI Modeling & Calculation Logic',
        description: 'Defining DAX measures, window functions, customer lifetime value equations, and margin tracking with bulletproof audit trails.',
        deliverable: 'Calculated Data Dictionary'
      },
      {
        step: '04',
        title: 'Interactive Dashboard Deployment',
        description: 'Building modern responsive visual dashboards with cross-filtering, drill-through paths, and automatic scheduled email alerts.',
        deliverable: 'Live Power BI / SQL Dashboard'
      }
    ],
    samples: [
      {
        title: 'Global Retail Revenue Cockpit',
        category: 'Power BI Executive Model',
        description: 'Consolidated multi-region sales tracker comparing real-time revenue vs. target budgets across 14 currencies with automated anomaly alerts.',
        keyMetric: '$1.8M Uncovered Margin',
        tags: ['Power BI', 'DAX', 'SQL']
      },
      {
        title: 'SaaS Funnel & Churn Cohort Engine',
        category: 'SQL & Interactive BI',
        description: 'Granular user lifecycle analysis identifying drop-off bottlenecks in trial-to-paid conversions and predicting 90-day churn likelihood.',
        keyMetric: '-28% Churn Rate Reduction',
        tags: ['Cohort Analysis', 'PostgreSQL', 'Tableau']
      },
      {
        title: 'Automated Supply Chain KPI Tracker',
        category: 'Excel & Automated Reporting',
        description: 'Zero-touch daily inventory and delivery performance tracking dashboard replacing 12 hours of manual analyst crunching each week.',
        keyMetric: '12 hrs/wk Analyst Time Saved',
        tags: ['Excel BI', 'Power Query', 'Logistics']
      }
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'prism-fintech',
    title: 'Prism Global Wealth App',
    category: 'ui-ux',
    categoryLabel: 'Mobile UI/UX',
    description: 'Modern wealth management and multi-currency card interface designed with tactile glassmorphic cards and instant biometric payments.',
    fullCaseStudy: {
      overview: 'Prism required a premium, clutter-free mobile interface allowing high-net-worth individuals to monitor global asset distributions seamlessly.',
      challenge: 'Users were overwhelmed by dense financial tables and confusing nested menus across standard banking applications.',
      solution: 'Crafted a single-view card-based architecture with interactive balance curves, custom gesture controls, and clear typographic hierarchy.',
      impact: [
        '98% user satisfaction on onboarding clarity',
        '3.2x faster international wire transfers',
        'Featured in App Store Design Highlights'
      ]
    },
    technologies: ['Figma', 'iOS Design System', 'Prototyping', 'Fintech UX'],
    accentGradient: 'from-purple-600/30 via-indigo-600/20 to-transparent',
    mockupType: 'mobile-app',
    metrics: [
      { label: 'Conversion Lift', value: '+38%' },
      { label: 'Active Users', value: '120k+' }
    ]
  },
  {
    id: 'nexus-analytics-cockpit',
    title: 'Nexus Enterprise KPI Cockpit',
    category: 'data-analytics',
    categoryLabel: 'Power BI & BI Architecture',
    description: 'Executive command center consolidating CRM, ERP, and payment metrics into one real-time dashboard for C-suite decision-makers.',
    fullCaseStudy: {
      overview: 'A fast-growing B2B tech firm needed unified clarity across 5 fragmented data silos to run their weekly executive steering committees.',
      challenge: 'Department heads spent 16 hours every Monday manually reconciling mismatched figures in disconnected spreadsheets.',
      solution: 'Engineered a unified SQL warehouse connected to a custom-themed Power BI report featuring automated variance flags and drill-downs.',
      impact: [
        '100% elimination of manual Monday report assembly',
        'Near real-time sync with under 5-minute latency',
        'Direct identification of $450K in vendor billing discrepancies'
      ]
    },
    technologies: ['Power BI', 'SQL Server', 'DAX Measures', 'ETL Pipeline'],
    accentGradient: 'from-purple-500/30 via-violet-600/20 to-transparent',
    mockupType: 'analytics-cockpit',
    metrics: [
      { label: 'Hours Saved/Wk', value: '16h' },
      { label: 'Data Accuracy', value: '99.9%' }
    ]
  },
  {
    id: 'strata-saas-cloud',
    title: 'Strata Cloud Infrastructure Platform',
    category: 'ui-ux',
    categoryLabel: 'Dashboard & Web UI',
    description: 'High-density developer monitoring console with customized node telemetry, log streaming, and visual cluster topology.',
    fullCaseStudy: {
      overview: 'Strata required a modern redesign of their complex container orchestration console for DevOps and engineering teams.',
      challenge: 'Engineers found error logs difficult to parse during critical production outages due to low-contrast tables.',
      solution: 'Introduced an engineered dark theme, custom monospace telemetry components, and color-coded status badges passing WCAG AAA standards.',
      impact: [
        '45% reduction in incident triage resolution time',
        'Unanimous positive adoption across 400+ developers',
        'Standardized 60+ reusable React design tokens'
      ]
    },
    technologies: ['Figma', 'Design Tokens', 'Tailwind', 'SaaS Dashboard'],
    accentGradient: 'from-purple-700/30 via-slate-800/20 to-transparent',
    mockupType: 'dashboard',
    metrics: [
      { label: 'MTTR Speed', value: '-45%' },
      { label: 'Components Built', value: '64' }
    ]
  },
  {
    id: 'aurora-ecommerce-insights',
    title: 'Aurora E-Commerce Cohort & Churn Engine',
    category: 'data-analytics',
    categoryLabel: 'SQL Analytics & Reports',
    description: 'Predictive customer retention model and automated cohort visualizer tracking repeat order frequency and customer lifetime value.',
    fullCaseStudy: {
      overview: 'Direct-to-consumer lifestyle brand needed to pinpoint why customers were not reordering past day 60.',
      challenge: 'Historical transactional data contained over 2.4 million rows with duplicate guest checkouts and disjointed coupon codes.',
      solution: 'Cleaned and structured transactional records using PostgreSQL window queries and delivered an intuitive customer cohort heat-map.',
      impact: [
        '+22% increase in second-order re-engagement campaigns',
        'Accurate 12-month LTV forecast within 3.5% error margin',
        'Instant segmentation export for marketing automation'
      ]
    },
    technologies: ['PostgreSQL', 'Python', 'Excel BI', 'Cohort Analysis'],
    accentGradient: 'from-indigo-600/30 via-purple-500/20 to-transparent',
    mockupType: 'analytics-cockpit',
    metrics: [
      { label: 'Repeat Purchase', value: '+22%' },
      { label: 'Rows Processed', value: '2.4M' }
    ]
  },
  {
    id: 'velox-logistics-portal',
    title: 'Velox Freight & Fleet Operations UI',
    category: 'ui-ux',
    categoryLabel: 'Design System & Portal',
    description: 'Dispatching operations portal unifying GPS route tracking, driver assignments, and manifest verification into a single tab interface.',
    fullCaseStudy: {
      overview: 'Modern logistics carrier needed an operator dashboard that could handle rapid keyboard shortcuts and multi-screen dispatching.',
      challenge: 'Previous legacy ERP had 8 distinct pop-up windows, leading to frequent operator data entry errors during peak hours.',
      solution: 'Redesigned the entire workflow into a unified single-window command panel with keyboard hotkeys and live route previews.',
      impact: [
        '60% reduction in operator onboarding training time',
        'Zero reported dispatch misallocations over 90 days',
        'Enhanced visual route mapping with dark mode comfort'
      ]
    },
    technologies: ['Figma', 'UI Architecture', 'Prototyping', 'Web App'],
    accentGradient: 'from-purple-500/30 via-fuchsia-500/20 to-transparent',
    mockupType: 'web-platform',
    metrics: [
      { label: 'Error Rate', value: '0%' },
      { label: 'Dispatch Speed', value: '2.5x' }
    ]
  },
  {
    id: 'zenith-financial-modeling',
    title: 'Zenith VC Portfolio Forecasting Model',
    category: 'data-analytics',
    categoryLabel: 'Financial BI & Excel Engine',
    description: 'Dynamic capital allocation model and venture fund scenario simulator calculating IRR, cash runway, and follow-on valuation thresholds.',
    fullCaseStudy: {
      overview: 'Early-stage venture fund needed a standardized reporting framework to evaluate portfolio startup health and cash burn runway.',
      challenge: 'Founders submitted reports in varying formats with inconsistent revenue recognition methods.',
      solution: 'Developed an automated ingestion template and Power BI rollup dashboard that instantly normalizes ARR and burn multiples.',
      impact: [
        'Enabled instant Q-over-Q investor report generation',
        'Detected 3 early runway warning signals 6 months ahead',
        'Adopted by 28 portfolio companies as primary template'
      ]
    },
    technologies: ['Advanced Excel', 'Financial Modeling', 'Power BI', 'KPIs'],
    accentGradient: 'from-violet-600/30 via-purple-700/20 to-transparent',
    mockupType: 'analytics-cockpit',
    metrics: [
      { label: 'Portfolio Cos', value: '28' },
      { label: 'Forecast Accuracy', value: '98%' }
    ]
  }
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'user-centered',
    title: 'User-Centered Design',
    description: 'We prioritize the end-user’s cognitive load, clarity, and satisfaction above arbitrary trends, ensuring immediate intuitive adoption.',
    icon: 'Users',
    highlight: 'Zero learning curve interfaces'
  },
  {
    id: 'creative-thinking',
    title: 'Creative Thinking',
    description: 'Every layout, typography pairing, and visual asset is tailored to your unique brand voice—never generated from cookie-cutter templates.',
    icon: 'Sparkles',
    highlight: 'Bespoke aesthetic identity'
  },
  {
    id: 'data-driven',
    title: 'Data-Driven Decisions',
    description: 'We don’t rely on subjective assumptions. Design iterations and business strategies are validated with concrete metrics and analytics.',
    icon: 'LineChart',
    highlight: 'Measurable ROI & KPI lifts'
  },
  {
    id: 'modern-tech',
    title: 'Modern Technologies',
    description: 'Leveraging cutting-edge tools including modern Figma tokens, Power BI DAX, clean SQL architectures, and production-ready handoffs.',
    icon: 'Cpu',
    highlight: 'Industry-standard tech stack'
  },
  {
    id: 'fast-delivery',
    title: 'Fast Delivery',
    description: 'Structured 2-week sprints with transparent milestones, asynchronous loom updates, and rapid turnarounds without bloated agency delays.',
    icon: 'Zap',
    highlight: 'Rapid 2-week sprint cycles'
  },
  {
    id: 'professional-quality',
    title: 'Professional Quality',
    description: 'Rigorous quality assurance, pixel-level visual perfection, rigorous data audit trails, and enterprise-grade documentation.',
    icon: 'CheckCircle2',
    highlight: 'Production-ready handoffs'
  },
  {
    id: 'reliable-support',
    title: 'Reliable Support',
    description: 'Post-launch design advisory, developer pairing sessions, and scheduled BI report maintenance to ensure lasting operational success.',
    icon: 'ShieldCheck',
    highlight: 'Dedicated founder access'
  }
];

export const CONTACT_DETAILS = {
  studioName: 'SV Digital Studio',
  tagline: 'Modern UI/UX Design & Data Analytics Solutions for Businesses',
  email: 'svdigitalstudio19@gmail.com',
  phone: '+91 7094362852',
  address: 'Tamil Nadu, India',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM'
};
