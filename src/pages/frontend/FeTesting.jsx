import SectionLabel from '../../components/SectionLabel';
import ScrollSection from '../../components/ScrollSection';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import MermaidDiagram from '../../components/MermaidDiagram';
import CodeBlock from '../../components/CodeBlock';

export default function FeTesting() {
  return (
    <>
      <ScrollSection>
        <SectionLabel text="TESTING STRATEGY" />
        <h1 className="section-title">The testing pyramid — what to test and how</h1>
        <p className="body-text mb-24">
          Frontend testing is not optional. Untested UIs break silently — buttons stop working,
          forms lose validation, and API changes cause blank screens. The testing pyramid guides
          what to invest in.
        </p>
      </ScrollSection>

      {/* Testing Pyramid */}
      <ScrollSection>
        <SectionLabel text="TESTING PYRAMID" />
        <h2 className="section-title">More unit tests, fewer E2E tests</h2>

        <MermaidDiagram
          chart={`graph TD
    E2E["🎭 E2E Tests (Playwright)"]
    INT["🔗 Integration Tests (RTL + MSW)"]
    UNIT["⚡ Unit Tests (Vitest)"]

    E2E --> INT
    INT --> UNIT

    style E2E fill:#EF444420,stroke:#EF4444,color:#fff
    style INT fill:#F59E0B20,stroke:#F59E0B,color:#fff
    style UNIT fill:#22C55E20,stroke:#22C55E,color:#fff`}
          label="TESTING PYRAMID"
        />

        <div className="grid-3 mt-24">
          <Card semantic color="#22C55E">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
              <div className="card-title">Unit Tests</div>
              <div className="metadata-text mb-8" style={{ color: '#22C55E' }}>~70% OF TESTS</div>
              <p className="small-text">Pure functions, hooks, stores, utils. Fast, isolated, run in milliseconds. No DOM needed.</p>
            </div>
          </Card>
          <Card semantic color="#F59E0B">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
              <div className="card-title">Integration Tests</div>
              <div className="metadata-text mb-8" style={{ color: '#F59E0B' }}>~25% OF TESTS</div>
              <p className="small-text">Components rendered with RTL, API calls mocked with MSW. Tests real user interactions.</p>
            </div>
          </Card>
          <Card semantic color="#EF4444">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎭</div>
              <div className="card-title">E2E Tests</div>
              <div className="metadata-text mb-8" style={{ color: '#EF4444' }}>~5% OF TESTS</div>
              <p className="small-text">Full user flows in a real browser. Login → create snippet → verify feed. Slow but catches integration bugs.</p>
            </div>
          </Card>
        </div>
      </ScrollSection>

      {/* Tools */}
      <ScrollSection>
        <SectionLabel text="TESTING TOOLCHAIN" />
        <h2 className="section-title">Four tools that cover everything</h2>

        <div className="grid-2 mt-24">
          {[
            { name: 'Vitest', icon: '🧪', color: '#729B1B', desc: 'Vite-native test runner. Same config, same transforms, Jest-compatible API. Tests hooks, stores, utils, and pure functions.', tests: ['Zustand store actions', 'Custom hook logic', 'Utility functions', 'Type guard validation'] },
            { name: 'React Testing Library', icon: '🐙', color: '#E33332', desc: 'Tests components the way users use them. No testing implementation details — test what the user sees and does.', tests: ['Button click fires callback', 'Form displays error on invalid input', 'Loading skeleton appears', 'Filtering updates list'] },
            { name: 'MSW (Mock Service Worker)', icon: '🔧', color: '#FF6A33', desc: 'Intercepts HTTP requests at the network level. Same mocks work in dev mode, Vitest tests, and Storybook.', tests: ['Mock GET /api/snippets', 'Mock 401 for auth tests', 'Mock 500 for error handling', 'Mock WebSocket messages'] },
            { name: 'Playwright', icon: '🎭', color: '#2EAD33', desc: 'Cross-browser E2E testing. Auto-wait eliminates flaky tests. Trace viewer for debugging. API mocking built in.', tests: ['Login → Feed → Create snippet flow', 'OAuth redirect handling', 'WebSocket reconnection test', 'Mobile responsive audit'] },
          ].map((tool) => (
            <Card key={tool.name} semantic color={tool.color}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{tool.icon}</span>
                <div>
                  <div className="card-title">{tool.name}</div>
                </div>
              </div>
              <p className="small-text" style={{ marginBottom: 12 }}>{tool.desc}</p>
              <div className="metadata-text mb-8" style={{ color: tool.color }}>WHAT TO TEST</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {tool.tests.map(t => (
                  <div key={t} className="small-text" style={{ paddingLeft: 8, borderLeft: `2px solid ${tool.color}30` }}>{t}</div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>

      {/* Code Examples */}
      <ScrollSection>
        <SectionLabel text="CODE EXAMPLES" />
        <h2 className="section-title">How each test type looks in practice</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div className="metadata-text mb-8" style={{ color: '#729B1B' }}>⚡ UNIT TEST — ZUSTAND STORE</div>
            <CodeBlock language="typescript" code={`// __tests__/authStore.test.ts
import { useAuthStore } from '@/features/auth/stores/authStore';

describe('authStore', () => {
  beforeEach(() => useAuthStore.getState().logout()); // Reset

  it('should login and set user + token', () => {
    const { login } = useAuthStore.getState();
    login({ id: '1', name: 'Pravin' }, 'jwt-token-123');
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.name).toBe('Pravin');
    expect(state.token).toBe('jwt-token-123');
  });

  it('should clear state on logout', () => {
    useAuthStore.getState().login({ id: '1', name: 'Pravin' }, 'token');
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});`} />
          </div>

          <div>
            <div className="metadata-text mb-8" style={{ color: '#E33332' }}>🔗 INTEGRATION TEST — COMPONENT + MSW</div>
            <CodeBlock language="typescript" code={`// __tests__/SnippetCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import SnippetCard from '@/features/feed/components/SnippetCard';

// MSW mock for the like endpoint
server.use(
  http.post('/api/v1/snippets/:id/like', () => HttpResponse.json({ liked: true, count: 42 }))
);

it('should show like count and toggle on click', async () => {
  render(<SnippetCard snippet={mockSnippet} />);
  
  const likeBtn = screen.getByRole('button', { name: /like/i });
  expect(screen.getByText('41')).toBeInTheDocument();
  
  fireEvent.click(likeBtn);
  // Optimistic update — count changes immediately
  expect(await screen.findByText('42')).toBeInTheDocument();
});`} />
          </div>

          <div>
            <div className="metadata-text mb-8" style={{ color: '#2EAD33' }}>🎭 E2E TEST — FULL USER FLOW</div>
            <CodeBlock language="typescript" code={`// e2e/create-snippet.spec.ts
import { test, expect } from '@playwright/test';

test('user can create and view a snippet', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'pravin@brewhub.com');
  await page.fill('[name="password"]', 'SecurePass123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/');

  // Create snippet
  await page.click('text=New Snippet');
  await page.fill('[data-testid="snippet-title"]', 'Binary Search in Java');
  // Monaco editor interaction
  await page.click('.monaco-editor');
  await page.keyboard.type('public int binarySearch(int[] arr, int target) {');
  await page.click('button:has-text("Publish")');

  // Verify on feed
  await expect(page.locator('text=Binary Search in Java')).toBeVisible();
});`} />
          </div>
        </div>
      </ScrollSection>

      {/* What to test checklist */}
      <ScrollSection>
        <SectionLabel text="WHAT TO TEST" />
        <h2 className="section-title">Testing checklist by component type</h2>

        <div className="grid-2 mt-24">
          {[
            { type: 'Zustand Stores', color: '#F59E0B', checks: ['Actions update state correctly', 'Selectors return derived values', 'Persist middleware saves to localStorage', 'Reset/logout clears all state'] },
            { type: 'Custom Hooks', color: '#A855F7', checks: ['Return values are correct', 'Side effects trigger properly', 'Cleanup runs on unmount', 'Error states are handled'] },
            { type: 'UI Components', color: '#3B82F6', checks: ['Renders with required props', 'Handles user interactions (click, type)', 'Shows loading/error states', 'Accessibility: roles, labels, keyboard'] },
            { type: 'Pages', color: '#22C55E', checks: ['Renders with mocked API data', 'Navigation works correctly', 'Protected routes redirect', 'Form submission + validation'] },
            { type: 'API Layer', color: '#EF4444', checks: ['Interceptors inject JWT', '401 triggers token refresh', 'Error responses are normalized', 'Request cancellation works'] },
            { type: 'Forms', color: '#EC4899', checks: ['Validation rules work (Zod)', 'Error messages display', 'Submit sends correct payload', 'Disabled state during submission'] },
          ].map((item) => (
            <Card key={item.type} semantic color={item.color}>
              <div className="card-title" style={{ marginBottom: 10 }}>{item.type}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {item.checks.map(c => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: item.color }}>✓</span>
                    <span className="small-text">{c}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollSection>
    </>
  );
}
