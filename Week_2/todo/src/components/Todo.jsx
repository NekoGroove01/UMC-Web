import React from "react";

function TodoList({ todos, onToggle }) {
	return (
		<div className="todo-list">
			<h2>해야 할 일</h2>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.content}
						<button className="check-button" onClick={() => onToggle(todo.id)}>
							✅
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
