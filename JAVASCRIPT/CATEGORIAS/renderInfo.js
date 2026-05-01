export function renderInfoExtra(data) {
    const libros = document.getElementById("category-libros");
    const sesiones = document.getElementById("category-sesiones");

    if (!libros || !sesiones) return;

    if (data.tipo === "temas") {
        libros.textContent = `• ${data.temas} temas favoritos`;
        sesiones.innerHTML = "";
    } else {
        libros.textContent = `• ${data.libros} libros guardados`;
        sesiones.innerHTML = `• ${data.sesiones} sesiones guardadas /
        <span class="link-biblioteca">
            <a href="#">abrir biblioteca</a>
        </span>`;
    }
}