"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, Sparkles, ScanSearch, PenTool, Target, MessageSquare,
  Briefcase, Bot, RefreshCw, CheckCircle, Languages, Wand2,
  Search, BarChart3, Lightbulb, BookOpen, FileCheck, Zap,
  Brain, Wrench, Star, ArrowRight, Lock
} from "lucide-react";

const allTools = [
  { name: "AI Resume Builder", desc: "Create resumes from scratch with ATS templates", icon: FileText, href: "/dashboard/builder", free: true },
  { name: "Resume Optimizer", desc: "Scan and optimize resumes for target roles", icon: Sparkles, href: "/dashboard/tools/optimizer", free: true },
  { name: "AI Resume Rewriter", desc: "Rewrite resumes for different applications", icon: RefreshCw, href: "#", free: false },
  { name: "AI Resume Fixer", desc: "Identify errors and restructure with AI", icon: Wrench, href: "#", free: false },
  { name: "AI Resume Assistant", desc: "Chat with AI about your resume", icon: Bot, href: "/dashboard/tools/career-assistant", free: true },
  { name: "Resume Checker", desc: "Audit structure, keywords, readability", icon: CheckCircle, href: "#", free: true },
  { name: "Resume Score", desc: "Real-time scoring against job listings", icon: Target, href: "/dashboard/tools/score", free: true },
  { name: "Summary Generator", desc: "Create professional summary sections", icon: Wand2, href: "#", free: false },
  { name: "Bullet Point Generator", desc: "Convert achievements into ATS-optimized bullets", icon: Star, href: "#", free: false },
  { name: "Resume Feedback", desc: "Detailed analysis before applying", icon: BarChart3, href: "#", free: true },
  { name: "Resume Translator", desc: "Translate resumes into multiple languages", icon: Languages, href: "#", free: false },
  { name: "Resume & Job Match", desc: "Compare resume against job requirements", icon: Search, href: "#", free: false },
  { name: "ATS Resume Scanner", desc: "Full ATS compatibility scan with scoring", icon: ScanSearch, href: "/dashboard/tools/ats-scanner", free: true },
  { name: "Keyword Optimizer", desc: "Optimize keywords for ATS passage", icon: Zap, href: "#", free: false },
  { name: "Keyword Generator", desc: "Extract keywords from job listings", icon: Lightbulb, href: "#", free: false },
  { name: "CV Skills Generator", desc: "Identify industry-relevant skills", icon: Brain, href: "#", free: false },
  { name: "Resume Skills Generator", desc: "Suggest relevant skills from job requirements", icon: Wrench, href: "#", free: false },
  { name: "CV Builder", desc: "Create academic-focused CVs", icon: BookOpen, href: "#", free: false },
  { name: "CV Checker", desc: "Analyze academic CVs for ATS compatibility", icon: FileCheck, href: "#", free: false },
  { name: "Career Story Builder", desc: "Convert career history into a narrative", icon: PenTool, href: "#", free: false },
  { name: "Cover Letter Builder", desc: "Generate tailored cover letters", icon: PenTool, href: "/dashboard/cover-letter", free: true },
  { name: "Cover Letter Generator", desc: "Quick cover letter for each application", icon: FileText, href: "/dashboard/cover-letter", free: false },
  { name: "AI Interview Practice", desc: "Practice HR and technical interviews", icon: MessageSquare, href: "/dashboard/tools/interview", free: true },
  { name: "Job Application Autofill", desc: "Auto-fill job application forms", icon: Zap, href: "#", free: false },
  { name: "Job Board", desc: "Search jobs from aggregated database", icon: Search, href: "#", free: true },
  { name: "Job Match Score", desc: "AI scoring for resume-job match", icon: Target, href: "#", free: false },
  { name: "Job Tracker", desc: "Manage all job applications", icon: Briefcase, href: "/dashboard/tools/job-tracker", free: true },
  { name: "Job Tips Generator", desc: "Tailored tips for each listing", icon: Lightbulb, href: "#", free: false },
  { name: "AI Job Assistant", desc: "Find suitable job postings", icon: Bot, href: "#", free: false },
  { name: "AI Career Assistant", desc: "Personalized career guidance", icon: Brain, href: "/dashboard/tools/career-assistant", free: true },
];

export default function ToolsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Tools</h1>
        <p className="mt-1 text-sm text-muted-foreground">30 AI-powered tools to help you land your dream job.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allTools.map((tool, i) => (
          <motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
            <Link
              href={tool.href}
              className="group relative flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <tool.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{tool.name}</p>
                  {!tool.free && <Lock className="h-3 w-3 text-muted-foreground shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{tool.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100 shrink-0 mt-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
