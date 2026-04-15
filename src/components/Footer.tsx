import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/ahsantufail-developer' },
  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://linkedin.com/in/ahsantufail-dev' },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:ahsantufail6677@gmail.com' },
  { icon: <Phone className="w-5 h-5" />, label: '+92 327 6392069', href: 'tel:+923276392069' },
];

export const Footer = () => {
  return (
    <footer id="contact" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-[10px] font-mono text-titanium tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient mb-6">
            Let's Build<br />Something Great
          </h2>
          <p className="max-w-xl text-muted-foreground font-light">
            Open to discussing new projects, creative ideas, or opportunities 
            to be part of your vision.
          </p>
        </motion.div>

        <motion.a
          href="mailto:ahsantufail6677@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-4 group mb-16"
        >
          <span className="text-2xl md:text-4xl font-display text-foreground group-hover:text-primary transition-colors duration-300">
            ahsantufail6677@gmail.com
          </span>
          <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-primary transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 px-5 py-3 rounded-lg glass-card hover:glow-subtle hover:border-primary/50 transition-all duration-300 group"
            >
              <span className="text-titanium group-hover:text-primary transition-colors">
                {link.icon}
              </span>
              <span className="text-sm font-mono text-foreground/80 group-hover:text-foreground transition-colors">
                {link.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 pt-8 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>© {new Date().getFullYear()} Ahsan Tufail. All rights reserved.</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary status-pulse" />
              Available for new projects
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
