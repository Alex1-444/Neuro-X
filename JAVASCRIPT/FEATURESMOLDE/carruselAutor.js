// BOTONES DE LIBROS DEL AUTOR (BARRA LATERAL)

export function initCarruselAutor() {
    const carrusel = document.querySelector(".imagenes-container");
    const btnPrev = document.querySelector(".prev2");
    const btnNext = document.querySelector(".next2");

    // Validación para evitar errores
    if (!carrusel || !btnPrev || !btnNext) return;

    // 👉 Scroll dinámico (se calcula en cada click)
    btnNext.addEventListener("click", () => {
        carrusel.scrollBy({
            left: carrusel.clientWidth,
            behavior: "smooth"
        });
    });

    btnPrev.addEventListener("click", () => {
        carrusel.scrollBy({
            left: -carrusel.clientWidth,
            behavior: "smooth"
        });
    });
}
