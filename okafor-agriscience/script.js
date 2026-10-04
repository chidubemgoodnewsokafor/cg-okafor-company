/* =========================================================
   OKAFOR AGRISCIENCE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     FLOATING MENU
     ======================================================= */

  const menuButton = document.querySelector(".menu-button");
  const mainNav = document.querySelector(".main-nav");
  const navClose = document.querySelector(".nav-close");

  let lastScrollY = window.scrollY;

  function openNavigation() {
    if (!mainNav || !menuButton) return;

    mainNav.classList.add("open");
    mainNav.setAttribute("aria-hidden", "false");

    document.body.classList.add("nav-open");

    menuButton.setAttribute("aria-expanded", "true");

    showNavPanel("main");
  }

  function closeNavigation() {
    if (!mainNav || !menuButton) return;

    mainNav.classList.remove("open");
    mainNav.setAttribute("aria-hidden", "true");

    document.body.classList.remove("nav-open");

    menuButton.setAttribute("aria-expanded", "false");

    showNavPanel("main");
  }

  if (menuButton) {
    menuButton.addEventListener("click", () => {

      if (mainNav.classList.contains("open")) {
        closeNavigation();
      } else {
        openNavigation();
      }

    });
  }

  if (navClose) {
    navClose.addEventListener("click", closeNavigation);
  }


  /* =======================================================
     NAVIGATION PANELS
     ======================================================= */

  const navPanels = document.querySelectorAll(".nav-panel");

  function showNavPanel(panelId) {

    navPanels.forEach(panel => {
      panel.classList.remove("active");
    });

    let targetPanel;

    if (panelId === "main") {
      targetPanel = document.querySelector(".nav-panel-main");
    } else {
      targetPanel = document.getElementById(panelId);
    }

    if (targetPanel) {
      targetPanel.classList.add("active");
      targetPanel.scrollTop = 0;
    }
  }


  /* Open submenu */

  const navChildren = document.querySelectorAll(".nav-has-children");

  navChildren.forEach(button => {

    button.addEventListener("click", () => {

      const target = button.dataset.target;

      if (target) {
        showNavPanel(target);
      }

    });

  });


  /* Back buttons */

  const navBackButtons = document.querySelectorAll(".nav-back");

  navBackButtons.forEach(button => {

    button.addEventListener("click", () => {

      const target = button.dataset.back || "main";

      showNavPanel(target);

    });

  });


  /* Direct navigation links */

  const directLinks = document.querySelectorAll(".nav-direct");

  directLinks.forEach(link => {

    link.addEventListener("click", () => {
      closeNavigation();
    });

  });


  /* =======================================================
     ESC KEY
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (mainNav && mainNav.classList.contains("open")) {
        closeNavigation();
      }

    }

  });


  /* =======================================================
     FLOATING MENU SCROLL BEHAVIOUR
     
     DOWN  = Better farming / Food for all
     UP    = MENU
     STOP  = Keep current state
     ======================================================= */

  window.addEventListener(
    "scroll",
    () => {

      if (!menuButton) return;

      if (mainNav && mainNav.classList.contains("open")) {
        lastScrollY = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {

        menuButton.classList.add("scrolled");

      } else if (currentScrollY < lastScrollY) {

        menuButton.classList.remove("scrolled");

      }

      lastScrollY = currentScrollY;

    },
    { passive: true }
  );


  /* =======================================================
     HERO IMAGE MOVEMENT
     ======================================================= */

  const heroImages = document.querySelectorAll(".hero-image");

  if (heroImages.length) {

    heroImages.forEach((image, index) => {

      image.addEventListener("mousemove", event => {

        const rect = image.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const moveX = (x - 0.5) * 8;
        const moveY = (y - 0.5) * 8;

        image.style.backgroundPosition =
          `${50 + moveX}% ${50 + moveY}%`;

      });

      image.addEventListener("mouseleave", () => {

        image.style.backgroundPosition = "center";

      });

    });

  }


  /* =======================================================
     PRODUCT SEARCH
     ======================================================= */

  const productSearch = document.querySelector(".product-search");
  const productInput = document.querySelector(".product-search input");
  const productPlaceholder =
    document.querySelector(".product-placeholder");

  if (productSearch && productInput && productPlaceholder) {

    productSearch.addEventListener("submit", event => {

      event.preventDefault();

      const searchTerm =
        productInput.value.trim().toLowerCase();

      if (!searchTerm) {

        productPlaceholder.innerHTML =
          "<p>Search for a crop, solution or product.</p>";

        return;

      }

      productPlaceholder.innerHTML = `
        <p>
          Product search for
          <strong>${escapeHTML(searchTerm)}</strong>
          will be available as our product catalogue expands.
        </p>
      `;

    });

  }


  /* =======================================================
     SAFE HTML
     ======================================================= */

  function escapeHTML(value) {

    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* =======================================================
     REVEAL SECTIONS ON SCROLL
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-heading, .farmer-card, .solution-card, " +
    ".crop-card, .animal-card, .farmcare-list, " +
    ".product-placeholder, .contact-card"
  );

  if ("IntersectionObserver" in window && revealElements.length) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {

      element.classList.add("reveal");

      revealObserver.observe(element);

    });

  }


  /* =======================================================
     ACTIVE ANCHOR LINKS
     ======================================================= */

  const pageLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  pageLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      if (mainNav && mainNav.classList.contains("open")) {
        closeNavigation();
      }

      setTimeout(() => {

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 100);

    });

  });


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  if (mainNav) {
    mainNav.setAttribute("aria-hidden", "true");
  }

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
  }

});
