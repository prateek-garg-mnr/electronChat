import * as api from "../api/chats";
import db from "../db/firestore";
export function fetchChats() {
	return async function (dispatch) {
		const chats = await api.fetchChats();
		dispatch({
			type: "CHATS_FETCH_SUCCESS",
			chats,
		});
		console.log(chats);
		return chats;
	};
}

export const createChat = (formData, userId) => async (dispatch) => {
	try {
		let newChat = { ...formData };
		// reference to the user
		const useRef = db.doc(`profiles/${userId}`);

		// chat admin
		newChat.admin = useRef;
		// create chat
		const chatId = await api.createChat(newChat);
		dispatch({ type: "CHAT_CREEATE_SUCCESS" });
		// join chat
		await api.joinChat(userId, chatId);
		dispatch({ type: "CHATS_JOIN_SUCCESS" });
		return chatId;
	} catch (e) {}
};
