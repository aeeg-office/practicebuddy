# Phase 1: Product Decoupling — Execution Plan

## Order of Operations

1. **Backup files** (done — git commit + tag exists)
2. **Remove out-of-scope ROUTES** (8 directories + sitemap entries)
3. **Remove out-of-scope DATA files** (6 files)
4. **Remove out-of-scope CONTENT files** (36+ files)
5. **Fix HEADER navigation** (remove AEEG programs + logo)
6. **Fix FOOTER navigation** (remove AEEG programs + logo)
7. **Fix i18n** (change `aeeg-lang` key, remove AEEG program translations)
8. **Fix ADMIN layout** (remove "AEEG Admin Panel" label)
9. **Fix API chat prompt** (remove "American Egyptian Education Group")
10. **Fix Teacher Dashboard** (remove hardcoded AEEG data)
11. **Fix SAT Prep page** (rewrite as PB practice, not AEEG marketing)
12. **Fix SITEMAP** (use practicebuddy.app, remove AEEG routes)
13. **Replace brand asset** (aeeg-logo.svg → practice-buddy-logo)
14. **Create Practice Buddy practice-buddy-logo** (simple SVG)
15. **Test everything**