import TopBar from './components/TopBar';
import CommandBar from './components/CommandBar';
import AgentPanel from './components/AgentPanel';
import InsightsPanel from './components/InsightsPanel';
import WelcomeState from './components/WelcomeState';
import { useAgentStream } from './hooks/useAgentStream';

interface AgentConfig {
  key: 'cra' | 'dataManager' | 'pm' | 'finance' | 'coordinator';
  label: string;
  color: string;
}

const AGENTS: AgentConfig[] = [
  { key: 'cra',         label: 'CRA Agent',       color: '#1D9E75' },
  { key: 'dataManager', label: 'Data Manager',     color: '#534AB7' },
  { key: 'pm',          label: 'Project Manager',  color: '#BA7517' },
  { key: 'finance',     label: 'Finance Agent',    color: '#0C447C' },
  { key: 'coordinator', label: 'Coordinator',      color: '#7F77DD' },
];

export default function App() {
  const {
    cra, dataManager, pm, finance, coordinator,
    synthesis, isRunning, runAgents,
  } = useAgentStream();

  const agentData = { cra, dataManager, pm, finance, coordinator };

  const hasStarted =
    cra.status !== 'idle' ||
    dataManager.status !== 'idle' ||
    pm.status !== 'idle' ||
    finance.status !== 'idle' ||
    coordinator.status !== 'idle';

  return (
    <div className="min-h-screen bg-stone-100 flex items-start justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-screen-xl bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">

        <TopBar />

        <CommandBar
          onRun={runAgents}
          onQuerySelect={runAgents}
          isRunning={isRunning}
        />

        {!hasStarted ? (
          <WelcomeState onQuerySelect={runAgents} />
        ) : (
          <>
            {/* 5 agent panels — one row */}
            <div className="grid grid-cols-5 divide-x divide-gray-200 border-b border-gray-200">
              {AGENTS.map((agent) => (
                <AgentPanel
                  key={agent.key}
                  label={agent.label}
                  color={agent.color}
                  status={agentData[agent.key].status}
                  text={agentData[agent.key].text}
                  error={agentData[agent.key].error}
                />
              ))}
            </div>

            <InsightsPanel synthesis={synthesis} />
          </>
        )}

      </div>
    </div>
  );
}