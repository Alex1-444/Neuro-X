import { homedata } from "/JAVASCRIPT/DATAHOME/dataHome.js"; 
import { getGuardados, toggleGuardar, toggleLike, getListas } from "/JAVASCRIPT/CORE/storage.js"; 
import { activarEventosGuardado } from "/JAVASCRIPT/eventsBiblioteca.js";
import { renderCards, renderIcons, animarEntrada, initCarousel } from "/JAVASCRIPT/uiBiblioteca.js";
import { crearCard } from "/JAVASCRIPT/cardsBiblioteca.js";

const containerCards = document.getElementById("id-cards");
const tituloReciente = document.querySelector(".h2-cards");
const contadorSpan = document.getElementById("sesiones-count");

// NUEVA FUNCIÓN: Obtener todos los IDs guardados en cualquier lista
function obtenerTodosLosGuardados() {
    const listas = getListas();
    const todosLosIds = new Set();

    Object.values(listas).forEach(idsEnLista => {
        idsEnLista.forEach(id => todosLosIds.add(id));
    });

    return Array.from(todosLosIds);
}

// DEFINIMOS la función primero
const renderizarTodo = () => {
    const todosLosIds = obtenerTodosLosGuardados(); // CAMBIO
    const todosLosDatos = [...(homedata || [])];

    // Filtramos items que estén en CUALQUIER lista
    const sesionesFiltradas = todosLosDatos.filter(item => 
        item && item.id && todosLosIds.includes(String(item.id))
    );

    // NUEVO: Tomar solo las últimas 10
    const ultimas10 = sesionesFiltradas.slice(-10);

    if (contadorSpan) {
        const total = ultimas10.length;
        const textoSesiones = total === 1 ? "sesión guardada" : "sesiónes guardadas";
        contadorSpan.textContent = `${total} ${textoSesiones}`
    };

    if (ultimas10.length > 0) {
        if (tituloReciente) tituloReciente.style.display = "block";

        renderCards(containerCards, ultimas10, crearCard);
        initCarousel(containerCards);
    } else {
        if (tituloReciente) tituloReciente.style.display = "none";

        containerCards.innerHTML = `
            <div class="empty-state">
                <i data-lucide="bookmark-x"></i>
                <p>Tu biblioteca está vacía. Guarda sesiones.</p>

                <button class="btn-descubre"> Descubre sesiónes
                    <i data-lucide="arrow-right"></i>
                </button>
            </div>
        `;
    }
    renderizarListas();
    renderIcons();
};

const renderizarListas = () => {
    const listas = getListas();
    const todosLosDatos = [...(homedata || [])];

    let htmlListas = "";

    Object.entries(listas).forEach(([nombreLista, idsEnLista]) => {
        const itemsEnLista = todosLosDatos.filter(item =>
            item && item.id && idsEnLista.includes(String(item.id))
        );
        
        if (itemsEnLista.length > 0) {
            // NUEVO: Obtener imagen del último item
            const ultimoItem = itemsEnLista[itemsEnLista.length - 1];
            const imagenFondo = ultimoItem?.imagenFondo || "";

            htmlListas += `
                <div class="contenedor-lista-card">
                    <div class="lista-card" style="background-image: url('${imagenFondo}')">
                        <div class="overlay-lista"></div>

                        <div class="contenido-lista">
                            <h3 class="nombre-lista-card">${nombreLista}</h3>
                            <p class="contador-lista">${itemsEnLista.length} ${itemsEnLista.length === 1 ? 'sesión guardada' : 'sesiónes guardadas'}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    const containerListasCard = document.getElementById("container-listas");
    if (containerListasCard) {
        containerListasCard.innerHTML = `
            <div class="seccion-listas-grid">
                ${htmlListas}
            </div>
        `;
    }
}

// EJECUTAMOS cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    renderizarTodo();
    animarEntrada();
    
    activarEventosGuardado(containerCards, toggleGuardar, toggleLike, renderizarTodo);
});