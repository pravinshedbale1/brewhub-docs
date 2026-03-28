import Badge from './Badge';

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={i} className="timeline__item">
          <div className="timeline__node" />
          <div className="timeline__phase">{item.phase}</div>
          <div className="timeline__title">{item.title}</div>
          <div className="timeline__detail">{item.detail}</div>
          {item.tags && (
            <div className="timeline__tags">
              {item.tags.map((tag, j) => (
                <Badge key={j} text={tag} color={item.color || '#FF8C00'} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
