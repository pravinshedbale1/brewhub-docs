import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import Accordion from '../components/Accordion';
import CodeBlock from '../components/CodeBlock';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { patterns } from '../data/patterns';

export default function DesignPatterns() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="DESIGN PATTERNS" />
        <h1 className="section-title">Patterns in practice, not theory</h1>
        <p className="body-text mb-24">
          Every design pattern used in BrewHub appears because the code naturally needs it —
          not because we wanted to check a box. Each pattern below includes real code from
          the project, where it's used, and its tradeoffs.
        </p>
      </ScrollSection>

      {/* Group by category */}
      {['Creational', 'Behavioral', 'Structural', 'Architectural', 'Resilience'].map((category) => {
        const catPatterns = patterns.filter(p => p.category === category);
        if (catPatterns.length === 0) return null;
        return (
          <ScrollSection key={category}>
            <SectionLabel text={`${category.toUpperCase()} PATTERNS`} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {catPatterns.map((pattern) => (
                <Accordion
                  key={pattern.name}
                  icon={pattern.icon}
                  title={pattern.name}
                  subtitle={`${pattern.category} · ${pattern.where}`}
                  color={pattern.color}
                >
                  <p className="body-text mb-16">{pattern.description}</p>

                  <div className="mb-16">
                    <div className="metadata-text mb-8" style={{ color: pattern.color }}>USED IN</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {pattern.where.split(', ').map((w, i) => (
                        <Badge key={i} text={w} color={pattern.color} />
                      ))}
                    </div>
                  </div>

                  <CodeBlock code={pattern.code} language={`Java — ${pattern.name}`} />

                  <div className="grid-2 mt-16" style={{ gap: 12 }}>
                    <Card semantic color="#22C55E" style={{ padding: '14px 18px' }}>
                      <div className="metadata-text mb-8" style={{ color: 'var(--green)' }}>✅ PROS</div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {pattern.tradeoffs.pros.map((p, i) => (
                          <li key={i} className="small-text" style={{ color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--green)', marginRight: 8 }}>+</span>{p}
                          </li>
                        ))}
                      </ul>
                    </Card>
                    <Card semantic color="#EF4444" style={{ padding: '14px 18px' }}>
                      <div className="metadata-text mb-8" style={{ color: 'var(--red)' }}>⚠️ CONS</div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {pattern.tradeoffs.cons.map((c, i) => (
                          <li key={i} className="small-text" style={{ color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--red)', marginRight: 8 }}>−</span>{c}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </Accordion>
              ))}
            </div>
          </ScrollSection>
        );
      })}
    </>
  );
}
