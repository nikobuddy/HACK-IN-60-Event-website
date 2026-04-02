import {
  participatingTeams,
  ROUND_DURATION_SECONDS,
} from "@/pages/home/data/teams";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

export type Round1Phase = "idle" | "running" | "completed";
export type Round2Phase = "locked" | "ready" | "running" | "completed";

type RoundFlowValue = {
  allTeams: string[];
  round1Phase: Round1Phase;
  round1Remaining: number;
  round1Duration: number;
  startRound1: () => void;
  showQualification: boolean;
  qualificationDraft: Record<string, boolean>;
  toggleQualification: (teamName: string) => void;
  selectAllQualifiers: () => void;
  clearQualifiers: () => void;
  confirmQualification: () => void;
  selectedQualifierCount: number;
  qualifiedTeams: string[];
  qualificationConfirmed: boolean;
  round2Phase: Round2Phase;
  round2Remaining: number;
  round2Duration: number;
  startRound2: () => void;
};

const RoundFlowContext = createContext<RoundFlowValue | null>(null);

export function RoundFlowProvider({ children }: { children: ReactNode }) {
  const [round1Phase, setRound1Phase] = useState<Round1Phase>("idle");
  const [round1Remaining, setRound1Remaining] = useState(ROUND_DURATION_SECONDS);
  const [qualificationDraft, setQualificationDraft] = useState<
    Record<string, boolean>
  >({});
  const [qualificationConfirmed, setQualificationConfirmed] = useState(false);
  const [qualifiedTeams, setQualifiedTeams] = useState<string[]>([]);
  const [round2Phase, setRound2Phase] = useState<Round2Phase>("locked");
  const [round2Remaining, setRound2Remaining] = useState(ROUND_DURATION_SECONDS);

  const qualificationOpenedRef = useRef(false);

  const initDraftAllSelected = useCallback(() => {
    const next: Record<string, boolean> = {};
    for (const t of participatingTeams) next[t] = true;
    setQualificationDraft(next);
  }, []);

  const startRound1 = useCallback(() => {
    if (round1Phase !== "idle") return;
    setRound1Remaining(ROUND_DURATION_SECONDS);
    setRound1Phase("running");
  }, [round1Phase]);

  useEffect(() => {
    if (round1Phase !== "running") return;
    const id = window.setInterval(() => {
      setRound1Remaining((r) => {
        if (r <= 1) {
          setRound1Phase("completed");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [round1Phase]);

  useEffect(() => {
    if (round1Phase !== "completed" || qualificationConfirmed) return;
    if (qualificationOpenedRef.current) return;
    qualificationOpenedRef.current = true;
    initDraftAllSelected();
  }, [round1Phase, qualificationConfirmed, initDraftAllSelected]);

  const toggleQualification = useCallback((teamName: string) => {
    setQualificationDraft((d) => ({ ...d, [teamName]: !d[teamName] }));
  }, []);

  const selectAllQualifiers = useCallback(() => {
    initDraftAllSelected();
  }, [initDraftAllSelected]);

  const clearQualifiers = useCallback(() => {
    const next: Record<string, boolean> = {};
    for (const t of participatingTeams) next[t] = false;
    setQualificationDraft(next);
  }, []);

  const confirmQualification = useCallback(() => {
    const selected = participatingTeams.filter((t) => qualificationDraft[t]);
    if (selected.length === 0) return;
    setQualifiedTeams(selected);
    setQualificationConfirmed(true);
    setRound2Phase("ready");
  }, [qualificationDraft]);

  const startRound2 = useCallback(() => {
    if (round2Phase !== "ready") return;
    setRound2Remaining(ROUND_DURATION_SECONDS);
    setRound2Phase("running");
  }, [round2Phase]);

  useEffect(() => {
    if (round2Phase !== "running") return;
    const id = window.setInterval(() => {
      setRound2Remaining((r) => {
        if (r <= 1) {
          setRound2Phase("completed");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [round2Phase]);

  const selectedQualifierCount = participatingTeams.filter(
    (t) => qualificationDraft[t]
  ).length;

  const value = useMemo(
    (): RoundFlowValue => ({
      allTeams: participatingTeams,
      round1Phase,
      round1Remaining,
      round1Duration: ROUND_DURATION_SECONDS,
      startRound1,
      showQualification: round1Phase === "completed" && !qualificationConfirmed,
      qualificationDraft,
      toggleQualification,
      selectAllQualifiers,
      clearQualifiers,
      confirmQualification,
      selectedQualifierCount,
      qualifiedTeams,
      qualificationConfirmed,
      round2Phase,
      round2Remaining,
      round2Duration: ROUND_DURATION_SECONDS,
      startRound2,
    }),
    [
      round1Phase,
      round1Remaining,
      startRound1,
      qualificationDraft,
      toggleQualification,
      selectAllQualifiers,
      clearQualifiers,
      confirmQualification,
      selectedQualifierCount,
      qualifiedTeams,
      qualificationConfirmed,
      round2Phase,
      round2Remaining,
      startRound2,
    ]
  );

  return (
    <RoundFlowContext.Provider value={value}>
      {children}
    </RoundFlowContext.Provider>
  );
}

export function useRoundFlow(): RoundFlowValue {
  const ctx = useContext(RoundFlowContext);
  if (!ctx) {
    throw new Error("useRoundFlow must be used within RoundFlowProvider");
  }
  return ctx;
}
