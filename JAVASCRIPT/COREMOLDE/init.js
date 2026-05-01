import { actualizarFondoDinamico } from "/JAVASCRIPT/UIMOLDE/fondoDinamico.js";
import { initScrollHover, iniciarScrollTitle } from "/JAVASCRIPT/EVENTSMOLDE/scroll.js";
import { initTogglePanel } from "/JAVASCRIPT/EVENTSMOLDE/togglePanel.js";
import { initCarruselAutor } from "/JAVASCRIPT/FEATURESMOLDE/carruselAutor.js";
import { initIcons } from "/JAVASCRIPT/UIHOME/icons.js";
import { initEventosLibro } from "/JAVASCRIPT/EVENTSMOLDE/eventosLibro.js";
import { cambiarLibro } from "/JAVASCRIPT/FEATURESMOLDE/cambiarLibro.js";

document.addEventListener("DOMContentLoaded", () => {
    initUI();
});

export function initUI() {
    actualizarFondoDinamico();
    initScrollHover();
    iniciarScrollTitle();
    initTogglePanel();
    initCarruselAutor();
    initEventosLibro();
    initIcons();

    // 🔥 MANEJO DE URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        cambiarLibro(id);
    }
}