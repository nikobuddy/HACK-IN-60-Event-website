import { Button } from "@/components/ui/Button";
import { useRoundFlow } from "@/context/RoundFlowContext";
import {
  firstRoundQualifiedTeamNames,
  isFirstRoundQualified,
} from "@/pages/home/data/firstRoundWinners";
import { participatingTeams } from "@/pages/home/data/teams";
import { cn } from "@/lib/cn";
import { useCallback, useEffect, useMemo, useState } from "react";

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0L14.1 9.9L24 12L14.1 14.1L12 24L9.9 14.1L0 12L9.9 9.9L12 0Z" />
    </svg>
  );
}

function useAnimatedTeamCount(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target <= 0) {
      setValue(0);
      return;
    }

    let raf = 0;
    let cancelled = false;
    const duration = 1100;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [active, target]);

  return value;
}

type AnnouncePhase =
  | "wait_round1"
  | "intro"
  | "ready_prompt"
  | "lineup"
  | "eliminating"
  | "finale";

const totalTeams = participatingTeams.length;

export function FirstRoundWinnersAnnouncement() {
  const {
    round1Phase,
    qualificationConfirmed,
    qualifiedTeams,
    completeWinnersAnnouncement,
  } = useRoundFlow();

  const [phase, setPhase] = useState<AnnouncePhase>("wait_round1");

  const round1Done = round1Phase === "completed";

  const countActive = phase === "wait_round1" && !qualificationConfirmed;
  const animatedCount = useAnimatedTeamCount(totalTeams, countActive);

  useEffect(() => {
    if (qualificationConfirmed) {
      setPhase("finale");
    }
  }, [qualificationConfirmed]);

  useEffect(() => {
    if (qualificationConfirmed) return;
    if (!round1Done) {
      setPhase("wait_round1");
      return;
    }
    setPhase((p) => (p === "wait_round1" ? "intro" : p));
  }, [round1Done, qualificationConfirmed]);

  const eliminatedStagger = useMemo(() => {
    let i = 0;
    const map = new Map<string, number>();
    for (const name of participatingTeams) {
      if (!isFirstRoundQualified(name)) {
        map.set(name, i);
        i += 1;
      }
    }
    return map;
  }, []);

  const elimCount = participatingTeams.length - firstRoundQualifiedTeamNames.length;

  useEffect(() => {
    if (phase !== "eliminating") return;
    const ms = 900 + Math.max(0, elimCount - 1) * 72;
    const t = window.setTimeout(() => {
      completeWinnersAnnouncement();
      setPhase("finale");
    }, ms);
    return () => window.clearTimeout(t);
  }, [phase, elimCount, completeWinnersAnnouncement]);

  const beginPrompt = useCallback(() => {
    setPhase("ready_prompt");
  }, []);

  const showLineup = useCallback(() => {
    setPhase("lineup");
  }, []);

  const runElimination = useCallback(() => {
    setPhase("eliminating");
  }, []);

  return (
    <section
      id="first-round-winners"
      className="relative scroll-mt-24 overflow-hidden border-t border-amber-500/25 bg-hack-deep"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,rgba(251,191,36,0.16),transparent),radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(34,211,238,0.08),transparent),radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(167,139,250,0.08),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(251,191,36,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.15)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        {/* Total teams from teams.ts — animated count */}
        {phase === "wait_round1" && !qualificationConfirmed ? (
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-500/10 text-amber-300/90">
              <SparkleIcon className="h-8 w-8" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80">
              First round · full roster
            </p>
            <p
              className="mt-6 font-display text-7xl font-bold tabular-nums tracking-tight text-white sm:text-8xl md:text-9xl animate-fade-in-up"
              aria-live="polite"
            >
              {animatedCount}
            </p>
            <p className="mt-4 font-display text-xl text-slate-300 sm:text-2xl">
              teams in Round 1
            </p>
            <p className="mt-6 text-sm text-slate-500">
              Pulled from your main list in{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-slate-400">
                teams.ts
              </code>
            </p>
            {!round1Done ? (
              <p className="mt-8 text-sm text-slate-400">
                Complete the Round 1 timer above to unlock the announcement.
              </p>
            ) : null}
          </div>
        ) : null}

        {phase === "intro" && !qualificationConfirmed ? (
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/10">
              <SparkleIcon className="h-8 w-8" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/90">
              Winners announcement
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              {totalTeams} teams entered. Next: the room sees everyone, then
              non-qualifiers drop away.
            </p>
            <Button
              type="button"
              className="mt-10 min-w-[260px] px-8 py-3 text-base shadow-glow"
              onClick={beginPrompt}
            >
              Start announcement
            </Button>
          </div>
        ) : null}

        {phase === "ready_prompt" && !qualificationConfirmed ? (
          <div className="mx-auto max-w-xl animate-fade-in text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400/80">
              Moment
            </p>
            <p className="mt-10 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Are you ready?
            </p>
            <p className="mt-8 text-base text-slate-400 sm:text-lg">
              All {totalTeams} team names will appear. Then the cut runs — only
              Round 2 qualifiers stay on screen.
            </p>
            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                type="button"
                className="min-w-[200px]"
                variant="secondary"
                onClick={() => setPhase("intro")}
              >
                Wait
              </Button>
              <Button
                type="button"
                className="min-w-[220px] animate-scale-in"
                onClick={showLineup}
              >
                Yes — show everyone
              </Button>
            </div>
          </div>
        ) : null}

        {(phase === "lineup" || phase === "eliminating") && !qualificationConfirmed ? (
          <div className="animate-fade-in">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                All teams
              </h3>
              <p className="mt-2 tabular-nums text-slate-400">
                {totalTeams} competing
              </p>
            </div>
            <ul
              className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
              aria-label="All Round 1 teams"
            >
              {participatingTeams.map((name) => {
                const qualified = isFirstRoundQualified(name);
                const stagger = eliminatedStagger.get(name) ?? 0;
                const lineupOnly = phase === "lineup";
                return (
                  <li
                    key={name}
                    className={cn(
                      "min-w-0 transition-[transform,opacity] duration-300",
                      phase === "eliminating" && qualified && "z-[1] scale-[1.02]",
                      phase === "eliminating" &&
                        !qualified &&
                        "animate-winner-drop"
                    )}
                    style={
                      phase === "eliminating" && !qualified
                        ? { animationDelay: `${stagger * 72}ms` }
                        : undefined
                    }
                  >
                    <div
                      className={cn(
                        "flex min-h-[4.5rem] items-center justify-center rounded-2xl border px-4 py-4 backdrop-blur-sm sm:min-h-[5rem] sm:px-5",
                        lineupOnly && "border-white/[0.1] bg-white/[0.04]",
                        !lineupOnly &&
                          qualified &&
                          "border-amber-400/40 bg-amber-500/10",
                        !lineupOnly &&
                          !qualified &&
                          "border-white/[0.08] bg-white/[0.04]",
                        phase === "eliminating" &&
                          qualified &&
                          "animate-winner-pulse ring-2 ring-amber-400/45"
                      )}
                    >
                      <p className="break-words text-center font-display text-base font-semibold text-white sm:text-lg">
                        {name}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {phase === "lineup" ? (
              <div className="mx-auto mt-12 max-w-md text-center">
                <Button
                  type="button"
                  className="min-w-[240px]"
                  onClick={runElimination}
                >
                  Run the cut
                </Button>
              </div>
            ) : (
              <p className="mt-10 text-center text-sm font-medium text-amber-200/80">
                Removing non-qualifiers…
              </p>
            )}
          </div>
        ) : null}

        {phase === "finale" && qualificationConfirmed ? (
          <>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                <SparkleIcon className="h-5 w-5 text-amber-400/80" />
                <span className="rounded-full border border-amber-400/35 bg-amber-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                  Round 2 qualifiers
                </span>
                <SparkleIcon className="h-5 w-5 text-amber-400/80" />
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
                  {qualifiedTeams.length}
                </span>{" "}
                <span className="text-white">teams advance</span>
              </h2>
              <p className="mt-6 text-base text-slate-400 sm:text-lg">
                Only these names appear in Round 2 below.
              </p>
            </div>

            {qualifiedTeams.length > 0 ? (
              <>
                <ul
                  className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
                  aria-label="Qualified teams"
                >
                  {qualifiedTeams.map((name, i) => (
                    <li
                      key={name}
                      className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                      style={{ animationDelay: `${60 + i * 55}ms` }}
                    >
                      <div className="flex min-h-[4.5rem] items-center justify-center rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[0.1] to-white/[0.03] px-4 py-4 backdrop-blur-md sm:min-h-[5rem]">
                        <p className="break-words text-center font-display text-lg font-semibold text-white sm:text-xl">
                          {name}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30 py-4 backdrop-blur-sm">
                  <div className="flex flex-wrap justify-center gap-2.5 px-4">
                    {qualifiedTeams.map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-100"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : null}

            <p className="mx-auto mt-10 max-w-xl text-center text-sm text-slate-500">
              Round 2 below shows this roster only when you start the timer.
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
