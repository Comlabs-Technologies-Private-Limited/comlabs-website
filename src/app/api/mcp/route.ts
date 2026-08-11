import { createMcpHandler } from "mcp-handler";

import { isMcpConfigured, mcpUnauthorizedResponse, verifyMcpAuth } from "@/lib/mcp/auth";
import { registerComlabsMcpTools } from "@/lib/mcp/register-tools";

const MCP_SERVER_INSTRUCTIONS = `You are connected to the Comlabs Technologies CMS via API tools.

ALWAYS use these MCP tools to manage content. NEVER open the admin website, Cloud Browser, or ask the user to sign in — authentication is already handled by the MCP connection.

Workflow:
1. list_posts / list_case_studies — browse existing content
2. create_draft_post / create_case_study — create new content (status defaults to draft)
3. upload_image_from_url — host images before referencing URLs in posts or case studies
4. update_post / update_case_study — edit existing content
5. publish_post / publish_case_study — set status to "published" when the user confirms

Blog content should be HTML. SEO fields (metaTitle, metaDescription, excerpt) are auto-generated when omitted.`;

const mcpHandler = createMcpHandler(
  (server) => {
    registerComlabsMcpTools(server);
  },
  {
    instructions: MCP_SERVER_INSTRUCTIONS,
    serverInfo: {
      name: "comlabs-admin",
      version: "1.0.0",
    },
  },
);

async function handleMcpRequest(request: Request): Promise<Response> {
  if (!isMcpConfigured()) {
    return new Response(
      JSON.stringify({
        error: "Service unavailable",
        message: "MCP_API_KEY is not configured on the server.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!verifyMcpAuth(request)) {
    return mcpUnauthorizedResponse();
  }

  return mcpHandler(request);
}

export const GET = handleMcpRequest;
export const POST = handleMcpRequest;
export const DELETE = handleMcpRequest;
