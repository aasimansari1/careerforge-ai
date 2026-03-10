"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Upload, ArrowRight, CheckCircle, Zap } from "lucide-react";

export default function OptimizerPage() {
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const optimizations = [
    { label: "Added 5 role-specific keywords", type: "keyword" },
    { label: "Strengthened 3 bullet points with metrics", type: "content" },
    { label: "Improved summary to match target role", type: "summary" },
    { label: "Reordered skills by relevance", type: "skills" },
    { label: "Optimized formatting for ATS", type: "format" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" /> Resume Optimizer
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Optimize your resume for a specific role using AI.</p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${s <= step ? "gradient-bg text-white" : "bg-muted text-muted-foreground"}`}>
              {s < step ? <CheckCircle className="h-4 w-4" /> : s}
            </div>
            <span className="text-xs font-medium hidden sm:block">{s === 1 ? "Input" : s === 2 ? "Optimize" : "Results"}</span>
            {s < 3 && <div className={`h-px flex-1 ${s < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Target Role</label>
            <input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g., Senior Software Engineer at Google"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Your Resume</label>
            <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste your resume content..." rows={10}
              className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary" />
          </div>
          <button onClick={() => setStep(2)} className="gradient-bg flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white">
            Optimize <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="mx-auto mb-4">
            <Sparkles className="h-12 w-12 text-primary" />
          </motion.div>
          <h2 className="text-lg font-bold">Optimizing your resume...</h2>
          <p className="mt-2 text-sm text-muted-foreground">AI is analyzing your resume against the target role.</p>
          <div className="mx-auto mt-6 max-w-xs">
            {optimizations.map((o, i) => (
              <motion.div key={o.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.8 }}
                onAnimationComplete={() => { if (i === optimizations.length - 1) setTimeout(() => setStep(3), 1000); }}
                className="flex items-center gap-2 py-1.5 text-xs"
              >
                <Zap className="h-3.5 w-3.5 text-primary" /> {o.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
            <CheckCircle className="mx-auto h-10 w-10 text-emerald-500 mb-2" />
            <h2 className="text-lg font-bold">Resume Optimized!</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your resume score improved from <span className="font-bold text-amber-500">72</span> to <span className="font-bold text-emerald-500">94</span></p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-3 font-semibold">Changes Made</h3>
            <ul className="space-y-2">
              {optimizations.map((o, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" /> {o.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
              Optimize Another
            </button>
            <button className="gradient-bg rounded-lg px-4 py-2 text-sm font-medium text-white">
              View Optimized Resume
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
