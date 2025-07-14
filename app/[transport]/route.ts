import { createMcpHandler } from '@vercel/mcp-adapter'
import { z } from 'zod'
import { NEXTJS_INSTRUCTIONS } from './lib/instructions/nextjs'
import { ESLINT_INSTRUCTIONS } from './lib/instructions/eslint'
import { TYPESCRIPT_INSTRUCTIONS } from './lib/instructions/typescript'

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
