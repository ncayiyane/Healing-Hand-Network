function toggleMenu() {
    const m = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    m.classList.toggle('open');
    if (navLinks) navLinks.classList.toggle('open');
    // toggle aria-expanded for accessibility
    const hb = document.querySelector('.hamburger');
    if (hb) {
      const expanded = hb.getAttribute('aria-expanded') === 'true';
      hb.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    document.getElementById('regForm').reset();
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  // Smooth active link highlight
  const sections = document.querySelectorAll('section[id], div.cta-banner');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id || '';
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--teal)' : '';
    });
  });

// wire hamburger to toggleMenu if no inline onclick
document.addEventListener('DOMContentLoaded', () => {
  const hb = document.querySelector('.hamburger');
  if (hb) hb.addEventListener('click', toggleMenu);
  // close nav when clicking a link
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    const mobile = document.getElementById('mobileMenu');
    if (nav && nav.classList.contains('open')) nav.classList.remove('open');
    if (mobile && mobile.classList.contains('open')) mobile.classList.remove('open');
    if (hb) hb.setAttribute('aria-expanded', 'false');
  }));
});