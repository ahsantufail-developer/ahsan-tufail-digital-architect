import { useEffect, useState } from 'react';

interface Props { hovered: boolean }

export const CloudOrbitViz = ({ hovered }: Props) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const speed = hovered ? 2.5 : 1;
    const tick = () => { setT(p => p + 0.016 * speed); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const cx = 140, cy = 130;
  const sats = [
    { rx: 90, ry: 50, speed: 0.5, phase: 0, label: 'AWS', color: '#f59e0b' },
    { rx: 110, ry: 65, speed: -0.35, phase: 1.2, label: 'VRC', color: '#e2e8f0' },
    { rx: 70, ry: 38, speed: 0.7, phase: 2.4, label: 'CF', color: '#22d3ee' },
    { rx: 100, ry: 80, speed: -0.45, phase: 3.6, label: 'DKR', color: '#6366f1' },
  ];

  return (
    <svg viewBox="0 0 280 260" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="orbit-core">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <filter id="orbit-glow"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>

      {/* Orbit ellipses */}
      {sats.map((s, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={s.rx} ry={s.ry}
          fill="none" stroke={s.color} strokeOpacity="0.15" strokeWidth="0.8"
          transform={`rotate(${i * 30 + t * 4} ${cx} ${cy})`} />
      ))}

      {/* Core */}
      <circle cx={cx} cy={cy} r={28 + Math.sin(t * 1.4) * 2} fill="url(#orbit-core)" />
      <circle cx={cx} cy={cy} r="16" fill="#0a0a0a" stroke="#22d3ee" strokeWidth="1.5" filter="url(#orbit-glow)" />
      {/* meridians */}
      <ellipse cx={cx} cy={cy} rx="16" ry="6" fill="none" stroke="#22d3ee" strokeOpacity="0.5" />
      <line x1={cx} y1={cy - 16} x2={cx} y2={cy + 16} stroke="#22d3ee" strokeOpacity="0.4" />

      {/* Satellites */}
      {sats.map((s, i) => {
        const a = t * s.speed + s.phase;
        const rot = (i * 30 + t * 4) * Math.PI / 180;
        // point on ellipse rotated by `rot`
        const lx = s.rx * Math.cos(a);
        const ly = s.ry * Math.sin(a);
        const x = cx + lx * Math.cos(rot) - ly * Math.sin(rot);
        const y = cy + lx * Math.sin(rot) + ly * Math.cos(rot);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="8" fill="#0a0a0a" stroke={s.color} strokeWidth="1.4" filter="url(#orbit-glow)" />
            <text x={x} y={y + 2.5} textAnchor="middle"
              style={{ fontSize: 6, fontFamily: 'JetBrains Mono', fill: s.color, fontWeight: 700 }}>
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Deploy packet shooting out periodically */}
      {(() => {
        const p = (t * 0.5) % 1;
        const angle = Math.floor(t * 0.5) * 1.3;
        const dx = cx + 90 * p * Math.cos(angle);
        const dy = cy + 60 * p * Math.sin(angle);
        return (
          <circle cx={dx} cy={dy} r="2.5" fill="#22c55e" opacity={1 - p} filter="url(#orbit-glow)" />
        );
      })()}

      <text x="14" y="22"
        style={{ fontSize: 8, fontFamily: 'JetBrains Mono', fill: '#64748b', letterSpacing: 1.5 }}>
        EDGE NETWORK
      </text>
      <text x="266" y="248" textAnchor="end"
        style={{ fontSize: 7.5, fontFamily: 'JetBrains Mono', fill: '#22d3ee' }}>
        99.9% uptime
      </text>
    </svg>
  );
};
