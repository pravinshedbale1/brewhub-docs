import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Accordion from '../../components/Accordion';
import { feTechStack } from '../../data/feTechStack';

const categoryIcons = {
  'Core': '🧱', 'Build': '⚡', 'State': '🧠', 'API': '📡', 'Styling': '🎨',
  'Feature': '✨', 'Real-Time': '🔌', 'Forms': '📋', 'Testing': '🧪',
};

const categories = [...new Set(feTechStack.map(t => t.category))];

export default function FeTechStack() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="FRONTEND TECH STACK" />
        <h1 className="section-title">Every library earns its place</h1>
        <p className="body-text mb-24">
          No bloat. Every dependency is justified — each was chosen after evaluating alternatives.
          If a library doesn't teach you something or solve a real problem, it doesn't belong here.
        </p>
      </ScrollSection>

      {categories.map((cat) => {
        const items = feTechStack.filter(t => t.category === cat);
        const icon = categoryIcons[cat] || '📦';

        return (
          <ScrollSection key={cat}>
            <SectionLabel text={`${cat.toUpperCase()} LAYER`} />
            <h2 className="section-title">{icon} {cat}</h2>

            <div className="grid-2 mt-16">
              {items.map((tech) => (
                <Card key={tech.name} semantic color={tech.color}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{tech.icon}</span>
                    <div>
                      <div className="card-title">{tech.name}</div>
                      <div className="metadata-text" style={{ color: tech.color }}>{tech.category.toUpperCase()}</div>
                    </div>
                  </div>
                  <p className="small-text" style={{ marginBottom: 10 }}>{tech.description}</p>

                  <Accordion title="Why this & not alternatives?">
                    <div style={{ padding: '12px 0' }}>
                      <p className="small-text" style={{ marginBottom: 12, color: 'var(--text-primary)' }}>
                        <strong>Why:</strong> {tech.why}
                      </p>
                      <div className="metadata-text mb-8" style={{ color: 'var(--text-dim)' }}>ALTERNATIVES CONSIDERED</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {tech.alternatives.map((alt, i) => (
                          <div key={i} className="small-text" style={{ paddingLeft: 10, borderLeft: '2px solid var(--card-border)' }}>
                            {alt}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Accordion>
                </Card>
              ))}
            </div>
          </ScrollSection>
        );
      })}
    </>
  );
}
