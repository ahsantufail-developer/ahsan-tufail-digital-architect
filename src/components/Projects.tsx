import { motion } from 'framer-motion';
import ProjectCardAgen from './ProjectCardAgen';
import ProjectCardRAG from './ProjectCardRAG';
import ProjectCardMalaak from './ProjectCardMalaak';

export const Projects = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <p
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#22d3ee',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Selected Work
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCardAgen />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <ProjectCardRAG />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <ProjectCardMalaak />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

