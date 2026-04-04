export type BulletPoint = {
	id: number;
	projectId: number;
	content: string;
	category: Category;
	skillType: SkillType;
	keywords: Keyword[];
}

export type Keyword = {
	id: number;
	name: string;
	category: Category;
	skillType: SkillType;
	importance: number;
	bulletPoints: BulletPoint[];
}


export type Project = {
	id: number;
	name: string;
	type: ProjectType;
	bulletPoints: BulletPoint[];
}

export const ProjectType = {
	JOB: 0,
	PROJECT: 1,
}

export const Category = {
	FRONTEND: 0,
	BACKEND: 1,
	DEVOPS: 2,
	DATA: 3,
	ML: 4,
	MANAGEMENT: 5,
	DESIGN: 6,
	TESTING: 7,
	OTHER: 8,
}

export const SkillType = {
	HARD: 0,
	SOFT: 1,
}
