import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const BackContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
`;

const Back = styled.p`
	font-size: 1.5rem;
	color: #fdfdfd;
	transition: all 0.3s ease;
	&:hover {
		cursor: pointer;
		color: #007bff;
	}
`;

const PageContainer = styled.div`
	padding: 20px;
	width: 100%;
	height: 70vh;
	margin: auto;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	position: relative;
`;

const BackgroundImageDiv = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: -2;
	background-color: black;
`;

const BackgroundImage = styled.img`
	filter: blur(20px);
	filter: opacity(0.3);
	width: 100%;
	object-fit: contain;
`;

const Image = styled.img`
	height: 100%;
	object-fit: cover;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.1);
	}
`;

const TextDiv = styled.div`
	height: 100%;
	padding: 0 30px;
	width: 50vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Title = styled.h1`
	padding: 0;
	margin: 0;
	font-size: 3rem;
	font-weight: 600;
	color: #fdfdfd;
`;

const SubTitle = styled(Title)`
	font-size: 1.5rem;
`;

const Description = styled(Title)`
	font-size: 0.75rem;
	font-weight: 300;
	line-height: 1.5;
`;

const Line = styled.div`
	width: 80%;
	height: 1px;
	color: #fdfdfd;
	opacity: 0.5;
	margin: 40px auto;
`;

const CreditContainer = styled(PageContainer)`
	flex-direction: column;
	justify-content: start;
`;

const Credits = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 35px;
	margin: 50px 0;
`;

const CreditBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 25px;
`;

const CreditImage = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-radius: 50%;
`;

const CreditName = styled.h2`
	font-size: 0.8rem;
	font-weight: 500;
	color: #fdfdfd;
`;

const CreditCharacter = styled.p`
	font-size: 0.6rem;
	font-weight: 300;
	color: #fdfdfd;
`;

const MovieDetail = () => {
	const navigate = useNavigate();
	const movie_id = useParams().id;
	const [movie, setMovie] = useState({});
	const [credits, setCredits] = useState({});

	useEffect(() => {
		async function fetchMovie() {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${
					import.meta.env.VITE_API_KEY
				}&language=ko-KR`
			);
			const responseCredit = await axios.get(
				`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${
					import.meta.env.VITE_API_KEY
				}&language=ko-KR`
			);
			setMovie(response.data);
			setCredits(responseCredit.data);
		}
		fetchMovie();
	}, []);

	return (
		<div style={{ minHeight: "100vh", position: "relative" }}>
			<BackContainer>
				<Back
					onClick={() => {
						navigate(-1);
					}}
				>
					Go Back
				</Back>
			</BackContainer>
			<PageContainer>
				{Object.keys(movie).length > 0 ? (
					<>
						<Image
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
						/>
						<TextDiv>
							<Title>{movie.title}</Title>
							<SubTitle>
								{"평점: " + "⭐️".repeat(Math.round(movie.vote_average))}
							</SubTitle>
							<SubTitle>{"개봉일:    " + movie.release_date}</SubTitle>
							<SubTitle>
								{"장르:    " +
									movie.genres?.map((genre) => genre.name).join(", ")}
							</SubTitle>
							<Description>{movie.overview}</Description>
						</TextDiv>
					</>
				) : (
					<Title>Loading...</Title>
				)}
			</PageContainer>
			<Line></Line>
			<CreditContainer>
				<Title>출연진</Title>
				<Credits>
					{Object.keys(credits).length > 0 &&
						credits.cast.slice(0, 10).map((credit) => (
							<CreditBox key={credit.id}>
								<CreditImage
									src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
									alt={credit.name}
								/>
								<CreditName>{credit.name}</CreditName>
								<CreditCharacter>{credit.known_for_department}</CreditCharacter>
							</CreditBox>
						))}
					{Object.keys(credits).length > 0 &&
						credits.crew.slice(0, 10).map((credit) => (
							<CreditBox key={credit.id}>
								<CreditImage
									src={
										credit.profile_path
											? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
											: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"
									}
									alt={credit.name}
								/>
								<CreditName>{credit.name}</CreditName>
								<CreditCharacter>{credit.known_for_department}</CreditCharacter>
							</CreditBox>
						))}
				</Credits>
			</CreditContainer>
			{Object.keys(movie).length > 0 && (
				<BackgroundImageDiv>
					<BackgroundImage
						src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
						alt={movie.title}
					/>
				</BackgroundImageDiv>
			)}
		</div>
	);
};

export default MovieDetail;
