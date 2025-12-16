"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DevelopmentWarningProps {
	message?: string;
}

export default function DevelopmentWarning({
	message = "This feature is still in active development and should not be used - " +
		"but please if you would like to use this then help contribute to the repo!",
}: DevelopmentWarningProps) {
	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Under Development</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
}
