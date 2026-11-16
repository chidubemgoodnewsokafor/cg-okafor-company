
/* =========================================================
   OKAFOR GRAIN AND OILSEEDS
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     1. HERO CAROUSEL
  ------------------------------------------------------- */

  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const previousButton = document.querySelector(".hero-prev");
  const nextButton = document.querySelector(".hero-next");

  let currentSlide = 0;
  let carouselTimer = null;

  const carouselDelay = 6500;

  function showSlide(index) {

    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    showSlide(currentSlide - 1);
  }

  function startCarousel() {
    stopCarousel();

    if (slides.length > 1) {
      carouselTimer = setInterval(nextSlide, carouselDelay);
    }
  }

  function stopCarousel() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

  function restartCarousel() {
    stopCarousel();
    startCarousel();
  }

  if (slides.length) {

    showSlide(0);
    startCarousel();

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

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        restartCarousel();
      });
    });

    const hero = document.querySelector(".hero");

    if (hero) {
      hero.addEventListener("mouseenter", stopCarousel);
      hero.addEventListener("mouseleave", startCarousel);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopCarousel();
      } else {
        startCarousel();
      }
    });
  }


  /* -------------------------------------------------------
     2. MOBILE NAVIGATION
  ------------------------------------------------------- */

  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("site-nav");
  const closeButton = document.getElementById("nav-close");

  function openMenu() {

    if (!navigation || !menuToggle) return;

    navigation.classList.add("open");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
  }

  function closeMenu() {

    if (!navigation || !menuToggle) return;

    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {

      const isOpen = navigation.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeMenu);
  }


  /* -------------------------------------------------------
     3. MOBILE DROPDOWNS
  ------------------------------------------------------- */

  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {

    const trigger = dropdown.querySelector(".dropdown-trigger");

    if (!trigger) return;

    trigger.addEventListener("click", (event) => {

      if (window.innerWidth <= 760) {

        event.preventDefault();

        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("dropdown-open");
          }
        });

        dropdown.classList.toggle("dropdown-open");
      }

    });

  });


  /* -------------------------------------------------------
     4. CLOSE MENU AFTER NAVIGATION
  ------------------------------------------------------- */

  if (navigation) {

    const navigationLinks = navigation.querySelectorAll(
      'a[href^="#"]'
    );

    navigationLinks.forEach((link) => {

      link.addEventListener("click", () => {

        if (window.innerWidth <= 760) {
          closeMenu();

          dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("dropdown-open");
          });
        }

      });

    });

  }


  /* -------------------------------------------------------
     5. CLOSE MENU WITH ESCAPE KEY
  ------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* -------------------------------------------------------
     6. CLOSE MOBILE MENU WHEN SCREEN EXPANDS
  ------------------------------------------------------- */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 760) {
      closeMenu();

      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("dropdown-open");
      });
    }

  });


  /* -------------------------------------------------------
     7. AUTOMATIC COPYRIGHT YEAR
  ------------------------------------------------------- */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
