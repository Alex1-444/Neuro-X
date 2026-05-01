// ANIMACION DE LA CARGA

export function initLoader() {
    window.addEventListener("load", () => {
        document.body.classList.add("page-loaded");
    });
}