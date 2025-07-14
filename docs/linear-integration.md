# Linear Integration

This MCP server includes Linear integration that allows you to query and filter Linear issues directly from Cursor.

## Setup

1. **Get your Linear API key:**
   - Go to Linear Settings → API → Create new API key
   - Copy the API key

2. **Set environment variable:**

   Create a `.env.local` file in the project root:

   ```bash
   # .env.local
   LINEAR_API_KEY=your-linear-api-key-here
   ```

   Or export it directly in your shell:

   ```bash
   export LINEAR_API_KEY="your-api-key-here"
   ```

3. **Test the integration:**
   ```bash
   pnpm test:linear
   ```

## Available Tools

### `list_linear_issues`

Query and filter Linear issues with the following parameters:

- **assignee** (optional): User ID or email to filter by assignee
- **status** (optional): Issue status/state to filter by (e.g., "Todo", "In Progress", "Done")
- **priority** (optional): Priority level (`0`=No priority, `1`=Urgent, `2`=High, `3`=Medium, `4`=Low)
- **labels** (optional): Array of label names to filter by
- **team** (optional): Team ID or key to filter by (e.g., "ENG" or team UUID)
- **project** (optional): Project ID to filter by
- **limit** (optional): Maximum number of issues to return (1-100, default: 50)
- **after** (optional): Cursor for pagination

## Usage Examples

### List all issues assigned to you

```
Show me my Linear issues
```

### Filter by status

```
Show me Linear issues that are "In Progress"
```

### Filter by team

```
Show me Linear issues for the ENG team
```

### Filter by priority

```
Show me urgent Linear issues
```

### Filter by labels

```
Show me Linear issues with labels "bug" and "frontend"
```

### Filter by multiple criteria

```
Show me high priority Linear issues assigned to john@company.com in the ENG team
```

## Response Format

The tool returns a formatted summary of issues including:

- Issue identifier (e.g., ENG-123)
- Title
- Status
- Priority
- Assignee
- Team
- Project
- Labels
- Estimate
- Due date
- Creation/update dates
- Linear URL

## Error Handling

The integration includes proper error handling for:

- Missing API key
- Invalid parameters
- Network issues
- API rate limits
- Authentication errors

## Testing

Run the test script to verify your setup:

```bash
pnpm test:linear
```

Note: The test script will automatically use the `LINEAR_API_KEY` from your `.env.local` file.

This will test:

1. API key validation
2. User authentication
3. Team retrieval
4. Issue listing
5. Output formatting

## Implementation Details

- Uses Linear's GraphQL API
- Supports pagination with cursor-based navigation
- Handles both user emails and IDs for assignee filtering
- Supports both team keys and IDs for team filtering
- Provides formatted output optimized for AI assistant consumption
- Uses direct API key authentication (no Bearer prefix required)
