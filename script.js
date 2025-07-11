// ===== PORTFOLIO JEREMY ANSELLINO - JAVASCRIPT =====

document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "Portfolio Jeremy Ansellino - JavaScript loaded successfully! 🚀"
  );

  // ===== DEBUG: Check navbar elements =====
  console.log("🔍 Debugging navbar elements:");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link, index) => {
    console.log(`${index + 1}. ${link.href} - ${link.textContent}`);
  });

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

      const targetId = this.getAttribute("href").substring(1); // Remove #
      console.log(`🎯 Navbar clicked: ${targetId}`);

      let targetElement = null;
      let scrollOffset = 120; // Default offset for header

      // Smart targeting based on clicked navbar item
      switch (targetId) {
        case "aboutme":
          targetElement = document.getElementById("aboutme");
          console.log("📍 Scrolling to About Me section");
          break;

        case "educations":
          targetElement = document.getElementById("educations");
          // Scroll to about-grid area for better article visibility
          const aboutmeSection = document.getElementById("aboutme");
          const aboutGrid = aboutmeSection
            ? aboutmeSection.querySelector(".about-grid")
            : null;
          if (aboutGrid) {
            targetElement = aboutmeSection;
            scrollOffset = aboutGrid.offsetTop - 50; // Scroll to grid area
            console.log(
              `🎓 Education scroll target: about-grid at offset ${scrollOffset}`
            );
          }
          console.log("📍 Scrolling to Education article");
          break;

        case "experiences":
          targetElement = document.getElementById("experiences");
          // Scroll to TokoCrypto timeline item for better experience visibility
          if (targetElement) {
            const aboutmeSection = document.getElementById("aboutme");
            const timelineItems =
              targetElement.querySelectorAll(".timeline-item");
            const tokoCryptoItem = timelineItems[2]; // Index 2 = TokoCrypto (item ke-3)

            if (aboutmeSection && tokoCryptoItem) {
              const experienceOffset = targetElement.offsetTop;
              const tokoCryptoOffset = tokoCryptoItem.offsetTop;
              scrollOffset = experienceOffset + tokoCryptoOffset - 100; // Scroll ke TokoCrypto dengan padding
              targetElement = aboutmeSection;
              console.log(
                `💼 Experience scroll target: TokoCrypto at offset ${scrollOffset}`
              );
            } else {
              // Fallback ke logic lama jika TokoCrypto tidak ditemukan
              const experienceOffset = targetElement.offsetTop;
              const experienceHeight = targetElement.offsetHeight;
              scrollOffset =
                experienceOffset -
                window.innerHeight / 2 +
                experienceHeight / 2;
              targetElement = aboutmeSection;
              console.log(`💼 Experience scroll fallback: middle of article`);
            }
          }
          console.log("📍 Scrolling to Experience article");
          break;

        case "skills":
          targetElement = document.getElementById("skills");
          // Scroll to skills article for optimal visibility
          if (targetElement) {
            const aboutmeSection = document.getElementById("aboutme");
            if (aboutmeSection) {
              const skillsOffset = targetElement.offsetTop;
              scrollOffset = skillsOffset - 100; // Scroll to skills with optimal padding
              targetElement = aboutmeSection;
              console.log(
                `⚡ Skills scroll target: skills article at offset ${scrollOffset}`
              );
            }
          }
          console.log("📍 Scrolling to Skills article");
          break;

        case "interests":
          targetElement = document.getElementById("interests");
          // Calculate position to show interests in viewport
          if (targetElement) {
            const aboutmeSection = document.getElementById("aboutme");
            if (aboutmeSection) {
              const interestsOffset = targetElement.offsetTop;
              scrollOffset = interestsOffset - 150; // Show interests with some padding
              targetElement = aboutmeSection;
            }
          }
          console.log("📍 Scrolling to Interests article");
          break;

        case "projects":
          targetElement = document.getElementById("projects");
          console.log("📍 Scrolling to Projects section");
          break;

        case "contact":
          targetElement = document.getElementById("contact");
          console.log("📍 Scrolling to Contact section");
          break;

        default:
          targetElement = document.querySelector(`#${targetId}`);
          console.log(`📍 Scrolling to default target: ${targetId}`);
      }

      if (targetElement) {
        let targetPosition;

        // Calculate final scroll position
        if (typeof scrollOffset === "number" && scrollOffset > 200) {
          // For articles within About Me, use calculated offset
          targetPosition = targetElement.offsetTop + scrollOffset;
        } else {
          // For regular sections, use standard offset
          const headerHeight = document.querySelector("header").offsetHeight;
          targetPosition = targetElement.offsetTop - headerHeight - 20;
        }

        console.log(`🎯 Scrolling to position: ${targetPosition}`);

        // Immediately activate the clicked navbar item
        console.log(`🚀 Immediately activating navbar for: ${targetId}`);

        // Remove active class from all navbar items
        document.querySelectorAll("nav ul li").forEach((navItem) => {
          navItem.classList.remove("active");
        });

        // Find and activate the correct navbar item
        let navItemToActivate = null;

        // For article targets within About Me section, activate About Me navbar
        if (targetId === "educations" || targetId === "education") {
          navItemToActivate = document.querySelector(
            "nav ul li a[href='#educations']"
          )?.parentElement;
          currentActiveSection = "educations";
          console.log("🎓 Education navbar will be activated");
        } else if (targetId === "experiences" || targetId === "experience") {
          navItemToActivate = document.querySelector(
            "nav ul li a[href='#experiences']"
          )?.parentElement;
          currentActiveSection = "experiences";
          console.log("💼 Experience navbar will be activated");
        } else if (targetId === "skills") {
          navItemToActivate = document.querySelector(
            "nav ul li a[href='#skills']"
          )?.parentElement;
          currentActiveSection = "skills";
          console.log("⚡ Skills navbar will be activated");
        } else if (targetId === "interests") {
          navItemToActivate = document.querySelector(
            "nav ul li a[href='#interests']"
          )?.parentElement;
          currentActiveSection = "interests";
          console.log("❤️ Interests navbar will be activated");
        } else if (targetId === "aboutme") {
          navItemToActivate = document.querySelector(
            "nav ul li a[href='#aboutme']"
          )?.parentElement;
          currentActiveSection = "aboutme";
        } else if (targetId === "projects") {
          navItemToActivate = document.querySelector(
            "nav ul li a[href='#projects']"
          )?.parentElement;
          currentActiveSection = "projects";
        } else if (targetId === "contact") {
          navItemToActivate = document.querySelector(
            "nav ul li a[href='#contact']"
          )?.parentElement;
          currentActiveSection = "contact";
        } else {
          // For any other sections, try to find by href
          navItemToActivate = document.querySelector(
            `nav ul li a[href='#${targetId}']`
          )?.parentElement;
          currentActiveSection = targetId;
        }

        if (navItemToActivate) {
          navItemToActivate.classList.add("active");
          console.log(`✨ Navbar activated for: ${currentActiveSection}`);
          console.log(`🔍 Activated element:`, navItemToActivate);
        } else {
          console.log(`⚠️ Could not find navbar item for: ${targetId}`);
          console.log(
            `🔍 Available navbar links:`,
            document.querySelectorAll("nav ul li a")
          );
        }

        // Start smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update active navbar after scroll completes (backup check)
        setTimeout(() => {
          console.log("✅ Scroll completed, backup navbar check");
        }, 1000);
      } else {
        console.error(`❌ Target element not found: ${targetId}`);
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
  let currentActiveSection = "";

  function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    const navItems = document.querySelectorAll("nav ul li");

    // Special handling for homepage - no active nav when at very top
    if (window.scrollY < 50) {
      currentActiveSection = "";
    } else {
      const scrollPosition = window.scrollY + 120; // Offset for header
      let foundActiveSection = "";

      // Get all sections in order from bottom to top
      const sections = [
        { id: "contact", element: document.getElementById("contact") },
        { id: "projects", element: document.getElementById("projects") },
        { id: "aboutme", element: document.getElementById("aboutme") },
      ];

      // Check main sections first
      for (const section of sections) {
        if (!section.element) continue;
        const sectionTop = section.element.offsetTop;

        if (scrollPosition >= sectionTop - 50) {
          foundActiveSection = section.id;
          console.log(
            `Section detected: ${section.id} (scroll: ${scrollPosition}, sectionTop: ${sectionTop})`
          );
          break;
        }
      }

      // Special logic for About Me section - check if we should show sub-articles
      if (foundActiveSection === "aboutme") {
        const aboutmeSection = document.getElementById("aboutme");
        const aboutGrid = aboutmeSection
          ? aboutmeSection.querySelector(".about-grid")
          : null;

        if (aboutGrid) {
          const aboutGridTop = aboutGrid.offsetTop + aboutmeSection.offsetTop;
          const aboutmeSectionHeight = aboutmeSection.offsetHeight;

          // Education navbar aktif ketika user menyentuh about-grid
          const aboutGridTrigger = aboutGridTop - 100; // Trigger 100px sebelum about-grid

          console.log(`🔍 About Grid Analysis:`, {
            aboutGridTop,
            aboutGridTrigger,
            currentScroll: scrollPosition,
          });

          // Show sub-articles if user has scrolled to about-grid area
          if (scrollPosition >= aboutGridTrigger) {
            // Get all articles with their elements
            const educationsEl = document.getElementById("educations");
            const experiencesEl = document.getElementById("experiences");
            const skillsEl = document.getElementById("skills");
            const interestsEl = document.getElementById("interests");

            if (educationsEl && experiencesEl && skillsEl && interestsEl) {
              // Calculate positions relative to the About Me section
              const educationsTop =
                educationsEl.offsetTop + aboutmeSection.offsetTop;
              const educationsHeight = educationsEl.offsetHeight;
              const educationsMiddle = educationsTop + educationsHeight / 2;

              const experiencesTop =
                experiencesEl.offsetTop + aboutmeSection.offsetTop;
              const experiencesHeight = experiencesEl.offsetHeight;
              const experiencesMiddle = experiencesTop + experiencesHeight / 2;

              const skillsTop = skillsEl.offsetTop + aboutmeSection.offsetTop;
              const skillsHeight = skillsEl.offsetHeight;
              const skillsMiddle = skillsTop + skillsHeight / 2;

              const interestsTop =
                interestsEl.offsetTop + aboutmeSection.offsetTop;

              console.log(`🔍 Enhanced Scroll Analysis:`, {
                scroll: scrollPosition,
                aboutGridTrigger,
                aboutGridTop,
                educationsTop,
                educationsMiddle,
                experiencesTop,
                experiencesMiddle,
                skillsTop,
                skillsMiddle,
                interestsTop,
              });

              // Interest detection - has highest priority if in view
              if (scrollPosition >= interestsTop - 30) {
                foundActiveSection = "interests";
                console.log("✅ INTERESTS active");
              }
              // Skills detection - aktif ketika user menyentuh article id="skills"
              else if (scrollPosition >= skillsTop - 50) {
                // Cek apakah user sudah menyentuh skills article
                const skillsEl = document.getElementById("skills");
                if (skillsEl) {
                  const skillsArticleTop =
                    skillsEl.offsetTop + aboutmeSection.offsetTop;
                  const skillsTrigger = skillsArticleTop - 80; // Trigger 80px sebelum skills article

                  console.log(`⚡ Skills Analysis:`, {
                    skillsArticleTop,
                    skillsTrigger,
                    currentScroll: scrollPosition,
                  });

                  if (scrollPosition >= skillsTrigger) {
                    foundActiveSection = "skills";
                    console.log(
                      "✅ SKILLS active (user reached skills article)"
                    );
                  } else {
                    // Jika belum sampai skills article, cek experience logic
                    foundActiveSection = "experiences";
                    console.log(
                      "💼 EXPERIENCES still active (before skills article)"
                    );
                  }
                } else {
                  // Fallback ke logic lama jika skills tidak ditemukan
                  foundActiveSection = "skills";
                  console.log(
                    "✅ SKILLS active (fallback - skills article not found)"
                  );
                }
              }
              // Experience detection - aktif ketika user menyentuh timeline TokoCrypto
              // TokoCrypto adalah timeline item ke-3 dalam experience section
              else if (scrollPosition >= experiencesTop + 100) {
                // Cari timeline item TokoCrypto (item ke-3)
                const experiencesEl = document.getElementById("experiences");
                const timelineItems = experiencesEl
                  ? experiencesEl.querySelectorAll(".timeline-item")
                  : [];
                const tokoCryptoItem = timelineItems[2]; // Index 2 = item ke-3 (TokoCrypto)

                if (tokoCryptoItem) {
                  const tokoCryptoTop =
                    tokoCryptoItem.offsetTop + experiencesTop;
                  const tokoCryptoTrigger = tokoCryptoTop - 50; // Trigger 50px sebelum TokoCrypto

                  console.log(`💼 TokoCrypto Analysis:`, {
                    tokoCryptoTop,
                    tokoCryptoTrigger,
                    currentScroll: scrollPosition,
                  });

                  if (scrollPosition >= tokoCryptoTrigger) {
                    foundActiveSection = "experiences";
                    console.log(
                      "✅ EXPERIENCES active (user reached TokoCrypto timeline)"
                    );
                  } else {
                    // Jika belum sampai TokoCrypto, tetap Education
                    foundActiveSection = "educations";
                    console.log(
                      "🎓 EDUCATIONS still active (before TokoCrypto)"
                    );
                  }
                } else {
                  // Fallback ke logic lama jika TokoCrypto tidak ditemukan
                  foundActiveSection = "experiences";
                  console.log(
                    "✅ EXPERIENCES active (fallback - TokoCrypto not found)"
                  );
                }
              }
              // Education detection - aktif ketika user menyentuh about-grid area
              else if (scrollPosition >= aboutGridTrigger) {
                foundActiveSection = "educations";
                console.log(
                  "✅ EDUCATIONS active (user reached about-grid area)"
                );
              }
            }
          }
          // If user is in About Me section but before the grid, keep "aboutme" active
        }
      }

      // Fallback to aboutme for initial scroll
      if (!foundActiveSection && window.scrollY >= 50) {
        foundActiveSection = "aboutme";
        console.log("Fallback to aboutme");
      }

      currentActiveSection = foundActiveSection;
    }

    // Update nav links
    navItems.forEach((navItem) => {
      navItem.classList.remove("active");
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (currentActiveSection && href === `#${currentActiveSection}`) {
        link.parentElement.classList.add("active");
        console.log("Setting active link for:", currentActiveSection);
      }
    });

    // Debug info with more details
    console.log(
      `Active section: ${currentActiveSection || "none"}, Scroll: ${Math.round(
        window.scrollY
      )}, Device: ${
        window.innerWidth > 768 ? "Desktop" : "Mobile"
      }, Nav links found: ${navLinks.length}`
    );
  }

  // Initial call
  updateActiveNavLink();

  // Optimized scroll event listener
  let scrollTimeout;
  let isScrolling = false;

  window.addEventListener(
    "scroll",
    function () {
      if (!isScrolling) {
        requestAnimationFrame(function () {
          updateActiveNavLink();
          isScrolling = false;
        });
        isScrolling = true;
      }
    },
    { passive: true }
  );

  // Also update on resize
  window.addEventListener("resize", updateActiveNavLink);
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

// ===== TEST FUNCTION FOR DEBUGGING =====
function testNavbarActivation() {
  console.log("🧪 Testing navbar activation...");

  // Test each article activation
  const testTargets = ["educations", "experiences", "skills", "interests"];

  testTargets.forEach((target, index) => {
    setTimeout(() => {
      console.log(`Testing ${target}...`);

      // Remove all active classes first
      document.querySelectorAll("nav ul li").forEach((navItem) => {
        navItem.classList.remove("active");
      });

      // Find and activate target
      const targetNavItem = document.querySelector(
        `nav ul li a[href='#${target}']`
      )?.parentElement;
      if (targetNavItem) {
        targetNavItem.classList.add("active");
        console.log(`✅ ${target} navbar activated successfully`);
        console.log(`🔍 Active element classes:`, targetNavItem.className);
        console.log(
          `🔍 Active link element:`,
          targetNavItem.querySelector("a")
        );
      } else {
        console.error(`❌ Could not find navbar for ${target}`);
        console.log(
          `🔍 Available navbar links:`,
          Array.from(document.querySelectorAll("nav ul li a")).map(
            (a) => a.href
          )
        );
      }
    }, index * 3000); // 3 second delay between each test
  });
}

// Test navbar click simulation
function testNavbarClicks() {
  console.log("🖱️ Testing navbar clicks...");

  const testTargets = ["educations", "experiences", "skills", "interests"];

  testTargets.forEach((target, index) => {
    setTimeout(() => {
      console.log(`Clicking ${target}...`);
      const targetLink = document.querySelector(
        `nav ul li a[href='#${target}']`
      );
      if (targetLink) {
        targetLink.click();
        console.log(`✅ ${target} navbar clicked successfully`);
      } else {
        console.error(`❌ Could not find navbar link for ${target}`);
      }
    }, index * 4000); // 4 second delay between each test
  });
}

// Test Education navbar specifically
function testEducationNavbar() {
  console.log("🎓 Testing Education navbar activation...");

  // First, let's check the about-grid position
  const aboutmeSection = document.getElementById("aboutme");
  const aboutGrid = aboutmeSection?.querySelector(".about-grid");

  if (aboutGrid && aboutmeSection) {
    const aboutGridTop = aboutGrid.offsetTop + aboutmeSection.offsetTop;
    const aboutGridTrigger = aboutGridTop - 100;

    console.log(`📊 About Grid Analysis:`, {
      aboutGridTop,
      aboutGridTrigger,
      currentScroll: window.scrollY,
    });

    // Simulate scroll to about-grid area
    window.scrollTo({
      top: aboutGridTrigger + 10,
      behavior: "smooth",
    });

    setTimeout(() => {
      console.log(`📍 Scrolled to: ${window.scrollY}`);
      console.log(`🎯 Should be Education active now`);
    }, 1000);
  }
}

// Test Experience navbar specifically
function testExperienceNavbar() {
  console.log("💼 Testing Experience navbar activation...");

  // First, let's check the TokoCrypto timeline position
  const experiencesEl = document.getElementById("experiences");
  const aboutmeSection = document.getElementById("aboutme");

  if (experiencesEl && aboutmeSection) {
    const timelineItems = experiencesEl.querySelectorAll(".timeline-item");
    const tokoCryptoItem = timelineItems[2]; // Index 2 = TokoCrypto (item ke-3)

    if (tokoCryptoItem) {
      const experiencesTop = experiencesEl.offsetTop + aboutmeSection.offsetTop;
      const tokoCryptoTop = tokoCryptoItem.offsetTop + experiencesTop;
      const tokoCryptoTrigger = tokoCryptoTop - 50;

      console.log(`📊 TokoCrypto Analysis:`, {
        experiencesTop,
        tokoCryptoTop,
        tokoCryptoTrigger,
        currentScroll: window.scrollY,
      });

      // Simulate scroll to TokoCrypto area
      window.scrollTo({
        top: tokoCryptoTrigger + 10,
        behavior: "smooth",
      });

      setTimeout(() => {
        console.log(`📍 Scrolled to: ${window.scrollY}`);
        console.log(`🎯 Should be Experience active now (TokoCrypto visible)`);
      }, 1000);
    } else {
      console.error("❌ TokoCrypto timeline item not found");
    }
  }
}

// Test Skills navbar specifically
function testSkillsNavbar() {
  console.log("⚡ Testing Skills navbar activation...");

  // First, let's check the skills article position
  const skillsEl = document.getElementById("skills");
  const aboutmeSection = document.getElementById("aboutme");

  if (skillsEl && aboutmeSection) {
    const skillsArticleTop = skillsEl.offsetTop + aboutmeSection.offsetTop;
    const skillsTrigger = skillsArticleTop - 80;

    console.log(`📊 Skills Analysis:`, {
      skillsArticleTop,
      skillsTrigger,
      currentScroll: window.scrollY,
    });

    // Simulate scroll to skills article area
    window.scrollTo({
      top: skillsTrigger + 10,
      behavior: "smooth",
    });

    setTimeout(() => {
      console.log(`📍 Scrolled to: ${window.scrollY}`);
      console.log(`🎯 Should be Skills active now (skills article visible)`);
    }, 1000);
  } else {
    console.error("❌ Skills article not found");
  }
}

// Add to window for manual testing
window.testNavbarActivation = testNavbarActivation;
window.testNavbarClicks = testNavbarClicks;
window.testEducationNavbar = testEducationNavbar;
window.testExperienceNavbar = testExperienceNavbar;
window.testSkillsNavbar = testSkillsNavbar;

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
