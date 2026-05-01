// CARGA LA CATEGORIA AL MISMO MOLDE (NO IMPORTA LA CATEGORIA QUE SE LE DE CLICK)

import { cambiarCategoria } from "/JAVASCRIPT/CATEGORIAS/cambiarCategoria.js"

export function cargarCategoriaDesdeURL () {

    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat");

    if(categoria){
        cambiarCategoria(categoria);
    }
};