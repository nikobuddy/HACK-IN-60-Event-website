import { Button } from "@/components/ui/Button";
import { useRoundFlow } from "@/context/RoundFlowContext";
import { cn } from "@/lib/cn";
import { useMemo } from "react";

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function TeamMarquee({
  teams,
  reverse,
  muted,
}: {
  teams: string[];
  reverse?: boolean;
  muted?: boolean;
}) {
  if (teams.length === 0) {
    return (
      <div className="border-y border-white/[0.06] bg-black/30 py-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          No teams to display yet
        </p>
      </div>
    );
  }
  const loop = [...teams, ...teams];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-white/[0.06] bg-black/25 py-3 backdrop-blur-sm",
        muted && "opacity-40"
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max gap-3 px-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-sm font-semibold tracking-wide text-slate-200 ring-1 ring-white/[0.04]"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function TeamNameCard({
  name,
  accent,
  align,
}: {
  name: string;
  accent: "cyan" | "violet";
  align: "left" | "right";
}) {
  const ring =
    accent === "cyan"
      ? "border-white/[0.1] hover:border-cyan-400/30 hover:shadow-[0_0_20px_-8px_rgba(34,211,238,0.35)]"
      : "border-violet-400/15 hover:border-violet-400/35 hover:shadow-[0_0_20px_-8px_rgba(167,139,250,0.35)]";
  const surface =
    accent === "cyan" ? "bg-white/[0.05]" : "bg-violet-500/[0.07]";
  return (
    <span
      className={cn(
        "block w-full max-w-full rounded-xl border px-4 py-2.5 text-left text-sm font-medium leading-snug text-slate-100 transition duration-300 sm:text-[15px] sm:leading-normal",
        surface,
        ring,
        align === "right" && "text-right"
      )}
    >
      {name}
    </span>
  );
}

function TeamColumn({
  teams,
  align,
  accent,
}: {
  teams: string[];
  align: "left" | "right";
  accent: "cyan" | "violet";
}) {
  if (teams.length === 0) {
    return <p className="text-sm text-slate-500">—</p>;
  }
  return (
    <ul
      className={cn(
        "custom-scrollbar flex max-h-[min(480px,56vh)] min-w-0 flex-col gap-2.5 overflow-y-auto pr-1",
        align === "right" && "items-stretch"
      )}
    >
      {teams.map((name) => (
        <li key={name} className="min-w-0 w-full max-w-full">
          <TeamNameCard name={name} accent={accent} align={align} />
        </li>
      ))}
    </ul>
  );
}

function TeamRosterGrid({
  teams,
  accent,
  ariaLabel,
}: {
  teams: string[];
  accent: "cyan" | "violet";
  ariaLabel: string;
}) {
  if (teams.length === 0) return null;
  return (
    <div className="w-full max-w-3xl lg:hidden">
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {ariaLabel}
      </p>
      <ul
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3"
        aria-label={ariaLabel}
      >
        {teams.map((name) => (
          <li key={name} className="min-w-0">
            <TeamNameCard name={name} accent={accent} align="left" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RoundOneArenaSection() {
  const {
    allTeams,
    round1Phase,
    round1Remaining,
    round1Duration,
    startRound1,
    qualificationConfirmed,
  } = useRoundFlow();

  const mid = Math.ceil(allTeams.length / 2);
  const leftTeams = allTeams.slice(0, mid);
  const rightTeams = allTeams.slice(mid);

  const progress = 1 - round1Remaining / round1Duration;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const timerHint = useMemo(() => {
    if (round1Phase === "idle") return "Press start to begin the 60:00 build window";
    if (round1Phase === "running") return "Live — prototype round in progress";
    return "Round complete — head to the winners board to announce results";
  }, [round1Phase]);

  return (
    <section
      id="round-1-arena"
      className="relative scroll-mt-24 border-t border-white/[0.06] bg-hack-deep/60"
    >
      <TeamMarquee teams={allTeams} />

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-transparent to-violet-500/5 opacity-70"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-8 text-center lg:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Round 1 · Prototype challenge
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Build window — 60 minutes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
              All registered teams compete here first. When time ends, use the
              winners board to announce who advances (see{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-cyan-200/90">
                firstRoundWinners.ts
              </code>
              ).
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(200px,1.2fr)_minmax(300px,420px)_minmax(200px,1.2fr)] lg:gap-8">
            <div className="hidden min-w-0 lg:block">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Teams — side A
              </p>
              <TeamColumn teams={leftTeams} align="left" accent="cyan" />
            </div>

            <div className="flex min-w-0 flex-col items-center justify-center">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  Teams in arena
                </span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 font-display text-lg font-bold tabular-nums text-cyan-200">
                  {allTeams.length}
                </span>
              </div>

              <div className="relative flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-[320px]">
                <svg
                  className="absolute h-full w-full -rotate-90"
                  viewBox="0 0 260 260"
                  aria-hidden
                >
                  <circle
                    cx="130"
                    cy="130"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/[0.06]"
                  />
                  <circle
                    cx="130"
                    cy="130"
                    r="120"
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="stroke-cyan-400/90 transition-[stroke-dashoffset] duration-1000 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
                  />
                </svg>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                    {round1Phase === "running" ? "Live timer" : "Round clock"}
                  </p>
                  <p
                    className="mt-2 font-display text-5xl font-bold tabular-nums tracking-tight text-white sm:text-6xl"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {formatClock(round1Remaining)}
                  </p>
                  <p className="mt-2 max-w-[220px] text-xs text-slate-500">
                    {timerHint}
                  </p>
                  {round1Phase === "idle" ? (
                    <Button
                      type="button"
                      className="mt-6 min-w-[200px]"
                      onClick={startRound1}
                    >
                      Start Round 1
                    </Button>
                  ) : null}
                </div>
              </div>

              {round1Phase === "completed" && !qualificationConfirmed ? (
                <p className="mt-6 max-w-md text-center text-sm text-cyan-200/90">
                  <a
                    href="#first-round-winners"
                    className="font-semibold text-white underline decoration-cyan-400/50 underline-offset-2 hover:text-cyan-100"
                  >
                    Open the first round winners board
                  </a>{" "}
                  to run the announcement and unlock Round 2.
                </p>
              ) : null}
              {qualificationConfirmed ? (
                <p className="mt-6 text-center text-sm font-medium text-emerald-400/90">
                  Winners announced — Round 2 is unlocked below.
                </p>
              ) : null}

              <div className="mt-8 w-full px-1">
                <TeamRosterGrid
                  teams={allTeams}
                  accent="cyan"
                  ariaLabel="All teams in Round 1"
                />
              </div>
            </div>

            <div className="hidden min-w-0 lg:block">
              <p className="mb-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Teams — side B
              </p>
              <TeamColumn teams={rightTeams} align="right" accent="cyan" />
            </div>
          </div>

        </div>
      </div>

      <TeamMarquee teams={allTeams} reverse />
    </section>
  );
}

export function RoundTwoArenaSection() {
  const {
    round2Phase,
    round2Remaining,
    round2Duration,
    startRound2,
    qualifiedTeams,
    qualificationConfirmed,
  } = useRoundFlow();

  const locked = !qualificationConfirmed;

  const displayTeams = locked ? [] : qualifiedTeams;
  const mid = Math.ceil(displayTeams.length / 2);
  const leftTeams = displayTeams.slice(0, mid);
  const rightTeams = displayTeams.slice(mid);

  const progress = locked ? 0 : 1 - round2Remaining / round2Duration;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const timerHint = useMemo(() => {
    if (locked) return "Complete Round 1 and confirm qualifiers to unlock";
    if (round2Phase === "ready") return "Ready — only qualified teams are shown";
    if (round2Phase === "running") return "Live — enhancement round in progress";
    return "Round 2 complete";
  }, [locked, round2Phase]);

  return (
    <section
      id="round-2-arena"
      className="relative scroll-mt-24 border-t border-white/[0.06] bg-hack-void"
    >
      <TeamMarquee teams={displayTeams} muted={locked} />

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/15 via-transparent to-cyan-500/5 opacity-70"
          aria-hidden
        />

        <div
          className={cn(
            "relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14",
            locked && "min-h-[320px]"
          )}
        >
          {locked ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-hack-void/75 px-4 backdrop-blur-sm">
              <div className="max-w-md rounded-2xl border border-white/10 bg-hack-surface/90 p-6 text-center shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Round 2 locked
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-white">
                  Qualifiers only after Round 1
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Finish Round 1, run the winners announcement, then only
                  qualified teams (from your data file) appear here.
                </p>
              </div>
            </div>
          ) : null}

          <div className={cn(locked && "opacity-30")}>
            <div className="mb-8 text-center lg:mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
                Round 2 · Enhancement round
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Polish & pitch — 60 minutes
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
                {round2Phase === "running" ? (
                  <>
                    <span className="font-medium text-violet-200/90">
                      Timer running
                    </span>
                    {" — "}marquees, columns, and mobile grid show{" "}
                    <span className="tabular-nums text-white">
                      {qualifiedTeams.length}
                    </span>{" "}
                    qualifiers only. No other teams appear here.
                  </>
                ) : (
                  <>
                    Only Round 1 qualifiers appear here (
                    <span className="tabular-nums text-violet-200/90">
                      {qualifiedTeams.length}
                    </span>{" "}
                    teams). Start the countdown when you are ready.
                  </>
                )}
              </p>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[minmax(200px,1.2fr)_minmax(300px,420px)_minmax(200px,1.2fr)] lg:gap-8">
              <div className="hidden min-w-0 lg:block">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Qualified — side A
                </p>
                <TeamColumn teams={leftTeams} align="left" accent="violet" />
              </div>

              <div className="flex min-w-0 flex-col items-center justify-center">
                <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    Qualified teams
                  </span>
                  <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 font-display text-lg font-bold tabular-nums text-violet-200">
                    {locked ? "—" : qualifiedTeams.length}
                  </span>
                </div>

                <div className="relative flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-[320px]">
                  <svg
                    className="absolute h-full w-full -rotate-90"
                    viewBox="0 0 260 260"
                    aria-hidden
                  >
                    <circle
                      cx="130"
                      cy="130"
                      r="120"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-white/[0.06]"
                    />
                    <circle
                      cx="130"
                      cy="130"
                      r="120"
                      fill="none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="stroke-violet-400/90 transition-[stroke-dashoffset] duration-1000 drop-shadow-[0_0_12px_rgba(167,139,250,0.35)]"
                    />
                  </svg>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                      {round2Phase === "running" ? "Live timer" : "Round clock"}
                    </p>
                    <p
                      className="mt-2 font-display text-5xl font-bold tabular-nums tracking-tight text-white sm:text-6xl"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {locked ? "—:—" : formatClock(round2Remaining)}
                    </p>
                    <p className="mt-2 max-w-[240px] text-xs text-slate-500">
                      {timerHint}
                    </p>
                    {!locked && round2Phase === "ready" ? (
                      <Button
                        type="button"
                        className="mt-6 min-w-[200px]"
                        onClick={startRound2}
                      >
                        Start Round 2
                      </Button>
                    ) : null}
                  </div>
                </div>

                {!locked ? (
                  <div className="mt-8 w-full px-1">
                    <TeamRosterGrid
                      teams={qualifiedTeams}
                      accent="violet"
                      ariaLabel="Qualified teams in Round 2"
                    />
                  </div>
                ) : null}
              </div>

              <div className="hidden min-w-0 lg:block">
                <p className="mb-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Qualified — side B
                </p>
                <TeamColumn teams={rightTeams} align="right" accent="violet" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TeamMarquee teams={displayTeams} reverse muted={locked} />
    </section>
  );
}
