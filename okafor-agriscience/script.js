document.addEventListener("DOMContentLoaded", function () {
  /* =======================================================
     FULL-SCREEN NAVIGATION
  ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");
  const navClose = document.getElementById("navClose");

  if (menuButton && mainNav) {
    function closeAllPanels(container) {
      const scope = container || mainNav;

      scope.querySelectorAll(".nav-item.panel-open").forEach(function (item) {
        item.classList.remove("panel-open");

        const button = item.querySelector(":scope > .nav-parent");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });
    }

    function openNavigation() {
      mainNav.classList.add("open");
      mainNav.setAttribute("aria-hidden", "false");

      menuButton.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");

      closeAllPanels();

      if (navClose) {
        navClose.focus();
      }
    }

    function closeNavigation() {
      mainNav.classList.remove("open");
      mainNav.setAttribute("aria-hidden", "true");

      menuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");

      closeAllPanels();
    }

    menuButton.addEventListener("click", function () {
      if (mainNav.classList.contains("open")) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });

    if (navClose) {
      navClose.addEventListener("click", closeNavigation);
    }

    /*
      Nested navigation:
      - Opens the selected panel.
      - Closes competing panels at the same level.
      - Supports multiple levels, such as Seeds > Vegetable Seeds.
      - Keeps the parent panel visible while navigating deeper.
    */

    mainNav.querySelectorAll(".nav-parent").forEach(function (button) {
      button.setAttribute("aria-expanded", "false");

      button.addEventListener("click", function () {
        const currentItem = button.closest(".nav-item");

        if (!currentItem) {
          return;
        }

        const isAlreadyOpen = currentItem.classList.contains("panel-open");

        const parentContainer = currentItem.parentElement;

        if (parentContainer) {
          Array.from(parentContainer.children).forEach(function (sibling) {
            if (
              sibling.classList &&
              sibling.classList.contains("nav-item") &&
              sibling !== currentItem
            ) {
              sibling.classList.remove("panel-open");

              const siblingButton = sibling.querySelector(
                ":scope > .nav-parent"
              );

              if (siblingButton) {
                siblingButton.setAttribute("aria-expanded", "false");
              }

              closeAllPanels(sibling);
            }
          });
        }

        if (isAlreadyOpen) {
          currentItem.classList.remove("panel-open");
          button.setAttribute("aria-expanded", "false");

          closeAllPanels(currentItem);
        } else {
          currentItem.classList.add("panel-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });

    /*
      Back buttons close the current level.
      They do not close the entire navigation.
    */

    mainNav.querySelectorAll(".nav-back").forEach(function (button) {
      button.addEventListener("click", function () {
        const currentItem = button.closest(".nav-item");

        if (!currentItem) {
          return;
        }

        currentItem.classList.remove("panel-open");

        const parentButton = currentItem.querySelector(
          ":scope > .nav-parent"
        );

        if (parentButton) {
          parentButton.setAttribute("aria-expanded", "false");
          parentButton.focus();
        }

        closeAllPanels(currentItem);
      });
    });

    /*
      Normal navigation links close the full-screen menu.
    */

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeNavigation();
      });
    });

    /*
      Escape closes the menu.
    */

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        mainNav.classList.contains("open")
      ) {
        closeNavigation();
        menuButton.focus();
      }
    });

    /*
      Clicking outside the navigation closes it.
    */

    document.addEventListener("click", function (event) {
      if (!mainNav.classList.contains("open")) {
        return;
      }

      const clickedInsideNavigation = mainNav.contains(event.target);
      const clickedMenuButton = menuButton.contains(event.target);

      if (!clickedInsideNavigation && !clickedMenuButton) {
        closeNavigation();
      }
    });
  }


  /* =======================================================
     HERO CAROUSEL
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

  const hero = document.querySelector(".hero");

  const heroMessages = [
    {
      eyebrow: "AGRICULTURAL INPUTS & SOLUTIONS",
      title: "Better solutions<br>for every farm.",
      copy:
        "Products and practical solutions for crop farmers, livestock producers and the people growing our food."
    },
    {
      eyebrow: "CROP PROTECTION, PLANT NUTRITION & SEEDS",
      title: "Helping crops<br>grow stronger.",
      copy:
        "Explore agricultural inputs and seed options to help you make informed decisions for your crops."
    },
    {
      eyebrow: "SOLUTIONS FOR LIVESTOCK FARMERS",
      title: "Supporting better<br>livestock production.",
      copy:
        "Discover animal-health solutions and useful information for poultry and swine production."
    }
  ];

  let currentSlide = 0;
  let heroTimer = null;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function showHeroSlide(index) {
    if (!heroSlides.length) {
      return;
    }

    currentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("active", slideIndex === currentSlide);
      slide.setAttribute(
        "aria-hidden",
        slideIndex === currentSlide ? "false" : "true"
      );
    });

    heroDots.forEach(function (dot, dotIndex) {
      const isActive = dotIndex === currentSlide;

      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

    const message = heroMessages[currentSlide];

    if (message) {
      if (heroTitle) {
        heroTitle.innerHTML = message.title;
      }

      if (heroCopy) {
        heroCopy.textContent = message.copy;
      }

      if (heroEyebrow) {
        heroEyebrow.textContent = message.eyebrow;
      }
    }

    if (slideCurrent) {
      slideCurrent.textContent = String(currentSlide + 1).padStart(2, "0");
    }
  }

  function stopHeroTimer() {
    if (heroTimer) {
      window.clearInterval(heroTimer);
      heroTimer = null;
    }
  }

  function startHeroTimer() {
    stopHeroTimer();

    if (
      heroSlides.length < 2 ||
      reducedMotion.matches ||
      document.hidden
    ) {
      return;
    }

    heroTimer = window.setInterval(function () {
      const heroHovered = hero && hero.matches(":hover");
      const heroFocused = hero && hero.contains(document.activeElement);

      if (!heroHovered && !heroFocused) {
        showHeroSlide(currentSlide + 1);
      }
    }, 6000);
  }

  heroDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      const requestedSlide = Number(dot.dataset.slide);

      if (Number.isInteger(requestedSlide)) {
        showHeroSlide(requestedSlide);
        startHeroTimer();
      }
    });
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopHeroTimer();
    } else {
      startHeroTimer();
    }
  });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", startHeroTimer);
  }

  showHeroSlide(0);
  startHeroTimer();


  /* =======================================================
     SEED CARDS
  ======================================================= */

  const vegetableSeeds = [
    {
      name: "Watermelon",
      link: "watermelon-catalogue.html",
      image: "watermelon.jpg"
    },
    {
      name: "Cucumber",
      link: "cucumber-catalogue.html",
      image: "cucumber.jpg"
    },
    {
      name: "Tomato",
      link: "tomato-catalogue.html",
      image: "tomato.jpg"
    },
    {
      name: "Pepper",
      link: "pepper-catalogue.html",
      image: "pepper.jpg"
    },
    {
      name: "Cabbage",
      link: "cabbage-catalogue.html",
      image: "cabbage.jpg"
    },
    {
      name: "Carrot",
      link: "carrot-catalogue.html",
      image: "carrot.jpg"
    },
    {
      name: "Onion",
      link: "onion-catalogue.html",
      image: "onion.jpg"
    },
    {
      name: "Okra",
      link: "okra-catalogue.html",
      image: "okra.jpg"
    },
    {
      name: "French Bean",
      link: "french-bean-catalogue.html",
      image: "french-bean.jpg"
    },
    {
      name: "Yardlong Bean",
      link: "yardlong-bean-catalogue.html",
      image: "yardlong-bean.jpg"
    },
    {
      name: "Lettuce",
      link: "lettuce-catalogue.html",
      image: "lettuce.jpg"
    },
    {
      name: "Sweet Corn",
      link: "sweet-corn-catalogue.html",
      image: "sweet-corn.jpg"
    },
    {
      name: "Eggplant",
      link: "eggplant-catalogue.html",
      image: "eggplant.jpg"
    },
    {
      name: "Cauliflower",
      link: "cauliflower-catalogue.html",
      image: "cauliflower.jpg"
    },
    {
      name: "Chinese Cabbage",
      link: "chinese-cabbage-catalogue.html",
      image: "chinese-cabbage.jpg"
    }
  ];

  const fieldSeeds = [
    {
      name: "Corn",
      link: "corn-catalogue.html",
      image: "corn.jpg"
    },
    {
      name: "Soybean",
      link: "soybean-catalogue.html",
      image: "soybean.jpg"
    },
    {
      name: "Groundnut",
      link: "groundnut-catalogue.html",
      image: "groundnut.jpg"
    },
    {
      name: "Rice",
      link: "rice-catalogue.html",
      image: "rice.jpg"
    },
    {
      name: "Wheat",
      link: "wheat-catalogue.html",
      image: "wheat.jpg"
    }
  ];

  function createSeedCard(seed, index) {
    const card = document.createElement("a");

    card.className = "seed-card";
    card.href = seed.link;
    card.style.backgroundImage =
      'url("' + seed.image.replace(/"/g, '\\"') + '")';

    const number = document.createElement("span");
    number.className = "seed-card-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h3");
    title.className = "seed-card-title";
    title.textContent = seed.name;

    const arrow = document.createElement("span");
    arrow.className = "seed-card-arrow";
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");

    card.appendChild(number);
    card.appendChild(title);
    card.appendChild(arrow);

    card.setAttribute("aria-label", seed.name + " seed catalogue");

    return card;
  }

  function renderSeedCards(containerId, seeds) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.replaceChildren();

    seeds.forEach(function (seed, index) {
      container.appendChild(createSeedCard(seed, index));
    });
  }

  renderSeedCards("vegetableSeedGrid", vegetableSeeds);
  renderSeedCards("fieldSeedGrid", fieldSeeds);


  /* =======================================================
     POULTRY HEALTH CARDS
  ======================================================= */

  const poultryHealth = [
    {
      title: "Performance & Gut Health",
      link: "poultry-performance-gut-health.html",
      description:
        "Explore gut health, digestion and flock performance topics."
    },
    {
      title: "Coughing & Respiratory Problems",
      link: "poultry-respiratory.html",
      description:
        "Learn about common respiratory signs in poultry."
    },
    {
      title: "Diarrhea & Coccidiosis",
      link: "poultry-diarrhea.html",
      description:
        "Explore common causes of digestive problems in poultry."
    },
    {
      title: "Worms & Parasites",
      link: "poultry-worms.html",
      description:
        "Learn about parasite risks and flock management."
    },
    {
      title: "Heat Stress & Dehydration",
      link: "poultry-heat-stress.html",
      description:
        "Explore ways to recognise and manage heat stress risks."
    },
    {
      title: "Egg Performance & Calcium Deficiency",
      link: "poultry-egg-performance.html",
      description:
        "Learn about laying performance, nutrition and eggshell quality."
    },
    {
      title: "Feed Safety & Biosecurity",
      link: "poultry-feed-biosecurity.html",
      description:
        "Explore feed hygiene and practical biosecurity measures."
    }
  ];


  /* =======================================================
     SWINE HEALTH CARDS
  ======================================================= */

  const swineHealth = [
    {
      title: "Performance & Gut Health",
      link: "swine-performance-gut-health.html",
      description:
        "Explore digestion, nutrition and growth performance topics."
    },
    {
      title: "Respiratory Problems & Pneumonia",
      link: "swine-respiratory.html",
      description:
        "Learn about respiratory signs and herd health concerns."
    },
    {
      title: "Breeding & Fertility",
      link: "swine-breeding.html",
      description:
        "Explore reproductive performance and breeding management."
    },
    {
      title: "Piglet & Grower Diarrhea",
      link: "swine-diarrhea.html",
      description:
        "Learn about digestive problems affecting young and growing pigs."
    },
    {
      title: "Worms & Parasites",
      link: "swine-worms.html",
      description:
        "Explore parasite management and herd health."
    },
    {
      title: "Feed Quality & Biosecurity",
      link: "swine-feed-biosecurity.html",
      description:
        "Learn about feed hygiene and biosecurity practices."
    },
    {
      title: "Newborn Care",
      link: "swine-newborn-care.html",
      description:
        "Explore early piglet care and newborn management."
    }
  ];


  /* =======================================================
     ANIMAL HEALTH CARD CREATION
  ======================================================= */

  function createAnimalCard(item, index) {
    const card = document.createElement("article");
    card.className = "animal-card";

    const number = document.createElement("span");
    number.className = "animal-card-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h4");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const link = document.createElement("a");
    link.href = item.link;
    link.appendChild(document.createTextNode("Explore Solutions "));

    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");

    link.appendChild(arrow);

    card.appendChild(number);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(link);

    return card;
  }

  function renderAnimalCards(containerId, items) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.replaceChildren();

    items.forEach(function (item, index) {
      container.appendChild(createAnimalCard(item, index));
    });
  }

  renderAnimalCards("poultryGrid", poultryHealth);
  renderAnimalCards("swineGrid", swineHealth);


  /* =======================================================
     FOOTER YEAR
  ======================================================= */

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /* =======================================================
     EMPTY HASH LINKS
  ======================================================= */

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
});
