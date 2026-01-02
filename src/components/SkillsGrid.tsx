import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SkillCardProps {
  title: string;
  items: string[];
  index: number;
}

const SkillCard = ({ title, items, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative group cursor-default perspective-1000"
    >
      <div className="glass-card rounded-2xl p-8 md:p-10 h-full transition-heavy hover:glow-subtle">
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="text-[10px] font-mono text-titanium tracking-[0.3em] uppercase">
              {title}
            </h3>
          </div>

          <div className="space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + i * 0.05 }}
                className="flex items-center gap-3 text-foreground/80 font-light"
              >
                <span className="text-primary text-xs">→</span>
                <span className="text-sm md:text-base">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const skills = [
  {
    title: 'Core Programming',
    items: ['Python & Go', 'TypeScript/JavaScript', 'Rust & Systems', 'Clean Architecture'],
  },
  {
    title: 'Cloud Infrastructure',
    items: ['AWS & GCP & Azure', 'Kubernetes & Docker', 'Terraform & Pulumi', 'Serverless Patterns'],
  },
  {
    title: 'AI/ML Systems',
    items: ['LLM Integration', 'MLOps Pipelines', 'Vector Databases', 'Model Optimization'],
  },
  {
    title: 'Architectural Automation',
    items: ['CI/CD Workflows', 'Infrastructure as Code', 'GitOps Practices', 'Platform Engineering'],
  },
];

export const SkillsGrid = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-[10px] font-mono text-titanium tracking-[0.3em] uppercase mb-4">
            Technical Expertise
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient">
            Capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} {...skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
