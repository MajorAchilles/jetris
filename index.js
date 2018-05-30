const acceleration = 100;
const initialSpeed = 1000;
const dropSpeed = 10;
const drawDelay = 10;
const startButton = document.querySelector("#startGame");

const initialize = () => {
    startButton.setAttribute("disabled", true);
    startButton.addEventListener("click", startUpSequence);

    Renderer.renderFrame(State.getEmptyState(), true);
    setTimeout(() => {
        startButton.removeAttribute("disabled");
        Renderer.clearCanvas(arenaCanvas);
    }, 1000);
}

const startUpSequence = () => {
    startButton.setAttribute("disabled", true);
    const shipSprites = Game.getShipSprites();
    let previousStreakState;
    let shipFrame = 0;

    // This updates the ship
    const shipFrameHandle = setInterval(() => {
        shipFrame++;
        if (shipFrame > 2) {
            shipFrame = 1;
            clearInterval(shipFrameHandle);
        }
    }, 300);

    // This is the render loop
    const renderHandle = setInterval(() => {
        // Clean the canvas
        Renderer.clearCanvas(arenaCanvas);

        // Store the last streak state for calculations
        previousStreakState = Game.drawStreakState(previousStreakState);

        // Ship layer
        const shipLayer = [...shipSprites[shipFrame]];

        // Render the next frame
        Renderer.renderFrame(State.mergeState(previousStreakState, shipLayer));
    }, 10);
};

initialize();