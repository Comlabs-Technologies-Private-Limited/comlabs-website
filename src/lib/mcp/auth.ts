const BEARER_PREFIX = "Bearer ";

export function isMcpConfigured(): boolean {
  return Boolean(process.env.MCP_API_KEY?.trim());
}

export function verifyMcpAuth(request: Request): boolean {
  const expected = process.env.MCP_API_KEY?.trim();
  if (!expected) return false;

  const header = request.headers.get("authorization");
  if (!header?.startsWith(BEARER_PREFIX)) return false;

  const token = header.slice(BEARER_PREFIX.length).trim();
  return token.length > 0 && token === expected;
}

export function mcpUnauthorizedResponse(): Response {
  return new Response(
    JSON.stringify({
      error: "Unauthorized",
      message: "Provide Authorization: Bearer <MCP_API_KEY>",
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
