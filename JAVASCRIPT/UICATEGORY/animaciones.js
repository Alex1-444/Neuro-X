export function animarEntrada(featureSection, section) {
    if (featureSection) {
        requestAnimationFrame(() => {
            featureSection.style.opacity = "1";
            featureSection.style.transform = "translateY(0)";
        });
    }

    if (section) {
        requestAnimationFrame(() => {
            section.style.opacity = "1";
            section.style.transform = "translateY(10px)";
        })
    }
}