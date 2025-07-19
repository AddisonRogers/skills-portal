export default function ContinueLearningSection({
	currentRoadmap,
}: {
	currentRoadmap: any;
}) {
	const generateAvatarUrl = (index: number) => {
		return `https://i.pravatar.cc/40?img=${index}`;
	};

	return (
		<section className="mb-12">
			<h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
			<div className="bg-white rounded-lg shadow-md p-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between">
					<div className="mb-4 md:mb-0">
						<h3 className="text-xl font-bold mb-2">{currentRoadmap.title}</h3>
						<div className="mb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
								{currentRoadmap.capability}
							</span>
						</div>
						<p className="text-gray-600">{currentRoadmap.description}</p>
					</div>
					<div className="flex items-center">
						<div className="flex -space-x-2 mr-2">
							{[...Array(Math.min(3, currentRoadmap.usersLearning || 0))].map(
								(_, i) => (
									<img
										key={i}
										className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
										src={generateAvatarUrl(i + 1)}
										alt={`User ${i + 1}`}
									/>
								),
							)}
						</div>
						<span className="text-sm text-gray-500">
							{currentRoadmap.usersLearning}{" "}
							{currentRoadmap.usersLearning === 1 ? "person" : "people"}{" "}
							learning
						</span>
					</div>
				</div>
				<div className="mt-4">
					<button
						type={"button"}
						className="bg-fsp-core-teal text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
					>
						Continue
					</button>
				</div>
			</div>
		</section>
	);
}
