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
  "Hey, I'm Kush! Ask me anything about my projects, skills, or experience. 🚀";

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

  if (/experience|intern|job|work|humantic|mcp|oauth|salesforce|grafana/.test(text)) {
    return {
      text:
        "I'm a Software Engineer Intern at Humantic AI, owning backend-to-frontend delivery across 8 repos: onboarding flows for two AI agents, a full auth surface (OTP, OAuth 2.1, Salesforce), a complete MCP tool line, a Grafana/Loki observability stack, and a DB-backed fraud-prevention layer. Also SDE Intern at GeeksforGeeks, migrating dashboards to Next.js — cut load time 60%.",
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

  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  const fullBubbleText = "Know about Kush using personalised chatbot ⚡";

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const currentAssistantIndexRef = useRef(-1);
  const currentTextRef = useRef("");
  const pendingSourcesRef = useRef([]);
  const pendingDegradedRef = useRef(false);
  const hasOpenedRef = useRef(false);

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
    let timer;
    if (isOpen || isBubbleDismissed) {
      setShowBubble(false);
    } else {
      timer = setTimeout(() => {
        setShowBubble(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isBubbleDismissed]);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const startTyping = () => {
      let i = 0;
      setBubbleText("");
      intervalId = setInterval(() => {
        i++;
        setBubbleText(fullBubbleText.slice(0, i));
        if (i >= fullBubbleText.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            if (showBubble && !isBubbleDismissed) {
              startTyping();
            }
          }, 3000); // 3 seconds pause before repeating
        }
      }, 40);
    };

    if (showBubble && !isBubbleDismissed) {
      startTyping();
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [showBubble, isBubbleDismissed, fullBubbleText]);

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
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-[92px] right-6 z-40 max-w-[220px] rounded-2xl rounded-br-sm border border-white/10 bg-slate-900/90 p-3 text-sm font-medium text-cyan-50 shadow-2xl shadow-blue-950/50 backdrop-blur-xl cursor-pointer"
            onClick={openChat}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsBubbleDismissed(true);
              }}
              className="absolute -top-2 -right-2 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-700 shadow-md transition-colors"
              aria-label="Dismiss message"
            >
              <FiX strokeWidth={3} className="h-3 w-3" />
            </button>
            <div className="flex flex-col gap-1 w-full relative">
               <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">👋 Welcome!</span>
               <p className="leading-snug">
                 {bubbleText}
                 <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-cyan-400 align-middle shadow-[0_0_8px_rgba(34,211,238,0.8)] rounded-sm" />
               </p>
            </div>
            <div className="absolute -bottom-2 right-4 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-slate-900/90 backdrop-blur-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 0.99 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={isOpen ? closeChat : openChat}
        className="fixed bottom-5 right-5 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center border-[3px] border-emerald-500 p-0 hover:shadow-[0_0_25px_rgba(16,185,129,0.8)] transition-shadow duration-300"
        aria-label={isOpen ? "Close chat" : "Open portfolio chat"}
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-[pulse_2s_ease-in-out_infinite]" />
        )}
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
              className="relative flex h-full w-full items-center justify-center rounded-full overflow-hidden"
            >
              <img 
                src="https://res.cloudinary.com/dtkjjaxwn/image/upload/q_auto/f_auto/v1775943663/Gemini_Generated_Image_7k3lub7k3lub7k3l_fsjvg0.png" 
                alt="Open chat" 
                className="h-full w-full object-cover"
              />
            </motion.span>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full border-[3px] border-slate-900 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
        )}
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
            <div className="border-b border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg text-lg font-bold overflow-hidden">
                      <img 
                        src="https://res.cloudinary.com/dtkjjaxwn/image/upload/q_auto/f_auto/v1775943663/Gemini_Generated_Image_7k3lub7k3lub7k3l_fsjvg0.png" 
                        alt="Kush Goel" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0.5 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500"></span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white leading-none">Kush Goel</h3>
                    <p className="mt-1 text-xs text-slate-400">Ask anything about Kush</p>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <FiChevronDown />
                </button>
              </div>
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
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-white/7 text-white"
                      }`}
                    >
                      {message.role === "assistant" && message.ragDegraded ? (
                        <div className="mb-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                          Answering without full context access.
                        </div>
                      ) : null}

                      <p className="whitespace-pre-wrap">
                        {message.role === "assistant" ? parseMarkdownContent(message.content) : message.content}
                        {message.role === "assistant" && isStreaming && index === messages.length - 1 && (
                          <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-white align-middle shadow-[0_0_6px_rgba(255,255,255,0.7)] rounded-sm" />
                        )}
                      </p>

                      {message.role === "assistant" && Array.isArray(message.sources) && message.sources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {dedupeSources(message.sources).map((source, sourceIndex) => (
                            <button
                              key={`${source.id}-${source.anchor}-${sourceIndex}`}
                              onClick={() => scrollToSection(source.anchor)}
                              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cyan-100 transition-colors hover:bg-white/15"
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
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
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
                  placeholder="Type a message..."
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <button
                  onClick={() => sendMessage()}
                  className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg transition-transform hover:scale-[1.05] active:scale-[0.95]"
                  aria-label="Send message"
                >
                  <FiSend className="ml-1 text-lg" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
