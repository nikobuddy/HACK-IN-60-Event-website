import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const rounds = [
  {
    n: "01",
    title: "Prototype Challenge",
    body: "Build your idea from scratch within a limited time.",
    accent: "from-cyan-500/20 to-cyan-400/5",
  },
  {
    n: "02",
    title: "Enhancement Round",
    body: "Upgrade, refine, and present your solution like a pro.",
    accent: "from-violet-500/20 to-violet-400/5",
  },
];

export function RoundsSection() {
  return (
    <Section id="rounds" className="border-t border-white/[0.06] bg-hack-deep/40">
      <SectionHeading
        eyebrow="How it works"
        title="Two rounds. One arc from spark to showcase."
        description="Progression is designed to reward teams that iterate: first you prove the core, then you polish the story and the system."
      />
      <div className="grid gap-8 md:grid-cols-2">
        {rounds.map((r, i) => (
          <div
            key={r.n}
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-hack-surface/40 p-8 backdrop-blur-md transition duration-500 hover:border-white/15 md:p-10"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${r.accent} opacity-80`}
              aria-hidden
            />
            <div className="relative">
              <span className="inline-flex rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-white/90 ring-1 ring-white/10">
                Round {r.n}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">
                {r.title}
              </h3>
              <p className="mt-4 text-slate-300 leading-relaxed">{r.body}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-cyan-300/90">
                <span className="h-px w-8 bg-gradient-to-r from-cyan-400 to-transparent" />
                Step {i + 1} of 2
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
