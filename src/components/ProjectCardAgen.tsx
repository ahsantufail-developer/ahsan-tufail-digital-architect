import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cycleWords = ['HYDRATE.', 'PERFORM.', 'DOMINATE.'];

const techPills = ['Next.js', 'Vercel', 'Cloudflare', 'Tailwind CSS', 'SEO'];
const metricBadges = ['100% Lighthouse', 'Live Production', 'Custom Domain'];

const ProjectCardAgen = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hold each word for ~2.6s total (0.6s in + 1.4s hold + 0.6s out)
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % cycleWords.length);
        setVisible(true);
      }, 600);
    };
    const id = setInterval(cycle, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        background: '#0a0a0a',
        border: '1px solid #1f1f1f',
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Top section — browser mockup */}
      <div style={{ height: 220, background: '#0d0d0d', position: 'relative' }}>
        {/* Browser chrome */}
        <div
          style={{
            height: 32,
            background: '#161616',
            borderBottom: '1px solid #1f1f1f',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
          </div>
          {/* URL pill */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: '#0a0a0a',
                border: '1px solid #2d3748',
                borderRadius: 999,
                padding: '2px 12px',
                fontSize: 11,
                color: '#64748b',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              drinkagen.shop
            </div>
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            height: 188,
            background: 'linear-gradient(135deg, #0a0a12 0%, #0d1117 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <AnimatePresence mode="wait">
            {visible && (
              <motion.div
                key={cycleWords[wordIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '0.25em',
                  color: '#ffffff',
                  fontFamily: 'system-ui, sans-serif',
                  textAlign: 'center',
                }}
              >
                {cycleWords[wordIndex]}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            style={{
              fontSize: 10,
              color: '#22d3ee',
              letterSpacing: '0.2em',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            drinkagen.shop
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div style={{ padding: 24 }}>
        {/* Row 1: title + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Agen — Energy Drink Brand
          </span>
          <span
            style={{
              fontSize: 11,
              color: '#22c55e',
              background: '#022c1a',
              border: '1px solid #166534',
              borderRadius: 999,
              padding: '2px 10px',
              whiteSpace: 'nowrap',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            ● LIVE
          </span>
        </div>

        {/* Row 2: description */}
        <p
          style={{
            fontSize: 14,
            color: '#94a3b8',
            marginTop: 8,
            lineHeight: 1.6,
            fontFamily: 'system-ui, sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          High-performance marketing site for an energy drink brand, built for speed, SEO, and
          conversion with a custom domain and Cloudflare edge delivery.
        </p>

        {/* Row 3: tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {techPills.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                color: '#64748b',
                background: '#0f0f0f',
                border: '1px solid #1f1f1f',
                borderRadius: 999,
                padding: '4px 12px',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Row 4: metric badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {metricBadges.map((m) => (
            <span
              key={m}
              style={{
                fontSize: 10,
                color: '#94a3b8',
                background: '#0a0a0a',
                border: '1px solid #1f1f1f',
                borderRadius: 6,
                padding: '6px 12px',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {m}
            </span>
          ))}
        </div>

        {/* Row 5: button */}
        <div style={{ marginTop: 20 }}>
          <a
            href="https://drinkagen.shop"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              border: '1px solid #22d3ee',
              color: '#22d3ee',
              background: 'transparent',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
              textDecoration: 'none',
              transition: 'background 200ms, color 200ms',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#22d3ee';
              (e.target as HTMLAnchorElement).style.color = '#0a0a0a';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.background = 'transparent';
              (e.target as HTMLAnchorElement).style.color = '#22d3ee';
            }}
          >
            View Site ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardAgen;
