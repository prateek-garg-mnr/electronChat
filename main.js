// Main Process
const { app, BrowserWindow } = require("electron");
const path = require("path");

//check the env. dev/prod
const isDev = !app.isPackaged;

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
				nodeIntegration: false,
				// will sanitze js code
				// TODO :- explain when application is initialized
				worldSafeExecuteJavaScript: true,
				// is a feature that ensures that both preload and electron
				// logic runs in separate context
				contextIsolation: true,
			},
		}
	);
	// load html file in electron window
	win.loadFile("index.html");
	// to open web tools everytime we open this window
	win.webContents.openDevTools();
}

// reload on change
if (isDev) {
	require('electron-reload')(__dirname, {
		electron:path.join(__dirname,'node_modules','.bin','electron')
	})
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

// chromium -> web engine for rendering the UI, full chrome like web browser
// v8 -> engine that provides capablities to execute, run, JS code in the browser

// webpack -> module builde, main purpose is to bundle js files for usage in browser
// Babel -> is a js compiler.

