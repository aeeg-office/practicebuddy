// ACT Diagnostic Assessment
// 40 questions across 4 sections: English (10), Math (10), Reading (10), Science (10)
// All content is original — no copyrighted ACT material used

export interface ACTQuestion {
  id: number
  section: "English" | "Math" | "Reading" | "Science"
  text: string
  passage?: string
  options?: { id: string; text: string }[]
  correctAnswer?: string
  difficulty: "easy" | "medium" | "hard"
}

export const actQuestions: ACTQuestion[] = [
  // ======================================================================
  // SECTION 1: English — Questions 1-10 (grammar, rhetoric, style)
  // ======================================================================
  {
    id: 1,
    section: "English",
    passage: "The artist Marina Abramovic is known for her groundbreaking performance art. [1] Her work often pushes the boundaries of endurance and audience participation. In one famous piece, she sat silently at a table for six weeks while visitors were invited to sit across from her. [2] The simplicity of the setup belied the emotional intensity of the experience. Many audience members found themselves moved to tears without exchanging a single word. [3] Abramovic has said that her goal is to create art that is direct and immediate, one that does not rely on interpretation. [4]",
    text: "Choose the best replacement for the underlined word 'one' in the final sentence.",
    options: [
      { id: "A", text: "NO CHANGE" },
      { id: "B", text: "art" },
      { id: "C", text: "one that" },
      { id: "D", text: "something" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 2,
    section: "English",
    passage: "The city council has proposed a new recycling programme that would require all households to separate organic waste from other trash. [1] Supporters argue that this programme will reduce landfill waste by up to forty percent. [2] They also point out that composted organic material can be used to enrich public parks and gardens. [3] However, some residents have expressed concern about the cost of implementing such a programme and the inconvenience of maintaining separate bins. [4]",
    text: "Which sentence, if added at the beginning of the passage, would best introduce the topic?",
    options: [
      { id: "A", text: "Recycling is a popular activity." },
      { id: "B", text: "A new proposal regarding waste management is being debated in the city council." },
      { id: "C", text: "Organic waste is smelly and attracts pests." },
      { id: "D", text: "The city council has many responsibilities." }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 3,
    section: "English",
    passage: "The three main characters in the novel each represent different aspects of the human condition. [1] The protagonist, a young doctor, embodies ambition and the desire for social advancement. [2] His wife represents tradition and the comfort of familiar routines. [3] The antagonist, a mysterious businessman, symbolizes the ruthless pursuit of wealth at any cost. [4] Through these characters, the author explores the tension between progress and stability, a theme that remains relevant today.",
    text: "The underlined sentence 'The three main characters in the novel each represent different aspects of the human condition.' is best described as:",
    options: [
      { id: "A", text: "a thesis statement" },
      { id: "B", text: "a supporting detail" },
      { id: "C", text: "a concluding remark" },
      { id: "D", text: "an irrelevant observation" }
    ],
    correctAnswer: "A",
    difficulty: "medium"
  },
  {
    id: 4,
    section: "English",
    passage: "The construction of the new library was delayed by several unforeseen factors. [1] Bad weather slowed the foundation work by three weeks. [2] A shortage of steel beams caused another delay. [3] The project manager said that the library would now open in the spring rather than the winter. [4]",
    text: "Which of the following sentences, if inserted after sentence 3, would best support the idea that the delays were caused by multiple factors?",
    options: [
      { id: "A", text: "The weather was unusually rainy that year." },
      { id: "B", text: "Additionally, a redesign of the entrance was required after a change in building codes." },
      { id: "C", text: "The library will have a large reading room." },
      { id: "D", text: "Steel is an important construction material." }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 5,
    section: "English",
    passage: "The discovery of penicillin is often credited to Alexander Fleming, but the story is more complicated than most people realize. Fleming noticed that a mold called Penicillium notatum had killed bacteria in one of his petri dishes. However, he struggled to isolate and purify the active compound. It was not until a decade later that Howard Florey and Ernst Chain developed a method to mass-produce the drug, turning Fleming's observation into a practical medicine that would save millions of lives.",
    text: "Which of the following best describes the relationship between the first and second sentences of the passage?",
    options: [
      { id: "A", text: "The second sentence provides a specific example of the claim made in the first sentence." },
      { id: "B", text: "The second sentence contradicts the claim made in the first sentence." },
      { id: "C", text: "The second sentence explains why the discovery is important." },
      { id: "D", text: "The second sentence introduces a new topic unrelated to the first." }
    ],
    correctAnswer: "A",
    difficulty: "medium"
  },
  {
    id: 6,
    section: "English",
    passage: "The museum's new exhibit features artifacts from ancient Egypt, including pottery, jewellery, and tools that date back over three thousand years. [1] Visitors can also see a reconstructed tomb interior that gives a sense of what these burial chambers originally looked like. [2] The exhibit has been very popular, attracting large crowds since it opened. [3]",
    text: "Which of the following changes would most improve the clarity of the passage?",
    options: [
      { id: "A", text: "Change 'that date back' to 'dating back'" },
      { id: "B", text: "Change 'Visitors can also see' to 'One can also see'" },
      { id: "C", text: "Change 'has been very popular' to 'is very popular'" },
      { id: "D", text: "Change 'since it opened' to 'after it opened'" }
    ],
    correctAnswer: "A",
    difficulty: "hard"
  },
  {
    id: 7,
    section: "English",
    passage: "Many people assume that the Great Wall of China is a single continuous structure, but in reality it is a series of walls and fortifications built by different dynasties over centuries. The earliest sections were constructed as early as the seventh century BCE. The most famous sections, built during the Ming Dynasty, stretch for over five thousand miles. The wall was not designed to keep invaders out entirely; rather, it served as a means of controlling trade and regulating immigration along the Silk Road.",
    text: "The underlined phrase 'rather, it served as' is best classified as:",
    options: [
      { id: "A", text: "a coordinating conjunction" },
      { id: "B", text: "a transitional phrase indicating contrast" },
      { id: "C", text: "a subordinating clause" },
      { id: "D", text: "a prepositional phrase" }
    ],
    correctAnswer: "B",
    difficulty: "hard"
  },
  {
    id: 8,
    section: "English",
    passage: "The restaurant received mixed reviews from critics. Some praised its innovative menu and bold flavours. Others criticized the high prices and small portion sizes. The chefs response to the criticism was to revise the menu and add more affordable options.",
    text: "Choose the correct form of the underlined word 'chefs' in the final sentence.",
    options: [
      { id: "A", text: "NO CHANGE" },
      { id: "B", text: "chef's" },
      { id: "C", text: "chefs'" },
      { id: "D", text: "chef" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },
  {
    id: 9,
    section: "English",
    passage: "The research team collected data from over five hundred participants. The study aimed to determine whether regular exercise had a measurable effect on cognitive function in older adults. The results showed that participants who exercised three times a week scored significantly higher on memory tests than those who did not. The researchers concluded that physical activity may help slow age-related cognitive decline.",
    text: "The sentence 'The research team collected data from over five hundred participants' would be most logically placed:",
    options: [
      { id: "A", text: "at the beginning of the passage" },
      { id: "B", text: "after the first sentence" },
      { id: "C", text: "after the second sentence" },
      { id: "D", text: "at the end of the passage" }
    ],
    correctAnswer: "A",
    difficulty: "easy"
  },
  {
    id: 10,
    section: "English",
    passage: "The composer Ludwig van Beethoven began losing his hearing in his late twenties, yet he continued to produce some of his most celebrated works after becoming completely deaf. His Ninth Symphony, composed when he could hear almost nothing, remains one of the most performed and recorded pieces in classical music. Beethoven's ability to create complex musical structures without being able to hear them is a testament to the power of the inner ear and musical imagination.",
    text: "The primary rhetorical strategy used in this passage is:",
    options: [
      { id: "A", text: "comparison and contrast" },
      { id: "B", text: "cause and effect" },
      { id: "C", text: "illustration through example" },
      { id: "D", text: "definition and classification" }
    ],
    correctAnswer: "C",
    difficulty: "medium"
  },

  // ======================================================================
  // SECTION 2: Math — Questions 11-20 (algebra, geometry, trig)
  // ======================================================================
  {
    id: 11,
    section: "Math",
    text: "If 3x + 7 = 22, what is the value of x?",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "5" },
      { id: "C", text: "7" },
      { id: "D", text: "9" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 12,
    section: "Math",
    text: "A rectangle has a length that is 3 times its width. If the perimeter of the rectangle is 48 cm, what is the width in centimetres?",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "8" },
      { id: "C", text: "9" },
      { id: "D", text: "12" }
    ],
    correctAnswer: "A",
    difficulty: "easy"
  },
  {
    id: 13,
    section: "Math",
    text: "What is the slope of the line that passes through the points (2, 5) and (6, 13)?",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "4" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 14,
    section: "Math",
    text: "If x² = 49, what are the possible values of x?",
    options: [
      { id: "A", text: "7 only" },
      { id: "B", text: "-7 only" },
      { id: "C", text: "7 and -7" },
      { id: "D", text: "49 and -49" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },
  {
    id: 15,
    section: "Math",
    text: "A right triangle has legs of length 6 cm and 8 cm. What is the length of the hypotenuse in centimetres?",
    options: [
      { id: "A", text: "9" },
      { id: "B", text: "10" },
      { id: "C", text: "12" },
      { id: "D", text: "14" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 16,
    section: "Math",
    text: "Solve the system of equations for x and y:\n2x + y = 10\nx - y = 2\n\nWhat is the value of x?",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "6" }
    ],
    correctAnswer: "C",
    difficulty: "medium"
  },
  {
    id: 17,
    section: "Math",
    text: "A circle has a radius of 5 cm. What is the area of the circle in square centimetres?",
    options: [
      { id: "A", text: "10π" },
      { id: "B", text: "25π" },
      { id: "C", text: "50π" },
      { id: "D", text: "100π" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 18,
    section: "Math",
    text: "If f(x) = 2x² - 3x + 1, what is f(3)?",
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "12" },
      { id: "C", text: "14" },
      { id: "D", text: "18" }
    ],
    correctAnswer: "A",
    difficulty: "medium"
  },
  {
    id: 19,
    section: "Math",
    text: "In a triangle, the angles are in the ratio 2:3:4. What is the measure of the largest angle in degrees?",
    options: [
      { id: "A", text: "60" },
      { id: "B", text: "80" },
      { id: "C", text: "100" },
      { id: "D", text: "120" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 20,
    section: "Math",
    text: "What is the value of sin(30°)?",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1/2" },
      { id: "C", text: "√3/2" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },

  // ======================================================================
  // SECTION 3: Reading — Questions 21-30 (passages with comprehension)
  // ======================================================================
  {
    id: 21,
    section: "Reading",
    passage: "In 1969, the anthropologist Elizabeth Colson published a longitudinal study of the Tonga people of Zambia that would become a landmark in the field of disaster anthropology. The Tonga had been displaced by the construction of the Kariba Dam on the Zambezi River, a massive hydroelectric project that flooded their ancestral homeland. Colson documented the community before, during, and after the relocation, tracking changes in social structure, economic practices, and psychological wellbeing over two decades. Her research revealed that while the Tonga adapted to their new environment in many practical ways—adopting new fishing techniques and developing trade networks—the social costs of displacement were profound and persistent. Extended family networks, which had been the foundation of Tonga society, fragmented as families were resettled in unfamiliar configurations. Rates of anxiety and depression remained elevated even fifteen years after the move. Colson's work challenged the prevailing assumption that economic compensation alone could adequately address the human costs of development-induced displacement.",
    text: "The passage suggests that the Kariba Dam project had which of the following effects on the Tonga people?",
    options: [
      { id: "A", text: "It improved their economic opportunities through new fishing techniques" },
      { id: "B", text: "It caused social fragmentation that persisted long after resettlement" },
      { id: "C", text: "It strengthened extended family networks" },
      { id: "D", text: "It had no significant long-term impact on their wellbeing" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 22,
    section: "Reading",
    passage: "In 1969, the anthropologist Elizabeth Colson published a longitudinal study of the Tonga people of Zambia that would become a landmark in the field of disaster anthropology. The Tonga had been displaced by the construction of the Kariba Dam on the Zambezi River, a massive hydroelectric project that flooded their ancestral homeland. Colson documented the community before, during, and after the relocation, tracking changes in social structure, economic practices, and psychological wellbeing over two decades. Her research revealed that while the Tonga adapted to their new environment in many practical ways—adopting new fishing techniques and developing trade networks—the social costs of displacement were profound and persistent. Extended family networks, which had been the foundation of Tonga society, fragmented as families were resettled in unfamiliar configurations. Rates of anxiety and depression remained elevated even fifteen years after the move. Colson's work challenged the prevailing assumption that economic compensation alone could adequately address the human costs of development-induced displacement.",
    text: "The passage characterizes Colson's study as 'longitudinal' primarily to indicate that it:",
    options: [
      { id: "A", text: "Compared different communities simultaneously" },
      { id: "B", text: "Involved fieldwork in multiple countries" },
      { id: "C", text: "Followed the same community over an extended period" },
      { id: "D", text: "Used quantitative rather than qualitative methods" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },
  {
    id: 23,
    section: "Reading",
    passage: "The concept of 'social capital' — the networks of relationships among people who live and work in a particular society — has become an important framework in sociology, economics, and public health. First systematically analysed by Pierre Bourdieu and later popularised by Robert Putnam, social capital refers to the resources individuals and communities can access through their social connections. Putnam's influential book Bowling Alone documented a decline in social capital in the United States from the 1950s onward, measured by factors such as declining membership in clubs, churches, and civic organisations. Putnam argued that this decline had negative consequences for democratic governance, economic prosperity, and individual wellbeing. However, critics have pointed out that Putnam's analysis may overstate the decline by overlooking new forms of social connection that have emerged in the digital age. Online communities, social media networks, and virtual organisations may represent transformations of social capital rather than its erosion.",
    text: "The passage indicates that critics of Putnam's argument believe that:",
    options: [
      { id: "A", text: "Social capital is inherently less valuable in modern societies" },
      { id: "B", text: "New forms of social connection may compensate for declines in traditional civic participation" },
      { id: "C", text: "Online communities are less effective than in-person organisations" },
      { id: "D", text: "Social capital has actually increased since the 1950s" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 24,
    section: "Reading",
    passage: "The concept of 'social capital' — the networks of relationships among people who live and work in a particular society — has become an important framework in sociology, economics, and public health. First systematically analysed by Pierre Bourdieu and later popularised by Robert Putnam, social capital refers to the resources individuals and communities can access through their social connections. Putnam's influential book Bowling Alone documented a decline in social capital in the United States from the 1950s onward, measured by factors such as declining membership in clubs, churches, and civic organisations. Putnam argued that this decline had negative consequences for democratic governance, economic prosperity, and individual wellbeing. However, critics have pointed out that Putnam's analysis may overstate the decline by overlooking new forms of social connection that have emerged in the digital age. Online communities, social media networks, and virtual organisations may represent transformations of social capital rather than its erosion.",
    text: "The main purpose of the passage is to:",
    options: [
      { id: "A", text: "Argue that social capital is declining in the United States" },
      { id: "B", text: "Define an important concept and present competing perspectives on it" },
      { id: "C", text: "Criticise Robert Putnam's research methodology" },
      { id: "D", text: "Defend traditional forms of civic engagement" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 25,
    section: "Reading",
    passage: "The double-slit experiment, first performed by Thomas Young in 1801, is one of the most famous experiments in the history of physics. Young aimed to determine whether light behaved as a wave or a particle. He passed a beam of light through two parallel slits and observed the pattern that appeared on a screen behind them. Instead of two bright stripes corresponding to the two slits, he observed a series of alternating bright and dark bands — an interference pattern that could only be explained if light was behaving as a wave. This experiment seemed to settle the debate in favour of the wave theory of light. However, the story became more complex in the twentieth century when physicists repeated the experiment with individual photons. Astonishingly, even when photons were sent through the apparatus one at a time, the interference pattern gradually built up — suggesting that each photon somehow interfered with itself. When detectors were placed at the slits to determine which path a photon took, the interference pattern disappeared, and the photons behaved like particles. This puzzling result illustrates the wave-particle duality that lies at the heart of quantum mechanics.",
    text: "What happened when detectors were placed at the slits in the double-slit experiment?",
    options: [
      { id: "A", text: "The photons failed to reach the screen" },
      { id: "B", text: "The interference pattern disappeared and photons behaved like particles" },
      { id: "C", text: "A brighter interference pattern appeared" },
      { id: "D", text: "The photons split into smaller particles" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 26,
    section: "Reading",
    passage: "The double-slit experiment, first performed by Thomas Young in 1801, is one of the most famous experiments in the history of physics. Young aimed to determine whether light behaved as a wave or a particle. He passed a beam of light through two parallel slits and observed the pattern that appeared on a screen behind them. Instead of two bright stripes corresponding to the two slits, he observed a series of alternating bright and dark bands — an interference pattern that could only be explained if light was behaving as a wave. This experiment seemed to settle the debate in favour of the wave theory of light. However, the story became more complex in the twentieth century when physicists repeated the experiment with individual photons. Astonishingly, even when photons were sent through the apparatus one at a time, the interference pattern gradually built up — suggesting that each photon somehow interfered with itself. When detectors were placed at the slits to determine which path a photon took, the interference pattern disappeared, and the photons behaved like particles. This puzzling result illustrates the wave-particle duality that lies at the heart of quantum mechanics.",
    text: "The passage suggests that the most surprising aspect of the double-slit experiment with individual photons was that:",
    options: [
      { id: "A", text: "The interference pattern appeared even though only one photon passed through at a time" },
      { id: "B", text: "The photons moved faster than the speed of light" },
      { id: "C", text: "The experiment required vacuum conditions to work" },
      { id: "D", text: "The interference pattern was visible to the naked eye" }
    ],
    correctAnswer: "A",
    difficulty: "hard"
  },
  {
    id: 27,
    section: "Reading",
    passage: "The history of the tomato in European cuisine is a cautionary tale about the power of cultural prejudice. When tomatoes were first brought to Europe from the Americas in the sixteenth century, they were treated with suspicion. Because the tomato is a member of the nightshade family, which includes toxic plants, many Europeans believed it was poisonous. Wealthy aristocrats who ate from pewter plates were particularly vulnerable — the acid in tomatoes would leach lead from the pewter, causing lead poisoning, though the connection was not understood at the time. As a result, the tomato was grown primarily as an ornamental plant for nearly two hundred years. It was only in the eighteenth century, particularly in southern Italy and Spain, that the tomato began to be widely adopted as a food. The breakthrough came when cooks discovered that the acidity of tomatoes complemented the rich flavours of olive oil and garlic, creating the culinary foundation for what would become some of the world's most beloved cuisines.",
    text: "The passage suggests that wealthy aristocrats were especially vulnerable to tomato-related illness because:",
    options: [
      { id: "A", text: "They ate more tomatoes than commoners" },
      { id: "B", text: "Their pewter plates reacted with the acid in tomatoes" },
      { id: "C", text: "They had weaker immune systems" },
      { id: "D", text: "They grew tomatoes as ornamental plants indoors" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 28,
    section: "Reading",
    passage: "The phenomenon of 'decision fatigue' describes the deteriorating quality of decisions made by an individual after a long session of decision-making. The concept, studied extensively by social psychologist Roy Baumeister, is based on the theory that making choices depletes a limited reservoir of mental energy. In one study, shoppers who had made many decisions in a mall were less likely to choose a healthy snack than those who had just entered the mall. Judges in courtrooms have been shown to grant parole more frequently early in the day and immediately after food breaks, with the likelihood of a favourable ruling dropping steadily as the morning wore on. Baumeister's research suggests that the brain's capacity for decision-making is not unlimited — it is a muscle that tires with use. Critics, however, point out that the ego-depletion model has been difficult to replicate in large-scale studies, and alternative explanations such as the role of attention and motivation may better account for the observed patterns.",
    text: "The example of judges granting parole is used in the passage to illustrate:",
    options: [
      { id: "A", text: "The importance of proper legal training" },
      { id: "B", text: "The real-world consequences of decision fatigue" },
      { id: "C", text: "The bias against morning hearings" },
      { id: "D", text: "The need for more judges in the court system" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 29,
    section: "Reading",
    passage: "The phenomenon of 'decision fatigue' describes the deteriorating quality of decisions made by an individual after a long session of decision-making. The concept, studied extensively by social psychologist Roy Baumeister, is based on the theory that making choices depletes a limited reservoir of mental energy. In one study, shoppers who had made many decisions in a mall were less likely to choose a healthy snack than those who had just entered the mall. Judges in courtrooms have been shown to grant parole more frequently early in the day and immediately after food breaks, with the likelihood of a favourable ruling dropping steadily as the morning wore on. Baumeister's research suggests that the brain's capacity for decision-making is not unlimited — it is a muscle that tires with use. Critics, however, point out that the ego-depletion model has been difficult to replicate in large-scale studies, and alternative explanations such as the role of attention and motivation may better account for the observed patterns.",
    text: "Which of the following statements best describes the author's attitude toward the concept of decision fatigue?",
    options: [
      { id: "A", text: "Complete acceptance of the theory" },
      { id: "B", text: "Scepticism based on replication failures" },
      { id: "C", text: "A balanced presentation of evidence and criticism" },
      { id: "D", text: "Dismissal of the concept as unscientific" }
    ],
    correctAnswer: "C",
    difficulty: "medium"
  },
  {
    id: 30,
    section: "Reading",
    passage: "The Silk Road was not a single road but a network of trade routes stretching over 6,000 kilometres, connecting China to the Mediterranean. Active from roughly 130 BCE to the mid-fifteenth century CE, the Silk Road facilitated the exchange of goods, technologies, religions, and diseases between East and West. While silk was indeed an important commodity, the route also carried spices, glassware, paper, gunpowder, and horses. Perhaps more significantly, the Silk Road served as a conduit for ideas. Buddhism spread from India to China along these routes. Nestorian Christianity reached Central Asia. The technology of papermaking, invented in China, travelled westward, revolutionising communication in Europe. The Black Death also likely travelled along the Silk Road, carried by fleas on rats in trade caravans, before devastating Europe in the fourteenth century. The decline of the Silk Road was gradual, hastened by the collapse of the Mongol Empire, the rise of maritime trade routes, and political instability in Central Asia.",
    text: "According to the passage, which of the following was NOT a commodity traded along the Silk Road?",
    options: [
      { id: "A", text: "Spices" },
      { id: "B", text: "Paper" },
      { id: "C", text: "Cotton textiles" },
      { id: "D", text: "Gunpowder" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },

  // ======================================================================
  // SECTION 4: Science — Questions 31-40 (data representation, research summaries)
  // ======================================================================
  {
    id: 31,
    section: "Science",
    passage: "Table 1 shows the melting points and boiling points of four substances.\n\n| Substance | Melting Point (°C) | Boiling Point (°C) |\n|-----------|-------------------|-------------------|\n| Substance A | -7 | 59 |\n| Substance B | 1085 | 2562 |\n| Substance C | 0 | 100 |\n| Substance D | -78 | -33 |",
    text: "Based on Table 1, which substance is a gas at room temperature (20°C)?",
    options: [
      { id: "A", text: "Substance A" },
      { id: "B", text: "Substance B" },
      { id: "C", text: "Substance C" },
      { id: "D", text: "Substance D" }
    ],
    correctAnswer: "D",
    difficulty: "easy"
  },
  {
    id: 32,
    section: "Science",
    passage: "Table 1 shows the melting points and boiling points of four substances.\n\n| Substance | Melting Point (°C) | Boiling Point (°C) |\n|-----------|-------------------|-------------------|\n| Substance A | -7 | 59 |\n| Substance B | 1085 | 2562 |\n| Substance C | 0 | 100 |\n| Substance D | -78 | -33 |",
    text: "If Substance A is cooled from 70°C to 30°C, what phase change occurs?",
    options: [
      { id: "A", text: "Solid to liquid" },
      { id: "B", text: "Gas to liquid" },
      { id: "C", text: "Liquid to solid" },
      { id: "D", text: "No phase change occurs" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 33,
    section: "Science",
    passage: "A researcher investigated the effect of temperature on the rate of an enzyme-catalysed reaction. The results are shown in the table.\n\n| Temperature (°C) | Reaction Rate (μmol/min) |\n|------------------|------------------------|\n| 10 | 2.1 |\n| 20 | 4.5 |\n| 30 | 8.3 |\n| 40 | 12.0 |\n| 50 | 10.5 |\n| 60 | 3.2 |\n| 70 | 0.8 |",
    text: "At what temperature does the enzyme appear to be most active?",
    options: [
      { id: "A", text: "30°C" },
      { id: "B", text: "40°C" },
      { id: "C", text: "50°C" },
      { id: "D", text: "60°C" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 34,
    section: "Science",
    passage: "A researcher investigated the effect of temperature on the rate of an enzyme-catalysed reaction. The results are shown in the table.\n\n| Temperature (°C) | Reaction Rate (μmol/min) |\n|------------------|------------------------|\n| 10 | 2.1 |\n| 20 | 4.5 |\n| 30 | 8.3 |\n| 40 | 12.0 |\n| 50 | 10.5 |\n| 60 | 3.2 |\n| 70 | 0.8 |",
    text: "Which of the following best explains the decrease in reaction rate at temperatures above 40°C?",
    options: [
      { id: "A", text: "The substrate is being used up" },
      { id: "B", text: "The enzyme is denaturing and losing its shape" },
      { id: "C", text: "The reaction has reached equilibrium" },
      { id: "D", text: "The product is inhibiting the reaction" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 35,
    section: "Science",
    passage: "Table 1 shows the results of a study examining the effect of fertiliser concentration on plant growth. Four groups of identical bean plants were grown for 30 days with different fertiliser concentrations.\n\n| Fertiliser Concentration (g/L) | Average Height (cm) | Average Leaf Count | Average Root Length (cm) |\n|-------------------------------|--------------------|--------------------|------------------------|\n| 0 (control) | 12.3 | 4.2 | 8.1 |\n| 2 | 18.7 | 6.8 | 10.4 |\n| 5 | 24.1 | 8.5 | 11.2 |\n| 10 | 22.5 | 8.1 | 9.8 |",
    text: "At which fertiliser concentration does the average plant height reach its maximum?",
    options: [
      { id: "A", text: "0 g/L" },
      { id: "B", text: "2 g/L" },
      { id: "C", text: "5 g/L" },
      { id: "D", text: "10 g/L" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },
  {
    id: 36,
    section: "Science",
    passage: "Table 1 shows the results of a study examining the effect of fertiliser concentration on plant growth. Four groups of identical bean plants were grown for 30 days with different fertiliser concentrations.\n\n| Fertiliser Concentration (g/L) | Average Height (cm) | Average Leaf Count | Average Root Length (cm) |\n|-------------------------------|--------------------|--------------------|------------------------|\n| 0 (control) | 12.3 | 4.2 | 8.1 |\n| 2 | 18.7 | 6.8 | 10.4 |\n| 5 | 24.1 | 8.5 | 11.2 |\n| 10 | 22.5 | 8.1 | 9.8 |",
    text: "The data suggest that the optimal fertiliser concentration for plant growth is closest to:",
    options: [
      { id: "A", text: "0 g/L" },
      { id: "B", text: "2 g/L" },
      { id: "C", text: "5 g/L" },
      { id: "D", text: "10 g/L" }
    ],
    correctAnswer: "C",
    difficulty: "medium"
  },
  {
    id: 37,
    section: "Science",
    passage: "A scientist studied the relationship between the mass of an object and the force required to move it across a surface. The data are shown below.\n\n| Mass (kg) | Force Required (N) |\n|-----------|-------------------|\n| 1 | 3.9 |\n| 2 | 8.1 |\n| 3 | 11.8 |\n| 4 | 16.0 |\n| 5 | 20.2 |",
    text: "Based on the data, the force required to move a 6 kg object would most likely be closest to:",
    options: [
      { id: "A", text: "20 N" },
      { id: "B", text: "24 N" },
      { id: "C", text: "28 N" },
      { id: "D", text: "32 N" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 38,
    section: "Science",
    passage: "A scientist studied the relationship between the mass of an object and the force required to move it across a surface. The data are shown below.\n\n| Mass (kg) | Force Required (N) |\n|-----------|-------------------|\n| 1 | 3.9 |\n| 2 | 8.1 |\n| 3 | 11.8 |\n| 4 | 16.0 |\n| 5 | 20.2 |",
    text: "The relationship between mass and force required is best described as approximately:",
    options: [
      { id: "A", text: "Exponential" },
      { id: "B", text: "Inverse" },
      { id: "C", text: "Linear" },
      { id: "D", text: "No relationship" }
    ],
    correctAnswer: "C",
    difficulty: "medium"
  },
  {
    id: 39,
    section: "Science",
    passage: "Two scientists conducted experiments to determine the density of an unknown metal. Density is calculated as mass divided by volume.\n\n| Trial | Mass (g) | Volume (mL) | Density (g/mL) |\n|-------|---------|-------------|---------------|\n| 1 | 23.5 | 2.8 | 8.39 |\n| 2 | 23.7 | 2.9 | 8.17 |\n| 3 | 23.4 | 2.7 | 8.67 |\n| 4 | 23.6 | 2.8 | 8.43 |\n| 5 | 23.5 | 2.8 | 8.39 |",
    text: "The known density of copper is 8.96 g/mL, of nickel is 8.91 g/mL, of iron is 7.87 g/mL, and of brass is 8.40-8.70 g/mL. Based on the experimental data, the unknown metal is most likely:",
    options: [
      { id: "A", text: "Copper" },
      { id: "B", text: "Nickel" },
      { id: "C", text: "Iron" },
      { id: "D", text: "Brass" }
    ],
    correctAnswer: "D",
    difficulty: "hard"
  },
  {
    id: 40,
    section: "Science",
    passage: "A biology student investigated the rate of cellular respiration in germinating pea seeds at different temperatures. The rate was measured by the volume of carbon dioxide produced per hour. The results are shown in the table.\n\n| Temperature (°C) | CO₂ Produced (mL/hour) |\n|-----------------|----------------------|\n| 5 | 0.3 |\n| 15 | 0.8 |\n| 25 | 1.8 |\n| 35 | 3.2 |\n| 45 | 2.1 |\n| 55 | 0.4 |",
    text: "Compared to the rate at 25°C, the rate of CO₂ production at 35°C is approximately:",
    options: [
      { id: "A", text: "One-third lower" },
      { id: "B", text: "About the same" },
      { id: "C", text: "About 1.8 times higher" },
      { id: "D", text: "About 3.2 times higher" }
    ],
    correctAnswer: "C",
    difficulty: "hard"
  }
]