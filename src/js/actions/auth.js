import * as api from "../api/auth";

export const registerUser = (formData) => async (dispatch) => {
	const user = await api.register(formData);
	dispatch({
		type: "AUTH_REGISTER_SUCCESS",
		user,
	});
};

export const listenToAuthChanges = () => (dispatch) => {
	dispatch({ type: "AUTH_ON_INIT" });
	api.onAuthStateChange((authUser) => {
		if (authUser) {
			dispatch({ type: "AUTH_ON_SUCCESS", user: authUser });
			console.log("we are authenticated ");
		} else {
			dispatch({ type: "AUTH_ON_ERROR", user: authUser });
			console.log("we are not authenticated");
		}
	});
};

export const logout = () => (dispatch) =>
	api.logout().then((_) => dispatch({ type: "AUTH_LOGOUT_SUCCESS" }));
