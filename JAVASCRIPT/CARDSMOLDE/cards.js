// ESTE CODIGO, RE-RENDERIZA LOS LIBROS (DE LA BARRA LATERAL)

export function crearCardLibro(libro) {
    return `
        <div class="box-image-text btn-cambiar-libro" data-id="${libro.id}">
            <img src="${libro.img}" alt="${libro.titulo}">

            <div class="txt--description">
                <h3>${libro.titulo}</h3>
                <p class="text--p">género: ${libro.genero}</p>
                <p class="text--p">páginas: ${libro.paginas}</p>

                <div class="bx__icon">
                    <button class="btn--icon">
                        <i data-lucide="heart"></i>
                    </button>
                    <button class="btn--icon">
                        <i data-lucide="bookmark"></i>
                    </button>
                    <button class="btn--icon">
                        <i data-lucide="share-2"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}