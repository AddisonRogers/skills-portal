"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { type getProficiencyDistributionStatsReturnType } from "@/app/admin/stats/serverFunctions";

const COLORS = [
	"hsl(var(--chart-1))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))",
];

export default function ProficiencyDistributionChart(
	params: getProficiencyDistributionStatsReturnType,
) {
	const { data: proficiencyData, config: proficiencyConfig } = params;

	return (
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
							data={proficiencyData}
							dataKey="count"
							nameKey="level"
							cx="50%"
							cy="50%"
							outerRadius={80}
							fill="#8884d8"
						>
							{proficiencyData.map((entry, index) => (
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
	);
}
