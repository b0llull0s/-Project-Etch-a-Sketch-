// script.js
const container = document.querySelector('.container');
const resetButton = document.querySelector('#resetButton');
let gridSize = 16; // Default grid size

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
    container.innerHTML = ''; // Clear the container

    const squareSize = 960 / size; // Set the square size to maintain the container size
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.opacity = 0; // Initialize opacity

        // Add hover effect for random color
        square.addEventListener('mouseenter', () => {
            let currentOpacity = parseFloat(square.dataset.opacity);
            if (currentOpacity < 1) {
                currentOpacity += 0.1;
                square.dataset.opacity = currentOpacity;
                square.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`; // Progressive darkening effect
            } else {
                square.style.backgroundColor = randomColor(); // Random color on subsequent interactions
            }
        });

        container.appendChild(square);
    }
}

// Reset the grid based on user input
resetButton.addEventListener('click', () => {
    let newSize = parseInt(prompt('Enter new grid size (max 100):'));
    if (newSize > 100) newSize = 100;
    if (newSize && newSize > 0) {
        gridSize = newSize;
        createGrid(gridSize);
    }
});

// Initialize the grid
createGrid(gridSize);

