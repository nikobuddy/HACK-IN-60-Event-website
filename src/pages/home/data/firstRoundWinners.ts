/**
 * First round results — only teams listed here advance to Round 2.
 * Every `teamName` must exist in `participatingTeams` from `./teams`.
 */
import { participatingTeams } from "./teams";

export type FirstRoundWinnerEntry = {
  teamName: string;
  /** 1 = first place, 2 = second, 3 = third — shown on the podium strip */
  placement?: 1 | 2 | 3;
  /** Short hype line from judges / hosts */
  shoutout?: string;
  /** What stood out (prototype, pitch, idea, etc.) */
  highlight?: string;
};

/**
 * Static winner roster: order here is the canonical “advancement” order for Round 2.
 * Edit freely — keep names aligned with `teams.ts`.
 */
export const firstRoundWinnerRecords: FirstRoundWinnerEntry[] = [
  {
    teamName: "CodeCrafters",
    placement: 1,
    shoutout: "Judges’ unanimous energy pick",
    highlight: "Fastest path from problem to working demo",
  },
  {
    teamName: "API Avengers",
    placement: 2,
    shoutout: "Technical depth that wowed the room",
    highlight: "Clean architecture under time pressure",
  },
  {
    teamName: "Neural Navigators",
    placement: 3,
    shoutout: "Bold vision, sharp storytelling",
    highlight: "Strong narrative + credible MVP scope",
  },
  {
    teamName: "Stack Squad",
    shoutout: "Relentless iteration in the final ten minutes",
    highlight: "UX polish that felt production-ready",
  },
  {
    teamName: "Data Drifters",
    shoutout: "Data story everyone understood instantly",
    highlight: "Insightful visuals and clear metrics",
  },
  {
    teamName: "Sprint Masters",
    shoutout: "Clock management on point",
    highlight: "Shipped features others left on the backlog",
  },
  {
    teamName: "Loop Legends",
    shoutout: "Crowd favorite walkthrough",
    highlight: "Demo flow with zero dead air",
  },
  {
    teamName: "Innovate IQ",
    shoutout: "Business angle judges kept quoting",
    highlight: "Sharp GTM framing alongside the build",
  },
  {
    teamName: "Git Pushers",
    shoutout: "Collaboration that looked effortless",
    highlight: "Balanced roles and merge-ready teamwork",
  },
];

/** Same order as `firstRoundWinnerRecords` — used for validation and Round 2 roster. */
export const firstRoundQualifiedTeamNamesInput: string[] =
  firstRoundWinnerRecords.map((r) => r.teamName);

const rosterSet = new Set(participatingTeams);

const invalid = firstRoundQualifiedTeamNamesInput.filter(
  (name) => !rosterSet.has(name)
);

if (typeof import.meta !== "undefined" && import.meta.env?.DEV && invalid.length > 0) {
  console.warn(
    "[firstRoundWinners] These names are not in participatingTeams and were removed:",
    invalid
  );
}

/** Canonical qualified list (only names that exist on the main roster). */
export const firstRoundQualifiedTeamNames: string[] =
  firstRoundQualifiedTeamNamesInput.filter((name) => rosterSet.has(name));

if (
  typeof import.meta !== "undefined" &&
  import.meta.env?.DEV &&
  participatingTeams.length > 0 &&
  firstRoundQualifiedTeamNames.length === 0
) {
  console.warn(
    "[firstRoundWinners] No valid qualifiers — check firstRoundWinnerRecords / teams.ts"
  );
}

export const firstRoundQualifiedSet = new Set(firstRoundQualifiedTeamNames);

const winnerMetaFiltered = firstRoundWinnerRecords.filter((r) =>
  rosterSet.has(r.teamName)
);

const metaByTeam = new Map(
  winnerMetaFiltered.map((r) => [r.teamName, r] as const)
);

export function getFirstRoundWinnerMeta(
  teamName: string
): FirstRoundWinnerEntry | undefined {
  return metaByTeam.get(teamName);
}

/** Top three for podium UI (must have placement 1–3 in data). */
export const firstRoundPodium: FirstRoundWinnerEntry[] = [...winnerMetaFiltered]
  .filter((r): r is FirstRoundWinnerEntry & { placement: 1 | 2 | 3 } =>
    r.placement === 1 || r.placement === 2 || r.placement === 3
  )
  .sort((a, b) => a.placement - b.placement);

export function isFirstRoundQualified(teamName: string): boolean {
  return firstRoundQualifiedSet.has(teamName);
}
