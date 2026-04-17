import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getLogWindow } from '@/lib/logUtils';
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
  const [logs, setLogs] = useState(() => getLogWindow(logPool, 0));
  useEffect(() => {
    let idx = 1;
    const id = setInterval(() => {
      setLogs(getLogWindow(logPool, idx));
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
    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-10 min-h-[420px] flex gap-8 transition-colors duration-300 hover:border-[#6366f1]/20">
      {/* Left column */}
      <div className="w-2/5 flex flex-col gap-4">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-[#6366f1]">
          Technical Expertise
        </span>

        <h2 className="font-display text-[36px] font-bold text-foreground leading-tight m-0">
          AI &amp; LLM
          <br />
          Architectures
        </h2>

        <p className="text-sm font-mono text-[#94a3b8] leading-[1.7] max-w-[280px] m-0">
          Design and deployment of performant RAG systems and autonomous AI Agents, utilizing n8n
          automation workflows, MCP server integrations, and advanced prompt engineering for complex
          data pipelines.
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          {skills.map((s) => (
            <span
              key={s}
              className="text-xs font-mono text-[#64748b] border border-[#1f1f1f] bg-[#0f0f0f] rounded-full px-3 py-1"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1 relative min-h-[340px]">
        {/* Top-right metrics */}
        <div className="absolute top-0 right-0 z-10 flex gap-5 font-mono">
          <div>
            <div className="text-[11px] text-[#94a3b8]">LATENCY</div>
            <div className="text-[13px] font-bold text-[#22d3ee]">{latency}ms</div>
          </div>
          <div>
            <div className="text-[11px] text-[#94a3b8]">TOKENS/SEC</div>
            <div className="text-[13px] font-bold text-[#22d3ee]">{tokens}</div>
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
        <div className="absolute bottom-0 right-0 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3 w-[260px] z-10">
          <div className="text-[10px] font-mono text-[#6366f1] mb-2 tracking-[0.1em]">
            AGENT_PROCESS.LOG
          </div>
          {logs.map((entry, i) => (
            <div key={i} className="text-[11px] font-mono text-[#22d3ee] leading-[1.6]">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AILLMCard;
