import { aplicarColorDinamico } from "/JAVASCRIPT/UICATEGORY/colorDinamico.js";
import { activarTituloSticky, activarScrollTitulo } from "/JAVASCRIPT/UICATEGORY/scroll.js";
import { cargarCategoriaDesdeURL } from "/JAVASCRIPT/CATEGORIAS/cargarDesdeURL.js";

export function initCategorias() {

    // Color inicial (por si ya hay imagen cargada)
    aplicarColorDinamico();

    // UI (scroll + sticky)
    activarTituloSticky();
    activarScrollTitulo();

    // Cargar categoría desde la URL (?cat=...)
    cargarCategoriaDesdeURL();
}