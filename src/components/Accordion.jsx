import { useState } from 'react';

export default function Accordion({ icon, title, subtitle, children, defaultOpen = false, color }) {
  const [open, setOpen] = useState(defaultOpen);

  const borderStyle = open && color ? { borderColor: `${color}40` } : {};
  const bgStyle = open && color ? { background: `${color}08` } : {};

  return (
    <div className={`accordion ${open ? 'open' : ''}`} style={{ ...borderStyle, ...bgStyle }}>
      <div className="accordion__header" onClick={() => setOpen(!open)}>
        <div className="accordion__header-left">
          {icon && <span className="accordion__icon">{icon}</span>}
          <div>
            <div className="accordion__title">{title}</div>
            {subtitle && <div className="accordion__subtitle">{subtitle}</div>}
          </div>
        </div>
        <span className="accordion__toggle">+</span>
      </div>
      {open && (
        <div className="accordion__body" style={color ? { borderTopColor: `${color}20` } : {}}>
          {children}
        </div>
      )}
    </div>
  );
}
