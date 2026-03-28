import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import MermaidDiagram from '../components/MermaidDiagram';
import { classDigrams, reviewStateDiagram } from '../data/diagrams';

export default function UMLDiagrams() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="UML DIAGRAMS" />
        <h1 className="section-title">Visual blueprints for every service</h1>
        <p className="body-text mb-24">
          These UML diagrams show the class structure, relationships, and design patterns
          used within each service. Use them as reference while implementing.
        </p>
      </ScrollSection>

      {/* User Service Class Diagram */}
      <ScrollSection>
        <SectionLabel text="USER SERVICE" />
        <h2 className="section-title">Authentication & user management classes</h2>
        <p className="body-text mb-24">
          The User Service uses the Strategy Pattern for authentication. Multiple authentication
          strategies (JWT, OAuth2) implement a common interface. The AuthService auto-discovers
          strategies via Spring's dependency injection.
        </p>
        <MermaidDiagram chart={classDigrams.userService} label="User Service — Class Diagram" />
      </ScrollSection>

      {/* Content Service Class Diagram */}
      <ScrollSection>
        <SectionLabel text="CONTENT SERVICE" />
        <h2 className="section-title">Content pipeline & Decorator Pattern</h2>
        <p className="body-text mb-24">
          The Content Service uses a pipeline of ContentProcessor implementations (Decorator Pattern).
          Raw content flows through Markdown rendering, syntax highlighting, and sanitization — each
          processor wrapping the previous result.
        </p>
        <MermaidDiagram chart={classDigrams.contentService} label="Content Service — Class Diagram" />
      </ScrollSection>

      {/* Review State Machine */}
      <ScrollSection>
        <SectionLabel text="REVIEW SERVICE" />
        <h2 className="section-title">Review lifecycle state machine</h2>
        <p className="body-text mb-24">
          The Review Service implements a state machine using Spring Statemachine. Each state
          transition has guards (conditions) and actions (side effects). The state machine prevents
          invalid transitions — you can't approve a DRAFT review without going through PENDING first.
        </p>
        <MermaidDiagram chart={reviewStateDiagram} label="Review Service — State Machine Diagram" />

        <div className="grid-2 mt-24">
          <div className="alert-card alert-card--green">
            <div className="alert-card__label">VALID TRANSITIONS</div>
            <div className="alert-card__text">
              DRAFT → PENDING (submit) · PENDING → IN_REVIEW (assign reviewer) ·
              IN_REVIEW → APPROVED (approve) · IN_REVIEW → CHANGES_REQUESTED (request changes) ·
              CHANGES_REQUESTED → IN_REVIEW (author updates)
            </div>
          </div>
          <div className="alert-card alert-card--red">
            <div className="alert-card__label">INVALID TRANSITIONS (BLOCKED)</div>
            <div className="alert-card__text">
              DRAFT → APPROVED (skip review) · PENDING → APPROVED (skip assignment) ·
              APPROVED → IN_REVIEW (reopen approved) · CLOSED → anything (terminal state)
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Notification Service */}
      <ScrollSection>
        <SectionLabel text="NOTIFICATION SERVICE" />
        <h2 className="section-title">Multi-channel notification delivery</h2>
        <p className="body-text mb-24">
          The Notification Service uses Factory + Strategy patterns to handle multiple delivery
          channels. A notification event is routed to the correct channel based on user preferences.
        </p>
        <MermaidDiagram
          chart={`classDiagram
    class NotificationService {
        -Map~Channel, NotificationFactory~ factories
        -NotificationRepository repo
        +process(NotificationEvent) void
        -getChannels(String userId, String type) List
    }
    
    class NotificationFactory {
        <<interface>>
        +create(NotificationEvent) Notification
    }
    
    class InAppNotificationFactory {
        +create(NotificationEvent) Notification
    }
    
    class EmailNotificationFactory {
        -TemplateEngine engine
        -EmailSender sender
        +create(NotificationEvent) Notification
    }
    
    class PushNotificationFactory {
        -PushProvider provider
        +create(NotificationEvent) Notification
    }
    
    class Notification {
        <<abstract>>
        -String id
        -String userId
        -String type
        -String title
        -String message
        -boolean read
        -Instant createdAt
        +deliver() void
    }
    
    class InAppNotification {
        +deliver() void
    }
    
    class EmailNotification {
        -String subject
        -String htmlBody
        +deliver() void
    }
    
    class PushNotification {
        -String deviceToken
        +deliver() void
    }
    
    class NotificationRepository {
        <<interface>>
        +save(Notification) Notification
        +findByUserId(String) List
        +markAsRead(String) void
    }
    
    NotificationService --> NotificationFactory
    NotificationService --> NotificationRepository
    NotificationFactory <|.. InAppNotificationFactory
    NotificationFactory <|.. EmailNotificationFactory
    NotificationFactory <|.. PushNotificationFactory
    Notification <|-- InAppNotification
    Notification <|-- EmailNotification
    Notification <|-- PushNotification`}
          label="Notification Service — Factory + Strategy Pattern"
        />
      </ScrollSection>

      {/* Analytics Stream Topology */}
      <ScrollSection>
        <SectionLabel text="ANALYTICS SERVICE" />
        <h2 className="section-title">Kafka Streams processing topology</h2>
        <p className="body-text mb-24">
          The Analytics Service uses Kafka Streams for real-time event processing. 
          Events flow through a topology of transformations — filtering, grouping,
          windowing, and aggregating — producing trending scores.
        </p>
        <MermaidDiagram
          chart={`graph LR
    A[📨 brewhub.content.events] --> B{Filter}
    B -->|content.viewed| C[Group by contentId]
    B -->|content.created| D[Count new content]
    B -->|content.commented| E[Engagement score]
    
    C --> F[Window: 1 hour]
    F --> G[Count views]
    G --> H[KTable: hourly-view-counts]
    
    D --> I[Window: 1 day]
    I --> J[Count new]
    J --> K[KTable: daily-content-counts]
    
    E --> L[Window: 1 hour]
    L --> M[Score engagement]
    M --> N[KTable: engagement-scores]
    
    H --> O[Merge & Rank]
    K --> O
    N --> O
    O --> P[📊 brewhub.analytics.events]
    
    style A fill:#A855F720,stroke:#A855F7
    style P fill:#22C55E20,stroke:#22C55E
    style B fill:#F59E0B20,stroke:#F59E0B
    style H fill:#3B82F620,stroke:#3B82F6
    style K fill:#3B82F620,stroke:#3B82F6
    style N fill:#3B82F620,stroke:#3B82F6
    style O fill:#FF8C0020,stroke:#FF8C00`}
          label="Analytics Service — Kafka Streams Topology"
        />
      </ScrollSection>
    </>
  );
}
