import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../components/MoviePoster";
import axios from "axios";
import LoadingIndicator from "../components/Loading";

const PageContainer = styled.div`
	padding: 20px;
	max-width: 1280px;
	min-height: calc(100vh - 160px);
	margin: auto;
`;

const Title = styled.h2`
	text-align: center;
	margin: 20px 0;
`;

const MovieGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 1rem;
`;

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PopularPage = ({ names, title }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchPopularMovies = async (apiKey) => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${names}?api_key=${apiKey}&language=ko-KR`
				);
				setMovies(response.data.results);
			} catch {
				console.error("Failed to fetch data");
				return [];
			}
		};
		fetchPopularMovies(import.meta.env.VITE_API_KEY);
	}, [names]);
	return (
		<PageContainer>
			<Title>{title}</Title>
			<MovieGrid>
				{movies.length > 1 ? (
					movies.map((movie) => <MoviePoster key={movie.id} movie={movie} />)
				) : (
					<LoadingContainer>
						<LoadingIndicator />
					</LoadingContainer>
				)}
			</MovieGrid>
		</PageContainer>
	);
};

export default PopularPage;
