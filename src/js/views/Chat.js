import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import BaseLayout from "../layouts/Base";
import { subscribeToChat } from "../actions/chats";

function Chat() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const activeChat = useSelector(({ chats }) => {
		return chats.activeChats[id];
	});

	useEffect(() => {
		const unsubFromChat = dispatch(subscribeToChat(id));
		return () => {
			unsubFromChat();
		};
	}, []);

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
					<ChatMessagesList />
				</div>
			</div>
		</BaseLayout>
	);
}

export default Chat;
