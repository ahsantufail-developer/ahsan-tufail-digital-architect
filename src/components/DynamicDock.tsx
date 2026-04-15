import { motion } from 'framer-motion';
import { Home, Code, Briefcase, Brain, Cloud, Mail } from 'lucide-react';
import { useState } from 'react';

const dockItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', href: '#hero' },
  { icon: <Code className="w-5 h-5" />, label: 'Skills', href: '#skills' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Projects', href: '#projects' },
  { icon: <Brain className="w-5 h-5" />, label: 'Terminal', href: '#terminal' },
  { icon: <Cloud className="w-5 h-5" />, label: 'Infrastructure', href: '#cloud' },
  { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '#contact' },
];

export const DynamicDock = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-1 px-4 py-3 rounded-2xl glass-card"
      >
        {dockItems.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.08, duration: 0.4 }}
            className="group relative flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/10 transition-colors duration-300"
          >
            <span className="text-titanium group-hover:text-primary transition-colors duration-300">
              {item.icon}
            </span>
            <motion.span
              initial={false}
              animate={{
                width: isHovered ? 'auto' : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
                delay: isHovered ? index * 0.05 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden whitespace-nowrap text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
};
