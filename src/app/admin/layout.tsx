import { redirect } from "next/navigation";
import { authIsAdmin } from "@/lib/auth";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Check if user is admin
	const userIsAdmin = await authIsAdmin();

	// If not admin, redirect to home page
	if (
		userIsAdmin === false ||
		userIsAdmin === null ||
		userIsAdmin === undefined
	) {
		redirect("/");
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
			<div className="flex">
				<aside className="w-64 mr-8">
					<nav className="space-y-2">
						<a
							href="/admin"
							className="block p-2 rounded hover:bg-gray-100 transition-colors"
						>
							Dashboard
						</a>
						<a
							href="/admin/skills"
							className="block p-2 rounded hover:bg-gray-100 transition-colors"
						>
							Skills Management
						</a>
						<a
							href="/admin/users"
							className="block p-2 rounded hover:bg-gray-100 transition-colors"
						>
							Users & Skills
						</a>
						<a
							href="/admin/stats"
							className="block p-2 rounded hover:bg-gray-100 transition-colors"
						>
							Statistics
						</a>
					</nav>
				</aside>
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
}
