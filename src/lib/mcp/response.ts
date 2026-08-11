export function mcpTextResult(data: unknown, summary?: string): {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
} {
  const text = summary
    ? `${summary}\n\n${JSON.stringify(data, null, 2)}`
    : JSON.stringify(data, null, 2);

  return {
    content: [{ type: "text", text }],
  };
}

export function mcpError(message: string): {
  content: Array<{ type: "text"; text: string }>;
  isError: true;
} {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}
