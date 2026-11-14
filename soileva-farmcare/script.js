(() => {

/* =================================
MOBILE NAVIGATION
================================= */

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {

toggle.addEventListener('click', () => {

  const open = toggle.getAttribute('aria-expanded') === 'true';

  toggle.setAttribute('aria-expanded', String(!open));

  toggle.setAttribute(
    'aria-label',
    open ? 'Open navigation' : 'Close navigation'
  );

  nav.classList.toggle('open', !open);

  document.body.classList.toggle('menu-open', !open);

});

nav.querySelectorAll('a').forEach(link => {

  link.addEventListener('click', () => {

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');

    nav.classList.remove('open');

    document.body.classList.remove('menu-open');

  });

});

window.addEventListener('resize', () => {

  if (window.innerWidth > 820) {

    toggle.setAttribute('aria-expanded', 'false');

    nav.classList.remove('open');

    document.body.classList.remove('menu-open');

  }

});

}

/* =================================
HERO CAROUSEL
================================= */

const slides = [
...document.querySelectorAll('.hero-slide')
];

const dots = [
...document.querySelectorAll('.hero-controls .dot')
];

const number = document.getElementById('slide-number');

const heroArrows = [
...document.querySelectorAll('.hero-controls .arrow')
];

let heroIndex = 0;
let heroTimer;

function showHero(n) {

if (!slides.length) return;

heroIndex = (n + slides.length) % slides.length;

slides.forEach((slide, i) => {

  slide.classList.toggle('active', i === heroIndex);

});

dots.forEach((dot, i) => {

  dot.classList.toggle('active', i === heroIndex);

});

if (number) {

  number.textContent = String(heroIndex + 1).padStart(2, '0');

}

}

function restartHero() {

clearInterval(heroTimer);

if (slides.length > 1) {

  heroTimer = setInterval(() => {

    showHero(heroIndex + 1);

  }, 6500);

}

}

heroArrows.forEach(button => {

button.addEventListener('click', () => {

  showHero(heroIndex + Number(button.dataset.step));

  restartHero();

});

});

dots.forEach((dot, i) => {

dot.addEventListener('click', () => {

  showHero(i);

  restartHero();

});

});

if (slides.length > 1) {

restartHero();

}

/* =================================
TEN PROMOTIONAL CAROUSELS
SEAMLESS CONTINUOUS MOVEMENT
================================= */

const promoTrack = document.querySelector('.promo-track');

if (promoTrack) {

const originalGroup = promoTrack.querySelector('.promo-group');

if (originalGroup && !promoTrack.dataset.duplicated) {

  const duplicateGroup = originalGroup.cloneNode(true);

  duplicateGroup.setAttribute('aria-hidden', 'true');

  duplicateGroup.querySelectorAll('a').forEach(link => {

    link.setAttribute('tabindex', '-1');

  });

  duplicateGroup.querySelectorAll('img').forEach(img => {

    img.alt = '';

  });

  promoTrack.appendChild(duplicateGroup);

  promoTrack.dataset.duplicated = 'true';

}

/*
  The promotional window automatically adjusts to
  the tallest original image so images are not cut off.
*/

function setPromoHeight() {

  const promoWindow = document.querySelector('.promo-window');

  const firstGroup = promoTrack.querySelector('.promo-group');

  if (!promoWindow || !firstGroup) return;

  const images = [
    ...firstGroup.querySelectorAll('img')
  ];

  let tallest = 0;

  images.forEach(img => {

    if (img.complete && img.naturalWidth > 0) {

      tallest = Math.max(
        tallest,
        img.getBoundingClientRect().height
      );

    }

  });

  if (tallest > 0) {

    promoWindow.style.height = `${tallest}px`;

  }

}

promoTrack.querySelectorAll('img').forEach(img => {

  if (!img.complete) {

    img.addEventListener('load', setPromoHeight);

  }

});

window.addEventListener('load', setPromoHeight);

window.addEventListener('resize', setPromoHeight);

setPromoHeight();

}

/* =================================
FOUR NEW ARRIVAL CARDS
HORIZONTAL SLIDER
================================= */

const arrivalViewport = document.querySelector('.arrival-viewport');

const arrivalTrack = document.querySelector('.arrival-track');

const arrivalSlides = arrivalTrack
? [...arrivalTrack.querySelectorAll('.arrival')]
: [];

const arrivalDots = [
...document.querySelectorAll('.arrival-dot')
];

const previousButton = document.querySelector('.arrival-prev');

const nextButton = document.querySelector('.arrival-next');

let arrivalIndex = 0;

/* One card on mobile, two on larger screens. */

function visibleCards() {

return window.innerWidth <= 600 ? 1 : 2;

}

function maximumIndex() {

return Math.max(
  0,
  arrivalSlides.length - visibleCards()
);

}

/* Move the slider. */

function updateArrival() {

if (!arrivalTrack || !arrivalSlides.length) return;

arrivalIndex = Math.min(
  arrivalIndex,
  maximumIndex()
);

const cardWidth = arrivalSlides[0].getBoundingClientRect().width;

const styles = window.getComputedStyle(arrivalTrack);

const gap = parseFloat(styles.columnGap || styles.gap) || 0;

const distance = arrivalIndex * (cardWidth + gap);

arrivalTrack.style.transform =
  `translateX(-${distance}px)`;


/* Update pagination. */

arrivalDots.forEach((dot, i) => {

  dot.classList.toggle(
    'active',
    i === arrivalIndex
  );

});


/* Disable controls at the beginning and end. */

if (previousButton) {

  previousButton.disabled = arrivalIndex === 0;

}

if (nextButton) {

  nextButton.disabled = arrivalIndex >= maximumIndex();

}

}

/* Previous button. */

if (previousButton) {

previousButton.addEventListener('click', () => {

  arrivalIndex = Math.max(
    0,
    arrivalIndex - 1
  );

  updateArrival();

});

}

/* Next button. */

if (nextButton) {

nextButton.addEventListener('click', () => {

  arrivalIndex = Math.min(
    maximumIndex(),
    arrivalIndex + 1
  );

  updateArrival();

});

}

/* Pagination buttons. */

arrivalDots.forEach((dot, i) => {

dot.addEventListener('click', () => {

  arrivalIndex = Math.min(
    i,
    maximumIndex()
  );

  updateArrival();

});

});

/* =================================
MOBILE TOUCH SWIPE
================================= */

let touchStartX = 0;
let touchStartY = 0;

if (arrivalViewport) {

arrivalViewport.addEventListener('touchstart', event => {

  const touch = event.touches[0];

  touchStartX = touch.clientX;

  touchStartY = touch.clientY;

}, { passive: true });


arrivalViewport.addEventListener('touchend', event => {

  const touch = event.changedTouches[0];

  const differenceX = touch.clientX - touchStartX;

  const differenceY = touch.clientY - touchStartY;

  /*
    Only change slides when the user makes
    a deliberate horizontal swipe.
  */

  if (
    Math.abs(differenceX) > 40 &&
    Math.abs(differenceX) > Math.abs(differenceY)
  ) {

    if (differenceX < 0) {

      arrivalIndex = Math.min(
        maximumIndex(),
        arrivalIndex + 1
      );

    } else {

      arrivalIndex = Math.max(
        0,
        arrivalIndex - 1
      );

    }

    updateArrival();

  }

  touchStartX = 0;
  touchStartY = 0;

}, { passive: true });

}

/* Recalculate when screen size changes. */

window.addEventListener('resize', updateArrival);

window.addEventListener('load', updateArrival);

updateArrival();

/* =================================
FOOTER YEAR
================================= */

const year = document.getElementById('year');

if (year) {

year.textContent = new Date().getFullYear();

}

})();
