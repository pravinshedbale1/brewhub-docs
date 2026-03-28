export default function CodeBlock({ code, language = '' }) {
  return (
    <div className="code-block" style={{ position: 'relative' }}>
      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
        <div className="code-block-dots">
          <span className="code-block-dot" style={{ background: '#EF4444' }} />
          <span className="code-block-dot" style={{ background: '#F59E0B' }} />
          <span className="code-block-dot" style={{ background: '#22C55E' }} />
        </div>
      </div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
    </div>
  );
}
