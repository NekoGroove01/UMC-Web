import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	background-color: #333;
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

const NavLinkContainer = styled.div`
	height: 100%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 1rem;

	a {
		color: white;
		text-decoration: none;
		transition: color 0.2s ease-in-out, transform 0.3s ease; // Apply transitions for color and transform

		&:hover {
			cursor: pointer;
			color: #cccccc; // Lighten the color on hover
			transform: scale(1.1); // Enlarge the link slightly on hover
		}
	}
`;

const NavLinks = styled.div`
	display: flex;
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

	useEffect(() => {
		if (isTokenValid()) {
			const token = localStorage.getItem("token");
			axios
				.get("http://localhost:8080/auth/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setUsername(response.data.username);
					setLoggedIn(true);
				})
				// eslint-disable-next-line no-unused-vars
				.catch((_) => {
					localStorage.removeItem("token");
					localStorage.removeItem("tokenTimestamp");
					setLoggedIn(false);
				});
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("tokenTimestamp");
		setLoggedIn(false);
		setUsername("");
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
		</NavbarContainer>
	);
};

export default Navbar;
