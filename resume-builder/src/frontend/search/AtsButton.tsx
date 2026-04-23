import { useState } from "react";
import { buildATSPrompt } from "@shared/prompts/prompts";


interface ATSButtonProps {
  query: string;
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
