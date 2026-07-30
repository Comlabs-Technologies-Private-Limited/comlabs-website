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

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_TO_EMAIL = "hello@comlabstechnologies.com";
const DEFAULT_FROM_EMAIL = "ComLabs Website <onboarding@resend.dev>";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
  
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
      { error: "Please add a little more detail about the requirement." },
      { status: 400 },
    );
  }

  return { name, email, message };
}

function buildEmail({ name, email, message }: ContactSubmission) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return {
    from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL],
    reply_to: email,
    subject: `New ComLabs requirement from ${name}`,
    text: [
      "You have a new requirement from the ComLabs website.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Requirement:",
      message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 20px; margin: 0 0 16px;">New ComLabs requirement</h1>
        <p style="margin: 0 0 16px;">You have a new requirement from the ComLabs website.</p>
        <table style="border-collapse: collapse; margin-bottom: 16px;">
          <tr>
            <td style="padding: 4px 12px 4px 0; color: #6b7280;">Name</td>
            <td style="padding: 4px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 4px 12px 4px 0; color: #6b7280;">Email</td>
            <td style="padding: 4px 0;">${safeEmail}</td>
          </tr>
        </table>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
          ${safeMessage}
        </div>
      </div>
    `,
  };
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

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildEmail(submission)),
  });

  if (!response.ok) {
    return Response.json({ error: "Could not send the requirement email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
