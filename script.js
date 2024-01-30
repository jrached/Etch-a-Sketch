let gridSize = 16;
let gridColor = "rgb(245, 244, 244)";
let paintColor = "rgb(60, 60, 60)";
let backColor = "rgb(233, 241, 245)";
let btnColor = "rgb(136, 93, 9)";
let slider = document.querySelector(".sizeSelector");
let colors = [];

// /////////////////////////// Functions ////////////////////////////

// Make grid
const makeGrid = (numBox) => {

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

            boxWidth = +width / numBox - 2 * border;
            boxHeight = +height / numBox - 2 * border;

            let box = document.createElement("div");

            box.id = "" + i + " " + j;
            box.style.border = "" + border + "px solid rgb(92, 92, 92)";
            box.style.height = "" + boxWidth + "px";
            box.style.width = "" + boxHeight + "px";
            box.style["border-radius"] = "15%";
            box.style["background-color"] = colors[i][j];

            // Update current color and color array.
            box.addEventListener("mouseenter", () => {
                let [i, j] = box.id.split(" ");
                box.style["background-color"] = paintColor;
                colors[i][j] = paintColor;
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


// ////////////////////////// Event Listeners /////////////////////////////////

// Make initial grid.
document.addEventListener("DOMContentLoaded", function () {
    makeGrid(gridSize);
});

// Resize the board and the grids when the window gets resized
// to less than or equal to 650px width.
window.addEventListener("resize", updateBoardSize);
window.addEventListener("resize", () => {
    makeGrid(gridSize);
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

    makeGrid(gridSize);
})

// Buttons event listeners
let btn1 = document.querySelector(".option1"),
    btn2 = document.querySelector(".option2"),
    btn3 = document.querySelector(".option3"),
    btn4 = document.querySelector(".option4");

btn1.addEventListener("click", () => {
    btn1.style.color = backColor;
    btn1.style["background-color"] = btnColor;

    btn2.style.color = btnColor;
    btn2.style["background-color"] = backColor;

    btn4.style.color = btnColor;
    btn4.style["background-color"] = backColor;

    paintColor = "rgb(60, 60, 60)";
})

btn2.addEventListener("click", () => {
    btn2.style.color = backColor;
    btn2.style["background-color"] = btnColor;

    btn1.style.color = btnColor;
    btn1.style["background-color"] = backColor;

    btn4.style.color = btnColor;
    btn4.style["background-color"] = backColor;

    paintColor = "rgb(245, 244, 244)";
})

btn3.addEventListener("click", () => {
    colors = [];
    makeGrid(gridSize);
})

btn4.addEventListener("click", () => {
    btn4.style.color = backColor;
    btn4.style["background-color"] = btnColor;

    btn2.style.color = btnColor;
    btn2.style["background-color"] = backColor;

    btn1.style.color = btnColor;
    btn1.style["background-color"] = backColor;
})

