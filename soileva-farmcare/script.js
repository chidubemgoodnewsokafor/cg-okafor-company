(() => {
/* =================================
HERO CAROUSEL
================================= */

const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroDots = [...document.querySelectorAll('.hero-controls .dot')];
const heroNumber = document.getElementById('slide-number');
const heroArrows = [...document.querySelectorAll('.hero-controls .arrow')];

let heroIndex = 0;
let heroTimer;

function showHero(index) {
if (!heroSlides.length) return;

heroIndex = (index + heroSlides.length) % heroSlides.length;

heroSlides.forEach((slide, i) => {
  slide.classList.toggle('active', i === heroIndex);
});

heroDots.forEach((dot, i) => {
  dot.classList.toggle('active', i === heroIndex);
  dot.setAttribute('aria-current', i === heroIndex ? 'true' : 'false');
});

if (heroNumber) {
  heroNumber.textContent = String(heroIndex + 1).padStart(2, '0');
}

}

function restartHero() {
clearInterval(heroTimer);

if (
  heroSlides.length > 1 &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  heroTimer = setInterval(() => {
    showHero(heroIndex + 1);
  }, 6500);
}

}

heroArrows.forEach(button => {
button.addEventListener('click', () => {
showHero(heroIndex + Number(button.dataset.step || 1));
restartHero();
});
});

heroDots.forEach((dot, index) => {
dot.addEventListener('click', () => {
showHero(index);
restartHero();
});
});

if (heroSlides.length) {
showHero(0);
restartHero();
}

/* =================================
FEATURED PRODUCTS
LARGE HORIZONTAL SLIDER
================================= */

const featuredTrack = document.querySelector('.featured-slides');
const featuredSlides = featuredTrack
? [...featuredTrack.querySelectorAll('.featured-slide')]
: [];

const featuredDotsContainer = document.querySelector('.featured-dots');
const featuredPrev = document.querySelector('.featured-prev');
const featuredNext = document.querySelector('.featured-next');

let featuredDots = [];

if (featuredTrack && featuredSlides.length) {

if (featuredDotsContainer) {
  featuredDotsContainer.innerHTML = '';

  featuredSlides.forEach((slide, index) => {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'featured-dot';
    dot.setAttribute('aria-label', `Go to featured product ${index + 1}`);

    dot.addEventListener('click', () => {
      slide.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    });

    featuredDotsContainer.appendChild(dot);
  });

  featuredDots = [...featuredDotsContainer.querySelectorAll('.featured-dot')];
}

function getFeaturedIndex() {
  const trackRect = featuredTrack.getBoundingClientRect();

  let closestIndex = 0;
  let closestDistance = Infinity;

  featuredSlides.forEach((slide, index) => {
    const distance = Math.abs(
      slide.getBoundingClientRect().left - trackRect.left
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function updateFeatured() {
  const index = getFeaturedIndex();

  featuredDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-current', i === index ? 'true' : 'false');
  });
}

function moveFeatured(direction) {
  const slide = featuredSlides[0];
  if (!slide) return;

  const styles = window.getComputedStyle(featuredTrack);
  const gap = parseFloat(styles.columnGap || styles.gap) || 0;
  const distance = slide.getBoundingClientRect().width + gap;

  featuredTrack.scrollBy({
    left: direction * distance,
    behavior: 'smooth'
  });
}

if (featuredPrev) {
  featuredPrev.addEventListener('click', () => moveFeatured(-1));
}

if (featuredNext) {
  featuredNext.addEventListener('click', () => moveFeatured(1));
}

featuredTrack.addEventListener('scroll', updateFeatured, { passive: true });

window.addEventListener('resize', updateFeatured);

updateFeatured();

}

/* =================================
NEW SEASON ARRIVALS
HORIZONTAL SLIDER
================================= */

const arrivalViewport = document.querySelector('.arrival-viewport');
const arrivalTrack = document.querySelector('.arrival-track');

const arrivalSlides = arrivalTrack
? [...arrivalTrack.querySelectorAll('.arrival')]
: [];

const arrivalDotsContainer = document.querySelector('.arrival-pagination');
const arrivalPrev = document.querySelector('.arrival-prev');
const arrivalNext = document.querySelector('.arrival-next');

let arrivalDots = [];
let arrivalIndex = 0;

function visibleArrivalCards() {
return window.innerWidth <= 600 ? 1 : 2;
}

function maximumArrivalIndex() {
return Math.max(0, arrivalSlides.length - visibleArrivalCards());
}

function updateArrival() {
if (!arrivalTrack || !arrivalSlides.length) return;

arrivalIndex = Math.min(arrivalIndex, maximumArrivalIndex());

const cardWidth = arrivalSlides[0].getBoundingClientRect().width;
const styles = window.getComputedStyle(arrivalTrack);
const gap = parseFloat(styles.columnGap || styles.gap) || 0;

const distance = arrivalIndex * (cardWidth + gap);

arrivalTrack.style.transform = `translateX(-${distance}px)`;

arrivalDots.forEach((dot, index) => {
  dot.classList.toggle('active', index === arrivalIndex);
  dot.setAttribute('aria-current', index === arrivalIndex ? 'true' : 'false');
});

if (arrivalPrev) {
  arrivalPrev.disabled = arrivalIndex === 0;
}

if (arrivalNext) {
  arrivalNext.disabled = arrivalIndex >= maximumArrivalIndex();
}

}

if (arrivalSlides.length) {

if (arrivalDotsContainer) {
  arrivalDotsContainer.innerHTML = '';

  for (let i = 0; i <= maximumArrivalIndex(); i++) {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'arrival-dot';
    dot.setAttribute('aria-label', `Show arrival page ${i + 1}`);

    dot.addEventListener('click', () => {
      arrivalIndex = i;
      updateArrival();
    });

    arrivalDotsContainer.appendChild(dot);
  }

  arrivalDots = [...arrivalDotsContainer.querySelectorAll('.arrival-dot')];
}

if (arrivalPrev) {
  arrivalPrev.addEventListener('click', () => {
    arrivalIndex = Math.max(0, arrivalIndex - 1);
    updateArrival();
  });
}

if (arrivalNext) {
  arrivalNext.addEventListener('click', () => {
    arrivalIndex = Math.min(maximumArrivalIndex(), arrivalIndex + 1);
    updateArrival();
  });
}

/* Mobile horizontal swipe */

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

    if (
      Math.abs(differenceX) > 40 &&
      Math.abs(differenceX) > Math.abs(differenceY)
    ) {
      arrivalIndex += differenceX < 0 ? 1 : -1;

      arrivalIndex = Math.max(
        0,
        Math.min(arrivalIndex, maximumArrivalIndex())
      );

      updateArrival();
    }

    touchStartX = 0;
    touchStartY = 0;
  }, { passive: true });
}

window.addEventListener('resize', () => {
  const oldIndex = arrivalIndex;

  if (arrivalDotsContainer) {
    arrivalDotsContainer.innerHTML = '';

    for (let i = 0; i <= maximumArrivalIndex(); i++) {
      const dot = document.createElement('button');

      dot.type = 'button';
      dot.className = 'arrival-dot';
      dot.setAttribute('aria-label', `Show arrival page ${i + 1}`);

      dot.addEventListener('click', () => {
        arrivalIndex = i;
        updateArrival();
      });

      arrivalDotsContainer.appendChild(dot);
    }

    arrivalDots = [...arrivalDotsContainer.querySelectorAll('.arrival-dot')];
  }

  arrivalIndex = Math.min(oldIndex, maximumArrivalIndex());
  updateArrival();
});

window.addEventListener('load', updateArrival);
updateArrival();

}

/* =================================
FOOTER YEAR
================================= */

const year = document.getElementById('year');

if (year) {
year.textContent = new Date().getFullYear();
}

})();
