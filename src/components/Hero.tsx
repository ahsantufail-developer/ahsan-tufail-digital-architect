import { motion } from 'framer-motion';
import profileImage from '@/assets/ahsan-profile.png';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-24 py-32 lg:py-40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-obsidian-light opacity-50" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--titanium)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--titanium)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-12 lg:mb-16"
        >
          — 001 · Portfolio
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 lg:space-y-10 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[6vw] leading-[0.85] tracking-tight text-gradient"
            >
              AHSAN
              <br />
              TUFAIL
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed"
            >
              Engineering robust systems at the intersection of cloud infrastructure,
              artificial intelligence, and architectural automation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex-shrink-0 w-[220px] h-[270px] sm:w-[280px] sm:h-[340px] md:w-[340px] md:h-[420px] lg:w-[400px] lg:h-[480px] relative"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.08]">
              <img
                src={profileImage}
                alt="Ahsan Tufail"
                className="w-full h-full object-cover object-top scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-titanium to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};
