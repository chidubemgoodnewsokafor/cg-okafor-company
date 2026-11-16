
(() => {
  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("site-navigation");
  const closeButton = document.getElementById("nav-close");

  const navigationLinks = navigation
    ? navigation.querySelectorAll("a")
    : [];

  function openMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.add("open");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      navigation.classList.contains("open")
        ? closeMenu()
        : openMenu();
    });

    if (closeButton) {
      closeButton.addEventListener("click", closeMenu);
    }

    navigationLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* =========================================
     HERO CAROUSEL
  ========================================= */

  const hero = document.querySelector(".hero");
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".hero-dot")];

  const previousButton = document.querySelector(".hero-prev");
  const nextButton = document.querySelector(".hero-next");

  let currentSlide = 0;
  let heroTimer = null;

  const slideDuration = 6500;

  function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === currentSlide;

      slide.classList.toggle("active", active);
      slide.setAttribute("aria-hidden", String(!active));

      if (active) {
        slide.removeAttribute("inert");
      } else {
        slide.setAttribute("inert", "");
      }
    });

    dots.forEach((dot, i) => {
      const active = i === currentSlide;

      dot.classList.toggle("active", active);

      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    showSlide(currentSlide - 1);
  }

  function stopAutoplay() {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    if (
      slides.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    heroTimer = setInterval(nextSlide, slideDuration);
  }

  function restartAutoplay() {
    startAutoplay();
  }

  if (slides.length) {
    showSlide(0);
    startAutoplay();

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nextSlide();
        restartAutoplay();
      });
    }

    if (previousButton) {
      previousButton.addEventListener("click", () => {
        previousSlide();
        restartAutoplay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoplay();
      });
    });

    if (hero) {
      hero.addEventListener("mouseenter", stopAutoplay);
      hero.addEventListener("mouseleave", startAutoplay);

      hero.addEventListener("focusin", stopAutoplay);
      hero.addEventListener("focusout", event => {
        if (!hero.contains(event.relatedTarget)) {
          startAutoplay();
        }
      });
    }

    /* MOBILE SWIPE */

    let touchStartX = 0;
    let touchEndX = 0;

    if (hero) {
      hero.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
      }, { passive: true });

      hero.addEventListener("touchend", event => {
        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 55) {
          difference > 0 ? nextSlide() : previousSlide();
          restartAutoplay();
        }
      }, { passive: true });
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  /* =========================================
     FOOTER YEAR
  ========================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

})();
