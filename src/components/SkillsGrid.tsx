import { motion } from 'framer-motion';
import AILLMCard from './AILLMCard';
import CloudDevOpsCard from './CloudDevOpsCard';
import CloudFullStackCard from './FullStackCard';

export const SkillsGrid = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Subtle radial background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(99,102,241,0.07),transparent)]" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 mb-5 text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-[#6366f1] border border-[#6366f1]/25 bg-[#6366f1]/8 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            Technical Expertise
          </div>

          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4">
            Capabilities
          </h2>

          <p className="text-[#64748b] font-mono text-sm leading-relaxed max-w-lg">
            A full-spectrum engineering toolkit — from intelligent AI pipelines and resilient
            cloud infrastructure to polished full-stack applications.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AILLMCard — spans both columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <AILLMCard />
          </motion.div>

          {/* CloudDevOps — left column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-full"
          >
            <CloudDevOpsCard />
          </motion.div>

          {/* FullStack — right column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="h-full"
          >
            <CloudFullStackCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
