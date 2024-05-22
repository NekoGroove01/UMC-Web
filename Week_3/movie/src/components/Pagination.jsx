import React from "react";
import styled from "styled-components";

// Styled components for pagination
const PaginationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
`;

const PageNumber = styled.span`
	margin: 0 10px;
`;

const ArrowButton = styled.button`
	background: none;
	border: none;
	font-size: 16px;
	cursor: pointer;
	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	return (
		<PaginationWrapper>
			<ArrowButton
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				←
			</ArrowButton>
			<PageNumber>
				Page {currentPage} of {totalPages}
			</PageNumber>
			<ArrowButton
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				→
			</ArrowButton>
		</PaginationWrapper>
	);
};

export default Pagination;
