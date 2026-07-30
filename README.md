This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## MCP Server — Manage blog posts via claude.ai

The site exposes a [Model Context Protocol](https://modelcontextprotocol.io) server at `/api/mcp` that lets you create, edit, publish, and delete blog posts directly from a Claude chat.

### Environment variable

Add `MCP_API_KEY` to your Vercel project (or `.env.local`):

```bash
# generate a strong random secret
openssl rand -base64 32
```

Then set it in Vercel:

```
MCP_API_KEY=<the value you generated>
```

### Connect in claude.ai

1. Open **claude.ai → Settings → Integrations → Add custom integration**.
2. Set the URL to `https://comlabstechnologies.com/api/mcp`.
3. Under **Authentication**, choose **Bearer token** and paste the value of `MCP_API_KEY`.
4. Save. Claude will now list five tools: `list_posts`, `create_draft_post`, `update_post`, `publish_post`, `delete_post`.

### Available tools

| Tool | What it does |
|------|-------------|
| `list_posts` | List posts with optional status filter and keyword search |
| `create_draft_post` | Create a new draft; content is HTML, sanitized server-side |
| `update_post` | Update any fields of an existing post (by id or slug) |
| `publish_post` | Publish a draft or revert a published post to draft |
| `delete_post` | Permanently delete a post (irreversible) |

### Connect in Claude Code (CLI)

Add this to your `~/.claude/claude_code_config.json` (or the project-level `.mcp.json`):

```json
{
  "mcpServers": {
    "comlabs-blog": {
      "type": "http",
      "url": "https://comlabstechnologies.com/api/mcp",
      "headers": {
        "Authorization": "Bearer <MCP_API_KEY>"
      }
    }
  }
}
```
