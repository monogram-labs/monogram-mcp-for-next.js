import { LinearIssue, LinearIssueConnection, PRIORITY_LABELS, STATE_TYPE_LABELS } from './types'

export function formatLinearIssue(issue: LinearIssue): string {
	const priorityLabel = PRIORITY_LABELS[issue.priority] || 'Unknown'
	const stateLabel = STATE_TYPE_LABELS[issue.state.type] || issue.state.name
	const assigneeDisplay = issue.assignee
		? `${issue.assignee.displayName} (${issue.assignee.email})`
		: 'Unassigned'
	const labelsDisplay =
		issue.labels.length > 0 ? issue.labels.map((l) => l.name).join(', ') : 'No labels'
	const projectDisplay = issue.project ? issue.project.name : 'No project'
	const estimateDisplay = issue.estimate ? `${issue.estimate} pts` : 'No estimate'
	const dueDateDisplay = issue.dueDate
		? new Date(issue.dueDate).toLocaleDateString()
		: 'No due date'

	return `
**${issue.identifier}: ${issue.title}**
- **Status:** ${stateLabel} (${issue.state.name})
- **Priority:** ${priorityLabel}
- **Assignee:** ${assigneeDisplay}
- **Team:** ${issue.team.name} (${issue.team.key})
- **Project:** ${projectDisplay}
- **Labels:** ${labelsDisplay}
- **Estimate:** ${estimateDisplay}
- **Due Date:** ${dueDateDisplay}
- **Created:** ${new Date(issue.createdAt).toLocaleDateString()}
- **Updated:** ${new Date(issue.updatedAt).toLocaleDateString()}
- **URL:** ${issue.url}
${issue.description ? `\n**Description:**\n${issue.description}` : ''}
`.trim()
}

export function formatLinearIssueList(connection: LinearIssueConnection): string {
	const issues = connection.nodes

	if (issues.length === 0) {
		return 'No issues found matching the criteria.'
	}

	const issuesList = issues.map((issue) => formatLinearIssue(issue)).join('\n\n---\n\n')

	const paginationInfo = connection.pageInfo.hasNextPage
		? `\n\n**Pagination:** More results available. Use the cursor "${connection.pageInfo.endCursor}" to get the next page.`
		: ''

	return `**Found ${issues.length} issue${issues.length === 1 ? '' : 's'}:**\n\n${issuesList}${paginationInfo}`
}

export function formatLinearIssuesSummary(connection: LinearIssueConnection): string {
	const issues = connection.nodes

	if (issues.length === 0) {
		return 'No issues found matching the criteria.'
	}

	const summary = issues
		.map((issue) => {
			const priorityLabel = PRIORITY_LABELS[issue.priority] || 'Unknown'
			const stateLabel = STATE_TYPE_LABELS[issue.state.type] || issue.state.name
			const assigneeDisplay = issue.assignee ? issue.assignee.displayName : 'Unassigned'

			return `• **${issue.identifier}** - ${issue.title} | ${stateLabel} | ${priorityLabel} | ${assigneeDisplay}`
		})
		.join('\n')

	const paginationInfo = connection.pageInfo.hasNextPage
		? `\n\n**Pagination:** More results available. Use the cursor "${connection.pageInfo.endCursor}" to get the next page.`
		: ''

	return `**Found ${issues.length} issue${issues.length === 1 ? '' : 's'}:**\n\n${summary}${paginationInfo}`
}

export function getLinearApiKey(): string {
	const apiKey = process.env.LINEAR_API_KEY
	if (!apiKey) {
		throw new Error(
			'LINEAR_API_KEY environment variable is not set. Please set it to your Linear API key.'
		)
	}
	return apiKey
}
