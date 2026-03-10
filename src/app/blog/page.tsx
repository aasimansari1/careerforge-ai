"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

const categories = ["All", "Resume", "Job Interview", "Career", "Cover Letter", "Product Updates"];

const articles = [
  { id: 1, title: "How to Beat ATS Systems in 2026: The Complete Guide", category: "Resume", readTime: "8 min", date: "Mar 8, 2026", excerpt: "Learn the latest strategies to optimize your resume for Applicant Tracking Systems and land more interviews.", featured: true },
  { id: 2, title: "10 Resume Formatting Mistakes That Cost You Interviews", category: "Resume", readTime: "5 min", date: "Mar 5, 2026", excerpt: "Avoid these common formatting errors that cause ATS systems to reject your resume.", featured: false },
  { id: 3, title: "The Perfect Resume Keywords Strategy for Any Industry", category: "Resume", readTime: "6 min", date: "Mar 3, 2026", excerpt: "How to research and implement the right keywords to pass ATS filters.", featured: false },
  { id: 4, title: "Top 20 Behavioral Interview Questions and Best Answers", category: "Job Interview", readTime: "10 min", date: "Feb 28, 2026", excerpt: "Master the STAR method with these commonly asked behavioral interview questions.", featured: false },
  { id: 5, title: "How to Write a Thank You Email After an Interview", category: "Job Interview", readTime: "4 min", date: "Feb 25, 2026", excerpt: "Templates and tips for crafting the perfect follow-up email.", featured: false },
  { id: 6, title: "Remote Jobs: Top 50 Companies Hiring in 2026", category: "Career", readTime: "7 min", date: "Feb 22, 2026", excerpt: "Discover the best companies offering remote positions across tech, finance, and more.", featured: true },
  { id: 7, title: "Cover Letter Examples That Actually Work", category: "Cover Letter", readTime: "6 min", date: "Feb 20, 2026", excerpt: "Real cover letter examples that landed interviews at top companies.", featured: false },
  { id: 8, title: "5 Cover Letter Opening Lines That Grab Attention", category: "Cover Letter", readTime: "4 min", date: "Feb 18, 2026", excerpt: "Stop using 'I am writing to apply' — try these powerful alternatives.", featured: false },
  { id: 9, title: "How to Explain Employment Gaps on Your Resume", category: "Resume", readTime: "5 min", date: "Feb 15, 2026", excerpt: "Turn resume gaps into strengths with these proven strategies.", featured: false },
  { id: 10, title: "Salary Negotiation: A Step-by-Step Guide", category: "Career", readTime: "8 min", date: "Feb 12, 2026", excerpt: "How to negotiate your salary with confidence and get what you deserve.", featured: false },
  { id: 11, title: "AI Resume Builder: How It Works and Why You Need One", category: "Product Updates", readTime: "5 min", date: "Feb 10, 2026", excerpt: "How CareerForge AI uses artificial intelligence to create perfect resumes.", featured: false },
  { id: 12, title: "The Ultimate Job Interview Preparation Checklist", category: "Job Interview", readTime: "6 min", date: "Feb 8, 2026", excerpt: "Everything you need to do before, during, and after your interview.", featured: false },
];

const gradients = ["from-violet-500 to-purple-600", "from-blue-500 to-cyan-500", "from-emerald-500 to-green-600", "from-orange-500 to-red-500", "from-pink-500 to-rose-500"];

import { useState } from "react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);
  const featured = articles.filter((a) => a.featured);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold sm:text-4xl">Career <span className="gradient-text">Blog</span></h1>
            <p className="mt-3 text-muted-foreground">Tips, guides, and insights to accelerate your job search.</p>
          </div>

          {/* Featured */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {featured.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-card hover:shadow-lg transition">
                  <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} p-6 flex items-end`}>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">{article.category}</span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-bold group-hover:text-primary transition">{article.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat ? "gradient-bg text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <div className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary/30 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      <Tag className="h-2.5 w-2.5" /> {article.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition text-sm">{article.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{article.date}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
