import { calcReadingTime } from "@/lib/post-utils";
import type { Post } from "@/types/post";

const TITLE = "When AI agents get stuck in loops";
const SLUG = "when-ai-agents-get-stuck-in-loops";
const EXCERPT =
  "The same tool call, the same observation, the same retry — until cost and latency run away. How agent loops start, how to detect them, and how to stop them before they reach a user.";
const COVER = "/blog/ai-agent-looping-cover.webp";
const PUBLISHED_AT = "2026-08-16T08:00:00.000Z";

const CONTENT = `
<p>Most agent demos look linear. A request comes in, the model thinks, a tool runs, an answer comes back. In production the path is rarely that clean. The model calls a tool, reads an observation that does not quite settle the question, calls the same tool again, and then again. Tokens keep moving. The user waits. The bill does not.</p>
<p>That pattern is agent looping. It is not a dramatic failure. It is a quiet one: the system is busy, confident, and going nowhere.</p>
<h2>What a loop actually is</h2>
<p>A loop is any stretch of an agent run where the <em>state of the world does not change</em>, but the agent keeps acting as if it might. The usual shapes:</p>
<ul>
<li><strong>Tool-call cycles.</strong> The same function, with the same arguments, returns the same payload. The model treats the repeat as new information.</li>
<li><strong>Planner–executor ping-pong.</strong> A planner emits a step. An executor reports it could not finish. The planner emits the same step.</li>
<li><strong>Retry storms.</strong> A flaky tool, a timeout, or a vague error string is read as “try again,” without a backoff, a budget, or a different strategy.</li>
<li><strong>Context amnesia.</strong> Earlier in the window the agent already learned the file does not exist, the API rejected the key, or the user said stop. That turn has scrolled out of attention, so the agent rediscovers the problem from scratch.</li>
</ul>
<p>None of these require a malicious model. They show up in ordinary ReAct-style agents the moment the environment is messy — which is the only environment that matters.</p>
<blockquote>If the observation did not change the state, another call is not progress. It is motion.</blockquote>
<h2>Why agents loop</h2>
<p>Language models are trained to continue. An agent runtime that only says “keep going until you are done” is asking a continuation engine to invent a stopping rule. It will often invent the wrong one.</p>
<p>Four conditions make loops likely:</p>
<ol>
<li><strong>Success is vague.</strong> “Find the answer,” “fix the issue,” “research this” have no checkable done-state. The model cannot tell finished from almost.</li>
<li><strong>Tools are chatty but not decisive.</strong> Search, scrape, and list operations return text that <em>looks</em> useful. They rarely return a structured signal that the question is closed.</li>
<li><strong>Errors are under-specified.</strong> “Failed,” “timeout,” and “not found” all invite a retry. They do not say whether retrying with the same input can ever work.</li>
<li><strong>There is no memory of action.</strong> If the runtime does not hash recent tool calls, the model has to notice the repeat itself. Under pressure, it usually does not.</li>
</ol>
<p>Add a generous step limit — or none — and a loop is not a bug. It is the default.</p>
<h2>How it shows up in a product</h2>
<p>Inside the lab, a loop looks like a long trace. In a product it looks like:</p>
<ul>
<li>A spinner that outlives the user’s patience.</li>
<li>A reply that restates the last three tool results and then asks a question the user already answered.</li>
<li>A cost spike that does not correspond to a better outcome.</li>
<li>A support ticket that says the assistant “got stuck thinking.”</li>
</ul>
<p>Teams often respond by prompting harder: “Do not repeat yourself. If a tool failed, try something else.” That helps until the next ambiguous observation. Prompting is not a control loop. The runtime has to own termination.</p>
<h2>Detect the loop before the twentieth step</h2>
<p>You do not need a research paper to catch most loops. You need a fingerprint.</p>
<p>Hash the last N tool calls as <code>(name, canonical arguments, observation digest)</code>. If the same fingerprint appears twice in a short window, the agent is not exploring. It is orbiting. At that point the runtime should stop proposing the same action and either:</p>
<ul>
<li>force a different tool or a different argument set,</li>
<li>ask the user one precise question, or</li>
<li>end the run with what is already known.</li>
</ul>
<p>Pair that with hard budgets that the model cannot negotiate away:</p>
<ul>
<li>a maximum number of steps per request,</li>
<li>a maximum number of calls per tool,</li>
<li>a wall-clock budget,</li>
<li>a token or cost ceiling.</li>
</ul>
<p>When a budget trips, the user should see a finished thought — “I tried X and Y; here is what I know; here is what I still need” — not a truncated inner monologue.</p>
<h2>Design for stopping, not just acting</h2>
<p>The agents that behave in production are usually less free than the ones in demos. They look more like state machines with an LLM inside a step, and less like an unbounded chat with tools attached.</p>
<p>Practices that hold up:</p>
<p><strong>Write the done-state first.</strong> Before the agent runs, define what “finished” looks like in data: a record created, a file patched, a citation list of length N, a form the user confirmed. If you cannot name it, the model cannot hit it.</p>
<p><strong>Make tools idempotent and typed.</strong> A tool that returns <code>{ status: "unchanged", reason: "already applied" }</code> is worth more than a paragraph of logs. The model can stop. The runtime can stop even if the model does not.</p>
<p><strong>Separate retrieve from decide.</strong> Search and fetch belong in a bounded gather phase. Synthesis belongs after. Mixing them in one ReAct loop is how “one more search” becomes twelve.</p>
<p><strong>Put a human on the expensive edges.</strong> Payments, destructive edits, outbound messages, and anything irreversible should require a checkpoint. A loop that cannot spend or delete is a cheaper loop.</p>
<p><strong>Keep a working scratchpad the model cannot rewrite.</strong> Tool results, user constraints, and rejected plans should live in structured state, not only in the chat transcript. Transcripts drift. State does not, if you refuse to let the model clobber it.</p>
<h2>What we watch when we ship agentic work</h2>
<p>When Comlabs puts an agent behind a real workflow — onboarding, operations, research, support — the trace is part of the product, not an afterthought. We look for:</p>
<ul>
<li>repeat fingerprints per session,</li>
<li>steps that consume tokens without changing state,</li>
<li>tools that account for most of the runtime but little of the outcome,</li>
<li>runs that hit the budget versus runs that reach the done-state.</li>
</ul>
<p>Those numbers tell you whether the agent is working or merely occupied. Occupied is easy to ship. Working takes a stop condition.</p>
<p>Loops will not disappear. Models will keep trying one more time. The job of the system around them is to notice the orbit, close it, and hand a person something they can use.</p>
`.trim();

const readingTime = calcReadingTime(CONTENT);

export const aiAgentLoopingPost: Post = {
  _id: "static:when-ai-agents-get-stuck-in-loops",
  title: TITLE,
  slug: SLUG,
  excerpt: EXCERPT,
  content: CONTENT,
  coverImage: COVER,
  tags: ["Agents", "Product engineering", "Studio notes"],
  status: "published",
  author: "Comlabs Technologies Pvt Ltd",
  publishedAt: PUBLISHED_AT,
  readingTime,
  metaTitle: "When AI Agents Get Stuck in Loops | Comlabs",
  metaDescription: EXCERPT,
  ogImage: COVER,
  canonicalUrl: "",
  createdAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
};
