const acceleration = 100;
const initialSpeed = 1000;
const dropSpeed = 10;
const drawDelay = 10;
const startButton = document.querySelector("#startGame");
const leftButton = document.querySelector("#moveLeft");
const rightButton = document.querySelector("#moveRight");
const shipSprites = Game.getShipSprites();
let previousStreakState = null;

const initialize = () => {
    startButton.setAttribute("disabled", true);
    startButton.addEventListener("click", startGame);
    // leftButton.addEventListener("click", startUpSequence);
    // rightButton.addEventListener("click", startUpSequence);

    Renderer.renderFrame(State.getEmptyState(), true);
    setTimeout(() => {  
        startButton.removeAttribute("disabled");
        Renderer.clearCanvas(arenaCanvas);
    }, 1000);
}

const startGame = () => {
    startButton.setAttribute("disabled", true);
    
    let startUpHandle = 0;
    let cleanUpHandle = 0;

    const startUpTime = 3000;
    const cleanUpTime = startUpTime + 2000;

    setTimeout(() => {
        clearInterval(startUpHandle);
        cleanUpHandler = startUpSequenceCleanUp();
    }, startUpTime);

    setTimeout(() => {
        clearInterval(cleanUpHandle);
    }, cleanUpTime);

    startUpHandle = startUpSequence();
}

const startUpSequenceCleanUp = () => {
    let renderHandle = renderLoop(() => {
        previousStreakState = Game.drawStreakState(previousStreakState, false);
        Renderer.clearCanvas(arenaCanvas);
        Renderer.renderFrame(State.mergeState(previousStreakState, [...shipSprites[1]]));
    });
}

const startUpSequence = () => {
    let shipFrame = 0;
    let sequenceNumber = 0;

    // This updates the ship
    const shipFrameHandle = setInterval(() => {
        const frameSequence = [0, 1, 2, 3, 2, 1]
        sequenceNumber++;
        if (sequenceNumber > 5) {
            sequenceNumber = 1;
            clearInterval(shipFrameHandle);
        }

        shipFrame = frameSequence[sequenceNumber];
    }, 300);

    // This is the render loop
    const renderHandle = renderLoop(() => {
        // Clean the canvas
        Renderer.clearCanvas(arenaCanvas);

        // Store the last streak state for calculations
        previousStreakState = Game.drawStreakState(previousStreakState, true);

        // Ship layer
        const shipLayer = [...shipSprites[shipFrame]];

        // Render the next frame
        Renderer.renderFrame(State.mergeState(previousStreakState, shipLayer));
    });

    return renderHandle;
};

const renderLoop = renderFunction => setInterval(renderFunction, drawDelay);

initialize();