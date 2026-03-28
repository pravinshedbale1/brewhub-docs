import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import Timeline from '../components/Timeline';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StatBox from '../components/StatBox';

const roadmapItems = [
  {
    phase: 'PHASE 1 — FOUNDATION',
    title: 'Project Setup & Core Infrastructure',
    duration: '1.5 Weeks',
    milestone: 'All infrastructure services running via docker compose up. Eureka dashboard shows all services registered. Config Server serves configs from Git.',
    detail: 'Set up the Maven parent POM, Docker Compose with all infrastructure services, Eureka Server, Config Server, and the API Gateway skeleton. Get the foundation running before writing any business logic.',
    weeklyBreakdown: [
      { week: 'Day 1-3', task: 'Maven parent POM, module structure, .gitignore, README, Docker Compose with PostgreSQL, MongoDB, Redis, Kafka, Elasticsearch' },
      { week: 'Day 4-5', task: 'Eureka Server + Config Server (Git-backed). Verify service registration.' },
      { week: 'Day 6-8', task: 'API Gateway skeleton with Spring Cloud Gateway. Route definitions. Basic health endpoints for all services.' },
      { week: 'Day 9-10', task: 'Zipkin tracing setup. Verify end-to-end request tracing across services. Write docker-compose.yml docs.' },
    ],
    tags: ['Docker Compose', 'Eureka', 'Config Server', 'Maven', 'Gateway'],
    color: '#3B82F6',
  },
  {
    phase: 'PHASE 2 — USER SERVICE',
    title: 'Authentication & User Management',
    duration: '2 Weeks',
    milestone: 'User can register, login, receive a JWT, access protected endpoints, and see their cached profile from Redis. Flyway runs migrations on startup.',
    detail: 'Build the User Service first — it\'s the dependency for everything. Implement registration, JWT auth, Spring Security, password encoding, user profiles, and Redis session caching. This is where you learn Spring Security deeply.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'User entity, Flyway migrations, registration/login endpoints, BCrypt password hashing, JWT generation & validation, Spring Security filter chain' },
      { week: 'Week 2', task: 'User profile CRUD, MapStruct DTOs, Redis session/profile caching, role-based access control, unit tests + MockMvc controller tests' },
    ],
    tags: ['Spring Security', 'JWT', 'PostgreSQL', 'Redis', 'BCrypt', 'MapStruct', 'Flyway'],
    color: '#3B82F6',
  },
  {
    phase: 'PHASE 3 — CONTENT SERVICE',
    title: 'CRUD, JPA Deep Dive, File Storage',
    duration: '2 Weeks',
    milestone: 'User can create/edit/delete snippets and articles. Pagination, sorting, filtering all work via query params. Files upload to MinIO. Optimistic locking prevents concurrent edit conflicts.',
    detail: 'Build the core content creation — snippets and articles. Master Spring Data JPA: Specifications, Pagination, QueryDSL, auditing. Add file uploads with MinIO. Implement soft deletes and versioning.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'Snippet + Article entities, Flyway migrations, full CRUD endpoints, Spring Data JPA Pageable, Sort, Specifications for dynamic filtering' },
      { week: 'Week 2', task: 'MinIO file upload/download, JPA Auditing (@CreatedDate, @LastModifiedDate), optimistic locking (@Version), soft deletes, integration tests with Testcontainers' },
    ],
    tags: ['Spring Data JPA', 'Specifications', 'Pagination', 'MinIO', 'Optimistic Locking'],
    color: '#22C55E',
  },
  {
    phase: 'PHASE 4 — KAFKA INTEGRATION',
    title: 'Event-Driven Architecture',
    duration: '1.5 Weeks',
    milestone: 'Content Service publishes events to Kafka on every create/update/delete. Events follow CloudEvents schema. You can see messages in Kafka console consumer. Gateway routes are finalized.',
    detail: 'Add Kafka to the stack. Make Content Service produce events. Design the event schema. Build the event envelope. This phase transforms the project from a monolith-style architecture into true microservices.',
    weeklyBreakdown: [
      { week: 'Day 1-3', task: 'Kafka producer config in Content Service, event envelope design (CloudEvents spec), KafkaTemplate, ProducerInterceptor' },
      { week: 'Day 4-6', task: 'Define topics (content.created, content.updated, content.deleted, user.events), create topic configuration with partitions and replication' },
      { week: 'Day 7-10', task: 'API Gateway route finalization, JWT validation filter in Gateway, rate limiting with Redis, test full request flow end-to-end' },
    ],
    tags: ['Kafka Producer', 'Event Schema', 'CloudEvents', 'KafkaTemplate'],
    color: '#A855F7',
  },
  {
    phase: 'PHASE 5 — SEARCH SERVICE',
    title: 'CQRS & Elasticsearch',
    duration: '1.5 Weeks',
    milestone: 'Search endpoint returns full-text results from Elasticsearch. Data is synced automatically via Kafka consumers. Autocomplete and faceted search work.',
    detail: 'Build the Search Service as a pure Kafka consumer. Index content into Elasticsearch. Implement full-text search, autocomplete, and faceted filtering. This teaches CQRS pattern hands-on.',
    weeklyBreakdown: [
      { week: 'Day 1-4', task: '@KafkaListener consumers, Elasticsearch index mapping, bulk indexing, document sync on create/update/delete events' },
      { week: 'Day 5-7', task: 'Multi-field full-text search, completion suggester (autocomplete), filter by language/tags/author' },
      { week: 'Day 8-10', task: 'Aggregation queries (facets), search result highlighting, error handling for deserialization failures, consumer group management' },
    ],
    tags: ['Elasticsearch', 'CQRS', '@KafkaListener', 'Full-Text Search', 'Aggregations'],
    color: '#06B6D4',
  },
  {
    phase: 'PHASE 6 — NOTIFICATION SERVICE',
    title: 'MongoDB, WebSocket & Async Processing',
    duration: '2 Weeks',
    milestone: 'When a user creates content, followers receive real-time notifications via WebSocket AND stored in MongoDB. Read/unread status works. Email notifications send for important events.',
    detail: 'Build notifications with MongoDB for storage, WebSocket/STOMP for real-time push, and email templates with Thymeleaf. Consume events from multiple Kafka topics. Implement CompletableFuture for async processing.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'MongoDB document design, Kafka multi-topic consumer, notification creation pipeline, CompletableFuture for parallel email + push + storage' },
      { week: 'Week 2', task: 'WebSocket/STOMP endpoint, real-time push to connected users, SSE fallback, read/unread status, notification preferences, Thymeleaf email templates' },
    ],
    tags: ['MongoDB', 'WebSocket', 'SSE', '@Async', 'CompletableFuture', 'Thymeleaf'],
    color: '#EC4899',
  },
  {
    phase: 'PHASE 7 — ANALYTICS SERVICE',
    title: 'Kafka Streams & Spring Batch',
    duration: '2 Weeks',
    milestone: 'Dashboard shows real-time trending content (updated every 5 minutes). Daily report batch job runs at midnight. Redis leaderboard shows top contributors with sorted sets.',
    detail: 'Build real-time analytics with Kafka Streams — windowed aggregations, KTables, trending computation. Add Spring Batch for daily/weekly report generation. Use Redis Sorted Sets for leaderboards.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'Kafka Streams topology: KStream → KTable, windowed aggregations (5-min tumbling windows), trending content computation, Redis Sorted Sets for leaderboards' },
      { week: 'Week 2', task: 'Spring Batch job: reader → processor → writer pipeline, daily/weekly report generation, @Scheduled cron triggers, HyperLogLog for unique visitor counting' },
    ],
    tags: ['Kafka Streams', 'Spring Batch', 'Redis Sorted Sets', 'HyperLogLog', '@Scheduled'],
    color: '#A855F7',
  },
  {
    phase: 'PHASE 8 — COLLABORATION SERVICE',
    title: 'Real-Time Code Collaboration',
    duration: '2 Weeks',
    milestone: 'Two users can join a coding session, see each other\'s cursor, and edit code in real-time. Session state persists across reconnects via Redis. Virtual Threads handle WebSocket connections.',
    detail: 'Build live coding sessions with WebSocket, Redis Pub/Sub for multi-instance sync, and operational transform basics. Use Virtual Threads for efficient WebSocket handlers. Implement sealed classes for message types.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'Session management entity, WebSocket endpoints for live coding, Redis Pub/Sub for multi-instance message broadcast, sealed classes for message types (JoinSession, CodeEdit, CursorMove)' },
      { week: 'Week 2', task: 'Virtual Threads for WebSocket handlers, operational transform basics (cursor conflict resolution), session recording/playback, reconnect with state recovery from Redis' },
    ],
    tags: ['WebSocket', 'Redis Pub/Sub', 'Virtual Threads', 'Sealed Classes', 'Records'],
    color: '#F59E0B',
  },
  {
    phase: 'PHASE 9 — REVIEW SERVICE',
    title: 'State Machine & Workflow Engine',
    duration: '1.5 Weeks',
    milestone: 'Code review follows a strict workflow: Draft → Submitted → In Review → Approved/Rejected → Merged. Invalid transitions are rejected. Inline comments thread recursively.',
    detail: 'Build the code review workflow with Spring Statemachine. Implement state transitions, guards, and actions. Add inline comment threading with recursive queries. Use DTO projections for efficient data loading.',
    weeklyBreakdown: [
      { week: 'Day 1-4', task: 'Review entity, Spring Statemachine configuration (states, events, transitions, guards), state persistence, action handlers for email/notification on state change' },
      { week: 'Day 5-7', task: 'Inline comment model with parent-child threading, recursive CTE queries for comment trees, DTO projections (@Value interface projections), Criteria API for dynamic review filtering' },
      { week: 'Day 8-10', task: 'Review assignment algorithm, reviewer workload balancing, review metrics (avg time to review), integration tests for all state transitions' },
    ],
    tags: ['Spring Statemachine', 'State Pattern', 'Recursive Queries', 'Criteria API'],
    color: '#10B981',
  },
  {
    phase: 'PHASE 10 — HARDENING',
    title: 'Security, Resilience & Observability',
    duration: '2 Weeks',
    milestone: 'OAuth2 login works with GitHub/Google. Circuit breaker opens when a downstream service is down. Grafana dashboard shows request rates, error rates, and p99 latency. Logs flow to Kibana.',
    detail: 'Add OAuth2 social login, rate limiting with Redis, circuit breaking with Resilience4j. Integrate Micrometer metrics, Zipkin tracing, and the ELK logging stack. Add Testcontainers for integration tests.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'OAuth2 social login (GitHub, Google), Resilience4j Circuit Breaker + Retry + Bulkhead on inter-service calls, Redis-based rate limiting in API Gateway' },
      { week: 'Week 2', task: 'Micrometer custom metrics, Prometheus scraping, Grafana dashboard, ELK stack (Logback → Logstash → Elasticsearch → Kibana), Testcontainers for all integration tests' },
    ],
    tags: ['OAuth2', 'Resilience4j', 'Micrometer', 'Zipkin', 'Testcontainers', 'ELK'],
    color: '#EF4444',
  },
  {
    phase: 'PHASE 11 — ADVANCED',
    title: 'Polish, Patterns & Production Readiness',
    duration: '2 Weeks',
    milestone: 'Saga pattern handles distributed user deletion across services. DLT catches all failed events. CI/CD pipeline auto-deploys on push. >80% test coverage achieved.',
    detail: 'Implement AOP logging, custom annotations, Saga pattern for distributed transactions, Dead Letter Topics, idempotent consumers. Write comprehensive tests. Create CI/CD pipeline. Document everything.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'AOP logging aspect, custom @RateLimited annotation, Saga pattern (choreography-based) for user account deletion across all services, Dead Letter Topics for failed events' },
      { week: 'Week 2', task: 'Idempotent consumers (idempotency key in Redis), comprehensive test coverage audit, GitHub Actions CI/CD pipeline, API documentation with SpringDoc OpenAPI, final README' },
    ],
    tags: ['AOP', 'Saga Pattern', 'DLT', 'CI/CD', 'GitHub Actions', 'Documentation'],
    color: '#F97316',
  },
];

const totalTimeline = {
  total: '~20 Weeks',
  pace: 'Assuming ~3 hours/day on weekdays, ~5 hours on weekends',
  breakdown: [
    { label: 'Foundation & Setup', weeks: '1.5', color: '#3B82F6' },
    { label: 'Core Services (User + Content)', weeks: '4', color: '#22C55E' },
    { label: 'Event Architecture (Kafka + Search)', weeks: '3', color: '#A855F7' },
    { label: 'Advanced Services (Notif + Analytics)', weeks: '4', color: '#EC4899' },
    { label: 'Real-Time (Collab + Review)', weeks: '3.5', color: '#F59E0B' },
    { label: 'Production Hardening', weeks: '4', color: '#EF4444' },
  ],
};

export default function Roadmap() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="LEARNING ROADMAP" />
        <h1 className="section-title">Build in order, learn progressively</h1>
        <p className="body-text mb-24">
          Don't try to build everything at once. Follow this roadmap — each phase builds
          on the previous and introduces new concepts gradually. By the end, you'll have
          built a production-grade distributed system from scratch.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value="11" label="Phases" color="var(--orange)" />
          <StatBox value="~20" label="Weeks" color="var(--blue)" />
          <StatBox value="8" label="Services" color="var(--green)" />
          <StatBox value="100+" label="Concepts" color="var(--purple)" />
        </div>
      </ScrollSection>

      {/* Realistic Timeline Overview */}
      <ScrollSection>
        <SectionLabel text="REALISTIC TIMELINE" />
        <h2 className="section-title">How long will this actually take?</h2>
        <p className="body-text mb-16">
          Assuming you're working on this alongside a full-time job or studies — about
          <strong> 3 hours on weekdays</strong> and <strong>5 hours on weekends</strong>.
          Total estimated time: <strong>~20 weeks (5 months)</strong>.
        </p>
        <p className="small-text mb-32" style={{ color: 'var(--text-dim)' }}>
          ⚡ If you're doing this full-time (8 hrs/day), you can finish in ~8-10 weeks.
          If you can only do weekends, plan for ~8-9 months. Adjust to your pace — consistency beats speed.
        </p>

        {/* Visual timeline bar */}
        <div className="card mb-32" style={{ padding: '28px' }}>
          <div className="metadata-text mb-16">PHASE DURATION BREAKDOWN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {totalTimeline.breakdown.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="small-text" style={{ minWidth: 250, color: 'var(--text-secondary)' }}>{item.label}</span>
                <div style={{ flex: 1, height: 24, background: 'rgba(255,255,255,0.03)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    width: `${(parseFloat(item.weeks) / 20) * 100}%`,
                    height: '100%',
                    background: `${item.color}30`,
                    border: `1px solid ${item.color}40`,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: item.color,
                      fontWeight: 600,
                    }}>{item.weeks}w</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
            <span className="metadata-text">TOTAL: ~20 WEEKS</span>
          </div>
        </div>

        {/* Pace options */}
        <div className="grid-3 mb-32">
          <Card semantic color="#22C55E">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏃</div>
              <div className="card-title" style={{ marginBottom: 4 }}>Full-Time Grind</div>
              <div className="metadata-text mb-8">8 HRS/DAY</div>
              <div className="stat-number" style={{ color: '#22C55E', fontSize: 28 }}>8-10 Weeks</div>
              <p className="small-text" style={{ marginTop: 8 }}>If you're between jobs or on break. Go all-in.</p>
            </div>
          </Card>
          <Card semantic color="#3B82F6">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
              <div className="card-title" style={{ marginBottom: 4 }}>Working Professional</div>
              <div className="metadata-text mb-8">3 HRS/DAY + WEEKENDS</div>
              <div className="stat-number" style={{ color: '#3B82F6', fontSize: 28 }}>20 Weeks</div>
              <p className="small-text" style={{ marginTop: 8 }}>Recommended pace. Sustainable and steady.</p>
            </div>
          </Card>
          <Card semantic color="#A855F7">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🐢</div>
              <div className="card-title" style={{ marginBottom: 4 }}>Weekends Only</div>
              <div className="metadata-text mb-8">SAT + SUN ONLY</div>
              <div className="stat-number" style={{ color: '#A855F7', fontSize: 28 }}>8-9 Months</div>
              <p className="small-text" style={{ marginTop: 8 }}>Totally fine. Slow progress beats no progress.</p>
            </div>
          </Card>
        </div>
      </ScrollSection>

      <ScrollSection>
        <SectionLabel text="BUILD ORDER" />
        <h2 className="section-title">From foundation to advanced, step by step</h2>
        <p className="body-text mb-32">
          Each phase has a clear duration, weekly breakdown, and a <strong>milestone</strong> — a concrete
          deliverable that proves you've completed the phase before moving on. Don't skip milestones.
        </p>

        <Timeline items={roadmapItems} />
      </ScrollSection>

      {/* Monthly Checkpoints */}
      <ScrollSection>
        <SectionLabel text="MONTHLY CHECKPOINTS" />
        <h2 className="section-title">Where should you be each month?</h2>
        <p className="body-text mb-24">
          Use these checkpoints to gauge your progress. If you're behind, that's okay — revisit
          and solidify before moving forward.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { month: 'Month 1', title: 'The Foundation is Solid', desc: 'Infrastructure running, User Service complete with JWT auth, Content Service CRUD working. You can create a user, login, and create/edit snippets via Postman.', topics: '~25 concepts learned', color: '#3B82F6', icon: '🏗️' },
            { month: 'Month 2', title: 'Events are Flowing', desc: 'Kafka integration complete. Search Service indexes content automatically. Notifications arrive in real-time via WebSocket. You understand event-driven architecture.', topics: '~50 concepts learned', color: '#22C55E', icon: '📨' },
            { month: 'Month 3', title: 'Analytics & Real-Time', desc: 'Kafka Streams computes trending content. Spring Batch generates reports. Live coding collaboration works between 2 users. Redis is your best friend.', topics: '~72 concepts learned', color: '#A855F7', icon: '📊' },
            { month: 'Month 4', title: 'Workflows & Review', desc: 'Code review state machine works end-to-end. OAuth2 login with GitHub. Circuit breakers protect inter-service calls. Grafana dashboard looks beautiful.', topics: '~90 concepts learned', color: '#F59E0B', icon: '⚙️' },
            { month: 'Month 5', title: 'Production Ready', desc: 'CI/CD pipeline deploys on push. Saga pattern handles distributed ops. DLT catches failures. >80% test coverage. You are interview-ready.', topics: '100+ concepts mastered! 🎉', color: '#EF4444', icon: '🚀' },
          ].map((checkpoint) => (
            <Card key={checkpoint.month} semantic color={checkpoint.color}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{checkpoint.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div className="metadata-text" style={{ color: checkpoint.color }}>{checkpoint.month}</div>
                      <div className="card-title" style={{ margin: '4px 0' }}>{checkpoint.title}</div>
                    </div>
                    <Badge text={checkpoint.topics} color={checkpoint.color} />
                  </div>
                  <p className="small-text" style={{ marginTop: 6 }}>{checkpoint.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Tips */}
      <ScrollSection>
        <SectionLabel text="PRO TIPS" />
        <h2 className="section-title">Advice from experience</h2>

        <div className="grid-2 mt-24">
          {[
            { icon: '🧪', title: 'Test as you build', desc: 'Write unit tests for services, MockMvc for controllers, and Testcontainers for integration tests. Don\'t leave testing for "later" — later never comes.', color: '#22C55E' },
            { icon: '📖', title: 'Read the source', desc: 'When Spring does something "magic", read the auto-configuration source code. Understanding @Conditional, @EnableAutoConfiguration, and starter POMs demystifies everything.', color: '#3B82F6' },
            { icon: '🐛', title: 'Embrace failures', desc: 'Kill a service while processing. Send invalid data to Kafka. Exhaust Redis connections. Break things intentionally to understand resilience patterns like Circuit Breaker and DLT.', color: '#EF4444' },
            { icon: '📝', title: 'Document decisions', desc: 'For every "why" question (why Kafka over RabbitMQ? why MongoDB over DynamoDB?), write an Architecture Decision Record. This builds interview-ready communication skills.', color: '#A855F7' },
            { icon: '🔍', title: 'Monitor everything', desc: 'Set up Prometheus + Grafana early. Watch metrics as you add features. Understanding p99 latency, error rates, and throughput is what separates mid from senior engineers.', color: '#F97316' },
            { icon: '🤝', title: 'Build in public', desc: 'Share your progress on @bytecodebreww. Post architecture diagrams, code snippets, and lessons learned. Teaching reinforces learning and builds your developer brand.', color: '#EC4899' },
          ].map((tip) => (
            <Card key={tip.title} semantic color={tip.color}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{tip.icon}</span>
                <div>
                  <div className="card-title" style={{ marginBottom: 6 }}>{tip.title}</div>
                  <p className="small-text">{tip.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
