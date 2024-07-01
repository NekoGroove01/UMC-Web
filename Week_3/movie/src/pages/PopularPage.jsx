import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import MoviePoster from "../components/MoviePoster";
import axios from "axios";
import LoadingIndicator from "../components/Loading";
import Pagination from "../components/Pagination";

const CACHE_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
// 30분이 지나면 캐시가 만료되고 새로운 데이터를 가져옴.

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
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isInfiniteScroll, setIsInfiniteScroll] = useState(
		["now_playing", "upcoming"].includes(names)
	); // 만약 페이지 이름이 now_playing이나 upcoming이면 무한 스크롤 사용

	// API 호출 함수
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

	// 영화 데이터 불러오기
	const loadMovies = useCallback(async () => {
		setIsLoading(true);
		const apiKey = import.meta.env.VITE_API_KEY;

		// 캐시된 데이터 가져오기
		const cachedDataString = localStorage.getItem(
			`movies-${names}-page-${currentPage}`
		);
		// 캐시된 데이터가 있으면 가져오고, 없으면 null
		const cachedData = cachedDataString ? JSON.parse(cachedDataString) : null;

		// 캐시된 데이터가 있고, 캐시가 만료되지 않았으면 캐시된 데이터 사용
		if (
			cachedData &&
			new Date().getTime() - cachedData.timestamp < CACHE_EXPIRATION_TIME
		) {
			// 무한 스크롤이면 이전 데이터에 추가, 아니면 새로운 데이터로 대체
			if (isInfiniteScroll) {
				setMovies((prevMovies) => [...prevMovies, ...cachedData.results]);
			} else {
				setMovies(cachedData.results);
			}
			// 캐시된 데이터의 총 페이지 수로 설정
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
			// 캐시에 데이터 저장. 캐시 만료 시간도 함께 저장
			localStorage.setItem(
				`movies-${names}-page-${currentPage}`,
				// 캐시 데이터에 JSON 형태로 타임스탬프 추가
				JSON.stringify({
					results: data.results,
					total_pages: data.total_pages,
					timestamp: new Date().getTime(),
				})
			);
			setIsLoading(false);
		}
	}, [names, currentPage, isInfiniteScroll]);

	// 페이지 이름이 바뀌면(페이지가 바뀌면) 세션 스토리지 초기화
	useEffect(() => {
		sessionStorage.clear(); // Clear session storage on page refresh
		setMovies([]);
		setCurrentPage(1);
		setIsInfiniteScroll(["now_playing", "upcoming"].includes(names));
	}, [names]);

	useEffect(() => {
		loadMovies();
	}, [loadMovies]);

	// 무한 스크롤 기능
	useEffect(() => {
		// 무한 스크롤이면 스크롤 이벤트 추가
		if (isInfiniteScroll) {
			const handleScroll = () => {
				// window.innerHeight + document.documentElement.scrollTop은 현재 화면의 맨 아래 위치
				if (
					window.innerHeight + document.documentElement.scrollTop !==
						document.documentElement.offsetHeight ||
					isLoading ||
					movies.length === 0
				) {
					return;
				} // 화면 맨 아래가 아니거나 로딩 중이면 무시
				setCurrentPage((prevPage) => prevPage + 1); // 다음 페이지의 데이터를 받아옴
			};

			window.addEventListener("scroll", handleScroll);
			// 컴포넌트가 언마운트되면 스크롤 이벤트 제거
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
					movies.map((movie, index) => (
						<MoviePoster key={index} movie={movie} />
					))
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
