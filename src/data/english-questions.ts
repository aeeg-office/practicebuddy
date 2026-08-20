// English Subject Question Bank
// 100 questions across 4 domains: Reading, Writing, Vocabulary, Grammar (25 each)
// All content is original

export interface EnglishQuestion {
  id: number
  skill: "eng-read-main" | "eng-read-infer" | "eng-read-analyze" | "eng-write-essay" | "eng-write-argument" | "eng-vocab-acad" | "eng-vocab-context" | "eng-grammar-usage" | "eng-grammar-punct" | "eng-grammar-syntax"
  domain: "Reading" | "Writing" | "Grammar" | "Vocabulary"
  passage?: string
  text: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

export const englishQuestions: EnglishQuestion[] = [
  // ======================================================================
  // DOMAIN: Reading Comprehension — Questions 1-25
  // Skill: eng-read-main / eng-read-infer / eng-read-analyze (passages + comprehension questions)
  // ======================================================================
  {
    id: 1,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "The Great Barrier Reef is the largest coral reef system in the world, stretching over 2,300 kilometers along the coast of Australia. It is home to thousands of species of marine life, including fish, turtles, and dolphins. However, rising ocean temperatures pose a serious threat to the reef's survival, causing coral bleaching events that have damaged large sections of this natural wonder.",
    text: "What is the main threat to the Great Barrier Reef mentioned in the passage?",
    options: [
      { id: "A", text: "Overfishing by commercial boats" },
      { id: "B", text: "Rising ocean temperatures" },
      { id: "C", text: "Pollution from coastal cities" },
      { id: "D", text: "Tourist activities and diving" }
    ],
    correctAnswer: "B",
    explanation: "The passage explicitly states that rising ocean temperatures pose a serious threat to the reef's survival, causing coral bleaching events.",
    difficulty: "easy"
  },
  {
    id: 2,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "Maria walked to the old bookstore every Saturday morning. She loved the smell of aging paper and the quiet rustle of pages turning. The owner, Mr. Henderson, always had a new recommendation for her. Last week, he handed her a worn copy of a novel with a note that said, 'This one changed my life.' Maria smiled, knowing she was in for something special.",
    text: "What can be inferred about Maria's relationship with Mr. Henderson?",
    options: [
      { id: "A", text: "They are business partners" },
      { id: "B", text: "They have a friendly, trusting relationship" },
      { id: "C", text: "They rarely speak to each other" },
      { id: "D", text: "Mr. Henderson is trying to sell Maria his old books" }
    ],
    correctAnswer: "B",
    explanation: "The passage shows that Maria visits every Saturday, Mr. Henderson gives her personal recommendations, and she trusts his judgment — indicating a friendly, trusting relationship.",
    difficulty: "easy"
  },
  {
    id: 3,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "Photosynthesis is the process by which green plants convert sunlight into energy. Chlorophyll, the pigment that gives plants their green color, absorbs light energy and uses it to transform carbon dioxide and water into glucose and oxygen. This process is fundamental to life on Earth, as it produces the oxygen that most living organisms need to survive.",
    text: "According to the passage, what role does chlorophyll play in photosynthesis?",
    options: [
      { id: "A", text: "It produces glucose directly" },
      { id: "B", text: "It absorbs light energy" },
      { id: "C", text: "It releases carbon dioxide" },
      { id: "D", text: "It turns plants green in the fall" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that chlorophyll 'absorbs light energy and uses it to transform carbon dioxide and water into glucose and oxygen.'",
    difficulty: "easy"
  },
  {
    id: 4,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "The Industrial Revolution, which began in Britain in the late 18th century, transformed society in profound ways. Factories replaced cottage industries, and millions of people moved from rural areas to rapidly growing cities. While this shift created new economic opportunities, it also led to crowded living conditions, long working hours, and significant environmental pollution that would take centuries to address.",
    text: "Which of the following best describes the author's attitude toward the Industrial Revolution?",
    options: [
      { id: "A", text: "Strongly positive and celebratory" },
      { id: "B", text: "Completely negative and critical" },
      { id: "C", text: "Balanced, acknowledging both benefits and drawbacks" },
      { id: "D", text: "Neutral and uninterested" }
    ],
    correctAnswer: "C",
    explanation: "The author mentions both positive aspects (new economic opportunities) and negative aspects (crowded conditions, pollution), showing a balanced perspective.",
    difficulty: "medium"
  },
  {
    id: 5,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "Dr. Aiko Tanaka had spent fifteen years studying the migration patterns of monarch butterflies. Her research had taken her from the mountains of Mexico to the forests of Canada. Each year, she tagged hundreds of butterflies, tracking their incredible 4,000-kilometer journey. When asked why she dedicated her life to this work, she simply replied, 'Because some mysteries are worth chasing.'",
    text: "The phrase 'some mysteries are worth chasing' suggests that Dr. Tanaka:",
    options: [
      { id: "A", text: "Finds the butterflies difficult to catch" },
      { id: "B", text: "Believes her research is meaningful and valuable" },
      { id: "C", text: "Is frustrated by the lack of answers" },
      { id: "D", text: "Plans to stop her research soon" }
    ],
    correctAnswer: "B",
    explanation: "The quote reflects Dr. Tanaka's passion for her work and her belief that understanding monarch migration is a worthwhile pursuit.",
    difficulty: "medium"
  },
  {
    id: 6,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "The Amazon rainforest produces approximately 20% of the world's oxygen, earning it the nickname 'the lungs of the Earth.' However, deforestation has reduced the forest's size by nearly 20% in the last fifty years. Scientists warn that if deforestation continues at the current rate, the Amazon could reach a tipping point where it transforms from a rainforest into a dry savanna, with devastating consequences for global climate patterns.",
    text: "What does the passage suggest could happen if deforestation continues?",
    options: [
      { id: "A", text: "The Amazon will completely disappear within a decade" },
      { id: "B", text: "The forest could become a different type of ecosystem" },
      { id: "C", text: "Oxygen production will increase temporarily" },
      { id: "D", text: "The Amazon will expand into new areas" }
    ],
    correctAnswer: "B",
    explanation: "The passage states the Amazon could reach a tipping point where it 'transforms from a rainforest into a dry savanna' — a different type of ecosystem.",
    difficulty: "medium"
  },
  {
    id: 7,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "The detective examined the room carefully. Nothing seemed out of place — the books were neatly arranged, the desk was tidy, and the curtains were drawn. But something bothered him. He knelt down and looked under the rug, where he found a single key. It was tarnished and old, clearly not from this century. 'This changes everything,' he muttered.",
    text: "Why does the detective say 'This changes everything'?",
    options: [
      { id: "A", text: "The room was messier than he expected" },
      { id: "B", text: "The key suggests the case is older than he thought" },
      { id: "C", text: "He found the key he was looking for" },
      { id: "D", text: "The curtains were the wrong color" }
    ],
    correctAnswer: "B",
    explanation: "The key is described as 'tarnished and old, clearly not from this century,' which implies the case has a history reaching further back than the detective initially believed.",
    difficulty: "medium"
  },
  {
    id: 8,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "Studies have shown that people who read fiction regularly develop stronger empathy skills than those who do not. When we read about characters' experiences, our brains simulate the emotions and perspectives described, strengthening neural pathways associated with social understanding. This suggests that reading is not merely entertainment but a form of practice for navigating real-world social relationships.",
    text: "The passage primarily argues that reading fiction:",
    options: [
      { id: "A", text: "Is less enjoyable than watching television" },
      { id: "B", text: "Helps develop real-world social skills" },
      { id: "C", text: "Should be required in all schools" },
      { id: "D", text: "Only benefits certain types of readers" }
    ],
    correctAnswer: "B",
    explanation: "The passage connects reading fiction to stronger empathy and social understanding, calling it 'practice for navigating real-world social relationships.'",
    difficulty: "easy"
  },
  {
    id: 9,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "The term 'Renaissance' means 'rebirth,' and it perfectly describes the period of cultural and intellectual revival that swept across Europe between the 14th and 17th centuries. During this time, artists and thinkers rediscovered classical Greek and Roman texts, leading to breakthroughs in art, science, and philosophy. Figures like Leonardo da Vinci and Michelangelo embodied the Renaissance ideal of the 'universal person' — someone skilled in many disciplines.",
    text: "According to the passage, what does the term 'Renaissance' literally mean?",
    options: [
      { id: "A", text: "Universal person" },
      { id: "B", text: "Rebirth" },
      { id: "C", text: "Cultural revival" },
      { id: "D", text: "Classical discovery" }
    ],
    correctAnswer: "B",
    explanation: "The passage begins by stating that 'Renaissance' means 'rebirth' and explains why this term is appropriate for the period described.",
    difficulty: "easy"
  },
  {
    id: 10,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "For years, scientists believed that the human brain stopped developing after adolescence. However, recent research has revealed that neuroplasticity — the brain's ability to form new neural connections — continues throughout our lives. This discovery has profound implications for learning, rehabilitation after injury, and our understanding of aging. It means that at any age, we can learn new skills, form new memories, and even rewire parts of our brain that have been damaged.",
    text: "The word 'neuroplasticity' in the passage most nearly means:",
    options: [
      { id: "A", text: "The brain's ability to change and adapt" },
      { id: "B", text: "The process of brain aging" },
      { id: "C", text: "The study of adolescent brains" },
      { id: "D", text: "The formation of childhood memories" }
    ],
    correctAnswer: "A",
    explanation: "The passage defines neuroplasticity as 'the brain's ability to form new neural connections,' which is the ability to change and adapt.",
    difficulty: "medium"
  },
  {
    id: 11,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "The ancient city of Petra, carved directly into sandstone cliffs in what is now Jordan, was once a thriving trading hub. The Nabataean people who built it engineered an elaborate system of channels and cisterns to capture and store water, allowing the city to flourish in the middle of the desert. At its peak, Petra controlled trade routes carrying frankincense, myrrh, and spices from Arabia to the Mediterranean.",
    text: "What made it possible for Petra to thrive in a desert environment?",
    options: [
      { id: "A", text: "Its location near the Mediterranean Sea" },
      { id: "B", text: "Its advanced water management system" },
      { id: "C", text: "The abundance of natural springs" },
      { id: "D", text: "Regular rainfall throughout the year" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that the Nabataeans 'engineered an elaborate system of channels and cisterns to capture and store water,' enabling the city to flourish in the desert.",
    difficulty: "easy"
  },
  {
    id: 12,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "The short story is a unique literary form that demands precision. Unlike a novel, which has hundreds of pages to develop characters and plot, a short story must accomplish everything in a few thousand words. Every sentence must serve a purpose. The best short story writers, such as Alice Munro and Raymond Carver, are masters of implication — they suggest more than they state, leaving readers to fill in the gaps with their own imagination.",
    text: "According to the passage, what distinguishes short stories from novels?",
    options: [
      { id: "A", text: "Short stories are easier to write" },
      { id: "B", text: "Short stories require more precise language" },
      { id: "C", text: "Short stories have fewer characters" },
      { id: "D", text: "Short stories are always more popular" }
    ],
    correctAnswer: "B",
    explanation: "The passage emphasizes that every sentence in a short story 'must serve a purpose' and that they 'demand precision,' unlike novels which have more space.",
    difficulty: "medium"
  },
  {
    id: 13,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "The migration of the wildebeest across the Serengeti is one of the most spectacular natural events on Earth. Over 1.5 million wildebeest, accompanied by hundreds of thousands of zebras and gazelles, travel in a circular route across Tanzania and Kenya. They follow the seasonal rains, seeking fresh grazing land. The journey is fraught with danger: rivers teeming with crocodiles, predators lying in wait, and the ever-present threat of exhaustion. Yet the herd presses on, driven by an ancient instinct that has guided them for millennia.",
    text: "The passage suggests that the wildebeest migration is primarily driven by:",
    options: [
      { id: "A", text: "The need to escape predators" },
      { id: "B", text: "The search for food and water" },
      { id: "C", text: "The instinct to give birth in a specific location" },
      { id: "D", text: "Changes in temperature between seasons" }
    ],
    correctAnswer: "B",
    explanation: "The passage states the animals follow 'the seasonal rains, seeking fresh grazing land,' indicating the search for food and water is the primary driver.",
    difficulty: "medium"
  },
  {
    id: 14,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "The old lighthouse stood on the cliff, its beacon long extinguished. For generations, it had guided ships safely through the treacherous waters of the bay. Now it was nothing more than a tourist attraction, a relic of a bygone era. But on stormy nights, when the wind howled and the waves crashed against the rocks below, the old keeper's granddaughter swore she could still see a faint glow emanating from the tower, as if the lighthouse remembered its duty.",
    text: "The description of the lighthouse 'remembering its duty' is an example of:",
    options: [
      { id: "A", text: "Literal description" },
      { id: "B", text: "Personification" },
      { id: "C", text: "Historical fact" },
      { id: "D", text: "Scientific observation" }
    ],
    correctAnswer: "B",
    explanation: "The author gives human qualities (remembering, having a duty) to an inanimate object (the lighthouse), which is the definition of personification.",
    difficulty: "hard"
  },
  {
    id: 15,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "In 1848, women's rights advocates gathered in Seneca Falls, New York, for the first women's rights convention in the United States. Organized by Elizabeth Cady Stanton and Lucretia Mott, the convention produced the Declaration of Sentiments, a document modeled on the Declaration of Independence that declared all men and women are created equal. The convention sparked decades of activism that would eventually lead to women gaining the right to vote in 1920.",
    text: "What was the Declaration of Sentiments modeled after?",
    options: [
      { id: "A", text: "The U.S. Constitution" },
      { id: "B", text: "The Declaration of Independence" },
      { id: "C", text: "The Bill of Rights" },
      { id: "D", text: "The Emancipation Proclamation" }
    ],
    correctAnswer: "B",
    explanation: "The passage explicitly states the Declaration of Sentiments was 'modeled on the Declaration of Independence.'",
    difficulty: "easy"
  },
  {
    id: 16,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "Dr. Helena Wright had spent her entire career studying the vocalizations of humpback whales. She had recorded thousands of hours of songs, each one a complex pattern of moans, cries, and whistles that could travel for hundreds of miles underwater. What fascinated her most was how the songs changed over time. Whales in different regions developed distinct dialects, and the songs evolved from year to year, with new phrases replacing old ones like a constantly shifting musical tradition.",
    text: "The passage compares whale songs changing over time to:",
    options: [
      { id: "A", text: "A scientific experiment" },
      { id: "B", text: "A musical tradition that evolves" },
      { id: "C", text: "A conversation between humans" },
      { id: "D", text: "The migration patterns of whales" }
    ],
    correctAnswer: "B",
    explanation: "The passage describes the songs as 'a constantly shifting musical tradition,' with new phrases replacing old ones over time.",
    difficulty: "hard"
  },
  {
    id: 17,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "The concept of 'cultural lag' was introduced by sociologist William F. Ogburn to describe the period of adjustment that occurs when material culture changes faster than non-material culture. For example, while technology has advanced rapidly in the past century, our laws, customs, and ethical frameworks have struggled to keep pace. This gap between technological progress and social adaptation creates tensions that societies must navigate carefully.",
    text: "Which of the following is the best example of 'cultural lag' as described in the passage?",
    options: [
      { id: "A", text: "A new smartphone model being released every year" },
      { id: "B", text: "Laws about data privacy struggling to keep up with the internet" },
      { id: "C", text: "Students learning to use computers in school" },
      { id: "D", text: "Traditional clothing being replaced by modern fashion" }
    ],
    correctAnswer: "B",
    explanation: "The passage explains cultural lag as the gap between technological advancement and the slower adaptation of laws and customs — data privacy laws lagging behind the internet is a perfect example.",
    difficulty: "hard"
  },
  {
    id: 18,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "The architecture of the Bauhaus school, founded in Germany in 1919, rejected the ornate decorations of previous eras in favor of clean lines, functional design, and the honest use of materials. Bauhaus buildings featured flat roofs, glass walls, and asymmetrical layouts. The school's philosophy — that form should follow function — influenced everything from skyscrapers to furniture design and remains a cornerstone of modern architecture to this day.",
    text: "What was the core philosophy of the Bauhaus school?",
    options: [
      { id: "A", text: "Decoration should be elaborate and ornate" },
      { id: "B", text: "Design should prioritize beauty over usefulness" },
      { id: "C", text: "Form should follow function" },
      { id: "D", text: "Buildings should be symmetrical and traditional" }
    ],
    correctAnswer: "C",
    explanation: "The passage explicitly states the Bauhaus philosophy was 'that form should follow function,' meaning design should prioritize purpose over decoration.",
    difficulty: "medium"
  },
  {
    id: 19,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "The detective reached the end of the case file and set it down with a sigh. The evidence was all there, neatly arranged, pointing to a single conclusion. But something about it felt too neat, too perfect. In his thirty years on the force, he had learned that real crimes were rarely tidy. The loose ends, the contradictions, the things that didn't quite fit — those were the signs of the truth. A case this clean was almost certainly a setup.",
    text: "Why does the detective distrust the evidence in the case file?",
    options: [
      { id: "A", text: "The evidence is incomplete" },
      { id: "B", text: "The case is too neatly arranged" },
      { id: "C", text: "He cannot find the loose ends" },
      { id: "D", text: "His partner disagrees with the conclusion" }
    ],
    correctAnswer: "B",
    explanation: "The detective reflects that 'real crimes were rarely tidy' and that a case 'this clean' is 'almost certainly a setup' — the neatness itself is what he distrusts.",
    difficulty: "hard"
  },
  {
    id: 20,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "Urban green spaces, such as parks and community gardens, provide benefits that extend far beyond aesthetics. They help reduce the urban heat island effect by cooling the air through evapotranspiration. They absorb stormwater, reducing the risk of flooding. They improve air quality by filtering pollutants. And perhaps most importantly, they offer residents a place to connect with nature and with each other, fostering a sense of community in increasingly dense cities.",
    text: "The passage lists several benefits of urban green spaces. Which of the following is NOT mentioned?",
    options: [
      { id: "A", text: "Reducing the urban heat island effect" },
      { id: "B", text: "Increasing property values" },
      { id: "C", text: "Improving air quality" },
      { id: "D", text: "Reducing flood risk" }
    ],
    correctAnswer: "B",
    explanation: "The passage mentions cooling the air (heat island), absorbing stormwater (flooding), filtering pollutants (air quality), and community connection — but does not mention property values.",
    difficulty: "medium"
  },
  {
    id: 21,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "The Rosetta Stone, discovered in 1799 by French soldiers in Egypt, became the key to deciphering ancient Egyptian hieroglyphs. The stone is inscribed with a decree issued in 196 BC in three scripts: hieroglyphic, demotic, and ancient Greek. Because the same text appeared in all three, scholars could use their knowledge of Greek to finally unlock the meaning of the hieroglyphs, opening a window into a civilization that had been silent for over a thousand years.",
    text: "Why was the Rosetta Stone so important to scholars?",
    options: [
      { id: "A", text: "It was the oldest Egyptian artifact ever found" },
      { id: "B", text: "It contained the same text in three languages" },
      { id: "C", text: "It was made of a rare type of stone" },
      { id: "D", text: "It described the location of pharaohs' tombs" }
    ],
    correctAnswer: "B",
    explanation: "The passage explains that because the same text appeared in three scripts, scholars could use the known Greek to decipher the previously unknown hieroglyphs.",
    difficulty: "easy"
  },
  {
    id: 22,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "The placebo effect is a fascinating phenomenon in which patients experience real improvements in their condition after receiving a treatment that has no therapeutic active ingredients. Researchers believe the effect is driven by the patient's expectation of improvement, which triggers the brain to release natural pain-relieving chemicals. This demonstrates the powerful connection between the mind and body, and it presents both an opportunity and a challenge for medical researchers designing clinical trials.",
    text: "The passage suggests that the placebo effect is caused by:",
    options: [
      { id: "A", text: "The active ingredients in the treatment" },
      { id: "B", text: "The patient's expectation of improvement" },
      { id: "C", text: "The skill of the doctor administering the treatment" },
      { id: "D", text: "The length of time the patient has been ill" }
    ],
    correctAnswer: "B",
    explanation: "The passage states the effect is 'driven by the patient's expectation of improvement, which triggers the brain to release natural pain-relieving chemicals.'",
    difficulty: "medium"
  },
  {
    id: 23,
    skill: "eng-read-infer",
    domain: "Reading",
    passage: "The novel opens with a description of a city shrouded in fog, a fog so thick that citizens navigate by touch and memory. The protagonist, a clockmaker named Elias, can find his way through the streets by the sounds of the bells from the city's many towers. The fog is not merely a weather phenomenon; it is a metaphor for the moral confusion that grips the city, a confusion that Elias will spend the rest of the novel trying to dispel.",
    text: "In the passage, the fog is best understood as:",
    options: [
      { id: "A", text: "A realistic description of the city's climate" },
      { id: "B", text: "A symbol of the city's moral confusion" },
      { id: "C", text: "An obstacle that prevents Elias from working" },
      { id: "D", text: "A minor detail with no deeper meaning" }
    ],
    correctAnswer: "B",
    explanation: "The passage explicitly states that 'the fog is not merely a weather phenomenon; it is a metaphor for the moral confusion that grips the city.'",
    difficulty: "hard"
  },
  {
    id: 24,
    skill: "eng-read-analyze",
    domain: "Reading",
    passage: "The platypus is one of the most unusual creatures in the animal kingdom. It is a mammal that lays eggs, has a bill like a duck, a tail like a beaver, and webbed feet. When the first preserved specimen was sent to Europe in the late 18th century, scientists thought it was a hoax — someone had stitched together parts of different animals. It took years of careful study to confirm that the platypus was, in fact, a real animal.",
    text: "Why did European scientists initially think the platypus was a hoax?",
    options: [
      { id: "A", text: "It was too large to be a real animal" },
      { id: "B", text: "It had features from different types of animals" },
      { id: "C", text: "The specimen was poorly preserved" },
      { id: "D", text: "No one had ever seen a mammal before" }
    ],
    correctAnswer: "B",
    explanation: "The passage states that scientists thought 'someone had stitched together parts of different animals' because the platypus combined features of a duck, beaver, and mammal.",
    difficulty: "easy"
  },
  {
    id: 25,
    skill: "eng-read-main",
    domain: "Reading",
    passage: "The conductor raised her baton, and the orchestra fell silent. For a moment, the only sound was the soft rustle of musicians adjusting their sheet music. Then she brought her arms down, and the hall filled with the opening chords of Beethoven's Fifth Symphony. The four-note motif — short, short, short, long — resonated through the concert hall, a pattern so recognizable that even those who had never studied music could hum it from memory. It was, as one critic had written, 'the most famous door in all of music.'",
    text: "The phrase 'the most famous door in all of music' suggests that the opening motif:",
    options: [
      { id: "A", text: "Is the beginning of something well-known" },
      { id: "B", text: "Is difficult to play on an instrument" },
      { id: "C", text: "Was written by a famous composer" },
      { id: "D", text: "Is the longest part of the symphony" }
    ],
    correctAnswer: "A",
    explanation: "A door is something you enter through — calling the motif 'the most famous door in all of music' suggests it is a well-known opening, the entrance to the piece.",
    difficulty: "hard"
  },

  // ======================================================================
  // DOMAIN: Writing — Questions 26-50
  // Skill: eng-write-essay / eng-write-argument (sentence correction, punctuation, subject-verb agreement)
  // ======================================================================
  {
    id: 26,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Choose the correct version of the sentence:\n\nThe team of researchers are preparing their final report.",
    options: [
      { id: "A", text: "The team of researchers are preparing their final report." },
      { id: "B", text: "The team of researchers is preparing their final report." },
      { id: "C", text: "The team of researchers are preparing its final report." },
      { id: "D", text: "The team of researchers is preparing its final report." }
    ],
    correctAnswer: "D",
    explanation: "The subject is 'team' (singular), so the verb should be 'is.' Since 'team' is a collective noun treated as a single unit, the pronoun should be 'its.'",
    difficulty: "medium"
  },
  {
    id: 27,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version of the sentence:\n\nWalking through the park, the flowers were beautiful.",
    options: [
      { id: "A", text: "Walking through the park, the flowers were beautiful." },
      { id: "B", text: "Walking through the park, I thought the flowers were beautiful." },
      { id: "C", text: "Walking through the park, the flowers were being beautiful." },
      { id: "D", text: "The flowers were beautiful walking through the park." }
    ],
    correctAnswer: "B",
    explanation: "The original sentence has a dangling modifier — the flowers were not walking through the park. Version B adds 'I thought,' making it clear who was walking.",
    difficulty: "medium"
  },
  {
    id: 28,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Choose the correct punctuation for the blank:\n\nThe meeting has been rescheduled ___ it will now take place on Friday.",
    options: [
      { id: "A", text: ":" },
      { id: "B", text: ";" },
      { id: "C", text: "," },
      { id: "D", text: "." }
    ],
    correctAnswer: "B",
    explanation: "A semicolon connects two independent clauses that are closely related in meaning. Both parts could stand alone as sentences, so a semicolon is appropriate.",
    difficulty: "medium"
  },
  {
    id: 29,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Which sentence is punctuated correctly?",
    options: [
      { id: "A", text: "The book which I borrowed from the library was overdue." },
      { id: "B", text: "The book, which I borrowed from the library, was overdue." },
      { id: "C", text: "The book which I borrowed from the library, was overdue." },
      { id: "D", text: "The book, which I borrowed from the library was overdue." }
    ],
    correctAnswer: "B",
    explanation: "The clause 'which I borrowed from the library' is a non-restrictive (non-essential) clause and should be set off by commas on both sides.",
    difficulty: "hard"
  },
  {
    id: 30,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Choose the correct version:\n\nNeither the teacher nor the students ___ satisfied with the test results.",
    options: [
      { id: "A", text: "was" },
      { id: "B", text: "were" },
      { id: "C", text: "is" },
      { id: "D", text: "has been" }
    ],
    correctAnswer: "B",
    explanation: "With 'neither...nor,' the verb agrees with the subject closest to it. 'Students' is plural, so the verb should be 'were.'",
    difficulty: "medium"
  },
  {
    id: 31,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version of the sentence:\n\nEveryone should bring their own lunch to the picnic.",
    options: [
      { id: "A", text: "Everyone should bring their own lunch to the picnic." },
      { id: "B", text: "Everyone should bring his or her own lunch to the picnic." },
      { id: "C", text: "Everyone should bring its own lunch to the picnic." },
      { id: "D", text: "Everyone should bring our own lunch to the picnic." }
    ],
    correctAnswer: "A",
    explanation: "While 'everyone' is singular, the use of 'their' as a singular they is widely accepted in modern English for gender-neutral construction.",
    difficulty: "easy"
  },
  {
    id: 32,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence uses the apostrophe correctly?",
    options: [
      { id: "A", text: "The cats toys are scattered across the floor." },
      { id: "B", text: "The cat's toys are scattered across the floor." },
      { id: "C", text: "The cats' toys are scattered across the floor." },
      { id: "D", text: "Both B and C could be correct depending on the number of cats." }
    ],
    correctAnswer: "D",
    explanation: "If there is one cat, 'cat's' is correct (singular possessive). If there are multiple cats, 'cats'' is correct (plural possessive). Both are grammatically correct depending on context.",
    difficulty: "hard"
  },
  {
    id: 33,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nShe studied hard for the exam, ___ she still didn't pass.",
    options: [
      { id: "A", text: "but" },
      { id: "B", text: "and" },
      { id: "C", text: "so" },
      { id: "D", text: "for" }
    ],
    correctAnswer: "A",
    explanation: "'But' is the correct conjunction to show contrast between studying hard and not passing. 'And' would add information, 'so' would show result, and 'for' would show reason.",
    difficulty: "easy"
  },
  {
    id: 34,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence is written in the active voice?",
    options: [
      { id: "A", text: "The cake was baked by Sarah." },
      { id: "B", text: "The report was submitted on time." },
      { id: "C", text: "The dog chased the ball across the yard." },
      { id: "D", text: "The window was broken by the storm." }
    ],
    correctAnswer: "C",
    explanation: "In active voice, the subject performs the action. 'The dog chased the ball' — the dog (subject) performs the action of chasing. The other options are in passive voice.",
    difficulty: "easy"
  },
  {
    id: 35,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nThe professor asked the students to ___ their assignments by Friday.",
    options: [
      { id: "A", text: "of" },
      { id: "B", text: "off" },
      { id: "C", text: "submit" },
      { id: "D", text: "submitt" }
    ],
    correctAnswer: "C",
    explanation: "'Submit' is the correct verb meaning to hand in or present for consideration. 'Of' and 'off' are prepositions and do not fit here. 'Submitt' is a misspelling.",
    difficulty: "easy"
  },
  {
    id: 36,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence contains a comma splice?",
    options: [
      { id: "A", text: "I went to the store, and I bought some milk." },
      { id: "B", text: "It was raining, we stayed indoors." },
      { id: "C", text: "Because it was raining, we stayed indoors." },
      { id: "D", text: "After the movie ended, we went for dinner." }
    ],
    correctAnswer: "B",
    explanation: "A comma splice occurs when two independent clauses are joined by only a comma. 'It was raining' and 'we stayed indoors' are both independent clauses. It needs a conjunction or semicolon.",
    difficulty: "medium"
  },
  {
    id: 37,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nShe is one of those writers who ___ won multiple awards.",
    options: [
      { id: "A", text: "has" },
      { id: "B", text: "have" },
      { id: "C", text: "is" },
      { id: "D", text: "was" }
    ],
    correctAnswer: "B",
    explanation: "The antecedent of 'who' is 'writers' (plural), not 'one.' Therefore, the verb should be plural: 'have won.'",
    difficulty: "hard"
  },
  {
    id: 38,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence uses parallel structure correctly?",
    options: [
      { id: "A", text: "She likes swimming, to run, and biking." },
      { id: "B", text: "She likes to swim, running, and to bike." },
      { id: "C", text: "She likes swimming, running, and biking." },
      { id: "D", text: "She likes swimming, to run, and to bike." }
    ],
    correctAnswer: "C",
    explanation: "Parallel structure requires items in a list to have the same grammatical form. All three items — swimming, running, biking — are gerunds, making the list parallel.",
    difficulty: "easy"
  },
  {
    id: 39,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nThe data ___ collected from multiple sources over a period of five years.",
    options: [
      { id: "A", text: "was" },
      { id: "B", text: "were" },
      { id: "C", text: "is being" },
      { id: "D", text: "Both A and B are acceptable in modern usage" }
    ],
    correctAnswer: "D",
    explanation: "While 'data' is technically the plural of 'datum,' in modern usage, 'data' is commonly treated as a singular mass noun. Both 'was' and 'were' are widely accepted.",
    difficulty: "hard"
  },
  {
    id: 40,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence uses the semicolon correctly?",
    options: [
      { id: "A", text: "The concert was amazing; and we stayed until the very end." },
      { id: "B", text: "I have lived in three cities; Paris, London, and Rome." },
      { id: "C", text: "She finished the race; she was exhausted but triumphant." },
      { id: "D", text: "The reason; he explained, was complicated." }
    ],
    correctAnswer: "C",
    explanation: "A semicolon correctly joins two independent clauses that are closely related. 'She finished the race' and 'she was exhausted but triumphant' are both independent clauses.",
    difficulty: "medium"
  },
  {
    id: 41,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nIf I ___ you, I would accept the job offer.",
    options: [
      { id: "A", text: "was" },
      { id: "B", text: "were" },
      { id: "C", text: "am" },
      { id: "D", text: "be" }
    ],
    correctAnswer: "B",
    explanation: "In hypothetical or contrary-to-fact statements (subjunctive mood), 'were' is used instead of 'was' regardless of the subject. 'If I were you' is the correct form.",
    difficulty: "medium"
  },
  {
    id: 42,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence is correctly capitalized?",
    options: [
      { id: "A", text: "My mother said, 'you should always tell the truth.'" },
      { id: "B", text: "My mother said, 'You should always tell the truth.'" },
      { id: "C", text: "My mother said 'you should always tell the truth.'" },
      { id: "D", text: "My mother said 'You should always tell the truth.'" }
    ],
    correctAnswer: "B",
    explanation: "When quoting a complete sentence, the first word of the quotation should be capitalized. Additionally, a comma should separate the attribution from the quotation.",
    difficulty: "medium"
  },
  {
    id: 43,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nThe company's success is due to ___ hard work and dedication.",
    options: [
      { id: "A", text: "there" },
      { id: "B", text: "their" },
      { id: "C", text: "they're" },
      { id: "D", text: "thier" }
    ],
    correctAnswer: "B",
    explanation: "'Their' is the possessive form of 'they,' indicating that the hard work belongs to the employees. 'There' refers to a place, and 'they're' is a contraction of 'they are.'",
    difficulty: "easy"
  },
  {
    id: 44,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence contains a sentence fragment?",
    options: [
      { id: "A", text: "Although she was tired, she continued working." },
      { id: "B", text: "Because the test was difficult." },
      { id: "C", text: "He ran as fast as he could." },
      { id: "D", text: "The book that I borrowed from the library." }
    ],
    correctAnswer: "B",
    explanation: "'Because the test was difficult' is a dependent clause that cannot stand alone as a sentence. It needs an independent clause to complete the thought.",
    difficulty: "medium"
  },
  {
    id: 45,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nNot only did she finish the project, ___ she exceeded all expectations.",
    options: [
      { id: "A", text: "and" },
      { id: "B", text: "but" },
      { id: "C", text: "but also" },
      { id: "D", text: "so" }
    ],
    correctAnswer: "C",
    explanation: "The correlative conjunction pair 'not only...but also' is the correct structure. It connects two related ideas where the second is an addition or escalation.",
    difficulty: "medium"
  },
  {
    id: 46,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence uses the correct pronoun case?",
    options: [
      { id: "A", text: "Me and my friend went to the cinema." },
      { id: "B", text: "My friend and me went to the cinema." },
      { id: "C", text: "My friend and I went to the cinema." },
      { id: "D", text: "I and my friend went to the cinema." }
    ],
    correctAnswer: "C",
    explanation: "'I' is the subject pronoun and should be used when the pronoun is part of the subject. 'My friend and I' is the correct order and form. 'Me' is an object pronoun.",
    difficulty: "easy"
  },
  {
    id: 47,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nThe committee ___ divided on the issue of budget cuts.",
    options: [
      { id: "A", text: "is" },
      { id: "B", text: "are" },
      { id: "C", text: "was being" },
      { id: "D", text: "has been being" }
    ],
    correctAnswer: "B",
    explanation: "When a collective noun like 'committee' refers to the individual members acting separately (divided opinions), it takes a plural verb. 'Are' is correct here.",
    difficulty: "hard"
  },
  {
    id: 48,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence is punctuated correctly?",
    options: [
      { id: "A", text: "She bought apples, oranges, bananas, and grapes." },
      { id: "B", text: "She bought apples, oranges, bananas and grapes." },
      { id: "C", text: "She bought apples oranges bananas and grapes." },
      { id: "D", text: "She bought: apples, oranges, bananas, and grapes." }
    ],
    correctAnswer: "A",
    explanation: "In a list of four or more items, the Oxford comma (the comma before 'and') is used for clarity. The colon in D is incorrect because the list is integral to the sentence structure.",
    difficulty: "easy"
  },
  {
    id: 49,
    skill: "eng-write-argument",
    domain: "Writing",
    text: "Choose the correct version:\n\nHaving finished her homework, ___.",
    options: [
      { id: "A", text: "the television was turned on" },
      { id: "B", text: "turning on the television" },
      { id: "C", text: "she turned on the television" },
      { id: "D", text: "the television was being turned on" }
    ],
    correctAnswer: "C",
    explanation: "The introductory phrase 'Having finished her homework' modifies the subject of the main clause. 'She' is the one who finished her homework, so 'she turned on the television' is correct.",
    difficulty: "hard"
  },
  {
    id: 50,
    skill: "eng-write-essay",
    domain: "Writing",
    text: "Which sentence avoids a misplaced modifier?",
    options: [
      { id: "A", text: "He almost drove his car for ten hours straight." },
      { id: "B", text: "He drove his car almost for ten hours straight." },
      { id: "C", text: "He drove his car for almost ten hours straight." },
      { id: "D", text: "He drove almost his car for ten hours straight." }
    ],
    correctAnswer: "C",
    explanation: "'Almost' should modify 'ten hours,' not 'drove.' Placing 'almost' before 'ten hours' makes it clear that the duration is nearly ten hours, not that he nearly drove (which would mean he didn't drive at all).",
    difficulty: "hard"
  },

  // ======================================================================
  // DOMAIN: Vocabulary — Questions 51-75
  // Skill: eng-vocab-acad / eng-vocab-context (word meaning, synonyms, antonyms, context)
  // ======================================================================
  {
    id: 51,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "What does the word 'benevolent' most nearly mean?",
    options: [
      { id: "A", text: "Angry and hostile" },
      { id: "B", text: "Kind and generous" },
      { id: "C", text: "Weak and timid" },
      { id: "D", text: "Strict and demanding" }
    ],
    correctAnswer: "B",
    explanation: "'Benevolent' means well-meaning, kindly, and generous. It comes from Latin 'bene' (well) and 'volent' (wishing).",
    difficulty: "easy"
  },
  {
    id: 52,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Which word is a synonym for 'ubiquitous'?",
    options: [
      { id: "A", text: "Rare" },
      { id: "B", text: "Everywhere" },
      { id: "C", text: "Hidden" },
      { id: "D", text: "Powerful" }
    ],
    correctAnswer: "B",
    explanation: "'Ubiquitous' means present, appearing, or found everywhere. 'Everywhere' is the closest synonym.",
    difficulty: "medium"
  },
  {
    id: 53,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "Select the word that is an antonym of 'ephemeral.'",
    options: [
      { id: "A", text: "Temporary" },
      { id: "B", text: "Permanent" },
      { id: "C", text: "Brief" },
      { id: "D", text: "Fleeting" }
    ],
    correctAnswer: "B",
    explanation: "'Ephemeral' means lasting for a very short time. Its antonym is 'permanent,' which means lasting for a long time or indefinitely.",
    difficulty: "medium"
  },
  {
    id: 54,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Choose the word that best completes the sentence:\n\nThe speaker's remarks were so ___ that the audience struggled to follow her argument.",
    options: [
      { id: "A", text: "lucid" },
      { id: "B", text: "convoluted" },
      { id: "C", text: "concise" },
      { id: "D", text: "eloquent" }
    ],
    correctAnswer: "B",
    explanation: "'Convoluted' means extremely complex and difficult to follow. The audience struggled, so the remarks must have been complicated or unclear.",
    difficulty: "medium"
  },
  {
    id: 55,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "What does the word 'ambiguous' mean?",
    options: [
      { id: "A", text: "Having multiple possible meanings" },
      { id: "B", text: "Completely clear and certain" },
      { id: "C", text: "Extremely angry" },
      { id: "D", text: "Very ambitious" }
    ],
    correctAnswer: "A",
    explanation: "'Ambiguous' means open to more than one interpretation; having a double meaning or unclear meaning.",
    difficulty: "easy"
  },
  {
    id: 56,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Which word is a synonym for 'meticulous'?",
    options: [
      { id: "A", text: "Careless" },
      { id: "B", text: "Thorough" },
      { id: "C", text: "Rapid" },
      { id: "D", text: "Disorganized" }
    ],
    correctAnswer: "B",
    explanation: "'Meticulous' means showing great attention to detail; very careful and precise. 'Thorough' is the closest synonym.",
    difficulty: "easy"
  },
  {
    id: 57,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "Select the word that is an antonym of 'gregarious.'",
    options: [
      { id: "A", text: "Sociable" },
      { id: "B", text: "Outgoing" },
      { id: "C", text: "Withdrawn" },
      { id: "D", text: "Talkative" }
    ],
    correctAnswer: "C",
    explanation: "'Gregarious' means fond of company; sociable. Its antonym is 'withdrawn,' which means not wanting to communicate with others.",
    difficulty: "hard"
  },
  {
    id: 58,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Choose the word that best completes the sentence:\n\nThe scientist presented a ___ argument that convinced even her skeptics.",
    options: [
      { id: "A", text: "cogent" },
      { id: "B", text: "frivolous" },
      { id: "C", text: "obscure" },
      { id: "D", text: "vague" }
    ],
    correctAnswer: "A",
    explanation: "'Cogent' means clear, logical, and convincing. The argument convinced skeptics, so it must have been well-reasoned — 'cogent' is the best fit.",
    difficulty: "hard"
  },
  {
    id: 59,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "What does the word 'pragmatic' most nearly mean?",
    options: [
      { id: "A", text: "Idealistic" },
      { id: "B", text: "Practical" },
      { id: "C", text: "Emotional" },
      { id: "D", text: "Theoretical" }
    ],
    correctAnswer: "B",
    explanation: "'Pragmatic' means dealing with things sensibly and realistically; practical in approach.",
    difficulty: "easy"
  },
  {
    id: 60,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Which word is a synonym for 'mitigate'?",
    options: [
      { id: "A", text: "Worsen" },
      { id: "B", text: "Lessen" },
      { id: "C", text: "Ignore" },
      { id: "D", text: "Celebrate" }
    ],
    correctAnswer: "B",
    explanation: "'Mitigate' means to make less severe, serious, or painful. 'Lessen' is the closest synonym.",
    difficulty: "medium"
  },
  {
    id: 61,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "Select the word that is an antonym of 'superficial.'",
    options: [
      { id: "A", text: "Shallow" },
      { id: "B", text: "Deep" },
      { id: "C", text: "Trivial" },
      { id: "D", text: "Surface-level" }
    ],
    correctAnswer: "B",
    explanation: "'Superficial' means existing or occurring at or on the surface; not thorough. Its antonym is 'deep,' meaning profound or thorough.",
    difficulty: "medium"
  },
  {
    id: 62,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Choose the word that best completes the sentence:\n\nThe politician's speech was full of ___ but lacked substance.",
    options: [
      { id: "A", text: "rhetoric" },
      { id: "B", text: "brevity" },
      { id: "C", text: "sincerity" },
      { id: "D", text: "evidence" }
    ],
    correctAnswer: "A",
    explanation: "'Rhetoric' in this context refers to language designed to persuade or impress but often lacking meaningful content. The contrast with 'lacked substance' makes 'rhetoric' the best fit.",
    difficulty: "medium"
  },
  {
    id: 63,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "What does the word 'paradigm' most nearly mean?",
    options: [
      { id: "A", text: "A type of currency" },
      { id: "B", text: "A typical example or model" },
      { id: "C", text: "A mathematical equation" },
      { id: "D", text: "A type of bird" }
    ],
    correctAnswer: "B",
    explanation: "'Paradigm' means a typical example, pattern, or model of something. It is commonly used in academic contexts to describe a framework of thinking.",
    difficulty: "medium"
  },
  {
    id: 64,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Which word is a synonym for 'reluctant'?",
    options: [
      { id: "A", text: "Eager" },
      { id: "B", text: "Unwilling" },
      { id: "C", text: "Enthusiastic" },
      { id: "D", text: "Determined" }
    ],
    correctAnswer: "B",
    explanation: "'Reluctant' means unwilling and hesitant. 'Unwilling' is the closest synonym.",
    difficulty: "easy"
  },
  {
    id: 65,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "Select the word that is an antonym of 'abundant.'",
    options: [
      { id: "A", text: "Plentiful" },
      { id: "B", text: "Scarce" },
      { id: "C", text: "Ample" },
      { id: "D", text: "Sufficient" }
    ],
    correctAnswer: "B",
    explanation: "'Abundant' means existing in large quantities; plentiful. Its antonym is 'scarce,' meaning insufficient in quantity.",
    difficulty: "easy"
  },
  {
    id: 66,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Choose the word that best completes the sentence:\n\nAfter years of neglect, the garden had become completely ___.",
    options: [
      { id: "A", text: "flourishing" },
      { id: "B", text: "overgrown" },
      { id: "C", text: "manicured" },
      { id: "D", text: "cultivated" }
    ],
    correctAnswer: "B",
    explanation: "If a garden has been neglected (not cared for), it would become overgrown — covered with weeds and uncontrolled plants. The other options describe well-maintained gardens.",
    difficulty: "easy"
  },
  {
    id: 67,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "What does the word 'verbose' mean?",
    options: [
      { id: "A", text: "Using too many words" },
      { id: "B", text: "Speaking very softly" },
      { id: "C", text: "Using only verbs" },
      { id: "D", text: "Being truthful and honest" }
    ],
    correctAnswer: "A",
    explanation: "'Verbose' means using or expressed in more words than are needed; long-winded or wordy.",
    difficulty: "medium"
  },
  {
    id: 68,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Which word is a synonym for 'scrutinize'?",
    options: [
      { id: "A", text: "Ignore" },
      { id: "B", text: "Examine" },
      { id: "C", text: "Guess" },
      { id: "D", text: "Ignore" }
    ],
    correctAnswer: "B",
    explanation: "'Scrutinize' means to examine or inspect closely and thoroughly. 'Examine' is the closest synonym.",
    difficulty: "medium"
  },
  {
    id: 69,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "Select the word that is an antonym of 'transient.'",
    options: [
      { id: "A", text: "Temporary" },
      { id: "B", text: "Brief" },
      { id: "C", text: "Lasting" },
      { id: "D", text: "Momentary" }
    ],
    correctAnswer: "C",
    explanation: "'Transient' means lasting only for a short time. Its antonym is 'lasting' or permanent.",
    difficulty: "hard"
  },
  {
    id: 70,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Choose the word that best completes the sentence:\n\nThe lawyer's ___ questioning revealed inconsistencies in the witness's testimony.",
    options: [
      { id: "A", text: "lackadaisical" },
      { id: "B", text: "incisive" },
      { id: "C", text: "superficial" },
      { id: "D", text: "hesitant" }
    ],
    correctAnswer: "B",
    explanation: "'Incisive' means intelligently analytical and clear-thinking. The questioning revealed inconsistencies, so it must have been sharp and penetrating — 'incisive' fits best.",
    difficulty: "hard"
  },
  {
    id: 71,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "What does the prefix 'mal-' in words like 'malpractice' and 'malfunction' indicate?",
    options: [
      { id: "A", text: "Good or beneficial" },
      { id: "B", text: "Bad or wrong" },
      { id: "C", text: "Many or multiple" },
      { id: "D", text: "Small or minor" }
    ],
    correctAnswer: "B",
    explanation: "The prefix 'mal-' comes from Latin and means 'bad' or 'wrong.' Malpractice is bad practice, and a malfunction is something that fails to work correctly.",
    difficulty: "easy"
  },
  {
    id: 72,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Which word is a synonym for 'fortuitous'?",
    options: [
      { id: "A", text: "Unlucky" },
      { id: "B", text: "Accidental" },
      { id: "C", text: "Planned" },
      { id: "D", text: "Deliberate" }
    ],
    correctAnswer: "B",
    explanation: "'Fortuitous' means happening by accident or chance rather than design. It is often confused with 'fortunate,' but it specifically refers to chance occurrences.",
    difficulty: "hard"
  },
  {
    id: 73,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "Select the word that is an antonym of 'candid.'",
    options: [
      { id: "A", text: "Frank" },
      { id: "B", text: "Honest" },
      { id: "C", text: "Deceptive" },
      { id: "D", text: "Open" }
    ],
    correctAnswer: "C",
    explanation: "'Candid' means truthful and straightforward; frank. Its antonym is 'deceptive,' meaning misleading or dishonest.",
    difficulty: "medium"
  },
  {
    id: 74,
    skill: "eng-vocab-context",
    domain: "Vocabulary",
    text: "Choose the word that best completes the sentence:\n\nThe ancient manuscript was written in such ___ handwriting that scholars needed magnifying glasses to read it.",
    options: [
      { id: "A", text: "legible" },
      { id: "B", text: "minuscule" },
      { id: "C", text: "ornate" },
      { id: "D", text: "expansive" }
    ],
    correctAnswer: "B",
    explanation: "'Minuscule' means extremely small. If scholars needed magnifying glasses, the handwriting must have been very small.",
    difficulty: "medium"
  },
  {
    id: 75,
    skill: "eng-vocab-acad",
    domain: "Vocabulary",
    text: "What does the word 'equivocal' most nearly mean?",
    options: [
      { id: "A", text: "Clearly stated" },
      { id: "B", text: "Deliberately vague or ambiguous" },
      { id: "C", text: "Extremely loud" },
      { id: "D", text: "Mathematically equal" }
    ],
    correctAnswer: "B",
    explanation: "'Equivocal' means open to more than one interpretation; deliberately ambiguous or unclear to avoid committing to a definite position.",
    difficulty: "hard"
  },

  // ======================================================================
  // DOMAIN: Grammar — Questions 76-100
  // Skill: eng-grammar-usage / eng-grammar-punct / eng-grammar-syntax (tenses, articles, prepositions, clauses)
  // ======================================================================
  {
    id: 76,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct form of the verb:\n\nShe ___ to the store every Sunday.",
    options: [
      { id: "A", text: "go" },
      { id: "B", text: "goes" },
      { id: "C", text: "going" },
      { id: "D", text: "gone" }
    ],
    correctAnswer: "B",
    explanation: "The subject 'She' is third-person singular, so the present tense verb requires the -s ending: 'goes.' The adverb 'every Sunday' indicates a habitual action.",
    difficulty: "easy"
  },
  {
    id: 77,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct article:\n\nShe is ___ honest person.",
    options: [
      { id: "A", text: "a" },
      { id: "B", text: "an" },
      { id: "C", text: "the" },
      { id: "D", text: "no article needed" }
    ],
    correctAnswer: "B",
    explanation: "'Honest' begins with a silent 'h,' so the first sound is a vowel sound. Therefore, 'an' is used before 'honest' even though it starts with a consonant letter.",
    difficulty: "easy"
  },
  {
    id: 78,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct preposition:\n\nHe is interested ___ learning Spanish.",
    options: [
      { id: "A", text: "for" },
      { id: "B", text: "to" },
      { id: "C", text: "in" },
      { id: "D", text: "at" }
    ],
    correctAnswer: "C",
    explanation: "The correct collocation is 'interested in' followed by a gerund (-ing form). 'Interested in learning' is the standard English pattern.",
    difficulty: "easy"
  },
  {
    id: 79,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct tense:\n\nBy the time we arrived, the movie ___.",
    options: [
      { id: "A", text: "already started" },
      { id: "B", text: "has already started" },
      { id: "C", text: "had already started" },
      { id: "D", text: "was already starting" }
    ],
    correctAnswer: "C",
    explanation: "The past perfect tense ('had started') is used to describe an action that was completed before another action in the past. The movie started before 'we arrived.'",
    difficulty: "medium"
  },
  {
    id: 80,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct relative pronoun:\n\nThe woman ___ lives next door is a doctor.",
    options: [
      { id: "A", text: "which" },
      { id: "B", text: "who" },
      { id: "C", text: "whom" },
      { id: "D", text: "that" }
    ],
    correctAnswer: "B",
    explanation: "'Who' is the correct relative pronoun for a person when it is the subject of the relative clause. 'The woman lives next door' — 'woman' is the subject.",
    difficulty: "easy"
  },
  {
    id: 81,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct preposition:\n\nI will meet you ___ the restaurant at 7 PM.",
    options: [
      { id: "A", text: "in" },
      { id: "B", text: "on" },
      { id: "C", text: "at" },
      { id: "D", text: "by" }
    ],
    correctAnswer: "C",
    explanation: "'At' is used for specific points or locations. A restaurant is a specific location, so 'at the restaurant' is correct.",
    difficulty: "easy"
  },
  {
    id: 82,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct modal verb:\n\nYou ___ finish your homework before you play video games.",
    options: [
      { id: "A", text: "must" },
      { id: "B", text: "might" },
      { id: "C", text: "could" },
      { id: "D", text: "would" }
    ],
    correctAnswer: "A",
    explanation: "'Must' expresses obligation or necessity. The sentence indicates a requirement — homework must be done first — so 'must' is the correct modal.",
    difficulty: "easy"
  },
  {
    id: 83,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct form:\n\nI wish I ___ how to play the piano.",
    options: [
      { id: "A", text: "know" },
      { id: "B", text: "knew" },
      { id: "C", text: "had known" },
      { id: "D", text: "was knowing" }
    ],
    correctAnswer: "B",
    explanation: "After 'I wish,' we use the past subjunctive to express a desire for something that is not true in the present. 'Knew' is the correct past subjunctive form.",
    difficulty: "medium"
  },
  {
    id: 84,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct article:\n\n___ sun rises in the east.",
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "An" },
      { id: "C", text: "The" },
      { id: "D", text: "No article" }
    ],
    correctAnswer: "C",
    explanation: "'The' is used with unique celestial bodies like the sun, the moon, and the Earth. There is only one sun, so 'the' is the correct article.",
    difficulty: "easy"
  },
  {
    id: 85,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct preposition:\n\nShe is good ___ mathematics.",
    options: [
      { id: "A", text: "in" },
      { id: "B", text: "at" },
      { id: "C", text: "on" },
      { id: "D", text: "for" }
    ],
    correctAnswer: "B",
    explanation: "The correct collocation is 'good at' when referring to a skill or subject. 'Good at mathematics' is standard English.",
    difficulty: "easy"
  },
  {
    id: 86,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct tense:\n\nThey ___ dinner when I called.",
    options: [
      { id: "A", text: "have" },
      { id: "B", text: "were having" },
      { id: "C", text: "had" },
      { id: "D", text: "are having" }
    ],
    correctAnswer: "B",
    explanation: "The past continuous tense ('were having') describes an action that was in progress when another action (the call) interrupted it. This is the classic past continuous + simple past pattern.",
    difficulty: "medium"
  },
  {
    id: 87,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct relative pronoun:\n\nThe book ___ I borrowed from the library was fascinating.",
    options: [
      { id: "A", text: "who" },
      { id: "B", text: "whom" },
      { id: "C", text: "which" },
      { id: "D", text: "whose" }
    ],
    correctAnswer: "C",
    explanation: "'Which' is the correct relative pronoun for objects and things. The book is a thing, so 'which' is appropriate. 'That' could also work, but 'which' is the best choice among the options.",
    difficulty: "easy"
  },
  {
    id: 88,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct preposition:\n\nThe cat jumped ___ the table.",
    options: [
      { id: "A", text: "in" },
      { id: "B", text: "on" },
      { id: "C", text: "onto" },
      { id: "D", text: "into" }
    ],
    correctAnswer: "C",
    explanation: "'Onto' indicates movement from one place to a surface. The cat jumped and landed on the table, so 'onto' is the correct preposition to show this movement.",
    difficulty: "medium"
  },
  {
    id: 89,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct conditional form:\n\nIf it ___ tomorrow, we will stay indoors.",
    options: [
      { id: "A", text: "rains" },
      { id: "B", text: "will rain" },
      { id: "C", text: "rained" },
      { id: "D", text: "would rain" }
    ],
    correctAnswer: "A",
    explanation: "This is a first conditional (real future possibility). The structure is: 'If + present simple, will + base verb.' 'If it rains' is the correct form.",
    difficulty: "medium"
  },
  {
    id: 90,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct form:\n\nHe has been working here ___ 2018.",
    options: [
      { id: "A", text: "since" },
      { id: "B", text: "for" },
      { id: "C", text: "from" },
      { id: "D", text: "in" }
    ],
    correctAnswer: "A",
    explanation: "'Since' is used with a specific point in time (2018). 'For' is used with a duration (e.g., 'for five years'). The present perfect continuous emphasizes the ongoing nature of the action.",
    difficulty: "easy"
  },
  {
    id: 91,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct article:\n\nI need ___ new pair of shoes.",
    options: [
      { id: "A", text: "a" },
      { id: "B", text: "an" },
      { id: "C", text: "the" },
      { id: "D", text: "no article" }
    ],
    correctAnswer: "A",
    explanation: "'A' is used before consonant sounds. 'New' begins with a consonant sound, so 'a new pair of shoes' is correct. The item is being introduced for the first time.",
    difficulty: "easy"
  },
  {
    id: 92,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct preposition:\n\nShe is afraid ___ spiders.",
    options: [
      { id: "A", text: "from" },
      { id: "B", text: "with" },
      { id: "C", text: "of" },
      { id: "D", text: "about" }
    ],
    correctAnswer: "C",
    explanation: "The correct collocation is 'afraid of.' Fear is expressed with 'of' in English: afraid of, scared of, frightened of.",
    difficulty: "easy"
  },
  {
    id: 93,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct tense:\n\nI ___ this report by tomorrow evening.",
    options: [
      { id: "A", text: "will finish" },
      { id: "B", text: "will have finished" },
      { id: "C", text: "am finishing" },
      { id: "D", text: "finished" }
    ],
    correctAnswer: "B",
    explanation: "The future perfect tense ('will have finished') is used for an action that will be completed before a specific time in the future (by tomorrow evening).",
    difficulty: "hard"
  },
  {
    id: 94,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct conjunction:\n\n___ she was tired, she continued working.",
    options: [
      { id: "A", text: "Because" },
      { id: "B", text: "Although" },
      { id: "C", text: "Since" },
      { id: "D", text: "Unless" }
    ],
    correctAnswer: "B",
    explanation: "'Although' introduces a contrast. The sentence shows contrast between being tired and continuing to work. 'Although she was tired, she continued working' expresses this contrast.",
    difficulty: "medium"
  },
  {
    id: 95,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct form:\n\nShe suggested ___ to the park.",
    options: [
      { id: "A", text: "go" },
      { id: "B", text: "to go" },
      { id: "C", text: "going" },
      { id: "D", text: "went" }
    ],
    correctAnswer: "C",
    explanation: "The verb 'suggest' is followed by a gerund (-ing form). 'She suggested going to the park' is correct. Alternatively, 'suggest that we go' would also work, but 'suggest to go' is incorrect.",
    difficulty: "hard"
  },
  {
    id: 96,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct preposition:\n\nWe arrived ___ the airport just in time.",
    options: [
      { id: "A", text: "to" },
      { id: "B", text: "at" },
      { id: "C", text: "in" },
      { id: "D", text: "on" }
    ],
    correctAnswer: "B",
    explanation: "'Arrive at' is used for specific locations like airports, stations, and buildings. 'Arrive in' is used for cities or countries. 'Arrive at the airport' is correct.",
    difficulty: "easy"
  },
  {
    id: 97,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct verb form:\n\nIt is important that he ___ the truth.",
    options: [
      { id: "A", text: "tells" },
      { id: "B", text: "tell" },
      { id: "C", text: "told" },
      { id: "D", text: "is telling" }
    ],
    correctAnswer: "B",
    explanation: "This is the subjunctive mood, used after expressions of necessity or importance (it is important that...). The subjunctive requires the base form of the verb: 'he tell.'",
    difficulty: "hard"
  },
  {
    id: 98,
    skill: "eng-grammar-punct",
    domain: "Grammar",
    text: "Choose the correct form:\n\nNeither the manager nor the employees ___ aware of the change.",
    options: [
      { id: "A", text: "was" },
      { id: "B", text: "were" },
      { id: "C", text: "is" },
      { id: "D", text: "has been" }
    ],
    correctAnswer: "B",
    explanation: "With 'neither...nor,' the verb agrees with the subject closest to it. 'Employees' is plural, so the verb should be 'were.'",
    difficulty: "medium"
  },
  {
    id: 99,
    skill: "eng-grammar-syntax",
    domain: "Grammar",
    text: "Choose the correct preposition:\n\nShe has been suffering ___ a cold for a week.",
    options: [
      { id: "A", text: "from" },
      { id: "B", text: "with" },
      { id: "C", text: "by" },
      { id: "D", text: "of" }
    ],
    correctAnswer: "A",
    explanation: "The correct collocation is 'suffer from' when referring to an illness or medical condition. 'Suffer from a cold' is the standard expression.",
    difficulty: "medium"
  },
  {
    id: 100,
    skill: "eng-grammar-usage",
    domain: "Grammar",
    text: "Choose the correct tense:\n\nShe ___ her homework before she went out to play.",
    options: [
      { id: "A", text: "finishes" },
      { id: "B", text: "has finished" },
      { id: "C", text: "had finished" },
      { id: "D", text: "was finishing" }
    ],
    correctAnswer: "C",
    explanation: "The past perfect tense ('had finished') is used to show that one action was completed before another action in the past. She finished homework first, then went out to play.",
    difficulty: "medium"
  },
]