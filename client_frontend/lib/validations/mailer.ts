import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

/**
 * Returns a cached Nodemailer transporter built from SMTP env vars.
 *
 * Required env vars:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * Optional:
 *   SMTP_SECURE ("true" for port 465), SMTP_FROM (defaults to SMTP_USER)
 */
export function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;

  const port = Number(process.env.SMTP_PORT || 587);

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}