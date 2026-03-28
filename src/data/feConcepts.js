export const feConcepts = [
  // React Core
  { name: 'Functional Components', category: 'React Core', service: 'All', difficulty: 'fundamental' },
  { name: 'useState & useReducer', category: 'React Core', service: 'All', difficulty: 'fundamental' },
  { name: 'useEffect & Cleanup', category: 'React Core', service: 'All', difficulty: 'fundamental' },
  { name: 'useRef & DOM Access', category: 'React Core', service: 'Editor', difficulty: 'fundamental' },
  { name: 'useMemo & useCallback', category: 'React Core', service: 'Feed', difficulty: 'intermediate' },
  { name: 'Custom Hooks', category: 'React Core', service: 'All', difficulty: 'intermediate' },
  { name: 'Context API & Providers', category: 'React Core', service: 'Auth, Theme', difficulty: 'intermediate' },
  { name: 'React.lazy & Suspense', category: 'React Core', service: 'Router', difficulty: 'intermediate' },
  { name: 'Error Boundaries', category: 'React Core', service: 'Core', difficulty: 'intermediate' },
  { name: 'Compound Component Pattern', category: 'React Core', service: 'Components', difficulty: 'advanced' },
  { name: 'Render Props Pattern', category: 'React Core', service: 'Components', difficulty: 'advanced' },
  { name: 'forwardRef & useImperativeHandle', category: 'React Core', service: 'Editor', difficulty: 'advanced' },

  // TypeScript
  { name: 'Type Annotations & Interfaces', category: 'TypeScript', service: 'All', difficulty: 'fundamental' },
  { name: 'Generic Types', category: 'TypeScript', service: 'API Layer', difficulty: 'intermediate' },
  { name: 'Union & Intersection Types', category: 'TypeScript', service: 'Components', difficulty: 'intermediate' },
  { name: 'Type Guards & Narrowing', category: 'TypeScript', service: 'API Layer', difficulty: 'intermediate' },
  { name: 'Mapped & Conditional Types', category: 'TypeScript', service: 'Forms', difficulty: 'advanced' },
  { name: 'Discriminated Unions', category: 'TypeScript', service: 'State', difficulty: 'advanced' },
  { name: 'Type-safe API Contracts', category: 'TypeScript', service: 'API Layer', difficulty: 'advanced' },
  { name: 'Zod Schema Inference', category: 'TypeScript', service: 'Forms', difficulty: 'advanced' },

  // State Management
  { name: 'Zustand Store Creation', category: 'State Management', service: 'Auth, UI', difficulty: 'fundamental' },
  { name: 'Zustand Selectors & Derived State', category: 'State Management', service: 'Feed', difficulty: 'intermediate' },
  { name: 'Zustand Middleware (persist, devtools)', category: 'State Management', service: 'Auth', difficulty: 'intermediate' },
  { name: 'React Query useQuery', category: 'State Management', service: 'All', difficulty: 'fundamental' },
  { name: 'React Query useMutation', category: 'State Management', service: 'All', difficulty: 'intermediate' },
  { name: 'Optimistic Updates', category: 'State Management', service: 'Feed, Reviews', difficulty: 'advanced' },
  { name: 'Infinite Queries & Pagination', category: 'State Management', service: 'Feed', difficulty: 'intermediate' },
  { name: 'Query Invalidation & Prefetching', category: 'State Management', service: 'All', difficulty: 'advanced' },

  //  Routing & Navigation
  { name: 'Declarative Routes & Outlets', category: 'Routing', service: 'Core', difficulty: 'fundamental' },
  { name: 'Nested Layouts', category: 'Routing', service: 'Core', difficulty: 'intermediate' },
  { name: 'Protected Routes (Auth Guard)', category: 'Routing', service: 'Auth', difficulty: 'intermediate' },
  { name: 'Lazy Loading & Code Splitting', category: 'Routing', service: 'Core', difficulty: 'intermediate' },
  { name: 'Route-based Data Loading', category: 'Routing', service: 'Core', difficulty: 'advanced' },
  { name: 'Search Params & URL State', category: 'Routing', service: 'Feed, Search', difficulty: 'intermediate' },

  // Styling & CSS
  { name: 'CSS Modules Scoping', category: 'CSS', service: 'All', difficulty: 'fundamental' },
  { name: 'CSS Custom Properties (Variables)', category: 'CSS', service: 'Theme', difficulty: 'fundamental' },
  { name: 'Flexbox & Grid Layouts', category: 'CSS', service: 'All', difficulty: 'fundamental' },
  { name: 'Responsive Design (Media Queries)', category: 'CSS', service: 'All', difficulty: 'intermediate' },
  { name: 'CSS Animations & Transitions', category: 'CSS', service: 'Components', difficulty: 'intermediate' },
  { name: 'Dark/Light Theme Switching', category: 'CSS', service: 'Theme', difficulty: 'intermediate' },
  { name: 'CSS :has() & Container Queries', category: 'CSS', service: 'Components', difficulty: 'advanced' },

  // API & Networking
  { name: 'Axios Instance & Interceptors', category: 'API', service: 'API Layer', difficulty: 'intermediate' },
  { name: 'JWT Token Injection', category: 'API', service: 'Auth', difficulty: 'intermediate' },
  { name: 'Automatic Token Refresh', category: 'API', service: 'Auth', difficulty: 'advanced' },
  { name: 'Request Cancellation (AbortController)', category: 'API', service: 'Search', difficulty: 'intermediate' },
  { name: 'Error Response Handling', category: 'API', service: 'All', difficulty: 'intermediate' },
  { name: 'File Upload with Progress', category: 'API', service: 'Editor', difficulty: 'intermediate' },
  { name: 'WebSocket Connection Management', category: 'API', service: 'Collab, Notifications', difficulty: 'advanced' },
  { name: 'STOMP Topic Subscriptions', category: 'API', service: 'Collab, Notifications', difficulty: 'advanced' },

  // Forms & Validation
  { name: 'React Hook Form useForm', category: 'Forms', service: 'Auth, Editor', difficulty: 'fundamental' },
  { name: 'Zod Schema Validation', category: 'Forms', service: 'Auth, Editor', difficulty: 'intermediate' },
  { name: 'Controlled vs Uncontrolled', category: 'Forms', service: 'All', difficulty: 'fundamental' },
  { name: 'Dynamic Form Fields', category: 'Forms', service: 'Editor', difficulty: 'intermediate' },
  { name: 'Form Submission & Error Handling', category: 'Forms', service: 'All', difficulty: 'intermediate' },

  // Testing
  { name: 'Vitest Unit Testing', category: 'Testing', service: 'All', difficulty: 'fundamental' },
  { name: 'React Testing Library', category: 'Testing', service: 'Components', difficulty: 'intermediate' },
  { name: 'MSW API Mocking', category: 'Testing', service: 'API Layer', difficulty: 'intermediate' },
  { name: 'Custom Hook Testing', category: 'Testing', service: 'Hooks', difficulty: 'intermediate' },
  { name: 'Playwright E2E Tests', category: 'Testing', service: 'All', difficulty: 'advanced' },
  { name: 'Visual Regression Testing', category: 'Testing', service: 'Components', difficulty: 'advanced' },

  // Performance
  { name: 'React.memo & Re-render Prevention', category: 'Performance', service: 'Feed', difficulty: 'intermediate' },
  { name: 'Virtualized Lists (react-window)', category: 'Performance', service: 'Feed', difficulty: 'advanced' },
  { name: 'Image Lazy Loading', category: 'Performance', service: 'Feed', difficulty: 'fundamental' },
  { name: 'Bundle Analysis & Tree Shaking', category: 'Performance', service: 'Build', difficulty: 'intermediate' },
  { name: 'Web Workers for Heavy Computation', category: 'Performance', service: 'Editor', difficulty: 'advanced' },
  { name: 'Service Worker & PWA Basics', category: 'Performance', service: 'Core', difficulty: 'advanced' },

  // Accessibility
  { name: 'Semantic HTML & ARIA', category: 'Accessibility', service: 'All', difficulty: 'fundamental' },
  { name: 'Focus Management', category: 'Accessibility', service: 'Modal, Editor', difficulty: 'intermediate' },
  { name: 'Keyboard Navigation', category: 'Accessibility', service: 'Components', difficulty: 'intermediate' },
  { name: 'Screen Reader Testing', category: 'Accessibility', service: 'All', difficulty: 'intermediate' },
];
