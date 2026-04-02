# HACK_IN_60 — Event website

Marketing and registration landing page for **HACK_IN_60** (*Where Ideas Turn Into Innovation!*). The homepage opens with a short loading sequence, a centered countdown, and a staggered reveal of problem statements before the full site appears.

## Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) with [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
- [Tailwind CSS](https://tailwindcss.com/) for layout and styling
- [React Router](https://reactrouter.com/) (`/` and a catch-all error route)

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm install`  | Install dependencies                 |
| `npm start`    | Dev server at [http://localhost:3000](http://localhost:3000) |
| `npm run build`| Typecheck (`tsc`) and production build |
| `npm run preview` | Serve the `dist/` output locally  |
| `npm run lint` | Run ESLint on the project          |

## Project layout

- `src/pages/home/page/home_page.tsx` — Composes intro sequence, navbar, and all sections.
- `src/components/hackathon/` — Section components (hero, overview, problems, rounds, CTA, footer, intro).
- `src/components/ui/` — Shared primitives (`Button`, `Section`, `SectionHeading`).
- `src/pages/home/data/problems.ts` — Problem statement copy (edit titles and briefs here).
- `tailwind.config.js` — Theme tokens (colors, fonts, keyframe animations).
- `index.html` — Document title, description, and social meta tags.

## Customizing for your event

- Replace placeholder contact and social links in `src/components/hackathon/Footer.tsx`.
- Wire **Register** / **View rules** actions in `CTASection.tsx` and the hero/nav buttons to your form, PDF, or external URL.
- Update `index.html` meta and favicon (`/vite.svg`) when branding is final.
- Users who prefer reduced motion get a shortened intro (see `IntroSequence.tsx`).

## ESLint (optional hardening)

The repo ships with a baseline TypeScript + React Hooks ESLint setup. For stricter, type-aware rules, follow the [typescript-eslint typed linting](https://typescript-eslint.io/getting-started/typed-linting) guide and extend your `.eslintrc.cjs` accordingly.
# HACK-IN-60-Event-website
