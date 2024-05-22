import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
	width: 100%;
	height: 80px;
	padding: 1rem 2rem;
	background-color: #222;
	color: #fff;
`;

const LeftSection = styled.div``;

const RightSection = styled.div`
	text-align: right;
	a {
		color: lightblue;

		&:hover {
			color: white;
			transition: color 0.2s ease-in-out;
		}
	}
`;

const Footer = () => {
	return (
		<FooterContainer>
			<LeftSection>
				&copy; {new Date().getFullYear()} UMC Movie. All rights reserved.
			</LeftSection>
			<RightSection>
				<a
					href="https://github.com/NekoGroove01"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit my GitHub
				</a>
			</RightSection>
		</FooterContainer>
	);
};

export default Footer;
