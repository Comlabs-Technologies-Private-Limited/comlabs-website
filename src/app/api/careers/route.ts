import { sendCareersEmail } from "@/lib/mail";

type CareersPayload = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
  portfolio?: unknown;
  message?: unknown;
  company?: unknown;
};

type CareersSubmission = {
  name: string;
  email: string;
  role: string;
  portfolio: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validatePayload(payload: CareersPayload): CareersSubmission | Response {
  const name = clean(payload.name).slice(0, 120);
  const email = clean(payload.email).slice(0, 160).toLowerCase();
  const role = clean(payload.role).slice(0, 120);
  const portfolio = clean(payload.portfolio).slice(0, 300);
  const message = clean(payload.message).slice(0, 4000);
  const company = clean(payload.company);

  if (company) {
    return Response.json({ ok: true }, { status: 200 });
  }

  if (!name || !email || !role || !message) {
    return Response.json(
      { error: "Name, email, role, and a short note are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (portfolio && !isHttpUrl(portfolio)) {
    return Response.json(
      { error: "Portfolio or LinkedIn must be a valid http(s) URL." },
      { status: 400 },
    );
  }

  if (message.length < 20) {
    return Response.json(
      { error: "Please add a little more about what you want to work on." },
      { status: 400 },
    );
  }

  return { name, email, role, portfolio, message };
}

export async function POST(request: Request) {
  let payload: CareersPayload;

  try {
    payload = (await request.json()) as CareersPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const submission = validatePayload(payload);
  if (submission instanceof Response) {
    return submission;
  }

  try {
    await sendCareersEmail(submission);
  } catch (error) {
    if (error instanceof Error && error.message === "SMTP_NOT_CONFIGURED") {
      console.error(
        "[careers] SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.",
      );
      return Response.json(
        {
          error:
            "Email service is not configured. Please try again later or email admin@comlabstechnologies.com.",
        },
        { status: 503 },
      );
    }

    console.error("[careers] Failed to send email:", error);
    return Response.json(
      { error: "We could not send your application. Please try again in a few minutes." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
