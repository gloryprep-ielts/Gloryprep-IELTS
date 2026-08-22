/*
 * GloryPrep AI agent — IELTS Q&A only.
 *
 * POST /api/agent/ask  { question: string }
 * Responds with short, accurate IELTS answers (grammar, vocabulary, exam format,
 * band descriptors, strategy). Refuses non-IELTS topics and refuses to write or
 * evaluate essays/speaking responses (feedback is out of scope by design).
 *
 * Requires the OPENAI_API_KEY + OPENAI_API_BASE env (preconfigured in the
 * sandbox). For production, point OPENAI_API_BASE at your own API key endpoint
 * or replace the client with the provider of your choice.
 */
import { Router } from "express";

const SYSTEM_PROMPT = `You are GloryPrep, the IELTS study assistant for GloryPrep Learning — a preparation platform for students in Bangladesh and Malaysia.

Your ONLY job: answer students' questions about the IELTS exam. Allowed topics:
- The four papers (Listening, Reading, Writing, Speaking) and their format, timing, question types
- Official band descriptors and what examiners look for at each band level
- Grammar and vocabulary questions as they relate to IELTS
- Study strategy, time management, common pitfalls, practice techniques
- General facts about IELTS (registration, scoring, test versions Academic vs General Training)

Strict rules:
1. If the question is not about IELTS or studying for it, politely decline in one sentence and steer back to IELTS.
2. Do NOT write essays, letters, or speaking scripts for the student. Do NOT evaluate, correct, or give feedback on their essays or answers. If asked, say GloryPrep's agent answers questions only, and suggest they work through GloryPrep's Writing lessons or their mock test results for skill practice.
3. Keep answers short and concrete: max 4 sentences for simple questions, max 2 short paragraphs for strategy questions.
4. Use a warm, encouraging, tutor-like tone. No emojis unless the student uses one first.
5. Do not invent facts. If unsure about an official detail, say so briefly and point to the official IELTS or Cambridge/IDP/British Council websites.`;

export function createAgentRouter() {
  const router = Router();

  router.post("/ask", async (req, res) => {
    const question = String(req.body?.question ?? "").trim();
    if (question.length < 3) {
      return res.status(400).json({ error: "Please ask a question of at least a few words." });
    }
    if (question.length > 600) {
      return res.status(400).json({ error: "Question too long — please keep it under 600 characters." });
    }

    try {
      const base = process.env.OPENAI_API_BASE ?? "";
      const key = process.env.OPENAI_API_KEY ?? "";
      if (!base || !key) {
        return res.status(503).json({ error: "AI service is not configured on this server yet." });
      }
      const resp = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: process.env.AGENT_MODEL ?? "gpt-4.1-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question },
          ],
          max_completion_tokens: 400,
          temperature: 0.3,
        }),
      });
      if (!resp.ok) {
        return res.status(502).json({ error: "AI service unavailable right now — please try again." });
      }
      const data = await resp.json();
      const answer = data.choices?.[0]?.message?.content ?? "";
      return res.json({ answer });
    } catch {
      return res.status(502).json({ error: "AI service unavailable right now — please try again." });
    }
  });

  return router;
}
