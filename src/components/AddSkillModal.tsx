"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddSkillModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddSkill: (skillData: {
		name: string;
		description: string;
		type: string;
	}) => void;
}

export function AddSkillModal({
	isOpen,
	onClose,
	onAddSkill,
}: AddSkillModalProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim() || !description.trim() || !type.trim()) {
			return; // Basic validation
		}

		onAddSkill({
			name: name.trim(),
			description: description.trim(),
			type: type.trim(),
		});

		// Reset form
		setName("");
		setDescription("");
		setType("");
		onClose();
	};

	const handleClose = () => {
		// Reset form when closing
		setName("");
		setDescription("");
		setType("");
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Skill</DialogTitle>
					<DialogDescription>
						Create a new skill node by filling in the details below.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="skill-name" className="text-sm font-medium">
							Skill Name
						</label>
						<Input
							id="skill-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g., JavaScript Fundamentals"
							required
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="skill-description" className="text-sm font-medium">
							Description
						</label>
						<textarea
							id="skill-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Describe what this skill covers..."
							className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							required
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="skill-type" className="text-sm font-medium">
							Type
						</label>
						<Input
							id="skill-type"
							value={type}
							onChange={(e) => setType(e.target.value)}
							placeholder="e.g., frontend, backend, database"
							required
						/>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={handleClose}>
							Cancel
						</Button>
						<Button type="submit">Add Skill</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
