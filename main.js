// Main Process
const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");
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
app.whenReady().then(() => {
	createWindow();
	// const notification = new Notification({
	// 	title: "hello World",
	// 	body: "My test message",
	// });
	// send notification when the app is ready
	// notification.show();
	// path
	const parsed = path.parse("/home/user/dir/file.txt");
	console.log(parsed);
});

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
