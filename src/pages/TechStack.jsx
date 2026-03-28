import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import TechCard from '../components/TechCard';
import StatBox from '../components/StatBox';
import { techStack } from '../data/techStack';

export default function TechStack() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="TECHNOLOGY STACK" />
        <h1 className="section-title">Every tool earns its place</h1>
        <p className="body-text mb-24">
          No technology is chosen for resume padding. Every tool in the BrewHub stack solves
          a specific problem better than its alternatives. Each card explains WHY a technology
          was chosen and what was considered instead.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value={techStack.length} label="Technologies" color="var(--orange)" />
          <StatBox value="5" label="Databases" color="var(--blue)" />
          <StatBox value="3" label="Languages" color="var(--green)" />
          <StatBox value="0" label="Vendor Lock-in" color="var(--red)" />
        </div>
      </ScrollSection>

      {/* Group by category */}
      {['Framework', 'SQL Database', 'NoSQL Database', 'Cache / In-Memory Store', 'Search Engine', 'Event Streaming', 'Object Storage'].map((cat) => {
        const catTechs = techStack.filter(t => t.category === cat);
        if (catTechs.length === 0) return null;
        return (
          <ScrollSection key={cat}>
            <SectionLabel text={cat.toUpperCase()} />
            <div className="grid-2" style={{ gap: 16 }}>
              {catTechs.map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </ScrollSection>
        );
      })}

      <ScrollSection>
        <SectionLabel text="INFRASTRUCTURE & TOOLING" />
        <div className="grid-2" style={{ gap: 16 }}>
          {techStack.filter(t => ['API Gateway', 'Resilience', 'Security', 'Containerization', 'Testing', 'Observability', 'Database Migration', 'Object Mapping', 'Developer Productivity'].includes(t.category)).map((tech) => (
            <TechCard key={tech.name} {...tech} />
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
