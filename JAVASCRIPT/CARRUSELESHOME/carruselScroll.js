// SCROLL / FLECHAS (SOLO DEL CARRUSEL 1, 2, 3, 4, etc...)
// (HERO TIENE SUS FLECHAS APARTE)

export function initCarruselScroll() {
    const containerPrincipal = document.querySelector(".box-items-principal");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    if (containerPrincipal && prev && next) {
        const scrollamount = containerPrincipal.clientWidth;

        prev.addEventListener("click", () => {
            containerPrincipal.scrollBy({
                left: -scrollamount,
                behavior: "smooth"
            });
        });

        next.addEventListener("click", () => {
            containerPrincipal.scrollBy({
                left: scrollamount,
                behavior: "smooth"
            });
        });
    }

    // BOTONES DE CARRUSEL DOS

    document.querySelectorAll(".slider-wrapper-3").forEach(slider => {
        const container = slider.querySelector(".box-items-principal-2");
        const prev = slider.querySelector(".prev-2");
        const next = slider.querySelector(".next-2");

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