// TOEFL Diagnostic Assessment
// 40 questions across 4 sections: Reading (10), Listening (10), Speaking (10), Writing (10)
// All content is original — no copyrighted TOEFL material used

export interface TOEFLQuestion {
  id: number
  section: "Reading" | "Listening" | "Speaking" | "Writing"
  text: string
  passage?: string
  options?: { id: string; text: string }[]
  correctAnswer?: string
  prompt?: string  // For Speaking/Writing
  difficulty: "easy" | "medium" | "hard"
}

export const toeflQuestions: TOEFLQuestion[] = [
  // ======================================================================
  // SECTION 1: Reading — Questions 1-10 (academic passages with MC)
  // ======================================================================
  {
    id: 1,
    section: "Reading",
    passage: "Photosynthesis is the biochemical process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. The overall equation — 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ — belies the extraordinary complexity of the underlying mechanisms. Photosynthesis occurs in two main stages. In the light-dependent reactions, chlorophyll pigments in the thylakoid membranes absorb photons, exciting electrons that pass through an electron transport chain. This process generates ATP and NADPH while splitting water molecules to release oxygen. In the Calvin cycle, which does not require light directly, the enzyme RuBisCO catalyses the fixation of carbon dioxide into organic molecules using the ATP and NADPH produced earlier. C3 plants, which include rice, wheat, and soybeans, experience a limitation known as photorespiration when RuBisCO binds oxygen instead of carbon dioxide — a wasteful process that reduces photosynthetic efficiency, particularly in hot and dry conditions.",
    text: "According to the passage, what is photorespiration?",
    options: [
      { id: "A", text: "The process by which plants absorb carbon dioxide at night" },
      { id: "B", text: "A wasteful process that occurs when RuBisCO binds oxygen instead of carbon dioxide" },
      { id: "C", text: "The light-dependent stage of photosynthesis" },
      { id: "D", text: "The breakdown of glucose to release energy" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 2,
    section: "Reading",
    passage: "Photosynthesis is the biochemical process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. The overall equation — 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ — belies the extraordinary complexity of the underlying mechanisms. Photosynthesis occurs in two main stages. In the light-dependent reactions, chlorophyll pigments in the thylakoid membranes absorb photons, exciting electrons that pass through an electron transport chain. This process generates ATP and NADPH while splitting water molecules to release oxygen. In the Calvin cycle, which does not require light directly, the enzyme RuBisCO catalyses the fixation of carbon dioxide into organic molecules using the ATP and NADPH produced earlier. C3 plants, which include rice, wheat, and soybeans, experience a limitation known as photorespiration when RuBisCO binds oxygen instead of carbon dioxide — a wasteful process that reduces photosynthetic efficiency, particularly in hot and dry conditions.",
    text: "Which of the following can be inferred about C3 plants from the passage?",
    options: [
      { id: "A", text: "They are more efficient than C4 plants at photosynthesis" },
      { id: "B", text: "They are susceptible to reduced efficiency in hot, dry conditions" },
      { id: "C", text: "They do not experience photorespiration" },
      { id: "D", text: "They rely solely on the Calvin cycle for energy production" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 3,
    section: "Reading",
    passage: "The term 'cognitive load' refers to the total amount of mental effort being used in working memory. Educational psychologist John Sweller proposed cognitive load theory in the 1980s, arguing that instructional design should account for the limited capacity of working memory. Sweller identified three types of cognitive load: intrinsic, which depends on the inherent difficulty of the material; extraneous, which is imposed by the way information is presented; and germane, which contributes to schema construction and learning. Effective instructional design aims to minimise extraneous load while optimising germane load. For example, presenting a diagram alongside a verbal explanation — known as the modality effect — can reduce extraneous load by using both visual and auditory channels simultaneously. Similarly, worked examples are more effective than problem-solving for novice learners because they reduce the search for solutions, thereby freeing cognitive resources for learning underlying principles.",
    text: "What is the main point the passage makes about instructional design?",
    options: [
      { id: "A", text: "Students should solve problems independently to maximise learning" },
      { id: "B", text: "Design should account for the limited capacity of working memory" },
      { id: "C", text: "Cognitive load theory replaces traditional teaching methods" },
      { id: "D", text: "Visual aids are always superior to verbal explanations" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 4,
    section: "Reading",
    passage: "The economic concept of 'opportunity cost' is fundamental to rational decision-making. Defined as the value of the next best alternative foregone when a choice is made, opportunity cost highlights that every decision involves trade-offs. For instance, a student who chooses to spend an evening studying for an exam forgoes the alternative uses of that time — perhaps working a part-time shift that would earn $60, or attending a social event with friends. The true cost of studying is not merely the effort involved but the value of whatever activity was sacrificed. In business contexts, opportunity cost informs capital budgeting decisions: investing in Project A means forgoing the potential returns from Project B. A common error in reasoning is to consider only explicit costs — monetary outlays — while ignoring implicit costs such as foregone income or leisure. Economists argue that rational decision-making requires weighing both explicit and implicit costs against expected benefits.",
    text: "What is opportunity cost, as defined in the passage?",
    options: [
      { id: "A", text: "The monetary expense of making a particular choice" },
      { id: "B", text: "The value of the next best alternative that is given up" },
      { id: "C", text: "The total cost of all alternatives combined" },
      { id: "D", text: "The effort required to complete a task" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 5,
    section: "Reading",
    passage: "Glaciers are persistent bodies of dense ice that form where snow accumulation exceeds ablation (melting and sublimation) over many years. They cover approximately ten percent of Earth's land surface and store about sixty-nine percent of the world's freshwater. Glaciers are broadly classified into two types: alpine glaciers, which form in mountain valleys, and continental ice sheets, which cover large land areas. The Greenland and Antarctic ice sheets are the world's largest continental glaciers, together containing over ninety-nine percent of the world's glacial ice. Glacial movement — typically a few centimetres to several metres per day — occurs through internal deformation and basal sliding. As glaciers flow, they erode the underlying bedrock through plucking and abrasion, creating distinctive landforms such as U-shaped valleys, fjords, and moraines. The current rate of glacial retreat, driven by rising global temperatures, has accelerated dramatically since the mid-twentieth century, with significant implications for sea level rise and freshwater availability.",
    text: "What percentage of the world's glacial ice is contained in the Greenland and Antarctic ice sheets?",
    options: [
      { id: "A", text: "Approximately sixty-nine percent" },
      { id: "B", text: "Approximately ninety percent" },
      { id: "C", text: "Over ninety-nine percent" },
      { id: "D", text: "Approximately ten percent" }
    ],
    correctAnswer: "C",
    difficulty: "easy"
  },
  {
    id: 6,
    section: "Reading",
    passage: "The Harlem Renaissance of the 1920s and 1930s represented a flourishing of African American cultural expression centred in the Harlem neighbourhood of New York City. Though primarily known as a literary movement featuring figures such as Langston Hughes, Zora Neale Hurston, and Countee Cullen, the Renaissance also encompassed visual art, music, theatre, and political thought. A central theme was the construction of a new Black identity that rejected stereotypes and embraced pride in African heritage. The movement was catalysed by the Great Migration, during which millions of African Americans moved from the rural South to industrial Northern cities, and by the emergence of a educated middle class eager to challenge racial inequality through cultural achievement. While the Great Depression diminished the momentum of the Renaissance, its influence persisted. The works produced during this period laid important groundwork for the Civil Rights Movement and continue to shape discussions of race and culture in America.",
    text: "What role did the Great Migration play in the Harlem Renaissance according to the passage?",
    options: [
      { id: "A", text: "It directly funded artistic programmes in Harlem" },
      { id: "B", text: "It catalysed the movement by bringing people to Northern cities" },
      { id: "C", text: "It ended the Renaissance by causing economic hardship" },
      { id: "D", text: "It limited the movement to literary expression only" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 7,
    section: "Reading",
    passage: "Plate tectonics is the unifying theory of geology that explains the movement of Earth's lithosphere — the rigid outer layer consisting of the crust and uppermost mantle. The lithosphere is divided into seven major plates and several smaller ones that float on the semi-fluid asthenosphere below. These plates move at rates of one to fifteen centimetres per year, driven by convection currents in the mantle generated by heat from Earth's core. Plate boundaries are classified into three types: divergent, where plates move apart and new crust is created (as at the Mid-Atlantic Ridge); convergent, where plates collide and one plate subducts beneath the other (forming mountain ranges and oceanic trenches); and transform, where plates slide past each other horizontally (as along the San Andreas Fault). The theory, which gained widespread acceptance in the 1960s, unified seemingly disparate observations — the matching shapes of continental coastlines, the distribution of fossils across continents, the pattern of magnetic striping on the ocean floor, and the global distribution of earthquakes and volcanoes — into a coherent framework.",
    text: "According to the passage, what drives the movement of tectonic plates?",
    options: [
      { id: "A", text: "The gravitational pull of the Moon" },
      { id: "B", text: "Convection currents in the mantle" },
      { id: "C", text: "The rotation of Earth on its axis" },
      { id: "D", text: "Pressure from ocean currents" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 8,
    section: "Reading",
    passage: "Behavioural economics challenges the traditional economic assumption that humans are rational actors who always make decisions that maximise their utility. Pioneered by Daniel Kahneman and Amos Tversky, the field identifies systematic biases in human decision-making. One of the most robust findings is loss aversion: the psychological pain of losing something is roughly twice as powerful as the pleasure of gaining something of equivalent value. This explains why investors tend to hold losing stocks too long (hoping to break even) and sell winning stocks too early. Another key concept is the framing effect, where the way a choice is presented influences the decision. For example, describing a medical treatment as having a '90 percent survival rate' rather than a '10 percent mortality rate' dramatically increases its appeal, even though the information is identical. Default bias — the tendency to stick with pre-set options — has been used effectively in retirement savings policy: countries that automatically enrol employees in pension plans with the option to opt out have participation rates exceeding 90 percent, compared to less than 50 percent where employees must actively opt in.",
    text: "What does the framing effect demonstrate, according to the passage?",
    options: [
      { id: "A", text: "People prefer certain outcomes over uncertain ones" },
      { id: "B", text: "The presentation of a choice affects how people decide" },
      { id: "C", text: "People are more likely to take risks when losses are involved" },
      { id: "D", text: "Financial incentives are the most effective way to change behaviour" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 9,
    section: "Reading",
    passage: "The phenomenon of linguistic relativity, also known as the Sapir-Whorf hypothesis, proposes that the structure of a language influences its speakers' cognition and perception of the world. The hypothesis exists in strong and weak forms. The strong version — linguistic determinism — argues that language determines thought, a position that most linguists now consider unsupported by evidence. The weak version — linguistic influence — holds that language shapes habitual patterns of thought without determining them. Research has provided some support for the weak version. For instance, speakers of languages that use absolute directional terms (north, south, east, west) rather than relative ones (left, right) show superior orientation skills even in unfamiliar environments. Studies of colour perception have found that speakers of languages with more colour terms can more quickly distinguish between shades that share the same linguistic category. However, critics argue that these differences are limited in scope and do not demonstrate fundamental differences in cognitive capacity.",
    text: "What is the difference between the strong and weak versions of the Sapir-Whorf hypothesis?",
    options: [
      { id: "A", text: "The strong version applies only to colour perception, while the weak version applies to all cognition" },
      { id: "B", text: "The strong version claims language determines thought; the weak version claims it only influences it" },
      { id: "C", text: "The strong version is supported by evidence, while the weak version is not" },
      { id: "D", text: "The strong version focuses on vocabulary, while the weak version focuses on grammar" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 10,
    section: "Reading",
    passage: "The Sargasso Sea is a unique region of the North Atlantic Ocean defined not by land boundaries but by the surrounding ocean currents of the North Atlantic Gyre. This two-million-square-mile area is characterised by its warm, clear waters and abundant floating Sargassum seaweed, which gives the sea its name. The Sargasso Sea serves as a critical habitat for a remarkable variety of marine life. It provides a nursery habitat for juvenile sea turtles, a feeding ground for migratory fish such as marlin and tuna, and a seasonal home for numerous species of eels that travel thousands of miles from European and American rivers to spawn in its waters. The ecosystem faces growing threats from plastic pollution, overfishing, and shipping traffic. Because the Sargasso Sea lies within a gyre, floating plastic debris accumulates in high concentrations, and microplastics have been found in Sargassum samples throughout the region. International efforts to establish conservation measures have been complicated by the area's location in international waters beyond any single nation's jurisdiction.",
    text: "What makes the Sargasso Sea geographically unusual?",
    options: [
      { id: "A", text: "It is the deepest part of the Atlantic Ocean" },
      { id: "B", text: "It is defined by ocean currents rather than land boundaries" },
      { id: "C", text: "It is the only sea that freezes during winter" },
      { id: "D", text: "It lies entirely within the territorial waters of one country" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },

  // ======================================================================
  // SECTION 2: Listening — Questions 11-20 (lecture excerpts with MC)
  // ======================================================================
  {
    id: 11,
    section: "Listening",
    passage: "Listen to a professor discussing the history of the postal system.\n\nProfessor: The modern postal system has its roots in the eighteenth century, but organised mail delivery existed much earlier. The Roman cursus publicus established relay stations every twenty to thirty miles along major roads, allowing couriers to travel up to fifty miles per day — an impressive speed for its time. However, this system was reserved exclusively for government correspondence. Private citizens had to rely on travellers or merchants to carry their letters. It wasn't until the mid-nineteenth century that postal services became accessible to the general public. The most significant reform came in 1840 with the introduction of the Penny Black in Britain — the world's first adhesive postage stamp. This innovation, combined with uniform postal rates regardless of distance, transformed communication by making it affordable for ordinary people to send letters. Within a decade, the volume of mail in Britain more than doubled.",
    text: "What was the significant innovation of the Penny Black?",
    options: [
      { id: "A", text: "It was the first stamp to feature a portrait" },
      { id: "B", text: "It was the world's first adhesive postage stamp" },
      { id: "C", text: "It allowed letters to be sent between countries" },
      { id: "D", text: "It introduced the first express delivery service" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 12,
    section: "Listening",
    passage: "Listen to a lecture about marine biology.\n\nProfessor: We're going to talk about bioluminescence — the ability of living organisms to produce light through chemical reactions within their bodies. This phenomenon is surprisingly common in the ocean; in fact, over seventy-five percent of deep-sea creatures are capable of bioluminescence. The chemical reaction involves a molecule called luciferin, which, when oxidised in the presence of an enzyme called luciferase, produces light. Different species have evolved bioluminescence for different purposes. Some deep-sea fish use it for counter-illumination — matching the dim light from above to hide their silhouettes from predators below. Others, like the anglerfish, use a bioluminescent lure to attract prey in the darkness. Firefly squid off the coast of Japan create spectacular displays that scientists believe serve a mating function. The efficiency of bioluminescence is remarkable: nearly one hundred percent of the energy input is converted to light, compared to about ten percent for an incandescent light bulb, with virtually no heat produced.",
    text: "According to the lecture, what is the primary advantage of bioluminescence over artificial light sources?",
    options: [
      { id: "A", text: "It produces a wider range of colours" },
      { id: "B", text: "It is nearly one hundred percent energy efficient with almost no heat" },
      { id: "C", text: "It can be turned on and off more quickly" },
      { id: "D", text: "It does not require any chemical fuel" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 13,
    section: "Listening",
    passage: "Listen to a conversation between a student and a professor.\n\nStudent: Professor Chen, I've been working on my research proposal for the archaeology field project, but I'm struggling with the methodology section.\nProfessor: Let's take a look. What aspect are you finding difficult?\nStudent: I want to use ground-penetrating radar at the proposed dig site, but I'm not sure how to justify using it as the primary survey method.\nProfessor: Ground-penetrating radar is an excellent choice for your site, actually. The soil composition in that region is predominantly sandy, which allows good signal penetration. And since you're looking for structural remains — walls and foundations — rather than small artefacts, GPR is well suited. However, you should acknowledge its limitations. GPR won't give you information about the age or composition of what it detects. You'll still need to do targeted excavation to confirm and date any anomalies you find.\nStudent: So I should present GPR as a preliminary survey method followed by excavation?\nProfessor: Exactly. That's a standard and well-established approach in modern archaeology.",
    text: "What is the professor's main advice about using ground-penetrating radar?",
    options: [
      { id: "A", text: "It should replace excavation entirely at sandy sites" },
      { id: "B", text: "It should be used as a preliminary method followed by targeted excavation" },
      { id: "C", text: "It is not suitable for detecting structural remains" },
      { id: "D", text: "It works best in clay-rich soil conditions" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 14,
    section: "Listening",
    passage: "Listen to a lecture about the economics of fast fashion.\n\nProfessor: The fast fashion business model — characterised by rapid production cycles and low prices — has transformed the apparel industry over the past three decades. Brands like Zara and H&M can move a garment from design to store shelf in as little as two weeks, compared to the traditional six-month cycle. This speed is achieved through vertically integrated supply chains and data-driven production decisions. However, the environmental cost is substantial. The fashion industry is responsible for approximately ten percent of global carbon emissions and twenty percent of wastewater. Moreover, the average consumer now buys sixty percent more clothing items than they did fifteen years ago but keeps each item for only half as long. In response, a growing movement toward sustainable fashion advocates for slower production cycles, higher-quality materials, and policies that hold manufacturers responsible for the full lifecycle of their products, including disposal and recycling.",
    text: "What does the professor identify as a consequence of the fast fashion model?",
    options: [
      { id: "A", text: "Higher prices for consumers" },
      { id: "B", text: "Consumers buying more items but keeping them for less time" },
      { id: "C", text: "Reduced variety in clothing designs" },
      { id: "D", text: "Improved working conditions in garment factories" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 15,
    section: "Listening",
    passage: "Listen to part of a lecture in an environmental science class.\n\nProfessor: Today I want to discuss a concept that many of you may not have encountered — the 'Albedo Effect.' Albedo is a measure of how much sunlight a surface reflects. Fresh snow has an albedo of about 0.9, meaning it reflects ninety percent of incoming solar radiation. In contrast, the ocean has an albedo of about 0.06, absorbing ninety-four percent of the sunlight that hits it. Dark surfaces, such as asphalt or forests, have low albedo and absorb more heat. This is where the feedback loop comes in. As Arctic sea ice melts due to rising temperatures, it exposes darker ocean water, which absorbs more heat, causing more ice to melt, and so on. This positive feedback loop is a major reason why the Arctic is warming approximately four times faster than the global average — a phenomenon known as Arctic amplification. Scientists estimate that the Arctic could experience its first ice-free summer as early as the 2030s, with profound implications for global climate patterns.",
    text: "What is 'Arctic amplification' as described in the lecture?",
    options: [
      { id: "A", text: "The increase in snowfall in the Arctic region" },
      { id: "B", text: "The phenomenon of the Arctic warming faster than the global average" },
      { id: "C", text: "The expansion of Arctic sea ice during winter months" },
      { id: "D", text: "The reflection of sunlight by polar ice caps" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 16,
    section: "Listening",
    passage: "Listen to a conversation in a university career centre.\n\nAdvisor: Welcome, Sara. I've reviewed your CV and I think you have a strong profile. Your internship experience is impressive, but I notice your CV could be more tailored to the roles you're seeking.\nSara: Thanks for meeting with me. I've been applying for marketing positions but haven't had many responses.\nAdvisor: Let me give you some specific feedback. First, move your relevant work experience above your education — recruiters typically spend only about seven seconds scanning a CV before deciding whether to read further. Second, replace the objective statement at the top with a professional summary that highlights your key achievements. Instead of 'seeking a challenging marketing role,' write something like 'Marketing graduate with two years of digital campaign experience who increased social media engagement by forty percent during an internship at a major retail brand.'\nSara: That makes sense. Should I include all my part-time jobs from university?\nAdvisor: Only include those that demonstrate transferable skills — customer service, teamwork, time management. If a job doesn't add value to your marketing application, consider removing it to keep the CV to one page.",
    text: "What specific change does the career advisor recommend for Sara's CV?",
    options: [
      { id: "A", text: "Remove all part-time work experience entirely" },
      { id: "B", text: "Replace the objective statement with a professional summary and prioritise relevant experience" },
      { id: "C", text: "Add a photograph and personal interests section" },
      { id: "D", text: "List education before work experience" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },
  {
    id: 17,
    section: "Listening",
    passage: "Listen to a lecture about the history of architecture.\n\nProfessor: The Gothic architectural style, which flourished in Europe from the twelfth through the sixteenth century, represented a remarkable engineering achievement. The key innovation was the pointed arch, which distributed weight more efficiently than the rounded Romanesque arch. This allowed builders to construct much taller buildings with larger windows. The flying buttress — an external support system — transferred the lateral thrust of the roof and walls to external piers, enabling the tall, skeletal structures we associate with Gothic cathedrals. These innovations made possible the vast stained-glass windows that characterise buildings like Chartres Cathedral and Notre-Dame de Paris. The stained glass served both a practical and pedagogical purpose — they admitted light into the largely illiterate medieval population's worship spaces while depicting biblical stories in vivid imagery. The rose window, a circular stained-glass window with radiating petal-like sections, became a signature element of Gothic architecture, achieving its most elaborate forms in the thirteenth century.",
    text: "What function did stained-glass windows serve in Gothic cathedrals according to the lecture?",
    options: [
      { id: "A", text: "They were purely decorative with no functional purpose" },
      { id: "B", text: "They admitted light and depicted biblical stories for an illiterate population" },
      { id: "C", text: "They provided structural support to the walls" },
      { id: "D", text: "They were used to tell time through the movement of sunlight" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 18,
    section: "Listening",
    passage: "Listen to a discussion in a biology seminar.\n\nSpeaker A: I've been reading about the gut microbiome and its connection to mental health. Some researchers are calling it the 'second brain.'\nSpeaker B: That term refers to the enteric nervous system, which is a complex network of neurons lining the gastrointestinal tract. But you're right that gut bacteria influence brain function through multiple pathways.\nSpeaker A: Can you explain some of those pathways?\nSpeaker B: Certainly. The vagus nerve is the primary physical connection — it transmits signals from the gut to the brain. Then there's the immune pathway: gut bacteria influence inflammation levels throughout the body, including the brain. The metabolic pathway involves short-chain fatty acids produced by bacterial fermentation of dietary fibre, which can cross the blood-brain barrier. A 2023 clinical trial found that a group of patients with major depressive disorder who received a specific probiotic supplement showed significant improvement in their symptoms compared to a placebo group, even after controlling for other variables.\nSpeaker A: So could probiotics eventually become a standard treatment for depression?\nSpeaker B: It's too early to say definitively, but the evidence is promising enough that several large-scale trials are now underway.",
    text: "What does Speaker B identify as one pathway through which gut bacteria affect the brain?",
    options: [
      { id: "A", text: "Direct electrical stimulation of brain cells" },
      { id: "B", text: "Short-chain fatty acids that cross the blood-brain barrier" },
      { id: "C", text: "Production of neurotransmitters in the stomach lining" },
      { id: "D", text: "Regulation of body temperature" }
    ],
    correctAnswer: "B",
    difficulty: "hard"
  },
  {
    id: 19,
    section: "Listening",
    passage: "Listen to a lecture about astronomy.\n\nProfessor: We tend to think of Saturn's rings as a permanent feature of the planet, but evidence suggests they may be surprisingly young — perhaps only one hundred to two hundred million years old. This conclusion comes from data collected by the Cassini spacecraft, which orbited Saturn from 2004 to 2017. Cassini's measurements revealed that the rings are composed of over ninety-five percent water ice with very little dark, dusty material. If the rings had been exposed to micrometeorite bombardment for billions of years, they would have accumulated significantly more dark material. The cleanliness of the ice suggests they formed relatively recently — cosmologically speaking. The leading theory is that the rings formed when a moon or comet got too close to Saturn and was torn apart by tidal forces, a process called tidal disruption. Over time, the rings will gradually lose material as it rains down onto Saturn's atmosphere. In perhaps another hundred million years, the rings may disappear entirely, leaving Saturn looking much like the other gas giants in our solar system.",
    text: "Why do scientists believe Saturn's rings are relatively young?",
    options: [
      { id: "A", text: "They are still growing in size" },
      { id: "B", text: "The ice is very clean with little accumulated dark material" },
      { id: "C", text: "Saturn's magnetic field is unusually strong" },
      { id: "D", text: "The rings contain traces of radioactive elements" }
    ],
    correctAnswer: "B",
    difficulty: "medium"
  },
  {
    id: 20,
    section: "Listening",
    passage: "Listen to a conversation between a student and a librarian about academic resources.\n\nStudent: Hi, I'm working on a research paper about the history of digital privacy law and I'm having trouble finding recent sources.\nLibrarian: Have you tried the law and policy databases? Westlaw and HeinOnline are our primary legal research platforms.\nStudent: I checked Westlaw, but I'm not sure I'm using the right search terms.\nLibrarian: Let me suggest a different approach. Start with a review article in a law journal — those will survey the major developments and give you a bibliography of key cases and legislation. For digital privacy, a good starting point would be the Harvard Journal of Law and Technology. Also, don't limit yourself to law journals. The field of privacy studies is interdisciplinary, so you'll find relevant articles in communications and computer science databases too.\nStudent: That's helpful. Should I include international perspectives?\nLibrarian: Absolutely. The European Union's General Data Protection Regulation has been highly influential globally, and comparing approaches across jurisdictions can strengthen your paper. Our library has access to the International Journal of Law and Information Technology. I'd recommend setting up a research appointment with me next week, and I can walk you through the advanced search features of these databases.",
    text: "What does the librarian recommend as a starting point for the student's research?",
    options: [
      { id: "A", text: "A textbook on constitutional law" },
      { id: "B", text: "A review article in a law journal" },
      { id: "C", text: "The text of the GDPR itself" },
      { id: "D", text: "Newspaper articles about privacy scandals" }
    ],
    correctAnswer: "B",
    difficulty: "easy"
  },

  // ======================================================================
  // SECTION 3: Speaking — Questions 21-30 (prompt-based)
  // ======================================================================
  {
    id: 21,
    section: "Speaking",
    text: "",
    prompt: "Describe a memorable trip you have taken. Include details about where you went, what you did, and why it was memorable. You will have 45 seconds to speak.",
    difficulty: "easy"
  },
  {
    id: 22,
    section: "Speaking",
    text: "",
    prompt: "Some people prefer to study alone. Others prefer to study in a group. Which approach do you think is more effective and why? Include specific reasons and examples in your response. You will have 45 seconds to speak.",
    difficulty: "easy"
  },
  {
      id: 23,
      section: "Speaking",
      text: "",
      prompt: "Summarise the student's opinion about the mandatory on-campus housing policy and explain whether you agree or disagree. You will have 60 seconds to speak.",
    difficulty: "medium"
  },
  {
    id: 24,
    section: "Speaking",
    text: "",
    prompt: "Describe a teacher or mentor who had a positive influence on your education. Explain what qualities made them effective and how they impacted your learning. You will have 45 seconds to speak.",
    difficulty: "easy"
  },
  {
    id: 25,
    section: "Speaking",
    text: "",
    prompt: "Do you agree or disagree with the following statement: 'Technology has made people more isolated from one another.' Use specific reasons and examples to support your answer. You will have 45 seconds to speak.",
    difficulty: "medium"
  },
  {
    id: 26,
    section: "Speaking",
    text: "",
    prompt: "Summarise the lecture's argument and explain how it challenges the claim made in the article. You will have 60 seconds to speak.",
    difficulty: "hard"
  },
  {
    id: 27,
    section: "Speaking",
    text: "",
    prompt: "Describe a skill you would like to learn in the future. Explain why you want to learn it and how you think it will benefit you. You will have 45 seconds to speak.",
    difficulty: "easy"
  },
  {
    id: 28,
    section: "Speaking",
    text: "",
    prompt: "Some universities require students to complete a certain number of community service hours before graduation. Do you think this is a good policy? Why or why not? Use specific reasons and examples to support your opinion. You will have 45 seconds to speak.",
    difficulty: "medium"
  },
  {
    id: 29,
    section: "Speaking",
    text: "",
    prompt: "Listen to a short lecture about ocean acidification and then answer the following question using information from the lecture and your own ideas.\n\nLecture: Ocean acidification occurs when carbon dioxide from the atmosphere dissolves in seawater, forming carbonic acid. This chemical reaction reduces the availability of carbonate ions, which are essential for marine organisms such as corals, oysters, and plankton to build their calcium carbonate shells and skeletons. Since the Industrial Revolution, ocean acidity has increased by approximately thirty percent.\n\nExplain what ocean acidification is and describe its impact on marine organisms. Include details from the lecture and your own understanding of the issue. You will have 60 seconds to speak.",
    difficulty: "medium"
  },
  {
    id: 30,
    section: "Speaking",
    text: "",
    prompt: "Describe a time when you had to make a difficult decision. What factors did you consider, and what was the outcome of your decision? You will have 45 seconds to speak.",
    difficulty: "medium"
  },

  // ======================================================================
  // SECTION 4: Writing — Questions 31-40 (integrated and independent)
  // ======================================================================
  {
    id: 31,
    section: "Writing",
    text: "",
    prompt: "Summarise the points made in the lecture, explaining how they challenge the claims in the reading passage.\n\nYou have 20 minutes to plan and write your response. Your response should be 150-225 words.",
    difficulty: "hard"
  },
  {
    id: 32,
    section: "Writing",
    text: "",
    prompt: "Do you agree or disagree with the following statement?\n\n'It is more important for students to study science and mathematics than it is for them to study art and literature.'\n\nUse specific reasons and examples to support your answer.\n\nYou have 30 minutes to plan and write your response. Your response should be 300-350 words.",
    difficulty: "medium"
  },
  {
    id: 33,
    section: "Writing",
    text: "",
    prompt: "Read the following passage and listen to the lecture. Then write a response summarising the points made in the lecture and explaining how they cast doubt on the claims made in the reading passage.\n\nReading passage: Telecommuting offers numerous benefits to both employees and employers. Employees enjoy greater flexibility, reduced commuting costs, and improved work-life balance. Employers benefit from lower overhead costs and access to a broader talent pool unconstrained by geography. Studies have shown that telecommuters are often more productive than their office-based counterparts.\n\nLecture: The benefits of telecommuting are real but they are not universal. Many employees report feeling isolated and struggle to separate work from personal life, leading to higher rates of burnout. Collaboration and spontaneous creativity suffer when teams cannot interact in person. Furthermore, not all jobs can be performed remotely, and the shift to telecommuting can exacerbate inequalities between workers who can work from home and those who cannot.\n\nSummarise the points made in the lecture, explaining how they challenge the claims in the reading passage.\n\nYou have 20 minutes to plan and write your response. Your response should be 150-225 words.",
    difficulty: "medium"
  },
  {
    id: 34,
    section: "Writing",
    text: "",
    prompt: "Some people believe that governments should invest more in public transportation infrastructure, while others think that building more roads and highways is a better solution to traffic congestion. Which perspective do you agree with?\n\nUse specific reasons and examples to support your answer.\n\nYou have 30 minutes to plan and write your response. Your response should be 300-350 words.",
    difficulty: "easy"
  },
  {
    id: 35,
    section: "Writing",
    text: "",
    prompt: "Read the following passage and listen to the lecture. Then write a response summarising the points made in the lecture and explaining how they cast doubt on the claims made in the reading passage.\n\nReading passage: The use of artificial intelligence in hiring processes improves fairness and efficiency. AI systems can screen thousands of résumés in seconds, identifying the most qualified candidates without the unconscious biases that affect human recruiters. AI tools evaluate candidates based solely on job-relevant criteria, potentially increasing diversity in the workplace.\n\nLecture: AI hiring systems are not inherently fair; they learn from historical hiring data, which may contain existing biases. If a company has historically hired predominantly male engineers, the AI will learn to favour male candidates. Moreover, AI systems often rely on proxies for job performance that may be biased — for example, preferring candidates who attended certain universities or had uninterrupted career paths. Transparency is also a concern: candidates rarely know how AI systems evaluate them or have the opportunity to challenge automated decisions.\n\nSummarise the points made in the lecture, explaining how they challenge the claims in the reading passage.\n\nYou have 20 minutes to plan and write your response. Your response should be 150-225 words.",
    difficulty: "hard"
  },
  {
    id: 36,
    section: "Writing",
    text: "",
    prompt: "Some people believe that the best way to reduce crime is to impose longer prison sentences. Others believe that alternative measures such as education and community programmes are more effective.\n\nDiscuss both views and give your own opinion.\n\nYou have 30 minutes to plan and write your response. Your response should be 300-350 words.",
    difficulty: "medium"
  },
  {
    id: 37,
    section: "Writing",
    text: "",
    prompt: "Read the following passage and listen to the lecture. Then write a response summarising the points made in the lecture and explaining how they cast doubt on the claims made in the reading passage.\n\nReading passage: The use of renewable energy sources such as solar and wind power is the most effective strategy for reducing greenhouse gas emissions. These technologies have become increasingly affordable, with solar panel costs declining by over eighty percent in the past decade. Renewables can be deployed at multiple scales, from residential rooftops to utility-scale solar farms, making them accessible to a wide range of consumers.\n\nLecture: Despite their declining costs, renewables face significant challenges that limit their effectiveness. Solar and wind power are intermittent — they do not generate electricity when the sun is not shining or the wind is not blowing. Large-scale battery storage, while improving, remains expensive and insufficient for grid-scale needs. Furthermore, manufacturing solar panels and wind turbines requires rare earth minerals whose extraction causes environmental damage. The lecture suggests that nuclear power and energy efficiency measures should receive equal consideration in climate policy.\n\nSummarise the points made in the lecture, explaining how they challenge the claims in the reading passage.\n\nYou have 20 minutes to plan and write your response. Your response should be 150-225 words.",
    difficulty: "hard"
  },
  {
    id: 38,
    section: "Writing",
    text: "",
    prompt: "Do you agree or disagree with the following statement?\n\n'Young people today have more opportunities to succeed than previous generations.'\n\nUse specific reasons and examples to support your answer.\n\nYou have 30 minutes to plan and write your response. Your response should be 300-350 words.",
    difficulty: "easy"
  },
  {
    id: 39,
    section: "Writing",
    text: "",
    prompt: "Read the following passage and listen to the lecture. Then write a response summarising the points made in the lecture and explaining how they cast doubt on the claims made in the reading passage.\n\nReading passage: The rise of e-books and digital reading has transformed the publishing industry. E-books are cheaper to produce and distribute, making a wider range of titles available to readers. Digital reading devices allow readers to carry thousands of books in a single lightweight device, and features such as adjustable font sizes make reading more accessible to people with visual impairments.\n\nLecture: While e-books offer convenience, their environmental impact is more complex than often assumed. Manufacturing e-readers requires mining rare earth minerals, uses significant energy, and produces electronic waste. Most e-readers are replaced within three to five years, and recycling rates for electronic devices remain low. Additionally, studies suggest that reading comprehension — particularly of complex or lengthy texts — may be better when reading print books because physical texts offer spatial cues that aid memory and understanding.\n\nSummarise the points made in the lecture, explaining how they challenge the claims in the reading passage.\n\nYou have 20 minutes to plan and write your response. Your response should be 150-225 words.",
    difficulty: "medium"
  },
  {
    id: 40,
    section: "Writing",
    text: "",
    prompt: "Some people believe that the primary purpose of a university education is to prepare students for employment. Others believe that university education should focus on developing critical thinking and broad knowledge rather than specific job skills.\n\nDiscuss both views and give your own opinion.\n\nYou have 30 minutes to plan and write your response. Your response should be 300-350 words.",
    difficulty: "medium"
  }
]