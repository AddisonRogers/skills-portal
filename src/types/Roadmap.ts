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

export type PGSkillDataUser = PGSkillData & {
	acquiredAt: Date | null;
	level: number | null;
}

export type PGSkillData = {
	name: string;
	description: string | null;
	blobUrl: string | null;
}

export type SkillNode = PGSkillDataUser & PositionData

export type PositionData = {
	nodeType: string;
	x: number;
	y: number;
}

export type AZTPositionData = PositionData & {
	PartitionKey: string;
	Rowkey: string; // Skill ID
	Timestamp: string;
};

export type Edge = LinkData & {};

export type LinkData = {
	PartitionKey: string;
	RowKey: string;
	Timestamp: string;
	source: string;
	target: string;
	type: string;
};