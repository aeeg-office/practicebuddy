import { NextRequest, NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import { getJwtSecret } from "@/lib/auth-server"
import { rateLimitMiddleware } from "@/lib/rate-limit"

/**
 * AI Tutor API — template-based educational responses.
 *
 * This route provides subject-specific tutoring responses based on keyword
 * matching. Expandable to real AI (OpenRouter) later by replacing the
 * template logic with an LLM call.
 */

interface TutorRequest {
  subject: string
  topic?: string
  message: string
  history?: { role: "user" | "assistant"; content: string; suggestions?: string[] }[]
}

interface TutorResponse {
  reply: string
  suggestions: string[]
  subject: string
}

// ── Subject-specific explain templates ──

const explainTemplates: Record<string, (topic?: string) => string> = {
  sat: (topic) =>
    `I'd be happy to explain! Let's break this down step by step.${
      topic ? ` Regarding **${topic}**:` : ""
    }

For the SAT, questions are designed to test your reasoning skills as much as your content knowledge. The key concept here is **understanding what the question is really asking** before jumping into calculations or answer choices.

Think of it like this: every SAT question has a "hidden" structure. The test makers embed the same core concepts in different surface-level scenarios. Once you recognize the pattern — whether it's linear equations in context or rhetorical synthesis in writing — the solution path becomes clear.

Would you like me to go deeper into a specific SAT topic, or would you rather try a practice question to test your understanding?`,

  act: (topic) =>
    `I'd be happy to explain! Let's break this down step by step.${
      topic ? ` Regarding **${topic}**:` : ""
    }

The ACT is unique because it tests **speed and endurance** alongside content knowledge. Unlike the SAT, the ACT gives you less time per question, so efficiency is just as important as accuracy.

The key concept here is **strategic time management** — knowing when to answer a question directly, when to use process of elimination, and when to skip and return later.

Think of it like a timed puzzle: every second counts. The students who score highest aren't always the ones who know the most — they're the ones who use their time most efficiently.

Would you like me to go deeper on an ACT section strategy, or try a practice question?`,

  ielts: (topic) =>
    `I'd be happy to explain! Let's break this down step by step.${
      topic ? ` Regarding **${topic}**:` : ""
    }

For IELTS, the test measures your ability to **communicate effectively in English** across academic and general contexts. The key concept here is **task achievement** — the examiner isn't looking for perfect English, but for clear, well-organized communication that fully addresses the task.

Think of it like giving directions to a friend: you don't need to be a professional speaker, you just need to be clear, complete, and easy to follow.

Would you like me to focus on a specific IELTS skill — Writing Task 2 structure, Speaking Part 2 strategy, or Reading passage techniques?`,

  toefl: (topic) =>
    `I'd be happy to explain! Let's break this down step by step.${
      topic ? ` Regarding **${topic}**:` : ""
    }

For TOEFL, the key challenge is **integrated skills** — you'll need to combine reading, listening, speaking, and writing in the same task. The key concept is **note-taking and synthesis**: your notes from the lecture and reading passage are the foundation of your response.

Think of it like being a reporter: you listen, you read, you take notes, and then you synthesize everything into a clear summary with your own analysis.

Would you like me to walk through a specific TOEFL task type, like the integrated writing or independent speaking tasks?`,
}

// ── Hint templates ──

const hintTemplates: Record<string, string> = {
  sat: `Here's a good approach: **read the question carefully** and identify what it's really asking. Look for keywords that tell you which skill to use — is it asking for the main idea, for evidence, for a mathematical relationship?

For SAT **Reading** questions, always find the specific evidence in the passage before choosing your answer. Don't rely on memory — the answer is always in the text.

For SAT **Math** questions, ask yourself: what information am I given, and what am I solving for? Try eliminating answer choices that don't make sense with the units or context.

Would you like a more specific hint? Tell me which question type you're working on.`,

  act: `Here's a good approach: the ACT rewards **efficiency**. Read the question and scan the answer choices before diving deep into the passage or problem.

For ACT **English** questions, read the sentence with each answer choice inserted — your ear will often catch the correct answer even if you can't explain the grammar rule.

For ACT **Science** questions, go straight to the charts and graphs first. Most questions are about data interpretation, not science knowledge.

Would you like a more targeted hint for a specific ACT section?`,

  ielts: `Here's a good approach: for IELTS, focus on **task achievement first**. Before you write or speak, make sure you understand exactly what the task is asking.

For IELTS **Writing Task 2**, structure your essay: Introduction → Point 1 → Point 2 → Conclusion. Use signposting language like "First and foremost" and "In contrast" to guide the examiner.

For IELTS **Speaking**, the examiner wants to hear **natural, fluent** English. Don't memorize answers — instead, practice talking about a topic for 1-2 minutes without stopping.

Would you like more specific advice for a particular IELTS skill area?`,

  toefl: `Here's a good approach: TOEFL success comes from **strong note-taking**. During the listening passages, don't try to write everything down — focus on:
1. The main idea of each section
2. Key supporting details
3. The speaker's attitude or opinion
4. Any contrast or comparison points

For **integrated writing**, your notes are everything. Practice summarizing what you hear and read in your own words — the TOEFL rewards paraphrase over direct quotes.

Would you like me to elaborate on any of these note-taking strategies?`,
}

// ── Practice question templates ──

const practiceTemplates: Record<string, string> = {
  sat: `Here's a practice SAT question:

**In the xy-plane, the graph of the equation y = 2x² + 4x - 6 intersects the x-axis at points (a, 0) and (b, 0). What is the value of a + b?**

A) -4
B) -2
C) 2
D) 4

Take your time to work through it. When you're ready, share your answer and I'll give you feedback with a step-by-step explanation!`,

  act: `Here's a practice ACT question:

**A rectangle has a length that is 3 times its width. If the perimeter of the rectangle is 48 inches, what is the area, in square inches?**

A) 96
B) 108
C) 128
D) 144

Take your time to work through it. Remember to define your variables first! Share your answer when you're ready for feedback.`,

  ielts: `Here's a practice IELTS **Writing Task 2** question:

**Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?**

Take 5 minutes to plan your essay structure:
- Introduction: Paraphrase the topic + state your position
- Body 1: Main argument with example
- Body 2: Counter-argument with rebuttal OR second supporting point
- Conclusion: Summarize and restate position

When you're ready, share your thesis statement or outline and I'll give you feedback!`,

  toefl: `Here's a practice TOEFL **Independent Speaking** question:

**Some universities require students to take classes outside their major field of study. Others only require courses related to their major. Which approach do you think is better and why?**

Use the PREP method:
- **P**oint: State your opinion clearly
- **R**eason: Give your main reason
- **E**xample: Provide a specific example
- **P**oint: Restate your opinion

Record yourself answering for 45 seconds, then share your main points for feedback!`,
}

// ── Recommendation templates ──

const recommendTemplates: Record<string, string> = {
  sat: `Based on typical SAT progress patterns, I'd recommend focusing on **Words in Context** next. Students who master vocabulary-in-context and text structure questions tend to see the biggest score improvements in the Reading & Writing section.

Why this skill? Because it appears in **8-12 questions per test** and directly impacts both your Reading and Writing scores. Improving here creates a compounding effect across the entire verbal section.

Would you like me to explain the Words in Context skill in more detail, or create a practice question for you?`,

  act: `Based on common ACT performance data, I'd recommend focusing on **English: Conventions of Standard English** next. This covers punctuation, grammar, and sentence structure — and it makes up about 40% of the English section.

Students who master these rules typically see **3-5 point improvements** on the English section alone, which frees up mental energy for the more challenging rhetorical skills questions.

Would you like a grammar rules summary, or should I create a practice passage to work through together?`,

  ielts: `Based on IELTS scoring patterns, I'd recommend focusing on **Task Response / Task Achievement** next. This criterion accounts for 25% of your Writing score and is the most common reason students score below their target.

The key: many students write off-topic or don't fully address all parts of the question. Mastering this skill alone can boost your Writing band by 0.5-1.0.

Would you like me to explain how to analyze Task 2 questions more effectively, or create a practice task?`,

  toefl: `Based on TOEFL score patterns, I'd recommend focusing on **Integrated Writing** next. This task combines reading, listening, and writing — and it's the most predictable section once you know the structure.

The secret: the listening passage always **refutes or challenges** the reading passage in three specific points. Once you understand this pattern, you can structure your response before the listening even ends.

Would you like me to walk through the Integrated Writing structure step by step, or should we try a practice passage?`,
}

// ── Default/general template ──

const defaultTemplate = (subject: string): string => {
  if (subject === "sat")
    return `I'm your SAT Lumaani! I can help you with:
• Explaining SAT math and verbal concepts
• Giving strategic hints for tough questions
• Creating practice questions tailored to specific skills
• Recommending which skills to focus on next

Just let me know what you need — "Explain this concept," "Give me a hint," "Create a practice question," or "What should I study next?" I'm here to help!`
  if (subject === "act")
    return `I'm your ACT Lumaani! I can help you with:
• Explaining ACT English, Math, Reading, and Science concepts
• Giving efficient strategies and hints
• Creating timed practice questions
• Recommending priority skills

What would you like help with today?`

  if (subject === "ielts")
    return `I'm your IELTS Lumaani! I can help you with:
• Explaining IELTS Writing, Speaking, Reading, and Listening strategies
• Giving hints for each section
• Creating practice essay prompts and speaking topics
• Recommending priority skills

How can I assist with your IELTS preparation?`

  if (subject === "toefl")
    return `I'm your TOEFL Lumaani! I can help you with:
• Explaining integrated and independent tasks
• Giving note-taking and time management hints
• Creating practice speaking and writing prompts
• Recommending focus areas

What would you like to practice?`

  return `I'm your AI Lumaani! I can help you prepare for SAT, ACT, IELTS, and TOEFL. Choose a subject above, then ask me to explain a concept, give you a hint, create a practice question, or recommend your next skill to study.`
}

// ── Subject-aware greeting messages for conversation start ──

const greetingTemplates: Record<string, string> = {
  sat: "👋 Welcome to SAT Practice! I'm your AI tutor. Ask me to explain a concept, give you a hint, create a practice question, or recommend your next skill. What subject area are you working on?",
  act: "👋 Welcome to ACT Practice! I'm your AI tutor. Whether you need concept explanations, strategy hints, practice questions, or skill recommendations — I'm ready to help!",
  ielts: "👋 Welcome to IELTS Practice! I'm your AI tutor. Let's work on Writing, Speaking, Reading, or Listening skills together. What would you like to focus on?",
  toefl: "👋 Welcome to TOEFL Practice! I'm your AI tutor. I can help with integrated tasks, speaking strategies, writing templates, and skill recommendations. Let's get started!",
}

// ── Follow-up suggestions per intent ──

const followUpSuggestions: Record<string, string[]> = {
  explain: ["Go deeper", "Give me a different example", "Create a practice question"],
  hint: ["Give me a more specific hint", "Show me a similar example", "I'll try again"],
  practice: ["Check my answer", "Give me a harder question", "Explain the concept"],
  recommend: ["Explain why", "Create a practice question", "Show me the skill breakdown"],
  default: ["Explain a concept", "Give me a hint", "Create a practice question", "What should I study next?"],
}

// ── Helper: detect intent from message ──

function detectIntent(message: string): "hint" | "explain" | "practice" | "recommend" | "default" {
  const lower = message.toLowerCase()
  if (lower.includes("hint") || lower.includes("clue") || lower.includes("help") || lower.includes("stuck")) return "hint"
  if (lower.includes("explain") || lower.includes("what is") || lower.includes("how to") || lower.includes("why") || lower.includes("concept") || lower.includes("meaning") || lower.includes("understand")) return "explain"
  if (lower.includes("practice") || lower.includes("question") || lower.includes("example") || lower.includes("problem") || lower.includes("quiz") || lower.includes("drill") || lower.includes("exercise")) return "practice"
  if (lower.includes("recommend") || lower.includes("next") || lower.includes("focus") || lower.includes("what should i") || lower.includes("study") || lower.includes("priority") || lower.includes("progress") || lower.includes("skill")) return "recommend"
  return "default"
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate — require valid JWT Bearer token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    try {
      jwt.verify(authHeader.split(" ")[1], getJwtSecret());
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Rate limit: 20 requests per minute per IP
    const rateLimitResponse = rateLimitMiddleware(request, { maxRequests: 20, windowMs: 60000 })
    if (rateLimitResponse) return rateLimitResponse

    const body: TutorRequest = await request.json()

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const subject = body.subject || "sat"
    const topic = body.topic || ""
    const message = body.message

    // Detect user intent
    const intent = detectIntent(message)

    let reply: string
    let suggestions: string[]

    // Route to appropriate template
    if (intent === "hint") {
      reply = hintTemplates[subject] || hintTemplates.sat
      suggestions = followUpSuggestions.hint
    } else if (intent === "explain") {
      reply = (explainTemplates[subject] || explainTemplates.sat)(topic)
      suggestions = followUpSuggestions.explain
    } else if (intent === "practice") {
      reply = practiceTemplates[subject] || practiceTemplates.sat
      suggestions = followUpSuggestions.practice
    } else if (intent === "recommend") {
      reply = recommendTemplates[subject] || recommendTemplates.sat
      suggestions = followUpSuggestions.recommend
    } else {
      reply = defaultTemplate(subject)
      suggestions = followUpSuggestions.default
    }

    const response: TutorResponse = {
      reply,
      suggestions,
      subject,
    }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}