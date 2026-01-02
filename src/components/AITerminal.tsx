import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: string;
}

const responses: Record<string, string> = {
  help: `Available commands:
  → experience    View professional experience
  → skills        List technical skills
  → projects      View notable projects
  → contact       Get contact information
  → clear         Clear terminal`,
  experience: `▸ 7+ years in software engineering
▸ Specialized in cloud architecture & AI systems
▸ Led teams of 5-20 engineers
▸ Built systems serving 10M+ users`,
  skills: `▸ Languages: Python, Go, TypeScript, Rust
▸ Cloud: AWS, GCP, Azure, Kubernetes
▸ AI/ML: LLMs, MLOps, Vector DBs
▸ DevOps: Terraform, GitOps, Platform Eng`,
  projects: `▸ Cloud-native AI platform (10M+ inferences/day)
▸ Multi-cloud infrastructure automation
▸ Real-time data processing pipelines
▸ Enterprise LLM integration systems`,
  contact: `▸ Email: hello@ahsantufail.dev
▸ LinkedIn: /in/ahsantufail
▸ GitHub: @ahsantufail`,
};

export const AITerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'AHSAN.AI Terminal v2.0' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    
    setLines(prev => [...prev, { type: 'input', content: `> ${cmd}` }]);
    
    if (command === 'clear') {
      setTimeout(() => {
        setLines([
          { type: 'system', content: 'AHSAN.AI Terminal v2.0' },
          { type: 'system', content: 'Type "help" for available commands.' },
          { type: 'output', content: '' },
        ]);
      }, 100);
      return;
    }

    const response = responses[command] || `Command not found: "${cmd}". Type "help" for available commands.`;
    
    setIsTyping(true);
    setTimeout(() => {
      setLines(prev => [...prev, { type: 'output', content: response }]);
      setIsTyping(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[10px] font-mono text-titanium tracking-[0.3em] uppercase mb-4">
            Interactive Interface
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient">
            The AI Brain
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-obsidian-light/50">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-4 text-xs font-mono text-muted-foreground">ahsan@cloud ~ query-experience</span>
          </div>

          {/* Terminal body */}
          <div 
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
            className="h-80 md:h-96 overflow-y-auto p-6 font-mono text-sm cursor-text"
          >
            {lines.map((line, i) => (
              <div 
                key={i} 
                className={`mb-2 ${
                  line.type === 'system' ? 'text-primary' :
                  line.type === 'input' ? 'text-titanium' :
                  'text-foreground/80'
                }`}
              >
                <pre className="whitespace-pre-wrap font-mono">{line.content}</pre>
              </div>
            ))}

            {isTyping && (
              <div className="text-primary">
                <span className="animate-pulse">Processing...</span>
              </div>
            )}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
                placeholder="Enter command..."
                disabled={isTyping}
              />
              <span className="w-2 h-5 bg-primary cursor-blink" />
            </form>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-4 font-mono"
        >
          Try: help, experience, skills, projects, contact
        </motion.p>
      </div>
    </section>
  );
};
