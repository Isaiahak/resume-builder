import type { BulletPoint } from "./types";
import { Category, ProjectType, SkillType } from "./types";

export type BulletPointsResult = {
  exists: boolean;
  bulletPoints: (BulletPoint & { keyword: string })[];
};

export type AtsResult = {
	exists: boolean;
	added: boolean;
};

export type BulletpointResult = {
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

export type ProjectResult = {
	exists: boolean;
	added: boolean;
}
