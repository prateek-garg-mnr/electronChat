import React from "react";
import { Provider } from "react-redux";
import Home from "./views/Home";
import Chat from "./views/Chat";
import Navbar from "../js/components/Navbar";
import Settings from "../js/views/Settings";
import Welcome from "./views/Welcome";
import configureStore from "../js/store";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
function App() {
	const store = configureStore();
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="content-wrapper">
					<Switch>
						<Route path="/" exact>
							<Welcome />
						</Route>
						<Route path="/settings">
							<Settings />
						</Route>
						<Route path="/chat/:id">
							<Chat />
						</Route>
						<Route path="/home">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
