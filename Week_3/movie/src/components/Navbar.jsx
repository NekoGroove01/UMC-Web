import React, { useState } from "react";
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

const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = () => {
		setLoggedIn(!loggedIn);
	};

	return (
		<NavbarContainer>
			<Title to="/">UMC Movie</Title>
			<NavLinks>
				<NavLinkContainer onClick={handleLogin}>
					<NavLink to="/signin">SignIn</NavLink>
				</NavLinkContainer>
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
