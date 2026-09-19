# Privacy policy — draft additions for GDPR grade

Draft copy to take to a lawyer, not finished text. Everything marked `«TO CONFIRM»`
is a fact only you know, and every one of them must be filled in before this goes in
front of a reviewer — a policy with a guessed answer in it is worse than one with a
gap.

**I am not a lawyer and this is not legal advice.** It is a starting draft written to
match what the code in this repository actually does, so that a review is spent on
judgement rather than on fact-finding.

---

## Before anything else: where to put these strings

The existing `privacy` namespace is about 50 keys and lives in
`src/i18n/dictionaries/<locale>.ts`. `src/app/[lang]/layout.tsx` hands the whole
dictionary to `I18nProvider`, so every one of those keys is serialised into the RSC
payload of every page on the site — including game pages that will never render a word
of it. `docs/i18n/README.md` § "The dictionary is a budget, and a game will eat it"
describes this, and the teachers page just hit the same wall.

These additions roughly double the privacy namespace. **Move the whole `privacy`
namespace to a per-page catalogue as part of this work** rather than adding to the
shared dictionary. Same pattern the game catalogues use. Doing it now costs an hour;
doing it after five locales are translated costs five times that.

---

## 1. Lawful basis — the most conspicuous gap

Nothing in the current policy names a lawful basis for anything. GDPR Art. 13(1)(c)
requires it per purpose. Suggested keys, to sit after `collect*` and before `public*`:

```ts
lawfulBasisHeading: 'Why we are allowed to hold it',
lawfulBasisIntro:
  'European and UK law asks us to say, for each thing we store, what entitles us to store it. In plain terms:',

lawfulBasisAccountLabel: 'Your account and your game results.',
lawfulBasisAccountBody:
  'We hold these because you asked us to run the service for you, and we cannot keep your scores or show you your progress without them. In the language of the law, this is performance of a contract with you.',

lawfulBasisProfileLabel: 'Optional profile fields and visibility toggles.',
lawfulBasisProfileBody:
  'These are held on your consent. Every one of them is off or empty until you choose otherwise, and you can withdraw that consent at any time by clearing the field or switching the toggle off at {link}.',

lawfulBasisFeedbackLabel: 'Feedback you send us.',
lawfulBasisFeedbackBody:
  'We hold this because we have a legitimate interest in knowing when the site is wrong, particularly when the chemistry is wrong. You choose what to put in the message.',

lawfulBasisAbuseLabel: 'The hashed identifier that limits abuse.',
lawfulBasisAbuseBody:
  'We hold this because we have a legitimate interest in keeping the feedback form from being flooded. It cannot be reversed into an address and is used for nothing else.',

lawfulBasisCookiesLabel: 'Session and language cookies.',
lawfulBasisCookiesBody:
  'The sign-in cookies are strictly necessary to keep you logged in. The language cookie is set because you chose a language and we have a legitimate interest in opening the site in it next time. Neither needs your consent, and we set no others.',
```

**Why "strictly necessary" matters here.** It is the reason this site needs no cookie
banner in any country. Protect it: the first analytics or advertising tag you add
turns a one-page policy into consent state, per-region logic and a banner on every
page. Treat "no analytics" as a decision you are defending, not a gap you will
eventually fill.

## 2. Where the data physically is, and transfers out

Currently the policy names Supabase, Resend and Google as processors but never says
where any of them process. For a reader in the EU, a transfer to the US is the single
disclosure they are most entitled to. Art. 13(1)(f).

```ts
locationHeading: 'Where your data is held',
locationBody1:
  'The database and the sign-in system run on Supabase infrastructure in «TO CONFIRM: region, e.g. ap-southeast-2 (Sydney)». The site itself is served by «TO CONFIRM: hosting provider and region».',
locationBody2:
  'We are based in Australia, so if you are in the European Economic Area or the United Kingdom your data leaves your country when you use this site. Where that happens, the transfer relies on «TO CONFIRM: the mechanism — standard contractual clauses, or an adequacy decision if your processors are covered by one», and the processors named above are bound by those terms.',
locationBody3:
  'Feedback emails are delivered by Resend, which processes them in «TO CONFIRM». If you sign in with Google, Google receives that sign-in in line with its own privacy policy.',
```

**Go and find out the region before this is drafted properly.** Your Supabase project
region is in the Supabase dashboard under project settings. If the answer turns out to
be a US region, that is not a problem to hide — it is a sentence to write and, possibly,
a decision to revisit.

## 3. The rights you already honour, named

You have built export and deletion. The policy describes them as features. Naming them
as rights costs nothing and is most of what a reviewer will look for.

```ts
rightsHeading: 'Your rights over your data',
rightsIntro:
  'Wherever you live, we will act on all of the following. In the European Economic Area and the United Kingdom they are rights you hold in law; everywhere else we extend them to you anyway, because running two standards would only mean running the worse one somewhere.',

rightsAccess: 'See what we hold about you, and get a copy of it. Both are immediate and self-service at {link}.',
rightsRectify: 'Correct anything that is wrong. Profile fields are yours to edit at {link}; email us for anything else.',
rightsErase: 'Have your account and its data deleted. This is self-service and immediate at {link}.',
rightsRestrict: 'Ask us to stop using your data while a question about it is unresolved.',
rightsObject: 'Object to our using your data where we rely on a legitimate interest, which is the feedback message and the anti-abuse identifier.',
rightsPortability: 'Take your data elsewhere. The download at {link} is machine-readable for exactly this reason.',
rightsWithdraw: 'Withdraw consent for any optional profile field, at any time, by clearing it. Withdrawing does not undo what was shown before you withdrew.',

rightsNoAutomationHeading: 'Automated decisions',
rightsNoAutomationBody:
  'We make no automated decisions about you and do no profiling. Nothing here decides anything about a person: the games score answers, and that is all.',
```

## 4. "Depending on where you live"

One section, three short paragraphs. Not three policies, and no geo-detection — serve
the same text to everyone.

```ts
whereYouLiveHeading: 'Depending on where you live',
whereYouLiveEea:
  'European Economic Area and United Kingdom: the rights above are yours under the GDPR and the UK GDPR. If you think we have handled your data badly, please tell us first — but you can complain to your national data protection authority without going through us, and you do not need our permission to do so.',
whereYouLiveCalifornia:
  'California: we do not sell your personal information and we do not share it for cross-context behavioural advertising. We never have. There is nothing to opt out of, because there is no analytics, advertising or tracking on this site at all.',
whereYouLiveAustralia:
  'Australia: we handle personal information in line with the Privacy Act 1988 and the Australian Privacy Principles. If you are not satisfied with our response to a complaint, you can take it to the Office of the Australian Information Commissioner at {link}.',
```

This replaces `legalBody1` / `legalBody2`, which currently name only the Australian
route. Keep the OAIC link where it is, inside the Australian paragraph.

## 5. Children — the part that actually needs a decision

This is the one place where a single policy genuinely does not resolve the underlying
problem, and it is a question about your **sign-up flow**, not about wording.

GDPR Art. 8 sets the digital age of consent at 16 and lets member states lower it to
13. Your shipping locales chose differently, and your target band is 14–16:

| | Age of consent |
|---|---|
| Germany | 16 |
| France | 15 |
| Spain, Italy | 14 |
| UK | 13 |
| Australia | no fixed age; capacity-based |

So a 14-year-old in Germany cannot lawfully consent to an account on their own; a
14-year-old in Spain can. Suggested additions to the existing `children*` block:

```ts
childrenAgeBody:
  'You need to be at least «TO CONFIRM: the single age you settle on» to create an account. Below that age, a parent, guardian or teacher needs to create it or agree to it, because the law in several countries where this site is read requires their permission for someone your age.',
childrenNoAccountBody:
  'You do not need an account to play. Every game on this site is open to anyone who opens it, and a student who never signs in leaves nothing with us at all. If you are a school and would rather your students did not create accounts, they do not have to.',
```

**My recommendation:** pick one age, apply it everywhere, and make it the strictest of
the set — 16. You lose very little, because playing needs no account and an account
only adds leaderboards and a profile. The alternative, varying the gate by country, means
detecting country, keeping a table of consent ages current, and getting it wrong when
detection misfires.

Then keep doing what you already do, which is most of the UK's Age Appropriate Design
Code without having set out to: generated aliases, every visibility toggle off by
default, no tracking, minimal collection. That code applies to services likely to be
accessed by under-18s, and you are closer to it than most sites that have heard of it.

## 6. The EU/UK representative question

Not copy — a question to put to the lawyer, and the only item here that costs money.

GDPR Art. 27 can require a controller outside the EU who offers services to people in
the EU to appoint a representative inside it; UK GDPR says the same for the UK. There
is an exemption for occasional processing that is low-risk and not large-scale.
**Processing children's data weakens an argument for that exemption**, which is why
this is worth an hour of advice rather than a guess. A representative service runs a
few hundred euros a year if you do need one.

Ask specifically: *"I am an Australian sole operator running a free education site with
optional accounts, used by 14–16 year olds, with four EU language versions. Do I need
an Art. 27 representative, and does the children's-data angle change the answer?"*

If the answer is yes, the policy needs the representative's name and address, and the
draft above needs one more key.

## 7. Two small things while you are in here

- **`whoWeAreBody`** calls you "the data controller". Keep it, and consider adding "and
  an APP entity under the Australian Privacy Act 1988" so the document names both
  regimes for the reader it applies to.
- **`retentionBody1`** says "as long as your account exists". A reviewer will ask what
  happens to an account nobody has touched in three years. Either state a dormancy
  period and build it, or say plainly that there is none — both are defensible, silence
  is not.

## 8. Translation notes

- Legal terms have official renderings in each EU language and must not be translated
  creatively: *Verantwortlicher*, *responsable du traitement*, *responsable del
  tratamiento*, *titolare del trattamento*. Same for *legitimate interests* —
  *berechtigtes Interesse*, *intérêt légitime*, *interés legítimo*, *legittimo
  interesse*.
- "GDPR", "UK GDPR", "Privacy Act 1988", "Australian Privacy Principles", "OAIC" and
  "California" are proper nouns and stay as they are in every locale. Add the matching
  patterns to `IDENTICAL_BY_DESIGN` in `src/i18n/dictionary.test.ts`, or the
  not-actually-translated check will fail the build on them.
- Get the translated policy read by someone in that country, not only by a fluent
  speaker. A privacy policy that reads as machine-translated damages trust more than an
  English-only one would.

## 9. What to actually ask the lawyer

Nearly all of this you can draft yourself from what the code does. Spend the review on:

1. The Art. 27 representative question above.
2. The single age gate for account creation, and whether "a parent or teacher agrees"
   is enough or whether verifiable consent is required at the age you pick.
3. Whether the lawful bases in §1 are the right ones, particularly consent for optional
   profile fields on accounts held by minors.
4. Whether the transfer mechanism in §2 is correctly described once you know the region.

Everything else in this draft is description of fact, and you are the authority on it.
