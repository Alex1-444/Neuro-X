import { cambiarLibro } from "/JAVASCRIPT/FEATURESMOLDE/cambiarLibro.js";

export function initEventosLibro() {
    document.addEventListener("click", (e) => {
        const card = e.target.closest("[data-id]");
        if (!card) return;

        e.preventDefault();

        cambiarLibro(card.dataset.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}