import { sugerenciasPorTema } from "/JAVASCRIPT/CARRUSELRELACIONADAS/data.js"
import { crearCardSugerencia } from "/JAVASCRIPT/CARRUSELRELACIONADAS/cards.js";
import { initCarruselSugerencias } from "/JAVASCRIPT/CARRUSELRELACIONADAS/event.js";
import { initIcons } from "/JAVASCRIPT/UIHOME/icons.js";

export function cargarSugerencias(tema) {
    const container = document.getElementById("carousel-content");

    const temaNormalizado = tema
        .toLowerCase()
        .replace(/\s+/g, "-");

    const data = sugerenciasPorTema[temaNormalizado];

    if (!container) {
        console.error("No se encontró el contenedor");
        return;
    }
    
    if (!data || !data.length) {
        console.warn(`No hay datos para el tema: ${temaNormalizado}`);
        return;
    }

    container.innerHTML = data
        .map(crearCardSugerencia)
        .join("");
        
    initCarruselSugerencias();
    initIcons();
}

