import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import Timeline from '../../components/Timeline';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import StatBox from '../../components/StatBox';

const feRoadmapItems = [
  {
    phase: 'PHASE 1 — PROJECT SETUP',
    title: 'Vite + React + TypeScript Foundation',
    duration: '1 Week',
    milestone: 'Vite dev server running with TypeScript strict mode. Folder structure created. React Router configured with all 3 layouts. CSS variables and reset stylesheet ready. ESLint + Prettier configured.',
    detail: 'Initialize the project with Vite, set up TypeScript strict mode, configure path aliases (@/), create the feature-based folder structure, and set up React Router with nested layouts.',
    weeklyBreakdown: [
      { week: 'Day 1-2', task: 'Vite init, TypeScript strict config, path aliases, ESLint + Prettier. Feature folder structure (features/, shared/, api/, app/).' },
      { week: 'Day 3-4', task: 'React Router setup with MainLayout, AuthLayout, FullscreenLayout. CSS reset, CSS variables for the design system. Google Fonts.' },
      { week: 'Day 5-7', task: 'Shared components: Button, Input, Card, Badge, Skeleton, Modal. CSS Modules for each. Dark theme baseline.' },
    ],
    tags: ['Vite', 'TypeScript', 'React Router', 'CSS Modules', 'ESLint'],
    color: '#3B82F6',
  },
  {
    phase: 'PHASE 2 — AUTH MODULE',
    title: 'Login, Register, JWT & Protected Routes',
    duration: '2 Weeks',
    milestone: 'User can register, login with email/password, see their profile. JWT stored in Zustand (persisted). Protected routes redirect to login. Token auto-refreshes on 401.',
    detail: 'Build the auth module end-to-end: registration form with Zod validation, login with JWT, Zustand auth store with persist middleware, Axios interceptor for token injection, and ProtectedRoute component.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'Zustand authStore, Axios instance with JWT interceptor, login/register API functions. LoginPage and RegisterPage with React Hook Form + Zod validation. AuthLayout styling.' },
      { week: 'Week 2', task: 'ProtectedRoute component, 401 interceptor with automatic token refresh, OAuth2 button placeholders (GitHub, Google), password strength meter, remember me, redirect after login.' },
    ],
    tags: ['Zustand', 'Axios', 'React Hook Form', 'Zod', 'JWT', 'ProtectedRoute'],
    color: '#EF4444',
  },
  {
    phase: 'PHASE 3 — FEED & CONTENT',
    title: 'Home Feed, Snippet Cards & Infinite Scroll',
    duration: '2 Weeks',
    milestone: 'Home feed loads snippets and articles with infinite scroll. Filters work (by language, tags). SnippetCard and ArticleCard render with syntax highlighting. Like/bookmark buttons work with optimistic updates.',
    detail: 'Build the feed module with React Query infinite queries. Create SnippetCard and ArticleCard components. Implement filtering with URL search params. Add likes and bookmarks with optimistic updates.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'React Query setup (QueryClientProvider), feedApi functions, useInfiniteQuery for feed, FeedPage with card grid, SnippetCard component with syntax highlighting (Prism).' },
      { week: 'Week 2', task: 'ArticleCard, FeedFilters (language, tags, sort), URL search params sync, like/bookmark mutations with optimistic updates, loading skeletons, empty state component.' },
    ],
    tags: ['React Query', 'Infinite Scroll', 'Optimistic Updates', 'URL State', 'Prism.js'],
    color: '#3B82F6',
  },
  {
    phase: 'PHASE 4 — CODE EDITOR',
    title: 'Monaco Editor, Snippet Creation & Articles',
    duration: '2 Weeks',
    milestone: 'User can create a snippet with Monaco editor — select language, add tags, write code, and publish. Articles use a markdown editor with preview. Drafts auto-save to localStorage.',
    detail: 'Integrate Monaco Editor for code editing. Build the snippet creation form with language selector, tag input, and title. Add markdown editor for articles with live preview. Implement auto-save draft functionality.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'Monaco Editor integration (@monaco-editor/react), language selector, theme toggle (dark/light). CreateSnippetPage with title, tags (TagInput component), and publish flow.' },
      { week: 'Week 2', task: 'Markdown editor with toolbar (bold, code, link, image upload via MinIO API). Live preview toggle. Auto-save drafts to localStorage (useAutoSave custom hook). SnippetDetailPage and ArticleDetailPage.' },
    ],
    tags: ['Monaco Editor', 'Markdown', 'Auto-save', 'File Upload', 'CSS Modules'],
    color: '#22C55E',
  },
  {
    phase: 'PHASE 5 — PROFILE & SOCIAL',
    title: 'User Profiles, Comments & Follow System',
    duration: '2 Weeks',
    milestone: 'ProfilePage shows user info, activity timeline, and tabbed content (snippets/articles). CommentThread renders recursively. Follow/unfollow works. SettingsPage allows profile editing.',
    detail: 'Build the profile module with user cards, activity timeline, and tabbed content. Implement recursive comment threading. Add follow/unfollow with React Query cache updates. Build settings page.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'ProfilePage with header (avatar, bio, stats), Tabs component (snippets, articles, bookmarks), ActivityTimeline component, UserCard component.' },
      { week: 'Week 2', task: 'Recursive CommentThread component, comment creation form, follow/unfollow mutations, SettingsPage (profile edit form, notification preferences, theme selector), BookmarksPage.' },
    ],
    tags: ['Recursive Components', 'Tabs', 'React Query Mutations', 'Form Validation'],
    color: '#EC4899',
  },
  {
    phase: 'PHASE 6 — REAL-TIME FEATURES',
    title: 'Notifications & Live Collaboration',
    duration: '2.5 Weeks',
    milestone: 'NotificationBell shows live count. Toast pops up on new notification. Clicking opens notification panel. Collaboration: two users can join a session, see each other\'s cursors, and edit code in real-time.',
    detail: 'Integrate STOMP.js for WebSocket connections. Build the notification system with live updates. Build the collaboration module with multi-cursor editing, presence indicators, and session management.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'STOMP.js + SockJS setup, useWebSocket custom hook, notification subscription (/user/queue/notifications), NotificationBell with unread badge, NotificationList dropdown, Toast on new notification.' },
      { week: 'Week 2', task: 'SessionLobbyPage (create/join), CollabEditor with Monaco + WebSocket sync, LiveCursor component, PresenceIndicator (who\'s online), message types (CodeEdit, CursorMove, UserJoin).' },
      { week: 'Day 11-17', task: 'Reconnection handling with state replay, chat panel in session, session recording metadata, FullscreenLayout polish, mobile responsive adjustments.' },
    ],
    tags: ['STOMP.js', 'WebSocket', 'Multi-cursor', 'Presence', 'Real-Time'],
    color: '#A855F7',
  },
  {
    phase: 'PHASE 7 — REVIEWS & ANALYTICS',
    title: 'Code Review UI & Dashboard',
    duration: '2 Weeks',
    milestone: 'ReviewPage shows side-by-side diff with inline comments. Review status transitions (Submit, Approve, Reject) trigger backend state machine. DashboardPage shows personal stats with charts.',
    detail: 'Build the code review interface with diff viewer and inline comments. Build the analytics dashboard with stat cards, trend charts, and leaderboards.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'ReviewDiff component (unified/split view), inline comment positioning, review status buttons (Submit for Review, Approve, Request Changes), ReviewListPage with filters.' },
      { week: 'Week 2', task: 'DashboardPage with StatCards (views, likes, followers), TrendChart (simple SVG or recharts), LeaderboardRow component, time range selector (daily/weekly/monthly).' },
    ],
    tags: ['Diff Viewer', 'Inline Comments', 'Charts', 'Dashboard', 'State Machine UI'],
    color: '#06B6D4',
  },
  {
    phase: 'PHASE 8 — TESTING & POLISH',
    title: 'Tests, Performance & Production Build',
    duration: '2.5 Weeks',
    milestone: 'Vitest unit tests for all stores and hooks. RTL integration tests for key components. Playwright E2E for login → create → view flow. Lighthouse score >90. Production build deploys successfully.',
    detail: 'Write comprehensive tests at all three levels. Performance audit with Lighthouse. Bundle analysis with rollup-plugin-visualizer. PWA basics. Final build and deployment.',
    weeklyBreakdown: [
      { week: 'Week 1', task: 'Vitest setup, MSW server for test mocks, unit tests for authStore, editorStore, utility functions. RTL integration tests for SnippetCard, LoginForm, CommentThread.' },
      { week: 'Week 2', task: 'Playwright E2E setup, login flow test, create snippet flow test, notification test. Custom hook tests (useDebounce, useWebSocket, useAutoSave).' },
      { week: 'Day 11-17', task: 'Performance audit: React.memo where needed, bundle analysis, lazy loading verification, image optimization. Lighthouse audit (target >90). Production build + deploy.' },
    ],
    tags: ['Vitest', 'RTL', 'MSW', 'Playwright', 'Lighthouse', 'Bundle Analysis'],
    color: '#F97316',
  },
];

export default function FeRoadmap() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="FRONTEND ROADMAP" />
        <h1 className="section-title">Build the UI, phase by phase</h1>
        <p className="body-text mb-24">
          Start after the backend APIs are partially ready (at least User Service + Content Service).
          Each phase builds on the previous. The total timeline is <strong>~16 weeks</strong> at a sustainable pace.
        </p>

        <div className="grid-4 mb-32">
          <StatBox value="8" label="Phases" color="#61DAFB" />
          <StatBox value="~16" label="Weeks" color="var(--blue)" />
          <StatBox value="34+" label="Components" color="var(--green)" />
          <StatBox value="68+" label="Concepts" color="var(--purple)" />
        </div>
      </ScrollSection>

      {/* Pace Cards */}
      <ScrollSection>
        <SectionLabel text="REALISTIC TIMELINE" />
        <h2 className="section-title">How long does the frontend take?</h2>
        <p className="body-text mb-16">
          The frontend is slightly faster than the backend because there's no infrastructure setup (Docker, Kafka, etc.).
          But UI work is deceptively time-consuming — CSS polish, responsive design, and edge cases add up.
        </p>

        <div className="grid-3 mb-32">
          <Card semantic color="#22C55E">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏃</div>
              <div className="card-title" style={{ marginBottom: 4 }}>Full-Time</div>
              <div className="metadata-text mb-8">8 HRS/DAY</div>
              <div className="stat-number" style={{ color: '#22C55E', fontSize: 28 }}>6-8 Weeks</div>
            </div>
          </Card>
          <Card semantic color="#3B82F6">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
              <div className="card-title" style={{ marginBottom: 4 }}>Working Professional</div>
              <div className="metadata-text mb-8">3 HRS/DAY + WEEKENDS</div>
              <div className="stat-number" style={{ color: '#3B82F6', fontSize: 28 }}>16 Weeks</div>
            </div>
          </Card>
          <Card semantic color="#A855F7">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🐢</div>
              <div className="card-title" style={{ marginBottom: 4 }}>Weekends Only</div>
              <div className="metadata-text mb-8">SAT + SUN</div>
              <div className="stat-number" style={{ color: '#A855F7', fontSize: 28 }}>7-8 Months</div>
            </div>
          </Card>
        </div>
      </ScrollSection>

      {/* Timeline */}
      <ScrollSection>
        <SectionLabel text="BUILD ORDER" />
        <h2 className="section-title">From empty project to production-ready UI</h2>
        <p className="body-text mb-32">
          Each phase has a duration, weekly breakdown, and a <strong>milestone</strong> — a concrete
          deliverable that proves you're done before moving on.
        </p>

        <Timeline items={feRoadmapItems} />
      </ScrollSection>

      {/* Monthly Checkpoints */}
      <ScrollSection>
        <SectionLabel text="MONTHLY CHECKPOINTS" />
        <h2 className="section-title">Where should you be each month?</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { month: 'Month 1', title: 'Core App Running', desc: 'Project setup complete, auth module working (login + register + protected routes), feed loading with infinite scroll, snippet and article cards rendering.', topics: '~20 concepts', color: '#3B82F6', icon: '🏗️' },
            { month: 'Month 2', title: 'Content Creation Works', desc: 'Monaco editor integrated, users can create/edit snippets and articles. Profiles show activity. Comments thread recursively. Follow system works.', topics: '~40 concepts', color: '#22C55E', icon: '✏️' },
            { month: 'Month 3', title: 'Real-Time is Live', desc: 'Notifications arrive via WebSocket. Live collaboration works between 2 users. Code review diff viewer shows inline comments. Dashboard shows stats.', topics: '~55 concepts', color: '#A855F7', icon: '⚡' },
            { month: 'Month 4', title: 'Production Ready', desc: 'Full test suite running (unit + integration + E2E). Lighthouse >90. Bundle optimized. Responsive on mobile. Deployed and accessible.', topics: '68+ concepts mastered! 🎉', color: '#F97316', icon: '🚀' },
          ].map((checkpoint) => (
            <Card key={checkpoint.month} semantic color={checkpoint.color}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{checkpoint.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div className="metadata-text" style={{ color: checkpoint.color }}>{checkpoint.month}</div>
                      <div className="card-title" style={{ margin: '4px 0' }}>{checkpoint.title}</div>
                    </div>
                    <Badge text={checkpoint.topics} color={checkpoint.color} />
                  </div>
                  <p className="small-text" style={{ marginTop: 6 }}>{checkpoint.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Tips */}
      <ScrollSection>
        <SectionLabel text="FRONTEND TIPS" />
        <h2 className="section-title">Advice for the UI journey</h2>

        <div className="grid-2 mt-24">
          {[
            { icon: '🎨', title: 'CSS first, components second', desc: 'Get your CSS variables, reset, and core styles right before building components. A solid design system makes everything 10x faster.', color: '#264DE4' },
            { icon: '📱', title: 'Mobile from day one', desc: 'Don\'t build desktop-only and "add responsive later". Start with mobile-first CSS and test on real devices regularly.', color: '#22C55E' },
            { icon: '🧪', title: 'Test user behavior, not code', desc: 'Don\'t test "state updated to X". Test "user sees success message after clicking submit". React Testing Library enforces this mindset.', color: '#729B1B' },
            { icon: '🔌', title: 'Mock APIs with MSW early', desc: 'Don\'t wait for backend to be complete. Set up MSW mocks from day one so you can build the entire frontend independently.', color: '#FF6A33' },
          ].map((tip) => (
            <Card key={tip.title} semantic color={tip.color}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{tip.icon}</span>
                <div>
                  <div className="card-title" style={{ marginBottom: 6 }}>{tip.title}</div>
                  <p className="small-text">{tip.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
