import { z } from 'zod'

// Linear API Types
export interface LinearUser {
	id: string
	email: string
	name: string
	displayName: string
	avatarUrl?: string
}

export interface LinearTeam {
	id: string
	name: string
	key: string
	description?: string
}

export interface LinearLabel {
	id: string
	name: string
	color: string
	description?: string
}

export interface LinearProject {
	id: string
	name: string
	description?: string
	icon?: string
	color?: string
}

export interface LinearIssueState {
	id: string
	name: string
	type: 'backlog' | 'unstarted' | 'started' | 'completed' | 'canceled'
	color: string
	description?: string
}

export interface LinearIssue {
	id: string
	identifier: string
	title: string
	description?: string
	state: LinearIssueState
	assignee?: LinearUser
	priority: 0 | 1 | 2 | 3 | 4 // 0=No priority, 1=Urgent, 2=High, 3=Medium, 4=Low
	estimate?: number
	labels: LinearLabel[]
	project?: LinearProject
	team: LinearTeam
	creator: LinearUser
	createdAt: string
	updatedAt: string
	dueDate?: string
	url: string
}

export interface LinearIssueConnection {
	nodes: LinearIssue[]
	pageInfo: {
		hasNextPage: boolean
		hasPreviousPage: boolean
		startCursor?: string
		endCursor?: string
	}
}

// Zod schemas for validation
export const ListLinearIssuesSchema = z.object({
	assignee: z.string().optional().describe('User ID or email to filter by assignee'),
	status: z.string().optional().describe('Issue status/state to filter by'),
	priority: z
		.enum(['0', '1', '2', '3', '4'])
		.optional()
		.describe('Priority level (0=No priority, 1=Urgent, 2=High, 3=Medium, 4=Low)'),
	labels: z.array(z.string()).optional().describe('Array of label names to filter by'),
	team: z.string().optional().describe('Team ID or key to filter by'),
	project: z.string().optional().describe('Project ID to filter by'),
	limit: z
		.number()
		.min(1)
		.max(100)
		.default(50)
		.optional()
		.describe('Maximum number of issues to return'),
	after: z.string().optional().describe('Cursor for pagination'),
})

export type ListLinearIssuesParams = z.infer<typeof ListLinearIssuesSchema>

// Priority labels for display
export const PRIORITY_LABELS = {
	0: 'No priority',
	1: 'Urgent',
	2: 'High',
	3: 'Medium',
	4: 'Low',
} as const

// State type labels for display
export const STATE_TYPE_LABELS = {
	backlog: 'Backlog',
	unstarted: 'Todo',
	started: 'In Progress',
	completed: 'Done',
	canceled: 'Canceled',
} as const
