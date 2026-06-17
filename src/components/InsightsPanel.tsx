import type { AgentState } from '../hooks/useAgentStream';

type RiskLevel = 'CRITICAL' | 'WARNING' | 'INFO' | 'OK';

interface RiskStyle {
  className: string;
  borderClass: string;
  icon: string;
}

const RISK_STYLES: Record<RiskLevel, RiskStyle> = {
  CRITICAL: { className: 'bg-red-50 text-red-900',         borderClass: 'border-l-red-500',     icon: '⚠' },
  WARNING:  { className: 'bg-amber-50 text-amber-900',     borderClass: 'border-l-amber-500',   icon: '◔' },
  INFO:     { className: 'bg-blue-50 text-blue-900',       borderClass: 'border-l-blue-500',    icon: 'ℹ' },
  OK:       { className: 'bg-emerald-50 text-emerald-900', borderClass: 'border-l-emerald-500', icon: '✓' },
};

interface ParsedItem {
  level: RiskLevel;
  text: string;
}

function parseLine(line: string): ParsedItem | null {
  const match = line.match(/^\[(CRITICAL|WARNING|OK|INFO)\]\s(.+)$/);
  if (match) return { level: match[1] as RiskLevel, text: match[2] };
  return null;
}

interface InsightsPanelProps {
  synthesis: AgentState;
}

export default function InsightsPanel({ synthesis }: InsightsPanelProps) {
  const { text, status } = synthesis;
  const lines = text.split('\n').filter(Boolean);
  const summary = lines[0];
  const items = lines
    .slice(1)
    .map(parseLine)
    .filter((i): i is ParsedItem => i !== null);

  return (
    <div className="px-4 py-4 border-t border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          ✦ Unified insights
        </span>
        {status === 'streaming' && (
          <span className="text-xs text-indigo-500 animate-pulse">
            agents collaborating…
          </span>
        )}
        {status === 'done' && (
          <span className="text-xs text-emerald-600">complete</span>
        )}
      </div>

      {/* Empty state */}
      {status === 'idle' && (
        <p className="text-xs text-gray-300">
          Run agents above to generate unified recommendations.
        </p>
      )}

      {/* Summary */}
      {summary && (
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">{summary}</p>
      )}

      {/* Action items */}
      <div className="flex flex-col gap-2">
        {items.map((item, i) => {
          const s = RISK_STYLES[item.level];
          return (
            <div
              key={i}
              className={`text-sm px-3 py-2 rounded-md border-l-4 flex gap-2 leading-relaxed ${s.className} ${s.borderClass}`}
            >
              <span className="flex-shrink-0">{s.icon}</span>
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}