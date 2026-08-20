# Practice Buddy — UX Architecture

**Version:** 1.0  
**Status:** Authoritative for all user workflows

---

## 1. Role-Based UX Families

| Role | Philosophy | Density | Navigation |
|------|-----------|---------|------------|
| Student | Simplicity, focus, readability | Low | Top bar (desktop), bottom tabs (mobile) |
| Teacher | Efficiency, control, data | Medium | Left sidebar (desktop) |
| Admin | Visibility, management | High | Left sidebar |

---

## 2. Student IA

```
Home
├── Continue (last skill practiced)
├── Assigned Work
├── Recommended Practice
└── Quick Stats

Practice
├── Select Subject (Math / English / MAP / SAT)
└── Select Skill → Questions

Assignments
├── Active → Questions
└── Completed → Results

Progress
├── Overall
├── By Subject → Domain → Skill
└── By Assignment

Profile
├── Name, Grade, School
├── Settings
└── Logout
```

---

## 3. Teacher IA

```
Dashboard → Classes → Assign → Practice → Students → Reports → Content → Settings
```

---

## 4. Admin IA

```
Overview → Organizations → Schools → Users → Curriculum → Content → Analytics → Settings
```

---

## 5. Practice Screen (Most Important UI)

**Layout:**
```
[Minimal Header]  ← Skill name + back button only
[Skill Context]   ← Brief skill/goal text
[Question/Passage] ← Centered, max-width 45rem
[Answer Area]     ← Interactive choices
[Submit]          ← Primary action
[Feedback]        ← After submission only
```

**NOT shown during active practice:**
- Sidebars, dashboard widgets, recommendations, ads, promotions, unrelated navigation

---

## 6. Two-Attempt State Machine

```
IDLE → SELECTED → SUBMITTED_A1 → {CORRECT_A1 → EXPLANATION → NEXT}
                                 → {INCORRECT_A1 → STRATEGY → SELECTED_A2 → SUBMITTED_A2
                                    → {CORRECT_A2 → EXPLANATION → NEXT}
                                    → {INCORRECT_A2 → EXPLANATION + CORRECT ANSWER → NEXT}}
```

---

## 7. Responsive Breakpoints

| Name | Width | Layout |
|------|-------|--------|
| Phone | 320–639px | Single column, bottom tabs |
| Tablet | 640–1023px | Single column, top bar |
| Desktop | 1024–1279px | Full layout, left sidebar (teacher/admin) |
| Wide | 1280px+ | Max-width container, centered |

---

## 8. SAT Test Simulation UX

**Separate from Skill Practice:**
- Timed modules with navigation
- No teaching feedback during module
- Flag-for-review
- Post-test analysis only after submission
- Calculator integration where permitted