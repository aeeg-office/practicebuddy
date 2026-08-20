export const content = {
  hero: {
    badge: "Digital SAT · Skill Practice · Test Simulation",
    title: "SAT Practice",
    subtitle: "Master the Digital SAT with targeted skill practice and realistic full-length test simulations. Build confidence through deliberate practice.",
    ctas: {
      primary: "Start Skill Practice",
      secondary: "Take a Simulation",
    },
  },
  features: {
    badge: "SAT Practice Features",
    title: "Prepare Your Way",
    description: "Practice Buddy offers two complementary modes for SAT preparation — skill practice for learning and test simulation for assessment.",
    items: [
      {
        title: "Skill Practice",
        description: "Practice by official SAT domain: Information and Ideas, Craft and Structure, Expression of Ideas, Standard English Conventions for Reading & Writing. Algebra, Advanced Math, Problem-Solving, Geometry & Trigonometry for Math. Choose your difficulty: Easy, Medium, Hard, or Mixed.",
      },
      {
        title: "Test Simulation",
        description: "Full-length timed modules matching the official Digital SAT format. Reading & Writing Module 1 & 2, Math Module 1 & 2. No teaching feedback during modules — just the real test experience with post-test analysis.",
      },
      {
        title: "Two-Attempt Learning",
        description: "During skill practice, incorrect answers unlock a second attempt with strategy support. Learn from mistakes with detailed explanations and recommended next actions.",
      },
      {
        title: "Progress Tracking",
        description: "Track mastery by skill and domain over time. Identify strengths, weaknesses, and recommended next practice areas. Cross-device progress synchronization.",
      },
    ],
  },
  taxonomies: {
    readingWriting: {
      title: "Reading & Writing",
      domains: [
        {
          name: "Information and Ideas",
          skills: ["Central Ideas and Details", "Inferences", "Command of Evidence"],
        },
        {
          name: "Craft and Structure",
          skills: ["Words in Context", "Text Structure and Purpose", "Cross-Text Connections"],
        },
        {
          name: "Expression of Ideas",
          skills: ["Transitions", "Rhetorical Synthesis"],
        },
        {
          name: "Standard English Conventions",
          skills: ["Boundaries", "Form, Structure, and Sense"],
        },
      ],
    },
    math: {
      title: "Mathematics",
      domains: [
        {
          name: "Algebra",
          skills: ["Linear Equations", "Linear Functions", "Linear Inequalities", "Systems of Equations"],
        },
        {
          name: "Advanced Math",
          skills: ["Equivalent Expressions", "Nonlinear Equations", "Quadratic Functions", "Exponential Functions"],
        },
        {
          name: "Problem-Solving and Data Analysis",
          skills: ["Ratios and Rates", "Percentages", "Data Analysis", "Probability", "Statistics"],
        },
        {
          name: "Geometry and Trigonometry",
          skills: ["Area and Volume", "Lines and Angles", "Right Triangles", "Circles", "Trigonometry"],
        },
      ],
    },
  },
  faqs: [
    {
      q: "What is the difference between Skill Practice and Test Simulation?",
      a: "Skill Practice is learning-oriented — you get two attempts, hints, strategy support, and explanations. Test Simulation is assessment-oriented — one scored response per question, no feedback during the module, and post-test analysis after completion.",
    },
    {
      q: "Is Practice Buddy affiliated with College Board?",
      a: "No. Practice Buddy is an independent educational platform. Our SAT content follows the official skill taxonomy but uses original practice questions. We do not reproduce College Board's proprietary test materials, scoring algorithms, or protected interface designs.",
    },
    {
      q: "Can I use a calculator during SAT Math practice?",
      a: "Yes. For Math skill practice and test simulation where calculators are permitted, you can use the integrated Desmos calculator or your own device. Calculator usage follows the official Digital SAT calculator policy.",
    },
    {
      q: "How is my progress tracked?",
      a: "Every practice session is saved server-side. Your mastery is derived from actual attempt data — first-attempt accuracy, second-attempt recovery, difficulty, and recency. Progress syncs across all your devices automatically.",
    },
  ],
  cta: {
    title: "Ready to start practicing?",
    description: "Begin with SAT Skill Practice or jump straight into a full test simulation.",
    primary: "Start Practice",
    secondary: "View Math Skills",
  },
}