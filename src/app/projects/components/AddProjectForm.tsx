"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { upsertUserProjectWithSkills } from "../serverFunctions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProjectDto } from "@/types/projects/ProjectDto";
import { JobRoleDto } from "@/types/jobRoles/JobRoleDto";
import { SkillDto } from "@/types/skills/SkillDto";
import SkillsMultiSelect from "./SkillsMultiSelect";
import { ProjectRoleDto } from "@/types/projectRoles.ts/ProjectRoleDto";

type FormValues = {
	projectId: number | null;
	roleId: number | null;
	skillIds: number[];
};

type AddProjectFormProps = {
	projects: ProjectDto[];
	projectRoles: ProjectRoleDto[];
	skills: SkillDto[];
	onSuccess?: () => void;
};

export default function AddProjectForm({
	projects,
	projectRoles,
	skills,
	onSuccess,
}: AddProjectFormProps) {
	const router = useRouter();
	const [isPending, setTransition] = useTransition();
	const [sumbitError, setSubmitError] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			projectId: null,
			roleId: null,
			skillIds: [],
		},
	});

	const onSubmit = (values: FormValues) => {
		setSubmitError(null);

		if (values.projectId == null) {
			form.setError("projectId", {
				type: "required",
				message: "Please select a project",
			});
			return;
		}

		startTransition(async () => {
			try {
				await upsertUserProjectWithSkills(
					values.projectId!,
					values.roleId!,
					values.skillIds,
				);

				form.reset({ projectId: null, roleId: null, skillIds: [] });
				router.refresh();
				onSuccess?.();
			} catch (error) {
				setSubmitError(
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
				);
			}
		});
	};

	return (
		<Card className="m-2">
			<CardHeader>
				<CardTitle>Add Project</CardTitle>
				<CardDescription>Add a new project to your profile.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							name="projectId"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project</FormLabel>
									<FormControl>
										<Select
											value={field.value ? field.value.toString() : ""}
											onValueChange={(v) => field.onChange(Number(v))}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select a project" />
											</SelectTrigger>
											<SelectContent>
												{projects.map((project) => (
													<SelectItem
														key={project.id}
														value={project.id.toString()}
													>
														{project.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										Select the project you want to add.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="roleId"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<Select
											value={field.value ? field.value.toString() : ""}
											onValueChange={(v) => field.onChange(Number(v))}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select your role" />
											</SelectTrigger>
											<SelectContent>
												{projectRoles.map((role) => (
													<SelectItem
														key={role.id}
														value={role.id?.toString() ?? ""}
													>
														{role.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										Select your role on this project.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="skillIds"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Skills</FormLabel>
									<FormControl>
										<SkillsMultiSelect
											skills={skills}
											selected={field.value ?? []}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormDescription>
										Select the skills you evidenced on this project.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="ghost"
								onClick={() => onSuccess?.()}
								disabled={isPending}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isPending}>
								{isPending ? "Saving..." : "Save"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
