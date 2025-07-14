# Linear Integration MCP - Product Requirements Document

## Overview

**Product Name:** Linear Integration MCP for Cursor  
**Version:** 1.0  
**Date:** January 2025  
**Team:** Development Team

## MVP Focus

**Core MVP Features (Priority 1):**

1. **List Issues** - Query and display Linear issues with filtering
2. **Work on Issue by ID** - Get full issue context and requirements
3. **Create Issue from Selected Text** - Turn code/errors into Linear issues

**MVP User Stories:**

- _"Show me my Linear issues"_ → Lists assigned issues with status
- _"Get details for Linear issue ABC-123"_ → Shows full issue context
- _[Select error/code]_ → _"Create Linear issue for this bug"_ → Creates issue with context

## Executive Summary

This MCP server integrates Linear project management with Cursor IDE, enabling developers to manage Linear issues, track sprint progress, and maintain project context without leaving their coding environment. The integration reduces context switching and improves developer productivity by making project management conversational.

## Problem Statement

**Current Pain Points:**

- Developers constantly switch between Linear and Cursor for project management
- Context loss when transitioning between coding and issue management
- Manual status updates and time tracking
- Difficulty correlating code changes with business requirements
- Inefficient sprint planning and capacity management

**Target Users:**

- Frontend and Backend developers
- Team leads and engineering managers
- Product managers working with engineering teams
- QA engineers tracking bugs and testing

## Objectives

**Primary Goals:**

1. **Reduce Context Switching** - Access Linear data directly from Cursor
2. **Improve Project Visibility** - Real-time sprint and issue status
3. **Enhance Code Quality** - Link code changes to business requirements
4. **Streamline Workflow** - Automate status updates and tracking
5. **Better Planning** - Data-driven sprint planning and capacity management

**Success Metrics:**

- 50% reduction in Linear web app usage during coding sessions
- 30% improvement in issue update frequency
- 25% faster sprint planning cycles
- 90% developer adoption within 4 weeks

## User Personas

### Primary Users

**1. Senior Frontend Developer (Sarah)**

- Manages multiple feature implementations
- Needs quick access to issue requirements and designs
- Wants to update issue status as work progresses
- Values code quality and documentation

**2. Backend Developer (Mike)**

- Works on API endpoints and database changes
- Needs to track dependencies and blockers
- Wants to create issues for bugs discovered during development
- Focuses on technical debt and performance

**3. Team Lead (Alex)**

- Oversees sprint planning and team capacity
- Needs visibility into team progress and blockers
- Manages issue prioritization and assignments
- Tracks team velocity and planning accuracy

### Secondary Users

**4. Product Manager (Emma)**

- Reviews development progress
- Needs insight into technical blockers
- Wants to understand development capacity
- Tracks feature delivery timelines

## Feature Specifications

### MVP Features

#### 1. List Linear Issues

**Requirements:**

- Query issues by assignee (default: current user)
- Filter by status, priority, labels
- Show issue ID, title, status, priority, assignee
- Support pagination for large result sets
- Quick access to issue details

**User Stories:**

- _"Show me my Linear issues"_ → Lists all assigned issues
- _"Show me open Linear issues for the frontend team"_ → Filtered list
- _"What Linear issues are in progress?"_ → Status-filtered list

**MCP Tool:** `list_linear_issues`

- Parameters: `assignee`, `status`, `priority`, `labels`, `team`
- Returns: Array of issue summaries

#### 2. Get Issue Details by ID

**Requirements:**

- Fetch full issue information by ID
- Include description, acceptance criteria, comments
- Show related issues and dependencies
- Display attachments and links
- Provide context for starting work

**User Stories:**

- _"Get details for Linear issue ABC-123"_ → Full issue context
- _"What's the requirements for issue XYZ-456?"_ → Detailed view
- _"Show me the acceptance criteria for this issue"_ → Specific details

**MCP Tool:** `get_linear_issue`

- Parameters: `issueId`
- Returns: Complete issue object with all details

#### 3. Create Issue from Selected Text

**Requirements:**

- Accept selected text as issue context
- Parse code snippets, error messages, stack traces
- Generate appropriate issue title and description
- Set relevant labels and priority based on content
- Assign to appropriate team member

**User Stories:**

- _[Select error message]_ → _"Create Linear issue for this error"_
- _[Select code snippet]_ → _"Create bug report for this code"_
- _[Select TODO comment]_ → _"Create Linear issue for this TODO"_

**MCP Tool:** `create_linear_issue_from_text`

- Parameters: `selectedText`, `issueType`, `priority`, `assignee`
- Returns: Created issue details

### Future Features

#### 1. Issue Management

**Requirements:**

- Update issue status, assignee, priority, estimates
- Add comments and attachments
- Link related issues
- Advanced filtering and search capabilities

**User Stories:**

- As a developer, I want to update issue status by saying "Mark Linear issue ABC-123 as In Progress"
- As a developer, I want to add comments to issues directly from Cursor
- As a developer, I want to link related issues when working on dependencies

#### 2. Code-to-Issue Integration

**Requirements:**

- Generate code skeletons based on issue requirements
- Link code changes to specific issues
- Automatic issue updates when code is committed
- Context-aware code suggestions

**User Stories:**

- As a developer, I want to say "Generate React component for Linear issue XYZ-456"
- As a developer, I want to automatically update Linear when I commit code
- As a developer, I want code suggestions based on issue acceptance criteria

#### 3. Workflow Automation

**Requirements:**

- Automated status updates based on code changes
- Smart issue creation from code comments or errors
- Automatic time tracking based on development activity
- Integration with git commit messages

## Technical Requirements

### API Integration

**Linear GraphQL API:**

- Authentication via API keys or OAuth
- Real-time subscriptions for live updates
- Rate limiting and error handling
- Bulk operations for efficiency

**Required Endpoints:**

- Issues (query, create, update, delete)
- Projects and teams
- Sprints and milestones
- Users and assignments
- Comments and attachments

### MCP Server Architecture

**MVP Tools:**

- `list_linear_issues` - Query and filter issues
- `get_linear_issue` - Get detailed issue information
- `create_linear_issue_from_text` - Create issues from selected text

**Future Tools:**

- `update_linear_issue` - Update existing issues
- `add_issue_comment` - Add comments to issues
- `link_related_issues` - Link issues together
- `generate_code_for_issue` - Code generation based on requirements

**Resources:**

- Team configuration and workflows
- Issue templates and standards
- Coding standards integration
- Development workflow guidelines

**Configuration:**

- Linear API credentials
- Team and project settings
- Notification preferences
- Workflow customizations

### Data Models

**Issue Model:**

```typescript
interface LinearIssue {
	id: string
	title: string
	description: string
	status: IssueStatus
	assignee: User
	priority: Priority
	estimate: number
	labels: Label[]
	project: Project
	createdAt: Date
	updatedAt: Date
}
```

**Sprint Model:**

```typescript
interface Sprint {
	id: string
	name: string
	startDate: Date
	endDate: Date
	issues: LinearIssue[]
	progress: SprintProgress
	team: Team
}
```

## Implementation Plan

### Phase 1: MVP Core Features

- Linear API authentication and connection
- `list_linear_issues` tool implementation
- `get_linear_issue` tool implementation
- `create_linear_issue_from_text` tool implementation
- Basic error handling and validation
- Integration with existing coding standards MCP

### Phase 2: Enhanced Issue Management

- `update_linear_issue` tool implementation
- `add_issue_comment` tool implementation
- `link_related_issues` tool implementation
- Issue templates and automation
- Advanced filtering and search capabilities

### Phase 3: Code Integration

- `generate_code_for_issue` tool implementation
- Automatic issue updates on code commits
- Smart issue creation from code analysis
- Integration with git workflow

### Phase 4: Advanced Features

- Workflow automation
- Performance optimization
- Advanced analytics
- Third-party integrations

## Security and Compliance

**Authentication:**

- Secure API key management
- OAuth 2.0 integration
- Environment-specific credentials
- Rate limiting and abuse prevention

**Data Privacy:**

- Minimal data storage
- Secure transmission (HTTPS)
- Audit logging
- GDPR compliance considerations

## Success Criteria

**Launch Criteria:**

- All MVP features implemented and tested
- 90% API reliability and uptime
- Complete documentation and onboarding
- Security review passed
- Integration with existing MCP infrastructure

**Post-Launch Metrics:**

- Developer adoption rate (target: 90% within 4 weeks)
- Issue update frequency (target: 30% improvement)
- Context switching reduction (target: 50% less Linear web usage)
- Issue creation efficiency (target: 3x faster issue creation from code)

## Risks and Mitigation

**Technical Risks:**

- Linear API rate limiting → Implement intelligent caching
- Network connectivity issues → Add offline mode and retry logic
- Performance bottlenecks → Optimize GraphQL queries and pagination

**User Adoption Risks:**

- Learning curve for new workflow → Comprehensive onboarding and examples
- Resistance to change → Gradual rollout and user feedback integration
- Feature gaps vs web app → Prioritize most-used features first

## Dependencies

**External:**

- Linear GraphQL API availability
- Cursor MCP integration stability
- Team willingness to adopt new workflow

**Internal:**

- Existing coding standards MCP server
- Development team capacity
- Infrastructure for hosting MCP server
- Integration with current development workflow

## Future Enhancements

**V2.0 Potential Features:**

- Jira integration for mixed environments
- GitHub PR to Linear issue linking
- Slack notifications for issue updates
- Advanced analytics and reporting dashboard
- Team collaboration features
- Sprint planning and management tools

---

**Document Owner:** Development Team  
**Last Updated:** January 2025  
**Next Review:** Post-Phase 1 completion
