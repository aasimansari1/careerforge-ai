"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, Sparkles } from "lucide-react";

interface Message { role: "ai" | "user"; content: string }

const suggestions = [
  "How do I optimize my resume for ATS?",
  "What skills should I learn for a data science role?",
  "How to negotiate a higher salary?",
  "Should I include a cover letter?",
];

export default function CareerAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi! I'm your AI Career Assistant. I can help you with resume tips, career advice, job search strategies, interview preparation, and more. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "ats": "Great question! Here are key tips for ATS optimization:\n\n1. **Use standard section headings** (Experience, Education, Skills)\n2. **Include keywords** from the job description\n3. **Avoid tables, images, and graphics** — they confuse ATS parsers\n4. **Use a clean, single-column layout**\n5. **Submit in PDF or DOCX format**\n6. **Spell out acronyms** at least once\n\nWould you like me to scan your resume for ATS compatibility?",
        "skills": "For a data science role, here are the most in-demand skills:\n\n**Technical:**\n- Python (Pandas, NumPy, Scikit-learn)\n- SQL and database management\n- Machine Learning & Deep Learning\n- Data visualization (Matplotlib, Tableau)\n- Statistics and probability\n\n**Tools:**\n- Jupyter Notebooks\n- Git/GitHub\n- Cloud platforms (AWS, GCP)\n\n**Soft Skills:**\n- Problem-solving\n- Communication\n- Business acumen\n\nShall I help you add these to your resume?",
        "salary": "Here's my salary negotiation framework:\n\n1. **Research market rates** on Glassdoor, Levels.fyi, and LinkedIn\n2. **Know your worth** — list your unique contributions\n3. **Let them make the first offer** when possible\n4. **Counter with a range** (anchor high but reasonable)\n5. **Negotiate the full package** — equity, bonus, PTO, remote work\n6. **Practice your pitch** — be confident and data-driven\n7. **Get it in writing** before accepting\n\nRemember: Negotiation is expected. Companies rarely rescind offers for negotiating professionally.",
        "cover": "Whether to include a cover letter depends on the situation:\n\n**Always include one when:**\n- The job posting specifically asks for it\n- You're changing careers\n- You have a personal connection or referral\n- You want to explain gaps or unique circumstances\n\n**You can skip it when:**\n- The application doesn't have a field for it\n- You're applying through a quick-apply system\n\nA good cover letter can increase your chances by 40%. Want me to generate one for you?",
      };

      const key = Object.keys(responses).find(k => msg.toLowerCase().includes(k));
      setMessages([...newMessages, {
        role: "ai",
        content: key ? responses[key] : "That's a great question! Based on current market trends, I'd recommend focusing on building a strong personal brand alongside your resume. Here are some actionable steps:\n\n1. Keep your LinkedIn profile updated and active\n2. Contribute to open-source or write blog posts\n3. Network with professionals in your target industry\n4. Tailor your resume for each application\n5. Practice interviewing regularly\n\nWould you like more specific advice on any of these areas?"
      }]);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h1 className="text-sm font-semibold flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" /> AI Career Assistant
        </h1>
        <p className="text-xs text-muted-foreground">Ask anything about your career, resume, or job search</p>
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

        {messages.length === 1 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-4">
            {suggestions.map((s) => (
              <button key={s} onClick={() => handleSend(s)}
                className="flex items-center gap-2 rounded-lg border border-border p-3 text-left text-xs transition hover:border-primary/30 hover:bg-muted"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your career..."
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
