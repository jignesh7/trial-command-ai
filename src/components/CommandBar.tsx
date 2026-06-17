import { useState } from 'react';

const SUGGESTIONS: string[] = [
  'Which sites are behind schedule?',
  'Show protocol deviations this week',
  'Predict enrollment completion date',
  'Compare recruitment by region',
  'Flag audit risks across all sites',
  'Which patients missed their visit window?',
  'Show data query resolution status',
  'Which sites need immediate SDV?',
];

interface CommandBarProps {
  onRun: (query: string) => void;
  onQuerySelect: (query: string) => void;
  isRunning: boolean;
}

export default function CommandBar({ onRun, onQuerySelect, isRunning }: CommandBarProps) {
  const [query, setQuery] = useState<string>(
    'Show high-risk sites and detect protocol deviations this week'
  );

  const handleRun = () => {
    if (!query.trim() || isRunning) return;
    onRun(query.trim());
  };

  return (
    <div>
      {/* Input row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
        <span className="text-indigo-600 text-base">✦</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRun()}
          placeholder="Ask anything about your trial..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        />
        <button
          onClick={handleRun}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
            ${isRunning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
            }`}
        >
          {isRunning ? 'Running...' : '▶ Run agents'}
        </button>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 px-4 py-2 border-b border-gray-200">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setQuery(s); onQuerySelect(s); }}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}