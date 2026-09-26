/* =========================================================
   C.G. OKAFOR CO.
   MAIN JAVASCRIPT
   ========================================================= */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });


  /* Close menu after selecting a page/section */

  nav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open navigation"
      );

    });

  });

}
