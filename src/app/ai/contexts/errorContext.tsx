"use client";

import { createContext } from "react";

export type ErrorContextType = {
	errors: string[];
	addError: (message: string) => void;
	removeError: (index: number) => void;
	clearErrors: () => void;
};

export const ErrorContext = createContext<ErrorContextType>({
	errors: [],
	addError: () => {},
	removeError: () => {},
	clearErrors: () => {},
});
