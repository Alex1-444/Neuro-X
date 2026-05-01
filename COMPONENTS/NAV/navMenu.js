
// INYECTA EL MENU

fetch("/COMPONENTS/NAV/NavMenu.html")
.then(response => response.text())
.then(data => {

    // insertar header
    document.getElementById("menu-container").innerHTML = data;

    // activar iconos
    lucide.createIcons();

    // iniciar scroll del header
    iniciarScrollHeader();

    // -------- ANIMACION HOME --------
    const homeLink = document.querySelector(".bx--home");

    if (homeLink) {
        homeLink.addEventListener("click", (e) => {

            e.preventDefault();

            const url = homeLink.href;

            setTimeout(() => {
                window.location.href = url;
            }, 5);

        });
    }

})
.catch(error => console.error("error cargando header", error));

// SE ACTIVA EL COLOR DEL NAV CUANDO SE HACE SCROLL

function iniciarScrollHeader () {
    const header = document.querySelector(".box-principal");
    if (!header) return;

    const containerHome = document.querySelector(".section-bx");
    const containerLibro = document.querySelector(".main--container");
    const containerCategories = document.querySelector(".secc-prncpl")

    const scrollContainer = containerHome || containerLibro || containerCategories;

    if(!scrollContainer || !header) return;

    scrollContainer.addEventListener("scroll", () => {
        if(scrollContainer.scrollTop > 5) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled")
        }
    });
};