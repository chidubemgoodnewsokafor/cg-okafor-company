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
      closeNavigation
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

  let lastScrollY = window.scrollY;

  function updateMenuState() {

    if (
      mainNav &&
      mainNav.classList.contains("open")
    ) {

      lastScrollY = window.scrollY;

      return;

    }

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {

      menuButton.classList.add("scrolled");

    } else if (currentScrollY < lastScrollY) {

      menuButton.classList.remove("scrolled");

    }

    lastScrollY = currentScrollY;

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


/* =========================================================
   SHOW HERO SLIDE
   ========================================================= */

function showSlide(index) {

  if (!heroImage) return;

  currentSlide =
    (
      index + heroSlides.length
    ) % heroSlides.length;

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
   NEXT HERO SLIDE
   ========================================================= */

if (nextButton) {

  nextButton.addEventListener(
    "click",
    () => {

      showSlide(currentSlide + 1);

    }
  );

}


/* =========================================================
   PREVIOUS HERO SLIDE
   ========================================================= */

if (previousButton) {

  previousButton.addEventListener(
    "click",
    () => {

      showSlide(currentSlide - 1);

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

let heroTimer = null;


function startHeroTimer() {

  if (!heroImage) return;

  clearInterval(heroTimer);

  heroTimer = setInterval(() => {

    showSlide(currentSlide + 1);

  }, 6500);

}


function stopHeroTimer() {

  clearInterval(heroTimer);

}


const hero =
  document.querySelector(".hero");


if (hero) {

  hero.addEventListener(
    "mouseenter",
    stopHeroTimer
  );

  hero.addEventListener(
    "mouseleave",
    startHeroTimer
  );

  hero.addEventListener(
    "focusin",
    stopHeroTimer
  );

  hero.addEventListener(
    "focusout",
    startHeroTimer
  );

}


showSlide(0);

startHeroTimer();


/* =========================================================
   HORIZONTAL BUSINESS AND FOOD CARD ROWS

   These are ordinary horizontally scrollable rows.
   They do not autoplay or switch slides automatically.

   Supported interactions:
   - Arrow buttons
   - Touch swiping
   - Trackpad horizontal scrolling
   - Mouse click-and-drag
   ========================================================= */

function setupHorizontalCardRow(
  rowSelector,
  rowLabel
) {

  const row =
    document.querySelector(rowSelector);

  if (!row) return;


  /* -----------------------------------------------
     CREATE LEFT AND RIGHT ARROW BUTTONS
     ----------------------------------------------- */

  const controls =
    document.createElement("div");

  controls.className =
    "card-carousel-controls";

  controls.setAttribute(
    "aria-label",
    `${rowLabel} scrolling controls`
  );


  const leftButton =
    document.createElement("button");

  leftButton.type = "button";

  leftButton.className =
    "card-carousel-button";

  leftButton.setAttribute(
    "aria-label",
    `Scroll ${rowLabel} left`
  );

  leftButton.innerHTML = "&#8592;";


  const rightButton =
    document.createElement("button");

  rightButton.type = "button";

  rightButton.className =
    "card-carousel-button";

  rightButton.setAttribute(
    "aria-label",
    `Scroll ${rowLabel} right`
  );

  rightButton.innerHTML = "&#8594;";


  controls.appendChild(leftButton);
  controls.appendChild(rightButton);


  /* -----------------------------------------------
     INSERT CONTROLS AFTER THE CARD ROW
     ----------------------------------------------- */

  row.insertAdjacentElement(
    "afterend",
    controls
  );


  /* -----------------------------------------------
     CALCULATE SCROLL DISTANCE
     ----------------------------------------------- */

  function getScrollDistance() {

    const firstCard =
      row.firstElementChild;

    if (!firstCard) {

      return row.clientWidth * 0.8;

    }

    const cardWidth =
      firstCard.getBoundingClientRect().width;

    const rowStyles =
      window.getComputedStyle(row);

    const gap =
      parseFloat(rowStyles.columnGap) ||
      parseFloat(rowStyles.gap) ||
      0;

    /*
      Move approximately one card at a time,
      keeping the row horizontally scrollable.
    */

    return cardWidth + gap;

  }


  /* -----------------------------------------------
     ARROW BUTTON BEHAVIOR
     ----------------------------------------------- */

  leftButton.addEventListener(
    "click",
    () => {

      row.scrollBy({
        left: -getScrollDistance(),
        behavior: "smooth"
      });

    }
  );


  rightButton.addEventListener(
    "click",
    () => {

      row.scrollBy({
        left: getScrollDistance(),
        behavior: "smooth"
      });

    }
  );


  /* -----------------------------------------------
     UPDATE ARROW AVAILABILITY
     ----------------------------------------------- */

  function updateArrowStates() {

    const maxScrollLeft =
      row.scrollWidth - row.clientWidth;

    const canScroll =
      maxScrollLeft > 2;

    leftButton.disabled =
      !canScroll || row.scrollLeft <= 2;

    rightButton.disabled =
      !canScroll ||
      row.scrollLeft >= maxScrollLeft - 2;

    controls.classList.toggle(
      "is-scrollable",
      canScroll
    );

  }


  row.addEventListener(
    "scroll",
    updateArrowStates,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateArrowStates
  );


  /*
    Wait for layout to settle before checking
    the initial scroll position.
  */

  requestAnimationFrame(updateArrowStates);


  /* -----------------------------------------------
     MOUSE CLICK-AND-DRAG

     Touchscreens keep their native swipe behavior.
     Mouse dragging scrolls the row without turning
     it into an autoplay carousel.
     ----------------------------------------------- */

  let isDragging = false;

  let dragStartX = 0;

  let initialScrollLeft = 0;

  let dragDistance = 0;


  row.addEventListener(
    "mousedown",
    event => {

      /*
        Only respond to the main mouse button.
      */

      if (event.button !== 0) return;

      /*
        Don't start dragging from interactive
        controls such as buttons.
      */

      if (
        event.target.closest(
          "button, input, select, textarea"
        )
      ) {

        return;

      }

      isDragging = true;

      dragDistance = 0;

      dragStartX = event.pageX;

      initialScrollLeft = row.scrollLeft;

      row.classList.add("is-dragging");

    }
  );


  window.addEventListener(
    "mousemove",
    event => {

      if (!isDragging) return;

      const distance =
        event.pageX - dragStartX;

      dragDistance = Math.max(
        dragDistance,
        Math.abs(distance)
      );

      row.scrollLeft =
        initialScrollLeft - distance;

    }
  );


  function finishDragging() {

    if (!isDragging) return;

    isDragging = false;

    row.classList.remove("is-dragging");


    /*
      If the user dragged the row, suppress the
      click that would otherwise activate a card.
    */

    if (dragDistance > 6) {

      row.dataset.dragged = "true";

      setTimeout(() => {

        delete row.dataset.dragged;

      }, 0);

    }

  }


  window.addEventListener(
    "mouseup",
    finishDragging
  );


  window.addEventListener(
    "blur",
    finishDragging
  );


  /*
    Prevent accidental navigation when a mouse
    drag ends on a linked card.
  */

  row.addEventListener(
    "click",
    event => {

      if (row.dataset.dragged === "true") {

        event.preventDefault();

        event.stopPropagation();

        delete row.dataset.dragged;

      }

    },
    true
  );


  /* -----------------------------------------------
     PREVENT NATIVE IMAGE DRAGGING

     This helps keep dragging the row feeling smooth.
     ----------------------------------------------- */

  row.addEventListener(
    "dragstart",
    event => {

      event.preventDefault();

    }
  );

}


/* =========================================================
   INITIALIZE HORIZONTAL CARD ROWS
   ========================================================= */

setupHorizontalCardRow(
  ".business-grid",
  "business cards"
);

setupHorizontalCardRow(
  ".food-grid",
  "food cards"
);


/* =========================================================
   COMPANY NUMBER COUNTERS
   ========================================================= */

const counterSection =
  document.querySelector(".company-numbers");

const counters =
  document.querySelectorAll(".counter");


let countersStarted = false;


function startCounters() {

  if (countersStarted) return;

  countersStarted = true;


  counters.forEach(counter => {

    const target =
      Number(counter.dataset.target);

    const suffix =
      counter.dataset.suffix || "";

    const duration = 1800;

    const startTime = performance.now();


    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        Math.floor(target * easedProgress);

      counter.textContent =
        currentValue.toLocaleString() + suffix;


      if (progress < 1) {

        requestAnimationFrame(updateCounter);

      } else {

        counter.textContent =
          target.toLocaleString() + suffix;

      }

    }


    requestAnimationFrame(updateCounter);

  });

}


/* =========================================================
   START COUNTERS WHEN VISIBLE
   ========================================================= */

if (
  counterSection &&
  "IntersectionObserver" in window
) {

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            startCounters();

            counterObserver.disconnect();

          }

        });

      },
      {
        threshold: 0.35
      }
    );

  counterObserver.observe(counterSection);

} else if (counterSection) {

  startCounters();

}
