import SectionLabel from '../components/SectionLabel';
import StatBox from '../components/StatBox';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ScrollSection from '../components/ScrollSection';
import DiagramLayer, { FlowConnector } from '../components/DiagramLayer';
import { services } from '../data/services';
import { concepts } from '../data/concepts';

export default function Landing() {
  return (
    <>
      {/* Hero Section */}
      <ScrollSection>
        <div className="status-indicator">
          <div className="status-dot" />
          <span className="status-text">Project Documentation</span>
        </div>

        <h1 className="hero-title" style={{ marginBottom: 20 }}>
          BrewHub
        </h1>
        <p className="body-text" style={{ fontSize: 18, maxWidth: 640, marginBottom: 12 }}>
          A social developer collaboration platform built with microservices architecture.
          The ultimate Spring Boot project to master <strong style={{ color: 'var(--text-primary)' }}>every concept</strong> in
          Java, Spring Boot, Kafka, SQL, and NoSQL.
        </p>
        <p className="small-text" style={{ marginBottom: 40 }}>
          By <span className="text-orange">ByteCodeBrew</span> — because the best way to learn is to build.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value="8" label="Microservices" color="var(--orange)" />
          <StatBox value={`${concepts.length}+`} label="Concepts Covered" color="var(--green)" />
          <StatBox value="5" label="Data Stores" color="var(--blue)" />
          <StatBox value="10" label="Design Patterns" color="var(--purple)" />
        </div>
      </ScrollSection>

      {/* What is BrewHub */}
      <ScrollSection>
        <SectionLabel text="THE VISION" />
        <h2 className="section-title">Think GitHub meets StackOverflow meets Dev.to</h2>
        <p className="body-text mb-24">
          BrewHub is a social platform for developers — share code snippets, collaborate
          on projects in real-time, publish technical articles, participate in peer code reviews,
          and engage in live pair programming sessions. Every feature teaches you real-world
          engineering patterns.
        </p>

        <div className="grid-2">
          <div className="alert-card alert-card--red">
            <div className="alert-card__label">❌ THE PROBLEM WITH TODO APPS</div>
            <div className="alert-card__text">
              Most "learning projects" are simple CRUD apps that don't teach distributed systems,
              event-driven architecture, caching strategies, or production-grade security.
              They leave you unprepared for real-world interview questions.
            </div>
          </div>
          <div className="alert-card alert-card--green">
            <div className="alert-card__label">✅ BREWHUB'S APPROACH</div>
            <div className="alert-card__text">
              Every microservice is designed to naturally require specific concepts.
              User Service needs Spring Security. Notifications need MongoDB + WebSocket.
              Analytics needs Kafka Streams. Nothing is forced — it's organic complexity.
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Architecture Overview */}
      <ScrollSection>
        <SectionLabel text="ARCHITECTURE LAYERS" />
        <h2 className="section-title">From client to database, every layer has a purpose</h2>
        <p className="body-text mb-24">
          The system follows a standard microservices architecture with API Gateway routing,
          event-driven communication via Kafka, and polyglot persistence.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DiagramLayer
            icon="🖥️"
            title="Client Layer"
            subtitle="FRONTEND"
            description="React / Next.js frontend consuming REST APIs and WebSocket"
            color="#F97316"
          />
          <FlowConnector />
          <DiagramLayer
            icon="🌐"
            title="API Gateway"
            subtitle="SPRING CLOUD GATEWAY"
            description="Routing, JWT validation, rate limiting, circuit breaking"
            color="#F97316"
          />
          <FlowConnector />
          <DiagramLayer
            icon="⚙️"
            title="Service Layer"
            subtitle="8 SPRING BOOT MICROSERVICES"
            description="User, Content, Search, Notification, Analytics, Collaboration, Review"
            color="#3B82F6"
          />
          <FlowConnector />
          <DiagramLayer
            icon="📨"
            title="Event Layer"
            subtitle="APACHE KAFKA"
            description="Asynchronous event-driven communication between services"
            color="#A855F7"
          />
          <FlowConnector />
          <DiagramLayer
            icon="🗄️"
            title="Data Layer"
            subtitle="POLYGLOT PERSISTENCE"
            description="PostgreSQL · MongoDB · Redis · Elasticsearch · MinIO"
            color="#22C55E"
          />
        </div>
      </ScrollSection>

      {/* Services Grid */}
      <ScrollSection>
        <SectionLabel text="MICROSERVICES" />
        <h2 className="section-title">8 services, each with a mission</h2>
        <p className="body-text mb-24">
          Each microservice owns its domain, its data, and its deployment lifecycle.
          They communicate through Kafka events — loosely coupled, independently scalable.
        </p>

        <div className="grid-2">
          {services.map((s) => (
            <Card key={s.id} semantic color={s.color}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div
                  className="icon-box"
                  style={{ background: `${s.color}18` }}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="card-title">{s.name}</div>
                  <div className="metadata-text" style={{ color: s.color }}>{s.db} · :{s.port}</div>
                </div>
              </div>
              <p className="small-text">{s.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {s.concepts.slice(0, 4).map((c, i) => (
                  <Badge key={i} text={c} color={s.color} />
                ))}
                {s.concepts.length > 4 && (
                  <Badge text={`+${s.concepts.length - 4} more`} color="#555860" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Data Stores */}
      <ScrollSection>
        <SectionLabel text="DATA STORES" />
        <h2 className="section-title">Every database earns its place</h2>
        <p className="body-text mb-24">
          Polyglot persistence — using the right database for the right job.
          No single database does everything well. BrewHub uses five different
          data stores, each chosen for specific strengths.
        </p>

        <div className="grid-3">
          {[
            { icon: '🐘', name: 'PostgreSQL', desc: 'ACID transactions, relational data, complex joins', color: '#3B82F6', usage: 'Users, Content, Reviews, Sessions' },
            { icon: '🍃', name: 'MongoDB', desc: 'Flexible schemas, document storage, aggregation', color: '#22C55E', usage: 'Notifications, Preferences, Templates' },
            { icon: '🔴', name: 'Redis', desc: 'Sub-ms caching, sessions, rate limiting, pub/sub', color: '#EF4444', usage: 'Cache, Sessions, Rate Limits, Trending' },
            { icon: '🔎', name: 'Elasticsearch', desc: 'Full-text search, autocomplete, faceted filters', color: '#06B6D4', usage: 'Search Index, Content Discovery' },
            { icon: '📦', name: 'MinIO', desc: 'S3-compatible object storage for files & images', color: '#F59E0B', usage: 'Code Files, Avatars, Article Images' },
          ].map((db) => (
            <Card key={db.name} semantic color={db.color}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{db.icon}</div>
              <div className="card-title">{db.name}</div>
              <p className="small-text" style={{ margin: '6px 0' }}>{db.desc}</p>
              <div className="metadata-text" style={{ color: db.color, marginTop: 8 }}>
                {db.usage}
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Concept Categories */}
      <ScrollSection>
        <SectionLabel text="CONCEPT COVERAGE" />
        <h2 className="section-title">
          {concepts.length}+ concepts across {new Set(concepts.map(c => c.category)).size} categories
        </h2>
        <p className="body-text mb-24">
          From core Java fundamentals to advanced distributed systems patterns — every concept
          appears naturally where it's needed, not forced into artificial examples.
        </p>

        <div className="grid-3">
          {[
            { cat: 'Core Java', icon: '☕', color: '#3B82F6' },
            { cat: 'Spring Boot', icon: '🍃', color: '#22C55E' },
            { cat: 'Spring Data', icon: '🗄️', color: '#06B6D4' },
            { cat: 'Spring Security', icon: '🔒', color: '#EF4444' },
            { cat: 'Spring Cloud', icon: '☁️', color: '#A855F7' },
            { cat: 'Kafka', icon: '📨', color: '#EC4899' },
            { cat: 'Database', icon: '💾', color: '#F59E0B' },
            { cat: 'Design Patterns', icon: '♟️', color: '#06B6D4' },
            { cat: 'Testing', icon: '🧪', color: '#22C55E' },
            { cat: 'AOP', icon: '🎯', color: '#A855F7' },
            { cat: 'DevOps', icon: '🐳', color: '#F97316' },
          ].map((item) => {
            const count = concepts.filter(c => c.category === item.cat).length;
            return (
              <Card key={item.cat} semantic color={item.color}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <div>
                    <div className="card-title" style={{ fontSize: 14 }}>{item.cat}</div>
                    <div className="metadata-text" style={{ color: item.color }}>
                      {count} CONCEPTS
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollSection>

      {/* Quick Start */}
      <ScrollSection>
        <SectionLabel text="GET STARTED" />
        <h2 className="section-title">Use this documentation as your guide</h2>
        <p className="body-text mb-24">
          Navigate through the sidebar to explore every aspect of the BrewHub project.
          Each section provides architecture diagrams, code patterns, and implementation
          guidance you can reference while building.
        </p>

        <div className="grid-2">
          {[
            { icon: '🏗️', title: 'System Architecture', desc: 'High-level architecture diagrams and service interaction flows', path: '/architecture' },
            { icon: '📐', title: 'UML Diagrams', desc: 'Class diagrams, sequence diagrams, and state machines', path: '/uml' },
            { icon: '🗄️', title: 'Database Design', desc: 'ERD diagrams, MongoDB schemas, Redis key patterns', path: '/database' },
            { icon: '📨', title: 'Kafka Architecture', desc: 'Topic design, event flows, streaming topology', path: '/kafka' },
            { icon: '♟️', title: 'Design Patterns', desc: 'Every pattern with code examples and tradeoffs', path: '/patterns' },
            { icon: '🗺️', title: 'Learning Roadmap', desc: 'Step-by-step build order from foundation to advanced', path: '/roadmap' },
          ].map((item) => (
            <Card key={item.title}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <div className="card-title" style={{ marginBottom: 4 }}>{item.title}</div>
                  <p className="small-text">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
