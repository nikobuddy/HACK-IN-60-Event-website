import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problemStatements } from "@/pages/home/data/problems";
import { ProblemCard } from "./ProblemCard";

export function ProblemStatementsSection() {
  return (
    <Section
      id="problems"
      className="border-t border-white/[0.06] scroll-mt-24"
    >
      <SectionHeading
        eyebrow="Challenge briefs"
        title="Problem statements you can own end-to-end"
        description="Five distinct missions — each crafted to reward research, product thinking, and technical depth. Pick your arena and make it undeniable."
      />
      <div className="flex flex-col gap-6">
        {problemStatements.map((p, i) => (
          <ProblemCard key={p.id} data={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
