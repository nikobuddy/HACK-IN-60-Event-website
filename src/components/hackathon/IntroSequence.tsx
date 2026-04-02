import { problemStatements } from "@/pages/home/data/problems";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import { ProblemCard } from "./ProblemCard";

const LOADING_MS = 2800;
const COUNT_TICK_MS = 950;
const AFTER_COUNT_MS = 750;
const REVEAL_STAGGER = 500;
const HOLD_AFTER_LAST_MS = 1600;
const EXIT_MS = 900;

type Phase = "loading" | "countdown" | "reveal";

type CountDisplay = 3 | 2 | 1 | "launch";

type Props = {
  onComplete: () => void;
};

export function IntroSequence({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [count, setCount] = useState<CountDisplay>(3);
  const [visibleProblems, setVisibleProblems] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      if (!cancelled) onComplete();
    };

    if (reduced) {
      const t = window.setTimeout(finish, 500);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
      };
    }

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    void (async () => {
      await sleep(LOADING_MS);
      if (cancelled) return;

      setPhase("countdown");
      for (const n of [3, 2, 1] as const) {
        setCount(n);
        await sleep(COUNT_TICK_MS);
        if (cancelled) return;
      }

      setCount("launch");
      await sleep(AFTER_COUNT_MS);
      if (cancelled) return;

      setPhase("reveal");
      setVisibleProblems(1);
      for (let i = 1; i < problemStatements.length; i++) {
        await sleep(REVEAL_STAGGER);
        if (cancelled) return;
        setVisibleProblems(i + 1);
      }

      await sleep(HOLD_AFTER_LAST_MS);
      if (cancelled) return;

      setExiting(true);
      await sleep(EXIT_MS);
      finish();
    })();

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col bg-hack-void transition-opacity duration-700 ease-out",
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      role="presentation"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.18),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(167,139,250,0.12),transparent),radial-gradient(ellipse_50%_30%_at_0%_80%,rgba(251,113,133,0.08),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8">
        {phase === "loading" ? <LoadingView /> : null}

        {phase === "countdown" ? <CountdownView value={count} /> : null}

        {phase === "reveal" ? (
          <div className="flex w-full max-w-3xl flex-col items-center gap-6 animate-fade-in">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400/90">
                Live brief
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Problem statements
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Your mission profiles are ready. Build bold, ship smart.
              </p>
            </div>
            <div className="custom-scrollbar flex max-h-[min(52vh,520px)] w-full flex-col gap-4 overflow-y-auto pr-1 md:max-h-[min(58vh,600px)]">
              {problemStatements.slice(0, visibleProblems).map((p, i) => (
                <div
                  key={p.id}
                  className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <ProblemCard data={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function LoadingView() {
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-cyan-400/20" />
        <span
          className="absolute inline-flex h-[85%] w-[85%] animate-pulse-ring rounded-full bg-violet-400/15"
          style={{ animationDelay: "0.45s" }}
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-glow backdrop-blur-md">
          <div
            className="h-10 w-10 animate-orbit rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-400"
            aria-hidden
          />
        </div>
      </div>
      <div>
        <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Problem Statements Loading
          <span className="inline-block w-12 text-left animate-pulse text-cyan-400">
            ...
          </span>
        </p>
        <p className="mt-3 max-w-sm text-sm text-slate-400">
          Syncing challenges, constraints, and launch parameters for your
          squad.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-[shimmer_1.8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-cyan-500/40 via-violet-500/60 to-cyan-500/40 bg-[length:200%_100%]" />
        </div>
        <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-slate-500">
          <span>Initializing</span>
          <span className="text-cyan-500/80">Secure channel</span>
        </div>
      </div>
    </div>
  );
}

function CountdownView({ value }: { value: CountDisplay }) {
  const isLaunch = value === "launch";
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
        {isLaunch ? "Stand by" : "T-minus"}
      </p>
      <div
        key={String(value)}
        className={cn(
          "flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-glow backdrop-blur-xl sm:h-48 sm:w-48 animate-scale-in"
        )}
      >
        {isLaunch ? (
          <span className="font-display text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300 sm:text-5xl">
            GO!
          </span>
        ) : (
          <span className="font-display text-7xl font-bold text-white tabular-nums sm:text-8xl">
            {value}
          </span>
        )}
      </div>
      <p className="max-w-xs text-center text-sm text-slate-400">
        {isLaunch
          ? "Releasing problem statements now."
          : "The arena unlocks in moments."}
      </p>
    </div>
  );
}
