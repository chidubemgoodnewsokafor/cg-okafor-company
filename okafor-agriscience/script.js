/* =========================================================
   OKAFOR AGRISCIENCE
   Marketing Website
   ========================================================= */

:root {
  --yellow: #ffe500;
  --teal: #01998e;
  --dark-teal: #074540;
  --red: #99010c;
  --dark-red: #360005;

  --white: #ffffff;
  --black: #111111;
  --soft: #f4f7f6;
  --soft-teal: #e8f2f0;
  --line: #dce6e3;

  --max-width: 1280px;
  --radius: 28px;
}


/* =========================================================
   RESET
   ========================================================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  width: 100%;
  overflow-x: hidden;
}

body {
  width: 100%;
  overflow-x: hidden;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  color: var(--black);
  background: var(--white);

  line-height: 1.5;
}

img {
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select {
  font: inherit;
}


/* =========================================================
   GENERAL
   ========================================================= */

.container {
  width: min(var(--max-width), 90%);
  margin: 0 auto;
}

.section {
  padding: 110px 0;
}

.eyebrow {
  margin-bottom: 14px;

  color: var(--teal);

  font-size: 12px;
  font-weight: 800;

  letter-spacing: .16em;
  text-transform: uppercase;
}

h1,
h2,
h3,
h4 {
  line-height: 1.08;
}

h2 {
  color: var(--dark-teal);

  font-size: clamp(38px, 5vw, 68px);

  letter-spacing: -.045em;
}

.section-intro {
  max-width: 650px;

  margin-top: 20px;

  color: #526662;

  font-size: 18px;
  line-height: 1.7;
}

.text-link {
  display: inline-flex;

  align-items: center;
  gap: 10px;

  margin-top: 25px;

  color: var(--dark-teal);

  font-size: 14px;
  font-weight: 800;
}

.text-link span {
  color: var(--teal);

  font-size: 20px;

  transition: transform .2s ease;
}

.text-link:hover span {
  transform: translateX(5px);
}


/* =========================================================
   TOP UTILITY BAR
   ========================================================= */

.top-bar {
  position: relative;
  z-index: 50;

  width: 100%;

  background: var(--dark-teal);

  color: var(--white);
}

.top-bar-inner {
  width: min(var(--max-width), 90%);
  min-height: 42px;

  margin: 0 auto;

  display: flex;

  align-items: center;
  justify-content: flex-end;

  gap: 25px;
}

.top-bar a {
  color: rgba(255,255,255,.88);

  font-size: 11px;
  font-weight: 700;

  letter-spacing: .06em;

  transition: color .2s ease;
}

.top-bar a:hover {
  color: var(--yellow);
}


/* =========================================================
   MAIN HEADER
   ========================================================= */

.site-header {
  position: relative;
  z-index: 40;

  width: 100%;

  background: var(--white);

  border-bottom: 1px solid rgba(7,69,64,.08);

  box-shadow:
    0 4px 18px rgba(7,69,64,.05);
}

.header-inner {
  width: min(var(--max-width), 92%);
  min-height: 88px;

  margin: 0 auto;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 35px;
}


/* =========================================================
   LOGO
   ========================================================= */

.site-logo {
  display: flex;

  align-items: center;

  flex-shrink: 0;
}

.site-logo img {
  width: 155px;
  height: auto;

  display: block;
}


/* =========================================================
   MAIN NAVIGATION
   ========================================================= */

.main-menu {
  display: flex;

  align-items: center;

  gap: clamp(20px, 2.5vw, 38px);

  margin-left: auto;
}

.main-menu a {
  position: relative;

  color: var(--dark-teal);

  font-size: 13px;
  font-weight: 700;

  white-space: nowrap;
}

.main-menu a::after {
  content: "";

  position: absolute;

  left: 0;
  bottom: -8px;

  width: 0;
  height: 2px;

  background: var(--teal);

  transition: width .25s ease;
}

.main-menu a:hover::after,
.main-menu a.active::after {
  width: 100%;
}


/* =========================================================
   FIND A DEALER
   ========================================================= */

.dealer-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 44px;

  padding: 0 20px;

  border-radius: 30px;

  background: var(--yellow);

  color: var(--dark-teal);

  font-size: 12px;
  font-weight: 800;

  white-space: nowrap;

  transition:
    transform .2s ease,
    background .2s ease;
}

.dealer-button:hover {
  transform: translateY(-2px);

  background: #f3d900;
}


/* =========================================================
   MOBILE MENU BUTTON
   ========================================================= */

.mobile-menu-button {
  display: none;

  width: 46px;
  height: 46px;

  border: 0;

  border-radius: 50%;

  background: var(--dark-teal);

  color: var(--white);

  cursor: pointer;
}

.mobile-menu-button span {
  display: block;

  width: 19px;
  height: 2px;

  margin: 4px auto;

  background: currentColor;
}


/* =========================================================
   HERO
   ========================================================= */

.hero {
  position: relative;

  min-height: 650px;
  height: 76vh;
  max-height: 820px;

  overflow: hidden;

  background: var(--dark-teal);
}

.hero-image {
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  background-image: url("hero-agriscience.jpg");

  background-size: cover;
  background-position: center;

  background-repeat: no-repeat;
}

.hero-image::after {
  content: "";

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(0,0,0,.56) 0%,
      rgba(0,0,0,.28) 45%,
      rgba(0,0,0,.08) 100%
    );
}

.hero-content {
  position: relative;
  z-index: 2;

  width: min(var(--max-width), 90%);

  height: 100%;

  margin: 0 auto;

  display: flex;

  align-items: center;
}

.hero-copy {
  max-width: 650px;

  padding-top: 30px;
}

.hero-copy .eyebrow {
  color: var(--yellow);
}

.hero-copy h1 {
  color: var(--white);

  font-size: clamp(48px, 7vw, 92px);

  letter-spacing: -.055em;
}

.hero-copy p {
  max-width: 540px;

  margin-top: 24px;

  color: rgba(255,255,255,.9);

  font-size: clamp(17px, 2vw, 21px);

  line-height: 1.6;
}

.hero-actions {
  display: flex;

  align-items: center;

  gap: 15px;

  margin-top: 32px;
}

.hero-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 50px;

  padding: 0 25px;

  border-radius: 30px;

  background: var(--yellow);

  color: var(--dark-teal);

  font-size: 13px;
  font-weight: 800;

  transition:
    transform .2s ease,
    background .2s ease;
}

.hero-button:hover {
  transform: translateY(-3px);

  background: var(--white);
}

.hero-button-outline {
  background: rgba(255,255,255,.08);

  border: 1px solid rgba(255,255,255,.65);

  color: var(--white);
}

.hero-button-outline:hover {
  background: var(--white);

  color: var(--dark-teal);
}


/* =========================================================
   HERO DEALER LINK
   ========================================================= */

.hero-dealer {
  position: absolute;

  right: 5%;
  bottom: 35px;

  z-index: 4;

  display: inline-flex;

  align-items: center;

  padding: 12px 19px;

  border-radius: 30px;

  background: rgba(255,255,255,.94);

  color: var(--dark-teal);

  font-size: 12px;
  font-weight: 800;

  box-shadow:
    0 10px 30px rgba(0,0,0,.16);

  transition:
    transform .2s ease;
}

.hero-dealer:hover {
  transform: translateY(-3px);
}


/* =========================================================
   SOLUTIONS INTRO
   ========================================================= */

.solutions-intro {
  display: grid;

  grid-template-columns: .8fr 1.2fr;

  gap: 80px;

  align-items: end;
}

.solutions-intro h2 {
  max-width: 500px;
}

.solutions-intro-copy {
  max-width: 620px;
}


/* =========================================================
   SOLUTION CARDS
   ========================================================= */

.solution-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;

  margin-top: 55px;
}

.solution-card {
  position: relative;

  min-height: 390px;

  padding: 30px;

  overflow: hidden;

  border-radius: 30px;

  background: var(--soft);

  box-shadow:
    0 12px 35px rgba(7,69,64,.06);

  transition:
    transform .3s ease,
    box-shadow .3s ease;
}

.solution-card:hover {
  transform: translateY(-7px);

  box-shadow:
    0 22px 50px rgba(7,69,64,.13);
}

.solution-number {
  color: var(--teal);

  font-size: 11px;
  font-weight: 800;

  letter-spacing: .12em;
}

.solution-card h3 {
  margin-top: 100px;

  color: var(--dark-teal);

  font-size: 26px;

  letter-spacing: -.03em;
}

.solution-card p {
  margin-top: 15px;

  color: #61716e;

  font-size: 14px;

  line-height: 1.65;
}

.solution-icon {
  position: absolute;

  right: -35px;
  bottom: -40px;

  width: 170px;
  height: 170px;

  border-radius: 50%;

  background: var(--soft-teal);

  opacity: .9;
}

.solution-card:nth-child(2) .solution-icon {
  background: rgba(255,229,0,.45);
}

.solution-card:nth-child(3) .solution-icon {
  background: rgba(1,153,142,.18);
}

.solution-card:nth-child(4) .solution-icon {
  background: rgba(153,1,12,.12);
}


/* =========================================================
   FEATURED PRODUCTS
   ========================================================= */

.products-section {
  background: var(--soft);
}

.products-heading {
  display: flex;

  align-items: end;
  justify-content: space-between;

  gap: 30px;
}

.products-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 24px;

  margin-top: 55px;
}

.product-card {
  overflow: hidden;

  border-radius: 30px;

  background: var(--white);

  box-shadow:
    0 10px 35px rgba(7,69,64,.07);

  transition:
    transform .3s ease,
    box-shadow .3s ease;
}

.product-card:hover {
  transform: translateY(-7px);

  box-shadow:
    0 22px 55px rgba(7,69,64,.13);
}

.product-image {
  position: relative;

  height: 300px;

  overflow: hidden;

  background: var(--soft-teal);
}

.product-image img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform .5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.04);
}

.product-category {
  position: absolute;

  left: 20px;
  top: 20px;

  padding: 7px 12px;

  border-radius: 20px;

  background: var(--white);

  color: var(--teal);

  font-size: 10px;
  font-weight: 800;

  letter-spacing: .08em;

  text-transform: uppercase;
}

.product-info {
  padding: 25px;
}

.product-info h3 {
  color: var(--dark-teal);

  font-size: 23px;
}

.product-info p {
  margin-top: 10px;

  color: #687873;

  font-size: 14px;
}


/* =========================================================
   SCIENCE FEATURE
   ========================================================= */

.science-section {
  background: var(--dark-teal);

  color: var(--white);
}

.science-layout {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 80px;

  align-items: center;
}

.science-image {
  min-height: 520px;

  overflow: hidden;

  border-radius: 40px 40px 40px 120px;

  background: var(--teal);
}

.science-image img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
}

.science-copy .eyebrow {
  color: var(--yellow);
}

.science-copy h2 {
  color: var(--white);
}

.science-copy p:not(.eyebrow) {
  margin-top: 25px;

  max-width: 550px;

  color: rgba(255,255,255,.75);

  font-size: 17px;

  line-height: 1.7;
}

.science-button {
  margin-top: 30px;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 14px 23px;

  border-radius: 30px;

  background: var(--yellow);

  color: var(--dark-teal);

  font-size: 13px;
  font-weight: 800;
}


/* =========================================================
   FARMER CTA
   ========================================================= */

.farmer-section {
  padding: 100px 0;
}

.farmer-box {
  position: relative;

  min-height: 420px;

  overflow: hidden;

  display: flex;

  align-items: center;

  padding: 70px;

  border-radius: 40px;

  background: var(--yellow);
}

.farmer-copy {
  position: relative;
  z-index: 2;

  max-width: 600px;
}

.farmer-copy h2 {
  color: var(--dark-teal);
}

.farmer-copy p {
  margin-top: 20px;

  max-width: 510px;

  color: #365c57;

  font-size: 17px;
}

.farmer-button {
  display: inline-flex;

  margin-top: 28px;

  padding: 14px 24px;

  border-radius: 30px;

  background: var(--dark-teal);

  color: var(--white);

  font-size: 13px;
  font-weight: 800;
}

.farmer-circle {
  position: absolute;

  right: -120px;
  top: -140px;

  width: 520px;
  height: 520px;

  border-radius: 50%;

  background: rgba(255,255,255,.35);
}


/* =========================================================
   INSIGHTS
   ========================================================= */

.insights-heading {
  display: flex;

  align-items: end;
  justify-content: space-between;

  gap: 30px;
}

.insights-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 22px;

  margin-top: 50px;
}

.insight-card {
  overflow: hidden;

  border-radius: 28px;

  background: var(--white);

  border: 1px solid var(--line);

  transition:
    transform .3s ease,
    box-shadow .3s ease;
}

.insight-card:hover {
  transform: translateY(-6px);

  box-shadow:
    0 18px 45px rgba(7,69,64,.1);
}

.insight-image {
  height: 230px;

  background: var(--soft-teal);

  overflow: hidden;
}

.insight-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}

.insight-body {
  padding: 25px;
}

.insight-body span {
  color: var(--teal);

  font-size: 10px;
  font-weight: 800;

  letter-spacing: .12em;

  text-transform: uppercase;
}

.insight-body h3 {
  margin-top: 10px;

  color: var(--dark-teal);

  font-size: 21px;
}

.insight-body p {
  margin-top: 12px;

  color: #687873;

  font-size: 14px;
}


/* =========================================================
   DEALER CTA
   ========================================================= */

.dealer-section {
  padding: 0 0 110px;
}

.dealer-box {
  position: relative;

  overflow: hidden;

  min-height: 300px;

  display: flex;

  align-items: center;
  justify-content: center;

  text-align: center;

  padding: 60px;

  border-radius: 40px;

  background: var(--teal);
}

.dealer-box::before,
.dealer-box::after {
  content: "";

  position: absolute;

  border-radius: 50%;

  border: 1px solid rgba(255,255,255,.2);
}

.dealer-box::before {
  width: 430px;
  height: 430px;

  left: -180px;
  top: -220px;
}

.dealer-box::after {
  width: 350px;
  height: 350px;

  right: -130px;
  bottom: -220px;
}

.dealer-content {
  position: relative;

  z-index: 2;

  max-width: 650px;
}

.dealer-content h2 {
  color: var(--white);
}

.dealer-content p {
  margin-top: 18px;

  color: rgba(255,255,255,.78);

  font-size: 16px;
}

.dealer-main-button {
  display: inline-flex;

  margin-top: 27px;

  padding: 15px 28px;

  border-radius: 30px;

  background: var(--yellow);

  color: var(--dark-teal);

  font-size: 13px;
  font-weight: 800;
}


/* =========================================================
   FOOTER
   ========================================================= */

.site-footer {
  background: #031f1d;

  color: var(--white);
}

.footer-main {
  width: min(var(--max-width), 90%);

  margin: 0 auto;

  padding: 75px 0 55px;

  display: grid;

  grid-template-columns: 1.5fr repeat(3, 1fr);

  gap: 50px;
}

.footer-logo img {
  width: 155px;

  display: block;

  filter: brightness(0) invert(1);
}

.footer-brand p {
  max-width: 280px;

  margin-top: 20px;

  color: rgba(255,255,255,.62);

  font-size: 13px;

  line-height: 1.7;
}

.footer-column {
  display: flex;

  flex-direction: column;

  gap: 11px;
}

.footer-column h4 {
  margin-bottom: 10px;

  color: var(--yellow);

  font-size: 11px;
  font-weight: 800;

  letter-spacing: .12em;

  text-transform: uppercase;
}

.footer-column a {
  color: rgba(255,255,255,.65);

  font-size: 13px;

  transition: color .2s ease;
}

.footer-column a:hover {
  color: var(--white);
}


/* =========================================================
   FOOTER DEALER
   ========================================================= */

.footer-dealer {
  width: min(var(--max-width), 90%);

  margin: 0 auto;

  padding: 35px 0;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 30px;

  border-top: 1px solid rgba(255,255,255,.1);
  border-bottom: 1px solid rgba(255,255,255,.1);
}

.footer-dealer p {
  color: rgba(255,255,255,.7);

  font-size: 14px;
}

.footer-dealer a {
  display: inline-flex;

  padding: 12px 20px;

  border-radius: 25px;

  background: var(--yellow);

  color: var(--dark-teal);

  font-size: 12px;
  font-weight: 800;
}


/* =========================================================
   FOOTER BOTTOM
   ========================================================= */

.footer-bottom {
  width: min(var(--max-width), 90%);

  margin: 0 auto;

  padding: 22px 0;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  color: rgba(255,255,255,.4);

  font-size: 11px;
}


/* =========================================================
   RESPONSIVE — 1050px
   ========================================================= */

@media (max-width: 1050px) {

  .main-menu {
    gap: 18px;
  }

  .main-menu a {
    font-size: 12px;
  }

  .solution-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .science-layout {
    gap: 50px;
  }

  .footer-main {
    grid-template-columns: 1.5fr repeat(3, 1fr);
    gap: 30px;
  }

}


/* =========================================================
   RESPONSIVE — 850px
   ========================================================= */

@media (max-width: 850px) {

  .top-bar-inner {
    justify-content: center;
  }

  .header-inner {
    min-height: 76px;
  }

  .main-menu,
  .header-inner > .dealer-button {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .site-logo img {
    width: 135px;
  }


  .hero {
    height: 75svh;

    min-height: 600px;
  }

  .hero-copy {
    max-width: 600px;
  }

  .hero-copy h1 {
    font-size: clamp(45px, 11vw, 72px);
  }

  .hero-dealer {
    right: 20px;
    bottom: 25px;
  }


  .solutions-intro {
    grid-template-columns: 1fr;

    gap: 25px;
  }

  .products-grid {
    grid-template-columns: 1fr 1fr;
  }

  .science-layout {
    grid-template-columns: 1fr;
  }

  .science-image {
    min-height: 420px;
  }

  .insights-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-main {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

}


/* =========================================================
   RESPONSIVE — 600px
   ========================================================= */

@media (max-width: 600px) {

  .section {
    padding: 80px 0;
  }

  .top-bar-inner {
    min-height: 38px;
  }

  .top-bar a {
    font-size: 9px;
  }

  .header-inner {
    width: 90%;
  }

  .site-logo img {
    width: 125px;
  }


  .hero {
    min-height: 570px;
    height: 75svh;
  }

  .hero-image {
    background-position: 58% center;
  }

  .hero-image::after {
    background:
      linear-gradient(
        180deg,
        rgba(0,0,0,.2),
        rgba(0,0,0,.6)
      );
  }

  .hero-content {
    width: 88%;

    align-items: flex-end;

    padding-bottom: 105px;
  }

  .hero-copy h1 {
    font-size: clamp(43px, 13vw, 62px);
  }

  .hero-copy p {
    font-size: 15px;
  }

  .hero-actions {
    flex-direction: column;

    align-items: stretch;

    max-width: 260px;
  }

  .hero-button {
    width: 100%;
  }

  .hero-dealer {
    left: 50%;
    right: auto;

    transform: translateX(-50%);

    bottom: 20px;

    white-space: nowrap;
  }

  .hero-dealer:hover {
    transform: translateX(-50%) translateY(-2px);
  }


  .solution-grid {
    grid-template-columns: 1fr;
  }

  .solution-card {
    min-height: 340px;
  }

  .solution-card h3 {
    margin-top: 80px;
  }


  .products-heading,
  .insights-heading {
    display: block;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-image {
    height: 260px;
  }


  .science-image {
    min-height: 330px;

    border-radius: 30px 30px 30px 80px;
  }


  .farmer-box {
    min-height: 400px;

    padding: 45px 30px;
  }


  .insights-grid {
    grid-template-columns: 1fr;
  }


  .dealer-section {
    padding-bottom: 80px;
  }

  .dealer-box {
    padding: 55px 25px;
  }


  .footer-main {
    grid-template-columns: 1fr;

    gap: 35px;
  }

  .footer-brand {
    grid-column: auto;
  }

  .footer-dealer {
    align-items: flex-start;

    flex-direction: column;
  }

  .footer-bottom {
    flex-direction: column;

    align-items: flex-start;
  }

}
