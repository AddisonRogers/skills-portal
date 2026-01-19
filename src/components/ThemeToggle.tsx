"use client";

import { useTheme } from "@/components/theme-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="flex items-center space-x-2">
			<Switch id="theme-toggle" onClick={toggleTheme} />
			<Label>{theme === "dark" ? "Dark" : "Light"}</Label>
		</div>
	);
}
