import React, { useEffect } from "react";
import JoinedChats from "../components/JoinedChatsList";
import AvailableChats from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import { fetchChats } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
function Home() {
	const dispatch = useDispatch();
	const chats = useSelector(({ chats }) => chats.items);
	useEffect(() => {
		dispatch(fetchChats());
	}, [dispatch]);
	return (
		<div className="row no-gutters fh">
			<div className="col-3 fh">
				<JoinedChats chats={chats} />
			</div>
			<div className="col-9 fh">
				<ViewTitle text="Choose Your Channel" />
				<AvailableChats chats={chats} />
			</div>
		</div>
	);
}

export default Home;
