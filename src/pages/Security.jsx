import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import MermaidDiagram from '../components/MermaidDiagram';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function Security() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="SECURITY ARCHITECTURE" />
        <h1 className="section-title">Security is an architecture decision, not an afterthought</h1>
        <p className="body-text mb-24">
          BrewHub implements multi-layered security — JWT authentication at the gateway,
          OAuth2 social login, role-based access control, rate limiting, and method-level
          authorization within each service.
        </p>
      </ScrollSection>

      {/* Auth Flow */}
      <ScrollSection>
        <SectionLabel text="AUTHENTICATION FLOW" />
        <h2 className="section-title">JWT-based authentication lifecycle</h2>
        <p className="body-text mb-24">
          Users authenticate via the User Service and receive a JWT access token + refresh token.
          All subsequent requests include the JWT in the Authorization header. The Gateway validates
          the JWT before routing to services.
        </p>
        <MermaidDiagram
          chart={`sequenceDiagram
    participant C as 🖥️ Client
    participant GW as 🌐 Gateway
    participant US as 👤 User Service
    participant R as 🔴 Redis

    Note over C,R: Registration Flow
    C->>GW: POST /api/v1/auth/register
    GW->>US: Forward
    US->>US: Validate + Hash Password
    US->>US: Save to PostgreSQL
    US->>R: Cache user profile
    US-->>C: 201 Created

    Note over C,R: Login Flow
    C->>GW: POST /api/v1/auth/login
    GW->>US: Forward
    US->>US: Validate credentials
    US->>US: Generate JWT (15min)
    US->>US: Generate Refresh Token (7d)
    US->>R: Store refresh token
    US-->>C: {accessToken, refreshToken}

    Note over C,R: Authenticated Request
    C->>GW: GET /api/v1/snippets (Bearer token)
    GW->>GW: Validate JWT signature
    GW->>GW: Check expiry
    GW->>GW: Extract userId, roles
    GW->>US: Forward + userId header

    Note over C,R: Token Refresh
    C->>GW: POST /api/v1/auth/refresh
    GW->>US: Forward
    US->>R: Validate refresh token
    US->>US: Generate new JWT
    US->>R: Rotate refresh token
    US-->>C: {newAccessToken, newRefreshToken}`}
          label="JWT Authentication — Full Lifecycle"
        />
      </ScrollSection>

      {/* JWT Structure */}
      <ScrollSection>
        <SectionLabel text="JWT STRUCTURE" />
        <h2 className="section-title">What's inside the token?</h2>
        <CodeBlock
          code={`// JWT Payload (Claims)
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",  // userId
  "iss": "brewhub-user-service",                    // issuer
  "iat": 1711900800,                                // issued at
  "exp": 1711901700,                                // expires (15 min)
  "roles": ["USER", "CONTENT_CREATOR"],             // RBAC roles
  "username": "brewhub_dev",                         // for display
  "email": "dev@brewhub.io"                          // for notifications
}

// JwtProvider.java
@Component
public class JwtProvider {
    @Value("\${jwt.secret}")
    private String secretKey;
    
    @Value("\${jwt.access-expiry-ms}")
    private long accessExpiryMs;   // 900000 (15 min)
    
    public String generateAccessToken(User user) {
        return Jwts.builder()
            .subject(user.getId().toString())
            .issuer("brewhub-user-service")
            .issuedAt(new Date())
            .expiration(new Date(
                System.currentTimeMillis() + accessExpiryMs))
            .claim("roles", user.getRoles().stream()
                .map(Role::getName)
                .toList())
            .claim("username", user.getUsername())
            .claim("email", user.getEmail())
            .signWith(getSigningKey())
            .compact();
    }
    
    public Claims validateToken(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
            Decoders.BASE64.decode(secretKey));
    }
}`}
          language="Java — JWT Provider"
        />
      </ScrollSection>

      {/* RBAC Model */}
      <ScrollSection>
        <SectionLabel text="AUTHORIZATION" />
        <h2 className="section-title">Role-based access control (RBAC)</h2>
        <p className="body-text mb-24">
          Three roles with escalating permissions. Method-level security with SpEL expressions
          ensures granular access control within each service.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Create Content</th>
                <th>Edit Own</th>
                <th>Review</th>
                <th>Delete Any</th>
                <th>Admin Panel</th>
                <th>Manage Users</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Badge text="USER" color="#3B82F6" /></td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--red)' }}>✗</td>
                <td style={{ color: 'var(--red)' }}>✗</td>
                <td style={{ color: 'var(--red)' }}>✗</td>
                <td style={{ color: 'var(--red)' }}>✗</td>
              </tr>
              <tr>
                <td><Badge text="CONTENT_CREATOR" color="#22C55E" /></td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--red)' }}>✗</td>
                <td style={{ color: 'var(--red)' }}>✗</td>
                <td style={{ color: 'var(--red)' }}>✗</td>
              </tr>
              <tr>
                <td><Badge text="ADMIN" color="#EF4444" /></td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
                <td style={{ color: 'var(--green)' }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          code={`// Method-level security with SpEL
@RestController
@RequestMapping("/api/v1/snippets")
public class SnippetController {

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'CONTENT_CREATOR', 'ADMIN')")
    public ResponseEntity<SnippetDTO> create(
            @Valid @RequestBody CreateSnippetRequest request) {
        // Any authenticated user can create
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("@snippetSecurity.isOwner(#id, authentication)")
    public ResponseEntity<SnippetDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSnippetRequest request) {
        // Only the owner can update
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("@snippetSecurity.isOwner(#id, authentication) " +
                  "or hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        // Owner or Admin can delete
    }
}

// Custom security expression
@Component("snippetSecurity")
@RequiredArgsConstructor
public class SnippetSecurityEvaluator {
    private final SnippetRepository snippetRepo;
    
    public boolean isOwner(UUID snippetId, Authentication auth) {
        return snippetRepo.findById(snippetId)
            .map(s -> s.getAuthorId().toString()
                .equals(auth.getName()))
            .orElse(false);
    }
}`}
          language="Java — Method Security with SpEL"
        />
      </ScrollSection>

      {/* OAuth2 */}
      <ScrollSection>
        <SectionLabel text="OAUTH2 SOCIAL LOGIN" />
        <h2 className="section-title">Google & GitHub OAuth2 integration</h2>
        <MermaidDiagram
          chart={`sequenceDiagram
    participant U as 👤 User
    participant C as 🖥️ Frontend
    participant GW as 🌐 Gateway
    participant US as 👤 User Service
    participant G as 🔑 Google OAuth

    U->>C: Click "Login with Google"
    C->>G: Redirect to Google consent
    G-->>C: Auth code (callback URL)
    C->>GW: POST /auth/oauth2/google {code}
    GW->>US: Forward
    US->>G: Exchange code for tokens
    G-->>US: {id_token, access_token}
    US->>US: Decode id_token → email, name
    US->>US: Find or create user
    US->>US: Generate JWT + Refresh
    US-->>C: {accessToken, refreshToken}`}
          label="OAuth2 — Google Login Flow"
        />
      </ScrollSection>

      {/* Rate Limiting */}
      <ScrollSection>
        <SectionLabel text="RATE LIMITING" />
        <h2 className="section-title">Redis-backed sliding window rate limiting</h2>
        <p className="body-text mb-24">
          The API Gateway enforces per-user rate limits using Redis sorted sets. This protects
          services from abuse and ensures fair usage.
        </p>

        <div className="grid-2">
          {[
            { endpoint: 'General API', limit: '100 req/min', color: '#22C55E' },
            { endpoint: 'Auth (login/register)', limit: '10 req/min', color: '#EF4444' },
            { endpoint: 'Content creation', limit: '30 req/min', color: '#3B82F6' },
            { endpoint: 'Search', limit: '60 req/min', color: '#06B6D4' },
          ].map((rl) => (
            <Card key={rl.endpoint} semantic color={rl.color}>
              <div className="card-title" style={{ fontSize: 14 }}>{rl.endpoint}</div>
              <div className="stat-number" style={{ fontSize: 24, color: rl.color, marginTop: 4 }}>{rl.limit}</div>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
