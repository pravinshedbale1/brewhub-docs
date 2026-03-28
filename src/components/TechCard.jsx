export default function TechCard({ name, icon, category, color, why, overAlternatives }) {
  return (
    <div className="tech-card">
      <div className="tech-card__header">
        <div
          className="tech-card__icon-wrap"
          style={{ background: `${color}18` }}
        >
          {icon}
        </div>
        <div>
          <div className="tech-card__name">{name}</div>
          <div className="tech-card__category" style={{ color }}>{category}</div>
        </div>
      </div>

      <div className="tech-card__section">
        <div className="tech-card__section-label">WHY</div>
        <p className="tech-card__section-text">{why}</p>
      </div>

      <div className="tech-card__section">
        <div className="tech-card__section-label">OVER ALTERNATIVES</div>
        <p className="tech-card__section-text tech-card__section-alt">{overAlternatives}</p>
      </div>
    </div>
  );
}
