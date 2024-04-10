import React, { useState } from "react";
import { movies } from "./Api.jsx";
import "./App.css";

function MoviePoster({ movie, path }) {
	const [isHovered, setIsHovered] = useState(false);

	function handleMouseEnter() {
		setIsHovered(true);
	}

	function handleMouseLeave() {
		setIsHovered(false);
	}

	return (
		<div
			className="movie-poster"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="image-box">
				<img
					src={"https://image.tmdb.org/t/p/original" + path}
					alt={movie.title}
					className="movie-poster-image"
				/>
				{isHovered && (
					<div className="movie-description">
						<h3>{movie.title}</h3>
						<p className="movie-description-text">
							{movie.overview.length > 200
								? movie.overview.substring(0, 200) + "..."
								: movie.overview}
						</p>
					</div>
				)}
			</div>
			<h3>{movie.title}</h3>
			<p>{movie.vote_average}</p>
		</div>
	);
}

function App() {
	return (
		<div className="app">
			<h1>Movie Posters</h1>
			<div className="movie-grid">
				{movies.results.map((movie) => (
					<MoviePoster key={movie.id} movie={movie} path={movie.poster_path} />
				))}
			</div>
		</div>
	);
}

export default App;
