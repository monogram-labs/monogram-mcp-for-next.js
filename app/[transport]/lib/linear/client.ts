import { GraphQLClient } from 'graphql-request'
import { LinearIssue, LinearIssueConnection, ListLinearIssuesParams } from './types'

export class LinearClient {
	private client: GraphQLClient

	constructor(apiKey: string) {
		this.client = new GraphQLClient('https://api.linear.app/graphql', {
			headers: {
				Authorization: apiKey,
				'Content-Type': 'application/json',
			},
		})
	}

	async listIssues(params: ListLinearIssuesParams): Promise<LinearIssueConnection> {
		const query = `
			query ListIssues($filter: IssueFilter, $first: Int, $after: String) {
				issues(filter: $filter, first: $first, after: $after) {
					nodes {
						id
						identifier
						title
						description
						state {
							id
							name
							type
							color
							description
						}
						assignee {
							id
							email
							name
							displayName
							avatarUrl
						}
						priority
						estimate
						labels {
							nodes {
								id
								name
								color
								description
							}
						}
						project {
							id
							name
							description
							icon
							color
						}
						team {
							id
							name
							key
							description
						}
						creator {
							id
							email
							name
							displayName
							avatarUrl
						}
						createdAt
						updatedAt
						dueDate
						url
					}
					pageInfo {
						hasNextPage
						hasPreviousPage
						startCursor
						endCursor
					}
				}
			}
		`

		const filter: any = {}

		// Build filter object
		if (params.assignee) {
			// Check if assignee is an email or user ID
			if (params.assignee.includes('@')) {
				filter.assignee = { email: { eq: params.assignee } }
			} else {
				filter.assignee = { id: { eq: params.assignee } }
			}
		}

		if (params.status) {
			filter.state = { name: { eq: params.status } }
		}

		if (params.priority) {
			filter.priority = { eq: parseInt(params.priority) }
		}

		if (params.team) {
			// Check if team is a key or ID
			if (params.team.length <= 5 && params.team.match(/^[A-Z]+$/)) {
				filter.team = { key: { eq: params.team } }
			} else {
				filter.team = { id: { eq: params.team } }
			}
		}

		if (params.project) {
			filter.project = { id: { eq: params.project } }
		}

		if (params.labels && params.labels.length > 0) {
			filter.labels = {
				some: {
					name: { in: params.labels },
				},
			}
		}

		const variables = {
			filter: Object.keys(filter).length > 0 ? filter : undefined,
			first: params.limit || 50,
			after: params.after,
		}

		try {
			const response = (await this.client.request(query, variables)) as any

			// Transform the response to match our types
			const issues = response.issues
			const transformedIssues: LinearIssue[] = issues.nodes.map((issue: any) => ({
				...issue,
				labels: issue.labels.nodes || [],
			}))

			return {
				nodes: transformedIssues,
				pageInfo: issues.pageInfo,
			}
		} catch (error) {
			console.error('Error fetching Linear issues:', error)
			throw new Error(
				`Failed to fetch Linear issues: ${error instanceof Error ? error.message : 'Unknown error'}`
			)
		}
	}

	async getCurrentUser() {
		const query = `
			query GetCurrentUser {
				viewer {
					id
					email
					name
					displayName
					avatarUrl
				}
			}
		`

		try {
			const response = (await this.client.request(query)) as any
			return response.viewer
		} catch (error) {
			console.error('Error fetching current user:', error)
			throw new Error(
				`Failed to fetch current user: ${error instanceof Error ? error.message : 'Unknown error'}`
			)
		}
	}

	async getTeams() {
		const query = `
			query GetTeams {
				teams {
					nodes {
						id
						name
						key
						description
					}
				}
			}
		`

		try {
			const response = (await this.client.request(query)) as any
			return response.teams.nodes
		} catch (error) {
			console.error('Error fetching teams:', error)
			throw new Error(
				`Failed to fetch teams: ${error instanceof Error ? error.message : 'Unknown error'}`
			)
		}
	}
}
