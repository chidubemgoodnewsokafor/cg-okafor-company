const menuTrigger = document.getElementById("menuTrigger");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

const menuViews = document.querySelectorAll(".menu-view");
const menuOpenButtons = document.querySelectorAll(".menu-open");
const menuBackButtons = document.querySelectorAll(".menu-back");
const menuLinks = document.querySelectorAll(".menu-view a");


function showMenu(viewId) {
  menuViews.forEach(function(view) {
    view.classList.remove("active");
  });

  const view = document.getElementById(viewId);

  if (view) {
    view.classList.add("active");
  }
}


function openMenu() {
  menuOverlay.classList.add("open");
  document.body.classList.add("menu-open");

  showMenu("mainMenu");
}


function closeMenu() {
  menuOverlay.classList.remove("open");
  document.body.classList.remove("menu-open");

  showMenu("mainMenu");
}


/* MENU button */

if (menuTrigger) {
  menuTrigger.addEventListener("click", openMenu);
}


/* X button */

if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}


/* Open submenu */

menuOpenButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    showMenu(button.dataset.target);
  });
});


/* Back button */

menuBackButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    showMenu(button.dataset.back);
  });
});


/* Close menu when a destination link is selected */

menuLinks.forEach(function(link) {
  link.addEventListener("click", closeMenu);
});


/* ESC key */

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});
