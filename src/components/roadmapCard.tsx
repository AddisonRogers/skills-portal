import { Briefcase, Star, User } from "lucide-react";

export default function RoadmapCard({ roadmap }: { roadmap: any }) {
	// Generate random avatar URLs for demo purposes
	const generateAvatarUrl = (index: number) => {
		return `https://i.pravatar.cc/40?img=${index}`;
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
			<div className="flex justify-between items-start mb-2">
				<h3 className="text-lg font-semibold">{roadmap.title}</h3>
				<div className="flex space-x-2">
					{roadmap.suggestedBy === "manager" && (
						<Briefcase
							size={18}
							className="text-fsp-core-teal"
							title="Suggested by manager"
						/>
					)}
					{roadmap.suggestedBy === "role" && (
						<User
							size={18}
							className="text-fsp-core-teal"
							title="Suggested by role"
						/>
					)}
					{roadmap.isFavorite && (
						<Star
							size={18}
							className="text-yellow-400 fill-yellow-400"
							title="Favorited"
						/>
					)}
				</div>
			</div>
			<div className="mb-2">
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
					{roadmap.capability}
				</span>
			</div>
			<p className="text-gray-600 mb-4">{roadmap.description}</p>
			{roadmap.usersLearning && roadmap.usersLearning > 0 && (
				<div className="flex items-center">
					<div className="flex -space-x-2 mr-2">
						{[...Array(Math.min(3, roadmap.usersLearning))].map((_, i) => (
							<img
								key={i}
								className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
								src={generateAvatarUrl(i + 1)}
								alt={`User ${i + 1}`}
							/>
						))}
					</div>
					<span className="text-sm text-gray-500">
						{roadmap.usersLearning}{" "}
						{roadmap.usersLearning === 1 ? "person" : "people"} learning
					</span>
				</div>
			)}
		</div>
	);
}
