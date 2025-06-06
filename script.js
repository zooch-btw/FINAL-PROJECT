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
    }
}
window.addEventListener("DOMContentLoaded", PAGE.greeting);
