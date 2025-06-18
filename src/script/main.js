document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle (copied from main.js as it's a general UI element)
    document
        .getElementById("menu-toggle")
        .addEventListener("click", toggleMobileMenu);
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
}

function toggleFeatureCard(card) {
    document.querySelectorAll(".feature-card").forEach((otherCard) => {
        if (otherCard !== card) {
            otherCard.classList.remove("active");
        }
    });
    card.classList.toggle("active");
}
