const container = document.querySelector('.container');
const resetButton = document.querySelector('#resetButton');
const borderToggle = document.querySelector('#borderToggle'); // Get the checkbox element
const customContextMenu = document.getElementById('customContextMenu');
const saveDrawingOption = document.getElementById('saveDrawing');
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

// Prevent the default right-click menu
container.addEventListener('contextmenu', function (e) {
    e.preventDefault();  
    customContextMenu.style.display = 'block';
    customContextMenu.style.left = `${e.pageX}px`;
    customContextMenu.style.top = `${e.pageY}px`;
});

// Hide custom context menu if clicking elsewhere
document.addEventListener('click', function () {
    customContextMenu.style.display = 'none';
});

// Save drawing when clicking the 'Save Drawing' option
saveDrawingOption.addEventListener('click', function () {
    customContextMenu.style.display = 'none'; // Hide menu after clicking

    // Create a canvas and draw the current grid state on it
    const canvas = document.createElement('canvas');
    const gridSquares = document.querySelectorAll('.grid-square');
    const gridSize = Math.sqrt(gridSquares.length);  // Assuming the grid is a square
    const squareSize = container.offsetWidth / gridSize;  // Calculate size of each square

    // Set canvas size to match the container
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    const ctx = canvas.getContext('2d');

    // Loop over all grid squares and draw their background colors onto the canvas
    gridSquares.forEach((square, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const color = window.getComputedStyle(square).backgroundColor;
        ctx.fillStyle = color;
        ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
    });

    // Convert canvas to image and trigger download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'etch-a-sketch-drawing.png';
    link.click();
});