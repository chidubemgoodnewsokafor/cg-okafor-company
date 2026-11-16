
/* =========================================================
   OKAFOR GRAIN AND OILSEEDS
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================== */

  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const menuOverlay = document.getElementById("menu-overlay");
  const menuLinks = document.querySelectorAll(".overlay-links a");

  function openMenu() {
    menuOverlay.classList.add("open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menuOverlay.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && menuOverlay && menuClose) {
    menuToggle.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (link.getAttribute("href").startsWith("#")) {
          closeMenu();
        }
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }


  /* =========================
     HERO CAROUSEL
  ========================== */

  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".indicator");
  const previousButton = document.getElementById("hero-prev");
  const nextButton = document.getElementById("hero-next");

  let currentSlide = 0;
  let carouselTimer;

  function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    showSlide(currentSlide - 1);
  }

  function startCarousel() {
    clearInterval(carouselTimer);

    carouselTimer = setInterval(() => {
      nextSlide();
    }, 6500);
  }

  function restartCarousel() {
    startCarousel();
  }

  if (slides.length) {
    showSlide(0);
    startCarousel();
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      restartCarousel();
    });
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      previousSlide();
      restartCarousel();
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      restartCarousel();
    });
  });


  /* =========================
     TOUCH SWIPE FOR CAROUSEL
  ========================== */

  const hero = document.querySelector(".hero");
  let touchStartX = 0;
  let touchEndX = 0;

  if (hero) {
    hero.addEventListener("touchstart", event => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    hero.addEventListener("touchend", event => {
      touchEndX = event.changedTouches[0].screenX;

      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > 55) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          previousSlide();
        }

        restartCarousel();
      }
    }, { passive: true });
  }


  /* =========================
     FOOTER YEAR
  ========================== */

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
