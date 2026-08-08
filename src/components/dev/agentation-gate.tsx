"use client";

import dynamic from "next/dynamic";

const AgentationDev =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./agentation-dev").then((mod) => mod.AgentationDev), {
        ssr: false,
      })
    : function AgentationStub() {
        return null;
      };

export function AgentationGate() {
  return <AgentationDev />;
}
