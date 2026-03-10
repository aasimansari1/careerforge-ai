"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Star, Download, Eye } from "lucide-react";

const categories = ["All", "Simple", "Professional", "Modern", "Creative", "ATS Friendly"];

const allTemplates = [
  { id: 1, name: "Modern", category: "Modern", industry: "General", popular: true },
  { id: 2, name: "Professional", category: "Professional", industry: "Corporate", popular: true },
  { id: 3, name: "Simple", category: "Simple", industry: "General", popular: true },
  { id: 4, name: "Creative", category: "Creative", industry: "Design", popular: true },
  { id: 5, name: "Academic", category: "ATS Friendly", industry: "Academic", popular: false },
  { id: 6, name: "Developer", category: "Modern", industry: "Software Engineering", popular: true },
  { id: 7, name: "Codebase", category: "Modern", industry: "Software Engineering", popular: false },
  { id: 8, name: "Elevate", category: "Professional", industry: "Executive", popular: true },
  { id: 9, name: "Secure", category: "ATS Friendly", industry: "Cybersecurity", popular: false },
  { id: 10, name: "Data", category: "Modern", industry: "Data Science", popular: false },
  { id: 11, name: "Legal", category: "Professional", industry: "Law", popular: false },
  { id: 12, name: "Finance", category: "Professional", industry: "Accounting", popular: false },
  { id: 13, name: "Care", category: "Simple", industry: "Healthcare", popular: false },
  { id: 14, name: "Teach", category: "Simple", industry: "Education", popular: false },
  { id: 15, name: "Civil", category: "ATS Friendly", industry: "Civil Engineering", popular: false },
  { id: 16, name: "Electric", category: "Modern", industry: "Electrical Engineering", popular: false },
  { id: 17, name: "Product", category: "Professional", industry: "Product Management", popular: false },
  { id: 18, name: "Startup", category: "Creative", industry: "Entrepreneurship", popular: false },
  { id: 19, name: "Minimal", category: "Simple", industry: "General", popular: false },
  { id: 20, name: "Bold", category: "Creative", industry: "Marketing", popular: false },
  { id: 21, name: "Classic", category: "Professional", industry: "General", popular: false },
  { id: 22, name: "Impact", category: "Modern", industry: "Sales", popular: false },
  { id: 23, name: "Sleek", category: "Modern", industry: "Tech", popular: false },
  { id: 24, name: "Clean", category: "Simple", industry: "General", popular: false },
];

const colors = ["from-violet-500 to-purple-600", "from-blue-500 to-cyan-500", "from-emerald-500 to-green-600", "from-orange-500 to-red-500", "from-pink-500 to-rose-500", "from-indigo-500 to-violet-600", "from-teal-500 to-emerald-500", "from-amber-500 to-orange-500"];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? allTemplates : allTemplates.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold sm:text-4xl">Resume <span className="gradient-text">Templates</span></h1>
            <p className="mt-3 text-muted-foreground">40+ professional, ATS-optimized templates for every industry.</p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
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

          {/* Template Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((template, i) => (
              <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/30 hover:shadow-lg">
                  {/* Preview */}
                  <div className={`relative aspect-[3/4] bg-gradient-to-br ${colors[i % colors.length]} p-6`}>
                    <div className="h-full rounded-lg bg-white p-4 shadow-lg">
                      <div className="space-y-2">
                        <div className="h-3 w-24 rounded bg-gray-800" />
                        <div className="h-2 w-32 rounded bg-gray-300" />
                        <div className="mt-3 h-px bg-gray-200" />
                        <div className="h-2 w-full rounded bg-gray-100" />
                        <div className="h-2 w-5/6 rounded bg-gray-100" />
                        <div className="h-2 w-full rounded bg-gray-100" />
                        <div className="mt-2 h-2 w-16 rounded bg-gray-400" />
                        <div className="h-2 w-full rounded bg-gray-100" />
                        <div className="h-2 w-4/5 rounded bg-gray-100" />
                      </div>
                    </div>
                    {template.popular && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        <Star className="h-3 w-3" /> Popular
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100">
                      <Link href="/dashboard/builder" className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-medium text-gray-900 transition hover:bg-gray-100">
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </Link>
                      <Link href="/dashboard/builder" className="gradient-bg flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-white">
                        Use Template
                      </Link>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <p className="text-sm font-medium">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.industry} &middot; {template.category}</p>
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
