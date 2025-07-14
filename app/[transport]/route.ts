import { createMcpHandler } from '@vercel/mcp-adapter'
import { z } from 'zod'
import { NEXTJS_INSTRUCTIONS } from './lib/instructions/nextjs'
import { ESLINT_INSTRUCTIONS } from './lib/instructions/eslint'
import { TYPESCRIPT_INSTRUCTIONS } from './lib/instructions/typescript'
import { LinearClient } from './lib/linear/client'
import { formatLinearIssuesSummary, getLinearApiKey } from './lib/linear/utils'

const handler = createMcpHandler(
	async (server) => {
		// Add tool to get coding standards
		server.tool(
			'get_coding_standards',
			'Get coding standards and best practices for Next.js, ESLint, and TypeScript. Call this BEFORE generating any code to ensure it follows project standards.',
			{
				type: z.enum(['nextjs', 'eslint', 'typescript', 'all']).optional().default('all'),
			},
			async ({ type }) => {
				let instructions = ''

				switch (type) {
					case 'nextjs':
						instructions = NEXTJS_INSTRUCTIONS
						break
					case 'eslint':
						instructions = ESLINT_INSTRUCTIONS
						break
					case 'typescript':
						instructions = TYPESCRIPT_INSTRUCTIONS
						break
					case 'all':
					default:
						instructions = `# Next.js Instructions\n${NEXTJS_INSTRUCTIONS}\n\n# ESLint Instructions\n${ESLINT_INSTRUCTIONS}\n\n# TypeScript Instructions\n${TYPESCRIPT_INSTRUCTIONS}`
						break
				}

				return {
					content: [
						{
							type: 'text',
							text: instructions,
						},
					],
				}
			}
		)

		// Add tool for code generation that automatically includes standards
		server.tool(
			'generate_code_with_standards',
			"Generate code following the project's coding standards. This automatically applies Next.js, ESLint, and TypeScript best practices.",
			{
				task: z
					.string()
					.describe(
						"What code to generate (e.g., 'React component for user profile', 'TypeScript interface for API response')"
					),
				type: z
					.enum(['react', 'nextjs', 'typescript', 'api', 'component', 'util', 'other'])
					.optional()
					.default('other'),
			},
			async ({ task, type }) => {
				const allStandards = `# Project Coding Standards\n\n${NEXTJS_INSTRUCTIONS}\n\n${ESLINT_INSTRUCTIONS}\n\n${TYPESCRIPT_INSTRUCTIONS}`

				return {
					content: [
						{
							type: 'text',
							text: `Based on the task "${task}" and type "${type}", here are the coding standards to follow:\n\n${allStandards}\n\nNow generate the requested code following these standards exactly.`,
						},
					],
				}
			}
		)

		// Add Linear integration tool
		server.tool(
			'list_linear_issues',
			'Query and filter Linear issues. You can filter by assignee, status, priority, labels, team, and project. Use this to get an overview of issues or find specific issues.',
			{
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
			},
			async (params) => {
				try {
					const apiKey = getLinearApiKey()
					const client = new LinearClient(apiKey)
					const issues = await client.listIssues(params)
					const formattedOutput = formatLinearIssuesSummary(issues)

					return {
						content: [
							{
								type: 'text',
								text: formattedOutput,
							},
						],
					}
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
					return {
						content: [
							{
								type: 'text',
								text: `Error fetching Linear issues: ${errorMessage}`,
							},
						],
					}
				}
			}
		)

		// Add resource for Next.js instructions
		server.resource(
			'nextjs-instructions',
			'nextjs://instructions',
			{
				name: 'nextjs-instructions',
				description: 'Next.js coding instructions and best practices',
				mimeType: 'text/plain',
			},
			async () => ({
				contents: [
					{
						uri: 'nextjs://instructions',
						text: NEXTJS_INSTRUCTIONS,
						mimeType: 'text/plain',
					},
				],
			})
		)

		// Add resource for ESLint instructions
		server.resource(
			'eslint-instructions',
			'eslint://instructions',
			{
				name: 'eslint-instructions',
				description: 'ESLint configuration and code quality best practices',
				mimeType: 'text/plain',
			},
			async () => ({
				contents: [
					{
						uri: 'eslint://instructions',
						text: ESLINT_INSTRUCTIONS,
						mimeType: 'text/plain',
					},
				],
			})
		)

		// Add resource for TypeScript instructions
		server.resource(
			'typescript-instructions',
			'typescript://instructions',
			{
				name: 'typescript-instructions',
				description: 'TypeScript development and type safety best practices',
				mimeType: 'text/plain',
			},
			async () => ({
				contents: [
					{
						uri: 'typescript://instructions',
						text: TYPESCRIPT_INSTRUCTIONS,
						mimeType: 'text/plain',
					},
				],
			})
		)
	},
	{
		capabilities: {
			tools: {
				get_coding_standards: {
					description:
						'Get coding standards and best practices for Next.js, ESLint, and TypeScript. Call this BEFORE generating any code to ensure it follows project standards.',
				},
				generate_code_with_standards: {
					description:
						"Generate code following the project's coding standards. This automatically applies Next.js, ESLint, and TypeScript best practices.",
				},
				list_linear_issues: {
					description:
						'Query and filter Linear issues. You can filter by assignee, status, priority, labels, team, and project. Use this to get an overview of issues or find specific issues.',
				},
			},
			resources: {
				'nextjs-instructions': {
					description: 'Next.js coding instructions and best practices',
					mimeType: 'text/plain',
				},
				'eslint-instructions': {
					description: 'ESLint configuration and code quality best practices',
					mimeType: 'text/plain',
				},
				'typescript-instructions': {
					description: 'TypeScript development and type safety best practices',
					mimeType: 'text/plain',
				},
			},
		},
	},
	{
		basePath: '',
		verboseLogs: true,
		maxDuration: 60,
	}
)

export { handler as GET, handler as POST, handler as DELETE }
