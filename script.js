// script.js
const container = document.querySelector('.container');
const resetButton = document.querySelector('#resetButton');
let gridSize = 16; // Default grid size

function createGrid(size) {
    container.innerHTML = ''; // Clear the container

    const squareSize = 960 / size; // Set the square size to maintain the container size
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Add hover effect
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = 'black';
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
