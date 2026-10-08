/* =========================================================
   OKAFOR FARM TECHNOLOGY — POULTRY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       DESKTOP DROPDOWNS
    ====================================================== */

    const dropdowns = document.querySelectorAll(".nav-dropdown");

    dropdowns.forEach(function (dropdown) {

        const button = dropdown.querySelector(
            ".nav-dropdown-button"
        );

        if (!button) return;

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            dropdowns.forEach(function (otherDropdown) {

                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("open");
                }

            });

            dropdown.classList.toggle("open");

        });

    });


    /* =====================================================
       CLOSE DESKTOP DROPDOWNS
    ====================================================== */

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".nav-dropdown")) {

            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("open");
            });

        }

    });


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const mobileButton =
        document.getElementById("mobileMenuButton");

    const mobileNav =
        document.getElementById("mobileNav");

    if (mobileButton && mobileNav) {

        mobileButton.addEventListener("click", function () {

            const isOpen =
                mobileNav.classList.toggle("active");

            mobileButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =====================================================
       MOBILE SUBMENUS
    ====================================================== */

    const mobileTitles =
        document.querySelectorAll(".mobile-nav-title");

    mobileTitles.forEach(function (title) {

        title.addEventListener("click", function () {

            const submenu =
                title.nextElementSibling;

            if (!submenu) return;

            const isOpen =
                submenu.classList.toggle("active");

            const symbol =
                title.querySelector("span");

            if (symbol) {
                symbol.textContent =
                    isOpen ? "−" : "+";
            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING A LINK
    ====================================================== */

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (mobileNav) {
                mobileNav.classList.remove("active");
            }

            if (mobileButton) {
                mobileButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("open");
            });

            if (mobileNav) {
                mobileNav.classList.remove("active");
            }

            if (mobileButton) {
                mobileButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

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

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});
