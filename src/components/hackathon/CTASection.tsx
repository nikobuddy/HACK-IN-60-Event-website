import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function CTASection() {
  return (
    <Section className="pb-8 md:pb-12">
      <div
        id="register"
        className="scroll-mt-24 rounded-3xl border border-white/[0.1] bg-gradient-to-br from-cyan-500/10 via-hack-surface/80 to-violet-500/10 p-8 shadow-glow backdrop-blur-xl md:p-14"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            Ready when you are
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
            Claim your spot. Assemble the squad. Ship the future.
          </h2>
          <p className="mt-4 text-slate-400">
            Registration opens the door to schedules, rules, and mentor access.
            Review the playbook, align your roles, and lock in before seats
            fill.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              className="min-w-[180px]"
              onClick={() => {
                /* placeholder — wire to your form */
              }}
            >
              Register now
            </Button>
            <Button
              variant="secondary"
              className="min-w-[160px]"
              onClick={() => {
                /* placeholder — wire to PDF or Notion */
              }}
            >
              View rules
            </Button>
          </div>
          <p id="rules" className="mt-8 scroll-mt-28 text-xs text-slate-500">
            Official rules, eligibility, and code of conduct will be shared at
            registration. Replace these buttons with your real links anytime.
          </p>
        </div>
      </div>
    </Section>
  );
}
