"use strict";
const navbar = `<nav class="navbar navbar-expand-lg" id="main-nav">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html"><img src="imgs/Little Bird Toys Logo (1).png" class="birdie" style="border-radius: 100%;"
                        alt="al1"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
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
            </div>
        </nav>`
function backToTop() {
    console.log("here")
}
function setMainBackground() {
    const main = document.querySelector('main');
    const now = new Date();
    const hours = now.getHours(); // Get current hour (0-23)

    // Define time ranges
    if (hours >= 6 && hours < 12) { // Morning: 6:00 AM - 11:59 AM
        main.style.background = 'linear-gradient(135deg, #ff2a44 0%, #ffd700 100%)'; // heroRed, infinityGold
    } else if (hours >= 12 && hours < 18) { // Afternoon: 12:00 PM - 5:59 PM
        main.style.background = 'linear-gradient(135deg, #1e90ff 0%, #00e6e6 100%)'; // cosmicBlue
    } else if (hours >= 18 && hours < 24) { // Evening: 6:00 PM - 11:59 PM
        main.style.background = 'linear-gradient(135deg, #6a0dad 0%, #2a1b3d 100%)'; // vibrantPurple
    } else { // Night: 12:00 AM - 5:59 AM
        main.style.background = 'linear-gradient(135deg, #0d1b2a 0%, #0a0a23 100%)'; // nebulaDark
    }
}
function activate() {
    document.addEventListener('DOMContentLoaded', setMainBackground);
    setInterval(setMainBackground, 60000);
    document.querySelector("main").addEventListener("scroll", () => {
        console.log("potato")
    })
    document.querySelector("header").insertAdjacentHTML("afterbegin", navbar)
    let liList = Array.from(document.querySelectorAll(".dropdown-item"))
    liList.forEach(e => {
        let href = Array.from(document.body.classList).at(-1);
        if (e.href.split("/").at(-1).includes(href + ".html")) e.classList.add("active");
    })
}
window.onload = activate()