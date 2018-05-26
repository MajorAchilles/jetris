let matrix = null;

const createMatrix = () => {
    matrix = [];

    const rowCount = (arenaHeight - (offset * 2))/blockHeight;
    const columnCount = (arenaWidth - (offset * 2))/blockHeight;

    for (let i = 0; i < rowCount; i++) {
        const innerArray = [];
        for (let j = 0; j < columnCount; j++) {
            innerArray.push({ top: i * blockHeight + offset, left: j * blockWidth  + offset});
        }
        matrix.push(innerArray);
    }
};

const getCoordinates = (rowIndex = 0, columnIndex = 0) => {
    const { left, top }  = matrix[rowIndex][columnIndex];
    return {
        left,
        top
    };
}

const Matrix = {
    create: createMatrix,
    getCoordinates
}