export default function Badge({ text, color = '#E8E6E3' }) {
  return (
    <span
      className="badge"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}25`,
        color,
      }}
    >
      {text}
    </span>
  );
}
