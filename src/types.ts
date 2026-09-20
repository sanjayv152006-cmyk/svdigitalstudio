export type Theme = 'light' | 'dark';

export interface SocialLinks {
  instagram: string;
  github: string;
  email: string;
  linkedin?: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  avatarSeed: string;
  skills: string[];
  social: SocialLinks;
  contactEmail: string;
  contactPhone: string;
  availability: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface ServiceSample {
  title: string;
  category: string;
  description: string;
  keyMetric: string;
  tags: string[];
}

export interface ServiceCardData {
  id: 'ui-ux' | 'data-analytics';
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  icon: string;
  accentColor: string;
  capabilities: string[];
  tools: string[];
  workflow: WorkflowStep[];
  samples: ServiceSample[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'ui-ux' | 'data-analytics' | 'all';
  categoryLabel: string;
  description: string;
  fullCaseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    impact: string[];
  };
  technologies: string[];
  accentGradient: string;
  mockupType: 'mobile-app' | 'dashboard' | 'web-platform' | 'analytics-cockpit';
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
}

export interface ProjectInquiryData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  fileName?: string;
}
