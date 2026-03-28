import SectionLabel from '../components/SectionLabel';
import ScrollSection from '../components/ScrollSection';
import Accordion from '../components/Accordion';
import Badge from '../components/Badge';
import { services, infrastructureServices } from '../data/services';
import StatBox from '../components/StatBox';
import Card from '../components/Card';

export default function Services() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="MICROSERVICES BREAKDOWN" />
        <h1 className="section-title">8 services, deep-dived</h1>
        <p className="body-text mb-24">
          Each microservice is a standalone Spring Boot application with its own database,
          configuration, and deployment pipeline. Click any service to explore its responsibilities,
          API endpoints, Kafka events, concepts covered, and design patterns used.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value="8" label="Services" color="var(--orange)" />
          <StatBox value="50+" label="API Endpoints" color="var(--blue)" />
          <StatBox value="20+" label="Kafka Events" color="var(--purple)" />
          <StatBox value="40+" label="DB Tables" color="var(--green)" />
        </div>
      </ScrollSection>

      {/* Service Accordions */}
      <ScrollSection>
        <SectionLabel text="SERVICE DETAILS" />
        <h2 className="section-title">Click to explore each service</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          {services.map((service) => (
            <Accordion
              key={service.id}
              icon={service.icon}
              title={service.name}
              subtitle={`${service.db} · :${service.port}`}
              color={service.color}
            >
              <p className="body-text mb-16">{service.description}</p>

              {/* Responsibilities */}
              <div className="mb-24">
                <div className="metadata-text mb-8" style={{ color: service.color }}>RESPONSIBILITIES</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {service.responsibilities.map((r, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: service.color, flexShrink: 0, marginTop: 2 }}>▹</span>
                      <span className="small-text" style={{ color: 'var(--text-secondary)' }}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* API Endpoints */}
              <div className="mb-24">
                <div className="metadata-text mb-8" style={{ color: service.color }}>API ENDPOINTS</div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>Path</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.endpoints.map((ep, i) => (
                        <tr key={i}>
                          <td>
                            <Badge
                              text={ep.method}
                              color={
                                ep.method === 'GET' ? '#22C55E' :
                                ep.method === 'POST' ? '#3B82F6' :
                                ep.method === 'PUT' ? '#F59E0B' :
                                ep.method === 'DELETE' ? '#EF4444' :
                                ep.method === 'WS' ? '#A855F7' :
                                ep.method === 'SSE' ? '#EC4899' :
                                '#555860'
                              }
                            />
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>
                            {ep.path}
                          </td>
                          <td>{ep.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Kafka Events */}
              <div className="mb-24">
                <div className="metadata-text mb-8" style={{ color: service.color }}>KAFKA EVENTS</div>
                <div className="grid-2" style={{ gap: 12 }}>
                  <Card semantic color="#22C55E" style={{ padding: '14px 18px' }}>
                    <div className="metadata-text mb-8" style={{ color: 'var(--green)' }}>PRODUCES</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {service.events.produces.length > 0 ?
                        service.events.produces.map((e, i) => <Badge key={i} text={e} color="#22C55E" />) :
                        <span className="small-text">None (consumer only)</span>
                      }
                    </div>
                  </Card>
                  <Card semantic color="#3B82F6" style={{ padding: '14px 18px' }}>
                    <div className="metadata-text mb-8" style={{ color: 'var(--blue)' }}>CONSUMES</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {service.events.consumes.length > 0 ?
                        service.events.consumes.map((e, i) => <Badge key={i} text={e} color="#3B82F6" />) :
                        <span className="small-text">None (producer only)</span>
                      }
                    </div>
                  </Card>
                </div>
              </div>

              {/* Concepts & Patterns */}
              <div className="grid-2" style={{ gap: 12 }}>
                <div>
                  <div className="metadata-text mb-8" style={{ color: service.color }}>CONCEPTS COVERED</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {service.concepts.map((c, i) => <Badge key={i} text={c} color={service.color} />)}
                  </div>
                </div>
                <div>
                  <div className="metadata-text mb-8" style={{ color: service.color }}>DESIGN PATTERNS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {service.patterns.map((p, i) => <Badge key={i} text={p} color="#FF8C00" />)}
                  </div>
                </div>
              </div>

              {/* Database Tables */}
              <div style={{ marginTop: 20 }}>
                <div className="metadata-text mb-8" style={{ color: service.color }}>DATABASE TABLES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {service.tables.map((t, i) => <Badge key={i} text={t} color="#06B6D4" />)}
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </ScrollSection>

      {/* Infrastructure Services */}
      <ScrollSection>
        <SectionLabel text="INFRASTRUCTURE" />
        <h2 className="section-title">The supporting cast</h2>
        <p className="body-text mb-24">
          These infrastructure services run alongside the microservices. All are containerized
          and managed via Docker Compose for local development.
        </p>

        <div className="grid-3">
          {infrastructureServices.map((svc) => (
            <Card key={svc.name} semantic color={svc.color}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{svc.icon}</span>
                <div className="card-title" style={{ fontSize: 14 }}>{svc.name}</div>
              </div>
              <p className="small-text">{svc.desc}</p>
              <div className="metadata-text" style={{ color: svc.color, marginTop: 8 }}>
                PORT: {svc.port}
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
