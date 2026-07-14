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

  function toggleMobileDropdown(e) {
    e.preventDefault();
    const dropdown = document.getElementById('mobileDropdown');
    if (dropdown) {
      dropdown.classList.toggle('open');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    document.getElementById('regForm').reset();
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  // Navbar scroll effect
  function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Smooth active link highlight
  const sections = document.querySelectorAll('section[id], div.cta-banner');
  const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
  function updateActiveLink() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id || '';
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href === '#' + current) {
        a.style.color = 'var(--teal)';
      } else {
        a.style.color = '';
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveLink();
  });

  // wire hamburger to toggleMenu if no inline onclick
  document.addEventListener('DOMContentLoaded', () => {
    const hb = document.querySelector('.hamburger');
    if (hb) hb.addEventListener('click', toggleMenu);
    
    // Mobile dropdown toggle
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    if (mobileDropdownToggle) {
      mobileDropdownToggle.addEventListener('click', toggleMobileDropdown);
    }
    
    // close nav when clicking a link
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => a.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      const mobile = document.getElementById('mobileMenu');
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      if (mobile && mobile.classList.contains('open')) mobile.classList.remove('open');
      if (hb) hb.setAttribute('aria-expanded', 'false');
      
      // close mobile dropdown
      const dropdown = document.getElementById('mobileDropdown');
      if (dropdown && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
      }
    }));

    // Initial navbar state
    handleNavbarScroll();
  });