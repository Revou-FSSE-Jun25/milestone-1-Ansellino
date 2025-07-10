// ===== PORTFOLIO JEREMY ANSELLINO - JAVASCRIPT =====

document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "Portfolio Jeremy Ansellino - JavaScript loaded successfully! 🚀"
  );

  // ===== LOGO REFRESH FUNCTIONALITY =====
  initializeLogoRefresh();

  // ===== MOBILE MENU FUNCTIONALITY =====
  initializeMobileMenu();

  // ===== SMOOTH SCROLLING =====
  initializeSmoothScrolling();

  // ===== SCROLL ANIMATIONS =====
  initializeScrollAnimations();

  // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
  initializeActiveNavigation();

  // ===== FORM ENHANCEMENT =====
  initializeFormEnhancements();

  // ===== BACK TO TOP FUNCTIONALITY =====
  initializeBackToTop();
});

// ===== LOGO REFRESH FUNCTIONALITY =====
function initializeLogoRefresh() {
  const logoContainer = document.querySelector(".logo-container");
  const headerLogo = document.querySelector(".header-logo");
  const brandText = document.querySelector(".brand-text");

  console.log("Initializing logo refresh functionality...");
  console.log("Logo container found:", !!logoContainer);
  console.log("Header logo found:", !!headerLogo);
  console.log("Brand text found:", !!brandText);

  if (!logoContainer) {
    console.error("Logo container not found!");
    return;
  }

  // Function to handle page refresh with loading animation
  function refreshPage() {
    console.log("Logo clicked - refreshing page...");

    // Add loading state to logo
    if (headerLogo) {
      headerLogo.style.transform = "rotate(360deg)";
      headerLogo.style.transition = "transform 0.5s ease";
    }

    if (brandText) {
      brandText.style.opacity = "0.7";
      brandText.style.transition = "opacity 0.3s ease";
    }

    // Add visual feedback
    logoContainer.style.transform = "scale(0.95)";
    logoContainer.style.transition = "transform 0.2s ease";

    // Refresh page after short delay for animation
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  // Add click event listener to logo container
  logoContainer.addEventListener("click", function (e) {
    e.preventDefault();
    refreshPage();
  });

  // Add keyboard support for accessibility
  logoContainer.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      refreshPage();
    }
  });

  // Make logo container focusable for keyboard navigation
  logoContainer.setAttribute("tabindex", "0");
  logoContainer.setAttribute("role", "button");
  logoContainer.setAttribute(
    "aria-label",
    "Refresh page - Jeremy Ansellino Logo"
  );

  // Add cursor pointer style
  logoContainer.style.cursor = "pointer";

  console.log("Logo refresh functionality initialized successfully!");
}

// ===== ENHANCED MOBILE MENU INITIALIZATION =====
function initializeMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");
  const navLinks = document.querySelectorAll("nav a");
  const body = document.body;
  let isMenuOpen = false;

  console.log("Initializing enhanced mobile menu...");
  console.log("Menu toggle found:", !!menuToggle);
  console.log("Nav UL found:", !!navUl);
  console.log("Nav links found:", navLinks.length);

  if (!menuToggle || !navUl) {
    console.error("Mobile menu elements not found!");
    return;
  }

  // Make sure menu toggle is visible on mobile
  function checkMenuToggleVisibility() {
    if (window.innerWidth <= 768) {
      menuToggle.style.display = "flex";
      console.log("Mobile view - showing menu toggle");
    } else {
      menuToggle.style.display = "none";
      console.log("Desktop view - hiding menu toggle");
      if (isMenuOpen) closeMenu();
    }
  }

  // Initial check
  checkMenuToggleVisibility();

  // Toggle menu function with enhanced slide-in effect
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    // Toggle active classes for slide-in effect
    menuToggle.classList.toggle("active", isMenuOpen);
    navUl.classList.toggle("mobile-active", isMenuOpen);
    body.classList.toggle("mobile-menu-open", isMenuOpen);

    // Update ARIA attributes for accessibility
    menuToggle.setAttribute("aria-expanded", isMenuOpen);

    // Change icon based on state with smooth transition
    const icon = menuToggle.querySelector("i");
    if (icon) {
      if (isMenuOpen) {
        icon.className = "fas fa-times";
        console.log("Mobile slide-in menu opened");
      } else {
        icon.className = "fas fa-bars";
        console.log("Mobile slide-in menu closed");
      }
    }

    // Prevent body scroll when menu is open (mobile optimization)
    if (isMenuOpen) {
      body.style.overflow = "hidden";
      // Remove position fixed as it can cause interaction issues
    } else {
      body.style.overflow = "";
    }
  }

  // Enhanced close menu function
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      menuToggle.classList.remove("active");
      navUl.classList.remove("mobile-active");
      body.classList.remove("mobile-menu-open");
      menuToggle.setAttribute("aria-expanded", "false");

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.className = "fas fa-bars";
      }

      // Reset body styles
      body.style.overflow = "";

      console.log("Mobile slide-in menu closed");
    }
  }

  // Menu toggle click handler
  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Menu toggle clicked, current state:", isMenuOpen);
    toggleMenu();
  });

  // Debug: Add visual feedback when toggle is clicked
  menuToggle.addEventListener("touchstart", function (e) {
    console.log("Touch start on menu toggle");
    this.style.transform = "translateY(-50%) scale(0.95)";
  });

  menuToggle.addEventListener("touchend", function (e) {
    console.log("Touch end on menu toggle");
    setTimeout(() => {
      this.style.transform = "translateY(-50%)";
    }, 100);
  });

  // Close menu when clicking navigation links with smooth transition
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      console.log("Navigation link clicked:", this.textContent);
      if (isMenuOpen && window.innerWidth <= 768) {
        // Add visual feedback before closing
        link.style.transform = "scale(0.95)";
        setTimeout(() => {
          link.style.transform = "";
          closeMenu();
        }, 150);
      }
    });
  });

  // Close menu when clicking on backdrop or outside menu area
  document.addEventListener("click", function (e) {
    if (isMenuOpen) {
      // Check if click is outside both menu and toggle button
      const isClickOnMenu = navUl.contains(e.target);
      const isClickOnToggle = menuToggle.contains(e.target);

      console.log(
        "Document click - Menu open:",
        isMenuOpen,
        "Click on menu:",
        isClickOnMenu,
        "Click on toggle:",
        isClickOnToggle
      );

      if (!isClickOnMenu && !isClickOnToggle) {
        console.log("Closing menu due to outside click");
        closeMenu();
      }
    }
  });

  // Additional backdrop click handler for pseudo-element
  document.addEventListener("touchstart", function (e) {
    if (isMenuOpen) {
      const isClickOnMenu = navUl.contains(e.target);
      const isClickOnToggle = menuToggle.contains(e.target);

      console.log(
        "Touch start - Menu open:",
        isMenuOpen,
        "Touch on menu:",
        isClickOnMenu,
        "Touch on toggle:",
        isClickOnToggle
      );

      if (!isClickOnMenu && !isClickOnToggle) {
        console.log("Closing menu due to outside touch");
        closeMenu();
      }
    }
  });

  // Close menu on window resize
  window.addEventListener("resize", function () {
    checkMenuToggleVisibility();
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMenu();
    }
  });

  // Close menu with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  // Enhanced touch gesture support for mobile slide-in menu
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  // Touch start handler
  document.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });

  // Touch end handler with swipe detection
  document.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
  });

  // Enhanced swipe gesture handling
  function handleSwipeGesture() {
    const swipeThreshold = 100;
    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = Math.abs(touchEndY - touchStartY);

    // Only handle horizontal swipes (ignore vertical scrolling)
    if (swipeDistanceY < 50) {
      // Swipe right to left (close menu if open)
      if (swipeDistanceX < -swipeThreshold && isMenuOpen) {
        closeMenu();
        console.log("Menu closed via swipe gesture");
      }

      // Swipe left to right from right edge (open menu if closed)
      if (
        swipeDistanceX > swipeThreshold &&
        !isMenuOpen &&
        touchStartX > window.innerWidth - 80 &&
        window.innerWidth <= 768
      ) {
        toggleMenu();
        console.log("Menu opened via edge swipe gesture");
      }
    }
  }

  // Initialize ARIA attributes for accessibility
  menuToggle.setAttribute("aria-label", "Toggle navigation menu");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("role", "button");
  menuToggle.setAttribute("tabindex", "0");

  // Keyboard navigation support
  menuToggle.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  console.log("Enhanced mobile slide-in menu initialization complete!");
  console.log("Window width:", window.innerWidth);
  console.log("Is mobile view:", window.innerWidth <= 768);
}

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Animate timeline items with stagger
        const timelineItems = entry.target.querySelectorAll(".timeline-item");
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }, index * 100);
        });

        // Animate skill items
        const skillItems = entry.target.querySelectorAll(".skill-item");
        skillItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, index * 50);
        });

        // Animate project cards
        const projectCards = entry.target.querySelectorAll(".project-card");
        projectCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 150);
        });
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll(
    "section, .about-card, .project-card"
  );
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
function initializeActiveNavigation() {
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let current = "";
    const headerOffset = document.querySelector("header").offsetHeight + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - headerOffset) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(updateActiveNavLink, 10);
    },
    { passive: true }
  );
}

// ===== FORM ENHANCEMENTS =====
function initializeFormEnhancements() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    // Add floating label effect
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearValidation(this);
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = "";

    clearValidation(field);

    switch (field.type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        message = isValid ? "" : "Please enter a valid email address";
        break;
      case "text":
        isValid = value.length >= 2;
        message = isValid ? "" : "Please enter at least 2 characters";
        break;
      default:
        if (field.tagName === "TEXTAREA") {
          isValid = value.length >= 10;
          message = isValid ? "" : "Please enter at least 10 characters";
        }
        break;
    }

    if (!isValid && value) {
      showValidationError(field, message);
    } else if (isValid && value) {
      showValidationSuccess(field);
    }
  }

  function clearValidation(field) {
    field.classList.remove("error", "success");
    const errorMsg = field.parentElement.querySelector(".error-message");
    if (errorMsg) errorMsg.remove();
  }

  function showValidationError(field, message) {
    field.classList.add("error");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.cssText =
      "color: #e74c3c; font-size: 0.85rem; margin-top: 0.25rem;";
    field.parentElement.appendChild(errorDiv);
  }

  function showValidationSuccess(field) {
    field.classList.add("success");
  }

  // Form submission enhancement
  form.addEventListener("submit", function (e) {
    const submitBtn = form.querySelector(".submit-btn");
    submitBtn.style.background = "linear-gradient(135deg, #28a745, #20c997)";
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mengirim...';

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
      submitBtn.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    }, 2000);
  });
}

// ===== BACK TO TOP FUNCTIONALITY =====
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");

  console.log("Initializing back to top functionality...");
  console.log("Back to top button found:", !!backToTopBtn);

  if (!backToTopBtn) {
    console.error("Back to top button not found!");
    return;
  }

  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 300; // Show button after scrolling 300px

    if (scrollTop > threshold) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  // Smooth scroll to top function
  function scrollToTop() {
    console.log("Back to top button clicked - scrolling to top...");

    // Add visual feedback
    backToTopBtn.style.transform = "translateY(0) scale(0.9)";

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Reset button transform after scroll
    setTimeout(() => {
      backToTopBtn.style.transform = "";
    }, 200);

    // Optional: Focus management for accessibility
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      setTimeout(() => {
        heroSection.focus();
      }, 500);
    }
  }

  // Event listeners
  window.addEventListener("scroll", toggleBackToTopButton);

  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    scrollToTop();
  });

  // Keyboard support for accessibility
  backToTopBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  });

  // Throttle scroll event for better performance
  let ticking = false;
  function optimizedScrollHandler() {
    if (!ticking) {
      requestAnimationFrame(() => {
        toggleBackToTopButton();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Replace the basic scroll listener with optimized version
  window.removeEventListener("scroll", toggleBackToTopButton);
  window.addEventListener("scroll", optimizedScrollHandler);

  console.log("Back to top functionality initialized successfully!");
}

// ===== UTILITY FUNCTIONS =====

// Add CSS animations on load
function addInitialAnimations() {
  const style = document.createElement("style");
  style.textContent = `
    .timeline-item { opacity: 0; transform: translateX(-20px); transition: all 0.6s ease; }
    .skill-item { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
    .project-card { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
    .animate-in { opacity: 1; transform: translateX(0) translateY(0); }
    
    .form-group.focused label { color: #667eea; transform: translateY(-5px) scale(0.9); }
    .form-group input.error, .form-group textarea.error { border-color: #e74c3c; }
    .form-group input.success, .form-group textarea.success { border-color: #28a745; }
  `;
  document.head.appendChild(style);
}

// Initialize animations
addInitialAnimations();

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images (if needed)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => imageObserver.observe(img));
}

// Console log for debugging
console.log("Jeremy Ansellino Portfolio - All systems operational! ✨");
