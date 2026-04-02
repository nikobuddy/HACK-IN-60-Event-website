import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#problems", label: "Problems" },
  { href: "#rounds", label: "Rounds" },
  { href: "#why", label: "Why join" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] border-b border-transparent transition-all duration-300",
        scrolled
          ? "border-white/[0.06] bg-hack-void/80 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white"
        >
          <span className="rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 px-2 py-0.5 text-sm text-cyan-200 ring-1 ring-white/10 transition group-hover:ring-cyan-400/30">
            60
          </span>
          <span className="hidden sm:inline">HACK_IN_60</span>
          <span className="sm:hidden">HACK</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden px-3 py-2 text-sm sm:inline-flex"
            onClick={() =>
              document
                .getElementById("rules")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View rules
          </Button>
          <Button
            className="px-4 py-2 text-sm"
            onClick={() =>
              document
                .getElementById("register")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
