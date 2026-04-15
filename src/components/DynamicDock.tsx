import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Home, Code, Briefcase, Brain, Cloud, Mail } from 'lucide-react';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  mouseX: any;
  index: number;
}

const DockItem = ({ icon, label, href, mouseX, index }: DockItemProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      style={{ width }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative aspect-square flex items-center justify-center rounded-xl bg-obsidian-light/80 border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
    >
      <div className="text-titanium group-hover:text-primary transition-colors duration-300">
        {icon}
      </div>

      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.a>
  );
};

const dockItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', href: '#hero' },
  { icon: <Code className="w-5 h-5" />, label: 'Skills', href: '#skills' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Projects', href: '#projects' },
  { icon: <Brain className="w-5 h-5" />, label: 'AI Terminal', href: '#terminal' },
  { icon: <Cloud className="w-5 h-5" />, label: 'Infrastructure', href: '#cloud' },
  { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '#contact' },
];

export const DynamicDock = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 px-4 py-3 rounded-2xl glass-card"
      >
        {dockItems.map((item, index) => (
          <DockItem key={item.label} {...item} mouseX={mouseX} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};
