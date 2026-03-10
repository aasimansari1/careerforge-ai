"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText, Sparkles, ScanSearch, PenTool, Target, Briefcase,
  Bot, MessageSquare, Zap, Shield, TrendingUp, Users,
  ArrowRight, CheckCircle2, Star, ChevronRight
} from "lucide-react";

const stats = [
  { value: "40%", label: "Higher hiring chances", icon: TrendingUp },
  { value: "15x", label: "Faster applications", icon: Zap },
  { value: "20x", label: "More interviews", icon: Users },
  { value: "42%", label: "More recruiter replies", icon: Target },
];

const tools = [
  { name: "AI Resume Builder", desc: "Create ATS-optimized resumes from scratch", icon: FileText, color: "from-violet-500 to-purple-600" },
  { name: "Resume Optimizer", desc: "Scan and optimize for any target role", icon: Sparkles, color: "from-blue-500 to-cyan-500" },
  { name: "ATS Scanner", desc: "Full ATS compatibility check with scoring", icon: ScanSearch, color: "from-emerald-500 to-green-600" },
  { name: "Cover Letter Builder", desc: "Generate tailored cover letters instantly", icon: PenTool, color: "from-orange-500 to-red-500" },
  { name: "Resume Score", desc: "Real-time scoring against job listings", icon: Target, color: "from-pink-500 to-rose-600" },
  { name: "AI Interview Practice", desc: "Practice HR and technical interviews", icon: MessageSquare, color: "from-indigo-500 to-violet-600" },
  { name: "Job Tracker", desc: "Manage all your job applications", icon: Briefcase, color: "from-amber-500 to-orange-600" },
  { name: "Career Assistant", desc: "Personalized career recommendations", icon: Bot, color: "from-teal-500 to-emerald-600" },
];

const features = [
  "30+ AI-powered career tools",
  "40+ professional resume templates",
  "ATS-optimized formatting",
  "One-click PDF export",
  "Chrome extension for autofill",
  "Real-time resume scoring",
];

const testimonials = [
  { name: "Sarah Chen", role: "Software Engineer at Google", text: "CareerForge AI helped me land my dream job. The ATS scanner caught issues I never would have found." , rating: 5 },
  { name: "Marcus Rivera", role: "Product Manager at Meta", text: "The AI resume optimizer completely transformed my resume. Got 3x more callbacks within a week.", rating: 5 },
  { name: "Priya Sharma", role: "Data Scientist at Amazon", text: "Best resume builder I've used. The cover letter generator saved me hours of writing.", rating: 5 },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-gradient-end/20 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" /> Powered by Advanced AI
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Build Your Perfect Resume{" "}
              <span className="gradient-text">with AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              Create ATS-optimized resumes, generate cover letters, and land your dream job with our 30+ AI-powered career tools. Join thousands of successful job seekers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link
                href="/dashboard/builder"
                className="gradient-bg group flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
              >
                Build Your Resume Free <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/templates"
                className="flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-semibold transition hover:bg-muted"
              >
                View Templates
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-accent" /> Free to start</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-accent" /> No credit card</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-accent" /> ATS-optimized</span>
            </motion.div>
          </div>

          {/* Hero Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground">CareerForge AI - Resume Builder</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="border-r border-border p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-3 w-32 rounded bg-primary/20" />
                      <div className="h-8 w-64 rounded-lg bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-primary/20" />
                      <div className="h-8 w-full rounded-lg bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-28 rounded bg-primary/20" />
                      <div className="h-20 w-full rounded-lg bg-muted" />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="h-9 w-24 rounded-lg bg-primary/30" />
                      <div className="h-9 w-24 rounded-lg bg-muted" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <div className="mx-auto max-w-xs space-y-3">
                    <div className="text-center">
                      <div className="mx-auto h-4 w-40 rounded bg-gray-800" />
                      <div className="mx-auto mt-1 h-2 w-56 rounded bg-gray-300" />
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="space-y-1">
                      <div className="h-2.5 w-20 rounded bg-primary/60" />
                      <div className="h-2 w-full rounded bg-gray-200" />
                      <div className="h-2 w-5/6 rounded bg-gray-200" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2.5 w-24 rounded bg-primary/60" />
                      <div className="h-2 w-full rounded bg-gray-200" />
                      <div className="h-2 w-4/5 rounded bg-gray-200" />
                      <div className="h-2 w-full rounded bg-gray-200" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2.5 w-16 rounded bg-primary/60" />
                      <div className="flex flex-wrap gap-1">
                        {["React", "TypeScript", "Node.js", "Python"].map((s) => (
                          <div key={s} className="rounded bg-primary/10 px-2 py-0.5 text-[8px] text-primary">{s}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">30+ AI-Powered <span className="gradient-text">Career Tools</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Everything you need to build, optimize, and submit the perfect job application.</p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, i) => (
              <motion.div key={tool.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
                <Link
                  href="/dashboard"
                  className="group block rounded-xl border border-border bg-card p-5 transition hover:border-primary/30 hover:shadow-lg"
                >
                  <div className={`mb-3 inline-flex rounded-lg bg-gradient-to-br ${tool.color} p-2.5`}>
                    <tool.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tool.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                    Try it <ChevronRight className="h-3 w-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/dashboard/tools" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View all 30 tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-bold sm:text-4xl">Everything You Need to <span className="gradient-text">Land the Job</span></h2>
              <p className="mt-4 text-muted-foreground">Our platform provides a complete job application ecosystem powered by cutting-edge AI.</p>
              <ul className="mt-6 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="gradient-bg mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Resume Score</h3>
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-sm font-bold text-accent">92/100</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "ATS Compatibility", score: 95, color: "bg-emerald-500" },
                    { label: "Keyword Match", score: 88, color: "bg-blue-500" },
                    { label: "Content Quality", score: 92, color: "bg-violet-500" },
                    { label: "Formatting", score: 96, color: "bg-amber-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.score}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-accent/10 p-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-accent">
                    <Shield className="h-4 w-4" /> Your resume is ATS-ready!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Loved by <span className="gradient-text">Job Seekers</span></h2>
            <p className="mt-4 text-muted-foreground">Join thousands who landed their dream jobs with CareerForge AI.</p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-gradient-end text-sm font-bold text-white">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gradient-bg overflow-hidden rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Build Your Perfect Resume?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">Start for free. No credit card required. Join 100,000+ job seekers who trust CareerForge AI.</p>
            <Link
              href="/dashboard/builder"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition hover:bg-gray-100"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
