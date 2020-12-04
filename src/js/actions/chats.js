import { getUserProfile } from "../api/auth";
import * as api from "../api/chats";

import db from "../db/firestore";
export const fetchChats = () => async (dispatch, getState) => {
	const { user } = getState().auth;
	dispatch({ type: "CHATS_FETCH_INIT" });
	const chats = await api.fetchChats();

	chats.forEach(
		(chat) => (chat.joinedUsers = chat.joinedUsers.map((user) => user.id))
	);

	const sortedChats = chats.reduce(
		(accuChats, chat) => {
			accuChats[
				chat.joinedUsers.includes(user.uid) ? "joined" : "available"
			].push(chat);
			return accuChats;
		},
		{ joined: [], available: [] }
	);

	dispatch({
		type: "CHATS_FETCH_SUCCESS",
		...sortedChats,
	});
	console.log(sortedChats);
	return sortedChats;
};

export const joinChat = (chat, uid) => (dispatch) => {
	api.joinChat(uid, chat.id).then((_) => {
		dispatch({ type: "CHATS_JOIN_SUCCESS", chat });
	});
};

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
		dispatch({ type: "CHATS_JOIN_SUCCESS", chat: { ...newChat, id: chatId } });
		return chatId;
	} catch (e) {}
};

export const subscribeToChat = (chatId) => (dispatch) =>
	api.subscribeToChat(chatId, async (chat) => {
		const joinedUsers = await Promise.all(
			chat.joinedUsers.map(async (userRef) => {
				const userSnapshot = await userRef.get();
				return userSnapshot.data();
			})
		);

		chat.joinedUsers = joinedUsers;
		console.log("chat", chat);
		dispatch({ type: "CHATS_SET_ACTIVE_CHAT", chat });
	});

export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
	const newMessage = { ...message };
	const { user } = getState().auth;
	const userRef = db.doc(`profiles/${user.uid}`);
	newMessage.author = userRef;

	return api
		.sendChatMessage(newMessage, chatId)
		.then((_) => dispatch({ type: "CHATS_MESSAGE_SENT" }));
};

export const subscribeToMessages = (chatId) => (dispatch) => {
	return api.subscribeToMessages(chatId, async (changes) => {
		const messages = changes.map((change) => {
			if (change.type === "added") {
				return { id: change.doc.id, ...change.doc.data() };
			}
		});

		return dispatch({
			type: "CHATS_SET_MESSAGES",
			messages: messages,
			chatId,
		});
	});
};