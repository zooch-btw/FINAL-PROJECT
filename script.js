"use strict";
const navbar = `<nav class="navbar navbar-expand" id="main-nav">
            <div class="container-fluid">
                <a class="navbar-brand flex-shrink-0" href="index.html"><img src="imgs/Little Bird Toys Logo (1).png" class="birdie""
                        alt="al1"></a>
                    <ul class="navbar-nav d-flex justify-content-center">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Menu
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="about.html" aria-current="page">About Us</a>
                                </li>
                                <li><a class="dropdown-item" href="products.html">Product Gallery</a></li>
                                <li><a class="dropdown-item" href="contact.html">Contact
                                        Us!</a></li>
                                <li><a class="dropdown-item" href="index.html">Restart the experience!</a></li>
                            </ul>
                        </li>
                    </ul>
            </div>
        </nav>`;
const footer = `<div class="container">
            <p class="mb-0">Created by Salvatore, Remy, and Liz | © 2025</p>
        </div>`;
const toTop = `
<div class="toTop d-none">Top</div>
`;
let cartIn = true;
function backToTop() {
  const toTop = document.querySelector(".toTop");
  const main = document.querySelector("main");
  if (main.scrollTop >= 150) toTop.classList.remove("d-none");
  else toTop.classList.add("d-none");
}
function setMainBackground() {
  const main = document.querySelector("main");
  const now = new Date();
  const hours = now.getHours(); // Get current hour (0-23)

  // Define time ranges
  if (hours >= 6 && hours < 12) {
    // Morning: 6:00 AM - 11:59 AM
    // main.style.background = "linear-gradient(135deg, #ff2a44 0%, #ffd700 100%)"; // heroRed, infinityGold
    main.classList.add("morning");
    main.classList.remove("afternoon", "evening", "night");
  } else if (hours >= 12 && hours < 18) {
    // Afternoon: 12:00 PM - 5:59 PM
    // main.style.background = "linear-gradient(135deg, #1e90ff 0%, #00e6e6 100%)"; // cosmicBlue
    main.classList.add("afternoon");
    main.classList.remove("moring", "evening", "night");
  } else if (hours >= 18 && hours < 24) {
    // Evening: 6:00 PM - 11:59 PM
    // main.style.background = "linear-gradient(135deg, #6a0dad 0%, #2a1b3d 100%)"; // vibrantPurple
    main.classList.add("evening");
    main.classList.remove("afternoon", "morning", "night");
  } else {
    // Night: 12:00 AM - 5:59 AM
    // main.style.background = "linear-gradient(135deg, #0d1b2a 0%, #0a0a23 100%)"; // nebulaDark
    main.classList.add("night");
    main.classList.remove("afternoon", "evening", "morning");
  }
}
function equalHeight(arr) {
  const values = [];
  arr.forEach((e) => {
    e.setAttribute("style", "height: auto;");
    values.push(e.offsetHeight);
  });
  const largest = Math.max(...values);
  arr.forEach((e) => e.setAttribute("style", `height: ${largest}px`));
}
function activate() {
  document.addEventListener("DOMContentLoaded", setMainBackground);
  setInterval(setMainBackground, 60000);
  if (!document.body.classList.contains("index")) {
    document.querySelector("main").addEventListener("scroll", backToTop);
    document.querySelector("header").insertAdjacentHTML("afterbegin", navbar);
    document.querySelector("footer").insertAdjacentHTML("afterbegin", footer);
    let liList = Array.from(document.querySelectorAll(".dropdown-item"));
    liList.forEach((e) => {
      let href = Array.from(document.body.classList).at(-1);
      if (
        e.href
          .split("/")
          .at(-1)
          .includes(href + ".html")
      )
        e.classList.add("active");
    });
    document.body.insertAdjacentHTML("beforeend", toTop);
    document.querySelector(".toTop").addEventListener("click", () => {
      document.querySelector("main").scrollTo(0, 0);
    });
    if (document.body.classList.contains("about")) {
      if (window.innerWidth >= 992)
        equalHeight(Array.from(document.querySelectorAll("section .text-box")));
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 992)
          equalHeight(
            Array.from(document.querySelectorAll("section .text-box"))
          );
        else {
          Array.from(document.querySelectorAll("section .text-box")).forEach(
            (e) => e.setAttribute("style", "height: auto")
          );
        }
      });
    }
    if (document.body.classList.contains("products")) {
      document.querySelector(".tab").addEventListener("click", () => {
        const cart = document.querySelector(".cart");
        if (cartIn == true) {
          cart.classList.add("cartOut");
          cart.classList.remove("cartIn");
        } else {
          cart.classList.add("cartIn");
          cart.classList.remove("cartOut");
        }
        cartIn = !cartIn;
      });
    }
  }
}
window.onload = activate();
