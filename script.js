/* ============================================================
   CULTURAPIZZA — script.js
============================================================ */

/* ── NAV scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('on', window.scrollY > 60);
});

/* ── BURGER menu mobile ── */
const burger = document.getElementById('burger');
const mob    = document.getElementById('mob');
const mobX   = document.getElementById('mobX');

burger.addEventListener('click', () => mob.classList.add('open'));
mobX.addEventListener('click',   () => mob.classList.remove('open'));
mob.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mob.classList.remove('open'));
});

/* ── SMOOTH SCROLL con offset nav ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 72,
      behavior: 'smooth'
    });
  });
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

/* ── RADIO PLAYER ──
   Per attivare uno stream reale:
   1. Sostituisci il <source> nell'elemento <audio id="radioAudio">
      con l'URL del tuo stream, es:
      <source src="https://stream.zeno.fm/XXXXXXXX" type="audio/mpeg"/>
   2. Decommenta audio.play() e audio.pause() qui sotto
── */
const audio      = document.getElementById('radioAudio');
const playBtn    = document.getElementById('playBtn');
const radioBar   = document.getElementById('radioBar');
const radioTitle = document.getElementById('radioTitle');
let playing = false;

/* Titoli/tracce mostrati nel player — aggiorna con i tuoi programmi */
const tracks = [
  '♪ Jazz Napoletano · Musica italiana autentica',
  '♪ Tarantella Moderna · Ritmi del Sud Italia',
  '♪ Canzone Italiana · Classici reinterpretati',
  '♪ Mediterranean Groove · Vibes pizzeria',
  "♪ Lo-fi Italiana · Studiando l'impasto",
];
let currentTrack = 0;

function togglePlay() {
  playing = !playing;
  playBtn.textContent = playing ? '■' : '▶';
  radioBar.classList.toggle('paused', !playing);
  if (playing) {
    // audio.play(); // ← decommenta quando hai lo stream
    radioTitle.textContent = tracks[currentTrack];
  } else {
    // audio.pause(); // ← decommenta quando hai lo stream
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  radioTitle.textContent = tracks[currentTrack];
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  radioTitle.textContent = tracks[currentTrack];
}

function setVol(value) {
  audio.volume = value / 100;
}

/* Rotazione automatica titoli ogni 8 secondi quando in play */
setInterval(() => {
  if (playing) nextTrack();
}, 8000);

/* ── FORM CONTATTO ── */
function enviar() {
  const nombre  = document.getElementById('f-nombre').value.trim();
  const email   = document.getElementById('f-email').value.trim();

  if (!nombre || !email) {
    alert('Por favor ingresa tu nombre y correo.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Correo inválido.');
    return;
  }

  const btn = document.querySelector('.btn-send');
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  /* Qui puoi integrare un servizio reale (Formspree, EmailJS, ecc.) */
  setTimeout(() => {
    ['f-nombre', 'f-tel', 'f-email', 'f-interes', 'f-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('form-ok').style.display = 'block';
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    setTimeout(() => {
      document.getElementById('form-ok').style.display = 'none';
    }, 6000);
  }, 1200);
}

/* ── NEWSLETTER ── */
function nlSub() {
  const email = document.getElementById('nl-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Ingresa un correo válido.');
    return;
  }
  document.getElementById('nl-email').value = '';
  /* Qui puoi integrare Mailchimp, Brevo, ConvertKit, ecc. */
  alert('✅ ¡Suscrito! Pronto recibirás nuestras novedades.');
}