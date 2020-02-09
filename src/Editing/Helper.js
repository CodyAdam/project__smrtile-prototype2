export function getCoordinateAt(mousePos, grid) {
    const offset = grid.offset;
    const x = (mousePos.x - offset.x - mod(mousePos.x - offset.x, grid.size)) / grid.size;
    const y = (mousePos.y - offset.y - mod(mousePos.y - offset.y, grid.size)) / grid.size;

    return { x: x, y: y };
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

export function getMouseInCanvas(mousePosInWindow, container) {
    return {
        x: mousePosInWindow.x - container.offset.x,
        y: mousePosInWindow.y - container.offset.y,
    };
}
