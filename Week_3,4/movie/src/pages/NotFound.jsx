import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const NotFoundTitle = styled.h1`
	font-size: 48px;
	margin-bottom: 16px;
`;

const NotFoundMessage = styled.p`
	font-size: 24px;
`;
const MainPage = styled(NotFoundMessage)`
	cursor: pointer;
	margin-top: 16px;
	transition: all 0.3s ease;
	&:hover {
		color: #007bff;
	}
`;

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<NotFoundContainer>
			<NotFoundTitle>404</NotFoundTitle>
			<NotFoundMessage>Page Not Found</NotFoundMessage>
			<MainPage onClick={() => navigate("/")}>Go to Main Page</MainPage>
		</NotFoundContainer>
	);
};

export default NotFound;
