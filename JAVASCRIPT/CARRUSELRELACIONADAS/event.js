export function initCarruselSugerencias() {
    document.querySelectorAll(".bx--wrapper").forEach(slider => {
        const container = slider.querySelector(".bx--wrapper2");
        const prev = slider.querySelector(".prev");
        const next = slider.querySelector(".next");

        if (container && prev && next) {
            const scrollAmount = container.clientWidth;

            prev.addEventListener("click", () => {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth"
                });
            });

            next.addEventListener("click", () => {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                });
            });
        }
    });
}