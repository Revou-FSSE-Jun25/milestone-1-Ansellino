// Smooth scrolling untuk navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling
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

        // Add active class to clicked link
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Observe all sections and articles
  const elementsToAnimate = document.querySelectorAll(
    "section, article, aside"
  );
  elementsToAnimate.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // Back to top button
  const backToTopButton = createBackToTopButton();

  window.addEventListener("scroll", function () {
    // Show/hide back to top button
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }

    // Update active navigation item based on scroll position
    updateActiveNavigation();

    // Header background opacity on scroll
    const header = document.querySelector("header");
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (scrolled > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  });

  // Form handling
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmission();
    });
  }

  // Add interactive effects to skill items
  addSkillInteractivity();

  // Add typing effect to main title
  addTypingEffect();

  // Add particle background effect
  createParticleBackground();
});

// Create back to top button
function createBackToTopButton() {
  const button = document.createElement("button");
  button.id = "backToTop";
  button.innerHTML = "↑";
  button.setAttribute("aria-label", "Back to top");
  button.title = "Kembali ke atas";

  button.addEventListener("click", function () {
    // Add click animation
    this.style.transform = "translateY(-2px) scale(1.05)";

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    // Reset transform after animation
    setTimeout(() => {
      if (window.pageYOffset < 50) {
        this.style.transform = "";
      }
    }, 800);
  });

  // Add ripple effect on click
  button.addEventListener("mousedown", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  document.body.appendChild(button);
  return button;
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section, aside");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const headerHeight = document.querySelector("header").offsetHeight;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.pageYOffset;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Handle form submission
function handleFormSubmission() {
  const form = document.querySelector("form");
  const formData = new FormData(form);

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Mengirim...";
  submitButton.disabled = true;

  // Simulate form submission (since mailto: doesn't provide feedback)
  setTimeout(() => {
    showNotification(
      "Pesan berhasil disiapkan! Silakan kirim melalui email client Anda.",
      "success"
    );
    form.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1000);
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4caf50"
            : type === "error"
            ? "#f44336"
            : "#2196f3"
        };
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add interactivity to skills
function addSkillInteractivity() {
  const skillItems = document.querySelectorAll("#skills ul li");

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.animation = "pulse 0.6s ease-in-out";
    });

    item.addEventListener("animationend", function () {
      this.style.animation = "";
    });

    item.addEventListener("click", function () {
      const skill = this.textContent.trim();
      showNotification(`Anda tertarik dengan skill: ${skill}`, "info");
    });
  });
}

// Add typing effect to main title
function addTypingEffect() {
  const title = document.querySelector("header h1");
  if (title) {
    const text = title.textContent;
    title.textContent = "";
    title.style.borderRight = "2px solid #333";
    title.style.animation = "blink 1s infinite";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        title.style.borderRight = "none";
        title.style.animation = "none";
      }
    };

    setTimeout(typeWriter, 1000);
  }
}

// Create subtle particle background
function createParticleBackground() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = "#667eea";
      ctx.fill();
    });
  }

  function animate() {
    updateParticles();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  initParticles();
  animate();
}

// Add CSS animation for typing effect
const style = document.createElement("style");
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #333; }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: Arial, sans-serif;
        font-weight: 500;
    }
    
    nav a.active {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > konami.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konami.join(",")) {
    activateEasterEgg();
    konamiCode = [];
  }
});

function activateEasterEgg() {
  document.body.style.animation = "rainbow 2s infinite";
  showNotification(
    "🎉 Easter Egg Activated! Portfolio dengan extra magic! ✨",
    "success"
  );

  const style = document.createElement("style");
  style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
  document.head.appendChild(style);

  setTimeout(() => {
    document.body.style.animation = "";
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }, 4000);
}
