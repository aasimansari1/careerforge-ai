"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Menu, X, Sun, Moon, ChevronDown,
  Sparkles, ScanSearch, PenTool, MessageSquare, Target,
  BookOpen, Briefcase, Bot
} from "lucide-react";

const toolCategories = [
  {
    title: "Resume Tools",
    items: [
      { name: "AI Resume Builder", href: "/dashboard/builder", icon: FileText },
      { name: "Resume Optimizer", href: "/dashboard/tools/optimizer", icon: Sparkles },
      { name: "ATS Scanner", href: "/dashboard/tools/ats-scanner", icon: ScanSearch },
      { name: "Resume Score", href: "/dashboard/tools/score", icon: Target },
    ],
  },
  {
    title: "Career Tools",
    items: [
      { name: "Cover Letter Builder", href: "/dashboard/cover-letter", icon: PenTool },
      { name: "AI Interview", href: "/dashboard/tools/interview", icon: MessageSquare },
      { name: "Job Tracker", href: "/dashboard/tools/job-tracker", icon: Briefcase },
      { name: "Career Assistant", href: "/dashboard/tools/career-assistant", icon: Bot },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="gradient-bg flex h-8 w-8 items-center justify-center rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">CareerForge <span className="gradient-text">AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            <Link href="/templates" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
              Templates
            </Link>
            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                AI Tools <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full mt-1 w-[480px] rounded-xl border border-border bg-card p-4 shadow-2xl"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {toolCategories.map((cat) => (
                        <div key={cat.title}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat.title}</p>
                          {cat.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-2 rounded-lg p-2 text-sm transition hover:bg-muted"
                            >
                              <item.icon className="h-4 w-4 text-primary" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
              Pricing
            </Link>
            <Link href="/blog" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
              Blog
            </Link>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Log in
            </Link>
            <Link href="/dashboard" className="gradient-bg rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-1 p-4">
              <Link href="/templates" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Templates</Link>
              <Link href="/pricing" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link href="/blog" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Blog</Link>
              <Link href="/dashboard/tools/ats-scanner" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>ATS Scanner</Link>
              <Link href="/dashboard/tools/score" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Resume Score</Link>
              <hr className="my-2" />
              <Link href="/login" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Log in</Link>
              <Link href="/dashboard" className="gradient-bg mt-2 block rounded-lg px-3 py-2 text-center text-sm font-medium text-white" onClick={() => setMobileOpen(false)}>
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
