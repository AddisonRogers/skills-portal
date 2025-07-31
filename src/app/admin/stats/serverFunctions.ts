"use server";

import { db } from "@/lib/db";
import { user, userSkill, skill } from "@/db/schema";
import { count, sql } from "drizzle-orm";
import type { ChartConfig } from "@/components/ui/chart";

export type getPopularSkillsStatsReturnType = {
	data: { skill: string; users: number }[];
	config: ChartConfig;
};

export type getPopularSkillsStatsReturnTypePromised =
	Promise<getPopularSkillsStatsReturnType>;

export async function getPopularSkillsStats(): getPopularSkillsStatsReturnTypePromised {
	const popularSkills = await db
		.select({
			skillName: skill.name,
			count: count(),
		})
		.from(userSkill)
		.innerJoin(
			skill,
			sql`${userSkill.skillId}
    =
    ${skill.id}`,
		)
		.groupBy(skill.name)
		.orderBy(sql`count DESC`)
		.limit(10);

	// Format data for Recharts
	const popularSkillsData = popularSkills.map((skill) => ({
		skill: skill.skillName,
		users: Number(skill.count),
	}));

	// Chart configuration
	const popularSkillsConfig: ChartConfig = {
		users: {
			label: "Number of Users",
			color: "hsl(var(--chart-1))",
		},
	};

	return {
		data: popularSkillsData,
		config: popularSkillsConfig,
	};
}

export type getProficiencyDistributionStatsReturnType = {
	data: { level: string; count: number }[];
	config: ChartConfig;
};

export type getProficiencyDistributionStatsReturnTypePromised =
	Promise<getProficiencyDistributionStatsReturnType>;

export async function getProficiencyDistributionStats(): getProficiencyDistributionStatsReturnTypePromised {
	const proficiencyDistribution = await db
		.select({
			level: userSkill.level,
			count: count(),
		})
		.from(userSkill)
		.where(sql`${userSkill.level}
    IS NOT NULL`)
		.groupBy(userSkill.level)
		.orderBy(userSkill.level);

	// Format data for Recharts
	const proficiencyData = proficiencyDistribution.map((p) => ({
		level:
			p.level === 1
				? "Beginner"
				: p.level === 2
					? "Intermediate"
					: p.level === 3
						? "Advanced"
						: `Level ${p.level}`,
		count: Number(p.count),
	}));

	// Chart configuration
	const proficiencyConfig: ChartConfig = {
		Beginner: {
			label: "Beginner",
			color: "hsl(var(--chart-1))",
		},
		Intermediate: {
			label: "Intermediate",
			color: "hsl(var(--chart-2))",
		},
		Advanced: {
			label: "Advanced",
			color: "hsl(var(--chart-3))",
		},
	};

	return {
		data: proficiencyData,
		config: proficiencyConfig,
	};
}

export type getSkillsOverTimeStatsReturnType = {
	data: { month: string; skills: number }[];
	config: ChartConfig;
};

export type getSkillsOverTimeStatsReturnTypePromised =
	Promise<getSkillsOverTimeStatsReturnType>;

export async function getSkillsOverTimeStats(): getSkillsOverTimeStatsReturnTypePromised {
	const skillsOverTime = await db
		.select({
			month: sql`to_char
      (
      ${userSkill.acquiredAt},
      'YYYY-MM'
      )`,
			count: count(),
		})
		.from(userSkill)
		.where(sql`${userSkill.acquiredAt}
    IS NOT NULL`)
		.groupBy(sql`to_char
    (
    ${userSkill.acquiredAt},
    'YYYY-MM'
    )`)
		.orderBy(sql`to_char
    (
    ${userSkill.acquiredAt},
    'YYYY-MM'
    )`);

	// Format data for Recharts
	const skillsOverTimeData = skillsOverTime.map((s) => ({
		month: s.month as string,
		skills: Number(s.count),
	}));

	// Chart configuration
	const skillsOverTimeConfig: ChartConfig = {
		skills: {
			label: "Skills Acquired",
			color: "hsl(var(--chart-1))",
		},
	};

	return {
		data: skillsOverTimeData,
		config: skillsOverTimeConfig,
	};
}
