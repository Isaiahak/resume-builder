import { useState } from "react";

interface ATSButtonProps {
  query: string;
}

function buildATSPrompt(query: string): string {
  return `
After doing research on the 2026 software developer market, I need you to create json representation of this model for the keyword: ${query}. Normalize the name to a standard industry format (Title Case, expand common abbreviations like JS → JavaScript, keep widely accepted acronyms like HTML unchanged)
model Keyword {
  id         Int      @id @default(autoincrement())
  name       String @unique
  category   Category 
  skillType  String   
  importance Rating 
  bulletLinks BulletKeyword[]
} 

where, the Category is defined as, Choose the primary/most representative category in job postings.
enum Category {
  FRONTEND
  BACKEND
  DEVOPS
  DATA
  ML
  MANAGEMENT
  DESIGN
  TESTING
  OTHER
} 

and skill type is defined as, Use HARD for technical skills and SOFT for interpersonal/organizational skills.

enum SkillType {
  HARD
  SOFT
}

and Rating defined as. where Importance should reflect demand in the 2026 job market on a scale of ZERO–TEN, where TEN = essential/core skill across most roles.

enum Rating {
	ZERO
	ONE
	TWO
	THREE
	FOUR
	FIVE
	SIX
	SEVEN
	EIGHT
	NINE
	TEN
}

return only valid JSON. No explanations.
  `;
}

export default function ATSButton({ query }: ATSButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    const prompt = buildATSPrompt(query);
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!query.trim()}
      className={`w-full flex items-center justify-between border rounded-sm px-5 py-4 transition-all duration-200 cursor-pointer group
        ${copied
          ? "border-white/30 bg-white/[0.06] text-white/60"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] text-white/50 hover:text-white/80"
        }
        disabled:opacity-20 disabled:cursor-default`}
    >
      <div className="flex items-center gap-3">
        <div className="text-left">
          <p className="text-white text-xs font-semibold tracking-widest uppercase">
            ATS Prompt
          </p>
        </div>
      </div>

      <span className={`text-xs tracking-widest uppercase transition-colors duration-200 shrink-0 ${
        copied ? "text-white/50" : "text-white/15 group-hover:text-white/40"
      }`}>
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}
