"use client";

// TODO make this a popup componenet

import type React from "react";
import { authClient } from "@/lib/auth-client";

const UnauthenticatedScreen: React.FC = () => {
	const signIn = async () => {
		const data = await authClient.signIn.social({
			provider: "microsoft",
			callbackURL: "/dashboard", // The URL to redirect to after the sign in
		});
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-gray-200">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
				<h1 className="text-2xl font-bold mb-6">Authentication Required</h1>
				<p className="mb-8 text-gray-400">
					You are not authenticated. Please log in to access this application.
				</p>
				<button
					type="button"
					onClick={signIn}
					className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
				>
					Sign In
				</button>
			</div>
		</div>
	);
};

export default UnauthenticatedScreen;
