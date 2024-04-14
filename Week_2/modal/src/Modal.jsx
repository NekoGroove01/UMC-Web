import React from "react";
import "./Modal.css";

function Modal({ onClose }) {
	return (
		<div className="modal-back">
			<div className="modal-content">
				<h2>안녕하세요</h2>
				<p>모달 내용은 어쩌고 저쩌고..</p>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
}

export default Modal;
