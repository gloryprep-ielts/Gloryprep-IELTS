/*
 * Auto-generated GloryPrep lesson data — 52 lessons per IELTS skill.
 * Do not hand-edit: regenerate via scripts/generate_lessons.mjs.
 */
export type LessonLevel = "Beginner" | "Intermediate" | "Advanced";
export type SkillId = "listening" | "reading" | "writing" | "speaking";

export interface LessonQuiz {
  q: string;
  choices: string[];
  a: number;
  why: string;
}

export interface Lesson {
  id: string;
  skill: SkillId;
  slug: string;
  num: number;
  title: string;
  description: string;
  objective: string;
  level: LessonLevel;
  minutes: number;
  order: number;
  quiz: LessonQuiz;
}

export const LESSONS: Lesson[] = [
  {
    "id": "listening-001",
    "skill": "listening",
    "slug": "listening-001",
    "num": 1,
    "title": "Form filling",
    "description": "Listening for names, addresses and phone numbers without missing a digit",
    "objective": "Master section-specific strategy as applied to form filling.",
    "level": "Beginner",
    "minutes": 10,
    "order": 0,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-002",
    "skill": "listening",
    "slug": "listening-002",
    "num": 2,
    "title": "Map labelling",
    "description": "Orienting yourself with north, landmarks and prepositions of place",
    "objective": "Master section-specific strategy as applied to map labelling.",
    "level": "Beginner",
    "minutes": 10,
    "order": 1,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-003",
    "skill": "listening",
    "slug": "listening-003",
    "num": 3,
    "title": "Multiple choice traps",
    "description": "How speakers correct themselves and how examiners exploit it",
    "objective": "Master section-specific strategy as applied to multiple choice traps.",
    "level": "Beginner",
    "minutes": 10,
    "order": 2,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-004",
    "skill": "listening",
    "slug": "listening-004",
    "num": 4,
    "title": "Conversation context",
    "description": "Extracting meaning from natural dialogue between two speakers",
    "objective": "Master section-specific strategy as applied to conversation context.",
    "level": "Beginner",
    "minutes": 10,
    "order": 3,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-005",
    "skill": "listening",
    "slug": "listening-005",
    "num": 5,
    "title": "Lecture comprehension",
    "description": "Following an academic monologue and tracking argument structure",
    "objective": "Master section-specific strategy as applied to lecture comprehension.",
    "level": "Beginner",
    "minutes": 10,
    "order": 4,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-006",
    "skill": "listening",
    "slug": "listening-006",
    "num": 6,
    "title": "Numbers and dates",
    "description": "Handling prices, percentages, years and telephone formats",
    "objective": "Master section-specific strategy as applied to numbers and dates.",
    "level": "Beginner",
    "minutes": 10,
    "order": 5,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-007",
    "skill": "listening",
    "slug": "listening-007",
    "num": 7,
    "title": "Spelling under pressure",
    "description": "Letter-by-letter transcription when the speaker spells it aloud",
    "objective": "Master section-specific strategy as applied to spelling under pressure.",
    "level": "Beginner",
    "minutes": 10,
    "order": 6,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-008",
    "skill": "listening",
    "slug": "listening-008",
    "num": 8,
    "title": "Signpost signals",
    "description": "Using 'however', 'finally', 'moving on' to anticipate the next question",
    "objective": "Master section-specific strategy as applied to signpost signals.",
    "level": "Beginner",
    "minutes": 10,
    "order": 7,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-009",
    "skill": "listening",
    "slug": "listening-009",
    "num": 9,
    "title": "Paraphrase matching",
    "description": "Recognising when the audio says something different in the same words",
    "objective": "Master section-specific strategy as applied to paraphrase matching.",
    "level": "Beginner",
    "minutes": 10,
    "order": 8,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-010",
    "skill": "listening",
    "slug": "listening-010",
    "num": 10,
    "title": "Synonyms in audio",
    "description": "Building a synonym bank for questions that never repeat the recording's wording",
    "objective": "Master section-specific strategy as applied to synonyms in audio.",
    "level": "Beginner",
    "minutes": 10,
    "order": 9,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-011",
    "skill": "listening",
    "slug": "listening-011",
    "num": 11,
    "title": "Distractor detection",
    "description": "Why the first answer you hear is often the trap, not the key",
    "objective": "Master section-specific strategy as applied to distractor detection.",
    "level": "Beginner",
    "minutes": 10,
    "order": 10,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-012",
    "skill": "listening",
    "slug": "listening-012",
    "num": 12,
    "title": "Prediction skills",
    "description": "Using question grammar to guess the answer type before the audio starts",
    "objective": "Master section-specific strategy as applied to prediction skills.",
    "level": "Beginner",
    "minutes": 10,
    "order": 11,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-013",
    "skill": "listening",
    "slug": "listening-013",
    "num": 13,
    "title": "British vs Australian accents",
    "description": "Training your ear on vowel shifts and intonation patterns",
    "objective": "Master section-specific strategy as applied to british vs australian accents.",
    "level": "Beginner",
    "minutes": 10,
    "order": 12,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-014",
    "skill": "listening",
    "slug": "listening-014",
    "num": 14,
    "title": "Fast speech decoding",
    "description": "Connected speech, elision and why 'going to' becomes 'gonna'",
    "objective": "Master section-specific strategy as applied to fast speech decoding.",
    "level": "Beginner",
    "minutes": 10,
    "order": 13,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-015",
    "skill": "listening",
    "slug": "listening-015",
    "num": 15,
    "title": "Note completion",
    "description": "Capturing missing words while keeping pace with the recording",
    "objective": "Master section-specific strategy as applied to note completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 14,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-016",
    "skill": "listening",
    "slug": "listening-016",
    "num": 16,
    "title": "Table completion",
    "description": "Tracking row and column shifts while answers come out of order",
    "objective": "Master section-specific strategy as applied to table completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 15,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-017",
    "skill": "listening",
    "slug": "listening-017",
    "num": 17,
    "title": "Summary completion",
    "description": "Filling gaps in a condensed version of a lecture",
    "objective": "Master section-specific strategy as applied to summary completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 16,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-018",
    "skill": "listening",
    "slug": "listening-018",
    "num": 18,
    "title": "Sentence completion",
    "description": "Grammar-driven guessing for gap-fill questions",
    "objective": "Master section-specific strategy as applied to sentence completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 17,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-019",
    "skill": "listening",
    "slug": "listening-019",
    "num": 19,
    "title": "Short-answer questions",
    "description": "Concise responses and word-count discipline",
    "objective": "Master section-specific strategy as applied to short-answer questions.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 18,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-020",
    "skill": "listening",
    "slug": "listening-020",
    "num": 20,
    "title": "Labelling diagrams",
    "description": "Matching spoken descriptions to parts of a visual",
    "objective": "Master section-specific strategy as applied to labelling diagrams.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 19,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-021",
    "skill": "listening",
    "slug": "listening-021",
    "num": 21,
    "title": "Form filling — part 2",
    "description": "Listening for names, addresses and phone numbers without missing a digit",
    "objective": "Master accent and pronunciation as applied to form filling.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 20,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-022",
    "skill": "listening",
    "slug": "listening-022",
    "num": 22,
    "title": "Map labelling — part 2",
    "description": "Orienting yourself with north, landmarks and prepositions of place",
    "objective": "Master accent and pronunciation as applied to map labelling.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 21,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-023",
    "skill": "listening",
    "slug": "listening-023",
    "num": 23,
    "title": "Multiple choice traps — part 2",
    "description": "How speakers correct themselves and how examiners exploit it",
    "objective": "Master accent and pronunciation as applied to multiple choice traps.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 22,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-024",
    "skill": "listening",
    "slug": "listening-024",
    "num": 24,
    "title": "Conversation context — part 2",
    "description": "Extracting meaning from natural dialogue between two speakers",
    "objective": "Master accent and pronunciation as applied to conversation context.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 23,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-025",
    "skill": "listening",
    "slug": "listening-025",
    "num": 25,
    "title": "Lecture comprehension — part 2",
    "description": "Following an academic monologue and tracking argument structure",
    "objective": "Master accent and pronunciation as applied to lecture comprehension.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 24,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-026",
    "skill": "listening",
    "slug": "listening-026",
    "num": 26,
    "title": "Numbers and dates — part 2",
    "description": "Handling prices, percentages, years and telephone formats",
    "objective": "Master accent and pronunciation as applied to numbers and dates.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 25,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-027",
    "skill": "listening",
    "slug": "listening-027",
    "num": 27,
    "title": "Spelling under pressure — part 2",
    "description": "Letter-by-letter transcription when the speaker spells it aloud",
    "objective": "Master accent and pronunciation as applied to spelling under pressure.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 26,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-028",
    "skill": "listening",
    "slug": "listening-028",
    "num": 28,
    "title": "Signpost signals — part 2",
    "description": "Using 'however', 'finally', 'moving on' to anticipate the next question",
    "objective": "Master accent and pronunciation as applied to signpost signals.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 27,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-029",
    "skill": "listening",
    "slug": "listening-029",
    "num": 29,
    "title": "Paraphrase matching — part 2",
    "description": "Recognising when the audio says something different in the same words",
    "objective": "Master accent and pronunciation as applied to paraphrase matching.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 28,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-030",
    "skill": "listening",
    "slug": "listening-030",
    "num": 30,
    "title": "Synonyms in audio — part 2",
    "description": "Building a synonym bank for questions that never repeat the recording's wording",
    "objective": "Master accent and pronunciation as applied to synonyms in audio.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 29,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-031",
    "skill": "listening",
    "slug": "listening-031",
    "num": 31,
    "title": "Distractor detection — part 2",
    "description": "Why the first answer you hear is often the trap, not the key",
    "objective": "Master accent and pronunciation as applied to distractor detection.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 30,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-032",
    "skill": "listening",
    "slug": "listening-032",
    "num": 32,
    "title": "Prediction skills — part 2",
    "description": "Using question grammar to guess the answer type before the audio starts",
    "objective": "Master accent and pronunciation as applied to prediction skills.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 31,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-033",
    "skill": "listening",
    "slug": "listening-033",
    "num": 33,
    "title": "British vs Australian accents — part 2",
    "description": "Training your ear on vowel shifts and intonation patterns",
    "objective": "Master accent and pronunciation as applied to british vs australian accents.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 32,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-034",
    "skill": "listening",
    "slug": "listening-034",
    "num": 34,
    "title": "Fast speech decoding — part 2",
    "description": "Connected speech, elision and why 'going to' becomes 'gonna'",
    "objective": "Master accent and pronunciation as applied to fast speech decoding.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 33,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-035",
    "skill": "listening",
    "slug": "listening-035",
    "num": 35,
    "title": "Note completion — part 2",
    "description": "Capturing missing words while keeping pace with the recording",
    "objective": "Master accent and pronunciation as applied to note completion.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 34,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-036",
    "skill": "listening",
    "slug": "listening-036",
    "num": 36,
    "title": "Table completion — part 2",
    "description": "Tracking row and column shifts while answers come out of order",
    "objective": "Master accent and pronunciation as applied to table completion.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 35,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-037",
    "skill": "listening",
    "slug": "listening-037",
    "num": 37,
    "title": "Summary completion — part 2",
    "description": "Filling gaps in a condensed version of a lecture",
    "objective": "Master accent and pronunciation as applied to summary completion, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 36,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-038",
    "skill": "listening",
    "slug": "listening-038",
    "num": 38,
    "title": "Sentence completion — part 2",
    "description": "Grammar-driven guessing for gap-fill questions",
    "objective": "Master accent and pronunciation as applied to sentence completion, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 37,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-039",
    "skill": "listening",
    "slug": "listening-039",
    "num": 39,
    "title": "Short-answer questions — part 2",
    "description": "Concise responses and word-count discipline",
    "objective": "Master accent and pronunciation as applied to short-answer questions, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 38,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-040",
    "skill": "listening",
    "slug": "listening-040",
    "num": 40,
    "title": "Labelling diagrams — part 2",
    "description": "Matching spoken descriptions to parts of a visual",
    "objective": "Master accent and pronunciation as applied to labelling diagrams, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 39,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-041",
    "skill": "listening",
    "slug": "listening-041",
    "num": 41,
    "title": "Form filling — part 3",
    "description": "Listening for names, addresses and phone numbers without missing a digit",
    "objective": "Master note-taking and prediction as applied to form filling, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 40,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-042",
    "skill": "listening",
    "slug": "listening-042",
    "num": 42,
    "title": "Map labelling — part 3",
    "description": "Orienting yourself with north, landmarks and prepositions of place",
    "objective": "Master note-taking and prediction as applied to map labelling, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 41,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-043",
    "skill": "listening",
    "slug": "listening-043",
    "num": 43,
    "title": "Multiple choice traps — part 3",
    "description": "How speakers correct themselves and how examiners exploit it",
    "objective": "Master note-taking and prediction as applied to multiple choice traps, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 42,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-044",
    "skill": "listening",
    "slug": "listening-044",
    "num": 44,
    "title": "Conversation context — part 3",
    "description": "Extracting meaning from natural dialogue between two speakers",
    "objective": "Master note-taking and prediction as applied to conversation context, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 43,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-045",
    "skill": "listening",
    "slug": "listening-045",
    "num": 45,
    "title": "Lecture comprehension — part 3",
    "description": "Following an academic monologue and tracking argument structure",
    "objective": "Master note-taking and prediction as applied to lecture comprehension, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 44,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-046",
    "skill": "listening",
    "slug": "listening-046",
    "num": 46,
    "title": "Numbers and dates — part 3",
    "description": "Handling prices, percentages, years and telephone formats",
    "objective": "Master note-taking and prediction as applied to numbers and dates, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 45,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-047",
    "skill": "listening",
    "slug": "listening-047",
    "num": 47,
    "title": "Spelling under pressure — part 3",
    "description": "Letter-by-letter transcription when the speaker spells it aloud",
    "objective": "Master note-taking and prediction as applied to spelling under pressure, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 46,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "listening-048",
    "skill": "listening",
    "slug": "listening-048",
    "num": 48,
    "title": "Signpost signals — part 3",
    "description": "Using 'however', 'finally', 'moving on' to anticipate the next question",
    "objective": "Master note-taking and prediction as applied to signpost signals, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 47,
    "quiz": {
      "q": "Which phrase signals the speaker is about to give the answer to the next question?",
      "choices": [
        "'Anyway, that's enough about me'",
        "'Moving on to the main issue'",
        "'As I was saying yesterday'",
        "'It's hard to remember now'"
      ],
      "a": 1,
      "why": "'Moving on to' is a classic signpost — the topic shift almost always brings the next answer."
    }
  },
  {
    "id": "listening-049",
    "skill": "listening",
    "slug": "listening-049",
    "num": 49,
    "title": "Paraphrase matching — part 3",
    "description": "Recognising when the audio says something different in the same words",
    "objective": "Master note-taking and prediction as applied to paraphrase matching, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 48,
    "quiz": {
      "q": "What is the best strategy before the recording starts?",
      "choices": [
        "Relax and wait",
        "Read all questions and predict answer types",
        "Write down random keywords",
        "Memorise the instructions again"
      ],
      "a": 1,
      "why": "Prediction narrows your attention to the exact information the question needs."
    }
  },
  {
    "id": "listening-050",
    "skill": "listening",
    "slug": "listening-050",
    "num": 50,
    "title": "Synonyms in audio — part 3",
    "description": "Building a synonym bank for questions that never repeat the recording's wording",
    "objective": "Master note-taking and prediction as applied to synonyms in audio, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 49,
    "quiz": {
      "q": "The audio says: 'There are plenty of parking spaces — I mean, the main car park is full, but side streets are fine.' The question asks about parking. Answer?",
      "choices": [
        "Plenty of parking",
        "No parking available",
        "Side street parking works",
        "Parking is expensive"
      ],
      "a": 2,
      "why": "The self-correction clarifies that the real option is the side streets."
    }
  },
  {
    "id": "listening-051",
    "skill": "listening",
    "slug": "listening-051",
    "num": 51,
    "title": "Distractor detection — part 3",
    "description": "Why the first answer you hear is often the trap, not the key",
    "objective": "Master note-taking and prediction as applied to distractor detection, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 50,
    "quiz": {
      "q": "The speaker says: 'I wanted the 9am slot, but actually the 2pm session works better.' Which time should you write?",
      "choices": [
        "9am",
        "2pm",
        "Both times",
        "Cannot be determined"
      ],
      "a": 1,
      "why": "Speakers often self-correct. The final decision, not the first mention, is the answer."
    }
  },
  {
    "id": "listening-052",
    "skill": "listening",
    "slug": "listening-052",
    "num": 52,
    "title": "Prediction skills — part 3",
    "description": "Using question grammar to guess the answer type before the audio starts",
    "objective": "Master note-taking and prediction as applied to prediction skills, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 51,
    "quiz": {
      "q": "You hear: 'The ticket is twenty pounds — oh wait, there's a student discount, so fifteen.' What do you write?",
      "choices": [
        "£20",
        "£15",
        "£17.50",
        "£5"
      ],
      "a": 1,
      "why": "Post-correction figures replace earlier ones; write the final confirmed amount."
    }
  },
  {
    "id": "reading-001",
    "skill": "reading",
    "slug": "reading-001",
    "num": 1,
    "title": "Skimming technique",
    "description": "Grasping the gist of 2,800 words in under three minutes",
    "objective": "Master skimming and scanning as applied to skimming technique.",
    "level": "Beginner",
    "minutes": 10,
    "order": 0,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-002",
    "skill": "reading",
    "slug": "reading-002",
    "num": 2,
    "title": "Scanning for specifics",
    "description": "Locating names, dates and numbers without reading line by line",
    "objective": "Master skimming and scanning as applied to scanning for specifics.",
    "level": "Beginner",
    "minutes": 10,
    "order": 1,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-003",
    "skill": "reading",
    "slug": "reading-003",
    "num": 3,
    "title": "True False Not Given",
    "description": "The subtle difference between 'not mentioned' and 'wrong'",
    "objective": "Master skimming and scanning as applied to true false not given.",
    "level": "Beginner",
    "minutes": 10,
    "order": 2,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-004",
    "skill": "reading",
    "slug": "reading-004",
    "num": 4,
    "title": "Yes No Not Given",
    "description": "Judging the author's opinion rather than factual claims",
    "objective": "Master skimming and scanning as applied to yes no not given.",
    "level": "Beginner",
    "minutes": 10,
    "order": 3,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-005",
    "skill": "reading",
    "slug": "reading-005",
    "num": 5,
    "title": "Matching headings",
    "description": "Pairing paragraphs with their central ideas in 12 minutes",
    "objective": "Master skimming and scanning as applied to matching headings.",
    "level": "Beginner",
    "minutes": 10,
    "order": 4,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-006",
    "skill": "reading",
    "slug": "reading-006",
    "num": 6,
    "title": "Matching information",
    "description": "Finding specific details scattered across a long passage",
    "objective": "Master skimming and scanning as applied to matching information.",
    "level": "Beginner",
    "minutes": 10,
    "order": 5,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-007",
    "skill": "reading",
    "slug": "reading-007",
    "num": 7,
    "title": "Matching features",
    "description": "Linking statements to people, theories or time periods",
    "objective": "Master skimming and scanning as applied to matching features.",
    "level": "Beginner",
    "minutes": 10,
    "order": 6,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-008",
    "skill": "reading",
    "slug": "reading-008",
    "num": 8,
    "title": "Sentence completion",
    "description": "Using grammatical fit to narrow down gap answers",
    "objective": "Master skimming and scanning as applied to sentence completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 7,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-009",
    "skill": "reading",
    "slug": "reading-009",
    "num": 9,
    "title": "Summary completion",
    "description": "Rebuilding the skeleton of an argument from a passage",
    "objective": "Master skimming and scanning as applied to summary completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 8,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-010",
    "skill": "reading",
    "slug": "reading-010",
    "num": 10,
    "title": "Note completion",
    "description": "Condensing academic content into structured notes",
    "objective": "Master skimming and scanning as applied to note completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 9,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-011",
    "skill": "reading",
    "slug": "reading-011",
    "num": 11,
    "title": "Table completion",
    "description": "Navigating structured data hidden inside prose",
    "objective": "Master skimming and scanning as applied to table completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 10,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-012",
    "skill": "reading",
    "slug": "reading-012",
    "num": 12,
    "title": "Flow-chart completion",
    "description": "Tracing processes and sequences in scientific texts",
    "objective": "Master skimming and scanning as applied to flow-chart completion.",
    "level": "Beginner",
    "minutes": 10,
    "order": 11,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-013",
    "skill": "reading",
    "slug": "reading-013",
    "num": 13,
    "title": "Multiple choice",
    "description": "Eliminating partially-correct options that sound plausible",
    "objective": "Master skimming and scanning as applied to multiple choice.",
    "level": "Beginner",
    "minutes": 10,
    "order": 12,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-014",
    "skill": "reading",
    "slug": "reading-014",
    "num": 14,
    "title": "Choosing titles",
    "description": "Deciding what a passage is really about, not what it mentions",
    "objective": "Master skimming and scanning as applied to choosing titles.",
    "level": "Beginner",
    "minutes": 10,
    "order": 13,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-015",
    "skill": "reading",
    "slug": "reading-015",
    "num": 15,
    "title": "Short answer questions",
    "description": "Precision answers within word limits",
    "objective": "Master skimming and scanning as applied to short answer questions.",
    "level": "Beginner",
    "minutes": 10,
    "order": 14,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-016",
    "skill": "reading",
    "slug": "reading-016",
    "num": 16,
    "title": "Academic vocabulary",
    "description": "Words that appear in 60% of band-7+ passages and what they mean",
    "objective": "Master skimming and scanning as applied to academic vocabulary.",
    "level": "Beginner",
    "minutes": 10,
    "order": 15,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-017",
    "skill": "reading",
    "slug": "reading-017",
    "num": 17,
    "title": "Reference words",
    "description": "Decoding 'this', 'such', 'former' — what exactly do they point at?",
    "objective": "Master skimming and scanning as applied to reference words.",
    "level": "Beginner",
    "minutes": 10,
    "order": 16,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-018",
    "skill": "reading",
    "slug": "reading-018",
    "num": 18,
    "title": "Inference reading",
    "description": "Answering questions whose answers are implied, never stated",
    "objective": "Master skimming and scanning as applied to inference reading.",
    "level": "Beginner",
    "minutes": 10,
    "order": 17,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-019",
    "skill": "reading",
    "slug": "reading-019",
    "num": 19,
    "title": "Tone and attitude",
    "description": "Detecting the author's stance in academic writing",
    "objective": "Master skimming and scanning as applied to tone and attitude.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 18,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-020",
    "skill": "reading",
    "slug": "reading-020",
    "num": 20,
    "title": "Long passage strategy",
    "description": "The question-first approach that saves 8 minutes per passage",
    "objective": "Master skimming and scanning as applied to long passage strategy.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 19,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-021",
    "skill": "reading",
    "slug": "reading-021",
    "num": 21,
    "title": "Skimming technique — part 2",
    "description": "Grasping the gist of 2,800 words in under three minutes",
    "objective": "Master question-type tactics as applied to skimming technique.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 20,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-022",
    "skill": "reading",
    "slug": "reading-022",
    "num": 22,
    "title": "Scanning for specifics — part 2",
    "description": "Locating names, dates and numbers without reading line by line",
    "objective": "Master question-type tactics as applied to scanning for specifics.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 21,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-023",
    "skill": "reading",
    "slug": "reading-023",
    "num": 23,
    "title": "True False Not Given — part 2",
    "description": "The subtle difference between 'not mentioned' and 'wrong'",
    "objective": "Master question-type tactics as applied to true false not given.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 22,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-024",
    "skill": "reading",
    "slug": "reading-024",
    "num": 24,
    "title": "Yes No Not Given — part 2",
    "description": "Judging the author's opinion rather than factual claims",
    "objective": "Master question-type tactics as applied to yes no not given.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 23,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-025",
    "skill": "reading",
    "slug": "reading-025",
    "num": 25,
    "title": "Matching headings — part 2",
    "description": "Pairing paragraphs with their central ideas in 12 minutes",
    "objective": "Master question-type tactics as applied to matching headings.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 24,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-026",
    "skill": "reading",
    "slug": "reading-026",
    "num": 26,
    "title": "Matching information — part 2",
    "description": "Finding specific details scattered across a long passage",
    "objective": "Master question-type tactics as applied to matching information.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 25,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-027",
    "skill": "reading",
    "slug": "reading-027",
    "num": 27,
    "title": "Matching features — part 2",
    "description": "Linking statements to people, theories or time periods",
    "objective": "Master question-type tactics as applied to matching features.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 26,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-028",
    "skill": "reading",
    "slug": "reading-028",
    "num": 28,
    "title": "Sentence completion — part 2",
    "description": "Using grammatical fit to narrow down gap answers",
    "objective": "Master question-type tactics as applied to sentence completion.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 27,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-029",
    "skill": "reading",
    "slug": "reading-029",
    "num": 29,
    "title": "Summary completion — part 2",
    "description": "Rebuilding the skeleton of an argument from a passage",
    "objective": "Master question-type tactics as applied to summary completion.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 28,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-030",
    "skill": "reading",
    "slug": "reading-030",
    "num": 30,
    "title": "Note completion — part 2",
    "description": "Condensing academic content into structured notes",
    "objective": "Master question-type tactics as applied to note completion.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 29,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-031",
    "skill": "reading",
    "slug": "reading-031",
    "num": 31,
    "title": "Table completion — part 2",
    "description": "Navigating structured data hidden inside prose",
    "objective": "Master question-type tactics as applied to table completion.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 30,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-032",
    "skill": "reading",
    "slug": "reading-032",
    "num": 32,
    "title": "Flow-chart completion — part 2",
    "description": "Tracing processes and sequences in scientific texts",
    "objective": "Master question-type tactics as applied to flow-chart completion.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 31,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-033",
    "skill": "reading",
    "slug": "reading-033",
    "num": 33,
    "title": "Multiple choice — part 2",
    "description": "Eliminating partially-correct options that sound plausible",
    "objective": "Master question-type tactics as applied to multiple choice.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 32,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-034",
    "skill": "reading",
    "slug": "reading-034",
    "num": 34,
    "title": "Choosing titles — part 2",
    "description": "Deciding what a passage is really about, not what it mentions",
    "objective": "Master question-type tactics as applied to choosing titles.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 33,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-035",
    "skill": "reading",
    "slug": "reading-035",
    "num": 35,
    "title": "Short answer questions — part 2",
    "description": "Precision answers within word limits",
    "objective": "Master question-type tactics as applied to short answer questions.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 34,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-036",
    "skill": "reading",
    "slug": "reading-036",
    "num": 36,
    "title": "Academic vocabulary — part 2",
    "description": "Words that appear in 60% of band-7+ passages and what they mean",
    "objective": "Master question-type tactics as applied to academic vocabulary.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 35,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-037",
    "skill": "reading",
    "slug": "reading-037",
    "num": 37,
    "title": "Reference words — part 2",
    "description": "Decoding 'this', 'such', 'former' — what exactly do they point at?",
    "objective": "Master question-type tactics as applied to reference words, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 36,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-038",
    "skill": "reading",
    "slug": "reading-038",
    "num": 38,
    "title": "Inference reading — part 2",
    "description": "Answering questions whose answers are implied, never stated",
    "objective": "Master question-type tactics as applied to inference reading, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 37,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-039",
    "skill": "reading",
    "slug": "reading-039",
    "num": 39,
    "title": "Tone and attitude — part 2",
    "description": "Detecting the author's stance in academic writing",
    "objective": "Master question-type tactics as applied to tone and attitude, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 38,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-040",
    "skill": "reading",
    "slug": "reading-040",
    "num": 40,
    "title": "Long passage strategy — part 2",
    "description": "The question-first approach that saves 8 minutes per passage",
    "objective": "Master question-type tactics as applied to long passage strategy, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 39,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-041",
    "skill": "reading",
    "slug": "reading-041",
    "num": 41,
    "title": "Skimming technique — part 3",
    "description": "Grasping the gist of 2,800 words in under three minutes",
    "objective": "Master time management as applied to skimming technique, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 40,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-042",
    "skill": "reading",
    "slug": "reading-042",
    "num": 42,
    "title": "Scanning for specifics — part 3",
    "description": "Locating names, dates and numbers without reading line by line",
    "objective": "Master time management as applied to scanning for specifics, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 41,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-043",
    "skill": "reading",
    "slug": "reading-043",
    "num": 43,
    "title": "True False Not Given — part 3",
    "description": "The subtle difference between 'not mentioned' and 'wrong'",
    "objective": "Master time management as applied to true false not given, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 42,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-044",
    "skill": "reading",
    "slug": "reading-044",
    "num": 44,
    "title": "Yes No Not Given — part 3",
    "description": "Judging the author's opinion rather than factual claims",
    "objective": "Master time management as applied to yes no not given, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 43,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-045",
    "skill": "reading",
    "slug": "reading-045",
    "num": 45,
    "title": "Matching headings — part 3",
    "description": "Pairing paragraphs with their central ideas in 12 minutes",
    "objective": "Master time management as applied to matching headings, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 44,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-046",
    "skill": "reading",
    "slug": "reading-046",
    "num": 46,
    "title": "Matching information — part 3",
    "description": "Finding specific details scattered across a long passage",
    "objective": "Master time management as applied to matching information, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 45,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-047",
    "skill": "reading",
    "slug": "reading-047",
    "num": 47,
    "title": "Matching features — part 3",
    "description": "Linking statements to people, theories or time periods",
    "objective": "Master time management as applied to matching features, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 46,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "reading-048",
    "skill": "reading",
    "slug": "reading-048",
    "num": 48,
    "title": "Sentence completion — part 3",
    "description": "Using grammatical fit to narrow down gap answers",
    "objective": "Master time management as applied to sentence completion, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 47,
    "quiz": {
      "q": "Best first move on a heading-matching task?",
      "choices": [
        "Read the whole passage first",
        "Read headings, then skim paragraphs for central ideas",
        "Answer question 1 immediately",
        "Highlight every noun"
      ],
      "a": 1,
      "why": "Headings describe central ideas; skimming each paragraph's topic sentence is the fastest match method."
    }
  },
  {
    "id": "reading-049",
    "skill": "reading",
    "slug": "reading-049",
    "num": 49,
    "title": "Summary completion — part 3",
    "description": "Rebuilding the skeleton of an argument from a passage",
    "objective": "Master time management as applied to summary completion, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 48,
    "quiz": {
      "q": "In matching features questions, a person can be used:",
      "choices": [
        "Once only",
        "Never twice",
        "More than once",
        "Only in the last paragraph"
      ],
      "a": 2,
      "why": "IELTS allows names/features to appear in multiple answers — always verify each match independently."
    }
  },
  {
    "id": "reading-050",
    "skill": "reading",
    "slug": "reading-050",
    "num": 50,
    "title": "Note completion — part 3",
    "description": "Condensing academic content into structured notes",
    "objective": "Master time management as applied to note completion, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 49,
    "quiz": {
      "q": "A paragraph's topic sentence usually appears:",
      "choices": [
        "Only at the end",
        "Most often at the beginning",
        "Only in the middle",
        "Nowhere — paragraphs have no topic sentences"
      ],
      "a": 1,
      "why": "Academic English typically fronts the main claim, then supports it."
    }
  },
  {
    "id": "reading-051",
    "skill": "reading",
    "slug": "reading-051",
    "num": 51,
    "title": "Table completion — part 3",
    "description": "Navigating structured data hidden inside prose",
    "objective": "Master time management as applied to table completion, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 50,
    "quiz": {
      "q": "Passage: 'Dr. Patel argued the policy reduced costs.' Question: 'Dr. Patel believed the policy was expensive.' True, False or Not Given?",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 1,
      "why": "The passage says costs were reduced — the opposite of expensive. That is a direct contradiction: False."
    }
  },
  {
    "id": "reading-052",
    "skill": "reading",
    "slug": "reading-052",
    "num": 52,
    "title": "Flow-chart completion — part 3",
    "description": "Tracing processes and sequences in scientific texts",
    "objective": "Master time management as applied to flow-chart completion, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 51,
    "quiz": {
      "q": "The passage mentions climate change three times but never states the author's view on carbon tax. Question about that view is:",
      "choices": [
        "True",
        "False",
        "Not Given",
        "Yes"
      ],
      "a": 2,
      "why": "Absence of information, not contradiction, makes it Not Given."
    }
  },
  {
    "id": "writing-001",
    "skill": "writing",
    "slug": "writing-001",
    "num": 1,
    "title": "Task 1 overview",
    "description": "Writing a factual overview before any data detail",
    "objective": "Master task 1 fundamentals as applied to task 1 overview.",
    "level": "Beginner",
    "minutes": 10,
    "order": 0,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-002",
    "skill": "writing",
    "slug": "writing-002",
    "num": 2,
    "title": "Line graph language",
    "description": "Describing rises, falls, peaks and plateaus with precision",
    "objective": "Master task 1 fundamentals as applied to line graph language.",
    "level": "Beginner",
    "minutes": 10,
    "order": 1,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-003",
    "skill": "writing",
    "slug": "writing-003",
    "num": 3,
    "title": "Bar chart comparison",
    "description": "Comparing categories without listing every number",
    "objective": "Master task 1 fundamentals as applied to bar chart comparison.",
    "level": "Beginner",
    "minutes": 10,
    "order": 2,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-004",
    "skill": "writing",
    "slug": "writing-004",
    "num": 4,
    "title": "Pie chart analysis",
    "description": "Talking about proportions, shares and relative size",
    "objective": "Master task 1 fundamentals as applied to pie chart analysis.",
    "level": "Beginner",
    "minutes": 10,
    "order": 3,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-005",
    "skill": "writing",
    "slug": "writing-005",
    "num": 5,
    "title": "Table interpretation",
    "description": "Selecting what matters in dense tabular data",
    "objective": "Master task 1 fundamentals as applied to table interpretation.",
    "level": "Beginner",
    "minutes": 10,
    "order": 4,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-006",
    "skill": "writing",
    "slug": "writing-006",
    "num": 6,
    "title": "Process diagrams",
    "description": "Sequencing stages with passive voice and linking words",
    "objective": "Master task 1 fundamentals as applied to process diagrams.",
    "level": "Beginner",
    "minutes": 10,
    "order": 5,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-007",
    "skill": "writing",
    "slug": "writing-007",
    "num": 7,
    "title": "Map changes",
    "description": "Describing development, demolition and relocation over time",
    "objective": "Master task 1 fundamentals as applied to map changes.",
    "level": "Beginner",
    "minutes": 10,
    "order": 6,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-008",
    "skill": "writing",
    "slug": "writing-008",
    "num": 8,
    "title": "Multiple charts",
    "description": "Synthesising two or three visuals into one coherent report",
    "objective": "Master task 1 fundamentals as applied to multiple charts.",
    "level": "Beginner",
    "minutes": 10,
    "order": 7,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-009",
    "skill": "writing",
    "slug": "writing-009",
    "num": 9,
    "title": "Task 2 structure",
    "description": "The four-paragraph architecture examiners expect",
    "objective": "Master task 1 fundamentals as applied to task 2 structure.",
    "level": "Beginner",
    "minutes": 10,
    "order": 8,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-010",
    "skill": "writing",
    "slug": "writing-010",
    "num": 10,
    "title": "Opinion essays",
    "description": "Taking a clear position and defending it across two body paragraphs",
    "objective": "Master task 1 fundamentals as applied to opinion essays.",
    "level": "Beginner",
    "minutes": 10,
    "order": 9,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-011",
    "skill": "writing",
    "slug": "writing-011",
    "num": 11,
    "title": "Discussion essays",
    "description": "Weighing both views before delivering your verdict",
    "objective": "Master task 1 fundamentals as applied to discussion essays.",
    "level": "Beginner",
    "minutes": 10,
    "order": 10,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-012",
    "skill": "writing",
    "slug": "writing-012",
    "num": 12,
    "title": "Problem-solution essays",
    "description": "Diagnosing causes and proposing realistic fixes",
    "objective": "Master task 1 fundamentals as applied to problem-solution essays.",
    "level": "Beginner",
    "minutes": 10,
    "order": 11,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-013",
    "skill": "writing",
    "slug": "writing-013",
    "num": 13,
    "title": "Advantage-disadvantage",
    "description": "Balancing benefits against drawbacks with nuance",
    "objective": "Master task 1 fundamentals as applied to advantage-disadvantage.",
    "level": "Beginner",
    "minutes": 10,
    "order": 12,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-014",
    "skill": "writing",
    "slug": "writing-014",
    "num": 14,
    "title": "Thesis statements",
    "description": "One sentence that tells the examiner exactly what you'll argue",
    "objective": "Master task 1 fundamentals as applied to thesis statements.",
    "level": "Beginner",
    "minutes": 10,
    "order": 13,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-015",
    "skill": "writing",
    "slug": "writing-015",
    "num": 15,
    "title": "Topic sentences",
    "description": "Opening each paragraph with a claim the rest of it proves",
    "objective": "Master task 1 fundamentals as applied to topic sentences.",
    "level": "Beginner",
    "minutes": 10,
    "order": 14,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-016",
    "skill": "writing",
    "slug": "writing-016",
    "num": 16,
    "title": "Supporting evidence",
    "description": "Using examples, data and reasoning to back every claim",
    "objective": "Master task 1 fundamentals as applied to supporting evidence.",
    "level": "Beginner",
    "minutes": 10,
    "order": 15,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-017",
    "skill": "writing",
    "slug": "writing-017",
    "num": 17,
    "title": "Cohesive devices",
    "description": "Linkers that raise coherence without sounding mechanical",
    "objective": "Master task 1 fundamentals as applied to cohesive devices.",
    "level": "Beginner",
    "minutes": 10,
    "order": 16,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-018",
    "skill": "writing",
    "slug": "writing-018",
    "num": 18,
    "title": "Paragraph unity",
    "description": "One idea per paragraph — and why examiners punish drift",
    "objective": "Master task 1 fundamentals as applied to paragraph unity.",
    "level": "Beginner",
    "minutes": 10,
    "order": 17,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-019",
    "skill": "writing",
    "slug": "writing-019",
    "num": 19,
    "title": "Academic vocabulary",
    "description": "Replacing everyday words with precise formal alternatives",
    "objective": "Master task 1 fundamentals as applied to academic vocabulary.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 18,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-020",
    "skill": "writing",
    "slug": "writing-020",
    "num": 20,
    "title": "Collocations",
    "description": "Word partnerships that make writing sound native, not translated",
    "objective": "Master task 1 fundamentals as applied to collocations.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 19,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-021",
    "skill": "writing",
    "slug": "writing-021",
    "num": 21,
    "title": "Task 1 overview — part 2",
    "description": "Writing a factual overview before any data detail",
    "objective": "Master task 2 argumentation as applied to task 1 overview.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 20,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-022",
    "skill": "writing",
    "slug": "writing-022",
    "num": 22,
    "title": "Line graph language — part 2",
    "description": "Describing rises, falls, peaks and plateaus with precision",
    "objective": "Master task 2 argumentation as applied to line graph language.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 21,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-023",
    "skill": "writing",
    "slug": "writing-023",
    "num": 23,
    "title": "Bar chart comparison — part 2",
    "description": "Comparing categories without listing every number",
    "objective": "Master task 2 argumentation as applied to bar chart comparison.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 22,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-024",
    "skill": "writing",
    "slug": "writing-024",
    "num": 24,
    "title": "Pie chart analysis — part 2",
    "description": "Talking about proportions, shares and relative size",
    "objective": "Master task 2 argumentation as applied to pie chart analysis.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 23,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-025",
    "skill": "writing",
    "slug": "writing-025",
    "num": 25,
    "title": "Table interpretation — part 2",
    "description": "Selecting what matters in dense tabular data",
    "objective": "Master task 2 argumentation as applied to table interpretation.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 24,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-026",
    "skill": "writing",
    "slug": "writing-026",
    "num": 26,
    "title": "Process diagrams — part 2",
    "description": "Sequencing stages with passive voice and linking words",
    "objective": "Master task 2 argumentation as applied to process diagrams.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 25,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-027",
    "skill": "writing",
    "slug": "writing-027",
    "num": 27,
    "title": "Map changes — part 2",
    "description": "Describing development, demolition and relocation over time",
    "objective": "Master task 2 argumentation as applied to map changes.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 26,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-028",
    "skill": "writing",
    "slug": "writing-028",
    "num": 28,
    "title": "Multiple charts — part 2",
    "description": "Synthesising two or three visuals into one coherent report",
    "objective": "Master task 2 argumentation as applied to multiple charts.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 27,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-029",
    "skill": "writing",
    "slug": "writing-029",
    "num": 29,
    "title": "Task 2 structure — part 2",
    "description": "The four-paragraph architecture examiners expect",
    "objective": "Master task 2 argumentation as applied to task 2 structure.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 28,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-030",
    "skill": "writing",
    "slug": "writing-030",
    "num": 30,
    "title": "Opinion essays — part 2",
    "description": "Taking a clear position and defending it across two body paragraphs",
    "objective": "Master task 2 argumentation as applied to opinion essays.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 29,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-031",
    "skill": "writing",
    "slug": "writing-031",
    "num": 31,
    "title": "Discussion essays — part 2",
    "description": "Weighing both views before delivering your verdict",
    "objective": "Master task 2 argumentation as applied to discussion essays.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 30,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-032",
    "skill": "writing",
    "slug": "writing-032",
    "num": 32,
    "title": "Problem-solution essays — part 2",
    "description": "Diagnosing causes and proposing realistic fixes",
    "objective": "Master task 2 argumentation as applied to problem-solution essays.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 31,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-033",
    "skill": "writing",
    "slug": "writing-033",
    "num": 33,
    "title": "Advantage-disadvantage — part 2",
    "description": "Balancing benefits against drawbacks with nuance",
    "objective": "Master task 2 argumentation as applied to advantage-disadvantage.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 32,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-034",
    "skill": "writing",
    "slug": "writing-034",
    "num": 34,
    "title": "Thesis statements — part 2",
    "description": "One sentence that tells the examiner exactly what you'll argue",
    "objective": "Master task 2 argumentation as applied to thesis statements.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 33,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-035",
    "skill": "writing",
    "slug": "writing-035",
    "num": 35,
    "title": "Topic sentences — part 2",
    "description": "Opening each paragraph with a claim the rest of it proves",
    "objective": "Master task 2 argumentation as applied to topic sentences.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 34,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-036",
    "skill": "writing",
    "slug": "writing-036",
    "num": 36,
    "title": "Supporting evidence — part 2",
    "description": "Using examples, data and reasoning to back every claim",
    "objective": "Master task 2 argumentation as applied to supporting evidence.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 35,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-037",
    "skill": "writing",
    "slug": "writing-037",
    "num": 37,
    "title": "Cohesive devices — part 2",
    "description": "Linkers that raise coherence without sounding mechanical",
    "objective": "Master task 2 argumentation as applied to cohesive devices, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 36,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-038",
    "skill": "writing",
    "slug": "writing-038",
    "num": 38,
    "title": "Paragraph unity — part 2",
    "description": "One idea per paragraph — and why examiners punish drift",
    "objective": "Master task 2 argumentation as applied to paragraph unity, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 37,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-039",
    "skill": "writing",
    "slug": "writing-039",
    "num": 39,
    "title": "Academic vocabulary — part 2",
    "description": "Replacing everyday words with precise formal alternatives",
    "objective": "Master task 2 argumentation as applied to academic vocabulary, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 38,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-040",
    "skill": "writing",
    "slug": "writing-040",
    "num": 40,
    "title": "Collocations — part 2",
    "description": "Word partnerships that make writing sound native, not translated",
    "objective": "Master task 2 argumentation as applied to collocations, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 39,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-041",
    "skill": "writing",
    "slug": "writing-041",
    "num": 41,
    "title": "Task 1 overview — part 3",
    "description": "Writing a factual overview before any data detail",
    "objective": "Master coherence and cohesion as applied to task 1 overview, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 40,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-042",
    "skill": "writing",
    "slug": "writing-042",
    "num": 42,
    "title": "Line graph language — part 3",
    "description": "Describing rises, falls, peaks and plateaus with precision",
    "objective": "Master coherence and cohesion as applied to line graph language, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 41,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-043",
    "skill": "writing",
    "slug": "writing-043",
    "num": 43,
    "title": "Bar chart comparison — part 3",
    "description": "Comparing categories without listing every number",
    "objective": "Master coherence and cohesion as applied to bar chart comparison, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 42,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-044",
    "skill": "writing",
    "slug": "writing-044",
    "num": 44,
    "title": "Pie chart analysis — part 3",
    "description": "Talking about proportions, shares and relative size",
    "objective": "Master coherence and cohesion as applied to pie chart analysis, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 43,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-045",
    "skill": "writing",
    "slug": "writing-045",
    "num": 45,
    "title": "Table interpretation — part 3",
    "description": "Selecting what matters in dense tabular data",
    "objective": "Master coherence and cohesion as applied to table interpretation, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 44,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-046",
    "skill": "writing",
    "slug": "writing-046",
    "num": 46,
    "title": "Process diagrams — part 3",
    "description": "Sequencing stages with passive voice and linking words",
    "objective": "Master coherence and cohesion as applied to process diagrams, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 45,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-047",
    "skill": "writing",
    "slug": "writing-047",
    "num": 47,
    "title": "Map changes — part 3",
    "description": "Describing development, demolition and relocation over time",
    "objective": "Master coherence and cohesion as applied to map changes, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 46,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "writing-048",
    "skill": "writing",
    "slug": "writing-048",
    "num": 48,
    "title": "Multiple charts — part 3",
    "description": "Synthesising two or three visuals into one coherent report",
    "objective": "Master coherence and cohesion as applied to multiple charts, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 47,
    "quiz": {
      "q": "Choose the stronger cohesive link between body paragraphs:",
      "choices": [
        "'Also'",
        "'Furthermore, the economic impact extends beyond direct savings'",
        "'And another thing'",
        "'Plus'"
      ],
      "a": 1,
      "why": "Specific, content-linked transitions raise Coherence & Cohesion scores above generic linkers."
    }
  },
  {
    "id": "writing-049",
    "skill": "writing",
    "slug": "writing-049",
    "num": 49,
    "title": "Task 2 structure — part 3",
    "description": "The four-paragraph architecture examiners expect",
    "objective": "Master coherence and cohesion as applied to task 2 structure, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 48,
    "quiz": {
      "q": "Minimum word counts for Writing tasks?",
      "choices": [
        "100 / 200",
        "150 / 250",
        "200 / 300",
        "250 / 400"
      ],
      "a": 1,
      "why": "Task 1 requires 150+ words and Task 2 requires 250+ words."
    }
  },
  {
    "id": "writing-050",
    "skill": "writing",
    "slug": "writing-050",
    "num": 50,
    "title": "Opinion essays — part 3",
    "description": "Taking a clear position and defending it across two body paragraphs",
    "objective": "Master coherence and cohesion as applied to opinion essays, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 49,
    "quiz": {
      "q": "Which collocation is correct?",
      "choices": [
        "'make a research'",
        "'do a mistake'",
        "'conduct research'",
        "'do an experiment research'"
      ],
      "a": 2,
      "why": "'Conduct research' is the natural verb-noun pairing; native speakers don't 'make' research."
    }
  },
  {
    "id": "writing-051",
    "skill": "writing",
    "slug": "writing-051",
    "num": 51,
    "title": "Discussion essays — part 3",
    "description": "Weighing both views before delivering your verdict",
    "objective": "Master coherence and cohesion as applied to discussion essays, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 50,
    "quiz": {
      "q": "In Task 1, what must always appear before any detailed data description?",
      "choices": [
        "A personal opinion",
        "An overview of main trends",
        "Every number from the chart",
        "A definition of the topic"
      ],
      "a": 1,
      "why": "An overview without detail is a Task 1 requirement — omitting it caps your Task Achievement score."
    }
  },
  {
    "id": "writing-052",
    "skill": "writing",
    "slug": "writing-052",
    "num": 52,
    "title": "Problem-solution essays — part 3",
    "description": "Diagnosing causes and proposing realistic fixes",
    "objective": "Master coherence and cohesion as applied to problem-solution essays, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 51,
    "quiz": {
      "q": "Which sentence works best as a Task 2 thesis?",
      "choices": [
        "'This essay will discuss the topic.'",
        "'Although technology aids learning, over-reliance weakens critical thinking, so a balanced approach is essential.'",
        "'Technology is good and bad.'",
        "'Many people think technology matters.'"
      ],
      "a": 1,
      "why": "A strong thesis states a clear position and previews the argument structure."
    }
  },
  {
    "id": "speaking-001",
    "skill": "speaking",
    "slug": "speaking-001",
    "num": 1,
    "title": "Part 1 warm-ups",
    "description": "Answering home, work and study questions beyond one sentence",
    "objective": "Master part 1 fluency as applied to part 1 warm-ups.",
    "level": "Beginner",
    "minutes": 10,
    "order": 0,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-002",
    "skill": "speaking",
    "slug": "speaking-002",
    "num": 2,
    "title": "Hobbies and interests",
    "description": "Speaking naturally about what you do in free time",
    "objective": "Master part 1 fluency as applied to hobbies and interests.",
    "level": "Beginner",
    "minutes": 10,
    "order": 1,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-003",
    "skill": "speaking",
    "slug": "speaking-003",
    "num": 3,
    "title": "Daily routines",
    "description": "Describing habits with varied present-tense structures",
    "objective": "Master part 1 fluency as applied to daily routines.",
    "level": "Beginner",
    "minutes": 10,
    "order": 2,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-004",
    "skill": "speaking",
    "slug": "speaking-004",
    "num": 4,
    "title": "Hometown descriptions",
    "description": "Painting your city with sensory, specific detail",
    "objective": "Master part 1 fluency as applied to hometown descriptions.",
    "level": "Beginner",
    "minutes": 10,
    "order": 3,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-005",
    "skill": "speaking",
    "slug": "speaking-005",
    "num": 5,
    "title": "Food and cooking",
    "description": "Talking about cuisine with adjectives beyond 'delicious'",
    "objective": "Master part 1 fluency as applied to food and cooking.",
    "level": "Beginner",
    "minutes": 10,
    "order": 4,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-006",
    "skill": "speaking",
    "slug": "speaking-006",
    "num": 6,
    "title": "Travel and transport",
    "description": "Narrating journeys with sequencing and opinion",
    "objective": "Master part 1 fluency as applied to travel and transport.",
    "level": "Beginner",
    "minutes": 10,
    "order": 5,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-007",
    "skill": "speaking",
    "slug": "speaking-007",
    "num": 7,
    "title": "Technology habits",
    "description": "Discussing devices and apps with real examples",
    "objective": "Master part 1 fluency as applied to technology habits.",
    "level": "Beginner",
    "minutes": 10,
    "order": 6,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-008",
    "skill": "speaking",
    "slug": "speaking-008",
    "num": 8,
    "title": "Weather and seasons",
    "description": "Going past 'it's hot' into cultural and personal angles",
    "objective": "Master part 1 fluency as applied to weather and seasons.",
    "level": "Beginner",
    "minutes": 10,
    "order": 7,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-009",
    "skill": "speaking",
    "slug": "speaking-009",
    "num": 9,
    "title": "Part 2 preparation",
    "description": "Using the 1-minute note window like a professional speaker",
    "objective": "Master part 1 fluency as applied to part 2 preparation.",
    "level": "Beginner",
    "minutes": 10,
    "order": 8,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-010",
    "skill": "speaking",
    "slug": "speaking-010",
    "num": 10,
    "title": "Describing a person",
    "description": "Structuring a 2-minute portrait of someone you know",
    "objective": "Master part 1 fluency as applied to describing a person.",
    "level": "Beginner",
    "minutes": 10,
    "order": 9,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-011",
    "skill": "speaking",
    "slug": "speaking-011",
    "num": 11,
    "title": "Describing a place",
    "description": "Building a vivid spatial narrative in two minutes",
    "objective": "Master part 1 fluency as applied to describing a place.",
    "level": "Beginner",
    "minutes": 10,
    "order": 10,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-012",
    "skill": "speaking",
    "slug": "speaking-012",
    "num": 12,
    "title": "Describing an event",
    "description": "Telling a story with a hook, complication and resolution",
    "objective": "Master part 1 fluency as applied to describing an event.",
    "level": "Beginner",
    "minutes": 10,
    "order": 11,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-013",
    "skill": "speaking",
    "slug": "speaking-013",
    "num": 13,
    "title": "Describing an object",
    "description": "Giving history, function and personal significance",
    "objective": "Master part 1 fluency as applied to describing an object.",
    "level": "Beginner",
    "minutes": 10,
    "order": 12,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-014",
    "skill": "speaking",
    "slug": "speaking-014",
    "num": 14,
    "title": "Storytelling arcs",
    "description": "The beginning-middle-end shape that keeps examiners engaged",
    "objective": "Master part 1 fluency as applied to storytelling arcs.",
    "level": "Beginner",
    "minutes": 10,
    "order": 13,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-015",
    "skill": "speaking",
    "slug": "speaking-015",
    "num": 15,
    "title": "Stalling gracefully",
    "description": "Fillers and reformulations that buy thinking time naturally",
    "objective": "Master part 1 fluency as applied to stalling gracefully.",
    "level": "Beginner",
    "minutes": 10,
    "order": 14,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-016",
    "skill": "speaking",
    "slug": "speaking-016",
    "num": 16,
    "title": "Extending answers",
    "description": "The 'what, why, how' expansion that fills the full two minutes",
    "objective": "Master part 1 fluency as applied to extending answers.",
    "level": "Beginner",
    "minutes": 10,
    "order": 15,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-017",
    "skill": "speaking",
    "slug": "speaking-017",
    "num": 17,
    "title": "Part 3 abstract topics",
    "description": "Moving from personal anecdotes to societal analysis",
    "objective": "Master part 1 fluency as applied to part 3 abstract topics.",
    "level": "Beginner",
    "minutes": 10,
    "order": 16,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-018",
    "skill": "speaking",
    "slug": "speaking-018",
    "num": 18,
    "title": "Comparing past and present",
    "description": "Using tense shifts to discuss change over time",
    "objective": "Master part 1 fluency as applied to comparing past and present.",
    "level": "Beginner",
    "minutes": 10,
    "order": 17,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-019",
    "skill": "speaking",
    "slug": "speaking-019",
    "num": 19,
    "title": "Speculating and hypothesising",
    "description": "Conditionals and modals for uncertain futures",
    "objective": "Master part 1 fluency as applied to speculating and hypothesising.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 18,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-020",
    "skill": "speaking",
    "slug": "speaking-020",
    "num": 20,
    "title": "Expressing opinions",
    "description": "Qualifying agreement and disagreement with sophistication",
    "objective": "Master part 1 fluency as applied to expressing opinions.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 19,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-021",
    "skill": "speaking",
    "slug": "speaking-021",
    "num": 21,
    "title": "Part 1 warm-ups — part 2",
    "description": "Answering home, work and study questions beyond one sentence",
    "objective": "Master part 2 long turn as applied to part 1 warm-ups.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 20,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-022",
    "skill": "speaking",
    "slug": "speaking-022",
    "num": 22,
    "title": "Hobbies and interests — part 2",
    "description": "Speaking naturally about what you do in free time",
    "objective": "Master part 2 long turn as applied to hobbies and interests.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 21,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-023",
    "skill": "speaking",
    "slug": "speaking-023",
    "num": 23,
    "title": "Daily routines — part 2",
    "description": "Describing habits with varied present-tense structures",
    "objective": "Master part 2 long turn as applied to daily routines.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 22,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-024",
    "skill": "speaking",
    "slug": "speaking-024",
    "num": 24,
    "title": "Hometown descriptions — part 2",
    "description": "Painting your city with sensory, specific detail",
    "objective": "Master part 2 long turn as applied to hometown descriptions.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 23,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-025",
    "skill": "speaking",
    "slug": "speaking-025",
    "num": 25,
    "title": "Food and cooking — part 2",
    "description": "Talking about cuisine with adjectives beyond 'delicious'",
    "objective": "Master part 2 long turn as applied to food and cooking.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 24,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-026",
    "skill": "speaking",
    "slug": "speaking-026",
    "num": 26,
    "title": "Travel and transport — part 2",
    "description": "Narrating journeys with sequencing and opinion",
    "objective": "Master part 2 long turn as applied to travel and transport.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 25,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-027",
    "skill": "speaking",
    "slug": "speaking-027",
    "num": 27,
    "title": "Technology habits — part 2",
    "description": "Discussing devices and apps with real examples",
    "objective": "Master part 2 long turn as applied to technology habits.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 26,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-028",
    "skill": "speaking",
    "slug": "speaking-028",
    "num": 28,
    "title": "Weather and seasons — part 2",
    "description": "Going past 'it's hot' into cultural and personal angles",
    "objective": "Master part 2 long turn as applied to weather and seasons.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 27,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-029",
    "skill": "speaking",
    "slug": "speaking-029",
    "num": 29,
    "title": "Part 2 preparation — part 2",
    "description": "Using the 1-minute note window like a professional speaker",
    "objective": "Master part 2 long turn as applied to part 2 preparation.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 28,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-030",
    "skill": "speaking",
    "slug": "speaking-030",
    "num": 30,
    "title": "Describing a person — part 2",
    "description": "Structuring a 2-minute portrait of someone you know",
    "objective": "Master part 2 long turn as applied to describing a person.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 29,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-031",
    "skill": "speaking",
    "slug": "speaking-031",
    "num": 31,
    "title": "Describing a place — part 2",
    "description": "Building a vivid spatial narrative in two minutes",
    "objective": "Master part 2 long turn as applied to describing a place.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 30,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-032",
    "skill": "speaking",
    "slug": "speaking-032",
    "num": 32,
    "title": "Describing an event — part 2",
    "description": "Telling a story with a hook, complication and resolution",
    "objective": "Master part 2 long turn as applied to describing an event.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 31,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-033",
    "skill": "speaking",
    "slug": "speaking-033",
    "num": 33,
    "title": "Describing an object — part 2",
    "description": "Giving history, function and personal significance",
    "objective": "Master part 2 long turn as applied to describing an object.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 32,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-034",
    "skill": "speaking",
    "slug": "speaking-034",
    "num": 34,
    "title": "Storytelling arcs — part 2",
    "description": "The beginning-middle-end shape that keeps examiners engaged",
    "objective": "Master part 2 long turn as applied to storytelling arcs.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 33,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-035",
    "skill": "speaking",
    "slug": "speaking-035",
    "num": 35,
    "title": "Stalling gracefully — part 2",
    "description": "Fillers and reformulations that buy thinking time naturally",
    "objective": "Master part 2 long turn as applied to stalling gracefully.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 34,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-036",
    "skill": "speaking",
    "slug": "speaking-036",
    "num": 36,
    "title": "Extending answers — part 2",
    "description": "The 'what, why, how' expansion that fills the full two minutes",
    "objective": "Master part 2 long turn as applied to extending answers.",
    "level": "Intermediate",
    "minutes": 14,
    "order": 35,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-037",
    "skill": "speaking",
    "slug": "speaking-037",
    "num": 37,
    "title": "Part 3 abstract topics — part 2",
    "description": "Moving from personal anecdotes to societal analysis",
    "objective": "Master part 2 long turn as applied to part 3 abstract topics, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 36,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-038",
    "skill": "speaking",
    "slug": "speaking-038",
    "num": 38,
    "title": "Comparing past and present — part 2",
    "description": "Using tense shifts to discuss change over time",
    "objective": "Master part 2 long turn as applied to comparing past and present, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 37,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-039",
    "skill": "speaking",
    "slug": "speaking-039",
    "num": 39,
    "title": "Speculating and hypothesising — part 2",
    "description": "Conditionals and modals for uncertain futures",
    "objective": "Master part 2 long turn as applied to speculating and hypothesising, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 38,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-040",
    "skill": "speaking",
    "slug": "speaking-040",
    "num": 40,
    "title": "Expressing opinions — part 2",
    "description": "Qualifying agreement and disagreement with sophistication",
    "objective": "Master part 2 long turn as applied to expressing opinions, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 39,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-041",
    "skill": "speaking",
    "slug": "speaking-041",
    "num": 41,
    "title": "Part 1 warm-ups — part 3",
    "description": "Answering home, work and study questions beyond one sentence",
    "objective": "Master part 3 discussion as applied to part 1 warm-ups, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 40,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-042",
    "skill": "speaking",
    "slug": "speaking-042",
    "num": 42,
    "title": "Hobbies and interests — part 3",
    "description": "Speaking naturally about what you do in free time",
    "objective": "Master part 3 discussion as applied to hobbies and interests, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 41,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-043",
    "skill": "speaking",
    "slug": "speaking-043",
    "num": 43,
    "title": "Daily routines — part 3",
    "description": "Describing habits with varied present-tense structures",
    "objective": "Master part 3 discussion as applied to daily routines, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 42,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-044",
    "skill": "speaking",
    "slug": "speaking-044",
    "num": 44,
    "title": "Hometown descriptions — part 3",
    "description": "Painting your city with sensory, specific detail",
    "objective": "Master part 3 discussion as applied to hometown descriptions, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 43,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-045",
    "skill": "speaking",
    "slug": "speaking-045",
    "num": 45,
    "title": "Food and cooking — part 3",
    "description": "Talking about cuisine with adjectives beyond 'delicious'",
    "objective": "Master part 3 discussion as applied to food and cooking, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 44,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-046",
    "skill": "speaking",
    "slug": "speaking-046",
    "num": 46,
    "title": "Travel and transport — part 3",
    "description": "Narrating journeys with sequencing and opinion",
    "objective": "Master part 3 discussion as applied to travel and transport, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 45,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-047",
    "skill": "speaking",
    "slug": "speaking-047",
    "num": 47,
    "title": "Technology habits — part 3",
    "description": "Discussing devices and apps with real examples",
    "objective": "Master part 3 discussion as applied to technology habits, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 46,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  },
  {
    "id": "speaking-048",
    "skill": "speaking",
    "slug": "speaking-048",
    "num": 48,
    "title": "Weather and seasons — part 3",
    "description": "Going past 'it's hot' into cultural and personal angles",
    "objective": "Master part 3 discussion as applied to weather and seasons, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 47,
    "quiz": {
      "q": "Part 3 asks about society, not you. Best approach?",
      "choices": [
        "Keep answering with personal stories",
        "Generalise with examples: 'In many developing countries...'",
        "'I don't know anything about society'",
        "Refuse to answer"
      ],
      "a": 1,
      "why": "Part 3 rewards abstract, evidence-backed discussion — 'many people', 'in most cities' framing shows range."
    }
  },
  {
    "id": "speaking-049",
    "skill": "speaking",
    "slug": "speaking-049",
    "num": 49,
    "title": "Part 2 preparation — part 3",
    "description": "Using the 1-minute note window like a professional speaker",
    "objective": "Master part 3 discussion as applied to part 2 preparation, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 48,
    "quiz": {
      "q": "Which filler sounds most natural when buying thinking time?",
      "choices": [
        "'Uhhhhhh'",
        "'That's an interesting question — let me think about that for a second'",
        "Long silence",
        "'Sorry?'"
      ],
      "a": 1,
      "why": "Verbalised stalling signals fluency control; silence and panic fillers break flow."
    }
  },
  {
    "id": "speaking-050",
    "skill": "speaking",
    "slug": "speaking-050",
    "num": 50,
    "title": "Describing a person — part 3",
    "description": "Structuring a 2-minute portrait of someone you know",
    "objective": "Master part 3 discussion as applied to describing a person, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 49,
    "quiz": {
      "q": "A strong Part 2 ending typically:",
      "choices": [
        "Stops mid-sentence",
        "Reflects briefly: 'So overall, it meant a lot because...'",
        "Repeats the opening sentence",
        "Asks the examiner a question"
      ],
      "a": 1,
      "why": "A quick reflective close signals you've completed the narrative arc within two minutes."
    }
  },
  {
    "id": "speaking-051",
    "skill": "speaking",
    "slug": "speaking-051",
    "num": 51,
    "title": "Describing a place — part 3",
    "description": "Building a vivid spatial narrative in two minutes",
    "objective": "Master part 3 discussion as applied to describing a place, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 50,
    "quiz": {
      "q": "Examiner: 'Do you like cooking?' Which answer shows best fluency for Part 1?",
      "choices": [
        "'Yes.'",
        "'Yes, I do. I actually cook almost every evening — it helps me unwind after classes, and I've recently started experimenting with Thai curries.'",
        "'Cooking food is good for health.'",
        "'No comment.'"
      ],
      "a": 1,
      "why": "Part 1 rewards 2–3 sentence answers with personal detail, not one-word replies or lectures."
    }
  },
  {
    "id": "speaking-052",
    "skill": "speaking",
    "slug": "speaking-052",
    "num": 52,
    "title": "Describing an event — part 3",
    "description": "Telling a story with a hook, complication and resolution",
    "objective": "Master part 3 discussion as applied to describing an event, at exam-grade difficulty.",
    "level": "Advanced",
    "minutes": 18,
    "order": 51,
    "quiz": {
      "q": "How should you use the 1-minute preparation in Part 2?",
      "choices": [
        "Write full sentences to read aloud",
        "Jot keywords for each prompt bullet plus a strong opening line",
        "Plan nothing — improvise",
        "Memorise a generic story"
      ],
      "a": 1,
      "why": "Keywords keep you flexible; full sentences slow you down and sound rehearsed."
    }
  }
];

export function getLessonsBySkill(skill: SkillId): Lesson[] {
  return LESSONS.filter((l) => l.skill === skill);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
