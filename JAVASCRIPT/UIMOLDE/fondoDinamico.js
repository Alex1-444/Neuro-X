const colorThief = new ColorThief();

export function actualizarFondoDinamico() {
    const img = document.getElementById("img-front");
    const target = document.getElementById("bx--dinamic");

    // Función interna que hace el trabajo
    const aplicarColor = () => {
        try {
            const rgb = colorThief.getColor(img);
            const colorFinal = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`; // Cambié a rgba por la transparencia
            target.style.background = `linear-gradient(to bottom, ${colorFinal} 0%, #121212 100%)`;
        } catch (e) {
            console.log("Esperando a que la imagen cargue totalmente...");
        }
    };

    if (img.complete) {
        aplicarColor();
    } else {
        // Importante: removemos eventos anteriores para que no se acumulen
        img.onload = aplicarColor;
    }
}