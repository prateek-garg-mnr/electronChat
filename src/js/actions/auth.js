import * as api from "../api/auth";

export const registerUser = (formData) => {
	return async function (dispatch) {
		const user = await api.register(formData);
		console.log(user);
		dispatch({
			type: "AUTH_REGISTER_SUCCESS",
			user,
		});
		return user;
	};
};
