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
					<>
						<img src={auth.user.avatar} className="avatar mr-3"></img>
						<span className="logged-in-user">Hi {auth.user.username}</span>
						<a
							onClick={() => {
								dispatch(logout());
							}}
							className="btn btn-outline-danger ml-4"
						>
							Logout
						</a>
					</>
				);
			} else {
				return (
					<Link to="/" className="btn btn-outline-success ml-4">
						Login
					</Link>
				);
			}
		});
		return button;
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
				<div className="chat-navbar-inner-right">{renderButton()}</div>
			</nav>
		</div>
	);
}

export default Navbar;
