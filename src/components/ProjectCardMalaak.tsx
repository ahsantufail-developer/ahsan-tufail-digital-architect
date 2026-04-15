const techPills = ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel', 'Figma Design System'];
const metricBadges = ['Figma Design System', 'Overseas Pakistani Market', 'SaaS Architecture'];

const ProjectCardMalaak = () => {
  return (
    <div
      style={{
        background: '#0c0a09',
        border: '1px solid #292524',
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Top section — design preview */}
      <div style={{ height: 220, background: '#111110', padding: '16px 20px 0', display: 'flex', flexDirection: 'column' }}>
        {/* Header label */}
        <div
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#a78bfa',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Malaak Design System
        </div>

        {/* Property listing card */}
        <div
          style={{
            width: '80%',
            margin: '0 auto',
            background: '#1c1917',
            borderRadius: 10,
            border: '1px solid #292524',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              width: 4,
              background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '10px 0 0 10px',
              flexShrink: 0,
            }}
          />
          {/* Content */}
          <div style={{ padding: 16, flex: 1 }}>
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: '#e7e5e4',
                lineHeight: 1.3,
              }}
            >
              Bahria Phase 7 — 10 Marla
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#78716c',
                fontFamily: 'system-ui, sans-serif',
                marginTop: 4,
              }}
            >
              3 Beds&nbsp;•&nbsp;2 Baths&nbsp;•&nbsp;10 Marla
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#f59e0b',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                PKR 85,000 / mo
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: '#fbbf24',
                  background: '#422006',
                  border: '1px solid #92400e',
                  borderRadius: 999,
                  padding: '2px 10px',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                OCCUPIED
              </span>
            </div>
          </div>
        </div>

        {/* Floating metric pills */}
        <div style={{ display: 'flex', gap: 12, marginTop: 12, justifyContent: 'center' }}>
          {['Portfolio Value: PKR 4.2Cr', 'Units: 7 Active'].map((pill) => (
            <span
              key={pill}
              style={{
                background: '#1c1917',
                border: '1px solid #292524',
                borderRadius: 999,
                padding: '4px 12px',
                fontSize: 11,
                color: '#a8a29e',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div style={{ padding: 24 }}>
        {/* Row 1: title + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Malaak — Property Management SaaS
          </span>
          <span
            style={{
              fontSize: 11,
              color: '#fb923c',
              background: '#431407',
              border: '1px solid #7c2d12',
              borderRadius: 999,
              padding: '2px 10px',
              whiteSpace: 'nowrap',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            ◐ IN DEVELOPMENT
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
          A full-featured property management SaaS for overseas Pakistanis to monitor, rent, and
          manage real estate portfolios — built with a Figma design system and Supabase backend.
        </p>

        {/* Row 3: tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {techPills.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                color: '#64748b',
                background: '#1c1917',
                border: '1px solid #292524',
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
                background: '#0c0a09',
                border: '1px solid #292524',
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
          <button
            style={{
              border: '1px solid #f59e0b',
              color: '#f59e0b',
              background: 'transparent',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
              cursor: 'pointer',
              transition: 'background 200ms, color 200ms',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = '#f59e0b';
              (e.target as HTMLButtonElement).style.color = '#0c0a09';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'transparent';
              (e.target as HTMLButtonElement).style.color = '#f59e0b';
            }}
          >
            View Case Study ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardMalaak;
