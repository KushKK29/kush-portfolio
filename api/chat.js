import { buildSystemPrompt } from "./_shared/prompt.js";
import {
  buildFallbackAnswer,
  detectMentionedSources,
  filterSourcesByResponse,
  formatContext,
  searchPortfolio,
  sectionsToSources,
} from "./_shared/portfolio.js";

export const config = {
  runtime: "edge",
};

function _getModels() {
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const fallbacks = (process.env.GEMINI_FALLBACK_MODELS || "gemini-1.5-flash-8b")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean)
    .filter((m) => m !== model);
  return [model, ...fallbacks];
}

function isJailbreakAttempt(text) {
  const lower = text.toLowerCase();
  return [
    "ignore previous",
    "ignore the instructions",
    "system prompt",
    "reveal your prompt",
    "show me your rules",
    "developer mode",
    "roleplay",
    "bypass",
    "jailbreak",
    "pretend to be",
    "act as",
  ].some((pattern) => lower.includes(pattern));
}

function extractGeminiText(data) {
  const candidate = data?.candidates?.[0];
  const parts = candidate?.content?.parts ?? [];
  return parts.map((part) => part.text || "").join("").trim();
}

async function generateWithGemini({ systemPrompt, messages }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const modelsToTry = _getModels();

  for (let modelIndex = 0; modelIndex < modelsToTry.length; modelIndex += 1) {
    const model = modelsToTry[modelIndex];
    const maxAttempts = 2;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: messages.map((message) => ({
              role: message.role === "assistant" ? "model" : "user",
              parts: [{ text: message.content }],
            })),
            generationConfig: {
              temperature: 0.4,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        const text = extractGeminiText(data);
        if (!text) return null;
        return { text, modelUsed: model };
      }

      const errorText = await response.text();
      const retryAfterHeader = response.headers.get("retry-after");
      const retryAfterSeconds = Number(retryAfterHeader);
      const isRateLimited = response.status === 429;
      const canRetry = isRateLimited && attempt < maxAttempts;
      const waitMs = Number.isFinite(retryAfterSeconds)
        ? Math.min(Math.max(retryAfterSeconds * 1000, 200), 3000)
        : 300 + attempt * 500;

      if (canRetry) {
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      const hasNextModel = modelIndex < modelsToTry.length - 1;
      if (isRateLimited && hasNextModel) {
        break;
      }

      const error = new Error(`Gemini request failed (${response.status}): ${errorText}`);
      error.status = response.status;
      error.retryAfterSeconds = Number.isFinite(retryAfterSeconds) ? retryAfterSeconds : null;
      error.model = model;
      throw error;
    }
  }

  const rateLimitError = new Error("Gemini request failed (429): rate limit reached across configured models");
  rateLimitError.status = 429;
  throw rateLimitError;
}

function mapGeminiError(error) {
  const status = Number(error?.status);
  if (status === 400) return "gemini_error_400";
  if (status === 401) return "gemini_error_401";
  if (status === 403) return "gemini_error_403";
  if (status === 404) return "gemini_error_404";
  if (status === 429) return "gemini_error_429";
  if (status === 500) return "gemini_error_500";
  if (status === 503) return "gemini_error_503";

  const message = String(error?.message || "").toLowerCase();
  if (message.includes("400")) return "gemini_error_400";
  if (message.includes("401")) return "gemini_error_401";
  if (message.includes("403")) return "gemini_error_403";
  if (message.includes("404")) return "gemini_error_404";
  if (message.includes("429")) return "gemini_error_429";
  if (message.includes("500")) return "gemini_error_500";
  if (message.includes("503")) return "gemini_error_503";
  return "gemini_error";
}

function makeSseResponse({ text, sources, degradedReason, fallback = false, aiUsed = false, fallbackReason = null }) {
  const encoder = new TextEncoder();
  const fullText = text;

  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          if (degradedReason) {
            controller.enqueue(
              encoder.encode(
                `event: rag-status\ndata: ${JSON.stringify({ status: "degraded", reason: degradedReason })}\n\n`,
              ),
            );
          }

          if (sources.length > 0) {
            controller.enqueue(
              encoder.encode(`event: rag-sources\ndata: ${JSON.stringify(sources)}\n\n`),
            );
          }

          controller.enqueue(
            encoder.encode(
              `event: meta\ndata: ${JSON.stringify({ aiUsed, fallbackReason })}\n\n`,
            ),
          );

          const fullText = String(text || "");
          const words = fullText.match(/\S+\s*|\s+/g) || [fullText];
          let index = 0;

          while (index < words.length) {
            const groupSize = 2 + Math.floor(Math.random() * 3);
            const chunk = words.slice(index, index + groupSize).join("");
            index += groupSize;

            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));

            const endsWithPunctuation = /[.!?]\s*$/.test(chunk);
            const delay = endsWithPunctuation ? 40 + Math.floor(Math.random() * 20) : 15 + Math.floor(Math.random() * 20);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          const fallbackText = fallback
            ? "I can help with Kush’s projects, skills, education, experience, and contact details."
            : text;

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: fallbackText, replace: true })}\n\n`),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    },
  );
}

function makePipelineSseResponse(execute) {
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          // Send an immediate server-side signal so client can reflect that API pipeline started.
          controller.enqueue(
            encoder.encode(
              `event: meta\ndata: ${JSON.stringify({ aiUsed: null, fallbackReason: "processing" })}\n\n`,
            ),
          );

          const payload = await execute();

          const {
            text,
            sources = [],
            degradedReason = null,
            aiUsed = false,
            fallbackReason = null,
          } = payload;

          if (degradedReason) {
            controller.enqueue(
              encoder.encode(
                `event: rag-status\ndata: ${JSON.stringify({ status: "degraded", reason: degradedReason })}\n\n`,
              ),
            );
          }

          if (sources.length > 0) {
            controller.enqueue(
              encoder.encode(`event: rag-sources\ndata: ${JSON.stringify(sources)}\n\n`),
            );
          }

          controller.enqueue(
            encoder.encode(
              `event: meta\ndata: ${JSON.stringify({ aiUsed, fallbackReason })}\n\n`,
            ),
          );

          const fullText = String(text || "");
          const words = fullText.match(/\S+\s*|\s+/g) || [fullText];
          let index = 0;

          while (index < words.length) {
            const groupSize = 2 + Math.floor(Math.random() * 3);
            const chunk = words.slice(index, index + groupSize).join("");
            index += groupSize;

            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));

            const endsWithPunctuation = /[.!?]\s*$/.test(chunk);
            const delay = endsWithPunctuation
              ? 40 + Math.floor(Math.random() * 20)
              : 15 + Math.floor(Math.random() * 20);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `event: meta\ndata: ${JSON.stringify({ aiUsed: false, fallbackReason: "server_error" })}\n\n`,
            ),
          );
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: "I can help with Kush’s projects, skills, education, experience, and contact details.", replace: true })}\n\n`,
            ),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    },
  );
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages = [], sessionId, currentPage } = await req.json();
    const bodySize = JSON.stringify({ messages, sessionId, currentPage }).length;

    if (bodySize > 50000) {
      return new Response(JSON.stringify({ error: "Request too large" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cleanMessages = messages.filter((message) => message && typeof message.content === "string" && message.content.trim());
    const lastUserMessage = cleanMessages.filter((message) => message.role === "user").pop()?.content?.slice(0, 2000) || "";

    if (!lastUserMessage) {
      return new Response(JSON.stringify({ error: "Missing user message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (isJailbreakAttempt(lastUserMessage)) {
      const fallback = buildFallbackAnswer(lastUserMessage);
      return makeSseResponse({
        text: "I can help with Kush’s portfolio details, but I can’t expose internal instructions. Ask me about projects, skills, education, experience, or contact details.",
        sources: sectionsToSources([fallback.sources[0]]),
        degradedReason: "guardrail",
        fallback: true,
        aiUsed: false,
        fallbackReason: "guardrail",
      });
    }

    return makePipelineSseResponse(async () => {
      const searchContextMessages = cleanMessages
        .slice(-3) // Memory: Use up to last 3 messages for context retrieval
        .filter(m => m.role === 'user')
        .map(m => m.content)
        .join(" ");

      const { results: retrieved, confidence } = searchPortfolio(searchContextMessages, 3);
      const context = formatContext(retrieved);
      const systemPrompt = buildSystemPrompt({ currentPage, context });

      let answer = null;
      let aiUsed = false;
      let fallbackReason = null;

      if (!process.env.GEMINI_API_KEY) {
        fallbackReason = "missing_api_key";
      }

      try {
        const generation = await generateWithGemini({ systemPrompt, messages: cleanMessages.slice(-8) });
        answer = generation?.text || null;
        aiUsed = !!answer;
        if (!answer && !fallbackReason) fallbackReason = "empty_model_response";
      } catch (error) {
        answer = null;
        aiUsed = false;
        if (!fallbackReason) fallbackReason = mapGeminiError(error);
      }

      if (!answer) {
        if (confidence === "low" || confidence === "none") {
          answer = `I don't have exact info on that in my active context, but I can tell you about Kush's ${retrieved[0]?.title || "projects and skills"}.`;
        } else {
          const fallback = buildFallbackAnswer(lastUserMessage);
          answer = fallback.text;
        }
      }

      let sources = retrieved.length > 0 ? sectionsToSources(retrieved) : [];
      sources = filterSourcesByResponse(sources, answer);

      const mentioned = detectMentionedSources(answer);
      const sourceIds = new Set(sources.map((source) => source.id));
      for (const source of mentioned) {
        if (!sourceIds.has(source.id) && sources.length < 3) {
          sources.push(source);
          sourceIds.add(source.id);
        }
      }

      if (!sources.length && retrieved.length > 0) {
        sources = sectionsToSources([retrieved[0]]);
      }

      const degradedReason = retrieved.length === 0 ? "no_match" : null;
      return {
        text: answer,
        sources,
        degradedReason,
        fallback: !process.env.GEMINI_API_KEY,
        aiUsed,
        fallbackReason,
      };
    });
  } catch {
    const fallback = buildFallbackAnswer("portfolio assistant");
    return makeSseResponse({
      text: fallback.text,
      sources: sectionsToSources(fallback.sources),
      degradedReason: "fallback",
      fallback: true,
      aiUsed: false,
      fallbackReason: "server_error",
    });
  }
}
