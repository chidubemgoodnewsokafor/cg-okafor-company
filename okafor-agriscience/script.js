
(() => {
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("site-navigation");
  const closeButton = document.getElementById("nav-close");
  const navigationLinks = navigation
    ? navigation.querySelectorAll("a")
    : [];

  if (!menuToggle || !navigation) return;

  function openMenu() {
    navigation.classList.add("open");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    navigation.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeMenu);
  }

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
