import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const MainContainer = styled.div`
	text-align: center;
	min-width: 100%;
	min-height: calc(100vh - 160px);
`;

const Banner = styled.div`
	background-color: #444;
	color: white;
	padding: 100px 40px;
	margin-bottom: 30px;
	font-size: 4rem;
`;

const SearchBarContainer = styled.div`
	margin: auto;
	max-width: 500px;
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 10px 15px;
	margin-top: 10px;
	font-size: 16px;
`;

const SearchButton = styled.button`
	width: 100%;
	padding: 10px 0;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 0px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3; // Darken the button on hover
		transition: background-color 0.3s ease-in-out;
	}
`;

// MainPage component
const MainPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		alert("Search functionality needs to be implemented!");
		// Here you would typically handle the redirection to a search results page or similar.
	};

	return (
		<MainContainer>
			<Banner>Welcome to UMC Movie!</Banner>
			<SearchBarContainer>
				<h2>Find Your Movies!</h2>
				<form onSubmit={handleSubmit}>
					<SearchInput
						type="text"
						placeholder="Enter movie name..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<SearchButton type="submit">Search</SearchButton>
				</form>
			</SearchBarContainer>
		</MainContainer>
	);
};

export default MainPage;
