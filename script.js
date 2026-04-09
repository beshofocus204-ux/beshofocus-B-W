gsap.registerPlugin(ScrollTrigger);

/* ── 1. PAGE LOADER ─────────────────────────── */
function initLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `<div class="loader-text">Beshoy <span>Hany</span></div>`;
  document.body.appendChild(loader);

  const tl = gsap.timeline({
    onComplete: () => {
      loader.remove();
      initHeroAnimation();
    }
  });

  tl.to('.loader-text', {
    opacity: 1, duration: 0.5, ease: 'power2.out'
  })
  .to('.loader-text', {
    opacity: 0, duration: 0.4, delay: 0.6, ease: 'power2.in'
  })
  .to(loader, {
    yPercent: -100, duration: 0.8, ease: 'power4.inOut'
  });
}

/* ── 2. HERO ENTRANCE ───────────────────────── */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Header slides down
  tl.fromTo('#mainHeader',
    { yPercent: -100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 0.8 }
  )

  // Eyebrow line draws + text fades
  .to('.eyebrow-line', { width: 40, duration: 0.6 }, '-=0.3')
  .to('.eyebrow-text', { opacity: 0.5, duration: 0.5 }, '-=0.3')

  // Title words slide up from clip
  .to('.title-word', {
    y: 0, duration: 1, stagger: 0.12, ease: 'power4.out'
  }, '-=0.2')

  // Photo parallax entrance (smooth, no flicker)
  .fromTo('.hero-img-wrapper',
    { x: 60, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
    '-=0.6'
  )

  // Sub elements stagger in
  .to('.sub-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
  .to('.hero-desc',  { opacity: 0.6, y: 0, duration: 0.5 }, '-=0.3')
  .to('.red-btn',    { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  .to('.scroll-indicator', { opacity: 1, duration: 0.5 }, '-=0.1');
}

/* ── 3. SCROLL REVEAL ───────────────────────── */
function initScrollReveal() {

  // Section labels — red line draws in
  document.querySelectorAll('.reveal-label').forEach(label => {
    const line = label.querySelector('.red-line');
    const text = label.querySelector('span:not(.red-line)');

    ScrollTrigger.create({
      trigger: label,
      start: 'top 80%',
      onEnter: () => {
        label.classList.add('in-view');
        gsap.fromTo(text,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
        );
      }
    });
  });

  // Generic reveal items — staggered per parent
  document.querySelectorAll('.section-focus').forEach(section => {
    const items = section.querySelectorAll('.reveal-item');
    if (!items.length) return;

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
      }
    });
  });

  // About headline — word by word
  const headline = document.querySelector('.about-headline');
  if (headline) {
    const words = headline.textContent.trim().split(' ');
    headline.innerHTML = words
      .map(w => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
      .join(' ');

    gsap.fromTo('.about-headline .word-inner',
      { y: '105%' },
      {
        y: '0%',
        duration: 0.8,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headline,
          start: 'top 75%',
        }
      }
    );

    // CSS for word reveal
    const style = document.createElement('style');
    style.textContent = `
      .word-wrap { display: inline-block; overflow: hidden; vertical-align: bottom; }
      .word-inner { display: inline-block; }
    `;
    document.head.appendChild(style);
  }

  // Contact headline
  const contactHeadline = document.querySelector('.contact-headline');
  if (contactHeadline) {
    gsap.fromTo(contactHeadline,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: contactHeadline, start: 'top 80%' }
      }
    );
  }

  // Section bookmarks slide in
  document.querySelectorAll('.section-bookmark').forEach(bm => {
    gsap.fromTo(bm,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: bm, start: 'top 85%' }
      }
    );
  });

  // TOC cards stagger
  gsap.fromTo('.toc-card',
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.toc-grid', start: 'top 75%' }
    }
  );
}

/* ── 4. PARALLAX ────────────────────────────── */
function initParallax() {
  gsap.to('.hero-img-wrapper', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* ── 5. CUSTOM CURSOR ───────────────────────── */
function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1 });
  });

  // Ring follows with lag
  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  // Hover states
  document.querySelectorAll('a, button, .skill-tag, .toc-card, .service-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ── 6. MAGNETIC EFFECT ─────────────────────── */
function initMagnetic() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.2;
      const dy = (e.clientY - cy) * 0.2;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ── 7. NOISE TEXTURE ───────────────────────── */
function initNoise() {
  const canvas = document.getElementById('noiseCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  function generateNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = data[i+1] = data[i+2] = v;
      data[i+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // Animate noise at low fps to save performance
  let last = 0;
  function loop(t) {
    if (t - last > 100) { generateNoise(); last = t; }
    requestAnimationFrame(loop);
  }
  generateNoise();
  requestAnimationFrame(loop);

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ── 8. HEADER HIDE ON SCROLL ───────────────── */
function initHeaderScroll() {
  let lastY = 0;
  ScrollTrigger.create({
    onUpdate: self => {
      const y = window.scrollY;
      if (y > 100 && y > lastY) {
        gsap.to('#mainHeader', { yPercent: -100, duration: 0.4, ease: 'power2.in' });
      } else {
        gsap.to('#mainHeader', { yPercent: 0, duration: 0.4, ease: 'power2.out' });
      }
      lastY = y;
    }
  });
}

/* ── 9. SMOOTH SCROLL ───────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1.2,
        ease: 'power4.inOut'
      });
    });
  });
}

/* ── 10. LANG TOGGLE ────────────────────────── */
function initLangToggle() {
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'en';

  langToggle.onclick = () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    langToggle.innerText = currentLang === 'en' ? 'AR' : 'EN';
    document.body.setAttribute('data-lang', currentLang);
    document.querySelectorAll('[data-en]').forEach(el => {
      el.innerText = el.getAttribute(`data-${currentLang}`);
    });
  };
}

/* ── 11. SECTION FOCUS/BLUR (IntersectionObserver) ── */
function initSectionFocus() {
  const focusObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.2, rootMargin: '-8% 0px -8% 0px' });

  // Exclude #projects from blur animation
  document.querySelectorAll('.section-focus:not(#projects)').forEach(s => focusObserver.observe(s));
  
  // Keep #projects always visible
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.classList.add('is-visible');
  }
}

/* ── 12. LIGHTBOX FUNCTIONALITY ────────────── */
function initLightbox() {
  // Create lightbox modal
  const modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-img" src="" alt="">
    </div>
  `;
  document.body.appendChild(modal);

  const lightboxImg = modal.querySelector('.lightbox-img');
  const closeBtn = modal.querySelector('.lightbox-close');

  // Open lightbox on image click
  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxImg.src = img.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeLightbox();
  });
}

/* ── INIT ALL ───────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initNoise();
  initCursor();
  initLoader();
  initMagnetic();
  initSectionFocus();
  initScrollReveal();
  initParallax();
  initHeaderScroll();
  initLangToggle();
  initLightbox();
  // initSmoothScroll(); ← uncomment if you add ScrollTo GSAP plugin
});
