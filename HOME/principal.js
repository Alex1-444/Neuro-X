// -------- CREACION DE ICONOS (CONVIERTE LUCIDE EN SVG) -------

lucide.createIcons();

// -------- ESPERA A QUE TODO SE ALINEE PARA CARGAR LA PAGINA ---------

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// -------- FRASES ALEATORIAS ----------

    const frases = [
        "Cada página que lees hoy es una decisión a favor de tu futuro",
        "El conocimiento no te cambia de inmediato, pero te transforma para siempre",
        "Leer es una forma silenciosa de crecer cuando nadie te está mirando",
        "Tu mente se expande cada vez que eliges aprender en lugar de distraerte",
        "El hábito de leer construye la versión de ti que aún no conoces",
        "No leas para terminar el libro, lee para entenderte mejor",
        "El crecimiento personal comienza cuando decides pensar con más profundidad",
        "Lo que comprendes hoy se convierte en criterio mañana",
        "Cada idea nueva es una herramienta para tomar mejores decisiones",
        "Leer no te da respuestas inmediatas, te da mejores preguntas"
    ];

    const fraseHeader = document.getElementById("frase-header");
    if (fraseHeader) {
        const random = Math.floor(Math.random() * frases.length);
        fraseHeader.textContent = frases[random];
    };

    // -------- SESIÓN ----------

    const isLoggedId = localStorage.getItem("userLogged") === "true";
    const profileImg = document.getElementById("profile-img");
    const profileIcon = document.getElementById("profile-icon");

    if (profileImg && profileIcon) {
        if (isLoggedId) {
            profileImg.src = localStorage.getItem("profileImage");
            profileImg.style.display = "block";
            profileIcon.style.display = "none";
        } else {
            profileImg.style.display = "none";
            profileIcon.style.display = "block";
        }
    };

    // -------- CARRUSEL NOVEDADES ----------

    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    const carrusell = document.querySelector(".carrusell");
    const prev = document.querySelector(".arrow.left");
    const next = document.querySelector(".arrow.right");

    if (slides.length && dotsContainer && carrusell && prev && next) {
        let index = 0;
        let interval = null;

        function showSlide(i) {
            slides.forEach((slide, idx) => {
                slide.classList.toggle("active", idx === i);
            });

            dots.forEach((dot, idx) => {
                dot.classList.toggle("active", idx === i);
            });
        }

        function startInterval() {
            clearInterval(interval);
            interval = setInterval(() => {
                index = (index + 1) % slides.length;
                showSlide(index);
            }, 10000);
        }

        slides.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.className = "dot";
            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                index = i;
                showSlide(index);
                startInterval();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dot");

        prev.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
            startInterval();
        });

        next.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            showSlide(index);
            startInterval();
        });

        carrusell.addEventListener("mouseenter", () => clearInterval(interval));
        carrusell.addEventListener("mouseleave", startInterval);

        showSlide(index);
        startInterval();
    };

    // -------- CARRUSEL CONTINUA ESTUDIANDO ----------

    const containerPrincipal = document.querySelector(".box-items-principal");
    const prevv = document.getElementById("prev");
    const nextt = document.getElementById("next");

    if (containerPrincipal && prevv && nextt) {
        const scrollamount = 1200;
    // -------- FLECHAS NAVEGACION: LEFT, RIGHT --------
        prevv.addEventListener("click", () => {
            containerPrincipal.scrollLeft -= scrollamount;
        });

        nextt.addEventListener("click", () => {
            containerPrincipal.scrollLeft += scrollamount;
        });
    };

    // -------- CARRUSELES SECUNDARIOS ----------

    document.querySelectorAll(".slider-wrapper-3").forEach(slider => {
        const container = slider.querySelector(".box-items-principal-2");
        const prev = slider.querySelector(".prev-2");
        const next = slider.querySelector(".next-2");
    // --------- FLECHAS NAVEGACION: LEFT, RIGHT ---------
        if (container && prev && next) {
            const scrollAmount = 1200;

            prev.addEventListener("click", () => {
                container.scrollLeft -= scrollAmount;
            });

            next.addEventListener("click", () => {
                container.scrollLeft += scrollAmount;
            });
        }
    });