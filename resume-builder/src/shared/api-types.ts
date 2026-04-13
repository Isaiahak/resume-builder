import type { BulletPoint } from "./types";
import { Category, ProjectType, SkillType } from "./types";

export type BulletPointsResult = {
  exists: boolean;
  bulletPoints: (BulletPoint & { keyword: string })[];
};

export type AddAtsResult = {
	exists: boolean;
	added: boolean;
};

export type AddBulletpointResult = {
	exists: boolean;
	added: boolean;
}

export type BulletPointPrompt = {
	content: string;
	projectType: ProjectType;
	category: Category;
	skillType: SkillType;
	keywords: string[];
}

export type AddProjectResult = {
	exists: boolean;
	added: boolean;
}
