import React from "react";
function ChatMessagesList({ messages = [], chatId }) {
	console.log(messages)
	return (
		<div className="chat-container">
			<ul className="chat-box chatContainerScroll">
				{messages[chatId] ? messages[chatId].map((message) => {
					return (
						<li
							key={message.id}
							className="chat-left">
							{/* <div className="chat-avatar">
								<img
									src="https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
									alt="Retail Admin"
								/>
								<div className="chat-name">Test User 1</div>
							</div> */}
							<div className="chat-text-wrapper">
								<span className="chat-text">{ message.content}</span>
								<span className="chat-spacer"></span>
								<div className="chat-hour">{ new Intl.DateTimeFormat('en-US').format(parseInt(message.timestamp))}</div>
							</div>
						</li>
					);
				}):''}
			</ul>
		</div>
	);
}

export default ChatMessagesList;
