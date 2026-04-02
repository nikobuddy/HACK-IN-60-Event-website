/**
 * Round 1 → Round 2 logic reads only from `./teams.ts` (`hackathonTeams.qualifiedRound2`).
 * This file re-exports the same helpers so existing imports keep working.
 */
import {
  isTeamQualifiedForRound2,
  participatingTeams,
  round2QualifiedTeamNames,
  round2QualifiedSet,
} from "./teams";

export const firstRoundQualifiedTeamNames: string[] = round2QualifiedTeamNames;

export const firstRoundQualifiedTeamNamesInput: string[] =
  round2QualifiedTeamNames;

export const firstRoundQualifiedSet = round2QualifiedSet;

export function isFirstRoundQualified(teamName: string): boolean {
  return isTeamQualifiedForRound2(teamName);
}

/** Dev-only: every qualifier name must appear on the main roster. */
const roster = new Set(participatingTeams);
const stray = firstRoundQualifiedTeamNames.filter((n) => !roster.has(n));
if (typeof import.meta !== "undefined" && import.meta.env?.DEV && stray.length > 0) {
  console.warn("[firstRoundWinners] Qualifier names not on roster:", stray);
}

if (
  typeof import.meta !== "undefined" &&
  import.meta.env?.DEV &&
  participatingTeams.length > 0 &&
  firstRoundQualifiedTeamNames.length === 0
) {
  console.warn(
    "[firstRoundWinners] No qualifiers — set qualifiedRound2: true on teams in teams.ts"
  );
}
