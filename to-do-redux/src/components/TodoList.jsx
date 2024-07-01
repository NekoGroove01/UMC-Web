import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../redux/TodoSlice";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoForm = styled.form`
	display: flex;
	margin-bottom: 20px;
`;

const TodoInput = styled.input`
	flex-grow: 1;
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ddd;
	border-radius: 4px 0 0 4px;
`;

const AddButton = styled.button`
	padding: 10px 15px;
	font-size: 16px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 0 4px 4px 0;
	cursor: pointer;
`;

const TodoListContainer = styled.ul`
	list-style-type: none;
	padding: 0;
`;

function TodoList() {
	const [newTodo, setNewTodo] = useState("");
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newTodo.trim()) {
			dispatch(addTodo(newTodo.trim()));
			setNewTodo("");
		}
	};

	return (
		<div>
			<TodoForm onSubmit={handleSubmit}>
				<TodoInput
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Add a new todo"
				/>
				<AddButton type="submit">+</AddButton>
			</TodoForm>
			<TodoListContainer>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={() => dispatch(toggleTodo(todo.id))}
						onRemove={() => dispatch(removeTodo(todo.id))}
					/>
				))}
			</TodoListContainer>
		</div>
	);
}

export default TodoList;
