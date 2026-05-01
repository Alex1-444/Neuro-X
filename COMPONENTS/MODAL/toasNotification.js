// --- FUNCIÓN DE NOTIFICACION DE GUARDADO ---
    export const mostrarOverlayFeedback = (mensaje) => {
        const anterior = document.querySelector(".overlay-feedback-toast");
        if (anterior) anterior.remove();

        const toast = document.createElement("div");
        toast.className = "overlay-feedback-toast";
        toast.innerHTML = `<span>${mensaje}</span>`;
        
        Object.assign(toast.style, {
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%) translateY(20px)",
            padding: "18px 30px",
            background: "#1f1f1f",
            color: "#ffff",
            borderRadius: "12px",
            fontSize: "17px",
            textTransform: "upperCase",
            letterSpacing: "0.04em",
            fontWeight: "700",
            zIndex: "10000",
            opacity: "0",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(255, 0, 0, 0.15)",
            border: "1px solid rgba(255, 0, 0, 0.25)",
            pointerEvents: "none",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        });

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateX(-50%) translateY(0)";
        });

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(-50%) translateY(10px)";
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    };