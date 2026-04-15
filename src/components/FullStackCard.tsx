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

// ── Custom circular nodes (variable radius) ───────────────────────────────────

interface CircleNodeData {
  label: string;
  glow: string;
  radius?: number;
}

const CircleNode = ({ data }: { data: CircleNodeData }) => {
  const { label, glow, radius = 40 } = data;
  const size = radius * 2;
  const isGateway = radius > 40;
  return (
    <div style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `2px solid ${glow}`,
          background: `radial-gradient(circle at 50% 50%, ${glow}1a 0%, transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: isGateway
            ? `drop-shadow(0 0 28px ${glow})`
            : `drop-shadow(0 0 16px ${glow})`,
        }}
      >
        <span
          style={{
            fontSize: isGateway ? 8 : 9,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.05em',
            padding: `0 ${isGateway ? 10 : 6}px`,
          }}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
};

const nodeTypes: NodeTypes = { circle: CircleNode };

// ── Node / edge definitions ───────────────────────────────────────────────────

const initialNodes: Node[] = [
  { id: 'react',    type: 'circle', position: { x: 0,   y: 160 }, data: { label: 'REACT / NEXT.JS',     glow: '#22d3ee', radius: 40 } },
  { id: 'limiter',  type: 'circle', position: { x: 180, y: 160 }, data: { label: 'RATE LIMITER',         glow: '#ef4444', radius: 35 } },
  { id: 'gateway',  type: 'circle', position: { x: 370, y: 160 }, data: { label: 'EXPRESS API GATEWAY',  glow: '#6366f1', radius: 52 } },
  { id: 'supabase', type: 'circle', position: { x: 560, y: 60  }, data: { label: 'SUPABASE',             glow: '#22d3ee', radius: 40 } },
  { id: 'auth',     type: 'circle', position: { x: 560, y: 160 }, data: { label: 'AUTH SERVICE',         glow: '#f59e0b', radius: 40 } },
  { id: 'redis',    type: 'circle', position: { x: 560, y: 280 }, data: { label: 'REDIS CACHE',          glow: '#ef4444', radius: 40 } },
];

const initialEdges: Edge[] = [
  {
    id: 'e-react-limiter', source: 'react', target: 'limiter', animated: true,
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee', strokeWidth: 2 },
  },
  {
    id: 'e-limiter-gw', source: 'limiter', target: 'gateway', animated: true,
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee', strokeWidth: 2 },
  },
  {
    id: 'e-gw-supa', source: 'gateway', target: 'supabase', animated: true,
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  },
  {
    id: 'e-gw-auth', source: 'gateway', target: 'auth', animated: true,
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  },
  {
    id: 'e-gw-redis', source: 'gateway', target: 'redis', animated: true,
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  },
];

// ── Node pixel coords for packet animation ────────────────────────────────────
// These are approximate centres within the ReactFlow canvas (after fitView offset).
// We animate in the local coord space of the right-column div.
const REACT_CENTER  = { x: 80,  y: 200 };
const LIMITER_CENTER = { x: 260, y: 200 };
const GATEWAY_CENTER = { x: 474, y: 200 };

// ── Skills ────────────────────────────────────────────────────────────────────

const skills = ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express API', 'Supabase', 'Figma', 'Auth (JWT/OAuth)'];

// ── Server log overlay ────────────────────────────────────────────────────────

const logPool = [
  '[INFO] Gateway connection stable.',
  '{ event: "db_query" }    2ms',
  '{ event: "cache_hit" }   0.5ms',
  '[INFO] Auth token verified.',
  '{ event: "rate_limit_ok" }  0ms',
];

// ── Main component ────────────────────────────────────────────────────────────

const CloudFullStackCard = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const onInit = useCallback(() => {}, []);

  // Server logs
  const [logs, setLogs] = useState(() => getLogWindow(logPool, 0));
  useEffect(() => {
    let idx = 1;
    const id = setInterval(() => {
      setLogs(getLogWindow(logPool, idx));
      idx++;
    }, 900);
    return () => clearInterval(id);
  }, []);

  // Travelling packet: react→limiter→gateway, 2.5s loop
  const packetPath = [
    { x: REACT_CENTER.x,   y: REACT_CENTER.y },
    { x: LIMITER_CENTER.x, y: LIMITER_CENTER.y },
    { x: GATEWAY_CENTER.x, y: GATEWAY_CENTER.y },
  ];

  return (
    <div
      style={{
        background: '#0a0a0a',
        border: '1px solid #1f1f1f',
        borderRadius: 16,
        padding: 40,
        minHeight: 360,
        display: 'flex',
        gap: 32,
      }}
    >
      {/* Left column */}
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#f59e0b',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
          }}
        >
          Full Stack
        </span>

        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}
        >
          Full Stack &amp;
          <br />
          Modern Backend
        </h2>

        <p
          style={{
            fontSize: 14,
            color: '#94a3b8',
            lineHeight: 1.7,
            margin: 0,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Developing robust full-stack applications combining Figma-designed interfaces with
          Next.js frontends and Node.js/Express APIs, integrated with Supabase, authentication
          systems, and RESTful architecture.
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
      <div style={{ flex: 1, position: 'relative', minHeight: 280 }}>
        {/* React Flow canvas */}
        <div style={{ width: '100%', height: 360 }}>
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

        {/* Floating JSON packet travelling react→limiter→gateway */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: '#0f0f0f',
            border: '1px solid #6366f1',
            borderRadius: 999,
            padding: '4px 8px',
            fontSize: 10,
            fontFamily: 'monospace',
            color: '#22d3ee',
            pointerEvents: 'none',
            zIndex: 20,
            whiteSpace: 'nowrap',
          }}
          animate={{
            x: packetPath.map((p) => p.x - 50),
            y: packetPath.map((p) => p.y - 10),
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.4, 1],
          }}
        >
          {'{ userId: "847", status: 200 }'}
        </motion.div>

        {/* Server logs overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: '#0a0a0a',
            border: '1px solid #1f1f1f',
            borderRadius: 8,
            padding: 12,
            width: 240,
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
            SERVER LOGS
          </div>
          {logs.map((entry, i) => (
            <div
              key={i}
              style={{
                fontSize: 11,
                color: '#94a3b8',
                fontFamily: 'Courier New, monospace',
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

export default CloudFullStackCard;
