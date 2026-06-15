import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { AINeuralViz } from './skills/AINeuralViz';
import { DatabasesViz } from './skills/DatabasesViz';
import { CloudOrbitViz } from './skills/CloudOrbitViz';
import { FrontendLayersViz } from './skills/FrontendLayersViz';
import { BackendPulseViz } from './skills/BackendPulseViz';
import { ToolingRailViz } from './skills/ToolingRailViz';

const EASE = [0.16, 1, 0.3, 1] as const;

interface CardProps {
  index: string;
  title: string;
  caption: string;
  viz: (hovered: boolean) => ReactNode;
  className?: string;
  vizHeight?: string;
  delay?: number;
  large?: boolean;
}

const Card = ({ index, title, caption, viz, className = '', vizHeight = 'h-[260px]', delay = 0, large = false }: CardProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-3xl bg-[#0a0a0a] border border-white/[0.06] overflow-hidden
        transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1 ${className}`}
    >
      {/* subtle hover halo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-white/[0.025] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex flex-col h-full">
        {/* Visualization — dominant */}
        <div className={`relative ${vizHeight} ${large ? 'lg:h-[420px]' : ''} w-full overflow-hidden`}>
          {viz(hovered)}
        </div>

        {/* Hairline divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Minimal text — lots of breathing room */}
        <div className="flex items-end justify-between gap-6 px-8 lg:px-10 py-8 lg:py-10">
          <div className="min-w-0">
            <h3 className={`font-display ${large ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'} font-normal text-white/95 leading-[1.1] tracking-tight`}>
              {title}
            </h3>
            <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.22em] text-white/30">
              {caption}
            </p>
          </div>
          <span className="shrink-0 text-[10px] font-mono text-white/25 tabular-nums tracking-widest">
            {index}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsGrid = () => {
  return (
    <section className="relative py-32 lg:py-44 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto relative">
        {/* Header — minimal, spacious */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-20 lg:mb-32 max-w-3xl"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-8">
            — 002 · Capabilities
          </div>
          <h2 className="font-display text-6xl md:text-7xl lg:text-[6.5rem] font-normal text-white leading-[0.95] tracking-tight">
            Built to <em className="italic text-white/60">ship.</em>
          </h2>
        </motion.div>

        {/* Bento — quieter grid, more air */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-6">
          {/* AI — hero */}
          <div className="lg:col-span-6">
            <Card
              index="01"
              title="Intelligent agents."
              caption="AI · RAG · Agents"
              viz={(h) => <AINeuralViz hovered={h} />}
              large
            />
          </div>

          {/* Cloud */}
          <div className="lg:col-span-3">
            <Card
              index="02"
              title="Edge delivered."
              caption="Cloud · DevOps"
              viz={(h) => <CloudOrbitViz hovered={h} />}
              delay={0.05}
            />
          </div>

          {/* Databases */}
          <div className="lg:col-span-3">
            <Card
              index="03"
              title="Storage, tuned."
              caption="Postgres · Vector · Redis"
              viz={(h) => <DatabasesViz hovered={h} />}
              delay={0.1}
            />
          </div>

          {/* Frontend */}
          <div className="lg:col-span-3">
            <Card
              index="04"
              title="Interfaces with weight."
              caption="React · Motion"
              viz={(h) => <FrontendLayersViz hovered={h} />}
              delay={0.15}
            />
          </div>

          {/* Backend */}
          <div className="lg:col-span-3">
            <Card
              index="05"
              title="APIs that hold."
              caption="Node · Auth · REST"
              viz={(h) => <BackendPulseViz hovered={h} />}
              delay={0.2}
            />
          </div>

          {/* Tooling */}
          <div className="lg:col-span-6">
            <Card
              index="06"
              title="Idea to ship."
              caption="Toolchain · Workflow"
              viz={(h) => <ToolingRailViz hovered={h} />}
              vizHeight="h-[200px] lg:h-[240px]"
              delay={0.1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
