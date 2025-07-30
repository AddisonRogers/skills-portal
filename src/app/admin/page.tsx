import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { skill, user, userSkill } from "@/db/schema";
import { count } from "drizzle-orm";

export default async function AdminDashboard() {
	// Fetch summary statistics
	const skillsCount = await db.select({ count: count() }).from(skill);
	const usersCount = await db.select({ count: count() }).from(user);
	const skillsAcquiredCount = await db
		.select({ count: count() })
		.from(userSkill);

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Dashboard</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Total Skills</CardTitle>
						<CardDescription>Number of skills in the system</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">{skillsCount[0]?.count || 0}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Total Users</CardTitle>
						<CardDescription>Number of registered users</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">{usersCount[0]?.count || 0}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Skills Acquired</CardTitle>
						<CardDescription>Total skills acquired by users</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">
							{skillsAcquiredCount[0]?.count || 0}
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="mt-8">
				<h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card className="cursor-pointer hover:bg-gray-50 transition-colors">
						<CardHeader>
							<CardTitle className="text-lg">Manage Skills</CardTitle>
							<CardDescription>View and manage all skills</CardDescription>
						</CardHeader>
						<CardContent>
							<a href="/admin/skills" className="text-blue-600 hover:underline">
								Go to Skills Management →
							</a>
						</CardContent>
					</Card>

					<Card className="cursor-pointer hover:bg-gray-50 transition-colors">
						<CardHeader>
							<CardTitle className="text-lg">View User Progress</CardTitle>
							<CardDescription>
								See users and their skill progression
							</CardDescription>
						</CardHeader>
						<CardContent>
							<a href="/admin/users" className="text-blue-600 hover:underline">
								Go to Users & Skills →
							</a>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
