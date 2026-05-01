import { biblioteca } from "/JAVASCRIPT/DATAMOLDE/dataBook.js";
import { actualizarFondoDinamico } from "/JAVASCRIPT/UIMOLDE/fondoDinamico.js";
import { actualizarSidebarAutor } from "/JAVASCRIPT/FEATURESMOLDE/sidebar.js";
import { cargarSugerencias } from "/JAVASCRIPT/CARRUSELRELACIONADAS/app.js";

let idLibroActual = null;
let estaCambiando = false; // Corregido el nombre para ser más claro

export function cambiarLibro(idLibro) {
    // 1. Validaciones iniciales
    if (idLibro === idLibroActual || estaCambiando) return;

    const libro = biblioteca[idLibro];
    if (!libro) return;

    const target = document.getElementById("bx--dinamic");
    if (!target) return;

    // 2. Bloqueo de seguridad
    estaCambiando = true;
    idLibroActual = idLibro;

    // Obtenemos el autor actual (si no existe, será null, y está bien)
    const autorPrevio = target.getAttribute("data-autor");

    target.classList.add("fade-out");

    setTimeout(() => {
        // 3. Solo actualizar sidebar si el autor cambió de verdad
        if (autorPrevio !== libro.autor) {
            actualizarSidebarAutor(libro.autor);
            target.setAttribute("data-autor", libro.autor);
            
            // Esperamos un momento a que el DOM del sidebar exista para Lucide
            setTimeout(() => {
                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }
            }, 50);
        }

        // 4. Actualización de elementos principales
        const imgFront = document.getElementById("img-front");
        const imgBack = document.getElementById("img-back");
        const title = document.getElementById("main-title");
        const genero = document.getElementById("info-genero");
        const paginas = document.getElementById("info-paginas");
        const autor = document.getElementById("info-autor");
        const descContainer = document.getElementById("description-container");

        if (imgFront) {
            imgFront.src = libro.imgFront;
            imgFront.alt = libro.titulo;
        }
        if (imgBack) imgBack.src = libro.imgBack;

        title.innerHTML = `<span class="spap--title">${libro.titulo.split(',')[0]}</span>${libro.titulo.includes(',') ? ',' + libro.titulo.split(',')[1] : ''}`;
        genero.innerText = `genero: ${libro.genero}`;
        paginas.innerText = `paginas: ${libro.paginas}`;
        autor.innerText = `autor: ${libro.autorMostrar}`;

        // 5. Reset de scrolls
        target.querySelector(".box-text")?.scrollTo(0, 0);
        target.closest(".section-bx")?.scrollTo(0, 0);
        document.querySelector(".bx--wrapper2")?.scrollTo({ left: 0 });

        // 6. Descripción
        descContainer.innerHTML = libro.resumen.map(p => `<p>${p}</p>`).join("");

        // 7. Manejo de la imagen y desbloqueo
        const nuevaImagen = new Image();
        nuevaImagen.src = libro.imgFront;

        nuevaImagen.onload = () => {
            target.classList.remove("fade-out");
            actualizarFondoDinamico();

            setTimeout(() => {
                cargarSugerencias(libro.categoria);
                estaCambiando = false; // Desbloqueo exitoso
            }, 100);
        };

        nuevaImagen.onerror = () => {
            console.error("Error cargando imagen:", libro.imgFront);
            target.classList.remove("fade-out");
            estaCambiando = false; // Desbloqueo incluso si hay error
        };

    }, 300);
    
    // NOTA: Quité el actualizarSidebarAutor de aquí abajo porque ya está dentro del setTimeout
}