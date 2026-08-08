import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  return { host, port, user, pass };
}

function createTransporter(config: SmtpConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port === 587,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildContactEmailContent({ name, email, message }: ContactEmailInput) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return {
    subject: `New Comlabs inquiry from ${name}`,
    text: [
      "You have a new inquiry from the Comlabs website.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 20px; margin: 0 0 16px;">New Comlabs inquiry</h1>
        <p style="margin: 0 0 16px;">You have a new inquiry from the Comlabs website.</p>
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

export async function sendContactEmail(input: ContactEmailInput): Promise<void> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const from = process.env.SMTP_FROM?.trim() || smtp.user;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "admin@comlabstechnologies.com";
  const content = buildContactEmailContent(input);
  const transporter = createTransporter(smtp);

  await transporter.sendMail({
    from,
    to,
    replyTo: input.email,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
}
