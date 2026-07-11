const menuButton = document.querySelector("#menu-icon");
const menuIcon = menuButton?.querySelector("i");
const navbar = document.querySelector("#navbar");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const langToggle = document.getElementById("lang-toggle");
const html = document.documentElement;
const body = document.body;
const header = document.getElementById("header");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("header nav a");
const contactForm = document.getElementById("contact-form");
let typedInstance = null;
let translations = {};

const setThemeIcon = () => {
  if (!themeIcon) return;
  themeIcon.className = html.classList.contains("dark")
    ? "bx bx-sun"
    : "bx bx-moon";
};

const closeMenu = () => {
  navbar?.classList.remove("open");
  body.classList.remove("menu-open");
  if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  if (menuIcon) menuIcon.className = "bx bx-menu";
};

const applyTranslations = (lang) => {
  const dictionary = translations[lang];
  if (!dictionary) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!dictionary[key]) return;
    element.innerHTML = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (!dictionary[key]) return;
    element.setAttribute("placeholder", dictionary[key]);
    element.setAttribute("aria-label", dictionary[key]);
  });
};

const updateTypedText = (lang) => {
  if (typedInstance) {
    typedInstance.destroy();
    typedInstance = null;
  }

  if (typeof Typed === "undefined" || !translations[lang]) return;

  typedInstance = new Typed(".multiple-text", {
    strings: translations[lang].typed_strings,
    typeSpeed: lang === "ar" ? 55 : 70,
    backSpeed: lang === "ar" ? 35 : 45,
    backDelay: 1400,
    loop: true,
  });
};

const applyLanguage = (lang) => {
  const isArabic = lang === "ar";
  html.lang = lang;
  html.dir = isArabic ? "rtl" : "ltr";
  body.setAttribute("dir", isArabic ? "rtl" : "ltr");
  applyTranslations(lang);
  updateTypedText(lang);
  if (langToggle) langToggle.textContent = isArabic ? "EN" : "AR";
  localStorage.setItem("language", lang);
};

const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  html.classList.toggle(
    "dark",
    savedTheme ? savedTheme === "dark" : prefersDark,
  );
  setThemeIcon();
};

const initializeLanguage = () => {
  const savedLanguage = localStorage.getItem("language") || "en";
  applyLanguage(savedLanguage);
};

const renderJourney = (journey) => {
  const eduStack = document.getElementById("education-stack");
  const expStack = document.getElementById("experience-stack");

  if (eduStack && journey.education) {
    eduStack.innerHTML = journey.education
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

  if (expStack && journey.experience) {
    expStack.innerHTML = journey.experience
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
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  grid.innerHTML = services
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
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.innerHTML = skills
    .map((skillCat) => {
      const tagsHtml = skillCat.tags
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
        <h3 data-i18n="${skillCat.category_i18n}"></h3>
        <span class="tag-row">
          ${tagsHtml}
        </span>
      </article>
    `;
    })
    .join("");
};

const renderProjects = (projects) => {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((project) => {
      const links = project.links || {};
      const mediaHref = links.github || links.website || links.playstore || links.appstore || "#";

      let linksHtml = "";
      if (links.github) {
        linksHtml += `
        <a href="${links.github}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" aria-label="GitHub Repository">
          <i class="bx bxl-github"></i>
        </a>
      `;
      }
      if (links.playstore) {
        linksHtml += `
        <a href="${links.playstore}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" aria-label="Google Play Store">
          <i class="bx bxl-play-store"></i>
        </a>
      `;
      }
      if (links.appstore) {
        linksHtml += `
        <a href="${links.appstore}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" aria-label="App Store">
          <i class="bx bxl-apple"></i>
        </a>
      `;
      }
      if (links.website) {
        linksHtml += `
        <a href="${links.website}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" aria-label="Website Link">
          <i class="bx bx-link-external"></i>
        </a>
      `;
      }

      const titleHtml = project.title_i18n
        ? `<h3 data-i18n="${project.title_i18n}"></h3>`
        : `<h3>${project.title_raw}</h3>`;

      const categories = [...(project.categories || [])];
      const hasOtherLinks = Object.keys(links).some((key) => key !== "github" && links[key]);
      if (hasOtherLinks && !categories.includes("published")) {
        categories.push("published");
      }
      const categoriesStr = categories.join(" ");

      return `
      <article class="project-card" data-categories="${categoriesStr}">
        <a class="project-media" href="${mediaHref}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.alt}">
          <img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async" width="1600" height="1200">
        </a>
        <div class="project-content">
          <div class="project-topline">
            <span class="project-pill" data-i18n="${project.pill_i18n}"></span>
            <span class="project-status" data-i18n="${project.status_i18n}"></span>
          </div>
          ${titleHtml}
          <p data-i18n="${project.desc_i18n}"></p>
          <div class="project-footer">
            <span class="project-stack">${project.stack_raw}</span>
            <div class="project-links">
              ${linksHtml}
            </div>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
};

const setupProjectFilters = () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = (card.getAttribute("data-categories") || "").split(" ");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.classList.remove("hide-project");
        } else {
          card.classList.add("hide-project");
        }
      });
    });
  });
};

const initializePortfolioData = async () => {
  try {
    const response = await fetch("portfolio-data.json");
    if (!response.ok) throw new Error("Network response was not OK");
    const data = await response.json();

    if (data.translations) translations = data.translations;
    if (data.journey) renderJourney(data.journey);
    if (data.services) renderServices(data.services);
    if (data.skills) renderSkills(data.skills);
    if (data.projects) {
      renderProjects(data.projects);
      setupProjectFilters();
    }
  } catch (e) {
    console.error(
      "Could not fetch portfolio-data.json. Please ensure you are running on a local web server.",
      e,
    );
  }
};

themeToggle?.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light",
  );
  setThemeIcon();
});

langToggle?.addEventListener("click", () => {
  const nextLanguage = html.lang === "ar" ? "en" : "ar";
  applyLanguage(nextLanguage);
});

menuButton?.addEventListener("click", () => {
  const isOpen = navbar?.classList.toggle("open");
  body.classList.toggle("menu-open", Boolean(isOpen));
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
  if (menuIcon) menuIcon.className = isOpen ? "bx bx-x" : "bx bx-menu";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) closeMenu();
  });
});

const observerOptions = {
  root: null,
  rootMargin: "-30% 0px -60% 0px",
  threshold: 0,
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

const handleHeaderScroll = () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const projectInput = document.getElementById("contact-project");
  const detailsInput = document.getElementById("contact-details");

  const name = nameInput ? nameInput.value.trim() : "";
  const emailAddress = emailInput ? emailInput.value.trim() : "";
  const projectType = projectInput ? projectInput.value.trim() : "";
  const details = detailsInput ? detailsInput.value.trim() : "";

  const receiverEmail = "mohamedwaleedabdelghany@gmail.com";
  const subject = `Project Inquiry: ${projectType} - ${name}`;
  const body = `Hello Mohamed,

My name is ${name} (${emailAddress}).
I would like to discuss a project regarding: ${projectType}

Project Details:
${details}

Best regards,
${name}`;

  const mailtoUrl = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
});

const init = async () => {
  initializeTheme();
  await initializePortfolioData();
  initializeLanguage();
  handleHeaderScroll();

  // Fade out splash loader
  const loader = document.getElementById("splash-loader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 400);
  }
};

init();
