"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Bot, User, RotateCcw } from "lucide-react";

interface Message {
  role: "ai" | "user";
  content: string;
}

const interviewQuestions = [
  "Tell me about yourself and your experience as a software engineer.",
  "Can you describe a challenging project you worked on? What was your role and how did you handle it?",
  "How do you approach debugging a complex production issue?",
  "Describe a time when you had to work with a difficult team member. How did you handle the situation?",
  "What's your experience with system design? Can you walk me through how you'd design a URL shortener?",
  "How do you stay up-to-date with new technologies and industry trends?",
  "Where do you see yourself in 5 years?",
];

export default function InterviewPage() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [role, setRole] = useState("Software Engineer");
  const [interviewType, setInterviewType] = useState("behavioral");

  const startInterview = () => {
    setStarted(true);
    setMessages([{
      role: "ai",
      content: `Welcome to your mock ${interviewType} interview for the ${role} position! I'll be your interviewer today.\n\nLet's start with the first question:\n\n${interviewQuestions[0]}`,
    }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setInput("");
    setMessages(newMessages);

    setTimeout(() => {
      const nextIdx = questionIdx + 1;
      if (nextIdx < interviewQuestions.length) {
        setQuestionIdx(nextIdx);
        setMessages([...newMessages, {
          role: "ai",
          content: `Good answer! You provided solid detail there. Here's some quick feedback:\n\n- Strong use of specific examples\n- Consider quantifying your impact more (e.g., "reduced load time by 40%")\n- Good structure using the STAR method\n\nLet's move to the next question:\n\n${interviewQuestions[nextIdx]}`,
        }]);
      } else {
        setMessages([...newMessages, {
          role: "ai",
          content: "That concludes our mock interview! Here's your summary:\n\n**Overall Score: 8.5/10**\n\n**Strengths:**\n- Clear communication\n- Good use of examples\n- Strong technical knowledge\n\n**Areas for improvement:**\n- Include more metrics and numbers\n- Practice concise answers (aim for 2-3 minutes per question)\n- Prepare 1-2 questions for the interviewer\n\nGreat job! Keep practicing to build confidence.",
        }]);
      }
    }, 1500);
  };

  const resetInterview = () => {
    setStarted(false);
    setMessages([]);
    setQuestionIdx(0);
  };

  if (!started) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" /> AI Interview Practice
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Practice with AI and get instant feedback on your answers.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Target Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Interview Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "behavioral", label: "Behavioral", desc: "STAR method questions" },
                { id: "technical", label: "Technical", desc: "System design & coding" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setInterviewType(t.id)}
                  className={`rounded-lg border p-3 text-left transition ${interviewType === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                >
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <button onClick={startInterview} className="gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white">
            <MessageSquare className="h-4 w-4" /> Start Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h1 className="text-sm font-semibold">Mock Interview — {role}</h1>
          <p className="text-xs text-muted-foreground capitalize">{interviewType} Interview • Question {questionIdx + 1}/{interviewQuestions.length}</p>
        </div>
        <button onClick={resetInterview} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "ai" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-bg">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div className={`max-w-xl rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
              msg.role === "user" ? "bg-primary text-white" : "bg-muted"
            }`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button type="submit" className="gradient-bg rounded-xl px-4 py-2.5 text-white">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
