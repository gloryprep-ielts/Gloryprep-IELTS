// Original IELTS-style Listening practice content — written from scratch by GloryPrep editorial.
// Scripts are original; no material copied from Cambridge, Makkar or third parties.

export interface ListeningScript {
  id: string;
  part: 1 | 2 | 3 | 4;
  title: string;
  context: string;
  script: string[]; // speaker lines
}

export interface ListeningQuestion {
  id: number;
  type: "fill" | "mcq" | "matching" | "map" | "short";
  text: string;
  options?: string[];
  answer: string;
  rationale: string;
}

export interface ListeningTest {
  id: string;
  title: string;
  skill: "Listening";
  duration: string;
  questionsPerPart: number;
  scripts: ListeningScript[];
  questions: ListeningQuestion[];
  distractorNotes: string[];
}

export const LISTENING_TESTS: ListeningTest[] = [
  {
    id: "listen-001",
    title: "Listening Mock \u2014 Test 1",
    skill: "Listening",
    duration: "30 minutes",
    questionsPerPart: 4,
    scripts: [
      {
        id: "l1-p1",
        part: 1,
        title: "Part 1 \u2014 A flat enquiry",
        context: "A caller enquires about a shared flat in Kuala Lumpur.",
        script: [
          "Agent: Good morning, Harmony Homes, this is Priya speaking. How can I help?",
          "Caller: Hi, I'm calling about the shared flat you advertise on Jalan Sultan \u2014 the one near the LRT station.",
          "Agent: Yes, that's available from the first of next month. Was there anything specific you'd like to know?",
          "Caller: The rent \u2014 is it still six hundred and fifty ringgit a month, including utilities?",
          "Agent: It was, but the landlord raised it last week. It's now six hundred and ninety, utilities included. The water bill is capped, though \u2014 beyond fifty ringgit a month you pay the difference.",
          "Caller: I see. And is the room furnished?",
          "Agent: Partially \u2014 there's a bed and a wardrobe, but you'll need your own desk if you're studying. Most tenants bring one; there's a second-hand shop two streets away.",
          "Caller: That's fine. What about the deposit?",
          "Agent: Two months' rent, refundable at the end of the tenancy, provided there's no damage beyond normal wear.",
          "Caller: Understood. Could I arrange a viewing this Saturday, say around ten in the morning?",
          "Agent: Saturday works. Ten a.m. sharp \u2014 the current tenant leaves for his shift then. I'll send you the address and my number.",
        ],
      },
      {
        id: "l1-p2",
        part: 2,
        title: "Part 2 \u2014 A library induction talk",
        context: "A librarian welcomes new members to a university library.",
        script: [
          "Librarian: Welcome, everyone \u2014 I'm Amina from the Reference Desk, and over the next few minutes I'll show you how to get the most from this library. First, opening hours: during term time we're open from eight in the morning until eleven at night, and on Sundays from ten until six. During exam season, in May and November, we extend weeknight closing to midnight.",
          "Librarian: Borrowing rules are simple. Undergraduates can take out ten books at a time for three weeks; postgraduates get fifteen books for six weeks. Renewals are free through the app, as long as nobody else has reserved the item.",
          "Librarian: Now, a few things that surprise new members. The group study rooms on the second floor can be booked online \u2014 but only for a maximum of two hours per day, per group. And the printing station is on the ground floor, not next to the computers as people expect. It costs ten sen a page, cashless only.",
          "Librarian: Finally, the most important rule in the building: silence. The main hall is a silent zone at all times \u2014 conversations belong in the caf\u00e9 or the second-floor rooms. We're friendly about it, but the third reminder comes with a one-week borrowing suspension.",
        ],
      },
      {
        id: "l1-p3",
        part: 3,
        title: "Part 3 \u2014 Two students discussing a project",
        context: "Two students plan a presentation on urban food markets.",
        script: [
          "Dan: So we've got two weeks until the presentation. Shall we split the research?",
          "Mei: I think so. I'll take the economic side \u2014 turnover, vendor margins, that sort of thing. You could cover the social side, like how markets function as community spaces.",
          "Dan: Agreed. I found a study from Kuala Lumpur showing vendors there serve over a thousand customers a week on average. The interesting bit is that sixty percent of those customers come more than twice a week \u2014 the loyalty is much higher than in supermarkets.",
          "Mei: That fits my findings. In Dhaka, vendors told researchers their customers return for three reasons: price, freshness, and the relationship itself. The third one is what supermarkets can't copy.",
          "Dan: Right. For the presentation structure, I'd suggest we open with the customer data, then move to why the markets survive, and finish with what city planners should do about them.",
          "Mei: Sounds good. One thing \u2014 let's avoid charts with more than five data points each. Our lecturer specifically said overcrowded slides lose marks.",
          "Dan: Noted. Five points maximum. I'll draft the slides and you handle the speaker notes?",
          "Mei: Perfect. Let's rehearse together on Thursday \u2014 say seven in the library's group room?",
          "Dan: Booked. I'll bring the practice questions for the Q and A section too.",
        ],
      },
      {
        id: "l1-p4",
        part: 4,
        title: "Part 4 \u2014 A lecture on sleep and learning",
        context: "A university lecture about how sleep affects memory consolidation.",
        script: [
          "Lecturer: Good afternoon. Today I want to talk about something every one of you is doing wrong right now: studying through the night before an exam. The research on sleep and memory is now clear enough that we can state the mechanism with confidence, and it has three stages.",
          "Lecturer: Stage one happens while you're awake. New information arrives and is held temporarily in the hippocampus, in what researchers call a fragile trace. Think of it as a pencil sketch \u2014 legible, but easily smudged. Stage two happens during deep sleep, roughly the first four hours of the night. The hippocampus replays the day's sketch to the cortex, and the cortex converts it into long-term storage. This is called consolidation, and it is where learning actually becomes permanent.",
          "Lecturer: Stage three happens during REM sleep, in the second half of the night. Here the brain connects new information to what it already knows \u2014 it builds relationships between facts. Students who skip the final hours of sleep, which are rich in REM, remember the facts but lose the ability to link them. In exam terms: they can define terms but struggle with application questions.",
          "Lecturer: The practical implications are unambiguous. A student who studies for six hours and sleeps eight will typically outperform one who studies ten hours and sleeps four \u2014 on the same material, tested the next morning. The sleep isn't a reward for studying. It is part of the studying.",
        ],
      },
    ],
    questions: [
      { id: 1, type: "fill", text: "Part 1: The new rent, including utilities, is now ______ ringgit per month.", answer: "690", rationale: "Agent corrects the old figure: \u201cit's now six hundred and ninety, utilities included.\u201d The 650 is the distractor." },
      { id: 2, type: "fill", text: "Part 1: Beyond a water bill of ______ ringgit a month, the tenant pays the difference.", answer: "50", rationale: "Water bill is capped at fifty ringgit a month." },
      { id: 3, type: "mcq", text: "Part 1: The viewing is arranged for", options: ["Saturday at 10am", "Saturday afternoon", "Sunday morning", "Friday at 10am"], answer: "A", rationale: "Caller asks for Saturday around ten in the morning; agent confirms \u201cSaturday works. Ten a.m. sharp.\u201d" },
      { id: 4, type: "fill", text: "Part 1: The deposit equals ______ months' rent.", answer: "two", rationale: "Agent: \u201cTwo months' rent, refundable.\u201d" },
      { id: 5, type: "mcq", text: "Part 2: During exam season, the library closes at", options: ["10pm", "11pm", "midnight", "6pm"], answer: "C", rationale: "Term-time closing is 11pm; exam season weeknights extend to midnight \u2014 11pm is the distractor." },
      { id: 6, type: "fill", text: "Part 2: Group study rooms can be booked for a maximum of ______ hours per day.", answer: "two", rationale: "\u201conly for a maximum of two hours per day, per group.\u201d" },
      { id: 7, type: "matching", text: "Part 2: Match the penalty \u2014 a third reminder about talking in the silent zone results in", options: ["a fine", "a one-week borrowing suspension", "eviction from the library", "a report to the lecturer"], answer: "B", rationale: "Third reminder \u201ccomes with a one-week borrowing suspension.\u201d" },
      { id: 8, type: "fill", text: "Part 3: In the KL study, over ______ customers a week visit vendors on average.", answer: "1000", rationale: "\u201cvendors there serve over a thousand customers a week on average.\u201d" },
      { id: 9, type: "mcq", text: "Part 3: The lecturer's rule for charts is", options: ["no charts at all", "no more than five data points each", "at least five data points", "only bar charts"], answer: "B", rationale: "\u201clet's avoid charts with more than five data points each.\u201d" },
      { id: 10, type: "fill", text: "Part 3: Dan and Mei will rehearse in the library's ______ room.", answer: "group", rationale: "\u201csay seven in the library's group room.\u201d" },
      { id: 11, type: "mcq", text: "Part 4: New information is first held temporarily in the", options: ["cortex", "hippocampus", "brainstem", "cerebellum"], answer: "B", rationale: "Stage one: held temporarily in the hippocampus as a fragile trace." },
      { id: 12, type: "matching", text: "Part 4: Match each stage to its function \u2014 REM sleep is when the brain", options: ["stores facts permanently", "replays the day's information", "connects new information to existing knowledge", "erases irrelevant data"], answer: "C", rationale: "Stage three (REM): the brain connects new information to what it already knows." },
      { id: 13, type: "mcq", text: "Part 4: Students who skip the final hours of sleep tend to", options: ["forget everything", "remember facts but struggle to apply them", "sleep better the next night", "study more effectively"], answer: "B", rationale: "They remember facts but lose the ability to link them \u2014 application questions suffer." },
      { id: 14, type: "short", text: "Part 4: True or false — the lecturer claims sleep is a reward for studying.", answer: "FALSE", rationale: "Closing line: \u201cThe sleep isn't a reward for studying. It is part of the studying.\u201d" },
    ],
    distractorNotes: [
      "Part 1 uses the classic self-correction trap: the first rent figure (650) is immediately replaced (690).",
      "Part 2 traps 11pm against midnight \u2014 listen for the season qualifier.",
      "Part 4 traps cortex against hippocampus; both are mentioned, but only one holds the fragile trace.",
    ],
  },
];
