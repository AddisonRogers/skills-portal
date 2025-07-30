"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Bar,
	BarChart,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { use } from "react";
import { getAllStats } from "@/app/admin/stats/serverFunctions";

export default async function StatsPage() {
	// Get skills by popularity (most acquired)

	const allData = use(getAllStats());
	const proficiencyData = allData.proficiencyDistribution;
	const popularSkillsData = allData.popularSkills;
	const skillsOverTimeData = allData.skillsOverTime;

	const proficiencyConfig = proficiencyData.config;
	const proficiencyDataData = proficiencyData.data;

	const popularSkillsConfig = popularSkillsData.config;
	const popularSkillsDataData = popularSkillsData.data;

	const skillsOverTimeConfig = skillsOverTimeData.config;
	const skillsOverTimeDataData = skillsOverTimeData.data;

	const COLORS = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
	];

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Statistics & Analytics</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Most Popular Skills</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={popularSkillsConfig}>
							<BarChart data={popularSkillsDataData}>
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

				<Card>
					<CardHeader>
						<CardTitle>Proficiency Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={proficiencyConfig}>
							<PieChart>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Pie
									data={proficiencyDataData}
									dataKey="count"
									nameKey="level"
									cx="50%"
									cy="50%"
									outerRadius={80}
									fill="#8884d8"
								>
									{proficiencyDataData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<ChartLegend content={<ChartLegendContent payload={"ayo"} />} />
							</PieChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Skills Acquired Over Time</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={skillsOverTimeConfig}>
						<LineChart data={skillsOverTimeDataData}>
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 7)}
							/>
							<YAxis tickLine={false} axisLine={false} tickMargin={8} />
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<Line
								dataKey="skills"
								type="monotone"
								stroke="var(--color-skills)"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
