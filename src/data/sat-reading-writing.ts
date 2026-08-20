// Digital SAT Reading & Writing Diagnostic Assessment
// 66 questions across 2 modules, covering all 4 domains
// All content is original — no copyrighted SAT material used

export interface SATQuestion {
  id: number
  module: 1 | 2
  domain: "Information and Ideas" | "Craft and Structure" | "Expression of Ideas" | "Standard English Conventions"
  passage?: string
  text: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

export const satReadingWritingQuestions: SATQuestion[] = [
  // ======================================================================
  // MODULE 1 — Questions 1-33 (mix of easy and medium)
  // ======================================================================

  // --- Passage Group 1: Science - Coral Reefs (Q1-3) ---
  {
    id: 1,
    module: 1,
    domain: "Craft and Structure",
    passage: "Coral reefs are often called the rainforests of the sea because of their extraordinary biodiversity. Although they cover less than one percent of the ocean floor, they support roughly twenty-five percent of all known marine species. The intricate three-dimensional structure of coral formations offers shelter, breeding sites, and feeding grounds for organisms ranging from microscopic algae to large predatory fish. Recent studies show that rising ocean temperatures are disrupting this fragile equilibrium. When water stays too warm for too long, corals undergo bleaching\u2014they expel the symbiotic algae living in their tissues, turn white, and become highly vulnerable to disease and death.",
    text: "The primary purpose of the passage is to",
    options: [
      { id: "A", text: "argue that humans should reduce activities that harm coral reefs" },
      { id: "B", text: "describe the ecological importance of coral reefs and a danger they face" },
      { id: "C", text: "compare coral reef biodiversity to that of tropical rainforests" },
      { id: "D", text: "explain the biological mechanisms of coral reproduction and growth" }
    ],
    correctAnswer: "B",
    explanation: "The passage first establishes the ecological significance of coral reefs (their biodiversity and structural complexity) and then introduces the threat posed by rising ocean temperatures (coral bleaching). Option B correctly captures both elements. Option A introduces an argument not present; option C focuses on the initial comparison rather than the overall purpose; option D discusses a process not described in the passage.",
    difficulty: "easy"
  },
  {
    id: 2,
    module: 1,
    domain: "Craft and Structure",
    passage: "Coral reefs are often called the rainforests of the sea because of their extraordinary biodiversity. Although they cover less than one percent of the ocean floor, they support roughly twenty-five percent of all known marine species. The intricate three-dimensional structure of coral formations offers shelter, breeding sites, and feeding grounds for organisms ranging from microscopic algae to large predatory fish. Recent studies show that rising ocean temperatures are disrupting this fragile equilibrium. When water stays too warm for too long, corals undergo bleaching\u2014they expel the symbiotic algae living in their tissues, turn white, and become highly vulnerable to disease and death.",
    text: "As used in the passage, \"fragile equilibrium\" (sentence 4) most nearly means",
    options: [
      { id: "A", text: "a precise calculation of ocean temperature variations" },
      { id: "B", text: "a precarious state of balance among interconnected elements" },
      { id: "C", text: "a legal agreement between environmental agencies" },
      { id: "D", text: "a measure of species diversity within a habitat" }
    ],
    correctAnswer: "B",
    explanation: "The phrase \"fragile equilibrium\" refers to the delicate balance among coral reefs, the species they support, and environmental conditions such as water temperature. It describes a state where all elements are interconnected and vulnerable to disruption. Option B captures this meaning. Options A, C, and D misinterpret the phrase as a calculation, an agreement, or a measurement, none of which fit the context.",
    difficulty: "easy"
  },
  {
    id: 3,
    module: 1,
    domain: "Information and Ideas",
    passage: "Coral reefs are often called the rainforests of the sea because of their extraordinary biodiversity. Although they cover less than one percent of the ocean floor, they support roughly twenty-five percent of all known marine species. The intricate three-dimensional structure of coral formations offers shelter, breeding sites, and feeding grounds for organisms ranging from microscopic algae to large predatory fish. Recent studies show that rising ocean temperatures are disrupting this fragile equilibrium. When water stays too warm for too long, corals undergo bleaching\u2014they expel the symbiotic algae living in their tissues, turn white, and become highly vulnerable to disease and death.",
    text: "Which choice provides the best evidence that coral reefs support a disproportionately large number of marine species?",
    options: [
      { id: "A", text: "\"Coral reefs are often called the rainforests of the sea\"" },
      { id: "B", text: "\"they cover less than one percent of the ocean floor, they support roughly twenty-five percent of all known marine species\"" },
      { id: "C", text: "\"The intricate three-dimensional structure of coral formations offers shelter, breeding sites, and feeding grounds\"" },
      { id: "D", text: "\"corals undergo bleaching\u2014they expel the symbiotic algae living in their tissues\"" }
    ],
    correctAnswer: "B",
    explanation: "The question asks for evidence that coral reefs support a disproportionately high number of species relative to their size. Option B directly provides this evidence by stating that reefs occupy less than 1% of the ocean floor yet support 25% of marine species\u2014a clear demonstration of disproportionality. Option A is a metaphor; option C describes how the structure helps but does not quantify disproportionality; option D describes bleaching.",
    difficulty: "medium"
  },

  // --- Passage Group 2: Literature - Short Story (Q4-6) ---
  {
    id: 4,
    module: 1,
    domain: "Craft and Structure",
    passage: "The house on Cedar Lane had never seemed small to Mira as a child. She remembered the front porch as a vast stage where she and her brother performed plays for an audience of potted ferns and imaginary friends. The backyard stretched like a prairie, the oak tree at its center a fortress to be conquered. Now, standing at the same gate twenty years later, Mira saw things differently. The porch measured barely twelve feet across. The backyard was a modest rectangle of grass, the oak tree unremarkable in height. It was not the house that had changed, she understood. She had simply grown into a world that had given her new measures for everything.",
    text: "The passage primarily conveys that Mira",
    options: [
      { id: "A", text: "feels disappointed by the physical deterioration of her childhood home" },
      { id: "B", text: "is experiencing a shift in perception resulting from her own growth" },
      { id: "C", text: "blames her brother for exaggerating their childhood experiences" },
      { id: "D", text: "plans to sell the house now that it no longer feels like home" }
    ],
    correctAnswer: "B",
    explanation: "The passage centers on the contrast between Mira's childhood memories\u2014in which the house felt vast\u2014and her adult perception. The key insight is the final line: she had simply grown into a world with different measures. Option B captures this theme. Option A is incorrect because there is no mention of deterioration; option C introduces blame not present; option D is unsupported.",
    difficulty: "medium"
  },
  {
    id: 5,
    module: 1,
    domain: "Craft and Structure",
    passage: "The house on Cedar Lane had never seemed small to Mira as a child. She remembered the front porch as a vast stage where she and her brother performed plays for an audience of potted ferns and imaginary friends. The backyard stretched like a prairie, the oak tree at its center a fortress to be conquered. Now, standing at the same gate twenty years later, Mira saw things differently. The porch measured barely twelve feet across. The backyard was a modest rectangle of grass, the oak tree unremarkable in height. It was not the house that had changed, she understood. She had simply grown into a world that had given her new measures for everything.",
    text: "The author uses the phrase \"a vast stage\" primarily to",
    options: [
      { id: "A", text: "describe the porch's actual physical dimensions" },
      { id: "B", text: "convey how imaginatively significant the porch felt to young Mira" },
      { id: "C", text: "suggest that Mira's family performed professional plays" },
      { id: "D", text: "criticize the porch's worn and outdated condition" }
    ],
    correctAnswer: "B",
    explanation: "The phrase \"a vast stage\" appears in the context of Mira's childhood memories of performing plays. It conveys the imaginative importance and perceived expansiveness of the porch from a child's perspective. Option B correctly identifies this purpose. Option A is wrong because the phrase describes perception, not actual size; option C misinterprets the metaphor literally; option D is unsupported.",
    difficulty: "easy"
  },
  {
    id: 6,
    module: 1,
    domain: "Craft and Structure",
    passage: "The house on Cedar Lane had never seemed small to Mira as a child. She remembered the front porch as a vast stage where she and her brother performed plays for an audience of potted ferns and imaginary friends. The backyard stretched like a prairie, the oak tree at its center a fortress to be conquered. Now, standing at the same gate twenty years later, Mira saw things differently. The porch measured barely twelve feet across. The backyard was a modest rectangle of grass, the oak tree unremarkable in height. It was not the house that had changed, she understood. She had simply grown into a world that had given her new measures for everything.",
    text: "The overall tone of the passage is best described as",
    options: [
      { id: "A", text: "wistful and reflective" },
      { id: "B", text: "angry and resentful" },
      { id: "C", text: "humorous and amused" },
      { id: "D", text: "objective and scientific" }
    ],
    correctAnswer: "A",
    explanation: "The passage has a gentle, melancholic quality as Mira contemplates the gap between childhood memory and adult reality. Words like \"had never seemed small,\" \"she remembered,\" and the quiet realization at the end all contribute to a tone of wistfulness and reflection. Option A accurately captures this tone. Options B, C, and D do not match the passage's emotional register.",
    difficulty: "medium"
  },

  // --- Passage Group 3: Social Science - Urban Planning (Q7-9) ---
  {
    id: 7,
    module: 1,
    domain: "Information and Ideas",
    passage: "Many American cities have adopted \"complete streets\" policies to reverse decades of car-focused urban design. These policies require that street renovation projects accommodate everyone\u2014pedestrians, cyclists, transit riders, and drivers. A 2022 study of twelve mid-sized cities that passed such ordinances between 2010 and 2020 found promising results. On average, these cities saw a 14% decline in traffic fatalities and a 22% increase in foot traffic along commercial corridors. However, the study also noted that implementation varied significantly: cities that allocated specific funding streams achieved far better results than those that relied on policy language alone without a dedicated budget.",
    text: "According to the passage, which factor was most strongly linked to successful outcomes for complete streets policies?",
    options: [
      { id: "A", text: "The size of the city's total population" },
      { id: "B", text: "The presence of dedicated funding for implementation" },
      { id: "C", text: "The number of years since the policy was first adopted" },
      { id: "D", text: "The level of public support for the policy" }
    ],
    correctAnswer: "B",
    explanation: "The passage directly states that cities with specific funding streams achieved far better results. This indicates that dedicated funding was the strongest predictor of success mentioned. Option A is not discussed; option C is mentioned only as a selection criterion for the study; option D is not addressed in the passage.",
    difficulty: "easy"
  },
  {
    id: 8,
    module: 1,
    domain: "Craft and Structure",
    passage: "Many American cities have adopted \"complete streets\" policies to reverse decades of car-focused urban design. These policies require that street renovation projects accommodate everyone\u2014pedestrians, cyclists, transit riders, and drivers. A 2022 study of twelve mid-sized cities that passed such ordinances between 2010 and 2020 found promising results. On average, these cities saw a 14% decline in traffic fatalities and a 22% increase in foot traffic along commercial corridors. However, the study also noted that implementation varied significantly: cities that allocated specific funding streams achieved far better results than those that relied on policy language alone without a dedicated budget.",
    text: "The third sentence (\"A 2022 study\u2026results\") serves primarily to",
    options: [
      { id: "A", text: "introduce the research evidence that supports the passage's claims" },
      { id: "B", text: "criticize the methodology of earlier studies on urban design" },
      { id: "C", text: "compare different approaches to funding street projects" },
      { id: "D", text: "summarize the history of complete streets legislation" }
    ],
    correctAnswer: "A",
    explanation: "The third sentence introduces the 2022 study as the empirical basis for the claims that follow. It establishes that concrete research supports the discussion of complete streets policies. Option A correctly identifies this function. Option B is wrong because the passage does not critique other studies; option C happens in later sentences; option D goes beyond the sentence's scope.",
    difficulty: "easy"
  },
  {
    id: 9,
    module: 1,
    domain: "Information and Ideas",
    passage: "Many American cities have adopted \"complete streets\" policies to reverse decades of car-focused urban design. These policies require that street renovation projects accommodate everyone\u2014pedestrians, cyclists, transit riders, and drivers. A 2022 study of twelve mid-sized cities that passed such ordinances between 2010 and 2020 found promising results. On average, these cities saw a 14% decline in traffic fatalities and a 22% increase in foot traffic along commercial corridors. However, the study also noted that implementation varied significantly: cities that allocated specific funding streams achieved far better results than those that relied on policy language alone without a dedicated budget.",
    text: "Which claim about complete streets policies is best supported by information in the passage?",
    options: [
      { id: "A", text: "They have been equally effective in every city that adopted them" },
      { id: "B", text: "Their effectiveness depends heavily on how they are implemented" },
      { id: "C", text: "They are more expensive than traditional street designs" },
      { id: "D", text: "They primarily benefit pedestrians rather than other road users" }
    ],
    correctAnswer: "B",
    explanation: "The passage emphasizes that implementation varied significantly and that funding allocation made a major difference. This directly supports the idea that effectiveness depends on implementation choices. Option A contradicts the passage's nuance; option C is not discussed; option D contradicts the passage's statement that policies serve all users.",
    difficulty: "medium"
  },

  // --- Cross-Text Comparison: Renewable Energy (Q10-12) ---
  {
    id: 10,
    module: 1,
    domain: "Craft and Structure",
    passage: "Passage A\nThe cost of solar energy has fallen dramatically over the past decade, with the price of solar photovoltaic electricity dropping nearly 90% since 2010. Solar is now cheaper than coal and natural gas in many parts of the world. This trend suggests that market forces alone can drive the transition to clean energy. As manufacturing scales up and technology improves, solar will continue to outcompete fossil fuels on price alone, making government intervention unnecessary.\n\nPassage B\nAlthough the declining cost of solar energy is welcome news, arguments that market forces alone will drive the energy transition ignore serious structural problems. Solar and wind power are intermittent\u2014they do not generate electricity when the sun is not shining or the wind is not blowing. Without massive investment in grid-scale battery storage, renewables cannot provide reliable baseline power. Additionally, fossil fuel industries have benefited from decades of government subsidies that are not reflected in today's price comparisons. A purely market-driven transition would also neglect communities that depend on fossil fuel economies and fail to modernize the electrical grid.",
    text: "The authors of the two passages disagree mainly about whether",
    options: [
      { id: "A", text: "the cost of solar energy has declined significantly in recent years" },
      { id: "B", text: "government subsidies have historically favored fossil fuel industries" },
      { id: "C", text: "market forces alone can successfully achieve an energy transition" },
      { id: "D", text: "solar and wind power are intermittent energy sources" }
    ],
    correctAnswer: "C",
    explanation: "Passage A argues that market forces alone will drive the transition because solar is already cheaper than fossil fuels. Passage B explicitly counters that market forces are insufficient due to intermittency, historical subsidies, and community impacts. The central disagreement is about whether market forces alone can achieve the transition. Options A and D are points both passages agree on; option B is mentioned only in Passage B.",
    difficulty: "medium"
  },
  {
    id: 11,
    module: 1,
    domain: "Information and Ideas",
    passage: "Passage A\nThe cost of solar energy has fallen dramatically over the past decade, with the price of solar photovoltaic electricity dropping nearly 90% since 2010. Solar is now cheaper than coal and natural gas in many parts of the world. This trend suggests that market forces alone can drive the transition to clean energy. As manufacturing scales up and technology improves, solar will continue to outcompete fossil fuels on price alone, making government intervention unnecessary.\n\nPassage B\nAlthough the declining cost of solar energy is welcome news, arguments that market forces alone will drive the energy transition ignore serious structural problems. Solar and wind power are intermittent\u2014they do not generate electricity when the sun is not shining or the wind is not blowing. Without massive investment in grid-scale battery storage, renewables cannot provide reliable baseline power. Additionally, fossil fuel industries have benefited from decades of government subsidies that are not reflected in today's price comparisons. A purely market-driven transition would also neglect communities that depend on fossil fuel economies and fail to modernize the electrical grid.",
    text: "Which claim from Passage B would the author of Passage A most likely disagree with?",
    options: [
      { id: "A", text: "Solar energy costs have declined dramatically since 2010" },
      { id: "B", text: "Market forces alone are insufficient to achieve a complete energy transition" },
      { id: "C", text: "Fossil fuel industries have received substantial government subsidies" },
      { id: "D", text: "Solar and wind power do not generate electricity at all times" }
    ],
    correctAnswer: "B",
    explanation: "Passage A explicitly states that \"market forces alone can drive the transition to clean energy\" and that \"government intervention [is] unnecessary.\" The author of Passage A would therefore reject Passage B's claim that market forces alone are insufficient. Options A, C, and D are factual points that the author of Passage A would likely accept, as they do not contradict the core argument of Passage A.",
    difficulty: "medium"
  },
  {
    id: 12,
    module: 1,
    domain: "Craft and Structure",
    passage: "Passage A\nThe cost of solar energy has fallen dramatically over the past decade, with the price of solar photovoltaic electricity dropping nearly 90% since 2010. Solar is now cheaper than coal and natural gas in many parts of the world. This trend suggests that market forces alone can drive the transition to clean energy. As manufacturing scales up and technology improves, solar will continue to outcompete fossil fuels on price alone, making government intervention unnecessary.\n\nPassage B\nAlthough the declining cost of solar energy is welcome news, arguments that market forces alone will drive the energy transition ignore serious structural problems. Solar and wind power are intermittent\u2014they do not generate electricity when the sun is not shining or the wind is not blowing. Without massive investment in grid-scale battery storage, renewables cannot provide reliable baseline power. Additionally, fossil fuel industries have benefited from decades of government subsidies that are not reflected in today's price comparisons. A purely market-driven transition would also neglect communities that depend on fossil fuel economies and fail to modernize the electrical grid.",
    text: "Which statement best describes the relationship between the two passages?",
    options: [
      { id: "A", text: "Passage B supports Passage A by providing additional data on solar costs" },
      { id: "B", text: "Passage B challenges the conclusion that Passage A draws from the cost data" },
      { id: "C", text: "Passage B proposes specific policies that Passage A dismisses as unnecessary" },
      { id: "D", text: "Passage B corrects factual errors in Passage A's description of solar energy" }
    ],
    correctAnswer: "B",
    explanation: "Passage A concludes that market forces alone will drive the transition. Passage B directly challenges this conclusion by arguing that structural problems make market forces insufficient. Option B captures this relationship. Option A is wrong because Passage B does not support Passage A; option C is wrong because Passage B does not propose specific policies; option D is wrong because Passage B does not claim factual errors in Passage A.",
    difficulty: "easy"
  },

  // --- Passage Group 4: History/Humanities - Art and Authenticity (Q13-15) ---
  {
    id: 13,
    module: 1,
    domain: "Information and Ideas",
    passage: "Critics who argue that digital art cannot be \"authentic\" often confuse authenticity with materiality. They insist that true art requires physical presence\u2014the painter's brushstroke, the sculptor's chisel mark, the unique physical object. But this view overlooks a deeper meaning of authenticity: an artwork can be authentic in the sense of being true to the artist's vision and responsive to its cultural moment. When Nigerian artist Osinachi creates digital portraits using Microsoft Word, the works are no less authentic than paintings by Vermeer. Both artists mastered their chosen tools to serve a creative vision, whether those tools were brushes and oil paints or a keyboard and software.",
    text: "The author's central claim is that",
    options: [
      { id: "A", text: "digital art is aesthetically superior to traditional art forms" },
      { id: "B", text: "authenticity in art should be defined by artistic vision rather than physical material" },
      { id: "C", text: "most art critics are incapable of evaluating contemporary digital works" },
      { id: "D", text: "Osinachi's work is significant mainly because of its innovative technique" }
    ],
    correctAnswer: "B",
    explanation: "The author argues that authenticity should be understood as being \"true to the artist's vision\" and \"responsive to its cultural moment\" rather than requiring physical materiality. Option B captures this central claim. Option A is not argued; option C overstates the passage (\"often\" not \"most\"); option D focuses on a supporting example rather than the main argument.",
    difficulty: "easy"
  },
  {
    id: 14,
    module: 1,
    domain: "Craft and Structure",
    passage: "Critics who argue that digital art cannot be \"authentic\" often confuse authenticity with materiality. They insist that true art requires physical presence\u2014the painter's brushstroke, the sculptor's chisel mark, the unique physical object. But this view overlooks a deeper meaning of authenticity: an artwork can be authentic in the sense of being true to the artist's vision and responsive to its cultural moment. When Nigerian artist Osinachi creates digital portraits using Microsoft Word, the works are no less authentic than paintings by Vermeer. Both artists mastered their chosen tools to serve a creative vision, whether those tools were brushes and oil paints or a keyboard and software.",
    text: "The author mentions \"brushstroke\" and \"chisel mark\" primarily to",
    options: [
      { id: "A", text: "compare the skill levels required for different artistic media" },
      { id: "B", text: "illustrate the physical evidence that critics associate with artistic authenticity" },
      { id: "C", text: "argue that traditional art forms require more training than digital art" },
      { id: "D", text: "provide historical examples of artistic techniques from different eras" }
    ],
    correctAnswer: "B",
    explanation: "The author presents brushstrokes and chisel marks as examples of the \"physical presence\" that critics require for authenticity. They illustrate the material-based conception of authenticity that the author is challenging. Option B correctly identifies this illustrative purpose. Options A, C, and D misread the author's rhetorical strategy.",
    difficulty: "medium"
  },
  {
    id: 15,
    module: 1,
    domain: "Information and Ideas",
    passage: "Critics who argue that digital art cannot be \"authentic\" often confuse authenticity with materiality. They insist that true art requires physical presence\u2014the painter's brushstroke, the sculptor's chisel mark, the unique physical object. But this view overlooks a deeper meaning of authenticity: an artwork can be authentic in the sense of being true to the artist's vision and responsive to its cultural moment. When Nigerian artist Osinachi creates digital portraits using Microsoft Word, the works are no less authentic than paintings by Vermeer. Both artists mastered their chosen tools to serve a creative vision, whether those tools were brushes and oil paints or a keyboard and software.",
    text: "Which choice best describes the function of the final sentence in the passage?",
    options: [
      { id: "A", text: "It introduces a counterargument that the author will address in a later paragraph" },
      { id: "B", text: "It summarizes the author's argument by drawing a parallel between two artists" },
      { id: "C", text: "It shifts the focus from traditional art to digital art exclusively" },
      { id: "D", text: "It concedes that Vermeer's work is superior to Osinachi's" }
    ],
    correctAnswer: "B",
    explanation: "The final sentence reinforces the author's argument by comparing Osinachi and Vermeer, showing that both artists exemplify authenticity through mastery of their tools in service of their vision. It provides a concrete parallel that encapsulates the author's claim. Option B correctly identifies this summarizing function. Options A and D misread the relationship between the two artists; option C is wrong because the sentence discusses both.",
    difficulty: "medium"
  },

  // --- Passage Group 5: Science with Data - Microbiome (Q16-18) ---
  {
    id: 16,
    module: 1,
    domain: "Information and Ideas",
    passage: "The human gut microbiome\u2014the vast community of microorganisms living in the digestive tract\u2014is increasingly recognized as vital to health. Researchers at Stanford University followed 100 participants over five years, tracking their diets and gut bacteria. Those who ate thirty or more different types of plants per week had, on average, 40% greater microbial diversity than those who ate fewer than ten plant types. Greater microbial diversity is linked to lower rates of inflammatory diseases and stronger immune function. The study concluded that dietary variety, not any single superfood, is the most important factor in cultivating a healthy microbiome.",
    text: "According to the passage, eating thirty or more types of plants per week is associated with",
    options: [
      { id: "A", text: "a 40% increase in overall calorie intake" },
      { id: "B", text: "significantly higher gut microbial diversity" },
      { id: "C", text: "complete immunity to inflammatory conditions" },
      { id: "D", text: "reduced appetite for plant-based foods" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that participants eating thirty or more plant types per week had 40% greater microbial diversity than those eating fewer than ten. Option B correctly identifies this association. Option A confuses diversity with calories; option C overstates the benefit (the passage says \"lower rates,\" not complete immunity); option D is not mentioned.",
    difficulty: "easy"
  },
  {
    id: 17,
    module: 1,
    domain: "Information and Ideas",
    passage: "The human gut microbiome\u2014the vast community of microorganisms living in the digestive tract\u2014is increasingly recognized as vital to health. Researchers at Stanford University followed 100 participants over five years, tracking their diets and gut bacteria. Those who ate thirty or more different types of plants per week had, on average, 40% greater microbial diversity than those who ate fewer than ten plant types. Greater microbial diversity is linked to lower rates of inflammatory diseases and stronger immune function. The study concluded that dietary variety, not any single superfood, is the most important factor in cultivating a healthy microbiome.",
    text: "Which sentence from the passage best supports the claim that microbial diversity benefits human health?",
    options: [
      { id: "A", text: "\"The human gut microbiome\u2026is increasingly recognized as vital to health\"" },
      { id: "B", text: "\"Those who ate thirty or more different types of plants per week had, on average, 40% greater microbial diversity\"" },
      { id: "C", text: "\"Greater microbial diversity is linked to lower rates of inflammatory diseases and stronger immune function\"" },
      { id: "D", text: "\"The study concluded that dietary variety\u2026is the most important factor in cultivating a healthy microbiome\"" }
    ],
    correctAnswer: "C",
    explanation: "The question asks for evidence that microbial diversity directly benefits health. Option C explicitly states the health benefits: \"lower rates of inflammatory diseases and stronger immune function\" are linked to greater diversity. Options A and D state the importance of the microbiome generally but do not link diversity to specific health outcomes. Option B presents data about diet but not health impacts.",
    difficulty: "medium"
  },
  {
    id: 18,
    module: 1,
    domain: "Craft and Structure",
    passage: "The human gut microbiome\u2014the vast community of microorganisms living in the digestive tract\u2014is increasingly recognized as vital to health. Researchers at Stanford University followed 100 participants over five years, tracking their diets and gut bacteria. Those who ate thirty or more different types of plants per week had, on average, 40% greater microbial diversity than those who ate fewer than ten plant types. Greater microbial diversity is linked to lower rates of inflammatory diseases and stronger immune function. The study concluded that dietary variety, not any single superfood, is the most important factor in cultivating a healthy microbiome.",
    text: "What is the most logical takeaway from the study described in the passage?",
    options: [
      { id: "A", text: "A healthy microbiome is determined primarily by genetic factors" },
      { id: "B", text: "Eating a wide range of plants matters more than focusing on specific healthy foods" },
      { id: "C", text: "High-fiber diets are the only way to achieve better immune function" },
      { id: "D", text: "Microbiome diversity decreases naturally with age" }
    ],
    correctAnswer: "B",
    explanation: "The passage concludes that dietary variety, not any single superfood, is the most important factor for a healthy microbiome. Option B restates this conclusion accurately. Option A introduces genetic factors not discussed; option C is too extreme (\"the only way\"); option D introduces age, which is not mentioned in the passage.",
    difficulty: "easy"
  },

  // --- Standalone Grammar: Standard English Conventions (Q19-24) ---
  {
    id: 19,
    module: 1,
    domain: "Standard English Conventions",
    text: "The panel of experts, after reviewing the evidence for several weeks, _____ ready to announce its decision.",
    options: [
      { id: "A", text: "is" },
      { id: "B", text: "are" },
      { id: "C", text: "were" },
      { id: "D", text: "have been" }
    ],
    correctAnswer: "A",
    explanation: "The subject is \"panel,\" which is a collective noun. In American English, collective nouns take singular verbs. \"Panel\u2026is ready\" is correct. The phrase \"of experts\" is a prepositional modifier and does not affect subject-verb agreement. Option B (\"are\") is plural; options C and D are also plural forms.",
    difficulty: "easy"
  },
  {
    id: 20,
    module: 1,
    domain: "Standard English Conventions",
    text: "Each participant was asked to bring _____ own laptop to the workshop.",
    options: [
      { id: "A", text: "their" },
      { id: "B", text: "his or her" },
      { id: "C", text: "they're" },
      { id: "D", text: "there" }
    ],
    correctAnswer: "B",
    explanation: "\"Each participant\" is a singular indefinite antecedent requiring a singular pronoun. \"His or her\" is the formal singular possessive pronoun. Option A (\"their\") is plural; option C (\"they're\") is a contraction of \"they are\"; option D (\"there\") is a location or expletive word.",
    difficulty: "medium"
  },
  {
    id: 21,
    module: 1,
    domain: "Standard English Conventions",
    text: "Although the exam was challenging, David remained focused throughout, _____ each question methodically before moving to the next.",
    options: [
      { id: "A", text: "and answered" },
      { id: "B", text: "answering" },
      { id: "C", text: "he answered" },
      { id: "D", text: "answered" }
    ],
    correctAnswer: "B",
    explanation: "The sentence requires a participial phrase to describe David's methodical approach. \"Answering\" (present participle) correctly connects to the subject and describes how he remained focused. Option A creates a compound predicate that disrupts the clause structure; option C creates a comma splice; option D is a bare verb that does not connect properly.",
    difficulty: "easy"
  },
  {
    id: 22,
    module: 1,
    domain: "Standard English Conventions",
    text: "The research team published a study _____ findings challenged several long-held assumptions in the field.",
    options: [
      { id: "A", text: "who's" },
      { id: "B", text: "whose" },
      { id: "C", text: "of which" },
      { id: "D", text: "that its" }
    ],
    correctAnswer: "B",
    explanation: "\"Whose\" is the possessive relative pronoun that correctly links the study to its findings. The study's findings challenged assumptions. Option A (\"who's\") is a contraction of \"who is\"; option C is awkward and unidiomatic here; option D is redundant because \"that\" already serves as a relative pronoun.",
    difficulty: "easy"
  },
  {
    id: 23,
    module: 1,
    domain: "Standard English Conventions",
    text: "The experiment required precise temperature control _____ even a minor fluctuation could invalidate the results.",
    options: [
      { id: "A", text: ", therefore" },
      { id: "B", text: "; although" },
      { id: "C", text: ": because" },
      { id: "D", text: ", for" }
    ],
    correctAnswer: "C",
    explanation: "The second part of the sentence explains why precise temperature control is required. A colon with \"because\" correctly introduces the explanatory clause. Option A uses \"therefore\" which reverses the logical relationship; option B uses \"although\" which suggests contrast; option D creates a comma splice.",
    difficulty: "hard"
  },
  {
    id: 24,
    module: 1,
    domain: "Standard English Conventions",
    text: "The museum acquired three paintings by the artist _____ a sculpture from his early period.",
    options: [
      { id: "A", text: ", also" },
      { id: "B", text: "and" },
      { id: "C", text: ": plus" },
      { id: "D", text: "as well as" }
    ],
    correctAnswer: "B",
    explanation: "The sentence lists two items the museum acquired: \"three paintings\" and \"a sculpture.\" The conjunction \"and\" correctly joins the two items in a simple series. Option A creates a comma splice; option C is awkward; option D could work but \"and\" is the most direct and standard connector.",
    difficulty: "medium"
  },

  // --- Transitions: Expression of Ideas (Q25-30) ---
  {
    id: 25,
    module: 1,
    domain: "Expression of Ideas",
    text: "The city's recycling program initially struggled with low participation rates. _____ the introduction of a curbside pickup system, the recycling rate more than doubled within six months.",
    options: [
      { id: "A", text: "Nevertheless," },
      { id: "B", text: "Following" },
      { id: "C", text: "In contrast," },
      { id: "D", text: "Instead," }
    ],
    correctAnswer: "B",
    explanation: "The sentence describes a sequence: the curbside system was introduced, and then the recycling rate doubled. \"Following\" correctly indicates this temporal sequence. Option A suggests contrast despite the previous difficulty; option C also suggests contrast; option D suggests replacement, which is not logical here.",
    difficulty: "easy"
  },
  {
    id: 26,
    module: 1,
    domain: "Expression of Ideas",
    text: "The new software promised to streamline workflow and reduce manual data entry. _____, employees found the interface confusing and the transition period frustrating, leading to an initial drop in productivity.",
    options: [
      { id: "A", text: "Therefore," },
      { id: "B", text: "Similarly," },
      { id: "C", text: "However," },
      { id: "D", text: "For example," }
    ],
    correctAnswer: "C",
    explanation: "The first sentence describes the promised benefits of the software (positive). The second sentence describes actual negative experiences (confusing, frustrating). The relationship is one of contrast between expectation and reality. \"However\" signals this contrast correctly. Options A and B suggest agreement rather than contrast; option D would introduce an example of the first claim, which is not what the second sentence does.",
    difficulty: "easy"
  },
  {
    id: 27,
    module: 1,
    domain: "Expression of Ideas",
    text: "Regular exercise is known to improve cardiovascular health and reduce the risk of chronic disease. _____, physical activity has been shown to enhance cognitive function and mood regulation through the release of endorphins and increased blood flow to the brain.",
    options: [
      { id: "A", text: "Additionally," },
      { id: "B", text: "Nevertheless," },
      { id: "C", text: "Conversely," },
      { id: "D", text: "For this reason," }
    ],
    correctAnswer: "A",
    explanation: "The second sentence adds further benefits of exercise beyond those mentioned in the first sentence. \"Additionally\" signals this additive relationship. Options B and C suggest contrast, which is not present; option D suggests causality, but the second sentence is presenting a separate category of benefit rather than a direct consequence of the first.",
    difficulty: "easy"
  },
  {
    id: 28,
    module: 1,
    domain: "Expression of Ideas",
    text: "Most studies of remote work focus on productivity metrics and employee satisfaction surveys. _____, relatively few examine the long-term career implications for workers who rarely interact with colleagues in person.",
    options: [
      { id: "A", text: "On the contrary," },
      { id: "B", text: "Furthermore," },
      { id: "C", text: "In other words," },
      { id: "D", text: "Yet" }
    ],
    correctAnswer: "D",
    explanation: "The first sentence states what most studies focus on (productivity and satisfaction). The second points out a gap\u2014few studies look at long-term career effects. \"Yet\" signals this contrast between the abundance of one type of research and the scarcity of another. Option A would mean the opposite; option B suggests addition when contrast is needed; option C restates the same idea.",
    difficulty: "medium"
  },
  {
    id: 29,
    module: 1,
    domain: "Expression of Ideas",
    text: "The company's quarterly report showed strong revenue growth. _____, the CEO expressed concern about rising operational costs that could affect future profitability.",
    options: [
      { id: "A", text: "Similarly," },
      { id: "B", text: "For instance," },
      { id: "C", text: "Nevertheless," },
      { id: "D", text: "In addition," }
    ],
    correctAnswer: "C",
    explanation: "The first sentence presents positive news (strong revenue growth). The second introduces a reason for concern despite that good news. \"Nevertheless\" signals this contrast between the positive surface and the underlying worry. Option A suggests similarity; option B would introduce an example; option D would add a further positive point.",
    difficulty: "medium"
  },
  {
    id: 30,
    module: 1,
    domain: "Expression of Ideas",
    text: "The architect believed that a building should reflect its natural surroundings. _____, she designed the museum to follow the contours of the hillside and incorporate locally sourced stone.",
    options: [
      { id: "A", text: "However," },
      { id: "B", text: "Accordingly," },
      { id: "C", text: "Instead," },
      { id: "D", text: "On the other hand," }
    ],
    correctAnswer: "B",
    explanation: "The second sentence describes how the architect's design choices followed from her stated philosophy. \"Accordingly\" signals this cause-and-effect relationship between principle and action. Options A, C, and D all suggest contrast, which does not exist between the belief and its application.",
    difficulty: "medium"
  },

  // --- Rhetorical Synthesis: Expression of Ideas (Q31-33) ---
  {
    id: 31,
    module: 1,
    domain: "Expression of Ideas",
    text: "While researching the history of jazz music, a student takes the following notes:\n\n\u2022 Jazz originated in New Orleans in the early 20th century\n\u2022 It blended African American musical traditions with European harmonic structures\n\u2022 Louis Armstrong popularized scat singing and solo improvisation in the 1920s\n\u2022 The Harlem Renaissance of the 1920s and 1930s provided a cultural platform for jazz musicians\n\nWhich choice most effectively combines the notes to emphasize the cultural context that helped jazz flourish?",
    options: [
      { id: "A", text: "Jazz originated in New Orleans when Louis Armstrong popularized scat singing." },
      { id: "B", text: "Jazz, which originated in New Orleans and blended African American and European traditions, flourished in part because the Harlem Renaissance provided a cultural platform for its musicians." },
      { id: "C", text: "Louis Armstrong popularized scat singing and solo improvisation in the 1920s during the Harlem Renaissance." },
      { id: "D", text: "The Harlem Renaissance was a cultural movement that occurred in the 1920s and 1930s." }
    ],
    correctAnswer: "B",
    explanation: "The question asks for a synthesis that emphasizes the cultural context. Option B connects jazz's origins and blended traditions with the Harlem Renaissance as a platform for growth, directly addressing the \"cultural context\" prompt. Option A omits the Harlem Renaissance entirely; option C subordinates the cultural context to Armstrong's biography; option D omits jazz entirely.",
    difficulty: "medium"
  },
  {
    id: 32,
    module: 1,
    domain: "Expression of Ideas",
    text: "While researching urban beekeeping, a student gathers the following information:\n\n\u2022 Urban beekeeping has grown 40% in major US cities since 2015\n\u2022 City environments can expose bees to higher levels of pollutants than rural areas\n\u2022 Urban bees often have access to a wider variety of flowering plants due to diverse landscaping\n\u2022 Community gardens in cities provide pesticide-free foraging zones\n\nWhich choice most effectively combines the notes to present a balanced perspective on the risks and benefits of urban beekeeping?",
    options: [
      { id: "A", text: "Urban beekeeping has grown 40% since 2015, and community gardens provide pesticide-free zones." },
      { id: "B", text: "Although urban bees face higher pollutant exposure than rural bees, they also benefit from diverse plantings and pesticide-free community gardens." },
      { id: "C", text: "City environments expose bees to higher levels of pollutants because of diverse landscaping." },
      { id: "D", text: "Diverse plantings and community gardens have caused urban beekeeping to grow 40% since 2015." }
    ],
    correctAnswer: "B",
    explanation: "The question asks for a balanced presentation of both risks and benefits. Option B uses \"Although\" to balance the risk (higher pollutants) against the benefits (diverse plantings, pesticide-free gardens). Option A omits risks; option C presents a causal relationship not supported by the notes; option D misattributes growth to specific causes.",
    difficulty: "medium"
  },
  {
    id: 33,
    module: 1,
    domain: "Expression of Ideas",
    text: "While researching the development of electric vehicles, a student takes the following notes:\n\n\u2022 The first practical electric car was built in the 1830s, decades before the gasoline automobile\n\u2022 Electric vehicles were popular in the early 1900s but declined after Henry Ford's mass-produced Model T\n\u2022 Modern EVs use lithium-ion batteries developed in the 1990s\n\u2022 Global EV sales exceeded 10 million units for the first time in 2022\n\nWhich choice most effectively combines the notes to emphasize the contrast between the early history and the recent resurgence of electric vehicles?",
    options: [
      { id: "A", text: "Electric vehicles were popular in the early 1900s before declining after the Model T." },
      { id: "B", text: "Although the first practical electric car was built in the 1830s, EV sales did not exceed 10 million until 2022, showing a recent surge after a long gap." },
      { id: "C", text: "Modern EVs use lithium-ion batteries developed in the 1990s, and global EV sales exceeded 10 million in 2022." },
      { id: "D", text: "The first practical electric car was built in the 1830s, and Henry Ford mass-produced the Model T." }
    ],
    correctAnswer: "B",
    explanation: "The question asks for a synthesis emphasizing the contrast between early history and recent resurgence. Option B uses \"Although\" to contrast the early invention (1830s) with the recent milestone (10 million sales in 2022), explicitly highlighting the \"long gap.\" Options A and C omit one side of the contrast; option D fails to mention the resurgence at all.",
    difficulty: "medium"
  },

  // ======================================================================
  // MODULE 2 - Questions 34-66 (harder overall; more medium and hard)
  // ======================================================================

  // --- Passage Group 6: Science - Exoplanets (Q34-36) ---
  {
    id: 34,
    module: 2,
    domain: "Information and Ideas",
    passage: "The discovery of exoplanets has transformed our understanding of planetary systems. Until the 1990s, our solar system provided the only known example of how planets form and orbit a star. The first confirmed exoplanet orbiting a Sun-like star, 51 Pegasi b, defied expectations: it was a gas giant with an orbital period of just four days, placing it closer to its star than Mercury is to the Sun. This \"hot Jupiter\" forced astronomers to revise their models of planetary formation. Subsequent discoveries have revealed an astonishing diversity\u2014systems with multiple planets in resonant orbits, planets with eccentric paths that would eject any neighboring worlds, and rocky planets in the habitable zones of their stars. Each new finding challenges the assumption that our solar system represents the norm.",
    text: "The passage suggests that before the discovery of 51 Pegasi b, astronomers had assumed that",
    options: [
      { id: "A", text: "gas giant planets could not exist outside our solar system" },
      { id: "B", text: "large planets generally formed at significant distances from their stars" },
      { id: "C", text: "all stars have planets orbiting them" },
      { id: "D", text: "exoplanets would be discovered within a few decades" }
    ],
    correctAnswer: "B",
    explanation: "The passage describes 51 Pegasi b as a \"hot Jupiter\" that \"defied expectations\" because its four-day orbit placed it extremely close to its star. The phrase \"forced astronomers to revise their models\" implies that prior models assumed large gas giants would form farther from their stars (as Jupiter does in our solar system). Option B captures this assumption. Option A is contradicted by the fact that they were searching for exoplanets; options C and D are not supported.",
    difficulty: "medium"
  },
  {
    id: 35,
    module: 2,
    domain: "Craft and Structure",
    passage: "The discovery of exoplanets has transformed our understanding of planetary systems. Until the 1990s, our solar system provided the only known example of how planets form and orbit a star. The first confirmed exoplanet orbiting a Sun-like star, 51 Pegasi b, defied expectations: it was a gas giant with an orbital period of just four days, placing it closer to its star than Mercury is to the Sun. This \"hot Jupiter\" forced astronomers to revise their models of planetary formation. Subsequent discoveries have revealed an astonishing diversity\u2014systems with multiple planets in resonant orbits, planets with eccentric paths that would eject any neighboring worlds, and rocky planets in the habitable zones of their stars. Each new finding challenges the assumption that our solar system represents the norm.",
    text: "As used in the passage, \"defied expectations\" most nearly means that 51 Pegasi b",
    options: [
      { id: "A", text: "was discovered using an innovative technique" },
      { id: "B", text: "contradicted what astronomers had predicted about planetary formation" },
      { id: "C", text: "exceeded the size limits that scientists believed possible" },
      { id: "D", text: "confirmed the leading theory of planetary migration" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that 51 Pegasi b was a gas giant in a four-day orbit, which contradicted existing planetary formation models. The phrase \"defied expectations\" refers to this contradiction of what astronomers had predicted. Option B captures this meaning. Options A, C, and D do not align with the context of revising models.",
    difficulty: "medium"
  },
  {
    id: 36,
    module: 2,
    domain: "Information and Ideas",
    passage: "The discovery of exoplanets has transformed our understanding of planetary systems. Until the 1990s, our solar system provided the only known example of how planets form and orbit a star. The first confirmed exoplanet orbiting a Sun-like star, 51 Pegasi b, defied expectations: it was a gas giant with an orbital period of just four days, placing it closer to its star than Mercury is to the Sun. This \"hot Jupiter\" forced astronomers to revise their models of planetary formation. Subsequent discoveries have revealed an astonishing diversity\u2014systems with multiple planets in resonant orbits, planets with eccentric paths that would eject any neighboring worlds, and rocky planets in the habitable zones of their stars. Each new finding challenges the assumption that our solar system represents the norm.",
    text: "Which choice best describes the overall structure of the passage?",
    options: [
      { id: "A", text: "A problem is presented, and multiple solutions are evaluated" },
      { id: "B", text: "A historical discovery is described, and its implications for a field are explored" },
      { id: "C", text: "Two competing theories are compared, and one is proven correct" },
      { id: "D", text: "A specific example is introduced, and its practical applications are listed" }
    ],
    correctAnswer: "B",
    explanation: "The passage begins with the discovery of exoplanets as a transformative event, describes the specific case of 51 Pegasi b, and then explores how subsequent discoveries have continued to reshape planetary science. Option B captures this structure of a historical discovery followed by exploration of its implications. Options A, C, and D do not align with the passage's narrative arc.",
    difficulty: "hard"
  },

  // --- Passage Group 7: Literature - Modern Fiction (Q37-39) ---
  {
    id: 37,
    module: 2,
    domain: "Information and Ideas",
    passage: "The letter arrived on a Tuesday, though it had been postmarked nearly three weeks earlier. James turned it over in his hands, studying the faded ink and the return address he did not recognize. The envelope was thick\u2014not with pages, he guessed, but with the weight of whatever news it carried. He had learned to fear thick envelopes; thin ones brought bills and flyers, but thick ones always meant something had changed. He slid his finger under the seal and paused, watching the afternoon light catch the edge of the paper inside. Whatever was written there had traveled six hundred miles to reach him. It could wait another minute while he prepared himself to receive it.",
    text: "The passage suggests that James hesitates to open the envelope primarily because he",
    options: [
      { id: "A", text: "does not recognize the handwriting on the front" },
      { id: "B", text: "suspects the letter contains unwelcome news" },
      { id: "C", text: "is distracted by the afternoon light" },
      { id: "D", text: "prefers to read letters in the morning" }
    ],
    correctAnswer: "B",
    explanation: "The passage explains that James has learned to fear thick envelopes because \"thick ones always meant something had changed,\" implying he associates them with significant, potentially unwelcome developments. His hesitation\u2014\"It could wait another minute while he prepared himself\"\u2014confirms that he is bracing for bad news. Option B captures this. Options A, C, and D miss the emotional context established in the passage.",
    difficulty: "medium"
  },
  {
    id: 38,
    module: 2,
    domain: "Craft and Structure",
    passage: "The letter arrived on a Tuesday, though it had been postmarked nearly three weeks earlier. James turned it over in his hands, studying the faded ink and the return address he did not recognize. The envelope was thick\u2014not with pages, he guessed, but with the weight of whatever news it carried. He had learned to fear thick envelopes; thin ones brought bills and flyers, but thick ones always meant something had changed. He slid his finger under the seal and paused, watching the afternoon light catch the edge of the paper inside. Whatever was written there had traveled six hundred miles to reach him. It could wait another minute while he prepared himself to receive it.",
    text: "The phrase \"the weight of whatever news it carried\" serves primarily to",
    options: [
      { id: "A", text: "suggest that the envelope contains multiple documents" },
      { id: "B", text: "indicate James's sense that the contents carry emotional significance" },
      { id: "C", text: "reveal that James can guess what the letter contains" },
      { id: "D", text: "describe the physical density of the paper inside" }
    ],
    correctAnswer: "B",
    explanation: "The phrase attributes emotional weight, not physical density, to the envelope's thickness. James associates thick envelopes with significant changes, and the \"weight\" here refers to the potential emotional impact of the letter's contents. Option B correctly identifies this figurative meaning. Options A and D interpret the phrase too literally; option C contradicts James's uncertainty about the letter's sender.",
    difficulty: "medium"
  },
  {
    id: 39,
    module: 2,
    domain: "Craft and Structure",
    passage: "The letter arrived on a Tuesday, though it had been postmarked nearly three weeks earlier. James turned it over in his hands, studying the faded ink and the return address he did not recognize. The envelope was thick\u2014not with pages, he guessed, but with the weight of whatever news it carried. He had learned to fear thick envelopes; thin ones brought bills and flyers, but thick ones always meant something had changed. He slid his finger under the seal and paused, watching the afternoon light catch the edge of the paper inside. Whatever was written there had traveled six hundred miles to reach him. It could wait another minute while he prepared himself to receive it.",
    text: "The passage is written from which point of view?",
    options: [
      { id: "A", text: "First-person from James's perspective" },
      { id: "B", text: "Third-person limited, focused on James" },
      { id: "C", text: "Third-person omniscient" },
      { id: "D", text: "Second-person addressing the reader" }
    ],
    correctAnswer: "B",
    explanation: "The passage uses third-person pronouns (\"he,\" \"his\") and provides access to James's thoughts and feelings (\"He had learned to fear thick envelopes,\" \"It could wait another minute while he prepared himself\") but does not enter the minds of other characters. This is third-person limited narration focused on James. Options A, C, and D do not match the narrative voice.",
    difficulty: "easy"
  },

  // --- Passage Group 8: Social Science - Behavioral Economics (Q40-42) ---
  {
    id: 40,
    module: 2,
    domain: "Information and Ideas",
    passage: "Behavioral economists have identified a cognitive bias known as the \"sunk cost fallacy,\" in which people continue investing in a failing endeavor because they have already committed resources to it. Classic examples include staying through a boring movie because you paid for the ticket or continuing to pour money into a broken car because of previous repair costs. From a purely rational standpoint, only future costs and benefits should matter\u2014the past investment is irretrievable and should not influence decisions. Yet the fallacy persists powerfully across cultures and contexts. Recent neuroimaging studies suggest that the sunk cost fallacy may stem from an aversion to admitting that prior decisions were mistaken, activating brain regions associated with loss and regret rather than with rational calculation.",
    text: "According to the passage, the sunk cost fallacy occurs when people",
    options: [
      { id: "A", text: "refuse to pay more for a product than its market value" },
      { id: "B", text: "base current decisions on past irrecoverable investments" },
      { id: "C", text: "calculate future costs more carefully than past ones" },
      { id: "D", text: "prefer short-term gains over long-term benefits" }
    ],
    correctAnswer: "B",
    explanation: "The passage defines the sunk cost fallacy as continuing to invest in a failing endeavor because of resources already committed. Option B accurately describes this: basing current decisions on past investments that cannot be recovered. Options A, C, and D describe different economic behaviors not discussed in the passage.",
    difficulty: "easy"
  },
  {
    id: 41,
    module: 2,
    domain: "Craft and Structure",
    passage: "Behavioral economists have identified a cognitive bias known as the \"sunk cost fallacy,\" in which people continue investing in a failing endeavor because they have already committed resources to it. Classic examples include staying through a boring movie because you paid for the ticket or continuing to pour money into a broken car because of previous repair costs. From a purely rational standpoint, only future costs and benefits should matter\u2014the past investment is irretrievable and should not influence decisions. Yet the fallacy persists powerfully across cultures and contexts. Recent neuroimaging studies suggest that the sunk cost fallacy may stem from an aversion to admitting that prior decisions were mistaken, activating brain regions associated with loss and regret rather than with rational calculation.",
    text: "The phrase \"From a purely rational standpoint\" mainly serves to",
    options: [
      { id: "A", text: "introduce the irrational behavior that the fallacy describes" },
      { id: "B", text: "indicate that the author endorses rational decision-making exclusively" },
      { id: "C", text: "establish a benchmark of optimal decision-making against which the fallacy can be measured" },
      { id: "D", text: "criticize behavioral economics for ignoring emotional factors" }
    ],
    correctAnswer: "C",
    explanation: "The phrase introduces what rational decision-making would look like (considering only future costs and benefits), which serves as a benchmark that contrasts with the irrational sunk cost behavior. This establishes a standard for measuring how the fallacy deviates from optimal reasoning. Option C correctly identifies this function. Options A and B misread the phrase's rhetorical role; option D introduces a critique not present.",
    difficulty: "hard"
  },
  {
    id: 42,
    module: 2,
    domain: "Information and Ideas",
    passage: "Behavioral economists have identified a cognitive bias known as the \"sunk cost fallacy,\" in which people continue investing in a failing endeavor because they have already committed resources to it. Classic examples include staying through a boring movie because you paid for the ticket or continuing to pour money into a broken car because of previous repair costs. From a purely rational standpoint, only future costs and benefits should matter\u2014the past investment is irretrievable and should not influence decisions. Yet the fallacy persists powerfully across cultures and contexts. Recent neuroimaging studies suggest that the sunk cost fallacy may stem from an aversion to admitting that prior decisions were mistaken, activating brain regions associated with loss and regret rather than with rational calculation.",
    text: "Neuroimaging research cited in the passage suggests that the sunk cost fallacy is related to",
    options: [
      { id: "A", text: "a failure to understand basic economic principles" },
      { id: "B", text: "cultural differences in attitudes toward money" },
      { id: "C", text: "an emotional resistance to acknowledging past errors" },
      { id: "D", text: "a genetic predisposition toward risk-taking behavior" }
    ],
    correctAnswer: "C",
    explanation: "The passage states that neuroimaging studies suggest the fallacy \"may stem from an aversion to admitting that prior decisions were mistaken\" and activates brain regions associated with loss and regret. This directly supports option C. Option A is too basic; option B is contradicted by \"persists across cultures\"; option D introduces genetics not discussed.",
    difficulty: "medium"
  },

  // --- Cross-Text Comparison: AI Ethics (Q43-45) ---
  {
    id: 43,
    module: 2,
    domain: "Craft and Structure",
    passage: "Passage A\nArtificial intelligence systems are increasingly making decisions that affect people's lives\u2014from loan approvals to hiring to criminal sentencing. These systems offer the promise of impartiality, since they apply the same criteria to every case without human prejudice. However, when the training data used to build these systems reflects historical biases, the AI reproduces and even amplifies those biases. The solution is not to abandon AI but to develop rigorous auditing frameworks that detect and correct for bias before deployment. With proper oversight, AI can become fairer than human decision-makers.\n\nPassage B\nThe claim that AI can be made objective through better data and auditing overlooks a fundamental problem: bias is not merely a data issue but a design issue. Every AI system embeds the values and assumptions of its creators\u2014what problems to solve, which metrics to optimize, how to define \"success.\" These choices are inherently subjective and political. No amount of auditing can eliminate bias from a system whose very architecture reflects particular worldviews. Instead of chasing the impossible goal of neutral AI, we should focus on ensuring that the communities affected by these systems have a voice in how they are designed.",
    text: "The authors of the two passages disagree primarily about whether",
    options: [
      { id: "A", text: "AI systems are currently used in hiring and criminal sentencing" },
      { id: "B", text: "training data can contain historical biases" },
      { id: "C", text: "bias in AI can be substantially eliminated through auditing and oversight" },
      { id: "D", text: "human decision-makers are themselves biased" }
    ],
    correctAnswer: "C",
    explanation: "Passage A argues that bias can be addressed through rigorous auditing frameworks, making AI potentially fairer than humans. Passage B counters that bias is inherent to the design process and cannot be eliminated through auditing alone. The central disagreement is about whether bias in AI can be substantially eliminated. Options A, B, and D are points both passages would likely accept.",
    difficulty: "medium"
  },
  {
    id: 44,
    module: 2,
    domain: "Information and Ideas",
    passage: "Passage A\nArtificial intelligence systems are increasingly making decisions that affect people's lives\u2014from loan approvals to hiring to criminal sentencing. These systems offer the promise of impartiality, since they apply the same criteria to every case without human prejudice. However, when the training data used to build these systems reflects historical biases, the AI reproduces and even amplifies those biases. The solution is not to abandon AI but to develop rigorous auditing frameworks that detect and correct for bias before deployment. With proper oversight, AI can become fairer than human decision-makers.\n\nPassage B\nThe claim that AI can be made objective through better data and auditing overlooks a fundamental problem: bias is not merely a data issue but a design issue. Every AI system embeds the values and assumptions of its creators\u2014what problems to solve, which metrics to optimize, how to define \"success.\" These choices are inherently subjective and political. No amount of auditing can eliminate bias from a system whose very architecture reflects particular worldviews. Instead of chasing the impossible goal of neutral AI, we should focus on ensuring that the communities affected by these systems have a voice in how they are designed.",
    text: "Which assumption underlying the argument in Passage A does Passage B directly challenge?",
    options: [
      { id: "A", text: "AI systems are already widely deployed in high-stakes decisions" },
      { id: "B", text: "Training data can contain historical biases" },
      { id: "C", text: "Bias in AI is primarily a technical problem that auditing can solve" },
      { id: "D", text: "Humans are inherently biased decision-makers" }
    ],
    correctAnswer: "C",
    explanation: "Passage A assumes that bias is a solvable technical problem: with \"rigorous auditing frameworks\" that \"detect and correct for bias,\" AI can become fairer. Passage B directly challenges this by arguing that bias is not merely a data/technical issue but a \"design issue\" rooted in subjective choices. Option C identifies this challenged assumption. Options A and B are points Passage B accepts; option D is not central to either argument.",
    difficulty: "hard"
  },
  {
    id: 45,
    module: 2,
    domain: "Information and Ideas",
    passage: "Passage A\nArtificial intelligence systems are increasingly making decisions that affect people's lives\u2014from loan approvals to hiring to criminal sentencing. These systems offer the promise of impartiality, since they apply the same criteria to every case without human prejudice. However, when the training data used to build these systems reflects historical biases, the AI reproduces and even amplifies those biases. The solution is not to abandon AI but to develop rigorous auditing frameworks that detect and correct for bias before deployment. With proper oversight, AI can become fairer than human decision-makers.\n\nPassage B\nThe claim that AI can be made objective through better data and auditing overlooks a fundamental problem: bias is not merely a data issue but a design issue. Every AI system embeds the values and assumptions of its creators\u2014what problems to solve, which metrics to optimize, how to define \"success.\" These choices are inherently subjective and political. No amount of auditing can eliminate bias from a system whose very architecture reflects particular worldviews. Instead of chasing the impossible goal of neutral AI, we should focus on ensuring that the communities affected by these systems have a voice in how they are designed.",
    text: "What shared concern do both passages express?",
    options: [
      { id: "A", text: "AI systems can produce biased outcomes that affect people's lives" },
      { id: "B", text: "AI should be banned from making important decisions" },
      { id: "C", text: "Auditing frameworks are too expensive to implement" },
      { id: "D", text: "Communities have too little influence over AI design" }
    ],
    correctAnswer: "A",
    explanation: "Both passages acknowledge that AI systems can produce biased outcomes affecting people's lives. Passage A discusses how training data containing biases leads to biased AI decisions. Passage B argues that bias is inherent in design choices but still shares the concern about biased outcomes. Option A represents this shared concern. Options B and C are not advocated by either passage; option D is only mentioned in Passage B.",
    difficulty: "medium"
  },

  // --- Passage Group 9: History - Civil Rights Speech (Q46-48) ---
  {
    id: 46,
    module: 2,
    domain: "Craft and Structure",
    passage: "In her 1964 speech before the Democratic National Convention, Fannie Lou Hamer testified about the brutal realities of voter suppression in Mississippi. Hamer, a former sharecropper, described being fired from her job and forced to leave her home after registering to vote. She recounted being arrested with other activists and severely beaten while in police custody. Her testimony was televised nationally, bringing the violence of Jim Crow segregation into American living rooms. Although President Lyndon Johnson attempted to limit the broadcast's impact by scheduling an impromptu press conference, Hamer's words resonated deeply with viewers. Her speech is remembered as a pivotal moment in the struggle for voting rights, contributing to the momentum that led to the Voting Rights Act of 1965.",
    text: "The passage indicates that Hamer's speech was significant partly because it",
    options: [
      { id: "A", text: "persuaded President Johnson to support voting rights legislation" },
      { id: "B", text: "reached a national audience through live television coverage" },
      { id: "C", text: "was the first speech by a woman at a national political convention" },
      { id: "D", text: "led directly to the arrest of the police officers who had beaten her" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that Hamer's testimony was \"televised nationally\" and \"brought the violence of Jim Crow segregation into American living rooms,\" reaching a wide audience. Option B captures this. Option A is not supported (Johnson tried to limit its impact); option C is not mentioned; option D is not supported by the passage.",
    difficulty: "easy"
  },
  {
    id: 47,
    module: 2,
    domain: "Craft and Structure",
    passage: "In her 1964 speech before the Democratic National Convention, Fannie Lou Hamer testified about the brutal realities of voter suppression in Mississippi. Hamer, a former sharecropper, described being fired from her job and forced to leave her home after registering to vote. She recounted being arrested with other activists and severely beaten while in police custody. Her testimony was televised nationally, bringing the violence of Jim Crow segregation into American living rooms. Although President Lyndon Johnson attempted to limit the broadcast's impact by scheduling an impromptu press conference, Hamer's words resonated deeply with viewers. Her speech is remembered as a pivotal moment in the struggle for voting rights, contributing to the momentum that led to the Voting Rights Act of 1965.",
    text: "The author mentions President Johnson's press conference primarily to",
    options: [
      { id: "A", text: "show that Johnson opposed voting rights legislation at the time" },
      { id: "B", text: "demonstrate that Hamer's testimony faced efforts to suppress its influence" },
      { id: "C", text: "compare Johnson's communication style with Hamer's" },
      { id: "D", text: "explain why the Voting Rights Act was passed in 1965" }
    ],
    correctAnswer: "B",
    explanation: "The passage notes that Johnson attempted to \"limit the broadcast's impact\" by scheduling a competing press conference, which demonstrates that Hamer's testimony was considered threatening enough that someone in power tried to minimize its reach. Option B captures this function. Option A is too strong; option C is not the focus; option D is too broad.",
    difficulty: "medium"
  },
  {
    id: 48,
    module: 2,
    domain: "Information and Ideas",
    passage: "In her 1964 speech before the Democratic National Convention, Fannie Lou Hamer testified about the brutal realities of voter suppression in Mississippi. Hamer, a former sharecropper, described being fired from her job and forced to leave her home after registering to vote. She recounted being arrested with other activists and severely beaten while in police custody. Her testimony was televised nationally, bringing the violence of Jim Crow segregation into American living rooms. Although President Lyndon Johnson attempted to limit the broadcast's impact by scheduling an impromptu press conference, Hamer's words resonated deeply with viewers. Her speech is remembered as a pivotal moment in the struggle for voting rights, contributing to the momentum that led to the Voting Rights Act of 1965.",
    text: "Which conclusion about Hamer's speech is best supported by the passage?",
    options: [
      { id: "A", text: "It was immediately successful in changing federal policy" },
      { id: "B", text: "It gained public attention despite efforts to overshadow it" },
      { id: "C", text: "It was the only televised testimony about voter suppression" },
      { id: "D", text: "It failed to achieve its intended effect in the short term" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that despite Johnson's attempt to limit its impact through a competing press conference, Hamer's words \"resonated deeply with viewers.\" Option B captures this tension between suppression efforts and the speech's actual impact. Option A overstates the immediacy; option C makes an unsupported absolute claim; option D contradicts the passage.",
    difficulty: "medium"
  },

  // --- Passage Group 10: Science with Data - Climate Change (Q49-51) ---
  {
    id: 49,
    module: 2,
    domain: "Information and Ideas",
    passage: "A 2023 study published in Nature Climate Change examined the relationship between rising global temperatures and agricultural productivity. Researchers analyzed crop yield data from 1970 to 2020 across 150 countries, comparing it with temperature and precipitation records. They found that global maize yields have declined by approximately 4% per decade relative to a baseline without climate change, while wheat yields have remained relatively stable due to CO2 fertilization effects. However, the benefits of CO2 fertilization are projected to plateau by mid-century, after which wheat yields are also expected to decline. The study concluded that without accelerated adaptation measures, global food production could face significant shortfalls by 2050.",
    text: "According to the passage, maize yields and wheat yields have responded differently to climate change primarily because",
    options: [
      { id: "A", text: "maize is more sensitive to temperature increases than wheat" },
      { id: "B", text: "wheat has benefited from increased CO2 levels while maize has not" },
      { id: "C", text: "wheat farming uses more advanced irrigation technology" },
      { id: "D", text: "maize is grown in more climate-vulnerable regions" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that maize yields declined while wheat yields remained stable \"due to CO2 fertilization effects,\" which benefit wheat. This directly indicates that wheat has benefited from increased CO2 levels in ways that maize has not. Option B captures this contrast. Options A, C, and D are not supported by the information in the passage.",
    difficulty: "hard"
  },
  {
    id: 50,
    module: 2,
    domain: "Information and Ideas",
    passage: "A 2023 study published in Nature Climate Change examined the relationship between rising global temperatures and agricultural productivity. Researchers analyzed crop yield data from 1970 to 2020 across 150 countries, comparing it with temperature and precipitation records. They found that global maize yields have declined by approximately 4% per decade relative to a baseline without climate change, while wheat yields have remained relatively stable due to CO2 fertilization effects. However, the benefits of CO2 fertilization are projected to plateau by mid-century, after which wheat yields are also expected to decline. The study concluded that without accelerated adaptation measures, global food production could face significant shortfalls by 2050.",
    text: "Which claim is best supported by information in the passage?",
    options: [
      { id: "A", text: "Climate change has had no measurable effect on global wheat yields to date" },
      { id: "B", text: "Maize yields have decreased by 4% each year since 1970" },
      { id: "C", text: "CO2 fertilization will continue to benefit wheat yields indefinitely" },
      { id: "D", text: "The benefits of CO2 on wheat are expected to diminish in the coming decades" }
    ],
    correctAnswer: "D",
    explanation: "The passage says CO2 fertilization benefits are \"projected to plateau by mid-century, after which wheat yields are also expected to decline.\" This directly supports option D: benefits will diminish. Option A is wrong because wheat yields have remained stable precisely because of CO2 effects; option B misreads \"per decade\" as \"per year\"; option C contradicts the plateau projection.",
    difficulty: "hard"
  },
  {
    id: 51,
    module: 2,
    domain: "Craft and Structure",
    passage: "A 2023 study published in Nature Climate Change examined the relationship between rising global temperatures and agricultural productivity. Researchers analyzed crop yield data from 1970 to 2020 across 150 countries, comparing it with temperature and precipitation records. They found that global maize yields have declined by approximately 4% per decade relative to a baseline without climate change, while wheat yields have remained relatively stable due to CO2 fertilization effects. However, the benefits of CO2 fertilization are projected to plateau by mid-century, after which wheat yields are also expected to decline. The study concluded that without accelerated adaptation measures, global food production could face significant shortfalls by 2050.",
    text: "The author's use of \"However\" in the fourth sentence signals that the sentence",
    options: [
      { id: "A", text: "provides additional evidence supporting the same conclusion" },
      { id: "B", text: "introduces a limitation or complication to the seemingly positive finding" },
      { id: "C", text: "offers an alternative explanation for the data presented" },
      { id: "D", text: "summarizes the results described in earlier sentences" }
    ],
    correctAnswer: "B",
    explanation: "The preceding sentence mentions that wheat yields have remained stable (a seemingly positive finding compared to maize). \"However\" signals that the next sentence introduces a complication: this benefit will plateau and then decline. Option B correctly identifies this contrast between the positive surface and the projected limitation. Options A, C, and D do not capture the contrastive function.",
    difficulty: "hard"
  },

  // --- Standalone Grammar: Standard English Conventions (Q52-57) ---
  {
    id: 52,
    module: 2,
    domain: "Standard English Conventions",
    text: "Neither the professor nor her graduate assistants _____ able to replicate the experiment's results.",
    options: [
      { id: "A", text: "was" },
      { id: "B", text: "were" },
      { id: "C", text: "has been" },
      { id: "D", text: "is" }
    ],
    correctAnswer: "B",
    explanation: "With \"neither\u2026nor,\" the verb agrees with the closest subject (\"graduate assistants,\" which is plural). Therefore, \"were\" is correct. Option A (\"was\") would agree with a singular subject; option C (\"has been\") is singular; option D (\"is\") is singular and present tense, which does not fit the context.",
    difficulty: "hard"
  },
  {
    id: 53,
    module: 2,
    domain: "Standard English Conventions",
    text: "The orchestra performed the symphony with remarkable precision, _____ the conductor's exacting interpretation of every passage.",
    options: [
      { id: "A", text: "reflected" },
      { id: "B", text: "reflecting" },
      { id: "C", text: "and reflected" },
      { id: "D", text: "it reflected" }
    ],
    correctAnswer: "B",
    explanation: "The sentence needs a participle to show how the performance related to the conductor's interpretation. \"Reflecting\" (present participle) creates a participial phrase that modifies the main clause. Option A creates a comma splice; option C is awkward; option D creates a run-on sentence.",
    difficulty: "medium"
  },
  {
    id: 54,
    module: 2,
    domain: "Standard English Conventions",
    text: "The archaeologist uncovered several artifacts _____ origins could be traced to the Neolithic period.",
    options: [
      { id: "A", text: "who's" },
      { id: "B", text: "whom" },
      { id: "C", text: "whose" },
      { id: "D", text: "which" }
    ],
    correctAnswer: "C",
    explanation: "\"Whose\" is the correct possessive relative pronoun referring to \"artifacts.\" The artifacts' origins could be traced. Option A (\"who's\") is a contraction of \"who is\"; option B is an object pronoun; option D lacks the possessive meaning needed here.",
    difficulty: "easy"
  },
  {
    id: 55,
    module: 2,
    domain: "Standard English Conventions",
    text: "The researchers spent three years collecting data, _____ the findings were ultimately inconclusive.",
    options: [
      { id: "A", text: "but" },
      { id: "B", text: "so" },
      { id: "C", text: "for" },
      { id: "D", text: "and" }
    ],
    correctAnswer: "A",
    explanation: "The second clause presents a contrast to the effort described in the first clause: despite three years of work, the findings were inconclusive. \"But\" signals this contrast correctly. Option B suggests causality (so = therefore); option C suggests reason (for = because); option D suggests addition without contrast.",
    difficulty: "medium"
  },
  {
    id: 56,
    module: 2,
    domain: "Standard English Conventions",
    text: "The painting, _____ had been missing for over a century, was discovered in a private collection in Vienna.",
    options: [
      { id: "A", text: "that" },
      { id: "B", text: "which" },
      { id: "C", text: "what" },
      { id: "D", text: "whom" }
    ],
    correctAnswer: "B",
    explanation: "The clause \"had been missing for over a century\" is a nonrestrictive (nonessential) clause set off by commas. Nonrestrictive clauses require \"which\" rather than \"that.\" Option A (\"that\") is used for restrictive clauses without commas; option C (\"what\") does not function as a relative pronoun here; option D (\"whom\") refers to people, not objects.",
    difficulty: "hard"
  },
  {
    id: 57,
    module: 2,
    domain: "Standard English Conventions",
    text: "The novel explores themes of identity and belonging; _____, it examines the tension between individual desires and social expectations.",
    options: [
      { id: "A", text: "for example" },
      { id: "B", text: "meanwhile" },
      { id: "C", text: "nevertheless" },
      { id: "D", text: "in contrast" }
    ],
    correctAnswer: "A",
    explanation: "The second clause provides a specific instance of the themes mentioned in the first clause. \"For example\" correctly introduces this elaboration. Option B suggests simultaneity; option C suggests contrast; option D suggests opposition rather than illustration.",
    difficulty: "medium"
  },

  // --- Transitions: Expression of Ideas (Q58-60) ---
  {
    id: 58,
    module: 2,
    domain: "Expression of Ideas",
    text: "The study found that students who attended schools with later start times reported getting more sleep on average. _____, their academic performance showed modest improvement compared to students at schools with earlier start times.",
    options: [
      { id: "A", text: "Nevertheless," },
      { id: "B", text: "For instance," },
      { id: "C", text: "Furthermore," },
      { id: "D", text: "In contrast," }
    ],
    correctAnswer: "C",
    explanation: "The second sentence adds an additional positive outcome (academic improvement) to the first (more sleep). \"Furthermore\" signals this additive relationship. Options A and D suggest contrast; option B would introduce an example of the first claim, which is not what the second sentence does.",
    difficulty: "easy"
  },
  {
    id: 59,
    module: 2,
    domain: "Expression of Ideas",
    text: "The new manufacturing process reduced production costs by 30%. _____, it required a significant upfront investment in new equipment.",
    options: [
      { id: "A", text: "Furthermore," },
      { id: "B", text: "However," },
      { id: "C", text: "Therefore," },
      { id: "D", text: "For example," }
    ],
    correctAnswer: "B",
    explanation: "The first sentence presents a benefit (cost reduction). The second presents a drawback (expensive upfront investment). \"However\" signals this contrast between benefit and cost. Option A would add a further benefit; option C suggests a consequence; option D would provide an example.",
    difficulty: "easy"
  },
  {
    id: 60,
    module: 2,
    domain: "Expression of Ideas",
    text: "The historian argued that economic factors, not ideological divisions, were the primary drivers of the conflict. _____, she pointed to trade data showing that both sides continued commercial exchanges even during the height of hostilities.",
    options: [
      { id: "A", text: "Nevertheless," },
      { id: "B", text: "In support of this claim," },
      { id: "C", text: "On the contrary," },
      { id: "D", text: "In addition," }
    ],
    correctAnswer: "B",
    explanation: "The second sentence provides evidence (trade data) that supports the claim made in the first sentence. \"In support of this claim\" correctly signals this relationship. Options A and C suggest contrast; option D would add a separate point rather than supporting evidence.",
    difficulty: "medium"
  },

  // --- Rhetorical Synthesis: Expression of Ideas (Q61-63) ---
  {
    id: 61,
    module: 2,
    domain: "Expression of Ideas",
    text: "While researching the history of the Panama Canal, a student takes the following notes:\n\n\u2022 France began construction of the Panama Canal in 1881 but abandoned the project due to disease and financial difficulties\n\u2022 The United States took over the project in 1904\n\u2022 The canal was completed in 1914, significantly reducing travel time between the Atlantic and Pacific Oceans\n\u2022 The U.S. controlled the canal zone until 1999, when control was transferred to Panama\n\nWhich choice most effectively combines the notes to emphasize the length of time between the start and completion of the canal?",
    options: [
      { id: "A", text: "The Panama Canal was completed in 1914 and control was transferred to Panama in 1999." },
      { id: "B", text: "Although France began construction of the Panama Canal in 1881, the canal was not completed until 1914, a span of 33 years." },
      { id: "C", text: "The United States took over construction of the Panama Canal in 1904 and completed it in 1914." },
      { id: "D", text: "France abandoned the Panama Canal project due to disease and financial difficulties." }
    ],
    correctAnswer: "B",
    explanation: "The question asks for a synthesis that emphasizes the length of time from start to completion. Option B explicitly states the 33-year span and uses \"Although\" to highlight the contrast between the early start (1881) and late completion (1914). Options A and C focus on different time spans; option D omits the completion date entirely.",
    difficulty: "medium"
  },
  {
    id: 62,
    module: 2,
    domain: "Expression of Ideas",
    text: "While researching the effects of deforestation on local climates, a student gathers the following information:\n\n\u2022 Tropical forests release moisture through evapotranspiration, creating rainfall patterns\n\u2022 Deforestation in the Amazon reduces rainfall in the region by up to 30%\n\u2022 Reduced rainfall affects agricultural productivity in areas far from the deforested zones\n\u2022 The smoke from forest fires used to clear land contains particles that inhibit cloud formation\n\nWhich choice most effectively combines the notes to explain the mechanism by which deforestation affects rainfall?",
    options: [
      { id: "A", text: "Deforestation in the Amazon reduces rainfall by up to 30%, and smoke from fires contains particles." },
      { id: "B", text: "When forests are cleared, the loss of evapotranspiration combined with fire smoke particles disrupts the natural rainfall cycle, reducing precipitation." },
      { id: "C", text: "Tropical forests release moisture through evapotranspiration, and forest fires contain particles." },
      { id: "D", text: "Reduced rainfall affects agricultural productivity, and deforestation reduces rainfall by up to 30%." }
    ],
    correctAnswer: "B",
    explanation: "The question asks for a synthesis that explains the mechanism. Option B connects the key causal chain: clearing forests stops evapotranspiration, fire smoke adds particles that inhibit cloud formation, and together these disrupt the rainfall cycle. This explains the \"how\" of deforestation's effect on rainfall. The other options present disconnected facts rather than a coherent mechanism.",
    difficulty: "hard"
  },
  {
    id: 63,
    module: 2,
    domain: "Expression of Ideas",
    text: "While researching the history of the Olympic Games, a student takes the following notes:\n\n\u2022 The ancient Olympic Games began in Olympia, Greece in 776 BCE\n\u2022 They were held every four years in honor of the god Zeus\n\u2022 The games were abolished in 393 CE by the Roman Emperor Theodosius I\n\u2022 The modern Olympic Games were revived in Athens in 1896 under the leadership of Pierre de Coubertin\n\nWhich choice most effectively combines the notes to emphasize the long interruption between the ancient and modern games?",
    options: [
      { id: "A", text: "The ancient Olympic Games began in 776 BCE and were held every four years." },
      { id: "B", text: "After beginning in 776 BCE and being abolished in 393 CE, the Olympic Games were not revived until 1896\u2014a gap of over 1,500 years." },
      { id: "C", text: "The modern Olympic Games were revived in Athens in 1896 by Pierre de Coubertin." },
      { id: "D", text: "The ancient Olympic Games were abolished by Theodosius I, but the modern games began in 1896." }
    ],
    correctAnswer: "B",
    explanation: "The question asks for a synthesis emphasizing the long interruption. Option B explicitly states the timeline from start (776 BCE) through abolition (393 CE) to revival (1896) and quantifies the \"gap of over 1,500 years.\" Options A and C focus on only one period; option D mentions both but does not emphasize the length of the interruption.",
    difficulty: "medium"
  },

  // --- Standalone Vocabulary-in-Context: Craft and Structure (Q64-66) ---
  {
    id: 64,
    module: 2,
    domain: "Craft and Structure",
    text: "The scientist argued that the team's initial hypothesis was too narrow and failed to _____ the full range of observed phenomena.",
    options: [
      { id: "A", text: "circumvent" },
      { id: "B", text: "encompass" },
      { id: "C", text: "undermine" },
      { id: "D", text: "constrain" }
    ],
    correctAnswer: "B",
    explanation: "The sentence states that the hypothesis was \"too narrow,\" meaning it did not cover the full range of phenomena. \"Encompass\" means to include or cover comprehensively, which fits the context perfectly. Option A means to find a way around; option C means to weaken; option D means to restrict\u2014all are opposite or unrelated to the needed meaning.",
    difficulty: "medium"
  },
  {
    id: 65,
    module: 2,
    domain: "Craft and Structure",
    text: "The diplomat's response was deliberately _____, avoiding any direct statement that could be interpreted as a commitment.",
    options: [
      { id: "A", text: "candid" },
      { id: "B", text: "emphatic" },
      { id: "C", text: "equivocal" },
      { id: "D", text: "eloquent" }
    ],
    correctAnswer: "C",
    explanation: "The description says the response avoided \"any direct statement\" and clear commitment. \"Equivocal\" means deliberately ambiguous or open to multiple interpretations, which matches the context. Option A (candid) means straightforward\u2014the opposite; option B (emphatic) means forcefully expressed\u2014the opposite; option D (eloquent) means fluent and persuasive, which does not capture the strategic ambiguity described.",
    difficulty: "hard"
  },
  {
    id: 66,
    module: 2,
    domain: "Craft and Structure",
    text: "The author's writing style is characterized by its _____, with sentences that run on for half a page and clauses nested within clauses, demanding careful attention from the reader.",
    options: [
      { id: "A", text: "terseness" },
      { id: "B", text: "concision" },
      { id: "C", text: "convolutedness" },
      { id: "D", text: "clarity" }
    ],
    correctAnswer: "C",
    explanation: "The description mentions very long sentences with nested clauses requiring careful attention, which indicates a complex, intricate, and potentially confusing style. \"Convolutedness\" means extremely complex and difficult to follow. Options A and B are antonyms (terseness = brevity, concision = being brief); option D is the opposite of what is described.",
    difficulty: "hard"
  }
]