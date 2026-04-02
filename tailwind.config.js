/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ["DM Sans", "Open Sans", "system-ui", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "fira-sans": ["Fira Sans", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        hack: {
          void: "#05060f",
          deep: "#0a0e1a",
          surface: "#12172a",
          border: "rgba(148, 163, 184, 0.12)",
          cyan: "#22d3ee",
          violet: "#a78bfa",
          rose: "#fb7185",
          lime: "#a3e635",
        },
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(34, 211, 238, 0.35)",
        "glow-sm": "0 0 40px -16px rgba(167, 139, 250, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scaleIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
        orbit: "orbit 1.4s linear infinite",
        "pulse-ring": "pulseRing 1.5s ease-out infinite",
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marqueeReverse 50s linear infinite",
        "winner-drop": "winnerDrop 0.85s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards",
        "winner-pulse": "winnerPulse 1.25s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.6" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        winnerDrop: {
          "0%": {
            opacity: "1",
            transform: "translateY(0) scale(1) rotate(0deg)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(130%) scale(0.88) rotate(4deg)",
          },
        },
        winnerPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(251, 191, 36, 0.35)" },
          "50%": { boxShadow: "0 0 28px 4px rgba(251, 191, 36, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};
