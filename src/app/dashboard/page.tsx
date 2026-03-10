"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, PenTool, Plus, TrendingUp, Target, Briefcase,
  Eye, ArrowRight, Sparkles, ScanSearch, MessageSquare, Bot
} from "lucide-react";

const quickActions = [
  { name: "New Resume", href: "/dashboard/builder", icon: FileText, color: "from-violet-500 to-purple-600" },
  { name: "Cover Letter", href: "/dashboard/cover-letter", icon: PenTool, color: "from-blue-500 to-cyan-500" },
  { name: "ATS Scanner", href: "/dashboard/tools/ats-scanner", icon: ScanSearch, color: "from-emerald-500 to-green-600" },
  { name: "AI Interview", href: "/dashboard/tools/interview", icon: MessageSquare, color: "from-orange-500 to-red-500" },
];

const stats = [
  { label: "Resumes Created", value: "3", change: "+1 this week", icon: FileText, color: "text-violet-500 bg-violet-500/10" },
  { label: "Resume Score", value: "87", change: "+5 pts", icon: Target, color: "text-emerald-500 bg-emerald-500/10" },
  { label: "Applications", value: "12", change: "+4 this week", icon: Briefcase, color: "text-blue-500 bg-blue-500/10" },
  { label: "Profile Views", value: "48", change: "+12 this week", icon: Eye, color: "text-amber-500 bg-amber-500/10" },
];

const recentResumes = [
  { id: 1, title: "Software Engineer Resume", template: "Modern", score: 92, updated: "2 hours ago" },
  { id: 2, title: "Product Manager Resume", template: "Professional", score: 85, updated: "1 day ago" },
  { id: 3, title: "Data Scientist Resume", template: "Simple", score: 78, updated: "3 days ago" },
];

const aiTools = [
  { name: "Resume Optimizer", desc: "Optimize for target role", icon: Sparkles, href: "/dashboard/tools/optimizer" },
  { name: "ATS Scanner", desc: "Check ATS compatibility", icon: ScanSearch, href: "/dashboard/tools/ats-scanner" },
  { name: "Resume Score", desc: "Get your resume scored", icon: Target, href: "/dashboard/tools/score" },
  { name: "Career Assistant", desc: "AI career guidance", icon: Bot, href: "/dashboard/tools/career-assistant" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back! <span className="gradient-text">John</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s an overview of your job search progress.</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map((action, i) => (
          <motion.div key={action.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link
              href={action.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition hover:border-primary/30 hover:shadow-md"
            >
              <div className={`rounded-lg bg-gradient-to-br ${action.color} p-2.5`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-medium">{action.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 + 0.2 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="flex items-center gap-1 text-xs text-emerald-500">
                <TrendingUp className="h-3 w-3" /> {stat.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Resumes */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="font-semibold">Recent Resumes</h2>
              <Link href="/dashboard/builder" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                <Plus className="h-3.5 w-3.5" /> New Resume
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentResumes.map((resume) => (
                <Link key={resume.id} href="/dashboard/builder" className="flex items-center gap-4 p-4 transition hover:bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{resume.title}</p>
                    <p className="text-xs text-muted-foreground">{resume.template} template &middot; {resume.updated}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      resume.score >= 90 ? "bg-emerald-500/10 text-emerald-500" :
                      resume.score >= 80 ? "bg-blue-500/10 text-blue-500" :
                      "bg-amber-500/10 text-amber-500"
                    }`}>
                      {resume.score}/100
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* AI Tools */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="font-semibold">AI Tools</h2>
          </div>
          <div className="space-y-1 p-2">
            {aiTools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-muted">
                <tool.icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <Link href="/dashboard/tools" className="flex items-center justify-center gap-1 text-xs font-medium text-primary hover:underline">
              View all tools <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
