import React, { useRef } from "react";
import "../styles/pagination.css"


interface PaginationProps {
	className?: string;
	totalItems: number;
	pageSize: number;
	currentPage: number;
	handlePageChange: (pageNumber: number) => void;
}

export const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
	const { totalItems, pageSize } = props;
	const pageInput = React.useRef<HTMLInputElement>();
	const totalPages = Math.ceil(totalItems / pageSize);
	const [inputVal, setIntputVal] = React.useState(props.currentPage || "1");

	const handlePrevClick = () => {
		if (props.currentPage > 1) {
			props.handlePageChange(props.currentPage - 1);
			setIntputVal(props.currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (props.currentPage < totalPages) {
			props.handlePageChange(props.currentPage + 1);
			setIntputVal(props.currentPage + 1);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIntputVal(e.target.value);
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

        let newVal: number;
        if (typeof(inputVal) == "string") {
            newVal = parseInt(inputVal, 10);
        } else {
            newVal = inputVal
        }

		// Handle too low number
		if (newVal < 1) {
			newVal = 1;
		}

		// Handle too high number
		if (newVal > totalPages) {
			newVal = totalPages;
		}

		props.handlePageChange(newVal);
		setIntputVal(newVal);

		// Blur input on submit
		//pageInput.current!.blur();
	};

	return (
		<form className="pagination" onSubmit={handleSubmit}>
			<button
				className="button prev"
				onClick={handlePrevClick}
				type={"button"}
				aria-label={"Previous"}
				disabled={props.currentPage <= 1}
			><i className="icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17 5.88L15.29 4 8 12l7.29 8L17 18.12 11.44 12z"
                    fillRule="evenodd"
                />
            </svg>
        </i>
				
			</button>
			<span className="text pageText">Page:</span>
			<input
				className="input"
				type="number"
				value={inputVal}
				onChange={handleInputChange}
			/>
			<span className="text">of {totalPages}</span>
			<button
				className="button next"
				onClick={handleNextClick}
				type={"button"}
				aria-label={"Next"}
				disabled={props.currentPage >= totalPages}
			><i className="icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 5.88L9.71 4 17 12l-7.29 8L8 18.12 13.56 12z"
                    fillRule="evenodd"
                />
            </svg>
        </i>
			</button>
		</form>
	);
};