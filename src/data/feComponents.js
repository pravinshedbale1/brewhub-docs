export const feComponents = [
  // Layout Components
  { name: 'AppShell', category: 'Layout', description: 'Root layout with sidebar, topbar, and content area. Handles responsive breakpoints.', props: ['children', 'sidebarCollapsed'], complexity: 'Medium', module: 'Core' },
  { name: 'Sidebar', category: 'Layout', description: 'Collapsible navigation sidebar with sections, links, and user avatar.', props: ['collapsed', 'onToggle', 'activeRoute'], complexity: 'Medium', module: 'Core' },
  { name: 'TopBar', category: 'Layout', description: 'Top navigation bar with search, notifications bell, and user menu dropdown.', props: ['onSearch', 'notificationCount'], complexity: 'Medium', module: 'Core' },
  { name: 'PageHeader', category: 'Layout', description: 'Page title with breadcrumbs, action buttons, and optional description.', props: ['title', 'breadcrumbs', 'actions'], complexity: 'Low', module: 'Core' },
  { name: 'ContentArea', category: 'Layout', description: 'Main content wrapper with max-width, padding, and scroll management.', props: ['children', 'fullWidth'], complexity: 'Low', module: 'Core' },

  // Data Display
  { name: 'SnippetCard', category: 'Data Display', description: 'Code snippet preview with syntax highlighting, language tag, likes, and author info.', props: ['snippet', 'onLike', 'onBookmark'], complexity: 'High', module: 'Feed' },
  { name: 'ArticleCard', category: 'Data Display', description: 'Article preview with cover image, title, excerpt, read time, and tags.', props: ['article', 'variant'], complexity: 'Medium', module: 'Feed' },
  { name: 'UserCard', category: 'Data Display', description: 'User profile mini-card with avatar, name, bio, and follow button.', props: ['user', 'onFollow', 'compact'], complexity: 'Medium', module: 'Social' },
  { name: 'CommentThread', category: 'Data Display', description: 'Recursive comment tree with reply, edit, delete, and vote actions.', props: ['comments', 'onReply', 'depth'], complexity: 'High', module: 'Social' },
  { name: 'NotificationItem', category: 'Data Display', description: 'Notification row with icon, message, timestamp, and read/unread state.', props: ['notification', 'onMarkRead'], complexity: 'Low', module: 'Notifications' },
  { name: 'ReviewDiff', category: 'Data Display', description: 'Side-by-side or unified diff view for code reviews with inline comments.', props: ['oldCode', 'newCode', 'comments', 'mode'], complexity: 'High', module: 'Reviews' },
  { name: 'ActivityTimeline', category: 'Data Display', description: 'Vertical timeline showing user activity — commits, reviews, comments, created snippets.', props: ['activities', 'grouped'], complexity: 'Medium', module: 'Profile' },
  { name: 'StatCard', category: 'Data Display', description: 'Metric display card with value, label, trend indicator, and sparkline.', props: ['value', 'label', 'trend', 'sparkData'], complexity: 'Medium', module: 'Analytics' },
  { name: 'LeaderboardRow', category: 'Data Display', description: 'Ranked user entry with position, avatar, name, score, and badge.', props: ['rank', 'user', 'score'], complexity: 'Low', module: 'Analytics' },

  // Input Components
  { name: 'CodeEditor', category: 'Input', description: 'Monaco-based code editor with language selection, theme toggle, and auto-save.', props: ['value', 'onChange', 'language', 'theme', 'readOnly'], complexity: 'High', module: 'Editor' },
  { name: 'RichTextEditor', category: 'Input', description: 'Markdown editor with preview toggle, toolbar, and image upload support.', props: ['value', 'onChange', 'placeholder'], complexity: 'High', module: 'Editor' },
  { name: 'SearchInput', category: 'Input', description: 'Search bar with debounced input, autocomplete dropdown, and recent searches.', props: ['onSearch', 'suggestions', 'placeholder'], complexity: 'Medium', module: 'Core' },
  { name: 'TagInput', category: 'Input', description: 'Multi-tag input with autocomplete, create new, and removable pills.', props: ['tags', 'onChange', 'maxTags', 'suggestions'], complexity: 'Medium', module: 'Core' },
  { name: 'FileUpload', category: 'Input', description: 'Drag-and-drop file uploader with progress bar and preview.', props: ['onUpload', 'accept', 'maxSize', 'multiple'], complexity: 'Medium', module: 'Core' },

  // Feedback Components
  { name: 'Toast', category: 'Feedback', description: 'Non-blocking notification toast with variants: success, error, warning, info.', props: ['message', 'variant', 'duration', 'action'], complexity: 'Medium', module: 'Core' },
  { name: 'Modal', category: 'Feedback', description: 'Accessible modal dialog with focus trap, escape close, and backdrop click.', props: ['open', 'onClose', 'title', 'children', 'size'], complexity: 'Medium', module: 'Core' },
  { name: 'ConfirmDialog', category: 'Feedback', description: 'Confirmation modal for destructive actions with customizable buttons.', props: ['open', 'message', 'onConfirm', 'onCancel', 'variant'], complexity: 'Low', module: 'Core' },
  { name: 'Skeleton', category: 'Feedback', description: 'Loading placeholder that mimics content shape. Reduces perceived load time.', props: ['variant', 'width', 'height', 'count'], complexity: 'Low', module: 'Core' },
  { name: 'EmptyState', category: 'Feedback', description: 'Placeholder for empty lists: illustration, message, and call-to-action.', props: ['icon', 'title', 'description', 'action'], complexity: 'Low', module: 'Core' },
  { name: 'ErrorBoundary', category: 'Feedback', description: 'React error boundary wrapper with fallback UI and retry action.', props: ['fallback', 'onReset', 'children'], complexity: 'Medium', module: 'Core' },

  // Navigation Components
  { name: 'Tabs', category: 'Navigation', description: 'Tabbed interface with lazy-loaded panels and animated indicator.', props: ['tabs', 'activeTab', 'onChange'], complexity: 'Medium', module: 'Core' },
  { name: 'Breadcrumbs', category: 'Navigation', description: 'Breadcrumb navigation with route-based auto-generation.', props: ['items', 'separator'], complexity: 'Low', module: 'Core' },
  { name: 'Pagination', category: 'Navigation', description: 'Page navigation with page size selector, total count, and keyboard support.', props: ['page', 'pageSize', 'total', 'onChange'], complexity: 'Medium', module: 'Core' },
  { name: 'DropdownMenu', category: 'Navigation', description: 'Accessible dropdown with keyboard navigation, icons, and sub-menus.', props: ['trigger', 'items', 'align'], complexity: 'Medium', module: 'Core' },

  // Real-Time Components
  { name: 'CollabEditor', category: 'Real-Time', description: 'Multi-user code editor with cursor presence, selection sync, and user list.', props: ['sessionId', 'userId', 'language'], complexity: 'High', module: 'Collaboration' },
  { name: 'PresenceIndicator', category: 'Real-Time', description: 'Shows who\'s online — colored dots, avatar stack, and tooltip with names.', props: ['users', 'maxVisible'], complexity: 'Low', module: 'Collaboration' },
  { name: 'LiveCursor', category: 'Real-Time', description: 'Remote user\'s cursor with label showing their name and color.', props: ['position', 'user', 'color'], complexity: 'Medium', module: 'Collaboration' },
  { name: 'NotificationBell', category: 'Real-Time', description: 'Bell icon with unread badge, dropdown panel, and WebSocket live updates.', props: ['count', 'notifications', 'onOpen'], complexity: 'Medium', module: 'Notifications' },
];

export const feModules = [
  { name: 'Auth Module', icon: '🔐', color: '#EF4444', description: 'Login, registration, OAuth2 social login, JWT management, protected routes.', components: 5, pages: 3 },
  { name: 'Feed Module', icon: '📰', color: '#3B82F6', description: 'Home feed with infinite scroll, trending sidebar, filtered views by language/tags.', components: 6, pages: 2 },
  { name: 'Editor Module', icon: '✏️', color: '#22C55E', description: 'Code snippet and article creation with Monaco editor, markdown support, preview.', components: 4, pages: 3 },
  { name: 'Collaboration Module', icon: '👥', color: '#A855F7', description: 'Live coding sessions with real-time sync, cursor presence, chat, and session recording.', components: 5, pages: 2 },
  { name: 'Notifications Module', icon: '🔔', color: '#F59E0B', description: 'Real-time notifications via WebSocket. Notification center, preferences, email settings.', components: 3, pages: 1 },
  { name: 'Profile Module', icon: '👤', color: '#EC4899', description: 'User profile, settings, activity timeline, bookmarks, followers/following.', components: 5, pages: 3 },
  { name: 'Reviews Module', icon: '🔍', color: '#06B6D4', description: 'Code review interface with diff viewer, inline comments, review status workflow.', components: 4, pages: 2 },
  { name: 'Analytics Module', icon: '📊', color: '#F97316', description: 'Dashboard with personal stats, trending content, leaderboards, reading analytics.', components: 4, pages: 1 },
];
