import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MoviePoster from "../components/MoviePoster";

// Styled components
const MainContainer = styled.div`
	text-align: center;
	min-width: 100%;
	min-height: 100vh;
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
	background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
	color: white;
	border: none;
	border-radius: 0px;
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

	&:hover {
		background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
		transition: background-color 0.3s ease-in-out;
	}
`;

const MovieGrid = styled.div`
	width: 70%;
	margin: 30px auto;
	padding: 10px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 1rem;
`;

// MainPage component
function MainPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm) {
				searchMovies(searchTerm);
			} else {
				setMovies([]);
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	useEffect(() => {}, []);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const searchMovies = async (query) => {
		setIsLoading(true);
		try {
			const api_key = import.meta.env.VITE_API_KEY;
			const response = await axios.get(
				`
				https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=ko-KR&query=${query}
				`
			);
			setMovies(response.data.results);
		} catch (error) {
			console.error("Error searching movies:", error);
		}
		setIsLoading(false);
	};

	return (
		<MainContainer>
			<Banner>Welcome to UMC Movie!</Banner>
			<SearchBarContainer>
				<h2>Find Your Movies!</h2>
				<SearchInput
					type="text"
					placeholder="Enter movie name..."
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<SearchButton type="button" disabled={!searchTerm}>
					{isLoading ? "Searching..." : "Search"}
				</SearchButton>
			</SearchBarContainer>
			<MovieGrid>
				{movies.length > 0 &&
					movies.map((movie) => <MoviePoster key={movie.id} movie={movie} />)}
			</MovieGrid>
		</MainContainer>
	);
}

export default MainPage;
