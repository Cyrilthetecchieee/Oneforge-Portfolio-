/**
 * ONEFORGE® — MAIN APPLICATION CONTROLLER
 * ============================================================================
 * Handles:
 *  - Preloader (000 -> 100 counter & curtain transition)
 *  - Smooth Scrolling (Lenis + GSAP ScrollTrigger or native fallback)
 *  - Navigation active states & animated Mobile Drawer
 *  - Dynamic rendering of Services (12), Process (4), Works (4), Why (5), Founders (2)
 *  - Interactive Service & Project Modals
 *  - Editable Statistics, Project Placeholders & Founder Portraits
 *  - Honest Contact Form submission (Real endpoint POST or pre-filled mailto dispatch)
 */

(function () {
  "use strict";

  const config = window.ONEFORGE_CONFIG;
  if (!config) {
    console.error("ONEFORGE_CONFIG is missing. Ensure data.js is loaded before app.js.");
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let isStudioEditMode = false;

  // Clean inline SVG icon dictionary (consistent 1.75px stroke)
  const ICONS = {
    sparkles:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>',
    cpu:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><rect x="4" y="4" width="16" height="16"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
    TrendingUp:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    shieldCheck:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    terminal:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
    globe:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    smartphone:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    layers:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    cloud:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    network:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><rect x="9" y="2" width="6" height="6"/><rect x="16" y="16" width="6" height="6"/><rect x="2" y="16" width="6" height="6"/><path d="M5 16v-4h14v4M12 12V8"/></svg>',
    wrench:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    workflow:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M10 6.5h7.5v7.5M14 17.5H6.5V10"/></svg>',
    penTool:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    barChart:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    megaphone:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    compass:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    arrowUpRight:
      '<svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>'
  };

  /**
   * 1. PRELOADER INITIALIZATION (000 -> 100)
   */
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const counterEl = document.getElementById("preloader-counter-num");
    const barFill = document.getElementById("preloader-bar-fill");

    if (!preloader || !counterEl || !barFill) return;

    if (prefersReducedMotion) {
      counterEl.textContent = "100";
      barFill.style.width = "100%";
      preloader.classList.add("is-complete");
      return;
    }

    let current = 0;
    const duration = 1250; // Snappy, sophisticated 1.25s studio intro
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(eased * 100);

      counterEl.textContent = String(current).padStart(3, "0");
      barFill.style.width = current + "%";

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counterEl.textContent = "100";
        barFill.style.width = "100%";
        setTimeout(function () {
          preloader.classList.add("is-complete");
        }, 180);
      }
    }

    requestAnimationFrame(tick);
  }

  /**
   * 2. SMOOTH SCROLL (LENIS) & SCROLL REVEALS
   */
  function initSmoothScrollAndReveals() {
    if (!prefersReducedMotion && typeof window.Lenis !== "undefined") {
      try {
        const lenis = new window.Lenis({
          duration: 1.1,
          smoothWheel: true
        });
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (e) {
        // Fallback to native CSS smooth scroll
      }
    }

    observeRevealElements();
  }

  function observeRevealElements() {
    const elements = document.querySelectorAll(".reveal-up:not(.is-visible)");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * 3. NAVIGATION BAR & MOBILE MENU
   */
  function initNavigation() {
    const header = document.getElementById("site-header");
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer-cta");

    function updateHeaderScroll() {
      if (!header) return;
      if (window.scrollY > 36) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    window.addEventListener("scroll", updateHeaderScroll, { passive: true });
    updateHeaderScroll();

    // Mobile Menu Toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener("click", function () {
        const isOpen = mobileToggle.getAttribute("aria-expanded") === "true";
        mobileToggle.setAttribute("aria-expanded", String(!isOpen));
        mobileDrawer.classList.toggle("is-open", !isOpen);
        document.body.style.overflow = !isOpen ? "hidden" : "";
      });

      mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          mobileToggle.setAttribute("aria-expanded", "false");
          mobileDrawer.classList.remove("is-open");
          document.body.style.overflow = "";
        });
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
          mobileToggle.setAttribute("aria-expanded", "false");
          mobileDrawer.classList.remove("is-open");
          document.body.style.overflow = "";
        }
      });
    }

    // Active Section Tracking
    const sections = document.querySelectorAll("section[id]");
    if ("IntersectionObserver" in window && sections.length) {
      const sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach(function (link) {
                const href = link.getAttribute("href");
                link.classList.toggle("is-active", href === "#" + id);
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );

      sections.forEach(function (sec) {
        sectionObserver.observe(sec);
      });
    }
  }

  /**
   * 4. HERO BRAND STATEMENTS ROTATOR & MARQUEE
   */
  function initHeroStatements() {
    const rotatorText = document.getElementById("hero-statement-rotator-text");
    const marqueeTrack = document.getElementById("statements-marquee-track");
    const statements = config.brand.statements || [];

    if (marqueeTrack && statements.length) {
      const doubled = statements.concat(statements);
      marqueeTrack.innerHTML = doubled
        .map(function (stmt) {
          return (
            '<div class="statement-item">' +
            '<span class="diamond"></span>' +
            "<span>" +
            escapeHtml(stmt) +
            "</span>" +
            "</div>"
          );
        })
        .join("");
    }

    if (rotatorText && statements.length > 1 && !prefersReducedMotion) {
      let idx = 1;
      setInterval(function () {
        rotatorText.style.opacity = "0";
        rotatorText.style.transform = "translateY(4px)";
        setTimeout(function () {
          idx = (idx + 1) % statements.length;
          rotatorText.textContent = statements[idx];
          rotatorText.style.opacity = "1";
          rotatorText.style.transform = "translateY(0)";
        }, 320);
      }, 3600);
    }
  }

  /**
   * 5. SECTION 04 — ABOUT PILLARS & EDITABLE ANIMATED STATISTICS
   */
  function renderAboutAndStats() {
    const pillarsGrid = document.getElementById("about-pillars-grid");
    if (pillarsGrid && config.aboutHighlights) {
      pillarsGrid.innerHTML = config.aboutHighlights
        .map(function (item) {
          return (
            '<article class="about-pillar-card reveal-up">' +
            '<div class="about-pillar-top">' +
            '<span class="about-pillar-code">// ' +
            escapeHtml(item.code) +
            "</span>" +
            '<span class="about-pillar-icon" aria-hidden="true">' +
            (ICONS[item.icon] || ICONS.sparkles) +
            "</span>" +
            "</div>" +
            '<h3 class="about-pillar-title">' +
            escapeHtml(item.title) +
            "</h3>" +
            '<p class="about-pillar-desc">' +
            escapeHtml(item.description) +
            "</p>" +
            "</article>"
          );
        })
        .join("");
    }

    const statsGrid = document.getElementById("stats-grid");
    if (statsGrid && config.statistics) {
      statsGrid.innerHTML = config.statistics
        .map(function (stat) {
          const formattedNum = stat.padZero
            ? String(stat.value).padStart(2, "0")
            : String(stat.value);
          return (
            '<div class="stat-card reveal-up" data-stat-id="' +
            escapeHtml(stat.id) +
            '">' +
            '<span class="stat-badge ' +
            (stat.isPlaceholder ? "stat-badge--editable" : "") +
            '">' +
            (stat.isPlaceholder ? "EDITABLE METRIC SLOT" : "STUDIO PARAMETER") +
            "</span>" +
            '<div class="stat-value-row">' +
            '<span class="stat-prefix">' +
            escapeHtml(stat.prefix) +
            "</span>" +
            '<span class="stat-counter" data-target="' +
            Number(stat.value) +
            '" data-pad="' +
            (stat.padZero ? "true" : "false") +
            '">' +
            formattedNum +
            "</span>" +
            '<span class="stat-suffix">' +
            escapeHtml(stat.suffix) +
            "</span>" +
            "</div>" +
            "<div>" +
            '<h3 class="stat-label">' +
            escapeHtml(stat.label) +
            "</h3>" +
            '<p class="stat-sublabel">' +
            escapeHtml(stat.sublabel) +
            "</p>" +
            "</div>" +
            "</div>"
          );
        })
        .join("");

      initStatsCounters();
    }

    // Live Studio Edit Mode Toggle for Statistics & Placeholders
    const editToggleBtn = document.getElementById("toggle-studio-edit");
    if (editToggleBtn) {
      editToggleBtn.addEventListener("click", function () {
        isStudioEditMode = !isStudioEditMode;
        editToggleBtn.setAttribute("aria-pressed", String(isStudioEditMode));
        editToggleBtn.textContent = isStudioEditMode
          ? "Finish Editing Placeholders"
          : "Customize Editable Placeholders";

        const editableNodes = document.querySelectorAll(
          ".stat-card, .project-title, .project-desc, .founder-bio-p, .founder-quote-box"
        );
        editableNodes.forEach(function (node) {
          node.setAttribute("contenteditable", String(isStudioEditMode));
        });
      });
    }
  }

  function initStatsCounters() {
    const counters = document.querySelectorAll(".stat-counter");
    if (!counters.length || prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const pad = el.getAttribute("data-pad") === "true";
          const duration = 1100;
          const start = performance.now();

          function step(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.round(eased * target);
            el.textContent = pad ? String(val).padStart(2, "0") : String(val);
            if (p < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach(function (c) {
      observer.observe(c);
    });
  }

  /**
   * 6. SECTION 05 — RENDER & FILTER ALL 12 SERVICES
   */
  function renderServices(activeCategory) {
    const grid = document.getElementById("services-grid");
    if (!grid || !config.services) return;

    const category = activeCategory || "all";
    const filtered = config.services.filter(function (s) {
      return category === "all" || s.category === category;
    });

    grid.innerHTML = filtered
      .map(function (service) {
        const subitemsHtml = (service.subservices || [])
          .map(function (sub) {
            return '<li class="service-subitem">' + escapeHtml(sub) + "</li>";
          })
          .join("");

        return (
          '<article class="service-card reveal-up" data-service-id="' +
          escapeHtml(service.id) +
          '">' +
          "<div>" +
          '<div class="service-card-top">' +
          '<span class="service-number">SERVICE ' +
          escapeHtml(service.number) +
          "</span>" +
          '<span class="service-icon-box" aria-hidden="true">' +
          (ICONS[service.icon] || ICONS.layers) +
          "</span>" +
          "</div>" +
          '<h3 class="service-title" style="margin-top:1.35rem;">' +
          escapeHtml(service.title) +
          "</h3>" +
          '<p class="service-tagline">"' +
          escapeHtml(service.tagline) +
          '"</p>' +
          '<p class="service-desc">' +
          escapeHtml(service.description) +
          "</p>" +
          "</div>" +
          "<div>" +
          '<ul class="service-sublist" aria-label="' +
          escapeHtml(service.displayName) +
          ' subservices">' +
          subitemsHtml +
          "</ul>" +
          '<div class="service-card-footer" style="margin-top:1.25rem;">' +
          '<button type="button" class="service-explore-btn" data-open-service="' +
          escapeHtml(service.id) +
          '">' +
          "<span>Explore Service</span>" +
          ICONS.arrowUpRight +
          "</button>" +
          '<a href="#contact" class="service-explore-btn" data-select-service="' +
          escapeHtml(service.displayName) +
          '" style="color:var(--accent);">Inquire</a>' +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    // Attach mouse spotlight tracking & modal triggers
    const cards = grid.querySelectorAll(".service-card");
    cards.forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", e.clientX - rect.left + "px");
        card.style.setProperty("--mouse-y", e.clientY - rect.top + "px");
      });
    });

    grid.querySelectorAll("[data-open-service]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const serviceId = btn.getAttribute("data-open-service");
        openServiceModal(serviceId);
      });
    });

    grid.querySelectorAll("[data-select-service]").forEach(function (link) {
      link.addEventListener("click", function () {
        const serviceName = link.getAttribute("data-select-service");
        preselectServiceInForm(serviceName);
      });
    });

    observeRevealElements();
  }

  function initServiceFilters() {
    const filterBtns = document.querySelectorAll("[data-service-filter]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        renderServices(btn.getAttribute("data-service-filter"));
      });
    });
  }

  /**
   * 7. SECTION 06 — PROCESS TIMELINE
   */
  function renderProcess() {
    const processGrid = document.getElementById("process-grid");
    const railFill = document.getElementById("process-rail-fill");
    if (!processGrid || !config.process) return;

    processGrid.innerHTML = config.process
      .map(function (stage, index) {
        const chips = (stage.deliverables || [])
          .map(function (d) {
            return '<span class="process-chip">' + escapeHtml(d) + "</span>";
          })
          .join("");

        return (
          '<article class="process-step-card reveal-up ' +
          (index === 0 ? "is-active" : "") +
          '" data-step-index="' +
          index +
          '" tabindex="0">' +
          "<div>" +
          '<div class="process-node-badge">' +
          '<span class="process-step-num">' +
          escapeHtml(stage.step) +
          "</span>" +
          '<span class="process-step-status">STAGE // ' +
          escapeHtml(stage.step) +
          "</span>" +
          "</div>" +
          '<h3 class="process-step-title" style="margin-top:1.25rem;">' +
          escapeHtml(stage.step) +
          " — " +
          escapeHtml(stage.title) +
          "</h3>" +
          '<p class="process-step-desc">' +
          escapeHtml(stage.description) +
          "</p>" +
          "</div>" +
          '<div class="process-deliverables">' +
          chips +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    const cards = processGrid.querySelectorAll(".process-step-card");
    cards.forEach(function (card) {
      function activateStep() {
        const idx = parseInt(card.getAttribute("data-step-index") || "0", 10);
        cards.forEach(function (c) {
          c.classList.remove("is-active");
        });
        card.classList.add("is-active");
        if (railFill) {
          railFill.style.width = (idx + 1) * 25 + "%";
        }
      }
      card.addEventListener("pointerenter", activateStep);
      card.addEventListener("focus", activateStep);
      card.addEventListener("click", activateStep);
    });
  }

  /**
   * 8. SECTION 07 — SELECTED WORK / PORTFOLIO (EDITABLE PLACEHOLDERS)
   */
  function getProjectMockupSvg(visualType, index) {
    if (visualType === "automation-grid") {
      return (
        '<svg class="project-mockup-svg" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="640" height="400" fill="#0D1117"/>' +
        '<g stroke="rgba(255,255,255,0.06)" stroke-width="1">' +
        '<line x1="0" y1="80" x2="640" y2="80"/><line x1="0" y1="160" x2="640" y2="160"/><line x1="0" y1="240" x2="640" y2="240"/><line x1="0" y1="320" x2="640" y2="320"/>' +
        '<line x1="160" y1="0" x2="160" y2="400"/><line x1="320" y1="0" x2="320" y2="400"/><line x1="480" y1="0" x2="480" y2="400"/>' +
        "</g>" +
        '<rect x="56" y="70" width="160" height="96" fill="#141923" stroke="rgba(197,243,106,0.5)" stroke-width="1.5"/>' +
        '<circle cx="80" cy="96" r="6" fill="#C5F36A"/>' +
        '<rect x="96" y="91" width="90" height="10" fill="rgba(245,245,240,0.7)"/>' +
        '<rect x="74" y="118" width="120" height="8" fill="rgba(161,166,173,0.4)"/>' +
        '<rect x="74" y="136" width="84" height="8" fill="rgba(197,243,106,0.35)"/>' +
        '<path d="M216 118 H300 V200 H390" stroke="#C5F36A" stroke-width="2" stroke-dasharray="5 5"/>' +
        '<circle cx="300" cy="159" r="5" fill="#A6FF4D"/>' +
        '<rect x="390" y="152" width="194" height="108" fill="#141923" stroke="rgba(255,255,255,0.2)"/>' +
        '<rect x="412" y="176" width="110" height="10" fill="#C5F36A"/>' +
        '<rect x="412" y="198" width="148" height="8" fill="rgba(245,245,240,0.45)"/>' +
        '<rect x="412" y="216" width="120" height="8" fill="rgba(245,245,240,0.25)"/>' +
        '<rect x="110" y="238" width="210" height="94" fill="#11151B" stroke="rgba(255,255,255,0.14)"/>' +
        '<polyline points="132,306 168,280 202,292 246,258 294,266" stroke="#C5F36A" stroke-width="2.5" fill="none"/>' +
        "</svg>"
      );
    }
    if (visualType === "editorial-commerce") {
      return (
        '<svg class="project-mockup-svg" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="640" height="400" fill="#0B0E14"/>' +
        '<rect x="44" y="42" width="552" height="316" fill="#121721" stroke="rgba(255,255,255,0.14)"/>' +
        '<line x1="44" y1="84" x2="596" y2="84" stroke="rgba(255,255,255,0.12)"/>' +
        '<circle cx="68" cy="63" r="5" fill="#C5F36A"/>' +
        '<rect x="88" y="58" width="90" height="10" fill="rgba(245,245,240,0.6)"/>' +
        '<rect x="72" y="114" width="240" height="28" fill="#F5F5F0"/>' +
        '<rect x="72" y="152" width="180" height="24" fill="#C5F36A"/>' +
        '<rect x="72" y="194" width="210" height="10" fill="rgba(161,166,173,0.45)"/>' +
        '<rect x="72" y="214" width="175" height="10" fill="rgba(161,166,173,0.35)"/>' +
        '<rect x="72" y="256" width="132" height="38" fill="#C5F36A"/>' +
        '<rect x="356" y="110" width="210" height="216" fill="#090B0F" stroke="rgba(197,243,106,0.38)"/>' +
        '<circle cx="461" cy="218" r="64" stroke="#C5F36A" stroke-width="1.75"/>' +
        '<circle cx="461" cy="218" r="34" stroke="rgba(245,245,240,0.4)" stroke-width="1.2"/>' +
        "</svg>"
      );
    }
    if (visualType === "analytics-suite") {
      return (
        '<svg class="project-mockup-svg" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="640" height="400" fill="#0C1016"/>' +
        '<rect x="48" y="48" width="164" height="304" fill="#121720" stroke="rgba(255,255,255,0.12)"/>' +
        '<rect x="68" y="74" width="96" height="12" fill="#C5F36A"/>' +
        '<rect x="68" y="110" width="120" height="8" fill="rgba(245,245,240,0.35)"/>' +
        '<rect x="68" y="132" width="104" height="8" fill="rgba(245,245,240,0.2)"/>' +
        '<rect x="68" y="154" width="112" height="8" fill="rgba(245,245,240,0.2)"/>' +
        '<rect x="232" y="48" width="360" height="142" fill="#121720" stroke="rgba(255,255,255,0.12)"/>' +
        '<polyline points="256,162 308,128 358,142 418,92 480,108 558,72" stroke="#C5F36A" stroke-width="3" fill="none"/>' +
        '<rect x="232" y="210" width="170" height="142" fill="#121720" stroke="rgba(255,255,255,0.12)"/>' +
        '<rect x="256" y="292" width="22" height="40" fill="rgba(245,245,240,0.25)"/>' +
        '<rect x="290" y="268" width="22" height="64" fill="rgba(245,245,240,0.45)"/>' +
        '<rect x="324" y="242" width="22" height="90" fill="#C5F36A"/>' +
        '<rect x="358" y="256" width="22" height="76" fill="#A6FF4D"/>' +
        '<rect x="422" y="210" width="170" height="142" fill="#121720" stroke="rgba(197,243,106,0.35)"/>' +
        '<circle cx="507" cy="281" r="44" stroke="#C5F36A" stroke-width="6" stroke-dasharray="190 90"/>' +
        "</svg>"
      );
    }
    return (
      '<svg class="project-mockup-svg" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="640" height="400" fill="#0B0E13"/>' +
      '<rect x="220" y="34" width="200" height="332" rx="18" fill="#121722" stroke="rgba(197,243,106,0.48)" stroke-width="1.75"/>' +
      '<rect x="288" y="50" width="64" height="6" rx="3" fill="rgba(245,245,240,0.25)"/>' +
      '<rect x="244" y="80" width="152" height="78" fill="#090B0F" stroke="rgba(255,255,255,0.12)"/>' +
      '<circle cx="272" cy="119" r="14" fill="rgba(197,243,106,0.2)" stroke="#C5F36A" stroke-width="1.5"/>' +
      '<rect x="298" y="106" width="80" height="10" fill="#F5F5F0"/>' +
      '<rect x="298" y="124" width="56" height="8" fill="#C5F36A"/>' +
      '<rect x="244" y="174" width="152" height="54" fill="#161C28"/>' +
      '<rect x="244" y="242" width="152" height="54" fill="#161C28"/>' +
      '<rect x="244" y="312" width="152" height="32" fill="#C5F36A"/>' +
      '<text x="56" y="366" fill="rgba(197,243,106,0.45)" font-family="monospace" font-size="11">CONCEPT // 0' +
      (index + 1) +
      "</text>" +
      "</svg>"
    );
  }

  function renderProjects(filterKey) {
    const grid = document.getElementById("portfolio-grid");
    if (!grid || !config.projects) return;

    const active = filterKey || "all";
    const items = config.projects.filter(function (p) {
      return active === "all" || p.filterKey === active;
    });

    grid.innerHTML = items
      .map(function (project, idx) {
        const techHtml = (project.technologies || [])
          .map(function (t) {
            return '<span class="tech-pill">' + escapeHtml(t) + "</span>";
          })
          .join("");

        return (
          '<article class="project-card reveal-up" data-project-id="' +
          escapeHtml(project.id) +
          '">' +
          '<div class="project-mockup-stage">' +
          getProjectMockupSvg(project.visualType, idx) +
          '<span class="project-slot-pill">' +
          escapeHtml(project.slotLabel) +
          "</span>" +
          "</div>" +
          '<div class="project-body">' +
          "<div>" +
          '<div class="project-category">' +
          escapeHtml(project.category) +
          "</div>" +
          '<h3 class="project-title">' +
          escapeHtml(project.title) +
          "</h3>" +
          '<p class="project-desc">' +
          escapeHtml(project.description) +
          "</p>" +
          "</div>" +
          "<div>" +
          '<div class="project-tech-stack" style="margin-bottom:1.25rem;">' +
          techHtml +
          "</div>" +
          '<div class="project-footer">' +
          '<button type="button" class="project-view-btn" data-open-project="' +
          escapeHtml(project.id) +
          '">' +
          "<span>View Project</span>" +
          ICONS.arrowUpRight +
          "</button>" +
          '<span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);">EDITABLE SLOT</span>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    grid.querySelectorAll("[data-open-project]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openProjectModal(btn.getAttribute("data-open-project"));
      });
    });

    observeRevealElements();
  }

  function initProjectFilters() {
    const btns = document.querySelectorAll("[data-project-filter]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        renderProjects(btn.getAttribute("data-project-filter"));
      });
    });
  }

  /**
   * 9. SECTION 08 — WHY ONEFORGE
   */
  function renderWhyOneForge() {
    const list = document.getElementById("why-oneforge-list");
    if (!list || !config.whyOneForge) return;

    list.innerHTML = config.whyOneForge
      .map(function (item) {
        return (
          '<div class="why-item reveal-up">' +
          '<div class="why-item-num">// ' +
          escapeHtml(item.number) +
          "</div>" +
          "<div>" +
          '<h3 class="why-item-title">' +
          escapeHtml(item.title) +
          "</h3>" +
          '<p class="why-item-desc">' +
          escapeHtml(item.description) +
          "</p>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /**
   * 10. SECTION 09 — MEET THE FOUNDERS (WITH EDITABLE PORTRAIT UPLOAD)
   */
  function renderFounders() {
    const grid = document.getElementById("founders-grid");
    if (!grid || !config.founders) return;

    grid.innerHTML = config.founders
      .map(function (founder) {
        const savedPortrait = getSavedPortrait(founder.id) || founder.imageUrl;
        const avatarInner = savedPortrait
          ? '<img class="founder-avatar-img" src="' +
            escapeHtml(savedPortrait) +
            '" alt="' +
            escapeHtml(founder.name) +
            ' portrait" loading="lazy"/>'
          : '<div class="founder-avatar-monogram">' +
            '<span class="initials">' +
            escapeHtml(founder.initials) +
            "</span>" +
            '<span class="caption">PORTRAIT SLOT</span>' +
            "</div>";

        const paragraphsHtml = (founder.introduction || [])
          .map(function (p) {
            return '<p class="founder-bio-p">' + escapeHtml(p) + "</p>";
          })
          .join("");

        const tagsHtml = (founder.focusTags || [])
          .map(function (t) {
            return '<span class="tech-pill">' + escapeHtml(t) + "</span>";
          })
          .join("");

        const socialsHtml = (founder.socials || [])
          .map(function (s) {
            const isExternal = s.url.indexOf("http") === 0;
            return (
              '<a class="founder-social-link" href="' +
              escapeHtml(s.url) +
              '"' +
              (isExternal ? ' target="_blank" rel="noopener noreferrer"' : "") +
              ">" +
              escapeHtml(s.label) +
              "</a>"
            );
          })
          .join("");

        return (
          '<article class="founder-card reveal-up" data-founder-id="' +
          escapeHtml(founder.id) +
          '">' +
          "<div>" +
          '<div class="founder-top-bar">' +
          '<span class="founder-badge">' +
          escapeHtml(founder.badge) +
          "</span>" +
          '<label class="founder-photo-trigger" tabindex="0" role="button" aria-label="Upload portrait image for ' +
          escapeHtml(founder.name) +
          '">' +
          "<span>Update Portrait</span>" +
          '<input type="file" accept="image/*" data-founder-upload="' +
          escapeHtml(founder.id) +
          '" style="display:none;" />' +
          "</label>" +
          "</div>" +
          '<div class="founder-profile-header">' +
          '<div class="founder-avatar-frame" id="avatar-frame-' +
          escapeHtml(founder.id) +
          '">' +
          avatarInner +
          "</div>" +
          '<div class="founder-identity-meta">' +
          '<h3 class="founder-name">' +
          escapeHtml(founder.name) +
          "</h3>" +
          '<div class="founder-role">' +
          escapeHtml(founder.position) +
          "</div>" +
          '<a href="' +
          escapeHtml(founder.portfolioUrl) +
          '" target="_blank" rel="noopener noreferrer" class="founder-domain-pill">' +
          "<span>" +
          escapeHtml(founder.portfolioDomain) +
          "</span>" +
          ICONS.arrowUpRight +
          "</a>" +
          "</div>" +
          "</div>" +
          '<div class="founder-bio-content">' +
          paragraphsHtml +
          '<blockquote class="founder-quote-box">"' +
          escapeHtml(founder.statement) +
          '"</blockquote>' +
          '<div class="founder-tags">' +
          tagsHtml +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="founder-card-footer">' +
          '<a href="' +
          escapeHtml(founder.portfolioUrl) +
          '" target="_blank" rel="noopener noreferrer" class="btn btn--primary">' +
          "<span>" +
          escapeHtml(founder.ctaText) +
          "</span>" +
          ICONS.arrowUpRight +
          "</a>" +
          '<div class="founder-socials">' +
          socialsHtml +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    // Bind editable portrait file inputs
    grid.querySelectorAll("[data-founder-upload]").forEach(function (input) {
      input.addEventListener("change", function (e) {
        const file = e.target.files && e.target.files[0];
        const founderId = input.getAttribute("data-founder-upload");
        if (!file || !founderId) return;
        const reader = new FileReader();
        reader.onload = function (loadEvent) {
          const dataUrl = loadEvent.target.result;
          savePortrait(founderId, dataUrl);
          const frame = document.getElementById("avatar-frame-" + founderId);
          if (frame) {
            frame.innerHTML =
              '<img class="founder-avatar-img" src="' +
              dataUrl +
              '" alt="Founder Portrait"/>';
          }
        };
        reader.readAsDataURL(file);
      });
    });
  }

  function getSavedPortrait(founderId) {
    try {
      return localStorage.getItem("oneforge_portrait_" + founderId) || "";
    } catch (e) {
      return "";
    }
  }

  function savePortrait(founderId, dataUrl) {
    try {
      localStorage.setItem("oneforge_portrait_" + founderId, dataUrl);
    } catch (e) {
      // Ignore quota errors
    }
  }

  /**
   * 11. SECTION 10 — CONTACT FORM & HONEST SUBMISSION LOGIC
   */
  function initContactForm() {
    const serviceSelect = document.getElementById("contact-service");
    const form = document.getElementById("oneforge-contact-form");
    const statusPanel = document.getElementById("form-status-panel");
    const statusText = document.getElementById("form-status-text");
    const statusActions = document.getElementById("form-status-actions");
    const endpointBadge = document.getElementById("form-endpoint-badge");

    if (serviceSelect && config.services) {
      const optionsHtml =
        '<option value="" disabled selected>Select a primary service...</option>' +
        config.services
          .map(function (s) {
            return (
              '<option value="' +
              escapeHtml(s.displayName) +
              '">' +
              escapeHtml(s.number + " — " + s.displayName) +
              "</option>"
            );
          })
          .join("") +
        '<option value="Multiple Services / Full Digital Ecosystem">Multiple Services / Full Digital Ecosystem</option>';
      serviceSelect.innerHTML = optionsHtml;
    }

    const endpoint =
      config.contact && config.contact.formEndpoint
        ? config.contact.formEndpoint.trim()
        : "";

    if (endpointBadge) {
      endpointBadge.textContent = endpoint
        ? "LIVE ENDPOINT CONNECTED"
        : "DIRECT EMAIL DISPATCH READY";
    }

    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = (document.getElementById("contact-name").value || "").trim();
      const email = (document.getElementById("contact-email").value || "").trim();
      const service = (document.getElementById("contact-service").value || "").trim();
      const message = (document.getElementById("contact-message").value || "").trim();

      if (!name || !email || !service || !message) {
        showFormFeedback(
          "Please complete all required fields (Name, Email, Service Selection, and Project Description) before submitting.",
          true,
          ""
        );
        return;
      }

      const currentEndpoint =
        window.ONEFORGE_CONFIG.contact &&
        window.ONEFORGE_CONFIG.contact.formEndpoint
          ? window.ONEFORGE_CONFIG.contact.formEndpoint.trim()
          : "";

      // If a real submission endpoint is configured, perform a real HTTP POST
      if (currentEndpoint) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "<span>Transmitting Project Brief...</span>";
        }

        try {
          const response = await fetch(currentEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              name: name,
              email: email,
              service: service,
              projectDescription: message,
              studio: "ONEFORGE"
            })
          });

          if (response.ok) {
            showFormFeedback(
              "Your project inquiry has been transmitted to the configured OneForge endpoint (" +
                currentEndpoint +
                ").",
              false,
              ""
            );
            form.reset();
          } else {
            showFormFeedback(
              "The configured endpoint returned HTTP " +
                response.status +
                ". Use direct email dispatch below to ensure your brief reaches OneForge immediately.",
              true,
              buildMailtoHref(name, email, service, message)
            );
          }
        } catch (err) {
          showFormFeedback(
            "Could not reach the configured submission endpoint. You can dispatch your formatted inquiry directly via email below.",
            true,
            buildMailtoHref(name, email, service, message)
          );
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }
        return;
      }

      // When no backend endpoint URL is configured yet:
      // NEVER show a fake success message. Explain honestly and trigger/offer real mailto + clipboard dispatch.
      const mailtoHref = buildMailtoHref(name, email, service, message);
      const formattedBrief =
        "ONEFORGE PROJECT INQUIRY\n" +
        "------------------------\n" +
        "Name: " +
        name +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Service: " +
        service +
        "\n\n" +
        "Project Description:\n" +
        message;

      showFormFeedback(
        "Project brief validated. Because no external webhook endpoint is configured in data.js (formEndpoint), OneForge does not display a simulated success screen. Click below to dispatch your pre-filled inquiry directly to oneforge.in.official@gmail.com or copy your brief:",
        false,
        mailtoHref,
        formattedBrief
      );
    });

    function showFormFeedback(text, isError, mailtoUrl, briefToCopy) {
      if (!statusPanel || !statusText || !statusActions) return;
      statusPanel.classList.add("is-visible");
      statusPanel.classList.toggle("is-error", !!isError);
      statusText.textContent = text;
      statusActions.innerHTML = "";

      if (mailtoUrl) {
        const mailLink = document.createElement("a");
        mailLink.href = mailtoUrl;
        mailLink.className = "btn btn--primary";
        mailLink.style.padding = "0.65rem 1.15rem";
        mailLink.style.fontSize = "0.82rem";
        mailLink.innerHTML =
          "<span>Open in Email Client (oneforge.in.official@gmail.com)</span>" +
          ICONS.arrowUpRight;
        statusActions.appendChild(mailLink);
      }

      if (briefToCopy) {
        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "btn btn--secondary";
        copyBtn.style.padding = "0.65rem 1.15rem";
        copyBtn.style.fontSize = "0.82rem";
        copyBtn.textContent = "Copy Formatted Project Brief";
        copyBtn.addEventListener("click", function () {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(briefToCopy).then(function () {
              copyBtn.textContent = "Copied to Clipboard";
            });
          }
        });
        statusActions.appendChild(copyBtn);
      }
    }
  }

  function buildMailtoHref(name, email, service, message) {
    const targetEmail =
      (config.contact && config.contact.email) || "oneforge.in.official@gmail.com";
    const subject = encodeURIComponent(
      "[ONEFORGE Project Inquiry] " + service + " — " + name
    );
    const body = encodeURIComponent(
      "Hello OneForge Team,\n\n" +
        "I would like to discuss a project with OneForge.\n\n" +
        "Name: " +
        name +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Selected Service: " +
        service +
        "\n\n" +
        "Project Description:\n" +
        message +
        "\n\n" +
        "— Sent via OneForge Studio Website"
    );
    return "mailto:" + targetEmail + "?subject=" + subject + "&body=" + body;
  }

  function preselectServiceInForm(serviceName) {
    const select = document.getElementById("contact-service");
    if (!select || !serviceName) return;
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === serviceName) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  /**
   * 12. INTERACTIVE SERVICE & PROJECT MODALS
   */
  function openServiceModal(serviceId) {
    const service = (config.services || []).find(function (s) {
      return s.id === serviceId;
    });
    if (!service) return;

    const modalBackdrop = document.getElementById("studio-modal-backdrop");
    const modalContent = document.getElementById("studio-modal-content");
    if (!modalBackdrop || !modalContent) return;

    const subs = (service.subservices || [])
      .map(function (sub) {
        return '<li class="service-subitem" style="font-size:0.95rem;padding:0.25rem 0;">' + escapeHtml(sub) + "</li>";
      })
      .join("");

    modalContent.innerHTML =
      '<div class="section-label" style="margin-bottom:0.85rem;">SERVICE ' +
      escapeHtml(service.number) +
      " // CAPABILITY SPECIFICATION</div>" +
      '<h3 style="font-family:var(--font-display);font-size:clamp(1.65rem,3vw,2.25rem);font-weight:700;margin-bottom:0.4rem;">' +
      escapeHtml(service.title) +
      "</h3>" +
      '<p style="font-family:var(--font-mono);font-size:0.86rem;color:var(--accent);margin-bottom:1.25rem;">"' +
      escapeHtml(service.tagline) +
      '"</p>' +
      '<p style="color:var(--text-secondary);line-height:1.7;margin-bottom:1.5rem;">' +
      escapeHtml(service.description) +
      "</p>" +
      '<div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.75rem;">' +
      '<div style="font-family:var(--font-mono);font-size:0.74rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:0.75rem;">Included Subservices & Deliverables</div>' +
      '<ul class="service-sublist" style="border:none;padding:0;">' +
      subs +
      "</ul>" +
      "</div>" +
      '<div style="display:flex;flex-wrap:wrap;gap:1rem;">' +
      '<a href="#contact" class="btn btn--primary" id="modal-service-cta">' +
      "<span>Start a Project With " +
      escapeHtml(service.displayName) +
      "</span>" +
      ICONS.arrowUpRight +
      "</a>" +
      "</div>";

    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");

    const cta = document.getElementById("modal-service-cta");
    if (cta) {
      cta.addEventListener("click", function () {
        preselectServiceInForm(service.displayName);
        closeStudioModal();
      });
    }
  }

  function openProjectModal(projectId) {
    const project = (config.projects || []).find(function (p) {
      return p.id === projectId;
    });
    if (!project) return;

    const modalBackdrop = document.getElementById("studio-modal-backdrop");
    const modalContent = document.getElementById("studio-modal-content");
    if (!modalBackdrop || !modalContent) return;

    const techPills = (project.technologies || [])
      .map(function (t) {
        return '<span class="tech-pill">' + escapeHtml(t) + "</span>";
      })
      .join("");

    modalContent.innerHTML =
      '<div class="section-label" style="margin-bottom:0.85rem;">' +
      escapeHtml(project.slotLabel) +
      "</div>" +
      '<div style="font-family:var(--font-mono);font-size:0.78rem;color:var(--accent);margin-bottom:0.35rem;">' +
      escapeHtml(project.category) +
      "</div>" +
      '<h3 style="font-family:var(--font-display);font-size:clamp(1.6rem,2.8vw,2.15rem);font-weight:700;margin-bottom:1rem;">' +
      escapeHtml(project.title) +
      "</h3>" +
      '<p style="color:var(--text-secondary);line-height:1.7;margin-bottom:1.5rem;">' +
      escapeHtml(project.description) +
      "</p>" +
      '<div style="margin-bottom:1.5rem;">' +
      '<div style="font-family:var(--font-mono);font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:0.6rem;">Technologies & Architecture</div>' +
      '<div class="project-tech-stack">' +
      techPills +
      "</div>" +
      "</div>" +
      '<div style="padding:1rem;background:var(--bg-primary);border:1px solid var(--border-color);font-family:var(--font-mono);font-size:0.75rem;color:var(--text-secondary);margin-bottom:1.5rem;">' +
      "Note: This card is an editable studio showcase slot. Update window.ONEFORGE_CONFIG.projects in data.js to populate live project case studies." +
      "</div>" +
      '<a href="#contact" class="btn btn--primary" id="modal-project-cta">' +
      "<span>Build Something Similar With OneForge</span>" +
      ICONS.arrowUpRight +
      "</a>";

    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");

    const cta = document.getElementById("modal-project-cta");
    if (cta) {
      cta.addEventListener("click", closeStudioModal);
    }
  }

  function initModalSystem() {
    const backdrop = document.getElementById("studio-modal-backdrop");
    const closeBtn = document.getElementById("studio-modal-close");
    if (!backdrop) return;

    if (closeBtn) {
      closeBtn.addEventListener("click", closeStudioModal);
    }
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) {
        closeStudioModal();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
        closeStudioModal();
      }
    });
  }

  function closeStudioModal() {
    const backdrop = document.getElementById("studio-modal-backdrop");
    if (!backdrop) return;
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
  }

  /**
   * 13. CUSTOM CURSOR & MAGNETIC CTA BUTTONS (DESKTOP)
   */
  function initCursorAndMagneticButtons() {
    if (
      prefersReducedMotion ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    ) {
      return;
    }

    const dot = document.getElementById("custom-cursor-dot");
    const ring = document.getElementById("custom-cursor-ring");
    if (dot && ring) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;

      window.addEventListener(
        "pointermove",
        function (e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
          dot.style.transform =
            "translate3d(" + mouseX + "px, " + mouseY + "px, 0) translate(-50%, -50%)";
        },
        { passive: true }
      );

      function renderCursor() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform =
          "translate3d(" + ringX + "px, " + ringY + "px, 0) translate(-50%, -50%)";
        requestAnimationFrame(renderCursor);
      }
      requestAnimationFrame(renderCursor);

      document.addEventListener("mouseover", function (e) {
        const interactive = e.target.closest(
          "a, button, label, select, input, textarea, .process-step-card"
        );
        document.body.classList.toggle("cursor-hover", !!interactive);
      });
    }

    // Subtle magnetic pull on `.btn-magnetic` elements
    const magnetics = document.querySelectorAll(".btn-magnetic");
    magnetics.forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform =
          "translate3d(" + dx * 0.16 + "px, " + dy * 0.16 + "px, 0)";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * BOOTSTRAP ALL SECTIONS
   */
  function init() {
    initPreloader();
    renderAboutAndStats();
    renderServices("all");
    initServiceFilters();
    renderProcess();
    renderProjects("all");
    initProjectFilters();
    renderWhyOneForge();
    renderFounders();
    initContactForm();
    initModalSystem();
    initNavigation();
    initHeroStatements();
    initSmoothScrollAndReveals();
    initCursorAndMagneticButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
