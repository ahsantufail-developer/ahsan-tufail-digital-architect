import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const systemMetrics = [
  { label: 'CLOUD UPTIME', value: '99.99%', status: 'operational' },
  { label: 'DEPLOYMENTS', value: '2,847', status: 'active' },
  { label: 'API LATENCY', value: '12ms', status: 'optimal' },
  { label: 'AI MODELS', value: '24', status: 'running' },
  { label: 'CONTAINERS', value: '156', status: 'healthy' },
  { label: 'PIPELINES', value: '89', status: 'active' },
];

export const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
        {/* System Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-2">
            <span className="w-2 h-2 rounded-full bg-primary status-pulse" />
            <span>SYSTEM STATUS: ALL OPERATIONAL</span>
            <span className="ml-auto">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <div className="space-y-6 md:space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-sm md:text-base font-mono text-titanium tracking-[0.3em] uppercase"
          >
            Programming · Cloud · AI · Automation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight text-gradient"
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

        {/* System Metrics Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 md:mt-32 overflow-hidden"
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex animate-ticker">
              {[...systemMetrics, ...systemMetrics].map((metric, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 px-8 md:px-12 py-4 border-r border-border/30"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
                      {metric.label}
                    </span>
                  </div>
                  <span className="text-xl md:text-2xl font-mono text-foreground font-medium">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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
