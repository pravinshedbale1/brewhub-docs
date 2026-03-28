import Badge from './Badge';

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={i} className="timeline__item">
          <div className="timeline__node" />
          <div className="timeline__header-row">
            <div className="timeline__phase">{item.phase}</div>
            {item.duration && (
              <div className="timeline__duration" style={{ color: item.color }}>
                ⏱ {item.duration}
              </div>
            )}
          </div>
          <div className="timeline__title">{item.title}</div>
          {item.milestone && (
            <div className="timeline__milestone">
              🏁 <span>Milestone:</span> {item.milestone}
            </div>
          )}
          <div className="timeline__detail">{item.detail}</div>
          {item.weeklyBreakdown && (
            <div className="timeline__weekly">
              {item.weeklyBreakdown.map((week, k) => (
                <div key={k} className="timeline__week-item">
                  <span className="timeline__week-label">{week.week}</span>
                  <span className="timeline__week-task">{week.task}</span>
                </div>
              ))}
            </div>
          )}
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
