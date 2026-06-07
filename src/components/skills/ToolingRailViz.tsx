import { useEffect, useState } from 'react';

interface Props { hovered: boolean }

// Wide horizontal toolchain rail with custom glyph nodes.
export const ToolingRailViz = ({ hovered }: Props) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const speed = hovered ? 2.5 : 1;
    const tick = () => { setT(p => p + 0.016 * speed); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const stops = [
    { x: 60,  label: 'GIT',     glyph: 'fork',    color: '#f59e0b' },
    { x: 200, label: 'EDITOR',  glyph: 'brackets', color: '#22d3ee' },
    { x: 340, label: 'CURSOR',  glyph: 'pointer', color: '#a78bfa' },
    { x: 480, label: 'N8N',     glyph: 'gear',    color: '#22c55e' },
    { x: 620, label: 'DEPLOY',  glyph: 'arrow',   color: '#6366f1' },
    { x: 760, label: 'OBSERVE', glyph: 'eye',     color: '#f43f5e' },
  ];
  const y = 90;
  const railStart = stops[0].x;
  const railEnd = stops[stops.length - 1].x;

  const pulses = [0, 0.33, 0.66].map(offset => {
    const p = ((t * 0.25) + offset) % 1;
    return railStart + (railEnd - railStart) * p;
  });

  const renderGlyph = (glyph: string, x: number, color: string) => {
    switch (glyph) {
      case 'fork':
        return (
          <g stroke={color} strokeWidth="1.4" fill="none">
            <circle cx={x - 5} cy={y - 5} r="2.5" />
            <circle cx={x + 5} cy={y - 5} r="2.5" />
            <circle cx={x} cy={y + 6} r="2.5" />
            <path d={`M ${x - 5} ${y - 3} Q ${x - 5} ${y + 3} ${x} ${y + 4}`} />
            <path d={`M ${x + 5} ${y - 3} Q ${x + 5} ${y + 3} ${x} ${y + 4}`} />
          </g>
        );
      case 'brackets':
        return (
          <g stroke={color} strokeWidth="1.4" fill="none">
            <path d={`M ${x - 6} ${y - 6} L ${x - 9} ${y} L ${x - 6} ${y + 6}`} />
            <path d={`M ${x + 6} ${y - 6} L ${x + 9} ${y} L ${x + 6} ${y + 6}`} />
            <line x1={x - 2} y1={y - 4} x2={x + 2} y2={y + 4} />
          </g>
        );
      case 'pointer':
        return (
          <g fill={color}>
            <path d={`M ${x - 4} ${y - 6} L ${x - 4} ${y + 6} L ${x - 1} ${y + 3} L ${x + 2} ${y + 8} L ${x + 4} ${y + 7} L ${x + 1} ${y + 2} L ${x + 5} ${y + 1} Z`} />
          </g>
        );
      case 'gear':
        return (
          <g stroke={color} strokeWidth="1.3" fill="none">
            <circle cx={x} cy={y} r="5" />
            <circle cx={x} cy={y} r="1.5" fill={color} />
            {[0, 60, 120, 180, 240, 300].map(a => {
              const rad = (a + t * 30) * Math.PI / 180;
              return (
                <line key={a}
                  x1={x + Math.cos(rad) * 6} y1={y + Math.sin(rad) * 6}
                  x2={x + Math.cos(rad) * 8.5} y2={y + Math.sin(rad) * 8.5}
                />
              );
            })}
          </g>
        );
      case 'arrow':
        return (
          <g stroke={color} strokeWidth="1.5" fill="none">
            <line x1={x - 7} y1={y} x2={x + 6} y2={y} />
            <path d={`M ${x + 2} ${y - 4} L ${x + 7} ${y} L ${x + 2} ${y + 4}`} />
          </g>
        );
      case 'eye':
        return (
          <g stroke={color} strokeWidth="1.3" fill="none">
            <path d={`M ${x - 8} ${y} Q ${x} ${y - 7} ${x + 8} ${y} Q ${x} ${y + 7} ${x - 8} ${y}`} />
            <circle cx={x} cy={y} r="2" fill={color}>
              <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 820 180" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="tool-glow"><feGaussianBlur stdDeviation="2" /></filter>
        <linearGradient id="rail-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Rail */}
      <line x1={railStart} y1={y} x2={railEnd} y2={y} stroke="#1f1f1f" strokeWidth="2" />
      <line x1={railStart} y1={y} x2={railEnd} y2={y} stroke="url(#rail-grad)" strokeWidth="2"
        strokeDasharray="8 12" strokeDashoffset={-t * 30} opacity="0.7" />

      {/* Pulses */}
      {pulses.map((px, i) => (
        <circle key={i} cx={px} cy={y} r="3.5" fill="#ffffff" filter="url(#tool-glow)" opacity="0.85" />
      ))}

      {/* Stops */}
      {stops.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={y} r="18" fill="#0a0a0a" stroke={s.color} strokeOpacity="0.4" strokeWidth="1.2" />
          {renderGlyph(s.glyph, s.x, s.color)}
          <text x={s.x} y={y + 38} textAnchor="middle"
            style={{ fontSize: 8.5, fontFamily: 'JetBrains Mono', fill: s.color, fontWeight: 700, letterSpacing: 1 }}>
            {s.label}
          </text>
          {/* step number */}
          <text x={s.x} y={y - 28} textAnchor="middle"
            style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#3f3f3f' }}>
            0{i + 1}
          </text>
        </g>
      ))}

      {/* End cap labels */}
      <text x={railStart - 30} y={y + 3}
        style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#3f3f3f', letterSpacing: 1 }}>
        IDEA
      </text>
      <text x={railEnd + 12} y={y + 3}
        style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#3f3f3f', letterSpacing: 1 }}>
        SHIP
      </text>
    </svg>
  );
};
