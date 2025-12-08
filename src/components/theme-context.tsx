"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return ctx;
}

export function ThemeProvider({
	initialTheme,
	children,
}: {
	initialTheme: Theme;
	children: ReactNode;
}) {
	const [theme, setTheme] = useState<Theme>(initialTheme);

	useEffect(() => {
		let cancelled = false;

		async function loadTheme() {
			try {
				const res = await fetch("/api/theme");
				if (!res.ok) return;

				const data: { theme: Theme | null } = await res.json();
				if (!cancelled && data.theme) {
					setTheme(data.theme);
				}
			} catch (err) {
				console.error("Failed to load theme from Redis", err);
			}
		}

		loadTheme();

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (typeof document === "undefined") return;

		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [theme]);

	async function toggleTheme() {
		const next: Theme = theme === "dark" ? "light" : "dark";
		setTheme(next);

		try {
			await fetch("/api/theme", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ theme: next }),
			});
		} catch (err) {
			console.error("Failed to save theme to Redis", err);
		}
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
