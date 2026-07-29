// ============================================
// Language switching (RU default / EN), no localStorage —
// language travels through the ?lang= query param so it
// persists as the visitor clicks between pages.
// ============================================
(function () {
  function getLang() {
    const p = new URLSearchParams(location.search);
    return p.get('lang') === 'en' ? 'en' : 'ru';
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-ru]').forEach((el) => {
      const val = lang === 'en' ? el.dataset.en : el.dataset.ru;
      if (val !== undefined) el.textContent = val;
    });

    // keep internal navigation carrying the current language
    document.querySelectorAll('a[data-nav]').forEach((a) => {
      const url = new URL(a.getAttribute('href'), location.href);
      url.searchParams.set('lang', lang);
      a.href = url.pathname + url.search;
    });

    const toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'ru' ? 'EN' : 'RU';

    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const current = location.pathname.split('/').pop() || 'index.html';
      a.classList.toggle('active', href.indexOf(current) === 0);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const lang = getLang();
    applyLang(lang);

    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const next = getLang() === 'ru' ? 'en' : 'ru';
        const url = new URL(location.href);
        url.searchParams.set('lang', next);
        location.href = url.toString();
      });
    }

    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');
    if (burger && links) {
      burger.addEventListener('click', () => links.classList.toggle('open'));
    }

    // scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  });
})();
