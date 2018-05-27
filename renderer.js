const clearCanvas = (canvas) => {
    canvas.width = canvas.width;
}

const Colors = {
    BLACK: "#000000",
    DARKGRAY: "#535353",
    LIGHTGRAY: "#797979"
}

const renderBlock = (context, left, top, blockColor = Colors.BLACK) => {
    context.beginPath();
    context.strokeStyle = blockColor;
    context.fillStyle = blockColor;
    context.lineWidth=4;
    context.rect(left+1, top+1, blockWidth-5, blockHeight-5,);
    context.stroke();
    context.beginPath();
    context.rect(left + 6, top + 6, 15, 15);
    context.fill();
}

const renderFrame = (frameState, forceDraw = false) => {
    frameState.forEach((row) => {
        row.forEach(column => {
            if (column.isOccupied || forceDraw) {
                renderBlock(arenaContext, column.left, column.top);
            }

            if(column.tailStart) {
                renderBlock(arenaContext, column.left, column.top, Colors.DARKGRAY);
            }

            if(column.tailEnd) {
                renderBlock(arenaContext, column.left, column.top, Colors.LIGHTGRAY);
            }
        });
    });

    return true;
}

const Renderer = {
    clearCanvas,
    renderBlock,
    renderFrame
}