import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";
export default function configureStore() {
	const store = createStore(
		combineReducers({
			chats: chatReducer,
			auth: authReducer,
		}),
		applyMiddleware(reduxThunk)
	);
	return store;
}
