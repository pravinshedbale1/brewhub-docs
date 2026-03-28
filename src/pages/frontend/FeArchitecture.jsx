import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import MermaidDiagram from '../../components/MermaidDiagram';
import CodeBlock from '../../components/CodeBlock';

export default function FeArchitecture() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="FRONTEND ARCHITECTURE" />
        <h1 className="section-title">Feature-based architecture for scalability</h1>
        <p className="body-text mb-24">
          The frontend uses a <strong>feature-based folder structure</strong> — each module owns its
          components, hooks, API functions, and styles. This mirrors the backend microservices approach
          and makes the codebase navigable even at 100+ components.
        </p>
      </ScrollSection>

      {/* Folder Structure */}
      <ScrollSection>
        <SectionLabel text="PROJECT STRUCTURE" />
        <h2 className="section-title">Every folder has a purpose</h2>
        <p className="body-text mb-24">
          No flat component dumps. Features are isolated, shared utilities are centralized,
          and the API layer is decoupled from the UI.
        </p>

        <CodeBlock language="plaintext" code={`src/
├── app/                      # App-level setup
│   ├── App.tsx               # Root component + providers
│   ├── Router.tsx            # Route definitions
│   └── Providers.tsx         # QueryClient, Theme, Auth providers
│
├── features/                 # Feature modules (the core)
│   ├── auth/
│   │   ├── components/       # LoginForm, RegisterForm, OAuthButtons
│   │   ├── hooks/            # useAuth, useTokenRefresh
│   │   ├── api/              # authApi.ts (login, register, refresh)
│   │   ├── stores/           # authStore.ts (Zustand)
│   │   ├── pages/            # LoginPage, RegisterPage
│   │   ├── types/            # AuthUser, LoginRequest, TokenPair
│   │   └── auth.module.css
│   │
│   ├── feed/
│   │   ├── components/       # SnippetCard, ArticleCard, FeedFilters
│   │   ├── hooks/            # useInfiniteFeed, useTrending
│   │   ├── api/              # feedApi.ts
│   │   └── pages/            # FeedPage, TrendingPage
│   │
│   ├── editor/
│   │   ├── components/       # CodeEditor, MarkdownEditor, Preview
│   │   ├── hooks/            # useAutoSave, useLanguageDetect
│   │   └── pages/            # CreateSnippet, EditSnippet, CreateArticle
│   │
│   ├── collaboration/
│   │   ├── components/       # CollabEditor, PresenceBar, LiveCursor
│   │   ├── hooks/            # useWebSocket, useCursorSync
│   │   └── pages/            # SessionPage, SessionLobby
│   │
│   ├── notifications/
│   │   ├── components/       # NotificationBell, NotificationList
│   │   ├── hooks/            # useNotifications, useWebSocketNotif
│   │   └── stores/           # notificationStore.ts
│   │
│   ├── profile/
│   │   ├── components/       # ProfileHeader, ActivityTimeline
│   │   └── pages/            # ProfilePage, SettingsPage, BookmarksPage
│   │
│   ├── reviews/
│   │   ├── components/       # ReviewDiff, InlineComment
│   │   └── pages/            # ReviewPage, ReviewListPage
│   │
│   └── analytics/
│       ├── components/       # StatCard, Leaderboard, TrendChart
│       └── pages/            # DashboardPage
│
├── shared/                   # Shared across all features
│   ├── components/           # Button, Modal, Input, Card, Skeleton...
│   ├── hooks/                # useDebounce, useMediaQuery, useClickOutside
│   ├── utils/                # formatDate, truncate, classNames
│   └── styles/               # variables.css, reset.css, mixins.css
│
├── api/                      # API layer (centralized)
│   ├── client.ts             # Axios instance with interceptors
│   ├── endpoints.ts          # API URL constants
│   └── types.ts              # Shared API types (PageResponse, ErrorResponse)
│
└── assets/                   # Static assets
    ├── icons/
    └── images/`} />
      </ScrollSection>

      {/* Component Tree */}
      <ScrollSection>
        <SectionLabel text="COMPONENT TREE" />
        <h2 className="section-title">From App root to leaf components</h2>
        <p className="body-text mb-24">
          The component tree follows React Router's nested layout pattern. Each route renders within
          a layout that provides the sidebar, topbar, and content area.
        </p>

        <MermaidDiagram
          chart={`graph TD
    APP["App.tsx"]
    PROVIDERS["Providers (Query, Theme, Auth)"]
    ROUTER["Router"]
    AUTH_LAYOUT["AuthLayout (no sidebar)"]
    MAIN_LAYOUT["MainLayout (with sidebar)"]
    LOGIN["LoginPage"]
    REGISTER["RegisterPage"]
    FEED["FeedPage"]
    SNIPPET["SnippetDetailPage"]
    EDITOR_PAGE["CreateSnippetPage"]
    PROFILE_PAGE["ProfilePage"]
    COLLAB_PAGE["SessionPage"]
    REVIEW_PAGE["ReviewPage"]
    SIDEBAR["Sidebar"]
    TOPBAR["TopBar + SearchInput"]
    CONTENT["ContentArea (Outlet)"]

    APP --> PROVIDERS
    PROVIDERS --> ROUTER
    ROUTER --> AUTH_LAYOUT
    ROUTER --> MAIN_LAYOUT
    AUTH_LAYOUT --> LOGIN
    AUTH_LAYOUT --> REGISTER
    MAIN_LAYOUT --> SIDEBAR
    MAIN_LAYOUT --> TOPBAR
    MAIN_LAYOUT --> CONTENT
    CONTENT --> FEED
    CONTENT --> SNIPPET
    CONTENT --> EDITOR_PAGE
    CONTENT --> PROFILE_PAGE
    CONTENT --> COLLAB_PAGE
    CONTENT --> REVIEW_PAGE

    style APP fill:#61DAFB20,stroke:#61DAFB,color:#fff
    style PROVIDERS fill:#A855F720,stroke:#A855F7,color:#fff
    style ROUTER fill:#F4425020,stroke:#F44250,color:#fff
    style AUTH_LAYOUT fill:#EF444420,stroke:#EF4444,color:#fff
    style MAIN_LAYOUT fill:#3B82F620,stroke:#3B82F6,color:#fff
    style SIDEBAR fill:#22C55E20,stroke:#22C55E,color:#fff
    style TOPBAR fill:#22C55E20,stroke:#22C55E,color:#fff
    style CONTENT fill:#F59E0B20,stroke:#F59E0B,color:#fff`}
          label="REACT COMPONENT TREE"
        />
      </ScrollSection>

      {/* Data Flow */}
      <ScrollSection>
        <SectionLabel text="DATA FLOW" />
        <h2 className="section-title">How data moves through the app</h2>
        <p className="body-text mb-24">
          The frontend separates <strong>server state</strong> (React Query) from <strong>client state</strong> (Zustand).
          This prevents the classic mistake of caching API data in Redux and manually managing staleness.
        </p>

        <MermaidDiagram
          chart={`sequenceDiagram
    participant UI as React Component
    participant RQ as React Query Cache
    participant API as Axios Client
    participant BE as Spring Boot API
    participant ZS as Zustand Store
    participant WS as WebSocket

    UI->>RQ: useQuery('snippets')
    RQ->>API: GET /api/v1/snippets
    API->>BE: HTTP Request (JWT in header)
    BE-->>API: 200 OK + JSON
    API-->>RQ: Response Data
    RQ-->>UI: Cached data → render

    Note over UI,RQ: Background refetch on window focus

    UI->>ZS: dispatch(setTheme('dark'))
    ZS-->>UI: Re-render with new theme

    WS->>UI: New notification event
    UI->>RQ: invalidateQueries('notifications')
    RQ->>API: GET /api/v1/notifications
    API-->>RQ: Fresh notifications
    RQ-->>UI: Updated notification list`}
          label="DATA FLOW — SERVER STATE VS CLIENT STATE"
        />

        <div className="grid-2 mt-24">
          <Card semantic color="#FF4154">
            <div className="card-title" style={{ marginBottom: 8 }}>🔄 Server State (React Query)</div>
            <p className="small-text">Data that lives on the server: snippets, users, notifications, search results. React Query handles caching, background refetching, deduplication, and stale-while-revalidate.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {['useQuery', 'useMutation', 'Cached', 'Auto-refetch', 'Optimistic Updates'].map(t => (
                <Badge key={t} text={t} color="#FF4154" />
              ))}
            </div>
          </Card>
          <Card semantic color="#F59E0B">
            <div className="card-title" style={{ marginBottom: 8 }}>🐻 Client State (Zustand)</div>
            <p className="small-text">Data that only exists in the browser: auth state, theme preference, sidebar collapsed, modal open/close, editor language selection. Zustand stores are tiny and direct.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {['No providers', 'Persist middleware', 'Selectors', 'Devtools', 'Slices'].map(t => (
                <Badge key={t} text={t} color="#F59E0B" />
              ))}
            </div>
          </Card>
        </div>
      </ScrollSection>

      {/* Key Architectural Decisions */}
      <ScrollSection>
        <SectionLabel text="ARCHITECTURE DECISIONS" />
        <h2 className="section-title">Why we chose what we chose</h2>

        <div className="grid-2 mt-24">
          {[
            { icon: '📁', title: 'Feature-based folders, not type-based', desc: 'Grouping by feature (/auth, /feed) instead of by type (/components, /hooks) keeps related code together. When you delete a feature, you delete one folder — no hunting across 10 directories.', color: '#3B82F6' },
            { icon: '🔀', title: 'React Query over Redux for server state', desc: 'Redux was designed for client state. Using it for API data leads to stale caches, manual invalidation, and thousands of lines of boilerplate. React Query handles server state natively.', color: '#FF4154' },
            { icon: '🎨', title: 'CSS Modules over Tailwind', desc: 'CSS Modules force you to learn real CSS — specificity, cascade, grid, animations. The knowledge transfers to any framework. Tailwind abstracts this away and becomes a crutch.', color: '#264DE4' },
            { icon: '📝', title: 'TypeScript strict mode from day one', desc: 'Running with strict: true catches bugs before they reach the browser. No any escape hatches. Every prop, every API response, every store action is typed.', color: '#3178C6' },
            { icon: '🔌', title: 'Centralized API layer', desc: 'All API calls go through a single Axios instance. JWT injection, token refresh, error normalization, and request logging happen in one place — interceptors.', color: '#5A29E4' },
            { icon: '🧪', title: 'MSW for API mocking', desc: 'Mock Service Worker intercepts requests at the network level. Same mocks work in dev mode, Vitest tests, and Storybook. No mock function spaghetti.', color: '#FF6A33' },
          ].map((item) => (
            <Card key={item.title} semantic color={item.color}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div className="card-title" style={{ marginBottom: 6 }}>{item.title}</div>
                  <p className="small-text">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
