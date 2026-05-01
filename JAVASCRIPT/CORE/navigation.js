// ========================
// NAVIGATION - ESTADO ACTIVO DE BOTONES
// ========================

export function setActiveNavButton() {
    const currentPath = window.location.pathname.toLowerCase();
    const homeBtn = document.querySelector(".bx--home");

    if (!homeBtn) return;

    // Removemos la clase primero para asegurar una limpieza si se llama varias veces
    homeBtn.classList.remove("active");

    const isHome = currentPath === '/' ||
    currentPath.endsWith('/') ||
    currentPath.includes('neurox.principal.html') ||
    currentPath.includes('index.html');

    if (isHome) {
        homeBtn.classList.add("active");
    }
}
