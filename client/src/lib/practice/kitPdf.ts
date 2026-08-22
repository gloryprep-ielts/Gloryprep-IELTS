// Mock Test Kit PDF generator — original GloryPrep content, generated client-side.
// Uses jsPDF to build printable exam-condition materials.

import { jsPDF } from "jspdf";

function header(doc: jsPDF, title: string, subtitle: string) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(30, 25, 20);
  doc.text("GLORYPREP IELTS", 20, 20);
  doc.setFontSize(12);
  doc.setTextColor(176, 100, 40);
  doc.text(title, 20, 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(110, 100, 90);
  doc.text(subtitle, 20, 34);
  doc.setDrawColor(200, 180, 160);
  doc.line(20, 38, 190, 38);
}

function pageFooter(doc: jsPDF, note: string) {
  doc.setFontSize(8);
  doc.setTextColor(140, 130, 120);
  doc.text(note, 20, 287);
  doc.text(`GloryPrep Mock Kit — page ${doc.getNumberOfPages()}`, 150, 287);
}

/** 1. Exam-day readiness checklist */
function buildChecklist(): jsPDF {
  const doc = new jsPDF();
  header(doc, "Exam-Day Readiness Checklist", "Print and tick each item the night before your test");
  let y = 48;
  const sections: [string, string[]][] = [
    ["Documents and essentials", [
      "Original ID / passport (same document used at registration)",
      "Test centre address and travel route rehearsed",
      "Arrival planned for at least 45 minutes before the start time",
    ]],
    ["Stationery", [
      "Two HB pencils (Listening + Reading answer sheets)",
      "Pencil sharpener and a quality eraser",
      "Black or blue pen for Writing",
      "Transparent pencil case (some centres require it)",
    ]],
    ["Comfort", [
      "Water bottle with label removed",
      "Light sweater \u2014 test rooms are often cold",
      "Simple snack for the break between Listening and Reading",
    ]],
    ["Strategy reminders", [
      "Listening: 10-minute transfer buffer at the end \u2014 plan for it",
      "Reading: no separate transfer time \u2014 fill answers as you go",
      "Writing: Task 2 is worth twice Task 1 \u2014 budget 40/20 minutes",
      "Speaking: arrive early, warm up your voice in the waiting area",
    ]],
  ];
  for (const [heading, items] of sections as [string, string[]][]) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 25, 20);
    doc.text(heading, 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    for (const item of items) {
      doc.rect(20, y - 2.2, 3, 3);
      doc.text(item, 28, y);
      y += 6.5;
    }
    y += 4;
  }
  pageFooter(doc, "Original GloryPrep IELTS material \u2014 not affiliated with Cambridge Assessment, IDP or the British Council.");
  return doc;
}

/** 2. Listening & Reading answer sheets (2 per page, 10 sets concept -> 2 sheets x 5) */
function buildAnswerSheets(): jsPDF {
  const doc = new jsPDF();
  header(doc, "Listening Answer Sheet", "Write answers in CAPITAL LETTERS \u2014 transfer carefully");
  let y = 48;
  for (let set = 1; set <= 2; set++) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 25, 20);
    doc.text(`Candidate name: __________________________   Candidate number: __________   Set ${set}`, 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    for (let q = 1; q <= 40; q++) {
      const col = (q - 1) % 2 === 0 ? 20 : 112;
      const rowOff = Math.floor((q - 1) / 2) * 6;
      doc.text(`${q.toString().padStart(2, "0")}.`, col, y + rowOff);
      doc.rect(col + 9, y + rowOff - 3.2, 16, 4.4);
      if (q === 40) y += Math.floor((q - 1) / 2) * 6 + 6;
    }
    if (set === 1) {
      doc.setFontSize(8);
      doc.setTextColor(140, 130, 120);
      doc.text("Listening: write all answers in CAPITAL letters; check spelling of names and numbers; you have 10 minutes to transfer.", 20, y + 8);
      doc.addPage();
      header(doc, "Reading Answer Sheet", "NO extra transfer time \u2014 transfer answers as you complete each passage");
      y = 48;
    } else {
      y += 14;
    }
  }
  pageFooter(doc, "Original GloryPrep IELTS material.");
  return doc;
}

/** 3. Writing answer sheets with word-count guides */
function buildWritingSheets(): jsPDF {
  const doc = new jsPDF();
  header(doc, "Writing Answer Sheet", "Task 1 minimum 150 words \u00b7 Task 2 minimum 250 words");
  const tasks = [
    { name: "Task 1 \u2014 Report / Letter", min: 150, target: 170 },
    { name: "Task 2 \u2014 Essay", min: 250, target: 280 },
  ];
  for (const t of tasks) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 25, 20);
    doc.text(t.name, 20, 48);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(110, 100, 90);
    doc.text(`Recommended: ${t.target} words. Minimum for full marks: ${t.min}.`, 20, 54);
    let y = 62;
    for (let line = 1; line <= 26; line++) {
      doc.setDrawColor(220, 212, 202);
      doc.line(20, y, 190, y);
      doc.setFontSize(7);
      doc.setTextColor(170, 160, 150);
      doc.text(String(line * 10), 192, y + 1);
      y += 8.2;
    }
    doc.addPage();
    header(doc, t.name, "Continue on the next page");
  }
  pageFooter(doc, "Original GloryPrep IELTS material.");
  return doc;
}

/** 4. Speaking cue-card deck (sample of 6 from the 60-card set) */
function buildCueDeck(): jsPDF {
  const doc = new jsPDF();
  header(doc, "Speaking Cue Card Deck \u2014 Sample Cards", "Part 2: 1 minute preparation \u00b7 1\u20132 minutes speaking");
  const cards: [string, string[]][] = [
    ["A place you like to study", ["where it is", "when you usually go there", "what you do there", "and explain why you prefer it."]],
    ["A meal you cooked for someone", ["what you cooked", "who it was for", "how you prepared it", "and explain how the person reacted."]],
    ["A time you helped a stranger", ["when and where it happened", "what the person needed", "what you did", "and explain how you felt afterwards."]],
    ["A skill you would like to learn", ["what the skill is", "why you want to learn it", "how you would learn it", "and explain how it would change your life."]],
    ["An object you have owned for a long time", ["what it is", "when you got it", "how often you use it", "and explain why you have kept it so long."]],
    ["A neighbourhood that has changed", ["which neighbourhood", "what it used to be like", "what has changed", "and explain whether the change has been positive."]],
  ];
  let y = 50;
  for (let i = 0; i < cards.length; i++) {
    const [cue, bullets] = cards[i];
    if (y > 230) { doc.addPage(); header(doc, "Speaking Cue Card Deck \u2014 Sample Cards", "Part 2: 1 minute preparation \u00b7 1\u20132 minutes speaking"); y = 50; }
    doc.setDrawColor(180, 140, 100);
    doc.setLineWidth(0.4);
    doc.roundedRect(20, y - 8, 170, 34, 2, 2, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 25, 20);
    doc.text(`Card ${i + 1}: ${cue}`, 26, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    bullets.forEach((b: string, j: number) => doc.text(b, 30, y + 7 + j * 5.2));
    y += 42;
  }
  doc.setFontSize(9);
  doc.setTextColor(110, 100, 90);
  doc.text("Full 60-card deck included in the complete kit: Part 1 themes, Part 2 cue cards, and Part 3 follow-ups for each set.", 20, 278);
  pageFooter(doc, "Original GloryPrep IELTS material.");
  return doc;
}

/** 5. Mock schedule planner */
function buildSchedule(): jsPDF {
  const doc = new jsPDF();
  header(doc, "8-Week Mock Test Schedule", "One full mock per week \u00b7 daily micro-drills between mocks");
  const weeks = [
    ["Week 1", "Diagnostic: full mock, all four skills", "Log band scores \u2014 this is your baseline"],
    ["Week 2", "Listening + Reading mock", "Focus: your weakest skill's question types"],
    ["Week 3", "Writing Task 1 x2 + Task 2 x1", "Focus: paraphrasing and overview sentences"],
    ["Week 4", "Mid-course full mock", "Compare against Week 1 baseline"],
    ["Week 5", "Speaking Part 1\u20133 practice x3 sessions", "Record yourself; count hesitations"],
    ["Week 6", "Reading + Writing mock", "Focus: timing under exam conditions"],
    ["Week 7", "Full mock, exam-day routine", "Same start time, same breakfast, same stationery"],
    ["Week 8", "Light review + rest", "One short test mid-week; rest the day before"],
  ];
  let y = 48;
  doc.setFont("helvetica", "bold");
  ["Week", "Session", "Focus"].forEach((h, i) => {
    doc.text(h, [20, 70, 110][i], y);
  });
  doc.line(20, y + 2, 190, y + 2);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  for (const [wk, session, focus] of weeks) {
    doc.text(wk, 20, y);
    doc.text(session, 70, y);
    doc.text(focus, 110, y);
    y += 9;
  }
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("The 4-week fast track", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  ["Week 1: Diagnostic full mock + weakest-skill drills", "Week 2: Two skill mocks + Writing task bank", "Week 3: Full mock under exam conditions", "Week 4: Light review, mock, rest \u2014 test day"].forEach((l) => {
    doc.text("\u2022 " + l, 24, y);
    y += 7;
  });
  pageFooter(doc, "Original GloryPrep IELTS material.");
  return doc;
}

/** Export every PDF, returns array of {name, dataUrl} */
export function buildKitPdfs() {
  return [
    { name: "gloryprep-exam-checklist.pdf", doc: buildChecklist() },
    { name: "gloryprep-answer-sheets.pdf", doc: buildAnswerSheets() },
    { name: "gloryprep-writing-sheets.pdf", doc: buildWritingSheets() },
    { name: "gloryprep-speaking-cue-deck.pdf", doc: buildCueDeck() },
    { name: "gloryprep-mock-schedule.pdf", doc: buildSchedule() },
  ];
}

export function downloadAllKitPdfs() {
  buildKitPdfs().forEach(({ name, doc }) => {
    doc.save(name);
  });
}
