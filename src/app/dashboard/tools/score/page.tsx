"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Upload, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function ResumeScorePage() {
  const [scored, setScored] = useState(false);
  const [resumeText, setResumeText] = useState("");

  const scores = [
    { label: "Overall Score", value: 87, color: "text-emerald-500" },
    { label: "ATS Compatibility", value: 92, color: "text-blue-500", bar: "bg-blue-500" },
    { label: "Content Quality", value: 85, color: "text-violet-500", bar: "bg-violet-500" },
    { label: "Keyword Match", value: 78, color: "text-amber-500", bar: "bg-amber-500" },
    { label: "Formatting", value: 95, color: "text-emerald-500", bar: "bg-emerald-500" },
    { label: "Impact & Metrics", value: 82, color: "text-pink-500", bar: "bg-pink-500" },
    { label: "Readability", value: 90, color: "text-cyan-500", bar: "bg-cyan-500" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" /> Resume Score
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Get a detailed score breakdown of your resume.</p>
      </div>

      {!scored ? (
        <div className="space-y-4">
          <textarea
            value={resumeText} onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content here to get scored..."
            rows={12}
            className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary"
          />
          <button onClick={() => setScored(true)} className="gradient-bg flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white">
            <Target className="h-4 w-4" /> Score My Resume
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Overall Score */}
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-8">
            <div className="relative mb-4">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" strokeWidth="6" strokeLinecap="round" className="text-emerald-500"
                  strokeDasharray={264}
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 - (264 * 87) / 100 }}
                  transition={{ duration: 1.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">87</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>
            <h2 className="text-lg font-bold">Great Resume!</h2>
            <p className="text-sm text-muted-foreground text-center">Your resume scores above average. A few tweaks can push it to 95+.</p>
          </div>

          {/* Score Breakdown */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Score Breakdown</h3>
            <div className="space-y-4">
              {scores.slice(1).map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.label}</span>
                    <span className={`font-semibold ${s.color}`}>{s.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${s.bar}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-emerald-500">
                <CheckCircle className="h-4 w-4" /> Strengths
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Strong use of action verbs</li>
                <li>Quantified achievements with metrics</li>
                <li>Clean, ATS-compatible formatting</li>
                <li>Relevant skills section</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-500">
                <AlertTriangle className="h-4 w-4" /> Improvements
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Add more industry-specific keywords</li>
                <li>Expand on most recent role</li>
                <li>Include a projects section</li>
                <li>Add certifications if available</li>
              </ul>
            </div>
          </div>

          <button onClick={() => setScored(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            Score Another Resume
          </button>
        </motion.div>
      )}
    </div>
  );
}
