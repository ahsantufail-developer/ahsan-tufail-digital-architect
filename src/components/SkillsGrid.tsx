import { motion } from 'framer-motion';
import AILLMCard from './AILLMCard';
import CloudDevOpsCard from './CloudDevOpsCard';
import CloudFullStackCard from './FullStackCard';

export const SkillsGrid = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-[#6366f1] mb-3">
            Technical Expertise
          </p>
          <h2 className="font-display text-5xl font-bold text-foreground leading-tight">
            Capabilities
          </h2>
        </motion.div>

        {/* AILLMCard — full width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <AILLMCard />
        </motion.div>

        {/* CloudDevOps + FullStack stacked vertically, each full width */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <CloudDevOpsCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <CloudFullStackCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
