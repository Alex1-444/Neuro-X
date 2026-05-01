// CARRUSEL HERO

export function initCarruselPrincipal() {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    const carrusell = document.querySelector(".carrusell");
    const prev = document.querySelector(".arrow.left");
    const next = document.querySelector(".arrow.right");

    if (!slides.length || !dotsContainer || !carrusell || !prev || !next) return;

    let index = 0;
    let interval = null;

    function showSlide(i) {
        slides.forEach((slide, idx) => {
            const isActive = idx === i;

            slide.classList.toggle("active", isActive);

            const text = slide.querySelector(".slider-text");

            if (!text) return;

            if (isActive) {
                text.classList.remove("collapse");

                text.style.transition = "none";
                text.offsetHeight;

                text.style.transition = "opacity 1s ease, max-height 2s ease";

                setTimeout(() => {
                    text.classList.add("collapse");
                }, 13000); 
            } else {
                text.classList.add("collapse");
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === i);
        });
    }

    function startInterval() {
        clearInterval(interval);
        interval = setInterval(() => {
            index = (index + 1) % slides.length;
            showSlide(index);
        }, 20000);
    }

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            index = i;
            showSlide(index);
            startInterval();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
        startInterval();
    });

    next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
        startInterval();
    });

    showSlide(index);
    startInterval();
}