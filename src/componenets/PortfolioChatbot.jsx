import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiZap,
  FiChevronDown,
} from "react-icons/fi";

const STORAGE_KEY = "kush-chat-session";

const quickPrompts = [
  { label: "About me", query: "Who is Kush?" },
  { label: "Projects", query: "What projects have you built?" },
  { label: "Skills", query: "What are your technical skills?" },
  { label: "Experience", query: "Tell me about your experience." },
  { label: "Education", query: "Where did you study?" },
  { label: "Contact", query: "How can I contact you?" },
];

const sourceLabels = {
  intro: "Intro",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  experience: "Experience",
  contact: "Contact",
};

const sourceAnchors = {
  intro: "#intro",
  projects: "#projects",
  skills: "#skills",
  education: "#education",
  experience: "#experience",
  contact: "#contact",
};

const initialGreeting =
  "Hey, I’m Kush’s portfolio assistant. Ask me about projects, skills, education, experience, or how to reach him.";

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
      return parsed;
    }
  } catch {
    // Ignore corrupted storage.
  }
  return null;
}

function saveSession(messages, sessionId) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, sessionId }));
  } catch {
    // Ignore storage failures.
  }
}

function normalizeSource(source) {
  if (!source) return null;
  if (typeof source === "string") {
    const id = source.replace(/^#/, "");
    return sourceAnchors[id] ? { id, label: sourceLabels[id] ?? id, anchor: sourceAnchors[id] } : null;
  }
  if (typeof source === "object") {
    const id = source.id || source.section_id || source.section || source.slug;
    const anchor = source.anchor || source.section_anchor || sourceAnchors[id] || `#${id}`;
    const label = source.label || source.title || sourceLabels[id] || id;
    if (!id) return null;
    return { id, label, anchor };
  }
  return null;
}

function dedupeSources(sources) {
  const seen = new Set();
  const result = [];
  for (const source of sources) {
    const normalized = normalizeSource(source);
    if (!normalized || seen.has(normalized.id)) continue;
    seen.add(normalized.id);
    result.push(normalized);
  }
  return result;
}

function normalizeHistoryMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages.map((message) => {
    if (!message || typeof message !== "object") return message;
    if (message.role !== "assistant") return message;
    return {
      ...message,
      sources: dedupeSources(message.sources ?? []),
    };
  });
}

function scrollToSection(anchor) {
  const element = document.querySelector(anchor);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  if (window.location.hash !== anchor) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}${anchor}`);
  }
}

function buildLocalFallbackResponse(query) {
  const text = query.toLowerCase();

  if (/hello|hi|hey|hola|yo/.test(text)) {
    return { text: initialGreeting, sources: ["intro"] };
  }

  if (/who are you|about you|tell me about yourself|intro|profile/.test(text)) {
    return {
      text:
        "I’m Kush Goel, a full stack developer focused on React, Node.js, MongoDB, and modern web applications. I’m currently pursuing B.Tech in ECE at IIIT Una and building practical projects with a strong product mindset.",
      sources: ["intro", "education"],
    };
  }

  if (/trade|shala/.test(text)) {
    return {
      text:
        "Trade-Shala is a paper-trading and stock-market simulation project with integrated ML sentiment analysis.",
      sources: ["projects"],
    };
  }

  if (/mhope/.test(text)) {
    return {
      text:
        "MHope is an AI-based healthcare platform with smart dashboards and diagnostic tools for users.",
      sources: ["projects"],
    };
  }

  if (/chat app|my-chat-app|socket/.test(text)) {
    return {
      text:
        "My-Chat-App is a React and Socket.IO chat application built for a real-time messaging experience.",
      sources: ["projects"],
    };
  }

  if (/sorting/.test(text)) {
    return {
      text:
        "Sorting-Visualizer shows how sorting algorithms work through interactive visualizations.",
      sources: ["projects"],
    };
  }

  if (/rbac/.test(text)) {
    return {
      text:
        "RBAC System is a role-based access control project focused on admin-led role distribution and permissions.",
      sources: ["projects"],
    };
  }

  if (/image generator/.test(text)) {
    return {
      text:
        "The AI Image Generator creates images from prompts using a machine learning workflow.",
      sources: ["projects"],
    };
  }

  if (/e-commerce|ecommerce/.test(text)) {
    return {
      text:
        "The E-commerce Website is one of my earlier React projects and shows the foundation of my frontend work.",
      sources: ["projects"],
    };
  }

  if (/project|portfolio|built/.test(text)) {
    return {
      text:
        "I’ve built projects like Trade-Shala, MHope, My-Chat-App, Sorting-Visualizer, . If you want, I can summarize the stack or highlight the most relevant one.",
      sources: ["projects"],
    };
  }

  if (/skill|stack|tech|technology|language|frontend|backend/.test(text)) {
    return {
      text:
        "My core stack includes HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, Python, C, C++, DSA, and GitHub. I also use Tailwind, React Slick, EmailJS, and other frontend tools in this portfolio.",
      sources: ["skills"],
    };
  }

  if (/experience|intern|job|work/.test(text)) {
    return {
      text:
        "My experience includes Software Engineer Intern at Humantic AI, SDE Intern at GeeksforGeeks, Full Stack Web Developer at Slotin Solutions, and Question Analyst at Demlo AI. That mix gave me both product-building and implementation experience.",
      sources: ["experience"],
    };
  }

  if (/education|study|college|degree|school|iiit/.test(text)) {
    return {
      text:
        "I’m pursuing B.Tech in ECE at IIIT Una. My education also includes 12th with 95.6% and 10th with 87% from RRK Sen. Sec. School, Chandausi.",
      sources: ["education"],
    };
  }

  if (/contact|email|phone|reach|connect|linkedin|github|leetcode|codechef/.test(text)) {
    return {
      text:
        "The fastest way to reach me is by email at kushgoel279@gmail.com. You can also connect through GitHub, LinkedIn, LeetCode, and CodeChef from the About section.",
      sources: ["contact"],
    };
  }

  if (/resume|cv|download/.test(text)) {
    return {
      text:
        "You can use the Download Resume button in the hero section. If you want, I can also point you to the best sections to read first.",
      sources: ["intro"],
    };
  }

  return {
    text:
      "I can help with Kush’s projects, skills, education, experience, and contact details. Try asking: 'What projects have you built?' or 'How can I contact you?'.",
    sources: ["intro", "projects", "contact"],
  };
}

function normalizeMessagesForRequest(messages) {
  return messages
    .filter((message) => message && typeof message.content === "string" && message.content.trim())
    .map((message) => ({ role: message.role, content: message.content }));
}

const parseMarkdownContent = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.endsWith(")")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cyan-300 underline hover:text-cyan-100 transition-colors cursor-pointer"
          >
            {match[1]}
          </a>
        );
      }
    }
    return <span key={i}>{part}</span>;
  });
};

export default function PortfolioChatbot() {
  const session = useMemo(() => loadSession(), []);
  const sessionMessages = useMemo(
    () => normalizeHistoryMessages(session?.messages ?? []),
    [session],
  );
  const [isOpen, setIsOpen] = useState(() => window.location.hash === "#chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() =>
    sessionMessages.length > 0 ? sessionMessages : [
      {
        role: "assistant",
        content: initialGreeting,
        sources: dedupeSources(["intro"]),
      },
    ],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPrompts, setShowPrompts] = useState(!sessionMessages.some((message) => message.role === "user"));
  const [chatMode, setChatMode] = useState("unknown");
  const [fallbackReason, setFallbackReason] = useState("");
  const [sessionId] = useState(() => session?.sessionId ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const currentAssistantIndexRef = useRef(-1);
  const currentTextRef = useRef("");
  const pendingSourcesRef = useRef([]);
  const pendingDegradedRef = useRef(false);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#chat") setIsOpen(true);
    };

    const onOpenChat = () => setIsOpen(true);

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("openChat", onOpenChat);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("openChat", onOpenChat);
    };
  }, []);

  useEffect(() => {
    saveSession(messages, sessionId);
  }, [messages, sessionId]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: isStreaming ? "instant" : "smooth", block: "end" });
  }, [messages, isStreaming]);

  const openChat = () => {
    setIsOpen(true);
    if (window.location.hash !== "#chat") {
      history.pushState(null, "", `${window.location.pathname}${window.location.search}#chat`);
    }
  };

  const closeChat = () => {
    abortRef.current?.abort();
    setIsOpen(false);
    if (window.location.hash === "#chat") {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  const updateAssistantMessage = (nextContent, nextSources, nextDegraded) => {
    setMessages((prev) => {
      const next = [...prev];
      const index = currentAssistantIndexRef.current;
      if (index < 0 || index >= next.length) return prev;
      next[index] = {
        role: "assistant",
        content: nextContent,
        sources: dedupeSources(nextSources ?? []),
        ragDegraded: nextDegraded || undefined,
      };
      return next;
    });
  };

  const applyFallbackReply = (query) => {
    const fallback = buildLocalFallbackResponse(query);
    const normalizedSources = dedupeSources(fallback.sources);
    updateAssistantMessage(fallback.text, normalizedSources, false);
  };

  const sendMessage = async (messageText) => {
    const text = (messageText ?? input).trim();
    if (!text || isLoading) return;

    const userMessage = { role: "user", content: text };
    const assistantPlaceholder = { role: "assistant", content: "", sources: [], ragDegraded: false };

    setInput("");
    setShowPrompts(false);
    setIsLoading(true);
    setIsStreaming(false);
    setChatMode("pending");
    setFallbackReason("");
    currentTextRef.current = "";
    pendingSourcesRef.current = [];
    pendingDegradedRef.current = false;

    setMessages((prev) => {
      const next = [...prev, userMessage, assistantPlaceholder];
      currentAssistantIndexRef.current = next.length - 1;
      return next;
    });

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: normalizeMessagesForRequest([...messages, userMessage]),
          sessionId,
          currentPage: window.location.pathname,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat request failed (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let currentEventType = "";
      let receivedText = false;
      setIsStreaming(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          const rawLine = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          const line = rawLine.trim();

          if (!line) continue;

          if (line.startsWith("event: ")) {
            currentEventType = line.slice(7);
            continue;
          }

          if (!line.startsWith("data: ")) continue;
          if (line === "data: [DONE]") continue;

          let data;
          try {
            data = JSON.parse(line.slice(6));
          } catch {
            continue;
          }

          if (currentEventType === "rag-sources") {
            pendingSourcesRef.current = dedupeSources(data);
            updateAssistantMessage(currentTextRef.current, pendingSourcesRef.current, pendingDegradedRef.current);
            currentEventType = "";
            continue;
          }

          if (currentEventType === "rag-status") {
            pendingDegradedRef.current = data?.status === "degraded";
            updateAssistantMessage(currentTextRef.current, pendingSourcesRef.current, pendingDegradedRef.current);
            currentEventType = "";
            continue;
          }

          if (currentEventType === "meta") {
            if (data?.fallbackReason === "processing") {
              setChatMode("pending");
              setFallbackReason("");
            } else if (data?.aiUsed === true) {
              setChatMode("ai");
              setFallbackReason("");
            } else {
              setChatMode(data?.fallbackReason || "fallback");
              setFallbackReason(data?.fallbackReason || "fallback");
            }
            currentEventType = "";
            continue;
          }

          currentEventType = "";

          if (data.text) {
            receivedText = true;
            if (data.replace) {
              currentTextRef.current = data.text;
            } else {
              currentTextRef.current += data.text;
            }
            updateAssistantMessage(
              currentTextRef.current,
              pendingSourcesRef.current,
              pendingDegradedRef.current,
            );
          }
        }
      }

      if (!receivedText) {
        applyFallbackReply(text);
        setChatMode("client_fallback");
        setFallbackReason("empty_stream");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        applyFallbackReply(text);
        setChatMode("client_fallback");
        setFallbackReason("client_error");
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 0.75 }}
        whileHover={{ scale: 0.8 }}
        whileTap={{ scale: 0.7 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={isOpen ? closeChat : openChat}
        className="fixed bottom-5 right-5 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-white shadow-2xl shadow-blue-950/40 flex items-center justify-center border border-white/10"
        aria-label={isOpen ? "Close chat" : "Open portfolio chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FiX className="text-2xl" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              <FiMessageSquare className="text-2xl" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-slate-950">
                <FiZap />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(78vh,640px)] w-[min(92vw,420px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="border-b border-white/10 bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-teal-500/15 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Portfolio Assistant</div>
                  <h3 className="mt-1 text-lg font-semibold text-white">Ask about Kush</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      chatMode === "ai"
                        ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                        : chatMode === "pending"
                          ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
                          : "bg-amber-500/20 text-amber-200 border border-amber-400/30"
                    }`}
                  >
                    {chatMode === "ai" ? "AI mode" : chatMode === "pending" ? "Thinking" : "Fallback"}
                  </span>
                </div>
                <button
                  onClick={closeChat}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close portfolio chat"
                >
                  <FiChevronDown />
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-300/80">
                Projects, skills, experience, education, or contact details.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: "none" }}>
              {showPrompts && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt.label}
                      onClick={() => sendMessage(prompt.query)}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-white/7 text-slate-100"
                      }`}
                    >
                      {message.role === "assistant" && message.ragDegraded ? (
                        <div className="mb-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] text-amber-200">
                          Answering without full context access.
                        </div>
                      ) : null}

                      <p className="whitespace-pre-wrap">{message.role === "assistant" ? parseMarkdownContent(message.content) : message.content}</p>

                      {message.role === "assistant" && Array.isArray(message.sources) && message.sources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {dedupeSources(message.sources).map((source, sourceIndex) => (
                            <button
                              key={`${source.id}-${source.anchor}-${sourceIndex}`}
                              onClick={() => scrollToSection(source.anchor)}
                              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-cyan-100 transition-colors hover:bg-white/15"
                            >
                              {source.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && !isStreaming ? (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-white/7 px-4 py-3 text-sm text-slate-200">
                      <span className="inline-flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
                      </span>
                    </div>
                  </div>
                ) : null}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-white/10 bg-slate-950/90 p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask something about Kush..."
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                />
                <button
                  onClick={() => sendMessage()}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-white transition-transform hover:scale-[1.02]"
                  aria-label="Send message"
                >
                  <FiSend />
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Streaming assistant powered by server-side Gemini when available.
              </p>
              {chatMode !== "ai" && chatMode !== "pending" && fallbackReason ? (
                <p className="mt-1 text-[11px] text-amber-300/90">
                  Debug fallback reason: {fallbackReason}
                </p>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
