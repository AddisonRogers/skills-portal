"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Bar, BarChart, Cell, Pie, PieChart, XAxis, YAxis} from "recharts";
import {getProficiencyDistributionStatsReturnTypePromised} from "@/app/admin/stats/serverFunctions";
import {use} from "react";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

export default async function ProficiencyDistributionChart(params: getProficiencyDistributionStatsReturnTypePromised) {
  const {data: proficiencyData, config: proficiencyConfig} = use(params);

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
              content={<ChartTooltipContent hideLabel/>}
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
            <ChartLegend content={<ChartLegendContent payload={"ayo"}/>}/>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}