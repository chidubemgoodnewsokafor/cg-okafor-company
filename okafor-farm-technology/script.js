/* =========================================================
   OKAFOR FARM TECHNOLOGY
   Main Website JavaScript
   ========================================================= */


/* =========================================================
   HERO SLIDER
   ========================================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrev = document.querySelector(".hero-prev");
const heroNext = document.querySelector(".hero-next");

let currentHeroSlide = 0;
let heroTimer;


/* Show selected hero slide */

function showHeroSlide(index) {

    if (!heroSlides.length) return;

    if (index < 0) {
        index = heroSlides.length - 1;
    }

    if (index >= heroSlides.length) {
        index = 0;
    }

    heroSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    heroDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

    currentHeroSlide = index;
}


/* Next slide */

function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
}


/* Previous slide */

function previousHeroSlide() {
    showHeroSlide(currentHeroSlide - 1);
}


/* Start automatic hero rotation */

function startHeroTimer() {

    clearInterval(heroTimer);

    heroTimer = setInterval(() => {
        nextHeroSlide();
    }, 7000);
}


/* Hero next button */

if (heroNext) {

    heroNext.addEventListener("click", () => {

        nextHeroSlide();
        startHeroTimer();

    });

}


/* Hero previous button */

if (heroPrev) {

    heroPrev.addEventListener("click", () => {

        previousHeroSlide();
        startHeroTimer();

    });

}


/* Hero dots */

heroDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showHeroSlide(index);
        startHeroTimer();

    });

});


/* Start slider */

showHeroSlide(0);
startHeroTimer();



/* =========================================================
   TOUCH / SWIPE SUPPORT FOR HERO
   ========================================================= */

const hero = document.querySelector(".hero");

let touchStartX = 0;
let touchEndX = 0;

if (hero) {

    hero.addEventListener(
        "touchstart",
        (event) => {

            touchStartX = event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    hero.addEventListener(
        "touchend",
        (event) => {

            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) < 50) {
                return;
            }

            if (swipeDistance < 0) {

                nextHeroSlide();

            } else {

                previousHeroSlide();

            }

            startHeroTimer();

        },
        { passive: true }
    );

}



/* =========================================================
   HORIZONTAL CAROUSELS
   ========================================================= */

const carouselButtons = document.querySelectorAll(
    ".carousel-prev, .carousel-next"
);


carouselButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const carouselId = button.dataset.carousel;
        const carousel = document.getElementById(carouselId);

        if (!carousel) return;


        const direction = button.classList.contains("carousel-next")
            ? 1
            : -1;


        const card = carousel.querySelector(
            ".large-card, .solution-card"
        );


        if (!card) return;


        const gap = 22;

        const amount = card.offsetWidth + gap;


        carousel.scrollBy({
            left: amount * direction,
            behavior: "smooth"
        });

    });

});



/* =========================================================
   READ MORE BUTTONS
   ========================================================= */

const readMoreButtons = document.querySelectorAll(".read-more");


readMoreButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".large-card");

        if (!card) return;


        card.classList.toggle("expanded");

        const expanded = card.classList.contains("expanded");

        button.setAttribute(
            "aria-expanded",
            expanded
        );


        const arrow = button.querySelector(
            "span:last-child"
        );


        if (arrow) {

            arrow.textContent = expanded
                ? "∧"
                : "∨";

        }

    });

});



/* =========================================================
   SERVICES — READ MORE
   ========================================================= */

const serviceExpand = document.querySelector(
    ".service-expand"
);

const serviceMore = document.querySelector(
    ".service-more"
);


if (serviceExpand && serviceMore) {

    serviceExpand.addEventListener("click", () => {

        const expanded =
            serviceExpand.getAttribute("aria-expanded") === "true";


        serviceExpand.setAttribute(
            "aria-expanded",
            String(!expanded)
        );


        serviceExpand.classList.toggle(
            "active",
            !expanded
        );


        serviceMore.classList.toggle(
            "active",
            !expanded
        );


        const text =
            serviceExpand.querySelector("span:first-child");


        if (text) {

            text.textContent =
                !expanded
                    ? "Read less"
                    : "Read more";

        }

    });

}



/* =========================================================
   MAIN SOLUTION CARDS
   ========================================================= */

/*
    These cards intentionally return to the main hero.

    The visitor must choose whether they are looking for
    Poultry or Swine before entering a specific interface.
*/

const solutionCards = document.querySelectorAll(
    ".solution-card"
);


solutionCards.forEach((card) => {

    card.addEventListener("click", (event) => {

        event.preventDefault();

        const heroSection =
            document.querySelector("#hero");


        if (heroSection) {

            heroSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});



/* =========================================================
   TOPIC LINKS
   ========================================================= */

/*
    Topic cards use normal anchor links.

    This keeps each topic connected to its corresponding
    explanation further down the homepage.
*/


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const currentYear =
    document.getElementById("current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   HEADERLESS HOMEPAGE — ACTIVE SECTION OBSERVER
   ========================================================= */

/*
    The main homepage intentionally has no conventional
    navigation.

    This observer gives us a clean foundation for future
    scroll-based interactions without adding a header.
*/

const sections = document.querySelectorAll(
    "section[id]"
);


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "section-visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});



/* =========================================================
   SIMPLE SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-grid, " +
    ".large-card, " +
    ".solution-card, " +
    ".topic-card, " +
    ".services-grid"
);


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add(
                    "reveal-visible"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.08
        }
    );


revealElements.forEach((element) => {

    element.classList.add("reveal-element");

    revealObserver.observe(element);

});



/* =========================================================
   KEYBOARD ACCESS FOR HERO
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {

            nextHeroSlide();
            startHeroTimer();

        }


        if (event.key === "ArrowLeft") {

            previousHeroSlide();
            startHeroTimer();

        }

    }
);



/* =========================================================
   PREVENT BROKEN IMAGE LAYOUTS
   ========================================================= */

const allImages =
    document.querySelectorAll("img");


allImages.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-missing"
            );

        }
    );

});



/* =========================================================
   END
   ========================================================= */
