export default function DiagramLayer({ icon, title, subtitle, description, color }) {
  return (
    <div
      className="diagram-layer"
      style={{
        background: `linear-gradient(135deg, ${color}15, ${color}08)`,
        border: `1px solid ${color}30`,
      }}
    >
      <span className="diagram-layer__icon">{icon}</span>
      <div className="diagram-layer__content">
        <div className="diagram-layer__title">{title}</div>
        <div className="diagram-layer__subtitle" style={{ color }}>{subtitle}</div>
        {description && <div className="diagram-layer__desc">{description}</div>}
      </div>
    </div>
  );
}

export function FlowConnector() {
  return <div className="flow-connector">▼ ▼ ▼</div>;
}
