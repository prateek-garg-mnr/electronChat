import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../actions/auth";
function Navbar() {
	const history = useHistory();
	const dispatch = useDispatch();

	const renderButton = () => {
		const button = useSelector(({ auth }) => {
			if (auth.user) {
				return (
					<Link
						onClick={() => {
							dispatch(logout());
						}}
						className="btn btn-outline-success ml-2"
					>
						Logout
					</Link>
				);
			} else {
				return (
					<Link to="/" className="btn btn-outline-success ml-2">
						Login
					</Link>
				);
			}
		});
		return button;;
	};
	return (
		<div className="chat-navbar">
			<nav className="chat-navbar-inner">
				<div className="chat-navbar-inner-left">
					<button
						onClick={() => history.goBack()}
						className="btn btn-outline-primary"
					>
						Back
					</button>
					<Link to="/settings" className="btn btn-outline-success ml-2">
						Settings
					</Link>
				</div>
				<div className="chat-navbar-inner-right">
					<span className="logged-in-user">Hi User</span>

					{renderButton()}
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
