"use client";

import React, { type ReactNode, useCallback, useState } from "react";
import {
	ErrorContext,
	type ErrorContextType,
} from "../contexts/errorContext.tsx";

export type ErrorProviderProps = {
	children: ReactNode;
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
	const [errors, setErrors] = useState<string[]>([]);

	const addError = useCallback((message: string) => {
		setErrors((prev) => [...prev, message]);
	}, []);

	const removeError = useCallback((index: number) => {
		setErrors((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const clearErrors = useCallback(() => {
		setErrors([]);
	}, []);

	const value: ErrorContextType = {
		errors,
		addError,
		removeError,
		clearErrors,
	};

	return (
		<ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
	);
};
