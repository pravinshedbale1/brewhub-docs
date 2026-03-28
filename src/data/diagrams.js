export const architectureDiagram = `graph TB
    Client[🖥️ Client / Frontend]
    Gateway[🌐 API Gateway :8080]
    Eureka[🧭 Eureka Server :8761]
    Config[⚙️ Config Server :8888]
    
    Client -->|REST / WebSocket| Gateway
    
    Gateway -->|Route| US[👤 User Service :8081]
    Gateway -->|Route| CS[📝 Content Service :8082]
    Gateway -->|Route| SS[🔍 Search Service :8083]
    Gateway -->|Route| NS[🔔 Notification Service :8084]
    Gateway -->|Route| AS[📊 Analytics Service :8085]
    Gateway -->|Route| CLS[🤝 Collaboration Service :8086]
    Gateway -->|Route| RS[✅ Review Service :8087]
    
    US -.->|Register| Eureka
    CS -.->|Register| Eureka
    SS -.->|Register| Eureka
    NS -.->|Register| Eureka
    AS -.->|Register| Eureka
    CLS -.->|Register| Eureka
    RS -.->|Register| Eureka
    Gateway -.->|Discover| Eureka
    
    US -.->|Config| Config
    CS -.->|Config| Config
    
    subgraph Kafka[Apache Kafka]
        T1[brewhub.user.events]
        T2[brewhub.content.events]
        T3[brewhub.review.events]
        T4[brewhub.collab.events]
        T5[brewhub.analytics.events]
    end
    
    US -->|Produce| T1
    CS -->|Produce| T2
    RS -->|Produce| T3
    CLS -->|Produce| T4
    
    T1 -->|Consume| NS
    T2 -->|Consume| SS
    T2 -->|Consume| NS
    T2 -->|Consume| AS
    T3 -->|Consume| NS
    T5 -->|Consume| AS
    
    US --- PG1[(PostgreSQL)]
    CS --- PG2[(PostgreSQL)]
    RS --- PG3[(PostgreSQL)]
    CLS --- PG4[(PostgreSQL)]
    AS --- PG5[(PostgreSQL)]
    
    NS --- Mongo[(MongoDB)]
    SS --- ES[(Elasticsearch)]
    
    US --- Redis1[(Redis)]
    Gateway --- Redis2[(Redis)]
    AS --- Redis3[(Redis)]
    CLS --- Redis4[(Redis)]
    
    CS --- MinIO[(MinIO / S3)]

    style Client fill:#FF8C0020,stroke:#FF8C00,color:#E8E6E3
    style Gateway fill:#F9731620,stroke:#F97316,color:#E8E6E3
    style Eureka fill:#3B82F620,stroke:#3B82F6,color:#E8E6E3
    style Config fill:#22C55E20,stroke:#22C55E,color:#E8E6E3
    style Kafka fill:#A855F710,stroke:#A855F7,color:#E8E6E3
`;

export const eventFlowDiagram = `sequenceDiagram
    participant U as 👤 User
    participant GW as 🌐 API Gateway
    participant CS as 📝 Content Service
    participant K as 📨 Kafka
    participant SS as 🔍 Search Service
    participant NS as 🔔 Notification Service
    participant AS as 📊 Analytics Service

    U->>GW: POST /api/v1/snippets
    GW->>GW: JWT Validation + Rate Limit
    GW->>CS: Forward Request
    CS->>CS: Validate & Save to PostgreSQL
    CS->>K: Publish content.created
    CS-->>GW: 201 Created
    GW-->>U: Snippet Created Response
    
    par Async Processing
        K->>SS: content.created event
        SS->>SS: Index in Elasticsearch
    and
        K->>NS: content.created event
        NS->>NS: Store notification (MongoDB)
        NS->>U: Push via WebSocket
    and
        K->>AS: content.created event
        AS->>AS: Update metrics (Redis)
    end
`;

export const databaseERD = `erDiagram
    USERS {
        uuid id PK
        string username UK
        string email UK
        string password_hash
        string bio
        string avatar_url
        enum role
        boolean email_verified
        timestamp created_at
        timestamp updated_at
    }
    
    USER_FOLLOWS {
        uuid follower_id FK
        uuid following_id FK
        timestamp followed_at
    }
    
    SNIPPETS {
        uuid id PK
        uuid author_id FK
        string title
        text code
        string language
        text description
        int view_count
        int version
        boolean is_deleted
        timestamp created_at
        timestamp updated_at
    }
    
    ARTICLES {
        uuid id PK
        uuid author_id FK
        string title
        text content_md
        text content_html
        string slug UK
        enum status
        int read_time_min
        timestamp published_at
        timestamp created_at
    }
    
    TAGS {
        uuid id PK
        string name UK
        string color
        int usage_count
    }
    
    CONTENT_TAGS {
        uuid content_id FK
        uuid tag_id FK
        string content_type
    }
    
    COMMENTS {
        uuid id PK
        uuid content_id FK
        uuid author_id FK
        uuid parent_id FK
        text body
        timestamp created_at
    }
    
    REVIEWS {
        uuid id PK
        uuid content_id FK
        uuid author_id FK
        enum status
        text summary
        int quality_score
        timestamp created_at
        timestamp updated_at
    }
    
    REVIEW_COMMENTS {
        uuid id PK
        uuid review_id FK
        uuid author_id FK
        int line_number
        text body
        timestamp created_at
    }
    
    SESSIONS {
        uuid id PK
        uuid creator_id FK
        string title
        enum status
        text initial_code
        string language
        timestamp created_at
        timestamp ended_at
    }
    
    SESSION_PARTICIPANTS {
        uuid session_id FK
        uuid user_id FK
        enum role
        timestamp joined_at
    }
    
    USERS ||--o{ SNIPPETS : creates
    USERS ||--o{ ARTICLES : writes
    USERS ||--o{ COMMENTS : posts
    USERS ||--o{ REVIEWS : requests
    USERS ||--o{ REVIEW_COMMENTS : writes
    USERS ||--o{ SESSIONS : creates
    USERS ||--o{ USER_FOLLOWS : follows
    USERS ||--o{ SESSION_PARTICIPANTS : joins
    SNIPPETS ||--o{ CONTENT_TAGS : has
    ARTICLES ||--o{ CONTENT_TAGS : has
    TAGS ||--o{ CONTENT_TAGS : used_in
    SNIPPETS ||--o{ COMMENTS : has
    ARTICLES ||--o{ COMMENTS : has
    COMMENTS ||--o{ COMMENTS : replies_to
    REVIEWS ||--o{ REVIEW_COMMENTS : has
    SESSIONS ||--o{ SESSION_PARTICIPANTS : has
`;

export const mongoSchemas = `// ── Notification Document (MongoDB) ──
{
  "_id": ObjectId("..."),
  "userId": "uuid-of-recipient",
  "type": "CONTENT_COMMENTED",  // FOLLOWED, REVIEW_REQUESTED, etc.
  "title": "New comment on your snippet",
  "message": "John commented on 'Binary Search in Java'",
  "metadata": {
    "contentId": "uuid-of-snippet",
    "commentId": "uuid-of-comment",
    "actorId": "uuid-of-commenter",
    "actorName": "John Doe",
    "actorAvatar": "https://..."
  },
  "channel": "IN_APP",           // EMAIL, PUSH
  "read": false,
  "createdAt": ISODate("2025-03-15T10:30:00Z"),
  "expiresAt": ISODate("2025-06-15T10:30:00Z")  // TTL index
}

// ── Notification Preferences (MongoDB) ──
{
  "_id": ObjectId("..."),
  "userId": "uuid-of-user",
  "channels": {
    "CONTENT_COMMENTED": ["IN_APP", "EMAIL"],
    "FOLLOWED": ["IN_APP"],
    "REVIEW_REQUESTED": ["IN_APP", "EMAIL", "PUSH"],
    "TRENDING": ["IN_APP"]
  },
  "quietHours": {
    "enabled": true,
    "start": "22:00",
    "end": "07:00",
    "timezone": "Asia/Kolkata"
  },
  "updatedAt": ISODate("2025-03-10T08:00:00Z")
}

// ── Email Template (MongoDB) ──
{
  "_id": ObjectId("..."),
  "name": "welcome",
  "subject": "Welcome to BrewHub, {{username}}!",
  "htmlBody": "<html>...</html>",
  "variables": ["username", "email", "loginUrl"],
  "version": 3,
  "active": true,
  "createdAt": ISODate("2025-01-01T00:00:00Z")
}`;

export const redisPatterns = `# ── Redis Key Patterns ──

# Session / JWT Management
SET   session:{userId}           "{jwt-token}"         EX 3600
SET   refresh:{tokenId}          "{userId}"            EX 604800

# Caching
SET   user:profile:{userId}      "{json}"              EX 300
SET   snippet:{snippetId}        "{json}"              EX 600
HSET  user:stats:{userId}        followers 142         
HSET  user:stats:{userId}        snippets 23           

# Rate Limiting (Sliding Window)
ZADD  rate:{userId}:{endpoint}   {timestamp} {requestId}
ZREMRANGEBYSCORE rate:{userId}:{endpoint} 0 {windowStart}
ZCARD rate:{userId}:{endpoint}

# Trending (Sorted Set)
ZINCRBY  trending:snippets:daily    1    {snippetId}
ZINCRBY  trending:snippets:weekly   1    {snippetId}
ZREVRANGE trending:snippets:daily   0    9   # Top 10

# Real-time Counters (HyperLogLog)
PFADD    views:{snippetId}:{date}   {visitorId}
PFCOUNT  views:{snippetId}:{date}

# Pub/Sub (Collaboration)
PUBLISH  collab:{sessionId}    "{edit-operation-json}"
SUBSCRIBE collab:{sessionId}

# Circuit Breaker State
SET   cb:content-service:state   "CLOSED"    EX 60
INCR  cb:content-service:failures`;

export const kafkaTopics = [
  {
    name: 'brewhub.user.events',
    partitions: 6,
    replication: 3,
    retention: '7 days',
    producer: 'User Service',
    consumers: ['Notification Service', 'Search Service', 'Analytics Service'],
    events: ['user.registered', 'user.updated', 'user.followed', 'user.logged-in'],
    keyStrategy: 'userId',
    color: '#3B82F6',
  },
  {
    name: 'brewhub.content.events',
    partitions: 12,
    replication: 3,
    retention: '14 days',
    producer: 'Content Service',
    consumers: ['Search Service', 'Notification Service', 'Analytics Service'],
    events: ['content.created', 'content.updated', 'content.deleted', 'content.viewed', 'content.commented'],
    keyStrategy: 'contentId',
    color: '#22C55E',
  },
  {
    name: 'brewhub.review.events',
    partitions: 6,
    replication: 3,
    retention: '7 days',
    producer: 'Review Service',
    consumers: ['Notification Service', 'Analytics Service'],
    events: ['review.requested', 'review.completed', 'review.commented'],
    keyStrategy: 'reviewId',
    color: '#10B981',
  },
  {
    name: 'brewhub.collab.events',
    partitions: 6,
    replication: 3,
    retention: '3 days',
    producer: 'Collaboration Service',
    consumers: ['Notification Service', 'Analytics Service'],
    events: ['collab.created', 'collab.invite', 'collab.ended'],
    keyStrategy: 'sessionId',
    color: '#F59E0B',
  },
  {
    name: 'brewhub.analytics.events',
    partitions: 12,
    replication: 3,
    retention: '30 days',
    producer: 'Analytics Service',
    consumers: ['Analytics Service (Kafka Streams)'],
    events: ['analytics.trending-updated', 'analytics.report-generated'],
    keyStrategy: 'metricType',
    color: '#A855F7',
  },
  {
    name: 'brewhub.notifications.dlq',
    partitions: 3,
    replication: 3,
    retention: '30 days',
    producer: 'Any (on failure)',
    consumers: ['Admin / Manual Processing'],
    events: ['Failed messages from any topic'],
    keyStrategy: 'originalTopic + key',
    color: '#EF4444',
  },
];

export const reviewStateDiagram = `stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> PENDING : Submit for Review
    PENDING --> IN_REVIEW : Reviewer Assigned
    IN_REVIEW --> APPROVED : Reviewer Approves
    IN_REVIEW --> CHANGES_REQUESTED : Changes Needed
    IN_REVIEW --> REJECTED : Reviewer Rejects
    CHANGES_REQUESTED --> IN_REVIEW : Author Updates
    CHANGES_REQUESTED --> CLOSED : Author Cancels
    APPROVED --> [*]
    REJECTED --> DRAFT : Author Revises
    REJECTED --> CLOSED : Author Cancels
    CLOSED --> [*]
    DRAFT --> CLOSED : Author Cancels

    note right of PENDING : Notification sent\\nto potential reviewers
    note right of APPROVED : Event published\\nto Kafka
`;

export const classDigrams = {
  userService: `classDiagram
    class User {
        -UUID id
        -String username
        -String email
        -String passwordHash
        -String bio
        -String avatarUrl
        -Role role
        -boolean emailVerified
        -LocalDateTime createdAt
        +getProfile() UserProfile
        +updateProfile(UpdateRequest) void
        +verifyEmail(String token) void
    }
    
    class AuthService {
        -List~AuthenticationStrategy~ strategies
        -JwtProvider jwtProvider
        -UserRepository userRepo
        +authenticate(AuthRequest) AuthResult
        +refreshToken(String) TokenPair
        +logout(String userId) void
    }
    
    class JwtProvider {
        -String secretKey
        -long accessExpiry
        -long refreshExpiry
        +generateAccessToken(User) String
        +generateRefreshToken(User) String
        +validateToken(String) Claims
    }
    
    class UserRepository {
        <<interface>>
        +findByUsername(String) Optional~User~
        +findByEmail(String) Optional~User~
        +existsByUsername(String) boolean
    }
    
    class AuthenticationStrategy {
        <<interface>>
        +authenticate(AuthRequest) AuthResult
        +supports(AuthType) boolean
    }
    
    class JwtAuthStrategy {
        +authenticate(AuthRequest) AuthResult
        +supports(AuthType) boolean
    }
    
    class OAuth2AuthStrategy {
        +authenticate(AuthRequest) AuthResult
        +supports(AuthType) boolean
    }
    
    AuthService --> UserRepository
    AuthService --> JwtProvider
    AuthService --> AuthenticationStrategy
    AuthenticationStrategy <|.. JwtAuthStrategy
    AuthenticationStrategy <|.. OAuth2AuthStrategy
    UserRepository ..> User
`,
  contentService: `classDiagram
    class Snippet {
        -UUID id
        -UUID authorId
        -String title
        -String code  
        -String language
        -String description
        -int viewCount
        -int version
        -boolean isDeleted
        -LocalDateTime createdAt
    }
    
    class Article {
        -UUID id
        -UUID authorId
        -String title
        -String contentMd
        -String contentHtml
        -String slug
        -ArticleStatus status
        -int readTimeMin
        -LocalDateTime publishedAt
    }
    
    class ContentService {
        -SnippetRepository snippetRepo
        -ArticleRepository articleRepo
        -ContentEventPublisher publisher
        -ContentPipeline pipeline
        +createSnippet(CreateRequest) Snippet
        +updateSnippet(UUID, UpdateRequest) Snippet
        +deleteSnippet(UUID) void
        +publishArticle(CreateArticleRequest) Article
    }
    
    class ContentPipeline {
        -List~ContentProcessor~ processors
        +render(String rawContent) String
    }
    
    class ContentProcessor {
        <<interface>>
        +process(String content) String
    }
    
    class MarkdownProcessor {
        +process(String) String
    }
    
    class SyntaxHighlightProcessor {
        +process(String) String
    }
    
    class SanitizationProcessor {
        +process(String) String
    }
    
    ContentService --> ContentPipeline
    ContentPipeline --> ContentProcessor
    ContentProcessor <|.. MarkdownProcessor
    ContentProcessor <|.. SyntaxHighlightProcessor
    ContentProcessor <|.. SanitizationProcessor
    ContentService ..> Snippet
    ContentService ..> Article
`,
};
