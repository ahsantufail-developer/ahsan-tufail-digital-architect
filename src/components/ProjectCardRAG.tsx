
const N8N_SCREENSHOT = 'https://github.com/user-attachments/assets/31fdacbd-6a27-4f1f-b24c-bf9cb9c16ea3';
const N8N_GUIDE_URL = 'https://www.notion.so/Host-n8n-on-AWS-EC2-Free-Production-Ready-HTTPS-Custom-Domain-via-Cloudflare-Tunnel-33825269b628811fa102eefc9a069379';

const ProjectCardRAG = () => {
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
      {/* Top section — real n8n screenshot */}
      <div style={{ height: 280, background: '#080808', overflow: 'hidden' }}>
        <img
          src={N8N_SCREENSHOT}
          alt="Self-hosted n8n on AWS EC2 with Cloudflare Tunnel"
          referrerPolicy="no-referrer"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Bottom section */}
      <div style={{ padding: 24 }}>
        {/* Row 1: title + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
            n8n on AWS EC2 — Self-Hosted Setup
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
          Self-hosted secure n8n setup — production-ready automation on AWS EC2 free tier with
          HTTPS and custom domain via Cloudflare Tunnel.
        </p>

        {/* Row 3: button */}
        <div style={{ marginTop: 20 }}>
          <a
            href={N8N_GUIDE_URL}
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
            View Setup Guide ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardRAG;
