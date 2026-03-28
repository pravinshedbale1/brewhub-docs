export default function StatBox({ value, label, color = 'var(--orange)' }) {
  return (
    <div className="stat-box">
      <div className="stat-box__value" style={{ color }}>
        {value}
      </div>
      <div className="stat-box__label">{label}</div>
    </div>
  );
}
