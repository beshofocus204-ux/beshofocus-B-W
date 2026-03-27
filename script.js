const langToggle = document.getElementById("langToggle");
let currentLang = "en";

// تبديل اللغة
langToggle.onclick = () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  langToggle.innerText = currentLang === "en" ? "AR" : "EN";
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`);
  });
};

// أنميشن الـ Focus & Blur عند التمرير
const focusObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else {
      entry.target.classList.remove("is-visible");
    }
  });
}, {
  threshold: 0.3, // السيكشن يظهر لما 30% منه يبان
  rootMargin: "-10% 0px -10% 0px" // بيخلي الفوكس في نص الشاشة بالظبط
});

document.querySelectorAll(".section-focus").forEach(section => {
  focusObserver.observe(section);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
