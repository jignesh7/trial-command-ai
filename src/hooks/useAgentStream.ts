import { useState, useCallback } from 'react';
import { streamClaude } from '../utils/claudeApi';
import { CRA_SYSTEM_PROMPT } from '../agents/craAgent';
import { DATA_MANAGER_SYSTEM_PROMPT } from '../agents/dataManagerAgent';
import { PM_SYSTEM_PROMPT } from '../agents/projectManagerAgent';
import { FINANCE_SYSTEM_PROMPT } from '../agents/financeAgent';
import { COORDINATOR_SYSTEM_PROMPT } from '../agents/coordinatorAgent';
import { SYNTHESIS_SYSTEM_PROMPT } from '../agents/synthesisAgent';

export type AgentStatus = 'idle' | 'streaming' | 'done' | 'error';

export interface AgentState {
  text: string;
  status: AgentStatus;
  error: string | null;
}

export interface AgentStreamResult {
  cra: AgentState;
  dataManager: AgentState;
  pm: AgentState;
  finance: AgentState;
  coordinator: AgentState;
  synthesis: AgentState;
  isRunning: boolean;
  runAgents: (query: string) => void;
}

const initialAgentState: AgentState = {
  text: '',
  status: 'idle',
  error: null,
};

export function useAgentStream(): AgentStreamResult {
  const [cra, setCra] = useState<AgentState>(initialAgentState);
  const [dataManager, setDataManager] = useState<AgentState>(initialAgentState);
  const [pm, setPm] = useState<AgentState>(initialAgentState);
  const [finance, setFinance] = useState<AgentState>(initialAgentState);
  const [coordinator, setCoordinator] = useState<AgentState>(initialAgentState);
  const [synthesis, setSynthesis] = useState<AgentState>(initialAgentState);
  const [isRunning, setIsRunning] = useState(false);

  const resetAll = () => {
    setCra(initialAgentState);
    setDataManager(initialAgentState);
    setPm(initialAgentState);
    setFinance(initialAgentState);
    setCoordinator(initialAgentState);
    setSynthesis(initialAgentState);
  };

  const runSynthesis = async (query: string) => {
    setSynthesis((prev) => ({ ...prev, status: 'streaming' }));
    await streamClaude({
      agentType: 'synthesis',
      systemPrompt: SYNTHESIS_SYSTEM_PROMPT,
      userMessage: query,
      onToken: (token) =>
        setSynthesis((prev) => ({ ...prev, text: prev.text + token })),
      onDone: () => {
        setSynthesis((prev) => ({ ...prev, status: 'done' }));
        setIsRunning(false);
      },
      onError: (err) => {
        setSynthesis((prev) => ({ ...prev, status: 'error', error: err }));
        setIsRunning(false);
      },
    });
  };

  const runAgents = useCallback((query: string) => {
    resetAll();
    setIsRunning(true);

    // track all 5 agents
    const completed = {
      cra: false,
      dm: false,
      pm: false,
      finance: false,
      coordinator: false,
    };

    const checkAllDone = () => {
      if (
        completed.cra &&
        completed.dm &&
        completed.pm &&
        completed.finance &&
        completed.coordinator
      ) {
        runSynthesis(query);
      }
    };

    // CRA Agent
    streamClaude({
      agentType: 'cra',
      systemPrompt: CRA_SYSTEM_PROMPT,
      userMessage: query,
      onToken: (token) =>
        setCra((prev) => ({ ...prev, text: prev.text + token, status: 'streaming' })),
      onDone: () => {
        setCra((prev) => ({ ...prev, status: 'done' }));
        completed.cra = true;
        checkAllDone();
      },
      onError: (err) =>
        setCra((prev) => ({ ...prev, status: 'error', error: err })),
    });

    // Data Manager Agent
    streamClaude({
      agentType: 'dataManager',
      systemPrompt: DATA_MANAGER_SYSTEM_PROMPT,
      userMessage: query,
      onToken: (token) =>
        setDataManager((prev) => ({ ...prev, text: prev.text + token, status: 'streaming' })),
      onDone: () => {
        setDataManager((prev) => ({ ...prev, status: 'done' }));
        completed.dm = true;
        checkAllDone();
      },
      onError: (err) =>
        setDataManager((prev) => ({ ...prev, status: 'error', error: err })),
    });

    // Project Manager Agent
    streamClaude({
      agentType: 'projectManager',
      systemPrompt: PM_SYSTEM_PROMPT,
      userMessage: query,
      onToken: (token) =>
        setPm((prev) => ({ ...prev, text: prev.text + token, status: 'streaming' })),
      onDone: () => {
        setPm((prev) => ({ ...prev, status: 'done' }));
        completed.pm = true;
        checkAllDone();
      },
      onError: (err) =>
        setPm((prev) => ({ ...prev, status: 'error', error: err })),
    });

    // Finance Agent
    streamClaude({
      agentType: 'finance',
      systemPrompt: FINANCE_SYSTEM_PROMPT,
      userMessage: query,
      onToken: (token) =>
        setFinance((prev) => ({ ...prev, text: prev.text + token, status: 'streaming' })),
      onDone: () => {
        setFinance((prev) => ({ ...prev, status: 'done' }));
        completed.finance = true;
        checkAllDone();
      },
      onError: (err) =>
        setFinance((prev) => ({ ...prev, status: 'error', error: err })),
    });

    // Coordinator Agent
    streamClaude({
      agentType: 'coordinator',
      systemPrompt: COORDINATOR_SYSTEM_PROMPT,
      userMessage: query,
      onToken: (token) =>
        setCoordinator((prev) => ({ ...prev, text: prev.text + token, status: 'streaming' })),
      onDone: () => {
        setCoordinator((prev) => ({ ...prev, status: 'done' }));
        completed.coordinator = true;
        checkAllDone();
      },
      onError: (err) =>
        setCoordinator((prev) => ({ ...prev, status: 'error', error: err })),
    });

  }, []);

  return { cra, dataManager, pm, finance, coordinator, synthesis, isRunning, runAgents };
}