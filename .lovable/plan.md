## Goal
Replace the boring 3×2 uniform card grid in `SkillsGrid.tsx` with an asymmetric **bento layout** featuring **bespoke animated SVG visuals** (no Lucide icons) that each tell a small story about the discipline.

## New Layout — Asymmetric Bento (12-col grid)

```text
┌─────────────────────────────┬───────────────────┐
│  AI & LLM  (featured 8col)  │  Databases (4col) │
│  large hero with neural     │  stacked data     │
│  network constellation      │  layers SVG       │
├──────────────┬──────────────┼───────────────────┤
│ Cloud/DevOps │ Frontend     │  Backend / APIs   │
│ (4col) orbit │ (4col) layer │  (4col) request   │
│ SVG          │ stack SVG    │  flow SVG         │
├──────────────┴──────────────┴───────────────────┤
│  Tooling & Workflow (full 12col, horizontal     │
│  rail with animated SVG toolchain timeline)     │
└─────────────────────────────────────────────────┘
```

All cards share a card shell (glass, accent border on hover) but each contains a unique inline SVG illustration that animates on view + hover.

## Custom SVG visuals (one per card, no lucide-react)

1. **AI & LLM — Neural Constellation**: 12-node animated graph; pulsing edges, traveling tokens along paths, a central "agent" core with rotating orbit ring. Inline SVG with `<animate>` + Framer Motion.
2. **Databases — Stacked Strata**: Three glowing horizontal slabs (Postgres / Vector / Redis Cache) with vertical "query" beams piercing through. Tiny row-count counter animates.
3. **Cloud & DevOps — Orbital Deploy**: Earth-like core with satellites (AWS, Vercel, Cloudflare, Docker) orbiting on elliptical paths; a deploy packet shoots from center to a satellite on hover.
4. **Frontend — Component Stratum**: Exploded stacked layers (Markup → Styles → Motion → Pixels) with depth/parallax, isometric perspective; layers separate on hover.
5. **Backend & APIs — Request Pulse**: Horizontal lane with an animated request packet hitting "Rate Limiter → Gateway → Handler", returning a 200 response pill. Heart-beat style.
6. **Tooling & Workflow — Toolchain Rail**: Wide horizontal timeline with custom glyph nodes (Git fork, brackets, terminal prompt, workflow gear). Connecting line draws in on scroll; pulse travels along.

Each SVG is hand-built with `<path>`, `<circle>`, gradients, and `filter` glow — no icon library.

## Interaction polish
- Each card uses `motion.div` with `whileInView` reveal and per-card stagger.
- Hover: card lifts, accent glow intensifies, SVG animation speed bumps (state-driven `isHovered`).
- Cursor-tilt (3D rotateX/Y) on the featured AI card only — keeps others calm.

## Section header refinements
- Keep current "Technical Stack" pill and gradient headline.
- Add a small live "currently building" ticker line under the subtitle (mono, dim) for personality — optional micro-detail.

## Files

- **Rewrite** `src/components/SkillsGrid.tsx` — new bento grid + per-card composition.
- **Create** `src/components/skills/` with one file per visual:
  - `AINeuralViz.tsx`
  - `DatabasesViz.tsx`
  - `CloudOrbitViz.tsx`
  - `FrontendLayersViz.tsx`
  - `BackendPulseViz.tsx`
  - `ToolingRailViz.tsx`
- No new dependencies. Use existing `framer-motion` + inline SVG.
- Existing `AIBentoCard.tsx`, `CloudDevOpsCard.tsx`, `FullStackCard.tsx` remain untouched (used elsewhere). The Skills section will no longer import them; if they're orphaned, leave the files in place.

## Design tokens
- Continue using existing accent palette (`#6366f1`, `#22d3ee`, `#f59e0b`, `#22c55e`, `#f43f5e`, `#94a3b8`).
- Card shell: `bg-[#0a0a0a]` border `#1f1f1f`, hover border accent at 30% alpha, soft accent glow.
- Typography: `font-display` for titles, `font-mono` for labels/badges (matches current memory).

## Out of scope
- No content/copy changes beyond what fits the new layout.
- No changes to other sections (Hero, Projects, Terminal, Footer, Dock).
