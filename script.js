/* ================= HEADER LOGIC ================= */

function initHeader() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  if (!mobileMenuBtn || !navMenu) return;

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    const icon = this.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  // Close menu on nav click (only for section links)
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function () {
      const href = this.getAttribute("href");
      if (href && !href.startsWith("#")) return;

      navMenu.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Active nav link on scroll
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    let current = "";

    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - 200) {
        current = section.id;
      }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
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
  // Page 1 – Impact section
  startCounters(".counter", true);

  // Page 2 – Metrics section
  startCounters(".metric-value", false);

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
    hero_title: "Empowering Communities, Transforming Lives",
    hero_desc:
      "Lakshya Foundation is a non-profit organization dedicated to sustainable development across 12 key sectors, driving social change through education, healthcare, women empowerment, and community development initiatives.",
    hero_donate: "Donate Now",
    hero_volunteer: "Volunteer With Us",
    hero_csr: "CSR Partnership"
  },

  hi: {
    hero_title: "समुदायों को सशक्त बनाना, जीवन को बदलना",
    hero_desc:
      "लक्ष्य फाउंडेशन एक गैर-लाभकारी संस्था है जो 12 प्रमुख क्षेत्रों में सतत विकास के लिए कार्य करती है, जिसमें शिक्षा, स्वास्थ्य, महिला सशक्तिकरण और सामुदायिक विकास शामिल हैं।",
    hero_donate: "अभी दान करें",
    hero_volunteer: "हमारे साथ स्वयंसेवक बनें",
    hero_csr: "सीएसआर साझेदारी"
  },

  mr: {
    hero_title: "समुदाय सशक्त करणे, जीवन बदलणे",
    hero_desc:
      "लक्ष्य फाउंडेशन ही 12 प्रमुख क्षेत्रांमध्ये शाश्वत विकासासाठी कार्य करणारी स्वयंसेवी संस्था आहे, ज्यामध्ये शिक्षण, आरोग्य, महिला सक्षमीकरण आणि समुदाय विकासाचा समावेश आहे.",
    hero_donate: "आता देणगी द्या",
    hero_volunteer: "आमच्यासोबत स्वयंसेवक व्हा",
    hero_csr: "सीएसआर भागीदारी"
  },
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


function setLanguage(lang) {
  localStorage.setItem("siteLang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
}

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

  // ✅ LANGUAGE CLICK FIX (event delegation)
  langMenu.addEventListener("click", function (e) {
    e.stopPropagation();

    const item = e.target.closest("[data-lang]");
    if (!item) return;

    const lang = item.getAttribute("data-lang");
    setLanguage(lang);
    langMenu.classList.remove("show");
  });
}


/* ================= INITIAL LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("siteLang") || "en";
  setLanguage(savedLang);

  
  
  initSmoothScroll();
  initCounters();
  initJoinButton();
});
/* ================= FORCE INIT AFTER HEADER LOAD ================= */

window.addEventListener("load", function () {
  // slight delay to ensure header template is mounted
  setTimeout(() => {
    initHeader();
    initLanguage();
  }, 100);
});
document.querySelectorAll(".lang-menu li").forEach(item => {
  item.addEventListener("click", () => {
    const lang = item.getAttribute("data-lang");

    const interval = setInterval(() => {
      const select = document.querySelector("select.goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 100);
  });
});

