import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="grid-overlay" />
      <div className="glow-orb glow-orb--orange-tl" />
      <div className="glow-orb glow-orb--purple-mr" />
      <div className="glow-orb glow-orb--blue-bl" />
      <div className="glow-orb glow-orb--cyan-br" />

      <button
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-content">
          <div className="page-container">
            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
