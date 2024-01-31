const GRAY = "rgb(61, 61, 61)";
const WHITE = "rgb(245, 244, 244)";
let gridSize = 16;
let colors = [];
let toggleGrid = true;
let erase = false;
let stateCounter = 0;
let gridColor = "rgb(245, 244, 244)";
let paintColor = "rgb(61, 61, 61)";
let backColor = "rgb(233, 241, 245)";
let btnColor = "rgb(136, 93, 9)";
let slider = document.querySelector(".sizeSelector");
let swatch = document.querySelector(".swatch");
let colorDisplay = document.querySelector(".box1 .text");
let modeDisplay = document.querySelector(".box2 .text");
let modeBtn = document.querySelector(".box2 .btn");

// /////////////////////////// Functions ////////////////////////////

// Make grid
const makeGrid = (numBox, toggle) => {

    let board = document.querySelector(".board");
    let styles = window.getComputedStyle(board);

    // Color matrix preserves colors when grid is
    // destroyed and rebuilt after window resize.
    if (colors.length == 0) {
        for (let i = 0; i < numBox; i++) {
            colors[i] = [];
            for (let j = 0; j < numBox; j++) {
                colors[i][j] = gridColor;
            }
        }
    }

    let border = 1;

    // Clear existing rows
    board.innerHTML = "";

    for (let i = 0; i < numBox; i++) {

        let row = document.createElement("div");
        row.style.display = "flex";

        for (let j = 0; j < numBox; j++) {

            width = styles.width;
            width = width.slice(0, 3);
            height = styles.height;
            height = height.slice(0,3);

            boxWidth = +width / numBox;
            boxHeight = +height / numBox;

            let box = document.createElement("div");

            box.id = "" + i + " " + j;
            if (toggle == true) {
                boxWidth = boxWidth- 2 * border;
                boxHeight = boxHeight - 2 * border;
                box.style.border = "" + border + "px solid rgb(92, 92, 92)";
                box.style["border-radius"] = "15%";
            }
            box.style.height = "" + boxWidth + "px";
            box.style.width = "" + boxHeight + "px";
            box.style["background-color"] = colors[i][j];

            // Update current color and color array.
            box.addEventListener("mouseenter", () => {
                let [i, j] = box.id.split(" ");
                let currColor = getColor(paintColor, stateCounter, erase);
                box.style["background-color"] = currColor;
                colors[i][j] = currColor;
            })

            row.appendChild(box);
        }
        board.appendChild(row)
    }
}

// Update board size
const updateBoardSize = () => {

    let board = document.querySelector(".board");
    let frame = document.querySelector(".frame");
    let windowWidth = window.innerWidth;

    if (windowWidth <= 650) {
        board.style.width = "250px";
        board.style.height = "250px";
        frame.style.width = "300px";
        frame.style.height = "300px";
    } else {
        board.style.width = "450px";
        board.style.height = "450px";
        frame.style.width = "90%";
        frame.style.height = "550px";
    }
}

//  Rainbow mode
const rainbowMode = () => {
    r = Math.floor(256*Math.random());
    g = Math.floor(256*Math.random());
    b = Math.floor(256*Math.random());

    return "rgb(" + r + "," + g + "," + b +")";
}

// Color state machine
const getColor = (color, state, eraser) => {

    if (eraser == true) {
        return WHITE
    } else {
        if (state % 3 == 0) {
            return color;
        } else if (state % 3 == 1) {
            return rainbowMode();
        } else {
            return color;
        }
    }
}

const displayMode = (state) => {
    if (state % 3 == 0) {
        modeDisplay.textContent = "Normal";
    } else if (state % 3 == 1) {
        modeDisplay.textContent = "Rainbow";
    } else {
        modeDisplay.textContent = "Grayscale";
    }
}

// print color name
const colorName = (colorHex) => {
    if (colorHex == "#ffffff") {return "White";}
    else if (colorHex == "#000000") {return "Black"}
    else if (colorHex == "#3d3d3d") {return "Dark Gray"}
    else if (colorHex == "#ff0000") {return "Red"}
    else if (colorHex == "#00ffff") {return "Cyan"}
    else if (colorHex == "#0000ff") {return "Blue"}
    else if (colorHex == "#00008b") {return "Dark Blue"}
    else if (colorHex == "#add8e6") {return "Light Blue"}
    else if (colorHex == "#800080") {return "Purple"}
    else if (colorHex == "#ffff00") {return "Yellow"}
    else if (colorHex == "#00ff00") {return "Lime"}
    else if (colorHex == "#ff00ff") {return "Magenta"}
    else if (colorHex == "#ffc0cb") {return "Pink"}
    else if (colorHex == "#c0c0c0") {return "Silver"}
    else if (colorHex == "#808080") {return "Gray"}
    else if (colorHex == "#ffa500") {return "Orange"}
    else if (colorHex == "#a52a2a") {return "Brown"}
    else if (colorHex == "#800000") {return "Maroon"}
    else if (colorHex == "#008000") {return "Green"}
    else if (colorHex == "#808000") {return "Olive"}
    else if (colorHex == "#7fffd4") {return "Aquamarine"}
    else {return colorHex};
}


// ////////////////////////// Event Listeners /////////////////////////////////

// DOM's loaded listener.
document.addEventListener("DOMContentLoaded", function () {
    makeGrid(gridSize, toggleGrid);
});

// Resize listeners
window.addEventListener("resize", updateBoardSize);
window.addEventListener("resize", () => {
    makeGrid(gridSize, toggleGrid);
});

// Slider listeners
slider.addEventListener("input", function () {
    let sizeDisplay = document.querySelector(".size");

    sizeDisplay.textContent = "" + this.value + " x " + this.value;
});

slider.addEventListener("input", function () {
    gridSize = this.value;

    // reset colors array to new size.
    for (let i = 0; i < gridSize; i++) {
        colors[i] = [];
        for (let j = 0; j < gridSize; j++) {
            colors[i][j] = gridColor;
        }
    }

    makeGrid(gridSize, toggleGrid);
})

// Menu buttons listeners
let btn1 = document.querySelector(".option1"),
    btn2 = document.querySelector(".option2"),
    btn3 = document.querySelector(".option3"),
    btn4 = document.querySelector(".option4");

btn1.addEventListener("click", () => {
    btn1.style.color = backColor;
    btn1.style["background-color"] = btnColor;

    btn2.style.color = btnColor;
    btn2.style["background-color"] = backColor;

    erase = false;
})

btn2.addEventListener("click", () => {
    btn2.style.color = backColor;
    btn2.style["background-color"] = btnColor;

    btn1.style.color = btnColor;
    btn1.style["background-color"] = backColor;

    erase = true;
})

btn3.addEventListener("click", () => {
    colors = [];
    makeGrid(gridSize, toggleGrid);
})

btn4.addEventListener("click", () => {
    toggleGrid = !toggleGrid;
    makeGrid(gridSize, toggleGrid);
})

// Color swatch listeners
swatch.addEventListener("input", (e) => {
    paintColor = e.target.value;
    colorDisplay.textContent = colorName(e.target.value);
})

// Add mode button listener
modeBtn.addEventListener("click", () => {
    stateCounter += 1;
    displayMode(stateCounter);
})