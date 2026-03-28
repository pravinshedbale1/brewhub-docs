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
    detail: 'Set up the Maven parent POM, Docker Compose with all infrastructure services, Eureka Server, Config Server, and the API Gateway skeleton. Get the foundation running before writing any business logic.',
    tags: ['Docker Compose', 'Eureka', 'Config Server', 'Maven', 'Gateway'],
    color: '#3B82F6',
  },
  {
    phase: 'PHASE 2 — USER SERVICE',
    title: 'Authentication & User Management',
    detail: 'Build the User Service first — it\'s the dependency for everything. Implement registration, JWT auth, Spring Security, password encoding, user profiles, and Redis session caching. This is where you learn Spring Security deeply.',
    tags: ['Spring Security', 'JWT', 'PostgreSQL', 'Redis', 'BCrypt', 'MapStruct', 'Flyway'],
    color: '#3B82F6',
  },
  {
    phase: 'PHASE 3 — CONTENT SERVICE',
    title: 'CRUD, JPA Deep Dive, File Storage',
    detail: 'Build the core content creation — snippets and articles. Master Spring Data JPA: Specifications, Pagination, QueryDSL, auditing. Add file uploads with MinIO. Implement soft deletes and versioning.',
    tags: ['Spring Data JPA', 'Specifications', 'Pagination', 'MinIO', 'Optimistic Locking'],
    color: '#22C55E',
  },
  {
    phase: 'PHASE 4 — KAFKA INTEGRATION',
    title: 'Event-Driven Architecture',
    detail: 'Add Kafka to the stack. Make Content Service produce events. Design the event schema. Build the event envelope. This phase transforms the project from a monolith-style architecture into true microservices.',
    tags: ['Kafka Producer', 'Event Schema', 'CloudEvents', 'KafkaTemplate'],
    color: '#A855F7',
  },
  {
    phase: 'PHASE 5 — SEARCH SERVICE',
    title: 'CQRS & Elasticsearch',
    detail: 'Build the Search Service as a pure Kafka consumer. Index content into Elasticsearch. Implement full-text search, autocomplete, and faceted filtering. This teaches CQRS pattern hands-on.',
    tags: ['Elasticsearch', 'CQRS', '@KafkaListener', 'Full-Text Search', 'Aggregations'],
    color: '#06B6D4',
  },
  {
    phase: 'PHASE 6 — NOTIFICATION SERVICE',
    title: 'MongoDB, WebSocket & Async Processing',
    detail: 'Build notifications with MongoDB for storage, WebSocket/STOMP for real-time push, and email templates with Thymeleaf. Consume events from multiple Kafka topics. Implement CompletableFuture for async processing.',
    tags: ['MongoDB', 'WebSocket', 'SSE', '@Async', 'CompletableFuture', 'Thymeleaf'],
    color: '#EC4899',
  },
  {
    phase: 'PHASE 7 — ANALYTICS SERVICE',
    title: 'Kafka Streams & Spring Batch',
    detail: 'Build real-time analytics with Kafka Streams — windowed aggregations, KTables, trending computation. Add Spring Batch for daily/weekly report generation. Use Redis Sorted Sets for leaderboards.',
    tags: ['Kafka Streams', 'Spring Batch', 'Redis Sorted Sets', 'HyperLogLog', '@Scheduled'],
    color: '#A855F7',
  },
  {
    phase: 'PHASE 8 — COLLABORATION SERVICE',
    title: 'Real-Time Code Collaboration',
    detail: 'Build live coding sessions with WebSocket, Redis Pub/Sub for multi-instance sync, and operational transform basics. Use Virtual Threads for efficient WebSocket handlers. Implement sealed classes for message types.',
    tags: ['WebSocket', 'Redis Pub/Sub', 'Virtual Threads', 'Sealed Classes', 'Records'],
    color: '#F59E0B',
  },
  {
    phase: 'PHASE 9 — REVIEW SERVICE',
    title: 'State Machine & Workflow Engine',
    detail: 'Build the code review workflow with Spring Statemachine. Implement state transitions, guards, and actions. Add inline comment threading with recursive queries. Use DTO projections for efficient data loading.',
    tags: ['Spring Statemachine', 'State Pattern', 'Recursive Queries', 'Criteria API'],
    color: '#10B981',
  },
  {
    phase: 'PHASE 10 — HARDENING',
    title: 'Security, Resilience & Observability',
    detail: 'Add OAuth2 social login, rate limiting with Redis, circuit breaking with Resilience4j. Integrate Micrometer metrics, Zipkin tracing, and the ELK logging stack. Add Testcontainers for integration tests.',
    tags: ['OAuth2', 'Resilience4j', 'Micrometer', 'Zipkin', 'Testcontainers', 'ELK'],
    color: '#EF4444',
  },
  {
    phase: 'PHASE 11 — ADVANCED',
    title: 'Polish, Patterns & Production Readiness',
    detail: 'Implement AOP logging, custom annotations, Saga pattern for distributed transactions, Dead Letter Topics, idempotent consumers. Write comprehensive tests. Create CI/CD pipeline. Document everything.',
    tags: ['AOP', 'Saga Pattern', 'DLT', 'CI/CD', 'GitHub Actions', 'Documentation'],
    color: '#F97316',
  },
];

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
          <StatBox value="~12" label="Weeks" color="var(--blue)" />
          <StatBox value="8" label="Services" color="var(--green)" />
          <StatBox value="100+" label="Concepts" color="var(--purple)" />
        </div>
      </ScrollSection>

      <ScrollSection>
        <SectionLabel text="BUILD ORDER" />
        <h2 className="section-title">From foundation to advanced, step by step</h2>
        <p className="body-text mb-32">
          Each phase is ~1 week of focused work. Don't rush — understanding the patterns
          matters more than shipping code. Take time to write tests and read the documentation
          for every library you use.
        </p>

        <Timeline items={roadmapItems} />
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
