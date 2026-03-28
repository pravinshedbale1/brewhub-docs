export const patterns = [
  {
    name: 'Builder Pattern',
    category: 'Creational',
    icon: '🏗️',
    color: '#3B82F6',
    where: 'User Service, Content Service',
    description: 'Construct complex objects step-by-step. Used for building User, Snippet, Article entities and complex DTOs. Lombok @Builder or manual implementation.',
    code: `@Builder
public class UserProfile {
    private final String username;
    private final String email;
    private final String bio;
    private final List<String> skills;
    private final SocialLinks socialLinks;
}

// Usage
UserProfile profile = UserProfile.builder()
    .username("brewhub_dev")
    .email("dev@brewhub.io")
    .bio("Full-stack developer")
    .skills(List.of("Java", "Spring Boot"))
    .socialLinks(SocialLinks.builder()
        .github("github.com/dev")
        .build())
    .build();`,
    tradeoffs: {
      pros: ['Readable object construction', 'Immutable objects', 'Named parameters'],
      cons: ['Extra code for simple objects', 'Can hide required fields'],
    },
  },
  {
    name: 'Factory Pattern',
    category: 'Creational',
    icon: '🏭',
    color: '#22C55E',
    where: 'Notification Service, Content Service',
    description: 'Abstract object creation logic. Used to create different notification types (email, push, in-app) and content types (snippet, article, project) without exposing instantiation logic.',
    code: `public interface NotificationFactory {
    Notification create(NotificationEvent event);
}

@Component
public class EmailNotificationFactory 
        implements NotificationFactory {
    @Override
    public Notification create(NotificationEvent event) {
        return EmailNotification.builder()
            .recipient(event.getTargetUserId())
            .subject(resolveSubject(event))
            .template(resolveTemplate(event.getType()))
            .variables(event.getMetadata())
            .build();
    }
}

// Registration via Spring DI
@Configuration
public class NotificationConfig {
    @Bean
    Map<Channel, NotificationFactory> factories(
            EmailNotificationFactory email,
            PushNotificationFactory push,
            InAppNotificationFactory inApp) {
        return Map.of(
            Channel.EMAIL, email,
            Channel.PUSH, push,
            Channel.IN_APP, inApp
        );
    }
}`,
    tradeoffs: {
      pros: ['Decoupled creation', 'Easy to add new types', 'Open/Closed principle'],
      cons: ['More classes to maintain', 'Can be over-engineered for few types'],
    },
  },
  {
    name: 'Strategy Pattern',
    category: 'Behavioral',
    icon: '♟️',
    color: '#A855F7',
    where: 'User Service, Search Service, Analytics Service',
    description: 'Define a family of interchangeable algorithms. Used for authentication strategies (JWT, OAuth2), search analyzers (standard, language-specific), and aggregation windows (hourly, daily, weekly).',
    code: `public interface AuthenticationStrategy {
    AuthResult authenticate(AuthRequest request);
    boolean supports(AuthType type);
}

@Component
public class JwtAuthStrategy 
        implements AuthenticationStrategy {
    @Override
    public AuthResult authenticate(AuthRequest req) {
        // JWT validation logic
        var claims = jwtProvider.validate(req.getToken());
        return AuthResult.success(claims.getSubject());
    }
    
    @Override
    public boolean supports(AuthType type) {
        return type == AuthType.JWT;
    }
}

@Component
public class OAuth2AuthStrategy 
        implements AuthenticationStrategy {
    @Override
    public AuthResult authenticate(AuthRequest req) {
        // OAuth2 token exchange
        var userInfo = oauth2Client.getUserInfo(
            req.getProvider(), req.getCode());
        return AuthResult.success(userInfo.getEmail());
    }
    
    @Override
    public boolean supports(AuthType type) {
        return type == AuthType.OAUTH2;
    }
}

// Spring auto-discovers all strategies
@Service
@RequiredArgsConstructor
public class AuthService {
    private final List<AuthenticationStrategy> strategies;
    
    public AuthResult authenticate(AuthRequest req) {
        return strategies.stream()
            .filter(s -> s.supports(req.getType()))
            .findFirst()
            .orElseThrow(() -> new UnsupportedAuthException())
            .authenticate(req);
    }
}`,
    tradeoffs: {
      pros: ['Eliminates if/else chains', 'Easy to add new strategies', 'Testable individually'],
      cons: ['Client must know which strategy to use', 'Increased number of classes'],
    },
  },
  {
    name: 'Observer Pattern',
    category: 'Behavioral',
    icon: '👁️',
    color: '#EC4899',
    where: 'All Services (via Kafka)',
    description: 'One-to-many dependency where state changes notify all dependents. Kafka is the distributed Observer — producers publish events, consumers react. Also used in WebSocket broadcasting for real-time features.',
    code: `// Producer (Observable)
@Service
@RequiredArgsConstructor
public class ContentEventPublisher {
    private final KafkaTemplate<String, ContentEvent> kafka;
    
    public void publishContentCreated(Snippet snippet) {
        var event = ContentEvent.builder()
            .type(EventType.CONTENT_CREATED)
            .contentId(snippet.getId())
            .authorId(snippet.getAuthorId())
            .title(snippet.getTitle())
            .tags(snippet.getTags())
            .timestamp(Instant.now())
            .build();
            
        kafka.send("brewhub.content.events", 
            snippet.getId().toString(), event);
    }
}

// Consumer (Observer) — Search Service
@Component
@Slf4j
public class SearchIndexConsumer {
    @KafkaListener(
        topics = "brewhub.content.events",
        groupId = "search-indexer"
    )
    public void onContentEvent(ContentEvent event) {
        switch (event.getType()) {
            case CONTENT_CREATED -> indexContent(event);
            case CONTENT_UPDATED -> updateIndex(event);
            case CONTENT_DELETED -> removeFromIndex(event);
        }
    }
}

// Consumer (Observer) — Notification Service
@Component
public class NotificationConsumer {
    @KafkaListener(
        topics = "brewhub.content.events",
        groupId = "notification-sender"
    )
    public void onContentEvent(ContentEvent event) {
        if (event.getType() == CONTENT_CREATED) {
            notifyFollowers(event.getAuthorId(), event);
        }
    }
}`,
    tradeoffs: {
      pros: ['Loose coupling', 'Scalable (add consumers without producer changes)', 'Async processing'],
      cons: ['Eventual consistency', 'Harder to debug', 'Message ordering complexity'],
    },
  },
  {
    name: 'State Machine Pattern',
    category: 'Behavioral',
    icon: '🔄',
    color: '#F59E0B',
    where: 'Review Service',
    description: 'Manage complex state transitions with defined rules. The review lifecycle (DRAFT → PENDING → IN_REVIEW → APPROVED/REJECTED → CLOSED) uses Spring Statemachine for clean, auditable transitions.',
    code: `@Configuration
@EnableStateMachine
public class ReviewStateMachineConfig 
        extends StateMachineConfigurerAdapter<
            ReviewState, ReviewEvent> {

    @Override
    public void configure(StateMachineStateConfigurer<
            ReviewState, ReviewEvent> states) throws Exception {
        states.withStates()
            .initial(ReviewState.DRAFT)
            .state(ReviewState.PENDING)
            .state(ReviewState.IN_REVIEW)
            .state(ReviewState.CHANGES_REQUESTED)
            .end(ReviewState.APPROVED)
            .end(ReviewState.REJECTED)
            .end(ReviewState.CLOSED);
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<
            ReviewState, ReviewEvent> transitions) throws Exception {
        transitions
            .withExternal()
                .source(DRAFT).target(PENDING)
                .event(SUBMIT)
                .guard(hasMinimumContent())
            .and()
            .withExternal()
                .source(PENDING).target(IN_REVIEW)
                .event(ASSIGN_REVIEWER)
                .action(notifyReviewer())
            .and()
            .withExternal()
                .source(IN_REVIEW).target(APPROVED)
                .event(APPROVE)
                .action(publishApprovalEvent())
            .and()
            .withExternal()
                .source(IN_REVIEW).target(CHANGES_REQUESTED)
                .event(REQUEST_CHANGES)
                .action(notifyAuthor());
    }
}`,
    tradeoffs: {
      pros: ['Clear state transition rules', 'Prevents invalid transitions', 'Auditable history'],
      cons: ['Complex to configure', 'Spring Statemachine learning curve', 'State persistence challenges'],
    },
  },
  {
    name: 'CQRS Pattern',
    category: 'Architectural',
    icon: '📖',
    color: '#06B6D4',
    where: 'Content → Search Service',
    description: 'Separate the write model (Command) from the read model (Query). Content is written to PostgreSQL (commands) and synced to Elasticsearch via Kafka for optimized reading (queries).',
    code: `// COMMAND SIDE — Content Service writes to PostgreSQL
@Service
public class SnippetCommandService {
    private final SnippetRepository repository;
    private final ContentEventPublisher eventPublisher;
    
    @Transactional
    public Snippet createSnippet(CreateSnippetRequest req) {
        var snippet = Snippet.builder()
            .title(req.getTitle())
            .code(req.getCode())
            .language(req.getLanguage())
            .build();
        
        Snippet saved = repository.save(snippet);
        
        // Publish event for read-side sync
        eventPublisher.publishContentCreated(saved);
        
        return saved;
    }
}

// QUERY SIDE — Search Service reads from Elasticsearch
@Service
public class SnippetQueryService {
    private final ContentSearchRepository searchRepo;
    
    public SearchPage<ContentDocument> search(
            String query, Pageable pageable) {
        return searchRepo.searchByTitleOrCode(
            query, pageable);
    }
    
    // Kafka consumer keeps ES in sync
    @KafkaListener(topics = "brewhub.content.events")
    public void syncToSearchIndex(ContentEvent event) {
        var doc = ContentDocument.from(event);
        searchRepo.save(doc);
    }
}`,
    tradeoffs: {
      pros: ['Optimized reads & writes independently', 'Scale read/write separately', 'Best tool for each job'],
      cons: ['Eventual consistency between models', 'Data duplication', 'Increased complexity'],
    },
  },
  {
    name: 'Circuit Breaker Pattern',
    category: 'Resilience',
    icon: '⚡',
    color: '#EF4444',
    where: 'API Gateway',
    description: 'Prevent cascading failures when downstream services are unavailable. Track failure rates and trip the circuit to fast-fail requests, then gradually allow traffic to probe recovery.',
    code: `@RestController
public class GatewayFallbackController {

    @GetMapping("/fallback/content")
    public ResponseEntity<ErrorResponse> contentFallback() {
        return ResponseEntity
            .status(HttpStatus.SERVICE_UNAVAILABLE)
            .body(ErrorResponse.builder()
                .message("Content Service is temporarily unavailable")
                .code("SERVICE_UNAVAILABLE")
                .retryAfterSeconds(30)
                .build());
    }
}

// application.yml
// resilience4j:
//   circuitbreaker:
//     instances:
//       contentService:
//         slidingWindowSize: 10
//         failureRateThreshold: 50
//         waitDurationInOpenState: 30s
//         permittedNumberOfCallsInHalfOpenState: 3
//         automaticTransitionFromOpenToHalfOpen: true
//   retry:
//     instances:
//       contentService:
//         maxAttempts: 3
//         waitDuration: 1s
//         exponentialBackoffMultiplier: 2`,
    tradeoffs: {
      pros: ['Prevents cascade failures', 'Graceful degradation', 'Auto-recovery'],
      cons: ['Adds latency tracking overhead', 'Tuning thresholds is tricky', 'Must design fallbacks'],
    },
  },
  {
    name: 'Saga Pattern',
    category: 'Architectural',
    icon: '📜',
    color: '#EC4899',
    where: 'Content + Review + Notification Services',
    description: 'Coordinate distributed transactions across microservices using compensating actions instead of 2PC. Each service completes its local transaction and publishes an event; failures trigger compensating actions.',
    code: `// Choreography-based Saga (event-driven)
// Step 1: Content Service creates snippet
@Transactional
public Snippet createWithReview(CreateRequest req) {
    var snippet = snippetRepo.save(buildSnippet(req));
    
    // Publish → Review Service listens
    eventPublisher.publish(
        new SnippetCreatedEvent(snippet));
    return snippet;
}

// Step 2: Review Service creates review
@KafkaListener(topics = "brewhub.snippet.created")
public void onSnippetCreated(SnippetCreatedEvent event) {
    try {
        var review = reviewService.createAutoReview(
            event.getSnippetId());
        eventPublisher.publish(
            new ReviewCreatedEvent(review));
    } catch (Exception e) {
        // Compensating action
        eventPublisher.publish(
            new ReviewFailedEvent(event.getSnippetId()));
    }
}

// Step 3: Notification Service notifies
@KafkaListener(topics = "brewhub.review.created")
public void onReviewCreated(ReviewCreatedEvent event) {
    notificationService.notifyReviewers(event);
}

// Compensation: Content Service rolls back
@KafkaListener(topics = "brewhub.review.failed")
public void onReviewFailed(ReviewFailedEvent event) {
    snippetService.markAsDraft(event.getSnippetId());
    log.warn("Saga compensated: snippet {} reverted", 
        event.getSnippetId());
}`,
    tradeoffs: {
      pros: ['No distributed locks', 'Each service is autonomous', 'Handles partial failures'],
      cons: ['Eventual consistency', 'Hard to debug spanning saga', 'Compensating logic is complex'],
    },
  },
  {
    name: 'Decorator Pattern',
    category: 'Structural',
    icon: '🎁',
    color: '#22C55E',
    where: 'Content Service',
    description: 'Add behavior to objects dynamically. Used to wrap content processors — add syntax highlighting, then Markdown rendering, then sanitization — each decorator wraps the previous.',
    code: `public interface ContentProcessor {
    String process(String content);
}

@Component
@Order(1)
public class MarkdownProcessor implements ContentProcessor {
    public String process(String content) {
        return markdownParser.render(content);
    }
}

@Component
@Order(2) 
public class SyntaxHighlightProcessor implements ContentProcessor {
    public String process(String content) {
        return highlightCodeBlocks(content);
    }
}

@Component
@Order(3)
public class SanitizationProcessor implements ContentProcessor {
    public String process(String content) {
        return Jsoup.clean(content, Safelist.relaxed());
    }
}

// Pipeline composition via Spring DI
@Service
@RequiredArgsConstructor
public class ContentPipeline {
    private final List<ContentProcessor> processors;
    
    public String render(String rawContent) {
        String result = rawContent;
        for (ContentProcessor p : processors) {
            result = p.process(result);
        }
        return result;
    }
}`,
    tradeoffs: {
      pros: ['Single Responsibility', 'Composable transformations', 'Easy to add/remove steps'],
      cons: ['Order dependencies', 'Debugging through layers', 'Can have many small classes'],
    },
  },
  {
    name: 'Adapter Pattern',
    category: 'Structural',
    icon: '🔌',
    color: '#F97316',
    where: 'Notification Service',
    description: 'Convert one interface to another that clients expect. Used to abstract email providers — switch from SendGrid to AWS SES without changing notification logic.',
    code: `// Target interface
public interface EmailSender {
    void send(EmailMessage message);
}

// Adaptee 1: SendGrid SDK
@Component
@Profile("sendgrid")
public class SendGridAdapter implements EmailSender {
    private final SendGrid client;
    
    public void send(EmailMessage message) {
        Mail mail = new Mail(
            new Email(message.getFrom()),
            message.getSubject(),
            new Email(message.getTo()),
            new Content("text/html", message.getBody())
        );
        client.api(buildRequest(mail));
    }
}

// Adaptee 2: AWS SES SDK  
@Component
@Profile("aws")
public class AwsSesAdapter implements EmailSender {
    private final SesClient sesClient;
    
    public void send(EmailMessage message) {
        sesClient.sendEmail(SendEmailRequest.builder()
            .destination(d -> d.toAddresses(message.getTo()))
            .message(m -> m
                .subject(s -> s.data(message.getSubject()))
                .body(b -> b.html(
                    h -> h.data(message.getBody()))))
            .build());
    }
}

// Service uses the abstraction
@Service
@RequiredArgsConstructor
public class EmailNotificationService {
    private final EmailSender emailSender; // Spring injects active profile
    
    public void sendWelcomeEmail(User user) {
        emailSender.send(EmailMessage.builder()
            .to(user.getEmail())
            .subject("Welcome to BrewHub!")
            .body(templateEngine.render("welcome", user))
            .build());
    }
}`,
    tradeoffs: {
      pros: ['Loose coupling to vendors', 'Easy to swap implementations', 'Profile-based activation'],
      cons: ['Extra abstraction layer', 'Must maintain multiple adapters'],
    },
  },
];
