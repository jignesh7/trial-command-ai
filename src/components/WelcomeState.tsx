interface QueryCategory {
  category: string;
  textColor: string;
  bgColor: string;
  queries: string[];
}

const EXAMPLE_QUERIES: QueryCategory[] = [
  {
    category: '📋 Site Monitoring',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    queries: [
      'Which sites are behind schedule?',
      'Show protocol deviations this week',
      'Which sites need immediate SDV?',
      'Flag GCP compliance issues across all sites',
    ],
  },
  {
    category: '📊 Data Management',
    textColor: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    queries: [
      'Show data query resolution status',
      'Which eCRF fields have missing values?',
      'Flag lab value anomalies this month',
      'Is data lock on track for Site 5?',
    ],
  },
  {
    category: '📅 Trial Operations',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    queries: [
      'Predict enrollment completion date',
      'Compare recruitment by region',
      'Which milestones are at risk this quarter?',
      'Show budget variance across all sites',
    ],
  },
  {
    category: '💰 Finance & Budget',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    queries: [
      'Show budget variance across all sites',
      'Which sites have overdue payments?',
      'Flag cost overruns this quarter',
      'Show CRO invoice reconciliation status',
    ],
  },
  {
    category: '🧑‍⚕️ Patient Coordination',
    textColor: 'text-violet-700',
    bgColor: 'bg-violet-50',
    queries: [
      'Which patients missed their visit window?',
      'Show screen failure rates by site',
      'Flag consent form issues this week',
      'Which patients need rescheduling?',
    ],
  },
];

interface WelcomeStateProps {
  onQuerySelect: (query: string) => void;
}

export default function WelcomeState({ onQuerySelect }: WelcomeStateProps) {
  return (
    <div className="px-5 py-6 border-b border-gray-200">

      {/* Hero */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">⚗️</div>
        <h2 className="text-base font-semibold text-gray-800 mb-1">
          Ask anything about your trial
        </h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Five AI teammates — CRA, Data Manager, Project Manager, Finance, and
          Coordinator — analyse your trial simultaneously and collaborate on a
          unified action plan.
        </p>
      </div>

      {/* Query categories — 5 columns matching the 5 agents */}
      <div className="grid grid-cols-5 gap-3">
        {EXAMPLE_QUERIES.map((cat) => (
          <div
            key={cat.category}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Category header */}
            <div className={`px-3 py-2 border-b border-gray-200 ${cat.bgColor}`}>
              <span className={`text-xs font-medium ${cat.textColor}`}>
                {cat.category}
              </span>
            </div>

            {/* Query list */}
            <div className="p-2 space-y-0.5">
              {cat.queries.map((q) => (
                <button
                  key={q}
                  onClick={() => onQuerySelect(q)}
                  className="w-full text-left px-2 py-1.5 text-xs text-gray-500 hover:bg-gray-50 rounded-md transition-colors cursor-pointer leading-snug"
                >
                  → {q}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-300 mt-4">
        Click any query above or type your own in the command bar
      </p>
    </div>
  );
}