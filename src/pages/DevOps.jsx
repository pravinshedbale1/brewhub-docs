import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import Badge from '../components/Badge';
import MermaidDiagram from '../components/MermaidDiagram';

export default function DevOps() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="DEVOPS & INFRASTRUCTURE" />
        <h1 className="section-title">From code to production, automated</h1>
        <p className="body-text mb-24">
          BrewHub is fully containerized and runs with a single Docker Compose command.
          CI/CD via GitHub Actions, monitoring via Prometheus + Grafana, and centralized
          logging via ELK. Everything is infrastructure-as-code.
        </p>
      </ScrollSection>

      {/* Docker Compose */}
      <ScrollSection>
        <SectionLabel text="DOCKER COMPOSE" />
        <h2 className="section-title">One command, entire stack running</h2>
        <p className="body-text mb-24">
          Every service and infrastructure component runs in Docker. Docker Compose
          orchestrates the local development environment.
        </p>

        <CodeBlock
          code={`# docker-compose.yml (simplified)
version: '3.8'

services:
  # ── Infrastructure ──
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: brewhub
      POSTGRES_PASSWORD: brewhub_dev
    volumes:
      - postgres_data:/var/lib/postgresql/data

  mongodb:
    image: mongo:7
    ports: ["27017:27017"]
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

  elasticsearch:
    image: elasticsearch:8.12.0
    ports: ["9200:9200"]
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    ports: ["9092:9092"]
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
    # KRaft mode (no Zookeeper!)

  minio:
    image: minio/minio
    ports: ["9000:9000", "9001:9001"]
    command: server /data --console-address ":9001"

  # ── Monitoring ──
  prometheus:
    image: prom/prometheus
    ports: ["9090:9090"]
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports: ["3000:3000"]
    volumes:
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards

  zipkin:
    image: openzipkin/zipkin
    ports: ["9411:9411"]

  # ── Application Services ──
  eureka-server:
    build: ./eureka-server
    ports: ["8761:8761"]

  config-server:
    build: ./config-server
    ports: ["8888:8888"]
    depends_on: [eureka-server]

  api-gateway:
    build: ./api-gateway
    ports: ["8080:8080"]
    depends_on: [eureka-server, config-server, redis]

  user-service:
    build: ./user-service
    ports: ["8081:8081"]
    depends_on: [postgres, redis, kafka, eureka-server]

  content-service:
    build: ./content-service
    ports: ["8082:8082"]
    depends_on: [postgres, kafka, minio, eureka-server]

  search-service:
    build: ./search-service
    ports: ["8083:8083"]
    depends_on: [elasticsearch, kafka, eureka-server]

  notification-service:
    build: ./notification-service
    ports: ["8084:8084"]
    depends_on: [mongodb, kafka, eureka-server]

  analytics-service:
    build: ./analytics-service
    ports: ["8085:8085"]
    depends_on: [redis, postgres, kafka, eureka-server]

  collaboration-service:
    build: ./collaboration-service
    ports: ["8086:8086"]
    depends_on: [postgres, redis, kafka, eureka-server]

  review-service:
    build: ./review-service
    ports: ["8087:8087"]
    depends_on: [postgres, kafka, eureka-server]

volumes:
  postgres_data:
  mongo_data:`}
          language="Docker Compose — Full Stack"
        />
      </ScrollSection>

      {/* Dockerfile */}
      <ScrollSection>
        <SectionLabel text="MULTI-STAGE DOCKERFILE" />
        <h2 className="section-title">Optimized container images</h2>
        <p className="body-text mb-24">
          Each service uses a multi-stage Dockerfile — Maven builds in stage 1, only the
          JAR and JRE are copied to stage 2. Final images are ~200MB instead of 800MB+.
        </p>

        <CodeBlock
          code={`# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`}
          language="Dockerfile — Multi-Stage Build"
        />
      </ScrollSection>

      {/* CI/CD Pipeline */}
      <ScrollSection>
        <SectionLabel text="CI/CD PIPELINE" />
        <h2 className="section-title">GitHub Actions — build, test, deploy</h2>

        <MermaidDiagram
          chart={`graph LR
    A[📝 Push to main] --> B[🔨 Build]
    B --> C[🧪 Unit Tests]
    C --> D[🐳 Testcontainers Integration Tests]
    D --> E{All Passed?}
    E -->|Yes| F[📦 Build Docker Image]
    E -->|No| G[❌ Fail & Notify]
    F --> H[📤 Push to Registry]
    H --> I[🚀 Deploy to Staging]
    I --> J[✅ Smoke Tests]
    J --> K[🎯 Deploy to Production]
    
    style A fill:#3B82F620,stroke:#3B82F6
    style E fill:#F59E0B20,stroke:#F59E0B
    style G fill:#EF444420,stroke:#EF4444
    style K fill:#22C55E20,stroke:#22C55E`}
          label="CI/CD Pipeline — GitHub Actions"
        />

        <CodeBlock
          code={`# .github/workflows/ci.yml
name: BrewHub CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: brewhub_test
          POSTGRES_PASSWORD: test
        ports: [5432:5432]
        options: --health-cmd pg_isready

    steps:
      - uses: actions/checkout@v4
      
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'
      
      - name: Run Unit Tests
        run: mvn test -pl user-service,content-service
      
      - name: Run Integration Tests (Testcontainers)
        run: mvn verify -pl user-service -P integration-tests
      
      - name: Build Docker Image
        if: github.ref == 'refs/heads/main'
        run: |
          docker build -t brewhub/user-service:$GITHUB_SHA .
          
      - name: Push to Container Registry
        if: github.ref == 'refs/heads/main'
        run: |
          docker push brewhub/user-service:$GITHUB_SHA`}
          language="GitHub Actions CI/CD"
        />
      </ScrollSection>

      {/* Monitoring */}
      <ScrollSection>
        <SectionLabel text="MONITORING STACK" />
        <h2 className="section-title">Prometheus + Grafana + Zipkin</h2>
        <p className="body-text mb-24">
          Every service exposes metrics via Spring Boot Actuator + Micrometer. Prometheus scrapes
          metrics, Grafana visualizes them. Zipkin traces requests across service boundaries.
        </p>

        <div className="grid-3 mt-24">
          {[
            { icon: '📈', name: 'Prometheus', desc: 'Scrapes /actuator/prometheus from each service every 15s. Stores time-series metrics. Fires alerts when thresholds are breached.', color: '#F97316' },
            { icon: '📉', name: 'Grafana', desc: 'Pre-built dashboards for JVM metrics, HTTP request rates, Kafka consumer lag, database connection pools, and error rates.', color: '#A855F7' },
            { icon: '🔗', name: 'Zipkin', desc: 'Collects trace spans from all services. Visualize the full journey of a request as it hops across Gateway → Service → Kafka → Consumer.', color: '#3B82F6' },
            { icon: '📋', name: 'ELK Stack', desc: 'Elasticsearch stores logs, Logstash parses them, Kibana searches them. Each service writes structured JSON logs with trace IDs.', color: '#06B6D4' },
            { icon: '💓', name: 'Health Checks', desc: 'Every service exposes /actuator/health with drill-down: database connectivity, Kafka connectivity, Redis connectivity, disk space.', color: '#22C55E' },
            { icon: '🔔', name: 'Alerting', desc: 'Prometheus Alertmanager fires Slack/email alerts for: p99 latency > 500ms, error rate > 5%, consumer lag > 1000, disk > 90%.', color: '#EF4444' },
          ].map((item) => (
            <Card key={item.name} semantic color={item.color}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div className="card-title" style={{ fontSize: 14, marginTop: 8 }}>{item.name}</div>
              <p className="small-text" style={{ marginTop: 6 }}>{item.desc}</p>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Project Structure */}
      <ScrollSection>
        <SectionLabel text="PROJECT STRUCTURE" />
        <h2 className="section-title">Monorepo with Maven modules</h2>

        <CodeBlock
          code={`brewhub/
├── pom.xml                          # Parent POM (dependency management)
├── docker-compose.yml               # Full stack local dev
├── .github/
│   └── workflows/
│       ├── ci.yml                   # CI/CD pipeline
│       └── codeql.yml               # Security scanning
├── monitoring/
│   ├── prometheus.yml               # Prometheus config
│   └── grafana/
│       └── dashboards/              # Pre-built Grafana dashboards
│
├── eureka-server/                   # Service Discovery
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/java/.../EurekaServerApplication.java
│
├── config-server/                   # Centralized Config
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/resources/config/   # Service configs (Git-backed)
│
├── api-gateway/                     # API Gateway
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│       ├── main/java/.../
│       │   ├── GatewayApplication.java
│       │   ├── config/
│       │   │   ├── RouteConfig.java
│       │   │   ├── SecurityConfig.java
│       │   │   └── RateLimitConfig.java
│       │   └── filter/
│       │       ├── JwtValidationFilter.java
│       │       └── RequestLoggingFilter.java
│       └── main/resources/
│           └── application.yml
│
├── user-service/                    # User & Auth Service
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│       ├── main/java/.../
│       │   ├── UserServiceApplication.java
│       │   ├── controller/
│       │   ├── service/
│       │   ├── repository/
│       │   ├── model/
│       │   ├── dto/
│       │   ├── security/
│       │   ├── config/
│       │   ├── exception/
│       │   ├── mapper/
│       │   └── event/
│       ├── main/resources/
│       │   ├── application.yml
│       │   └── db/migration/        # Flyway migrations
│       └── test/java/.../
│           ├── unit/
│           └── integration/
│
├── content-service/                  # Similar structure
├── search-service/
├── notification-service/
├── analytics-service/
├── collaboration-service/
└── review-service/`}
          language="Project Structure"
        />
      </ScrollSection>
    </>
  );
}
