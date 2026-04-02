import { useRoundFlow } from "@/context/RoundFlowContext";
import { cn } from "@/lib/cn";

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

export function FirstRoundWinnersAnnouncement() {
  const { qualificationConfirmed, qualifiedTeams } = useRoundFlow();

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
        {!qualificationConfirmed ? (
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10 text-amber-300/90 shadow-lg shadow-amber-500/10">
              <SparkleIcon className="h-8 w-8 opacity-90" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/90">
              Coming up
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              First round winners board
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              This is where we celebrate the teams that move forward. Finish
              Round 1, then confirm your qualifiers above — the moment this
              board goes live, everyone sees who advanced.
            </p>
            <p className="mt-6 text-sm font-medium text-slate-500">
              Tip: complete the checklist in Round 1 to unlock the reveal.
            </p>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                <SparkleIcon className="h-5 w-5 text-amber-400/80" />
                <span className="rounded-full border border-amber-400/35 bg-amber-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                  Official announcement
                </span>
                <SparkleIcon className="h-5 w-5 text-amber-400/80" />
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                First round —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
                  qualified teams
                </span>
              </h2>
              <p className="mt-6 font-display text-xl font-semibold text-amber-200/95 sm:text-2xl md:text-3xl">
                Are you excited?
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                Give it up for the crews who earned their spot in Round 2.
                These names are locked in — share the energy, then head to the
                enhancement arena when you are ready.
              </p>
              <p className="mt-3 text-sm font-medium text-cyan-400/85">
                {qualifiedTeams.length} team
                {qualifiedTeams.length === 1 ? "" : "s"} advancing
              </p>
            </div>

            {qualifiedTeams.length > 0 ? (
              <>
                <ul
                  className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
                  aria-label="First round qualified teams"
                >
                  {qualifiedTeams.map((name, i) => (
                    <li
                      key={name}
                      className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                      style={{ animationDelay: `${70 + i * 75}ms` }}
                    >
                      <div
                        className={cn(
                          "group relative h-full overflow-hidden rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[0.12] via-white/[0.04] to-violet-500/[0.06] p-5 shadow-xl backdrop-blur-md transition duration-300",
                          "hover:border-amber-400/45 hover:shadow-[0_0_40px_-12px_rgba(251,191,36,0.35)]"
                        )}
                      >
                        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl transition-opacity group-hover:opacity-100" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/90">
                          Qualified
                        </p>
                        <p className="mt-3 min-h-[2.75rem] break-words font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                          {name}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span className="h-px flex-1 bg-gradient-to-r from-amber-400/40 to-transparent" />
                          <span className="shrink-0 tabular-nums text-amber-200/70">
                            #{String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30 py-4 backdrop-blur-sm">
                  <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Victory lap — all qualifiers
                  </p>
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

            <p className="mx-auto mt-12 max-w-xl text-center text-sm text-slate-500">
              Round 2 is unlocked below — same qualified roster, new timer.
              Good luck to every team still in the fight.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
