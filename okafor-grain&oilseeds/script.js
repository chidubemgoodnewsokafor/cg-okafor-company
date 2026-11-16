
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Hero carousel
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dotsContainer = document.getElementById("heroDots");
  const previousButton = document.getElementById("prevSlide");
  const nextButton = document.getElementById("nextSlide");

  let currentSlide = 0;
  let carouselTimer;

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "hero-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    dot.addEventListener("click", () => {
      showSlide(index);
      restartTimer();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    showSlide(currentSlide - 1);
  }

  function restartTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(nextSlide, 6500);
  }

  nextButton.addEventListener("click", () => {
    nextSlide();
    restartTimer();
  });

  previousButton.addEventListener("click", () => {
    previousSlide();
    restartTimer();
  });

  showSlide(0);
  restartTimer();

  // Current year
  document.getElementById("year").textContent = new Date().getFullYear();
});
