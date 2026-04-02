import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/12 via-violet-500/8 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
          </span>
          Official hackathon experience · Student innovators welcome
        </div>

        <h1 className="mt-8 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
            HACK_IN_60
          </span>
          <br />
          <span className="text-3xl text-slate-200 sm:text-4xl md:text-5xl">
            Where Ideas Turn Into Innovation!
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
          HACK_IN_60 – Where Ideas Turn Into Innovation! This is not just an
          event… it&apos;s a battlefield for thinkers, creators, and future
          entrepreneurs. Participants will solve real-world challenges through
          innovation, creativity, and smart execution.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            className="min-w-[160px]"
            onClick={() =>
              document
                .getElementById("register")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Register now
          </Button>
          <Button
            variant="secondary"
            className="min-w-[140px]"
            onClick={() =>
              document
                .getElementById("rules")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View rules
          </Button>
        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { k: "Format", v: "Build & pitch" },
            { k: "Focus", v: "Real-world impact" },
            { k: "Tracks", v: "Tech + business" },
            { k: "Energy", v: "High-intensity" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm transition hover:border-cyan-400/20"
            >
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {item.k}
              </dt>
              <dd className="mt-1 font-display text-sm font-semibold text-white">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
