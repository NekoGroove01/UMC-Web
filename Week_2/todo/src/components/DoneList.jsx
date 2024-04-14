import React from "react";

function DoneList({ todos, onDelete }) {
	return (
		<div className="done-list">
			<h2>완료한 일</h2>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.content}
						<button className="check-button" onClick={() => onDelete(todo.id)}>
							❌
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default DoneList;
