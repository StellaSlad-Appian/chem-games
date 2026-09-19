// src/lib/utils/client-hash.ts
//
// The salted, non-reversible identifier the public write paths rate-limit on.
//
// **The raw IP is never stored anywhere.** What goes into the database is a
// salted SHA-256 of it, which is enough to group submissions from one client
// and not enough to recover the client. The privacy page describes it in those
// terms, and this is the code that has to keep that sentence true.
//
// This lived inside src/lib/actions/feedback.ts until the collaborator sign-up
// needed exactly the same thing. Two copies of a hashing scheme is how the two
// copies end up salted differently, and then a hash means one thing on one
// table and another on the other. So: one implementation, one salt, one
// warning when the salt is unset.
//
// The environment variable keeps its original name, `FEEDBACK_HASH_SALT`,
// rather than gaining a neutral one. Renaming it would silently re-salt every
// hash already in `public.feedback` the moment the new name was set and the
// old one was not, which breaks feedback rate limiting exactly when nobody is
// looking at it. The name is slightly wrong; the alternative is worse.

import { createHash } from 'node:crypto';
import { headers } from 'next/headers';

let warnedAboutFallbackSalt = false;

function getHashSalt(): string {
  const configured = process.env.FEEDBACK_HASH_SALT;
  if (configured) return configured;

  if (!warnedAboutFallbackSalt) {
    warnedAboutFallbackSalt = true;
    console.warn(
      '[ChemGames] FEEDBACK_HASH_SALT is not set; deriving a fallback salt from NEXT_PUBLIC_SUPABASE_URL. Set FEEDBACK_HASH_SALT in production.'
    );
  }
  return `chem-games-feedback-fallback:${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}`;
}

async function getClientIp(purpose: string): Promise<string> {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwardedFor) return forwardedFor;

    const realIp = requestHeaders.get('x-real-ip')?.trim();
    if (realIp) return realIp;
  } catch (err) {
    console.error(`[ChemGames] Could not read request headers for ${purpose}:`, err);
  }
  return 'unknown';
}

/**
 * A salted SHA-256 of the caller's IP, or of the string `unknown` when no
 * address header is present or `headers()` is unavailable. Never throws: a
 * missing header must not cost a reader their submission, it only costs the
 * rate limiter its precision.
 *
 * `purpose` appears in the log line if reading the headers fails, so the two
 * callers are distinguishable in a server log.
 */
export async function getClientHash(purpose: string): Promise<string> {
  const ip = await getClientIp(purpose);
  return createHash('sha256').update(`${getHashSalt()}:${ip}`).digest('hex');
}
