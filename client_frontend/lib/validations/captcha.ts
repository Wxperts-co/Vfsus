import crypto from "crypto";

// IMPORTANT: set CAPTCHA_SECRET in your environment (.env) for production.
const SECRET = process.env.CAPTCHA_SECRET || "dev-only-change-this-secret";
const TTL_MS = 10 * 60 * 1000; // captcha expires after 10 minutes

interface CaptchaPayload {
  answer: number;
  exp: number;
}

function sign(encoded: string): string {
  return crypto.createHmac("sha256", SECRET).update(encoded).digest("base64url");
}

/**
 * Generates a simple numeric captcha question and a signed token.
 * The token encodes the answer + expiry, signed with HMAC so it
 * can be safely round-tripped through the client without a server session.
 */
export function generateCaptcha(): { question: string; token: string } {
  const a = Math.floor(Math.random() * 9) + 1; // 1-9
  const b = Math.floor(Math.random() * 9) + 1; // 1-9
  const ops = ["+", "-", "x"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];

  let answer: number;
  let question: string;

  if (op === "+") {
    answer = a + b;
    question = `${a} + ${b}`;
  } else if (op === "-") {
    const hi = Math.max(a, b);
    const lo = Math.min(a, b);
    answer = hi - lo;
    question = `${hi} - ${lo}`;
  } else {
    answer = a * b;
    question = `${a} x ${b}`;
  }

  const payload: CaptchaPayload = { answer, exp: Date.now() + TTL_MS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const token = `${encoded}.${sign(encoded)}`;

  return { question: `${question} = ?`, token };
}

/** Verifies a captcha token + user-submitted answer. */
export function verifyCaptcha(token: string | null | undefined, userAnswer: number): boolean {
  if (!token || !token.includes(".")) return false;

  const [encoded, sig] = token.split(".");
  const expectedSig = sign(encoded);

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }

  try {
    const payload: CaptchaPayload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (Date.now() > payload.exp) return false;
    return Number.isFinite(userAnswer) && payload.answer === userAnswer;
  } catch {
    return false;
  }
}