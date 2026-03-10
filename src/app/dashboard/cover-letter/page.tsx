"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Sparkles, FileText, Briefcase, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const coverLetterTemplates = [
  { id: "executive", name: "Executive", style: "Professional and authoritative" },
  { id: "creative", name: "Creative Edge", style: "Bold and design-focused" },
  { id: "contemporary", name: "Contemporary", style: "Modern and clean" },
  { id: "traditional", name: "Traditional Plus", style: "Classic business style" },
  { id: "innovative", name: "Innovative", style: "Tech-forward approach" },
  { id: "elegant", name: "Elegant", style: "Refined and sophisticated" },
  { id: "essential", name: "Essential", style: "Minimal and focused" },
  { id: "dynamic", name: "Dynamic", style: "Energetic and impactful" },
  { id: "corporate", name: "Corporate", style: "Enterprise-ready" },
  { id: "artistry", name: "Artistry", style: "Creative professional" },
  { id: "streamline", name: "Streamline", style: "Clean and efficient" },
  { id: "formal", name: "Formal Business", style: "Traditional corporate" },
];

const sampleLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at your company. With over 6 years of experience in full-stack development and a proven track record of delivering scalable solutions, I am confident in my ability to contribute meaningfully to your team.

In my current role at Tech Corp, I have led the development of microservices architecture serving 2M+ daily active users, reducing API response time by 65% through strategic caching and query optimization. I have also mentored 5 junior developers, improving team velocity by 30%.

Previously at StartupXYZ, I built a React-based dashboard that increased user engagement by 45% and implemented CI/CD pipelines that reduced deployment time from 2 hours to 15 minutes. These experiences have honed my ability to deliver high-impact solutions in fast-paced environments.

I am particularly excited about the opportunity to work with your team because of your commitment to innovation and technical excellence. My expertise in React, TypeScript, Node.js, and cloud architecture aligns well with your tech stack and vision.

I would welcome the opportunity to discuss how my background and skills would benefit your team. Thank you for considering my application.

Best regards,
Alex Johnson`;

export default function CoverLetterPage() {
  const [jobTitle, setJobTitle] = useState("Senior Software Engineer");
  const [company, setCompany] = useState("Google");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("contemporary");
  const [generatedLetter, setGeneratedLetter] = useState(sampleLetter);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedLetter(sampleLetter);
      setGenerating(false);
      toast.success("Cover letter generated!");
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Editor */}
      <div className="w-full border-r border-border lg:w-[440px] flex flex-col">
        <div className="border-b border-border px-4 py-3">
          <h1 className="text-sm font-semibold">Cover Letter Builder</h1>
          <p className="text-xs text-muted-foreground">AI-powered cover letter generation</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Company Name</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Job Description (optional)</label>
            <textarea
              value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here for a more tailored cover letter..."
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Template Style</label>
            <div className="grid grid-cols-2 gap-2">
              {coverLetterTemplates.slice(0, 6).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`rounded-lg border p-2 text-left transition ${selectedTemplate === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                >
                  <p className="text-xs font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.style}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="gradient-bg flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {generating ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <Sparkles className="h-4 w-4" />
              </motion.div>
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {generating ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 flex flex-col bg-muted/30">
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">Preview</span>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button className="gradient-bg flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white">
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-10 text-gray-900 shadow-lg">
            <div className="mb-6 border-b border-gray-200 pb-4">
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              <p className="mt-2 text-sm font-medium">Re: {jobTitle} Position</p>
              <p className="text-sm text-gray-600">{company}</p>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {generatedLetter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
