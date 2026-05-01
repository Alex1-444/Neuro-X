// CONTROLA LA BARRA LATERAL (SALE Y SE ESCONDE)

export function initTogglePanel () {
    const btn = document.getElementById('toggle-btn');
    const panel = document.getElementById('info-panel');
    const layout = document.querySelector(".section-bx");
    
    btn.addEventListener('click', () => {
    const isHidden = panel.classList.toggle('is-hidden');
    layout.classList.toggle('expanded');

    if (isHidden) {
        panel.scrollTop = 0; // Resetea el scroll al ocultar el panel
    }
    
    const icon = btn.querySelector('svg');
    if (icon) {
        icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    }
    icon.classList.toggle('rotate', !isHidden);
    });
}