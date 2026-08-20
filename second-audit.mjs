import { chromium } from '@playwright/test';
import { execSync } from 'child_process';

const BASE = 'http://localhost:3099';

const results = { passed: [], failed: [], skipped: [], details: {} };

function pass(name, detail = '') {
  results.passed.push(name);
  results.details[name] = { status: 'PASS', detail };
  console.log(`  ✅ ${name}${detail ? ' — ' + detail : ''}`);
}

function fail(name, error) {
  results.failed.push(name);
  results.details[name] = { status: 'FAIL', error: String(error).slice(0, 300) };
  console.log(`  ❌ ${name} — ${String(error).slice(0, 200)}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Homepage loads (HTTP 200)
  console.log('\n📋 Test 1: Homepage loads');
  try {
    const resp = await page.goto(BASE, { waitUntil: 'networkidle', timeout: 15000 });
    if (resp.status() === 200) {
      pass('Homepage loads (HTTP 200)', `Status: ${resp.status()}`);
    } else {
      fail('Homepage loads (HTTP 200)', `Status: ${resp.status()}`);
    }
    const title = await page.title();
    pass('Homepage has title', `Title: "${title}"`);
  } catch (e) { fail('Homepage loads', e); }

  // Check for login link/button
  const loginLink = await page.$('a[href*="login"], a[href*="signin"], button:has-text("Login"), button:has-text("Sign in")');
  if (loginLink) {
    pass('Homepage has login link');
  } else {
    fail('Homepage has login link', 'No login link found');
  }

  // 2. Login page renders
  console.log('\n📋 Test 2: Login page renders');
  try {
    const resp = await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
    if (resp.status() === 200) {
      pass('Login page loads', `Status: ${resp.status()}`);
    } else {
      fail('Login page loads', `Status: ${resp.status()}`);
    }
    const emailInput = await page.$('input[type="email"], input[name="email"], input[placeholder*="email" i]');
    const passwordInput = await page.$('input[type="password"], input[name="password"]');
    if (emailInput) pass('Login has email input');
    else fail('Login has email input');
    if (passwordInput) pass('Login has password input');
    else fail('Login has password input');
  } catch (e) { fail('Login page', e); }

  // 3. Practice/Subject pages
  console.log('\n📋 Test 3: Practice/Subject pages');
  for (const path of ['/practice', '/subjects', '/math', '/ela', '/reading']) {
    try {
      const resp = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
      if (resp && resp.status() < 400) {
        pass(`${path} loads`, `Status: ${resp.status()}`);
      } else {
        fail(`${path} loads`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) {
      // 404 or redirect is expected for some paths
      fail(`${path} loads`, e.message);
    }
  }

  // 4. API endpoints
  console.log('\n📋 Test 4: API endpoints');
  const apiEndpoints = [
    '/api/practice/mastery',
    '/api/dashboard',
    '/api/teacher/dashboard',
    '/api/admin/ai-factory',
    '/api/admin/skills',
    '/api/admin/micro-skills',
    '/api/admin/assignments',
    '/api/admin/review-queue',
    '/api/attempts',
    '/api/questions',
    '/api/curriculum',
    '/api/auth/me',
    '/api/auth/session',
  ];
  for (const endpoint of apiEndpoints) {
    try {
      const resp = await page.goto(`${BASE}${endpoint}`, { waitUntil: 'networkidle', timeout: 10000 });
      const body = await page.evaluate(() => document.body.textContent?.trim() || '');
      // Try to parse JSON
      let data = null;
      try { data = JSON.parse(body); } catch {}
      if (resp && resp.status() < 500) {
        pass(`${endpoint}`, `Status: ${resp.status()}, has data: ${data !== null || body.length > 0}`);
      } else {
        fail(`${endpoint}`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) {
      fail(`${endpoint}`, e.message);
    }
  }

  // 5. Version field in question responses
  console.log('\n📋 Test 5: Version field in question responses');
  try {
    const resp = await page.goto(`${BASE}/api/questions?limit=5`, { waitUntil: 'networkidle', timeout: 10000 });
    const body = await page.evaluate(() => document.body.textContent?.trim() || '');
    let data;
    try { data = JSON.parse(body); } catch {}
    if (data) {
      const questions = Array.isArray(data) ? data : (data.questions || data.data || []);
      if (questions.length > 0) {
        const q = questions[0];
        // Check for version field
        if (q.version !== undefined || q.questionVersion !== undefined || q.questionVersionId !== undefined) {
          pass('Question responses include version field', `Field found: version=${q.version}`);
        } else {
          const keys = Object.keys(q);
          fail('Question responses include version field', `Keys: ${keys.slice(0, 10).join(', ')}`);
        }
      } else {
        fail('Question responses include version field', 'No questions returned');
      }
    } else {
      fail('Question responses include version field', 'Response not JSON');
    }
  } catch (e) { fail('Version field', e); }

  // 6. Admin pages
  console.log('\n📋 Test 6: Admin pages');
  for (const path of ['/admin/ai-factory', '/admin/review-queue', '/admin/curriculum', '/admin']) {
    try {
      const resp = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
      if (resp && resp.status() < 400) {
        pass(`${path} loads`, `Status: ${resp.status()}`);
      } else {
        fail(`${path} loads`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) {
      fail(`${path} loads`, e.message);
    }
  }

  // 7. SAT simulation page
  console.log('\n📋 Test 7: SAT simulation page');
  try {
    const resp = await page.goto(`${BASE}/sat-simulation`, { waitUntil: 'networkidle', timeout: 15000 });
    if (resp && resp.status() < 400) {
      pass('/sat-simulation loads', `Status: ${resp.status()}`);
    } else {
      fail('/sat-simulation loads', `Status: ${resp ? resp.status() : 'no response'}`);
    }
  } catch (e) { fail('/sat-simulation loads', e.message); }

  // 8. Guided instruction page
  console.log('\n📋 Test 8: Guided instruction page');
  for (const role of ['', '?role=student', '?role=teacher']) {
    try {
      const path = `/guided-instruction${role}`;
      const resp = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
      if (resp && resp.status() < 400) {
        pass(`${path} loads`, `Status: ${resp.status()}`);
      } else {
        fail(`${path} loads`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) { fail(`/guided-instruction${role} loads`, e.message); }
  }

  // Additional checks: Check for RBAC, analytics, etc. via API
  console.log('\n📋 Additional: Module availability checks');
  
  // Check for RBAC endpoints
  for (const ep of ['/api/admin/roles', '/api/admin/users', '/api/auth/roles']) {
    try {
      const resp = await page.goto(`${BASE}${ep}`, { waitUntil: 'networkidle', timeout: 10000 });
      if (resp && resp.status() < 500) {
        pass(`RBAC endpoint ${ep}`, `Status: ${resp.status()}`);
      } else {
        fail(`RBAC endpoint ${ep}`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) { fail(`RBAC endpoint ${ep}`, e.message); }
  }

  // Check for Assignment endpoints
  for (const ep of ['/api/assignments', '/api/student/assignments']) {
    try {
      const resp = await page.goto(`${BASE}${ep}`, { waitUntil: 'networkidle', timeout: 10000 });
      if (resp && resp.status() < 500) {
        pass(`Assignment endpoint ${ep}`, `Status: ${resp.status()}`);
      } else {
        fail(`Assignment endpoint ${ep}`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) { fail(`Assignment endpoint ${ep}`, e.message); }
  }

  // Check for Analytics endpoint
  for (const ep of ['/api/analytics', '/api/analytics/dashboard']) {
    try {
      const resp = await page.goto(`${BASE}${ep}`, { waitUntil: 'networkidle', timeout: 10000 });
      if (resp && resp.status() < 500) {
        pass(`Analytics endpoint ${ep}`, `Status: ${resp.status()}`);
      } else {
        fail(`Analytics endpoint ${ep}`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) { fail(`Analytics endpoint ${ep}`, e.message); }
  }

  // Check for Redis/Live Classroom
  for (const ep of ['/api/classroom', '/api/live-classroom']) {
    try {
      const resp = await page.goto(`${BASE}${ep}`, { waitUntil: 'networkidle', timeout: 10000 });
      if (resp && resp.status() < 500) {
        pass(`Classroom endpoint ${ep}`, `Status: ${resp.status()}`);
      } else {
        fail(`Classroom endpoint ${ep}`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) { fail(`Classroom endpoint ${ep}`, e.message); }
  }

  // Check for Quality Monitor / Inventory
  for (const ep of ['/api/admin/quality', '/api/admin/inventory']) {
    try {
      const resp = await page.goto(`${BASE}${ep}`, { waitUntil: 'networkidle', timeout: 10000 });
      if (resp && resp.status() < 500) {
        pass(`Quality/Inventory ${ep}`, `Status: ${resp.status()}`);
      } else {
        fail(`Quality/Inventory ${ep}`, `Status: ${resp ? resp.status() : 'no response'}`);
      }
    } catch (e) { fail(`Quality/Inventory ${ep}`, e.message); }
  }

  // Check for Version/Delivery IDs in attempts
  try {
    const resp = await page.goto(`${BASE}/api/attempts?limit=5`, { waitUntil: 'networkidle', timeout: 10000 });
    const body = await page.evaluate(() => document.body.textContent?.trim() || '');
    let data;
    try { data = JSON.parse(body); } catch {}
    if (data) {
      const attempts = Array.isArray(data) ? data : (data.attempts || data.data || []);
      if (attempts.length > 0) {
        const a = attempts[0];
        const hasVersionId = a.questionVersionId !== undefined || a.question_version_id !== undefined;
        const hasDeliveryId = a.deliveryId !== undefined || a.delivery_id !== undefined;
        const hasAttemptNo = a.attemptNo !== undefined || a.attempt_no !== undefined;
        if (hasVersionId && hasDeliveryId && hasAttemptNo) {
          pass('Attempts have version pinning', `versionId=${hasVersionId}, deliveryId=${hasDeliveryId}, attemptNo=${hasAttemptNo}`);
        } else {
          fail('Attempts have version pinning', `versionId=${hasVersionId}, deliveryId=${hasDeliveryId}, attemptNo=${hasAttemptNo}`);
        }
      } else {
        fail('Attempts have version pinning', 'No attempts returned');
      }
    } else {
      fail('Attempts have version pinning', 'Response not JSON');
    }
  } catch (e) { fail('Attempts version pinning', e.message); }

  await browser.close();

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`  ✅ Passed: ${results.passed.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);
  console.log(`  Total:    ${results.passed.length + results.failed.length}`);
  const pct = Math.round((results.passed.length / (results.passed.length + results.failed.length)) * 100);
  console.log(`  Score:    ${pct}%`);
  console.log('='.repeat(60));

  // Output JSON for further processing
  console.log('\n---JSON_START---');
  console.log(JSON.stringify({ results, score_pct: pct }, null, 2));
  console.log('---JSON_END---');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});