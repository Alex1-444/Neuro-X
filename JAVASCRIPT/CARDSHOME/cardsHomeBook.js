export function crearCardLibro(libro, guardadosIds = [], likesIds = []) {
    const estaLikeado = likesIds.includes(String(libro.id));
    const estaGuardado = guardadosIds.includes(String(libro.id));

    return `
    <div class="box-items-2" data-id="${libro.id}"> 
        <a href="/LIBRO1/NeuroX.libro-1.html?id=${libro.id}" class="link-overlay">
            <div class="item-2">
                <img src="${libro.img}" alt="${libro.titulo}">
                
                <div class="like-animation-container">
                    <i data-lucide="heart" class="large-like-icon"></i>
                </div>
            </div>

            <div class="bx-items-icons">
                <p class="items-desc">${libro.descripcion}</p>
                <p>Autor: ${libro.autor}</p>
                <p>Género: ${libro.genero}</p>
            </div>
        </a>
            
        <div class="bx-icon-secc2">
            <button class="btn-icon-secc2 btn-heart ${estaLikeado ? 'active' : ''}">
                <span class="icon-heart">
                    <i data-lucide="heart"></i>
                </span>
                <span class="span-secc2">${estaLikeado ? 'Te gusta' : 'Me gusta'}</span>
            </button>
    
            <button class="btn-icon-secc2 btn-save ${estaGuardado ? 'active' : ''}">
                <span class="icon-wrapper icon-add">
                    <i data-lucide="bookmark"></i>
                </span>
                <span class="icon-wrapper icon-check">
                    <i data-lucide="check-circle"></i>
                </span>
                <span class="span-secc2">${estaGuardado ? 'Guardado' : 'Guardar'}</span>
            </button>
    
            <button class="btn-icon-secc2">
                <i data-lucide="share-2"></i>
                <span class="span-secc2">Compartir</span>
            </button>
        </div>
    </div>
    `;
}