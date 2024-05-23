import React, { useState } from "react";
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
import axios from "axios";

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
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [showWarning, setShowWarning] = useState(false);

	const handleLogin = async () => {
		if (!checkValidation) {
			return;
		}
		try {
			const response = await axios.post("http://localhost:8080/auth/login", {
				id,
				password,
			});
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("tokenTimestamp", new Date().getTime());
			alert("Login successful!");
			navigate("/");
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setShowWarning(true);
			} else {
				alert("An error occurred during login");
			}
		}
	};

	// function of checking email and password
	const checkValidation = () => {
		if (id === null || password === null) {
			setShowWarning(true);
			return;
		}
		if (id === id && password === password) {
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
					value={id}
					onChange={(e) => setId(e.target.value)}
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
				disabled={id === "" && password === ""}
				onClick={handleLogin}
			>
				Submit
			</SubmitButton>
			<SignupText to="/signup">Don&apos;t have an account? Sign Up!</SignupText>
		</Container>
	);
}

export default SignIn;
