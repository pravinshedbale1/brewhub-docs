import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StatBox from '../components/StatBox';
import CodeBlock from '../components/CodeBlock';
import Accordion from '../components/Accordion';
import { kafkaTopics } from '../data/diagrams';

export default function KafkaArch() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="KAFKA ARCHITECTURE" />
        <h1 className="section-title">The event backbone of BrewHub</h1>
        <p className="body-text mb-24">
          Apache Kafka is the nervous system connecting all services. Every state change worth
          knowing about becomes an event. Services produce events, other services consume them.
          No service directly calls another for domain events.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value="6" label="Topics" color="var(--purple)" />
          <StatBox value="45" label="Partitions" color="var(--blue)" />
          <StatBox value="20+" label="Event Types" color="var(--green)" />
          <StatBox value="3x" label="Replication" color="var(--red)" />
        </div>
      </ScrollSection>

      {/* Topics Detail */}
      <ScrollSection>
        <SectionLabel text="TOPIC DESIGN" />
        <h2 className="section-title">Every topic has a purpose and a strategy</h2>
        <p className="body-text mb-24">
          Topics are organized by bounded context (one per service domain). Partition count
          is tuned based on expected throughput. Keys ensure ordering within a partition.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {kafkaTopics.map((topic) => (
            <Accordion
              key={topic.name}
              icon="📨"
              title={topic.name}
              subtitle={`${topic.partitions} partitions · ${topic.retention} retention`}
              color={topic.color}
            >
              <div className="grid-2 mb-16" style={{ gap: 12 }}>
                <div>
                  <div className="metadata-text mb-8" style={{ color: topic.color }}>PRODUCER</div>
                  <span className="small-text" style={{ color: 'var(--text-primary)' }}>{topic.producer}</span>
                </div>
                <div>
                  <div className="metadata-text mb-8" style={{ color: topic.color }}>PARTITION KEY</div>
                  <Badge text={topic.keyStrategy} color={topic.color} />
                </div>
              </div>

              <div className="mb-16">
                <div className="metadata-text mb-8" style={{ color: topic.color }}>CONSUMERS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {topic.consumers.map((c, i) => <Badge key={i} text={c} color="#3B82F6" />)}
                </div>
              </div>

              <div className="mb-16">
                <div className="metadata-text mb-8" style={{ color: topic.color }}>EVENT TYPES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {topic.events.map((e, i) => <Badge key={i} text={e} color="#22C55E" />)}
                </div>
              </div>

              <div className="grid-4" style={{ gap: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ color: topic.color, fontSize: 24 }}>{topic.partitions}</div>
                  <div className="metadata-text">Partitions</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ color: topic.color, fontSize: 24 }}>{topic.replication}</div>
                  <div className="metadata-text">Replication</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ color: topic.color, fontSize: 24 }}>{topic.events.length}</div>
                  <div className="metadata-text">Events</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ color: topic.color, fontSize: 24 }}>{topic.consumers.length}</div>
                  <div className="metadata-text">Consumers</div>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </ScrollSection>

      {/* Event Schema */}
      <ScrollSection>
        <SectionLabel text="EVENT SCHEMA" />
        <h2 className="section-title">CloudEvents-inspired event envelope</h2>
        <p className="body-text mb-24">
          All events follow a standard envelope format inspired by the CloudEvents spec.
          This ensures consistency across services and enables schema evolution without breaking consumers.
        </p>

        <CodeBlock
          code={`// Base Event Envelope (all events extend this)
public record BrewHubEvent<T>(
    String id,              // UUID - unique event ID
    String type,            // e.g., "content.created"
    String source,          // e.g., "content-service"
    Instant timestamp,      // when the event occurred
    String correlationId,   // trace ID for distributed tracing
    int version,            // schema version (1, 2, 3...)
    T data                  // event-specific payload
) {}

// Example: Content Created Event
public record ContentCreatedData(
    UUID contentId,
    UUID authorId,
    String title,
    String contentType,     // SNIPPET, ARTICLE, PROJECT
    String language,
    List<String> tags,
    String snippet           // first 200 chars for preview
) {}

// Usage
var event = new BrewHubEvent<>(
    UUID.randomUUID().toString(),
    "content.created",
    "content-service",
    Instant.now(),
    MDC.get("traceId"),
    1,
    new ContentCreatedData(
        snippet.getId(),
        snippet.getAuthorId(),
        snippet.getTitle(),
        "SNIPPET",
        snippet.getLanguage(),
        snippet.getTags(),
        snippet.getCode().substring(0, 200)
    )
);

kafkaTemplate.send("brewhub.content.events",
    snippet.getId().toString(), event);`}
          language="Java — Event Schema"
        />
      </ScrollSection>

      {/* Kafka Streams */}
      <ScrollSection>
        <SectionLabel text="KAFKA STREAMS" />
        <h2 className="section-title">Real-time analytics without a separate framework</h2>
        <p className="body-text mb-24">
          The Analytics Service uses Kafka Streams to compute trending content in real-time.
          Events flow through a topology that windows, aggregates, and outputs trending scores.
        </p>

        <CodeBlock
          code={`@Configuration
public class TrendingTopology {

    @Bean
    public KStream<String, BrewHubEvent<ContentViewedData>> 
            trendingStream(StreamsBuilder builder) {
        
        KStream<String, BrewHubEvent<ContentViewedData>> views = 
            builder.stream("brewhub.content.events",
                Consumed.with(Serdes.String(), eventSerde()));

        // Filter only view events
        KStream<String, BrewHubEvent<ContentViewedData>> viewEvents = 
            views.filter((key, event) -> 
                "content.viewed".equals(event.type()));

        // Window by 1 hour, count views per content
        KTable<Windowed<String>, Long> hourlyCounts = viewEvents
            .groupBy((key, event) -> 
                event.data().contentId().toString())
            .windowedBy(
                TimeWindows.ofSizeWithNoGrace(Duration.ofHours(1)))
            .count(Materialized.as("hourly-view-counts"));

        // Emit trending scores
        hourlyCounts
            .toStream()
            .map((windowedKey, count) -> KeyValue.pair(
                windowedKey.key(),
                new TrendingScore(
                    windowedKey.key(), 
                    count,
                    windowedKey.window().startTime())))
            .to("brewhub.analytics.events",
                Produced.with(Serdes.String(), trendingSerde()));

        return viewEvents;
    }
}`}
          language="Java — Kafka Streams Topology"
        />
      </ScrollSection>

      {/* Error Handling */}
      <ScrollSection>
        <SectionLabel text="ERROR HANDLING" />
        <h2 className="section-title">Dead Letter Topics — when things go wrong</h2>
        <p className="body-text mb-24">
          Not every message can be processed successfully. Network issues, invalid data,
          or downstream failures can cause processing errors. BrewHub uses a retry + DLT
          strategy for robust error handling.
        </p>

        <div className="grid-2 mb-24">
          <div className="alert-card alert-card--orange">
            <div className="alert-card__label">RETRY STRATEGY</div>
            <div className="alert-card__text">
              Failed messages are retried 3 times with exponential backoff (1s, 2s, 4s).
              If all retries fail, the message is published to a Dead Letter Topic (DLT)
              for manual investigation.
            </div>
          </div>
          <div className="alert-card alert-card--red">
            <div className="alert-card__label">DEAD LETTER TOPIC</div>
            <div className="alert-card__text">
              The DLT (brewhub.notifications.dlq) stores failed messages with metadata:
              original topic, partition, offset, exception class, and error message.
              An admin dashboard allows reprocessing DLT messages.
            </div>
          </div>
        </div>

        <CodeBlock
          code={`@Configuration
public class KafkaConsumerConfig {
    
    @Bean
    public DefaultErrorHandler errorHandler(
            KafkaTemplate<String, Object> kafkaTemplate) {
        
        // Publish to DLT after 3 retries
        var dltHandler = new DeadLetterPublishingRecoverer(
            kafkaTemplate,
            (record, ex) -> new TopicPartition(
                record.topic() + ".dlq", 
                record.partition()));
        
        // Exponential backoff: 1s, 2s, 4s
        var backoff = new ExponentialBackOff(1000L, 2.0);
        backoff.setMaxElapsedTime(10000L);
        
        var errorHandler = new DefaultErrorHandler(
            dltHandler, backoff);
        
        // Don't retry on deserialization errors
        errorHandler.addNotRetryableExceptions(
            DeserializationException.class);
        
        return errorHandler;
    }
}`}
          language="Java — Error Handler Config"
        />
      </ScrollSection>

      {/* Best Practices */}
      <ScrollSection>
        <SectionLabel text="BEST PRACTICES" />
        <h2 className="section-title">Kafka patterns that save you in production</h2>

        <div className="grid-2 mt-24">
          {[
            { title: 'Idempotent Consumers', desc: 'Every consumer stores processed event IDs. If a message is redelivered (at-least-once), the consumer checks and skips duplicates. Use a Redis SET or database unique constraint.', color: '#22C55E' },
            { title: 'Ordered Processing', desc: 'Kafka guarantees order within a partition. Use the entity ID as the partition key to ensure all events for a content item are processed in order.', color: '#3B82F6' },
            { title: 'Schema Evolution', desc: 'Events include a version field. Consumers handle multiple versions gracefully. New fields are optional with defaults. Never remove fields — deprecate them.', color: '#A855F7' },
            { title: 'Consumer Lag Monitoring', desc: 'Monitor consumer group lag via Spring Boot Actuator + Prometheus. Alert when lag exceeds thresholds — it indicates processing bottlenecks.', color: '#F97316' },
          ].map((item) => (
            <Card key={item.title} semantic color={item.color}>
              <div className="card-title" style={{ marginBottom: 8 }}>{item.title}</div>
              <p className="small-text">{item.desc}</p>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
