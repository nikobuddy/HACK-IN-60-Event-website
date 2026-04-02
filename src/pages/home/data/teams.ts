/**
 * Single source of truth for the hackathon roster.
 * Set `qualifiedRound2: true` for teams that won Round 1 and advance (static — treat Round 1 as done).
 */
export type HackathonTeam = {
  name: string;
  /** Round 1 outcome: `true` = winner / advances to Round 2. */
  qualifiedRound2: boolean;
};

export const hackathonTeams: HackathonTeam[] = [
  { name: "CodeCrafters", qualifiedRound2: true },
  { name: "Binary Brains", qualifiedRound2: false },
  { name: "Stack Squad", qualifiedRound2: true },
  { name: "Null Pointers", qualifiedRound2: false },
  { name: "Git Pushers", qualifiedRound2: true },
  { name: "API Avengers", qualifiedRound2: true },
  { name: "Pixel Pirates", qualifiedRound2: false },
  { name: "Data Drifters", qualifiedRound2: true },
  { name: "Cloud Nine", qualifiedRound2: false },
  { name: "Neural Navigators", qualifiedRound2: true },
  { name: "Kernel Krew", qualifiedRound2: false },
  { name: "Bug Squashers", qualifiedRound2: false },
  { name: "Sprint Masters", qualifiedRound2: true },
  { name: "Innovate IQ", qualifiedRound2: true },
  { name: "Loop Legends", qualifiedRound2: true },
];

/** Display label for UI badges on teams with `qualifiedRound2: true`. */
export const QUALIFIED_TEAM_BADGE = "Winner";

export const participatingTeams: string[] = hackathonTeams.map((t) => t.name);

/** Names that advance — order matches `hackathonTeams`. */
export const round2QualifiedTeamNames: string[] = hackathonTeams
  .filter((t) => t.qualifiedRound2)
  .map((t) => t.name);

export const round2QualifiedSet = new Set(round2QualifiedTeamNames);

export function isTeamQualifiedForRound2(teamName: string): boolean {
  return round2QualifiedSet.has(teamName);
}

export function getHackathonTeam(
  teamName: string
): HackathonTeam | undefined {
  return hackathonTeams.find((t) => t.name === teamName);
}

export const ROUND_DURATION_SECONDS = 60 * 60;
