// IELTS Diagnostic Assessment
// 40 questions across 4 sections: Listening (10), Reading (10), Writing (10), Speaking (10)
// All content is original — no copyrighted IELTS material used

export interface IELTSQuestion {
  id: number
  section: "Listening" | "Reading" | "Writing" | "Speaking"
  text: string
  passage?: string
  options?: { id: string; text: string }[]
  correctAnswer?: string
  prompt?: string  // For Writing/Speaking
  difficulty: "easy" | "medium" | "hard"
}

export const ieltsQuestions: IELTSQuestion[] = [
  // ======================================================================
  // SECTION 1: Listening — Questions 1-10 (audio transcripts with MC)
  // ======================================================================
  {
    id: 1,
    section: "Listening",
    passage: "You will hear a conversation between a student and a university housing officer.\n\nWoman: Good morning, University Housing Office. How can I help you?\nMan: Hello, yes. I'm calling about the accommodation options for international students. I've been offered a place in the Economics program starting in September.\nWoman: Congratulations! We have several options available. On-campus accommodation in shared apartments costs £550 per month, while single studios are £780. Off-campus private rentals in the city centre average around £650, but bills are usually extra.\nMan: I see. Are the on-campus options available for the full academic year?\nWoman: Yes, they cover a 39-week contract. Off-campus tends to be 52 weeks. I'd recommend applying for on-campus housing early as spaces fill quickly.",
    text: "What is the main advantage of on-campus accommodation mentioned in the conversation?",
    options: [
      { id: "A", text: "It is cheaper than all off-campus options" },
      { id: "B", text: "It includes all utility bills in the price" },
      { id: "C", text: "It offers a shorter contract length" },
      { id: "D", text: "It is located closer to the city centre" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },
  {
    id: 2,
    section: "Listening",
    passage: "You will hear a lecture extract about urban farming.\n\nLecturer: Urban agriculture has gained significant momentum over the past decade, but its roots go much deeper. During World War II, the British government launched the 'Dig for Victory' campaign, which encouraged citizens to convert gardens and public parks into vegetable plots. At its peak, this initiative produced over one million tons of food annually — roughly ten percent of the country's total food supply at the time. Today, cities like Detroit and Singapore are reviving this concept, using vertical farming technology and hydroponic systems to grow fresh produce in repurposed warehouses and on rooftops. These modern methods use up to ninety percent less water than traditional farming.",
    text: "What percentage of the UK's wartime food supply came from the 'Dig for Victory' campaign?",
    options: [
      { id: "A", text: "Approximately 5 percent" },
      { id: "B", text: "Approximately 10 percent" },
      { id: "C", text: "Approximately 25 percent" },
      { id: "D", text: "Approximately 50 percent" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 3,
    section: "Listening",
    passage: "You will hear two students discussing a group project.\n\nTom: So we need to decide who's doing which section of the presentation. Amina, you said you'd cover the historical background?\nAmina: Yes, I've already gathered most of my sources. I'll have the slides ready by Thursday.\nTom: Great. I'll take the methodology section and the data analysis. Priya?\nPriya: I can do the conclusion and the recommendations. But I'll need everyone's input by Friday to tie it together properly.\nAmina: Actually, our deadline to submit the slides to the tutor is Monday morning, so let's aim to have everything finalised by Sunday evening. We can do a final run-through on Sunday.\nTom: Agreed. Priya, can you circulate a template for the slides so we're all using the same format?\nPriya: Sure, I'll send it around tonight.",
    text: "Why does Amina suggest changing the deadline?",
    options: [
      { id: "A", text: "She needs more time to gather her sources" },
      { id: "B", text: "The slides must be submitted to the tutor on Monday" },
      { id: "C", text: "Tom has not yet completed his section" },
      { id: "D", text: "Priya's template will not be ready until Sunday" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 4,
    section: "Listening",
    passage: "You will hear a monologue about bicycle sharing schemes.\n\nSpeaker: Bicycle sharing programs have expanded enormously in the last fifteen years. The world's first large-scale system was launched in Paris in 2007 with twenty thousand bikes. By 2024, over two thousand cities worldwide had adopted similar schemes. What drives this growth? Researchers point to three primary factors: environmental awareness among younger populations, rising fuel costs in urban areas, and improvements in dockless technology that allow users to park bikes anywhere within a designated zone. A 2023 survey across twelve European capitals found that forty-three percent of regular users reported reducing their car usage by at least one trip per week. However, challenges remain, particularly around vandalism and the need for dedicated cycling infrastructure.",
    text: "What percentage of regular bike-sharing users reduced their car usage by at least one trip per week?",
    options: [
      { id: "A", text: "Thirty-three percent" },
      { id: "B", text: "Forty-three percent" },
      { id: "C", text: "Fifty-three percent" },
      { id: "D", text: "Sixty-three percent" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 5,
    section: "Listening",
    passage: "You will hear a conversation between a travel agent and a customer.\n\nAgent: Good afternoon, how can I help you today?\nCustomer: I'm planning a two-week trip to Japan in October and I'd like some advice on an itinerary.\nAgent: Excellent choice. October is a wonderful time to visit — the autumn foliage is stunning. A common approach is to spend four days in Tokyo, three in Kyoto, two in Osaka, and then use the remaining days for day trips. Have you considered a Japan Rail Pass?\nCustomer: I've read about it. Is it worth the cost?\nAgent: For a two-week trip, absolutely. A seven-day pass costs around thirty-three thousand yen, while a fourteen-day pass is about fifty-two thousand. If you're travelling between cities, it usually pays for itself after two or three long-distance trips. The pass also covers the JR Yamanote line in Tokyo and local JR lines in other cities.\nCustomer: That sounds convenient. I'll go with the fourteen-day pass.",
    text: "What does the travel agent recommend the customer purchase?",
    options: [
      { id: "A", text: "A guided tour package" },
      { id: "B", text: "A Japan Rail Pass" },
      { id: "C", text: "Flight insurance" },
      { id: "D", text: "A hotel booking service" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 6,
    section: "Listening",
    passage: "You will hear a lecture about the history of chocolate.\n\nLecturer: Chocolate, as most of us know it today, bears little resemblance to its earliest forms. The Olmec civilisation in Mesoamerica likely first cultivated cacao trees around 1500 BCE. They ground the beans into a paste, mixed it with water, chilli peppers, and spices, and consumed it as a bitter, frothy drink — a far cry from the sweet bars we find in shops today. When Spanish conquistadors brought cacao back to Europe in the sixteenth century, sugar was added, and the drink became popular among the aristocracy. The real transformation came in 1828 when Dutch chemist Coenraad van Houten invented a press that separated cocoa butter from cocoa solids, making it possible to produce both cocoa powder and, eventually, solid chocolate. This innovation paved the way for the first chocolate bar, produced by J.S. Fry & Sons in 1847.",
    text: "What was the significant development in chocolate production achieved in 1828?",
    options: [
      { id: "A", text: "The first solid chocolate bar was produced" },
      { id: "B", text: "Sugar was first added to chocolate drinks" },
      { id: "C", text: "A method was invented to separate cocoa butter from cocoa solids" },
      { id: "D", text: "Cacao plants were first cultivated outside Mesoamerica" }
    ],
    correctAnswer: "C",
    difficulty: "medium"
  },
  {
    id: 7,
    section: "Listening",
    passage: "You will hear a conversation about library services.\n\nLibrarian: Hello, welcome to the university library. How can I assist you?\nStudent: Hi, I'm trying to access the online journal database for my research paper, but it keeps asking for a password I don't have.\nLibrarian: That would be the remote access system. You need to log in using your student ID number and your university network password — the same one you use for email.\nStudent: Oh, I tried that. It said my account is blocked.\nLibrarian: Let me check. Yes, your library account shows an outstanding fine of £15 from last semester. Unfortunately, accounts with fines over £10 are automatically suspended. You'll need to pay the fine at the circulation desk, and access will be restored within two hours.\nStudent: I see. Can I pay by card?\nLibrarian: Yes, we accept card payments at the desk. The circulation desk is open until 8 PM today.\nStudent: Great, I'll go there now. Thank you.",
    text: "Why is the student unable to access the online journal database?",
    options: [
      { id: "A", text: "He forgot his student ID number" },
      { id: "B", text: "His university email account is deactivated" },
      { id: "C", text: "His library account is suspended due to an unpaid fine" },
      { id: "D", text: "The database is undergoing scheduled maintenance" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },
  {
    id: 8,
    section: "Listening",
    passage: "You will hear a radio segment about sleep science.\n\nPresenter: Most adults believe seven to eight hours of sleep is ideal, and for good reason — that's what major health organisations recommend. But did you know that sleep needs actually vary throughout your lifespan? Newborns require up to seventeen hours per day, while teenagers need around nine to ten hours for optimal cognitive function. For adults over sixty-five, seven to eight hours remains the target, but the quality and structure of sleep change significantly. Older adults spend less time in deep sleep, known as slow-wave sleep, and experience more frequent nighttime awakenings. A 2022 longitudinal study from University College London found that consistently sleeping fewer than six hours per night between the ages of fifty and seventy was associated with a thirty percent increased risk of developing dementia later in life.",
    text: "What did the 2022 study from University College London find about sleeping fewer than six hours per night?",
    options: [
      { id: "A", text: "It is normal for adults over sixty-five" },
      { id: "B", text: "It improves cognitive function in teenagers" },
      { id: "C", text: "It is associated with a higher risk of dementia" },
      { id: "D", text: "It increases time spent in slow-wave sleep" }
    ],
    correctAnswer: "C",
    difficulty: "medium"
  },
  {
    id: 9,
    section: "Listening",
    passage: "You will hear a tour guide describing a botanical garden.\n\nGuide: Welcome to the Royal Botanical Gardens. We're standing at the entrance to the Mediterranean climate zone, which covers approximately two hectares. To your left, you'll see our collection of olive trees — some of these specimens are over four hundred years old and were transplanted from groves in southern Italy. Straight ahead is the arid garden, featuring cacti and succulents from five continents. The glasshouse to your right houses our tropical collection, where we maintain a constant temperature of twenty-six degrees Celsius and eighty percent humidity. That building alone contains over three thousand species. If you follow the path around the lake, you'll reach the herb garden, which is particularly popular with visitors interested in culinary and medicinal plants. We'll be meeting back at the main entrance in approximately one hour for the guided tour of the woodland section.",
    text: "Where are the olive trees in the botanical garden originally from?",
    options: [
      { id: "A", text: "Southern Italy" },
      { id: "B", text: "The Mediterranean climate zone" },
      { id: "C", text: "Five different continents" },
      { id: "D", text: "The herb garden" }
    ],
    correctAnswer: "A",
    difficulty: "easy"
  },
  {
    id: 10,
    section: "Listening",
    passage: "You will hear a discussion about renewable energy policy.\n\nSpeaker A: So the government has announced a target of net-zero carbon emissions by 2050. Critics argue this is too ambitious given our current infrastructure.\nSpeaker B: I'd argue the opposite. Several countries have already demonstrated that rapid transition is possible. Costa Rica has run on over ninety-eight percent renewable electricity for several years. Uruguay shifted from primarily fossil fuels to nearly ninety-eight percent renewables in less than a decade.\nSpeaker A: But those are smaller economies. What about nations with heavy industry?\nSpeaker B: Even large economies are making progress. The UK, for example, reduced its emissions by over forty percent between 1990 and 2020 while growing its economy by nearly eighty percent. That shows decoupling is possible. The key is policy stability — when governments maintain consistent incentives for renewable investment, the private sector responds.\nSpeaker A: Fair point, but what about the cost to consumers?\nSpeaker B: Actually, solar and wind are now cheaper than coal and gas in most markets. The main challenge is storage and grid management, not cost.",
    text: "What point does Speaker B make about the UK's emission reductions?",
    options: [
      { id: "A", text: "They were achieved at the cost of economic growth" },
      { id: "B", text: "They show it is possible to reduce emissions while growing the economy" },
      { id: "C", text: "They were driven primarily by policy changes in the energy sector" },
      { id: "D", text: "They were smaller than reductions in Costa Rica and Uruguay" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },

  // ======================================================================
  // SECTION 2: Reading — Questions 11-20 (academic passages with MC)
  // ======================================================================
  {
    id: 11,
    section: "Reading",
    passage: "The concept of the 'circular economy' has gained substantial traction among policymakers and business leaders as an alternative to the traditional linear model of 'take, make, dispose.' At its core, the circular economy aims to decouple economic growth from the consumption of finite resources by keeping materials in use for as long as possible. This is achieved through strategies such as product longevity, repair, remanufacturing, and recycling. The Ellen MacArthur Foundation estimates that transitioning to a circular economy could generate $4.5 trillion in economic output by 2030 while reducing greenhouse gas emissions by 48 percent. However, implementation faces significant barriers, including entrenched linear business models, insufficient collection infrastructure, and consumer habits that favour disposability over durability.",
    text: "According to the passage, what is the primary goal of a circular economy?",
    options: [
      { id: "A", text: "To eliminate all forms of waste production entirely" },
      { id: "B", text: "To separate economic expansion from the use of limited resources" },
      { id: "C", text: "To replace capitalism with a more sustainable economic system" },
      { id: "D", text: "To increase recycling rates to 100 percent by 2030" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 12,
    section: "Reading",
    passage: "The concept of the 'circular economy' has gained substantial traction among policymakers and business leaders as an alternative to the traditional linear model of 'take, make, dispose.' At its core, the circular economy aims to decouple economic growth from the consumption of finite resources by keeping materials in use for as long as possible. This is achieved through strategies such as product longevity, repair, remanufacturing, and recycling. The Ellen MacArthur Foundation estimates that transitioning to a circular economy could generate $4.5 trillion in economic output by 2030 while reducing greenhouse gas emissions by 48 percent. However, implementation faces significant barriers, including entrenched linear business models, insufficient collection infrastructure, and consumer habits that favour disposability over durability.",
    text: "Which of the following is mentioned as a barrier to implementing a circular economy?",
    options: [
      { id: "A", text: "Lack of international cooperation on environmental policy" },
      { id: "B", text: "Insufficient collection infrastructure" },
      { id: "C", text: "High cost of renewable energy" },
      { id: "D", text: "Resistance from environmental groups" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 13,
    section: "Reading",
    passage: "Migration patterns of the monarch butterfly have fascinated biologists for decades. Each year, the eastern North American population undertakes an extraordinary journey of up to 4,800 kilometres from southern Canada and the northern United States to the oyamel fir forests of central Mexico. Remarkably, no single butterfly completes the entire round trip. The migration spans three to four generations, with each successive generation continuing the journey northward in spring. The butterflies use a combination of environmental cues — including temperature, daylight length, and the position of the sun — to orient themselves. Recent research suggests they also possess an internal magnetic compass that helps them navigate on cloudy days. Deforestation in their Mexican wintering grounds and the loss of milkweed — the only plant on which monarch caterpillars feed — along their migration route have caused population declines of over 80 percent in some monitored colonies.",
    text: "What makes the monarch butterfly migration particularly unusual?",
    options: [
      { id: "A", text: "It is the longest insect migration in the world" },
      { id: "B", text: "No individual butterfly completes the entire round trip" },
      { id: "C", text: "The butterflies migrate at altitudes over 3,000 metres" },
      { id: "D", text: "It occurs exclusively during the winter months" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 14,
    section: "Reading",
    passage: "Migration patterns of the monarch butterfly have fascinated biologists for decades. Each year, the eastern North American population undertakes an extraordinary journey of up to 4,800 kilometres from southern Canada and the northern United States to the oyamel fir forests of central Mexico. Remarkably, no single butterfly completes the entire round trip. The migration spans three to four generations, with each successive generation continuing the journey northward in spring. The butterflies use a combination of environmental cues — including temperature, daylight length, and the position of the sun — to orient themselves. Recent research suggests they also possess an internal magnetic compass that helps them navigate on cloudy days. Deforestation in their Mexican wintering grounds and the loss of milkweed — the only plant on which monarch caterpillars feed — along their migration route have caused population declines of over 80 percent in some monitored colonies.",
    text: "The word 'orient' in the passage most nearly means",
    options: [
      { id: "A", text: "confuse" },
      { id: "B", text: "determine their position or direction" },
      { id: "C", text: "communicate with each other" },
      { id: "D", text: "change their migration route" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 15,
    section: "Reading",
    passage: "The invention of the printing press by Johannes Gutenberg around 1440 is widely regarded as one of the most transformative events in human history. Before Gutenberg, books in Europe were copied by hand, primarily by monks in scriptoria, a process that could take months or even years to produce a single volume. As a result, books were scarce and expensive — a single Bible could cost the equivalent of a worker's annual wages. Gutenberg's movable type press dramatically reduced production time and costs. By the year 1500, an estimated 20 million volumes had been printed across Western Europe, up from virtually zero fifty years earlier. This flood of printed material had profound effects: literacy rates rose, scientific ideas spread more rapidly, and vernacular languages gained prominence over Latin. Some historians argue that the printing press laid the groundwork for both the Renaissance and the Scientific Revolution by democratising access to knowledge.",
    text: "What was a direct consequence of Gutenberg's printing press according to the passage?",
    options: [
      { id: "A", text: "Monks stopped copying books entirely" },
      { id: "B", text: "Literacy rates increased across Europe" },
      { id: "C", text: "Latin became the dominant language in Europe" },
      { id: "D", text: "The cost of a Bible fell to a worker's daily wage" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 16,
    section: "Reading",
    passage: "Recent advances in epigenetics have challenged the traditional view that our DNA sequence alone determines our biological destiny. Epigenetics refers to chemical modifications to DNA and its associated proteins that alter gene expression without changing the underlying genetic code. These modifications — such as DNA methylation and histone acetylation — act like switches that turn genes on or off in response to environmental factors including diet, stress, and exposure to toxins. A landmark study published in 2023 followed two groups of genetically identical mice raised in different environments. The group exposed to an enriched environment with toys, exercise wheels, and social interaction showed significant epigenetic changes in genes associated with learning and memory compared to the control group, even though both groups shared identical DNA. These findings suggest that our lifestyle choices may influence not only our own health but potentially that of future generations through inherited epigenetic marks.",
    text: "The main purpose of the passage is to",
    options: [
      { id: "A", text: "argue that DNA sequence is less important than previously thought" },
      { id: "B", text: "explain how environmental factors can influence gene expression through epigenetic changes" },
      { id: "C", text: "describe a specific experiment involving genetically identical mice" },
      { id: "D", text: "warn about the dangers of toxin exposure in early childhood" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 17,
    section: "Reading",
    passage: "The concept of 'cultural intelligence' or CQ has emerged as an important framework in cross-cultural psychology and international business. Unlike emotional intelligence, which focuses on interpersonal sensitivity within a single cultural context, CQ specifically addresses the capability to function effectively across diverse cultural settings. Researchers have identified four components of CQ: metacognitive (awareness of one's own cultural assumptions), cognitive (knowledge of cultural norms and practices), motivational (interest and confidence in cross-cultural interactions), and behavioural (ability to adapt verbal and nonverbal behaviour appropriately). A meta-analysis of 45 studies found that CQ is a stronger predictor of cross-cultural job performance than general cognitive ability or personality traits. Interestingly, the research suggests that CQ can be developed through targeted training, immersion experiences, and reflective practice, making it a valuable skill for professionals in increasingly globalised workplaces.",
    text: "What distinguishes cultural intelligence (CQ) from emotional intelligence (EQ) according to the passage?",
    options: [
      { id: "A", text: "CQ is more difficult to develop than EQ" },
      { id: "B", text: "CQ focuses specifically on functioning across different cultural settings" },
      { id: "C", text: "CQ is a stronger predictor of general job performance" },
      { id: "D", text: "CQ relies on cognitive ability rather than interpersonal sensitivity" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 18,
    section: "Reading",
    passage: "Ocean acidification, often called the 'other CO₂ problem,' occurs when the ocean absorbs carbon dioxide from the atmosphere, triggering chemical reactions that reduce seawater pH. Since the Industrial Revolution, the average pH of ocean surface water has fallen from approximately 8.2 to 8.1 — a 30 percent increase in acidity. While this pH change may seem small on the logarithmic scale, it has significant biological implications. Organisms that build calcium carbonate shells or skeletons — such as oysters, clams, coral, and some plankton species — find it more difficult to form and maintain their structures as acidity increases. Laboratory studies have shown that under projected future conditions, the shells of some marine snails can actually begin to dissolve. The economic stakes are high: the global shellfish industry alone is valued at over $30 billion annually, and coral reef ecosystems provide habitat for an estimated 25 percent of marine species.",
    text: "What does the passage suggest about a pH change from 8.2 to 8.1?",
    options: [
      { id: "A", text: "It represents a minor change with limited biological impact" },
      { id: "B", text: "It corresponds to a 30 percent increase in acidity" },
      { id: "C", text: "It is reversible through natural ocean processes" },
      { id: "D", text: "It only affects organisms with calcium carbonate structures" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 19,
    section: "Reading",
    passage: "The placebo effect has long been dismissed as 'all in the mind,' but modern neuroscience has revealed that it is a genuine biological phenomenon with measurable physiological effects. Placebos — inert substances or sham procedures — can trigger real changes in pain perception, mood, and even immune function. This occurs through the activation of the brain's endogenous opioid system, which produces natural pain-relieving chemicals similar to morphine. Interestingly, the size and colour of placebo pills influence their effectiveness: larger pills tend to produce stronger effects than smaller ones, and coloured pills outperform white ones for certain conditions. Perhaps most strikingly, studies have shown that placebos can work even when patients know they are receiving a placebo — a phenomenon called 'open-label placebo.' In one trial, patients with irritable bowel syndrome who knowingly took placebo pills reported significantly greater symptom relief than those who received no treatment, challenging fundamental assumptions about how placebos work.",
    text: "What is the 'open-label placebo' phenomenon described in the passage?",
    options: [
      { id: "A", text: "Placebos that are more effective when prescribed by a doctor" },
      { id: "B", text: "Placebos that work even when patients know they are receiving them" },
      { id: "C", text: "Placebos that are physically larger and brighter in colour" },
      { id: "D", text: "Placebos that only affect pain perception, not mood" }
    ],
    correctAnswer: "B",
    difficulty: "hard"
  },
  {
    id: 20,
    section: "Reading",
    passage: "The Great Pacific Garbage Patch, a massive accumulation of plastic debris in the North Pacific Ocean, has received extensive media coverage. However, public understanding of the phenomenon is often inaccurate. Contrary to popular depictions, the garbage patch is not a solid island of trash visible from satellite imagery. Rather, it consists of a diffuse region where microplastics — tiny fragments smaller than five millimetres — are distributed throughout the water column at concentrations higher than in surrounding ocean areas. The patch actually comprises two distinct zones: the Western Garbage Patch near Japan and the Eastern Garbage Patch near California, connected by the North Pacific Subtropical Convergence Zone. The Ocean Cleanup project, founded in 2013, has developed passive floating barriers that use ocean currents to concentrate plastic debris for collection. By 2024, the project had removed over 200,000 kilograms of plastic from the patch, though estimates suggest the total mass of plastic in the area exceeds 80,000 metric tonnes.",
    text: "What common misconception about the Great Pacific Garbage Patch does the passage correct?",
    options: [
      { id: "A", text: "That it is primarily composed of microplastics" },
      { id: "B", text: "That it is a solid, visible mass of trash" },
      { id: "C", text: "That it is located in the South Pacific" },
      { id: "D", text: "That it consists of two separate zones" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },

  // ======================================================================
  // SECTION 3: Writing — Questions 21-25 (prompt-only)
  // ======================================================================
  {
    id: 21,
    section: "Writing",
    text: "",
    prompt: "The chart below shows the percentage of households in five countries that owned at least one bicycle in 2000 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    difficulty: "medium"
  },
  {
    id: 22,
    section: "Writing",
    text: "",
    prompt: "Some people believe that governments should invest more in public transportation systems, while others think that building more roads is a better solution for traffic congestion.\n\nDiscuss both these views and give your own opinion.\n\nWrite at least 250 words.",
    difficulty: "medium"
  },
  {
    id: 23,
    section: "Writing",
    text: "",
    prompt: "The diagram below shows the process of recycling plastic bottles into usable products.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    difficulty: "hard"
  },
  {
    id: 24,
    section: "Writing",
    text: "",
    prompt: "In many countries, the number of people choosing to work from home has increased significantly. What are the advantages and disadvantages of this trend?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    difficulty: "easy"
  },
  {
    id: 25,
    section: "Writing",
    text: "",
    prompt: "The table below shows the number of international students enrolled in universities in four English-speaking countries from 2010 to 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    difficulty: "medium"
  },

  // ======================================================================
  // SECTION 4: Speaking — Questions 26-30 (prompt-only)
  // ======================================================================
  {
    id: 26,
    section: "Speaking",
    text: "",
    prompt: "Describe a book you have read that you found particularly interesting. You should say:\n- what the book was\n- what it was about\n- why you decided to read it\n- and explain why you found it interesting.",
    difficulty: "easy"
  },
  {
    id: 27,
    section: "Speaking",
    text: "",
    prompt: "Describe a place you have visited that you found beautiful. You should say:\n- where it was\n- when you went there\n- what you saw and did there\n- and explain why you found it beautiful.",
    difficulty: "easy"
  },
  {
    id: 28,
    section: "Speaking",
    text: "",
    prompt: "Talk about a skill you have learned that has been useful to you. You should say:\n- what the skill is\n- how you learned it\n- how you use it in your daily life\n- and explain why it has been useful.",
    difficulty: "medium"
  },
  {
    id: 29,
    section: "Speaking",
    text: "",
    prompt: "Describe a goal you have set for yourself. You should say:\n- what the goal is\n- why you set this goal\n- what steps you are taking to achieve it\n- and explain how likely you think you are to achieve it.",
    difficulty: "medium"
  },
  {
    id: 30,
    section: "Speaking",
    text: "",
    prompt: "Describe an important tradition in your culture. You should say:\n- what the tradition is\n- when and how it is celebrated\n- who participates in it\n- and explain why it is important to your culture.",
    difficulty: "hard"
  },

  // Additional Writing prompts (Q31-35)
  {
    id: 31,
    section: "Writing",
    text: "",
    prompt: "The graph below shows the number of visitors to three different museums in London over a six-month period.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    difficulty: "medium"
  },
  {
    id: 32,
    section: "Writing",
    text: "",
    prompt: "Universities should allocate more funding to the arts rather than to scientific research. To what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    difficulty: "hard"
  },
  {
    id: 33,
    section: "Writing",
    text: "",
    prompt: "The map below shows the changes in a town centre between 2005 and 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    difficulty: "hard"
  },
  {
    id: 34,
    section: "Writing",
    text: "",
    prompt: "An increasing number of people are choosing to live in cities rather than in rural areas. What are the causes of this trend, and what are its effects on society?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    difficulty: "medium"
  },
  {
    id: 35,
    section: "Writing",
    text: "",
    prompt: "The bar chart below shows the average monthly rainfall in three different cities over a twelve-month period.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    difficulty: "easy"
  },

  // Additional Speaking prompts (Q36-40)
  {
    id: 36,
    section: "Speaking",
    text: "",
    prompt: "Describe a memorable meal you have had. You should say:\n- when and where you had it\n- who you were with\n- what you ate\n- and explain why it was memorable.",
    difficulty: "easy"
  },
  {
    id: 37,
    section: "Speaking",
    text: "",
    prompt: "Describe a piece of technology you find useful. You should say:\n- what it is\n- how you use it\n- how it has changed the way you do things\n- and explain why you find it useful.",
    difficulty: "easy"
  },
  {
    id: 38,
    section: "Speaking",
    text: "",
    prompt: "Describe a film or television programme you watched that made an impression on you. You should say:\n- what the film or programme was\n- what it was about\n- why you decided to watch it\n- and explain why it made an impression on you.",
    difficulty: "medium"
  },
  {
    id: 39,
    section: "Speaking",
    text: "",
    prompt: "Describe a person who has influenced you. You should say:\n- who this person is\n- how you know them\n- how they have influenced you\n- and explain why they have been important in your life.",
    difficulty: "medium"
  },
  {
    id: 40,
    section: "Speaking",
    text: "",
    prompt: "Describe an important decision you have made. You should say:\n- what the decision was\n- when you made it\n- what factors influenced your decision\n- and explain why it was important.",
    difficulty: "hard"
  }
]