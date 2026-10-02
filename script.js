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

const navBack =
  document.querySelector(".nav-back");

const navPanels =
  document.querySelectorAll(".nav-panel");

const navParents =
  document.querySelectorAll(".nav-parent");


let navigationHistory = ["main"];


/* =========================================================
   SHOW NAVIGATION PANEL
   ========================================================= */

function showNavPanel(panelName) {

  navPanels.forEach(panel => {

    panel.classList.toggle(
      "nav-panel-active",
      panel.dataset.panel === panelName
    );

  });


  const isMain =
    panelName === "main";


  if (navBack) {

    navBack.classList.toggle(
      "visible",
      !isMain
    );

  }

}


/* =========================================================
   OPEN NAVIGATION
   ========================================================= */

function openNavigation() {

  if (!mainNav || !menuButton) return;


  navigationHistory = ["main"];


  showNavPanel("main");


  mainNav.classList.add("open");

  mainNav.setAttribute(
    "aria-hidden",
    "false"
  );


  menuButton.classList.add(
    "menu-hidden"
  );


  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );


  document.body.classList.add(
    "nav-is-open"
  );

}


/* =========================================================
   CLOSE NAVIGATION
   ========================================================= */

function closeNavigation() {

  if (!mainNav || !menuButton) return;


  mainNav.classList.remove("open");

  mainNav.setAttribute(
    "aria-hidden",
    "true"
  );


  menuButton.classList.remove(
    "menu-hidden"
  );


  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );


  document.body.classList.remove(
    "nav-is-open"
  );


  navigationHistory = ["main"];


  showNavPanel("main");

}


/* =========================================================
   MENU BUTTON
   ========================================================= */

if (menuButton && mainNav) {

  menuButton.addEventListener(
    "click",
    openNavigation
  );

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
   NAVIGATION PARENT BUTTONS
   ========================================================= */

navParents.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const target =
        button.dataset.target;


      if (!target) return;


      navigationHistory.push(
        target
      );


      showNavPanel(
        target
      );

    }
  );

});


/* =========================================================
   BACK BUTTON
   ========================================================= */

if (navBack) {

  navBack.addEventListener(
    "click",
    () => {

      if (
        navigationHistory.length <= 1
      ) {

        showNavPanel("main");

        return;

      }


      navigationHistory.pop();


      const previousPanel =
        navigationHistory[
          navigationHistory.length - 1
        ];


      showNavPanel(
        previousPanel
      );

    }
  );

}


/* =========================================================
   CLOSE NAVIGATION WHEN A PAGE LINK IS CLICKED
   ========================================================= */

if (mainNav) {

  mainNav
    .querySelectorAll(
      "a.nav-link"
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          closeNavigation();

        }
      );

    });

}


/* =========================================================
   ESCAPE KEY CLOSES NAVIGATION
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
      Do not change the menu while
      the full-screen navigation is open.
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
      Immediately return to MENU
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
      keep whatever state is currently visible.
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
  document.getElementById("hero-image");

const heroDots =
  document.querySelectorAll(".hero-dot");

const previousButton =
  document.querySelector(".hero-prev");

const nextButton =
  document.querySelector(".hero-next");


const heroSlides = [
  "hero-food.jpg",
  "hero-farm.jpg",
  "hero-idegro.jpg",
  "hero-animal-health.jpg"
];


let currentSlide = 0;


function showSlide(index) {

  if (!heroImage) return;


  currentSlide =
    (index + heroSlides.length) %
    heroSlides.length;


  heroImage.style.backgroundImage =
    `url("${heroSlides[currentSlide]}")`;


  heroDots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentSlide
    );

  });

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

heroDots.forEach(dot => {

  dot.addEventListener(
    "click",
    () => {

      showSlide(
        Number(dot.dataset.slide)
      );

    }
  );

});


/* =========================================================
   AUTOMATIC HERO SLIDE
   ========================================================= */

let heroTimer = setInterval(
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
  document.querySelector(".hero");


if (hero) {

  hero.addEventListener(
    "mouseenter",
    () => {

      clearInterval(heroTimer);

    }
  );


  hero.addEventListener(
    "mouseleave",
    () => {

      heroTimer = setInterval(
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


  counters.forEach(counter => {

    const target =
      Number(
        counter.dataset.target
      );

    const suffix =
      counter.dataset.suffix || "";


    const duration = 1800;

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

  });

}


/* =========================================================
   START COUNTERS WHEN VISIBLE
   ========================================================= */

if (counterSection) {

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            startCounters();

            counterObserver.disconnect();

          }

        });

      },
      {
        threshold: 0.35
      }
    );


  counterObserver.observe(
    counterSection
  );

}
