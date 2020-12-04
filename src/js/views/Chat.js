import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import BaseLayout from "../layouts/Base";
import {
	subscribeToChat,
	sendChatMessage,
	subscribeToMessages,
} from "../actions/chats";
import Messenger from "../components/Messenger";

function Chat() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const activeChat = useSelector(({ chats }) => {
		return chats.activeChats[id];
	});
	const messages = useSelector(({ chats }) => chats.messages);
	useEffect(() => {
		const unsubFromChat = dispatch(subscribeToChat(id));
		dispatch(subscribeToMessages(id));
		return () => {
			unsubFromChat();
		};
	}, []);

	const sendMessage = useCallback(
		(message) => {
			dispatch(sendChatMessage(message, id));
		},
		[id]
	);

	return (
		<BaseLayout>
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					<ChatUsersList users={activeChat ? activeChat.joinedUsers : []} />
				</div>
				<div className="col-9 fh">
					<ViewTitle
						text={`Joined Channel: ${activeChat ? activeChat.name : ""}`}
					/>
					<ChatMessagesList messages={messages || []} chatId={id} />
					<Messenger onSubmit={sendMessage} />
				</div>
			</div>
		</BaseLayout>
	);
}

export default Chat;
