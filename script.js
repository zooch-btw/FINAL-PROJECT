"use strict";
//Landing Page ONLY
const DOC = {
    e: document,
    get(arg) {
        return this.e.querySelector(arg);
    },
    getALL(arg) {
        return Array.from(this.e.querySelectorAll(arg));
    }
}
const PAGE = {
    greeting() {
        const greetings = [
            { start: 5, end: 11, text: "Good morning!", cls: "morning", glow: "VictoryTxt" },
            { start: 11, end: 17, text: "Good afternoon!", cls: "afternoon", glow: "VictoryTxt" },
            { start: 17, end: 22, text: "Good evening!", cls: "evening", glow: "LossTxt" },
            { start: 22, end: 24, text: "Good night!", cls: "night", glow: "LossTxt" },
            { start: 0, end: 5, text: "Good night!", cls: "night", glow: "LossTxt" }
        ];
        const hr = new Date().getHours();
        const g = greetings.find(({ start, end }) => hr >= start && hr < end);
        document.body.classList.add(g.cls);
        const greetingEl = document.getElementById("greeting");
        greetingEl.textContent = g.text;
        greetingEl.id = g.glow;
        setTimeout(() => window.location.replace("about.html"), 3000);
    }
}
window.addEventListener("DOMContentLoaded", PAGE.greeting);
// ABOUT PAGE/OTHER PAGES
// Function to set main background based on time
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

// Run on page load
setMainBackground();