import { getListas, crearNuevaLista, sincronizarItemEnListas } from "/JAVASCRIPT/CORE/storage.js";
import { mostrarOverlayFeedback } from "/COMPONENTS/MODAL/toasNotification.js";
import { homedata } from "/JAVASCRIPT/DATAHOME/dataHome.js";

let modaLista = null;
let itemActual = null;
let listasSeleccionadas = new Set();

export function initSaveModal() {
    modaLista = document.getElementById("modal-listas");
    if (!modaLista) return;

    const TriggerCrear = modaLista.querySelector(".create-trigger");
    const containerCrear = modaLista.querySelector("#input-nueva-lista-container");
    const inputNombre = modaLista.querySelector("#nueva-lista-nombre");
    const btnConfirmar = modaLista.querySelector("#confirmar-creacion");
    const btnHecho = modaLista.querySelector("#btn-hecho");

    if (btnHecho) {
        btnHecho.onclick = (e) => {
            e.preventDefault();
            if (!itemActual) return;

            sincronizarItemEnListas(itemActual, listasSeleccionadas);

            let mensaje;
            if (listasSeleccionadas.size === 0) {
                mensaje = "Se quito de tu biblioteca";
            } else if (listasSeleccionadas.size === 1) {
                const nombreLista = Array.from(listasSeleccionadas)[0];
                mensaje = `Guardado en ${nombreLista}`;
            } else {
                mensaje = `Guardado en ${listasSeleccionadas.size}`;
            }
            
            document.dispatchEvent(new CustomEvent("itemActualizado", { 
                detail: {
                    id: itemActual, 
                    count: listasSeleccionadas.size,
                    msg: mensaje
                } 
            }));

            cerrarModalGlobal();
        };
    }

    if (TriggerCrear && btnConfirmar) {
        TriggerCrear.onclick = (e) => {
            e.stopPropagation();
            TriggerCrear.style.opacity = "0";
            setTimeout(() => {
                TriggerCrear.classList.add("hidden");
                containerCrear.classList.remove("hidden");
                requestAnimationFrame(() => {
                    containerCrear.classList.add("show");
                    if (inputNombre) inputNombre.focus();
                });
            }, 150);
        };

        btnConfirmar.onclick = (e) => {
            e.stopPropagation();
            const nombre = inputNombre?.value.trim();
            if (nombre) {
                crearNuevaLista(nombre);
                renderizarListasEnModal();
                mostrarOverlayFeedback(`se creo "${nombre}" correctamente`);
            }
            resetCrearUI();
        };
    }
}

export function abrirModalListas(e, id) {
    if (!modaLista) return;
    itemActual = id;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    const listas = getListas();
    listasSeleccionadas = new Set(
        Object.keys(listas).filter(nombre => 
            listas[nombre].some(itemId => String(itemId) === String(id))
        )
    );

    renderizarListasEnModal();
    posicionarModal(e);
}

// MODIFICADO: Obtener imagen del ÚLTIMO item en una lista
function obtenerImagenDeLista(nombreLista) {
    const listas = getListas();
    const idsEnLista = listas[nombreLista];
    
    if (!idsEnLista || idsEnLista.length === 0) return null;
    
    // Obtener el ÚLTIMO ID guardado
    const ultimoId = idsEnLista[idsEnLista.length - 1];
    const item = homedata?.find(d => String(d.id) === String(ultimoId));
    
    return item?.imagenFondo || null;
}

function renderizarListasEnModal() {
    const contenedorListas = modaLista.querySelector("#lista-colecciones");
    if (!contenedorListas) return;

    const listas = getListas();

    contenedorListas.innerHTML = Object.keys(listas).map(nombre => {
        const estaGuardado = listasSeleccionadas.has(nombre);
        const imagenLista = obtenerImagenDeLista(nombre); // MODIFICADO: imagen de la lista, no del item actual
        
        return `
            <div class="fila-lista ${estaGuardado ? 'activa' : ''}" data-nombre="${nombre}">
                <div class="icono-lista">
                    ${imagenLista ? `<img src="${imagenLista}" alt="${nombre}" class="img-lista">` : `<i data-lucide="folder"></i>`}
                </div>
                <div class="mini-portada">
                    <span class="nombre-lista">${nombre}</span>
                    ${estaGuardado ? `<i data-lucide="check-circle" class="icon-check2"></i>` : ''}
                </div>
            </div>
        `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();

    contenedorListas.querySelectorAll(".fila-lista").forEach(fila => {
        fila.onclick = (e) => {
            e.stopPropagation();
            const nombre = fila.dataset.nombre;
            listasSeleccionadas.has(nombre) ? listasSeleccionadas.delete(nombre) : listasSeleccionadas.add(nombre);
            renderizarListasEnModal();
        };
    });
}

function posicionarModal(e) {
    const modalContentEl = modaLista.querySelector(".modal-content-clean");
    modaLista.style.display = "block";
    
    requestAnimationFrame(() => {
        const modalWidth = 320;
        const modalHeight = modalContentEl.offsetHeight || 300;
        const offset = 12;

        let left = e.clientX + offset;
        if (left + modalWidth > window.innerWidth - 10) left = window.innerWidth - 10 - modalWidth;

        let top = e.clientY - modalHeight - offset;
        if (top < 10) top = e.clientY + offset;

        modalContentEl.style.left = `${left}px`;
        modalContentEl.style.top = `${top}px`;
        modalContentEl.style.opacity = "1";
        modalContentEl.style.transform = "translateY(0) scale(1)";
    });
}

export function cerrarModalGlobal() {
    const mContent = modaLista.querySelector(".modal-content-clean");

    if (mContent) {
        mContent.style.transform = "translateY(10px) scale(0.95)";
        mContent.style.opacity = "0";
    }
    modaLista.style.opacity = "0";

    setTimeout(() => {
        modaLista.style.display = "none";
        modaLista.style.opacity = "1";

        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
        
        resetCrearUI();
    }, 200);
}

function resetCrearUI() {
    const TriggerCrear = modaLista.querySelector(".create-trigger");
    const containerCrear = modaLista.querySelector("#input-nueva-lista-container");
    if (!containerCrear || !TriggerCrear) return;
    containerCrear.classList.replace("show", "hidden");
    TriggerCrear.classList.remove("hidden");
    TriggerCrear.style.opacity = "1";
}