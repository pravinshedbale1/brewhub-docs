import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const backendNav = [
  { label: 'Overview', path: '/', icon: '🏠' },
  { section: 'ARCHITECTURE' },
  { label: 'System Architecture', path: '/architecture', icon: '🏗️' },
  { label: 'Microservices', path: '/services', icon: '⚙️' },
  { label: 'Database Design', path: '/database', icon: '🗄️' },
  { label: 'Kafka Architecture', path: '/kafka', icon: '📨' },
  { section: 'DESIGN' },
  { label: 'UML Diagrams', path: '/uml', icon: '📐' },
  { label: 'Design Patterns', path: '/patterns', icon: '♟️' },
  { label: 'Tech Stack', path: '/tech-stack', icon: '🛠️' },
  { section: 'FEATURES' },
  { label: 'Security', path: '/security', icon: '🔒' },
  { label: 'DevOps', path: '/devops', icon: '🐳' },
  { label: 'Concept Tracker', path: '/concepts', icon: '📋' },
  { label: 'Learning Roadmap', path: '/roadmap', icon: '🗺️' },
];

const frontendNav = [
  { label: 'Overview', path: '/fe', icon: '🏠' },
  { section: 'STRUCTURE' },
  { label: 'Architecture', path: '/fe/architecture', icon: '🏗️' },
  { label: 'Components', path: '/fe/components', icon: '🧩' },
  { label: 'Pages & Routing', path: '/fe/pages', icon: '📄' },
  { section: 'DATA & API' },
  { label: 'State & API Layer', path: '/fe/state', icon: '🔄' },
  { label: 'Tech Stack', path: '/fe/tech-stack', icon: '🛠️' },
  { section: 'QUALITY' },
  { label: 'Testing Strategy', path: '/fe/testing', icon: '🧪' },
  { label: 'Frontend Roadmap', path: '/fe/roadmap', icon: '🗺️' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Determine active tab from the current route
  const isFrontendRoute = location.pathname.startsWith('/fe');
  const [activeTab, setActiveTab] = useState(isFrontendRoute ? 'frontend' : 'backend');

  // Sync tab with route when navigating directly via URL
  useEffect(() => {
    setActiveTab(location.pathname.startsWith('/fe') ? 'frontend' : 'backend');
  }, [location.pathname]);

  const navItems = activeTab === 'frontend' ? frontendNav : backendNav;

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
          onClose?.();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <aside ref={sidebarRef} className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-name">ByteCodeBrew</div>
        <div className="sidebar-brand-project">BrewHub Project Docs</div>
        <div className="sidebar-brand-tagline">CODE · CONNECT · CREATE</div>
      </div>

      {/* Tab Switcher */}
      <div className="sidebar-tab-switcher">
        <button
          className={`sidebar-tab ${activeTab === 'backend' ? 'active' : ''}`}
          onClick={() => setActiveTab('backend')}
        >
          <span className="sidebar-tab-icon">☕</span>
          Backend
        </button>
        <button
          className={`sidebar-tab ${activeTab === 'frontend' ? 'active' : ''}`}
          onClick={() => setActiveTab('frontend')}
        >
          <span className="sidebar-tab-icon">⚛️</span>
          Frontend
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div key={i} className="sidebar-section-label">
                {item.section}
              </div>
            );
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={() => onClose?.()}
              end={item.path === '/' || item.path === '/fe'}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-handle">@bytecodebreww</div>
        <div className="sidebar-footer-site">bytecodebrew.com</div>
      </div>
    </aside>
  );
}
