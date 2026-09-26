/* =========================================================
   C.G. OKAFOR CO.
   Main Website Script
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {

  menuButton.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  mainNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* ================= HERO CAROUSEL ================= */

const heroTitle = document.getElementById("hero-title");
const heroText = document.getElementById("hero-text");
const heroLink = document.getElementById("hero-link");

const heroImage = document.getElementById("hero-image");

const heroDots = document.querySelectorAll(".hero-dot");
const previousButton = document.querySelector(".hero-prev");
const nextButton = document.querySelector(".hero-next");


const heroSlides = [

  {
    title: "Food that brings us together.",
    text: "Food for everyday life.",
    link: "food-products.html",
    image: "hero-food.jpg"
  },

  {
    title: "Growing better.",
    text: "Agricultural solutions for farmers.",
    link: "okafor-agriscience.html",
    image: "hero-farm.jpg"
  },

  {
    title: "Seeds designed to grow.",
    text: "Explore Idegro.",
    link: "idegro.html",
    image: "hero-idegro.jpg"
  },

  {
    title: "Healthier animals. Better production.",
    text: "Explore animal health.",
    link: "okafor-agriscience.html#animal-health",
    image: "hero-animal-health.jpg"
  }

];


let currentSlide = 0;


function showSlide(index) {

  currentSlide =
    (index + heroSlides.length) % heroSlides.length;

  const slide = heroSlides[currentSlide];

  heroTitle.innerHTML = slide.title;
  heroText.textContent = slide.text;
  heroLink.href = slide.link;

  heroImage.style.backgroundImage =
    `url("${slide.image}")`;

  heroDots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentSlide
    );

  });

     }


/* NEXT */

if (nextButton) {

  nextButton.addEventListener("click", () => {

    showSlide(currentSlide + 1);

  });

}


/* PREVIOUS */

if (previousButton) {

  previousButton.addEventListener("click", () => {

    showSlide(currentSlide - 1);

  });

}


/* DOTS */

heroDots.forEach(dot => {

  dot.addEventListener("click", () => {

    showSlide(
      Number(dot.dataset.slide)
    );

  });

});


/* AUTOMATIC SLIDE */

let heroTimer = setInterval(() => {

  showSlide(currentSlide + 1);

}, 6500);


/* Pause automatic movement while interacting */

const hero = document.querySelector(".hero");

if (hero) {

  hero.addEventListener("mouseenter", () => {

    clearInterval(heroTimer);

  });


  hero.addEventListener("mouseleave", () => {

    heroTimer = setInterval(() => {

      showSlide(currentSlide + 1);

    }, 6500);

  });

}


/* INITIAL SLIDE */

showSlide(0);
