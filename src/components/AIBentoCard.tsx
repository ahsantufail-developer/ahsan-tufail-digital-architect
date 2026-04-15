import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated network graph for the right column
const NetworkGraph = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let raf: number;
    const speed = isHovered ? 2.5 : 1;
    const animate = () => {
      setTime(prev => prev + 0.016 * speed);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  // Node positions
  const nodes = {
    user: { x: 40, y: 60, label: 'USER INPUT' },
    docs: { x: 40, y: 180, label: 'DOCUMENTS' },
    vector: { x: 200, y: 120, label: 'VECTOR STORE' },
    agent: { x: 360, y: 120, label: 'AI AGENT' },
    chat: { x: 500, y: 120, label: 'CHAT UI' },
  };

  // Packet position along a path
  const packetProgress = (time * 0.3) % 1;
  const queryProgress = ((time * 0.3) - 0.3 + 1) % 1;
  const responseProgress = ((time * 0.3) - 0.6 + 1) % 1;

  // Interpolate position along path
  const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));

  // Performance chart data
  const chartPoints = Array.from({ length: 20 }, (_, i) => {
    const x = 10 + i * 4.5;
    const y = 25 - Math.sin((time * 0.5 + i * 0.3)) * 8 - Math.random() * 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      className="relative w-full h-full min-h-[320px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 560 280" className="w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="pathGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="pathDim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="packetGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="pulseGrad">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        {/* User -> Vector */}
        <line x1={nodes.user.x} y1={nodes.user.y} x2={nodes.vector.x} y2={nodes.vector.y}
          stroke="url(#pathDim)" strokeWidth="1.5" />
        {/* Docs -> Vector */}
        <line x1={nodes.docs.x} y1={nodes.docs.y} x2={nodes.vector.x} y2={nodes.vector.y}
          stroke="url(#pathDim)" strokeWidth="1.5" />
        {/* Vector -> Agent */}
        <line x1={nodes.vector.x} y1={nodes.vector.y} x2={nodes.agent.x} y2={nodes.agent.y}
          stroke="url(#pathDim)" strokeWidth="1.5" />
        {/* Agent -> Chat */}
        <line x1={nodes.agent.x} y1={nodes.agent.y} x2={nodes.chat.x} y2={nodes.chat.y}
          stroke="url(#pathDim)" strokeWidth="1.5" />

        {/* Animated glowing paths on top */}
        <line x1={nodes.user.x} y1={nodes.user.y} x2={nodes.vector.x} y2={nodes.vector.y}
          stroke="url(#pathGlow)" strokeWidth="2" opacity={0.3 + Math.sin(time * 2) * 0.3}
          strokeDasharray="8 4" strokeDashoffset={-time * 30} />
        <line x1={nodes.docs.x} y1={nodes.docs.y} x2={nodes.vector.x} y2={nodes.vector.y}
          stroke="url(#pathGlow)" strokeWidth="2" opacity={0.3 + Math.cos(time * 1.5) * 0.3}
          strokeDasharray="8 4" strokeDashoffset={-time * 20} />
        <line x1={nodes.vector.x} y1={nodes.vector.y} x2={nodes.agent.x} y2={nodes.agent.y}
          stroke="url(#pathGlow)" strokeWidth="2" opacity={0.3 + Math.sin(time * 1.8) * 0.3}
          strokeDasharray="8 4" strokeDashoffset={-time * 25} />
        <line x1={nodes.agent.x} y1={nodes.agent.y} x2={nodes.chat.x} y2={nodes.chat.y}
          stroke="url(#pathGlow)" strokeWidth="2" opacity={0.3 + Math.cos(time * 2.2) * 0.3}
          strokeDasharray="8 4" strokeDashoffset={-time * 35} />

        {/* Traveling packets */}
        {/* User -> Vector packet */}
        <circle
          cx={lerp(nodes.user.x, nodes.vector.x, packetProgress)}
          cy={lerp(nodes.user.y, nodes.vector.y, packetProgress)}
          r="4" fill="#22c55e" filter="url(#packetGlow)"
          opacity={packetProgress < 0.95 ? 0.9 : 0}
        />
        {/* Vector -> Agent packet */}
        <circle
          cx={lerp(nodes.vector.x, nodes.agent.x, queryProgress)}
          cy={lerp(nodes.vector.y, nodes.agent.y, queryProgress)}
          r="4" fill="#06b6d4" filter="url(#packetGlow)"
          opacity={queryProgress < 0.95 ? 0.9 : 0}
        />
        {/* Agent -> Chat packet */}
        <circle
          cx={lerp(nodes.agent.x, nodes.chat.x, responseProgress)}
          cy={lerp(nodes.agent.y, nodes.chat.y, responseProgress)}
          r="3.5" fill="#a78bfa" filter="url(#packetGlow)"
          opacity={responseProgress < 0.95 ? 0.9 : 0}
        />
        {/* Docs -> Vector packet */}
        <circle
          cx={lerp(nodes.docs.x, nodes.vector.x, (packetProgress + 0.5) % 1)}
          cy={lerp(nodes.docs.y, nodes.vector.y, (packetProgress + 0.5) % 1)}
          r="3" fill="#22c55e" filter="url(#packetGlow)"
          opacity={((packetProgress + 0.5) % 1) < 0.95 ? 0.7 : 0}
        />

        {/* USER INPUT node */}
        <g>
          <circle cx={nodes.user.x} cy={nodes.user.y} r={14 + Math.sin(time * 3) * 2}
            fill="url(#pulseGrad)" />
          <circle cx={nodes.user.x} cy={nodes.user.y} r="8"
            fill="hsl(var(--obsidian-light))" stroke="#22c55e" strokeWidth="1.5" filter="url(#nodeGlow)" />
          <text x={nodes.user.x} y={nodes.user.y - 20} textAnchor="middle"
            className="fill-foreground/70" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>
            USER INPUT
          </text>
        </g>

        {/* DOCUMENTS node */}
        <g>
          <rect x={nodes.docs.x - 10} y={nodes.docs.y - 10} width="20" height="20" rx="3"
            fill="hsl(var(--obsidian-light))" stroke="hsl(var(--border))" strokeWidth="1" />
          {/* Doc icon lines */}
          <line x1={nodes.docs.x - 5} y1={nodes.docs.y - 4} x2={nodes.docs.x + 5} y2={nodes.docs.y - 4}
            stroke="hsl(var(--titanium))" strokeWidth="1" opacity="0.5" />
          <line x1={nodes.docs.x - 5} y1={nodes.docs.y} x2={nodes.docs.x + 5} y2={nodes.docs.y}
            stroke="hsl(var(--titanium))" strokeWidth="1" opacity="0.5" />
          <line x1={nodes.docs.x - 5} y1={nodes.docs.y + 4} x2={nodes.docs.x + 3} y2={nodes.docs.y + 4}
            stroke="hsl(var(--titanium))" strokeWidth="1" opacity="0.5" />
          <text x={nodes.docs.x} y={nodes.docs.y + 28} textAnchor="middle"
            className="fill-foreground/70" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>
            DOCUMENTS
          </text>
        </g>

        {/* VECTOR STORE node */}
        <g>
          <circle cx={nodes.vector.x} cy={nodes.vector.y} r={18 + Math.sin(time * 2) * 1.5}
            fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3" />
          <rect x={nodes.vector.x - 14} y={nodes.vector.y - 14} width="28" height="28" rx="6"
            fill="hsl(var(--obsidian-light))" stroke="#06b6d4" strokeWidth="1.5" filter="url(#nodeGlow)" />
          {/* DB icon */}
          <ellipse cx={nodes.vector.x} cy={nodes.vector.y - 4} rx="7" ry="3"
            fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          <line x1={nodes.vector.x - 7} y1={nodes.vector.y - 4} x2={nodes.vector.x - 7} y2={nodes.vector.y + 4}
            stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          <line x1={nodes.vector.x + 7} y1={nodes.vector.y - 4} x2={nodes.vector.x + 7} y2={nodes.vector.y + 4}
            stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          <ellipse cx={nodes.vector.x} cy={nodes.vector.y + 4} rx="7" ry="3"
            fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          <text x={nodes.vector.x} y={nodes.vector.y - 24} textAnchor="middle"
            className="fill-foreground/80" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', fontWeight: 500 }}>
            VECTOR STORE
          </text>
          <text x={nodes.vector.x} y={nodes.vector.y - 15} textAnchor="middle"
            style={{ fontSize: '6px', fontFamily: 'JetBrains Mono', fill: '#06b6d4', opacity: 0.6 }}>
            (Supabase)
          </text>
        </g>

        {/* AI AGENT node */}
        <g>
          <circle cx={nodes.agent.x} cy={nodes.agent.y} r={16 + Math.sin(time * 2.5) * 1}
            fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.3" />
          <circle cx={nodes.agent.x} cy={nodes.agent.y} r="12"
            fill="hsl(var(--obsidian-light))" stroke="#a78bfa" strokeWidth="1.5" filter="url(#nodeGlow)" />
          {/* Brain/AI icon */}
          <text x={nodes.agent.x} y={nodes.agent.y + 3} textAnchor="middle"
            style={{ fontSize: '10px' }}>🧠</text>
          <text x={nodes.agent.x} y={nodes.agent.y - 20} textAnchor="middle"
            className="fill-foreground/80" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', fontWeight: 500 }}>
            AI AGENT
          </text>
        </g>

        {/* CHAT UI node */}
        <g>
          <rect x={nodes.chat.x - 30} y={nodes.chat.y - 28} width="60" height="56" rx="6"
            fill="hsl(var(--obsidian-light))" stroke="hsl(var(--border))" strokeWidth="1" />
          {/* JSON-like animated text */}
          <text x={nodes.chat.x - 22} y={nodes.chat.y - 14}
            style={{ fontSize: '6px', fontFamily: 'JetBrains Mono', fill: '#a78bfa', opacity: 0.8 }}>
            {'{ "response":'}
          </text>
          <text x={nodes.chat.x - 22} y={nodes.chat.y - 4}
            style={{ fontSize: '6px', fontFamily: 'JetBrains Mono', fill: '#22c55e' }}
            opacity={0.5 + Math.sin(time * 3) * 0.3}>
            {`  "data": [`}
          </text>
          <text x={nodes.chat.x - 22} y={nodes.chat.y + 6}
            style={{ fontSize: '6px', fontFamily: 'JetBrains Mono', fill: '#06b6d4' }}
            opacity={0.5 + Math.cos(time * 2.5) * 0.3}>
            {'    { "id": 1 }'}
          </text>
          <text x={nodes.chat.x - 22} y={nodes.chat.y + 16}
            style={{ fontSize: '6px', fontFamily: 'JetBrains Mono', fill: '#a78bfa' }}
            opacity={0.5 + Math.sin(time * 2) * 0.3}>
            {'  ] }'}
          </text>
          <text x={nodes.chat.x} y={nodes.chat.y - 36} textAnchor="middle"
            className="fill-foreground/80" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', fontWeight: 500 }}>
            CHAT UI
          </text>
        </g>

        {/* Query Performance mini chart */}
        <g transform="translate(430, 200)">
          <rect x="0" y="0" width="110" height="55" rx="6"
            fill="hsl(var(--obsidian-light))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.8" />
          <text x="8" y="14"
            style={{ fontSize: '6px', fontFamily: 'JetBrains Mono', fill: 'hsl(var(--titanium))', opacity: 0.7 }}>
            Query Performance
          </text>
          <polyline
            points={chartPoints}
            fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.7"
            strokeLinejoin="round" strokeLinecap="round"
          />
          {/* Chart baseline */}
          <line x1="10" y1="45" x2="100" y2="45" stroke="hsl(var(--border))" strokeWidth="0.5" />
          <text x="8" y="52"
            style={{ fontSize: '5px', fontFamily: 'JetBrains Mono', fill: '#22c55e', opacity: 0.6 }}>
            avg: {(12 + Math.sin(time) * 3).toFixed(1)}ms
          </text>
          <text x="70" y="52"
            style={{ fontSize: '5px', fontFamily: 'JetBrains Mono', fill: '#06b6d4', opacity: 0.6 }}>
            ↑ {isHovered ? '2.5x' : '1.0x'}
          </text>
        </g>
      </svg>

      {/* Hover indicator */}
      {isHovered && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 status-pulse" />
          <span className="text-[9px] font-mono text-muted-foreground">LIVE · {isHovered ? '2.5x' : '1.0x'}</span>
        </div>
      )}
    </div>
  );
};

export const AIBentoCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const tags = ['RAG Systems', 'AI Agents', 'n8n Automation', 'MCP', 'Prompt Engineering'];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="perspective-1000"
    >
      <div className="glass-card rounded-2xl p-8 md:p-12 transition-heavy hover:glow-subtle relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Text */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-mono text-titanium tracking-[0.3em] uppercase">
                Primary Expertise
              </span>
            </div>

            <h3 className="font-mono text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-6 leading-tight">
              AI & LLM<br />Architectures
            </h3>

            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-8">
              Design and deployment of performant RAG systems and autonomous AI Agents for complex
              text-based and visual data, utilising techniques like prompt engineering and vector databases.
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider
                    border border-border/50 text-muted-foreground
                    hover:border-primary/40 hover:text-primary transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right Column - Animated Network Graph */}
          <div className="relative">
            <NetworkGraph />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
