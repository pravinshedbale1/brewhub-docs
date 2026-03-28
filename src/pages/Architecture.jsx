import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import MermaidDiagram from '../components/MermaidDiagram';
import DiagramLayer, { FlowConnector } from '../components/DiagramLayer';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { architectureDiagram, eventFlowDiagram } from '../data/diagrams';

export default function Architecture() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="SYSTEM ARCHITECTURE" />
        <h1 className="section-title">The invisible architecture that connects everything</h1>
        <p className="body-text mb-24">
          BrewHub follows an event-driven microservices architecture. Services are loosely coupled,
          communicate asynchronously via Kafka, and each owns its database (Database-per-Service pattern).
          The API Gateway is the single entry point for all external traffic.
        </p>
      </ScrollSection>

      {/* High-Level Architecture Diagram */}
      <ScrollSection>
        <SectionLabel text="HIGH-LEVEL VIEW" />
        <h2 className="section-title">Service topology & data flow</h2>
        <p className="body-text mb-24">
          This diagram shows how all 8 microservices connect through the API Gateway,
          register with Eureka for service discovery, and communicate asynchronously through Kafka topics.
        </p>
        <MermaidDiagram chart={architectureDiagram} label="BrewHub — High Level Architecture" />
      </ScrollSection>

      {/* Event Flow */}
      <ScrollSection>
        <SectionLabel text="EVENT FLOW" />
        <h2 className="section-title">What happens when a user creates a snippet?</h2>
        <p className="body-text mb-24">
          This sequence diagram shows the complete request lifecycle — from client to gateway,
          through the Content Service, into Kafka, and out to consumers for search indexing,
          notifications, and analytics. All consumer processing happens asynchronously.
        </p>
        <MermaidDiagram chart={eventFlowDiagram} label="Snippet Creation — Event Flow" />
      </ScrollSection>

      {/* Architecture Layers */}
      <ScrollSection>
        <SectionLabel text="LAYER ARCHITECTURE" />
        <h2 className="section-title">Six layers, each with clear responsibilities</h2>
        <p className="body-text mb-24">
          Every request flows through these layers. The separation ensures each layer can evolve
          independently and be tested in isolation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DiagramLayer
            icon="🖥️"
            title="Presentation Layer"
            subtitle="REST CONTROLLERS"
            description="@RestController, @RequestMapping, request/response DTOs, Bean Validation"
            color="#F97316"
          />
          <FlowConnector />
          <DiagramLayer
            icon="🛡️"
            title="Security Layer"
            subtitle="SPRING SECURITY FILTERS"
            description="JWT validation, RBAC authorization, CORS, rate limiting"
            color="#EF4444"
          />
          <FlowConnector />
          <DiagramLayer
            icon="⚙️"
            title="Service Layer"
            subtitle="BUSINESS LOGIC"
            description="@Service, @Transactional, domain logic, event publishing"
            color="#3B82F6"
          />
          <FlowConnector />
          <DiagramLayer
            icon="🗄️"
            title="Repository Layer"
            subtitle="SPRING DATA"
            description="JpaRepository, MongoRepository, RedisTemplate, custom queries"
            color="#06B6D4"
          />
          <FlowConnector />
          <DiagramLayer
            icon="📨"
            title="Messaging Layer"
            subtitle="KAFKA PRODUCERS / CONSUMERS"
            description="KafkaTemplate, @KafkaListener, Kafka Streams topology"
            color="#A855F7"
          />
          <FlowConnector />
          <DiagramLayer
            icon="🎯"
            title="Cross-Cutting Layer"
            subtitle="AOP, OBSERVABILITY, CONFIG"
            description="Logging, metrics, tracing, error handling, configuration"
            color="#22C55E"
          />
        </div>
      </ScrollSection>

      {/* Key Architectural Decisions */}
      <ScrollSection>
        <SectionLabel text="ARCHITECTURE DECISIONS" />
        <h2 className="section-title">Why this architecture?</h2>
        
        <div className="grid-2 mt-24">
          <Card semantic color="#22C55E">
            <div className="alert-card__label" style={{ color: 'var(--green)' }}>DATABASE PER SERVICE</div>
            <p className="small-text" style={{ marginTop: 8 }}>
              Each service owns its database. User Service has its PostgreSQL, Notification Service
              has its MongoDB. No shared databases. This enables independent deployment and prevents
              tight coupling through shared schemas.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              <Badge text="Data Isolation" color="#22C55E" />
              <Badge text="Independent Deploy" color="#22C55E" />
              <Badge text="Polyglot Persistence" color="#22C55E" />
            </div>
          </Card>

          <Card semantic color="#A855F7">
            <div className="alert-card__label" style={{ color: 'var(--purple)' }}>EVENT-DRIVEN COMMUNICATION</div>
            <p className="small-text" style={{ marginTop: 8 }}>
              Services don't call each other's APIs directly for domain events. Instead, they publish
              events to Kafka topics. Interested services subscribe. This eliminates temporal coupling
              and allows each service to process events at its own pace.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              <Badge text="Loose Coupling" color="#A855F7" />
              <Badge text="Async Processing" color="#A855F7" />
              <Badge text="Event Replay" color="#A855F7" />
            </div>
          </Card>

          <Card semantic color="#06B6D4">
            <div className="alert-card__label" style={{ color: 'var(--cyan)' }}>CQRS — COMMAND/QUERY SEPARATION</div>
            <p className="small-text" style={{ marginTop: 8 }}>
              Content is written to PostgreSQL (optimized for writes) and synced to Elasticsearch
              (optimized for reads/search) via Kafka events. This lets each datastore do what it
              does best without compromise.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              <Badge text="Write: PostgreSQL" color="#06B6D4" />
              <Badge text="Read: Elasticsearch" color="#06B6D4" />
              <Badge text="Sync: Kafka" color="#06B6D4" />
            </div>
          </Card>

          <Card semantic color="#F97316">
            <div className="alert-card__label" style={{ color: '#F97316' }}>API GATEWAY PATTERN</div>
            <p className="small-text" style={{ marginTop: 8 }}>
              The API Gateway is the single entry point. It handles cross-cutting concerns — JWT
              validation, rate limiting, circuit breaking, request routing — so services can focus
              on business logic. Clients never talk directly to services.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              <Badge text="Single Entry Point" color="#F97316" />
              <Badge text="Cross-Cutting" color="#F97316" />
              <Badge text="Rate Limiting" color="#F97316" />
            </div>
          </Card>
        </div>
      </ScrollSection>

      {/* Communication Patterns */}
      <ScrollSection>
        <SectionLabel text="COMMUNICATION" />
        <h2 className="section-title">Two communication styles, used strategically</h2>

        <div className="grid-2 mt-24">
          <Card semantic color="#3B82F6">
            <div className="alert-card__label" style={{ color: 'var(--blue)' }}>SYNCHRONOUS (REST / HTTP)</div>
            <p className="small-text" style={{ marginTop: 8, marginBottom: 12 }}>
              Used when the client needs an immediate response. API Gateway routes requests to services
              via REST. Service-to-service sync calls are avoided — use only when absolutely needed
              (e.g., auth validation).
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <Badge text="Client → Gateway" color="#3B82F6" />
              <Badge text="Gateway → Service" color="#3B82F6" />
              <Badge text="Immediate Response" color="#3B82F6" />
            </div>
          </Card>

          <Card semantic color="#A855F7">
            <div className="alert-card__label" style={{ color: 'var(--purple)' }}>ASYNCHRONOUS (KAFKA / EVENTS)</div>
            <p className="small-text" style={{ marginTop: 8, marginBottom: 12 }}>
              Used for domain events and cross-service workflows. Content Service publishes events,
              Search Service indexes, Notification Service notifies. Each consumer processes at
              its own pace. Failed messages go to Dead Letter Topics.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <Badge text="Fire & Forget" color="#A855F7" />
              <Badge text="Multiple Consumers" color="#A855F7" />
              <Badge text="Retry + DLT" color="#A855F7" />
            </div>
          </Card>
        </div>
      </ScrollSection>
    </>
  );
}
