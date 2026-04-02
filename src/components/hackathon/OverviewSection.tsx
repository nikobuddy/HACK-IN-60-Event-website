import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function OverviewSection() {
  return (
    <Section
      id="overview"
      className="border-t border-white/[0.06] bg-hack-deep/50"
    >
      <SectionHeading
        eyebrow="Event overview"
        title="Built for momentum, clarity, and real outcomes"
        description="HACK_IN_60 is a premium student hackathon designed to feel like a product launch: sharp briefs, credible judging, and space to show what you can ship under pressure."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Mission-first",
            body: "Every team aligns to a clear problem brief. Less noise, more direction — so judges see intent and execution.",
            icon: TargetIcon,
          },
          {
            title: "Sprint culture",
            body: "Tight timelines reward focus, tooling, and teamwork. Move fast, document decisions, and own your narrative.",
            icon: BoltIcon,
          },
          {
            title: "Showcase ready",
            body: "You will refine prototypes and presentation flow so your solution reads as credible to mentors and industry.",
            icon: SparkIcon,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-transparent p-6 transition duration-300 hover:border-violet-400/20 hover:shadow-glow-sm md:p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-300 ring-1 ring-white/10 transition group-hover:scale-105">
              <item.icon />
            </div>
            <h3 className="font-display text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TargetIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
