import {
  participatingTeams,
  ROUND_DURATION_SECONDS,
  round2QualifiedTeamNames,
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
  qualifiedTeams: string[];
  qualificationConfirmed: boolean;
  /** Call after the winners announcement animation finishes — loads qualifiers from `teams.ts` and unlocks Round 2. */
  completeWinnersAnnouncement: () => void;
  round2Phase: Round2Phase;
  round2Remaining: number;
  round2Duration: number;
  startRound2: () => void;
};

const RoundFlowContext = createContext<RoundFlowValue | null>(null);

export function RoundFlowProvider({ children }: { children: ReactNode }) {
  const [round1Phase, setRound1Phase] = useState<Round1Phase>("idle");
  const [round1Remaining, setRound1Remaining] = useState(ROUND_DURATION_SECONDS);
  const [qualificationConfirmed, setQualificationConfirmed] = useState(false);
  const [qualifiedTeams, setQualifiedTeams] = useState<string[]>([]);
  const [round2Phase, setRound2Phase] = useState<Round2Phase>("locked");
  const [round2Remaining, setRound2Remaining] = useState(ROUND_DURATION_SECONDS);

  const winnersAnnouncedRef = useRef(false);

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

  const completeWinnersAnnouncement = useCallback(() => {
    if (winnersAnnouncedRef.current) return;
    winnersAnnouncedRef.current = true;
    setQualifiedTeams([...round2QualifiedTeamNames]);
    setQualificationConfirmed(true);
    setRound2Phase("ready");
  }, []);

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

  const value = useMemo(
    (): RoundFlowValue => ({
      allTeams: participatingTeams,
      round1Phase,
      round1Remaining,
      round1Duration: ROUND_DURATION_SECONDS,
      startRound1,
      qualifiedTeams,
      qualificationConfirmed,
      completeWinnersAnnouncement,
      round2Phase,
      round2Remaining,
      round2Duration: ROUND_DURATION_SECONDS,
      startRound2,
    }),
    [
      round1Phase,
      round1Remaining,
      startRound1,
      qualifiedTeams,
      qualificationConfirmed,
      completeWinnersAnnouncement,
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
