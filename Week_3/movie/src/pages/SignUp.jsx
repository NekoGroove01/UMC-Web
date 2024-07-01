import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
	width: min(90%, 700px);
	min-height: 100vh;
	margin: 0 auto;
`;

export const Title = styled.h2`
	text-align: center;
	margin: 60px 0 30px;
	font-size: 32px;
`;

export const InputArea = styled.div`
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const InputText = styled.p`
	margin: 0 10px;
	font-size: 16px;
`;

export const WarningText = styled.p`
	margin: 0 10px;
	font-size: 12px;
	color: red;
	opacity: ${(props) => (props.show ? "1" : "0")};
	transition: opacity 0.1s ease-in-out;
`;

export const Input = styled.input`
	width: 100%;
	padding: 10px 15px;
	margin-top: 10px;
	font-size: 16px;
`;

export const SubmitButton = styled.button`
	margin: 20px 0 80px;
	width: 100%;
	padding: 10px 0;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 0px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3; // Darken the button on hover
		transition: background-color 0.3s ease-in-out;
	}
	&:disabled {
		filter: grayscale(0.5);
		cursor: not-allowed;
	}
	&:disabled:hover {
		background-color: #007bff;
	}
`;

function SignUp() {
	const navigator = useNavigate();
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errors, setErrors] = useState({
		name: "",
		id: "",
		email: "",
		age: "",
		password: "",
		passwordConfirm: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			name !== "" &&
			id !== "" &&
			email !== "" &&
			age !== "" &&
			password !== "" &&
			passwordConfirm !== "" &&
			Object.values(errors).every((error) => error === "")
		) {
			console.log("Form submitted:", {
				name,
				email,
				age,
				password,
				passwordConfirm,
			});
			try {
				await axios.post("http://localhost:8080/auth/signup", {
					name: name,
					email: email,
					age: age,
					username: id,
					password: password,
					passwordCheck: passwordConfirm,
				});
				alert("Signup successful!");
				navigator("/signin");
			} catch (error) {
				if (error.response && error.response.status === 409) {
					alert("Username already exists");
				} else if (error.response && error.response.status === 400) {
					alert("Passwords do not match");
					console.log(error);
				} else {
					alert("An error occurred during signup");
				}
			}
		}
	};

	const validateName = (value) => {
		if (!value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				name: "이름을 입력해주세요.",
			}));
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
		}
	};

	const validateId = (value) => {
		if (!value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				id: "아이디를 입력해주세요.",
			}));
		} else if (!/^[a-zA-Z0-9]+$/.test(value)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				id: "아이디는 영어와 숫자로만 이루어져야 합니다.",
			}));
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, id: "" }));
		}
	};

	const validateEmail = (value) => {
		if (!value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: "이메일을 입력해주세요.",
			}));
		} else if (!value.includes("@")) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: "이메일 양식에 맞지 않습니다.",
			}));
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
		}
	};

	const validateAge = (value) => {
		if (!value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				age: "나이를 입력해주세요.",
			}));
		} else if (isNaN(value)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				age: "나이는 숫자로 입력해주세요.",
			}));
		} else if (value < 0) {
			setErrors((prevErrors) => ({
				...prevErrors,
				age: "나이는 음수가 될 수 없습니다.",
			}));
		} else if (!Number.isInteger(parseFloat(value))) {
			setErrors((prevErrors) => ({
				...prevErrors,
				age: "나이는 소수가 될 수 없습니다.",
			}));
		} else if (value < 19) {
			setErrors((prevErrors) => ({
				...prevErrors,
				age: "19살 이상만 가입이 가능합니다.",
			}));
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, age: "" }));
		}
	};

	const validatePassword = (value) => {
		if (!value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: "비밀번호를 입력해주세요.",
			}));
		} else if (value.length < 4) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: "비밀번호는 최소 4자리 이상이어야 합니다.",
			}));
		} else if (value.length > 12) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: "비밀번호는 최대 12자리까지 가능합니다.",
			}));
		} else if (!/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password:
					"영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다.",
			}));
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
		}
	};

	const validatePasswordConfirm = (value) => {
		if (!value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				passwordConfirm: "비밀번호 확인을 입력해주세요.",
			}));
		} else if (value !== password) {
			setErrors((prevErrors) => ({
				...prevErrors,
				passwordConfirm: "비밀번호가 일치하지 않습니다.",
			}));
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "" }));
		}
	};

	return (
		<Container>
			<Title>Sign Up To Our Service</Title>
			<div>
				<InputArea>
					<InputText>User Name</InputText>
					<Input
						type="text"
						placeholder="Please submit your name..."
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							validateName(e.target.value);
						}}
					/>
					<WarningText show={errors.name === "" ? "False" : "True"}>
						{errors.name}
					</WarningText>
				</InputArea>
				<InputArea>
					<InputText>User ID</InputText>
					<Input
						type="text"
						placeholder="Please submit your ID..."
						value={id}
						onChange={(e) => {
							setId(e.target.value);
							validateId(e.target.value);
						}}
					/>
					<WarningText show={errors.id === "" ? "False" : "True"}>
						{errors.id}
					</WarningText>
				</InputArea>
				<InputArea>
					<InputText>E-mail</InputText>
					<Input
						type="text"
						placeholder="Please submit your e-mail..."
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							validateEmail(e.target.value);
						}}
					/>
					<WarningText show={errors.email === "" ? "False" : "True"}>
						{errors.email}
					</WarningText>
				</InputArea>
				<InputArea>
					<InputText>Age</InputText>
					<Input
						type="text"
						placeholder="Please submit your age..."
						value={age}
						onChange={(e) => {
							setAge(e.target.value);
							validateAge(e.target.value);
						}}
					/>
					<WarningText show={errors.age === "" ? "False" : "True"}>
						{errors.age}
					</WarningText>
				</InputArea>
				<InputArea>
					<InputText>Password</InputText>
					<Input
						type="password"
						placeholder="Please submit your password..."
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							validatePassword(e.target.value);
						}}
					/>
					<WarningText show={errors.password === "" ? "False" : "True"}>
						{errors.password}
					</WarningText>
				</InputArea>
				<InputArea>
					<InputText>Password Validation</InputText>
					<Input
						type="password"
						placeholder="Please check your password again..."
						value={passwordConfirm}
						onChange={(e) => {
							setPasswordConfirm(e.target.value);
							validatePasswordConfirm(e.target.value);
						}}
					/>
					<WarningText show={errors.passwordConfirm === "" ? "False" : "True"}>
						{errors.passwordConfirm}
					</WarningText>
				</InputArea>
				<SubmitButton
					type="submit"
					disabled={
						name === "" ||
						email === "" ||
						age === "" ||
						password === "" ||
						passwordConfirm === "" ||
						Object.values(errors).some((error) => error !== "") // 여기다가 확인하는 함수
					}
					onClick={handleSubmit}
				>
					Submit
				</SubmitButton>
			</div>
		</Container>
	);
}

export default SignUp;
