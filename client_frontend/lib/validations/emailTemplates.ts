import { ContactFormInput } from "@/lib/validations/contact";

type TemplateInput = Omit<ContactFormInput, "captchaAnswer" | "captchaToken">;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function wrapper(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0b1120;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1120;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#131e35;border:1px solid rgba(201,168,76,0.25);border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#0b1120,#1a2845);padding:24px 28px;border-bottom:2px solid #eab308;">
                <span style="font-size:20px;letter-spacing:2px;color:#eab308;font-weight:700;text-transform:uppercase;">Virginia Surveillance Force</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;color:#f4f6f8;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background-color:#0b1120;border-top:1px solid rgba(201,168,76,0.15);">
                <span style="font-size:12px;color:#8898aa;">This is an automated message. Please do not reply directly to this email.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8898aa;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;font-size:14px;color:#f4f6f8;vertical-align:top;">${value}</td>
    </tr>`;
}

export function adminNotificationEmail(data: TemplateInput) {
  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">New Contact Form Submission</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", escapeHtml(data.name))}
      ${row("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#e8c97a;">${escapeHtml(data.email)}</a>`)}
      ${row("Phone", escapeHtml(data.phone))}
      ${row("Address", escapeHtml(data.address))}
      ${row("City / Town", escapeHtml(data.citytown))}
      ${row("State", escapeHtml(data.province))}
      ${row("Zip Code", escapeHtml(data.postalcode))}
    </table>
    <div style="margin-top:20px;padding:16px;background-color:#0b1120;border-left:3px solid #eab308;border-radius:4px;">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8898aa;">Comments</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#f4f6f8;white-space:pre-wrap;">${escapeHtml(data.comments)}</p>
    </div>
  `;
  return {
    subject: `New Contact Inquiry from ${data.name}`,
    html: wrapper("New Contact Form Submission", body),
  };
}

export function userConfirmationEmail(data: TemplateInput) {
  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">Thanks for reaching out, ${escapeHtml(
      data.name
    )}!</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(244,246,248,0.85);">
      We&rsquo;ve received your message and a member of our team will get back to you shortly.
      Below is a copy of what you submitted for your records.
    </p>
    <div style="margin-top:8px;padding:16px;background-color:#0b1120;border-left:3px solid #eab308;border-radius:4px;">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8898aa;">Your Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#f4f6f8;white-space:pre-wrap;">${escapeHtml(data.comments)}</p>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#8898aa;">If you didn&rsquo;t submit this request, please disregard this email.</p>
  `;
  return {
    subject: "We've received your message",
    html: wrapper("Thanks for contacting us", body),
  };
}

export function adminGenericFormEmail(title: string, data: any, emailField: string = "fromemail") {
  const rowsHtml = Object.entries(data)
    .filter(([key, val]) => val && key !== 'captchaToken' && key !== 'captchaAnswer' && (typeof val !== 'object' || Array.isArray(val)))
    .map(([key, val]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').toUpperCase();
      const formattedVal = Array.isArray(val) ? val.join(", ") : String(val);
      return row(formattedKey, escapeHtml(formattedVal));
    })
    .join("");

  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">New ${title} Submission</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${rowsHtml}
    </table>
  `;

  let replyTo = data[emailField] || data.email;

  return {
    subject: `New ${title} Submission`,
    html: wrapper(`New ${title}`, body),
    replyTo,
  };
}

export function userGenericFormEmail(title: string, data: any, nameField: string = "requestor") {
  const name = escapeHtml(data[nameField] || data.name || "Customer");
  
  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">Thanks for reaching out, ${name}!</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(244,246,248,0.85);">
      We&rsquo;ve received your <strong>${title}</strong> and a member of our team will get back to you shortly.
    </p>
    <p style="margin:20px 0 0;font-size:13px;color:#8898aa;">If you didn&rsquo;t submit this request, please disregard this email.</p>
  `;
  return {
    subject: `We've received your ${title}`,
    html: wrapper("Thanks for contacting us", body),
  };
}