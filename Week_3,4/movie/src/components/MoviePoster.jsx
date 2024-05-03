import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MoviePosterContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	justify-content: center;
	align-items: center;
`;

const MoviePosterImage = styled.img`
	width: 100%;
	object-fit: cover;
	transition: all 0.3s ease;
	transform: ${(props) => (props.ishovered ? "scale(1.1)" : "scale(1)")};
`;

const MovieDescription = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: black;
	color: white;
	padding: 10px;
	box-sizing: border-box;
	overflow: auto;
	opacity: 0;
	transition: all 0.2s ease;
	&:hover {
		opacity: 0.8;
	}
`;

const Heading3 = styled.h3`
	margin: 0.5rem 0;
`;

const ImageBox = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

const Text = styled.p`
	font-size: 10px;
	margin-top: 10px;
`;

const MoviePoster = ({ movie }) => {
	const [isHovered, setIsHovered] = useState(false);
	const navigator = useNavigate();

	function handleMouseEnter() {
		setIsHovered(true);
	}

	function handleMouseLeave() {
		setIsHovered(false);
	}

	function handleClick() {
		navigator("/movie/" + movie.id);
	}

	return (
		<MoviePosterContainer
			className="movie-poster"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<ImageBox className="image-box" onClick={handleClick}>
				<MoviePosterImage
					src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
					alt={movie.title}
					className="movie-poster-image"
					ishovered={isHovered.toString()}
				/>
				{isHovered && (
					<MovieDescription>
						<Heading3>{movie.title}</Heading3>
						<Text>
							{movie.overview.length > 200
								? movie.overview.substring(0, 200) + "..."
								: movie.overview}
						</Text>
					</MovieDescription>
				)}
			</ImageBox>
			<Heading3>{movie.title}</Heading3>
			<p>{movie.vote_average.toFixed(1)}</p>
		</MoviePosterContainer>
	);
};

export default MoviePoster;
