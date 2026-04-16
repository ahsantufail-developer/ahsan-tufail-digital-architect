const MALAAK_SCREENSHOT = '/malaak-screenshot.png';
const MALAAK_URL = 'https://malaak-property.vercel.app';

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
      {/* Top section — real screenshot */}
      <div style={{ height: 280, background: '#111110', overflow: 'hidden', position: 'relative' }}>
        <img
          src={MALAAK_SCREENSHOT}
          alt="Malaak Property Management SaaS"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
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
          }}
        >
          A full-featured property management SaaS for overseas Pakistanis to monitor, rent, and
          manage real estate portfolios — built with a Figma design system and Supabase backend.
        </p>

        {/* Row 3: button */}
        <div style={{ marginTop: 20 }}>
          <a
            href={MALAAK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              border: '1px solid #f59e0b',
              color: '#f59e0b',
              background: 'transparent',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
              textDecoration: 'none',
              transition: 'background 200ms, color 200ms',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#f59e0b';
              (e.target as HTMLAnchorElement).style.color = '#0c0a09';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.background = 'transparent';
              (e.target as HTMLAnchorElement).style.color = '#f59e0b';
            }}
          >
            View Live Site ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardMalaak;
