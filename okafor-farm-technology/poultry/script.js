document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL STATE
    ====================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       DESKTOP DROPDOWNS
    ====================================================== */

    const dropdownButtons =
        document.querySelectorAll(".nav-dropdown-button");

    dropdownButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            const dropdown =
                button.closest(".nav-dropdown");

            if (!dropdown) {
                return;
            }

            const isOpen =
                dropdown.classList.contains("open");

            document
                .querySelectorAll(".nav-dropdown.open")
                .forEach((item) => {

                    item.classList.remove("open");

                    const itemButton =
                        item.querySelector(
                            ".nav-dropdown-button"
                        );

                    if (itemButton) {
                        itemButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                });

            if (!isOpen) {

                dropdown.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =====================================================
       CLOSE DESKTOP DROPDOWNS WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (
            !event.target.closest(".nav-dropdown")
        ) {

            document
                .querySelectorAll(".nav-dropdown.open")
                .forEach((dropdown) => {

                    dropdown.classList.remove("open");

                    const button =
                        dropdown.querySelector(
                            ".nav-dropdown-button"
                        );

                    if (button) {
                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                });

        }

    });


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const mobileMenuButton =
        document.querySelector(
            ".mobile-menu-button"
        );

    if (mobileMenuButton && header) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    header.classList.toggle(
                        "mobile-open"
                    );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }


    /* =====================================================
       MOBILE SUBMENUS
    ====================================================== */

    const mobileNavGroups =
        document.querySelectorAll(
            ".mobile-nav-group"
        );

    mobileNavGroups.forEach((group) => {

        const button =
            group.querySelector("button");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            const isOpen =
                group.classList.contains("open");

            mobileNavGroups.forEach((otherGroup) => {

                otherGroup.classList.remove("open");

            });

            if (!isOpen) {

                group.classList.add("open");

            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ====================================================== */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-nav a"
        );

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (header) {
                header.classList.remove(
                    "mobile-open"
                );
            }

            if (mobileMenuButton) {
                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =====================================================
       EXPAND / COLLAPSE "MORE" CONTENT
    ====================================================== */

    const expandButtons =
        document.querySelectorAll(
            ".expand-button"
        );

    expandButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const content =
                button.nextElementSibling;

            if (
                !content ||
                !content.classList.contains(
                    "expand-content"
                )
            ) {
                return;
            }

            const isExpanded =
                button.getAttribute(
                    "aria-expanded"
                ) === "true";


            /* ---------------------------------------------
               Close other cards in the same group
            ---------------------------------------------- */

            const parent =
                button.closest(
                    ".design-card, .solution-row, .services-content"
                );

            if (parent) {

                const otherButtons =
                    parent.parentElement
                        ?.querySelectorAll(
                            ".expand-button"
                        );

                if (otherButtons) {

                    otherButtons.forEach(
                        (otherButton) => {

                            if (
                                otherButton !== button
                            ) {

                                otherButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                                const otherContent =
                                    otherButton.nextElementSibling;

                                if (
                                    otherContent &&
                                    otherContent.classList.contains(
                                        "expand-content"
                                    )
                                ) {

                                    otherContent.classList.remove(
                                        "open"
                                    );

                                }

                            }

                        }
                    );

                }

            }


            /* ---------------------------------------------
               Toggle selected content
            ---------------------------------------------- */

            button.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            content.classList.toggle(
                "open",
                !isExpanded
            );

        });

    });


    /* =====================================================
       CLOSE MOBILE NAV WHEN RESIZING TO DESKTOP
    ====================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 700 &&
            header
        ) {

            header.classList.remove(
                "mobile-open"
            );

            mobileNavGroups.forEach((group) => {
                group.classList.remove("open");
            });

            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            /* Close desktop dropdowns */

            document
                .querySelectorAll(
                    ".nav-dropdown.open"
                )
                .forEach((dropdown) => {

                    dropdown.classList.remove(
                        "open"
                    );

                    const button =
                        dropdown.querySelector(
                            ".nav-dropdown-button"
                        );

                    if (button) {

                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                });


            /* Close mobile menu */

            if (header) {

                header.classList.remove(
                    "mobile-open"
                );

            }

            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});
