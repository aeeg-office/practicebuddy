export const content = {
  hero: {
    badge: "Side-by-Side Exam Comparison",
    title: "Compare Our Programs",
    subtitle: "Not sure which exam to take? We break down SAT, ACT, IELTS, and TOEFL side by side — format, scoring, duration, and which test fits your goals best.",
    ctas: { primary: "Get Free Guidance", secondary: "See Full Comparison" },
  },
  comparisonTable: {
    title: "Side-by-Side Comparison",
    description: "See how SAT, ACT, IELTS, and TOEFL stack up across key categories. Find the exam that aligns with your strengths and academic goals.",
    headers: ["Feature", "SAT", "ACT", "IELTS", "TOEFL"],
    rows: [
      { feature: "Format", sat: "Digital — Computer-based at test center", act: "Paper-based or Digital (varies by location)", ielts: "Paper or Computer (choose at registration)", toefl: "Internet-based (iBT) — mostly online" },
      { feature: "Duration", sat: "2 hrs 14 min", act: "2 hrs 55 min (3 hrs 35 min with Writing)", ielts: "2 hrs 45 min", toefl: "Under 2 hrs (abbreviated)" },
      { feature: "Sections", sat: "Reading & Writing, Math (2 sections)", act: "English, Math, Reading, Science (+ optional Writing)", ielts: "Listening, Reading, Writing, Speaking", toefl: "Reading, Listening, Speaking, Writing (4 sections)" },
      { feature: "Score Range", sat: "400–1600", act: "1–36 (Composite)", ielts: "0–9 (Band Score)", toefl: "0–120" },
      { feature: "Cost / Lesson", sat: "Starting at $25", act: "Starting at $25", ielts: "Starting at $25", toefl: "Starting at $25" },
      { feature: "Best For", sat: "US college admissions, scholarship applications", act: "US college admissions, STEM-focused students", ielts: "UK, Australia, Canada, NZ university & migration", toefl: "US & Canadian university admissions" },
      { feature: "Next Test Date", sat: "August 24, 2025", act: "September 14, 2025", ielts: "Every week (multiple dates)", toefl: "Multiple dates monthly" },
    ],
    note: "All prices are starting rates per lesson. Actual costs depend on program type (group vs. private), session frequency, and package size. Contact us for a personalized quote.",
  },
  examHighlights: {
    title: "Exam Highlights",
    description: "Dive deeper into each exam's unique structure, strengths, and best-fit scenarios.",
    items: [
      {
        title: "SAT",
        subtitle: "Test Preparation",
        features: ["Digital-adaptive format — shorter test", "Strong focus on evidence-based reading", "No Science section", "Widely accepted by all US colleges", "Calculator and no-calculator Math sections"],
        cta: "Learn More About SAT Prep",
      },
      {
        title: "ACT",
        subtitle: "Test Preparation",
        features: ["Includes Science reasoning section", "More advanced Math (trigonometry)", "Optional Writing (essay) section", "Accepted at all US colleges", "Faster-paced with more questions"],
        cta: "Learn More About ACT Prep",
      },
      {
        title: "IELTS",
        subtitle: "Test Preparation",
        features: ["Face-to-face speaking test with examiner", "Academic & General Training modules", "Preferred in UK, Australia & Canada", "Human-scored Writing & Speaking", "Band score system (0–9)"],
        cta: "Learn More About IELTS Prep",
      },
      {
        title: "TOEFL",
        subtitle: "Test Preparation",
        features: ["Academic English focus", "Speaking to computer (recorded responses)", "Integrated tasks combining skills", "Preferred in US & Canadian universities", "Score scale 0–120"],
        cta: "Learn More About TOEFL Prep",
      },
    ],
  },
  decisionGuide: {
    badge: "Decision Guide",
    title: "Which Exam Is Right for You?",
    description: "Ask yourself these key questions to narrow down your choice. Still unsure? We're here to help you decide.",
    questions: [
      { question: "Which country do you want to study in?", hint: "US colleges accept SAT/ACT. UK/Australia/Canada prefer IELTS. US & Canada accept TOEFL." },
      { question: "Are you strong in Science?", hint: "The ACT has a dedicated Science section. If Science is your strength, the ACT lets you showcase it." },
      { question: "Do you prefer a shorter test experience?", hint: "The digital SAT is only 2h 14min — the shortest of all four exams." },
      { question: "Do you want a face-to-face speaking test?", hint: "IELTS includes a live conversation with an examiner. TOEFL speaks to a computer." },
      { question: "What score format do you prefer?", hint: "SAT (400–1600), ACT (1–36 composite), IELTS (0–9 band), TOEFL (0–120). Consider what your target schools require." },
    ],
    quickSummary: {
      title: "Quick Summary",
      chooseSAT: { title: "Choose SAT if...", items: ["You want the shortest test (2h 14min)", "You prefer fewer sections (2 vs 4)", "You're applying to US colleges"] },
      chooseACT: { title: "Choose ACT if...", items: ["You excel in Science", "You're strong in Math (trigonometry)", "You want to show broader academic skills"] },
      chooseIELTS: { title: "Choose IELTS if...", items: ["You're applying to UK/Australia/Canada", "You prefer face-to-face speaking", "You need a General Training option"] },
      chooseTOEFL: { title: "Choose TOEFL if...", items: ["You're applying to US/Canadian universities", "You prefer computer-based speaking", "You need a short, academic-focused test"] },
    },
  },
  cta: {
    title: "Still Not Sure Which Exam to Take?",
    description: "Our expert advisors will help you choose the right exam and create a personalized study plan. Get started with a free consultation.",
    buttons: { primary: "Book a Free Consultation", secondary: "Chat on WhatsApp" },
  },
}
