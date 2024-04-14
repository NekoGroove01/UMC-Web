import React, { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	function handleIncrement() {
		setCount(count + 1);
		console.log("Incremented");
	}

	function handleDecrement() {
		setCount(count - 1);
		console.log("Decremented");
	}

	return (
		<div className="App">
			<header className="App-header">
				<h3>Counter</h3>
				<div className="counter-value">{count}</div>
				<div className="button-container">
					<button onClick={handleIncrement}>+1</button>
					<button onClick={handleDecrement}>-1</button>
				</div>
			</header>
		</div>
	);
}

export default App;
