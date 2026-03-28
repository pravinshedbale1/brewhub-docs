import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Architecture from './pages/Architecture';
import Services from './pages/Services';
import Database from './pages/Database';
import KafkaArch from './pages/KafkaArch';
import UMLDiagrams from './pages/UMLDiagrams';
import TechStack from './pages/TechStack';
import DesignPatterns from './pages/DesignPatterns';
import ConceptTrackerPage from './pages/ConceptTrackerPage';
import Security from './pages/Security';
import DevOps from './pages/DevOps';
import Roadmap from './pages/Roadmap';

function ScrollToTop() {
  const { pathname } = window.location;
  // Scroll to top on route change is handled by useEffect in Layout
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="services" element={<Services />} />
          <Route path="database" element={<Database />} />
          <Route path="kafka" element={<KafkaArch />} />
          <Route path="uml" element={<UMLDiagrams />} />
          <Route path="tech-stack" element={<TechStack />} />
          <Route path="patterns" element={<DesignPatterns />} />
          <Route path="concepts" element={<ConceptTrackerPage />} />
          <Route path="security" element={<Security />} />
          <Route path="devops" element={<DevOps />} />
          <Route path="roadmap" element={<Roadmap />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
