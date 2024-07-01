import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const NavbarContainer = styled.nav`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	background-color: #333;
	position: relative;

	@media (max-width: 768px) {
		justify-content: space-between;
		padding: 0 1rem;
	}
`;

const Title = styled(NavLink)`
	font-size: 24px;
	color: #fff;
	text-decoration: none;
	&:hover {
		cursor: pointer;
		color: #fff;
	}
`;

const NavLinks = styled.div`
	display: flex;

	@media (max-width: 768px) {
		display: none;
	}
`;

const NavLinkContainer = styled.div`
	height: 100%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 1rem;

	a {
		color: white;
		text-decoration: none;
		transition: color 0.2s ease-in-out, transform 0.3s ease;

		&:hover {
			cursor: pointer;
			color: #cccccc;
			transform: scale(1.1);
		}
	}
`;

const MenuIcon = styled.div`
	display: none;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	@media (max-width: 768px) {
		display: flex;
	}

	div {
		width: 25px;
		height: 3px;
		background-color: #fff;
		margin: 4px 0;
		transition: 0.4s;
	}

	&.change div:nth-child(1) {
		transform: rotate(-45deg) translate(-3px, 1px);
	}

	&.change div:nth-child(2) {
		opacity: 0;
	}

	&.change div:nth-child(3) {
		transform: rotate(45deg) translate(-3px, -1px);
	}
`;

const Sidebar = styled.div`
	height: 100%;
	width: 250px;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #111;
	overflow-x: hidden;
	transform: translateX(-100%);
	transition: transform 0.3s ease-in-out;
	z-index: 1;
	padding-top: 60px;

	&.open {
		transform: translateX(0);
	}

	a {
		padding: 8px 8px 8px 32px;
		text-decoration: none;
		font-size: 25px;
		color: #818181;
		display: block;
		transition: 0.3s;

		&:hover {
			color: #f1f1f1;
		}
	}
`;

const TOKEN_EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

const isTokenValid = () => {
	const token = localStorage.getItem("token");
	const tokenTimestamp = localStorage.getItem("tokenTimestamp");
	if (!token || !tokenTimestamp) return false;

	const currentTime = new Date().getTime();
	return currentTime - tokenTimestamp < TOKEN_EXPIRY_TIME;
};

const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation().pathname === "/";

	useEffect(() => {
		const getToken = async () => {
			const token = localStorage.getItem("token");
			await axios
				.get("http://localhost:8080/auth/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response);
					setUsername(response.data.username);
					setLoggedIn(true);
				})
				// eslint-disable-next-line no-unused-vars
				.catch((_) => {
					localStorage.removeItem("token");
					localStorage.removeItem("tokenTimestamp");
					setLoggedIn(false);
				});
		};
		if (isTokenValid()) {
			getToken();
		}
	}, [location]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("tokenTimestamp");
		setLoggedIn(false);
		setUsername("");
	};

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<NavbarContainer>
			<Title to="/">UMC Movie</Title>
			<NavLinks>
				{loggedIn ? (
					<>
						<p>Welcome, {username}</p>
						<NavLinkContainer onClick={handleLogout}>
							<NavLink to="/">Logout</NavLink>
						</NavLinkContainer>
					</>
				) : (
					<>
						<NavLinkContainer>
							<NavLink to="/signin">SignIn</NavLink>
						</NavLinkContainer>
						<NavLinkContainer>
							<NavLink to="/signup">SignUp</NavLink>
						</NavLinkContainer>
					</>
				)}
				<NavLinkContainer>
					<NavLink to="/popular">Popular</NavLink>
				</NavLinkContainer>
				<NavLinkContainer>
					<NavLink to="/nowplaying">Now Playing</NavLink>
				</NavLinkContainer>
				<NavLinkContainer>
					<NavLink to="/toprated">Top Rated</NavLink>
				</NavLinkContainer>
				<NavLinkContainer>
					<NavLink to="/upcoming">Up Coming</NavLink>
				</NavLinkContainer>
			</NavLinks>
			<MenuIcon className={sidebarOpen ? "change" : ""} onClick={toggleSidebar}>
				<div></div>
				<div></div>
				<div></div>
			</MenuIcon>
			<Sidebar className={sidebarOpen ? "open" : ""}>
				{loggedIn ? (
					<>
						<NavLink onClick={toggleSidebar} to="/">
							Welcome, {username}
						</NavLink>
						<NavLinkContainer
							onClick={() => {
								handleLogout();
								toggleSidebar();
							}}
						>
							<NavLink to="/">Logout</NavLink>
						</NavLinkContainer>
					</>
				) : (
					<>
						<NavLink onClick={toggleSidebar} to="/signin">
							SignIn
						</NavLink>
						<NavLink onClick={toggleSidebar} to="/signup">
							SignUp
						</NavLink>
					</>
				)}
				<NavLink onClick={toggleSidebar} to="/popular">
					Popular
				</NavLink>
				<NavLink onClick={toggleSidebar} to="/nowplaying">
					Now Playing
				</NavLink>
				<NavLink onClick={toggleSidebar} to="/toprated">
					Top Rated
				</NavLink>
				<NavLink onClick={toggleSidebar} to="/upcoming">
					Up Coming
				</NavLink>
			</Sidebar>
		</NavbarContainer>
	);
};

export default Navbar;
