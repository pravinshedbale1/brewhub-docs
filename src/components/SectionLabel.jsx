export default function SectionLabel({ text }) {
  return (
    <div className="section-label-component">
      <div className="section-label-line" />
      <span className="section-label-text">{text}</span>
    </div>
  );
}
