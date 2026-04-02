const social = [
  { label: "Twitter / X", href: "#", handle: "@hackin60" },
  { label: "LinkedIn", href: "#", handle: "HACK_IN_60" },
  { label: "Instagram", href: "#", handle: "@hack_in_60" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-hack-deep/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl font-bold text-white">
              HACK_IN_60
            </p>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Where Ideas Turn Into Innovation. A student-focused hackathon
              built for credible builds, sharp pitches, and real momentum.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </p>
            <a
              href="mailto:hello@hackin60.example"
              className="mt-2 block text-sm text-cyan-300/90 transition hover:text-cyan-200"
            >
              hello@hackin60.example
            </a>
            <p className="mt-1 text-xs text-slate-500">
              Replace with your official event email.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Social
            </p>
            <ul className="mt-3 space-y-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group flex flex-col text-sm text-slate-300 transition hover:text-white"
                  >
                    <span>{s.label}</span>
                    <span className="text-xs text-slate-500 group-hover:text-cyan-400/80">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/[0.06] pt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} HACK_IN_60. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
