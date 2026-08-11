const BEARER_PREFIX = "Bearer ";

function readTokenFromRequest(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (header?.startsWith(BEARER_PREFIX)) {
    const token = header.slice(BEARER_PREFIX.length).trim();
    if (token) return token;
  }

  // ChatGPT plugin UI may not send Bearer headers; accept ?api_key= as fallback.
  const url = new URL(request.url);
  const queryToken = url.searchParams.get("api_key")?.trim();
  return queryToken || null;
}

export function isMcpConfigured(): boolean {
  return Boolean(process.env.MCP_API_KEY?.trim());
}

export function verifyMcpAuth(request: Request): boolean {
  const expected = process.env.MCP_API_KEY?.trim();
  if (!expected) return false;

  const token = readTokenFromRequest(request);
  return token !== null && token === expected;
}

export function mcpUnauthorizedResponse(): Response {
  return new Response(
    JSON.stringify({
      error: "Unauthorized",
      message: "Provide Authorization: Bearer <MCP_API_KEY> or ?api_key=<MCP_API_KEY>",
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "WWW-Authenticate": 'Bearer realm="comlabs-mcp"',
      },
    },
  );
}
