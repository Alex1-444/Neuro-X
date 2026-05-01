import { autores } from "/JAVASCRIPT/DATAMOLDE/dataAutors.js";
import { librosAutores } from "/JAVASCRIPT/DATAMOLDE/dataBooksAutors.js";
import { renderizar } from "/JAVASCRIPT/render.js";
import { crearCardLibro } from "/JAVASCRIPT/CARDSMOLDE/cards.js";

export function actualizarSidebarAutor(idAutor) {
    const autor = autores[idAutor];
    if (!autor) return;

    const panel = document.getElementById("info-panel");
    if (!panel) return;

    panel.dataset.autor = idAutor;

    document.getElementById("autor-img").src = autor.img;
    document.getElementById("autor-img-webp").srcset = autor.imgwebp;
    document.getElementById("autor-nombre").textContent = autor.nombre;
    document.getElementById("autor-desc").textContent = autor.descripcion;
    document.getElementById("autor-frase").textContent = autor.frase;
    document.getElementById("autor-libros-titulo").textContent = `Libros de ${autor.title}`;

    const librosAutor = librosAutores[idAutor] || [];

    const container = document.querySelector(".imagenes-container");
    console.log(container, librosAutor);
    renderizar(container, librosAutor, crearCardLibro);
}