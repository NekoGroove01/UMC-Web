import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
	position: fixed;
	right: 20px;
	bottom: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ScrollButton = styled.button`
	background-color: #3498db;
	color: white;
	border: none;
	border-radius: 5px;
	padding: 10px 15px;
	cursor: pointer;
	font-size: 14px;
	&:hover {
		background-color: #2980b9;
	}
`;

const ScrollButtons = () => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth",
		});
	};

	return (
		<ButtonContainer>
			<ScrollButton onClick={scrollToTop}>▲</ScrollButton>
			<ScrollButton onClick={scrollToBottom}>▼</ScrollButton>
		</ButtonContainer>
	);
};

export default ScrollButtons;
