import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollButtons from "./components/ScrollButton";

function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
			<ScrollButtons />
			<Footer />
		</>
	);
}

export default Layout;
