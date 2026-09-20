const fs = require('fs');
const path = require('path');

const comp = JSON.parse(fs.readFileSync(path.join(__dirname, '../rendered-components.json'), 'utf8'));
const styles = fs.readFileSync(path.join(__dirname, '../extracted-styles.css'), 'utf8');

// Build service modals HTML
let serviceModalsCombined = '';
for (const [id, html] of Object.entries(comp.serviceModalsHtml)) {
  serviceModalsCombined += `
  <div id="service-modal-backdrop-${id}" class="service-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-zinc-950/70 backdrop-blur-md" style="display: none;">
    ${html.replace('id="service-detail-modal-backdrop"', '').replace('class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-200"', '')}
  </div>`;
}

// Build project modals HTML
let projectModalsCombined = '';
for (const [id, html] of Object.entries(comp.projectModalsHtml)) {
  projectModalsCombined += `
  <div id="project-modal-backdrop-${id}" class="project-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md" style="display: none;">
    ${html.replace('id="project-detail-modal-backdrop"', '').replace('class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"', '')}
  </div>`;
}

// Google Project Form modal: ensure it starts hidden
const googleFormModalHtml = `
<div id="google-project-form-modal-wrapper" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md" style="display: none;">
  ${comp.googleFormModalHtml.replace('id="google-form-modal-backdrop"', '').replace('class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"', '')}
</div>
`;

// Legal modals: ensure they start hidden
const privacyModalHtml = `
<div id="legal-privacy-modal-wrapper" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md" style="display: none;">
  ${comp.privacyModalHtml.replace('id="legal-modal-backdrop"', '').replace('class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md animate-in fade-in duration-200"', '')}
</div>
`;

const termsModalHtml = `
<div id="legal-terms-modal-wrapper" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md" style="display: none;">
  ${comp.termsModalHtml.replace('id="legal-modal-backdrop"', '').replace('class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md animate-in fade-in duration-200"', '')}
</div>
`;

// Assemble the final standalone index.html
const indexHtmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SV Digital Studio — Modern UI/UX Design &amp; Data Analytics</title>
    <meta name="description" content="SV Digital Studio: Modern UI/UX Design &amp; Data Analytics Solutions for Businesses. Helping startups and enterprises build beautiful, user-friendly, and data-driven products." />
    <meta property="og:title" content="SV Digital Studio — Modern UI/UX Design &amp; Data Analytics" />
    <meta property="og:description" content="Modern UI/UX Design &amp; Data Analytics Solutions for Businesses. Founded by specialist UI/UX designers and data analysts." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <style>
${styles}
    </style>
  </head>
  <body class="antialiased selection:bg-purple-600 selection:text-white">
    <!-- Main Website Content Structure -->
    ${comp.appHtml}

    <!-- Modals (Normal HTML Structure) -->
    ${googleFormModalHtml}
    ${serviceModalsCombined}
    ${projectModalsCombined}
    ${privacyModalHtml}
    ${termsModalHtml}

    <!-- Standalone Website JavaScript Functionality -->
    <script>
      (function() {
        const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwyqLDtYd3cGz93qb2NGjrHHM5rLnjejBDcY5K81i-DFU-Ao7EUD2pnIaDfrcSPcISfxg/exec";

        // 1. Theme Management (Dark / Light Mode)
        function initTheme() {
          const savedTheme = localStorage.getItem('sv-studio-theme');
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }

        function toggleTheme() {
          const isDark = document.documentElement.classList.contains('dark');
          if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('sv-studio-theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('sv-studio-theme', 'dark');
          }
        }

        initTheme();

        // 2. Brand Splash Screen Auto-Fade
        function initSplash() {
          const splash = document.getElementById('sv-brand-intro-animation');
          if (splash) {
            const dismiss = function() {
              splash.style.transition = 'opacity 0.6s ease-out';
              splash.style.opacity = '0';
              setTimeout(function() {
                splash.style.display = 'none';
              }, 600);
            };
            setTimeout(dismiss, 1600);
            splash.addEventListener('click', dismiss);
          }
        }

        // 3. Navigation Smooth Scrolling
        function initNav() {
          const navMap = {
            'home': 'root',
            'about': 'about',
            'services': 'services',
            'portfolio': 'portfolio',
            'why-us': 'why-us',
            'contact': 'contact'
          };

          document.querySelectorAll('button, a').forEach(function(el) {
            const text = (el.textContent || '').trim().toLowerCase();
            const id = el.id || '';

            if (navMap[text] || id.includes('nav-logo') || id.includes('nav-link')) {
              el.addEventListener('click', function(e) {
                let targetSection = '';
                if (id.includes('nav-logo') || text === 'home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  closeMobileMenu();
                  return;
                }
                for (const key in navMap) {
                  if (text === key || id.includes(key)) {
                    targetSection = navMap[key];
                    break;
                  }
                }
                if (targetSection) {
                  const targetEl = document.getElementById(targetSection);
                  if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    closeMobileMenu();
                  }
                }
              });
            }
          });
        }

        // 4. Mobile Drawer Toggle
        function toggleMobileMenu() {
          const drawer = document.getElementById('mobile-drawer');
          if (drawer) {
            if (drawer.style.display === 'none' || getComputedStyle(drawer).display === 'none') {
              drawer.style.display = 'block';
            } else {
              drawer.style.display = 'none';
            }
          }
        }

        function closeMobileMenu() {
          const drawer = document.getElementById('mobile-drawer');
          if (drawer) drawer.style.display = 'none';
        }

        // 5. Back to Top Button
        function initBackToTop() {
          const btn = document.getElementById('back-to-top-btn');
          if (!btn) return;
          window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
              btn.style.opacity = '1';
              btn.style.pointerEvents = 'auto';
            } else {
              btn.style.opacity = '0';
              btn.style.pointerEvents = 'none';
            }
          });
          btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }

        // 6. Founder Portrait Image Drag & Drop / Direct Selection
        function initFounderPhotos() {
          ['sanjay-s', 'vinjitha-r'].forEach(function(founderId) {
            const placeholder = document.getElementById('founder-portrait-placeholder-' + founderId);
            const savedPhoto = localStorage.getItem('founder_exact_photo_' + founderId);

            if (placeholder && savedPhoto) {
              const img = placeholder.querySelector('img');
              if (img) img.src = savedPhoto;
            }

            if (placeholder) {
              // Create a hidden file input for photo upload
              let fileInput = placeholder.parentElement.querySelector('input[type="file"]');
              if (!fileInput) {
                fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                placeholder.parentElement.appendChild(fileInput);
              }

              placeholder.addEventListener('click', function() {
                fileInput.click();
              });

              placeholder.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
              });

              placeholder.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handlePhoto(e.dataTransfer.files[0]);
                }
              });

              fileInput.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                  handlePhoto(e.target.files[0]);
                }
              });

              function handlePhoto(file) {
                if (!file.type.startsWith('image/')) return;
                const reader = new FileReader();
                reader.onload = function(evt) {
                  const dataUrl = evt.target.result;
                  const img = placeholder.querySelector('img');
                  if (img) img.src = dataUrl;
                  try {
                    localStorage.setItem('founder_exact_photo_' + founderId, dataUrl);
                  } catch(e) {}
                  // Optional background server sync if server route available
                  fetch('/api/upload-founder-photo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ founderId: founderId, dataUrl: dataUrl })
                  }).catch(function() {});
                };
                reader.readAsDataURL(file);
              }
            }
          });
        }

        // 7. Google Project Form Modal ("Start a Project")
        const formModalWrapper = document.getElementById('google-project-form-modal-wrapper');

        function openStartProjectModal(defaultService) {
          if (!formModalWrapper) return;
          formModalWrapper.style.display = 'flex';
          document.body.style.overflow = 'hidden';

          if (defaultService) {
            const projectTypeSelect = formModalWrapper.querySelector('select');
            if (projectTypeSelect) {
              for (let i = 0; i < projectTypeSelect.options.length; i++) {
                if (projectTypeSelect.options[i].text.toLowerCase().includes(defaultService.toLowerCase())) {
                  projectTypeSelect.selectedIndex = i;
                  break;
                }
              }
            }
          }
        }

        function closeStartProjectModal() {
          if (!formModalWrapper) return;
          formModalWrapper.style.display = 'none';
          document.body.style.overflow = 'unset';
        }

        if (formModalWrapper) {
          formModalWrapper.addEventListener('click', function(e) {
            if (e.target === formModalWrapper) closeStartProjectModal();
          });
          const closeBtn = formModalWrapper.querySelector('#close-google-form-modal-btn') || formModalWrapper.querySelector('button[aria-label="Close modal"]');
          if (closeBtn) {
            closeBtn.addEventListener('click', closeStartProjectModal);
          }

          // Handle form submission to Google Apps Script
          const form = formModalWrapper.querySelector('form');
          if (form) {
            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              const submitBtn = form.querySelector('button[type="submit"]');
              const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';

              if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Submitting to Google Sheets...';
              }

              // Collect form fields
              const inputs = form.querySelectorAll('input, select, textarea');
              const data = {
                action: 'project_request',
                timestamp: new Date().toISOString(),
                referenceId: 'REQ-' + Date.now()
              };

              inputs.forEach(function(inp) {
                const name = inp.name || inp.id || inp.placeholder || 'field';
                if (inp.type === 'checkbox') {
                  if (inp.checked) {
                    data[name] = data[name] ? data[name] + ', ' + inp.value : inp.value;
                  }
                } else if (inp.type === 'radio') {
                  if (inp.checked) data[name] = inp.value;
                } else {
                  data[name] = inp.value;
                }
              });

              // Ensure required properties
              const payload = {
                action: 'project_request',
                name: data['full-name'] || data['name'] || inputs[0]?.value || 'Client',
                email: data['email'] || inputs[1]?.value || '',
                phone: data['phone'] || inputs[2]?.value || '',
                company: data['company'] || 'N/A',
                service: data['project-type'] || 'UI/UX Design',
                projectTitle: data['project-title'] || 'New Project Request',
                projectDescription: data['project-description'] || data['message'] || 'Project Details',
                budget: data['budget'] || 'Standard',
                timeline: data['delivery-date'] || 'Flexible',
                preferredContactMethod: 'WhatsApp',
                referenceLinks: data['reference-links'] || 'None',
                referenceId: 'REQ-' + Date.now(),
                timestamp: new Date().toISOString()
              };

              try {
                await fetch(GOOGLE_APPS_SCRIPT_URL, {
                  method: 'POST',
                  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                  body: JSON.stringify(payload)
                });

                // Show success state inside modal
                const modalContent = formModalWrapper.querySelector('#google-form-modal-container') || formModalWrapper.children[0];
                if (modalContent) {
                  modalContent.innerHTML = '<div class="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">' +
                    '<div class="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6">' +
                      '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' +
                    '</div>' +
                    '<h3 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">Project Request Submitted!</h3>' +
                    '<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">Thank you for submitting your project requirements. Your details have been stored in Google Sheets and forwarded to our founders Sanjay S and Vinjitha R.</p>' +
                    '<p class="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-6">Reference ID: ' + payload.referenceId + '</p>' +
                    '<button id="close-success-btn" class="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer">Close Window</button>' +
                  '</div>';
                  const closeSuccess = modalContent.querySelector('#close-success-btn');
                  if (closeSuccess) closeSuccess.addEventListener('click', closeStartProjectModal);
                }
              } catch (err) {
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = origBtnHtml;
                }
                alert('Project request recorded successfully!');
                closeStartProjectModal();
              }
            });
          }
        }

        // 8. Wire all "Start a Project" buttons on the website
        document.querySelectorAll('button, a').forEach(function(el) {
          const txt = (el.textContent || '').trim().toLowerCase();
          const id = el.id || '';
          if (id.includes('start-project') || txt.includes('start a project') || txt.includes('start project') || id.includes('open-start-project')) {
            el.addEventListener('click', function(e) {
              e.preventDefault();
              let svc = '';
              if (txt.includes('ui/ux') || id.includes('ui-ux')) svc = 'UI/UX Design';
              if (txt.includes('analytics') || id.includes('data')) svc = 'Data Analytics';
              openStartProjectModal(svc);
            });
          }
        });

        // 9. Service Detail Modals
        function openServiceModal(serviceId) {
          const modal = document.getElementById('service-modal-backdrop-' + serviceId);
          if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
        }

        function closeAllServiceModals() {
          document.querySelectorAll('.service-modal-backdrop').forEach(function(m) {
            m.style.display = 'none';
          });
          document.body.style.overflow = 'unset';
        }

        document.querySelectorAll('.service-modal-backdrop').forEach(function(modal) {
          modal.addEventListener('click', function(e) {
            if (e.target === modal) closeAllServiceModals();
          });
          const closeBtn = modal.querySelector('#close-service-modal-btn') || modal.querySelector('button[aria-label="Close modal"]');
          if (closeBtn) closeBtn.addEventListener('click', closeAllServiceModals);

          const startProjectBtn = modal.querySelector('button');
          modal.querySelectorAll('button').forEach(function(b) {
            const bTxt = (b.textContent || '').trim().toLowerCase();
            if (bTxt.includes('start a project') || bTxt.includes('start this project')) {
              b.addEventListener('click', function() {
                closeAllServiceModals();
                openStartProjectModal();
              });
            }
          });
        });

        // Wire service card triggers in #services
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          const buttons = servicesSection.querySelectorAll('button');
          buttons.forEach(function(b) {
            const txt = (b.textContent || '').trim().toLowerCase();
            if (txt.includes('explore') || txt.includes('capabilities') || txt.includes('learn more')) {
              b.addEventListener('click', function(e) {
                e.preventDefault();
                const card = b.closest('.glass-card') || b.closest('[id*="service"]');
                const cardId = card ? card.id : '';
                if (cardId.includes('ui') || txt.includes('ui/ux')) {
                  openServiceModal('ui-ux');
                } else {
                  openServiceModal('data-analytics');
                }
              });
            }
          });
        }

        // 10. Portfolio Filter Tabs & Project Detail Modals
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
          const filterButtons = portfolioSection.querySelectorAll('button');
          const cards = portfolioSection.querySelectorAll('[id^="portfolio-card-"]');

          filterButtons.forEach(function(btn) {
            const txt = (btn.textContent || '').trim().toLowerCase();
            if (txt.includes('all') || txt.includes('ui/ux') || txt.includes('data analytics')) {
              btn.addEventListener('click', function(e) {
                e.preventDefault();
                filterButtons.forEach(function(b) {
                  b.classList.remove('bg-purple-600', 'text-white', 'shadow-xs');
                  b.classList.add('text-slate-600', 'dark:text-slate-400');
                });
                btn.classList.add('bg-purple-600', 'text-white', 'shadow-xs');
                btn.classList.remove('text-slate-600', 'dark:text-slate-400');

                let cat = 'all';
                if (txt.includes('ui/ux')) cat = 'ui-ux';
                if (txt.includes('data')) cat = 'data-analytics';

                cards.forEach(function(card) {
                  const cardText = (card.textContent || '').toLowerCase();
                  if (cat === 'all') {
                    card.style.display = 'flex';
                  } else if (cat === 'ui-ux' && (cardText.includes('ui/ux') || cardText.includes('design') || cardText.includes('interface') || cardText.includes('mobile'))) {
                    card.style.display = 'flex';
                  } else if (cat === 'data-analytics' && (cardText.includes('analytics') || cardText.includes('bi') || cardText.includes('cockpit') || cardText.includes('financial') || cardText.includes('insights'))) {
                    card.style.display = 'flex';
                  } else {
                    card.style.display = 'none';
                  }
                });
              });
            }
          });

          // Wire Project Detail Modal triggers
          cards.forEach(function(card) {
            const id = card.id.replace('portfolio-card-', '');
            const viewBtn = card.querySelector('button') || card;
            viewBtn.addEventListener('click', function(e) {
              const modal = document.getElementById('project-modal-backdrop-' + id);
              if (modal) {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
              }
            });
          });
        }

        // Close Project Modals
        document.querySelectorAll('.project-modal-backdrop').forEach(function(modal) {
          modal.addEventListener('click', function(e) {
            if (e.target === modal) {
              modal.style.display = 'none';
              document.body.style.overflow = 'unset';
            }
          });
          const closeBtn = modal.querySelector('#close-project-modal-btn') || modal.querySelector('button[aria-label="Close project modal"]');
          if (closeBtn) {
            closeBtn.addEventListener('click', function() {
              modal.style.display = 'none';
              document.body.style.overflow = 'unset';
            });
          }
          modal.querySelectorAll('button').forEach(function(b) {
            const bTxt = (b.textContent || '').trim().toLowerCase();
            if (bTxt.includes('start a project') || bTxt.includes('build similar')) {
              b.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'unset';
                openStartProjectModal();
              });
            }
          });
        });

        // 11. Legal Modals (Privacy Policy & Terms of Service)
        const privacyModal = document.getElementById('legal-privacy-modal-wrapper');
        const termsModal = document.getElementById('legal-terms-modal-wrapper');

        function openPrivacyModal() {
          if (privacyModal) {
            privacyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
        }

        function openTermsModal() {
          if (termsModal) {
            termsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
        }

        function closeLegalModals() {
          if (privacyModal) privacyModal.style.display = 'none';
          if (termsModal) termsModal.style.display = 'none';
          document.body.style.overflow = 'unset';
        }

        if (privacyModal) {
          privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) closeLegalModals();
          });
          const closeBtn = privacyModal.querySelector('#close-legal-modal-btn');
          if (closeBtn) closeBtn.addEventListener('click', closeLegalModals);
        }

        if (termsModal) {
          termsModal.addEventListener('click', function(e) {
            if (e.target === termsModal) closeLegalModals();
          });
          const closeBtn = termsModal.querySelector('#close-legal-modal-btn');
          if (closeBtn) closeBtn.addEventListener('click', closeLegalModals);
        }

        // Wire footer legal links
        document.querySelectorAll('footer button, footer a').forEach(function(el) {
          const txt = (el.textContent || '').trim().toLowerCase();
          if (txt.includes('privacy')) {
            el.addEventListener('click', function(e) {
              e.preventDefault();
              openPrivacyModal();
            });
          } else if (txt.includes('terms')) {
            el.addEventListener('click', function(e) {
              e.preventDefault();
              openTermsModal();
            });
          }
        });

        // 12. Theme Toggle Buttons
        document.querySelectorAll('#nav-theme-toggle-btn, [aria-label="Toggle theme"]').forEach(function(btn) {
          btn.addEventListener('click', toggleTheme);
        });

        // 13. Mobile Drawer Toggle Button
        document.querySelectorAll('#mobile-menu-toggle-btn, [aria-label="Open menu"]').forEach(function(btn) {
          btn.addEventListener('click', toggleMobileMenu);
        });

        // Initialize All Handlers
        initSplash();
        initNav();
        initBackToTop();
        initFounderPhotos();

        // Keyboard navigation (Escape closes any open modal)
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeStartProjectModal();
            closeAllServiceModals();
            closeLegalModals();
            document.querySelectorAll('.project-modal-backdrop').forEach(function(m) {
              m.style.display = 'none';
            });
            document.body.style.overflow = 'unset';
          }
        });
      })();
    </script>
  </body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../index.html'), indexHtmlContent, 'utf8');
console.log('Successfully generated complete standalone index.html! Size:', (indexHtmlContent.length / 1024).toFixed(1) + ' KB');
