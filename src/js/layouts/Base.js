import React from "react";
import NavBar from "../components/Navbar";
function Base({ children, ...props }) {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
}

export default Base;
