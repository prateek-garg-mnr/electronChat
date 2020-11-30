import * as api from "../api/auth";

export const registerUser = (formData) => async (dispatch) => {
	dispatch({ type: "AUTH_REGISTER_INIT" });
	const user = await api.register(formData);
	dispatch({
		type: "AUTH_REGISTER_SUCCESS",
		user,
	});
};

export const login = (formData) => async (dispatch) => {
	dispatch({ type: "AUTH_LOGIN_INIT" });
	const user = await api.login(formData);
	dispatch({ type: "AUTH_LOGIN_SUCCESS", user });
};

export const listenToAuthChanges = () => (dispatch) => {
	dispatch({ type: "AUTH_ON_INIT" });
	api.onAuthStateChange(async (authUser) => {
		if (authUser) {
			const userProfile = await api.getUserProfile(authUser.uid);
			console.log('user profile',userProfile);
			dispatch({ type: "AUTH_ON_SUCCESS", user: userProfile });
			console.log("we are authenticated ");
		} else {
			dispatch({ type: "AUTH_ON_ERROR", user: authUser });
			console.log("we are not authenticated");
		}
	});
};

export const logout = () => (dispatch) =>
	api.logout().then((_) => dispatch({ type: "AUTH_LOGOUT_SUCCESS" }));
