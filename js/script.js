/**
 * Mohamed Waleed - Portfolio JavaScript
 * Clean, modular architecture for theme, localization, dynamic rendering, and case study gallery.
 */

// =============================================================================
// 1. CONSTANTS & CONFIGURATION
// =============================================================================

const LINK_CONFIG = [
  {
    key: "website",
    icon: "bx bx-link-external",
    labelKey: "modal_landing_btn",
    fallbackLabel: "Live Preview",
    primary: true,
    title: "Live Preview",
  },
  {
    key: "admin",
    icon: "bx bx-shield-quarter",
    labelKey: "modal_admin_portal_btn",
    fallbackLabel: "Admin Portal",
    title: "Admin Portal",
  },
  {
    key: "github",
    icon: "bx bxl-github",
    labelKey: "modal_github_btn",
    fallbackLabel: "View Source Code",
    title: "GitHub",
  },
  {
    key: "playstore",
    icon: "bx bxl-play-store",
    labelKey: "modal_playstore_btn",
    fallbackLabel: "Google Play",
    title: "Google Play",
  },
  {
    key: "appstore",
    icon: "bx bxl-apple",
    labelKey: "modal_appstore_btn",
    fallbackLabel: "App Store",
    title: "App Store",
  },
];

const RECEIVER_EMAIL = "mohamedwaleedabdelghany@gmail.com";

// =============================================================================
// 2. DOM ELEMENTS CACHE
// =============================================================================

const elements = {
  html: document.documentElement,
  body: document.body,
  header: document.getElementById("header"),
  navbar: document.getElementById("navbar"),
  menuButton: document.getElementById("menu-icon"),
  menuIcon: document.querySelector("#menu-icon i"),
  themeToggle: document.getElementById("theme-toggle"),
  themeIcon: document.getElementById("theme-icon"),
  langToggle: document.getElementById("lang-toggle"),
  sections: document.querySelectorAll("main section[id]"),
  navLinks: document.querySelectorAll("header nav a"),
  contactForm: document.getElementById("contact-form"),
  // Containers
  educationStack: document.getElementById("education-stack"),
  experienceStack: document.getElementById("experience-stack"),
  servicesGrid: document.getElementById("services-grid"),
  skillsGrid: document.getElementById("skills-grid"),
  portfolioGrid: document.getElementById("portfolio-grid"),
  // Modal
  projectModal: document.getElementById("project-modal"),
  modalBackdrop: document.getElementById("modal-backdrop"),
  modalCloseBtn: document.getElementById("modal-close"),
  modalBody: document.getElementById("modal-body"),
  // Lightbox
  imageLightbox: document.getElementById("image-lightbox"),
  lightboxImg: document.getElementById("lightbox-img"),
  lightboxCloseBtn: document.getElementById("lightbox-close"),
  lightboxBackdrop: document.getElementById("lightbox-backdrop"),
};

// =============================================================================
// 3. APPLICATION STATE
// =============================================================================

const state = {
  typedInstance: null,
  translations: {},
  projectsList: [],
  currentModalProjectId: null,
};

// =============================================================================
// 4. UTILITIES & HELPERS
// =============================================================================

/**
 * Attaches both click and keyboard (Enter / Space) activation to an element.
 */
const onActivate = (element, handler) => {
  if (!element) return;
  element.addEventListener("click", handler);
  element.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler(e);
    }
  });
};

// =============================================================================
// 5. LIGHTBOX CONTROLLER
// =============================================================================

const openLightbox = (imgSrc) => {
  if (!elements.imageLightbox || !elements.lightboxImg) return;
  elements.lightboxImg.src = imgSrc;
  elements.imageLightbox.classList.add("active");
  elements.imageLightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!elements.imageLightbox) return;
  elements.imageLightbox.classList.remove("active");
  elements.imageLightbox.setAttribute("aria-hidden", "true");
  if (elements.lightboxImg) elements.lightboxImg.src = "";
};

// =============================================================================
// 6. THEME MANAGEMENT
// =============================================================================

const setThemeIcon = () => {
  if (!elements.themeIcon) return;
  const isDark = elements.html.classList.contains("dark");
  elements.themeIcon.className = isDark ? "bx bx-sun" : "bx bx-moon";
};

const toggleTheme = () => {
  const isDark = elements.html.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  setThemeIcon();
};

const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  elements.html.classList.toggle(
    "dark",
    savedTheme ? savedTheme === "dark" : prefersDark,
  );
  setThemeIcon();
};

// =============================================================================
// 7. LOCALIZATION & TYPED TEXT
// =============================================================================

const applyTranslations = (lang) => {
  const dictionary = state.translations[lang];
  if (!dictionary) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dictionary[key]) el.innerHTML = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      el.setAttribute("placeholder", dictionary[key]);
      el.setAttribute("aria-label", dictionary[key]);
    }
  });
};

const updateTypedText = (lang) => {
  if (state.typedInstance) {
    state.typedInstance.destroy();
    state.typedInstance = null;
  }

  if (typeof Typed === "undefined" || !state.translations[lang]) return;

  state.typedInstance = new Typed(".multiple-text", {
    strings: state.translations[lang].typed_strings,
    typeSpeed: lang === "ar" ? 55 : 70,
    backSpeed: lang === "ar" ? 35 : 45,
    backDelay: 1400,
    loop: true,
  });
};

const applyLanguage = (lang) => {
  const isArabic = lang === "ar";
  elements.html.lang = lang;
  elements.html.dir = isArabic ? "rtl" : "ltr";
  elements.body.setAttribute("dir", isArabic ? "rtl" : "ltr");

  applyTranslations(lang);
  updateTypedText(lang);

  if (elements.langToggle) {
    elements.langToggle.textContent = isArabic ? "EN" : "AR";
  }
  localStorage.setItem("language", lang);

  // If modal is currently open, refresh its content in the new language
  if (
    state.currentModalProjectId &&
    elements.projectModal?.classList.contains("active")
  ) {
    const project = state.projectsList.find(
      (p) => p.id === state.currentModalProjectId,
    );
    if (project) renderModalContent(project, lang);
  }
};

const toggleLanguage = () => {
  const nextLang = elements.html.lang === "ar" ? "en" : "ar";
  applyLanguage(nextLang);
};

const initializeLanguage = () => {
  const savedLanguage = localStorage.getItem("language") || "en";
  applyLanguage(savedLanguage);
};

// =============================================================================
// 8. NAVIGATION & MOBILE MENU
// =============================================================================

const closeMenu = () => {
  elements.navbar?.classList.remove("open");
  elements.body.classList.remove("menu-open");
  if (elements.menuButton)
    elements.menuButton.setAttribute("aria-expanded", "false");
  if (elements.menuIcon) elements.menuIcon.className = "bx bx-menu";
};

const toggleMenu = () => {
  const isOpen = elements.navbar?.classList.toggle("open");
  elements.body.classList.toggle("menu-open", Boolean(isOpen));
  elements.menuButton?.setAttribute("aria-expanded", String(Boolean(isOpen)));
  if (elements.menuIcon) {
    elements.menuIcon.className = isOpen ? "bx bx-x" : "bx bx-menu";
  }
};

const handleHeaderScroll = () => {
  elements.header?.classList.toggle("scrolled", window.scrollY > 12);
};

const setupScrollObserver = () => {
  const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        elements.navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`,
          );
        });
      }
    });
  }, observerOptions);

  elements.sections.forEach((section) => observer.observe(section));
};

// =============================================================================
// 9. CONTENT RENDERERS: JOURNEY, SERVICES, SKILLS
// =============================================================================

const renderJourney = (journey) => {
  if (elements.educationStack && journey.education) {
    elements.educationStack.innerHTML = journey.education
      .map(
        (edu) => `
        <article class="timeline-card education-box">
          <span class="timeline-date">${edu.date}</span>
          <h4 data-i18n="${edu.title_i18n}"></h4>
          <p class="timeline-place">${edu.place_raw}</p>
          <p data-i18n="${edu.text_i18n}"></p>
        </article>
      `,
      )
      .join("");
  }

  if (elements.experienceStack && journey.experience) {
    elements.experienceStack.innerHTML = journey.experience
      .map((exp) => {
        let itemsHtml = "";
        if (exp.items && exp.items.length > 0) {
          itemsHtml = `
            <ul class="timeline-list">
              ${exp.items.map((itemKey) => `<li data-i18n="${itemKey}"></li>`).join("")}
            </ul>
          `;
        } else if (exp.text_i18n) {
          itemsHtml = `<p data-i18n="${exp.text_i18n}"></p>`;
        }

        const placeHtml = exp.place_i18n
          ? `<p class="timeline-place" data-i18n="${exp.place_i18n}"></p>`
          : `<p class="timeline-place">${exp.place_raw}</p>`;

        return `
          <article class="timeline-card experience-box">
            <span class="timeline-date">${exp.date}</span>
            <h4 data-i18n="${exp.title_i18n}"></h4>
            ${placeHtml}
            ${itemsHtml}
          </article>
        `;
      })
      .join("");
  }
};

const renderServices = (services) => {
  if (!elements.servicesGrid) return;
  elements.servicesGrid.innerHTML = services
    .map(
      (service) => `
      <article class="services-box service-card">
        <i class="${service.icon}"></i>
        <h3 data-i18n="${service.title_i18n}"></h3>
        <p data-i18n="${service.text_i18n}"></p>
        <a href="${service.link_target}" class="text-link" data-i18n="${service.link_i18n}"></a>
      </article>
    `,
    )
    .join("");
};

const renderSkills = (skills) => {
  if (!elements.skillsGrid) return;
  elements.skillsGrid.innerHTML = skills
    .map((cat) => {
      const tagsHtml = cat.tags
        .map(
          (tag) => `
          <span class="skill-tag">
            <img src="${tag.icon}" alt="${tag.name}">
            <span>${tag.name}</span>
          </span>
        `,
        )
        .join("");

      return `
        <article class="skill-category skill-card">
          <h3 data-i18n="${cat.category_i18n}"></h3>
          <span class="tag-row">${tagsHtml}</span>
        </article>
      `;
    })
    .join("");
};

// =============================================================================
// 10. PROJECTS & FILTERING
// =============================================================================

const renderProjectCardLinks = (links) => {
  return LINK_CONFIG.filter((cfg) => links[cfg.key])
    .map(
      (cfg) => `
      <a href="${links[cfg.key]}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" aria-label="${cfg.title}" title="${cfg.title}">
        <i class="${cfg.icon}"></i>
      </a>
    `,
    )
    .join("");
};

const renderProjects = (projects) => {
  state.projectsList = projects;
  if (!elements.portfolioGrid) return;

  elements.portfolioGrid.innerHTML = projects
    .map((project) => {
      const links = project.links || {};
      const linksHtml = renderProjectCardLinks(links);

      const titleHtml = project.title_i18n
        ? `<h3 data-i18n="${project.title_i18n}"></h3>`
        : `<h3>${project.title_raw}</h3>`;

      const categories = [...(project.categories || [])];
      const hasOtherLinks = Object.keys(links).some(
        (key) => key !== "github" && links[key],
      );
      if (hasOtherLinks && !categories.includes("published")) {
        categories.push("published");
      }
      const categoriesStr = categories.join(" ");

      return `
        <article class="project-card" data-categories="${categoriesStr}" data-open-modal="${project.id}" tabindex="0" role="button" aria-label="Open case study for ${project.alt || "project"}">
          <div class="project-media">
            <img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async" width="1600" height="1200">
          </div>
          <div class="project-content">
            <div class="project-topline">
              <span class="project-pill" data-i18n="${project.pill_i18n}"></span>
              <span class="project-status" data-i18n="${project.status_i18n}"></span>
            </div>
            ${titleHtml}
            <p data-i18n="${project.desc_i18n}"></p>
            <div class="project-footer">
              <span class="project-stack">${project.stack_raw}</span>
              <div class="project-links">${linksHtml}</div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // Card click & keyboard listeners
  elements.portfolioGrid.querySelectorAll(".project-card").forEach((card) => {
    onActivate(card, (e) => {
      if (e.target.closest("a")) return;
      const projId = card.getAttribute("data-open-modal");
      if (projId) openProjectModal(projId);
    });
  });
};

const setupProjectFilters = () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const categories = (
          card.getAttribute("data-categories") || ""
        ).split(" ");
        const isMatch =
          filterValue === "all" || categories.includes(filterValue);
        card.classList.toggle("hide-project", !isMatch);
      });
    });
  });
};

// =============================================================================
// 11. CASE STUDY MODAL & GALLERY SHOWCASE
// =============================================================================

/**
 * Extracts and consolidates all media items (cover, gallery screenshots, videos) for a project.
 */
const getProjectMediaList = (project, lang, titleText) => {
  const items = [];

  if (project.image) {
    items.push({
      type: "image",
      url: project.image,
      thumb: project.image,
      alt: project.alt || titleText,
      title: titleText,
    });
  }

  if (project.gallery?.length) {
    project.gallery.forEach((img, idx) => {
      if (img !== project.image) {
        items.push({
          type: "image",
          url: img,
          thumb: img,
          alt: `${project.alt || titleText} screenshot ${idx + 1}`,
          title: `Screenshot ${idx + 1}`,
        });
      }
    });
  }

  if (project.videos?.length) {
    project.videos.forEach((v, idx) => {
      const vTitle =
        lang === "ar" && v.title_ar
          ? v.title_ar
          : v.title || `Recording ${idx + 1}`;
      items.push({
        type: "video",
        url: v.url,
        thumb: v.url,
        alt: vTitle,
        title: vTitle,
      });
    });
  }

  return items;
};

/**
 * Generates HTML for the active item in the main stage.
 */
const renderStageMediaHtml = (item) => {
  if (!item) return "";
  if (item.type === "video") {
    return `
      <div class="main-stage-media-item is-video">
        <video controls autoplay playsinline preload="auto" src="${item.url}"></video>
      </div>
    `;
  }
  return `
    <div class="main-stage-media-item is-image" role="button" tabindex="0" data-lightbox-src="${item.url}" aria-label="View full image" title="Click to view full screen">
      <img src="${item.url}" alt="${item.alt}" loading="eager" decoding="async">
      <span class="main-stage-zoom-badge" aria-hidden="true"><i class='bx bx-expand'></i></span>
    </div>
  `;
};

/**
 * Generates HTML for modal action buttons based on available project links.
 */
const renderModalActionButtons = (links, dict) => {
  return LINK_CONFIG.filter((cfg) => links[cfg.key])
    .map((cfg) => {
      const label = dict[cfg.labelKey] || cfg.fallbackLabel;
      const btnClass = cfg.primary
        ? "modal-action-btn primary"
        : "modal-action-btn secondary";
      return `
        <a href="${links[cfg.key]}" target="_blank" rel="noopener noreferrer" class="${btnClass}">
          <i class="${cfg.icon}"></i>
          <span>${label}</span>
        </a>
      `;
    })
    .join("");
};

/**
 * Generates HTML for the preview thumbnail strip underneath the main thumbnail.
 */
const renderPreviewStripHtml = (mediaItems) => {
  if (mediaItems.length <= 1) return "";

  const thumbsHtml = mediaItems
    .map((item, idx) => {
      const isActive = idx === 0;
      if (item.type === "video") {
        return `
          <button type="button" class="preview-thumb-btn is-video ${isActive ? "active" : ""}" data-media-idx="${idx}" role="tab" aria-selected="${isActive}" aria-label="Play video: ${item.title}" title="${item.title}">
            <video src="${item.url}#t=0.5" preload="metadata" muted playsinline></video>
            <span class="preview-thumb-video-icon" aria-hidden="true"><i class='bx bx-play'></i></span>
          </button>
        `;
      }
      return `
        <button type="button" class="preview-thumb-btn is-image ${isActive ? "active" : ""}" data-media-idx="${idx}" role="tab" aria-selected="${isActive}" aria-label="Preview image: ${item.title}" title="${item.title}">
          <img src="${item.thumb}" alt="${item.alt}" loading="lazy" decoding="async">
        </button>
      `;
    })
    .join("");

  return `
    <div class="case-study-preview-strip" id="case-study-preview-strip" role="tablist" aria-label="Media gallery preview">
      ${thumbsHtml}
    </div>
  `;
};

let activeGalleryController = null;

/**
 * Renders complete case study modal content.
 */
const renderModalContent = (project, lang) => {
  if (!project || !elements.modalBody) return;
  const dict = state.translations[lang] || {};
  const links = project.links || {};

  const titleText =
    (project.title_i18n && dict[project.title_i18n]) ||
    project.title_raw ||
    "";
  const descText =
    (project.desc_i18n && dict[project.desc_i18n]) || "";
  const problemText =
    (project.problem_i18n && dict[project.problem_i18n]) || "";
  const solutionText =
    (project.solution_i18n && dict[project.solution_i18n]) || "";
  const pillText =
    (project.pill_i18n && dict[project.pill_i18n]) || "";
  const statusText =
    (project.status_i18n && dict[project.status_i18n]) || "";

  const builtItems = (project.built_items_i18n || [])
    .map((key) => `<li>${dict[key] || ""}</li>`)
    .join("");

  const actionBtnsHtml = renderModalActionButtons(links, dict);
  const mediaItems = getProjectMediaList(project, lang, titleText);
  const initialMedia = mediaItems[0] || null;
  const initialStageHtml = renderStageMediaHtml(initialMedia);
  const galleryStripHtml = renderPreviewStripHtml(mediaItems);

  const stageNavArrowsHtml =
    mediaItems.length > 1
      ? `
        <button type="button" class="stage-nav-arrow stage-nav-prev" aria-label="Previous image" title="Previous">
          <i class='bx bx-chevron-left'></i>
        </button>
        <button type="button" class="stage-nav-arrow stage-nav-next" aria-label="Next image" title="Next">
          <i class='bx bx-chevron-right'></i>
        </button>
        <span class="stage-counter-badge">1 / ${mediaItems.length}</span>
      `
      : "";

  elements.modalBody.innerHTML = `
    <div class="modal-content-wrap">
      <div class="modal-top-heading">
        <h2 class="modal-title">${titleText}</h2>
        <p class="modal-desc">${descText}</p>
      </div>

      ${initialMedia ? `
        <div class="case-study-media-showcase">
          <div class="case-study-main-stage" id="case-study-main-stage">
            <div class="case-study-media-container" id="case-study-media-container">
              ${initialStageHtml}
            </div>
            ${stageNavArrowsHtml}
          </div>
          ${galleryStripHtml}
        </div>
      ` : ""}

      <header class="modal-header">
        <div class="modal-header-main">
          <div class="modal-topline">
            ${pillText ? `<span class="project-pill">${pillText}</span>` : ""}
            ${statusText ? `<span class="project-status">${statusText}</span>` : ""}
            <span class="project-stack">${project.stack_raw || ""}</span>
          </div>
        </div>
        ${actionBtnsHtml ? `<div class="modal-action-bar">${actionBtnsHtml}</div>` : ""}
      </header>

      <div class="case-study-grid">
        <div class="case-study-block">
          <div class="case-study-block-header">
            <span class="case-study-block-icon"><i class='bx bx-target-lock'></i></span>
            <h3 class="case-study-block-title">${dict.modal_problem_title || "Problem"}</h3>
          </div>
          <div class="case-study-block-content">
            <p>${problemText}</p>
          </div>
        </div>

        <div class="case-study-block">
          <div class="case-study-block-header">
            <span class="case-study-block-icon"><i class='bx bx-bulb'></i></span>
            <h3 class="case-study-block-title">${dict.modal_solution_title || "Solution"}</h3>
          </div>
          <div class="case-study-block-content">
            <p>${solutionText}</p>
          </div>
        </div>

        <div class="case-study-block full-width">
          <div class="case-study-block-header">
            <span class="case-study-block-icon"><i class='bx bx-code-block'></i></span>
            <h3 class="case-study-block-title">${dict.modal_built_title || "What I Built"}</h3>
          </div>
          <div class="case-study-block-content">
            <ul class="case-study-built-list">
              ${builtItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach gallery stage interactions
  setupGalleryInteractivity(mediaItems);
};

/**
 * Handles switching active media on thumbnail click, arrow navigation, keyboard keys, and mobile swipe gestures.
 */
const setupGalleryInteractivity = (mediaItems) => {
  const mainStage = elements.modalBody?.querySelector("#case-study-main-stage");
  const mediaContainer = elements.modalBody?.querySelector("#case-study-media-container");
  const thumbBtns = elements.modalBody?.querySelectorAll(".preview-thumb-btn");
  if (!mainStage || !mediaItems.length) return;

  let currentIdx = 0;

  const updateStage = (newIdx) => {
    currentIdx = (newIdx + mediaItems.length) % mediaItems.length;
    const item = mediaItems[currentIdx];
    if (!item) return;

    if (mediaContainer) {
      mediaContainer.innerHTML = renderStageMediaHtml(item);
    }

    const counterBadge = mainStage.querySelector(".stage-counter-badge");
    if (counterBadge) {
      counterBadge.textContent = `${currentIdx + 1} / ${mediaItems.length}`;
    }

    // Re-bind lightbox on image
    const imgWrap = mediaContainer?.querySelector(".main-stage-media-item.is-image");
    if (imgWrap) {
      onActivate(imgWrap, () => {
        const src = imgWrap.getAttribute("data-lightbox-src");
        if (src) openLightbox(src);
      });
    }

    // Update active thumbnail
    thumbBtns?.forEach((b, i) => {
      const isActive = i === currentIdx;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", String(isActive));
    });

    // Auto-scroll active thumbnail into view
    thumbBtns?.[currentIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // Thumbnail buttons click
  thumbBtns?.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-media-idx"), 10);
      updateStage(idx);
    });
  });

  // Prev / Next Arrows
  const prevBtn = mainStage.querySelector(".stage-nav-prev");
  const nextBtn = mainStage.querySelector(".stage-nav-next");

  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isRtl = elements.html.dir === "rtl";
    updateStage(isRtl ? currentIdx + 1 : currentIdx - 1);
  });

  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isRtl = elements.html.dir === "rtl";
    updateStage(isRtl ? currentIdx - 1 : currentIdx + 1);
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchStartY = 0;

  mainStage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );

  mainStage.addEventListener(
    "touchend",
    (e) => {
      if (!e.changedTouches.length) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Minimum swipe distance 40px and more horizontal than vertical
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        const isRtl = elements.html.dir === "rtl";
        if (diffX < 0) {
          // Swiped left
          updateStage(isRtl ? currentIdx - 1 : currentIdx + 1);
        } else {
          // Swiped right
          updateStage(isRtl ? currentIdx + 1 : currentIdx - 1);
        }
      }
    },
    { passive: true },
  );

  // Initial binding for lightbox on first image
  const initialImgWrap = mediaContainer?.querySelector(".main-stage-media-item.is-image");
  if (initialImgWrap) {
    onActivate(initialImgWrap, () => {
      const src = initialImgWrap.getAttribute("data-lightbox-src");
      if (src) openLightbox(src);
    });
  }

  // Save reference for keyboard navigation
  activeGalleryController = {
    prev: () => {
      const isRtl = elements.html.dir === "rtl";
      updateStage(isRtl ? currentIdx + 1 : currentIdx - 1);
    },
    next: () => {
      const isRtl = elements.html.dir === "rtl";
      updateStage(isRtl ? currentIdx - 1 : currentIdx + 1);
    },
    hasNext: mediaItems.length > 1,
  };
};

const openProjectModal = (projectId) => {
  const project = state.projectsList.find((p) => p.id === projectId);
  if (!project || !elements.projectModal) return;

  state.currentModalProjectId = projectId;
  renderModalContent(project, elements.html.lang || "en");

  elements.projectModal.classList.add("active");
  elements.projectModal.setAttribute("aria-hidden", "false");
  elements.body.classList.add("modal-open");
};

const closeProjectModal = () => {
  if (!elements.projectModal) return;
  // Pause any playing videos inside modal
  elements.modalBody?.querySelectorAll("video").forEach((vid) => vid.pause());
  elements.projectModal.classList.remove("active");
  elements.projectModal.setAttribute("aria-hidden", "true");
  elements.body.classList.remove("modal-open");
  state.currentModalProjectId = null;
  activeGalleryController = null;
};

// =============================================================================
// 12. CONTACT FORM
// =============================================================================

const handleContactSubmit = (event) => {
  event.preventDefault();

  const name = document.getElementById("contact-name")?.value.trim() || "";
  const emailAddress =
    document.getElementById("contact-email")?.value.trim() || "";
  const projectType =
    document.getElementById("contact-project")?.value.trim() || "";
  const details =
    document.getElementById("contact-details")?.value.trim() || "";

  const subject = `Project Inquiry: ${projectType} - ${name}`;
  const body = [
    `Hello Mohamed,`,
    ``,
    `My name is ${name} (${emailAddress}).`,
    `I would like to discuss a project regarding: ${projectType}`,
    ``,
    `Project Details:`,
    details,
    ``,
    `Best regards,`,
    name,
  ].join("\n");

  window.location.href = `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// =============================================================================
// 13. DATA FETCHING & APP INITIALIZATION
// =============================================================================

const fetchPortfolioData = async () => {
  try {
    const response = await fetch("portfolio-data.json");
    if (!response.ok) throw new Error("Network response was not OK");
    const data = await response.json();

    if (data.translations) state.translations = data.translations;
    if (data.journey) renderJourney(data.journey);
    if (data.services) renderServices(data.services);
    if (data.skills) renderSkills(data.skills);
    if (data.projects) {
      renderProjects(data.projects);
      setupProjectFilters();
    }
  } catch (e) {
    console.error(
      "Could not fetch portfolio-data.json. Ensure running on a web server.",
      e,
    );
  }
};

const setupGlobalEventListeners = () => {
  // Theme & Language
  elements.themeToggle?.addEventListener("click", toggleTheme);
  elements.langToggle?.addEventListener("click", toggleLanguage);

  // Mobile Navigation
  elements.menuButton?.addEventListener("click", toggleMenu);
  elements.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) closeMenu();
    });
  });

  // Window events
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  // Modal & Lightbox close
  elements.modalCloseBtn?.addEventListener("click", closeProjectModal);
  elements.modalBackdrop?.addEventListener("click", closeProjectModal);
  elements.lightboxCloseBtn?.addEventListener("click", closeLightbox);
  elements.lightboxBackdrop?.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (e) => {
    if (elements.projectModal?.classList.contains("active")) {
      if (e.key === "Escape") {
        if (elements.imageLightbox?.classList.contains("active")) {
          closeLightbox();
        } else {
          closeProjectModal();
        }
      } else if (activeGalleryController?.hasNext) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          activeGalleryController.prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          activeGalleryController.next();
        }
      }
    } else if (e.key === "Escape" && elements.imageLightbox?.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Contact form
  elements.contactForm?.addEventListener("submit", handleContactSubmit);
};

const init = async () => {
  initializeTheme();
  await fetchPortfolioData();
  initializeLanguage();
  setupGlobalEventListeners();
  setupScrollObserver();
  handleHeaderScroll();

  // Dismiss splash loader
  const loader = document.getElementById("splash-loader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 400);
  }
};

init();
