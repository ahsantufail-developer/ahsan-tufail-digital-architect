import { Hero } from '@/components/Hero';
import { SkillsGrid } from '@/components/SkillsGrid';
import { Projects } from '@/components/Projects';
import { AITerminal } from '@/components/AITerminal';
import { DynamicDock } from '@/components/DynamicDock';
import { Footer } from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  useSmoothScroll();

  return (
    <main className="relative bg-background min-h-screen">
      <section id="hero">
        <Hero />
      </section>
      
      <section id="skills">
        <SkillsGrid />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="terminal">
        <AITerminal />
      </section>
      
      <Footer />
      
      <DynamicDock />
    </main>
  );
};

export default Index;
