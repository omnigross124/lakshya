/* ================= HEADER LOGIC ================= */

function initHeader() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  if (!mobileMenuBtn || !navMenu) return;

  /* ================= MOBILE MENU TOGGLE ================= */

  navMenu.classList.remove("active");
  const iconInit = mobileMenuBtn.querySelector("i");
  if (iconInit) {
    iconInit.classList.remove("fa-times");
    iconInit.classList.add("fa-bars");
  }

  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navMenu.classList.toggle("active");

    const icon = this.querySelector("i");
    if (!icon) return;
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");

    // Close any open dropdowns when menu closes
    if (!navMenu.classList.contains("active")) {
      document
        .querySelectorAll(".nav-dropdown.open")
        .forEach(d => d.classList.remove("open"));
    }
  });

  /* ================= OUTSIDE CLICK CLOSE ================= */

  document.addEventListener("click", function (e) {
    if (!navMenu.classList.contains("active")) return;

    if (
      !navMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      navMenu.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
      document
        .querySelectorAll(".nav-dropdown.open")
        .forEach(d => d.classList.remove("open"));
    }
  });

  /* ================= SMART NAV CLICK HANDLING ================= */

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
      const isMobile = window.innerWidth <= 991;
      const parentDropdown = this.closest(".nav-dropdown");
      const isPrograms = this.classList.contains("dropdown-toggle");

      // ✅ MOBILE + PROGRAMS
      if (isMobile && isPrograms && parentDropdown) {
        // FIRST TAP → open dropdown only
        if (!parentDropdown.classList.contains("open")) {
          e.preventDefault(); // 🚫 STOP PAGE NAVIGATION
          parentDropdown.classList.add("open");
          return;
        }

        // SECOND TAP → allow navigation to programs.html
        parentDropdown.classList.remove("open");
        navMenu.classList.remove("active");
        return;
      }

      // ✅ NORMAL LINKS (mobile)
      if (isMobile) {
        navMenu.classList.remove("active");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
        document
          .querySelectorAll(".nav-dropdown.open")
          .forEach(d => d.classList.remove("open"));
      }
    });
  });
}


/* ================= SMOOTH SCROLL ================= */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href.length === 1) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    });
  });
}

/* ================= COUNTER SYSTEM ================= */

function startCounters(selector, showPlus = false) {
  const counters = document.querySelectorAll(selector);

  counters.forEach(counter => {
    counter.innerText = "0";

    const updateCount = () => {
      const target = +counter.dataset.target;
      const current = +counter.innerText;
      const increment = Math.ceil(target / 100);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = showPlus ? target + "+" : target;
      }
    };

    updateCount();
  });
}

function initCounters() {
  // Impact counters (if present)
  const impactSection = document.querySelector(".impact-metrics");
  if (!impactSection) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      startCounters(".counter", true);
      observer.disconnect();
    }
  }, { threshold: 0.4 });

  observer.observe(impactSection);
}

/* ================= JOIN BUTTON ================= */

function initJoinButton() {
  const joinBtn = document.getElementById("joinBtn");
  if (!joinBtn) return;

  joinBtn.addEventListener("click", function () {
    alert("Thank you for your interest! Our team will contact you soon.");
  });
}

/* ================= MULTI-LANGUAGE ================= */

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About Us",
    nav_our_work: "Our Work",
    nav_programs: "Programs",
    nav_impact: "Impact",
    nav_get_involved: "Get Involved",
    nav_transparency: "Transparency",
    nav_contact: "Contact Us",
    nav_language: "Languages"
  },
  hi: {
    nav_home: "होम",
    nav_about: "हमारे बारे में",
    nav_our_work: "हमारा कार्य",
    nav_programs: "कार्यक्रम",
    nav_impact: "प्रभाव",
    nav_get_involved: "सहभाग करें",
    nav_transparency: "पारदर्शिता",
    nav_contact: "संपर्क करें",
    nav_language: "भाषाएँ"
  },
  mr: {
    nav_home: "मुख्यपृष्ठ",
    nav_about: "आमच्याबद्दल",
    nav_our_work: "आमचे कार्य",
    nav_programs: "कार्यक्रम",
    nav_impact: "प्रभाव",
    nav_get_involved: "सहभाग घ्या",
    nav_transparency: "पारदर्शकता",
    nav_contact: "संपर्क",
    nav_language: "भाषा"
  }
};

function setLanguageTextOnly(lang) {
  localStorage.setItem("siteLang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
}

/* ================= GOOGLE TRANSLATE CONTROL ================= */
/* ✅ Google loads and calls this function */
function googleTranslateElementInit() {
  if (!document.getElementById("google_translate_element")) return;

  // Create widget (hidden by CSS, but still works)
  new google.translate.TranslateElement(
    { pageLanguage: "en", autoDisplay: false },
    "google_translate_element"
  );

  // Apply saved language after widget becomes ready
  const savedLang = localStorage.getItem("siteLang") || "en";
  applyGoogleTranslate(savedLang);
}

/* ✅ actually switches the whole website language */
function applyGoogleTranslate(lang) {
  // Google uses a select dropdown internally.
  // We wait until it exists and then set its value.
  const maxTries = 30;
  let tries = 0;

  const timer = setInterval(() => {
    tries++;

    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
      clearInterval(timer);
    }

    if (tries >= maxTries) {
      clearInterval(timer);
    }
  }, 200);
}

/* ================= LANGUAGE UI ================= */

function initLanguage() {
  const langToggle = document.getElementById("langToggle");
  const langMenu = document.querySelector(".lang-menu");

  if (!langToggle || !langMenu) return;

  // Toggle dropdown
  langToggle.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    langMenu.classList.toggle("show");
  });

  // Close on outside click
  document.addEventListener("click", () => {
    langMenu.classList.remove("show");
  });

  // Click language item
  langMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    const item = e.target.closest("[data-lang]");
    if (!item) return;

    const lang = item.getAttribute("data-lang");

    // 1) Change custom text (nav labels etc.)
    setLanguageTextOnly(lang);

    // 2) Change whole website content using Google Translate
    applyGoogleTranslate(lang);

    langMenu.classList.remove("show");
  });
}

/* ================= INITIAL LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("siteLang") || "en";
  setLanguageTextOnly(savedLang);

  initHeader();
  initLanguage();
  initSmoothScroll();
  initCounters();
  initJoinButton();
});
/* ================= HERO SLIDER ================= */

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length === 0) return;

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3000); // ⏱ 3 seconds
}

document.addEventListener("DOMContentLoaded", initHeroSlider);
