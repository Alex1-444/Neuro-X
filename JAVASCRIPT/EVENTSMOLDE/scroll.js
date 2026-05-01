// HACE QUE LA BARRA DE SCROLL DEL RESUMEN APAREZCA CON HOVER
export function initScrollHover() {
    const scrollHover = document.querySelector(".box-text");
    if (!scrollHover) return;

    let hideTimeout;

    scrollHover.addEventListener("mouseenter", () => {
        scrollHover.classList.add("show-scroll");
    });

    scrollHover.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            scrollHover.classList.remove("show-scroll");
        }, 200);
    });
}

// CUANDO SE HACE SCROLL EN LA BARRA LATERAL, EL H2 SE PEGA
export function iniciarScrollTitle() {
    const container = document.querySelector(".box-info");
    const title = container?.querySelector("h2");

    if (!container || !title) return;

    container.addEventListener("scroll", () => {
        if (container.scrollTop > 5) {
            title.classList.add("is-scrolled");
        } else {
            title.classList.remove("is-scrolled");
        }
    });
}