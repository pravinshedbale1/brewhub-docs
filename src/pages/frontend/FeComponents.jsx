import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import StatBox from '../../components/StatBox';
import MermaidDiagram from '../../components/MermaidDiagram';
import { feComponents, feModules } from '../../data/feComponents';

const categories = [...new Set(feComponents.map(c => c.category))];
const categoryColors = {
  'Layout': '#3B82F6',
  'Data Display': '#22C55E',
  'Input': '#F59E0B',
  'Feedback': '#A855F7',
  'Navigation': '#06B6D4',
  'Real-Time': '#EF4444',
};

export default function FeComponents() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="COMPONENT LIBRARY" />
        <h1 className="section-title">Design system & component architecture</h1>
        <p className="body-text mb-24">
          Every component is designed to be reusable, typed, and accessible. The library follows
          atomic design principles — from primitive elements to complex composed patterns.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value={feComponents.length} label="Components" color="var(--orange)" />
          <StatBox value={categories.length} label="Categories" color="var(--blue)" />
          <StatBox value={feComponents.filter(c => c.complexity === 'High').length} label="Complex" color="var(--purple)" />
          <StatBox value={feModules.length} label="Modules" color="var(--green)" />
        </div>
      </ScrollSection>

      {/* Design Tokens */}
      <ScrollSection>
        <SectionLabel text="DESIGN TOKENS" />
        <h2 className="section-title">CSS variables as the single source of truth</h2>
        <p className="body-text mb-24">
          All colors, spacing, typography, and shadows are defined as CSS custom properties.
          Every component references these tokens — no hardcoded values anywhere.
        </p>

        <div className="grid-2">
          <Card semantic color="#F59E0B">
            <div className="card-title" style={{ marginBottom: 12 }}>🎨 Color Palette</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: '--color-primary', value: '#FF8C00', desc: 'Brand orange — CTAs, active states' },
                { name: '--color-bg', value: '#0A0E1A', desc: 'Dark background' },
                { name: '--color-surface', value: '#141824', desc: 'Card/panel backgrounds' },
                { name: '--color-success', value: '#22C55E', desc: 'Approved, online, success' },
                { name: '--color-error', value: '#EF4444', desc: 'Errors, required fields' },
                { name: '--color-warning', value: '#F59E0B', desc: 'Warnings, pending states' },
              ].map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: t.value, flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} />
                  <div>
                    <span className="metadata-text" style={{ color: 'var(--orange)' }}>{t.name}</span>
                    <span className="small-text" style={{ marginLeft: 8 }}>{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card semantic color="#3B82F6">
            <div className="card-title" style={{ marginBottom: 12 }}>📏 Spacing & Typography</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: '--spacing-xs', value: '4px', desc: 'Inline elements' },
                { name: '--spacing-sm', value: '8px', desc: 'Compact padding' },
                { name: '--spacing-md', value: '16px', desc: 'Default gap' },
                { name: '--spacing-lg', value: '24px', desc: 'Section spacing' },
                { name: '--font-sans', value: 'Inter', desc: 'Body text' },
                { name: '--font-mono', value: 'JetBrains Mono', desc: 'Code blocks' },
              ].map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="metadata-text" style={{ color: '#3B82F6', minWidth: 130 }}>{t.name}</span>
                  <span className="small-text">{t.value} — {t.desc}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScrollSection>

      {/* Component Hierarchy */}
      <ScrollSection>
        <SectionLabel text="COMPONENT HIERARCHY" />
        <h2 className="section-title">From atoms to organisms</h2>

        <MermaidDiagram
          chart={`graph TD
    subgraph Atoms
      BTN[Button]
      INP[Input]
      BADGE[Badge]
      AVATAR[Avatar]
      ICON[Icon]
      SKELETON[Skeleton]
    end

    subgraph Molecules
      SEARCH[SearchInput]
      TAG[TagInput]
      FILE[FileUpload]
      TOAST[Toast]
      DROP[DropdownMenu]
      TABS[Tabs]
    end

    subgraph Organisms
      CARD_S[SnippetCard]
      CARD_A[ArticleCard]
      EDITOR[CodeEditor]
      COMMENT[CommentThread]
      DIFF[ReviewDiff]
      COLLAB[CollabEditor]
    end

    subgraph Templates
      SIDEBAR2[Sidebar]
      TOPBAR2[TopBar]
      FEED_L[FeedLayout]
      EDITOR_L[EditorLayout]
    end

    BTN --> SEARCH
    INP --> SEARCH
    INP --> TAG
    BADGE --> CARD_S
    AVATAR --> CARD_A
    SKELETON --> CARD_S
    SEARCH --> TOPBAR2
    TABS --> FEED_L
    CARD_S --> FEED_L
    EDITOR --> EDITOR_L
    EDITOR --> COLLAB

    style Atoms fill:#3B82F610,stroke:#3B82F6,color:#fff
    style Molecules fill:#22C55E10,stroke:#22C55E,color:#fff
    style Organisms fill:#A855F710,stroke:#A855F7,color:#fff
    style Templates fill:#F59E0B10,stroke:#F59E0B,color:#fff`}
          label="ATOMIC DESIGN HIERARCHY"
        />
      </ScrollSection>

      {/* Components by Category */}
      {categories.map((cat) => {
        const items = feComponents.filter(c => c.category === cat);
        const color = categoryColors[cat] || '#FF8C00';
        return (
          <ScrollSection key={cat}>
            <SectionLabel text={cat.toUpperCase()} />
            <h2 className="section-title">{cat} Components ({items.length})</h2>
            <div className="grid-2 mt-16">
              {items.map((comp) => (
                <Card key={comp.name} semantic color={color}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div className="card-title">{comp.name}</div>
                    <Badge text={comp.complexity} color={comp.complexity === 'High' ? '#EF4444' : comp.complexity === 'Medium' ? '#F59E0B' : '#22C55E'} />
                  </div>
                  <p className="small-text" style={{ marginBottom: 10 }}>{comp.description}</p>
                  <div className="metadata-text" style={{ color, marginBottom: 6 }}>MODULE: {comp.module.toUpperCase()}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {comp.props.map(p => (
                      <Badge key={p} text={p} color="rgba(255,255,255,0.15)" />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollSection>
        );
      })}
    </>
  );
}
