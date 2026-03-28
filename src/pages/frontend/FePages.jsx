import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import MermaidDiagram from '../../components/MermaidDiagram';
import CodeBlock from '../../components/CodeBlock';

const pages = [
  { path: '/', name: 'FeedPage', auth: true, module: 'Feed', description: 'Home feed with infinite-scrolling snippets and articles. Filters by language, tags, trending. Sidebar shows trending and suggested users.', layout: 'MainLayout' },
  { path: '/trending', name: 'TrendingPage', auth: true, module: 'Feed', description: 'Trending content computed by Kafka Streams — daily, weekly, and all-time leaderboards with sparkline charts.', layout: 'MainLayout' },
  { path: '/snippet/new', name: 'CreateSnippetPage', auth: true, module: 'Editor', description: 'Monaco code editor with language selector, tags input, and live preview. Auto-save drafts to localStorage.', layout: 'MainLayout' },
  { path: '/snippet/:id', name: 'SnippetDetailPage', auth: false, module: 'Feed', description: 'Full snippet view with syntax highlighting, comments, likes, bookmarks, fork button, and share link.', layout: 'MainLayout' },
  { path: '/snippet/:id/edit', name: 'EditSnippetPage', auth: true, module: 'Editor', description: 'Edit existing snippet with version history, optimistic locking warning, and diff preview.', layout: 'MainLayout' },
  { path: '/article/new', name: 'CreateArticlePage', auth: true, module: 'Editor', description: 'Rich markdown editor with toolbar, image upload to MinIO, and live preview panel.', layout: 'MainLayout' },
  { path: '/article/:id', name: 'ArticleDetailPage', auth: false, module: 'Feed', description: 'Full article with rendered markdown, table of contents, estimated read time, and reactions.', layout: 'MainLayout' },
  { path: '/session/new', name: 'SessionLobbyPage', auth: true, module: 'Collaboration', description: 'Create or join a live coding session. Configure language, invite link, and session settings.', layout: 'MainLayout' },
  { path: '/session/:id', name: 'SessionPage', auth: true, module: 'Collaboration', description: 'Live collaborative coding with multi-cursor, chat panel, and user presence indicators.', layout: 'FullscreenLayout' },
  { path: '/reviews', name: 'ReviewListPage', auth: true, module: 'Reviews', description: 'Pending and completed code reviews. Filter by status (Draft, In Review, Approved, Rejected).', layout: 'MainLayout' },
  { path: '/review/:id', name: 'ReviewPage', auth: true, module: 'Reviews', description: 'Side-by-side diff viewer with inline comments, status transitions, and approval buttons.', layout: 'MainLayout' },
  { path: '/profile/:username', name: 'ProfilePage', auth: false, module: 'Profile', description: 'Public profile with avatar, bio, stats, activity timeline, and tabbed snippets/articles.', layout: 'MainLayout' },
  { path: '/settings', name: 'SettingsPage', auth: true, module: 'Profile', description: 'Account settings: profile edit, notification preferences, connected OAuth accounts, theme.', layout: 'MainLayout' },
  { path: '/bookmarks', name: 'BookmarksPage', auth: true, module: 'Profile', description: 'Saved snippets and articles organized by collections.', layout: 'MainLayout' },
  { path: '/notifications', name: 'NotificationsPage', auth: true, module: 'Notifications', description: 'Full notification center with grouped items, mark read/unread, and filter by type.', layout: 'MainLayout' },
  { path: '/dashboard', name: 'DashboardPage', auth: true, module: 'Analytics', description: 'Personal analytics: total views, likes, top content, follower growth chart.', layout: 'MainLayout' },
  { path: '/login', name: 'LoginPage', auth: false, module: 'Auth', description: 'Email/password login + OAuth2 buttons (GitHub, Google). Remember me & forgot password.', layout: 'AuthLayout' },
  { path: '/register', name: 'RegisterPage', auth: false, module: 'Auth', description: 'Registration form with real-time validation (Zod), password strength meter, and terms.', layout: 'AuthLayout' },
  { path: '/forgot-password', name: 'ForgotPasswordPage', auth: false, module: 'Auth', description: 'Email-based password reset flow with Thymeleaf emails triggered via backend.', layout: 'AuthLayout' },
];

const moduleColors = {
  'Feed': '#3B82F6', 'Editor': '#22C55E', 'Collaboration': '#A855F7',
  'Reviews': '#06B6D4', 'Profile': '#EC4899', 'Notifications': '#F59E0B',
  'Analytics': '#F97316', 'Auth': '#EF4444',
};

export default function FePages() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="PAGES & ROUTING" />
        <h1 className="section-title">Every screen, every route, every layout</h1>
        <p className="body-text mb-24">
          The BrewHub frontend has <strong>{pages.length} pages</strong> organized across 8 modules.
          Routes are lazy-loaded for optimal bundle size, and protected routes redirect unauthenticated users to login.
        </p>
      </ScrollSection>

      {/* Route Map */}
      <ScrollSection>
        <SectionLabel text="ROUTE MAP" />
        <h2 className="section-title">Visual route hierarchy</h2>

        <MermaidDiagram
          chart={`graph LR
    ROOT["/"]
    ROOT --> AUTH_L["AuthLayout"]
    ROOT --> MAIN_L["MainLayout"]
    ROOT --> FULL_L["FullscreenLayout"]

    AUTH_L --> LOGIN["/login"]
    AUTH_L --> REGISTER["/register"]
    AUTH_L --> FORGOT["/forgot-password"]

    MAIN_L --> FEED_P["/  (Feed)"]
    MAIN_L --> TRENDING["/trending"]
    MAIN_L --> SNIPPET_NEW["/snippet/new"]
    MAIN_L --> SNIPPET_ID["/snippet/:id"]
    MAIN_L --> PROFILE_U["/profile/:username"]
    MAIN_L --> SETTINGS["/settings"]
    MAIN_L --> REVIEWS_L["/reviews"]
    MAIN_L --> NOTIF["/notifications"]
    MAIN_L --> DASH["/dashboard"]

    FULL_L --> SESSION_ID["/session/:id"]

    style AUTH_L fill:#EF444420,stroke:#EF4444,color:#fff
    style MAIN_L fill:#3B82F620,stroke:#3B82F6,color:#fff
    style FULL_L fill:#A855F720,stroke:#A855F7,color:#fff`}
          label="ROUTE HIERARCHY — 3 LAYOUTS, 19 PAGES"
        />
      </ScrollSection>

      {/* Layouts */}
      <ScrollSection>
        <SectionLabel text="LAYOUTS" />
        <h2 className="section-title">Three layouts for three contexts</h2>

        <div className="grid-3 mt-24">
          <Card semantic color="#3B82F6">
            <div style={{ fontSize: 32, marginBottom: 8 }}>📱</div>
            <div className="card-title">MainLayout</div>
            <div className="metadata-text mb-8" style={{ color: '#3B82F6' }}>SIDEBAR + TOPBAR + CONTENT</div>
            <p className="small-text">Full application layout with collapsible sidebar, search bar, notification bell, and user menu. Used for all authenticated pages.</p>
          </Card>
          <Card semantic color="#EF4444">
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔐</div>
            <div className="card-title">AuthLayout</div>
            <div className="metadata-text mb-8" style={{ color: '#EF4444' }}>CENTERED CARD, NO NAV</div>
            <p className="small-text">Minimal layout for login, register, and password reset. Centered card with brand logo. No sidebar or navigation clutter.</p>
          </Card>
          <Card semantic color="#A855F7">
            <div style={{ fontSize: 32, marginBottom: 8 }}>🖥️</div>
            <div className="card-title">FullscreenLayout</div>
            <div className="metadata-text mb-8" style={{ color: '#A855F7' }}>ZERO CHROME, MAX SPACE</div>
            <p className="small-text">Full viewport for live coding sessions. No sidebar, no topbar — just the editor, presence bar, and chat panel. Escape key exits.</p>
          </Card>
        </div>
      </ScrollSection>

      {/* Auth Guard */}
      <ScrollSection>
        <SectionLabel text="ROUTE PROTECTION" />
        <h2 className="section-title">Protected routes & auth guard</h2>
        <p className="body-text mb-24">
          A <code>ProtectedRoute</code> wrapper checks the auth Zustand store. If no token exists,
          it redirects to <code>/login?redirect=/original-path</code> so users return after login.
        </p>

        <MermaidDiagram
          chart={`sequenceDiagram
    participant USER as User
    participant ROUTER as React Router
    participant GUARD as ProtectedRoute
    participant STORE as authStore (Zustand)
    participant API as Axios Interceptor
    participant LOGIN as LoginPage

    USER->>ROUTER: Navigate to /settings
    ROUTER->>GUARD: Render ProtectedRoute
    GUARD->>STORE: Check isAuthenticated
    alt Token exists
        STORE-->>GUARD: true
        GUARD-->>USER: Render SettingsPage
    else No token
        STORE-->>GUARD: false
        GUARD->>LOGIN: Redirect to /login?redirect=/settings
        LOGIN->>USER: Show login form
        USER->>API: POST /auth/login
        API-->>STORE: Save JWT
        STORE-->>ROUTER: Navigate to /settings
    end`}
          label="AUTH GUARD FLOW"
        />
      </ScrollSection>

      {/* Page Table */}
      <ScrollSection>
        <SectionLabel text="ALL PAGES" />
        <h2 className="section-title">Complete route table</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pages.map((page) => (
            <div key={page.path} className="card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', minWidth: 180 }}>{page.path}</code>
              <span className="card-title" style={{ fontSize: 13, minWidth: 160 }}>{page.name}</span>
              <Badge text={page.module} color={moduleColors[page.module] || '#888'} />
              <Badge text={page.auth ? '🔒 Protected' : '🌐 Public'} color={page.auth ? '#EF4444' : '#22C55E'} />
              <Badge text={page.layout} color="rgba(255,255,255,0.12)" />
              <p className="small-text" style={{ flex: 1, minWidth: 200 }}>{page.description}</p>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Lazy Loading */}
      <ScrollSection>
        <SectionLabel text="CODE SPLITTING" />
        <h2 className="section-title">Lazy loading for performance</h2>
        <p className="body-text mb-24">
          Every page is wrapped in <code>React.lazy()</code> with a <code>Suspense</code> fallback
          showing a skeleton loader. This keeps the initial bundle small — users only download
          the code for the pages they visit.
        </p>

        <CodeBlock language="typescript" code={`// Router.tsx — Lazy loading example
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageSkeleton } from '@/shared/components/Skeleton';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';

const FeedPage = lazy(() => import('@/features/feed/pages/FeedPage'));
const CreateSnippetPage = lazy(() => import('@/features/editor/pages/CreateSnippet'));
const SessionPage = lazy(() => import('@/features/collaboration/pages/SessionPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));

export default function Router() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
          <Route path="/snippet/new" element={<ProtectedRoute><CreateSnippetPage /></ProtectedRoute>} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Route>
        <Route element={<FullscreenLayout />}>
          <Route path="/session/:id" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Suspense>
  );
}`} />
      </ScrollSection>
    </>
  );
}
