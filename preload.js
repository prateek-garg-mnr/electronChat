const { ipcRenderer, contextBridge } = require("electron");

// using context bridge
contextBridge.exposeInMainWorld("electron", {
	notificationAPI: {
		sendNotification(message) {
			ipcRenderer.send("notify", message);
		},
	},
});
