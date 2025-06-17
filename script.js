"use strict";
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
    console.log("here")
    document.addEventListener('DOMContentLoaded', setMainBackground);
    setInterval(setMainBackground, 60000);
    document.querySelector("main").addEventListener("scroll", () => {
        console.log("potato")
    })
}
activate()