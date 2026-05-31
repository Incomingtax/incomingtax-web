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

/* ---- Demo: factura cayendo al dashboard ---- */
const flyingInvoice = document.getElementById('flyingInvoice');
const dashboard = document.getElementById('demo');
const invoiceTable = document.getElementById('invoiceTable');
const verDemoBtn = document.querySelector('a[href="#demo"]');
let demoRunning = false;

function playInvoiceDemo() {
  if (demoRunning || !flyingInvoice || !dashboard) return;
  demoRunning = true;

  // Reinicia la animación de la factura
  flyingInvoice.classList.remove('is-flying');
  void flyingInvoice.offsetWidth; // fuerza reflow
  flyingInvoice.classList.add('is-flying');

  // A mitad de la caída: pulso del dashboard + nueva fila procesada
  setTimeout(() => {
    dashboard.classList.add('is-processing');
    setTimeout(() => dashboard.classList.remove('is-processing'), 600);

    if (invoiceTable) {
      const row = document.createElement('div');
      row.className = 'invoice-row is-new';
      row.innerHTML =
        '<span class="inv-num">F-2025-149</span>' +
        '<span class="inv-provider"><span class="inv-avatar" style="background:#8B5CF6">N</span>Notion Labs</span>' +
        '<span class="inv-amount">€ 96,80</span>' +
        '<span class="inv-badge inv-badge--ok">✓ Verifactu</span>';
      invoiceTable.appendChild(row);
      // Mantén solo las últimas filas para no acumular en re-ejecuciones
      const rows = invoiceTable.querySelectorAll('.invoice-row');
      if (rows.length > 4) rows[0].remove();
    }
  }, 1050);

  setTimeout(() => {
    flyingInvoice.classList.remove('is-flying');
    demoRunning = false;
  }, 1700);
}

if (verDemoBtn) {
  verDemoBtn.addEventListener('click', () => {
    // deja que el smooth-scroll lleve al dashboard y luego anima
    setTimeout(playInvoiceDemo, 650);
  });
}

// Auto-reproduce una vez cuando el dashboard entra en pantalla
if (dashboard) {
  const demoObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(playInvoiceDemo, 600);
        demoObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  demoObs.observe(dashboard);
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
