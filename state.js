const getEmptyState = () => {
    const stateMatrix = [];
    for (let i = 0; i < rowCount; i++) {
        const innerArray = [];
        for (let j = 0; j < columnCount; j++) {
            innerArray.push({
                top: i * blockHeight + offset,
                left: j * blockWidth  + offset,
                blockType: BlockType.NONE
            });
        }
        stateMatrix.push(innerArray);
    }
    return stateMatrix;
};

const getStateData = (stateMatrix, rowIndex = 0, columnIndex = 0) => {
    return stateMatrix[rowIndex][columnIndex];
}

const mergeState = (previous, current) => {
    return previous.map((row, rowIndex) => {
        const currentStateRow = current[rowIndex];
        row.forEach((column, columnIndex) => {
            if (currentStateRow[columnIndex].blockType !== BlockType.NONE) {
                column.blockType = currentStateRow[columnIndex].blockType;
            }
        });
        return row;
    })
};

const State = {
    getEmptyState,
    getStateData,
    mergeState
}