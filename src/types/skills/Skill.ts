export type Skill = {
	id: number;
	name: string;
	machineName: string | null;
	bigSkill: boolean;
	xpAmount: number;
	description: string | null;
	blobUrl: string | null;
	madeBy: string | null;
	createdAt: Date;
	updatedAt: Date;
};
