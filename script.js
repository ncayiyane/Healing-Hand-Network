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
    const toggle = e.target.closest('.mobile-dropdown-toggle');
    if (!toggle) return;
    
    // Find the next sibling dropdown menu
    const dropdown = toggle.nextElementSibling;
    if (dropdown && dropdown.classList.contains('mobile-dropdown-menu')) {
      dropdown.classList.toggle('open');
    }
  }

  function toggleDesktopDropdown(e) {
    e.preventDefault();
    const toggle = e.target.closest('.dropdown-toggle');
    if (!toggle) return;
    
    const dropdownItem = toggle.closest('.dropdown-item');
    if (!dropdownItem) return;
    
    const dropdown = dropdownItem.querySelector('.dropdown-menu');
    if (!dropdown) return;
    
    // Close all other dropdowns and remove active class
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      if (menu !== dropdown) {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateX(-50%) translateY(-15px)';
      }
    });
    document.querySelectorAll('.dropdown-toggle').forEach(t => {
      if (t !== toggle) {
        t.classList.remove('active');
      }
    });
    
    // Toggle current dropdown
    const isOpen = dropdown.style.opacity === '1';
    if (isOpen) {
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      dropdown.style.transform = 'translateX(-50%) translateY(-15px)';
      toggle.classList.remove('active');
    } else {
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.style.transform = 'translateX(-50%) translateY(0)';
      toggle.classList.add('active');
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
    
    // Desktop dropdown toggle
    const desktopDropdownToggles = document.querySelectorAll('.dropdown-toggle');
    desktopDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', toggleDesktopDropdown);
    });
    
    // Mobile dropdown toggle
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', toggleMobileDropdown);
    });
    
    // close nav when clicking a link (but not dropdown toggles)
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle), .mobile-menu a:not(.mobile-dropdown-toggle):not(.mobile-dropdown-link)').forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the target section
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Calculate offset for navbar height
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          // Scroll to the section
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
      
      const nav = document.querySelector('.nav-links');
      const mobile = document.getElementById('mobileMenu');
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      if (mobile && mobile.classList.contains('open')) mobile.classList.remove('open');
      if (hb) hb.setAttribute('aria-expanded', 'false');
      
      // close all mobile dropdowns
      document.querySelectorAll('.mobile-dropdown-menu').forEach(dropdown => {
        if (dropdown.classList.contains('open')) {
          dropdown.classList.remove('open');
        }
      });
      
      // close all desktop dropdowns
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateX(-50%) translateY(-15px)';
      });
      document.querySelectorAll('.dropdown-toggle').forEach(t => {
        t.classList.remove('active');
      });
    }));
    
    // Handle dropdown link clicks - allow navigation and close dropdowns
    document.querySelectorAll('.dropdown-link').forEach(a => a.addEventListener('click', () => {
      // Don't prevent default - let the link navigate naturally
      
      // Close all desktop dropdowns
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateX(-50%) translateY(-15px)';
      });
      document.querySelectorAll('.dropdown-toggle').forEach(t => {
        t.classList.remove('active');
      });
    }));
    
    // Handle mobile dropdown link clicks - allow navigation and close dropdowns
    document.querySelectorAll('.mobile-dropdown-link').forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the target section
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Calculate offset for navbar height
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          // Scroll to the section
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
      
      // Close mobile menu
      const mobile = document.getElementById('mobileMenu');
      if (mobile && mobile.classList.contains('open')) mobile.classList.remove('open');
      if (hb) hb.setAttribute('aria-expanded', 'false');
      
      // Close all mobile dropdowns
      document.querySelectorAll('.mobile-dropdown-menu').forEach(dropdown => {
        if (dropdown.classList.contains('open')) {
          dropdown.classList.remove('open');
        }
      });
    }));
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          menu.style.transform = 'translateX(-50%) translateY(-15px)';
        });
        document.querySelectorAll('.dropdown-toggle').forEach(t => {
          t.classList.remove('active');
        });
      }
    });

    // Initial navbar state
    handleNavbarScroll();
  });