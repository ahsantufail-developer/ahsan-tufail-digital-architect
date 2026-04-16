
const AGEN_SCREENSHOT = 'https://github.com/user-attachments/assets/7d96a7c5-9a79-4d3c-a3e5-677261838b20';

const techPills = ['Next.js', 'Vercel', 'Cloudflare', 'Tailwind CSS', 'SEO'];
const metricBadges = ['100% Lighthouse', 'Live Production', 'Custom Domain'];

const ProjectCardAgen = () => {

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
      {/* Top section — real screenshot */}
      <div style={{ height: 220, background: '#0d0d0d', overflow: 'hidden', position: 'relative' }}>
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
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
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
        <img
          src={AGEN_SCREENSHOT}
          alt="AGEN Energy Drink website"
          style={{ width: '100%', height: 188, objectFit: 'cover', objectPosition: 'top' }}
        />
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
          Real client work deployed — high-performance marketing site for an energy drink brand,
          built for speed, SEO, and conversion with a custom domain and Cloudflare edge delivery.
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
