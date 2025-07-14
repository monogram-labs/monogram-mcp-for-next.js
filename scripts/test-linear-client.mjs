#!/usr/bin/env node

import { LinearClient } from '../app/[transport]/lib/linear/client.js'
import { formatLinearIssuesSummary } from '../app/[transport]/lib/linear/utils.js'

async function testLinearClient() {
	console.log('Testing Linear API client...')

	// Check if API key is available
	const apiKey = process.env.LINEAR_API_KEY
	if (!apiKey) {
		console.error('❌ LINEAR_API_KEY environment variable is not set')
		console.log(
			'Please set it in your .env.local file or with: export LINEAR_API_KEY="your-api-key"'
		)
		process.exit(1)
	}

	console.log('✅ Found API key:', apiKey.substring(0, 10) + '...')

	const client = new LinearClient(apiKey)

	try {
		// Test 1: Get current user
		console.log('\n1. Testing getCurrentUser...')
		const user = await client.getCurrentUser()
		console.log('✅ Current user:', user.displayName, `(${user.email})`)

		// Test 2: Get teams
		console.log('\n2. Testing getTeams...')
		const teams = await client.getTeams()
		console.log('✅ Teams:', teams.map((t) => `${t.name} (${t.key})`).join(', '))

		// Test 3: List issues (default - first 10)
		console.log('\n3. Testing listIssues (first 10)...')
		const issues = await client.listIssues({ limit: 10 })
		console.log('✅ Found', issues.nodes.length, 'issues')

		// Test 4: List issues assigned to current user
		console.log('\n4. Testing listIssues (assigned to current user)...')
		const myIssues = await client.listIssues({ assignee: user.email, limit: 5 })
		console.log('✅ Found', myIssues.nodes.length, 'issues assigned to you')

		// Test 5: Format issues for display
		console.log('\n5. Testing formatLinearIssuesSummary...')
		const formattedOutput = formatLinearIssuesSummary(myIssues)
		console.log('✅ Formatted output:')
		console.log(formattedOutput)

		console.log('\n🎉 All tests passed!')
	} catch (error) {
		console.error('❌ Test failed:', error.message)
		process.exit(1)
	}
}

testLinearClient().catch(console.error)
