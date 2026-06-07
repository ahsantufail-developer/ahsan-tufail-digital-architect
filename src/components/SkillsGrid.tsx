import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, ReactNode } from 'react';
import { AINeuralViz } from './skills/AINeuralViz';
import { DatabasesViz } from './skills/DatabasesViz';
import { CloudOrbitViz } from './skills/CloudOrbitViz';
import { FrontendLayersViz } from './skills/FrontendLayersViz';
import { BackendPulseViz } from './skills/BackendPulseViz';
import { ToolingRailViz } from './skills/ToolingRailViz';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Shared card shell ────────────────────────────────────────────────────────

interface ShellProps {
  accent: string;
  label: string;
  title: string;
  description: string;
  badges: string[];
  viz: (hovered: boolean) => ReactNode;
  className?: string;
  vizClassName?: string;
  layout?: 'stacked' | 'split' | 'rail';
  tilt?: boolean;
  delay?: number;
}

const Card = ({
  accent, label, title, description, badges, viz,
  className = '', vizClassName = '', layout = 'stacked', tilt = false, delay = 0,
}: ShellProps) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 250, damping: 25 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 250, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      onMouseMove={handleMove}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1200 } : undefined}
      className={`group relative rounded-2xl bg-[#0a0a0a] border border-[#1c1c1c] overflow-hidden
        transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* hover border tint */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}55, 0 24px 60px -20px ${accent}30` }}
      />
      {/* corner glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-700"
        style={{ background: accent }}
      />

      <div className={`relative h-full ${
        layout === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 p-7 lg:p-9' :
        layout === 'rail' ? 'flex flex-col gap-5 p-7 lg:p-9' :
        'flex flex-col gap-5 p-7'
      }`}>
        {/* Text column */}
        <div className="flex flex-col gap-4 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em]"
              style={{ color: accent }}>
              {label}
            </span>
          </div>
          <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-foreground leading-[1.15]">
            {title}
          </h3>
          <p className="text-[12.5px] font-mono text-[#5c6b80] leading-[1.75]">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {badges.map(b => (
              <span key={b}
                className="text-[10px] font-mono rounded-full px-2 py-0.5 border"
                style={{
                  color: `${accent}cc`,
                  borderColor: `${accent}30`,
                  background: `${accent}08`,
                }}>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Visualization */}
        <div className={`relative ${vizClassName || (layout === 'rail' ? 'h-[170px]' : 'h-[240px]')}`}>
          {viz(hovered)}
        </div>
      </div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

export const SkillsGrid = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-[#6366f1] opacity-[0.055] blur-[130px]" />
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-[#22d3ee] opacity-[0.045] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5 text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-[#6366f1] border border-[#6366f1]/25 bg-[#6366f1]/[0.06] rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            Technical Stack
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-foreground leading-[1.05] mb-5">
            Skills that build{' '}
            <span style={{
              background: 'linear-gradient(130deg, #6366f1 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              real things
            </span>
          </h2>

          <p className="text-[#64748b] font-mono text-sm leading-relaxed max-w-xl">
            A full-spectrum engineering toolkit spanning AI pipelines, cloud infrastructure,
            modern interfaces, and the automation layer that connects them all.
          </p>
        </motion.div>

        {/* Bento grid — 12 col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-min">
          {/* AI featured */}
          <div className="lg:col-span-8">
            <Card
              accent="#6366f1"
              label="AI & LLM · Primary"
              title="Intelligent agents that ship to production"
              description="Performant RAG pipelines, autonomous agents, and tool-use workflows — from vector embeddings to multi-step reasoning with live tool calls."
              badges={['RAG', 'Agents', 'n8n', 'MCP', 'OpenAI', 'Anthropic', 'Prompt Eng']}
              viz={(h) => <AINeuralViz hovered={h} />}
              layout="split"
              tilt
              vizClassName="h-[280px]"
            />
          </div>

          {/* Databases */}
          <div className="lg:col-span-4">
            <Card
              accent="#f43f5e"
              label="Databases"
              title="Storage tuned for speed"
              description="Relational, vector, and in-memory layers working in concert — Supabase, pgvector, Redis."
              badges={['Postgres', 'pgvector', 'Redis', 'RLS']}
              viz={(h) => <DatabasesViz hovered={h} />}
              delay={0.05}
            />
          </div>

          {/* Cloud */}
          <div className="lg:col-span-4">
            <Card
              accent="#22d3ee"
              label="Cloud & DevOps"
              title="Edge-delivered, always on"
              description="Docker on EC2, Vercel previews, Cloudflare tunnels and CI/CD that ships green."
              badges={['AWS', 'Docker', 'Cloudflare', 'CI/CD']}
              viz={(h) => <CloudOrbitViz hovered={h} />}
              delay={0.1}
            />
          </div>

          {/* Frontend */}
          <div className="lg:col-span-4">
            <Card
              accent="#f59e0b"
              label="Frontend"
              title="Interfaces with weight"
              description="React / Next.js / Tailwind / Motion — Figma to production-grade UI, pixel and frame perfect."
              badges={['React', 'Next.js', 'Tailwind', 'Motion', 'TS']}
              viz={(h) => <FrontendLayersViz hovered={h} />}
              delay={0.15}
            />
          </div>

          {/* Backend */}
          <div className="lg:col-span-4">
            <Card
              accent="#22c55e"
              label="Backend & APIs"
              title="APIs that hold under load"
              description="Node / Express, JWT & OAuth, rate-limiting and RESTful patterns engineered for scale."
              badges={['Node', 'Express', 'JWT', 'OAuth', 'REST']}
              viz={(h) => <BackendPulseViz hovered={h} />}
              delay={0.2}
            />
          </div>

          {/* Tooling — full width */}
          <div className="lg:col-span-12">
            <Card
              accent="#94a3b8"
              label="Tooling & Workflow"
              title="Idea to ship, no friction"
              description="A toolchain tuned for velocity — version control, AI-assisted authoring, workflow automation, deploy, and observability in one continuous rail."
              badges={['Git', 'VS Code', 'Cursor', 'n8n', 'GitHub Actions', 'Postman']}
              viz={(h) => <ToolingRailViz hovered={h} />}
              layout="rail"
              vizClassName="h-[180px]"
              delay={0.1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
