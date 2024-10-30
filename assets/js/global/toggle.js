// Selecionando elementos do DOM
const slider = document.getElementById('slider');
const colorToggle = document.getElementById('colorToggle');
const markers = document.querySelectorAll('.marker');
const sliderImage = document.getElementById('sliderImage');
const poemaContainer = document.getElementById('poema-container'); // Certifique-se de ter este elemento no HTML

const markerPositions = Array.from(markers).map(marker => parseInt(marker.style.left));

const gradients = [
    '#87CEFA', // Inverno (azul claro)
    '#FFDEAD', // Outono (bege)
    '#98FB98', // Primavera (verde claro)
    '#e6ff66'  // Verão (amarelo)
];

const images = [
    'assets/images/pages/popup/inverno.png',
    'assets/images/pages/popup/outono.png',
    'assets/images/pages/popup/primavera.png',
    'assets/images/pages/popup/verão.png'
];

// Definindo os poemas para cada estação
const poemas = {
    inverno: "Poema do Inverno: O frio que envolve e encanta...",
    primavera: "Poema da Primavera: Flores que nascem e renascem...",
    verao: "Poema do Verão: Sol radiante e dias longos...",
    outono: "Poema do Outono: Folhas caindo e ventos suaves..."
};

let isDragging = false;
let clickCount = 0;
let clickTimeout;

// Função para mudar o fundo e a imagem
function changeBackgroundColorAndImage(position) {
    const index = markerPositions.indexOf(position);
    if (index !== -1) {
        const selectedColor = gradients[index];

        document.body.style.background = selectedColor; 
        document.querySelector('.nav-list').style.background = selectedColor;
        sliderImage.src = images[index];

        // Exibe o poema correspondente
        const themes = ['inverno', 'outono', 'primavera', 'verao'];
        const selectedTheme = themes[index]; // Obtém o tema correspondente
        mostrarPoema(selectedTheme);

        // Salva a cor selecionada no localStorage
        localStorage.setItem('corSelecionada', selectedColor);
    }
}

// Função para mostrar o poema na página
function mostrarPoema(tema) {
    const poema = poemas[tema];
    poemaContainer.textContent = poema; // Exibe o poema no container

    // Salva o poema no localStorage
    localStorage.setItem('poemaSelecionado', poema);
    console.log('Poema salvo no localStorage:', poema); // Log para verificação
}

// Função chamada ao selecionar uma opção
function selecionarOpcao(estacao) {
    const temas = {
        Inverno: 'inverno',
        Outono: 'outono',
        Primavera: 'primavera',
        Verão: 'verao'
    };
    
    const selectedTheme = temas[estacao];
    mostrarPoema(selectedTheme);
    
    // Atualiza o slider para a posição correta
    const index = Object.keys(temas).indexOf(estacao);
    if (index !== -1) {
        moveSliderToClosestMarker(markerPositions[index]);
    }
}

// Função para mover o slider para o marcador mais próximo
function moveSliderToClosestMarker(newLeft) {
    const sliderWidth = slider.offsetWidth;
    let closestMarker = markerPositions[0];

    markerPositions.forEach(position => {
        if (Math.abs(newLeft + sliderWidth / 2 - position) < Math.abs(newLeft + sliderWidth / 2 - closestMarker)) {
            closestMarker = position;
        }
    });

    slider.style.left = (closestMarker - sliderWidth / 2) + 'px';
    changeBackgroundColorAndImage(closestMarker);
}

// Função para arrastar o slider
function dragSlider(e) {
    const toggleRect = colorToggle.getBoundingClientRect();
    const sliderWidth = slider.offsetWidth;
    const maxLeft = toggleRect.width - sliderWidth;

    let newLeft = e.clientX - toggleRect.left - sliderWidth / 2;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;

    slider.style.left = newLeft + 'px';
}

slider.addEventListener('mousedown', (e) => {
    clickCount++;
    if (clickCount > 1) {
        e.preventDefault();
        clearTimeout(clickTimeout);
        clickCount = 0;
        return;
    }

    clickTimeout = setTimeout(() => {
        clickCount = 0;
    }, 300);

    isDragging = true;

    const mouseMoveHandler = (e) => {
        if (isDragging) {
            dragSlider(e);
        }
    };

    const mouseUpHandler = (e) => {
        isDragging = false;
        moveSliderToClosestMarker(slider.offsetLeft);
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

slider.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Inicializa a posição do slider
document.addEventListener('DOMContentLoaded', () => {
    // Mover o slider para a posição do primeiro marcador por padrão
    changeBackgroundColorAndImage(markerPositions[0]);

    // Aplicar a cor armazenada do localStorage se existir
    const savedColor = localStorage.getItem('corSelecionada');
    const savedPoem = localStorage.getItem('poemaSelecionado');

    if (savedColor) {
        document.body.style.background = savedColor;
        document.querySelector('.nav-list').style.background = savedColor; // Aplica a cor ao nav-list
    } else {
        // Se não houver cor salva, defina uma cor padrão
        const defaultColor = '#FFFFFF'; // Cor padrão
        document.body.style.background = defaultColor;
        document.querySelector('.nav-list').style.background = defaultColor; // Cor padrão para nav-list
    }

    // Exibe o poema salvo se existir
    const poemDisplay = document.getElementById('poema-container'); // Certifique-se de que o ID está correto
    if (savedPoem) {
        poemDisplay.innerText = savedPoem;
    }
});
// Função para redirecionar e salvar a cor
function redirectToSite() {
    const currentColor = document.body.style.backgroundColor; // Obtém a cor atual
    localStorage.setItem('corSelecionada', currentColor); // Salva a cor no localStorage
    window.location.href = 'index1.html'; // Redireciona para o index.html
}
