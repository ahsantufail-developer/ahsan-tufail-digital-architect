import { useEffect, useState } from 'react';

interface Props { hovered: boolean }

// Stacked data strata with vertical query beams.
export const DatabasesViz = ({ hovered }: Props) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const speed = hovered ? 2.2 : 1;
    const tick = () => { setT(p => p + 0.016 * speed); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const layers = [
    { y: 60, label: 'POSTGRES', sub: 'relational', color: '#f43f5e', count: 18402 },
    { y: 120, label: 'VECTOR', sub: 'pgvector · 1536d', color: '#a78bfa', count: 16410 },
    { y: 180, label: 'REDIS', sub: 'cache · LRU', color: '#22d3ee', count: 4096 },
  ];

  return (
    <svg viewBox="0 0 280 260" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="db-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
          <stop offset="50%" stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
        <filter id="db-glow"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      {/* Query beams */}
      {[60, 140, 210].map((x, i) => {
        const phase = (t * 0.7 + i * 0.5) % 2;
        const y = 30 + phase * 100;
        return (
          <rect key={i} x={x - 1.5} y={y} width="3" height="60" fill="url(#db-beam)" opacity="0.8" />
        );
      })}

      {/* Layer slabs */}
      {layers.map((l, i) => (
        <g key={i}>
          {/* slab body */}
          <rect x="20" y={l.y} width="240" height="36" rx="6"
            fill="#0a0a0a" stroke={l.color} strokeOpacity="0.35" strokeWidth="1" />
          {/* accent edge */}
          <rect x="20" y={l.y} width="3" height="36" rx="1.5" fill={l.color} filter="url(#db-glow)" />
          {/* label */}
          <text x="34" y={l.y + 15}
            style={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: l.color, fontWeight: 700, letterSpacing: 1 }}>
            {l.label}
          </text>
          <text x="34" y={l.y + 27}
            style={{ fontSize: 7.5, fontFamily: 'JetBrains Mono', fill: '#64748b' }}>
            {l.sub}
          </text>
          {/* row counter dots */}
          {Array.from({ length: 14 }).map((_, j) => {
            const active = ((Math.sin(t * 1.5 + i + j * 0.4) + 1) / 2) > 0.55;
            return (
              <rect key={j} x={130 + j * 8} y={l.y + 14} width="5" height="8" rx="1"
                fill={active ? l.color : '#1f1f1f'} opacity={active ? 0.85 : 1} />
            );
          })}
          {/* row count */}
          <text x="248" y={l.y + 22} textAnchor="end"
            style={{ fontSize: 8, fontFamily: 'JetBrains Mono', fill: '#94a3b8' }}>
            {(l.count + Math.floor(t * 3)).toLocaleString()}
          </text>
        </g>
      ))}

      {/* Vertical connector spine */}
      <line x1="140" y1="42" x2="140" y2="222" stroke="#1f1f1f" strokeDasharray="2 3" />

      {/* Top label */}
      <text x="20" y="30"
        style={{ fontSize: 8, fontFamily: 'JetBrains Mono', fill: '#64748b', letterSpacing: 1.5 }}>
        STORAGE LAYERS
      </text>
      <circle cx="260" cy="27" r="3" fill="#22c55e">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};
