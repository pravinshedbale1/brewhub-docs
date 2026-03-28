import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import MermaidDiagram from '../components/MermaidDiagram';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { databaseERD, mongoSchemas, redisPatterns } from '../data/diagrams';

export default function Database() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="DATABASE DESIGN" />
        <h1 className="section-title">Five databases, each earning its place</h1>
        <p className="body-text mb-24">
          BrewHub uses polyglot persistence — PostgreSQL for relational data, MongoDB for
          flexible documents, Redis for caching, Elasticsearch for search, and MinIO for files.
          Each database is chosen for specific strengths.
        </p>
      </ScrollSection>

      {/* ERD */}
      <ScrollSection>
        <SectionLabel text="ENTITY RELATIONSHIP DIAGRAM" />
        <h2 className="section-title">PostgreSQL — Relational schema</h2>
        <p className="body-text mb-24">
          The relational schema spans User, Content, Review, and Collaboration services.
          Each service owns its tables — no cross-service foreign keys. Relationships shown
          here represent the logical domain model.
        </p>
        <MermaidDiagram chart={databaseERD} label="BrewHub — PostgreSQL Entity Relationship Diagram" />
      </ScrollSection>

      {/* Key Tables */}
      <ScrollSection>
        <SectionLabel text="TABLE BREAKDOWN" />
        <h2 className="section-title">Key tables and their design decisions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          {[
            {
              name: 'users',
              service: 'User Service',
              color: '#3B82F6',
              decisions: [
                'UUID primary key (not auto-increment) for distributed safety',
                'username and email have UNIQUE constraints',
                'password_hash stored with BCrypt (never plain text)',
                'role uses PostgreSQL ENUM type',
                'Indexed on: username, email, created_at',
                'Soft delete via is_active flag (not hard delete)',
              ]
            },
            {
              name: 'snippets',
              service: 'Content Service',
              color: '#22C55E',
              decisions: [
                '@Version field for optimistic locking on concurrent edits',
                'is_deleted flag for soft deletes (content remains for analytics)',
                'view_count denormalized for fast read (synced via events)',
                'Indexed on: author_id, language, created_at, view_count',
                'Full-text index on title + description for basic search',
                'Snippet versions stored in separate table for history',
              ]
            },
            {
              name: 'reviews',
              service: 'Review Service',
              color: '#10B981',
              decisions: [
                'status tracks state machine state (DRAFT, PENDING, IN_REVIEW, etc.)',
                'State transitions validated by Spring Statemachine',
                'review_history table tracks every state transition (audit)',
                'quality_score computed from reviewer ratings and checklist',
                'review_comments supports line-level inline comments',
              ]
            },
            {
              name: 'sessions',
              service: 'Collaboration Service',
              color: '#F59E0B',
              decisions: [
                'initial_code captures starting state for session replay',
                'session_participants tracks join/leave events',
                'session_snapshots stores periodic code state (every 30s)',
                'Indexed on: creator_id, status, created_at',
              ]
            },
          ].map((table) => (
            <Card key={table.name} semantic color={table.color}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Badge text={table.name} color={table.color} />
                <span className="metadata-text" style={{ color: table.color }}>{table.service}</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {table.decisions.map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: table.color, flexShrink: 0, marginTop: 2 }}>▹</span>
                    <span className="small-text" style={{ color: 'var(--text-secondary)' }}>{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* MongoDB Schemas */}
      <ScrollSection>
        <SectionLabel text="MONGODB DOCUMENT SCHEMAS" />
        <h2 className="section-title">Flexible documents for evolving data</h2>
        <p className="body-text mb-24">
          MongoDB is used by the Notification Service for its flexible schema — notification
          types evolve frequently, and document embedding reduces join operations. TTL indexes
          auto-clean expired notifications.
        </p>
        <CodeBlock code={mongoSchemas} language="MongoDB Document Schemas" />

        <div className="grid-2 mt-24">
          <div className="alert-card alert-card--green">
            <div className="alert-card__label">WHY MONGODB FOR NOTIFICATIONS</div>
            <div className="alert-card__text">
              Notifications have varying metadata per type. MongoDB's flexible schema means
              new notification types don't require schema migrations. TTL indexes auto-expire
              old notifications. The aggregation pipeline powers grouped notification views.
            </div>
          </div>
          <div className="alert-card alert-card--orange">
            <div className="alert-card__label">DOCUMENT DESIGN DECISIONS</div>
            <div className="alert-card__text">
              Notification preferences are embedded in a single document per user (not in the
              notification documents) — read-heavy, rarely updated. Email templates are stored
              as documents with versioning for A/B testing different templates.
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Redis Patterns */}
      <ScrollSection>
        <SectionLabel text="REDIS KEY PATTERNS" />
        <h2 className="section-title">Beyond simple caching — Redis data structures</h2>
        <p className="body-text mb-24">
          Redis isn't just a cache in BrewHub. Sorted Sets power trending leaderboards,
          HyperLogLog counts unique views, Pub/Sub enables real-time collaboration sync,
          and sliding windows implement per-user rate limiting.
        </p>
        <CodeBlock code={redisPatterns} language="Redis Key Patterns" />

        <div className="grid-3 mt-24">
          {[
            { name: 'Caching', icon: '⚡', desc: 'User profiles, snippets (TTL: 5-10 min)', color: '#EF4444' },
            { name: 'Sessions', icon: '🔑', desc: 'JWT + refresh tokens, active sessions', color: '#EF4444' },
            { name: 'Rate Limiting', icon: '🚦', desc: 'Sliding window per-user-per-endpoint', color: '#EF4444' },
            { name: 'Trending', icon: '📈', desc: 'Sorted Sets for hot content rankings', color: '#EF4444' },
            { name: 'Unique Counts', icon: '👁️', desc: 'HyperLogLog for unique view counting', color: '#EF4444' },
            { name: 'Pub/Sub', icon: '📡', desc: 'Real-time collab sync across instances', color: '#EF4444' },
          ].map((item) => (
            <Card key={item.name} semantic color={item.color}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div className="card-title" style={{ fontSize: 14, marginTop: 6 }}>{item.name}</div>
              <p className="small-text" style={{ marginTop: 4 }}>{item.desc}</p>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Migration Strategy */}
      <ScrollSection>
        <SectionLabel text="MIGRATION STRATEGY" />
        <h2 className="section-title">Schema changes, version-controlled</h2>
        <p className="body-text mb-24">
          All PostgreSQL schema changes are managed via Flyway migrations. Each service
          maintains its own migration history. Migrations run automatically on application startup.
        </p>

        <CodeBlock
          code={`-- V1__create_users_table.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- V2__create_user_follows_table.sql
CREATE TABLE user_follows (
    follower_id UUID NOT NULL REFERENCES users(id),
    following_id UUID NOT NULL REFERENCES users(id),
    followed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id),
    CHECK (follower_id != following_id)
);`}
          language="Flyway Migration SQL"
        />
      </ScrollSection>
    </>
  );
}
