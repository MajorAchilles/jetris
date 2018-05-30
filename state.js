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
    return previous.map((row, rowIndex) => {
        const nextRow = next[rowIndex];
        const mergedRow = row.map((column, columnIndex) => {
            const nextColumn = nextRow[columnIndex];
            return Object.assign({}, column, nextColumn.blockType === BlockType.NONE ? {} : { blockType: nextColumn.blockType })
        });
        return mergedRow;
    })
};

const State = {
    getEmptyState,
    getPositionMask,
    getStateData,
    mergeState
}