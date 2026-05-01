// CARRUSEL CONTINUA ESTUDIANDO (CAMBIA DE IMAGEN A VIDEO)

export function initCarruselVideos() {
    document.querySelectorAll(".box-items").forEach(box => {
        const video = box.querySelector("video");
        if (!video) return;

        const source = video.querySelector("source");
        let hoverTimeout;

        box.addEventListener("mouseenter", () => {
            hoverTimeout = setTimeout(() => {
                source.src = source.dataset.src;
                video.load();

                box.classList.add("hover-active");
                video.play();
            }, 700);
        });

        //EL VIDEO SOLO EXISTE EN HOVER

        box.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimeout);

            video.pause();
            video.currentTime = 0;

            source.removeAttribute("src");
            video.load();

            box.classList.remove("hover-active");
        });
    });
}