"use client";

import { Check, ChevronsUpDown, Search } from "lucide-react";
import RoadmapCard from "@/components/roadmapCard";
import { useState } from "react";
import { Roadmap } from "@/types/Roadmap";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function AllRoadmapsSection({
	allRoadmapsData,
	allCapabilities,
}: {
	allRoadmapsData: Roadmap[];
	allCapabilities: string[];
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [capability, setCapability] = useState("any");
	const [open, setOpen] = useState(false);

	const allRoadmapsFiltered = allRoadmapsData.filter((roadmap) => {
		return (
			(searchTerm === "" ||
				roadmap.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(capability === "any" ||
				roadmap.capability.toLowerCase().includes(capability.toLowerCase()))
		);
	});

	return (
		<section>
			<h2 className="text-xl font-normal mb-4">All Roadmaps</h2>

			{/* Search and Filters */}
			<div className="bg-white rounded-lg shadow-md p-4 mb-6">
				<div className="flex flex-col md:flex-row md:items-center md:space-x-4">
					<div className="relative flex-grow mb-4 md:mb-0">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search size={18} className="text-gray-400" />
						</div>
						<input
							type="text"
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-fsp-core-teal focus:border-fsp-core-teal sm:text-sm"
							placeholder="Search roadmaps..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={open}
								className="w-[200px] justify-between"
							>
								{capability
									? allCapabilities.find(
											(capabilityVal) => capabilityVal === capability,
										)
									: "Select framework..."}
								<ChevronsUpDown className="opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput
									placeholder="Search framework..."
									className="h-9"
								/>
								<CommandList>
									<CommandEmpty>No framework found.</CommandEmpty>
									<CommandGroup>
										{allCapabilities.map((capabilityVal) => (
											<CommandItem
												key={capabilityVal}
												value={capabilityVal}
												onSelect={(currentValue) => {
													setCapability(
														currentValue === capability ? "" : currentValue,
													);
													setOpen(false);
												}}
											>
												{capabilityVal}
												<Check
													className={cn(
														"ml-auto",
														capabilityVal === capability
															? "opacity-100"
															: "opacity-0",
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			{/* Roadmaps Grid */}
			{allRoadmapsFiltered.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{allRoadmapsFiltered.map((roadmap) => (
						<RoadmapCard key={roadmap.id} {...roadmap} />
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-gray-500">
						No roadmaps found matching your criteria.
					</p>
				</div>
			)}
		</section>
	);
}
