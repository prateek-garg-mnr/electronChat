import React from "react";
function App() {
	const title = "hello world";
    const enhancedTitle = title + " -React App";


    function sendNotifiation() {
			e_notification.sendNotification("This is my custom message");
		}

		return (
			<div>
				{enhancedTitle}
				<button onClick={sendNotifiation}>Send Notification</button>
			</div>
		);
}

export default App;
