import React from "react";

function ViewTitle({ text }) {
	return (
		<div className="chat-name-container">
			<span className="name">{text}</span>
		</div>
	);
}

export default ViewTitle;
