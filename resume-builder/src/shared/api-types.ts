import type { BulletPoint } from "./types"

export type BulletPointsResult = {
  exists: boolean;
  bulletPoints: (BulletPoint & { keyword: string })[];
};
