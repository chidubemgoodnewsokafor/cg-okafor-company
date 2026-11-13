document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      mainNav.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }


  /* =========================================
     PRODUCE DROPDOWNS
  ========================================= */

  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-toggle");

    if (!button) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const shouldOpen =
        button.getAttribute("aria-expanded") !== "true";

      // Close the other dropdowns.
      dropdowns.forEach((item) => {
        item.classList.remove("open");

        const itemButton = item.querySelector(".dropdown-toggle");

        if (itemButton) {
          itemButton.setAttribute("aria-expanded", "false");
        }
      });

      // Open the selected dropdown.
      if (shouldOpen) {
        dropdown.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close dropdowns when clicking outside.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");

        const button = dropdown.querySelector(".dropdown-toggle");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });
    }
  });

  // Close dropdowns with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");

        const button = dropdown.querySelector(".dropdown-toggle");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });

      closeMenu();
    }
  });


  /* =========================================
     HERO CAROUSEL
  ========================================= */

  const slides = Array.from(
    document.querySelectorAll(".hero-slide")
  );

  const dots = Array.from(
    document.querySelectorAll(".hero-dot")
  );

  const prevButton = document.getElementById("heroPrev");
  const nextButton = document.getElementById("heroNext");

  let currentSlide = 0;
  let carouselTimer;

  function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });

    const heroIndexes = document.querySelectorAll(".hero-index");

    heroIndexes.forEach((label, i) => {
      label.textContent =
        `${String(i + 1).padStart(2, "0")} / ` +
        `${String(slides.length).padStart(2, "0")}`;
    });
  }

  function stopCarousel() {
    clearInterval(carouselTimer);
  }

  function startCarousel() {
    stopCarousel();

    if (slides.length < 2) return;

    carouselTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  if (slides.length) {
    showSlide(0);
    startCarousel();

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        startCarousel();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        startCarousel();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        startCarousel();
      });
    });

    const hero = document.querySelector(".hero");

    if (hero) {
      hero.addEventListener("mouseenter", stopCarousel);
      hero.addEventListener("mouseleave", startCarousel);

      hero.addEventListener("focusin", stopCarousel);
      hero.addEventListener("focusout", startCarousel);
    }
  }


  /* =========================================
     FOOTER YEAR
  ========================================= */

  const yearElement = document.getElementById("copyrightYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
