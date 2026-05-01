// CAMBIAR COLOR DE FONDO DEPENDIENDO LA PORTADA

const colorThief = new ColorThief();

export function aplicarColorDinamico () {
    const img = document.getElementById("img-thief");
    const target = document.getElementById("bx-thief");
    const sticky = document.querySelector(".nav-category-bar");

    if (!img || !target || !sticky) return;

    const aplicarColorHero = () => {
        if (!img.complete || img.naturalWidth === 0) {
            console.log("Imagen no esta lista");
            return;
        }

        try {
            const rgb = colorThief.getColor(img);

            const colorFinal = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.9)`;
            target.style.background = `linear-gradient(to bottom, ${colorFinal} 0%, #181717 90%)`;

            const darkFactor = 0.7;
            const darkColor = `rgb(
                ${Math.floor(rgb[0] * darkFactor)},
                ${Math.floor(rgb[1] * darkFactor)},
                ${Math.floor(rgb[2] * darkFactor)}
            )`;

            sticky.style.background = darkColor;

        } catch (error) {
            console.log("ColorThief falló:", error);
        }
    };

    if (img.complete && img.naturalWidth !== 0) {
        aplicarColorHero();
    } else {
        img.addEventListener("load", aplicarColorHero, { once: true });
    }
}