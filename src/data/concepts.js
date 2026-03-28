export const concepts = [
  // ── Core Java ──
  { name: 'Generics & Type Bounds', category: 'Core Java', module: 'All Services', color: '#3B82F6', description: 'Generic repositories, bounded wildcards in utility methods' },
  { name: 'Streams API', category: 'Core Java', module: 'Analytics Service', color: '#3B82F6', description: 'Collectors, groupingBy, partitioning, flatMap, reduce' },
  { name: 'Lambda Expressions', category: 'Core Java', module: 'All Services', color: '#3B82F6', description: 'Functional-style event handlers, predicates, comparators' },
  { name: 'Functional Interfaces', category: 'Core Java', module: 'Content Service', color: '#3B82F6', description: 'Predicate, Function, Supplier, Consumer, custom interfaces' },
  { name: 'Collections Framework', category: 'Core Java', module: 'All Services', color: '#3B82F6', description: 'List, Set, Map, Queue, Deque with real use cases' },
  { name: 'CompletableFuture', category: 'Core Java', module: 'Notification Service', color: '#3B82F6', description: 'Async composition: thenApply, thenCombine, allOf' },
  { name: 'Virtual Threads (Loom)', category: 'Core Java', module: 'Collaboration Service', color: '#3B82F6', description: 'Lightweight concurrency for WebSocket handlers' },
  { name: 'Records', category: 'Core Java', module: 'Review Service', color: '#3B82F6', description: 'Immutable DTOs and message payloads' },
  { name: 'Sealed Classes/Interfaces', category: 'Core Java', module: 'Collaboration Service', color: '#3B82F6', description: 'Restricted class hierarchies for message types' },
  { name: 'Pattern Matching', category: 'Core Java', module: 'Review Service', color: '#3B82F6', description: 'instanceof pattern matching, switch expressions' },
  { name: 'Optional', category: 'Core Java', module: 'All Services', color: '#3B82F6', description: 'Null-safe value containers in service methods' },
  { name: 'Exception Hierarchy', category: 'Core Java', module: 'API Gateway', color: '#3B82F6', description: 'Custom exceptions, @ControllerAdvice, global error handling' },
  { name: 'Reflection API', category: 'Core Java', module: 'Content Service', color: '#3B82F6', description: 'Custom annotation processing, runtime introspection' },
  { name: 'Multithreading', category: 'Core Java', module: 'Analytics Service', color: '#3B82F6', description: 'ExecutorService, thread pools, concurrent collections' },
  { name: 'Enums (Advanced)', category: 'Core Java', module: 'Review Service', color: '#3B82F6', description: 'Enum with behavior, abstract methods, strategy enum' },
  { name: 'Annotations (Custom)', category: 'Core Java', module: 'User Service', color: '#3B82F6', description: 'Custom validation annotations, AOP markers' },

  // ── Spring Boot Core ──
  { name: 'Auto-Configuration', category: 'Spring Boot', module: 'All Services', color: '#22C55E', description: 'Understanding @EnableAutoConfiguration, conditional beans' },
  { name: 'Starters', category: 'Spring Boot', module: 'All Services', color: '#22C55E', description: 'spring-boot-starter-web, data-jpa, security, etc.' },
  { name: 'Profiles', category: 'Spring Boot', module: 'All Services', color: '#22C55E', description: 'dev, test, prod profiles with environment-specific config' },
  { name: 'Dependency Injection', category: 'Spring Boot', module: 'All Services', color: '#22C55E', description: 'Constructor injection, @Qualifier, @Primary' },
  { name: 'Component Scanning', category: 'Spring Boot', module: 'All Services', color: '#22C55E', description: '@Component, @Service, @Repository, @Configuration' },
  { name: 'Bean Lifecycle', category: 'Spring Boot', module: 'All Services', color: '#22C55E', description: '@PostConstruct, @PreDestroy, InitializingBean' },
  { name: 'Configuration Properties', category: 'Spring Boot', module: 'API Gateway', color: '#22C55E', description: '@ConfigurationProperties, type-safe config binding' },
  { name: 'Actuator', category: 'Spring Boot', module: 'API Gateway', color: '#22C55E', description: 'Health checks, metrics, info endpoints' },
  { name: 'Error Handling', category: 'Spring Boot', module: 'All Services', color: '#22C55E', description: '@ControllerAdvice, @ExceptionHandler, ProblemDetail' },
  { name: 'Validation', category: 'Spring Boot', module: 'User Service', color: '#22C55E', description: '@Valid, @NotBlank, custom constraint validators' },
  { name: 'Interceptors & Filters', category: 'Spring Boot', module: 'API Gateway', color: '#22C55E', description: 'HandlerInterceptor, OncePerRequestFilter' },

  // ── Spring Data ──
  { name: 'JPA Repositories', category: 'Spring Data', module: 'Content Service', color: '#06B6D4', description: 'CrudRepository, JpaRepository, custom queries' },
  { name: 'JPQL & Native Queries', category: 'Spring Data', module: 'Content Service', color: '#06B6D4', description: '@Query with JPQL and native SQL' },
  { name: 'Specifications', category: 'Spring Data', module: 'Content Service', color: '#06B6D4', description: 'Dynamic query building with JpaSpecificationExecutor' },
  { name: 'Pagination & Sorting', category: 'Spring Data', module: 'Content Service', color: '#06B6D4', description: 'Pageable, Sort, Page, Slice' },
  { name: 'Auditing (@CreatedDate)', category: 'Spring Data', module: 'Content Service', color: '#06B6D4', description: '@CreatedBy, @LastModifiedDate, AuditorAware' },
  { name: 'MongoDB Repositories', category: 'Spring Data', module: 'Notification Service', color: '#06B6D4', description: 'MongoRepository, document mapping, aggregation' },
  { name: 'Redis Operations', category: 'Spring Data', module: 'User Service', color: '#06B6D4', description: 'RedisTemplate, StringRedisTemplate, Hash operations' },
  { name: 'Elasticsearch Data', category: 'Spring Data', module: 'Search Service', color: '#06B6D4', description: 'ElasticsearchRepository, @Document, queries' },
  { name: 'Entity Relationships', category: 'Spring Data', module: 'Review Service', color: '#06B6D4', description: '@OneToMany, @ManyToMany, @ManyToOne, fetch strategies' },
  { name: 'Transactions', category: 'Spring Data', module: 'Review Service', color: '#06B6D4', description: '@Transactional, propagation, isolation levels' },
  { name: 'Optimistic Locking', category: 'Spring Data', module: 'Collaboration Service', color: '#06B6D4', description: '@Version for concurrent modification protection' },
  { name: 'Soft Deletes', category: 'Spring Data', module: 'Content Service', color: '#06B6D4', description: '@SQLDelete, @Where for logical deletion' },
  { name: 'DTO Projections', category: 'Spring Data', module: 'Review Service', color: '#06B6D4', description: 'Interface and class-based projections' },

  // ── Spring Security ──
  { name: 'JWT Authentication', category: 'Spring Security', module: 'User Service', color: '#EF4444', description: 'JWT creation, validation, refresh token flow' },
  { name: 'OAuth2 Login', category: 'Spring Security', module: 'User Service', color: '#EF4444', description: 'Google/GitHub OAuth2 integration' },
  { name: 'SecurityFilterChain', category: 'Spring Security', module: 'User Service', color: '#EF4444', description: 'Custom security configuration DSL' },
  { name: 'RBAC (Role-Based)', category: 'Spring Security', module: 'User Service', color: '#EF4444', description: '@PreAuthorize, @Secured, hasRole()' },
  { name: 'Method Security', category: 'Spring Security', module: 'Content Service', color: '#EF4444', description: '@PreAuthorize with SpEL expressions' },
  { name: 'CORS Configuration', category: 'Spring Security', module: 'API Gateway', color: '#EF4444', description: 'Cross-origin resource sharing setup' },
  { name: 'Password Encoding', category: 'Spring Security', module: 'User Service', color: '#EF4444', description: 'BCryptPasswordEncoder, password policies' },

  // ── Spring Cloud ──
  { name: 'Service Discovery (Eureka)', category: 'Spring Cloud', module: 'API Gateway', color: '#A855F7', description: 'Service registration, discovery, health monitoring' },
  { name: 'API Gateway Routing', category: 'Spring Cloud', module: 'API Gateway', color: '#A855F7', description: 'Path-based routing, predicates, filters' },
  { name: 'Config Server', category: 'Spring Cloud', module: 'All Services', color: '#A855F7', description: 'Centralized configuration, Git-backed' },
  { name: 'Circuit Breaker', category: 'Spring Cloud', module: 'API Gateway', color: '#A855F7', description: 'Resilience4j CircuitBreaker, fallbacks' },
  { name: 'Retry Mechanism', category: 'Spring Cloud', module: 'API Gateway', color: '#A855F7', description: 'Resilience4j Retry with exponential backoff' },
  { name: 'Rate Limiting', category: 'Spring Cloud', module: 'API Gateway', color: '#A855F7', description: 'Redis-backed RequestRateLimiter' },
  { name: 'Distributed Tracing', category: 'Spring Cloud', module: 'All Services', color: '#A855F7', description: 'Micrometer Tracing + Zipkin integration' },
  { name: 'Load Balancing', category: 'Spring Cloud', module: 'API Gateway', color: '#A855F7', description: 'Spring Cloud LoadBalancer' },

  // ── Kafka ──
  { name: 'Kafka Producer', category: 'Kafka', module: 'Content Service', color: '#EC4899', description: 'KafkaTemplate, send(), ProducerConfig' },
  { name: 'Kafka Consumer', category: 'Kafka', module: 'Search Service', color: '#EC4899', description: '@KafkaListener, ConsumerConfig, deserialization' },
  { name: 'Kafka Streams', category: 'Kafka', module: 'Analytics Service', color: '#EC4899', description: 'KStream, KTable, topology, windowed aggregation' },
  { name: 'Topic Design', category: 'Kafka', module: 'All Services', color: '#EC4899', description: 'Partitioning strategy, naming conventions, retention' },
  { name: 'Dead Letter Topics', category: 'Kafka', module: 'Analytics Service', color: '#EC4899', description: 'Error handling, retry, DLT publishing' },
  { name: 'Idempotent Consumers', category: 'Kafka', module: 'Notification Service', color: '#EC4899', description: 'Exactly-once processing, dedup strategies' },
  { name: 'Event Schema Design', category: 'Kafka', module: 'All Services', color: '#EC4899', description: 'CloudEvents spec, schema evolution, versioning' },
  { name: 'Consumer Groups', category: 'Kafka', module: 'All Services', color: '#EC4899', description: 'Parallel consumption, partition assignment' },

  // ── Database ──
  { name: 'PostgreSQL (Relational)', category: 'Database', module: 'User Service', color: '#F59E0B', description: 'Schema design, indexes, constraints, triggers' },
  { name: 'MongoDB (Document)', category: 'Database', module: 'Notification Service', color: '#F59E0B', description: 'Document design, embedding vs referencing, TTL' },
  { name: 'Redis (Key-Value)', category: 'Database', module: 'API Gateway', color: '#F59E0B', description: 'Caching strategies, data structures, pub/sub' },
  { name: 'Elasticsearch (Search)', category: 'Database', module: 'Search Service', color: '#F59E0B', description: 'Index mapping, analyzers, relevance scoring' },
  { name: 'Database Per Service', category: 'Database', module: 'All Services', color: '#F59E0B', description: 'Data isolation, eventual consistency' },
  { name: 'Database Migrations', category: 'Database', module: 'All Services', color: '#F59E0B', description: 'Flyway/Liquibase for schema versioning' },
  { name: 'Connection Pooling', category: 'Database', module: 'All Services', color: '#F59E0B', description: 'HikariCP configuration and tuning' },

  // ── Design Patterns ──
  { name: 'Builder Pattern', category: 'Design Patterns', module: 'User Service', color: '#06B6D4', description: 'Complex object construction (entities, DTOs)' },
  { name: 'Factory Pattern', category: 'Design Patterns', module: 'Notification Service', color: '#06B6D4', description: 'Object creation abstraction (notification types)' },
  { name: 'Strategy Pattern', category: 'Design Patterns', module: 'Search Service', color: '#06B6D4', description: 'Interchangeable algorithms (auth providers, analyzers)' },
  { name: 'Observer Pattern', category: 'Design Patterns', module: 'Collaboration Service', color: '#06B6D4', description: 'Event-driven reactions (Kafka, WebSocket)' },
  { name: 'Decorator Pattern', category: 'Design Patterns', module: 'Content Service', color: '#06B6D4', description: 'Adding behavior dynamically (logging, caching)' },
  { name: 'Adapter Pattern', category: 'Design Patterns', module: 'Notification Service', color: '#06B6D4', description: 'Interface compatibility (email providers, storage)' },
  { name: 'State Machine Pattern', category: 'Design Patterns', module: 'Review Service', color: '#06B6D4', description: 'Review lifecycle state transitions' },
  { name: 'Saga Pattern', category: 'Design Patterns', module: 'Content Service', color: '#06B6D4', description: 'Distributed transaction coordination' },
  { name: 'CQRS Pattern', category: 'Design Patterns', module: 'Search Service', color: '#06B6D4', description: 'Command/Query separation across datastores' },
  { name: 'Circuit Breaker Pattern', category: 'Design Patterns', module: 'API Gateway', color: '#06B6D4', description: 'Resilience for downstream failures' },

  // ── AOP & Cross-Cutting ──
  { name: 'AOP Logging', category: 'AOP', module: 'User Service', color: '#A855F7', description: '@Around, @Before, @After for method logging' },
  { name: 'AOP Metrics', category: 'AOP', module: 'API Gateway', color: '#A855F7', description: 'Custom @Timed annotation for performance' },
  { name: 'AOP Audit', category: 'AOP', module: 'Content Service', color: '#A855F7', description: '@AuditLog custom annotation for tracking changes' },
  { name: 'AOP Security', category: 'AOP', module: 'User Service', color: '#A855F7', description: 'Method-level security enforcement' },

  // ── Testing ──
  { name: 'JUnit 5', category: 'Testing', module: 'All Services', color: '#22C55E', description: '@Test, @ParameterizedTest, lifecycle hooks' },
  { name: 'MockMvc', category: 'Testing', module: 'All Services', color: '#22C55E', description: 'Controller layer testing with assertions' },
  { name: 'Mockito', category: 'Testing', module: 'All Services', color: '#22C55E', description: '@Mock, @InjectMocks, verify, when/thenReturn' },
  { name: 'Testcontainers', category: 'Testing', module: 'All Services', color: '#22C55E', description: 'Docker-based integration tests (Kafka, DB, Redis)' },
  { name: '@DataJpaTest', category: 'Testing', module: 'Content Service', color: '#22C55E', description: 'Repository layer testing with embedded DB' },
  { name: '@WebMvcTest', category: 'Testing', module: 'All Services', color: '#22C55E', description: 'Isolated controller testing' },
  { name: 'Integration Testing', category: 'Testing', module: 'All Services', color: '#22C55E', description: '@SpringBootTest with full context' },
  { name: 'Contract Testing', category: 'Testing', module: 'API Gateway', color: '#22C55E', description: 'Spring Cloud Contract for API contracts' },

  // ── DevOps ──
  { name: 'Docker', category: 'DevOps', module: 'All Services', color: '#F97316', description: 'Containerization with multi-stage builds' },
  { name: 'Docker Compose', category: 'DevOps', module: 'All Services', color: '#F97316', description: 'Multi-container local dev environment' },
  { name: 'CI/CD (GitHub Actions)', category: 'DevOps', module: 'All Services', color: '#F97316', description: 'Build, test, push pipeline' },
  { name: 'Prometheus + Grafana', category: 'DevOps', module: 'API Gateway', color: '#F97316', description: 'Metrics collection, dashboards, alerting' },
  { name: 'ELK Stack', category: 'DevOps', module: 'All Services', color: '#F97316', description: 'Centralized logging with Elasticsearch + Kibana' },
  { name: 'Kubernetes (Optional)', category: 'DevOps', module: 'All Services', color: '#F97316', description: 'Container orchestration, deployments, services' },
];

export const categories = [
  { name: 'All', count: null },
  { name: 'Core Java', count: null },
  { name: 'Spring Boot', count: null },
  { name: 'Spring Data', count: null },
  { name: 'Spring Security', count: null },
  { name: 'Spring Cloud', count: null },
  { name: 'Kafka', count: null },
  { name: 'Database', count: null },
  { name: 'Design Patterns', count: null },
  { name: 'AOP', count: null },
  { name: 'Testing', count: null },
  { name: 'DevOps', count: null },
];

// Compute counts
categories.forEach(cat => {
  if (cat.name === 'All') {
    cat.count = concepts.length;
  } else {
    cat.count = concepts.filter(c => c.category === cat.name).length;
  }
});
