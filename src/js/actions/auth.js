import * as api from "../api/auth";

export const registerUser = (formData) => async (dispatch) => {
	try {
		dispatch({ type: "AUTH_REGISTER_INIT" });
		const user = await api.register(formData);
		return dispatch({
			type: "AUTH_REGISTER_SUCCESS",
			user,
		});
	} catch (error) {
		return dispatch({  type:  "AUTH_REGISTER_ERROR",  error  });;
	}
};

export const login = (formData) => async (dispatch) => {
	try {
		dispatch({ type: "AUTH_LOGIN_INIT" });
		const user = await api.login(formData);
		return dispatch({ type: "AUTH_LOGIN_SUCCESS", user });
	} catch (error) {
		return dispatch({  type:  "AUTH_LOGIN_ERROR",  error });;
	}
};

export const listenToAuthChanges = () => (dispatch) => {
	dispatch({ type: "AUTH_ON_INIT" });
	api.onAuthStateChange(async (authUser) => {
		if (authUser) {
			const userProfile = await api.getUserProfile(authUser.uid);
			dispatch({ type: "AUTH_ON_SUCCESS", user: userProfile });
		} else {
			dispatch({ type: "AUTH_ON_ERROR", user: authUser });
		}
	});
};

export const logout = () => (dispatch) =>
	api.logout().then((_) => {
		dispatch({ type: "CHAT_FETCH_RESTART" });
		dispatch({ type: "AUTH_LOGOUT_SUCCESS" });
	});
