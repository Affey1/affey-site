const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));

document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('corSelecionada');
    const savedPoem = localStorage.getItem('poemaSelecionado');

    if (savedColor) {
        document.body.style.background = savedColor; // Aplica a cor salva
    }

    if (savedPoem) {
        const poemDisplay = document.getElementById('poema-container'); // Use o ID correto
        poemDisplay.innerText = savedPoem; // Exibe o poema salvo
        console.log('Poema exibido:', savedPoem); // Log para verificação
    } else {
        console.log('Nenhum poema encontrado no localStorage.'); // Log para depuração
    }
});
