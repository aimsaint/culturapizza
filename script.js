// I Commerciali del Buon Gusto — script.js

// ---- Navbar scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(18,43,34,1)';
  } else {
    nav.style.background = 'rgba(28,64,50,0.97)';
  }
});

// ---- Burger menu ----
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ---- Smooth scroll with offset ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Number(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.prod-card, .attr-card, .serv-item, .csp-item, .rb-item, .rcf-item'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 5) * 70;
  revealObserver.observe(el);
});

document.querySelectorAll(
  '.cs-left, .cs-right, .rete-left, .rete-right, .cont-left, .cont-right, .cat-label, .cat-products, .section-head-left'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- Form ----
function inviaForm() {
  const nome = document.getElementById('f-nome').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const interesse = document.getElementById('f-interesse').value;

  if (!nome || !email) {
    alert('Per favore inserisci il tuo nome e indirizzo email.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Inserisci un indirizzo email valido.');
    return;
  }

  const btn = document.querySelector('.btn-send');
  btn.textContent = 'Invio in corso...';
  btn.disabled = true;

  setTimeout(() => {
    ['f-nome', 'f-azienda', 'f-email', 'f-tel', 'f-interesse', 'f-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('form-ok').style.display = 'block';
    btn.textContent = 'Invia richiesta';
    btn.disabled = false;
    setTimeout(() => {
      document.getElementById('form-ok').style.display = 'none';
    }, 6000);
  }, 1400);
}
