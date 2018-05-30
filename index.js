const acceleration = 100;
const initialSpeed = 1000;
const dropSpeed = 10;
const drawDelay = 10;

const initialize = () => {
    const button = document.querySelector("#startGame");
    button.addEventListener("click", startUpSequence);

    Renderer.renderFrame(State.getEmptyState(), true);
    setTimeout(() => {
        button.removeAttribute("disabled");
        Renderer.clearCanvas(arenaCanvas);
    }, 1000);
}

const copyState = (state) => {
    return state.map((row) => {
        return row.map((column) => {
            return Object.assign({}, column);
        });
    });
}

const drawStreakState = (previous) => {
    if(!previous || !previous.length) {
        return getEmptyState();
    }

    const newState = copyState(previous);

    // Move the row data occupation state down by one line.
    // Ignore the last row state
    for (let rowIndex = rowCount - 2; rowIndex >= 0; rowIndex--) {
        for(let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            // Move down the state
            newState[rowIndex + 1][columnIndex].blockType = newState[rowIndex][columnIndex].blockType;

            if (rowIndex === 0) {
                switch(newState[rowIndex + 1][columnIndex].blockType) {
                    case BlockType.BLOCK:
                        newState[rowIndex][columnIndex].blockType = BlockType.TAIL_START;
                        break;
                    case BlockType.TAIL_START:
                        newState[rowIndex][columnIndex].blockType = BlockType.TAIL_END;
                        break;
                    default:
                        newState[rowIndex][columnIndex].blockType = BlockType.NONE
                        break;
                }
            }
        }

        if (Math.random(0, 1) < 0.2) {
            const streakColumn = Math.floor(Math.random(0, 1) * columnCount);
            newState[rowIndex][streakColumn].blockType = BlockType.BLOCK;
        }
    }

    return newState;
}

const getShipSprites = () => {
    const centerBlock = Math.floor(columnCount/2);
    const shipStart = State.getEmptyState();
    const shipNormal = State.getEmptyState();
    const shipForward = State.getEmptyState();

    shipStart[rowCount - 1].blockType = BlockType.BLOCK;

    shipForward[rowCount - 3][centerBlock].blockType = BlockType.BLOCK;
    shipForward[rowCount - 2][centerBlock - 1].blockType = BlockType.BLOCK;
    shipForward[rowCount - 2][centerBlock].blockType = BlockType.BLOCK;
    shipForward[rowCount - 2][centerBlock + 1].blockType = BlockType.BLOCK;

    shipNormal[rowCount - 2][centerBlock].blockType = BlockType.BLOCK;
    shipNormal[rowCount - 1][centerBlock - 1].blockType = BlockType.BLOCK;
    shipNormal[rowCount - 1][centerBlock].blockType = BlockType.BLOCK;
    shipNormal[rowCount - 1][centerBlock + 1].blockType = BlockType.BLOCK;

    return [shipStart, shipNormal, shipForward];
}

const startUpSequence = () => {
    const shipSprites = getShipSprites();
    let previousStreakState;
    let shipFrame = 0;

    const shipFrameHandle = setInterval(() => {
        shipFrame++;

        if (shipFrame > 2) {
            shipFrame = 1;
            clearInterval(shipFrameHandle);
        }
    }, 300);

    const intervalHandle = setInterval(() => {
        // Clean the canvas
        Renderer.clearCanvas(arenaCanvas);

        // Store the last streak state for calculations
        previousStreakState = drawStreakState(previousStreakState);

        // Ship layer
        const shipLayer = [...shipSprites[shipFrame]];

        // Render the next frame
        Renderer.renderFrame(State.mergeState(previousStreakState, shipLayer));
    }, 10);
};

initialize();