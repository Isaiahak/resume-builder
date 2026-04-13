export const SkillType = {
	HARD: 'HARD',
	SOFT: 'SOFT'
};

export const Category = {
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
  DEVOPS: 'DEVOPS',
  DATA: 'DATA',
  ML: 'ML',
  MANAGEMENT: 'MANAGEMENT',
  DESIGN: 'DESIGN',
  TESTING: 'TESTING',
  OTHER: 'OTHER'

};

export const ProjectType = {
  JOB: 'JOB',
  PROJECT: 'PROJECT'
};

export type {
  BulletPoint,
  Keyword,
  Project,
} from "../generated/prisma";


export type {
	BulletPointsResult,
	AddAtsResult,
	AddBulletpointResult,
} from "./api-types"


