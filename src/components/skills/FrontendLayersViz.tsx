import { motion } from 'framer-motion';

interface Props { hovered: boolean }

// Isometric exploded stack: Markup / Styles / Motion / Pixels
export const FrontendLayersViz = ({ hovered }: Props) => {
  const layers = [
    { label: 'PIXELS', color: '#f59e0b', y: 200 },
    { label: 'MOTION', color: '#a78bfa', y: 160 },
    { label: 'STYLES', color: '#22d3ee', y: 120 },
    { label: 'MARKUP', color: '#22c55e', y: 80 },
  ];

  return (
    <svg viewBox="0 0 280 260" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="fe-glow"><feGaussianBlur stdDeviation="2" /></filter>
        <linearGradient id="fe-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {layers.map((l, i) => {
        const offsetY = hovered ? -i * 6 : 0;
        return (
          <motion.g
            key={l.label}
            animate={{ y: offsetY }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          >
            {/* Isometric parallelogram */}
            <path
              d={`M 60 ${l.y} L 200 ${l.y} L 240 ${l.y + 24} L 100 ${l.y + 24} Z`}
              fill="#0a0a0a" stroke={l.color} strokeOpacity="0.5" strokeWidth="1"
            />
            {/* edge highlight */}
            <line x1="60" y1={l.y} x2="200" y2={l.y} stroke={l.color} strokeOpacity="0.8" />
            <text x="74" y={l.y + 15}
              style={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: l.color, fontWeight: 700, letterSpacing: 1.2 }}>
              {l.label}
            </text>
            {/* mini grid pattern */}
            {Array.from({ length: 6 }).map((_, j) => (
              <line key={j}
                x1={140 + j * 10} y1={l.y + 4}
                x2={140 + j * 10 + 8} y2={l.y + 20}
                stroke={l.color} strokeOpacity="0.18"
              />
            ))}
          </motion.g>
        );
      })}

      {/* Cursor */}
      <motion.g
        animate={{ x: hovered ? 30 : 0, y: hovered ? -10 : 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <path d="M 195 55 L 195 75 L 200 70 L 205 80 L 209 78 L 204 68 L 211 67 Z"
          fill="#ffffff" stroke="#0a0a0a" strokeWidth="1" />
      </motion.g>

      <text x="14" y="22"
        style={{ fontSize: 8, fontFamily: 'JetBrains Mono', fill: '#64748b', letterSpacing: 1.5 }}>
        UI STACK
      </text>
      <text x="266" y="248" textAnchor="end"
        style={{ fontSize: 7.5, fontFamily: 'JetBrains Mono', fill: '#f59e0b' }}>
        60fps · paint
      </text>
    </svg>
  );
};
