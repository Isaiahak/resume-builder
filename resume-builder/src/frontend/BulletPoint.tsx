import { useState } from "react";
import type { BulletPoint } from "../shared/types" 
import { ProjectType } from "../shared/types"

interface GroupedBullets {
  projectId: number;
  label: string;
  type: ProjectType;
  items: BulletPoint[];
}

interface BulletPointListProps {
	bullets: BulletPoint[];	
}


function groupBullets(bullets: BulletPoint[]): GroupedBullets[] {
  const map = new Map<number, GroupedBullets>();

  for (const bullet of bullets) {
    if (!map.has(bullet.projectId)) {
      map.set(bullet.projectId, {
        projectId: bullet.projectId,
        label: bullet.job ?? `Project ${bullet.projectId}`,
        type: bullet.projectType ?? ProjectType.JOB,
        items: [],
      });
    }
    map.get(bullet.projectId)!.items.push(bullet);
  }

  // Sort groups by projectId
  return Array.from(map.values()).sort((a, b) => a.projectId - b.projectId);
}

interface BulletItemProps {
  bullet: BulletPoint;
}

function BulletItem({ bullet }: BulletItemProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(bullet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      title="Click to copy"
      className="w-full text-left flex items-start gap-3 border border-white/[0.06] hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.04] rounded-sm px-4 py-3 transition-all duration-200 cursor-pointer group"
    >
      <span className="text-white/20 mt-0.5 text-xs select-none shrink-0">▸</span>

      <p className={`flex-1 text-xs leading-relaxed tracking-wide transition-colors duration-200 ${
        copied ? "text-white/35 italic" : "text-white/70"
      }`}>
        {copied ? "Copied to clipboard!" : bullet.content}
      </p>

      <span className="shrink-0 text-white/15 group-hover:text-white/35 text-xs tracking-widest uppercase transition-colors duration-200 mt-0.5 select-none">
        copy
      </span>
    </button>
  );
}

export default function BulletPointList({ bullets }: BulletPointListProps) {
  const groups = groupBullets(bullets);

  if (bullets.length === 0) {
    return (
      <div className="w-full border border-white/[0.08] bg-white/[0.02] rounded-sm p-6">
        <p className="text-white/20 text-xs tracking-wide text-center py-4">
          No bullet points to display.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full border border-white/[0.08] bg-white/[0.02] rounded-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-sm font-semibold tracking-widest uppercase">
            Bullet Points
          </h2>
          <p className="text-white/25 text-xs tracking-wide mt-0.5">
            Click any item to copy
          </p>
        </div>
        <span className="border border-white/10 text-white/30 text-xs tracking-widest uppercase px-3 py-1 rounded-full">
          {bullets.length} total
        </span>
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.projectId}>
            {/* Group header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/20 text-xs tracking-widest uppercase">
                {group.type === ProjectType.JOB ? "Job" : "Project"}
              </span>
              <span className="text-white/40 text-xs tracking-wide font-medium">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-white/15 text-xs tracking-widest">
                {group.items.length}
              </span>
            </div>

            {/* Bullet items */}
            <ul className="flex flex-col gap-2">
              {group.items.map((bullet) => (
                <li key={bullet.id}>
                  <BulletItem bullet={bullet} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
