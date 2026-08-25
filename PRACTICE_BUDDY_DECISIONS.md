# Practice Buddy — Decision Log

## Last Updated: 2026-08-21

| # | Date | Decision | Rationale | Author |
|---|------|----------|-----------|--------|
| 1 | 2026-08-20 | Decouple from AEEG | Practice Buddy must be a standalone product | M2 |
| 2 | 2026-08-20 | Remove 15 AEEG routes | Out of scope (ACT, IELTS, TOEFL, etc.) | M2 |
| 3 | 2026-08-20 | Dark navy + gold identity | Original PB design, zero purple | M2 |
| 4 | 2026-08-20 | Student-first homepage | No marketing pages, no B2B | M2 |
| 5 | 2026-08-20 | Delete 8 marketing pages | blog, about, faqs, pricing, etc. | M2 |
| 6 | 2026-08-21 | 38 DB tables (10 new models) | Required by Master Architecture | M2 |
| 7 | 2026-08-21 | Seed curriculum programmatically | 87KB seed script vs manual entry | M2 |
| 8 | 2026-08-21 | Idempotent seeds via hash upsert | Safe to re-run without duplication | M2 |
| 9 | 2026-08-21 | MAP Math reuses Core Math skills | No curriculum duplication via RIT mappings | M2 |
| 10 | 2026-08-21 | Gold: 10/micro-skill, 3/4/3 difficulty | Architecture requirement | M2 |
| 11 | 2026-08-21 | RITBand model separate from Skill | Clean separation of assessment from curriculum | M2 |
| 12 | 2026-08-21 | **Public brand = Lumaani** | Persian "elegant," luminous associations, domain available | M2 |
| 13 | 2026-08-21 | Positioning: PRACTICE. LEARN. MASTER. | Reflects two-attempt pedagogy | M2 |
| 14 | 2026-08-21 | Palette: Deep teal + warm gold | Calm, premium, MENA-appropriate, spans ages 8–18 | M2 |
| 15 | 2026-08-21 | Logo: Abstract L + light ray | Guidance/illumination metaphor, works at 16px | M2 |
| 16 | 2026-08-21 | Internal repo stays `practicebuddy` | No unnecessary churn | M2 |
| 17 | 2026-08-21 | `lumaani.com` as primary domain | Clean, memorable, brand matches | M2 |
| 18 | 2026-08-21 | Conditional acceptance (69%) | 3 blockers: K–2, MAP full, gold scaling | M2 |
|| 19 | 2026-08-22 | Nightly Assurance Cron Job | Permanent Hermes cron: 03:30 Cairo daily, 30-stage pipeline, conservative first-run mode, Telegram-ready | M2 |
|| 20 | 2026-08-25 | AEEG contamination mass-removal | 14 source file locations fixed (1 deferred: SAT Prep page requires content system overhaul) | Cron-NA |