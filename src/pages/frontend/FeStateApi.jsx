import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import MermaidDiagram from '../../components/MermaidDiagram';
import CodeBlock from '../../components/CodeBlock';

export default function FeStateApi() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="STATE & API LAYER" />
        <h1 className="section-title">How data flows from backend to UI</h1>
        <p className="body-text mb-24">
          The golden rule: <strong>server state in React Query, client state in Zustand</strong>.
          Never cache API responses in Zustand. Never fetch data with Redux. Keep them separate.
        </p>
      </ScrollSection>

      {/* Zustand Stores */}
      <ScrollSection>
        <SectionLabel text="ZUSTAND STORES" />
        <h2 className="section-title">Client-side state — what lives in the browser</h2>
        <p className="body-text mb-24">
          Zustand stores are tiny, focused, and independent. No single god-store — each store
          owns one domain. Stores can use middleware for persistence and devtools.
        </p>

        <div className="grid-2 mt-16">
          {[
            { name: 'authStore', desc: 'JWT tokens, authenticated user, login/logout actions. Persists to localStorage.', fields: ['user', 'token', 'refreshToken', 'isAuthenticated'], middleware: ['persist', 'devtools'], color: '#EF4444' },
            { name: 'themeStore', desc: 'Dark/light mode toggle. Persists preference to localStorage.', fields: ['mode', 'toggleTheme', 'setMode'], middleware: ['persist'], color: '#A855F7' },
            { name: 'uiStore', desc: 'Sidebar collapsed state, active modal, toast queue.', fields: ['sidebarOpen', 'activeModal', 'toasts'], middleware: ['devtools'], color: '#3B82F6' },
            { name: 'editorStore', desc: 'Current editor language, theme, font size. Draft auto-save state.', fields: ['language', 'theme', 'fontSize', 'draft'], middleware: ['persist'], color: '#22C55E' },
          ].map((store) => (
            <Card key={store.name} semantic color={store.color}>
              <div className="card-title" style={{ marginBottom: 4 }}>{store.name}</div>
              <p className="small-text" style={{ marginBottom: 10 }}>{store.desc}</p>
              <div className="metadata-text mb-8" style={{ color: store.color }}>STATE SHAPE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {store.fields.map(f => <Badge key={f} text={f} color={store.color} />)}
              </div>
              <div className="metadata-text" style={{ color: 'var(--text-dim)' }}>
                MIDDLEWARE: {store.middleware.join(' + ')}
              </div>
            </Card>
          ))}
        </div>

        <CodeBlock language="typescript" code={`// stores/authStore.ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user, token) => set({ user, token, isAuthenticated: true }),
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
      }),
      { name: 'brewhub-auth' } // localStorage key
    )
  )
);`} />
      </ScrollSection>

      {/* React Query */}
      <ScrollSection>
        <SectionLabel text="REACT QUERY" />
        <h2 className="section-title">Server state management — the heavy lifting</h2>
        <p className="body-text mb-24">
          React Query handles everything about server data: fetching, caching, background refetching,
          pagination, optimistic updates, and error retries. It replaces 80% of what people use Redux for.
        </p>

        <MermaidDiagram
          chart={`stateDiagram-v2
    [*] --> Idle
    Idle --> Fetching: useQuery triggered
    Fetching --> Fresh: Success (data cached)
    Fetching --> Error: Request failed
    Fresh --> Stale: staleTime expires
    Stale --> Fetching: Window focus / Interval / Invalidation
    Error --> Fetching: Retry (3 attempts)
    Fresh --> [*]: Component unmounts (cache stays)

    note right of Fresh: Data served instantly from cache
    note right of Stale: Background refetch — no loading spinner`}
          label="REACT QUERY — CACHE LIFECYCLE"
        />

        <div className="grid-2 mt-24">
          <Card semantic color="#FF4154">
            <div className="card-title" style={{ marginBottom: 8 }}>📖 useQuery — Read Operations</div>
            <p className="small-text">For all GET requests. Automatic caching, deduplication (multiple components requesting same data = 1 request), and background refetch on window focus.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
              {['Feed list', 'Snippet detail', 'User profile', 'Notifications', 'Search results'].map(t => <Badge key={t} text={t} color="#FF4154" />)}
            </div>
          </Card>
          <Card semantic color="#22C55E">
            <div className="card-title" style={{ marginBottom: 8 }}>✏️ useMutation — Write Operations</div>
            <p className="small-text">For POST/PUT/DELETE. Handles loading state, error handling, and cache invalidation. Supports optimistic updates — show the result before the server confirms.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
              {['Create snippet', 'Like/Unlike', 'Post comment', 'Delete post', 'Follow user'].map(t => <Badge key={t} text={t} color="#22C55E" />)}
            </div>
          </Card>
        </div>

        <CodeBlock language="typescript" code={`// hooks/useSnippets.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { snippetApi } from '../api/snippetApi';

// READ — Get feed with infinite scroll
export const useSnippetFeed = (filters: FeedFilters) => {
  return useInfiniteQuery({
    queryKey: ['snippets', 'feed', filters],
    queryFn: ({ pageParam = 0 }) => snippetApi.getFeed({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.page + 1 : undefined,
    staleTime: 30_000, // 30 seconds before refetch
  });
};

// WRITE — Like a snippet with optimistic update
export const useLikeSnippet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: snippetApi.toggleLike,
    onMutate: async (snippetId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['snippets'] });
      // Optimistically update the like count
      queryClient.setQueryData(['snippet', snippetId], (old: Snippet) => ({
        ...old, liked: !old.liked, likeCount: old.liked ? old.likeCount - 1 : old.likeCount + 1,
      }));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['snippets'] }),
  });
};`} />
      </ScrollSection>

      {/* Axios Layer */}
      <ScrollSection>
        <SectionLabel text="AXIOS API LAYER" />
        <h2 className="section-title">Centralized HTTP client with interceptors</h2>
        <p className="body-text mb-24">
          Every API call goes through a single Axios instance. Interceptors handle JWT injection,
          token refresh on 401, error normalization, and request/response logging.
        </p>

        <MermaidDiagram
          chart={`sequenceDiagram
    participant COMP as React Component
    participant RQ as React Query
    participant AXIOS as Axios Instance
    participant REQ_INT as Request Interceptor
    participant API as Spring Boot API
    participant RES_INT as Response Interceptor
    participant AUTH as authStore

    COMP->>RQ: useQuery('profile')
    RQ->>AXIOS: GET /api/v1/users/me
    AXIOS->>REQ_INT: Before request
    REQ_INT->>AUTH: Get JWT token
    AUTH-->>REQ_INT: Bearer eyJhbG...
    REQ_INT-->>AXIOS: Add Authorization header

    AXIOS->>API: GET /api/v1/users/me
    alt 200 Success
        API-->>AXIOS: 200 + User data
        AXIOS->>RES_INT: Transform response
        RES_INT-->>RQ: Normalized data
        RQ-->>COMP: user object
    else 401 Expired Token
        API-->>AXIOS: 401 Unauthorized
        AXIOS->>RES_INT: Handle 401
        RES_INT->>API: POST /auth/refresh (refreshToken)
        API-->>RES_INT: New access token
        RES_INT->>AUTH: Update stored token
        RES_INT->>AXIOS: Retry original request
        AXIOS->>API: GET /api/v1/users/me (new token)
        API-->>RQ: 200 + User data
    end`}
          label="AXIOS INTERCEPTOR FLOW — JWT INJECTION & AUTO-REFRESH"
        />
      </ScrollSection>

      {/* WebSocket */}
      <ScrollSection>
        <SectionLabel text="WEBSOCKET INTEGRATION" />
        <h2 className="section-title">Real-time data with STOMP over WebSocket</h2>
        <p className="body-text mb-24">
          Two features need real-time: <strong>Notifications</strong> (push alerts) and
          <strong> Collaboration</strong> (multi-user editing). Both connect to Spring Boot's
          STOMP WebSocket endpoint.
        </p>

        <div className="grid-2 mt-16">
          <Card semantic color="#F59E0B">
            <div className="card-title" style={{ marginBottom: 8 }}>🔔 Notification WebSocket</div>
            <p className="small-text" style={{ marginBottom: 10 }}>
              Subscribes to <code>/user/queue/notifications</code>. On receiving a message,
              invalidates the React Query notification cache and shows a toast. Reconnects automatically on disconnect.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {['STOMP subscribe', 'Auto-reconnect', 'Toast trigger', 'Cache invalidation'].map(t => <Badge key={t} text={t} color="#F59E0B" />)}
            </div>
          </Card>
          <Card semantic color="#A855F7">
            <div className="card-title" style={{ marginBottom: 8 }}>👥 Collaboration WebSocket</div>
            <p className="small-text" style={{ marginBottom: 10 }}>
              Subscribes to <code>/topic/session/{'{id}'}</code>. Sends cursor movements and code edits.
              Uses sealed message types: <code>CodeEdit | CursorMove | UserJoin | UserLeave</code>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {['Bidirectional', 'Presence tracking', 'Cursor sync', 'Reconnect + replay'].map(t => <Badge key={t} text={t} color="#A855F7" />)}
            </div>
          </Card>
        </div>
      </ScrollSection>
    </>
  );
}
