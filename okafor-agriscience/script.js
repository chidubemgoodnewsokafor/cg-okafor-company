/* =========================================================
   OKAFOR AGRISCIENCE NAVIGATION
   ========================================================= */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const navClose = document.getElementById("navClose");


// ---------------------------------------------------------
// OPEN MENU
// ---------------------------------------------------------

function openMenu() {
  mainNav.classList.add("open");
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
}


// ---------------------------------------------------------
// CLOSE MENU
// ---------------------------------------------------------

function closeMenu() {
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");

  // Completely reset every navigation level
  document.querySelectorAll(".nav-item.active").forEach(item => {
    item.classList.remove("active");
  });
}


// ---------------------------------------------------------
// MENU BUTTON
// ---------------------------------------------------------

menuButton.addEventListener("click", openMenu);

navClose.addEventListener("click", closeMenu);


// ---------------------------------------------------------
// OPEN NAVIGATION LEVEL
// ---------------------------------------------------------

document.querySelectorAll(".nav-parent").forEach(button => {

  button.addEventListener("click", function () {

    const parent = this.closest(".nav-item");

    if (!parent) return;

    /*
      Close other navigation items on the SAME level.

      This is the important fix:
      Vegetable Seeds and Field Seeds can never
      remain open at the same time.
    */
    const parentContainer = parent.parentElement;

    if (parentContainer) {
      parentContainer.querySelectorAll(":scope > .nav-item.active").forEach(item => {
        if (item !== parent) {
          item.classList.remove("active");

          item.querySelectorAll(".nav-item.active").forEach(child => {
            child.classList.remove("active");
          });
        }
      });
    }

    parent.classList.add("active");

  });

});


// ---------------------------------------------------------
// BACK BUTTON
// ---------------------------------------------------------

document.querySelectorAll(".nav-back").forEach(button => {

  button.addEventListener("click", function (event) {

    event.stopPropagation();

    const panel = this.closest(".nav-panel");

    if (!panel) return;

    const parentItem = panel.closest(".nav-item");

    if (!parentItem) return;

    parentItem.classList.remove("active");

    // Also reset anything deeper inside that level
    parentItem.querySelectorAll(".nav-item.active").forEach(item => {
      item.classList.remove("active");
    });

  });

});


// ---------------------------------------------------------
// ESCAPE
// ---------------------------------------------------------

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeMenu();
  }

});


// ---------------------------------------------------------
// CLOSE AFTER DIRECT LINK
// ---------------------------------------------------------

document.querySelectorAll(".nav-panel a, .nav-direct").forEach(link => {

  link.addEventListener("click", closeMenu);

});
