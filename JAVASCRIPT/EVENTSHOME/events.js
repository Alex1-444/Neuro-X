import { initSaveModal, cerrarModalGlobal, abrirModalListas } from "/COMPONENTS/MODAL/saveModal.js";
import { toggleLike, toggleGuardar, isGuardadoEnAlgunaLista } from "/JAVASCRIPT/CORE/storage.js";
import { mostrarOverlayFeedback } from "/COMPONENTS/MODAL/toasNotification.js";

export function activarEventosHome(container, toggleGuardarFn, toggleLikeFn) {
    initSaveModal();

    const containers = Array.isArray(container) || NodeList.prototype.isPrototypeOf(container)
        ? Array.from(container)
        : [container];

    containers.forEach((c) =>
        activarEventosCards(c, {
            toggleGuardarUI: toggleGuardarFn,
            toggleLikeUI: toggleLikeFn
        })
    );

    const scrollContainer = document.querySelector(".main--container");

    if (scrollContainer && !scrollContainer.dataset.modalClose) {
        scrollContainer.dataset.modalClose = "true";

        scrollContainer.addEventListener("click", (e) => {
            const modalElemento = document.getElementById("modal-listas");
            
            if (modalElemento && modalElemento.style.display === "block") {
                
                if (!e.target.closest(".modal-content-clean") && !e.target.closest(".btn-save")) {
                    cerrarModalGlobal();
                    desbloquearScroll(scrollContainer);
                }
            }
        });
    }
}

export function activarEventosCards(container, { toggleGuardarUI = toggleGuardar, toggleLikeUI = toggleLike } = {}) {
    if (!container || container.dataset.eventosListos) return;

    const scrollContainer = document.querySelector(".main--container");

    const cards = container.querySelectorAll(".card, .box-items-2");
    
    cards.forEach(card => {
        const id = card.dataset.id;
        if (id) {
            // Verificamos en el storage si existe en CUALQUIER lista
            const estaGuardado = isGuardadoEnAlgunaLista(id);
            
            // Si está guardado, actualizamos el botón a "activo"
            // Pasamos 'null' como mensaje para que no salgan alertas de "Guardado" al recargar la página
            if (estaGuardado) {
                actualizarEstadoVisualCard(id, true, null);
            }
        }
    });

    container.addEventListener("click", (e) => {
        const btnHeart = e.target.closest(".btn-heart");
        const btnSave = e.target.closest(".btn-save");
        if (!btnHeart && !btnSave) return;

        e.preventDefault();
        e.stopPropagation();

        const card = (btnHeart || btnSave).closest(".card, .box-items-2");
        if (!card) return;

        const id = card.dataset.id;
        if (!id) return;

        if (btnHeart) {
            const ahoraLeGusta = toggleLikeUI(id);
            btnHeart.classList.toggle("active", ahoraLeGusta);

            const spanTexto = btnHeart.querySelector(".card-overlay, .car-overlay, .span-secc2");
            if (spanTexto) spanTexto.textContent = ahoraLeGusta ? "Te gusta" : "Me gusta";

            if (ahoraLeGusta) dispararAnimacionCorazon(card);
            return;
        }

        if (!btnSave.classList.contains("active")) {
            if (toggleGuardarUI(id)) {
                actualizarEstadoVisualCard(id, true, "Guardado en Favoritos");
            }
        } else {
            bloquearScroll(scrollContainer);
            abrirModalListas(e, id);
        }
    });

    document.addEventListener("itemActualizado", (e) => {
        const { id, count, msg } = e.detail;
        if (!id) return;
        
        // CAMBIO: Verificar si está guardado en CUALQUIER lista, no solo en Favoritos
        const estaGuardado = isGuardadoEnAlgunaLista(id);
        actualizarEstadoVisualCard(id, estaGuardado, msg);
        desbloquearScroll(scrollContainer);
    });

    container.dataset.eventosListos = "true";
}

// FUNCIONES DE BLOQUEO DE SCROLL
function bloquearScroll(contenedor) {
    if (contenedor) {
        contenedor.style.overflow = "hidden";
    }
}

function desbloquearScroll(contenedor) {
    if (contenedor) {
        contenedor.style.overflow = "auto";
    }
}

function actualizarEstadoVisualCard(id, activo, mensaje) {
    document.querySelectorAll(`[data-id="${id}"]`).forEach((item) => {
        const btnSave = item.querySelector(".btn-save");
        const spanTexto = btnSave?.querySelector(".card-overlay, .car-overlay, .span-secc2");

        if (btnSave) {
            btnSave.classList.toggle("active", activo);
            if (spanTexto) spanTexto.textContent = activo ? "Guardado" : "Guardar";
        }
    });

    if (mensaje) mostrarOverlayFeedback(mensaje);
}

function dispararAnimacionCorazon(card) {
    const anim = card.querySelector(".like-animation-container");
    if (anim) {
        anim.classList.remove("animate-like");
        void anim.offsetWidth;
        anim.classList.add("animate-like");
    }
}