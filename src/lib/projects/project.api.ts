import router from "next/router";

export async function fetchYourProjects() {
	const res = await fetch("/api/projects/your");

	if (res.status === 401) router.push("/login");
	if (!res.ok) throw new Error("Failed to fetch projects");

	return res.json();
}
