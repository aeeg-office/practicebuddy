// Placement & PTE Diagnostic Questions
// All content is original — no copyrighted material used
// CEFR-aligned levels from A1 to C2

export interface Question {
  id: number
  section: string
  text: string
  passage?: string
  options?: { id: string; text: string }[]
  correctAnswer?: string
  prompt?: string
  difficulty: "easy" | "medium" | "hard"
}

// ======================================================================
// PTE ACADEMIC — 25 questions (Speaking & Writing, Reading, Listening)
// Pearson Test of English Academic
// ======================================================================

export const pteQuestions: Question[] = [

  // --- Speaking & Writing (Q1-9) ---
  {
    id: 1,
    section: "Speaking & Writing",
    prompt: "Read the following text aloud: 'The university library will be closed for renovations from December 20th to January 5th. During this period, students may access digital resources through the online portal. Physical book returns should be deposited in the external drop box located at the main entrance.'",
    text: "Read aloud the given passage about library renovations.",
    difficulty: "easy",
  },
  {
    id: 2,
    section: "Speaking & Writing",
    prompt: "Repeat the following sentence: 'The findings of the study were published in a peer-reviewed journal and have significant implications for public health policy.'",
    text: "Repeat the given sentence about research findings.",
    difficulty: "medium",
  },
  {
    id: 3,
    section: "Speaking & Writing",
    prompt: "Describe the image: Imagine a line graph showing global temperature rise from 1880 to 2023. The x-axis shows years, the y-axis shows temperature anomaly in degrees Celsius. The line trends steadily upward, with a sharp increase after 1980. The average temperature in 2023 is 1.2°C above pre-industrial levels.",
    text: "Describe the temperature trend shown in the line graph.",
    difficulty: "medium",
  },
  {
    id: 4,
    section: "Speaking & Writing",
    prompt: "Retell the lecture in your own words: 'Today we discussed the concept of linguistic relativity — the idea that the language we speak shapes how we think. We examined the Sapir-Whorf hypothesis and considered evidence from studies of colour perception across different languages. For example, speakers of languages with more words for colour categories can distinguish between those colours more quickly. However, critics argue that thought can exist independently of language, pointing to pre-linguistic infants and people with aphasia.'",
    text: "Retell the lecture about linguistic relativity.",
    difficulty: "hard",
  },
  {
    id: 5,
    section: "Speaking & Writing",
    prompt: "Answer the following question in one sentence: 'What are the advantages of studying abroad?'",
    text: "Answer: What are the advantages of studying abroad?",
    difficulty: "easy",
  },
  {
    id: 6,
    section: "Speaking & Writing",
    prompt: "Write an essay (200-300 words) on the following topic: 'Social media has changed the way people communicate. To what extent do you agree that this change has been positive?' Provide reasons and examples to support your answer.",
    text: "Write an essay on whether social media has positively changed communication.",
    difficulty: "medium",
  },
  {
    id: 7,
    section: "Speaking & Writing",
    prompt: "Summarise the following text in one sentence: 'The Industrial Revolution, which began in Britain in the late 18th century, transformed societies from agrarian to industrial. It introduced mechanised manufacturing, improved transportation through railways, and led to urbanisation. While it created unprecedented economic growth, it also resulted in harsh working conditions and environmental pollution.'",
    text: "Summarise the text about the Industrial Revolution in one sentence.",
    difficulty: "medium",
  },
  {
    id: 8,
    section: "Speaking & Writing",
    prompt: "Write an email (50-70 words) to your professor requesting an extension on your assignment. Explain your reason and propose a new deadline.",
    text: "Write an email to your professor requesting an assignment extension.",
    difficulty: "easy",
  },
  {
    id: 9,
    section: "Speaking & Writing",
    prompt: "Describe the following process in detail: The water cycle begins with evaporation from oceans and lakes. Water vapour rises, cools, and condenses to form clouds. When the clouds become saturated, precipitation falls as rain or snow. The water then flows back to oceans and lakes through rivers and groundwater, completing the cycle.",
    text: "Describe the water cycle process in detail.",
    difficulty: "hard",
  },

  // --- Reading (Q10-18) ---
  {
    id: 10,
    section: "Reading",
    passage: "The concept of the 'gig economy' refers to a labour market characterised by short-term, flexible jobs, often mediated through digital platforms. Companies like ride-sharing services and food delivery apps are prominent examples. Proponents argue that the gig economy offers workers flexibility and autonomy. Critics, however, point to the lack of job security, health benefits, and retirement plans that traditional employment provides. A 2022 study found that gig workers earn an average of 30% less per hour than comparable traditional employees, though they report higher levels of satisfaction with their schedule flexibility.",
    text: "According to the passage, what is a key disadvantage of gig economy work?",
    options: [
      { id: "A", text: "It requires advanced technical skills" },
      { id: "B", text: "It offers less job security and fewer benefits" },
      { id: "C", text: "It is only available in urban areas" },
      { id: "D", text: "It involves working longer hours than traditional jobs" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 11,
    section: "Reading",
    passage: "Biomimicry is an approach to innovation that seeks sustainable solutions by emulating nature's time-tested patterns and strategies. For example, the design of Japan's Shinkansen bullet train was inspired by the kingfisher bird's beak, which allows the bird to dive into water with minimal splash. By modelling the train's nose after the kingfisher's beak, engineers reduced noise pollution and improved energy efficiency. Similarly, the structure of spider silk, stronger than steel and more elastic than nylon, has inspired the development of advanced materials for medical sutures and lightweight armour.",
    text: "What is biomimicry, as described in the passage?",
    options: [
      { id: "A", text: "The study of biological organisms in their natural habitats" },
      { id: "B", text: "The imitation of nature's designs to solve human problems" },
      { id: "C", text: "The genetic modification of organisms for industrial use" },
      { id: "D", text: "The artificial creation of synthetic spider silk" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 12,
    section: "Reading",
    passage: "In the field of economics, the 'tragedy of the commons' describes a situation in which individuals, acting independently and rationally according to their own self-interest, deplete a shared resource, even when doing so is contrary to the group's long-term best interests. The concept was popularised by ecologist Garrett Hardin in 1968. Common examples include overfishing in international waters, deforestation of shared land, and the emission of greenhouse gases. Solutions proposed include privatisation, government regulation, and community-based management.",
    text: "The 'tragedy of the commons' explains why",
    options: [
      { id: "A", text: "private ownership always leads to better resource management" },
      { id: "B", text: "shared resources can be overused when individuals act in self-interest" },
      { id: "C", text: "government regulation is always ineffective" },
      { id: "D", text: "natural resources are infinite and cannot be depleted" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 13,
    section: "Reading",
    passage: "The following text has several blanks. Choose the correct word for each blank:\n\n'The researchers __________ their findings at the international conference last month. Their presentation was well __________ by the audience, who appreciated the thoroughness of the methodology.'",
    text: "Choose the correct words to complete the text.",
    options: [
      { id: "A", text: "presented / received" },
      { id: "B", text: "present / receive" },
      { id: "C", text: "were presenting / receiving" },
      { id: "D", text: "had presented / had received" },
    ],
    correctAnswer: "A",
    difficulty: "medium",
  },
  {
    id: 14,
    section: "Reading",
    passage: "An article about urban development contained the following four paragraphs in random order:\n\nParagraph A: 'The first phase of the project will focus on improving public transportation infrastructure.'\n\nParagraph B: 'In conclusion, the redevelopment plan promises to transform the city centre while preserving its historical character.'\n\nParagraph C: 'Community consultation meetings have revealed strong support for the proposal, though some residents have expressed concerns about increased traffic.'\n\nParagraph D: 'The city council has approved a $50 million redevelopment plan for the downtown area.'",
    text: "Which of the following is the correct order for the paragraphs?",
    options: [
      { id: "A", text: "D, A, C, B" },
      { id: "B", text: "A, D, B, C" },
      { id: "C", text: "C, B, D, A" },
      { id: "D", text: "B, C, A, D" },
    ],
    correctAnswer: "A",
    difficulty: "hard",
  },
  {
    id: 15,
    section: "Reading",
    passage: "The museum's new exhibition explores the evolution of photography from its earliest beginnings to the digital age. The first room features daguerreotypes from the 1840s — images on polished silver plates that required exposure times of several minutes. The second room documents the shift to film photography in the early 20th century, when cameras became portable and snapshot photography emerged. The final room is devoted to the digital revolution, displaying everything from early pixelated images to contemporary AI-generated photographs.",
    text: "The exhibition is organised",
    options: [
      { id: "A", text: "thematically, by subject matter" },
      { id: "B", text: "chronologically, by technological era" },
      { id: "C", text: "geographically, by country of origin" },
      { id: "D", text: "alphabetically, by photographer's name" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 16,
    section: "Reading",
    passage: "The graph shows the number of international students enrolled in universities across four countries from 2010 to 2020. Australia experienced steady growth, rising from 250,000 to 450,000 students. Canada saw a similar trend, increasing from 200,000 to 400,000. The United Kingdom's numbers fluctuated between 300,000 and 350,000. The United States remained the top destination throughout the period, with numbers growing from 690,000 to 1,075,000, though growth slowed after 2016.",
    text: "Which country showed the most consistent growth in international student enrollment?",
    options: [
      { id: "A", text: "Australia and Canada" },
      { id: "B", text: "The United Kingdom" },
      { id: "C", text: "The United States" },
      { id: "D", text: "All countries showed the same trend" },
    ],
    correctAnswer: "A",
    difficulty: "medium",
  },
  {
    id: 17,
    section: "Reading",
    passage: "The email read: 'Dear Dr. Chen, I am writing to apply for the Research Assistant position in the Department of Environmental Science. I am currently completing my MSc at the University of Melbourne, where my thesis focuses on urban air quality monitoring. I have attached my CV and academic transcripts for your review. I would welcome the opportunity to discuss how my skills align with the requirements of this position. Thank you for your consideration. Best regards, Sarah Mitchell.'",
    text: "What is the purpose of this email?",
    options: [
      { id: "A", text: "To request information about a research project" },
      { id: "B", text: "To apply for a specific job position" },
      { id: "C", text: "To schedule a meeting with Dr. Chen" },
      { id: "D", text: "To submit a completed research paper" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 18,
    section: "Reading",
    passage: "Nutritional information per 100g:\nProduct A: Energy 250 kcal, Protein 8g, Carbohydrates 45g, Fat 5g, Fibre 3g\nProduct B: Energy 180 kcal, Protein 3g, Carbohydrates 30g, Fat 6g, Fibre 2g\nProduct C: Energy 400 kcal, Protein 15g, Carbohydrates 30g, Fat 25g, Fibre 1g\nProduct D: Energy 120 kcal, Protein 2g, Carbohydrates 25g, Fat 1g, Fibre 4g",
    text: "Based on the nutritional information, which product has the highest protein content?",
    options: [
      { id: "A", text: "Product A" },
      { id: "B", text: "Product B" },
      { id: "C", text: "Product C" },
      { id: "D", text: "Product D" },
    ],
    correctAnswer: "C",
    difficulty: "easy",
  },

  // --- Listening (Q19-25) — simulated listening comprehension ---
  {
    id: 19,
    section: "Listening",
    passage: "Listen to the following announcement: 'Attention passengers. Flight EK123 to Dubai is now boarding at Gate 15. Business class passengers and those requiring special assistance may board now. We kindly ask all other passengers to remain seated until your row number is called. Please have your boarding pass and passport ready.'",
    text: "What are passengers currently boarding the flight being asked to do?",
    options: [
      { id: "A", text: "Proceed immediately to the baggage claim area" },
      { id: "B", text: "Present their boarding pass and passport" },
      { id: "C", text: "Return to the check-in counter" },
      { id: "D", text: "Wait for further announcements at the restaurant" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 20,
    section: "Listening",
    passage: "Listen to the lecture excerpt: 'So, to summarise, the three main causes of the French Revolution were, firstly, the deep social inequalities embedded in the estate system. Secondly, the financial crisis resulting from France's involvement in the American Revolution. And thirdly, the spread of Enlightenment ideas that challenged traditional authority. These three factors, combined with a series of poor harvests, created conditions in which revolution became almost inevitable.'",
    text: "According to the lecture, which factor was NOT mentioned as a cause of the French Revolution?",
    options: [
      { id: "A", text: "Social inequality" },
      { id: "B", text: "Financial crisis" },
      { id: "C", text: "Foreign invasion" },
      { id: "D", text: "Enlightenment ideas" },
    ],
    correctAnswer: "C",
    difficulty: "medium",
  },
  {
    id: 21,
    section: "Listening",
    passage: "Listen to the conversation: 'Woman: Excuse me, could you tell me where the History department is? Man: Sure. Take the elevator to the third floor, turn left, and it's the second door on your right. Woman: Third floor, left, second door. Got it. Thanks! Man: No problem.'",
    text: "Where is the History department located?",
    options: [
      { id: "A", text: "Ground floor, first door on the left" },
      { id: "B", text: "Second floor, right side" },
      { id: "C", text: "Third floor, second door on the right" },
      { id: "D", text: "Fourth floor, end of the hallway" },
    ],
    correctAnswer: "C",
    difficulty: "easy",
  },
  {
    id: 22,
    section: "Listening",
    passage: "Listen to the weather report: 'And now for the weekend forecast. Saturday will start cloudy with a chance of light showers in the morning, clearing by midday with temperatures reaching 22 degrees Celsius. Sunday will be sunny and warm, with a high of 26 degrees and light winds from the south. A great day for outdoor activities. However, the pleasant weather will not last — a cold front is expected to move in on Monday, bringing rain and dropping temperatures to around 14 degrees.'",
    text: "What does the weather report say about Sunday?",
    options: [
      { id: "A", text: "It will be cloudy and rainy all day" },
      { id: "B", text: "It will be sunny and warm, good for outdoor plans" },
      { id: "C", text: "A cold front will arrive in the morning" },
      { id: "D", text: "Temperatures will drop to 14 degrees" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 23,
    section: "Listening",
    passage: "Listen to the academic discussion: 'Professor: Today we're going to examine the placebo effect. Can anyone define it? Student: Isn't it when patients get better because they believe they're receiving treatment, even if they're actually getting a sugar pill? Professor: That's exactly right. And what's fascinating is that the placebo effect is not just psychological — studies have shown actual physiological changes, including the release of endorphins and changes in blood pressure.'",
    text: "The professor says the placebo effect is not just psychological because",
    options: [
      { id: "A", text: "sugar pills have chemical properties that affect the body" },
      { id: "B", text: "it produces measurable physical changes in the body" },
      { id: "C", text: "patients are aware they are receiving placebos" },
      { id: "D", text: "it only works for psychological conditions" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 24,
    section: "Listening",
    passage: "Listen to the instructions: 'For the next part of the test, you will hear four short recordings. Each recording will be played once only. After each recording, you will have ten seconds to answer the question. Write your answers on the answer sheet provided. Do not write in this booklet. You may make notes on the question paper if you wish.'",
    text: "How many times will each recording be played?",
    options: [
      { id: "A", text: "Twice" },
      { id: "B", text: "Once" },
      { id: "C", text: "Three times" },
      { id: "D", text: "As many times as needed" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 25,
    section: "Listening",
    passage: "Listen to the radio interview: 'Host: Our next guest is Dr. Amir Hassan, author of 'The Digital Classroom.' Dr. Hassan, you argue that technology is not inherently good or bad for education — it depends entirely on how it is used. Could you elaborate? Dr. Hassan: Absolutely. A tablet in a classroom is just a tool. In the hands of a skilled teacher, it can open up worlds of information and interactive learning. But if it's used as a replacement for thoughtful instruction, it becomes an expensive distraction. The key is pedagogical integration, not technological adoption.'",
    text: "According to Dr. Hassan, what determines whether technology is beneficial in education?",
    options: [
      { id: "A", text: "The cost of the technology" },
      { id: "B", text: "How it is integrated into teaching practice" },
      { id: "C", text: "The age of the students using it" },
      { id: "D", text: "Whether it replaces traditional textbooks" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
]

// ======================================================================
// GENERAL ENGLISH PLACEMENT — 30 questions (CEFR-aligned A1-C2)
// Grammar, Vocabulary, Reading, Listening
// ======================================================================

export const generalEnglishQuestions: Question[] = [

  // --- A1-A2 (Beginner) — Q1-6 ---
  {
    id: 1,
    section: "Grammar",
    text: "Choose the correct word: 'She __________ a student at this school.'",
    options: [
      { id: "A", text: "am" },
      { id: "B", text: "is" },
      { id: "C", text: "are" },
      { id: "D", text: "be" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 2,
    section: "Vocabulary",
    text: "What is the opposite of 'hot'?",
    options: [
      { id: "A", text: "warm" },
      { id: "B", text: "cold" },
      { id: "C", text: "wet" },
      { id: "D", text: "tall" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 3,
    section: "Reading",
    passage: "Tom gets up at seven o'clock every morning. He has breakfast at half past seven. Then he brushes his teeth and puts on his school uniform. He leaves the house at eight o'clock and walks to school. School starts at half past eight.",
    text: "What time does Tom leave home?",
    options: [
      { id: "A", text: "7:00" },
      { id: "B", text: "7:30" },
      { id: "C", text: "8:00" },
      { id: "D", text: "8:30" },
    ],
    correctAnswer: "C",
    difficulty: "easy",
  },
  {
    id: 4,
    section: "Grammar",
    text: "Complete the sentence: 'There __________ two cats in the garden.'",
    options: [
      { id: "A", text: "is" },
      { id: "B", text: "are" },
      { id: "C", text: "am" },
      { id: "D", text: "be" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 5,
    section: "Vocabulary",
    text: "Which word means 'a place where you can borrow books'?",
    options: [
      { id: "A", text: "library" },
      { id: "B", text: "hospital" },
      { id: "C", text: "market" },
      { id: "D", text: "station" },
    ],
    correctAnswer: "A",
    difficulty: "easy",
  },
  {
    id: 6,
    section: "Listening",
    passage: "Listen: 'Hi, my name is Maria. I am from Spain. I live in Madrid with my family. I have one brother and one sister. I like reading books and playing tennis.'",
    text: "Where is Maria from?",
    options: [
      { id: "A", text: "Italy" },
      { id: "B", text: "Spain" },
      { id: "C", text: "France" },
      { id: "D", text: "Mexico" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },

  // --- B1-B2 (Intermediate) — Q7-18 ---
  {
    id: 7,
    section: "Grammar",
    text: "Choose the correct form: 'By the time we arrived, the film __________ already started.'",
    options: [
      { id: "A", text: "has" },
      { id: "B", text: "had" },
      { id: "C", text: "was" },
      { id: "D", text: "did" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 8,
    section: "Vocabulary",
    text: "The word 'resilient' most closely means",
    options: [
      { id: "A", text: "fragile and breakable" },
      { id: "B", text: "able to recover quickly from difficulties" },
      { id: "C", text: "resistant to change" },
      { id: "D", text: "easily influenced by others" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 9,
    section: "Reading",
    passage: "Working from home has become increasingly common since the pandemic. A recent survey found that 78% of employees who work remotely report better work-life balance. However, 43% say they struggle with feelings of isolation. Companies that have adopted hybrid models — where employees split time between home and the office — report the highest levels of both productivity and employee satisfaction.",
    text: "What does the survey suggest about hybrid working models?",
    options: [
      { id: "A", text: "They are less popular than full-time remote work" },
      { id: "B", text: "They achieve the best balance of productivity and satisfaction" },
      { id: "C", text: "They eliminate feelings of isolation completely" },
      { id: "D", text: "They are only suitable for technology companies" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 10,
    section: "Grammar",
    text: "Which sentence uses the third conditional correctly?",
    options: [
      { id: "A", text: "If I would have known, I would have come earlier." },
      { id: "B", text: "If I had known, I would have come earlier." },
      { id: "C", text: "If I have known, I would come earlier." },
      { id: "D", text: "If I knew, I will come earlier." },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 11,
    section: "Vocabulary",
    text: "Choose the best word to complete the sentence: 'The manager asked the team to __________ the proposal before the deadline.'",
    options: [
      { id: "A", text: "finalise" },
      { id: "B", text: "final" },
      { id: "C", text: "finally" },
      { id: "D", text: "finality" },
    ],
    correctAnswer: "A",
    difficulty: "medium",
  },
  {
    id: 12,
    section: "Grammar",
    text: "Choose the correct option: 'She suggested __________ to the earlier meeting time.'",
    options: [
      { id: "A", text: "to change" },
      { id: "B", text: "changing" },
      { id: "C", text: "change" },
      { id: "D", text: "that changing" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 13,
    section: "Vocabulary",
    text: "Which of the following is a synonym for 'ubiquitous'?",
    options: [
      { id: "A", text: "rare" },
      { id: "B", text: "pervasive" },
      { id: "C", text: "hidden" },
      { id: "D", text: "temporary" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 14,
    section: "Reading",
    passage: "The term 'cultural intelligence' (CQ) refers to the ability to understand and adapt to different cultural contexts. Unlike IQ, which is relatively fixed, CQ can be developed through training and experience. Research by cultural psychologists has identified four components of CQ: cognitive (knowledge of cultural norms), metacognitive (awareness of cultural assumptions), motivational (interest in cross-cultural experiences), and behavioural (ability to adapt behaviour appropriately). Organisations with high CQ among their employees consistently outperform competitors in global markets.",
    text: "The passage states that cultural intelligence differs from IQ in that it",
    options: [
      { id: "A", text: "is more important for academic success" },
      { id: "B", text: "can be improved through training and experience" },
      { id: "C", text: "is measured through standardised tests" },
      { id: "D", text: "has only two components" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 15,
    section: "Grammar",
    text: "Identify the sentence with the correct use of the passive voice:",
    options: [
      { id: "A", text: "The report was wrote by the assistant." },
      { id: "B", text: "The report was written by the assistant." },
      { id: "C", text: "The assistant wrote the report." },
      { id: "D", text: "The assistant has wrote the report." },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 16,
    section: "Listening",
    passage: "Listen to the announcement: 'Good morning, everyone. This is your captain speaking. We are currently cruising at an altitude of 35,000 feet. Our flight time to Singapore is approximately six hours and forty-five minutes. The weather en route is clear, and we expect a smooth journey. Please keep your seatbelts fastened while seated. We will begin our meal service in about thirty minutes.'",
    text: "How long is the flight to Singapore?",
    options: [
      { id: "A", text: "Six hours" },
      { id: "B", text: "Six hours and forty-five minutes" },
      { id: "C", text: "Seven hours and fifteen minutes" },
      { id: "D", text: "Five hours and thirty minutes" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 17,
    section: "Grammar",
    text: "Choose the correct relative pronoun: 'The scientist __________ research won the Nobel Prize gave a fascinating lecture.'",
    options: [
      { id: "A", text: "who" },
      { id: "B", text: "whom" },
      { id: "C", text: "which" },
      { id: "D", text: "whose" },
    ],
    correctAnswer: "D",
    difficulty: "medium",
  },
  {
    id: 18,
    section: "Vocabulary",
    text: "The prefix 'mal-' in the word 'malnutrition' means",
    options: [
      { id: "A", text: "good" },
      { id: "B", text: "bad or wrong" },
      { id: "C", text: "many" },
      { id: "D", text: "small" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },

  // --- C1-C2 (Advanced) — Q19-30 ---
  {
    id: 19,
    section: "Grammar",
    text: "Complete the sentence: 'Had the government acted sooner, the economic crisis __________.'",
    options: [
      { id: "A", text: "would have been avoided" },
      { id: "B", text: "will be avoided" },
      { id: "C", text: "would be avoided" },
      { id: "D", text: "has been avoided" },
    ],
    correctAnswer: "A",
    difficulty: "hard",
  },
  {
    id: 20,
    section: "Vocabulary",
    text: "The word 'ephemeral' most nearly means",
    options: [
      { id: "A", text: "lasting for a very short time" },
      { id: "B", text: "extremely large in scale" },
      { id: "C", text: "difficult to understand" },
      { id: "D", text: "recurring regularly" },
    ],
    correctAnswer: "A",
    difficulty: "hard",
  },
  {
    id: 21,
    section: "Reading",
    passage: "The phenomenon of 'analysis paralysis' describes a situation in which overthinking a problem prevents a decision from being made. In business contexts, this often manifests as endless meetings, excessive data collection, and a reluctance to commit to a course of action until all variables are understood. Paradoxically, research in behavioural economics suggests that having too many options can lead to less satisfaction with the final choice, even when that choice is objectively superior. The most effective decision-makers, studies show, are those who gather sufficient but not exhaustive information, set clear decision criteria, and commit to a timeline.",
    text: "The passage suggests that the most effective decision-makers",
    options: [
      { id: "A", text: "avoid collecting any data before making decisions" },
      { id: "B", text: "gather adequate information and work within a time frame" },
      { id: "C", text: "always choose the option with the most data support" },
      { id: "D", text: "delegate all decisions to their teams" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 22,
    section: "Grammar",
    text: "Which sentence uses the subjunctive mood correctly?",
    options: [
      { id: "A", text: "I suggest that he studies harder for the exam." },
      { id: "B", text: "I suggest that he study harder for the exam." },
      { id: "C", text: "I suggest that he studies harder for the exam." },
      { id: "D", text: "I suggest that he is studying harder for the exam." },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 23,
    section: "Vocabulary",
    text: "Which word best completes the sentence? 'The diplomat's __________ handling of the sensitive negotiations earned praise from both sides.'",
    options: [
      { id: "A", text: "adroit" },
      { id: "B", text: "belligerent" },
      { id: "C", text: "indifferent" },
      { id: "D", text: "negligent" },
    ],
    correctAnswer: "A",
    difficulty: "hard",
  },
  {
    id: 24,
    section: "Reading",
    passage: "The concept of 'cognitive load' refers to the total amount of mental effort being used in working memory. Cognitive load theory, developed by John Sweller in the 1980s, has significant implications for instructional design. According to the theory, learning materials should be designed to minimise extraneous cognitive load — the mental effort spent on irrelevant or distracting elements — while maximising germane cognitive load, which is the effort devoted to processing and understanding new information. When learners are overwhelmed by extraneous load, their ability to transfer new knowledge to long-term memory is significantly impaired.",
    text: "According to cognitive load theory, effective instructional design should",
    options: [
      { id: "A", text: "increase the total amount of information presented" },
      { id: "B", text: "reduce distracting elements to free up mental resources for learning" },
      { id: "C", text: "present all information simultaneously for comparison" },
      { id: "D", text: "avoid breaking information into smaller chunks" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 25,
    section: "Grammar",
    text: "Identify the sentence with correct use of inversion:",
    options: [
      { id: "A", text: "Never I have seen such a beautiful sunset." },
      { id: "B", text: "Never have I seen such a beautiful sunset." },
      { id: "C", text: "Never I have saw such a beautiful sunset." },
      { id: "D", text: "Never have I saw such a beautiful sunset." },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 26,
    section: "Vocabulary",
    text: "The word 'ameliorate' means to",
    options: [
      { id: "A", text: "make something worse" },
      { id: "B", text: "improve or make better" },
      { id: "C", text: "destroy completely" },
      { id: "D", text: "ignore deliberately" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 27,
    section: "Reading",
    passage: "Neuroscientists at University College London have identified a neural mechanism that explains why certain melodies become 'earworms' — songs that get stuck in your head. Using fMRI scans, the researchers found that earworm-inducing songs activate the auditory cortex more strongly than other music, creating a neural loop that continues to replay even after the music has stopped. The study also found that earworms share common structural features: they tend to be simple, repetitive, and contain unexpected rhythmic patterns that the brain finds compelling.",
    text: "According to the study, earworm-inducing songs share which characteristics?",
    options: [
      { id: "A", text: "Complex harmonies and slow tempo" },
      { id: "B", text: "Simplicity, repetition, and unexpected rhythms" },
      { id: "C", text: "Absence of lyrics and use of minor keys" },
      { id: "D", text: "Long duration and orchestral arrangement" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 28,
    section: "Grammar",
    text: "Which preposition completes the idiomatic expression? 'She is very good __________ remembering people's names.'",
    options: [
      { id: "A", text: "in" },
      { id: "B", text: "at" },
      { id: "C", text: "for" },
      { id: "D", text: "with" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 29,
    section: "Vocabulary",
    text: "Which of the following collocations is correct?",
    options: [
      { id: "A", text: "make a decision" },
      { id: "B", text: "do a decision" },
      { id: "C", text: "take a decision" },
      { id: "D", text: "give a decision" },
    ],
    correctAnswer: "A",
    difficulty: "easy",
  },
  {
    id: 30,
    section: "Listening",
    passage: "Listen to the lecture: 'The Sapir-Whorf hypothesis, also known as linguistic relativity, proposes that the language we speak influences the way we think. While the strong version of this hypothesis — that language determines thought — has been largely discredited, the weak version — that language influences thought — continues to receive empirical support. For instance, speakers of languages that have separate words for light blue and dark blue are faster at distinguishing between these colours than speakers whose language uses a single word for blue. This suggests that language shapes our perceptual categories, even if it does not entirely determine them.'",
    text: "What does the lecturer say about the strong version of the Sapir-Whorf hypothesis?",
    options: [
      { id: "A", text: "It has been proven by recent research" },
      { id: "B", text: "It has been largely rejected by scholars" },
      { id: "C", text: "It is supported by colour perception studies" },
      { id: "D", text: "It only applies to speakers of European languages" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
]

// ======================================================================
// ACADEMIC WRITING PLACEMENT — 15 questions (Grammar, Essay structure, Source use)
// ======================================================================

export const academicWritingQuestions: Question[] = [

  // --- Grammar for Academic Writing (Q1-5) ---
  {
    id: 1,
    section: "Grammar",
    text: "Which sentence demonstrates appropriate academic register?",
    options: [
      { id: "A", text: "The experiment was a total mess, so they had to do it again." },
      { id: "B", text: "The experiment yielded inconclusive results, necessitating a repeat trial." },
      { id: "C", text: "The experiment didn't work, so they tried again." },
      { id: "D", text: "The experiment was kinda bad, so they needed another go." },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 2,
    section: "Grammar",
    text: "Which of the following uses hedging language appropriately?",
    options: [
      { id: "A", text: "The data proves that the hypothesis is correct." },
      { id: "B", text: "The data suggests that the hypothesis may be correct." },
      { id: "C", text: "The data is definitely right about the hypothesis." },
      { id: "D", text: "The data shows without doubt that the hypothesis is true." },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 3,
    section: "Grammar",
    text: "Choose the correct form of the sentence with a nominalisation:",
    options: [
      { id: "A", text: "The economy recovered quickly, which surprised economists." },
      { id: "B", text: "The rapid recovery of the economy surprised economists." },
      { id: "C", text: "The economy recovered quick, and this surprised economists." },
      { id: "D", text: "The economy's recovery was quick, and economists were surprised." },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 4,
    section: "Grammar",
    text: "Identify the sentence with correct use of a defining relative clause:",
    options: [
      { id: "A", text: "The participants, who completed the survey, received a reward." },
      { id: "B", text: "The participants who completed the survey received a reward." },
      { id: "C", text: "The participants, which completed the survey, received a reward." },
      { id: "D", text: "The participants whom completed the survey received a reward." },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 5,
    section: "Grammar",
    text: "Which sentence correctly uses a transition word to show contrast?",
    options: [
      { id: "A", text: "The results were significant. Furthermore, they contradicted the hypothesis." },
      { id: "B", text: "The results were significant. However, they contradicted the hypothesis." },
      { id: "C", text: "The results were significant. Therefore, they contradicted the hypothesis." },
      { id: "D", text: "The results were significant. Moreover, they contradicted the hypothesis." },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },

  // --- Essay Structure (Q6-10) ---
  {
    id: 6,
    section: "Essay Structure",
    text: "Which of the following is the most effective thesis statement for an academic essay?",
    options: [
      { id: "A", text: "This essay will talk about climate change." },
      { id: "B", text: "This essay argues that carbon pricing, while economically efficient, must be paired with investment in green infrastructure to address its regressive social impacts." },
      { id: "C", text: "Climate change is a very important topic that many people are talking about." },
      { id: "D", text: "There are many causes and effects of climate change." },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 7,
    section: "Essay Structure",
    text: "In an academic essay, the function of a topic sentence is to",
    options: [
      { id: "A", text: "introduce a new topic unrelated to the thesis" },
      { id: "B", text: "state the main idea of the paragraph and connect it to the thesis" },
      { id: "C", text: "summarise the entire essay in one sentence" },
      { id: "D", text: "present a counterargument to the main claim" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 8,
    section: "Essay Structure",
    text: "Arrange the following components of an academic essay in the correct order:",
    options: [
      { id: "A", text: "Introduction, Body paragraphs, Conclusion, References" },
      { id: "B", text: "Body paragraphs, Introduction, Conclusion, References" },
      { id: "C", text: "References, Introduction, Body paragraphs, Conclusion" },
      { id: "D", text: "Introduction, Conclusion, Body paragraphs, References" },
    ],
    correctAnswer: "A",
    difficulty: "easy",
  },
  {
    id: 9,
    section: "Essay Structure",
    text: "Which of the following is NOT an effective way to conclude an academic essay?",
    options: [
      { id: "A", text: "Synthesising the main arguments presented" },
      { id: "B", text: "Introducing a completely new argument not discussed earlier" },
      { id: "C", text: "Suggesting avenues for further research" },
      { id: "D", text: "Restating the thesis in light of the evidence discussed" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 10,
    section: "Essay Structure",
    text: "What is the purpose of a counterargument paragraph in a persuasive academic essay?",
    options: [
      { id: "A", text: "To confuse the reader about your position" },
      { id: "B", text: "To acknowledge opposing views and then refute them" },
      { id: "C", text: "To avoid taking a clear stance on the issue" },
      { id: "D", text: "To provide additional background information" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },

  // --- Source Use (Q11-15) ---
  {
    id: 11,
    section: "Source Use",
    text: "Which of the following correctly integrates a source citation using APA style?",
    options: [
      { id: "A", text: "According to recent research (Smith, 2020), the effects of urbanisation are complex." },
      { id: "B", text: "According to recent research (Smith), the effects of urbanisation are complex." },
      { id: "C", text: "According to recent research (Smith, page 45), the effects of urbanisation are complex." },
      { id: "D", text: "According to recent research (Smith, 2020, p. 45), the effects of the effects of urbanisation are complex." },
    ],
    correctAnswer: "A",
    difficulty: "medium",
  },
  {
    id: 12,
    section: "Source Use",
    text: "Which of the following is an example of plagiarism?",
    options: [
      { id: "A", text: "Paraphrasing a source and citing it correctly" },
      { id: "B", text: "Using a direct quote from a source with quotation marks and a citation" },
      { id: "C", text: "Copying a sentence from a source and changing a few words without citation" },
      { id: "D", text: "Summarising a source's main argument in your own words and citing it" },
    ],
    correctAnswer: "C",
    difficulty: "easy",
  },
  {
    id: 13,
    section: "Source Use",
    text: "When paraphrasing a source, it is important to",
    options: [
      { id: "A", text: "keep the original sentence structure but change the vocabulary" },
      { id: "B", text: "restate the idea in your own words and sentence structure, and cite the source" },
      { id: "C", text: "use quotation marks around the paraphrased text" },
      { id: "D", text: "change only the first and last words of the sentence" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 14,
    section: "Source Use",
    text: "Which of the following signals to the reader that you are presenting your own analysis rather than citing a source?",
    options: [
      { id: "A", text: "According to..." },
      { id: "B", text: "As Smith (2020) argues..." },
      { id: "C", text: "This suggests that..." },
      { id: "D", text: "As noted in the literature..." },
    ],
    correctAnswer: "C",
    difficulty: "hard",
  },
  {
    id: 15,
    section: "Source Use",
    text: "A reference list at the end of an academic paper should include",
    options: [
      { id: "A", text: "every source the writer has ever read on the topic" },
      { id: "B", text: "only sources that were directly cited in the paper" },
      { id: "C", text: "sources recommended for further reading that were not cited" },
      { id: "D", text: "only books, not journal articles" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
]

// ======================================================================
// CONVERSATIONAL ENGLISH PLACEMENT — 15 questions (Comprehension, Response, Fluency)
// ======================================================================

export const conversationalEnglishQuestions: Question[] = [

  // --- Comprehension (Q1-5) ---
  {
    id: 1,
    section: "Comprehension",
    passage: "Person A: 'I'm absolutely exhausted. I've been working on this project non-stop for two weeks.'\nPerson B: 'Why don't you take a day off? You've earned it.'\nPerson A: 'I wish I could, but the deadline is Friday.'",
    text: "Person A cannot take a day off because",
    options: [
      { id: "A", text: "they do not want to" },
      { id: "B", text: "the deadline is approaching" },
      { id: "C", text: "Person B needs their help" },
      { id: "D", text: "they have already taken too many days off" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 2,
    section: "Comprehension",
    passage: "Person A: 'So, what did you think of the film?'\nPerson B: 'The cinematography was stunning, and the acting was superb. But honestly, I found the plot a bit slow in the middle.'\nPerson A: 'I agree about the middle part. The ending more than made up for it, though, don't you think?'\nPerson B: 'Absolutely. The final scene was breathtaking.'",
    text: "What is Person B's overall opinion of the film?",
    options: [
      { id: "A", text: "They disliked everything about it" },
      { id: "B", text: "They have mixed feelings — praising some aspects while noting a weakness" },
      { id: "C", text: "They thought it was perfect from start to finish" },
      { id: "D", text: "They only liked the ending" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 3,
    section: "Comprehension",
    passage: "Waitress: 'Here are your menus. Today's specials are listed on the board. We have grilled salmon with lemon butter sauce, served with roasted vegetables, or the mushroom risotto with truffle oil. Can I get you anything to drink while you decide?'\nCustomer: 'I'll have a sparkling water with lime, please.'",
    text: "What has the customer ordered so far?",
    options: [
      { id: "A", text: "The grilled salmon and a drink" },
      { id: "B", text: "Only a drink" },
      { id: "C", text: "The mushroom risotto" },
      { id: "D", text: "Nothing yet — they are still looking at the menu" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 4,
    section: "Comprehension",
    passage: "Person A: 'I can't believe he said that to me. I was just trying to help.'\nPerson B: 'Look, I know you're upset, but maybe he didn't mean it the way it sounded. Give him a chance to explain.'\nPerson A: 'You're probably right. I'll sleep on it and talk to him tomorrow.'",
    text: "The phrase 'sleep on it' means",
    options: [
      { id: "A", text: "to take a nap immediately" },
      { id: "B", text: "to delay a decision until after resting and thinking" },
      { id: "C", text: "to avoid the issue completely" },
      { id: "D", text: "to dream about the problem" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 5,
    section: "Comprehension",
    passage: "Tourist: 'Excuse me, could you tell me how to get to the art museum?'\nLocal: 'Sure. Go straight for two blocks, then turn right on Elm Street. The museum will be on your left, just past the park. It's about a ten-minute walk.'\nTourist: 'Thanks very much. And is there a cafe nearby?'\nLocal: 'There's a lovely one right inside the museum, actually. Great coffee and a view of the gardens.'",
    text: "Where is the cafe the local recommends?",
    options: [
      { id: "A", text: "Across the street from the park" },
      { id: "B", text: "Inside the art museum" },
      { id: "C", text: "On Elm Street, before the museum" },
      { id: "D", text: "Two blocks from the tourist's current location" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },

  // --- Response (Q6-10) ---
  {
    id: 6,
    section: "Response",
    text: "Someone says: 'I just got promoted!' What is the most appropriate response?",
    options: [
      { id: "A", text: "That's too bad." },
      { id: "B", text: "Congratulations! That's wonderful news." },
      { id: "C", text: "I don't care." },
      { id: "D", text: "Are you sure you deserve it?" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 7,
    section: "Response",
    text: "Someone says: 'I'm sorry I'm late. The traffic was terrible.' What is the most appropriate response?",
    options: [
      { id: "A", text: "You're always late. This is unacceptable." },
      { id: "B", text: "No problem at all. Traffic can be unpredictable." },
      { id: "C", text: "You should have left earlier." },
      { id: "D", text: "That's not my problem." },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 8,
    section: "Response",
    text: "Someone asks: 'Would you mind helping me move this table?' How do you agree politely?",
    options: [
      { id: "A", text: "Yes, I mind." },
      { id: "B", text: "Of course, I'd be happy to help." },
      { id: "C", text: "I'm busy. Ask someone else." },
      { id: "D", text: "Maybe later. I don't know." },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 9,
    section: "Response",
    text: "Someone says: 'I didn't get the job I applied for.' What is the most supportive response?",
    options: [
      { id: "A", text: "I knew you wouldn't get it." },
      { id: "B", text: "That's a shame. You were a strong candidate. Something else will come along." },
      { id: "C", text: "You should have applied somewhere else." },
      { id: "D", text: "It's not a big deal. Get over it." },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 10,
    section: "Response",
    text: "Someone asks: 'What do you think about the new restaurant that opened downtown?' How do you give a polite, neutral opinion?",
    options: [
      { id: "A", text: "It's terrible. Don't go there." },
      { id: "B", text: "I haven't tried it yet, but I've heard mixed things. I'd like to give it a chance." },
      { id: "C", text: "I don't care about restaurants." },
      { id: "D", text: "Why would you ask me that?" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },

  // --- Fluency (Q11-15) ---
  {
    id: 11,
    section: "Fluency",
    prompt: "Describe your daily routine in 3-4 sentences. Include what time you wake up, what you do during the day, and what you do in the evening.",
    text: "Describe your daily routine.",
    difficulty: "easy",
  },
  {
    id: 12,
    section: "Fluency",
    prompt: "Talk for one minute about a hobby or activity you enjoy. Explain why you like it, how often you do it, and how you got started.",
    text: "Talk about a hobby you enjoy.",
    difficulty: "medium",
  },
  {
    id: 13,
    section: "Fluency",
    prompt: "Describe a memorable travel experience. Where did you go? What made it special? How did it change your perspective?",
    text: "Describe a memorable travel experience.",
    difficulty: "medium",
  },
  {
    id: 14,
    section: "Fluency",
    prompt: "Explain a current event or news story that interests you. Summarise the key facts, explain why it matters, and share your opinion on it.",
    text: "Explain a current event that interests you.",
    difficulty: "hard",
  },
  {
    id: 15,
    section: "Fluency",
    prompt: "Imagine you are introducing yourself at a networking event. In 2-3 minutes, describe your background, your current work or studies, your key skills, and what you are looking for.",
    text: "Introduce yourself at a networking event.",
    difficulty: "medium",
  },
]