// IncomingTax — app.js

/* ---- Nav scroll ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ---- Mobile burger ---- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger) {
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
  });
});

/* ---- Reveal on scroll ---- */
const revealEls = document.querySelectorAll('.feat-card, .price-card, .faq-item, .ai-card, .vf-card, .kpi, .compliance-badge');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal', 'visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  revealObs.observe(el);
});

/* ---- Hero dashboard typing animation ---- */
const typingEl = document.querySelector('.ai-typing');
if (typingEl) {
  const words = ['Material oficina', 'Servicios digitales', 'Suministros', 'Software'];
  let wi = 0, ci = 0, deleting = false;
  const cursor = typingEl.querySelector('.cursor');
  const textNode = typingEl.childNodes[0];

  setInterval(() => {
    const word = words[wi];
    if (!deleting) {
      if (ci < word.length) {
        if (textNode) textNode.textContent = word.slice(0, ++ci);
      } else {
        setTimeout(() => { deleting = true; }, 1400);
      }
    } else {
      if (ci > 0) {
        if (textNode) textNode.textContent = word.slice(0, --ci);
      } else {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
  }, 80);
}

/* ---- FAQ keyboard a11y ---- */
document.querySelectorAll('.faq-item summary').forEach(s => {
  s.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      s.parentElement.toggleAttribute('open');
    }
  });
});
