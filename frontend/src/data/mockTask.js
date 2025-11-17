// sample tasks for testing
const sampleTasks = [
  {
    id: 't-001',
    title: 'Fix login bug',
    priority: 'high',
    description: 'Users cannot sign in with OAuth when redirect URI includes trailing slash.',
    assignee: 'Alice Johnson',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=alice',
  status: 'todo',
    createdAt: '2025-11-01T09:15:00Z',
    dueDate: '2025-11-10T23:59:00Z'
  },
  {
    id: 't-002',
    title: 'Add password strength meter',
    priority: 'medium',
    description: 'Introduce client-side strength indicator and show suggestions.',
    assignee: 'Carol Nguyen',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=carol',
  status: 'in-progress',
    createdAt: '2025-10-28T14:00:00Z',
    dueDate: '2025-11-05T17:00:00Z'
  },
  {
    id: 't-003',
    title: 'Database migration: tasks table',
    priority: 'critical',
    description: 'Perform schema migration to add priorityScore and index on assignee. Requires maintenance window.',
    assignee: 'Dana Patel',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=dana',
  status: 'review',
    createdAt: '2025-10-20T08:30:00Z',
    dueDate: '2025-11-30T12:00:00Z'
  },
  {
    id: 't-004',
    title: 'UI: responsive navbar spacing',
    priority: 'low',
    description: 'Adjust padding so page content does not sit under the fixed navbar on small screens.',
    assignee: 'Ethan Brooks',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=ethan',
  status: 'done',
    createdAt: '2025-09-15T10:00:00Z',
    dueDate: null
  },
  {
    id: 't-005',
    title: 'Edge case: empty fields',
    priority: '',
    description: '',
    assignee: 'Fiona Lee',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=fiona',
  status: 'backlog',
    createdAt: '2025-11-03T12:00:00Z',
    dueDate: null
  },
  {
    id: 't-006',
    title: 'Long description test',
    priority: 'medium',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(8),
    assignee: 'Gabriel Torres',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=gabriel',
  status: 'todo',
    createdAt: '2025-11-02T09:45:00Z',
    dueDate: '2025-12-01T00:00:00Z'
  },
  {
    id: 't-007',
    title: 'Special chars: 🚨🔥',
    priority: 'high',
    description: 'Ensure emoji and special characters render correctly in UI and export.',
    assignee: 'Hannah Kim',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=hannah',
  status: 'in-progress',
    createdAt: '2025-11-04T07:30:00Z',
    dueDate: '2025-11-08T18:00:00Z'
  },
  {
    id: 't-008',
    title: 'Backlog grooming',
    priority: 'low',
    description: 'Review and triage backlog items for the next sprint.',
    assignee: 'Ibrahim Malik',
    assigneeAvatar: 'https://i.pravatar.cc/64?u=ibrahim',
  status: 'backlog',
    createdAt: '2025-10-01T09:00:00Z',
    dueDate: null
  }
]

export default sampleTasks