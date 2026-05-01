import { aplicarColorDinamico } from "/JAVASCRIPT/UICATEGORY/colorDinamico.js";
import { pageCategorias } from "/JAVASCRIPT/DATACATEGORY/dataBooks.js";
import { renderInfoExtra } from "/JAVASCRIPT/CATEGORIAS/renderInfo.js"
import { animarEntrada } from "/JAVASCRIPT/UICATEGORY/animaciones.js"
import { renderFeatured } from "/JAVASCRIPT/CATEGORIAS/renderFeatured.js"

export function cambiarCategoria(nombreCategoria) {
    const data = pageCategorias[nombreCategoria];
    if (!data) return;

    const section = document.getElementById("bx-thief");

    const titulo = document.getElementById("category-title");
    const navTitulo = document.getElementById("nav-category-title");

    const img = document.getElementById("img-thief");
    const source = document.getElementById("img-source");

    const navImg = document.getElementById("nav-category-img");
    const navSource = document.getElementById("nav-category-source");

    setTimeout(() => {
        titulo.textContent = data.titulo;
        navTitulo.textContent = data.titulo;

        renderInfoExtra(data);
        renderFeatured(data);

        source.srcset = data.imgWebp;
        img.src = data.img;

        if (navImg && navSource) {
        navSource.srcset = data.imgWebp;
        navImg.src = data.img;
    }

    requestAnimationFrame(() => {
        aplicarColorDinamico();
    });

        animarEntrada(null, section);

    }, 200);
}