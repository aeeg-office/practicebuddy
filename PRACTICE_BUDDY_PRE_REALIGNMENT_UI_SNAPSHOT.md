# Practice Buddy — Pre-Realignment UI Snapshot

**Date:** 2026-08-20
**Method:** Browser accessibility tree capture (Playwright/Headless Chrome)
**Environment:** localhost:3099 (Next.js Dev Server)

---

## Page Inventory

### Public Pages (All exhibit AEEG contamination)

| Page | Status | AEEG Contamination | Notes |
|------|--------|-------------------|-------|
| `/` (Homepage) | ✅ HTTP 200 | **HIGH** — Footer: ACT/IELTS/TOEFL links. Hero: "American Egyptian Education Group" referenced in testimonials. Logo: `/aeeg-logo.svg`. Nav: ACT/IELTS/TOEFL/IB/IGCSE/Academic English/DET | |
| `/login` | ✅ HTTP 200 | **HIGH** — Footer has ACT/IELTS/TOEFL. Nav has AEEG programs | |
| `/register` | ❌ HTTP 404 | — | Missing page |
| `/practice` | ✅ HTTP 200 | **HIGH** — Footer has ACT/IELTS/TOEFL programs | |
| `/practice/math` | ✅ HTTP 200 | **HIGH** — Footer/Nav contamination | |
| `/practice/reading` | ✅ HTTP 200 | **HIGH** — Footer/Nav contamination | |
| `/dashboard` | ✅ HTTP 200 | **HIGH** — Footer/Nav contamination | No student content (auth required) |
| `/subjects` | ✅ HTTP 200 | Contaminated | |
| `/about` | ✅ HTTP 200 | Contaminated | |
| `/contact` | ✅ HTTP 200 | Contaminated - WhatsApp button | |
| `/blog` | ✅ HTTP 200 | Contaminated | |
| `/faqs` | ✅ HTTP 200 | Contaminated | |
| `/pricing` | ✅ HTTP 200 | Contaminated | |
| `/privacy` | ✅ HTTP 200 | Contaminated | |
| `/compare` | ✅ HTTP 200 | Contaminated | |

### AEEG Program Pages (Out-of-Scope Contamination)

| Page | Status | Classification | Notes |
|------|--------|---------------|-------|
| `/sat-prep` | ✅ HTTP 200 | ✅ KEEP (SAT is in scope) | But is full AEEG marketing page — needs rewrite |
| `/act-prep` | ✅ HTTP 200 | ❌ **REMOVE** | Full AEEG ACT marketing page with pricing/Cairo center |
| `/ielts-prep` | ✅ HTTP 200 | ❌ **REMOVE** | Full AEEG IELTS marketing page |
| `/toefl-prep` | ✅ HTTP 200 | ❌ **REMOVE** | Full AEEG TOEFL marketing page |
| `/academic-english` | ✅ HTTP 200 | ❌ **REMOVE** | AEEG-specific program |
| `/ib` | ✅ HTTP 200 | ❌ **REMOVE** | IB program (not in scope) |
| `/igcse` | ✅ HTTP 200 | ❌ **REMOVE** | IGCSE program (not in scope) |
| `/det` | ✅ HTTP 200 | ❌ **REMOVE** | DET program (not in scope) |

### Learning Pages

| Page | Status | Contamination | Notes |
|------|--------|---------------|-------|
| `/guided-instruction` | ✅ HTTP 200 | Footer/Nav | Auth required for full content |
| `/live-classroom` | ✅ HTTP 200 | Footer/Nav | Auth required for full content |
| `/sat-simulation` | ✅ HTTP 200 | Footer/Nav | |
| `/mock-exams` | ✅ HTTP 200 | Footer/Nav | |
| `/ai-tutor` | ✅ HTTP 200 | Footer/Nav | |
| `/take-diagnostic` | ✅ HTTP 200 | Footer/Nav | |

### Role Pages

| Page | Status | Contamination | Notes |
|------|--------|---------------|-------|
| `/teacher` | ✅ HTTP 200 | **CRITICAL** — Hardcoded AEEG-style teacher "Dr. Ahmed Khalil", IELTS/ACT/TOEFL sessions, AEEG-student names | Requires auth |
| `/parent` | ✅ HTTP 200 | Footer/Nav | |

### Admin Pages

| Page | Status | Contamination | Notes |
|------|--------|---------------|-------|
| `/admin` | ✅ HTTP 200 | **HIGH** — Sidebar says "AEEG Admin Panel" | |
| `/admin/ai-factory` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/analytics` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/questions` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/curriculum` | ❌ HTTP 404 | Empty directory | |
| `/admin/courses` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/exams` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/settings` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/students` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/teachers` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/payments` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/database` | ✅ HTTP 200 | Sidebar contamination | |
| `/admin/review-queue` | ✅ HTTP 200 | Sidebar contamination | |

### Skill/Content Pages

| Page | Status | Contamination |
|------|--------|---------------|
| `/writing` | ✅ HTTP 200 | Footer/Nav |
| `/listening` | ✅ HTTP 200 | Footer/Nav |
| `/speaking` | ✅ HTTP 200 | Footer/Nav |

---

## Key Contamination Details

### 1. Navigation (Header)
- Logo: `/aeeg-logo.svg` (AEEG-specific logo)
- Programs dropdown: SAT (✅), ACT (❌), IELTS (❌), TOEFL (❌), IB (❌), IGCSE (❌), English & Math (✅), Academic English (❌), DET (❌)
- WhatsApp button on every page
- "Take a Diagnostic" link

### 2. Footer
- Logo: `/aeeg-logo.svg`
- Platform column: SAT Prep (✅), ACT Prep (❌), IELTS Prep (❌), TOEFL Prep (❌), English & Math (✅)
- WhatsApp support link

### 3. i18n System
- localStorage key: `aeeg-lang` (AEEG namespaced)
- Hero texts reference "American Egyptian Education Group"
- Navigation labels reference ACT/IELTS/TOEFL/IB/IGCSE/DET/Academic English
- "Since 2011" tagline (AEEG founding year)

### 4. SAT Prep Page
- Title: "Digital SAT Prep Cairo — Expert Tutoring | Practice Buddy"
- "The AEEG Advantage" section with 6 AEEG-specific selling points
- Cairo center pricing ($40-$50/lesson)
- "Enroll Now" buttons (tutoring services, not practice)
- WhatsApp contact
- AEEG-specific FAQs

### 5. ACT Prep Page
- Full AEEG marketing page
- "Since 2011, AEEG has helped thousands..."
- Cairo center pricing
- "Enroll Now" buttons

### 6. Teacher Dashboard
- Hardcoded teacher name: "Dr. Ahmed Khalil"
- Sessions include: "IELTS Speaking", "ACT English Prep", "TOEFL Writing", "IELTS Reading", "SAT Math Intensive"
- Students: Layla Ibrahim, Omar Hassan, Nour El-Din, Mariam Youssef, Sara Mansour, etc.
- WhatsApp Support sidebar

### 7. Admin Panel
- Sidebar title: "AEEG Admin Panel"
- WhatsApp Support link

### 8. Data Files
- `src/data/act-questions.ts` — ACT question data (out of scope)
- `src/data/ielts-questions.ts` — IELTS question data (out of scope)
- `src/data/toefl-questions.ts` — TOEFL question data (out of scope)
- `src/data/est-igcse-questions.ts` — EST/IGCSE questions (out of scope)
- `src/data/myp-dp-questions.ts` — MYP/DP questions (out of scope)
- `src/data/placement-questions.ts` — potentially AEEG-specific

---

## Overall Contamination Assessment

| Category | Contamination Level |
|----------|-------------------|
| Navigation/Header | **CRITICAL** |
| Footer | **CRITICAL** |
| Routes | **CRITICAL** — 8 out-of-scope routes |
| Data Files | **HIGH** — 6 out-of-scope data files |
| Content Files | **CRITICAL** — All reference AEEG programs |
| i18n/Localization | **HIGH** — AEEG-namespaced storage |
| Teacher Dashboard | **CRITICAL** — Hardcoded AEEG-like data |
| Admin Panel | **HIGH** — "AEEG Admin Panel" label |
| Brand Assets | **HIGH** — AEEG logo used site-wide |
| Learning Content | **MODERATE** — SAT content is correct |

**Estimated pages needing cleanup: 30+**
**Estimated files needing cleanup: 40+**