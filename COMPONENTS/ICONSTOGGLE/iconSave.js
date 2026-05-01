export function crearIconToggle(guardado) {
    return `
        <div class="icon ${guardado ? "active" : ""}">
            <i class="icon-add" data-lucide="bookmark"></i>
            <i class="icon-check" data-lucide="check-circle"></i>
        </div>
    `;
}