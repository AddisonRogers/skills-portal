export default function SkillRow(props: { skill: unknown }) {
	return (
		<div className="border rounded-lg p-4 hover:bg-accent transition-colors">
			<h3 className="font-semibold">{props.skill.name}</h3>
			{props.skill.description && (
				<p className="text-sm text-muted-foreground line-clamp-1">
					{props.skill.description}
				</p>
			)}
		</div>
	);
}
