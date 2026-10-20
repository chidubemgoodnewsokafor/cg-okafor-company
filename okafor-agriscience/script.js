/* =========================================================
   OKAFOR AGRISCIENCE
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     1. FULL-SCREEN NAVIGATION
  ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");
  const navClose = document.getElementById("navClose");

  function openNavigation() {
    if (!mainNav || !menuButton) return;

    mainNav.classList.add("open");
    mainNav.setAttribute("aria-hidden", "false");

    menuButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");

    closeAllPanels();
  }

  function closeNavigation() {
    if (!mainNav || !menuButton) return;

    mainNav.classList.remove("open");
    mainNav.setAttribute("aria-hidden", "true");

    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");

    closeAllPanels();
  }

  if (menuButton) {
    menuButton.addEventListener("click", openNavigation);
  }

  if (navClose) {
    navClose.addEventListener("click", closeNavigation);
  }


  /* =======================================================
     2. NESTED NAVIGATION PANELS
  ======================================================= */

  function closeAllPanels() {
    if (!mainNav) return;

    mainNav
      .querySelectorAll(".nav-item.panel-open")
      .forEach(function (item) {
        item.classList.remove("panel-open");
      });
  }

  if (mainNav) {

    mainNav.querySelectorAll(".nav-parent").forEach(function (button) {

      button.addEventListener("click", function () {

        const parentItem = button.closest(".nav-item");

        if (!parentItem) return;

        const parentPanel = parentItem.parentElement;

        /*
          Close other open sibling panels at this level.
        */

        if (parentPanel) {

          Array.from(parentPanel.children).forEach(function (sibling) {

            if (
              sibling !== parentItem &&
              sibling.classList.contains("nav-item")
            ) {
              sibling.classList.remove("panel-open");
            }

          });

        }

        /*
          Toggle the selected navigation panel.
        */

        parentItem.classList.toggle("panel-open");

      });

    });


    /*
      Back buttons close the current nested panel.
    */

    mainNav.querySelectorAll(".nav-back").forEach(function (button) {

      button.addEventListener("click", function () {

        const parentItem = button.closest(".nav-item");

        if (parentItem) {
          parentItem.classList.remove("panel-open");
        }

      });

    });


    /*
      Close the navigation after choosing a destination.
    */

    mainNav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        closeNavigation();

      });

    });

  }


  /*
    Escape closes the navigation.
  */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeNavigation();
    }

  });


  /* =======================================================
     3. HERO CAROUSEL
  ======================================================= */

  const heroSlides = Array.from(
    document.querySelectorAll(".hero-slide")
  );

  const heroDots = Array.from(
    document.querySelectorAll(".hero-dot")
  );

  const heroTitle = document.getElementById("heroTitle");
  const heroCopy = document.getElementById("heroCopy");
  const heroEyebrow = document.getElementById("heroEyebrow");
  const slideCurrent = document.getElementById("slideCurrent");

  const heroMessages = [

    {
      eyebrow: "AGRICULTURAL INPUTS & SOLUTIONS",

      title: "Better solutions<br>for every farm.",

      copy:
        "Products and practical solutions for crop farmers, " +
        "livestock producers and the people growing our food."
    },

    {
      eyebrow: "CROP PROTECTION, PLANT NUTRITION & SEEDS",

      title: "Helping crops<br>grow stronger.",

      copy:
        "Explore agricultural inputs and seed options to help " +
        "you make informed decisions for your crops."
    },

    {
      eyebrow: "SOLUTIONS FOR LIVESTOCK FARMERS",

      title: "Supporting better<br>livestock production.",

      copy:
        "Discover animal-health solutions and useful information " +
        "for poultry and swine production."
    }

  ];

  let currentSlide = 0;
  let carouselTimer = null;

  function showSlide(index) {

    if (!heroSlides.length) return;

    currentSlide = (
      (index % heroSlides.length) + heroSlides.length
    ) % heroSlides.length;

    heroSlides.forEach(function (slide, slideIndex) {

      slide.classList.toggle(
        "active",
        slideIndex === currentSlide
      );

    });

    heroDots.forEach(function (dot, dotIndex) {

      dot.classList.toggle(
        "active",
        dotIndex === currentSlide
      );

      dot.setAttribute(
        "aria-pressed",
        dotIndex === currentSlide ? "true" : "false"
      );

    });

    const message = heroMessages[currentSlide];

    if (message) {

      if (heroEyebrow) {
        heroEyebrow.textContent = message.eyebrow;
      }

      if (heroTitle) {
        heroTitle.innerHTML = message.title;
      }

      if (heroCopy) {
        heroCopy.textContent = message.copy;
      }

    }

    if (slideCurrent) {
      slideCurrent.textContent = String(currentSlide + 1).padStart(2, "0");
    }

  }


  function startCarousel() {

    stopCarousel();

    if (heroSlides.length < 2) return;

    carouselTimer = setInterval(function () {

      showSlide(currentSlide + 1);

    }, 6000);

  }


  function stopCarousel() {

    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }

  }


  heroDots.forEach(function (dot) {

    dot.addEventListener("click", function () {

      const requestedSlide = Number(dot.dataset.slide);

      if (Number.isInteger(requestedSlide)) {
        showSlide(requestedSlide);
        startCarousel();
      }

    });

  });


  const hero = document.querySelector(".hero");

  if (hero) {

    hero.addEventListener("mouseenter", stopCarousel);

    hero.addEventListener("mouseleave", startCarousel);

    hero.addEventListener("focusin", stopCarousel);

    hero.addEventListener("focusout", function (event) {

      if (!hero.contains(event.relatedTarget)) {
        startCarousel();
      }

    });

  }


  if (heroSlides.length) {
    showSlide(0);
    startCarousel();
  }


  /* =======================================================
     4. VEGETABLE SEED CARDS
  ======================================================= */

  const vegetableSeeds = [

    {
      name: "Watermelon",
      description: "Watermelon seed varieties",
      href: "watermelon-catalogue.html",
      image: "watermelon.jpg"
    },

    {
      name: "Cucumber",
      description: "Cucumber seed varieties",
      href: "cucumber-catalogue.html",
      image: "cucumber.jpg"
    },

    {
      name: "Tomato",
      description: "Tomato seed varieties",
      href: "tomato-catalogue.html",
      image: "tomato.jpg"
    },

    {
      name: "Pepper",
      description: "Pepper seed varieties",
      href: "pepper-catalogue.html",
      image: "pepper.jpg"
    },

    {
      name: "Cabbage",
      description: "Cabbage seed varieties",
      href: "cabbage-catalogue.html",
      image: "cabbage.jpg"
    },

    {
      name: "Carrot",
      description: "Carrot seed varieties",
      href: "carrot-catalogue.html",
      image: "carrot.jpg"
    },

    {
      name: "Onion",
      description: "Onion seed varieties",
      href: "onion-catalogue.html",
      image: "onion.jpg"
    },

    {
      name: "Okra",
      description: "Okra seed varieties",
      href: "okra-catalogue.html",
      image: "okra.jpg"
    },

    {
      name: "French Bean",
      description: "French bean seed varieties",
      href: "french-bean-catalogue.html",
      image: "french-bean.jpg"
    },

    {
      name: "Yardlong Bean",
      description: "Yardlong bean seed varieties",
      href: "yardlong-bean-catalogue.html",
      image: "yardlong-bean.jpg"
    },

    {
      name: "Lettuce",
      description: "Lettuce seed varieties",
      href: "lettuce-catalogue.html",
      image: "lettuce.jpg"
    },

    {
      name: "Sweet Corn",
      description: "Sweet corn seed varieties",
      href: "sweet-corn-catalogue.html",
      image: "sweet-corn.jpg"
    },

    {
      name: "Eggplant",
      description: "Eggplant seed varieties",
      href: "eggplant-catalogue.html",
      image: "eggplant.jpg"
    },

    {
      name: "Cauliflower",
      description: "Cauliflower seed varieties",
      href: "cauliflower-catalogue.html",
      image: "cauliflower.jpg"
    },

    {
      name: "Chinese Cabbage",
      description: "Chinese cabbage seed varieties",
      href: "chinese-cabbage-catalogue.html",
      image: "chinese-cabbage.jpg"
    }

  ];


  /* =======================================================
     5. FIELD SEED CARDS
  ======================================================= */

  const fieldSeeds = [

    {
      name: "Corn",
      description: "Field corn seed varieties",
      href: "corn-catalogue.html",
      image: "corn.jpg"
    },

    {
      name: "Soybean",
      description: "Soybean seed varieties",
      href: "soybean-catalogue.html",
      image: "soybean.jpg"
    },

    {
      name: "Groundnut",
      description: "Groundnut seed varieties",
      href: "groundnut-catalogue.html",
      image: "groundnut.jpg"
    },

    {
      name: "Rice",
      description: "Rice seed varieties",
      href: "rice-catalogue.html",
      image: "rice.jpg"
    },

    {
      name: "Wheat",
      description: "Wheat seed varieties",
      href: "wheat-catalogue.html",
      image: "wheat.jpg"
    }

  ];


  /* =======================================================
     6. GENERATE SEED CARDS
  ======================================================= */

  function createSeedCard(seed, index) {

    const card = document.createElement("a");

    card.className = "seed-card";
    card.href = seed.href;

    card.style.backgroundImage =
      'url("' + seed.image + '")';

    card.setAttribute(
      "aria-label",
      "Explore " + seed.name + " seed varieties"
    );

    const number = document.createElement("span");

    number.className = "seed-card-number";
    number.textContent = String(index + 1).padStart(2, "0");


    const title = document.createElement("h4");

    title.textContent = seed.name;


    const description = document.createElement("p");

    description.textContent = seed.description;


    const arrow = document.createElement("span");

    arrow.className = "seed-card-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";


    card.appendChild(number);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(arrow);

    return card;

  }


  function renderSeedCards(containerId, seeds) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const fragment = document.createDocumentFragment();

    seeds.forEach(function (seed, index) {

      fragment.appendChild(
        createSeedCard(seed, index)
      );

    });

    container.replaceChildren(fragment);

  }


  renderSeedCards(
    "vegetableSeedGrid",
    vegetableSeeds
  );

  renderSeedCards(
    "fieldSeedGrid",
    fieldSeeds
  );


  /* =======================================================
     7. POULTRY HEALTH CARDS
  ======================================================= */

  const poultryHealth = [

    {
      title: "Performance & Gut Health",

      description:
        "Explore gut health, digestion and flock performance topics.",

      href: "poultry-performance-gut-health.html"
    },

    {
      title: "Coughing & Respiratory Problems",

      description:
        "Learn about common respiratory signs in poultry.",

      href: "poultry-respiratory.html"
    },

    {
      title: "Diarrhea & Coccidiosis",

      description:
        "Explore common causes of digestive problems in poultry.",

      href: "poultry-diarrhea.html"
    },

    {
      title: "Worms & Parasites",

      description:
        "Learn about parasite risks and flock management.",

      href: "poultry-worms.html"
    },

    {
      title: "Heat Stress & Dehydration",

      description:
        "Explore ways to recognise and manage heat stress risks.",

      href: "poultry-heat-stress.html"
    },

    {
      title: "Egg Performance & Calcium Deficiency",

      description:
        "Learn about laying performance, nutrition and eggshell quality.",

      href: "poultry-egg-performance.html"
    },

    {
      title: "Feed Safety & Biosecurity",

      description:
        "Explore feed hygiene and practical biosecurity measures.",

      href: "poultry-feed-biosecurity.html"
    }

  ];


  /* =======================================================
     8. SWINE HEALTH CARDS
  ======================================================= */

  const swineHealth = [

    {
      title: "Performance & Gut Health",

      description:
        "Explore digestion, nutrition and growth performance topics.",

      href: "swine-performance-gut-health.html"
    },

    {
      title: "Respiratory Problems & Pneumonia",

      description:
        "Learn about respiratory signs and herd health concerns.",

      href: "swine-respiratory.html"
    },

    {
      title: "Breeding & Fertility",

      description:
        "Explore reproductive performance and breeding management.",

      href: "swine-breeding.html"
    },

    {
      title: "Piglet & Grower Diarrhea",

      description:
        "Learn about digestive problems affecting young and growing pigs.",

      href: "swine-diarrhea.html"
    },

    {
      title: "Worms & Parasites",

      description:
        "Explore parasite management and herd health.",

      href: "swine-worms.html"
    },

    {
      title: "Feed Quality & Biosecurity",

      description:
        "Learn about feed hygiene and biosecurity practices.",

      href: "swine-feed-biosecurity.html"
    },

    {
      title: "Newborn Care",

      description:
        "Explore early piglet care and newborn management.",

      href: "swine-newborn-care.html"
    }

  ];


  /* =======================================================
     9. GENERATE ANIMAL HEALTH CARDS
  ======================================================= */

  function createAnimalCard(item, index, animalType) {

    const card = document.createElement("a");

    card.className = "animal-card";
    card.href = item.href;

    card.setAttribute(
      "aria-label",
      "Explore " + animalType + " health: " + item.title
    );


    const icon = document.createElement("span");

    icon.className = "animal-card-icon";
    icon.setAttribute("aria-hidden", "true");

    /*
      Simple numbered markers keep the design consistent
      without requiring a separate icon library.
    */

    icon.textContent = String(index + 1).padStart(2, "0");


    const title = document.createElement("h4");

    title.textContent = item.title;


    const description = document.createElement("p");

    description.textContent = item.description;


    const link = document.createElement("span");

    link.className = "animal-card-link";
    link.appendChild(document.createTextNode("Explore topic "));


    const arrow = document.createElement("span");

    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    link.appendChild(arrow);


    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(link);

    return card;

  }


  function renderAnimalCards(containerId, items, animalType) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const fragment = document.createDocumentFragment();

    items.forEach(function (item, index) {

      fragment.appendChild(
        createAnimalCard(item, index, animalType)
      );

    });

    container.replaceChildren(fragment);

  }


  renderAnimalCards(
    "poultryGrid",
    poultryHealth,
    "poultry"
  );

  renderAnimalCards(
    "swineGrid",
    swineHealth,
    "swine"
  );


  /* =======================================================
     10. CLOSE MENU WHEN CLICKING OUTSIDE THE NAVIGATION
  ======================================================= */

  document.addEventListener("click", function (event) {

    if (!mainNav || !menuButton) return;

    const clickedInsideNav = mainNav.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (
      mainNav.classList.contains("open") &&
      !clickedInsideNav &&
      !clickedMenuButton
    ) {
      closeNavigation();
    }

  });


  /* =======================================================
     11. PREVENT EMPTY HASH JUMPS
  ======================================================= */

  document.querySelectorAll('a[href="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {
      event.preventDefault();
    });

  });


  /* =======================================================
     12. CURRENT YEAR IN FOOTER
  ======================================================= */

  const footerYear = document.querySelector("[data-current-year]");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     INITIALISATION COMPLETE
  ======================================================= */

  console.log("Okafor Agriscience homepage initialised.");

});
