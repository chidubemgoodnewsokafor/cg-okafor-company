/* =========================================================
   OKAFOR FARM TECHNOLOGY — SWINE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const menuTrigger = document.getElementById("menuTrigger");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  const menuViews = document.querySelectorAll(".menu-view");
  const menuOpenButtons = document.querySelectorAll(".menu-open");
  const menuBackButtons = document.querySelectorAll(".menu-back");

  function openMenu() {
    menuOverlay.classList.add("open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuTrigger.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");

    showMenu("mainMenu");
  }

  function closeMenu() {
    menuOverlay.classList.remove("open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuTrigger.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");

    showMenu("mainMenu");
  }

  function showMenu(menuId) {

    menuViews.forEach(function (view) {
      view.classList.remove("active");
    });

    const targetMenu = document.getElementById(menuId);

    if (targetMenu) {
      targetMenu.classList.add("active");
    }
  }


  /* Open main navigation */

  menuTrigger.addEventListener("click", function () {
    openMenu();
  });


  /* Close navigation */

  menuClose.addEventListener("click", function () {
    closeMenu();
  });


  /* Open submenu */

  menuOpenButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const target = button.getAttribute("data-target");

      if (target) {
        showMenu(target);
      }

    });

  });


  /* Return to previous menu */

  menuBackButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const target = button.getAttribute("data-target");

      if (target) {
        showMenu(target);
      }

    });

  });


  /* Close menu when a direct destination is selected */

  const destinationLinks =
    document.querySelectorAll(".menu-destination");

  destinationLinks.forEach(function (link) {

    link.addEventListener("click", function () {
      closeMenu();
    });

  });


  /* Close menu with Escape */

  document.addEventListener("keydown", function (event) {

    if (
      event.key === "Escape" &&
      menuOverlay.classList.contains("open")
    ) {
      closeMenu();
    }

  });

});
