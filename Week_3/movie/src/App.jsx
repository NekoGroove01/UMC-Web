import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PopularPage from "./pages/PopularPage";
import Layout from "./Layout";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/Signin";
// import PublicRoute from "./components/PublicRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route
						path="/popular"
						element={<PopularPage names="popular" title="Popular Page" />}
					/>
					<Route
						path="/nowplaying"
						element={<PopularPage names="now_playing" title="Now Playing" />}
					/>
					<Route
						path="/toprated"
						element={<PopularPage names="top_rated" title="Top Rated" />}
					/>
					<Route
						path="/upcoming"
						element={<PopularPage names="upcoming" title="Upcoming" />}
					/>
					<Route path="/movie/:id" element={<MovieDetail />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
