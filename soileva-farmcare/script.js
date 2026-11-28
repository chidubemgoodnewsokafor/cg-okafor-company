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
SOILEVA FARMCARE STORE LOCATOR
================================= */

/*
  TEMPORARY STORE INFORMATION

  Replace the addresses and phone numbers with the
  confirmed details before publishing.

  The coordinates currently represent approximate
  town-centre locations, not confirmed shop premises.
*/

const farmcareStores = [
  {
    name: "Oba",
    address: "Temporary Store Address, Oba, Anambra State, Nigeria",
    phone: "+2348000000001",
    latitude: 6.06667,
    longitude: 6.83333
  },
  {
    name: "Ifite Ogwari",
    address: "Temporary Store Address, Ifite Ogwari, Anambra State, Nigeria",
    phone: "+2348000000002",
    latitude: 6.60466,
    longitude: 6.94886
  },
  {
    name: "Onitsha",
    address: "Temporary Store Address, Onitsha, Anambra State, Nigeria",
    phone: "+2348000000003",
    latitude: 6.149,
    longitude: 6.785
  },
  {
    name: "Omor",
    address: "Temporary Store Address, Omor, Anambra State, Nigeria",
    phone: "+2348000000004",
    latitude: 6.51918,
    longitude: 6.95742
  }
];

const storeGrid = document.getElementById("store-grid");
const findNearestButton = document.getElementById("find-nearest-store");
const storeLocationStatus = document.getElementById("store-location-status");

function calculateStoreDistance(lat1, lon1, lat2, lon2) {

  const earthRadius = 6371;

  const toRadians = degrees => degrees * Math.PI / 180;

  const latitudeDifference = toRadians(lat2 - lat1);
  const longitudeDifference = toRadians(lon2 - lon1);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(longitudeDifference / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

function renderFarmcareStores(userLocation = null) {

  if (!storeGrid) return;

  let stores = farmcareStores.map(store => {

    let distance = null;

    if (userLocation) {
      distance = calculateStoreDistance(
        userLocation.latitude,
        userLocation.longitude,
        store.latitude,
        store.longitude
      );
    }

    return {
      ...store,
      distance
    };

  });

  if (userLocation) {
    stores.sort((a, b) => a.distance - b.distance);
  }

  storeGrid.innerHTML = "";

  stores.forEach((store, index) => {

    const card = document.createElement("article");

    card.className = "store-card";

    if (userLocation && index === 0) {
      card.classList.add("nearest");
    }

    const nearestLabel =
      userLocation && index === 0
        ? '<span class="store-nearest-label">NEAREST STORE</span>'
        : "";

    const distanceLabel =
      store.distance !== null
        ? `<span class="store-distance">${store.distance.toFixed(1)} km away (approx.)</span>`
        : "";

    const mapsUrl =
      `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;

    card.innerHTML = `
      ${nearestLabel}
      <h4>${store.name}</h4>
      ${distanceLabel}
      <p>${store.address}</p>

      <div class="store-card-actions">
        <a href="${mapsUrl}"
           target="_blank"
           rel="noopener">
          GET DIRECTIONS ↗
        </a>

        <a href="tel:${store.phone}">
          CALL STORE ↗
        </a>
      </div>
    `;

    storeGrid.appendChild(card);

  });

}

if (storeGrid) {
  renderFarmcareStores();
}

if (findNearestButton) {

  findNearestButton.addEventListener("click", () => {

    if (!navigator.geolocation) {
      storeLocationStatus.textContent =
        "Location detection is not supported by your browser. You can browse all four stores below.";

      return;
    }

    findNearestButton.disabled = true;
    findNearestButton.textContent = "FINDING YOUR LOCATION...";

    storeLocationStatus.textContent =
      "Please allow location access when your browser asks.";

    navigator.geolocation.getCurrentPosition(

      position => {

        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        renderFarmcareStores(userLocation);

        const nearestStore = farmcareStores
          .map(store => ({
            ...store,
            distance: calculateStoreDistance(
              userLocation.latitude,
              userLocation.longitude,
              store.latitude,
              store.longitude
            )
          }))
          .sort((a, b) => a.distance - b.distance)[0];

        storeLocationStatus.textContent =
          `Your nearest store is ${nearestStore.name}, approximately ${nearestStore.distance.toFixed(1)} km away.`;

        findNearestButton.textContent = "LOCATION UPDATED";
        findNearestButton.disabled = false;

      },

      error => {

        let message =
          "We couldn't access your location. You can browse all four stores below.";

        if (error.code === error.PERMISSION_DENIED) {
          message =
            "Location permission was denied. You can still browse all four stores below.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message =
            "Your location is currently unavailable. Please browse the stores below.";
        } else if (error.code === error.TIMEOUT) {
          message =
            "Location request timed out. Please try again.";
        }

        storeLocationStatus.textContent = message;

        findNearestButton.textContent = "TRY AGAIN";
        findNearestButton.disabled = false;

      },

      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000
      }

    );

  });

}

/* =================================
FOOTER YEAR
================================= */

const year = document.getElementById('year');

if (year) {
year.textContent = new Date().getFullYear();
}

})();
