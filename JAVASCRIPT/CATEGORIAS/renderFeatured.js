import { initIcons } from "/JAVASCRIPT/UIHOME/icons.js";

export function renderFeatured(data) {
    const featureSection = document.getElementById("id-feature");
    const featuredTitle = document.getElementById("h2-featured");
    const featuredList = document.getElementById("ul-featured");

    if (!featureSection || !featuredTitle || !featuredList) return;

    // ocultar SIEMPRE antes de render
    featureSection.style.opacity = "0";
    featureSection.style.transform = "translateY(10px)";

    if (!data.featured) {
        featuredList.innerHTML = "";
        return;
    }

    // título
    featuredTitle.textContent = data.titulo2;

    // limpiar
    featuredList.innerHTML = "";

    // render cards
    data.featured.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("featured-li");

        li.innerHTML = `
        <article class="card-article">
            <a href="#">
                <div class="bx-imagen">
                    <img src="${item.img}">
                </div>
                <div class="feature-bx-icons">
                    <i data-lucide="heart"></i>
                    <i data-lucide="bookmark"></i>
                    <i data-lucide="share-2"></i>
                </div>
                <div class="bx-h3-p">
                    <p class="feature-p">${item.texto}</p>
                </div>
            </a>
        </article>
        `;

        featuredList.appendChild(li);
    });

    initIcons(featuredList);

    //  MOSTRAR CARDS
    requestAnimationFrame(() => {
        featureSection.style.opacity = "1";
        featureSection.style.transform = "translateY(-10px)";
    });
}