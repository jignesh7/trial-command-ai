const MOCK_MODE = true;

type AgentType = 'cra' | 'dataManager' | 'projectManager' | 'finance' | 'coordinator' | 'synthesis';

interface MockResponseMap {
  [key: string]: string;
}

// ─── CRA Agent Responses ───────────────────────────────────────────
const CRA_RESPONSES: MockResponseMap = {
  deviation: `Scanned all 14 sites for protocol deviations this week across 3 regions.
[CRITICAL] Site 3 — ICF v2.1 still in use, v2.3 mandatory since March 2025, 4 patients affected
[CRITICAL] Site 9 — Unblinded staff member attended a blinded assessment, protocol breach logged
[WARNING] Site 7 — 6 patients missed Day 28 visit window by 5–9 days, SDV required immediately
[OK] Site 11 — Minor transcription query on lab result, no regulatory impact identified`,

  schedule: `Reviewed site progress against master study timeline across all active regions.
[CRITICAL] Site 3 — Enrollment paused for protocol deviation review, 3 weeks behind SRA timeline
[CRITICAL] Site 12 — Site activation delayed due to IRB re-submission, 6 weeks behind plan
[WARNING] Sites 7 and 9 — Recruitment 22% below monthly target, at risk of missing Q3 milestone
[OK] Sites 1, 2, 5 — On track and above enrollment target, no monitoring action required`,

  audit: `Completed audit readiness assessment across all 14 active investigator sites.
[CRITICAL] Site 6 — Investigator delegation log not updated since February 2025, audit blocker
[CRITICAL] Site 8 — 2 SAE reports submitted beyond 24-hour regulatory window
[WARNING] Site 4 — 3 regulatory binders missing signed protocol amendment v2.3
[OK] Sites 1, 2, 3, 5 — Audit ready, all TMF documents current and signed`,

  sdv: `Assessed source data verification status across all sites for this monitoring cycle.
[CRITICAL] Site 3 — SDV backlog of 47 eCRF pages, last remote visit was 6 weeks ago
[CRITICAL] Site 7 — Primary endpoint data unverified for 8 patients, database lock at risk
[WARNING] Site 10 — SDV completion at 61%, below 80% threshold required before interim analysis
[OK] Sites 1, 2, 4, 5 — SDV above 90%, cleared for data lock preparation`,

  enrollment: `Reviewed patient recruitment velocity and screen failure rates across all active sites.
[CRITICAL] Site 3 — Enrollment paused, 23 patients pipeline frozen pending deviation review
[CRITICAL] Site 12 — Zero patients enrolled since activation delay, 8 weeks behind screen plan
[WARNING] Sites 7 and 9 — Screen failure rate at 58%, above 30% protocol threshold
[OK] Sites 1, 2, 5 — Enrollment above target, no monitoring intervention required`,

  default: `Analysed 14 sites across 3 regions and detected critical deviations at Sites 3, 7, and 11.
[CRITICAL] Site 3 — 4 consent form deviations detected, ICF v2.1 used but v2.3 required since March 2025
[WARNING] Site 7 — Visit window missed for 6 patients, Days 14 and 28 assessments overdue by 5–9 days
[OK] Site 11 — Minor query on lab result transcription, no regulatory impact identified`,
};

// ─── Data Manager Agent Responses ─────────────────────────────────
const DATA_MANAGER_RESPONSES: MockResponseMap = {
  deviation: `Validated eCRF entries linked to protocol deviation flags across all affected sites.
[CRITICAL] Site 3 — 8 eCRF entries use superseded ICF version, primary consent field invalid
[CRITICAL] Site 9 — Blinding deviation created 3 corrupted randomisation records, quarantined
[WARNING] Site 7 — 6 visit date fields outside allowed window, automatic queries raised in EDC
[OK] Sites 1, 2, 4 — Zero open queries, data quality score 99.1%, on track for lock`,

  schedule: `Reviewed data completeness and query resolution rates against study timeline milestones.
[CRITICAL] Sites 3 and 12 — Combined 34 unresolved critical queries blocking interim analysis
[CRITICAL] Site 9 — Database lock impossible until blinding deviation records are adjudicated
[WARNING] Sites 7 and 11 — Query resolution rate below 70%, risk to Q3 data lock milestone
[OK] Sites 1, 2, 5 — Data lock ready, query resolution at 97%, clean patient narratives confirmed`,

  audit: `Reviewed audit trail integrity and data entry compliance across all eCRF systems.
[CRITICAL] Site 6 — 14 eCRF edits made without reason codes, 21 CFR Part 11 violation flagged
[CRITICAL] Site 8 — SAE data entered 72 hours post-event, audit trail shows backdating attempt
[WARNING] Site 4 — 9 fields edited more than 3 times, monitor review recommended before lock
[OK] Sites 1, 2, 3, 5 — Audit trails clean, all edits timestamped with valid reason codes`,

  missing: `Scanned 1,240 eCRF entries across all sites for missing and incomplete data fields.
[CRITICAL] Sites 3 and 9 — 12 missing primary endpoint values, database lock blocked until resolved
[CRITICAL] Site 12 — Entire Visit 4 dataset absent for 5 patients, site activation gap identified
[WARNING] Site 7 — Haemoglobin outliers for 3 patients, values 40% below normal range, SDV required
[OK] Sites 1, 2, 4, 5, 6 — Data quality score 98.4%, scheduled data lock on track for Friday`,

  enrollment: `Reviewed data readiness for newly enrolled patients and screen failure documentation.
[CRITICAL] Site 3 — 23 patient records frozen mid-visit, incomplete primary endpoint captures
[CRITICAL] Site 12 — No eCRF entries exist for 5 patients enrolled before activation delay
[WARNING] Sites 7 and 9 — Screen failure forms incomplete for 31 patients, protocol requires full documentation
[OK] Sites 1, 2, 5 — All enrolled patient records complete, endpoint capture at 100%`,

  default: `Completed validation across 1,240 eCRF entries with critical missing data found at two sites.
[CRITICAL] Sites 3 and 9 — 12 missing primary endpoint values, database lock at risk if not resolved in 48 hours
[WARNING] Site 7 — Haemoglobin outliers flagged for 3 patients, values 40% below normal range, SDV required
[OK] Sites 1, 2, 4, 5, 6 — Data quality score 98.4%, on track for scheduled data lock next Friday`,
};

// ─── Project Manager Agent Responses ──────────────────────────────
const PM_RESPONSES: MockResponseMap = {
  deviation: `Assessed operational impact of protocol deviations on overall study timeline and budget.
[CRITICAL] Site 3 deviation review adds estimated 4-week delay, pushing database lock to October 2025
[CRITICAL] Site 9 unblinding event requires DSMB emergency review, sponsor notified, 2-week hold likely
[WARNING] Combined deviation remediation cost estimated at $48,000 above approved site budget
[OK] Deviations at Sites 7 and 11 have no material impact on primary endpoint timeline`,

  schedule: `Reviewed master study schedule, enrollment velocity, and milestone adherence across all sites.
[CRITICAL] Overall enrollment 18% behind projection, revised completion date now February 2026
[CRITICAL] Site 3 paused and Site 12 delayed — combined loss of 31 planned patients this quarter
[WARNING] Sites 7, 9, 11 risk missing Q3 milestone if deviations not remediated within 10 business days
[OK] Sites 1, 2, 5 performing above target, collectively 12 patients ahead of enrollment plan`,

  audit: `Evaluated audit preparedness impact on study timeline, budget reserves, and sponsor obligations.
[CRITICAL] Site 6 audit blocker requires immediate CRA visit, unbudgeted cost of $12,000 estimated
[CRITICAL] Site 8 SAE reporting breach triggers mandatory FDA notification within 7 calendar days
[WARNING] Audit remediation across Sites 4 and 6 may delay interim analysis by 3 weeks
[OK] 10 of 14 sites fully audit-ready, no timeline or budget impact projected`,

  enrollment: `Analysed patient enrollment velocity, screen failure rates, and recruitment forecasts by region.
[CRITICAL] Screen failure rate at Site 3 increased to 67%, well above 30% protocol threshold
[CRITICAL] Region 2 has enrolled only 34% of target patients with 6 weeks remaining in recruitment window
[WARNING] Sites 7 and 9 recruiting below minimum rate needed to meet Q3 milestone target
[OK] Region 1 on track — Sites 1, 2, 5 forecast to exceed enrollment targets by 8%`,

  default: `Trial enrollment is 18% behind projection with revised completion date now February 2026.
[CRITICAL] Site 3 enrollment paused due to protocol deviation review, 23 patients affected this quarter
[WARNING] Sites 7, 9, 11 risk missing Q3 milestone if deviations not remediated within 10 business days
[OK] Sites 1, 2, 5 performing above target, collectively 12 patients ahead of enrollment plan`,
};

// ─── Finance Agent Responses ───────────────────────────────────────
const FINANCE_RESPONSES: MockResponseMap = {
  deviation: `Calculated financial exposure from protocol deviations across all affected sites.
[CRITICAL] Site 3 — Deviation remediation estimated at $48,000, exceeds site contingency budget by 340%
[CRITICAL] Site 9 — DSMB emergency review triggers unbudgeted $22,000 in CRO pass-through costs
[WARNING] Site 7 — Repeat SDV visits for visit window breaches adding $8,400 in unplanned monitoring costs
[OK] Sites 1, 2, 5 — No unplanned costs this quarter, burn rate 2% below approved budget`,

  schedule: `Reviewed budget burn rate, site payment status, and forecast against approved study budget.
[CRITICAL] Overall study budget 23% overspent due to enrollment delays and repeat monitoring visits
[CRITICAL] Site 3 and Site 12 delays causing $67,000 in idle site costs with zero patient throughput
[WARNING] CRO invoice for Q2 monitoring is $31,000 above contracted rate, dispute in progress
[OK] Sites 1, 2, 5 — Payments current, invoices reconciled, within approved per-patient budget`,

  audit: `Assessed financial risk from audit findings and potential regulatory penalties.
[CRITICAL] Site 8 SAE reporting breach carries potential FDA penalty exposure of up to $250,000
[CRITICAL] Site 6 delegation log gap creates liability for 3 months of unauditable site payments totalling $18,000
[WARNING] Site 4 missing amendments may require protocol re-submission, estimated cost $14,000
[OK] Sites 1, 2, 3, 5 — Clean audit status, no financial liability exposure identified`,

  enrollment: `Analysed per-patient costs, screen failure financial impact, and recruitment budget forecast.
[CRITICAL] Screen failure rate at 58% costing $1,200 per failed screen — $74,400 wasted this quarter
[CRITICAL] Site 12 activation delay burning $9,000 per month in fixed site costs with zero enrolled patients
[WARNING] Region 2 recruitment shortfall will require additional site activation, estimated $35,000 setup cost
[OK] Sites 1, 2, 5 — Per-patient cost within $200 of budget, most cost-efficient sites in the study`,

  default: `Reviewed overall study financial health, site payment status, and budget variance across all sites.
[CRITICAL] Study budget variance at 23% overspend, sponsor escalation required if not remediated this quarter
[CRITICAL] Site 3 and Site 9 combined causing $70,000 in unplanned costs due to deviations and delays
[WARNING] CRO pass-through costs 18% above contracted rate, invoice dispute with CRO finance team ongoing
[OK] Sites 1, 2, 5 — Payments current, burn rate on track, no financial risk identified this period`,
};

// ─── Coordinator Agent Responses ──────────────────────────────────
const COORDINATOR_RESPONSES: MockResponseMap = {
  deviation: `Assessed patient scheduling and consent impact from protocol deviations at affected sites.
[CRITICAL] Site 3 — 23 patients require ICF re-consent using v2.3, appointments need rescheduling within 14 days
[CRITICAL] Site 9 — 4 blinded patients now require unblinding assessment, coordinator notified investigator
[WARNING] Site 7 — 6 patients need rescheduled visits, Day 28 and Day 42 windows still achievable if booked today
[OK] Sites 1, 2, 5 — All patient visits on schedule, no consent or scheduling issues identified`,

  schedule: `Reviewed patient visit schedules, dropout risk, and screening pipeline across all active sites.
[CRITICAL] Site 3 — 23 patient visits frozen, coordinator unable to book until deviation review complete
[CRITICAL] Site 12 — 8 pre-screened patients lost to competitor trial due to 6-week activation delay
[WARNING] Sites 7 and 9 — 14 patients approaching end of eligibility window, require immediate scheduling
[OK] Sites 1, 2, 5 — Visit completion rate 96%, dropout rate below 5% protocol threshold`,

  audit: `Reviewed informed consent documentation, visit logs, and regulatory binder status at all sites.
[CRITICAL] Site 6 — 7 patient consent forms missing coordinator countersignature, GCP violation
[CRITICAL] Site 8 — SAE patient narrative forms unsigned by investigator, regulatory submission blocked
[WARNING] Site 4 — Visit log discrepancies for 3 patients, source document reconciliation needed
[OK] Sites 1, 2, 3, 5 — All consent forms complete, visit logs reconciled, binders audit-ready`,

  enrollment: `Analysed screening pipeline, patient eligibility, and visit scheduling across all regions.
[CRITICAL] Site 3 — Screening log shows 67% failure rate, coordinator reviewing inclusion criteria interpretation
[CRITICAL] Region 2 — 8 pre-screened patients withdrew due to competitor trial, pipeline critically low
[WARNING] Sites 7 and 9 — 14 eligible patients not yet booked for baseline visit, risk of expiry
[OK] Sites 1, 2, 5 — Screening pipeline healthy, 22 patients queued for next enrollment window`,

  default: `Reviewed patient scheduling, consent status, and visit completion rates across all 14 sites.
[CRITICAL] Site 3 — 23 patients require re-consent and rescheduling due to ICF version deviation
[CRITICAL] Site 12 — 8 pre-screened patients lost to competing trial during 6-week activation delay
[WARNING] Sites 7 and 9 — 14 patients approaching eligibility window expiry, immediate booking required
[OK] Sites 1, 2, 5 — Visit completion rate 96%, all consents current, dropout rate within protocol threshold`,
};

// ─── Synthesis Agent Responses ─────────────────────────────────────
const SYNTHESIS_RESPONSES: MockResponseMap = {
  deviation: `All 5 agents confirm compounding deviation risks at Sites 3 and 9 requiring immediate escalation.
[CRITICAL] Escalate Site 3 to Medical Monitor today — ICF breach confirmed by CRA, 23 patients need re-consent per Coordinator, $48k budget overrun flagged by Finance
[CRITICAL] Convene emergency DSMB call for Site 9 — CRA confirmed unblinding, Data Manager quarantined records, Finance flagged $22k unbudgeted cost
[WARNING] Schedule remote SDV for Site 7 within 5 days — CRA and Data Manager both flagged visit window and haemoglobin issues, Coordinator has 6 patients to reschedule
[INFO] Engage regulatory affairs to assess whether deviation pattern at Sites 3 and 9 requires FDA notification
[OK] Sites 1, 2, 5 confirmed clear across all 5 agents — proceed to data lock preparation immediately`,

  schedule: `All 5 agents confirm the study is at significant risk of missing its primary completion milestone.
[CRITICAL] Activate contingency recruitment plan for Region 2 — PM confirms 18% enrollment shortfall, Coordinator reports 8 patients lost, Finance calculates $67k in idle site costs
[CRITICAL] Request 45-day timeline extension from sponsor — Sites 3 and 12 delays confirmed by all agents, current lock date unachievable
[WARNING] Commission emergency CRA visits to Sites 7, 9, 11 — Data Manager confirms query backlog, Coordinator has 14 patients approaching eligibility expiry
[INFO] Revise Gantt chart and redistribute updated milestone tracker to all site investigators and sponsor
[OK] Lock Sites 1, 2, 5 data this sprint — all 5 agents confirm clean status across monitoring, data, timeline, finance and patient scheduling`,

  audit: `All 5 agents flag critical audit readiness gaps at Sites 6 and 8 requiring immediate remediation.
[CRITICAL] Dispatch CRA to Site 6 within 48 hours — delegation log gap confirmed, 7 consent forms missing countersignature per Coordinator, $18k liability flagged by Finance
[CRITICAL] File FDA MedWatch for Site 8 SAE breach within 7 days — CRA confirmed late submission, Data Manager found backdated entries, Finance flagged $250k penalty exposure
[WARNING] Engage Data Manager and Coordinator to remediate Sites 4 audit gaps — eCRF edits and visit log discrepancies must clear before inspection window
[INFO] Schedule mock audit for Sites 4 and 6 in next 2 weeks to validate remediation before actual inspection
[OK] Sites 1, 2, 3, 5 confirmed audit-ready across all 5 agents — no further preparation required`,

  enrollment: `All 5 agents confirm enrollment crisis in Region 2 requiring immediate multi-level intervention.
[CRITICAL] Activate backup site in Region 2 immediately — PM confirms 34% enrollment, Coordinator reports 8 lost patients, Finance calculates $74k in screen failure waste this quarter
[CRITICAL] Pause screening at Site 3 pending deviation review — CRA confirmed 67% screen failure, Data Manager found incomplete records, Coordinator rescheduling 23 patients
[WARNING] Fast-track scheduling for 14 eligible patients at Sites 7 and 9 — Coordinator confirms eligibility window expiring, PM flags Q3 milestone at risk
[INFO] Review inclusion criteria interpretation at Site 3 with investigator — screen failure rate suggests systematic eligibility misunderstanding
[OK] Confirm Sites 1, 2, 5 as model sites — all 5 agents report above-target performance across monitoring, data, timeline, finance and patient coordination`,

  default: `All 5 agents have analysed the trial and identified compounding risks requiring immediate action.
[CRITICAL] Escalate Site 3 immediately — 5 agents flagged protocol deviation, missing data, timeline delay, $48k cost overrun, and 23 patients needing re-consent
[WARNING] Schedule emergency SDV for Site 7 within 5 days — CRA, Data Manager and Coordinator all flagged independent issues that compound if unresolved
[WARNING] Activate backup recruitment in Region 2 — PM and Coordinator confirm enrollment shortfall, Finance calculates growing idle site cost exposure
[INFO] Request 45-day sponsor extension — cross-agent analysis confirms current database lock date is unachievable given compounding site issues
[OK] Sites 1, 2, 5 cleared across all 5 agents — proceed to data lock preparation, no further action required this sprint`,
};

// ─── Query Matcher ─────────────────────────────────────────────────
function getQueryKey(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('deviation') || q.includes('protocol') || q.includes('icf') || q.includes('gcp')) return 'deviation';
  if (q.includes('behind') || q.includes('schedule') || q.includes('milestone') || q.includes('delay')) return 'schedule';
  if (q.includes('audit') || q.includes('risk') || q.includes('compliance') || q.includes('inspection')) return 'audit';
  if (q.includes('sdv') || q.includes('source data') || q.includes('verification')) return 'sdv';
  if (q.includes('missing') || q.includes('ecrf') || q.includes('query') || q.includes('data lock')) return 'missing';
  if (q.includes('enrollment') || q.includes('recruit') || q.includes('patient') || q.includes('screen')) return 'enrollment';
  return 'default';
}

function getMockResponse(agentType: AgentType, query: string): string {
  const key = getQueryKey(query);

  const maps: Record<AgentType, MockResponseMap> = {
    cra: CRA_RESPONSES,
    dataManager: DATA_MANAGER_RESPONSES,
    projectManager: PM_RESPONSES,
    finance: FINANCE_RESPONSES,
    coordinator: COORDINATOR_RESPONSES,
    synthesis: SYNTHESIS_RESPONSES,
  };

  const map = maps[agentType];
  return map[key] ?? map['default'];
}

// ─── Mock Streamer ─────────────────────────────────────────────────
async function mockStream(
  text: string,
  onToken: (token: string) => void,
  onDone: () => void
): Promise<void> {
  const words = text.split(' ');
  for (const word of words) {
    await new Promise<void>((r) => setTimeout(r, 40));
    onToken(word + ' ');
  }
  onDone();
}

// ─── Main Export ───────────────────────────────────────────────────
export interface StreamClaudeParams {
  agentType: string;
  systemPrompt: string;
  userMessage: string;
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

export async function streamClaude({
  agentType,
  systemPrompt,
  userMessage,
  onToken,
  onDone,
  onError,
}: StreamClaudeParams): Promise<void> {
  if (MOCK_MODE) {
    const mockText = getMockResponse(agentType as AgentType, userMessage);
    await mockStream(mockText, onToken, onDone);
    return;
  }

  const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'messages-2023-12-15',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      onError(err?.error?.message ?? 'API error');
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) { onError('No response body'); return; }
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));
      for (const line of lines) {
        const data = line.replace('data: ', '').trim();
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.type === 'content_block_delta') {
            const token: string = parsed.delta?.text ?? '';
            if (token) onToken(token);
          }
          if (parsed.type === 'message_stop') onDone();
        } catch {
          // skip malformed chunks
        }
      }
    }
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Unknown error');
  }
}