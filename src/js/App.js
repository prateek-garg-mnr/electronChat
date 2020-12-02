import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import Home from "./views/Home";
import Chat from "./views/Chat";
import Settings from "../js/views/Settings";
import Welcome from "./views/Welcome";
import configureStore from "../js/store";
import { listenToAuthChanges } from "../js/actions/auth";
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

function AuthRoute({ children, ...rest }) {
	const user = useSelector(({ auth }) => auth.user);
	// check where there is only one children?
	const onlyChild = React.Children.only(children);
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					React.cloneElement(onlyChild, { ...rest, ...props })
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
}

function App() {
	const store = configureStore();
	useEffect(() => {
		store.dispatch(listenToAuthChanges());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<div className="content-wrapper">
					<Switch>
						<Route path="/" exact>
							<Welcome />
						</Route>
						<AuthRoute path="/settings">
							<Settings />
						</AuthRoute>
						<AuthRoute path="/chat/:id">
							<Chat />
						</AuthRoute>
						<AuthRoute path="/home">
							<Home />
						</AuthRoute>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
