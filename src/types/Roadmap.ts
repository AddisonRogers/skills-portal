export type PGRoadmapData = {
	id: string;
	name: string;
	description: string | null;
	relatedRoadmaps: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Roadmap = {
	id: string;
	title: string;
	description: string;
	capability: string;
	suggestedBy?: "manager" | "role" | null;
	isFavorite?: boolean;
	usersLearning?: UsersLearning;
};

export type UsersLearning = {
	usersLearning: number;
	users: UserLearning[];
};

export type UserLearning = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	isFavourite: boolean;
};
