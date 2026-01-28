lucide.createIcons();

// ------- se activa una pagina a la vez, flechas, izq, der -------

const pages = document.querySelectorAll('.page');
let current = 0;

function showPage(index) {
    pages.forEach(page => page.classList.remove('active'));
    pages[index].classList.add('active');
}

document.getElementById('next').addEventListener('click', () => {
    current = (current + 1) % pages.length;
    showPage(current);
});

document.getElementById('prev').addEventListener('click', () => {
    current = (current - 1 + pages.length) % pages.length;
    showPage(current);
});



// -------- PAUSAR CARRUSEL AL SELECCIONARLO CON EL PUNTERO Y CAMBIAR DE TARJETA CADA 5 SEGUNDOS --------

const cards = document.querySelectorAll(".box2-page3");
const container = document.querySelector(".box-page3");

let currentIndex = 1;
let rotationInterval;

function rotationCard(index) {
    cards.forEach(card => card.classList.remove("active"));
    cards[index].classList.add("active");
    currentIndex = index;
}

function startRotation () {
    stopRotation();
    rotationInterval = setInterval (() => {
        let nextIndex = (currentIndex + 1) % cards.length;
        rotationCard(nextIndex);
    }, 5000);
}

function stopRotation () {
    clearInterval(rotationInterval);
}

startRotation();

container.addEventListener("mouseenter", stopRotation);
container.addEventListener("mouseleave", startRotation);

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        rotationCard(index);
    });
});