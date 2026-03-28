import { useState, useMemo } from 'react';
import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import StatBox from '../components/StatBox';
import { concepts, categories } from '../data/concepts';

export default function ConceptTrackerPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConcepts = useMemo(() => {
    let filtered = concepts;
    if (activeCategory !== 'All') {
      filtered = filtered.filter(c => c.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.module.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <>
      <ScrollSection>
        <SectionLabel text="CONCEPT TRACKER" />
        <h1 className="section-title">{concepts.length}+ concepts you'll master</h1>
        <p className="body-text mb-24">
          Every concept listed here appears naturally in the BrewHub codebase. As you build
          each module, you'll encounter and implement these concepts in their real-world context.
          Use this tracker to plan your learning path.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value={concepts.length} label="Total Concepts" color="var(--orange)" />
          <StatBox value={categories.length - 1} label="Categories" color="var(--blue)" />
          <StatBox value="8" label="Services" color="var(--green)" />
          <StatBox value="100%" label="Coverage" color="var(--purple)" />
        </div>
      </ScrollSection>

      <ScrollSection>
        {/* Search */}
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '10px 16px',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 10,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(255, 140, 0, 0.4)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 140, 0, 0.12)'}
          />
        </div>

        {/* Filters */}
        <div className="concept-tracker__filters">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`concept-tracker__filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="small-text mb-16" style={{ color: 'var(--text-dim)' }}>
          Showing {filteredConcepts.length} of {concepts.length} concepts
        </p>

        {/* Concepts Grid */}
        <div className="concept-tracker__grid">
          {filteredConcepts.map((concept, i) => (
            <div key={i} className="concept-tracker__item">
              <div
                className="concept-tracker__check"
                style={{ borderColor: concept.color }}
              >
                <span style={{ color: concept.color, fontSize: 10 }}>○</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="concept-tracker__item-name">{concept.name}</div>
                <div className="concept-tracker__item-module" style={{ color: concept.color }}>
                  {concept.module}
                </div>
                <p className="small-text" style={{ fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>
                  {concept.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
