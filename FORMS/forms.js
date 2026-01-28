// -------- CREACION DE ICONOS --------

lucide.createIcons();

// -------- CAMBIO DE FORM: INICIAR SESION AND REGISTRATE --------

const authCard = document.getElementById("authCard");

document.getElementById("goRegister").onclick = () => {
    authCard.classList.add("register-active");
};

document.getElementById("goLogin").onclick = () => {
    authCard.classList.remove("register-active");
};

// --------- MOSTRAR CONTRASEÑA CON UN CLICK ----------

document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = document.getElementById(icon.dataset.target);
        const eye = icon.querySelector("svg");
        
        if(input.type === "password") {
            input.type = "text";
            eye.setAttribute("data-lucide", "eye-off");
        } else {
            input.type = "password";
            eye.setAttribute("data-lucide", "eye");
        }
        
        lucide.createIcons();
    });
});