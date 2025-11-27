"use client";

import type React from "react";
import { useContext } from "react";
import { ErrorContext } from "../contexts/errorContext.tsx";

interface ErrorPromptProps {
	key: number;
	index: number;
	message: string;
}

const ErrorPrompt: React.FC<ErrorPromptProps> = ({ index, message }) => {
	const { removeError } = useContext(ErrorContext);

	const onClose = () => {
		removeError(index);
	};

	return (
		<div className="w-full bg-red-100 text-red-800 border border-red-300 rounded-md p-4 shadow-md flex flex-row items-center justify-between m-1">
			<div className="flex-1">
				<span>{message}</span>
			</div>
			<button
				type={"button"}
				className="bg-transparent border-none text-red-800 text-xl cursor-pointer"
				onClick={onClose}
			>
				&times;
			</button>
		</div>
	);
};

export default ErrorPrompt;
