import { useEffect, useState } from 'react';

interface Props { hovered: boolean }

// Horizontal request flow: client -> rate limiter -> gateway -> handler -> 200
export const BackendPulseViz = ({ hovered }: Props) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const speed = hovered ? 2.4 : 1;
    const tick = () => { setT(p => p + 0.016 * speed); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const stops = [
    { x: 30, label: 'CLIENT', color: '#94a3b8' },
    { x: 95, label: 'RATE', color: '#f43f5e' },
    { x: 160, label: 'GATEWAY', color: '#6366f1' },
    { x: 230, label: 'HANDLER', color: '#22c55e' },
  ];
  const y = 110;

  // request packet position
  const p = (t * 0.35) % 1.4; // 0..1 forward, then a small pause
  const fwd = Math.min(p, 1);
  const pxReq = stops[0].x + (stops[3].x - stops[0].x) * fwd;

  // response packet (delayed)
  const r = ((t * 0.35) + 0.6) % 1.4;
  const back = Math.min(r, 1);
  const pxRes = stops[3].x - (stops[3].x - stops[0].x) * back;

  // heartbeat path
  const heartbeat = Array.from({ length: 60 }).map((_, i) => {
    const x = 14 + i * 4.4;
    const beat = Math.sin((t * 4 + i * 0.5)) * 4 + Math.sin((t * 8 + i * 0.3)) * 2;
    return `${x},${190 + beat}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 280 260" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="be-glow"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      {/* lane */}
      <line x1={stops[0].x} y1={y} x2={stops[3].x} y2={y} stroke="#1f1f1f" strokeWidth="2" />
      <line x1={stops[0].x} y1={y} x2={stops[3].x} y2={y} stroke="#22c55e" strokeOpacity="0.4"
        strokeWidth="2" strokeDasharray="4 6" strokeDashoffset={-t * 20} />

      {/* stops */}
      {stops.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={y} r="10" fill="#0a0a0a" stroke={s.color} strokeWidth="1.4" />
          <text x={s.x} y={y - 18} textAnchor="middle"
            style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: s.color, fontWeight: 700 }}>
            {s.label}
          </text>
        </g>
      ))}

      {/* request packet */}
      <g opacity={p < 1 ? 1 : 0}>
        <rect x={pxReq - 14} y={y - 30} width="28" height="12" rx="6" fill="#0a0a0a" stroke="#6366f1" />
        <text x={pxReq} y={y - 21} textAnchor="middle"
          style={{ fontSize: 6, fontFamily: 'JetBrains Mono', fill: '#a5b4fc' }}>
          GET
        </text>
        <circle cx={pxReq} cy={y} r="3.5" fill="#6366f1" filter="url(#be-glow)" />
      </g>

      {/* response packet */}
      <g opacity={r < 1 ? 1 : 0}>
        <rect x={pxRes - 16} y={y + 18} width="32" height="12" rx="6" fill="#0a0a0a" stroke="#22c55e" />
        <text x={pxRes} y={y + 27} textAnchor="middle"
          style={{ fontSize: 6, fontFamily: 'JetBrains Mono', fill: '#86efac' }}>
          200 OK
        </text>
        <circle cx={pxRes} cy={y} r="3.5" fill="#22c55e" filter="url(#be-glow)" />
      </g>

      {/* heartbeat strip */}
      <text x="14" y="170"
        style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#64748b', letterSpacing: 1 }}>
        UPSTREAM PULSE
      </text>
      <polyline points={heartbeat} fill="none" stroke="#22c55e" strokeWidth="1.2" opacity="0.7" />

      {/* metrics */}
      <g transform="translate(14, 220)">
        <text style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#64748b' }}>p50</text>
        <text x="22" style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#22c55e' }}>
          {(12 + Math.sin(t) * 2).toFixed(1)}ms
        </text>
        <text x="76" style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#64748b' }}>p99</text>
        <text x="98" style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#f59e0b' }}>
          {(48 + Math.sin(t * 0.7) * 5).toFixed(0)}ms
        </text>
        <text x="148" style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#64748b' }}>rps</text>
        <text x="172" style={{ fontSize: 7, fontFamily: 'JetBrains Mono', fill: '#a5b4fc' }}>
          {(840 + Math.sin(t * 0.5) * 60).toFixed(0)}
        </text>
      </g>

      <text x="14" y="22"
        style={{ fontSize: 8, fontFamily: 'JetBrains Mono', fill: '#64748b', letterSpacing: 1.5 }}>
        REQUEST LANE
      </text>
    </svg>
  );
};
