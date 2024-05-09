import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const BackContainer = styled.div`
	width: 100%;
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

const MovieDetail = () => {
	const navigate = useNavigate();
	const movie_id = useParams().id;
	const [movie, setMovie] = useState({});
	const [star, setStar] = useState(0);

	useEffect(() => {
		async function fetchMovie() {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${
					import.meta.env.VITE_API_KEY
				}&language=ko-KR`
			);
			setMovie(response.data);
			setStar(Math.round(response.data.vote_average));
		}
		fetchMovie();
	}, []);

	return (
		<div style={{ minHeight: "calc(100vh - 160px)" }}>
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
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>
				<TextDiv>
					<Title>{movie.title}</Title>
					<SubTitle>{"평점: " + "⭐️".repeat(star)}</SubTitle>
					<SubTitle>{"개봉일:    " + movie.release_date}</SubTitle>
					<SubTitle>
						{"장르:    " + movie.genres?.map((genre) => genre.name).join(", ")}
					</SubTitle>
					<Description>{movie.overview}</Description>
				</TextDiv>
			</PageContainer>
			<BackgroundImageDiv>
				<BackgroundImage
					src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
					alt={movie.title}
				/>
			</BackgroundImageDiv>
		</div>
	);
};

export default MovieDetail;
