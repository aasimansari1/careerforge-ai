"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Download, Eye, Palette, Plus, Trash2, GripVertical,
  Sparkles, ChevronDown, ChevronUp, User, Briefcase,
  GraduationCap, Wrench, Award, Languages
} from "lucide-react";
import { ResumeData, defaultResumeData, TemplateId, templates } from "@/lib/resumeData";
import { ResumePreview } from "@/components/ResumeTemplates";
import toast from "react-hot-toast";

type Section = "personal" | "experience" | "education" | "skills" | "certifications" | "languages";

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [templateId, setTemplateId] = useState<TemplateId>("modern");
  const [activeSection, setActiveSection] = useState<Section>("personal");
  const [showTemplates, setShowTemplates] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updatePersonal = useCallback((field: string, value: string) => {
    setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  }, []);

  const updateExperience = useCallback((id: string, field: string, value: string | boolean | string[]) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, { id: `exp${Date.now()}`, company: "", position: "", startDate: "", endDate: "", current: false, description: "", bullets: [""] }],
    }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  };

  const updateEducation = useCallback((id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, { id: `edu${Date.now()}`, institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }],
    }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  const handleExportPDF = async () => {
    const el = previewRef.current;
    if (!el) return;
    toast.loading("Generating PDF...", { id: "pdf" });
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      pdf.save(`${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`);
      toast.success("PDF downloaded!", { id: "pdf" });
    } catch {
      toast.error("Failed to generate PDF", { id: "pdf" });
    }
  };

  const sections: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "languages", label: "Languages", icon: Languages },
  ];

  const InputField = ({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
      />
    </div>
  );

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Editor Panel */}
      <div className={`${previewMode ? "hidden lg:flex" : "flex"} w-full flex-col border-r border-border lg:w-[480px]`}>
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h1 className="text-sm font-semibold">Resume Builder</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowTemplates(!showTemplates)} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-muted">
              <Palette className="h-3.5 w-3.5" /> Template
            </button>
            <button onClick={() => setPreviewMode(!previewMode)} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-muted lg:hidden">
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
            <button onClick={handleExportPDF} className="gradient-bg flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white">
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* Template Selector */}
        {showTemplates && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden border-b border-border">
            <div className="grid grid-cols-3 gap-2 p-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTemplateId(t.id); setShowTemplates(false); }}
                  className={`rounded-lg border p-3 text-left transition ${templateId === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                >
                  <p className="text-xs font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.category}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeSection === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <s.icon className="h-3.5 w-3.5" /> {s.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === "personal" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">AI-assisted editing available</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Full Name" value={data.personalInfo.fullName} onChange={(v) => updatePersonal("fullName", v)} />
                <InputField label="Job Title" value={data.personalInfo.title} onChange={(v) => updatePersonal("title", v)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Email" value={data.personalInfo.email} onChange={(v) => updatePersonal("email", v)} type="email" />
                <InputField label="Phone" value={data.personalInfo.phone} onChange={(v) => updatePersonal("phone", v)} />
              </div>
              <InputField label="Location" value={data.personalInfo.location} onChange={(v) => updatePersonal("location", v)} />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="LinkedIn" value={data.personalInfo.linkedin} onChange={(v) => updatePersonal("linkedin", v)} />
                <InputField label="Website" value={data.personalInfo.website} onChange={(v) => updatePersonal("website", v)} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Professional Summary</label>
                <textarea
                  value={data.personalInfo.summary}
                  onChange={(e) => updatePersonal("summary", e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>
            </div>
          )}

          {activeSection === "experience" && (
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="rounded-lg border border-border p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <span className="text-xs font-medium">Experience {idx + 1}</span>
                    </div>
                    <button onClick={() => removeExperience(exp.id)} className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Position" value={exp.position} onChange={(v) => updateExperience(exp.id, "position", v)} />
                      <InputField label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, "company", v)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, "startDate", v)} type="month" />
                      <div>
                        <InputField label="End Date" value={exp.endDate} onChange={(v) => updateExperience(exp.id, "endDate", v)} type="month" />
                        <label className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, "current", e.target.checked)} className="rounded border-border" />
                          Currently working here
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Bullet Points</label>
                      {exp.bullets.map((bullet, bi) => (
                        <div key={bi} className="mb-1.5 flex gap-1.5">
                          <span className="mt-2 text-xs text-muted-foreground">{bi + 1}.</span>
                          <input
                            value={bullet}
                            onChange={(e) => {
                              const newBullets = [...exp.bullets];
                              newBullets[bi] = e.target.value;
                              updateExperience(exp.id, "bullets", newBullets);
                            }}
                            placeholder="Describe your achievement..."
                            className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none transition focus:border-primary"
                          />
                          <button
                            onClick={() => {
                              const newBullets = exp.bullets.filter((_, i) => i !== bi);
                              updateExperience(exp.id, "bullets", newBullets);
                            }}
                            className="rounded p-1 text-muted-foreground hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => updateExperience(exp.id, "bullets", [...exp.bullets, ""])}
                        className="mt-1 flex items-center gap-1 text-xs font-medium text-primary"
                      >
                        <Plus className="h-3 w-3" /> Add bullet point
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addExperience} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary">
                <Plus className="h-3.5 w-3.5" /> Add Experience
              </button>
            </div>
          )}

          {activeSection === "education" && (
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="rounded-lg border border-border p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium">Education {idx + 1}</span>
                    <button onClick={() => removeEducation(edu.id)} className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <InputField label="Institution" value={edu.institution} onChange={(v) => updateEducation(edu.id, "institution", v)} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, "degree", v)} />
                      <InputField label="Field of Study" value={edu.field} onChange={(v) => updateEducation(edu.id, "field", v)} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <InputField label="Start Date" value={edu.startDate} onChange={(v) => updateEducation(edu.id, "startDate", v)} type="month" />
                      <InputField label="End Date" value={edu.endDate} onChange={(v) => updateEducation(edu.id, "endDate", v)} type="month" />
                      <InputField label="GPA" value={edu.gpa} onChange={(v) => updateEducation(edu.id, "gpa", v)} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addEducation} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary">
                <Plus className="h-3.5 w-3.5" /> Add Education
              </button>
            </div>
          )}

          {activeSection === "skills" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Add your technical and professional skills.</p>
              {data.skills.map((skill, i) => (
                <div key={i} className="flex gap-1.5">
                  <input
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...data.skills];
                      newSkills[i] = e.target.value;
                      setData((prev) => ({ ...prev, skills: newSkills }));
                    }}
                    placeholder="e.g., React, Python, Project Management"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                  <button onClick={() => setData((prev) => ({ ...prev, skills: prev.skills.filter((_, j) => j !== i) }))} className="rounded p-2 text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={() => setData((prev) => ({ ...prev, skills: [...prev.skills, ""] }))} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary">
                <Plus className="h-3.5 w-3.5" /> Add Skill
              </button>
            </div>
          )}

          {activeSection === "certifications" && (
            <div className="space-y-4">
              {data.certifications.map((cert, idx) => (
                <div key={cert.id} className="rounded-lg border border-border p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium">Certification {idx + 1}</span>
                    <button onClick={() => setData((prev) => ({ ...prev, certifications: prev.certifications.filter((c) => c.id !== cert.id) }))} className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <InputField label="Name" value={cert.name} onChange={(v) => setData((prev) => ({ ...prev, certifications: prev.certifications.map((c) => (c.id === cert.id ? { ...c, name: v } : c)) }))} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Issuer" value={cert.issuer} onChange={(v) => setData((prev) => ({ ...prev, certifications: prev.certifications.map((c) => (c.id === cert.id ? { ...c, issuer: v } : c)) }))} />
                      <InputField label="Date" value={cert.date} onChange={(v) => setData((prev) => ({ ...prev, certifications: prev.certifications.map((c) => (c.id === cert.id ? { ...c, date: v } : c)) }))} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => setData((prev) => ({ ...prev, certifications: [...prev.certifications, { id: `cert${Date.now()}`, name: "", issuer: "", date: "" }] }))} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary">
                <Plus className="h-3.5 w-3.5" /> Add Certification
              </button>
            </div>
          )}

          {activeSection === "languages" && (
            <div className="space-y-3">
              {data.languages.map((lang, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={lang.name} placeholder="Language"
                    onChange={(e) => { const l = [...data.languages]; l[i] = { ...l[i], name: e.target.value }; setData((prev) => ({ ...prev, languages: l })); }}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                  <select
                    value={lang.level}
                    onChange={(e) => { const l = [...data.languages]; l[i] = { ...l[i], level: e.target.value }; setData((prev) => ({ ...prev, languages: l })); }}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
                  >
                    <option>Native</option><option>Fluent</option><option>Advanced</option><option>Intermediate</option><option>Beginner</option>
                  </select>
                  <button onClick={() => setData((prev) => ({ ...prev, languages: prev.languages.filter((_, j) => j !== i) }))} className="rounded p-2 text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={() => setData((prev) => ({ ...prev, languages: [...prev.languages, { name: "", level: "Intermediate" }] }))} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary">
                <Plus className="h-3.5 w-3.5" /> Add Language
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className={`${previewMode ? "flex" : "hidden lg:flex"} flex-1 flex-col bg-muted/30`}>
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{templates.find(t => t.id === templateId)?.name} Template</span>
            <button onClick={() => setPreviewMode(false)} className="rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-muted lg:hidden">
              Close
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-[210mm] shadow-xl" ref={previewRef}>
            <ResumePreview data={data} templateId={templateId} />
          </div>
        </div>
      </div>
    </div>
  );
}
