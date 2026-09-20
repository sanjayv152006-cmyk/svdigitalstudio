import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { Theme } from '../types';
import { SV_LOGO_URL } from '../assets/images';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenStartProject: () => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'why-us', label: 'Why Choose Us' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  activeSection,
  onNavigate,
  onOpenStartProject,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/90 py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
          >
            <img
              src={SV_LOGO_URL}
              alt="SV Digital Studio Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-contain shadow-xs border border-slate-200/60 dark:border-slate-800/80 group-hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                SV DIGITAL STUDIO
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.1em] text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-900/50">
                Design & Data
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-1 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions: Dark/Light Mode & Start Project CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-theme-toggle-desktop"
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              id="nav-start-project-btn-desktop"
              onClick={onOpenStartProject}
              className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:ring-2 hover:ring-purple-500/30 transition-all cursor-pointer"
            >
              Start Project
            </button>
          </div>

          {/* Mobile Hamburger & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="nav-theme-toggle-mobile"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            <button
              id="nav-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800 px-5 pt-4 pb-6 shadow-xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Mobile Drawer Brand Logo Header */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 text-left cursor-pointer focus:outline-hidden"
            >
              <img
                src={SV_LOGO_URL}
                alt="SV Digital Studio Logo"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-contain border border-zinc-200/70 dark:border-zinc-800 shadow-xs"
              />
              <div>
                <span className="block font-bold text-sm text-slate-900 dark:text-white">
                  SV DIGITAL STUDIO
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Design &amp; Data
                </span>
              </div>
            </button>
          </div>

          <div className="flex flex-col space-y-2 py-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-mobile-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <button
              id="nav-start-project-btn-mobile"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStartProject();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-black text-white hover:bg-purple-900 hover:ring-2 hover:ring-purple-500/20 shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Start Your Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
