// Original IELTS-style Writing practice content — written from scratch by GloryPrep editorial.

export interface WritingTask {
  id: string;
  taskType: "Task 1 Academic" | "Task 1 General" | "Task 2";
  title: string;
  prompt: string;
  planningFramework: string[];
  band7Outline: string;
  commonMistakes: string[];
  usefulLanguage: string[];
}

export const WRITING_PACKS: WritingTask[] = [
  {
    id: "write-001",
    taskType: "Task 1 Academic",
    title: "Renewable Energy Adoption in Southeast Asia, 2010\u20132024",
    prompt:
      "The graph below shows the share of electricity generated from renewable sources in three Southeast Asian countries between 2010 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    planningFramework: [
      "Paragraph 1 \u2014 paraphrase the prompt (countries, period, what is measured).",
      "Paragraph 2 \u2014 overview: name the overall trend and the biggest change; no data here.",
      "Paragraph 3 \u2014 details: the country with the largest growth, with 2\u20133 precise figures.",
      "Paragraph 4 \u2014 details: the remaining countries and any crossing points or plateaus.",
    ],
    band7Outline:
      "Overview first in position two: all three countries rose, but at very different rates. Vietnam showed the steepest climb (roughly 5% to 22%), Malaysia grew steadily to about 12%, while Thailand hovered near 8% throughout. Body paragraphs group the fast riser separately, then contrast the other two, quoting years and percentages for each trend.",
    commonMistakes: [
      "Including an opinion (\u201cthis is good for the environment\u201d) \u2014 Task 1 requires reporting only.",
      "Listing every data point instead of selecting main features.",
      "Writing the overview last or not at all \u2014 examiners look for it early.",
    ],
    usefulLanguage: [
      "\u201cThe share rose steadily from X to Y\u2026\u201d",
      "\u201cIn contrast, \u2026 remained relatively stable at around \u2026\u201d",
      "\u201cBy the end of the period, \u2026 had overtaken \u2026\u201d",
      "\u201cThe most striking feature is \u2026\u201d",
    ],
  },
  {
    id: "write-002",
    taskType: "Task 2",
    title: "Should Governments Fund Public Transport Over Road Building?",
    prompt:
      "Some people believe that governments should spend more money on public transport than on building new roads. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    planningFramework: [
      "Paragraph 1 \u2014 state the debate and your position clearly (agree/disagree/partial).",
      "Paragraph 2 \u2014 first reason with explanation + concrete example (city traffic, costs).",
      "Paragraph 3 \u2014 second reason OR concession + rebuttal (why roads alone fail).",
      "Paragraph 4 \u2014 restate position and widen the implication (urban planning, environment).",
    ],
    band7Outline:
      "A strong partial-agreement frame: public transport deserves priority in dense cities because one train line moves tens of thousands of people with a fraction of the road space, while new roads in growing cities fill with traffic within years. Concede that highways still matter for inter-city freight, then close by linking the position to long-term city planning rather than short-term congestion relief.",
    commonMistakes: [
      "Sitting on the fence without a clear thesis \u2014 \u201cto some extent\u201d needs a defined position.",
      "Generic examples (\u201cin some countries\u2026\u201d) instead of specific, plausible ones.",
      "Repeating the same reason in paragraphs 2 and 3 with different words.",
    ],
    usefulLanguage: [
      "\u201cWhile it is true that \u2026, this overlooks \u2026\u201d",
      "\u201cA compelling reason for this is \u2026\u201d",
      "\u201cThis is evident in cities such as \u2026, where \u2026\u201d",
      "\u201cUltimately, the priority should shift from \u2026 to \u2026\u201d",
    ],
  },
  {
    id: "write-003",
    taskType: "Task 1 General",
    title: "Letter to a Neighbour About Noise",
    prompt:
      "You have recently moved into a new neighbourhood. The flat next door plays loud music late at night, and it is affecting your sleep and work. Write a letter to your neighbour. In your letter: describe the problem, explain how it is affecting you, and suggest a solution. Write at least 150 words. You do not need to write any addresses.",
    planningFramework: [
      "Opening \u2014 friendly, state why you're writing (tone: polite, not angry).",
      "Body 1 \u2014 describe the problem specifically (when, how often, what kind of noise).",
      "Body 2 \u2014 explain the impact on sleep and work, without exaggeration.",
      "Closing \u2014 propose a concrete, reasonable solution and end warmly.",
    ],
    band7Outline:
      "Open with a courteous frame (\u201cI hope you're settling in well \u2014 I only recently moved in myself\u201d). Describe the music timing precisely (after midnight, several nights a week). Explain the effect factually (early shifts, difficulty concentrating). Propose a solution that saves the neighbour's face \u2014 headphones after eleven, or closing the shared wall's window \u2014 and close by reaffirming you'd like to remain on good terms.",
    commonMistakes: [
      "Aggressive tone \u2014 examiners penalise inappropriate register in General Task 1.",
      "Forgetting to cover all three bullet points \u2014 each must be clearly addressed.",
      "Over-formalising (\u201cDear Sir/Madam\u201d) when writing to a known person (\u201cDear [name]\u201d).",
    ],
    usefulLanguage: [
      "\u201cI'm writing to you about \u2026\u201d",
      "\u201cUnfortunately, \u2026 has been making it difficult to \u2026\u201d",
      "\u201cWould it be possible to \u2026?\u201d",
      "\u201cI'm sure we can find a way that works for both of us.\u201d",
    ],
  },
];

export interface SpeakingSet {
  id: string;
  title: string;
  part1: string[];
  part2: { cue: string; bullets: string[] };
  part3: string[];
  examinerNotes: string[];
}

export const SPEAKING_SETS: SpeakingSet[] = [
  {
    id: "speak-001",
    title: "Set 1 \u2014 Home, Journeys and Change",
    part1: [
      "Tell me about the area you live in.",
      "Do you prefer your current home to previous ones you've lived in? Why?",
      "What is the most useful thing in your home?",
      "How often do you travel by public transport?",
    ],
    part2: {
      cue: "Describe a journey that changed your daily routine.",
      bullets: [
        "where you went and how you travelled",
        "who you were with, if anyone",
        "what happened on the journey",
        "and explain why it changed your routine.",
      ],
    },
    part3: [
      "Why do some people find long journeys stressful while others enjoy them?",
      "How has technology changed the way people plan journeys?",
      "Do you think cities should limit the number of vehicles on their roads?",
      "In what ways has migration changed neighbourhoods in your country?",
    ],
    examinerNotes: [
      "Part 1: short, direct answers with one added detail are ideal \u2014 avoid monologues.",
      "Part 2: the bullets are scaffolding, not a checklist; weaving them naturally beats reciting them.",
      "Part 3: this is where Band 7+ is decided \u2014 extend answers with reasons, examples and hedging (\u201cit depends on\u2026\u201d).",
      "Lexical resource: \u201croute\u201d, \u201ccommute\u201d, \u201crelocate\u201d beat repeated \u201cgo\u201d/\u201ctravel\u201d.",
    ],
  },
  {
    id: "speak-002",
    title: "Set 2 \u2014 Technology and Learning",
    part1: [
      "Do you use your phone more for studying or for socialising?",
      "What was the most useful app you downloaded recently?",
      "Did you enjoy learning with technology as a child?",
      "How do people in your family share information with each other?",
    ],
    part2: {
      cue: "Describe a skill you learned from the internet.",
      bullets: [
        "what the skill was",
        "why you decided to learn it",
        "how you learned it online",
        "and explain how useful it has been.",
      ],
    },
    part3: [
      "Can everything be learned online, or do some skills need a teacher?",
      "How has the internet changed what counts as \u2018being educated\u2019?",
      "Do older people benefit from online learning as much as younger people?",
      "What risks are there in relying entirely on online information?",
    ],
    examinerNotes: [
      "Part 2: past-tense control matters here \u2014 mix past simple (\u201cI decided\u201d) with past continuous (\u201cI was practising\u201d).",
      "Part 3: comparative structures (\u201cwhereas\u201d, \u201cin contrast\u201d) score in grammatical range.",
      "Fluency tip: short thinking phrases (\u201cThat's an interesting question\u201d) are fine; long silences are not.",
    ],
  },
  {
    id: "speak-003",
    title: "Set 3 \u2014 Work, Money and the Future",
    part1: [
      "Do you work or are you a student?",
      "What do you like most about your studies or job?",
      "Is saving money common among young people in your country?",
      "What would you buy if you won a large prize?",
    ],
    part2: {
      cue: "Describe a job you think will be important in the future.",
      bullets: [
        "what the job involves",
        "what skills it requires",
        "why you think it will be important",
        "and explain whether you would consider doing it.",
      ],
    },
    part3: [
      "How are young people's career expectations different from their parents' generation?",
      "Should schools teach students about managing money?",
      "What effects might automation have on employment in developing countries?",
      "Is job satisfaction more important than salary? Why do you think so?",
    ],
    examinerNotes: [
      "Part 3 question on automation rewards speculation language: \u201cit's likely that\u2026\u201d, \u201cone could imagine\u2026\u201d.",
      "Opinion questions: state the view first, then the reason \u2014 don't bury the answer.",
      "Pronunciation note: \u201csalary\u201d stress is on the first syllable; \u201cautomation\u201d on the third.",
    ],
  },
];
