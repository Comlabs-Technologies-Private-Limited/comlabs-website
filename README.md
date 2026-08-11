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

## MCP Server — Manage content via Claude and ChatGPT

The site exposes a [Model Context Protocol](https://modelcontextprotocol.io) server at `/api/mcp/` that lets AI assistants create, edit, publish, and delete blog posts and case studies — including image uploads — without opening the admin panel.

### Required environment variables

Add these to Vercel (or `.env.local`):

```bash
# MCP bearer token — generate with: openssl rand -base64 32
MCP_API_KEY=

# MongoDB — required for blog/case study CRUD
MONGODB_URI=

# Vercel Blob — required for upload_image tools
BLOB_READ_WRITE_TOKEN=
```

### Connect in claude.ai

1. Open **claude.ai → Settings → Integrations → Add custom integration**.
2. Set the URL to `https://www.comlabstechnologies.com/api/mcp/`.
3. Under **Authentication**, choose **Bearer token** and paste your `MCP_API_KEY`.
4. Save. Claude will discover all tools listed below.

### Connect in ChatGPT

ChatGPT’s **New Plugin** dialog uses **Server URL** (not Tunnel). Our server uses a static API key, **not OAuth**.

1. Open **Settings → Apps & Connectors → Create** (Developer mode must be on).
2. Fill in:
   - **Name:** `Comlabs Admin`
   - **Server URL:** `https://www.comlabstechnologies.com/api/mcp/`
   - **Authentication:** open the dropdown and choose **Token** (not OAuth)
3. Paste your `MCP_API_KEY` when prompted.
4. Check **“I understand and want to continue”**, then click **Create**.

**If you only see OAuth** and no Token option, put the key in the URL instead:

```
https://www.comlabstechnologies.com/api/mcp/?api_key=YOUR_MCP_API_KEY
```

Use **Authentication: None** with that full URL. The key stays in the URL — only use this if Token auth isn’t available.

### Connect in Cursor or Claude Code

Copy `.mcp.json.example` to `.mcp.json` and set your key:

```json
{
  "mcpServers": {
    "comlabs-admin": {
      "type": "http",
      "url": "https://www.comlabstechnologies.com/api/mcp/",
      "headers": {
        "Authorization": "Bearer <MCP_API_KEY>"
      }
    }
  }
}
```

For local development, use `http://localhost:3000/api/mcp/`.

### Available tools

#### Blog posts

| Tool | What it does |
|------|-------------|
| `list_posts` | List posts with optional status filter and keyword search |
| `get_post` | Fetch a single post by id or slug |
| `create_draft_post` | Create a post (draft by default); HTML content is sanitized |
| `update_post` | Update any fields of an existing post |
| `publish_post` | Set status to `published` or `draft` |
| `delete_post` | Permanently delete a post |

#### Case studies

| Tool | What it does |
|------|-------------|
| `list_case_studies` | List case studies with optional status filter |
| `get_case_study` | Fetch a single case study by id or slug |
| `create_case_study` | Create a case study with structured headline, meta, sections |
| `update_case_study` | Update any fields of an existing case study |
| `publish_case_study` | Set status to `published` or `draft` |
| `delete_case_study` | Permanently delete a case study |

#### Images

| Tool | What it does |
|------|-------------|
| `upload_image_from_url` | Download a public image URL and store it in Vercel Blob |
| `upload_image` | Upload base64 image data and return a permanent URL |

Use the returned URL in `coverImage`, `ogImage`, `leadImage.src`, or section `media.src` fields.

### Example workflow

1. `upload_image_from_url` — host a hero image → get blob URL
2. `create_case_study` — pass the URL in `leadImage.src`
3. `publish_case_study` — set status to `published`

Changes appear on the live site and in `sitemap.xml` within ~60 seconds.
