import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
	Container,
	Input,
	InputArea,
	InputText,
	SubmitButton,
	Title,
} from "./SignUp";

const WarningText = styled.p`
	margin: 0 10px;
	font-size: 12px;
	color: red;
	opacity: ${(props) => (props.show ? "1" : "0")};
	transition: opacity 0.1s ease-in-out;
`;

const SignupText = styled(NavLink)`
	font-size: 16px;
	color: #333;
	transition: all 0.3s ease;
	&:hover {
		cursor: pointer;
		color: #007bff;
		text-decoration: underline;
	}
`;

function SignIn() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showWarning, setShowWarning] = useState(false);

	useEffect(() => {
		console.log();
	}, []);

	// function of checking email and password
	const handleLogin = () => {
		if (email === null || password === null) {
			setShowWarning(true);
			return;
		}
		if (email === email && password === password) {
			navigate("/");
		} else {
			setShowWarning(true);
		}
	};

	return (
		<Container>
			<Title>Sign In</Title>
			<InputArea>
				<InputText>Email</InputText>
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</InputArea>
			<InputArea>
				<InputText>Password</InputText>
				<Input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</InputArea>
			<WarningText show={showWarning}>Invalid email or password</WarningText>
			<SubmitButton
				type="submit"
				disabled={email === "" && password === ""}
				onClick={handleLogin}
			>
				Submit
			</SubmitButton>
			<SignupText to="/signup">Don&apos;t have an account? Sign Up!</SignupText>
		</Container>
	);
}

export default SignIn;
