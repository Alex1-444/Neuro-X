// renderiza 

export function renderizar(container, data = [], crearCard) {
    if (!container) return;

    const html = data.map(item => crearCard(item)).join('');
    container.innerHTML = html;
}