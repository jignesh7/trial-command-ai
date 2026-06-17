import type { AgentStatus } from '../hooks/useAgentStream';

type RiskLevel = 'CRITICAL' | 'WARNING' | 'OK' | 'INFO';

interface RiskStyle {
  className: string;
  icon: string;
}

const RISK_STYLES: Record<RiskLevel, RiskStyle> = {
  CRITICAL: { className: 'bg-red-50 text-red-900',    icon: '⚠' },
  WARNING:  { className: 'bg-amber-50 text-amber-900', icon: '◔' },
  OK:       { className: 'bg-emerald-50 text-emerald-900', icon: '✓' },
  INFO:     { className: 'bg-blue-50 text-blue-900',   icon: 'ℹ' },
};

interface Finding {
  level: RiskLevel;
  text: string;
}

function parseFindingLine(line: string): Finding | null {
  const match = line.match(/^\[(CRITICAL|WARNING|OK|INFO)\]\s(.+)$/);
  if (match) return { level: match[1] as RiskLevel, text: match[2] };
  return null;
}

function AgentOutput({ text }: { text: string }) {
  const lines = text.split('\n').filter(Boolean);
  const summary = lines[0];
  const findings = lines
    .slice(1)
    .map(parseFindingLine)
    .filter((f): f is Finding => f !== null);

  return (
    <div className="space-y-1.5">
      {summary && (
        <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-md px-2.5 py-2 mb-2">
          {summary}
        </p>
      )}
      {findings.map((f, i) => {
        const style = RISK_STYLES[f.level];
        return (
          <div
            key={i}
            className={`text-xs px-2 py-1.5 rounded-md flex gap-1.5 leading-snug ${style.className}`}
          >
            <span className="flex-shrink-0">{style.icon}</span>
            <span>{f.text}</span>
          </div>
        );
      })}
    </div>
  );
}

interface StatusBadgeProps {
  status: AgentStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<AgentStatus, { label: string; className: string }> = {
    idle:      { label: 'Waiting',    className: 'text-gray-400' },
    streaming: { label: 'Analysing…', className: 'text-indigo-500 animate-pulse' },
    done:      { label: '✓ Done',     className: 'text-emerald-600' },
    error:     { label: '✗ Error',    className: 'text-red-500' },
  };
  const s = map[status];
  return (
    <span className={`text-xs ml-auto font-medium ${s.className}`}>
      {s.label}
    </span>
  );
}

interface AgentPanelProps {
  label: string;
  color: string;
  status: AgentStatus;
  text: string;
  error: string | null;
}

export default function AgentPanel({
  label, color, status, text, error,
}: AgentPanelProps) {
  return (
    <div className="p-3 min-h-48">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs font-medium text-gray-700">{label}</span>
        <StatusBadge status={status} />
      </div>

      {/* Content */}
      {status === 'idle' && (
        <p className="text-xs text-gray-300">Waiting for query…</p>
      )}
      {status === 'streaming' && !text && (
        <p className="text-xs text-gray-400">Thinking…</p>
      )}
      {text && <AgentOutput text={text} />}
      {error && (
        <p className="text-xs text-red-400">Error: {error}</p>
      )}
    </div>
  );
}