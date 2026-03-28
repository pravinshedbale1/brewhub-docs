export default function Card({ children, semantic, color, className = '', onClick, style = {} }) {
  const semanticStyle = semantic && color ? {
    background: `${color}12`,
    border: `1px solid ${color}30`,
    ...style,
  } : style;

  return (
    <div
      className={`card ${semantic ? 'card--semantic' : ''} ${onClick ? 'card--clickable' : ''} ${className}`}
      style={semanticStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
