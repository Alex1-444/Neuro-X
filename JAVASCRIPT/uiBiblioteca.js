
// 1. CORRECCIÓN: Importamos la función getGuardados, no la variable inexistente
import { getGuardados } from "/JAVASCRIPT/CORE/storage.js";

// ACTIVA Y DESACTIVA EL ICONO DE GUARDAR
export function actualizarBoton(elemento, id) {
    // Obtenemos la lista actualizada de IDs desde localStorage
    const guardados = getGuardados();

    if (guardados.includes(id)) {
        elemento.classList.add("active");
    } else {
        elemento.classList.remove("active");
    }
}

// REENDERIZA LAS CARDS
export function renderCards(container, data, crearCard) {
    // Si no hay datos, limpiamos el contenedor
    if (!data || data.length === 0) {
        container.innerHTML = "";
        return;
    }
    container.innerHTML = data.map(crearCard).join("");
}

// ANIMA LA ENTRADA DE LA PAGINA
export function animarEntrada() {
    const section = document.querySelector(".seccion-1-biblioteca");
    if (!section) return; // Evita errores si la sección no existe en el DOM

    setTimeout(() => {
        section.classList.add("show");
    }, 100);
}

// CREA DATA LUCIDE
export function renderIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// CARRUSEL
export function initCarousel(container) {
    if (!container) return;
    const cards = container.querySelectorAll(".card");

    function updateCarousel() {
        const center = container.scrollLeft + container.offsetWidth / 2;

        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = cardCenter - center;
            const normalized = distance / card.offsetWidth;

            const rotateY = Math.max(Math.min(normalized * -40, 40), -40);
            const scale = 1 - Math.min(Math.abs(normalized) * 0.1, 0.1);
            const translateZ = -Math.pow(Math.abs(normalized), 1.5) * 200;
            const opacity = 1 - Math.min(Math.abs(normalized) * 0.6, 0.6);

            card.style.transform = `
                perspective(1000px)
                translateZ(${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;

            card.style.opacity = opacity;
            card.style.zIndex = Math.round(1000 - Math.abs(distance));
        });
    }

    let ticking = false;
    container.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateCarousel();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Centrar carrusel al cargar
    window.addEventListener("load", () => {
        const firstCard = container.querySelector(".card");
        if (firstCard) {
            container.scrollLeft =
                firstCard.offsetLeft -
                container.offsetWidth / 2 +
                firstCard.offsetWidth / 2;
            updateCarousel();
        }
    });
}