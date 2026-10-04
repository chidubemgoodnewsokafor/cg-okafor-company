/* =========================================================
   OKAFOR AGRISCIENCE NAVIGATION
   ========================================================= */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const navClose = document.getElementById("navClose");

const navItems = document.querySelectorAll(".nav-item");


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

  // Close every navigation level
  navItems.forEach(item => {
    item.classList.remove("active");
  });
}


// ---------------------------------------------------------
// MENU BUTTON
// ---------------------------------------------------------

menuButton.addEventListener("click", openMenu);

navClose.addEventListener("click", closeMenu);


// ---------------------------------------------------------
// OPEN A NAVIGATION LEVEL
// ---------------------------------------------------------

document.querySelectorAll(".nav-parent").forEach(button => {

  button.addEventListener("click", () => {

    const parent = button.closest(".nav-item");

    if (!parent) return;

    parent.classList.add("active");

  });

});


// ---------------------------------------------------------
// BACK BUTTON
// ---------------------------------------------------------

document.querySelectorAll(".nav-back").forEach(button => {

  button.addEventListener("click", (event) => {

    event.stopPropagation();

    const panel = button.closest(".nav-panel");

    if (!panel) return;

    const parentItem = panel.parentElement;

    if (parentItem) {
      parentItem.classList.remove("active");
    }

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
// CLOSE WHEN DIRECT LINK IS SELECTED
// ---------------------------------------------------------

document.querySelectorAll(".nav-panel a, .nav-direct").forEach(link => {

  link.addEventListener("click", () => {
    closeMenu();
  });

});
