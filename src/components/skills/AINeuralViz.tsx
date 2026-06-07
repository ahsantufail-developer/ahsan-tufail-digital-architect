import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props { hovered: boolean }

// Neural constellation: central agent core, orbit ring, satellite nodes with traveling tokens.
export const AINeuralViz = ({ hovered }: Props) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const speed = hovered ? 2.4 : 1;
    const tick = () => { setT(p => p + 0.016 * speed); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const cx = 200, cy = 140;
  const satellites = [
    { angle: 0, label: 'RAG', color: '#6366f1' },
    { angle: Math.PI * 0.33, label: 'AGENT', color: '#22d3ee' },
    { angle: Math.PI * 0.66, label: 'TOOLS', color: '#a78bfa' },
    { angle: Math.PI, label: 'EMBED', color: '#22c55e' },
    { angle: Math.PI * 1.33, label: 'MEM', color: '#f59e0b' },
    { angle: Math.PI * 1.66, label: 'LLM', color: '#f43f5e' },
  ];
  const R = 95;

  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="ai-core">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="1" />
          <stop offset="60%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <filter id="ai-glow"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="ai-soft"><feGaussianBlur stdDeviation="1.5" /></filter>
      </defs>

      {/* Orbit ring */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#6366f1" strokeOpacity="0.18" strokeDasharray="2 4" />
      <circle cx={cx} cy={cy} r={R + 18} fill="none" stroke="#22d3ee" strokeOpacity="0.08" />

      {/* Rotating tick on outer ring */}
      <circle
        cx={cx + (R + 18) * Math.cos(t * 0.6)}
        cy={cy + (R + 18) * Math.sin(t * 0.6)}
        r="2" fill="#22d3ee"
      />

      {/* Connection lines + traveling tokens */}
      {satellites.map((s, i) => {
        const sx = cx + R * Math.cos(s.angle + t * 0.15);
        const sy = cy + R * Math.sin(s.angle + t * 0.15);
        const p = ((t * 0.4) + i * 0.18) % 1;
        const tx = cx + (sx - cx) * p;
        const ty = cy + (sy - cy) * p;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={s.color} strokeOpacity="0.25" strokeWidth="1" />
            <circle cx={tx} cy={ty} r="2.5" fill={s.color} filter="url(#ai-soft)" opacity={0.9} />
            <g>
              <circle cx={sx} cy={sy} r={9 + Math.sin(t * 2 + i) * 1.5}
                fill="#0a0a0a" stroke={s.color} strokeWidth="1.4" filter="url(#ai-soft)" />
              <text x={sx} y={sy + 2.5} textAnchor="middle"
                style={{ fontSize: 6.5, fontFamily: 'JetBrains Mono', fill: s.color, fontWeight: 600 }}>
                {s.label}
              </text>
            </g>
          </g>
        );
      })}

      {/* Central core */}
      <circle cx={cx} cy={cy} r={36 + Math.sin(t * 1.5) * 3} fill="url(#ai-core)" />
      <circle cx={cx} cy={cy} r="22" fill="#0a0a0a" stroke="#6366f1" strokeWidth="1.5" filter="url(#ai-glow)" />
      <circle cx={cx} cy={cy} r="14" fill="none" stroke="#a5b4fc" strokeOpacity="0.6"
        strokeDasharray="3 3" transform={`rotate(${t * 30} ${cx} ${cy})`} />
      <text x={cx} y={cy + 3} textAnchor="middle"
        style={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: '#fff', fontWeight: 700, letterSpacing: 1 }}>
        AGENT
      </text>

      {/* Status pill */}
      <g transform="translate(14, 14)">
        <rect width="78" height="18" rx="9" fill="#0a0a0a" stroke="#6366f1" strokeOpacity="0.3" />
        <circle cx="10" cy="9" r="3" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <text x="20" y="12" style={{ fontSize: 7.5, fontFamily: 'JetBrains Mono', fill: '#a5b4fc' }}>
          INFERENCE · {(420 + Math.sin(t) * 30).toFixed(0)}ms
        </text>
      </g>

      {/* Token counter */}
      <g transform="translate(310, 14)">
        <rect width="76" height="18" rx="9" fill="#0a0a0a" stroke="#22d3ee" strokeOpacity="0.3" />
        <text x="38" y="12" textAnchor="middle"
          style={{ fontSize: 7.5, fontFamily: 'JetBrains Mono', fill: '#67e8f9' }}>
          {Math.floor(1240 + t * 7)} tok
        </text>
      </g>
    </svg>
  );
};
