/* =========================================================
   C.G. OKAFOR CO.
   Main Website Script
   ========================================================= */


/* =========================================================
   FULL-SCREEN NAVIGATION
   ========================================================= */

const menuButton =
  document.querySelector(".menu-button");

const mainNav =
  document.querySelector(".main-nav");

const navClose =
  document.querySelector(".nav-close");


/* =========================================================
   OPEN NAVIGATION
   ========================================================= */

if (menuButton && mainNav) {

  menuButton.addEventListener("click", () => {

    mainNav.classList.add("open");

    mainNav.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("nav-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

  });

}


/* =========================================================
   CLOSE NAVIGATION
   ========================================================= */

function closeNavigation() {

  if (!mainNav) return;

  mainNav.classList.remove("open");

  mainNav.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("nav-open");

  if (menuButton) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  /*
    Always return navigation
    to the main menu when closed.
  */

  showNavPanel("main");

}


/* =========================================================
   CLOSE BUTTON
   ========================================================= */

if (navClose) {

  navClose.addEventListener(
    "click",
    closeNavigation
  );

}


/* =========================================================
   NAVIGATION PANELS
   ========================================================= */

const navPanels =
  document.querySelectorAll(".nav-panel");


function showNavPanel(panelId) {

  navPanels.forEach(panel => {

    panel.classList.remove("active");

  });


  const targetPanel =
    panelId === "main"
      ? document.querySelector(".nav-panel-main")
      : document.getElementById(panelId);


  if (targetPanel) {

    targetPanel.classList.add("active");

    /*
      Start every new navigation level
      at the top.
    */

    targetPanel.scrollTop = 0;

  }

}


/* =========================================================
   OPEN DEEPER NAVIGATION LEVEL
   ========================================================= */

document
  .querySelectorAll(".nav-has-children")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          button.dataset.target;

        if (target) {

          showNavPanel(target);

        }

      }
    );

  });


/* =========================================================
   BACK NAVIGATION
   ========================================================= */

document
  .querySelectorAll(".nav-back")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          button.dataset.back;

        if (target) {

          showNavPanel(target);

        }

      }
    );

  });


/* =========================================================
   CLOSE NAVIGATION AFTER DIRECT LINK
   ========================================================= */

document
  .querySelectorAll(".nav-direct")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        closeNavigation();

      }

    );

  });


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      mainNav &&
      mainNav.classList.contains("open")
    ) {

      closeNavigation();

    }

  }
);


/* =========================================================
   FLOATING MENU SCROLL BEHAVIOR
   ========================================================= */

if (menuButton) {

  let lastScrollY =
    window.scrollY;


  function updateMenuState() {

    /*
      Don't change the floating button
      while the full-screen navigation
      is open.
    */

    if (
      mainNav &&
      mainNav.classList.contains("open")
    ) {

      lastScrollY =
        window.scrollY;

      return;

    }


    const currentScrollY =
      window.scrollY;


    /*
      SCROLLING DOWN
      Show:
      better farming,
      Food for all
    */

    if (
      currentScrollY >
      lastScrollY
    ) {

      menuButton.classList.add(
        "scrolled"
      );

    }


    /*
      SCROLLING UP
      Return to MENU
    */

    else if (
      currentScrollY <
      lastScrollY
    ) {

      menuButton.classList.remove(
        "scrolled"
      );

    }


    /*
      If scrolling stops,
      keep current state.
    */

    lastScrollY =
      currentScrollY;

  }


  window.addEventListener(
    "scroll",
    updateMenuState,
    {
      passive: true
    }
  );

}


/* =========================================================
   HERO CAROUSEL
   ========================================================= */

const heroImage =
  document.getElementById(
    "hero-image"
  );

const heroDots =
  document.querySelectorAll(
    ".hero-dot"
  );

const previousButton =
  document.querySelector(
    ".hero-prev"
  );

const nextButton =
  document.querySelector(
    ".hero-next"
  );


const heroSlides = [

  "hero-food.jpg",

  "hero-farm.jpg",

  "hero-idegro.jpg",

  "hero-animal-health.jpg"

];


let currentSlide = 0;


/* =========================================================
   SHOW HERO SLIDE
   ========================================================= */

function showSlide(index) {

  if (!heroImage) return;


  currentSlide =
    (
      index +
      heroSlides.length
    ) %
    heroSlides.length;


  heroImage.style.backgroundImage =
    `url("${heroSlides[currentSlide]}")`;


  heroDots.forEach(
    (dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentSlide
      );

    }
  );

}


/* =========================================================
   NEXT SLIDE
   ========================================================= */

if (nextButton) {

  nextButton.addEventListener(
    "click",
    () => {

      showSlide(
        currentSlide + 1
      );

    }
  );

}


/* =========================================================
   PREVIOUS SLIDE
   ========================================================= */

if (previousButton) {

  previousButton.addEventListener(
    "click",
    () => {

      showSlide(
        currentSlide - 1
      );

    }
  );

}


/* =========================================================
   HERO DOTS
   ========================================================= */

heroDots.forEach(
  dot => {

    dot.addEventListener(
      "click",
      () => {

        showSlide(
          Number(
            dot.dataset.slide
          )
        );

      }
    );

  }
);


/* =========================================================
   AUTOMATIC HERO SLIDE
   ========================================================= */

let heroTimer =
  setInterval(
    () => {

      showSlide(
        currentSlide + 1
      );

    },
    6500
  );


/* =========================================================
   PAUSE HERO WHILE VIEWING
   ========================================================= */

const hero =
  document.querySelector(
    ".hero"
  );


if (hero) {

  hero.addEventListener(
    "mouseenter",
    () => {

      clearInterval(
        heroTimer
      );

    }
  );


  hero.addEventListener(
    "mouseleave",
    () => {

      heroTimer =
        setInterval(
          () => {

            showSlide(
              currentSlide + 1
            );

          },
          6500
        );

    }
  );

}


/* =========================================================
   INITIAL HERO SLIDE
   ========================================================= */

showSlide(0);


/* =========================================================
   COMPANY NUMBER COUNTERS
   ========================================================= */

const counterSection =
  document.querySelector(
    ".company-numbers"
  );

const counters =
  document.querySelectorAll(
    ".counter"
  );


let countersStarted = false;


function startCounters() {

  if (countersStarted) return;

  countersStarted = true;


  counters.forEach(
    counter => {

      const target =
        Number(
          counter.dataset.target
        );

      const suffix =
        counter.dataset.suffix ||
        "";


      const duration =
        1800;

      const startTime =
        performance.now();


      function updateCounter(
        currentTime
      ) {

        const elapsed =
          currentTime -
          startTime;


        const progress =
          Math.min(
            elapsed / duration,
            1
          );


        const easedProgress =
          1 -
          Math.pow(
            1 - progress,
            3
          );


        const currentValue =
          Math.floor(
            target *
            easedProgress
          );


        counter.textContent =
          currentValue.toLocaleString() +
          suffix;


        if (
          progress < 1
        ) {

          requestAnimationFrame(
            updateCounter
          );

        }

        else {

          counter.textContent =
            target.toLocaleString() +
            suffix;

        }

      }


      requestAnimationFrame(
        updateCounter
      );

    }
  );

}


/* =========================================================
   START COUNTERS WHEN VISIBLE
   ========================================================= */

if (counterSection) {

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              startCounters();

              counterObserver.disconnect();

            }

          }
        );

      },
      {
        threshold: 0.35
      }
    );


  counterObserver.observe(
    counterSection
  );

}
