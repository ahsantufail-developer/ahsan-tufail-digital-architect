import { useEffect, useState, useRef } from 'react';

interface TerminalLine {
  text: string;
  color: string;
}

const techPills = ['Supabase (pgvector)', 'OpenAI Embeddings', 'n8n', 'Claude API', 'PostgreSQL'];
const metricBadges = ['16,410 vectors', 'Sub-150ms queries', 'Cosine Similarity'];

// Typewriter sequence definition
const buildSequence = (): Array<{ lines: TerminalLine[]; delay: number }> => [
  {
    lines: [
      { text: '$ query: ', color: '#94a3b8' },
      { text: '"What are my top productivity insights?"', color: '#ffffff' },
    ],
    delay: 0,
  },
  {
    lines: [{ text: '> Searching 16,410 vectors...', color: '#22d3ee' }],
    delay: 400,
  },
  {
    lines: [{ text: '> Cosine similarity match: 0.943', color: '#22d3ee' }],
    delay: 600,
  },
  {
    lines: [{ text: '> Retrieving top-3 chunks...', color: '#22d3ee' }],
    delay: 500,
  },
  {
    lines: [{ text: '> [RESULT] Focus on single daily priority, review weekly...', color: '#f59e0b' }],
    delay: 700,
  },
];

const ProjectCardRAG = () => {
  const [displayedGroups, setDisplayedGroups] = useState<TerminalLine[][]>([]);
  const [typingGroup, setTypingGroup] = useState<TerminalLine[] | null>(null);
  const [typingText, setTypingText] = useState('');
  const sequenceRef = useRef(buildSequence());
  const stepRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const runSequence = () => {
    stepRef.current = 0;
    setDisplayedGroups([]);
    setTypingGroup(null);
    setTypingText('');

    const seq = sequenceRef.current;

    const runStep = (stepIdx: number) => {
      if (stepIdx >= seq.length) {
        // Pause then restart
        const t = setTimeout(() => runSequence(), 3000);
        timeoutsRef.current.push(t);
        return;
      }

      const { lines, delay } = seq[stepIdx];
      const t = setTimeout(() => {
        if (stepIdx === 0) {
          // Typewriter for the first line pair (combined)
          const combined = lines.map((l) => l.text).join('');
          setTypingGroup(lines);
          let charIdx = 0;
          const typeChar = () => {
            charIdx++;
            setTypingText(combined.slice(0, charIdx));
            if (charIdx < combined.length) {
              const tt = setTimeout(typeChar, 40);
              timeoutsRef.current.push(tt);
            } else {
              // Finished typing — move group to displayed
              setDisplayedGroups((prev) => [...prev, lines]);
              setTypingGroup(null);
              setTypingText('');
              runStep(stepIdx + 1);
            }
          };
          typeChar();
        } else {
          // Instant append for subsequent lines
          setDisplayedGroups((prev) => [...prev, lines]);
          runStep(stepIdx + 1);
        }
      }, delay);
      timeoutsRef.current.push(t);
    };

    runStep(0);
  };

  useEffect(() => {
    runSequence();
    return () => clearTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Terminal preview */}
      <div style={{ height: 220, background: '#080808' }}>
        {/* Header bar */}
        <div
          style={{
            height: 32,
            background: '#111111',
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
          {/* Path label */}
          <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: '#64748b', fontFamily: 'Courier New, monospace' }}>
            ~/rag-system
          </div>
          {/* Online indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#34d399',
                animation: 'rag-pulse 2s ease-in-out infinite',
              }}
            />
            <span style={{ fontSize: 10, color: '#22c55e', fontFamily: 'system-ui, sans-serif' }}>● ONLINE</span>
          </div>
        </div>

        {/* Terminal body */}
        <div
          style={{
            padding: 16,
            fontFamily: 'Courier New, monospace',
            fontSize: 12,
            height: 188,
            overflowY: 'auto',
          }}
        >
          {/* Completed groups */}
          {displayedGroups.map((group, gi) => (
            <div key={gi} style={{ marginBottom: 4, lineHeight: 1.5 }}>
              {group.map((line, li) => (
                <span key={li} style={{ color: line.color }}>
                  {line.text}
                </span>
              ))}
            </div>
          ))}
          {/* Currently typing group */}
          {typingGroup && (
            <div style={{ marginBottom: 4, lineHeight: 1.5 }}>
              {typingGroup.map((line, li) => {
                const prefixLength = typingGroup.slice(0, li).reduce((sum, l) => sum + l.text.length, 0);
                const visible = typingText.slice(prefixLength, prefixLength + line.text.length);
                return visible ? (
                  <span key={li} style={{ color: line.color }}>
                    {visible}
                  </span>
                ) : null;
              })}
              <span style={{ color: '#22d3ee', animation: 'rag-blink 1s step-end infinite' }}>▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div style={{ padding: 24 }}>
        {/* Row 1: title + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
            Personal RAG System
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
          A personal knowledge retrieval system powered by pgvector, cosine similarity search,
          and Claude API — querying 16,410+ vectors with sub-150ms latency.
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

        {/* Row 5: button (disabled) */}
        <div style={{ marginTop: 20 }}>
          <button
            disabled
            style={{
              border: '1px solid #22d3ee',
              color: '#22d3ee',
              background: 'transparent',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
              cursor: 'default',
              opacity: 0.6,
            }}
          >
            View Architecture ↗
          </button>
        </div>
      </div>

      <style>{`
        @keyframes rag-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #34d399; }
          50% { opacity: 0.6; box-shadow: 0 0 12px #34d399; }
        }
        @keyframes rag-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProjectCardRAG;
