exports.createTemplate = (app) => {
	return [
		{
			label: process.platform === "darwin" ? app.getName() : "Menu",
			submenu: [
				{
					// label
					label: "Exit",
					// on click action
					click: () => {
						app.quit();
					},
				},
			],
		},
		{
			label: "Window",
			// predefined role
			role: "window",
			// sub menu
			submenu: [
				{
					label: "Minimize",
					// shortcut
					accelerator: "CmdOrCtrl+M",
					// predefined role to minimize
					role: "minimize",
				},
				{
					label: "Close",
					accelerator: "CmdOrCtrl+W",
					role: "close",
				},
				{
					type: "separator",
				},
				{
					label: "Reopen Window",
					accelerator: "CmdOrCtrl+Shift+T",
					enabled: false,
					click: () => {
						app.emit("activate");
					},
				},
			],
		},
	];
};
