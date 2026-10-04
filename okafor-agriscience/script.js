/* =========================================
   OKAFOR AGRISCIENCE MENU
========================================= */

const menuTrigger = document.getElementById("menuTrigger");
const mainNav = document.getElementById("mainNav");
const navClose = document.getElementById("navClose");

function openMenu() {
  mainNav.classList.add("open");
  menuTrigger.classList.add("active");
  menuTrigger.setAttribute("aria-label", "Close menu");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  mainNav.classList.remove("open");
  menuTrigger.classList.remove("active");
  menuTrigger.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("menu-open");
}

menuTrigger.addEventListener("click", function () {
  if (mainNav.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

navClose.addEventListener("click", closeMenu);


/* Close when a menu link is selected */

document.querySelectorAll(".main-nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    closeMenu();
  });
});


/* Close with Escape */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});


/* =========================================
   PRODUCT CATALOGUE
========================================= */

const products = [
  {
    name: "Crop Protection Solutions",
    category: "crop",
    description: "Solutions for weed, pest and disease management."
  },
  {
    name: "Vegetable Seeds",
    category: "seed",
    description: "Seed solutions for commercial vegetable production."
  },
  {
    name: "Field Seeds",
    category: "seed",
    description: "Seeds for important field crops."
  },
  {
    name: "Poultry Health Solutions",
    category: "animal",
    description: "Solutions supporting healthier poultry production."
  },
  {
    name: "Swine Health Solutions",
    category: "animal",
    description: "Solutions supporting healthier pig production."
  },
  {
    name: "Farmcare Products",
    category: "farmcare",
    description: "Practical products and support for everyday farm needs."
  }
];

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const productFilter = document.getElementById("productFilter");

function renderProducts() {

  const searchTerm = productSearch.value.toLowerCase().trim();
  const selectedCategory = productFilter.value;

  const filteredProducts = products.filter(function (product) {

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="product-card">
        <h3>No products found.</h3>
        <p>Try another search or category.</p>
      </div>
    `;
    return;
  }

  filteredProducts.forEach(function (product) {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <small>${product.category}</small>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    `;

    productGrid.appendChild(card);
  });
}

productSearch.addEventListener("input", renderProducts);
productFilter.addEventListener("change", renderProducts);

renderProducts();
