export function crearCardSugerencia(item) {
    return `
        <div class="card--sugerency">
            <img src="${item.img}">
            
            <div class="bx-title">
                <div class="bx-img-h1">
                   <img src="${item.img2}">

                   <div class="bx-info">
                      <h1 class="title">${item.title}</h1>
                      <h2 class="title2">${item.subtitle}</h2>
                   </div>
                </div>

                <div class="bx--spanTop">
                   <i data-lucide="clock"></i>
                   <span class="spanTop--title">${item.time}</span>
                   <p>•</p>
                   <i data-lucide="target"></i>
                   <span class="spanTop--title">${item.nivel}</span>
                   <p>•</p>
                   <i data-lucide="eye"></i>
                   <span class="spanTop--title">${item.vistas}</span>
                </div>
            </div>

            <div class="bx--span">
                <span class="span-title">${item.description}</span>
            </div>

            <div class="bx--btnSpan">
                <button class="btn--span"><i data-lucide="heart"></i></button>
                <button class="btn--span"><i data-lucide="bookmark"></i></button>
                <button class="btn--span"><i data-lucide="share-2"></i></button>
            </div>
        </div>
    `;
}
