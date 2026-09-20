import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme, ServiceCardData, PortfolioProject } from './types';
import { SV_LOGO_URL } from './assets/images';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Portfolio } from './components/Portfolio';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Contact } from './components/Contact';
import { StartProjectModal } from './components/StartProjectModal';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  // Theme Management
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sv-studio-theme') as Theme;
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sv-studio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Active Section Tracker for Sticky Nav
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'why-us', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Modal States
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('UI/UX Design');
  const [formInitialData, setFormInitialData] = useState<{ title?: string; type?: string; description?: string } | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  
  // Premium Cinematic Logo Intro Animation (Plays on every page load, ~2.7s duration)
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenStartProjectWithService = (serviceType?: string) => {
    if (serviceType) {
      setPreselectedService(serviceType);
      setFormInitialData({
        type: serviceType,
      });
    } else {
      setFormInitialData(undefined);
    }
    setIsStartProjectOpen(true);
  };

  // Connected to the 'Select Project' button
  const handleSelectProject = (project: PortfolioProject) => {
    const projectTypeMapping: Record<string, string> = {
      'Fintech Mobile Banking App': 'Mobile App UI/UX',
      'Executive SaaS Analytics Cockpit': 'Dashboard UI Design',
      'Healthcare Patient Portal & Telehealth': 'Website Design',
      'Retail Inventory & Demand Forecasting ML': 'Python Data Analysis',
      'Enterprise Cloud Cost Governance BI': 'Power BI Dashboard',
      'B2B Logistics Freight Management Suite': 'Website Development',
    };
    const prefilledType = projectTypeMapping[project.title] || (project.category === 'ui-ux' ? 'UI/UX Design' : 'Data Analytics');

    setFormInitialData({
      title: project.title,
      type: prefilledType,
      description: `I am interested in initiating a project based on "${project.title}". Key requirements and objectives: ${project.description}`,
    });
    setIsStartProjectOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-purple-600 selection:text-white transition-colors duration-300">
      {/* Premium Cinematic Logo Intro (Full-screen dark background, 70% -> 100%, glow, floating, light sweep, forward zoom, and seamless fade) */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            id="sv-brand-intro-animation"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080d] text-white overflow-hidden select-none cursor-pointer"
            onClick={() => setShowIntro(false)}
          >
            {/* Ambient Background Radial Violet Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.18)_0%,rgba(79,70,229,0.08)_40%,transparent_70%)] pointer-events-none" />

            {/* Centered Brand Container: Starts at 70% scale and 0% opacity, fades in & scales up to 100%, pauses, then zooms slightly toward viewer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: [0, 1, 1, 1],
                scale: [0.7, 1.0, 1.0, 1.12],
              }}
              transition={{
                duration: 2.7,
                times: [0, 0.38, 0.7, 1],
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="relative flex flex-col items-center gap-6 px-6 text-center z-10"
            >
              {/* Floating Motion Wrapper */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative flex items-center justify-center"
              >
                {/* Subtle Glow Aura behind Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{
                    opacity: [0, 0.55, 0.7, 0.9],
                    scale: [0.75, 1, 1, 1.14],
                  }}
                  transition={{
                    duration: 2.7,
                    times: [0, 0.38, 0.7, 1],
                    ease: 'easeOut',
                  }}
                  className="absolute -inset-10 sm:-inset-16 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.36)_0%,rgba(99,102,241,0.2)_50%,transparent_70%)] blur-2xl sm:blur-3xl pointer-events-none"
                />

                {/* Logo Frame with Soft Light Sweep Effect */}
                <div className="relative overflow-hidden rounded-2xl p-1">
                  <img
                    src={SV_LOGO_URL}
                    alt="SV Digital Studio Logo"
                    referrerPolicy="no-referrer"
                    className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain rounded-2xl drop-shadow-[0_0_40px_rgba(147,51,234,0.35)]"
                  />

                  {/* Soft Light Sweep traveling diagonally across the logo */}
                  <motion.div
                    initial={{ x: '-130%', opacity: 0 }}
                    animate={{
                      x: '210%',
                      opacity: [0, 0.85, 0.85, 0],
                    }}
                    transition={{
                      delay: 0.75,
                      duration: 1.25,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="absolute inset-0 -skew-x-25 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Studio Tagline Beneath Logo */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center mt-1"
              >
                <p className="text-xs sm:text-sm font-medium tracking-[0.32em] sm:tracking-[0.36em] uppercase text-purple-200/95 drop-shadow-sm">
                  Design <span className="text-purple-400 mx-1.5">•</span> Innovate <span className="text-purple-400 mx-1.5">•</span> Elevate
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Navigation (Staggered entrance 1: fades in after intro) */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{
          opacity: showIntro ? 0 : 1,
          y: showIntro ? -14 : 0,
        }}
        transition={{
          duration: 0.75,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenStartProject={() => handleOpenStartProjectWithService()}
        />
      </motion.div>

      <main className="relative">
        {/* Hero Section (Staggered entrance 2: fades in after navbar) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{
            opacity: showIntro ? 0 : 1,
            y: showIntro ? 22 : 0,
          }}
          transition={{
            duration: 0.85,
            delay: 0.26,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Hero
            onStartProject={() => handleOpenStartProjectWithService()}
            onViewPortfolio={() => handleNavigate('portfolio')}
            onExploreServices={() => handleNavigate('services')}
          />
        </motion.div>

        {/* Content Sections (Staggered entrance 3: fades in after hero) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: showIntro ? 0 : 1,
            y: showIntro ? 24 : 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* About Section (Story, Mission, Vision, Values, 2 Founder Cards with Socials) */}
          <About />

          {/* Services Section (Two big cards: UI/UX & Data Analytics with Explore buttons) */}
          <Services
            onExploreService={(service) => setSelectedService(service)}
            onStartProject={(serviceType) => handleOpenStartProjectWithService(serviceType)}
          />

          {/* Portfolio Section (Modern Project Cards, Tags, Filter, Select Project button) */}
          <Portfolio
            onSelectProject={handleSelectProject}
          />

          {/* Why Choose Us Section (7 cards as requested) */}
          <WhyChooseUs />

          {/* Contact Section (Top contact info, two simple founder cards, Start Project button) */}
          <Contact
            onOpenStartProject={() => handleOpenStartProjectWithService()}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenStartProject={() => handleOpenStartProjectWithService()}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* In-Depth Service Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onStartProjectForService={(serviceTitle) => {
          setSelectedService(null);
          handleOpenStartProjectWithService(serviceTitle);
        }}
      />

      {/* Detailed Project Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={(context) => {
          setSelectedProject(null);
          handleOpenStartProjectWithService(context);
        }}
      />

      {/* Interactive Project Intake Form (Professional Google Form modal) */}
      <StartProjectModal
        isOpen={isStartProjectOpen}
        onClose={() => {
          setIsStartProjectOpen(false);
          setFormInitialData(undefined);
        }}
        defaultService={preselectedService}
        initialData={formInitialData}
      />

      {/* Legal Privacy & Terms Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
