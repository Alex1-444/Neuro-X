// --- IMPORTS DE DATOS Y COMPONENTES ---
import { homedata } from "/JAVASCRIPT/DATAHOME/dataHome.js";
import { crearCardHome } from "/JAVASCRIPT/CARDSHOME/cardsHome.js";
import { librosHome, librosTerror, librosCerebro, librosDesarrollo, librosBiologia, librosAstronomia } from "/JAVASCRIPT/DATAHOME/dataHomeBook.js";
import { crearCardLibro } from "/JAVASCRIPT/CARDSHOME/cardsHomeBook.js"
import { renderizar } from "/JAVASCRIPT/render.js";

// --- IMPORTS DEL CORE Y FEATURES (Nueva estructura) ---
import { getGuardados, toggleGuardar, getLikes, toggleLike } from "/JAVASCRIPT/CORE/storage.js";
import { activarEventosHome, activarEventosCards } from "/JAVASCRIPT/EVENTSHOME/events.js";
import { initSaveModal } from "/COMPONENTS/MODAL/saveModal.js"; // 🔥 Importamos el inicializador del modal

// --- IMPORTS DE UI ---
import { initLoader } from "/JAVASCRIPT/UIHOME/loader.js";
import { initIcons } from "/JAVASCRIPT/UIHOME/icons.js";
import { initProfile } from "/JAVASCRIPT/SESSION/profile.js";
import { initCarruselPrincipal } from "/JAVASCRIPT/CARRUSELESHOME/carruselHero.js";
import { initCarruselVideos } from "/JAVASCRIPT/CARRUSELESHOME/carruselVideos.js";
import { initCarruselScroll } from "/JAVASCRIPT/CARRUSELESHOME/carruselScroll.js";
import { setActiveNavButton} from "/JAVASCRIPT/CORE/navigation.js";

window.addEventListener("load", () => {
    setActiveNavButton(); // Establecer el estado activo del botón de navegación al cargar la página
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar componentes globales (Solo una vez)
    initSaveModal(); 
    initProfile();
    initLoader();
    initIcons();

    // 2. Renderizar y activar eventos de la Home
    const container = document.getElementById("cards-home");
    if (container) {
        renderHome(container);
        // Ahora activarEventosHome internamente usará la lógica separada
        activarEventosHome(container, toggleGuardar, toggleLike);
    }

    // 3. Inicializar Carruseles de la UI
    initCarruselPrincipal();
    initCarruselVideos();
    initCarruselScroll();

    // 4. Renderizar Libros/Sugerencias
    const carruseles = [
        { id: "carrusel-sugerencias", data: librosHome },
        { id: "carrusel-terror", data: librosTerror },
        { id: "carrusel-cerebro", data: librosCerebro },
        { id: "carrusel-desarrollo", data: librosDesarrollo },
        { id: "carrusel-biologia", data: librosBiologia },
        { id: "carrusel-astronomia", data: librosAstronomia }
    ];

    carruseles.forEach(carrusel => {
        const containerBook = document.getElementById(carrusel.id);
        if (containerBook) {
            renderizar(containerBook, carrusel.data, crearCardLibro);

            activarEventosCards(containerBook);
        }
    });

    // Re-inicializamos iconos por si el renderizado de libros lo requiere
    initIcons();
});

/**
 * Renderiza las cards principales de la Home
 */
function renderHome(container) {
    const target = (typeof container === "string" || !container)
        ? document.getElementById("cards-home") 
        : container;

    if (!target) return;

    const guardados = getGuardados();
    const likes = getLikes();

    target.innerHTML = homedata
        .map(item => crearCardHome(item, guardados, likes))
        .join("");
}