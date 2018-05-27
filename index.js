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

const drawStreaks = (previousState) => {
    const currentState = previousState;

    // Move the row data occupation state down by one line.
    // Ignore the last row state
    for (let rowIndex = rowCount - 2; rowIndex >= 0; rowIndex--) {
        for(let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            // Move down the state
            currentState[rowIndex + 1][columnIndex].blockType = currentState[rowIndex][columnIndex].blockType;

            if (rowIndex === 0) {
                switch(currentState[rowIndex + 1][columnIndex].blockType) {
                    case BlockType.BLOCK:
                        currentState[rowIndex][columnIndex].blockType = BlockType.TAIL_START;
                        break;
                    case BlockType.TAIL_START:
                        currentState[rowIndex][columnIndex].blockType = BlockType.TAIL_END;
                        break;
                    default:
                        currentState[rowIndex][columnIndex].blockType = BlockType.NONE
                        break;
                }
            }
        }

        if (Math.random(0, 1) < 0.2) {
            const streakColumn = Math.floor(Math.random(0, 1) * columnCount);
            currentState[rowIndex][streakColumn].blockType = BlockType.BLOCK;
        }
    }

    return currentState;
}

const drawShip = (previousState, shipFrame) => {
    const centerBlock = Math.floor(columnCount/2);

    const currentState = State.getEmptyState();

    switch(shipFrame) {
        case 0:
            currentState[rowCount - 1][centerBlock].blockType = BlockType.BLOCK;
            break;
        case 2:
            currentState[rowCount - 3][centerBlock].blockType = BlockType.BLOCK;
            currentState[rowCount - 2][centerBlock - 1].blockType = BlockType.BLOCK;
            currentState[rowCount - 2][centerBlock].blockType = BlockType.BLOCK;
            currentState[rowCount - 2][centerBlock + 1].blockType = BlockType.BLOCK;
            break;
        default:
            currentState[rowCount - 2][centerBlock].blockType = BlockType.BLOCK;
            currentState[rowCount - 1][centerBlock - 1].blockType = BlockType.BLOCK;
            currentState[rowCount - 1][centerBlock].blockType = BlockType.BLOCK;
            currentState[rowCount - 1][centerBlock + 1].blockType = BlockType.BLOCK;
            break;
    }

    return State.mergeState(previousState, currentState);
}

const startUpSequence = () => {
    let previousState = State.getEmptyState();
    let shipFrame = 0;

    setInterval(() => {
        shipFrame++;
    }, 300);

    previousState[0][3].blockType = BlockType.BLOCK;
    const intervalHandle = setInterval(() => {
        // Clean the canvas
        Renderer.clearCanvas(arenaCanvas);
        // Get the next frame
        const nextState = drawShip(drawStreaks(previousState), shipFrame);
        // Render the next frame
        Renderer.renderFrame(nextState);

        // Store the last frame for calculations
        previousState = nextState;
    }, drawDelay);
};

initialize();