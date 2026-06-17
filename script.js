/* ============================================================
   THARUN SAI MOKKA — PORTFOLIO JS
   ============================================================ */

// ── Navbar scroll state ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ── Scroll-reveal (IntersectionObserver) ─────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger delay by position in viewport order
        const delay = (i % 4) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Skill bar animation ──────────────────────────────────────
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
          const targetWidth = bar.getAttribute('data-width') + '%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, i * 120);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// ── Active nav link highlight ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchs  = document.querySelectorAll('.nav-links a');

const navHighlight = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchs.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => navHighlight.observe(s));

// ── Smooth hero entrance ──────────────────────────────────────
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll(
    '.hero-eyebrow, .hero-headline, .hero-subtitle, .hero-btns, .hero-photo-wrap'
  );
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });
});

// ── Year auto-update in footer ────────────────────────────────
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.textContent = footerCopy.textContent.replace(
    /© \d{4}/,
    `© ${new Date().getFullYear()}`
  );
}
