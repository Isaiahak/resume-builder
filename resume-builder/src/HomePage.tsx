import { useState } from "react";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  url: string;
}


export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!query.trim()) return;
	const result = await getBulletPointsForKeyword(query)
	if !result.exists {
		// have the option to create a prompt for the keyword
	} else {
		if len(result.bullPoints) == 0 {
			// have option to create prompt for bulletpoints
			// for each project containing keyword		
		} else {
			// display the bulletpoints by project which contain keyword
		}
	}
  };

  const handleClear = (): void => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-20 font-mono">

      {/* ── Hero + Search ── */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white text-center mb-3">
		Resume Builder
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full">
          <div
            className={`relative flex items-center border rounded-sm bg-white/[0.02] transition-all duration-300 ${
              focused
                ? "border-white/50 shadow-[0_0_24px_rgba(255,255,255,0.04)]"
                : "border-white/15"
            }`}
          >
            {/* Search Icon */}
            <svg
              className={`absolute left-4 w-4 h-4 transition-opacity duration-300 ${focused ? "opacity-60" : "opacity-25"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter ATS keyword."
              className="w-full bg-transparent outline-none border-none text-white placeholder-white/25 text-sm py-4 pl-12 pr-12 font-mono tracking-wide"
            />

            {/* Clear */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-10 text-white/30 hover:text-white/70 text-xl leading-none bg-transparent border-none cursor-pointer transition-colors duration-200"
              >
                ×
              </button>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={`absolute right-4 bg-transparent border-none transition-opacity duration-200 ${
                query.trim() ? "opacity-100 cursor-pointer" : "opacity-20 cursor-default"
              }`}
            >
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* ── Results Section ── */}
      {hasSearched && (
        <div className="w-full max-w-2xl mt-12">
          <p className="text-white/25 text-xs tracking-widest uppercase mb-6">
            Results for &quot;{query}&quot;
          </p>

          {results.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-10">
              No results found.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {results.map((result) => (
                <li
                  key={result.id}
                  className="border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] rounded-sm px-5 py-4 transition-all duration-200 cursor-pointer group"
                >
                  <a href={result.url} className="no-underline" target="_blank" rel="noreferrer">
                    <p className="text-white text-sm font-semibold tracking-wide group-hover:text-white/80 transition-colors duration-200">
                      {result.title}
                    </p>
                    <p className="text-white/35 text-xs mt-1 leading-relaxed">
                      {result.description}
                    </p>
                    <p className="text-white/20 text-xs mt-2 tracking-wide">
                      {result.url}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

    </div>
  );
}
