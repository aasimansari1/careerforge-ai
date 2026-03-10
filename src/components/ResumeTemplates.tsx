"use client";

import { ResumeData, TemplateId } from "@/lib/resumeData";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
}

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[297mm] text-[10pt] leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-violet-600 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{data.personalInfo.fullName}</h1>
        <p className="text-violet-600 font-medium mt-0.5">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
          {data.personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{data.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-1">Professional Summary</h2>
          <p className="text-xs text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-2">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm">{exp.position}</p>
                  <p className="text-xs text-gray-600">{exp.company}</p>
                </div>
                <p className="text-xs text-gray-500 shrink-0">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</p>
              </div>
              {exp.bullets.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.map((b, i) => b && (
                    <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                      <span className="text-violet-600 mt-0.5">&#8226;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-2">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-sm">{edu.degree} in {edu.field}</p>
                <p className="text-xs text-gray-600">{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</p>
              </div>
              <p className="text-xs text-gray-500 shrink-0">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill) => skill && (
              <span key={skill} className="rounded bg-violet-50 border border-violet-200 px-2 py-0.5 text-xs text-violet-700">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-2">Certifications</h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between text-xs mb-1">
              <span><span className="font-medium">{cert.name}</span> — {cert.issuer}</span>
              <span className="text-gray-500">{cert.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-2">Languages</h2>
          <div className="flex gap-4">
            {data.languages.map((lang) => lang.name && (
              <span key={lang.name} className="text-xs"><span className="font-medium">{lang.name}</span> — {lang.level}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 min-h-[297mm] text-[10pt] leading-relaxed">
      {/* Dark header */}
      <div className="bg-gray-900 text-white px-8 py-6">
        <h1 className="text-2xl font-bold">{data.personalInfo.fullName}</h1>
        <p className="text-gray-300 mt-0.5">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8">
        {data.personalInfo.summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1">Summary</h2>
            <p className="text-xs text-gray-700">{data.personalInfo.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1">Professional Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-bold text-sm">{exp.position}</p>
                  <p className="text-xs text-gray-500">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</p>
                </div>
                <p className="text-xs text-gray-600 italic">{exp.company}</p>
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.map((b, i) => b && <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-gray-400">{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1">Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold text-xs">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}

          <div>
            {data.skills.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1">Skills</h2>
                <p className="text-xs text-gray-700">{data.skills.filter(Boolean).join(" • ")}</p>
              </div>
            )}
            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1">Certifications</h2>
                {data.certifications.map((c) => (
                  <p key={c.id} className="text-xs text-gray-700">{c.name} — {c.issuer} ({c.date})</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SimpleTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[297mm] text-[10pt] leading-relaxed">
      <div className="text-center mb-4 pb-3 border-b border-gray-300">
        <h1 className="text-xl font-bold uppercase tracking-wide">{data.personalInfo.fullName}</h1>
        <p className="text-sm text-gray-600 mt-0.5">{data.personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-1.5 text-xs text-gray-500">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>|</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>|</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-3">
          <p className="text-xs text-gray-700 text-center">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-2.5">
              <div className="flex justify-between">
                <span className="font-semibold text-sm">{exp.position}, <span className="font-normal text-gray-600">{exp.company}</span></span>
                <span className="text-xs text-gray-500">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</span>
              </div>
              <ul className="mt-0.5 space-y-0.5 list-disc list-inside">
                {exp.bullets.map((b, i) => b && <li key={i} className="text-xs text-gray-700">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between mb-1.5">
              <span className="text-sm"><span className="font-semibold">{edu.degree} in {edu.field}</span>, {edu.institution}{edu.gpa && ` (GPA: ${edu.gpa})`}</span>
              <span className="text-xs text-gray-500">{formatDate(edu.endDate)}</span>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <p className="text-xs text-gray-700">{data.skills.filter(Boolean).join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 min-h-[297mm] text-[10pt] leading-relaxed flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mx-auto">
            {data.personalInfo.fullName.split(" ").map(n => n[0]).join("")}
          </div>
          <h1 className="text-lg font-bold text-center mt-3">{data.personalInfo.fullName}</h1>
          <p className="text-xs text-center text-indigo-200">{data.personalInfo.title}</p>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-indigo-200 mb-1.5">Contact</h3>
            <div className="space-y-1 text-indigo-100">
              {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
              {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-indigo-200 mb-1.5">Skills</h3>
              <div className="space-y-1">
                {data.skills.filter(Boolean).map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded bg-white/20">
                      <div className="h-full rounded bg-white" style={{ width: `${70 + Math.random() * 30}%` }} />
                    </div>
                    <span className="text-xs w-16 shrink-0">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-indigo-200 mb-1.5">Languages</h3>
              {data.languages.filter(l => l.name).map((lang) => (
                <p key={lang.name} className="text-indigo-100">{lang.name} — {lang.level}</p>
              ))}
            </div>
          )}

          {data.certifications.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-indigo-200 mb-1.5">Certifications</h3>
              {data.certifications.map((c) => (
                <p key={c.id} className="text-indigo-100 mb-1">{c.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        {data.personalInfo.summary && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-indigo-600 mb-1.5">About Me</h2>
            <p className="text-xs text-gray-700">{data.personalInfo.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-indigo-600 mb-2">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3 relative pl-4 border-l-2 border-indigo-200">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-600" />
                <p className="font-semibold text-sm">{exp.position}</p>
                <p className="text-xs text-gray-500">{exp.company} | {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</p>
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.map((b, i) => b && <li key={i} className="text-xs text-gray-700">• {b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-indigo-600 mb-2">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2 pl-4 border-l-2 border-indigo-200 relative">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-600" />
                <p className="font-semibold text-xs">{edu.degree} in {edu.field}</p>
                <p className="text-xs text-gray-600">{edu.institution} | {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AcademicTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[297mm] text-[10pt] leading-relaxed">
      <div className="text-center mb-4">
        <h1 className="text-xl font-serif font-bold">{data.personalInfo.fullName}</h1>
        <p className="text-sm text-gray-600">{data.personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-1 text-xs text-gray-500">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
      </div>
      <hr className="border-gray-800 mb-3" />

      {data.personalInfo.summary && (
        <div className="mb-3">
          <h2 className="text-xs font-serif font-bold uppercase mb-1">Research Interests</h2>
          <p className="text-xs text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-serif font-bold uppercase border-b border-gray-800 pb-0.5 mb-2">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between mb-1.5">
              <div>
                <p className="text-sm font-semibold">{edu.degree} in {edu.field}</p>
                <p className="text-xs text-gray-600">{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</p>
              </div>
              <p className="text-xs text-gray-500">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
            </div>
          ))}
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-serif font-bold uppercase border-b border-gray-800 pb-0.5 mb-2">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-2.5">
              <div className="flex justify-between">
                <span className="font-semibold text-sm">{exp.position}, {exp.company}</span>
                <span className="text-xs text-gray-500">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</span>
              </div>
              <ul className="mt-0.5 space-y-0.5 list-disc list-inside">
                {exp.bullets.map((b, i) => b && <li key={i} className="text-xs text-gray-700">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-serif font-bold uppercase border-b border-gray-800 pb-0.5 mb-2">Technical Skills</h2>
          <p className="text-xs text-gray-700">{data.skills.filter(Boolean).join(", ")}</p>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-serif font-bold uppercase border-b border-gray-800 pb-0.5 mb-2">Certifications & Awards</h2>
          {data.certifications.map((c) => (
            <p key={c.id} className="text-xs text-gray-700 mb-0.5">{c.name}, {c.issuer} ({c.date})</p>
          ))}
        </div>
      )}
    </div>
  );
}

export function DeveloperTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 min-h-[297mm] text-[10pt] leading-relaxed">
      <div className="bg-emerald-600 text-white px-8 py-5">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{data.personalInfo.fullName}</h1>
            <p className="text-emerald-100 mt-0.5">{data.personalInfo.title}</p>
          </div>
          <div className="text-right text-xs text-emerald-100 space-y-0.5">
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
            {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {data.personalInfo.summary && (
          <div className="mb-4 p-3 bg-emerald-50 rounded border-l-4 border-emerald-600">
            <p className="text-xs text-gray-700">{data.personalInfo.summary}</p>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-emerald-600 mb-2">Tech Stack</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.filter(Boolean).map((skill) => (
                <span key={skill} className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-emerald-600 mb-2">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-sm">{exp.position}</p>
                    <p className="text-xs text-gray-500">{exp.company}</p>
                  </div>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 h-fit">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                </div>
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.map((b, i) => b && (
                    <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                      <span className="text-emerald-500 font-mono">▸</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-emerald-600 mb-2">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between mb-1.5">
                <div>
                  <p className="font-semibold text-xs">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const templateMap: Record<TemplateId, React.FC<TemplateProps>> = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  simple: SimpleTemplate,
  creative: CreativeTemplate,
  academic: AcademicTemplate,
  developer: DeveloperTemplate,
};

export function ResumePreview({ data, templateId }: { data: ResumeData; templateId: TemplateId }) {
  const Template = templateMap[templateId] || ModernTemplate;
  return <Template data={data} />;
}
