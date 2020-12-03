import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import JoinedChats from "../components/JoinedChatsList";
import AvailableChats from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import { fetchChats } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "../layouts/Base";
function Home() {
	const dispatch = useDispatch();
	const joinedChats = useSelector(({ chats }) => chats.joined);
	const availableChats = useSelector(({ chats }) => chats.available);
	useEffect(() => {
		dispatch(fetchChats());
	}, [dispatch]);
	return (
		<BaseLayout>
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					<JoinedChats chats={joinedChats} />
				</div>
				<div className="col-9 fh">
					<ViewTitle text="Choose Your Channel">
						<Link className="btn btn-sm btn-outline-primary" to="/chatCreate">
							New
						</Link>
					</ViewTitle>
					<AvailableChats chats={availableChats} />
				</div>
			</div>
		</BaseLayout>
	);
}

export default Home;
