## Practice Buddy Wireframes

### Screens included

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Admin Dashboard** | Tenant-aware overview: stats, recent activity, student list, quick actions |
| 2 | **Student Dashboard** | Program cards (Core/MAP/SAT), assignments, recent sessions, skill mastery |
| 3 | **Practice Session** | Gold-certified question with explanation, question palette, session stats |
| 4 | **Mock Exam** | SAT module view, passage-based questions, timer, progress |
| 5 | **Question Management** | Question bank with Gold/AI/Flagged badges, families view, search/filter |
| 6 | **Program Management** | 3 programs (Core/MAP/SAT), curriculum taxonomy tree, tenant mapping |
| 7 | **Analytics** | Charts, skill distribution, tenant comparison table |
| 8 | **AI Factory** | Generation form, validation results pipeline, gold templates, factory stats |

### Critical gaps addressed visually

- **Program abstraction** → Program cards show Core/MAP/SAT as distinct objects with grade levels
- **Gold Question system** → ⭐ Gold badge on certified questions, family groupings
- **AI Factory** → Dedicated generation interface with validation pipeline
- **Tenant isolation** → Tenant selector, per-tenant data segregation shown in analytics
- **Immutable attempts** → Attempts shown with session history (append-only)

### Open

Navigate between screens using the tabs at the top. All interactions are client-side.