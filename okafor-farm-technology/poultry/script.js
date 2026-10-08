/* =========================================================
   OKAFOR FARM TECHNOLOGY — POULTRY NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const menuTrigger = document.getElementById("menuTrigger");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  const menuViews = document.querySelectorAll(".menu-view");
  const menuOpenButtons = document.querySelectorAll(".menu-open");
  const menuBackButtons = document.querySelectorAll(".menu-back");
  const menuLinks = document.querySelectorAll(".menu-view a");


  /* =======================================================
     SHOW A MENU VIEW
  ======================================================= */

  function showMenu(viewId) {

    menuViews.forEach(function (view) {
      view.classList.remove("active");
    });

    const targetView = document.getElementById(viewId);

    if (targetView) {
      targetView.classList.add("active");
    }
  }


  /* =======================================================
     OPEN MAIN MENU
  ======================================================= */

  function openMenu() {

    if (!menuOverlay) return;

    menuOverlay.classList.add("open");

    menuOverlay.setAttribute("aria-hidden", "false");

    document.body.classList.add("menu-open");

    if (menuTrigger) {
      menuTrigger.setAttribute("aria-expanded", "true");
    }

    showMenu("mainMenu");
  }


  /* =======================================================
     CLOSE MENU
  ======================================================= */

  function closeMenu() {

    if (!menuOverlay) return;

    menuOverlay.classList.remove("open");

    menuOverlay.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");

    if (menuTrigger) {
      menuTrigger.setAttribute("aria-expanded", "false");
    }

    showMenu("mainMenu");
  }


  /* =======================================================
     MENU BUTTON
  ======================================================= */

  if (menuTrigger) {

    menuTrigger.addEventListener("click", function (event) {

      event.preventDefault();

      if (menuOverlay.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }

    });

  }


  /* =======================================================
     CLOSE BUTTON
  ======================================================= */

  if (menuClose) {

    menuClose.addEventListener("click", function (event) {

      event.preventDefault();

      closeMenu();

    });

  }


  /* =======================================================
     OPEN SUBMENU
  ======================================================= */

  menuOpenButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      const target = button.getAttribute("data-target");

      if (target) {
        showMenu(target);
      }

    });

  });


  /* =======================================================
     BACK BUTTON
  ======================================================= */

  menuBackButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      const target = button.getAttribute("data-target");

      if (target) {
        showMenu(target);
      }

    });

  });


  /* =======================================================
     NORMAL LINKS
  ======================================================= */

  menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {
      closeMenu();
    });

  });


  /* =======================================================
     ESC KEY
  ======================================================= */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* =======================================================
     CLOSE MENU WHEN CLICKING OUTSIDE CONTENT
     ======================================================= */

  if (menuOverlay) {

    menuOverlay.addEventListener("click", function (event) {

      if (event.target === menuOverlay) {
        closeMenu();
      }

    });

  }

});
