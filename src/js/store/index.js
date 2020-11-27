import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import chatReducer from "../reducers/chats";
export default function configureStore() {
	const store = createStore(
		combineReducers({
			chats: chatReducer,
		}),
		applyMiddleware(reduxThunk)
	);
	return store;
}
