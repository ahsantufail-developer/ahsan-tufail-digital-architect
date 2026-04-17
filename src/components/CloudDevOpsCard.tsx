import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// ── Node / edge definitions ───────────────────────────────────────────────────

const initialNodes: Node[] = [
  { id: 'git',        type: 'circle', position: { x: 0,   y: 140 }, data: { label: 'GIT REPO',       glow: '#6366f1' } },
  { id: 'cicd',       type: 'circle', position: { x: 180, y: 140 }, data: { label: 'CI/CD PIPELINE',  glow: '#f59e0b' } },
  { id: 'ec2',        type: 'circle', position: { x: 380, y: 60  }, data: { label: 'AWS EC2',         glow: '#f59e0b' } },
  { id: 'vercel',     type: 'circle', position: { x: 380, y: 220 }, data: { label: 'VERCEL',          glow: '#e2e8f0' } },
  { id: 'cloudflare', type: 'circle', position: { x: 560, y: 60  }, data: { label: 'CLOUDFLARE',      glow: '#f59e0b' } },
  { id: 'docker',     type: 'circle', position: { x: 200, y: 280 }, data: { label: 'DOCKER',          glow: '#22d3ee' } },
];

const initialEdges: Edge[] = [
  {
    id: 'e-git-cicd', source: 'git', target: 'cicd', animated: true,
    label: 'push',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  },
  {
    id: 'e-cicd-ec2', source: 'cicd', target: 'ec2', animated: true,
    label: 'deploy',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#f59e0b', strokeWidth: 2 },
  },
  {
    id: 'e-cicd-vercel', source: 'cicd', target: 'vercel', animated: true,
    label: 'deploy',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#f59e0b', strokeWidth: 2 },
  },
  {
    id: 'e-ec2-cf', source: 'ec2', target: 'cloudflare', animated: true,
    label: 'tunnel',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee', strokeWidth: 2 },
  },
  {
    id: 'e-docker-ec2', source: 'docker', target: 'ec2', animated: true,
    label: 'container',
    labelStyle: { fontSize: 12, fill: '#94a3b8' },
    labelBgStyle: { fill: '#0a0a0a' },
    labelBgBorderRadius: 4,
    style: { stroke: '#22d3ee', strokeWidth: 2 },
  },
];

// ── Skills ────────────────────────────────────────────────────────────────────

const skills = ['AWS EC2', 'Cloudflare Tunnel', 'Docker', 'Vercel', 'CI/CD Pipelines', 'Git & GitHub', 'Google Cloud'];

// ── Pipeline status overlay ───────────────────────────────────────────────────

const pipelineSteps = [
  '✓ Build    0.8s',
  '✓ Test     1.2s',
  '✓ Deploy   2.1s',
];

const PipelineStatus = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let step = 0;
    const showNext = () => {
      step++;
      setVisibleCount(step);
      if (step < pipelineSteps.length) {
        setTimeout(showNext, 600);
      } else {
        // reset after 4000ms then replay
        setTimeout(() => {
          step = 0;
          setVisibleCount(0);
          setTimeout(showNext, 600);
        }, 4000);
      }
    };
    const initial = setTimeout(showNext, 600);
    return () => clearTimeout(initial);
  }, []);

  return (
    <div className="absolute bottom-0 right-0 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3 z-10 min-w-[160px]">
      <div className="text-[10px] font-mono text-[#f59e0b] mb-2 tracking-[0.1em]">
        PIPELINE STATUS
      </div>
      {pipelineSteps.map((step, i) => (
        <AnimatePresence key={step}>
          {i < visibleCount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-mono text-[#22c55e] leading-[1.7]"
            >
              {step}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const CloudDevOpsCard = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const onInit = useCallback(() => {}, []);

  return (
    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-10 min-h-[360px] h-full flex gap-8 transition-colors duration-300 hover:border-[#22d3ee]/20">
      {/* Left column */}
      <div className="w-2/5 flex flex-col gap-3.5">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-[#22d3ee]">
          Cloud Infrastructure
        </span>

        <h2 className="font-display text-[32px] font-bold text-foreground leading-tight m-0">
          Cloud &amp; DevOps
        </h2>

        <p className="text-sm font-mono text-[#94a3b8] leading-[1.7] m-0">
          Orchestrate resilient cloud infrastructure and CI/CD pipelines for web applications —
          from containerised Docker deployments on AWS EC2 to edge delivery via Cloudflare, with
          n8n automation running as a live self-hosted service.
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
      <div className="flex-1 relative min-h-[280px]">
        <div style={{ width: '100%', height: 320 }}>
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

        <PipelineStatus />
      </div>
    </div>
  );
};

export default CloudDevOpsCard;
