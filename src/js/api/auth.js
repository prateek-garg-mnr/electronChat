import db from "../db/firestore";
import firebase from "firebase";
import "firebase/auth";

const createUserProfile = (userProfile) => {
	db.collection("profiles").doc(userProfile.uid).set(userProfile);
};

export const getUserProfile = async (uid) => {
	const snapshot = await db.collection("profiles").doc(uid).get();
	const data = await snapshot.data();
	return data;
};

export async function register({ email, password, username, avatar }) {
	try {
		const { user } = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password);

		const userProfile = {
			uid: user.uid,
			email,
			username,
			avatar,
			joinedChats: [],
		};
		await createUserProfile(userProfile);
		return user;
	} catch (e) {
		console.log(e);
		return Promise.reject(e.message);
	}
}

export const login = ({ email, password }) =>
	firebase.auth().signInWithEmailAndPassword(email, password);

export const logout = () => firebase.auth().signOut();

export const onAuthStateChange = (onAuth) => {
	return firebase.auth().onAuthStateChanged(onAuth);
};
