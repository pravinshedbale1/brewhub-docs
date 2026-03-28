import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import StatBox from '../../components/StatBox';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import MermaidDiagram from '../../components/MermaidDiagram';
import { feComponents, feModules } from '../../data/feComponents';
import { feConcepts } from '../../data/feConcepts';

export default function FeLanding() {
  return (
    <>
      {/* Hero */}
      <ScrollSection>
        <div className="status-indicator">
          <div className="status-dot" style={{ background: '#61DAFB' }} />
          <span className="status-text">Frontend Documentation</span>
        </div>

        <h1 className="hero-title" style={{ marginBottom: 20 }}>
          BrewHub <span style={{ color: '#61DAFB' }}>UI</span>
        </h1>
        <p className="body-text" style={{ fontSize: 18, maxWidth: 640, marginBottom: 12 }}>
          A modern, responsive React application that brings the BrewHub platform to life.
          Built with <strong style={{ color: 'var(--text-primary)' }}>React + TypeScript + Vite</strong> and
          styled with CSS Modules — no shortcuts, just real frontend engineering.
        </p>
        <p className="small-text" style={{ marginBottom: 40 }}>
          By <span className="text-orange">ByteCodeBrew</span> — because full-stack means mastering both sides.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value={feModules.length} label="Modules" color="#61DAFB" />
          <StatBox value={`${feComponents.length}+`} label="Components" color="var(--green)" />
          <StatBox value={`${feConcepts.length}+`} label="Concepts" color="var(--purple)" />
          <StatBox value="14" label="Libraries" color="var(--orange)" />
        </div>
      </ScrollSection>

      {/* Why a separate frontend? */}
      <ScrollSection>
        <SectionLabel text="WHY FRONTEND?" />
        <h2 className="section-title">Backend without UI is like an engine without a car</h2>
        <p className="body-text mb-24">
          You already have 8 backend microservices exposing REST APIs. But APIs alone are invisible.
          Building the frontend teaches you a completely different set of skills — component composition,
          state management, real-time UIs, and the art of making complex data look simple.
        </p>

        <div className="grid-2">
          <div className="alert-card alert-card--red">
            <div className="alert-card__label">❌ THE "I'LL JUST USE POSTMAN" TRAP</div>
            <div className="alert-card__text">
              Many backend developers never build UIs. They test with Postman and miss critical
              concepts: CORS, JWT refresh flows, WebSocket reconnection, file upload UX,
              loading states, error boundaries, and optimistic updates.
            </div>
          </div>
          <div className="alert-card alert-card--green">
            <div className="alert-card__label">✅ THE FULL-STACK ADVANTAGE</div>
            <div className="alert-card__text">
              Building the frontend forces you to think about UX — what happens when Kafka
              is slow? Show a skeleton. What happens when JWT expires mid-session? Silently
              refresh. These are the questions interviewers love.
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Modules */}
      <ScrollSection>
        <SectionLabel text="APPLICATION MODULES" />
        <h2 className="section-title">{feModules.length} modules, each maps to a backend service</h2>
        <p className="body-text mb-24">
          The frontend is organized by feature modules — each module owns its pages, components,
          hooks, and API functions. This structure mirrors the backend microservices.
        </p>

        <div className="grid-2">
          {feModules.map((mod) => (
            <Card key={mod.name} semantic color={mod.color}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div className="icon-box" style={{ background: `${mod.color}18` }}>
                  {mod.icon}
                </div>
                <div>
                  <div className="card-title">{mod.name}</div>
                  <div className="metadata-text" style={{ color: mod.color }}>
                    {mod.components} COMPONENTS · {mod.pages} PAGES
                  </div>
                </div>
              </div>
              <p className="small-text">{mod.description}</p>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Module Dependency */}
      <ScrollSection>
        <SectionLabel text="MODULE DEPENDENCIES" />
        <h2 className="section-title">How modules connect</h2>
        <p className="body-text mb-24">
          Every module depends on the Auth module (for JWT context) and Core (for shared components).
          The Collaboration module integrates both Editor and Notifications for a real-time experience.
        </p>

        <MermaidDiagram
          chart={`graph TD
    AUTH["🔐 Auth Module"]
    CORE["⚙️ Core / Shared"]
    FEED["📰 Feed Module"]
    EDITOR["✏️ Editor Module"]
    COLLAB["👥 Collaboration"]
    NOTIF["🔔 Notifications"]
    PROFILE["👤 Profile"]
    REVIEWS["🔍 Reviews"]
    ANALYTICS["📊 Analytics"]

    CORE --> AUTH
    FEED --> CORE
    FEED --> AUTH
    EDITOR --> CORE
    EDITOR --> AUTH
    COLLAB --> EDITOR
    COLLAB --> NOTIF
    COLLAB --> AUTH
    NOTIF --> AUTH
    PROFILE --> AUTH
    PROFILE --> FEED
    REVIEWS --> EDITOR
    REVIEWS --> AUTH
    ANALYTICS --> AUTH

    style AUTH fill:#EF444420,stroke:#EF4444,color:#fff
    style CORE fill:#3B82F620,stroke:#3B82F6,color:#fff
    style FEED fill:#3B82F620,stroke:#3B82F6,color:#fff
    style EDITOR fill:#22C55E20,stroke:#22C55E,color:#fff
    style COLLAB fill:#A855F720,stroke:#A855F7,color:#fff
    style NOTIF fill:#F59E0B20,stroke:#F59E0B,color:#fff
    style PROFILE fill:#EC489920,stroke:#EC4899,color:#fff
    style REVIEWS fill:#06B6D420,stroke:#06B6D4,color:#fff
    style ANALYTICS fill:#F9731620,stroke:#F97316,color:#fff`}
          label="MODULE DEPENDENCY GRAPH"
        />
      </ScrollSection>

      {/* Concept Coverage */}
      <ScrollSection>
        <SectionLabel text="CONCEPT COVERAGE" />
        <h2 className="section-title">
          {feConcepts.length}+ frontend concepts across {new Set(feConcepts.map(c => c.category)).size} categories
        </h2>
        <p className="body-text mb-24">
          From React hooks to TypeScript generics to WebSocket integration — the frontend covers
          everything a modern frontend engineer needs to know.
        </p>

        <div className="grid-3">
          {[
            { cat: 'React Core', icon: '⚛️', color: '#61DAFB' },
            { cat: 'TypeScript', icon: '🔷', color: '#3178C6' },
            { cat: 'State Management', icon: '🐻', color: '#F59E0B' },
            { cat: 'Routing', icon: '🧭', color: '#F44250' },
            { cat: 'CSS', icon: '🎨', color: '#264DE4' },
            { cat: 'API', icon: '📡', color: '#5A29E4' },
            { cat: 'Forms', icon: '📋', color: '#EC4899' },
            { cat: 'Testing', icon: '🧪', color: '#729B1B' },
            { cat: 'Performance', icon: '🚀', color: '#F97316' },
            { cat: 'Accessibility', icon: '♿', color: '#06B6D4' },
          ].map((item) => {
            const count = feConcepts.filter(c => c.category === item.cat).length;
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

      {/* Quick Links */}
      <ScrollSection>
        <SectionLabel text="EXPLORE FRONTEND DOCS" />
        <h2 className="section-title">Navigate the frontend documentation</h2>

        <div className="grid-2">
          {[
            { icon: '🏗️', title: 'Architecture', desc: 'Folder structure, component tree, data flow patterns', path: '/fe/architecture' },
            { icon: '🧩', title: 'Components', desc: `${feComponents.length}+ components with props, patterns, and categories`, path: '/fe/components' },
            { icon: '📄', title: 'Pages & Routing', desc: 'All screens, layouts, auth guards, and lazy loading', path: '/fe/pages' },
            { icon: '🔄', title: 'State & API', desc: 'Zustand, React Query, Axios, WebSocket integration', path: '/fe/state' },
            { icon: '🧪', title: 'Testing', desc: 'Vitest, RTL, MSW, Playwright — the full testing stack', path: '/fe/testing' },
            { icon: '🗺️', title: 'Roadmap', desc: 'Phase-by-phase frontend build order with timelines', path: '/fe/roadmap' },
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
