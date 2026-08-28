#!/usr/bin/env python3
"""Generate 5 Lumaani color-direction HTML proposals from locked tokens."""
import json, os

final = json.load(open("/tmp/lumaani_tokens.json"))
OUT = "/home/qadir/projects/practicebuddy"

def css(t):
    return f""":root{{
  --primary:{t['primary']}; --phover:{t['primary_hover']}; --pactive:{t['primary_active']};
  --secondary:{t['secondary']}; --shover:{t['secondary_hover']};
  --accent:{t['accent']}; --ahover:{t['accent_hover']}; --accentfg:{t['accent_fg']};
  --bg:{t['bg']}; --surface:{t['surface']}; --elevated:{t['elevated']};
  --fg:{t['foreground']}; --muted:{t['muted']};
  --border:{t['border']}; --ring:{t['ring']};
  --success:{t['success']}; --error:{t['error']}; --warning:{t['warning']}; --info:{t['info']};
  --success-light:{t['success_light']}; --error-light:{t['error_light']};
  --warning-light:{t['warning_light']}; --info-light:{t['info_light']};
  --radius:10px;
}}"""

BODY_CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,sans-serif;
  background:var(--bg);color:var(--fg);line-height:1.55;-webkit-font-smoothing:antialiased}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
a{color:var(--primary);text-decoration:none}
h1{font-size:34px;line-height:1.2;letter-spacing:-.01em}
h2{font-size:22px;margin-bottom:6px}
h3{font-size:17px}
p.sub{color:var(--muted);font-size:14px}
/* Nav */
nav{background:var(--surface);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:50}
.nav{display:flex;align-items:center;gap:22px;padding:14px 0}
.logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:20px;color:var(--fg)}
.logo .mark{width:28px;height:28px;border-radius:8px;background:var(--primary);position:relative}
.logo .mark::after{content:'';position:absolute;left:8px;top:6px;width:12px;height:16px;border-radius:3px;
  background:linear-gradient(var(--accent),var(--accent));clip-path:polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)}
.nav-links{display:flex;gap:4px;margin-left:auto;align-items:center}
.nav-links a{color:var(--muted);padding:8px 12px;border-radius:8px;font-size:14px;font-weight:500}
.nav-links a.active,.nav-links a:hover{color:var(--primary);background:var(--elevated)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;
  border-radius:var(--radius);font-weight:600;font-size:14px;padding:10px 18px;transition:.15s ease;
  min-height:44px;text-decoration:none}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:var(--phover)}
.btn-secondary{background:var(--secondary);color:#fff}
.btn-secondary:hover{background:var(--shover)}
.btn-accent{background:var(--accent);color:var(--accentfg)}
.btn-accent:hover{background:var(--ahover)}
.btn-outline{background:transparent;border:1.5px solid var(--border);color:var(--fg)}
.btn-outline:hover{border-color:var(--primary);color:var(--primary)}
.btn:focus-visible,.card:focus-visible,input:focus-visible,select:focus-visible,button:focus-visible{
  outline:3px solid var(--ring);outline-offset:2px}
/* Hero */
.hero{background:linear-gradient(135deg,var(--bg),var(--elevated) 60%);padding:64px 0 56px}
.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
.hero h1{margin-bottom:14px}
.hero p{font-size:17px;color:var(--muted);max-width:520px;margin-bottom:26px}
.hero .cta{display:flex;gap:12px;flex-wrap:wrap}
.hero .trust{margin-top:22px;font-size:13px;color:var(--muted)}
.hero-mock{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px}
/* cards */
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;
  box-shadow:0 1px 2px rgba(16,24,40,.05)}
.card:hover{border-color:var(--primary)}
.card .ic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  font-size:20px;margin-bottom:12px;background:var(--elevated)}
.card h3{color:var(--fg)}
.card p{color:var(--muted);font-size:13px;margin-top:4px}
.section{padding:48px 0}
.section-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px}
/* bars/progress */
.bar{height:8px;background:var(--elevated);border-radius:6px;overflow:hidden;margin:10px 0}
.bar>div{height:100%;background:var(--primary);border-radius:6px}
.bar.accent>div{background:var(--accent)}
.bar.success>div{background:var(--success)}
/* badges */
.badge{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px}
.badge-success{background:var(--success-light);color:var(--success)}
.badge-error{background:var(--error-light);color:var(--error)}
.badge-warning{background:var(--warning-light);color:var(--warning)}
.badge-info{background:var(--info-light);color:var(--info)}
.badge-neutral{background:var(--elevated);color:var(--muted)}
/* question */
.q{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;max-width:760px}
.choice{display:flex;align-items:center;gap:14px;border:1.5px solid var(--border);border-radius:10px;
  padding:14px 16px;margin-top:10px;cursor:pointer;font-size:15px}
.choice:hover{border-color:var(--primary)}
.choice.selected{border-color:var(--primary);background:var(--elevated)}
.choice .dot{width:20px;height:20px;border:2px solid var(--border);border-radius:50%;flex:none}
.choice.selected .dot{border:6px solid var(--primary)}
.choice.correct{border-color:var(--success);background:var(--success-light)}
.choice.incorrect{border-color:var(--error);background:var(--error-light)}
.feedback{border-radius:10px;padding:14px 16px;margin-top:14px;font-size:14px}
.fb-correct{background:var(--success-light);color:var(--success)}
.fb-incorrect{background:var(--error-light);color:var(--error)}
.fb-warning{background:var(--warning-light);color:var(--warning)}
.fb-info{background:var(--info-light);color:var(--info)}
/* programs */
.prog{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px;margin-top:14px;
  display:flex;justify-content:space-between;align-items:center;gap:16px}
.prog b{color:var(--primary)}
/* teacher */
table{width:100%;border-collapse:collapse;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);
  padding:12px 16px;background:var(--elevated)}
td{padding:12px 16px;border-top:1px solid var(--border);font-size:14px}
tr:not(:last-child){border-bottom:1px solid var(--border)}
/* filter/search row */
.toolbar{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;align-items:center}
.input,select{background:#fff;border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 14px;
  font-size:14px;color:var(--fg);min-height:44px}
.input:focus-visible,select:focus-visible{outline:3px solid var(--ring);outline-offset:1px;border-color:var(--primary)}
.field{margin-bottom:16px}
.field label{font-size:13px;font-weight:600;color:var(--fg);display:block;margin-bottom:6px}
.input[disabled]{background:var(--elevated);color:var(--muted);cursor:not-allowed}
/* checkbox/toggle */
.toggle{width:44px;height:24px;background:var(--border);border-radius:999px;position:relative;cursor:pointer}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.15s}
.toggle.on{background:var(--primary)}
.toggle.on::after{left:23px}
/* swatches */
.swatches{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin:18px 0}
.sw{border:1px solid var(--border);border-radius:12px;overflow:hidden;background:var(--surface)}
.sw .swc{height:56px}
.sw .swl{padding:8px 12px;font-size:12px}
.sw .swl b{display:block;font-size:12px;color:var(--fg)}
.sw .swl span{color:var(--muted)}
/* responsive */
@media(max-width:900px){.hero-grid{grid-template-columns:1fr}.grid-3,.grid-4{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.grid-3,.grid-4{grid-template-columns:1fr}.nav-links a:not(.active){display:none}}
footer{background:var(--surface);border-top:1px solid var(--border);padding:28px 0;margin-top:48px;color:var(--muted);font-size:13px}
""" + """

/* Dark mode demo (mobile-ready) */
.dark-demo{background:#0e1419;color:#e6edf1;border-radius:16px;padding:22px;margin-top:24px}
.dark-demo .dm-card{background:#182025;border:1px solid #2a3640;border-radius:10px;padding:16px;margin-top:12px}
"""

def page(opt_key, tokens):
    t = tokens
    name = t["name"]
    # dark-mode primary variant (lightened for dark surfaces)
    dark_primary = {
      "OPTION01_EMERALD":"#2fb188","OPTION02_MOONLIT":"#1f7a7a",
      "OPTION03_FOREST":"#3f8a63","OPTION04_JADE":"#2ba183","OPTION05_COPPER":"#2f8a83",
    }[opt_key]
    h=f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lumaani — {name}</title>
<style>{css(t)}{BODY_CSS}</style></head><body>

<nav><div class="wrap nav">
  <a class="logo" href="#"><span class="mark"></span>Lumaani</a>
  <div class="nav-links">
    <a href="#" class="active">Home</a><a href="#">Practice</a><a href="#">MAP</a>
    <a href="#">SAT</a><a href="#">Teachers</a><a href="#" class="btn btn-primary">Sign in</a>
  </div>
</div></nav>

<div class="hero"><div class="wrap hero-grid">
  <div><h1>Practice smarter.<br>Track your progress. Master every skill.</h1>
    <p>Calm, focused practice for English, Math, MAP &amp; SAT — one screen, one task. Built for students, trusted by parents.</p>
    <div class="cta"><a class="btn btn-primary" href="#">Start free practice</a>
      <a class="btn btn-outline" href="#">Explore subjects</a></div>
    <div class="trust">★★★★★ Trusted by schools &amp; families across Egypt &amp; the MENA region</div>
  </div>
  <div class="hero-mock">
    <b>Continue Practice — Core Math</b>
    <div class="bar accent"><div style="width:68%"></div></div>
    <div style="font-size:13px;color:var(--muted)">Linear equations · 12/18 mastered</div>
    <a class="btn btn-accent" style="margin-top:14px;width:100%" href="#">Resume lesson →</a>
  </div>
</div></div>

<div class="section"><div class="wrap">
  <div class="section-head"><div><h2>Programs for every stage</h2>
    <p class="sub">Grade 3 through SAT — and beyond.</p></div></div>
  <div class="grid-3">
    <div class="card"><div class="ic">📘</div><h3>Core English</h3><p>Reading, writing &amp; grammar for Grades 3–10.</p></div>
    <div class="card"><div class="ic">🔢</div><h3>Core Mathematics</h3><p>Arithmetic to algebra, mastery-based.</p></div>
    <div class="card"><div class="ic">🎯</div><h3>Digital SAT</h3><p>R&amp;W + Math with full-length simulations.</p></div>
    <div class="card"><div class="ic">🧭</div><h3>MAP Practice</h3><p>Math, Reading &amp; Language Usage aligned to RIT.</p></div>
    <div class="card"><div class="ic">🌍</div><h3>IB Diploma</h3><p>Language A/B, Math AA &amp; AI support.</p></div>
    <div class="card"><div class="ic">📈</div><h3>Progress</h3><p>Mastery tracker and growth reports.</p></div>
  </div>
</div></div>

<div class="section" style="background:var(--elevated);padding:28px 0"><div class="wrap">
  <div class="section-head"><h2>Colour system — {name}</h2></div>
  <div class="swatches">
    <div class="sw"><div class="swc" style="background:var(--primary)"></div><div class="swl"><b>Primary</b><span>{t['primary']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--accent)"></div><div class="swl"><b>Accent</b><span>{t['accent']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--secondary)"></div><div class="swl"><b>Secondary</b><span>{t['secondary']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--bg)"></div><div class="swl"><b>Background</b><span>{t['bg']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--fg)"></div><div class="swl"><b>Foreground</b><span>{t['foreground']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--border)"></div><div class="swl"><b>Border</b><span>{t['border']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--success)"></div><div class="swl"><b>Success</b><span>{t['success']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--error)"></div><div class="swl"><b>Error</b><span>{t['error']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--warning);border:1px solid var(--border)"></div><div class="swl"><b>Warning</b><span>{t['warning']}</span></div></div>
    <div class="sw"><div class="swc" style="background:var(--info)"></div><div class="swl"><b>Info</b><span>{t['info']}</span></div></div>
  </div>
</div></div>

<div class="section"><div class="wrap">
  <div class="section-head"><div><h2>Student Dashboard</h2><p class="sub">Sarah, Grade 9 — SAT &amp; Core Math</p></div>
  <a class="btn btn-outline" href="#">View all</a></div>
  <div class="grid-3">
    <div class="card"><div class="ic">▶️</div><h3>Continue Practice</h3><p>Recommended: SAT Math — Algebra</p>
      <div class="bar"><div style="width:68%"></div></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted)">
        <span>68% complete</span><span>12 questions</span></div></div>
    <div class="card"><div class="ic">📚</div><h3>Assignment</h3><p class="sub">History Day essay — due Fri</p>
      <div style="margin-top:10px"><span class="badge badge-warning">Due soon</span></div></div>
    <div class="card"><div class="ic">🏅</div><h3>Mastery</h3><p class="sub">Overall mastery score</p>
      <div style="font-size:34px;font-weight:700;color:var(--primary)">82%</div>
      <div class="bar accent"><div style="width:82%"></div></div>
      <span class="badge badge-success">On track</span></div>
  </div>
</div></div>

<div class="section"><div class="wrap">
  <div class="section-head"><h2>Practice Question</h2></div>
  <div class="q">
    <span class="badge badge-neutral">SAT · Math</span>
    <h3 style="margin:12px 0 4px">If 2x + 6 = 18, what is the value of x?</h3>
    <p class="sub">Choose the correct answer.</p>
    <div class="choice"><span class="dot"></span> A&nbsp;&nbsp;4</div>
    <div class="choice selected"><span class="dot"></span> B&nbsp;&nbsp;7</div>
    <div class="choice"><span class="dot"></span> C&nbsp;&nbsp;6</div>
    <div class="choice"><span class="dot"></span> D&nbsp;&nbsp;9</div>
    <div style="display:flex;gap:12px;margin-top:18px">
      <a class="btn btn-primary" href="#">Submit</a>
      <a class="btn btn-outline" href="#">Hint</a></div>
    <div class="feedback fb-warning">Second attempt — review steps before submitting.</div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px;margin-top:20px">
    <div class="choice correct"><span class="dot"></span> Correct answer feedback</div>
    <div class="choice incorrect"><span class="dot"></span> Incorrect answer feedback</div>
  </div>
</div></div>

<div class="section"><div class="wrap">
  <div class="section-head"><h2>Programs &amp; Tests</h2></div>
  <div class="prog"><div><b>MAP — Mathematics</b><div class="sub">RIT-aligned practice</div></div><span class="btn btn-secondary" style="flex:none">Open</span></div>
  <div class="prog"><div><b>MAP — Reading</b><div class="sub">Comprehension &amp; vocab</div></div><span class="btn btn-secondary" style="flex:none">Open</span></div>
  <div class="prog"><div><b>SAT — Reading &amp; Writing</b><div class="sub">Skill practice &amp; simulation</div></div><span class="btn btn-secondary" style="flex:none">Open</span></div>
  <div class="prog"><div><b>IB — Math AA</b><div class="sub">Analysis &amp; approaches</div></div><span class="btn btn-secondary" style="flex:none">Open</span></div>
</div></div>

<div class="section"><div class="wrap">
  <div class="section-head"><h2>Teacher Dashboard</h2><p class="sub">Class 9A — Math</p></div>
  <div class="grid-3">
    <div class="card"><h3>Class completion</h3><div class="bar success"><div style="width:74%"></div></div>
      <div style="font-size:12px;color:var(--muted)">26/35 students active this week</div></div>
    <div class="card"><h3>Avg. mastery</h3><div style="font-size:30px;font-weight:700;color:var(--primary)">76%</div>
      <span class="badge badge-success">+6% this week</span></div>
    <div class="card"><h3>Interventions</h3><p class="sub">3 students flagged</p><span class="btn btn-primary" style="margin-top:12px">Review now</span></div>
  </div>
</div></div>

<div class="section"><div class="wrap">
  <div class="section-head"><h2>Admin / Back Office</h2><p class="sub">Question Bank</p></div>
  <div class="toolbar">
    <input class="input" placeholder="Search questions…" style="flex:1;min-width:180px">
    <select><option>All subjects</option><option>Math</option><option>English</option></select>
    <a class="btn btn-primary" href="#">+ Add question</a>
  </div>
  <table>
    <tr><th>Question</th><th>Subject</th><th>Status</th><th>Action</th></tr>
    <tr><td>Quadratic formula…</td><td>Math</td><td><span class="badge badge-success">Live</span></td><td><a class="btn btn-outline" href="#">Edit</a></td></tr>
    <tr><td>Passive voice…</td><td>English</td><td><span class="badge badge-warning">Review</span></td><td><a class="btn btn-outline" href="#">Edit</a></td></tr>
    <tr><td>Inference passage…</td><td>Reading</td><td><span class="badge badge-neutral">Draft</span></td><td><a class="btn btn-outline" href="#">Edit</a></td></tr>
  </table>
</div></div>

<div class="section"><div class="wrap">
  <div class="section-head"><h2>Form &amp; Input States</h2></div>
  <div class="card" style="max-width:560px">
    <div class="field"><label>Email</label><input class="input" style="width:100%" placeholder="you@school.edu"></div>
    <div class="field"><label>Role</label><select style="width:100%"><option>Student</option><option>Teacher</option><option>Parent</option></select></div>
    <div class="field"><label>Notifications</label><span class="toggle on"></span></div>
    <div class="field"><label>Disabled field</label><input class="input" style="width:100%" value="Read only" disabled></div>
    <div class="field"><label>Almost there</label><input class="input" style="width:100%;border-color:var(--error)">
      <div class="feedback fb-incorrect" style="margin-top:8px">Password must be at least 8 characters.</div></div>
    <div style="display:flex;gap:12px"><a class="btn btn-primary" href="#">Create account</a>
      <a class="btn btn-outline" href="#">Cancel</a></div>
  </div>

  <div class="dark-demo">
    <b>Dark mode (PWA / mobile-ready)</b>
    <div class="dm-card">
      <b style="color:#fff">Continue Practice — Math</b>
      <div class="bar" style="background:#2a3640"><div style="background:{dark_primary};width:58%"></div></div>
      <div style="font-size:13px;color:#8fa0ab">Linear equations · 10/18</div>
      <div style="margin-top:12px;display:flex;gap:10px">
        <a class="btn btn-primary" style="background:{dark_primary}" href="#">Resume</a>
        <a class="btn btn-outline" style="border-color:#3a4a55;color:#d7e2e8" href="#">Hint</a>
      </div>
    </div>
  </div>
</div></div>

<footer><div class="wrap">Lumaani — Learn with Lumaani. One screen, one task.<br>Proposal preview · design option for owner review.</div></footer>
</body></html>"""
    return h

os.makedirs(OUT, exist_ok=True)
paths={}
for k,t in final.items():
    fn = f"{OUT}/LUMAANI_COLOR_OPTION_{k.split('OPTION')[1]}.html"
    open(fn,"w").write(page(k,t))
    paths[k]=fn
    print("wrote", fn)
json.dump(paths, open("/tmp/lumaani_html_paths.json","w"))