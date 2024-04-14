import React, { useState } from "react";

function InputForm({ onSubmit }) {
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (content.trim()) {
			onSubmit(content);
			setContent("");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="해야 할 일을 입력해주세요..."
			/>
			<button type="submit">추가</button>
		</form>
	);
}

export default InputForm;
