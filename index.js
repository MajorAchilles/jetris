const acceleration = 100;
const initialSpeed = 1000;
const drawDelay = 50;

const initialize = () => {
    Renderer.renderFrame(State.getEmptyState(), true);
    setTimeout(() => {
        Renderer.clearCanvas(arenaCanvas);
    }, 1000);

    const button = document.querySelector("#startGame");
    button.addEventListener("click", startGame);
}

const getNextState = (previousState, rowIndex, columnIndex) => {
    const currentState = State.getEmptyState();
    currentState[rowIndex][columnIndex].isOccupied = true;

    if (rowIndex-2 >= 0) {
        currentState[rowIndex - 1][columnIndex].tailStart = true;
        currentState[rowIndex - 2][columnIndex].tailEnd = true;
    } else if (rowIndex-1 >= 0) {
        currentState[rowIndex - 1][columnIndex].tailStart = true;
    }

    return currentState;
}

const startGame = () => {
    const columnIndex = 0;
    let rowIndex = 0;
    let previousState = State.getEmptyState();

    const intervalHandle = setInterval(() => {
        if (rowIndex === rowCount) {
            clearInterval(intervalHandle);
            return;
        }

        // Clean the canvas
        Renderer.clearCanvas(arenaCanvas);
        // Get the next frame
        const nextState = getNextState(previousState, rowIndex, columnIndex);
        // Render the next frame
        Renderer.renderFrame(nextState);

        // Store the last frame for calculations
        previousState = nextState;
        rowIndex++;
    }, drawDelay);
};

initialize();