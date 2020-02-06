export function createMap(width, height) {
	console.log("Map created (" + width + " x " + height + ")");
	let layout;
	layout = new Array(width);
	for (let x = 0; x < layout.length; x++) {
		layout[x] = new Array(height);
		for (let y = 0; y < layout[x].length; y++) {
			layout[x][y] = false;
		}
	}
	return layout;
}

export function getTileCoordinateAtMousePos(mousePos, grid) {
	const offset = grid.offset;
	const x = (mousePos.x - offset.x - ((mousePos.x - offset.x) % grid.size)) / grid.size;
	const y = (mousePos.y - offset.y - ((mousePos.y - offset.y) % grid.size)) / grid.size;
	return { x: x, y: y };
}

export function getMouseInCanvas(mousePosInWindow, container) {
	return {
		x: mousePosInWindow.x - container.offset.x,
		y: mousePosInWindow.y - container.offset.y
	};
}
