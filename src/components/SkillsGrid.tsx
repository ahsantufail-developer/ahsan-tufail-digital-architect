import { motion } from 'framer-motion';
import { Brain, Cloud, Layers, Server, Database, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Shared easing curve used throughout this section
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ── Data ──────────────────────────────────────────────────────────────────────

interface SkillCard {
  id: string;
  icon: LucideIcon;
  accent: string;
  label: string;
  title: string;
  description: string;
  badges: string[];
}

const skillCards: SkillCard[] = [
  {
    id: 'ai',
    icon: Brain,
    accent: '#6366f1',
    label: 'AI & LLM',
    title: 'Intelligent Agents & Pipelines',
    description:
      'Design and deployment of performant RAG systems and autonomous AI Agents — from vector embeddings to multi-step agentic workflows with tool use.',
    badges: ['RAG Systems', 'AI Agents', 'n8n Automation', 'MCP Servers', 'Prompt Engineering', 'OpenAI API', 'Anthropic API'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    accent: '#22d3ee',
    label: 'Cloud & DevOps',
    title: 'Resilient Cloud Infrastructure',
    description:
      'Orchestrate cloud environments and CI/CD pipelines — from containerised Docker deployments on AWS EC2 to edge delivery via Cloudflare Tunnel.',
    badges: ['AWS EC2', 'Docker', 'Cloudflare Tunnel', 'Vercel', 'CI/CD Pipelines', 'GitHub Actions', 'Google Cloud'],
  },
  {
    id: 'frontend',
    icon: Layers,
    accent: '#f59e0b',
    label: 'Frontend',
    title: 'Polished User Interfaces',
    description:
      'Building pixel-perfect, animated interfaces using React and Next.js — converting Figma designs into production-ready responsive UIs.',
    badges: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Figma → Code', 'TypeScript', 'Vite'],
  },
  {
    id: 'backend',
    icon: Server,
    accent: '#22c55e',
    label: 'Backend & APIs',
    title: 'Scalable API Architecture',
    description:
      'Robust Node.js and Express APIs with rate limiting, authentication, and RESTful design patterns engineered for production scale.',
    badges: ['Node.js', 'Express', 'REST APIs', 'Rate Limiting', 'JWT Auth', 'OAuth 2.0', 'Middleware'],
  },
  {
    id: 'databases',
    icon: Database,
    accent: '#f43f5e',
    label: 'Databases',
    title: 'Data Storage & Retrieval',
    description:
      'Combining relational, vector, and in-memory databases — Supabase for persistence and real-time subscriptions, Redis for blazing-fast caching.',
    badges: ['Supabase', 'PostgreSQL', 'Vector Store', 'Redis Cache', 'Row-Level Security', 'Realtime'],
  },
  {
    id: 'tooling',
    icon: Wrench,
    accent: '#94a3b8',
    label: 'Tooling & Workflow',
    title: 'Developer Toolchain',
    description:
      'End-to-end developer workflow from version control to AI-assisted coding — the tools that keep systems fast, consistent, and reliable.',
    badges: ['Git & GitHub', 'VS Code', 'Cursor AI', 'n8n Automation', 'ESLint', 'TypeScript', 'Postman'],
  },
];

// ── Badge palette keyed by accent colour ────────────────────────────────────

const badgePalette: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  '#6366f1': { dot: '#6366f1', bg: 'rgba(99,102,241,0.06)',  text: '#a5b4fc', border: 'rgba(99,102,241,0.18)' },
  '#22d3ee': { dot: '#22d3ee', bg: 'rgba(34,211,238,0.06)',  text: '#67e8f9', border: 'rgba(34,211,238,0.18)' },
  '#f59e0b': { dot: '#f59e0b', bg: 'rgba(245,158,11,0.06)',  text: '#fcd34d', border: 'rgba(245,158,11,0.18)' },
  '#22c55e': { dot: '#22c55e', bg: 'rgba(34,197,94,0.06)',   text: '#86efac', border: 'rgba(34,197,94,0.18)'  },
  '#f43f5e': { dot: '#f43f5e', bg: 'rgba(244,63,94,0.06)',   text: '#fda4af', border: 'rgba(244,63,94,0.18)'  },
  '#94a3b8': { dot: '#94a3b8', bg: 'rgba(148,163,184,0.06)', text: '#cbd5e1', border: 'rgba(148,163,184,0.18)' },
};

// ── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

// ── Component ────────────────────────────────────────────────────────────────

export const SkillsGrid = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Dual ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-[#6366f1] opacity-[0.055] blur-[130px]" />
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-[#22d3ee] opacity-[0.045] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mb-16 md:mb-20"
        >
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 mb-5 text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-[#6366f1] border border-[#6366f1]/25 bg-[#6366f1]/[0.06] rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            Technical Stack
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-foreground leading-[1.05] mb-5">
            Skills that build{' '}
            <span
              style={{
                background: 'linear-gradient(130deg, #6366f1 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              real things
            </span>
          </h2>

          <p className="text-[#64748b] font-mono text-sm leading-relaxed max-w-xl">
            A full-spectrum engineering toolkit spanning AI pipelines, cloud infrastructure,
            modern interfaces, and the automation layer that connects them all.
          </p>
        </motion.div>

        {/* ── 3×2 Card grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCards.map((card) => {
            const Icon = card.icon;
            const palette = badgePalette[card.accent];

            return (
              <SkillCardItem key={card.id} card={card} Icon={Icon} palette={palette} />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ── Individual card ──────────────────────────────────────────────────────────

interface PaletteEntry { dot: string; bg: string; text: string; border: string; }

const SkillCardItem = ({
  card,
  Icon,
  palette,
}: {
  card: SkillCard;
  Icon: LucideIcon;
  palette: PaletteEntry;
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        borderColor: `${card.accent}38`,
        boxShadow: `0 0 36px ${card.accent}10, 0 8px 40px rgba(0,0,0,0.45)`,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      className="group relative rounded-2xl bg-[#0f0f0f] border border-[#1c1c1c] p-7 flex flex-col gap-5 cursor-default overflow-hidden"
    >
      {/* Corner glow that appears on hover */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
        style={{ background: card.accent }}
      />

      {/* Icon + label row */}
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `${card.accent}12`,
            border: `1px solid ${card.accent}30`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: card.accent }} strokeWidth={1.8} />
        </div>
        <span
          className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em]"
          style={{ color: card.accent }}
        >
          {card.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-[21px] font-bold text-foreground leading-snug -mt-1">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] font-mono text-[#5c6b80] leading-[1.78] -mt-2 flex-1">
        {card.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {card.badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono rounded-full px-2.5 py-1"
            style={{
              background: palette.bg,
              color: palette.text,
              border: `1px solid ${palette.border}`,
            }}
          >
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: palette.dot }}
            />
            {badge}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
