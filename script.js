const langToggle = document.getElementById("langToggle");
let currentLang = "en";

langToggle.onclick = () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  langToggle.innerText = currentLang === "en" ? "AR" : "EN";
  
  document.body.setAttribute("data-lang", currentLang);
  
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`);
  });
};


// Focus & Blur on scroll
const focusObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else {
      entry.target.classList.remove("is-visible");
    }
  });
}, {
  threshold: 0.3,
  rootMargin: "-10% 0px -10% 0px"
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
