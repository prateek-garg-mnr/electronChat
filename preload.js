const { ipcRenderer, contextBridge } = require("electron");

// using context bridge
contextBridge.exposeInMainWorld("e_notification", {
	sendNotification(message) {
		ipcRenderer.send("notify", message);
	},
});
