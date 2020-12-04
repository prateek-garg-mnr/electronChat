import db from "../db/firestore";
import firebase from "firebase/app";
import { getUserProfile } from "./auth";
export const fetchChats = () => {
	return db
		.collection("chats")
		.get()
		.then((snapshot) => {
			// if you are fetching collection then data are provided under snapshot.docs
			const data = snapshot.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});
			return data;
		});
};

export const createChat = (chat) =>
	db
		.collection("chats")
		.add(chat)
		.then((docRef) => docRef.id);

export const joinChat = async (userId, chatId) => {
	const useRef = db.doc(`profiles/${userId}`);
	const chatRef = db.doc(`chats/${chatId}`);

	await useRef.update({
		joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
	});
	await chatRef.update({
		joinedUsers: firebase.firestore.FieldValue.arrayUnion(useRef),
	});
};

export const subscribeToChat = (chatId, onSubscribe) => {
	db.collection("chats")
		.doc(chatId)
		.onSnapshot((snapshot) => {
			const chat = { id: snapshot.id, ...snapshot.data() };
			console.log(chat);
			onSubscribe(chat);
		});
};


export const sendChatMessage = (message, chatId) =>
	db
		.collection("chats")
		.doc(chatId)
		.collection("messages")
		.doc(message.timestamp)
		.set(message);

export const subscribeToMessages = (chatId, onSubscribe) =>
	db
		.collection("chats")
		.doc(chatId)
		.collection("messages")
		.onSnapshot((snapshot) => onSubscribe(snapshot.docChanges()));