export type Roadmap = {
	id: string;
	title: string;
	description: string;
	capability: string;
	suggestedBy?: "manager" | "role" | null;
	isFavorite?: boolean;
	usersLearning?: number;
};

// TODO change usersLearning

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
