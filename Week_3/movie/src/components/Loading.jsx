import React, { useEffect, useRef } from "react";

function LoadingIndicator() {
	const canvasRef = useRef(null); // Reference to the canvas element
	let requestId; // To store requestAnimationFrame ID

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const dotRadius = 6;
		let frame = 0;

		// Function for drawing dots
		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

			// Draw each dot
			for (let i = 0; i < 3; i++) {
				context.beginPath();
				const xPosition = (i + 1) * 20;
				// Dynamic y position based on animation frame, creates popping effect
				const yPosition =
					20 + Math.abs(10 * Math.sin(((frame + i * 10) * Math.PI) / 30));

				context.arc(xPosition, yPosition, dotRadius, 0, Math.PI * 2);
				context.fillStyle = "#000"; // Dot color
				context.fill();
			}

			frame++;
			requestId = requestAnimationFrame(draw); // Re-call draw before the next repaint
		}

		draw(); // Start drawing

		return () => {
			cancelAnimationFrame(requestId); // Clean-up: cancel onAnimationFrame on unmount
		};
	}, []);

	return <canvas ref={canvasRef} width="80" height="60" />;
}

export default LoadingIndicator;
