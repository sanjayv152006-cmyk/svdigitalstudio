import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Mail, User, Check, Copy, Upload, Camera, Linkedin } from 'lucide-react';
import { SiInstagram, SiGmail } from 'react-icons/si';
import { SANJAY_PORTRAIT_URL, VINJITHA_PORTRAIT_URL } from '../assets/images';

const InstagramAppIcon = SiInstagram as React.ComponentType<{ className?: string; size?: number | string }>;
const GmailAppIcon = SiGmail as React.ComponentType<{ className?: string; size?: number | string }>;

interface FounderProfile {
  id: string;
  name: string;
  role: 'CEO & Founder';
  title: string;
  focus: string;
  photoUrl?: string;
  socials: {
    linkedin: string;
    instagram: string;
    github: string;
    email: string;
  };
}

const FOUNDER_PROFILES: FounderProfile[] = [
  {
    id: 'sanjay-s',
    name: 'Sanjay S',
    role: 'CEO & Founder',
    title: 'Lead - UI/UX Design',
    focus: 'UI/UX Design',
    photoUrl: SANJAY_PORTRAIT_URL,
    socials: {
      linkedin: 'https://www.linkedin.com/in/s-sanjay-b34509364/',
      instagram: 'https://www.instagram.com/_.sanjuzz_x___?igsi=dnF1aG1nMmZoMmdl',
      github: 'https://github.com/sanjayv152006-cmyk',
      email: 'sanjaysanju152006@gmail.com',
    },
  },
  {
    id: 'vinjitha-r',
    name: 'Vinjitha R',
    role: 'CEO & Founder',
    title: 'Lead - Data Analytics',
    focus: 'Data Analytics',
    photoUrl: VINJITHA_PORTRAIT_URL,
    socials: {
      linkedin: 'https://www.linkedin.com/in/vinjithar-analytics',
      instagram: 'https://www.instagram.com/_.vinjuzz_x___?stkn=NHhoaWc4bGYycXVy',
      github: 'https://github.com/vinjithar-analytics',
      email: 'vinjitha15@gmail.com',
    },
  },
];

export const About: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Instagram URLs per founder (persisted in localStorage)
  const [instagramUrls, setInstagramUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      FOUNDER_PROFILES.forEach((founder) => {
        const saved = localStorage.getItem(`founder_instagram_${founder.id}`);
        if (saved && !saved.includes('vinjithar_analytics') && !saved.includes('svdesignstudio')) {
          initial[founder.id] = saved;
        } else {
          initial[founder.id] = founder.socials.instagram;
        }
      });
    }
    return initial;
  });

  // LinkedIn URLs per founder (persisted in localStorage)
  const [linkedinUrls, setLinkedinUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      FOUNDER_PROFILES.forEach((founder) => {
        const saved = localStorage.getItem(`founder_linkedin_${founder.id}`);
        if (saved && saved !== 'https://www.linkedin.com/in/sanjays-design') {
          initial[founder.id] = saved;
        } else {
          initial[founder.id] = founder.socials.linkedin;
        }
      });
    }
    return initial;
  });

  // Email addresses per founder (persisted in localStorage)
  const [founderEmails, setFounderEmails] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      FOUNDER_PROFILES.forEach((founder) => {
        const saved = localStorage.getItem(`founder_email_${founder.id}`);
        if (saved) {
          initial[founder.id] = saved;
        } else {
          initial[founder.id] = founder.socials.email;
        }
      });
    }
    return initial;
  });

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string, name: string) => {
    // If user is on a mobile device, launch the native mail client
    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      e.preventDefault();
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Project Inquiry for ${name} - SV Digital Studio`)}`;
    }
  };

  // Exact original photo state (persisted locally & on server)
  const [photos, setPhotos] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      FOUNDER_PROFILES.forEach((founder) => {
        const savedData = localStorage.getItem(`founder_exact_photo_${founder.id}`);
        const savedUrl = localStorage.getItem(`founder_photo_url_${founder.id}`);
        if (savedData) {
          initial[founder.id] = savedData;
        } else if (savedUrl) {
          initial[founder.id] = savedUrl;
        } else if (founder.photoUrl) {
          initial[founder.id] = founder.photoUrl;
        }
      });
    }
    return initial;
  });

  useEffect(() => {
    // 1. Check server disk for any saved founder portraits
    fetch('/api/founder-photos')
      .then((res) => res.json())
      .then((data) => {
        if (data?.photos) {
          setPhotos((prev) => {
            const next = { ...prev };
            for (const [id, url] of Object.entries(data.photos as Record<string, string>)) {
              // Only override if not currently showing a freshly uploaded data URL
              if (!next[id] || !next[id].startsWith('data:')) {
                next[id] = url;
              }
            }
            return next;
          });
          FOUNDER_PROFILES.forEach((f) => {
            if (data.photos[f.id]) {
              setImageErrors((prev) => ({ ...prev, [f.id]: false }));
            }
          });
        }
      })
      .catch(() => {});

    // 2. Candidate images check
    FOUNDER_PROFILES.forEach((founder) => {
      const candidates = [
        `/${founder.id === 'sanjay-s' ? 'sanjay' : founder.id}_portrait.jpg`,
        `/${founder.id}_portrait.jpg`,
      ];

      candidates.forEach((candidate) => {
        const img = new Image();
        img.src = candidate;
        img.onload = () => {
          setPhotos((prev) => {
            if (prev[founder.id] && prev[founder.id].startsWith('data:')) return prev;
            return {
              ...prev,
              [founder.id]: candidate,
            };
          });
          setImageErrors((prev) => ({ ...prev, [founder.id]: false }));
        };
      });
    });

    // 3. Auto-sync any unsaved base64 dataUrl from localStorage to server disk
    FOUNDER_PROFILES.forEach(async (founder) => {
      const saved = localStorage.getItem(`founder_exact_photo_${founder.id}`);
      if (saved && saved.startsWith('data:')) {
        try {
          const res = await fetch('/api/upload-founder-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ founderId: founder.id, dataUrl: saved }),
          });
          const data = await res.json();
          if (data?.url) {
            try {
              localStorage.setItem(`founder_photo_url_${founder.id}`, data.url);
            } catch {
              // Ignore
            }
          }
        } catch {
          // ignore
        }
      }
    });
  }, []);

  const handlePhotoSelected = (founderId: string, file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageErrors((prev) => ({ ...prev, [founderId]: false }));

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        // 1. Immediately display the exact uploaded image inside the portrait placeholder
        setPhotos((prev) => ({ ...prev, [founderId]: dataUrl }));

        try {
          localStorage.setItem(`founder_exact_photo_${founderId}`, dataUrl);
        } catch {
          // Ignore localStorage quota
        }

        try {
          const res = await fetch('/api/upload-founder-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ founderId, dataUrl }),
          });
          const data = await res.json();
          if (data?.url) {
            try {
              localStorage.setItem(`founder_photo_url_${founderId}`, data.url);
            } catch {
              // Ignore
            }
          }
        } catch (err) {
          console.error('Photo upload sync error:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopyContact = (founder: FounderProfile) => {
    const toEmail = founderEmails[founder.id] || founder.socials.email;
    const contactText = `${founder.name} (${founder.role} • ${founder.title})\nEmail: ${toEmail}\nLinkedIn: ${linkedinUrls[founder.id] || founder.socials.linkedin}\nInstagram: ${instagramUrls[founder.id] || founder.socials.instagram}\nGitHub: ${founder.socials.github}`;
    navigator.clipboard.writeText(contactText);
    setCopiedId(founder.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="service-tag block mb-3">About Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            About SV Digital Studio
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Founded and directed by leadership with deep mastery in UI/UX architecture and empirical data analytics.
          </p>
        </motion.div>

        {/* Two-Person Founder Profiles (Side-by-Side on Desktop, Stacked on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {FOUNDER_PROFILES.map((founder, index) => {
            const rawPhoto = photos[founder.id];
            const hasError = imageErrors[founder.id];
            const currentPhoto = !hasError && rawPhoto ? rawPhoto : null;

            return (
              <motion.div
                key={founder.id}
                id={`founder-card-${founder.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Large Rectangular Portrait / Image Area at Top (No circular crop) - Static & Non-clickable */}
                  <div
                    id={`founder-portrait-placeholder-${founder.id}`}
                    className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 flex flex-col items-center justify-center transition-all ${
                      currentPhoto
                        ? 'border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-800 shadow-sm'
                        : 'bg-slate-100/90 dark:bg-slate-800/70 border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center'
                    }`}
                  >
                    {currentPhoto ? (
                      <img
                        src={currentPhoto}
                        alt={`${founder.name} - ${founder.role}`}
                        className="w-full h-full object-cover object-top pointer-events-none select-none"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (!currentPhoto.startsWith('data:')) {
                            setImageErrors((prev) => ({ ...prev, [founder.id]: true }));
                          }
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 select-none">
                        <span className="text-xs font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                          {founder.name}
                        </span>
                      </div>
                    )}

                    {/* Corner Badge displaying discipline */}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 shadow-xs backdrop-blur-xs">
                        {founder.focus}
                      </span>
                    </div>
                  </div>

                  {/* Founder Info */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {founder.name}
                    </h3>
                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-200/50 dark:border-purple-800/50">
                      {founder.role}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {founder.title}
                  </p>
                </div>
              </div>

              {/* Social / Contact Buttons (Instagram, GitHub, Email, LinkedIn) */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 flex-nowrap">
                  {/* Instagram Button */}
                  <a
                    id={`founder-instagram-link-${founder.id}`}
                    href={instagramUrls[founder.id] || founder.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} Instagram`}
                    title={`Visit ${founder.name} on Instagram`}
                    className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <InstagramAppIcon className="w-5 h-5 text-white" />
                  </a>

                  {/* GitHub Button */}
                  <a
                    id={`founder-github-link-${founder.id}`}
                    href={founder.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} GitHub`}
                    title={`Visit ${founder.name} on GitHub`}
                    className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-[#24292e] dark:bg-[#1f2328] text-white border border-slate-700/40 flex items-center justify-center shadow-md shadow-slate-900/25 hover:bg-[#181717] dark:hover:bg-[#161b22] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <Github className="w-5 h-5 stroke-[2] text-white" />
                  </a>

                  {/* Email Button (Opens web compose mail directly with To: recipient prefilled) */}
                  {(() => {
                    const toEmail = founderEmails[founder.id] || founder.socials.email;
                    const mailSubject = encodeURIComponent(`Project Inquiry for ${founder.name} - SV Digital Studio`);
                    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toEmail)}&su=${mailSubject}`;

                    return (
                      <a
                        id={`founder-email-link-${founder.id}`}
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleEmailClick(e, toEmail, founder.name)}
                        aria-label={`Compose email to ${founder.name} (${toEmail})`}
                        title={`Compose email to ${toEmail}`}
                        className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-[#EA4335] text-white border border-[#d93025] flex items-center justify-center shadow-md shadow-red-500/25 hover:bg-[#d93025] hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                      >
                        <GmailAppIcon className="w-5 h-5 text-white" />
                      </a>
                    );
                  })()}

                  {/* LinkedIn Profile Button */}
                  <a
                    id={`founder-linkedin-link-${founder.id}`}
                    href={linkedinUrls[founder.id] || founder.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} LinkedIn Profile`}
                    title={`Visit ${founder.name} on LinkedIn`}
                    className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-[#0A66C2] text-white border border-[#084e96] flex items-center justify-center shadow-md shadow-blue-500/25 hover:bg-[#084e96] hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <Linkedin className="w-5 h-5 stroke-[2] text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

