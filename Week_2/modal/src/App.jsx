import React, { useState } from "react";
import "./App.css";
import Modal from "./Modal.jsx";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		console.log(isModalOpen);
	};

	return (
		<div className="App">
			<h1>안녕하세요!</h1>
			<p>내용은 어쩌구 저쩌구...</p>
			<button onClick={toggleModal}>Open Modal</button>
			{isModalOpen && <Modal onClose={toggleModal} />}
		</div>
	);
}

export default App;
