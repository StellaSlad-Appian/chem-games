# Stage 7 — Cloudflare Registrar availability & price check

**Run date:** 2026-08-26 · **Domains checked:** 43 (39 `game` EMDs + 4 brandables) · **All 43 still available**

---

## 1. Token verification

| Check | Result |
|---|---|
| `GET /accounts/{acct}/tokens/verify` | **200** — `{"id":"5b436cd185c4fce1c7f0314721b659c9","status":"active"}` |
| `GET /user/tokens/verify` | 401 `Invalid API Token` — expected; this is an account-owned (`cfat_`) token, not a user token |

Token is valid and active against account `230f00b66f1c26495b5da40b911f97bf`.

## 2. Endpoints probed

Raw request/response logs: `raw/cf_registrar_probes.json`, `raw/cf_registrar_probes_round2.json`.

| Method | Endpoint | Status | What it returned |
|---|---|---|---|
| GET | `/registrar/domains` | **200** | Full list of domains **already on the account** (registration dates, NS, contacts, `available:false`, `can_register`, `premium_type`) |
| GET | `/registrar/domains/{domain}` (account-owned) | **200** | Full object incl. `available`, `can_register`, `premium_type` |
| GET | `/registrar/domains/{domain}` (not owned) | **200** | **Only** `{"name":…, "supported_tld":true}` — no availability, no price |
| POST | `/registrar/domains/search` `{"query":…}` | **403** | `You are not authorized to perform a search` |
| POST | `/registrar/domains/search` `{"domain":…}` / `{"name":…}` | **422** | `Required fields are not present — resource: Domain, field: query, code: missing` |
| GET | `/registrar/domains/{domain}/availability` | 404 | `Page not found` |
| GET | `/registrar/domains/{domain}/available` | 404 | `Page not found` |
| GET | `/registrar/domains/available?name=` | 404 | `Page not found` |
| GET | `/registrar/domains/search?query=` | 404 | `Page not found` |
| GET | `/registrar/domains/pricing` | 404 | `Page not found` |
| GET | `/registrar/domains/{domain}?include=pricing` | 200 | Ignores the param — same bare `{name, supported_tld}` |
| GET | `/registrar/search`, `/registrar/availability`, `/registrar/tlds`, `/registrar/pricing`, `/registrar/prices`, `/registrar/tld_pricing`, `/registrar/contacts`, `/registrar/domain_search`, `/registrar/transfer_in/{d}` | 404 | `Unable to authenticate request` (code 10001) — path not routed for token auth |

### What the API can and cannot do

**Can:** enumerate and inspect domains already registered in the account; confirm a TLD is supported by Cloudflare Registrar (`supported_tld:true` for all 43).

**Cannot:** return availability or price for a domain the account does not own.

The one meaningful finding is `POST /registrar/domains/search`. The 403/422 pair proves this endpoint **exists** and its schema **requires a `query` field** — sending the wrong field name produces a schema error, while sending the correct one produces an authorization error. This is the endpoint the Cloudflare dashboard's "Register Domains" search calls, and it is **not reachable with an API token** regardless of scope (the `cfat_` token carries Registrar Domains Admin and is still refused). It is gated to dashboard session auth. No API token scope will unlock it.

**Conclusion: no price came from the API.** Nothing in `cf_price_usd_year1` is API-sourced; every row is labelled `verisign-wholesale-estimate`.

## 3. Price basis

Cloudflare publishes **no numeric `.com` price** on any public page. Saved for the record: `raw/cf_registrar_page.html`, `raw/cf_registrar_page_au.html`, `raw/cf_docs_registrar.html`, `raw/cf_docs_register_domain.html`, `raw/cf_pricing.html`. What they do state (Cloudflare Registrar docs, verbatim):

> "…will only charge you what is paid to the registry for your domain. **No markup. No surprise fees.**"
> "You only pay what is charged by registries and ICANN."

So the price is reconstructed from the two pass-through components:

| Component | Amount | Source |
|---|---|---|
| Verisign `.com` registry fee | $10.26 / yr | Current wholesale rate |
| ICANN transaction fee | $0.18 / yr | Fixed, all gTLDs |
| **Total (register today)** | **$10.44 / yr** | `verisign-wholesale-estimate` |

**Time-sensitive:** Verisign raises the `.com` wholesale fee **7% to $10.97 effective 1 November 2026** ([Domain Name Wire](https://domainnamewire.com/2026/04/23/breaking-verisign-raising-wholesale-com-prices/)). From that date the at-cost price becomes **$11.15/yr**. Registering before 1 Nov 2026 locks year one at $10.44 — a ~$7 saving across ten domains, and more importantly it front-runs the first of four consecutive annual 7% hikes (heading toward ~$13.42 by the end of the contract cycle).

Treat $10.44 as accurate ±$0.20. Confirm the exact figure at checkout — the dashboard shows it before payment.

## 4. Availability re-confirmation

Fresh Verisign RDAP sweep (`https://rdap.verisign.com/com/v1/domain/{d}`, plain `httpx`, 404 = available) at **2026-08-26 16:59:53**:

- **43 / 43 returned 404 — all still available.**
- **Zero changes** versus the earlier 16:22 sweep. No domain in this set was registered today.
- Raw: `raw/rdap_recheck_fresh.json` (compare against `raw/rdap_recheck_20260826.json`).

`cf_available` is recorded as `unknown` for every row — RDAP proves the domain is unregistered at the registry, but only Cloudflare's own search can confirm it is registrable *through Cloudflare* (premium-tier pricing is the usual reason a technically-available `.com` costs more than at-cost). All 43 returned `supported_tld:true`, so none are on an unsupported TLD; `raw/cf_per_domain_43.json` holds the responses.

## 5. Top 10 buy list

Scored `0.50 × log(cluster volume) + 0.40 × log(exact keyword volume) + 0.10 × label brevity`, then deduplicated to **one domain per topic group** so the list isn't four near-identical molecule-builder variants. Full 43-row scoring in `07_registrar_check.csv`; raw scores in `raw/_s7_scores.json`.

| # | Domain | Exact kw/mo | Cluster/mo | Len | Why |
|---|---|---|---|---|---|
| 1 | **quizperiodictable.com** | 6,600 | 180,970 | 17 | Largest cluster in the entire set and the highest exact-match volume. Highest-demand domain available, by a wide margin. |
| 2 | **practicebalancingequations.com** | 5,400 | 152,360 | 26 | "Practice" framing matches tool/solver intent better than "game", and beats the game-variant on exact volume 14:1. |
| 3 | **quizchemistry.com** | 1,900 | 16,320 | 13 | Shortest strong label in the set — best general-chemistry brandable available. |
| 4 | **gamesinchemistry.com** | 1,900 | 10,860 | 16 | Shortest of five hub variants; natural umbrella domain for the whole games vertical. |
| 5 | **statesofmattergame.com** | 480 | 1,400 | 18 | Only candidate for its topic — no near-duplicate competes for the same query. |
| 6 | **chemistrycheatsheet.com** | 720 | — | 19 | Topic-agnostic brandable; works as a standalone lead-magnet property, not just a one-page EMD. |
| 7 | **chemistryreactiongames.com** | 90 | 1,530 | 22 | Best entry to the reaction-types cluster; outranks both siblings on exact volume. |
| 8 | **acidbasegame.com** | 30 | 160 | 12 | Shortest label in the whole set; only acid/base variant with non-zero exact volume. |
| 9 | **buildamoleculegame.com** | 50 | 150 | 18 | Natural verb phrase reads better than the "moleculebuilder" variants at identical volume. |
| 10 | **organicchemistrygames.com** | 170 | 40 | 21 | Highest exact volume of any organic candidate (17× the next best); short enough to serve as the organic topic hub. |

**Estimated first-year total: 10 × $10.44 = $104.40** (before 1 Nov 2026). After 1 Nov: $111.50. All 43 would be $448.92.

The top 4 carry 360,510/mo of combined cluster volume — 99% of the demand in this set — so a $41.76 four-domain buy captures nearly all the value if you want to stay minimal.

## 6. How to actually register

Cloudflare Registrar has **no public API for new registrations**. `POST /registrar/domains/search` is dashboard-session-gated (§2), and the REST API only manages domains already in the account. Registration is dashboard-only:

1. Log in to `dash.cloudflare.com` → select account `230f00b66f1c26495b5da40b911f97bf`.
2. **Domain Registration → Register Domains**.
3. Search each domain. **Check the displayed price** — confirm it reads ~$10.44 and is not flagged premium. A premium-tier `.com` can list at many multiples of at-cost; that is the one thing RDAP cannot rule out.
4. Add to cart, complete checkout. Cloudflare bundles WHOIS redaction and DNSSEC free.
5. ICANN requires registrant email verification — respond to the verification email or the domain gets suspended.

**Constraint:** Cloudflare Registrar requires each domain's zone to use Cloudflare DNS. Newly registered domains are placed on Cloudflare nameservers automatically, so this is only a consideration if you intend to host DNS elsewhere — in which case Cloudflare Registrar is not usable for that domain.

After registration, `GET /accounts/{acct}/registrar/domains` will list them with full detail and the API becomes useful for management (auto-renew, nameservers, contacts, locks).
