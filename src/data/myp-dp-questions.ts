// MYP & DP Diagnostic Questions
// All content is original — no copyrighted material used
// MYP = Middle Years Programme (IB), DP = Diploma Programme (IB)

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
// MYP ENGLISH — 20 questions (Analysis, Writing, Speaking)
// International Baccalaureate Middle Years Programme — English Language & Literature
// ======================================================================

export const mypEnglishQuestions: Question[] = [

  // --- Analysis (Q1-8) ---
  {
    id: 1,
    section: "Analysis",
    passage: "The old fisherman sat alone in his boat, the same boat he had used for forty years. The paint had long since peeled away, revealing wood that had been smoothed by salt and sun and the constant touch of his hands. He looked at the empty nets and then at the horizon, where the sun was beginning to set. Tomorrow, he told himself. Tomorrow will be different.",
    text: "Which of the following best describes the mood created by the passage?",
    options: [
      { id: "A", text: "Joyful and triumphant" },
      { id: "B", text: "Melancholic and reflective" },
      { id: "C", text: "Angry and bitter" },
      { id: "D", text: "Humorous and light-hearted" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 2,
    section: "Analysis",
    passage: "The advertisement showed a young woman running through a field of wildflowers, her hair flowing behind her, a smile of pure freedom on her face. In the corner, in elegant script, were the words: 'Escape. Refresh. Renew.' The product being advertised was a brand of bottled water.",
    text: "The advertisement primarily relies on which persuasive technique?",
    options: [
      { id: "A", text: "Statistical evidence about water quality" },
      { id: "B", text: "Emotional association with freedom and nature" },
      { id: "C", text: "Expert testimonial from a scientist" },
      { id: "D", text: "Comparison with competing products" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 3,
    section: "Analysis",
    passage: "In the novel we studied, the protagonist repeatedly returns to the same bridge throughout the story. In the first chapter, she crosses it eagerly toward a new life. In the middle, she stands at its centre, unable to decide which direction to take. In the final chapter, she sits on the bridge and watches the water flow beneath, finally at peace with her choices.",
    text: "The bridge functions as a symbol of",
    options: [
      { id: "A", text: "urban development and progress" },
      { id: "B", text: "the protagonist's emotional journey and decision-making" },
      { id: "C", text: "the physical distance between two cities" },
      { id: "D", text: "the author's personal childhood memories" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 4,
    section: "Analysis",
    passage: "The poet writes: 'The city breathes with a thousand lungs / each window a mouth, each door a tongue / and in the subway's iron throat / the morning commuters are swallowed whole.'",
    text: "The poet uses the extended metaphor of the city as a living body to convey a sense of",
    options: [
      { id: "A", text: "harmony between nature and urban life" },
      { id: "B", text: "the overwhelming and consuming nature of city life" },
      { id: "C", text: "the beauty of architectural design" },
      { id: "D", text: "the quiet stillness of early morning" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 5,
    section: "Analysis",
    passage: "Consider the following two text types:\n\nText A: A blog post titled 'My Top 10 Tips for Surviving Year 10' written by a 16-year-old student.\n\nText B: A research article titled 'Adolescent Coping Strategies in Secondary Education Settings' published in an academic journal.",
    text: "Which of the following is a key difference between Text A and Text B?",
    options: [
      { id: "A", text: "Text A is longer than Text B" },
      { id: "B", text: "Text A uses a personal, informal tone while Text B uses formal academic language" },
      { id: "C", text: "Text B was written by a younger author than Text A" },
      { id: "D", text: "Text A includes photographs while Text B includes graphs" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 6,
    section: "Analysis",
    passage: "The short story opens with a description of a dying tree in the protagonist's garden. Over the course of the story, the tree's gradual decay mirrors the breakdown of the protagonist's relationship with his father. When the tree finally falls during a storm, the protagonist feels an unexpected sense of relief.",
    text: "The relationship between the tree and the protagonist's family situation is an example of",
    options: [
      { id: "A", text: "foreshadowing" },
      { id: "B", text: "situational irony" },
      { id: "C", text: "parallel structure" },
      { id: "D", text: "direct characterization" },
    ],
    correctAnswer: "C",
    difficulty: "hard",
  },
  {
    id: 7,
    section: "Analysis",
    passage: "In a political cartoon, a group of world leaders is shown playing chess on a board shaped like the Earth. One leader is about to knock over several pieces, while others look on with expressions of alarm. The caption reads: 'Checkmate in 2030.'",
    text: "The cartoonist's primary message is that",
    options: [
      { id: "A", text: "world leaders enjoy playing chess together" },
      { id: "B", text: "global political decisions have serious consequences for the planet" },
      { id: "C", text: "the year 2030 will be the end of the world" },
      { id: "D", text: "chess should be taught in schools worldwide" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 8,
    section: "Analysis",
    passage: "The writer uses short, fragmented sentences in the first paragraph: 'Rain. Cold. Waiting. The bus never came.' In the second paragraph, the sentences become longer and more flowing: 'Eventually, the grey clouds parted and a sliver of golden sunlight broke through, warming the wet pavement and lifting the spirits of everyone who had been stranded at the stop.'",
    text: "The shift in sentence structure between the two paragraphs reflects a change from",
    options: [
      { id: "A", text: "past tense to present tense" },
      { id: "B", text: "despair to hope" },
      { id: "C", text: "third person to first person" },
      { id: "D", text: "dialogue to narration" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },

  // --- Writing (Q9-15) ---
  {
    id: 9,
    section: "Writing",
    prompt: "Write a review (300-400 words) of a book, film, or video game that you have experienced recently. Your review should include a brief summary, an analysis of key strengths and weaknesses, and a recommendation with justification.",
    text: "Write a review of a book, film, or video game.",
    difficulty: "medium",
  },
  {
    id: 10,
    section: "Writing",
    prompt: "Your school is planning to ban the use of mobile phones during school hours. Write a persuasive speech either supporting or opposing this decision, to be delivered at a student council meeting.",
    text: "Write a persuasive speech for or against banning mobile phones at school.",
    difficulty: "medium",
  },
  {
    id: 11,
    section: "Writing",
    prompt: "Analyse how the author of a text we have studied uses setting to convey mood. Refer to specific details from the text in your response (250-350 words).",
    text: "Analyse how an author uses setting to convey mood.",
    difficulty: "hard",
  },
  {
    id: 12,
    section: "Writing",
    prompt: "Write a diary entry from the perspective of a character in a story you have read. Imagine you are writing about a key moment in their life. Your entry should reflect the character's voice, emotions, and perspective.",
    text: "Write a diary entry from a character's perspective.",
    difficulty: "medium",
  },
  {
    id: 13,
    section: "Writing",
    prompt: "Write an informative text (300 words) explaining the water cycle to a younger student. Use clear language, appropriate scientific terms, and include a simple diagram description.",
    text: "Write an informative text explaining the water cycle.",
    difficulty: "easy",
  },
  {
    id: 14,
    section: "Writing",
    prompt: "Write a personal response to the statement: 'Social media has made it harder for people to form genuine friendships.' Do you agree or disagree? Support your opinion with specific examples from your own experience or observations.",
    text: "Write a personal response about social media and friendship.",
    difficulty: "medium",
  },
  {
    id: 15,
    section: "Writing",
    prompt: "Create a short news article (250-300 words) reporting on a fictional community event, such as a local festival, a school fundraiser, or a neighbourhood clean-up. Your article should have a headline, a lead paragraph, and quotes from participants.",
    text: "Write a news article about a fictional community event.",
    difficulty: "medium",
  },

  // --- Speaking (Q16-20) ---
  {
    id: 16,
    section: "Speaking",
    prompt: "Prepare a 2-minute oral presentation on the following topic: 'If you could travel anywhere in the world, where would you go and why?' Include reasons related to culture, history, or personal interest.",
    text: "Prepare a 2-minute presentation about a dream travel destination.",
    difficulty: "easy",
  },
  {
    id: 17,
    section: "Speaking",
    prompt: "Engage in a group discussion on the topic: 'Should homework be abolished in secondary schools?' You will need to express your opinion, respond to others' views, and try to reach a consensus.",
    text: "Participate in a group discussion about homework.",
    difficulty: "medium",
  },
  {
    id: 18,
    section: "Speaking",
    prompt: "Deliver a 3-minute speech arguing for or against the following proposition: 'Technology is making us less creative.' Use specific examples to support your position.",
    text: "Deliver a 3-minute speech about technology and creativity.",
    difficulty: "hard",
  },
  {
    id: 19,
    section: "Speaking",
    prompt: "You have been asked to give a 90-second oral commentary on a poem you have studied. Analyse the poet's use of imagery and explain how it contributes to the poem's overall meaning.",
    text: "Give an oral commentary analysing a poem's use of imagery.",
    difficulty: "hard",
  },
  {
    id: 20,
    section: "Speaking",
    prompt: "Prepare a 2-minute oral presentation about a person who has inspired you. Describe who they are, what they did, and how they have influenced your thinking or actions.",
    text: "Present about a person who has inspired you.",
    difficulty: "easy",
  },
]

// ======================================================================
// DP ENGLISH A — 20 questions (Literary analysis, Comparative essay prompts)
// IB Diploma Programme — English A: Literature / Language & Literature
// ======================================================================

export const dpEnglishAQuestions: Question[] = [

  // --- Literary Analysis (Q1-12) ---
  {
    id: 1,
    section: "Literary Analysis",
    passage: "The play's final scene is devastating in its ordinariness. After three acts of rising tension, of secrets and betrayals revealed, the characters do not confront each other with dramatic accusations. Instead, they sit silently in the living room, drinking tea. The curtain falls on the sound of a teaspoon stirring against porcelain — a sound that echoes louder than any scream could have.",
    text: "The writer suggests that the final scene is 'devastating in its ordinariness' because",
    options: [
      { id: "A", text: "the playwright ran out of creative ideas" },
      { id: "B", text: "the lack of dramatic confrontation is itself emotionally powerful" },
      { id: "C", text: "the characters have resolved all their conflicts peacefully" },
      { id: "D", text: "the audience is expected to leave before the scene ends" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 2,
    section: "Literary Analysis",
    passage: "In the novel, water appears as a recurring motif. The protagonist's happiest memory is of swimming in a lake as a child. Her mother's death occurs during a flood. The climax of the story takes place during a drought. Each instance of water corresponds to a different emotional state — joy, grief, and desperation.",
    text: "How does the author use the motif of water to develop the novel's themes?",
    options: [
      { id: "A", text: "As a decorative background detail unrelated to the plot" },
      { id: "B", text: "As a symbol reflecting the protagonist's emotional landscape" },
      { id: "C", text: "As a scientific explanation for weather patterns" },
      { id: "D", text: "As a distraction from the main narrative" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 3,
    section: "Literary Analysis",
    passage: "The two poems, written a century apart, both address the theme of war. Poem A, written in 1915, uses formal rhyme and meter, personifying death as a 'gentle comrade.' Poem B, written in 2015, is written in free verse and describes war through the fragmented visual images of a smartphone video. Despite their formal differences, both poems arrive at a similar conclusion: that the reality of war cannot be communicated to those who have not experienced it.",
    text: "The main difference between the two poems lies in their",
    options: [
      { id: "A", text: "thematic concerns" },
      { id: "B", text: "formal and stylistic choices" },
      { id: "C", text: "historical accuracy" },
      { id: "D", text: "intended audience" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 4,
    section: "Literary Analysis",
    passage: "The author employs an unreliable narrator throughout the novel. The narrator insists that he is writing an objective account of events, yet his descriptions are consistently contradicted by the testimonies of other characters. For example, he describes his brother as 'cruel and calculating,' while the brother's letters reveal a compassionate and generous figure.",
    text: "The use of an unreliable narrator serves to",
    options: [
      { id: "A", text: "simplify the plot for the reader" },
      { id: "B", text: "challenge the reader's trust and encourage critical interpretation" },
      { id: "C", text: "provide a completely accurate historical record" },
      { id: "D", text: "make the story shorter" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 5,
    section: "Literary Analysis",
    passage: "In the passage, the author juxtaposes images of industrial decay with descriptions of natural beauty: 'The factory chimneys stood like skeletal fingers against the sky, black smoke curling from their tips. Beneath them, unnoticed, a single wild rose had pushed through a crack in the concrete, its petals the colour of spilled blood.'",
    text: "The juxtaposition of the factory and the wild rose most likely represents",
    options: [
      { id: "A", text: "the contrast between human destruction and nature's resilience" },
      { id: "B", text: "the similarity between manufactured and natural objects" },
      { id: "C", text: "the superiority of industrial development" },
      { id: "D", text: "the author's preference for urban environments" },
    ],
    correctAnswer: "A",
    difficulty: "medium",
  },
  {
    id: 6,
    section: "Literary Analysis",
    passage: "The character of Maria in the novel serves as a foil to the protagonist. Where the protagonist is impulsive and emotional, Maria is deliberate and rational. Where the protagonist speaks without thinking, Maria chooses her words with precision. Through their interactions, the author highlights the strengths and weaknesses of both approaches to life.",
    text: "A foil character is used primarily to",
    options: [
      { id: "A", text: "provide comic relief in serious moments" },
      { id: "B", text: "highlight specific qualities of the main character through contrast" },
      { id: "C", text: "serve as a love interest for the protagonist" },
      { id: "D", text: "introduce subplots unrelated to the main story" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 7,
    section: "Literary Analysis",
    passage: "The novel opens in medias res, with the protagonist already mid-journey on a train. We do not know where she has come from or where she is going. The landscape outside the window is described in vague, dreamlike terms — 'fields of gold dissolving into haze, a river catching light like a silver thread.' This technique immediately establishes a mood of uncertainty and transition.",
    text: "The phrase 'in medias res' means the narrative begins",
    options: [
      { id: "A", text: "at the very end of the story" },
      { id: "B", text: "in the middle of the action" },
      { id: "C", text: "with a detailed description of setting" },
      { id: "D", text: "from the perspective of a minor character" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 8,
    section: "Literary Analysis",
    text: "The poet's use of enjambment creates a sense of",
    passage: "The poem employs enjambment extensively. Consider the following lines:\n\n'I have measured out my life with coffee spoons /\nI know the voices dying with a dying fall /\nBeneath the music from a farther room.'",
    options: [
      { id: "A", text: "urgency and quickening pace" },
      { id: "B", text: "fragmentation and continuous flow" },
      { id: "C", text: "rigid formal structure" },
      { id: "D", text: "conversational dialogue" },
    ],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    id: 9,
    section: "Literary Analysis",
    passage: "In the passage, the author uses second-person narration ('you') throughout: 'You walk into the room and you know immediately that something has changed. The photographs have been removed from the wall. The bookshelf is empty. You feel a cold knot tighten in your stomach.'",
    text: "The effect of second-person narration is to",
    options: [
      { id: "A", text: "distance the reader from the events described" },
      { id: "B", text: "immerse the reader directly into the character's experience" },
      { id: "C", text: "confuse the reader about who is speaking" },
      { id: "D", text: "create a formal and objective tone" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 10,
    section: "Literary Analysis",
    passage: "The critic writes: 'The novel's treatment of time is deliberately non-linear. Events from the protagonist's childhood appear alongside scenes from her old age, and the reader must actively construct the chronological sequence. This fragmentation mirrors the workings of memory itself, which does not recall events in tidy chronological order.'",
    text: "According to the critic, the novel's non-linear structure is intended to",
    options: [
      { id: "A", text: "make the plot more difficult to understand" },
      { id: "B", text: "reflect how human memory actually functions" },
      { id: "C", text: "follow the conventions of detective fiction" },
      { id: "D", text: "distinguish the novel from film adaptations" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 11,
    section: "Literary Analysis",
    passage: "The passage uses extensive sensory imagery: 'The scent of cardamom and turmeric hung in the air, thick as velvet. On the stove, a pot of lentils bubbled — a sound like deep, contented breathing. The windows were fogged with steam, and Amina's mother wiped a circle clear with her palm, revealing the rain-slicked street outside.'",
    text: "The author's use of sensory imagery in this passage serves primarily to",
    options: [
      { id: "A", text: "create a vivid and immersive scene that engages multiple senses" },
      { id: "B", text: "provide factual information about cooking techniques" },
      { id: "C", text: "establish the precise time of day" },
      { id: "D", text: "describe the physical layout of the kitchen" },
    ],
    correctAnswer: "A",
    difficulty: "easy",
  },
  {
    id: 12,
    section: "Literary Analysis",
    passage: "The novel's ending is deliberately ambiguous. The protagonist stands at a crossroads — literally and metaphorically — and the final sentence reads: 'She turned left and walked into the fog.' The reader is left uncertain whether this choice leads to her salvation or her destruction.",
    text: "The effect of the ambiguous ending is to",
    options: [
      { id: "A", text: "provide closure for all the characters" },
      { id: "B", text: "invite the reader to interpret the outcome for themselves" },
      { id: "C", text: "reveal that the protagonist made the wrong choice" },
      { id: "D", text: "set up a sequel" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },

  // --- Comparative Essay Prompts (Q13-20) ---
  {
    id: 13,
    section: "Comparative Essay",
    prompt: "Compare how two works of literature you have studied explore the theme of identity. Consider how the authors use narrative voice, symbolism, and structural choices to develop this theme.",
    text: "Compare the exploration of identity in two literary works.",
    difficulty: "hard",
  },
  {
    id: 14,
    section: "Comparative Essay",
    prompt: "Analyse the representation of power and authority in two texts from different cultures or time periods. Discuss how the authors critique or reinforce existing power structures.",
    text: "Compare the representation of power in two texts from different cultures.",
    difficulty: "hard",
  },
  {
    id: 15,
    section: "Comparative Essay",
    prompt: "Compare the use of the natural world as a literary device in two works of poetry or prose. How do the authors use nature to reflect human emotions or societal conditions?",
    text: "Compare the use of nature as a literary device in two works.",
    difficulty: "medium",
  },
  {
    id: 16,
    section: "Comparative Essay",
    prompt: "Compare how two authors from your reading list use minor characters to illuminate aspects of the protagonist. Discuss the narrative techniques employed in each text.",
    text: "Compare the use of minor characters to illuminate the protagonist in two texts.",
    difficulty: "hard",
  },
  {
    id: 17,
    section: "Comparative Essay",
    prompt: "Examine how two works of literature deal with the theme of memory and the past. Consider whether the authors present memory as reliable or unreliable, healing or destructive.",
    text: "Compare the treatment of memory and the past in two literary works.",
    difficulty: "hard",
  },
  {
    id: 18,
    section: "Comparative Essay",
    prompt: "Compare the ways in which two texts challenge or reinforce traditional gender roles. Discuss the historical and cultural contexts that may have influenced each author's perspective.",
    text: "Compare how two texts address gender roles.",
    difficulty: "hard",
  },
  {
    id: 19,
    section: "Comparative Essay",
    prompt: "Analyse the relationship between the individual and society in two works you have studied. Consider how the authors use conflict, setting, and character development to explore this relationship.",
    text: "Compare the relationship between individual and society in two works.",
    difficulty: "hard",
  },
  {
    id: 20,
    section: "Comparative Essay",
    prompt: "Compare how two literary texts use the motif of the journey — physical, emotional, or spiritual — to structure their narratives and develop thematic concerns.",
    text: "Compare the use of the journey motif in two literary texts.",
    difficulty: "medium",
  },
]

// ======================================================================
// DP ENGLISH B — 20 questions (Reading comprehension, Writing prompts)
// IB Diploma Programme — English B (Language Acquisition)
// ======================================================================

export const dpEnglishBQuestions: Question[] = [

  // --- Reading Comprehension (Q1-12) ---
  {
    id: 1,
    section: "Reading Comprehension",
    passage: "Volunteering abroad has become increasingly popular among young people in recent years. Organisations offer programmes ranging from teaching English in rural communities to conservation work in national parks. While these experiences can be life-changing for volunteers, critics argue that some programmes do more harm than good. 'Voluntourism,' as it is sometimes called, can create dependency rather than empowerment if not managed properly. Experts recommend choosing programmes that are led by local communities and that focus on sustainable, long-term outcomes rather than short-term projects.",
    text: "According to the passage, what is a potential negative consequence of volunteering abroad?",
    options: [
      { id: "A", text: "It is too expensive for most young people" },
      { id: "B", text: "It may create dependency in local communities" },
      { id: "C", text: "It is only available in rural areas" },
      { id: "D", text: "It requires professional qualifications" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 2,
    section: "Reading Comprehension",
    passage: "The term 'fast fashion' refers to the rapid production of inexpensive clothing that mimics current trends. In the past twenty years, the average person's wardrobe has quadrupled in size, while the average cost per item has halved. This shift has come at a significant environmental cost: the fashion industry is responsible for approximately 10% of global carbon emissions and 20% of wastewater. Furthermore, an estimated 85% of textiles end up in landfills each year. In response, a growing movement of consumers is embracing 'slow fashion' — choosing fewer, higher-quality items and supporting brands with transparent, ethical supply chains.",
    text: "The passage suggests that the growth of 'slow fashion' is a response to",
    options: [
      { id: "A", text: "increasing clothing prices" },
      { id: "B", text: "the environmental and ethical problems of fast fashion" },
      { id: "C", text: "a shortage of textile materials" },
      { id: "D", text: "government regulations on clothing production" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 3,
    section: "Reading Comprehension",
    passage: "Dear Editor, I am writing to express my concern about the proposed demolition of the old railway station. This building is not just a structure; it is a repository of our town's collective memory. My grandfather proposed to my grandmother on its platform. Generations of families have arrived and departed through its doors. The station's Victorian architecture, with its wrought-iron arches and stained-glass windows, represents a craftsmanship that we simply do not see in modern buildings. I urge the council to reconsider this decision and explore options for restoration rather than demolition. Yours faithfully, Margaret Hollingsworth.",
    text: "The writer's main argument for preserving the railway station is based on its",
    options: [
      { id: "A", text: "economic value as a tourist attraction" },
      { id: "B", text: "sentimental and historical significance to the community" },
      { id: "C", text: "potential use as a commercial space" },
      { id: "D", text: "convenient location in the town centre" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 4,
    section: "Reading Comprehension",
    passage: "A recent survey conducted by the National Sleep Foundation found that 68% of teenagers report sleeping fewer than the recommended 8-10 hours per night. The survey identified three main contributors: early school start times, the use of electronic devices before bed, and overscheduled extracurricular activities. Teenagers who reported using their phones within an hour of falling asleep were 40% more likely to report poor sleep quality. Schools that have experimented with later start times have seen improvements in attendance, academic performance, and student wellbeing.",
    text: "The survey suggests that phone use before bed is",
    options: [
      { id: "A", text: "the only factor affecting teenage sleep quality" },
      { id: "B", text: "one of several factors, strongly associated with poor sleep" },
      { id: "C", text: "recommended by the National Sleep Foundation" },
      { id: "D", text: "unrelated to the amount of sleep teenagers get" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 5,
    section: "Reading Comprehension",
    passage: "The Great Barrier Reef stretches over 2,300 kilometres along the northeast coast of Australia. It is the largest living structure on Earth and is home to an extraordinary diversity of marine life, including over 1,500 species of fish, 400 types of coral, and many species of sea turtles, dolphins, and sharks. The reef generates billions of dollars annually through tourism and fishing. However, rising sea temperatures have caused multiple mass bleaching events in recent decades, threatening the reef's long-term survival and the communities that depend on it.",
    text: "What does the passage identify as the greatest threat to the Great Barrier Reef?",
    options: [
      { id: "A", text: "Overfishing by commercial fleets" },
      { id: "B", text: "Rising ocean temperatures" },
      { id: "C", text: "Pollution from coastal development" },
      { id: "D", text: "Damage from tourist boats" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 6,
    section: "Reading Comprehension",
    passage: "Emojis have become a global phenomenon, with over 3,000 emojis now in use across digital platforms. Linguists are divided on their significance. Some argue that emojis represent a new form of visual language that enriches communication by adding emotional nuance. Others contend that they are merely a decorative addition to text, lacking the grammatical structure necessary to qualify as a true language. What most agree on, however, is that emojis serve an important social function — they help establish tone and intent in text-based communication, where facial expressions and vocal inflections are absent.",
    text: "The passage indicates that linguists disagree about whether emojis",
    options: [
      { id: "A", text: "are becoming less popular over time" },
      { id: "B", text: "should be considered a genuine language" },
      { id: "C", text: "are used more by younger people" },
      { id: "D", text: "originated in Japan" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 7,
    section: "Reading Comprehension",
    passage: "The interview below is with Dr. Amara Singh, a researcher in urban agriculture.\n\nInterviewer: What inspired you to start growing food on city rooftops?\nDr. Singh: I grew up in a city where fresh vegetables were expensive and often of poor quality. I realised that the space above our heads — thousands of square metres of unused rooftop — could be transformed into productive gardens.\n\nInterviewer: What are the main challenges?\nDr. Singh: Weight load is a concern — not every building can support a garden. Water access and initial setup costs are also barriers. But the benefits — reduced food miles, improved air quality, and community engagement — far outweigh these challenges.",
    text: "According to Dr. Singh, a major obstacle to rooftop gardening is",
    options: [
      { id: "A", text: "lack of interest from city residents" },
      { id: "B", text: "the structural limitations of some buildings" },
      { id: "C", text: "poor quality of urban soil" },
      { id: "D", text: "government restrictions on urban farming" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 8,
    section: "Reading Comprehension",
    passage: "The infographic displays data on global coffee consumption. It shows that Finland consumes the most coffee per capita at 12 kg per person per year, followed by Norway and Iceland. Brazil, the world's largest coffee producer, ranks 13th. The infographic also reveals that 65% of coffee is consumed at breakfast, and that 2.25 billion cups of coffee are consumed worldwide every day. Notably, coffee consumption has increased by 8% annually in Asian markets over the past decade.",
    text: "Which of the following can be inferred from the infographic?",
    options: [
      { id: "A", text: "Brazil produces more coffee than it consumes" },
      { id: "B", text: "Asian coffee consumption is decreasing" },
      { id: "C", text: "Finland consumes the most coffee in total volume" },
      { id: "D", text: "Most coffee is consumed in the afternoon" },
    ],
    correctAnswer: "A",
    difficulty: "hard",
  },
  {
    id: 9,
    section: "Reading Comprehension",
    passage: "The museum guide explained the significance of the ancient amphora: 'This vessel was not merely a storage container. In the ancient world, the amphora was a standardised unit of trade. The shape, the clay, and even the markings on the handle tell us where it was made, what it carried — typically olive oil or wine — and the route it travelled. In many ways, the amphora was the shipping container of its day, a technology that enabled the first global economy.'",
    text: "The guide compares the amphora to a shipping container in order to",
    options: [
      { id: "A", text: "emphasise its large size" },
      { id: "B", text: "explain its role in ancient trade" },
      { id: "C", text: "criticise modern consumer culture" },
      { id: "D", text: "describe how it was manufactured" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: 10,
    section: "Reading Comprehension",
    passage: "Researchers at the University of Nairobi conducted a study in which participants wore fitness trackers for six months. Half of the participants received daily feedback on their step count via a smartphone app, while the other half did not. The group receiving feedback walked an average of 2,000 more steps per day than the control group. However, when the feedback stopped at the end of the study, the experimental group's step count dropped to the same level as the control group within two weeks.",
    text: "What conclusion can be drawn from the study results?",
    options: [
      { id: "A", text: "Fitness trackers permanently change exercise habits" },
      { id: "B", text: "Feedback-based motivation works only while it is actively provided" },
      { id: "C", text: "Walking 2,000 extra steps per day has no health benefits" },
      { id: "D", text: "Smartphone apps are ineffective for tracking exercise" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 11,
    section: "Reading Comprehension",
    passage: "The restaurant review began: 'El Mercado promises authentic Mexican cuisine, but delivers something far more interesting — a thoughtful fusion of traditional recipes with contemporary techniques. The mole poblano, a sauce with roots stretching back to the 17th century, is reinvented here with a hint of dark chocolate and chipotle that lingers on the palate. The service is attentive without being intrusive, and the courtyard setting, with its fairy lights and olive trees, provides an atmosphere that is both romantic and relaxed.'",
    text: "The reviewer's overall assessment of El Mercado is",
    options: [
      { id: "A", text: "highly critical of its departure from tradition" },
      { id: "B", text: "positive, praising its innovative approach to Mexican cuisine" },
      { id: "C", text: "neutral, merely describing the menu without evaluation" },
      { id: "D", text: "mixed, noting strengths and weaknesses equally" },
    ],
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: 12,
    section: "Reading Comprehension",
    passage: "A public notice read: 'Due to essential maintenance work, the City Library will be closed from Monday 5th June to Sunday 18th June. During this period, the following services will be available online: ebook and audiobook borrowing, digital magazine access, and research database queries. No physical items may be returned until the library reopens. Overdue fines will not accrue during the closure period. We apologise for any inconvenience.'",
    text: "Which service will NOT be available during the library closure?",
    options: [
      { id: "A", text: "Borrowing ebooks" },
      { id: "B", text: "Returning physical books" },
      { id: "C", text: "Accessing research databases" },
      { id: "D", text: "Reading digital magazines" },
    ],
    correctAnswer: "B",
    difficulty: "easy",
  },

  // --- Writing Prompts (Q13-20) ---
  {
    id: 13,
    section: "Writing",
    prompt: "Write a blog post (250-350 words) describing your ideal weekend. Include details about where you would go, what you would do, and who you would spend time with.",
    text: "Describe your ideal weekend in a blog post.",
    difficulty: "easy",
  },
  {
    id: 14,
    section: "Writing",
    prompt: "Your local council is planning to build a new shopping centre on a public park. Write a letter to the council expressing your support for or opposition to this plan. Provide clear reasons for your position.",
    text: "Write a letter to the council about a proposed shopping centre.",
    difficulty: "medium",
  },
  {
    id: 15,
    section: "Writing",
    prompt: "Write a review (300 words) of a restaurant, cafe, or hotel you have visited recently. Describe the atmosphere, service, and quality of the experience. Would you recommend it to others?",
    text: "Write a review of a restaurant, cafe, or hotel.",
    difficulty: "medium",
  },
  {
    id: 16,
    section: "Writing",
    prompt: "You have been asked to give a speech at an international student conference on the topic: 'What young people can do to address climate change.' Write your speech (300-400 words).",
    text: "Write a speech about what young people can do about climate change.",
    difficulty: "hard",
  },
  {
    id: 17,
    section: "Writing",
    prompt: "Write an email to a friend describing a cultural event you recently attended (a concert, festival, exhibition, or performance). Explain what made the event special and invite your friend to join you next time.",
    text: "Write an email to a friend about a cultural event.",
    difficulty: "easy",
  },
  {
    id: 18,
    section: "Writing",
    prompt: '"Technology is making our lives better." Write a balanced argument discussing both sides of this statement before giving your own opinion. Aim for 350-400 words.',
    text: "Write a balanced argument about whether technology is making lives better.",
    difficulty: "medium",
  },
  {
    id: 19,
    section: "Writing",
    prompt: "Imagine you are applying for a summer job at an international company. Write a formal cover letter (250-300 words) introducing yourself, describing your relevant skills and experience, and explaining why you would be a good candidate.",
    text: "Write a formal cover letter for a summer job application.",
    difficulty: "medium",
  },
  {
    id: 20,
    section: "Writing",
    prompt: "Write a diary entry (200-300 words) describing a memorable journey you have taken. It could be a trip to another country, a visit to a new city, or even a journey into a part of your own town you had never explored before.",
    text: "Write a diary entry about a memorable journey.",
    difficulty: "easy",
  },
]