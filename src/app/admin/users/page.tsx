import { db } from "@/lib/db";
import { user, userSkill, skill } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Type for user with skills
type UserWithSkills = {
	id: string;
	name: string;
	email: string;
	skills: {
		skillName: string;
		level: number | null;
		acquiredAt: Date | null;
	}[];
};

export default async function UsersSkillsPage() {
	// Fetch all users
	const users = await db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
		})
		.from(user)
		.orderBy(user.name);

	// For each user, fetch their skills
	const usersWithSkills: UserWithSkills[] = await Promise.all(
		users.map(async (user) => {
			const userSkills = await db
				.select({
					skillName: skill.name,
					level: userSkill.level,
					acquiredAt: userSkill.acquiredAt,
				})
				.from(userSkill)
				.innerJoin(skill, eq(userSkill.skillId, skill.id))
				.where(eq(userSkill.userId, user.id));

			return {
				...user,
				skills: userSkills,
			};
		}),
	);

	// Helper function to render proficiency level
	const renderProficiencyLevel = (level: number | null) => {
		if (level === null) return "Not started";

		switch (level) {
			case 1:
				return "Beginner";
			case 2:
				return "Intermediate";
			case 3:
				return "Advanced";
			default:
				return `Level ${level}`;
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Users & Skills</h2>

			<div className="space-y-8">
				{usersWithSkills.map((user) => (
					<Card key={user.id} className="mb-6">
						<CardHeader>
							<CardTitle>{user.name}</CardTitle>
							<p className="text-gray-500">{user.email}</p>
						</CardHeader>
						<CardContent>
							<Table>
								<TableCaption>Skills acquired by {user.name}</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead>Skill Name</TableHead>
										<TableHead>Proficiency Level</TableHead>
										<TableHead>Acquired At</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{user.skills.map((skill, index) => (
										<TableRow key={index}>
											<TableCell className="font-medium">
												{skill.skillName}
											</TableCell>
											<TableCell>
												{renderProficiencyLevel(skill.level)}
											</TableCell>
											<TableCell>
												{skill.acquiredAt
													? skill.acquiredAt.toLocaleDateString()
													: "Not acquired"}
											</TableCell>
										</TableRow>
									))}
									{user.skills.length === 0 && (
										<TableRow>
											<TableCell colSpan={3} className="text-center">
												No skills acquired yet
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				))}

				{usersWithSkills.length === 0 && (
					<p className="text-center text-gray-500">No users found</p>
				)}
			</div>
		</div>
	);
}
