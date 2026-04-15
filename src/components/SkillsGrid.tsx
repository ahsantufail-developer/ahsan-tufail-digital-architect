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
          <p
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#6366f1',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Technical Expertise
          </p>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
              lineHeight: 1.1,
            }}
          >
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
