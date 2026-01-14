type Skill = {
	label: string;
	value: number; // 0–100
};

type SkillRadarProps = {
	skills: Skill[];
	size?: number;
};

export default function SkillRadar({ skills, size = 300 }: SkillRadarProps) {
	const center = size / 2;
	const radius = size * 0.35;
	const levels = 5;

	const angleStep = (2 * Math.PI) / skills.length;

	const point = (value: number, i: number) => {
		const angle = i * angleStep - Math.PI / 2;
		const r = (value / 100) * radius;
		return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
	};

	const polygonPoints = skills
		.map((s, i) => point(s.value, i).join(","))
		.join(" ");

	return (
		<div style={{ width: size }}>
			<svg width={size} height={size}>
				{/* Grid */}
				{[...Array(levels)].map((_, level) => {
					const r = ((level + 1) / levels) * radius;
					const gridPoints = skills
						.map((_, i) => {
							const angle = i * angleStep - Math.PI / 2;
							return [
								center + r * Math.cos(angle),
								center + r * Math.sin(angle),
							].join(",");
						})
						.join(" ");

					return (
						<polygon
							key={level}
							points={gridPoints}
							fill="none"
							stroke="#E5E7EB"
						/>
					);
				})}

				{/* Axes */}
				{skills.map((_, i) => {
					const angle = i * angleStep - Math.PI / 2;
					return (
						<line
							key={i}
							x1={center}
							y1={center}
							x2={center + radius * Math.cos(angle)}
							y2={center + radius * Math.sin(angle)}
							stroke="#E5E7EB"
						/>
					);
				})}

				{/* Skill polygon */}
				<polygon
					points={polygonPoints}
					fill="rgba(20,184,166,0.2)"
					stroke="#14B8A6"
					strokeWidth={2}
				/>

				{/* Labels */}
				{skills.map((skill, i) => {
					const angle = i * angleStep - Math.PI / 2;
					const labelRadius = radius + 18;
					return (
						<text
							key={skill.label}
							x={center + labelRadius * Math.cos(angle)}
							y={center + labelRadius * Math.sin(angle)}
							textAnchor="middle"
							dominantBaseline="middle"
							fontSize={12}
							fill="#374151"
						>
							{skill.label}
						</text>
					);
				})}
			</svg>
		</div>
	);
}

export { SkillRadar };
