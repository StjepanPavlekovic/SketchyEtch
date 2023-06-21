const guide = document.querySelector("#guide");
const dialog = document.querySelector("#dialog");
const slider = document.querySelector(".slider");

const btnBlack = document.querySelector("#btnBlack");
const btnDark = document.querySelector("#btnDark");
const btnRainbow = document.querySelector("#btnRainbow");

const board = document.querySelector(".board");
const tiles = [];
const buttons = [btnBlack, btnDark, btnRainbow];

const currentResText = document.querySelector("#currentRes");

var selectedColorScheme = 0;
var resolution = 16;

window.onload = () => {
    generateNewGrid();
};

guide.addEventListener("click", () => {
    showModal();
});

const closeDialog = () => {
    dialog.close();
};

const showModal = () => {
    dialog.showModal();
};

const updateResolution = () => {
    resolution = slider.value;
    currentResText.innerText = `Current: ${resolution}`;
};

const setColorScheme = (id) => {
    for (let i = 0; i < buttons.length; i++) {
        if (i === id) buttons[i].classList.add("btnSelected");
        else buttons[i].classList.remove("btnSelected");
    }

    selectedColorScheme = id;
};

const resetBoard = () => {
    tiles.forEach((x) => x.remove());

    generateNewGrid();
};

const generateNewGrid = () => {
    const width = Math.floor(board.clientWidth / resolution) + 1;

    for (let i = 0; i < Math.pow(resolution, 2); i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.width = `${width}px`;
        tile.style.height = `${width}px`;

        tile.addEventListener("mouseover", (e) => setTileColor(e));

        board.appendChild(tile);
        tiles.push(tile);
    }
};

const setTileColor = (e) => {
    const tile = e.target;
    if (selectedColorScheme === 0) {
        if (tile.style.backgroundColor !== "rgb(0,0,0)")
            tile.style.backgroundColor = "rgb(0,0,0)";
        return;
    } else if (selectedColorScheme === 1) {
        darkenTile(tile);
        return;
    }
    tile.style.backgroundColor = getRandomColor();
};

const darkenTile = (tile) => {
    const computedStyle = getComputedStyle(tile);
    let color = computedStyle.backgroundColor;

    color = color.trim().toLowerCase();

    // Check if the color is in RGB format
    if (color.startsWith("rgb")) {
        // Extract the RGB values
        const match = color.match(/\d+/g);
        const r = parseInt(match[0]);
        const g = parseInt(match[1]);
        const b = parseInt(match[2]);

        // Darken the color by 10%
        const darkenAmount = 0.9;
        const newR = Math.floor(r * darkenAmount);
        const newG = Math.floor(g * darkenAmount);
        const newB = Math.floor(b * darkenAmount);

        // Return the updated RGB color
        color = `rgb(${newR}, ${newG}, ${newB})`;
    }

    // Return the original color if it's not in RGB format
    tile.style.backgroundColor = color;
};

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};
