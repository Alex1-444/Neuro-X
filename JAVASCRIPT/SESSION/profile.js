// PERFIL / SESIÓN

export function initProfile() {
    const isLoggedId = localStorage.getItem("userLogged") === "true";
    const profileImg = document.getElementById("profile-img");
    const profileIcon = document.getElementById("profile-icon");

    if (profileImg && profileIcon) {
        if (isLoggedId) {
            profileImg.src = localStorage.getItem("profileImage");
            profileImg.style.display = "block";
            profileIcon.style.display = "none";
        } else {
            profileImg.style.display = "none";
            profileIcon.style.display = "block";
        }
    }
}