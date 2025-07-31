"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  getPopularSkillsStatsReturnType,
  getPopularSkillsStatsReturnTypePromised
} from "@/app/admin/stats/serverFunctions";
import { use } from "react";

export default function MostPopularSkillsChart(
	params: getPopularSkillsStatsReturnType,
) {
	const { data: popularSkillsData, config: popularSkillsConfig } = params;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Most Popular Skills</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={popularSkillsConfig}>
					<BarChart data={popularSkillsData}>
						<XAxis
							dataKey="skill"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							interval={0}
							angle={-45}
							textAnchor="end"
							height={80}
						/>
						<YAxis tickLine={false} axisLine={false} tickMargin={8} />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="users" fill="var(--color-users)" radius={8} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
