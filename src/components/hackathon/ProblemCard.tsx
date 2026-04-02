import { cn } from "@/lib/cn";
import type { ProblemStatement } from "@/pages/home/data/problems";

type Props = {
  data: ProblemStatement;
  index: number;
  className?: string;
};

export function ProblemCard({ data, index, className }: Props) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/25 hover:shadow-glow-sm md:p-8",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl opacity-60" />

      <div className="relative flex flex-wrap items-start gap-4">
        <span className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-sm font-bold text-cyan-200 ring-1 ring-white/10">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
            {data.title}
          </h3>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300 md:text-base">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-rose-300/90">
                Problem
              </p>
              <p>{data.problem}</p>
            </div>
            <div className="rounded-xl border border-cyan-500/15 bg-cyan-500/[0.06] p-4">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300/90">
                Challenge
              </p>
              <p className="text-slate-200">{data.challenge}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
