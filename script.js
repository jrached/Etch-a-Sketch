// Make grid

const makeGrid = (numBox) => {

    let board = document.querySelector(".board");
    let styles = window.getComputedStyle(board);
    console.log(styles.height)

    let border = 1;

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
            box.style.border = "" + border + "px solid purple";
            box.style.height = "" + boxWidth + "px";
            box.style.width = "" + boxHeight + "px";

            row.appendChild(box);

        }

        board.appendChild(row)
    }

}

document.addEventListener("DOMContentLoaded", function () {
    makeGrid(32);
});
