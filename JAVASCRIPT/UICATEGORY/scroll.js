// ACTIVA EL H2 CUANDO SE LE DA SCROLL

export function activarTituloSticky() {

    const section = document.getElementById("bx-thief");
    const scrollContainer = document.querySelector(".secc-prncpl");
    const navBar = document.querySelector(".nav-category-bar");

    if (!section || !navBar || !scrollContainer) return;

    scrollContainer.addEventListener("scroll", () => {

        const sectionRect = section.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        if(sectionRect.bottom <= containerRect.top + -400) {
            navBar.classList.add("active");
        } else { 
            navBar.classList.remove("active");
        }
    });
}

// AL HACER CLICK EN EL TITULO DEL STICKY, EL SCROLL SE DEVUELVE AL PRINCIPIO

export function activarScrollTitulo () {
    const navLink = document.getElementById("nav-title-link");
    const scrollContainer = document.querySelector(".secc-prncpl");
    
    if(navLink && scrollContainer){
        navLink.addEventListener("click", (e) => {
            e.preventDefault();
    
            scrollContainer.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
};