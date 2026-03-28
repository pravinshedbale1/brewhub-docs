import { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';

let diagramId = 0;

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#FF8C0030',
    primaryTextColor: '#E8E6E3',
    primaryBorderColor: '#FF8C00',
    lineColor: '#555860',
    secondaryColor: '#3B82F620',
    tertiaryColor: '#0F1B3D',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '12px',
    noteTextColor: '#E8E6E3',
    noteBkgColor: '#0F1B3D',
    noteBorderColor: '#FF8C0040',
    actorTextColor: '#E8E6E3',
    actorBkg: '#0F1B3D',
    actorBorder: '#FF8C00',
    signalColor: '#8B8D93',
    signalTextColor: '#E8E6E3',
    labelBoxBkgColor: '#0F1B3D',
    labelBoxBorderColor: '#FF8C0040',
    labelTextColor: '#E8E6E3',
    loopTextColor: '#FF8C00',
    activationBorderColor: '#FF8C00',
    activationBkgColor: '#FF8C0015',
    sequenceNumberColor: '#FF8C00',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    padding: 12,
  },
  er: {
    layoutDirection: 'TB',
    fontSize: 11,
  },
});

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.2;

export default function MermaidDiagram({ chart, label }) {
  const containerRef = useRef(null);
  const diagramRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const idRef = useRef(`mermaid-${++diagramId}`);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(
          idRef.current,
          chart
        );
        setSvg(renderedSvg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setSvg(`<p style="color: #EF4444; font-family: JetBrains Mono, monospace; font-size: 12px;">Diagram rendering error. Please check the Mermaid syntax.</p>`);
      }
    };
    renderDiagram();
  }, [chart]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom(prev => Math.max(MIN_ZOOM, Math.min(prev + delta, MAX_ZOOM)));
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (zoom > 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  }, [zoom, panOffset]);

  const handleMouseMove = useCallback((e) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="mermaid-container" style={{ position: 'relative' }}>
      {/* Zoom Controls */}
      <div className="mermaid-zoom-controls">
        <button
          className="mermaid-zoom-btn"
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom in"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5.5" />
            <line x1="11" y1="11" x2="14.5" y2="14.5" />
            <line x1="4.5" y1="7" x2="9.5" y2="7" />
            <line x1="7" y1="4.5" x2="7" y2="9.5" />
          </svg>
        </button>

        <span className="mermaid-zoom-level">{zoomPercent}%</span>

        <button
          className="mermaid-zoom-btn"
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5.5" />
            <line x1="11" y1="11" x2="14.5" y2="14.5" />
            <line x1="4.5" y1="7" x2="9.5" y2="7" />
          </svg>
        </button>

        <div className="mermaid-zoom-divider" />

        <button
          className="mermaid-zoom-btn"
          onClick={handleReset}
          title="Reset Zoom"
          aria-label="Reset zoom"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 8a6 6 0 1 1 1.5 4" />
            <polyline points="2,4 2,8 6,8" />
          </svg>
        </button>
      </div>

      {/* Diagram viewport */}
      <div
        ref={containerRef}
        className="mermaid-viewport"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: zoom > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default',
        }}
      >
        <div
          ref={diagramRef}
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.2s ease',
          }}
        />
      </div>

      {/* Zoom hint */}
      {zoom === 1 && (
        <div className="mermaid-zoom-hint">
          Ctrl + Scroll to zoom · Drag to pan when zoomed
        </div>
      )}

      {label && <div className="mermaid-label">{label}</div>}
    </div>
  );
}
