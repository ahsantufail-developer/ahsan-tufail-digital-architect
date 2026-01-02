import { motion } from 'framer-motion';
import { useState } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
}

const nodes: Node[] = [
  { id: 'api', label: 'API Gateway', x: 50, y: 20, connections: ['lb', 'auth'] },
  { id: 'lb', label: 'Load Balancer', x: 30, y: 40, connections: ['k8s'] },
  { id: 'auth', label: 'Auth Service', x: 70, y: 40, connections: ['k8s', 'cache'] },
  { id: 'k8s', label: 'Kubernetes', x: 50, y: 55, connections: ['db', 'ml', 'queue'] },
  { id: 'cache', label: 'Redis Cache', x: 85, y: 55, connections: [] },
  { id: 'db', label: 'PostgreSQL', x: 20, y: 75, connections: [] },
  { id: 'ml', label: 'ML Pipeline', x: 50, y: 75, connections: ['vector'] },
  { id: 'queue', label: 'Message Queue', x: 80, y: 75, connections: [] },
  { id: 'vector', label: 'Vector DB', x: 50, y: 92, connections: [] },
];

export const CloudVisualizer = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    if (nodeId) {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        setActiveConnections(node.connections);
      }
    } else {
      setActiveConnections([]);
    }
  };

  const getLineCoords = (from: Node, to: Node) => {
    return {
      x1: `${from.x}%`,
      y1: `${from.y}%`,
      x2: `${to.x}%`,
      y2: `${to.y}%`,
    };
  };

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-[10px] font-mono text-titanium tracking-[0.3em] uppercase mb-4">
            System Architecture
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient">
            Cloud Infrastructure
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <div className="relative aspect-[16/10] md:aspect-[2/1]">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="lineGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {nodes.map(node =>
                node.connections.map(targetId => {
                  const target = nodes.find(n => n.id === targetId);
                  if (!target) return null;
                  const coords = getLineCoords(node, target);
                  const isActive = hoveredNode === node.id || activeConnections.includes(node.id);

                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      {...coords}
                      stroke={isActive ? "url(#lineGradientActive)" : "url(#lineGradient)"}
                      strokeWidth={isActive ? 2 : 1}
                      className="transition-all duration-500"
                      filter={isActive ? "url(#glow)" : undefined}
                    />
                  );
                })
              )}
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => handleNodeHover(node.id)}
                onMouseLeave={() => handleNodeHover(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`
                    relative px-4 py-2 md:px-6 md:py-3 rounded-lg cursor-pointer transition-all duration-500
                    ${hoveredNode === node.id || activeConnections.includes(node.id)
                      ? 'bg-primary/20 glow-primary scale-110'
                      : 'bg-obsidian-light/80 hover:bg-obsidian-light'
                    }
                    border border-border/30 hover:border-primary/50
                  `}
                >
                  <span className={`
                    text-xs md:text-sm font-mono whitespace-nowrap transition-colors duration-300
                    ${hoveredNode === node.id ? 'text-primary' : 'text-foreground/80'}
                  `}>
                    {node.label}
                  </span>

                  {/* Pulse indicator */}
                  {(hoveredNode === node.id) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary status-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-6 font-mono"
        >
          Hover over nodes to explore connections
        </motion.p>
      </div>
    </section>
  );
};
