import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/Todo";
import DoneList from "./components/DoneList";
import InputForm from "./components/InputForm";

function App() {
	const [todos, setTodos] = useState([
		{ id: 1, content: "Send E-mail", isDone: false },
		{ id: 2, content: "Make Work-Books", isDone: false },
		{ id: 3, content: "Sleeping", isDone: true },
		{ id: 4, content: "Watching You-Tube", isDone: true },
	]);

	const addTodo = (content) => {
		const newTodo = {
			id: Date.now(),
			content,
			isDone: false,
		};
		setTodos([...todos, newTodo]);
	};

	const toggleTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="App">
			<h1>To-Do List</h1>
			<InputForm onSubmit={addTodo} />
			<div className="lists">
				<TodoList
					todos={todos.filter((todo) => !todo.isDone)}
					onToggle={toggleTodo}
				/>
				<DoneList
					todos={todos.filter((todo) => todo.isDone)}
					onDelete={deleteTodo}
				/>
			</div>
		</div>
	);
}

export default App;
