const blockHeight = 30;
const blockWidth = 30;
const offset = 10;
const arenaHeight = 620;
const arenaWidth = 350;
const rowCount = (arenaHeight - (offset * 2))/blockHeight;
const columnCount = (arenaWidth - (offset * 2))/blockHeight;
const lastRowTop = (rowCount * blockHeight) + offset;
const arenaCanvas = document.querySelector(".arena");
const arenaContext = arenaCanvas.getContext("2d");


const BlockType = {
    NONE: "NONE",
    BLOCK: "BLACK",
    TAIL_END: "LIGHTGRAY",
    TAIL_START: "DARKGRAY"
}

const Colors = {
    BLACK: "#000000",
    DARKGRAY: "#737373",
    LIGHTGRAY: "#999999"
}