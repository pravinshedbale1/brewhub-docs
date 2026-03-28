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

// Frontend pages
import FeLanding from './pages/frontend/FeLanding';
import FeArchitecture from './pages/frontend/FeArchitecture';
import FeComponents from './pages/frontend/FeComponents';
import FePages from './pages/frontend/FePages';
import FeStateApi from './pages/frontend/FeStateApi';
import FeTesting from './pages/frontend/FeTesting';
import FeTechStack from './pages/frontend/FeTechStack';
import FeRoadmap from './pages/frontend/FeRoadmap';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Backend routes */}
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

          {/* Frontend routes */}
          <Route path="fe" element={<FeLanding />} />
          <Route path="fe/architecture" element={<FeArchitecture />} />
          <Route path="fe/components" element={<FeComponents />} />
          <Route path="fe/pages" element={<FePages />} />
          <Route path="fe/state" element={<FeStateApi />} />
          <Route path="fe/testing" element={<FeTesting />} />
          <Route path="fe/tech-stack" element={<FeTechStack />} />
          <Route path="fe/roadmap" element={<FeRoadmap />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
