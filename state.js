const getEmptyState = () => {
    const stateMatrix = [];
    for (let i = 0; i < rowCount; i++) {
        const innerArray = [];
        for (let j = 0; j < columnCount; j++) {
            innerArray.push({
                top: i * blockHeight + offset,
                left: j * blockWidth  + offset,
                isOccupied: false,
                tailStart: false,
                tailEnd: false
            });
        }
        stateMatrix.push(innerArray);
    }
    return stateMatrix;
};

const getStateData = (stateMatrix, rowIndex = 0, columnIndex = 0) => {
    return stateMatrix[rowIndex][columnIndex];
}

const State = {
    getEmptyState,
    getStateData
}