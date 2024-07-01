import React from "react";
import styled from "styled-components";

const TodoItemContainer = styled.li`
	display: flex;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #eee;
`;

const Checkbox = styled.input`
	margin-right: 10px;
`;

const TodoText = styled.span`
	flex-grow: 1;
	text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const RemoveButton = styled.button`
	background-color: #f44336;
	color: white;
	border: none;
	padding: 5px 10px;
	border-radius: 4px;
	cursor: pointer;
`;

function TodoItem({ todo, onToggle, onRemove }) {
	return (
		<TodoItemContainer>
			<Checkbox type="checkbox" checked={todo.completed} onChange={onToggle} />
			<TodoText completed={todo.completed}>{todo.text}</TodoText>
			<RemoveButton onClick={onRemove}>Delete</RemoveButton>
		</TodoItemContainer>
	);
}

export default TodoItem;
