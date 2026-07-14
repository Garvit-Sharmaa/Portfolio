"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, X, Send, Sparkles, FolderKanban, MessageSquare } from "lucide-react";
import { processQuery, type AIResponse } from "@/lib/intelligenceEngine";
import type { ChatMessage, Project } from "@/types";
import { useRouter } from "next/navigation";

export default function IntelligenceChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "System online. I am the Intelligence Engine. Ask me about Garvit's projects, tech stack, or architecture.",
        }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response: AIResponse = await processQuery(userMessage.content);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        projects: response.projects,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-surface1 border border-border-subtle rounded-full shadow-2xl flex items-center justify-center text-teal hover:border-teal/50 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal rounded-full" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[100] w-full max-w-[380px] h-[500px] bg-surface1 border border-border-subtle rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface2/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-teal/10 flex items-center justify-center border border-teal/20">
                  <Bot className="w-3.5 h-3.5 text-teal" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground/90">Garvit AI</h3>
                  <p className="text-[10px] text-foreground/40 font-mono">Intelligence Engine v1.0</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-foreground/40 hover:text-foreground hover:bg-surface2 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.role === 'user' 
                        ? 'bg-surface2 border-border-subtle' 
                        : 'bg-teal/10 border-teal/20'
                    }`}>
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-foreground/60" /> : <Bot className="w-3.5 h-3.5 text-teal" />}
                    </div>
                    
                    <div className={`px-3 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-surface2 text-foreground/90 border border-border-subtle rounded-br-sm'
                        : 'bg-transparent text-foreground/80 rounded-bl-sm'
                    }`}>
                      {/* React Markdown could go here, but for now we just render text */}
                      <p className="whitespace-pre-wrap font-sans leading-relaxed">
                        {msg.role === 'assistant' ? msg.content.replace(/\*\*(.*?)\*\*/g, '$1') : msg.content}
                      </p>
                    </div>
                  </div>

                  {/* Render rich UI cards if AI returned projects */}
                  {msg.projects && msg.projects.length > 0 && (
                    <div className="mt-3 pl-8 flex flex-col gap-2 w-[95%]">
                      {msg.projects.map(p => (
                        <div 
                          key={p.slug}
                          onClick={() => router.push(`/projects/${p.slug}`)}
                          className="bg-surface2 border border-border-subtle hover:border-teal/50 rounded-xl p-3 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <FolderKanban className="w-4 h-4 text-teal" />
                            <h4 className="text-sm font-semibold text-foreground/90 group-hover:text-teal transition-colors">{p.title}</h4>
                          </div>
                          <p className="text-xs text-foreground/50 font-mono line-clamp-1 mb-2">{p.subtitle}</p>
                          <div className="flex flex-wrap gap-1">
                            {p.tech.slice(0, 3).map(t => (
                              <span key={t} className="px-1.5 py-0.5 bg-teal/10 text-teal border border-teal/20 rounded text-[9px] font-mono">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-teal" />
                  </div>
                  <div className="flex gap-1 px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-surface2/50 border-t border-border-subtle">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about architecture or tech..."
                  className="w-full bg-surface1 border border-border-subtle focus:border-teal/50 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none text-foreground/90 placeholder:text-foreground/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-1.5 rounded-full text-foreground/40 hover:text-teal hover:bg-teal/10 disabled:opacity-50 disabled:hover:text-foreground/40 disabled:hover:bg-transparent transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
