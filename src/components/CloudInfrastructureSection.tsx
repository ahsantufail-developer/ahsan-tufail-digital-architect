import { useEffect, useState, useCallback } from 'react';
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

// ── Custom rounded-rectangle node ────────────────────────────────────────────

interface RectNodeData {
  label: string;
  sublabel: string;
  glow: string;
}

const RectNode = ({ data }: { data: RectNodeData }) => {
  const { label, sublabel, glow } = data;
  return (
    <div style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <div
        style={{
          borderRadius: 10,
          minWidth: 120,
          padding: '12px 16px',
          background: '#0a0a0a',
          border: `1px solid ${glow}`,
          boxShadow: `0 0 20px ${glow}4d`,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 10,
            color: '#94a3b8',
            fontFamily: 'system-ui, sans-serif',
            marginTop: 2,
          }}
        >
          {sublabel}
        </div>
      </div>
    </div>
  );
};

const nodeTypes: NodeTypes = { rect: RectNode };

// ── Node / edge definitions ───────────────────────────────────────────────────

const initialNodes: Node[] = [
  { id: 'netlify',    type: 'rect', position: { x: 80,  y: 60  }, data: { label: 'ahsantufail.online', sublabel: 'Netlify',           glow: '#6366f1' } },
  { id: 'vercel',     type: 'rect', position: { x: 80,  y: 200 }, data: { label: 'drinkagen.shop',     sublabel: 'Vercel',            glow: '#e2e8f0' } },
  { id: 'n8nsite',    type: 'rect', position: { x: 80,  y: 340 }, data: { label: 'ahsann8n.site',      sublabel: 'Cloudflare',        glow: '#f59e0b' } },
  { id: 'ec2',        type: 'rect', position: { x: 320, y: 340 }, data: { label: 'AWS EC2',            sublabel: 'n8n + Docker',      glow: '#f59e0b' } },
  { id: 'supa1',      type: 'rect', position: { x: 560, y: 60  }, data: { label: 'Supabase P1',        sublabel: 'Brand DB',          glow: '#22d3ee' } },
  { id: 'supa2',      type: 'rect', position: { x: 560, y: 200 }, data: { label: 'Supabase P2',        sublabel: 'RAG Vector Store',  glow: '#22d3ee' } },
  { id: 'cloudflare', type: 'rect', position: { x: 320, y: 200 }, data: { label: 'Cloudflare DNS',     sublabel: 'All Domains',       glow: '#f59e0b' } },
  { id: 'claude',     type: 'rect', position: { x: 560, y: 340 }, data: { label: 'Claude API',         sublabel: 'via MCP',           glow: '#6366f1' } },
  { id: 'gsheets',    type: 'rect', position: { x: 760, y: 340 }, data: { label: 'Google Sheets',      sublabel: 'n8n Output',        glow: '#22d3ee' } },
];

const initialEdges: Edge[] = [
  {
    id: 'e-netlify-supa1', source: 'netlify', target: 'supa1', animated: true,
    label: 'newsletter/leads',
    labelStyle: { fontSize: 11, fill: '#94a3b8' },
    labelBgStyle: { fill: '#050505' },
    labelBgBorderRadius: 4,
    style: { stroke: '#6366f1' },
  },
  {
    id: 'e-vercel-cf', source: 'vercel', target: 'cloudflare', animated: true,
    label: 'edge deploy',
    labelStyle: { fontSize: 11, fill: '#94a3b8' },
    labelBgStyle: { fill: '#050505' },
    labelBgBorderRadius: 4,
    style: { stroke: '#e2e8f0' },
  },
  {
    id: 'e-n8n-ec2', source: 'n8nsite', target: 'ec2', animated: true,
    label: 'CF Tunnel',
    labelStyle: { fontSize: 11, fill: '#94a3b8' },
    labelBgStyle: { fill: '#050505' },
    labelBgBorderRadius: 4,
    style: { stroke: '#f59e0b' },
  },
  {
    id: 'e-ec2-claude', source: 'ec2', target: 'claude', animated: true,
    label: 'MCP call',
    labelStyle: { fontSize: 11, fill: '#94a3b8' },
    labelBgStyle: { fill: '#050505' },
    labelBgBorderRadius: 4,
    style: { stroke: '#6366f1' },
  },
  {
    id: 'e-ec2-gsheets', source: 'ec2', target: 'gsheets', animated: true,
    label: 'automation output',
    labelStyle: { fontSize: 11, fill: '#94a3b8' },
    labelBgStyle: { fill: '#050505' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee' },
  },
  {
    id: 'e-ec2-supa2', source: 'ec2', target: 'supa2', animated: true,
    label: 'vector query',
    labelStyle: { fontSize: 11, fill: '#94a3b8' },
    labelBgStyle: { fill: '#050505' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee' },
  },
  {
    id: 'e-cf-netlify', source: 'cloudflare', target: 'netlify', animated: true,
    label: 'DNS',
    labelStyle: { fontSize: 11, fill: '#94a3b8' },
    labelBgStyle: { fill: '#050505' },
    labelBgBorderRadius: 4,
    style: { stroke: '#f59e0b', strokeDasharray: '4 2' },
  },
];

// ── Status bar ────────────────────────────────────────────────────────────────

const StatusBar = () => {
  const [workflows, setWorkflows] = useState(5);
  const [uptime, setUptime] = useState(99.8);

  useEffect(() => {
    const id = setInterval(() => {
      setWorkflows(Math.floor(Math.random() * (7 - 3 + 1)) + 3);
      setUptime((prev) => Math.min(100, prev + 0.001));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const indicators = [
    { label: 'EC2 INSTANCE',  value: 'ONLINE' },
    { label: 'n8n WORKFLOWS', value: `${workflows} active` },
    { label: 'VECTOR STORE',  value: '16,410 rows' },
    { label: 'UPTIME',        value: `${uptime.toFixed(1)}%` },
  ];

  return (
    <div
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid #1f1f1f',
        padding: '12px 32px',
        display: 'flex',
        gap: 40,
        flexWrap: 'wrap',
      }}
    >
      {indicators.map((ind) => (
        <div key={ind.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#34d399',
              display: 'inline-block',
              animation: 'infra-pulse 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              color: '#64748b',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.1em',
              marginRight: 4,
            }}
          >
            {ind.label}
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#22d3ee',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {ind.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const CloudInfrastructureSection = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const onInit = useCallback(() => {}, []);

  return (
    <section
      style={{
        background: '#050505',
        width: '100%',
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      {/* Dot-grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, #1f1f1f 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#22d3ee',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
            }}
          >
            Infrastructure Overview
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            margin: '0 0 16px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Cloud Infrastructure
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 16,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 520,
            margin: '0 auto 48px',
            lineHeight: 1.6,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Self-hosted automation, edge deployments, and vector data pipelines running in
          production.
        </p>

        {/* React Flow diagram */}
        <div
          style={{
            width: '100%',
            height: 480,
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid #1f1f1f',
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={onInit}
            fitView
            fitViewOptions={{ padding: 0.15 }}
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

        {/* Status bar */}
        <StatusBar />
      </div>

      <style>{`
        @keyframes infra-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #34d399; }
          50% { opacity: 0.6; box-shadow: 0 0 12px #34d399; }
        }
      `}</style>
    </section>
  );
};

export default CloudInfrastructureSection;
