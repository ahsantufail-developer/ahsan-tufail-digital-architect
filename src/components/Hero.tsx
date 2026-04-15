import { motion } from 'framer-motion';
import profileImage from '@/assets/ahsan-profile.png';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-obsidian-light opacity-50" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--titanium)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--titanium)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8">

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-[14vw] md:text-[10vw] lg:text-[6vw] leading-[0.85] tracking-tight text-gradient"
            >
              AHSAN
              <br />
              TUFAIL
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="max-w-xl text-base md:text-lg text-muted-foreground font-light leading-relaxed"
            >
              Engineering robust systems at the intersection of cloud infrastructure, 
              artificial intelligence, and architectural automation.
            </motion.p>
          </div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex-shrink-0 w-[280px] h-[340px] md:w-[340px] md:h-[420px] lg:w-[400px] lg:h-[480px] relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-3xl scale-110" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/30">
              <img
                src={profileImage}
                alt="Ahsan Tufail"
                className="w-full h-full object-cover object-top scale-105"
              />
              {/* Bottom fade to crop effect */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
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
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-titanium to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};
