import { CTASection } from "@/components/hackathon/CTASection";
import { Footer } from "@/components/hackathon/Footer";
import { HeroSection } from "@/components/hackathon/HeroSection";
import { IntroSequence } from "@/components/hackathon/IntroSequence";
import { Navbar } from "@/components/hackathon/Navbar";
import { OverviewSection } from "@/components/hackathon/OverviewSection";
import { ProblemStatementsSection } from "@/components/hackathon/ProblemStatementsSection";
import { RoundsSection } from "@/components/hackathon/RoundsSection";
import { WhyParticipateSection } from "@/components/hackathon/WhyParticipateSection";
import { cn } from "@/lib/cn";
import { useCallback, useState } from "react";

const HomePage = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="min-h-screen bg-hack-void font-sans text-slate-200 antialiased selection:bg-cyan-500/25 selection:text-white">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {!introComplete ? (
        <IntroSequence onComplete={handleIntroComplete} />
      ) : null}

      <div
        id="main"
        className={cn(
          "min-h-screen transition-opacity duration-1000 ease-out",
          introComplete
            ? "opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
        aria-hidden={!introComplete}
      >
        <Navbar />
        <HeroSection />
        <OverviewSection />
        <ProblemStatementsSection />
        <RoundsSection />
        <WhyParticipateSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
