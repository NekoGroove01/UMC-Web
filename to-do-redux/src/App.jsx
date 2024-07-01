import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/Store"; // Corrected the file name
import TodoList from "./components/TodoList";
import styled from "styled-components";

const AppContainer = styled.div`
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	background-color: #f0f0f0;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
	text-align: center;
	margin-bottom: 20px;
`;

const DateDisplay = styled.h2`
	font-size: 18px;
	margin: 0;
`;

const TimeDisplay = styled.p`
	font-size: 24px;
	margin: 5px 0;
`;

function App() {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		// Cleanup the interval on component unmount
		return () => clearInterval(timer);
	}, []);

	const formattedDate = `${currentTime.getFullYear()}년 ${
		currentTime.getMonth() + 1
	}월 ${currentTime.getDate()}일`;
	const formattedTime = currentTime.toLocaleTimeString("ko-KR", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	return (
		<Provider store={store}>
			<AppContainer>
				<Header>
					<DateDisplay>{formattedDate}</DateDisplay>
					<TimeDisplay>{formattedTime}</TimeDisplay>
				</Header>
				<TodoList />
			</AppContainer>
		</Provider>
	);
}

export default App;
