// Main Process
const { app, BrowserWindow } = require("electron");

// creating window
function createWindow() {
	const win = new BrowserWindow(
		// Browser Windows <-  renderer process
		// window configuration
		{
			width: 800,
			height: 600,
			backgroundColor: "white",
			webPreferences: {
				nodeIntegration: true,
			},
		}
	);
	// load html file in electron window
	win.loadFile("index.html");
	// to open web tools everytime we open this window
	win.webContents.openDevTools();
}

// launching window when window is ready
app.whenReady().then(createWindow);

// prevent closing application from closing in mac
// or
// closing app fully when working on windows
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

// activating application in mac from dock when closed
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
