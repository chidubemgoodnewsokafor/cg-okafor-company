/* =========================================================
   OKAFOR FARM TECHNOLOGY — POULTRY SCRIPT
   ========================================================= */


/* =========================================================
   MENU
   ========================================================= */

const menuTrigger = document.getElementById("menuTrigger");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

const menuViews = document.querySelectorAll(".menu-view");
const menuOpenButtons = document.querySelectorAll(".menu-open");
const menuBackButtons = document.querySelectorAll(".menu-back");
const menuLinks = document.querySelectorAll(".menu-view a");


function showMenuView(viewId) {

  menuViews.forEach(view => {
    view.classList.remove("active");
  });

  const target = document.getElementById(viewId);

  if (target) {
    target.classList.add("active");
  }

}


function openMenu() {

  menuOverlay.classList.add("open");

  document.body.classList.add("menu-open");

  showMenuView("mainMenu");

}


function closeMenu() {

  menuOverlay.classList.remove("open");

  document.body.classList.remove("menu-open");

  showMenuView("mainMenu");

}


/* Open menu */

menuTrigger.addEventListener("click", openMenu);


/* Close menu */

menuClose.addEventListener("click", closeMenu);


/* Open submenu */

menuOpenButtons.forEach(button => {

  button.addEventListener("click", () => {

    const target = button.dataset.target;

    showMenuView(target);

  });

});


/* Back */

menuBackButtons.forEach(button => {

  button.addEventListener("click", () => {

    const target = button.dataset.back;

    showMenuView(target);

  });

});


/* Close after normal navigation */

menuLinks.forEach(link => {

  link.addEventListener("click", () => {

    closeMenu();

  });

});


/* Escape key */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeMenu();

  }

});


/* =========================================================
   SOLUTION CARD CAROUSEL
   ========================================================= */

const solutionTrack = document.getElementById("solutionTrack");

const prevCard = document.getElementById("prevCard");

const nextCard = document.getElementById("nextCard");


function scrollCards(amount) {

  solutionTrack.scrollBy({
    left: amount,
    behavior: "smooth"
  });

}


nextCard.addEventListener("click", () => {

  scrollCards(360);

});


prevCard.addEventListener("click", () => {

  scrollCards(-360);

});
