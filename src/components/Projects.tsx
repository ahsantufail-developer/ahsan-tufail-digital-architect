import { motion } from 'framer-motion';
import ProjectCardAgen from './ProjectCardAgen';
import ProjectCardRAG from './ProjectCardRAG';
import ProjectCardMalaak from './ProjectCardMalaak';

export const Projects = () => {
  return (
    <section className="relative py-32 lg:py-44 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-32 max-w-3xl"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-8">
            — 003 · Selected Work
          </div>
          <h2 className="font-display text-6xl md:text-7xl lg:text-[6.5rem] font-normal text-white leading-[0.95] tracking-tight">
            Projects <em className="italic text-white/60">shipped.</em>
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

