import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  metric: string;
  metricLabel: string;
}

const projects: Project[] = [
  {
    title: 'Neural Search Platform',
    description: 'Built an enterprise-grade semantic search engine using vector embeddings and RAG architecture, serving 2M+ queries daily with sub-100ms latency.',
    stack: ['Python', 'FastAPI', 'Pinecone', 'OpenAI', 'Redis', 'Docker'],
    liveUrl: '#',
    repoUrl: '#',
    metric: '2M+',
    metricLabel: 'Daily Queries',
  },
  {
    title: 'Multi-Cloud Orchestrator',
    description: 'Designed a unified control plane for managing workloads across AWS, GCP, and Azure with automated failover and cost optimization.',
    stack: ['Go', 'Terraform', 'Kubernetes', 'gRPC', 'Prometheus'],
    liveUrl: '#',
    repoUrl: '#',
    metric: '40%',
    metricLabel: 'Cost Reduction',
  },
  {
    title: 'Real-Time MLOps Pipeline',
    description: 'End-to-end ML pipeline with automated training, versioning, A/B testing, and canary deployments for production model serving.',
    stack: ['Python', 'Kubeflow', 'MLflow', 'Kafka', 'Seldon', 'ArgoCD'],
    repoUrl: '#',
    metric: '99.9%',
    metricLabel: 'Uptime SLA',
  },
  {
    title: 'Infrastructure Autopilot',
    description: 'AI-powered system that monitors infrastructure health, predicts failures, and auto-remediates issues before they impact users.',
    stack: ['Rust', 'TypeScript', 'Pulumi', 'Grafana', 'PagerDuty'],
    liveUrl: '#',
    metric: '85%',
    metricLabel: 'Fewer Incidents',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl p-8 md:p-10 h-full transition-heavy hover:glow-subtle overflow-hidden">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary status-pulse" />
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.3em] uppercase">
                Case Study 0{index + 1}
              </span>
            </div>

            {/* Metric badge */}
            <div className="text-right">
              <p className="text-2xl font-display text-gradient-cyber leading-none">{project.metric}</p>
              <p className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase mt-1">
                {project.metricLabel}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4 group-hover:text-gradient-cyber transition-all duration-500">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[10px] font-mono tracking-wider border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors duration-300 rounded-lg px-3 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-border/20">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-[10px] font-mono text-titanium tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient">
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
