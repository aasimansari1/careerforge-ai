"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScanSearch, Upload, CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react";

interface ScanResult {
  score: number;
  sections: { name: string; status: "pass" | "warning" | "fail"; detail: string }[];
  keywords: { found: string[]; missing: string[] };
  suggestions: string[];
}

const mockResult: ScanResult = {
  score: 82,
  sections: [
    { name: "Contact Information", status: "pass", detail: "All essential contact fields present" },
    { name: "Professional Summary", status: "pass", detail: "Summary is concise and relevant" },
    { name: "Work Experience", status: "pass", detail: "Uses action verbs and quantified results" },
    { name: "Education", status: "pass", detail: "Properly formatted with dates" },
    { name: "Skills Section", status: "warning", detail: "Consider adding more technical keywords" },
    { name: "File Format", status: "pass", detail: "ATS-compatible format detected" },
    { name: "Keyword Density", status: "warning", detail: "Some target keywords are missing" },
    { name: "Formatting", status: "pass", detail: "Clean formatting without complex elements" },
  ],
  keywords: {
    found: ["React", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL", "microservices", "CI/CD", "agile"],
    missing: ["Kubernetes", "Terraform", "monitoring", "system design", "scalability"],
  },
  suggestions: [
    "Add 2-3 more technical keywords from the job description",
    "Include metrics in your most recent role's bullet points",
    "Consider adding a 'Projects' section for additional keywords",
    "Ensure all dates follow a consistent format",
  ],
};

export default function ATSScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setResult(mockResult);
      setScanning(false);
    }, 3000);
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "pass") return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    if (status === "warning") return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ScanSearch className="h-6 w-6 text-primary" /> ATS Resume Scanner
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Check if your resume is compatible with Applicant Tracking Systems.</p>
      </div>

      {!result ? (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Your Resume</label>
              <textarea
                value={resumeText} onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                rows={12}
                className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary"
              />
              <div className="mt-2 flex items-center gap-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary">
                  <Upload className="h-4 w-4" /> Upload Resume (PDF/DOCX)
                  <input type="file" className="hidden" accept=".pdf,.docx,.doc,.txt" />
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Job Description (optional)</label>
              <textarea
                value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description for keyword matching..."
                rows={12}
                className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            onClick={handleScan}
            disabled={scanning}
            className="gradient-bg flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {scanning ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <ScanSearch className="h-4 w-4" />
              </motion.div>
            ) : (
              <ScanSearch className="h-4 w-4" />
            )}
            {scanning ? "Scanning..." : "Scan Resume"}
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Score */}
          <div className="flex items-center gap-6 rounded-xl border border-border bg-card p-6">
            <div className="relative">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
                  className={result.score >= 80 ? "text-emerald-500" : result.score >= 60 ? "text-amber-500" : "text-red-500"}
                  strokeDasharray={264}
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 - (264 * result.score) / 100 }}
                  transition={{ duration: 1.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{result.score}</span>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold">ATS Compatibility Score</h2>
              <p className="text-sm text-muted-foreground">
                {result.score >= 80 ? "Your resume is well-optimized for ATS systems!" : "Your resume needs some improvements for better ATS compatibility."}
              </p>
            </div>
            <button onClick={() => setResult(null)} className="ml-auto rounded-lg border border-border px-4 py-2 text-xs font-medium hover:bg-muted">
              Scan Again
            </button>
          </div>

          {/* Section Analysis */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Section Analysis</h3>
            <div className="space-y-2">
              {result.sections.map((s) => (
                <div key={s.name} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-2.5">
                  <StatusIcon status={s.status} />
                  <span className="text-sm font-medium flex-1">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-emerald-500">Keywords Found ({result.keywords.found.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.keywords.found.map((k) => (
                  <span key={k} className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600">{k}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-red-500">Missing Keywords ({result.keywords.missing.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.keywords.missing.map((k) => (
                  <span key={k} className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600">{k}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-3 font-semibold">Improvement Suggestions</h3>
            <ul className="space-y-2">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
