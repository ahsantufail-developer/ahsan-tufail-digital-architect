
const AGEN_SCREENSHOT = 'https://github.com/user-attachments/assets/7d96a7c5-9a79-4d3c-a3e5-677261838b20';

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
      <div style={{ height: 280, background: '#0d0d0d', overflow: 'hidden' }}>
        <img
          src={AGEN_SCREENSHOT}
          alt="AGEN Energy Drink website"
          referrerPolicy="no-referrer"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
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
          }}
        >
          Real client work deployed — high-performance marketing site for an energy drink brand,
          built for speed, SEO, and conversion with a custom domain and Cloudflare edge delivery.
        </p>

        {/* Row 3: button */}
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
