import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import MoviePoster from "../components/MoviePoster";
import axios from "axios";
import LoadingIndicator from "../components/Loading";
import Pagination from "../components/Pagination";

const PageContainer = styled.div`
	padding: 20px;
	max-width: 1280px;
	min-height: 100vh;
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
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isInfiniteScroll, setIsInfiniteScroll] = useState(
		["now_playing", "upcoming"].includes(names)
	);

	const fetchPopularMovies = async (apiKey, page) => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${names}?api_key=${apiKey}&language=ko-KR&page=${page}`
			);
			return response.data;
		} catch {
			console.error("Failed to fetch data");
			return { results: [], total_pages: 1 };
		}
	};

	const loadMovies = useCallback(async () => {
		setIsLoading(true);
		const apiKey = import.meta.env.VITE_API_KEY;

		const cachedData = JSON.parse(
			localStorage.getItem(`movies-${names}-page-${currentPage}`)
		);

		if (cachedData) {
			if (isInfiniteScroll) {
				setMovies((prevMovies) => [...prevMovies, ...cachedData.results]);
			} else {
				setMovies(cachedData.results);
			}
			setTotalPages(cachedData.total_pages);
			setIsLoading(false);
		} else {
			const data = await fetchPopularMovies(apiKey, currentPage);
			if (isInfiniteScroll) {
				setMovies((prevMovies) => [...prevMovies, ...data.results]);
			} else {
				setMovies(data.results);
			}
			setTotalPages(data.total_pages);
			localStorage.setItem(
				`movies-${names}-page-${currentPage}`,
				JSON.stringify(data)
			);
			setIsLoading(false);
		}
	}, [names, currentPage, isInfiniteScroll]);

	useEffect(() => {
		setMovies([]);
		setCurrentPage(1);
		setIsInfiniteScroll(["now_playing", "upcoming"].includes(names));
	}, [names]);

	useEffect(() => {
		loadMovies();
	}, [loadMovies]);

	useEffect(() => {
		if (isInfiniteScroll) {
			const handleScroll = () => {
				if (
					window.innerHeight + document.documentElement.scrollTop !==
						document.documentElement.offsetHeight ||
					isLoading
				)
					return;
				setCurrentPage((prevPage) => prevPage + 1);
			};

			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [isInfiniteScroll, isLoading]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<PageContainer>
			<Title>{title}</Title>
			<MovieGrid>
				{movies.length > 0 ? (
					movies.map((movie) => <MoviePoster key={movie.id} movie={movie} />)
				) : (
					<LoadingContainer>
						<LoadingIndicator />
					</LoadingContainer>
				)}
				{isLoading && (
					<LoadingContainer>
						<LoadingIndicator />
					</LoadingContainer>
				)}
			</MovieGrid>
			{!isInfiniteScroll && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</PageContainer>
	);
};

export default PopularPage;
