import React, { useEffect } from "react";
import JoinedChats from "../components/JoinedChatsList";
import AvailableChats from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import { fetchChats } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "../layouts/Base";
function Home() {
	const dispatch = useDispatch();
	const chats = useSelector(({ chats }) => chats.items);
	useEffect(() => {
		dispatch(fetchChats());
	}, [dispatch]);
	return (
		<BaseLayout>
				<div className="row no-gutters fh">
					<div className="col-3 fh">
						<JoinedChats chats={chats} />
					</div>
					<div className="col-9 fh">
						<ViewTitle text="Choose Your Channel" />
						<AvailableChats chats={chats} />
					</div>
			</div>
		</BaseLayout>
	);
}

export default Home;
