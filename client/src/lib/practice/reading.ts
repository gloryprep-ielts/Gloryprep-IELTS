// Original IELTS-style Reading practice content — written from scratch by GloryPrep editorial.
// Not copied from Cambridge, Makkar, or any third-party publisher.

export interface ReadingQuestion {
  id: number;
  type: "mcq" | "tfng" | "matching" | "fill" | "short";
  text: string;
  options?: string[]; // for mcq
  answer: string; // correct option letter (A/B/C/D), TRUE/FALSE/NOT GIVEN, or exact text
  rationale: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: string;
  difficulty: "Medium" | "Hard";
  wordCount: number;
  body: string[]; // paragraphs
  questions: ReadingQuestion[];
  tips: string[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: "read-001",
    title: "The Silent Migration of the Monsoon",
    topic: "Earth and environmental science",
    difficulty: "Medium",
    wordCount: 780,
    body: [
      "Every year between June and September, an invisible river of air moves across the Bay of Bengal. Meteorologists call it a pressure reversal; farmers in coastal Bangladesh simply call it \u201cthe breath of the sea.\u201d The monsoon is usually discussed as weather, but it is better understood as a migration \u2014 one of the largest seasonal movements of any fluid on the planet, carrying more water than all the world's rivers combined.",
      "The mechanism begins in late May, when the landmass of South Asia heats faster than the surrounding ocean. Warm air rises over the subcontinent, lowering surface pressure, while the Indian Ocean remains comparatively cool and dense. The resulting pressure gradient draws moist ocean air inland at speeds that can exceed forty kilometres per hour. When this air is forced upward by the Himalayas and the hills of Myanmar, it cools, its moisture condenses, and rain falls in quantities that reshape landscapes.",
      "What fascinates researchers is not the rain itself but the regularity with which it arrives. Satellite records from the past three decades show the monsoon onset in Dhaka occurring within a nine-day window in ninety-two percent of years. This precision is remarkable given that the system involves interactions between ocean temperature, snow cover in Tibet, and wind patterns over the Pacific that are still not fully mapped. Local prediction, however, has always been more than guesswork: farmers in the Haor wetlands of Sylhet have long read the flowering of the krishnachura tree as a signal that heavy rain is four to six weeks away.",
      "The economic stakes are enormous. Rice cultivation in Bangladesh depends on the monsoon delivering between 1,200 and 2,000 millimetres of rain across the growing season. A delay of even two weeks can reduce yields by a fifth, while an early, violent onset can flatten seedlings before they establish roots. Hydroelectric planners in neighbouring countries face the mirror problem: too little rain means empty reservoirs through the winter dry season, when electricity demand peaks.",
      "Climate models suggest the monsoon is becoming less predictable at the margins. Total annual rainfall has not changed dramatically, but its distribution has: longer dry spells punctuated by more intense bursts. Engineers in Kuala Lumpur, nine hundred kilometres to the southeast, report a similar signature in their own rainfall records, leading some researchers to argue that the Bay of Bengal system and the Southeast Asian monsoon are shifting together. Urban drainage designed for the rainfall patterns of 1980 now underestimates peak flows by as much as thirty percent in several districts.",
      "Yet the monsoon is not only a hazard. In the Sundarbans, the mangrove forest that guards the southern coast, seasonal flooding deposits nutrient-rich sediment that sustains the world's largest tiger population outside any single national park. Fishermen time their hilsa catches to the river swell, a practice so old that the fish's migration route has its own name in three languages. The monsoon, in other words, is an engine of both risk and abundance \u2014 and learning to read it remains one of the most valuable skills a person in this region can hold.",
    ],
    questions: [
      { id: 1, type: "mcq", text: "According to the passage, the monsoon is best understood as", options: ["a seasonal flood", "a migration of fluid", "a pressure accident", "a farmer's calendar"], answer: "B", rationale: "Paragraph 1 explicitly says \u201cit is better understood as a migration \u2014 one of the largest seasonal movements of any fluid.\u201d" },
      { id: 2, type: "tfng", text: "The land heats faster than the ocean in late May.", answer: "TRUE", rationale: "Paragraph 2: \u201cthe landmass of South Asia heats faster than the surrounding ocean.\u201d" },
      { id: 3, type: "tfng", text: "Satellites have recorded the monsoon since the 1950s.", answer: "NOT GIVEN", rationale: "The passage mentions records \u201cfrom the past three decades\u201d; no information about the 1950s is given." },
      { id: 4, type: "fill", text: "Farmers in Sylhet use the flowering of the ______ tree to predict heavy rain.", answer: "krishnachura", rationale: "Paragraph 3 names the krishnachura tree as the farmers' signal." },
      { id: 5, type: "mcq", text: "A two-week monsoon delay can", options: ["increase yields", "reduce yields by a fifth", "fill reservoirs early", "stop tiger migration"], answer: "B", rationale: "Paragraph 4: \u201cA delay of even two weeks can reduce yields by a fifth.\u201d" },
      { id: 6, type: "matching", text: "Match the region with its monsoon problem: Kuala Lumpur \u2014", options: ["empty reservoirs", "drainage underestimates peak flows", "flat rice seedlings", "tiger habitat loss"], answer: "B", rationale: "Paragraph 5: KL drainage \u201cnow underestimates peak flows by as much as thirty percent.\u201d" },
      { id: 7, type: "tfng", text: "Total annual monsoon rainfall has fallen sharply in recent decades.", answer: "FALSE", rationale: "Paragraph 5: \u201cTotal annual rainfall has not changed dramatically, but its distribution has.\u201d" },
      { id: 8, type: "short", text: "What does the monsoon deposit in the Sundarbans that sustains the tiger population?", answer: "sediment", rationale: "Paragraph 6: \u201cseasonal flooding deposits nutrient-rich sediment.\u201d" },
    ],
    tips: [
      "Read the questions before the passage \u2014 this passage rewards knowing where to look.",
      "TF/NG/NOT GIVEN: the statement must match the passage exactly to be TRUE; similar wording is not enough.",
      "Fill-in answers must come word-for-word from the text; \u201ckrishnachura\u201d is a single-word answer.",
    ],
  },
  {
    id: "read-002",
    title: "Why Night Markets Outlive Malls",
    topic: "Urban economics and culture",
    difficulty: "Medium",
    wordCount: 810,
    body: [
      "Walk through Petaling Street in Kuala Lumpur or New Market in Dhaka after nine in the evening and you will find something that no shopping mall has managed to replicate: density of human exchange. Stalls overlap, customers bargain, vendors call out, and the whole system adjusts itself minute by minute without any central management. Urban economists who have studied both formats increasingly conclude that the night market is not a primitive form of retail waiting to be replaced, but a distinct technology of commerce that survives for reasons malls cannot copy.",
      "The first reason is cost structure. A mall stall requires a lease signed months in advance, fit-out costs, and fixed overhead regardless of sales. A night market vendor can start the evening with a folding table and a hundred ringgit of stock, and if the location proves wrong, simply move next week. This extreme flexibility means the market constantly self-corrects: unsuccessful vendors leave, successful ones expand, and the overall mix of goods tracks real demand far faster than any mall's leasing office could.",
      "The second reason is information. In a mall, prices are fixed and printed; in a night market, price is a conversation. Bargaining transmits information in both directions \u2014 the vendor learns what a customer will pay, and the customer learns what the item is actually worth. Economists call this price discovery, and it happens at a speed and granularity that fixed pricing cannot match. A customer who buys the same shirt three weeks running learns that the vendor will eventually come down to a third of the asking price; a vendor who prices too high learns within an hour, because no one stops at the stall.",
      "The third reason is social infrastructure. Night markets function as informal meeting places: families eat together at shared tables, teenagers gather near the drink stalls, and elderly regulars hold their usual positions for decades. Researchers measuring \u201csocial capital\u201d \u2014 the trust and connections that make communities function \u2014 consistently find higher levels around informal markets than around gated malls. This matters commercially: repeat visits driven by social habit are more stable than visits driven by promotional campaigns.",
      "None of this means malls are disappearing. What the evidence suggests is a division of labour. Malls excel at climate-controlled, branded, warranty-backed purchases \u2014 electronics, international fashion, family entertainment. Night markets excel at everything that benefits from variety, flexibility and human contact. Cities that have tried to replace one with the other have generally learned the lesson once: the vendors return, the crowds return, and the economics return with them.",
      "For city planners in rapidly growing South and Southeast Asian cities, the practical implication is surprisingly simple. Rather than choosing between the two formats, the winning strategy appears to be coexistence \u2014 formal retail corridors that connect to, rather than compete with, the informal networks that have always served the majority of daily commerce.",
    ],
    questions: [
      { id: 1, type: "mcq", text: "The writer's main argument is that night markets are", options: ["fading relics", "a distinct retail technology", "cheaper copies of malls", "a planning problem"], answer: "B", rationale: "Paragraph 1: the market is \u201ca distinct technology of commerce that survives for reasons malls cannot copy.\u201d" },
      { id: 2, type: "tfng", text: "Night market vendors must sign leases months in advance.", answer: "FALSE", rationale: "Paragraph 2 states the opposite: mall stalls require advance leases, night vendors use folding tables.",
 },
      { id: 3, type: "fill", text: "The process by which bargaining reveals true value is called price ______.", answer: "discovery", rationale: "Paragraph 3: \u201cEconomists call this price discovery.\u201d" },
      { id: 4, type: "mcq", text: "According to the passage, fixed pricing in malls", options: ["shares information faster", "cannot match bargaining's price discovery", "is preferred by vendors", "lowers social capital"], answer: "B", rationale: "Paragraph 3: fixed pricing happens at a speed and granularity \u201cthat fixed pricing cannot match.\u201d" },
      { id: 5, type: "matching", text: "Match the benefit to its source: \u201cstable repeat visits\u201d come from", options: ["promotional campaigns", "social habit", "fixed prices", "warranties"], answer: "B", rationale: "Paragraph 4: repeat visits driven by social habit \u201care more stable than visits driven by promotional campaigns.\u201d" },
      { id: 6, type: "tfng", text: "Researchers have found lower social capital around informal markets than malls.", answer: "FALSE", rationale: "Paragraph 4: higher levels around informal markets than gated malls." },
      { id: 7, type: "short", text: "Malls excel at purchases that are climate-controlled, branded and ______-backed.", answer: "warranty", rationale: "Paragraph 5 lists \u201cclimate-controlled, branded, warranty-backed purchases.\u201d" },
      { id: 8, type: "mcq", text: "The recommended strategy for city planners is", options: ["replace night markets", "coexistence of formats", "ban informal vendors", "convert malls to markets"], answer: "B", rationale: "Paragraph 6: \u201cthe winning strategy appears to be coexistence.\u201d" },
    ],
    tips: [
      "Matching questions: read the whole option list before answering; two options are deliberately similar.",
      "TRUE/FALSE only concerns facts in the passage \u2014 ignore your own knowledge of night markets.",
      "Main-idea questions: the thesis appears in paragraph 1; check the last paragraph for the conclusion.",
    ],
  },
  {
    id: "read-003",
    title: "The Memory Palace Method: Evidence and Limits",
    topic: "Cognitive psychology",
    difficulty: "Hard",
    wordCount: 860,
    body: [
      "Two thousand years ago, the Greek poet Simonides is said to have survived a banquet hall collapse because he remembered exactly where every guest had been sitting. From that story grew the \u201cmethod of loci\u201d \u2014 the memory palace \u2014 in which information is attached to imaginary locations and later retrieved by walking through them in the mind. The method faded with the printing press and returned with competitive memory sport. Now, a body of neuroimaging research is testing whether it works, for whom, and at what cost.",
      "The strongest evidence comes from a 2017 study of forty-nine healthy adults. After six weeks of training, participants using the method of loci roughly doubled the number of words they could recall from a list of seventy-two, and the improvement persisted for at least four months. Crucially, brain scans showed the technique changed how the hippocampus \u2014 the region responsible for forming new memories \u2014 communicated with spatial-processing areas. In other words, the method did not merely add effort; it reorganised the brain's routing of information.",
      "However, the same research exposed a limitation that marketing materials rarely mention. The gains were specific to the trained task: participants did not become generally better at remembering phone numbers, faces, or where they parked. Memory training, it seems, improves the specific circuits you exercise, not memory in general. This pattern \u2014 transfer failure \u2014 has been found repeatedly in studies of brain-training games and appears equally in palace-method research.",
      "A second limitation concerns cognitive load. Constructing a palace for a short list takes seconds; constructing one for a three-hour lecture requires maintaining dozens of vivid, distinct images simultaneously. In experiments comparing the method against simple rehearsal for continuous prose, the advantage shrank as material length increased, and disappeared entirely beyond roughly twenty minutes of content. The palace is a precision instrument, not a warehouse.",
      "What does this mean for exam candidates? The evidence supports using the method for exactly the things it handles best: ordered lists, numbered criteria, vocabulary sets, and the structure of a prepared argument. A speaking candidate who attaches each Part 2 cue-card element to a room in their childhood home is exploiting the technique within its proven range. A candidate who builds one palace to hold an entire textbook should expect disappointment.",
      "The final research note is perhaps the most practical. In every study that measured it, participants reported that the method felt harder than it was worth during the learning weeks \u2014 and still kept using it afterwards, because retrieval became so fast. The discomfort is part of the mechanism, not a sign it is failing.",
    ],
    questions: [
      { id: 1, type: "matching", text: "Match each finding to its study type: \u201cgains did not transfer to phone numbers\u201d was found in", options: ["neuroimaging scans", "transfer-failure experiments", "banquet hall records", "memory sport results"], answer: "B", rationale: "Paragraph 3 discusses transfer failure for phone numbers, faces and parking." },
      { id: 2, type: "tfng", text: "The 2017 study tested forty-nine competitive athletes.", answer: "NOT GIVEN", rationale: "The participants were \u201cfourty-nine healthy adults\u201d (forty-nine); nothing says they were athletes." },
      { id: 3, type: "fill", text: "The brain region that changed its communication patterns was the ______.", answer: "hippocampus", rationale: "Paragraph 2 names the hippocampus explicitly." },
      { id: 4, type: "mcq", text: "The writer calls the memory palace \u201ca precision instrument, not a warehouse\u201d because", options: ["it is expensive", "it fails with very long continuous material", "it only works for athletes", "it damages memory"], answer: "B", rationale: "Paragraph 4: the advantage \u201cdisappeared entirely beyond roughly twenty minutes of content.\u201d" },
      { id: 5, type: "tfng", text: "Memory palace training improves general memory ability.", answer: "FALSE", rationale: "Paragraph 3: participants \u201cdid not become generally better at remembering\u201d other things." },
      { id: 6, type: "short", text: "The method works best for ordered lists, numbered criteria, vocabulary sets and ______.", answer: "structure", rationale: "Paragraph 5: \u201cand the structure of a prepared argument.\u201d" },
      { id: 7, type: "mcq", text: "Participants' reports about the learning weeks were that the method felt", options: ["effortless", "harder than worthwhile, but worth continuing", "impossible", "irrelevant"], answer: "B", rationale: "Paragraph 6: \u201cparticipants reported that the method felt harder than it was worth during the learning weeks \u2014 and still kept using it afterwards.\u201d" },
      { id: 8, type: "tfng", text: "Simonides' survival story is confirmed by archaeological evidence.", answer: "NOT GIVEN", rationale: "The passage says he \u201cis said to have survived\u201d; no archaeology is mentioned." },
    ],
    tips: [
      "Hard passages use qualifiers (\u201crather than\u201d, \u201cnot merely\u201d, \u201cbut\u201d) \u2014 the answer usually sits right after them.",
      "NOT GIVEN vs FALSE: FALSE contradicts the text; NOT GIVEN means the text is silent.",
      "Summary completion answers must fit grammatically as well as factually.",
    ],
  },
];
