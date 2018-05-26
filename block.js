const renderBlock = (context, rowIndex, columnIndex) => {
    const { left, top } = getCoordinates(rowIndex, columnIndex);
    context.beginPath();
    context.lineWidth=4;
    context.rect(left+1, top+1, blockWidth-5, blockHeight-5,);
    context.stroke();
    context.beginPath();
    context.rect(left + 6, top + 6, 15, 15);
    context.fill();
}

const Block = {
    renderBlock
}