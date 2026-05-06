// =============================================
// Maison Léon — interactions client
// =============================================

(function () {
  'use strict';

  // -------- Mobile nav --------
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // -------- Fade-in au scroll (IntersectionObserver) --------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  // -------- Date min = aujourd'hui --------
  const dateInput = document.getElementById('reservation-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // -------- Année footer --------
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  // -------- Soumission factice du formulaire de réservation --------
  const form = document.getElementById('reservation-form');
  const status = document.querySelector('.form-status');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstname = form.querySelector('input[name="firstname"]').value.trim() || 'Bonjour';
      status.textContent = `Merci ${firstname} — votre demande de réservation a bien été reçue. (Démo : aucun email n'est réellement envoyé.) Nous vous recontacterons sous 24h.`;
      status.classList.add('is-visible');
      form.reset();
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
