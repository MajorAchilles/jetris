const drawStreakState = (previous) => {
    if(!previous || !previous.length) {
        return getEmptyState();
    }

    const newState = State.copyState(previous);

    // Move the row data occupation state down by one line.
    // Ignore the last row state
    for (let rowIndex = rowCount - 2; rowIndex >= 0; rowIndex--) {
        for(let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            // Move down the state
            newState[rowIndex + 1][columnIndex] = newState[rowIndex][columnIndex];

            if (rowIndex === 0) {
                switch(newState[rowIndex + 1][columnIndex]) {
                    case BlockType.BLOCK:
                        newState[rowIndex][columnIndex] = BlockType.TAIL_START;
                        break;
                    case BlockType.TAIL_START:
                        newState[rowIndex][columnIndex] = BlockType.TAIL_END;
                        break;
                    default:
                        newState[rowIndex][columnIndex] = BlockType.NONE
                        break;
                }
            }
        }

        if (Math.random(0, 1) < 0.2) {
            const streakColumn = Math.floor(Math.random(0, 1) * columnCount);
            newState[rowIndex][streakColumn] = BlockType.BLOCK;
        }
    }

    return newState;
}

const getShipSprites = () => {
    const centerBlock = Math.floor(columnCount/2);
    const shipStart = State.getEmptyState();
    const shipNormal = State.getEmptyState();
    const shipForward = State.getEmptyState();

    shipStart[rowCount - 1][centerBlock] = BlockType.BLOCK;

    shipForward[rowCount - 3][centerBlock] = BlockType.BLOCK;
    shipForward[rowCount - 2][centerBlock - 1] = BlockType.BLOCK;
    shipForward[rowCount - 2][centerBlock] = BlockType.BLOCK;
    shipForward[rowCount - 2][centerBlock + 1] = BlockType.BLOCK;

    shipNormal[rowCount - 2][centerBlock] = BlockType.BLOCK;
    shipNormal[rowCount - 1][centerBlock - 1] = BlockType.BLOCK;
    shipNormal[rowCount - 1][centerBlock] = BlockType.BLOCK;
    shipNormal[rowCount - 1][centerBlock + 1] = BlockType.BLOCK;

    return [shipStart, shipNormal, shipForward];
}

const Game = {
    drawStreakState,
    getShipSprites
};
