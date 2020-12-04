import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

function createChatReducer() {
	const joined = (state = [], action) => {
		switch (action.type) {
			case "CHAT_FETCH_RESTART":
				return [];
			case "CHATS_FETCH_SUCCESS":
				return action.joined;
			case "CHATS_JOIN_SUCCESS":
				return [...state, action.chat];
			default: {
				return state;
			}
		}
	};

	const available = (state = [], action) => {
		switch (action.type) {
			case "CHAT_FETCH_RESTART":
				return [];
			case "CHATS_FETCH_SUCCESS":
				return action.available;
			case "CHATS_JOIN_SUCCESS":
				return state.filter((chat) => chat.id !== action.chat.id);
			default: {
				return state;
			}
		}
	};

	const activeChats = createReducer(
		{},
		{
			CHATS_SET_ACTIVE_CHAT: (state, action) => {
				const { chat } = action;
				console.log("action", action);
				state[chat.id] = chat;
			},
		}
	);

	const messages = createReducer(
		{},
		{
			CHATS_SET_MESSAGES: (state, action) => {
				const prevMessages = state[action.chatId] || [];
				state[action.chatId] = [...prevMessages, ...action.messages];
			},
		}
	);

	return combineReducers({
		joined,
		available,
		activeChats,
		messages,
	});
}

export default createChatReducer();
