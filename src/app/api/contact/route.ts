import { sendContactEmail } from "@/lib/mail";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload): ContactSubmission | Response {
  const name = clean(payload.name).slice(0, 120);
  const email = clean(payload.email).slice(0, 160).toLowerCase();
  const message = clean(payload.message).slice(0, 4000);
  const company = clean(payload.company);

  if (company) {
    return Response.json({ ok: true }, { status: 200 });
  }

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (message.length < 20) {
    return Response.json(
      { error: "Please add a little more detail about your project." },
      { status: 400 },
    );
  }

  return { name, email, message };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const submission = validatePayload(payload);

  if (submission instanceof Response) {
    return submission;
  }

  try {
    await sendContactEmail(submission);
  } catch (error) {
    if (error instanceof Error && error.message === "SMTP_NOT_CONFIGURED") {
      console.error("[contact] SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.");
      return Response.json(
        { error: "Email service is not configured. Please try again later or email us directly." },
        { status: 503 },
      );
    }

    console.error("[contact] Failed to send email:", error);
    return Response.json(
      { error: "We could not send your message. Please try again in a few minutes." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
