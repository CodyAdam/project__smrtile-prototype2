export function getCoordinateAt(mousePos, grid) {
    const offset = grid.offset;
    const x = (mousePos.x - offset.x) / grid.size;
    const y = (mousePos.y - offset.y) / grid.size;

    return { x: x, y: y };
}

export function getMouseInCanvas(mousePosInWindow, container) {
    return {
        x: mousePosInWindow.x - container.offset.x,
        y: mousePosInWindow.y - container.offset.y,
    };
}
