const container = document.querySelector('.container');
const resetButton = document.querySelector('#resetButton');
const borderToggle = document.querySelector('#borderToggle'); // Get the checkbox element
let gridSize = 16; // Default grid size

// Random RGB color generator
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

// Function to progressively darken a color
function darkenColor(rgb, factor) {
    const r = Math.floor(rgb.r * (1 - factor));
    const g = Math.floor(rgb.g * (1 - factor));
    const b = Math.floor(rgb.b * (1 - factor));
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
    container.innerHTML = ''; // Clear the container

    const squareSize = 960 / size; 
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        let rgbColor = randomColor(); // Initial random color
        let darkenFactor = 0; // Initialize darkening factor

        // Add hover effect for random color darkening
        square.addEventListener('mouseenter', () => {
            if (darkenFactor < 1) {
                darkenFactor += 0.1;
                square.style.backgroundColor = darkenColor(rgbColor, darkenFactor);
            }
        });

        container.appendChild(square);
    }

    // Check the checkbox status to toggle borders
    toggleBorders(borderToggle.checked);
}

// Function to toggle borders on or off
function toggleBorders(showBorders) {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.border = showBorders ? '1px solid #ddd' : 'none'; // Toggle border
    });
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

// Listen for checkbox changes to toggle borders dynamically
borderToggle.addEventListener('change', (e) => {
    toggleBorders(e.target.checked);
});

// Initialize the grid
createGrid(gridSize);
