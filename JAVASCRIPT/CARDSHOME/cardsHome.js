// CREAR CARDS DE HOME

export function crearCardHome(sesion, guardados = [], likes = []) {

    const guardado = guardados.includes(sesion.id);
    const estaLikeado = likes.includes(sesion.id);

    return `
        <div class="card" data-id="${sesion.id}">

            <div class="card-img-container">
                <img class="img" src="${sesion.imagenFondo || ""}">

                <div class="like-animation-container">
                    <i data-lucide="heart" class="large-like-icon"></i>
                </div>
            </div>

            <div class="bx-img2">
                <img class="img2" src="${sesion.imagen || ""}">

                <div class="bx-car-title">
                    <h2 class="car-title">${sesion.titulo}</h2>
                    <p class="car-text">${sesion.nombre} • ${sesion.categoria}</p>
                </div>
            </div>

            <div class="bx-car">
                <div class="bx-icon-and-text">
                    <i data-lucide="clock"></i>
                    <p class="car-text2">${sesion.tiempo}</p>      
                </div>
                <p>•</p>
                <div class="bx-icon-and-text">
                    <i data-lucide="target"></i>
                    <p class="car-text2">${sesion.nivel}</p>
                </div>
                <p>•</p>
                <div class="bx-icon-and-text">
                    <i data-lucide="eye"></i>
                    <p class="car-text2">${sesion.vistas}</p>
                </div>
            </div> 

            <div class="cards-content">
                <div class="card-icons">
                    <i data-lucide="book"></i>
                    <p class="card-text">lectura</p>
                </div>

                <div class="card-icons">
                    <i data-lucide="film"></i>
                    <p class="card-text">video</p>
                </div>

                <div class="card-icons">
                    <i data-lucide="brain"></i>
                    <p class="card-text">interactivo</p>
                </div>
            </div>

            <div class="bx-description">
                <p class="description">${sesion.descripcion}</p>
            </div>

            <div class="bx-car-icons">
                <div class="bx-overlay btn-heart ${estaLikeado ? 'active' : ''}">
                    <i class="icon-heart" data-lucide="heart"></i>
                    <span class="car-overlay">${estaLikeado ? 'Te gusta' : 'Me gusta'}</span>
                </div>

                <div class="bx-overlay btn-save ${guardado ? "active" : ""}">
                    <i class="icon-add" data-lucide="bookmark"></i>
                    <i class="icon-check" data-lucide="check-circle"></i>
                    <span class="car-overlay">
                        ${guardado ? "Guardado" : "Guardar"}
                    </span>
                </div>

                <div class="bx-overlay">
                    <i data-lucide="share-2"></i>
                    <span class="car-overlay">Compartir</span>
                </div>
            </div>

            <button class="car-btn">
                <i data-lucide="play"></i>
                iniciar sesión
            </button>
        </div>

        <div id="modal-listas" class="modal-overlay">
            <div class="modal-content-clean">

                <div class="modal-section">
                    <div class="input-wrapper search-bg">
                        <i data-lucide="search" class="icon-ui"></i>
                        <input type="text" id="buscar-lista" class="input-lista" placeholder="Buscar lista...">
                    </div>
                </div>

                <div class="modal-section">
                    <div class="input-wrapper create-trigger">
                       <i data-lucide="plus" class="icon-ui"></i>
                       <span class="input-crear" style="cursor: pointer; user-select: none;">Nueva lista...</span>
                    </div>

                    <div id="input-nueva-lista-container" class="input-wrapper create-bg hidden">
                        <input type"text" id="nueva-lista-nombre" placeholder="Nombre de la lista...">
                        <button id="confirmar-creacion" class="btn-save-list">Guardar</button>
                    </div>
                </div>

                <div class="listas-scroll-container">
                    <div id="lista-colecciones"></div>
                </div>

                <div class="modal-footer">
                    <button id="btn-hecho" class="btn-class">hecho</button>
                </div>

                <div id="overlay-feedback" class="overlay-feedback hidden">
                    <div class="overlay-box">
                        <i class="icono" data-lucide="check-circle"></i>
                        <p id="overlay-texto">Guardado</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}