const clearCanvas = (canvas) => {
    canvas.width = canvas.width;
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
            if (column.blockType !== BlockType.NONE || forceDraw) {
                renderBlock(arenaContext, column.left, column.top, Colors[column.blockType]);
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