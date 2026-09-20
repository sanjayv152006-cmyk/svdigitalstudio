// Configuration: Connect your Google Form here
// Replace this empty string with your Google Form URL (e.g. 'https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform')
// When set, all "Start a Project" CTA buttons will open your Google Form in a new tab.
// When left empty, it opens the interactive studio project intake modal.
export const GOOGLE_FORM_URL: string = '';

export interface SubServiceProcessStep {
  step: number;
  title: string;
  description: string;
  deliverable: string;
}

export interface SubServiceDetail {
  id: string;
  categoryId: 'ui-ux' | 'data-analytics';
  title: string;
  shortDescription: string;
  badge: string;
  iconName: string;
  whatItIs: string;
  whatWeProvide: string[];
  process: SubServiceProcessStep[];
  benefits: {
    title: string;
    description: string;
  }[];
  placeholderType: 'interface' | 'mobile' | 'web' | 'dashboard' | 'wireframe' | 'branding' | 'chart' | 'spreadsheet' | 'sql';
  placeholderTitle: string;
  placeholderSubtitle: string;
  imageUrl?: string;
}

export const UI_UX_SERVICES: SubServiceDetail[] = [
  {
    id: 'ui-design',
    categoryId: 'ui-ux',
    title: 'UI Design',
    shortDescription: 'Pixel-perfect visual design systems, typographic hierarchies, and modern digital surfaces.',
    badge: 'Visual Craft',
    iconName: 'Layout',
    whatItIs: 'User Interface (UI) Design focuses on the visual touchpoints and interactive beauty of your product. We create high-fidelity screen layouts, responsive grids, balanced color palettes, typography rules, and micro-interaction states that make software effortless and aesthetically captivating.',
    whatWeProvide: [
      'High-fidelity Figma screen layouts (Desktop, Tablet, Mobile)',
      'Design Token architecture (Colors, Typography, Spacing, Shadows)',
      'Interactive component states (Default, Hover, Active, Disabled, Focus)',
      'Custom iconography & visual asset export packages',
      'Developer handoff specs with exact CSS properties and spacing guidelines'
    ],
    process: [
      {
        step: 1,
        title: 'Visual Discovery & Moodboards',
        description: 'Analyze brand attributes, industry benchmarks, and target aesthetics to define a bespoke visual direction.',
        deliverable: 'Visual Moodboard & Style Tile'
      },
      {
        step: 2,
        title: 'Design System Foundation',
        description: 'Construct scalable typographic scales, color palettes, elevation rules, and core atomic elements.',
        deliverable: 'Atomic Figma Token Library'
      },
      {
        step: 3,
        title: 'High-Fidelity Screen Craft',
        description: 'Produce high-contrast, beautiful interface screens for primary user flows across all screen breakpoints.',
        deliverable: 'Pixel-Perfect Screen Files'
      },
      {
        step: 4,
        title: 'Component Library & Handoff',
        description: 'Package all reusable master components, auto-layout variants, and complete developer export sheets.',
        deliverable: 'Ready-for-Code Figma Package'
      }
    ],
    benefits: [
      {
        title: 'Instant Brand Credibility',
        description: 'First impressions form in 50 milliseconds; polished UI establishes authority and enterprise trust.'
      },
      {
        title: 'Rapid Engineering Velocity',
        description: 'Consistent design tokens and auto-layout components accelerate front-end delivery by up to 40%.'
      },
      {
        title: 'Reduced User Cognitive Load',
        description: 'Consistent visual hierarchies guide user focus intuitively toward primary conversion actions.'
      }
    ],
    placeholderType: 'interface',
    placeholderTitle: 'High-Fidelity UI Interface Preview',
    placeholderSubtitle: 'Visual Design Canvas • Components, Design Tokens & Breakpoints'
  },
  {
    id: 'ux-design',
    categoryId: 'ui-ux',
    title: 'UX Design',
    shortDescription: 'Data-informed user journeys, task-flow optimization, and cognitive architecture.',
    badge: 'Cognitive Architecture',
    iconName: 'Compass',
    whatItIs: 'User Experience (UX) Design is the strategic science of making digital products intuitive, friction-free, and delightful. Through user research, information architecture, and behavioral journey mapping, we eliminate navigation hurdles and maximize user task completion.',
    whatWeProvide: [
      'User persona definitions and customer empathy maps',
      'End-to-end user journey mapping and scenario workflows',
      'Information architecture diagrams and sitemaps',
      'Friction audit & heuristic evaluations of existing products',
      'Usability testing protocols and actionable improvement roadmaps'
    ],
    process: [
      {
        step: 1,
        title: 'User Research & Heuristic Audit',
        description: 'Map user motivations, pain points, and current friction spots through qualitative research.',
        deliverable: 'Friction Analysis & Persona Deck'
      },
      {
        step: 2,
        title: 'Information Architecture',
        description: 'Organize platform hierarchies, taxonomy, and navigation structures for effortless mental clarity.',
        deliverable: 'Site Architecture & Mental Models'
      },
      {
        step: 3,
        title: 'Workflow & Journey Mapping',
        description: 'Chart step-by-step paths from user onboarding to primary conversion moments.',
        deliverable: 'Comprehensive User Flow Diagrams'
      },
      {
        step: 4,
        title: 'Validation & Usability Testing',
        description: 'Conduct task-completion tests with target users to stress-test cognitive hurdles.',
        deliverable: 'Usability Scorecard & Refinement Plan'
      }
    ],
    benefits: [
      {
        title: 'Higher Conversion Rates',
        description: 'Removing checkout and signup friction drives quantifiable improvements in user activation.'
      },
      {
        title: 'Lower Customer Support Costs',
        description: 'Self-evident workflows prevent confusion and dramatically reduce incoming support tickets.'
      },
      {
        title: 'Sustained User Retention',
        description: 'Intuitive software forms positive behavioral habits that keep users active week after week.'
      }
    ],
    placeholderType: 'interface',
    placeholderTitle: 'User Journey & UX Workflow Blueprint',
    placeholderSubtitle: 'Experience Architecture • Persona Maps, Flow Logic & Usability Framework'
  },
  {
    id: 'website-design',
    categoryId: 'ui-ux',
    title: 'Website Design',
    shortDescription: 'Responsive marketing websites, SaaS marketing engines, and corporate portals.',
    badge: 'Digital Presence',
    iconName: 'Globe',
    whatItIs: 'Website Design blends storytelling, conversion architecture, and responsive layout craftsmanship. We design modern web experiences that communicate your value proposition within seconds, engage visitors with tasteful motion, and convert traffic into qualified inquiries.',
    whatWeProvide: [
      'Responsive multi-page website designs (Desktop, Laptop, Tablet, Mobile)',
      'Conversion-optimized section layouts (Hero, Features, Proof, Pricing, FAQ)',
      'Micro-animations and scroll-driven interaction specifications',
      'Accessible contrast standards (WCAG AA compliant)',
      'Modular layout blocks ready for Webflow, Framer, Next.js, or WordPress'
    ],
    process: [
      {
        step: 1,
        title: 'Strategic Positioning & Wireframe',
        description: 'Define key messaging hierarchy, conversion goals, and page flow structures.',
        deliverable: 'Low-Fidelity Structural Wireframes'
      },
      {
        step: 2,
        title: 'Visual Concepting',
        description: 'Design key hero sections with distinct typography, imagery, and aesthetic accents.',
        deliverable: 'Homepage Aesthetic Concept'
      },
      {
        step: 3,
        title: 'Full Page Architecture',
        description: 'Extend the visual style across all interior pages, blog layouts, pricing tables, and modals.',
        deliverable: 'Complete Multi-Page Figma File'
      },
      {
        step: 4,
        title: 'Responsive Breakdown & Dev Assets',
        description: 'Craft dedicated tablet and mobile breakpoints with optimized touch-target layouts.',
        deliverable: 'Responsive Breakpoint Package'
      }
    ],
    benefits: [
      {
        title: 'Exponential Inbound Leads',
        description: 'Strategically positioned CTAs and social proof sections convert passive visitors into qualified buyers.'
      },
      {
        title: 'Flawless Multi-Device Experience',
        description: 'Tailored responsive designs ensure seamless navigation across iPhones, Androids, tablets, and 4K displays.'
      },
      {
        title: 'Search Engine & Performance Friendly',
        description: 'Clean semantic structure and optimized layout weights lay the foundation for superior Core Web Vitals.'
      }
    ],
    placeholderType: 'web',
    placeholderTitle: 'Responsive Website Showcase',
    placeholderSubtitle: 'Web Experience • Desktop & Mobile Breakpoints with Conversion Architecture'
  },
  {
    id: 'mobile-app-design',
    categoryId: 'ui-ux',
    title: 'Mobile App Design',
    shortDescription: 'Native iOS & Android mobile product experiences designed for thumb-reach and engagement.',
    badge: 'Mobile First',
    iconName: 'Smartphone',
    whatItIs: 'Mobile App Design crafts intuitive touch interfaces built specifically for iOS (Human Interface Guidelines) and Android (Material 3). We focus on thumb navigation zones, rapid one-tap actions, offline feedback states, and fluid gesture interactions that feel native and responsive.',
    whatWeProvide: [
      'Complete iOS & Android native screen flows',
      'Onboarding, authentication, and permission request experiences',
      'Bottom navigation, swipe drawer, and bottom-sheet interaction patterns',
      'Empty states, error handling, loading skeletons, and notification badges',
      'Clickable mobile prototype for stakeholder demonstrations and user testing'
    ],
    process: [
      {
        step: 1,
        title: 'App Ecosystem & Navigation Flow',
        description: 'Map core tab architectures, deep-linking journeys, and user state transitions.',
        deliverable: 'App Navigation Architecture'
      },
      {
        step: 2,
        title: 'Platform-Native Wireframing',
        description: 'Design thumb-friendly low-fidelity flows respecting safe areas and status bars.',
        deliverable: 'Native Mobile Wireframes'
      },
      {
        step: 3,
        title: 'Visual Touch & Interaction Design',
        description: 'Apply tactile UI styling, typography scales, dark mode themes, and fluid transitions.',
        deliverable: 'High-Fidelity Screen Collection'
      },
      {
        step: 4,
        title: 'Interactive Prototype & Dev Handoff',
        description: 'Link screens with real gestures (tap, slide, drag) and export vector assets.',
        deliverable: 'Interactive Figma Prototype'
      }
    ],
    benefits: [
      {
        title: 'High App Store Ratings',
        description: 'Smooth, bug-free UX and predictable iOS/Android patterns keep user reviews in the 4.8+ range.'
      },
      {
        title: 'Maximum Daily Active Users (DAU)',
        description: 'Frictionless push notification flows and fast checkout sequences drive regular return visits.'
      },
      {
        title: 'Swift iOS / Android Implementation',
        description: 'Platform-compliant layout tokens translate directly into React Native, Flutter, Swift, or Kotlin.'
      }
    ],
    placeholderType: 'mobile',
    placeholderTitle: 'Native Mobile Screen Blueprint',
    placeholderSubtitle: 'iOS & Android • Touch Target Grids, Bottom Sheets & Haptic Interaction States'
  },
  {
    id: 'landing-page-design',
    categoryId: 'ui-ux',
    title: 'Landing Page Design',
    shortDescription: 'High-converting single-page landing experiences for product launches, ad campaigns, and events.',
    badge: 'Direct Response',
    iconName: 'Sparkles',
    whatItIs: 'Landing Page Design is dedicated to a singular objective: driving maximum conversion for a specific offer, product launch, webinar, or campaign. We combine persuasive visual storytelling, frictionless input forms, and compelling social proof frameworks to turn ad traffic into revenue.',
    whatWeProvide: [
      'High-impact above-the-fold hero section design',
      'Visual feature breakdown with interactive preview mockups',
      'Trust badges, client quotes, and verified testimonial blocks',
      'Dynamic pricing comparison tables with toggle billing cycles',
      'Sticky navigation with dedicated conversion action triggers'
    ],
    process: [
      {
        step: 1,
        title: 'Campaign & Audience Alignment',
        description: 'Analyze campaign traffic source (Google Ads, Meta, LinkedIn, Organic) and buyer intent.',
        deliverable: 'Conversion Strategy Brief'
      },
      {
        step: 2,
        title: 'Conversion Wireframe',
        description: 'Structure headline hooks, value bullets, objections handling, and lead capture form.',
        deliverable: 'Conversion Blueprint'
      },
      {
        step: 3,
        title: 'High-Impact Visual Production',
        description: 'Design vibrant visual graphics, 3D/vector feature mockups, and high-contrast CTA buttons.',
        deliverable: 'High-Fidelity Landing Page'
      },
      {
        step: 4,
        title: 'A/B Test Variant Guidelines',
        description: 'Provide headline and CTA button variants designed for split-testing optimization.',
        deliverable: 'A/B Testing Variant Assets'
      }
    ],
    benefits: [
      {
        title: 'Reduced Cost Per Acquisition (CPA)',
        description: 'Boosting landing page conversion rates directly drops your paid acquisition cost across all channels.'
      },
      {
        title: 'Message-Match Optimization',
        description: 'Harmonious alignment between marketing ads and page copy dramatically reduces bounce rates.'
      },
      {
        title: 'Rapid Deployment Ready',
        description: 'Designed in cleanly modular sections ready for instant implementation in Framer, Webflow, or code.'
      }
    ],
    placeholderType: 'web',
    placeholderTitle: 'High-Converting Landing Page Framework',
    placeholderSubtitle: 'Conversion Engine • Hero Hook, Social Proof Rails & Sticky Action Triggers'
  },
  {
    id: 'dashboard-design',
    categoryId: 'ui-ux',
    title: 'Dashboard Design',
    shortDescription: 'Complex SaaS administrative portals, data-dense cockpits, and multi-tenant control panels.',
    badge: 'Enterprise SaaS',
    iconName: 'Gauge',
    whatItIs: 'Dashboard Design transforms massive, complex relational data into clear, actionable executive software. We specialize in high-density data tables, modular analytics widgets, customizable filters, and permission-based user management consoles that keep users productive.',
    whatWeProvide: [
      'Modular widget-based dashboard grid architectures',
      'Advanced data table systems (Inline editing, bulk actions, column sorting, pagination)',
      'Comprehensive filter drawers, date-range selectors, and search systems',
      'Multi-role permission views (Admin, Manager, Contributor, Read-only)',
      'Dark mode and light mode interface themes'
    ],
    process: [
      {
        step: 1,
        title: 'User Role & Metric Audit',
        description: 'Identify primary KPIs, daily workflows, and frequent decision points for each user persona.',
        deliverable: 'KPI & Workflow Prioritization Matrix'
      },
      {
        step: 2,
        title: 'Grid & Navigation Architecture',
        description: 'Design collapsible sidebar navigation, breadcrumb systems, and adaptive responsive widget grids.',
        deliverable: 'Dashboard Wireframe Prototype'
      },
      {
        step: 3,
        title: 'Chart & Widget Crafting',
        description: 'Design accessible, high-contrast chart visualizations (Time series, Funnels, Heatmaps, Donut charts).',
        deliverable: 'Componentized Widget Catalog'
      },
      {
        step: 4,
        title: 'State & Empty State Engineering',
        description: 'Detail first-time user onboarding screens, zero-data states, and error recovery views.',
        deliverable: 'Production-Ready SaaS UI Suite'
      }
    ],
    benefits: [
      {
        title: 'Zero User Training Curve',
        description: 'Intuitive enterprise layouts allow team members to extract insights without hours of manual training.'
      },
      {
        title: 'Unmatched Data Density & Legibility',
        description: 'Carefully measured typographic line-heights and row padding maximize data density without visual clutter.'
      },
      {
        title: 'Increased SaaS Product Stickiness',
        description: 'Executive dashboards become the daily homepage for management teams, cementing software renewal.'
      }
    ],
    placeholderType: 'dashboard',
    placeholderTitle: 'SaaS Analytics Dashboard Canvas',
    placeholderSubtitle: 'Enterprise UI • Multi-Tenant Layouts, Metric Widgets & Advanced Data Grids'
  },
  {
    id: 'wireframing',
    categoryId: 'ui-ux',
    title: 'Wireframing',
    shortDescription: 'Low-fidelity structural schematics, layout logic, and rapid iterative product validation.',
    badge: 'Rapid Validation',
    iconName: 'FileCode2',
    whatItIs: 'Wireframing is the foundational blueprint of any software application. By stripping away colors, styling, and graphics, we focus purely on spatial hierarchy, content layout, and interaction logic. This enables rapid team alignment before investing heavily in visual polish.',
    whatWeProvide: [
      'Low-fidelity structural screen schematics for entire applications',
      'Functional specification annotations for developers',
      'Content wireframes with realistic copy and hierarchy guidance',
      'Clickable low-fidelity Figma prototypes for early user validation',
      'Iterative feedback loops and concept exploration boards'
    ],
    process: [
      {
        step: 1,
        title: 'Requirement Decomposition',
        description: 'Break down complex product specifications and PRDs into distinct functional screen states.',
        deliverable: 'Screen Requirement Inventory'
      },
      {
        step: 2,
        title: 'Low-Fidelity Layout Exploration',
        description: 'Explore multiple layout arrangements for key screens to compare operational efficiency.',
        deliverable: 'Comparative Layout Sketches'
      },
      {
        step: 3,
        title: 'Screen Annotation & Logic Rules',
        description: 'Add detailed behavior notes explaining conditional fields, dynamic validation, and edge cases.',
        deliverable: 'Annotated Screen Wireframes'
      },
      {
        step: 4,
        title: 'Stakeholder Review & Sign-Off',
        description: 'Walk leadership and engineering leads through the schematic architecture to confirm feasibility.',
        deliverable: 'Approved Wireframe Blueprint'
      }
    ],
    benefits: [
      {
        title: 'Save Weeks of Development Waste',
        description: 'Catching architectural layout flaws at the wireframe stage costs 10x less than refactoring code.'
      },
      {
        title: 'Cross-Functional Alignment',
        description: 'Product managers, developers, and founders reach shared clarity on exact feature scopes early.'
      },
      {
        title: 'Content-Driven Hierarchy',
        description: 'Ensures UI containers are engineered to fit actual product copy rather than lorem ipsum dummy text.'
      }
    ],
    placeholderType: 'wireframe',
    placeholderTitle: 'Low-Fidelity Structural Wireframe',
    placeholderSubtitle: 'Product Schematic • Layout Grids, Component Positioning & Interaction Notes'
  },
  {
    id: 'prototyping',
    categoryId: 'ui-ux',
    title: 'Prototyping',
    shortDescription: 'Interactive, realistic clickable prototypes for investor pitches, user testing, and dev handoff.',
    badge: 'Interactive Reality',
    iconName: 'PlayCircle',
    whatItIs: 'Prototyping turns static UI artboards into a living, clickable simulation of your final software. Using advanced Figma variables, smart animations, and interactive component states, we recreate authentic product flows that look and feel just like coded applications.',
    whatWeProvide: [
      'Interactive Figma prototypes with realistic page transitions',
      'Micro-interaction physics (Hover elevations, modal fades, swipe gestures)',
      'Dynamic input simulations (Typed text fields, toggle switches, dropdowns)',
      'Investor demo sandbox links ready for high-stakes presentations',
      'Usability testing recorded session tasks and observation notes'
    ],
    process: [
      {
        step: 1,
        title: 'Interaction Mapping',
        description: 'Define exact triggers (On click, while hovering, drag, after delay) for every interactive element.',
        deliverable: 'Interaction State Matrix'
      },
      {
        step: 2,
        title: 'Smart Animation Configuration',
        description: 'Configure bezier easing curves and smart-animate component connections in Figma.',
        deliverable: 'Connected Screen Prototype'
      },
      {
        step: 3,
        title: 'Variables & Logic Flow Setup',
        description: 'Implement conditional state variables (Cart counts, tab switching, toggle triggers).',
        deliverable: 'Dynamic Interactive Prototype'
      },
      {
        step: 4,
        title: 'Demo Walkthrough Video & Guide',
        description: 'Record an executive walkthrough demonstrating how to present the prototype to stakeholders.',
        deliverable: 'Video Walkthrough & Share Link'
      }
    ],
    benefits: [
      {
        title: 'Win Investor & Client Buy-In',
        description: 'Nothing communicates vision more persuasively than a functioning prototype on an actual device.'
      },
      {
        title: 'Zero Dev Interpretation Gaps',
        description: 'Engineers see exact transition timings, spring physics, and interaction outcomes without guessing.'
      },
      {
        title: 'Unbiased Usability Feedback',
        description: 'Test real human reactions to navigation flows before writing a single line of production code.'
      }
    ],
    placeholderType: 'interface',
    placeholderTitle: 'Interactive Clickable Prototype Model',
    placeholderSubtitle: 'Simulation Engine • Smart Animations, Dynamic State Variables & User Flow Paths'
  },
  {
    id: 'graphic-design',
    categoryId: 'ui-ux',
    title: 'Graphic Design',
    shortDescription: 'High-impact marketing collaterals, social media assets, vector illustrations, and slide pitch decks.',
    badge: 'Visual Communication',
    iconName: 'Image',
    whatItIs: 'Graphic Design shapes the distinctive visual communication of your company across digital and print touchpoints. From sleek investor pitch decks to high-engagement social media suites and product graphics, we produce visuals that reflect elite taste and clarity.',
    whatWeProvide: [
      'Investor pitch decks & executive presentation slide templates',
      'Social media graphics suite (LinkedIn, Instagram, X/Twitter banners & posts)',
      'Vector icon sets and custom illustrative diagrams',
      'Digital ad banners (Google Display, Meta ads, LinkedIn sponsored carousels)',
      'Print-ready business cards, one-pagers, and conference collateral'
    ],
    process: [
      {
        step: 1,
        title: 'Creative Brief & Style Direction',
        description: 'Clarify target audience, messaging goals, dimensional specs, and brand voice guidelines.',
        deliverable: 'Visual Creative Brief'
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Draft initial creative layouts, typographic pairings, and graphic focal points.',
        deliverable: '2-3 Creative Route Concepts'
      },
      {
        step: 3,
        title: 'Asset Refinement & Polish',
        description: 'Refine the chosen concept with precise color grading, typographic tracking, and composition balance.',
        deliverable: 'Final Approved Master Artwork'
      },
      {
        step: 4,
        title: 'Multi-Format Asset Export',
        description: 'Deliver production assets in vector (SVG, EPS, PDF) and raster (PNG, JPG, WebP) formats.',
        deliverable: 'Complete Digital Asset Library'
      }
    ],
    benefits: [
      {
        title: 'Unified Brand Consistency',
        description: 'Every customer touchpoint reflects the same polished visual standard, compounding brand recognition.'
      },
      {
        title: 'Elevated Investor Presentations',
        description: 'Professional typography and bespoke diagrams make pitch decks unforgettable during fundraising rounds.'
      },
      {
        title: 'Higher Social Engagement',
        description: 'Distinctive visual aesthetics stand out in noisy social feeds, driving higher click-through rates.'
      }
    ],
    placeholderType: 'branding',
    placeholderTitle: 'Graphic & Marketing Asset Suite',
    placeholderSubtitle: 'Brand Communication • Pitch Decks, Social Creatives & Editorial Visual Assets'
  },
  {
    id: 'logo-brand-identity',
    categoryId: 'ui-ux',
    title: 'Logo & Brand Identity',
    shortDescription: 'Memorable brand marks, typographic systems, color palettes, and comprehensive brand guidelines.',
    badge: 'Brand Identity',
    iconName: 'Feather',
    whatItIs: 'Logo & Brand Identity gives your company a timeless, recognizable soul. We craft bespoke wordmarks, responsive logo symbols, color harmonies, and authoritative brand guideline manuals that ensure your business stands out distinctly in saturated markets.',
    whatWeProvide: [
      'Primary, secondary, and sub-mark logo lockups (Horizontal, Vertical, Monogram)',
      'Complete vector logo packages (SVG, EPS, AI, PNG, PDF in Light & Dark modes)',
      'Proprietary color palette specifications (HEX, RGB, CMYK, Pantone)',
      'Typography pairing rules (Display, Headers, Body, Monospace pairings)',
      'Comprehensive Brand Style Guide PDF (Usage rules, clearspace, do and don’ts)'
    ],
    process: [
      {
        step: 1,
        title: 'Brand Strategy & Market Positioning',
        description: 'Examine competitive landscape, audience values, and core archetype positioning.',
        deliverable: 'Brand Architecture Strategy'
      },
      {
        step: 2,
        title: 'Logo Concept Exploration',
        description: 'Sketch and digitize bespoke logo marks exploring symbolic, wordmark, and emblem styles.',
        deliverable: '3 Curated Brand Identity Concepts'
      },
      {
        step: 3,
        title: 'Typography & Color Harmonization',
        description: 'Pair modern typefaces and build high-contrast color palettes tested across all mediums.',
        deliverable: 'Visual Identity System'
      },
      {
        step: 4,
        title: 'Brand Guidelines Book & Asset Suite',
        description: 'Compile the definitive brand manual with usage rules, clearspace, and export packages.',
        deliverable: 'Comprehensive Brand Guidelines PDF'
      }
    ],
    benefits: [
      {
        title: 'Enduring Market Recognition',
        description: 'A disciplined, memorable identity ensures clients recognize and trust your brand immediately.'
      },
      {
        title: 'Defensible Brand Equity',
        description: 'Proprietary marks and cohesive palettes separate your business from commodity competitors.'
      },
      {
        title: 'Effortless Team Scaling',
        description: 'A detailed brand manual ensures marketing teams, agencies, and vendors never misrepresent your brand.'
      }
    ],
    placeholderType: 'branding',
    placeholderTitle: 'Brand Identity & Logo Architecture',
    placeholderSubtitle: 'Identity System • Responsive Logo Marks, Typography Pairing & Style Guidelines'
  }
];

export const DATA_ANALYTICS_SERVICES: SubServiceDetail[] = [
  {
    id: 'data-analysis',
    categoryId: 'data-analytics',
    title: 'Data Analysis',
    shortDescription: 'Exploratory data analysis, cohort segmentation, statistical modeling, and trend identification.',
    badge: 'Core Analytics',
    iconName: 'TrendingUp',
    whatItIs: 'Data Analysis systematically interrogates your historical and real-time business data to uncover hidden patterns, root causes of attrition, and profitable growth opportunities. We transform raw rows and columns into statistical clarity that directly drives executive decision-making.',
    whatWeProvide: [
      'Exploratory Data Analysis (EDA) on transactional and customer datasets',
      'Cohort analysis, customer lifetime value (LTV), and churn probability models',
      'Correlation and regression analysis identifying primary revenue drivers',
      'Executive summary memo highlighting top 5 growth levers and operational risks',
      'Cleaned, reproducible analytical scripts and data dictionary documentation'
    ],
    process: [
      {
        step: 1,
        title: 'Business Objective Definition',
        description: 'Define core hypotheses, critical commercial questions, and primary evaluation metrics.',
        deliverable: 'Analytics Project Charter'
      },
      {
        step: 2,
        title: 'Data Extraction & Profiling',
        description: 'Aggregate source data, profile distributions, inspect anomalies, and verify integrity.',
        deliverable: 'Data Quality & Distribution Audit'
      },
      {
        step: 3,
        title: 'Statistical Modeling & Exploration',
        description: 'Run cohort groupings, segmentations, and variance analyses to isolate trends.',
        deliverable: 'Analytical Model Output & Findings'
      },
      {
        step: 4,
        title: 'Executive Insights Briefing',
        description: 'Translate statistical findings into clear commercial recommendations for leadership.',
        deliverable: 'Executive Decision Memo'
      }
    ],
    benefits: [
      {
        title: 'Eliminate Intuition-Based Guesswork',
        description: 'Replace subjective debate in boardrooms with verified, empirical statistical evidence.'
      },
      {
        title: 'Detect Early Churn Signals',
        description: 'Identify behavioral leading indicators that signal customer churn before they cancel.'
      },
      {
        title: 'Maximize Resource Allocation',
        description: 'Direct sales and marketing budgets toward the customer segments with proven highest ROI.'
      }
    ],
    placeholderType: 'chart',
    placeholderTitle: 'Statistical Data Analysis Sandbox',
    placeholderSubtitle: 'Empirical Intelligence • Exploratory Analysis, Cohort Segmentation & Trend Modeling'
  },
  {
    id: 'data-visualization',
    categoryId: 'data-analytics',
    title: 'Data Visualization',
    shortDescription: 'Compelling visual charts, interactive data storytelling, and custom graphic graphics.',
    badge: 'Visual Intelligence',
    iconName: 'BarChart2',
    whatItIs: 'Data Visualization bridges the gap between raw figures and human perception. Using principles of cognitive visual encoding, we design intuitive charts, heatmaps, sankey diagrams, and geospatial maps that allow stakeholders to absorb multidimensional insights in seconds.',
    whatWeProvide: [
      'Custom visual chart libraries designed according to best perceptual practices',
      'Interactive drill-through visual dashboards with dynamic filtering',
      'Geospatial maps, funnel charts, and sankey flow diagrams',
      'Standardized color palettes optimized for numerical contrast and colorblind safety',
      'Interactive web-based visualization components (D3.js / Recharts ready)'
    ],
    process: [
      {
        step: 1,
        title: 'Audience & Story Mapping',
        description: 'Determine what question the viewer needs answered within 3 seconds of seeing the chart.',
        deliverable: 'Data Storyboard & Hierarchy Plan'
      },
      {
        step: 2,
        title: 'Visual Encoding Selection',
        description: 'Select the optimal chart types (avoiding deceptive 3D charts or cluttered visual noise).',
        deliverable: 'Chart Selection Framework'
      },
      {
        step: 3,
        title: 'Color & Typography Hierarchy',
        description: 'Apply intentional contrast colors highlighting critical anomalies, benchmarks, and goals.',
        deliverable: 'Interactive Visual Prototype'
      },
      {
        step: 4,
        title: 'Testing & Cognitive Validation',
        description: 'Validate comprehension speed and ensure zero misinterpretation of axes and scales.',
        deliverable: 'Final Visual Presentation Suite'
      }
    ],
    benefits: [
      {
        title: 'Instant Executive Comprehension',
        description: 'Executives digest complex multi-variable relationships in seconds rather than reading 40-page decks.'
      },
      {
        title: 'Highlight Critical Outliers',
        description: 'Visual alert thresholds immediately flag anomalies requiring urgent operational attention.'
      },
      {
        title: 'Colorblind Accessible Standards',
        description: 'Fully compliant with accessibility standards, ensuring inclusive clarity across your organization.'
      }
    ],
    placeholderType: 'chart',
    placeholderTitle: 'Interactive Data Visualization Suite',
    placeholderSubtitle: 'Visual Perception • Perceptual Chart Encoding, Funnels & Geospatial Insights'
  },
  {
    id: 'power-bi-dashboards',
    categoryId: 'data-analytics',
    title: 'Power BI Dashboards',
    shortDescription: 'Enterprise Power BI reports, scalable star-schema DAX models, and automated refresh gateways.',
    badge: 'Microsoft BI Stack',
    iconName: 'Layers',
    whatItIs: 'Power BI Dashboards provide enterprise organizations with real-time, self-service business intelligence. We architect robust star-schema data models, write performant DAX measures, configure Power Query ETL transformations, and design sleek executive reports that update automatically.',
    whatWeProvide: [
      'End-to-end Power BI report (.PBIX) architecture with responsive mobile layouts',
      'Performant DAX calculations (Time intelligence, YoY, YTD, running totals, dynamic ranking)',
      'Star-schema dimensional modeling (Fact tables, Dimension tables, surrogate keys)',
      'Row-Level Security (RLS) implementation for multi-department data privacy',
      'Scheduled cloud gateway refresh configuration in Power BI Service'
    ],
    process: [
      {
        step: 1,
        title: 'Data Modeling & ETL',
        description: 'Connect to databases/APIs via Power Query, clean data types, and build clean Star Schemas.',
        deliverable: 'Optimized Tabular Data Model'
      },
      {
        step: 2,
        title: 'DAX Business Logic Engineering',
        description: 'Write efficient, non-blocking DAX measures using variables and calculation groups.',
        deliverable: 'Documented DAX Measure Repository'
      },
      {
        step: 3,
        title: 'Report Layout & Visual Hierarchy',
        description: 'Design executive summary pages with drill-through bookmarks and custom tooltips.',
        deliverable: 'Interactive Power BI Dashboard'
      },
      {
        step: 4,
        title: 'Security, Publishing & Gateway Setup',
        description: 'Configure workspace app permissions, RLS roles, and automated hourly/daily refresh cycles.',
        deliverable: 'Live Power BI Service Deployment'
      }
    ],
    benefits: [
      {
        title: 'Real-Time Operational Visibility',
        description: 'Dashboards automatically refresh directly from source databases with zero manual labor.'
      },
      {
        title: 'Sub-Second Query Speeds',
        description: 'Optimized VertiPaq engine modeling ensures snappy interactions across millions of records.'
      },
      {
        title: 'Strict Row-Level Security',
        description: 'Regional managers only see their designated territories, keeping sensitive executive figures private.'
      }
    ],
    placeholderType: 'dashboard',
    placeholderTitle: 'Enterprise Power BI Cockpit',
    placeholderSubtitle: 'Microsoft BI • Star-Schema DAX Modeling, Automated Gateways & Executive Bookmarks'
  },
  {
    id: 'excel-dashboards',
    categoryId: 'data-analytics',
    title: 'Excel Dashboards',
    shortDescription: 'Advanced Excel financial models, dynamic Power Query workbooks, and automated VBA macros.',
    badge: 'Spreadsheet Mastery',
    iconName: 'FileSpreadsheet',
    whatItIs: 'Excel Dashboards elevate standard spreadsheets into resilient, automated analytical applications. We build dynamic workbooks powered by Power Query, modern dynamic array formulas (XLOOKUP, FILTER, UNIQUE), interactive slicers, and error-proof financial models that anyone can run.',
    whatWeProvide: [
      'Dynamic, clean Excel dashboard models with interactive slicers and timelines',
      'Automated Power Query connections refreshing from external CSVs/APIs with one click',
      'Robust financial modeling (Budget vs. Actual, P&L forecasts, cash flow runways)',
      'Data validation rules, protected worksheets, and automated error-checking checks',
      'Optional VBA macro automation for routine report generation and email dispatch'
    ],
    process: [
      {
        step: 1,
        title: 'Source Data Structure & Audit',
        description: 'Audit legacy spreadsheets, eliminate circular references, and isolate clean inputs.',
        deliverable: 'Standardized Data Architecture'
      },
      {
        step: 2,
        title: 'Power Query Automation',
        description: 'Build automated data transformation steps to append, unpivot, and merge recurring files.',
        deliverable: 'One-Click Refresh Pipeline'
      },
      {
        step: 3,
        title: 'Formula & Calculation Engine',
        description: 'Write modular formulas using modern Excel dynamic arrays and structured table references.',
        deliverable: 'Calculation Engine Layer'
      },
      {
        step: 4,
        title: 'Dashboard Interface & Protection',
        description: 'Style a polished executive dashboard tab, lock formula cells, and add user documentation.',
        deliverable: 'Turnkey Excel Master Workbook'
      }
    ],
    benefits: [
      {
        title: 'No New Software Licensing Needed',
        description: 'Leverage the Microsoft Excel software your entire organization already owns and uses daily.'
      },
      {
        title: 'Eliminate Repetitive Manual Copy-Paste',
        description: 'Power Query transforms hours of weekly spreadsheet wrangling into a single click of "Refresh All".'
      },
      {
        title: 'Foolproof Data Entry Controls',
        description: 'Locked calculation sheets and drop-down validations prevent accidental formula destruction by staff.'
      }
    ],
    placeholderType: 'spreadsheet',
    placeholderTitle: 'Automated Excel Master Dashboard',
    placeholderSubtitle: 'Spreadsheet Engineering • Power Query ETL, Dynamic Arrays & Financial Modeling'
  },
  {
    id: 'sql-data-analysis',
    categoryId: 'data-analytics',
    title: 'SQL Data Analysis',
    shortDescription: 'Relational database querying, CTE pipelines, window functions, and database view optimization.',
    badge: 'Database Engineering',
    iconName: 'Database',
    whatItIs: 'SQL Data Analysis queries enterprise relational databases (PostgreSQL, MySQL, Snowflake, BigQuery, SQL Server) to extract actionable metrics from millions of rows. We write clean, indexed, and documented SQL queries, CTE pipelines, and persistent database views.',
    whatWeProvide: [
      'Custom SQL scripts leveraging Window Functions, CTEs, and conditional aggregations',
      'Database view and materialized view architectures for dashboard acceleration',
      'Data integrity checks, deduplication queries, and referential validation routines',
      'Query execution plan profiling and performance index tuning',
      'Comprehensive data dictionary documenting table relationships and primary/foreign keys'
    ],
    process: [
      {
        step: 1,
        title: 'Schema Exploration & ERD Mapping',
        description: 'Inspect relational schemas, join constraints, and cardinality across enterprise tables.',
        deliverable: 'Entity Relationship Diagram (ERD)'
      },
      {
        step: 2,
        title: 'Query Architecture & CTE Logic',
        description: 'Write clean, modular Common Table Expressions that break complex logic into readable stages.',
        deliverable: 'Version-Controlled SQL Scripts'
      },
      {
        step: 3,
        title: 'Performance Profiling & Optimization',
        description: 'Analyze EXPLAIN ANALYZE execution plans, resolve sequential scans, and suggest indexing.',
        deliverable: 'Optimized Query Benchmarks'
      },
      {
        step: 4,
        title: 'Materialized Views & Automation',
        description: 'Package queries into reusable views or scheduled cron tasks ready for BI tools to consume.',
        deliverable: 'Production Database Views'
      }
    ],
    benefits: [
      {
        title: 'Extract Ground-Truth Business Realities',
        description: 'Query production databases directly to eliminate discrepancies between third-party marketing tools.'
      },
      {
        title: 'Massive Compute Cost Reductions',
        description: 'Optimized queries and pre-aggregated views slash warehouse scan costs in Snowflake and BigQuery.'
      },
      {
        title: 'Scales Gracefully to Billions of Rows',
        description: 'Enterprise SQL architectures handle massive transaction volumes without crashing or slowing down.'
      }
    ],
    placeholderType: 'sql',
    placeholderTitle: 'Relational SQL Query & Warehouse Architecture',
    placeholderSubtitle: 'Database Precision • Window Functions, CTE Pipelines & Materialized Performance Views'
  },
  {
    id: 'business-reports',
    categoryId: 'data-analytics',
    title: 'Business Reports',
    shortDescription: 'Executive monthly packs, stakeholder summaries, automated PDF reporting, and board decks.',
    badge: 'Executive Reporting',
    iconName: 'FileText',
    whatItIs: 'Business Reports distill complex cross-departmental operations into crisp, structured executive briefing documents. Whether preparing quarterly board presentations, investor updates, or automated weekly performance reports, we deliver reports that inspire stakeholder confidence.',
    whatWeProvide: [
      'Executive Monthly / Quarterly Management Reporting Packs',
      'Automated PDF report generation templates and distributions',
      'Variance analysis commentary (Actual vs. Budget vs. Prior Year)',
      'Cross-departmental scorecards (Marketing, Sales, Operations, Finance)',
      'Presentation-ready executive slide decks with data-grounded narratives'
    ],
    process: [
      {
        step: 1,
        title: 'Reporting Cadence & Audience Audit',
        description: 'Determine exact reporting rhythms (Weekly, Monthly, Quarterly) and key stakeholder priorities.',
        deliverable: 'Reporting Governance Framework'
      },
      {
        step: 2,
        title: 'Template Architecture & Formatting',
        description: 'Design clean, editorial report templates with consistent typography, tables, and callouts.',
        deliverable: 'Standardized Report Template'
      },
      {
        step: 3,
        title: 'Data Pipeline Integration',
        description: 'Connect reporting templates directly to live data sources to eliminate manual copy-pasting.',
        deliverable: 'Automated Generation Pipeline'
      },
      {
        step: 4,
        title: 'Executive Review & Delivery Protocol',
        description: 'Establish verification sign-offs and automated scheduled email or PDF delivery routines.',
        deliverable: 'Live Reporting Distribution System'
      }
    ],
    benefits: [
      {
        title: 'Flawless Boardroom Preparedness',
        description: 'Present investors and directors with institutional-grade reports that reflect operational maturity.'
      },
      {
        title: 'Saves 20+ Hours per Month',
        description: 'Automated data pulling and standardized formats eliminate frantic end-of-month reporting rushes.'
      },
      {
        title: 'Unified Cross-Departmental Truth',
        description: 'Ensure sales, finance, and marketing all report numbers using the exact same calculation logic.'
      }
    ],
    placeholderType: 'chart',
    placeholderTitle: 'Executive Business Report Matrix',
    placeholderSubtitle: 'Governance & Reporting • Monthly Board Packs, Variance Commentary & Scorecards'
  },
  {
    id: 'kpi-dashboards',
    categoryId: 'data-analytics',
    title: 'KPI Dashboards',
    shortDescription: 'High-visibility target tracking, real-time pacing monitors, and OKR achievement scorecards.',
    badge: 'Performance Tracking',
    iconName: 'Target',
    whatItIs: 'KPI Dashboards focus your entire company on the exact metrics that move the business forward. We establish North Star metrics, build real-time pacing gauges against monthly targets, configure red/yellow/green threshold alerts, and track team OKR progress in a single unified view.',
    whatWeProvide: [
      'North Star Metric definition and cascading operational KPI hierarchy',
      'Real-time pacing monitors comparing month-to-date performance against monthly quota',
      'Threshold alert systems flagging underperforming metrics before they miss targets',
      'Team & departmental leaderboard scorecards',
      'TV / Wallboard display modes optimized for office screens and remote team huddles'
    ],
    process: [
      {
        step: 1,
        title: 'KPI Hierarchy & Target Setting',
        description: 'Define North Star metric, supporting input metrics, and realistic benchmark targets.',
        deliverable: 'KPI Tree & Target Matrix'
      },
      {
        step: 2,
        title: 'Visual Pacing Architecture',
        description: 'Design intuitive progress bars, bullet charts, and variance gauges that show status instantly.',
        deliverable: 'Pacing Layout Wireframe'
      },
      {
        step: 3,
        title: 'Automated Threshold Rules',
        description: 'Program conditional formatting and notification rules based on target pacing percentages.',
        deliverable: 'Alert Trigger Configuration'
      },
      {
        step: 4,
        title: 'Live Deployment & Display Tuning',
        description: 'Deploy the dashboard across desktop browsers, mobile executive views, and wall screens.',
        deliverable: 'Live Pacing Dashboard'
      }
    ],
    benefits: [
      {
        title: 'Accelerated Team Focus & Velocity',
        description: 'When every employee sees live target progress daily, team effort naturally rallies around targets.'
      },
      {
        title: 'Proactive Mid-Month Course Correction',
        description: 'Catch pacing deficits by Day 10 of the month while there is still ample time to intervene.'
      },
      {
        title: 'Transparent Company Accountability',
        description: 'Clear objective numbers build an ownership culture where achievements are celebrated with proof.'
      }
    ],
    placeholderType: 'dashboard',
    placeholderTitle: 'Real-Time KPI & Pacing Command Center',
    placeholderSubtitle: 'Target Alignment • North Star Tracking, Target Gauges & Alert Thresholds'
  },
  {
    id: 'data-cleaning',
    categoryId: 'data-analytics',
    title: 'Data Cleaning',
    shortDescription: 'Deduplication, schema normalization, outlier treatment, and automated ETL pipelines.',
    badge: 'Data Hygiene',
    iconName: 'Sparkles',
    whatItIs: 'Data Cleaning (Data Wrangling) transforms dirty, fragmented, and duplicate datasets into pristine, reliable assets. We standardize disparate date/currency formats, resolve NULL values, remove duplicate records, validate postal/email formats, and automate repeat sanitization workflows.',
    whatWeProvide: [
      'Comprehensive data quality audit and hygiene score assessment',
      'Fuzzy matching and deduplication algorithms across customer databases',
      'Schema normalization and standard naming convention enforcement',
      'Handling of missing values, anomalies, and statistical outliers',
      'Automated repeatable Python or Power Query data sanitization pipelines'
    ],
    process: [
      {
        step: 1,
        title: 'Raw Data Profiling & Audit',
        description: 'Run diagnostic scans detecting null counts, duplicate keys, format mismatches, and outliers.',
        deliverable: 'Data Quality Audit Report'
      },
      {
        step: 2,
        title: 'Sanitization Rules Definition',
        description: 'Establish standard format rules for dates, phone numbers, uppercase/lowercase, and addresses.',
        deliverable: 'Data Cleaning Specification'
      },
      {
        step: 3,
        title: 'Automated Pipeline Construction',
        description: 'Write robust transformation scripts in Python/Pandas, SQL, or Power Query.',
        deliverable: 'Automated Sanitization Script'
      },
      {
        step: 4,
        title: 'Validation & Golden Record Export',
        description: 'Verify cleaned data against reference datasets and export pristine Golden Record tables.',
        deliverable: 'Pristine Verified Dataset'
      }
    ],
    benefits: [
      {
        title: 'Trustworthy Analytics Outputs',
        description: 'Garbage in, garbage out: clean data guarantees that downstream dashboards and models are 100% accurate.'
      },
      {
        title: 'Prevent Duplicate Marketing Waste',
        description: 'Deduplicating CRM records prevents paying double postage, email sends, or conflicting sales outreach.'
      },
      {
        title: 'Seamless System Migrations',
        description: 'Sanitize historical data before importing it into new CRMs, ERPs, or data warehouses.'
      }
    ],
    placeholderType: 'sql',
    placeholderTitle: 'Data Hygiene & ETL Normalization Pipeline',
    placeholderSubtitle: 'Data Integrity • Deduplication, Format Normalization & Automated Sanitization'
  },
  {
    id: 'business-insights',
    categoryId: 'data-analytics',
    title: 'Business Insights',
    shortDescription: 'Strategic growth audits, pricing sensitivity analysis, and competitive market positioning.',
    badge: 'Strategic Growth',
    iconName: 'Lightbulb',
    whatItIs: 'Business Insights transforms empirical data into actionable strategic moves that grow top-line revenue and expand operating margins. We combine quantitative telemetry with business acumen to recommend pricing optimizations, product feature investments, and customer expansion strategies.',
    whatWeProvide: [
      'Comprehensive commercial growth opportunity audits',
      'Pricing sensitivity analysis and willingness-to-pay elasticity modeling',
      'Customer acquisition channel profitability and payback period analysis',
      'Market share and competitive positioning data assessments',
      'Executive strategic roadmap with prioritized quick wins vs. long-term initiatives'
    ],
    process: [
      {
        step: 1,
        title: 'Commercial Landscape Review',
        description: 'Analyze current P&L, customer unit economics, market dynamics, and competitive moats.',
        deliverable: 'Commercial Diagnostic Overview'
      },
      {
        step: 2,
        title: 'Quantitative Opportunity Mining',
        description: 'Deep-dive into revenue segments to identify under-monetized features and margin leaks.',
        deliverable: 'Growth Lever Prioritization Deck'
      },
      {
        step: 3,
        title: 'Scenario & Financial Sensitivity Modeling',
        description: 'Model the revenue impact of price changes, conversion improvements, and retention gains.',
        deliverable: 'Financial Sensitivity Model'
      },
      {
        step: 4,
        title: 'Actionable Strategic Roadmap',
        description: 'Deliver an executive roadmap outlining exact steps, owners, and expected timeline of impact.',
        deliverable: 'Strategic Execution Playbook'
      }
    ],
    benefits: [
      {
        title: 'Uncover Hidden Profit Margins',
        description: 'Identify product lines and customer segments generating outsized profit margins and double down.'
      },
      {
        title: 'De-Risk Major Strategic Bets',
        description: 'Validate multi-million dollar product or market expansion decisions with rigorous quantitative modeling.'
      },
      {
        title: 'Direct Alignment with Founder Vision',
        description: 'Connect daily operational metrics directly to founder valuation goals and investor milestones.'
      }
    ],
    placeholderType: 'chart',
    placeholderTitle: 'Strategic Business Insights & Growth Playbook',
    placeholderSubtitle: 'Commercial Advantage • Unit Economics, Pricing Sensitivity & Strategic Roadmap'
  }
];
