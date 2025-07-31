"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Line, LineChart, XAxis, YAxis} from "recharts";
import {
  getSkillsOverTimeStatsReturnType,
  getSkillsOverTimeStatsReturnTypePromised
} from "@/app/admin/stats/serverFunctions";
import {use} from "react";

export default async function SkillsOverTimeChart(params: getSkillsOverTimeStatsReturnTypePromised) {
  const { data: skillsOverTimeData, config: skillsOverTimeConfig } = use<getSkillsOverTimeStatsReturnType>(params);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Acquired Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={skillsOverTimeConfig}>
          <LineChart data={skillsOverTimeData}>
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
  )
}