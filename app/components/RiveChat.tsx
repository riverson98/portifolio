"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  role: "assistant",
  content:
    "Olá! Sou o **RIV-E**, assistente de IA do Riverson. Pode me perguntar sobre a carreira dele, experiências, stack técnica ou desafios que ele já enfrentou. Como posso ajudar?",
};

function parseMarkdownBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function RiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const history = [...messages.filter((m) => m !== WELCOME), userMsg];
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const reply: Message = {
        role: "assistant",
        content: data.content || "Não consegui processar sua pergunta. Tente novamente.",
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro de conexão. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-900/60"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
        }}
        aria-label="Abrir chat RIV-E"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-violet-900/40"
            style={{ border: "1px solid rgba(124,58,237,0.3)", background: "#0f0f1a" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(8,145,178,0.15) 100%)",
                borderBottom: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)" }}
              >
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-none">RIV-E</p>
                <p className="text-slate-400 text-xs mt-0.5">Assistente de carreira</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                online
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ maxHeight: 340 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-violet-600/30 border border-violet-500/30"
                        : "bg-cyan-600/20 border border-cyan-500/20"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={13} className="text-violet-300" />
                    ) : (
                      <User size={13} className="text-cyan-300" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "text-slate-300 rounded-bl-sm"
                        : "text-white rounded-br-sm"
                    }`}
                    style={
                      msg.role === "assistant"
                        ? { background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }
                        : { background: "linear-gradient(135deg, #7c3aed, #0891b2)" }
                    }
                  >
                    {parseMarkdownBold(msg.content)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-violet-600/30 border border-violet-500/30">
                    <Bot size={13} className="text-violet-300" />
                  </div>
                  <div
                    className="rounded-2xl rounded-bl-sm px-3 py-2"
                    style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
                  >
                    <Loader2 size={14} className="text-violet-400 animate-spin" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-3"
              style={{ borderTop: "1px solid rgba(124,58,237,0.2)", background: "#0b0b17" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Pergunte sobre a carreira..."
                disabled={loading}
                className="flex-1 bg-transparent text-slate-300 placeholder-slate-600 text-sm outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-110"
                style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)" }}
                aria-label="Enviar"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
