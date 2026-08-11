import { createMcpHandler } from "mcp-handler";

import { isMcpConfigured, mcpUnauthorizedResponse, verifyMcpAuth } from "@/lib/mcp/auth";
import { registerComlabsMcpTools } from "@/lib/mcp/register-tools";

const mcpHandler = createMcpHandler(
  (server) => {
    registerComlabsMcpTools(server);
  },
  {
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
