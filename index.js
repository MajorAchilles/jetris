
let time = 0;
const initialize = () => {
    Matrix.create();
    matrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            setTimeout(() => {
                renderBlock(arenaContext, rowIndex, colIndex);
            }, time+=10);
        });
    });
}

initialize();