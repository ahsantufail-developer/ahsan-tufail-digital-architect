import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  Node,
  Edge,
  Handle,
  Position,
  NodeTypes,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// ── Custom circular node ──────────────────────────────────────────────────────

interface CircleNodeData {
  label: string;
  glow: string;
}

const CircleNode = ({ data }: { data: CircleNodeData }) => {
  const { label, glow } = data;
  return (
    <div style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: `2px solid ${glow}`,
          background: `radial-gradient(circle at 50% 50%, ${glow}1a 0%, transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: `drop-shadow(0 0 16px ${glow})`,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.05em',
            padding: '0 6px',
          }}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
};

const nodeTypes: NodeTypes = { circle: CircleNode };

// ── Static node / edge definitions ───────────────────────────────────────────

const initialNodes: Node[] = [
  { id: 'user',     type: 'circle', position: { x: 20,  y: 160 }, data: { label: 'USER INPUT',    glow: '#6366f1' } },
  { id: 'vecstore', type: 'circle', position: { x: 200, y: 80  }, data: { label: 'VECTOR STORE',  glow: '#22d3ee' } },
  { id: 'docs',     type: 'circle', position: { x: 200, y: 260 }, data: { label: 'DOCUMENTS',     glow: '#22d3ee' } },
  { id: 'agent',    type: 'circle', position: { x: 380, y: 160 }, data: { label: 'AI AGENT',      glow: '#f59e0b' } },
  { id: 'chatui',   type: 'circle', position: { x: 560, y: 160 }, data: { label: 'CHAT UI',       glow: '#6366f1' } },
];

const initialEdges: Edge[] = [
  {
    id: 'e-user-vec',    source: 'user',     target: 'vecstore', animated: true,
    label: 'query',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  },
  {
    id: 'e-docs-vec',    source: 'docs',     target: 'vecstore', animated: true,
    label: 'embed',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee', strokeWidth: 2 },
  },
  {
    id: 'e-vec-agent',   source: 'vecstore', target: 'agent',    animated: true,
    label: 'context',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee', strokeWidth: 2 },
  },
  {
    id: 'e-agent-chat',  source: 'agent',    target: 'chatui',   animated: true,
    label: 'response',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#f59e0b', strokeWidth: 2 },
  },
];

// ── Skill pills ───────────────────────────────────────────────────────────────

const skills = [
  'RAG Systems (Supabase Vector Store)',
  'AI Agents',
  'n8n Automation',
  'MCP',
  'Prompt Engineering',
];

// ── Log overlay ───────────────────────────────────────────────────────────────

const logPool = [
  '{ status: "analyzing_context" } 0.02ms',
  '{ embeddings: "cosine_similarity_high" } 0.05ms',
  '> Generating RAG response...',
  '{ tokens_used: 847, latency: "112ms" }',
  '> Retrieving top-3 chunks from vector store',
];

// ── Main component ────────────────────────────────────────────────────────────

const AILLMCard = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Log overlay
  const [logs, setLogs] = useState(logPool.slice(0, 3));
  useEffect(() => {
    let idx = 3;
    const id = setInterval(() => {
      setLogs([logPool[idx % logPool.length], logPool[(idx + 1) % logPool.length], logPool[(idx + 2) % logPool.length]]);
      idx++;
    }, 1200);
    return () => clearInterval(id);
  }, []);

  // Metrics
  const [latency, setLatency] = useState(112);
  const [tokens, setTokens] = useState(82);
  useEffect(() => {
    const id = setInterval(() => {
      setLatency(Math.floor(Math.random() * (140 - 80 + 1)) + 80);
      setTokens(Math.floor(Math.random() * (95 - 70 + 1)) + 70);
    }, 800);
    return () => clearInterval(id);
  }, []);

  const onInit = useCallback(() => {}, []);

  return (
    <div
      style={{
        background: '#0a0a0a',
        border: '1px solid #1f1f1f',
        borderRadius: 16,
        padding: 40,
        minHeight: 420,
        display: 'flex',
        gap: 32,
      }}
    >
      {/* Left column */}
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#6366f1',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
          }}
        >
          Technical Expertise
        </span>

        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}
        >
          AI &amp; LLM
          <br />
          Architectures
        </h2>

        <p
          style={{
            fontSize: 14,
            color: '#94a3b8',
            lineHeight: 1.7,
            maxWidth: 280,
            margin: 0,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Design and deployment of performant RAG systems and autonomous AI Agents, utilizing n8n
          automation workflows, MCP server integrations, and advanced prompt engineering for complex
          data pipelines.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
          {skills.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 12,
                color: '#64748b',
                border: '1px solid #1f1f1f',
                background: '#0f0f0f',
                borderRadius: 999,
                padding: '4px 12px',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div style={{ flex: 1, position: 'relative', minHeight: 340 }}>
        {/* Top-right metrics */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            gap: 20,
            fontFamily: 'monospace',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>LATENCY</div>
            <div style={{ fontSize: 13, color: '#22d3ee', fontWeight: 700 }}>{latency}ms</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>TOKENS/SEC</div>
            <div style={{ fontSize: 13, color: '#22d3ee', fontWeight: 700 }}>{tokens}</div>
          </div>
        </div>

        {/* React Flow canvas */}
        <div style={{ width: '100%', height: 340 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={onInit}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
            style={{ background: 'transparent' }}
          />
        </div>

        {/* Floating log overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: '#0a0a0a',
            border: '1px solid #1f1f1f',
            borderRadius: 8,
            padding: 12,
            width: 260,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: '#6366f1',
              fontFamily: 'monospace',
              marginBottom: 8,
              letterSpacing: '0.1em',
            }}
          >
            AGENT_PROCESS.LOG
          </div>
          {logs.map((entry, i) => (
            <div
              key={i}
              style={{
                fontSize: 11,
                color: '#22d3ee',
                fontFamily: 'monospace',
                lineHeight: 1.6,
              }}
            >
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AILLMCard;
