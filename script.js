let gridSize = 16;

// /////////////////////////// Functions ////////////////////////////

// Make grid
const makeGrid = (numBox) => {

    let board = document.querySelector(".board");
    let styles = window.getComputedStyle(board);

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
            box.style.border = "" + border + "px solid rgb(92, 92, 92)";
            box.style.height = "" + boxWidth + "px";
            box.style.width = "" + boxHeight + "px";
            box.style["border-radius"] = "15%";

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


// ////////////////////////// Main /////////////////////////////////
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

let slider = document.querySelector(".sizeSelector");

slider.addEventListener("input", function () {
    let sizeDisplay = document.querySelector(".size");

    sizeDisplay.textContent = "" + this.value + " x " + this.value;
});

slider.addEventListener("input", function () {
    gridSize = this.value;
    makeGrid(gridSize);
})