/* =========================================================
   OKAFOR AGRISCIENCE
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MENU
     ======================================================= */

  const menuTrigger = document.getElementById("menuTrigger");
  const megaMenu = document.getElementById("megaMenu");
  const menuClose = document.getElementById("menuClose");

  function openMenu() {
    if (!megaMenu || !menuTrigger) return;

    megaMenu.classList.add("open");
    megaMenu.setAttribute("aria-hidden", "false");

    menuTrigger.classList.add("active");
    menuTrigger.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!megaMenu || !menuTrigger) return;

    megaMenu.classList.remove("open");
    megaMenu.setAttribute("aria-hidden", "true");

    menuTrigger.classList.remove("active");
    menuTrigger.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
  }

  if (menuTrigger) {
    menuTrigger.addEventListener("click", () => {

      if (megaMenu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }

    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }


  /* =======================================================
     CLOSE MENU WHEN A NAVIGATION LINK IS CLICKED
     ======================================================= */

  if (megaMenu) {

    const menuLinks = megaMenu.querySelectorAll("a");

    menuLinks.forEach(link => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });

  }


  /* =======================================================
     ESCAPE KEY CLOSES MENU
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* =======================================================
     PRODUCT DATA
     ======================================================= */

  const products = [

    {
      name: "Okafor Crop Protection",
      category: "Crop Protection",
      crop: "Multiple Crops",
      description:
        "Crop protection solutions for weed, pest and disease management."
    },

    {
      name: "IDEGRO Watermelon",
      category: "Seeds",
      crop: "Watermelon",
      description:
        "Vegetable seed solution for watermelon production."
    },

    {
      name: "IDEGRO Cucumber",
      category: "Seeds",
      crop: "Cucumber",
      description:
        "Vegetable seed solution for cucumber production."
    },

    {
      name: "IDEGRO Tomato",
      category: "Seeds",
      crop: "Tomato",
      description:
        "Vegetable seed solution for tomato production."
    },

    {
      name: "IDEGRO Pepper",
      category: "Seeds",
      crop: "Pepper",
      description:
        "Vegetable seed solution for pepper production."
    },

    {
      name: "IDEGRO Cabbage",
      category: "Seeds",
      crop: "Cabbage",
      description:
        "Vegetable seed solution for cabbage production."
    },

    {
      name: "DUGROW Corn",
      category: "Seeds",
      crop: "Corn",
      description:
        "Field seed solution for corn production."
    },

    {
      name: "DUGROW Soybean",
      category: "Seeds",
      crop: "Soybean",
      description:
        "Field seed solution for soybean production."
    },

    {
      name: "DUGROW Groundnut",
      category: "Seeds",
      crop: "Groundnut",
      description:
        "Field seed solution for groundnut production."
    },

    {
      name: "DUGROW Rice",
      category: "Seeds",
      crop: "Rice",
      description:
        "Field seed solution for rice production."
    },

    {
      name: "DUGROW Wheat",
      category: "Seeds",
      crop: "Wheat",
      description:
        "Field seed solution for wheat production."
    },

    {
      name: "Poultry Respiratory Care",
      category: "Animal Health",
      crop: "Poultry",
      description:
        "Solutions supporting poultry affected by respiratory problems."
    },

    {
      name: "Poultry Coccidiosis Care",
      category: "Animal Health",
      crop: "Poultry",
      description:
        "Solutions supporting poultry health and coccidiosis management."
    },

    {
      name: "Poultry Parasite Care",
      category: "Animal Health",
      crop: "Poultry",
      description:
        "Solutions for worms and parasites in poultry production."
    },

    {
      name: "Poultry Heat Stress Support",
      category: "Animal Health",
      crop: "Poultry",
      description:
        "Support solutions for heat stress and dehydration."
    },

    {
      name: "Swine Respiratory Care",
      category: "Animal Health",
      crop: "Swine",
      description:
        "Solutions supporting respiratory health in pigs."
    },

    {
      name: "Swine Piglet Care",
      category: "Animal Health",
      crop: "Swine",
      description:
        "Solutions supporting piglet and grower health."
    },

    {
      name: "Swine Parasite Care",
      category: "Animal Health",
      crop: "Swine",
      description:
        "Solutions for worms and parasites in swine production."
    }

  ];


  /* =======================================================
     PRODUCT ELEMENTS
     ======================================================= */

  const productGrid = document.getElementById("productGrid");
  const productSearch = document.getElementById("productSearch");
  const productFilter = document.getElementById("productFilter");


  /* =======================================================
     RENDER PRODUCTS
     ======================================================= */

  function renderProducts(list) {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (list.length === 0) {

      productGrid.innerHTML = `
        <div class="product-empty">
          <h3>No products found.</h3>
          <p>
            Try another crop, problem or product category.
          </p>
        </div>
      `;

      return;
    }


    list.forEach(product => {

      const card = document.createElement("article");

      card.className = "product-card";

      card.innerHTML = `
        <div>

          <small>
            ${product.category}
          </small>

          <h3>
            ${product.name}
          </h3>

          <p>
            <strong>${product.crop}</strong>
          </p>

          <p>
            ${product.description}
          </p>

        </div>

        <a href="#dealer">
          Find a Dealer →
        </a>
      `;

      productGrid.appendChild(card);

    });

  }


  /* =======================================================
     FILTER PRODUCTS
     ======================================================= */

  function filterProducts() {

    const searchTerm =
      productSearch
        ? productSearch.value.toLowerCase().trim()
        : "";

    const category =
      productFilter
        ? productFilter.value
        : "all";


    const filtered = products.filter(product => {

      const matchesCategory =
        category === "all" ||
        product.category === category;


      const searchableText = `
        ${product.name}
        ${product.category}
        ${product.crop}
        ${product.description}
      `.toLowerCase();


      const matchesSearch =
        searchableText.includes(searchTerm);


      return matchesCategory && matchesSearch;

    });


    renderProducts(filtered);

  }


  if (productSearch) {
    productSearch.addEventListener("input", filterProducts);
  }

  if (productFilter) {
    productFilter.addEventListener("change", filterProducts);
  }


  /* =======================================================
     INITIAL PRODUCT DISPLAY
     ======================================================= */

  renderProducts(products);


  /* =======================================================
     SMOOTH SCROLL FOR INTERNAL LINKS
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     ACTIVE DEALER BUTTON VISIBILITY
     ======================================================= */

  const dealerButton = document.querySelector(".dealer-quick");

  function updateDealerButton() {

    if (!dealerButton) return;

    if (window.scrollY > 250) {
      dealerButton.classList.add("visible");
    } else {
      dealerButton.classList.remove("visible");
    }

  }

  window.addEventListener("scroll", updateDealerButton, {
    passive: true
  });

  updateDealerButton();


  /* =======================================================
     REVEAL ANIMATION
     ======================================================= */

  const revealItems = document.querySelectorAll(
    ".solution-card, .crop-card, .product-card, .insight-grid article"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("revealed");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    revealItems.forEach(item => {
      observer.observe(item);
    });

  }

});

Now you have the three matching files

Replace these three files only inside:

"cg-okafor-company → okafor-agriscience"

- "index.html"
- "style.css"
- "script.js"

Keep "okafor-logo.png".

Then commit/publish the changes and open:

"/cg-okafor-company/okafor-agriscience/"

One important point: the product names in "script.js" are placeholder catalogue entries, not claims that those exact products are currently commercially available in Nigeria. As you give me the real Okafor products, we should replace those entries with the actual products.
