import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'b7f9c2a1e4d8f93c6a2b1d0e9f8c7a6b5c4d3e2f1a9b8c7d6e5f4b3b3d1m3u8';

// Hashing configuration
const SALT = 'vfsus_secure_salt_2026';
const ITERATIONS = 1000;
const KEYLEN = 64;
const DIGEST = 'sha512';

export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SALT, ITERATIONS, KEYLEN, DIGEST).toString('hex');
}

export function signToken(payload: { email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): { email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string };
  } catch (error) {
    return null;
  }
}

export async function getAdminFromSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    console.error('Error reading admin session:', error);
    return null;
  }
}
