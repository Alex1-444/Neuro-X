
// --- LIKES ---

export function getLikes() {
    return JSON.parse(localStorage.getItem("mis_likes")) || [];
}

export function toggleLike(id) {
    let likes = getLikes();
    const idS = String(id);
    const existe = likes.includes(idS);

    likes = existe ? likes.filter(item => item !== idS) : [...likes, idS];

    localStorage.setItem("mis_likes", JSON.stringify(likes));
    return !existe; // Retorna true si ahora es un like
}

export function isLikeado(id) {
    return getLikes().includes(String(id));
}

// --- LISTAS PERSONALIZADAS ---

export function getListas() {
    // Inicializamos con "Favoritos" por defecto para evitar errores de lectura
    return JSON.parse(localStorage.getItem("neurox_listas")) || { "Favoritos": [] };
}

export function saveListas(listas) {
    localStorage.setItem("neurox_listas", JSON.stringify(listas));
}

export function crearNuevaLista(nombre) {
    const listas = getListas();
    if (!listas[nombre]) {
        listas[nombre] = [];
        saveListas(listas);
    }
}

/**
 * Función CLAVE para el Modal: Sincroniza un ítem en múltiples listas a la vez.
 * @param {string} itemId - ID del contenido.
 * @param {Set|Array} nombresListasSeleccionadas - Listas donde el ítem DEBE estar.
 */
export function sincronizarItemEnListas(itemId, nombresListasSeleccionadas) {
    const listas = getListas();
    const idS = String(itemId);
    const seleccionadas = new Set(nombresListasSeleccionadas);

    Object.keys(listas).forEach(nombre => {
        // 1. Quitamos el ID de todas las listas primero
        listas[nombre] = listas[nombre].filter(id => String(id) !== idS);
        
        // 2. Si la lista estaba en la selección, lo volvemos a añadir
        if (seleccionadas.has(nombre)) {
            listas[nombre].push(idS);
        }
    });

    localStorage.setItem("neurox_listas", JSON.stringify(listas));
    return listas;
}

/**
 * Verifica si un ítem está en CUALQUIER lista (útil para el estado del botón Guardar)
 */
export function isGuardadoEnAlgunaLista(id) {
    const listas = getListas();
    const idS = String(id);
    return Object.values(listas).some(lista => lista.includes(idS));
}

/**
 * Alterna un item en una sola lista (para uso rápido fuera del modal)
 */
export function toggleItemEnLista(id, nombreLista) {
    const listas = getListas();
    const idS = String(id);
    
    if (!listas[nombreLista]) listas[nombreLista] = [];

    const existe = listas[nombreLista].includes(idS);
    listas[nombreLista] = existe 
        ? listas[nombreLista].filter(i => i !== idS) 
        : [...listas[nombreLista], idS];

    localStorage.setItem("neurox_listas", JSON.stringify(listas));
    return !existe;
}

// --- FUNCIONES DE COMPATIBILIDAD (Para no romper home.js) ---

/**
 * Retorna los IDs de la lista "Favoritos" 
 * (Equivale al antiguo getGuardados)
 */
export function getGuardados() {
    const listas = getListas();
    return listas["Favoritos"] || [];
}

/**
 * Alterna un ítem en la lista de "Favoritos"
 */
export function toggleGuardar(id) {
    return toggleItemEnLista(id, "Favoritos");
}

/**
 * Verifica si está en la lista de Favoritos
 */
export function isGuardado(id) {
    return getGuardados().includes(String(id));
}