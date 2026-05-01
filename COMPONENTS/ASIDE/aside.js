fetch("/COMPONENTS/ASIDE/aside.html")
.then(res => res.text())
.then(html => {
    document.getElementById("mn--aside").innerHTML = html;

    lucide.createIcons();

    const links = document.querySelectorAll(".bx--link");

    links.forEach(link => {

        const categoria = link.getAttribute("data-category");
        const nombreVisible = categoria.replace(/-/g, " ")

        // -------- OVERLAY --------
        if (categoria) {
            const overlay = document.createElement("div");
            overlay.className = "overlay--categories";
            overlay.innerHTML = `<span class="text--overlay">${nombreVisible}</span>`;
            link.appendChild(overlay);
        }

        // -------- EVENTO CLICK --------
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const categoria = link.dataset.category;

            window.location.href = `/CATEGORIAS/categorias.html?cat=${categoria}`;
        });

    });

})
.catch(err => console.error("Error al cargar el menú:", err));