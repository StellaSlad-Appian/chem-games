// src/lib/explore/prose.ts
//
// Turning an entry's own prose into a search-result description.
//
// A permalink's `<meta name="description">` has to come from the entry rather
// than be written a second time: 40 entries in six languages is 240 hand-written
// descriptions that would go stale the moment a paragraph was edited, and the
// paragraph already says the thing.
//
// What a search engine shows is roughly the first 150–160 characters, and it
// cuts mid-word if you hand it a whole 90-word paragraph. So the description is
// built from **whole sentences** — the first one, plus the second if the first
// is too short to say anything — and never truncated with an ellipsis. A clause
// that stops halfway reads as broken; a short true sentence does not.

/**
 * The length at which one sentence is already a description.
 *
 * Deliberately well below the ~155 characters a search result shows, not at it.
 * Measured over the pool: at 110 most entries picked up a second sentence and
 * landed around 200 characters, which is *past* the cut — so the reader saw a
 * truncated two-sentence description instead of a whole one-sentence one. At 90
 * the long openers stand alone and only the genuinely terse ones ("Table salt.",
 * "Crystals repeat.") take a partner.
 */
const TARGET_LENGTH = 90;

/** Two sentences is the most a description gets, however short they are. */
const MAX_SENTENCES = 2;

/**
 * Splits prose into sentences.
 *
 * The lookbehind alone would break German and Italian dates — "Am 8. April
 * 1982", "il 4. secolo" — so a one- or two-digit number followed by a full stop
 * and a letter is masked first, exactly as `readability.test.ts` does and for
 * the same reason. The digit run is capped at two deliberately: a year ("Sony
 * nel 1991. Yoshino ha diviso…") is a real sentence break.
 *
 * The two copies are not ideal, but the test is a gate over the whole pool and
 * this is a formatter over one field, and importing a test file into shipped
 * code is worse than nine duplicated lines. Both carry this comment so that
 * whoever changes one goes looking for the other.
 */
export function sentences(text: string): string[] {
  return text
    .replace(/(?<!\d)(\d{1,2})\.(\s+\p{L})/gu, '$1$2')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.replace(//g, '.').trim())
    .filter((sentence) => sentence.length > 1);
}

/**
 * The opening of a block of prose, in whole sentences, for a meta description.
 *
 * Returns the trimmed input unchanged when it holds no sentence-ending
 * punctuation at all, which is the honest answer rather than an empty string.
 */
export function openingSentences(text: string): string {
  const parts = sentences(text);
  if (parts.length === 0) return text.trim();

  let description = parts[0];
  for (let i = 1; i < parts.length && i < MAX_SENTENCES; i += 1) {
    if (description.length >= TARGET_LENGTH) break;
    description = `${description} ${parts[i]}`;
  }
  return description;
}
