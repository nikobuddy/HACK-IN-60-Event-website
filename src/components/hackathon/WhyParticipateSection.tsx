import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    title: "Smart collaboration & networking",
    desc: "Work alongside builders across disciplines and meet mentors who care about how you think, not just your stack.",
    icon: UsersIcon,
  },
  {
    title: "Real-world problem solving",
    desc: "Practice framing messy problems, scoping MVPs, and defending trade-offs — the same muscle top teams use daily.",
    icon: GlobeIcon,
  },
  {
    title: "Prizes, exposure & opportunities",
    desc: "Strong submissions earn visibility with judges and partners. Show up sharp — this is a credible portfolio moment.",
    icon: TrophyIcon,
  },
  {
    title: "Coding, business & tech innovation",
    desc: "Whether you ship code, strategy, or a hybrid solution, there is room to win on craft, clarity, and creativity.",
    icon: CodeIcon,
  },
];

export function WhyParticipateSection() {
  return (
    <Section id="why" className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="Why participate"
        title="High energy, zero fluff — built for serious students"
        description="If you want a hackathon that feels like an official launch cycle, not a chaotic side quest, you are in the right arena."
        align="center"
      />
      <ul className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
        {benefits.map((b) => (
          <li
            key={b.title}
            className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.05] md:p-6"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/10 text-cyan-200 ring-1 ring-white/10">
              <b.icon />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {b.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function UsersIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8m14 3v-1a3 3 0 00-3-3h-1m4-3a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M3 12h18M12 3a14 14 0 000 18M12 3a14 14 0 010 18"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M8 21h8m-4-4v4M6 4h12v5a4 4 0 01-4 4h-4a4 4 0 01-4-4V4zM6 8H4m16 0h2M6 11c-2 0-3-1-3-3m15 3c2 0 3-1 3-3"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M8 9l-3 3 3 3m8 0l3-3-3-3m-3-5l-2 8"
      />
    </svg>
  );
}
