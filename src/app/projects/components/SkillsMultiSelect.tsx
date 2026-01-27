import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkillDto } from "@/types/skills/SkillDto";
import { Check, X } from "lucide-react";

export default function SkillsMultiSelect({
	skills,
	selected,
	onChange,
}: {
	skills: SkillDto[];
	selected: number[];
	onChange: (next: number[]) => void;
}) {
	const toggle = (id: number) => {
		const next = selected.includes(id)
			? selected.filter((x) => x !== id)
			: [...selected, id];
		onChange(next);
	};

	const remove = (id: number) => onChange(selected.filter((x) => x !== id));

	return (
		<div className="space-y-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						type="button"
						className="w-full justify-between"
					>
						{selected.length ? `${selected.length} selected` : "Select skills"}
					</Button>
				</PopoverTrigger>

				<PopoverContent
					className="w-[--radix-popover-trigger-width] p-0"
					align="start"
				>
					<Command>
						<CommandInput placeholder="Search skills..." />
						<CommandList className="max-h-60">
							<CommandEmpty>No skills selected.</CommandEmpty>
							<CommandGroup>
								{skills.map((skill) => {
									const isSelected = selected.includes(skill.id);
									return (
										<CommandItem
											key={skill.id}
											value={skill.name}
											onSelect={() => toggle(skill.id)}
											className="flex items-center justify-between"
										>
											<span className="flex items-center gap-2">
												<span
													className={`inline-flex h-4 w-4 items-center justify-center rounded-sm border ${
														isSelected
															? "bg-primary text-primary-foreground"
															: "bg-background"
													}`}
												>
													{isSelected && <Check className="h-3 w-3" />}
												</span>
												{skill.name}
											</span>
											{isSelected && (
												<span className="text-xs opacity-60">Selected</span>
											)}
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{selected.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{selected.map((id) => {
						const skill = skills.find((x) => x.id === id);
						if (!skill) return null;

						return (
							<Badge key={id} variant="secondary" className="relative pr-7">
								{skill.name}
								<button
									type="button"
									onClick={() => remove(id)}
									className="absolute right-1 top-1 rounded-sm p-0.5 opacity-70 hover:opacity-100"
									aria-label={`Remove ${skill.name}`}
								>
									<X className="h-3 w-3" />
								</button>
							</Badge>
						);
					})}
				</div>
			)}
		</div>
	);
}
