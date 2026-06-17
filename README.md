# ⚗️ Trial Command AI

> An AI-native Multi-Agent Clinical Trial Operations Hub — built to demonstrate what the next generation of clinical research tooling looks like.

![Trial Command AI](https://img.shields.io/badge/Status-Live-1D9E75?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet_4.6-534AB7?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-BA7517?style=flat-square)

---

## 🧭 What Is This?

**Trial Command AI** is a multi-agent clinical trial command center that lets research operations teams ask natural language questions about their trials and get simultaneous, streaming AI analysis from three specialized agents — a CRA Agent, a Data Manager Agent, and a Project Manager Agent — who then collaborate to produce unified recommendations.

This project was built as a portfolio demonstration of **AI-native frontend engineering** — specifically:
- Parallel streaming AI agent orchestration
- Complex async React state management
- Real-time token-by-token UI rendering
- Domain-specific AI persona engineering (clinical trials)

---

## 🎯 The Problem It Solves

Clinical trial operations involve three distinct expert roles that rarely have a unified view:

| Role | Pain Point |
|------|-----------|
| CRA (Clinical Research Associate) | Protocol deviations detected too late, manual site monitoring |
| Data Manager | Data quality issues found after lock, manual eCRF validation |
| Project Manager | Timeline slippage not visible until milestone is missed |

**Trial Command AI** unifies all three into a single conversational interface — type a question, get three expert perspectives streaming in parallel, then a synthesized action plan.

---

## ✨ Features

### 🤖 Multi-Agent Architecture
Three AI agents run **simultaneously in parallel**, each with a distinct clinical domain persona and system prompt:

- **CRA Agent** — detects protocol deviations, ICF version issues, visit window breaches
- **Data Manager Agent** — flags missing eCRF values, lab anomalies, data lock risks
- **Project Manager Agent** — tracks enrollment rates, milestone risks, timeline slippage

### 🔄 Real-Time Streaming
Every agent streams token-by-token — no waiting for a full response. You watch the AI think in real time, exactly like ChatGPT but across three parallel panels.

### 🧠 Synthesis Layer
Once all three agents complete, a fourth **Synthesis Agent** reads all findings and generates a unified, prioritized action plan combining insights from all three domains.

### 💬 Natural Language Command Bar
Type anything:
- *"Which sites are behind schedule?"*
- *"Show protocol deviations this week"*
- *"Predict enrollment completion date"*
- *"Compare recruitment by region"*
- *"Flag audit risks across all sites"*

### 🎨 Risk-Coded UI
Every finding is automatically parsed and color-coded:
- 🔴 `CRITICAL` — immediate action required
- 🟡 `WARNING` — monitor closely
- 🔵 `INFO` — for awareness
- 🟢 `OK` — no action needed

---

## 🏗️ Architecture

```
trial-command-ai/
├── src/
│   ├── agents/                    # AI agent personas & system prompts
│   │   ├── craAgent.js            # CRA Agent — protocol & site compliance
│   │   ├── dataManagerAgent.js    # Data Manager — eCRF quality & anomalies
│   │   ├── projectManagerAgent.js # PM Agent — timeline & enrollment
│   │   └── synthesisAgent.js      # Synthesis — unified recommendations
│   │
│   ├── components/                # React UI components
│   │   ├── TopBar.jsx             # App header with trial metadata
│   │   ├── CommandBar.jsx         # Natural language input + suggestions
│   │   ├── AgentPanel.jsx         # Individual agent streaming panel
│   │   └── InsightsPanel.jsx      # Unified synthesis output
│   │
│   ├── hooks/
│   │   └── useAgentStream.js      # Core hook — parallel agent orchestration
│   │
│   ├── utils/
│   │   └── claudeApi.js           # Claude API streaming client (+ mock mode)
│   │
│   ├── App.jsx                    # Root component — layout & wiring
│   └── index.css                  # Global reset & base styles
│
├── .env                           # API key (never committed)
├── .gitignore
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🧩 How the Agent Orchestration Works

```
User types query
       │
       ▼
useAgentStream.runAgents(query)
       │
       ├──► streamClaude({ agentType: 'cra', ... })        ─┐
       ├──► streamClaude({ agentType: 'dataManager', ... }) ─┼─ Run in PARALLEL
       └──► streamClaude({ agentType: 'projectManager', }) ─┘
                                                              │
                                              All 3 complete (checkAllDone)
                                                              │
                                                              ▼
                                         streamClaude({ agentType: 'synthesis' })
                                                              │
                                                              ▼
                                                  InsightsPanel renders
```

Each agent streams independently. React state updates per token via `onToken` callbacks. The synthesis step fires automatically when all three agents reach `status: 'done'`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/jignesh7/trial-command-ai.git
cd trial-command-ai

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your Anthropic API key to .env
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Run in Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Mock Mode (No API Key Required)

The app ships with `MOCK_MODE = true` in `src/utils/claudeApi.js`. In mock mode, agents stream realistic pre-written clinical trial responses — perfect for demos without API costs.

To enable live AI:
```js
// src/utils/claudeApi.js
const MOCK_MODE = false; // ← change this
```

### Build for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Language | JavaScript (JSX) / TypeScript |
| AI Provider | Anthropic Claude Sonnet 4.6 |
| Streaming | Fetch API + ReadableStream |
| Styling | Inline styles (zero dependencies) |
| Deployment | Netlify / GitHub Pages |

---

## 🔐 Security

- API key stored in `.env` — never committed to version control
- `.env` is listed in `.gitignore`
- In production, set `VITE_ANTHROPIC_API_KEY` as an environment variable in your deployment platform (Netlify, Vercel, etc.)

> ⚠️ **Important:** `VITE_` prefixed env variables are exposed to the browser bundle. For production use, route API calls through a backend proxy or serverless function.

---

## 🗺️ Roadmap

- [ ] PDF upload — analyse protocol documents and ICFs directly
- [ ] Real trial data integration via EDC APIs
- [ ] Patient enrollment timeline predictor
- [ ] Site performance comparison charts
- [ ] Export findings as PDF report
- [ ] Multi-trial support
- [ ] Role-based views (Sponsor vs Site vs CRO)

---

## 🧑‍💻 About

Built by **Jignesh** — Senior Frontend Engineer with 16 years of experience specialising in React and Angular, currently exploring AI-native product interfaces.

This project was built as a portfolio demonstration targeting AI-powered clinical trial platforms, specifically to showcase:
- Multi-agent AI orchestration in React
- Streaming UI with complex async state
- Domain-specific AI prompt engineering
- Production-grade component architecture

---

## 📄 License

MIT © Jignesh

---

> *"The best way to show you understand a product's vision is to build what they haven't shipped yet."*