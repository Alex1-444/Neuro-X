
// CREA LAS CARDS DE BIBLIOTECA

import { isGuardado } from "/JAVASCRIPT/CORE/storage.js";
import { crearIconToggle } from "/COMPONENTS/ICONSTOGGLE/iconSave.js"

export function crearCard(data) {
    const guardado = isGuardado(data.id);

    return `
        <li class="card" data-id="${data.id}" style="background-image: url(${data.imagenFondo})">
            
            <!-- HTML ORIGINAL -->
            <div class="div-card">
                <img src="${data.imagen}">

                <div class="bx-title">
                    <h3>${data.titulo}</h3>
                    <p>${data.nombre} • ${data.categoria}</p>
                </div>
            </div>

            <div class="bx-stack">
                <div class="stack">
                    <i data-lucide="clock"></i>
                    <p>${data.tiempo}</p>
                </div>
                <p>•</p>
                <div class="stack">
                    <i data-lucide="target"></i>
                    <p>${data.nivel}</p>
                </div>
                <p>•</p>
                <div class="stack">
                    <i data-lucide="eye"></i>
                    <p>${data.vistas}</p>
                </div>
            </div>

            <div class="bx-desc">
                <p>${data.descripcion}</p>
            </div>

            <div class="bx-explorer">
               <div class="icons-explorer">
                   <i data-lucide="book"></i>
                   <p class="text-explorer">lectura</p>
               </div> 
               <div class="icons-explorer">
                   <i data-lucide="film"></i>
                   <p class="text-explorer">video</p>
               </div> 
               <div class="icons-explorer">
                   <i data-lucide="brain"></i>
                   <p class="text-explorer">interactivo</p>
               </div> 
            </div>

            <div class="bx-icons">
                <div class="iconss">
                    <div class="icon">
                        <i data-lucide="heart"></i>
                    </div>

                    ${crearIconToggle(guardado)}

                    <div class="icon">
                        <i data-lucide="share-2"></i>
                    </div>
                </div>

                <button class="btn">
                    <i data-lucide="play"></i>
                    inicia sesión
                </button>
            </div>
        </li>
    `;
}