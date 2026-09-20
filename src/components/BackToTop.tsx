import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      id="back-to-top-btn"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-xl hover:bg-purple-600 dark:hover:bg-purple-600 dark:hover:text-white hover:ring-2 hover:ring-purple-500/30 transition-all duration-200 hover:-translate-y-1 active:translate-y-0 cursor-pointer border border-zinc-800 dark:border-zinc-200"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
