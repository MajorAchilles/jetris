const getEmptyState = () => {
    const stateMatrix = [];
    for (let i = 0; i < rowCount; i++) {
        const innerArray = [];
        for (let j = 0; j < columnCount; j++) {
            innerArray.push(BlockType.NONE);
        }
        stateMatrix.push(innerArray);
    }
    return stateMatrix;
};

const getPositionMask = () => {
    const positionMatrix = [];
    for (let i = 0; i < rowCount; i++) {
        const innerArray = [];
        for (let j = 0; j < columnCount; j++) {
            innerArray.push({
                top: i * blockHeight + offset,
                left: j * blockWidth  + offset
            });
        }
        positionMatrix.push(innerArray);
    }
    return positionMatrix;
}

const getStateData = (stateMatrix, rowIndex = 0, columnIndex = 0) => {
    return stateMatrix[rowIndex][columnIndex];
}

const mergeState = (previous, next) => {
    return previous.map((previousRow, rowIndex) => {
        const nextRow = next[rowIndex];
        const mergedRow = previousRow.map((previousColumn, columnIndex) => {
            const nextColumn = nextRow[columnIndex];
            return nextColumn === BlockType.NONE ? previousColumn : nextColumn;
        });
        return mergedRow;
    })
};

const copyState = state => state.map(row => [...row]);

const State = {
    copyState,
    getEmptyState,
    getPositionMask,
    getStateData,
    mergeState
}