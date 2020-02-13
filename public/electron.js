const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		hasShadow: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "/../build/index.html"),
			protocol: "file:",
			slashes: true
		});
	win.loadURL(startUrl);

	win.webContents.openDevTools();

	win.on("closed", () => {
		// Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
		// dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
		// où vous devez supprimer l'élément correspondant.
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});

// function minimize() {
// 	win.minimize();
// }

// function maximize() {
// 	if (!win.isMaximized()) win.maximize();
// 	else win.unmaximize();
// }

// function close() {
// 	win.close();
// }
