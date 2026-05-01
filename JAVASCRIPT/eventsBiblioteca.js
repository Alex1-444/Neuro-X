// ESCUCHA EL CLICK DEL BOTON GUARDADO DE LA CARD

import { toggleGuardar } from "/JAVASCRIPT/CORE/storage.js";
import { actualizarBoton } from "/JAVASCRIPT/uiBiblioteca.js";

export function activarEventosGuardado(container) {
    container.addEventListener("click", (e) => {
        const btn = e.target.closest(".icon");
        if (!btn) return;

        const card = btn.closest(".card");
        const id = card.dataset.id;

        toggleGuardar(id);        
        actualizarBoton(btn, id); 
    });
}