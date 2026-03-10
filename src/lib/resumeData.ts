export interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    bullets: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }[];
  skills: string[];
  languages: { name: string; level: string }[];
  certifications: { id: string; name: string; issuer: string; date: string }[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
    summary: "Results-driven Senior Software Engineer with 6+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Led teams of 5-8 developers, delivering projects that increased revenue by 40%.",
  },
  experience: [
    {
      id: "exp1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "",
      bullets: [
        "Led development of microservices architecture serving 2M+ daily active users",
        "Reduced API response time by 65% through caching and query optimization",
        "Mentored 5 junior developers, improving team velocity by 30%",
      ],
    },
    {
      id: "exp2",
      company: "StartupXYZ",
      position: "Software Engineer",
      startDate: "2019-06",
      endDate: "2021-12",
      current: false,
      description: "",
      bullets: [
        "Built React-based dashboard that increased user engagement by 45%",
        "Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes",
        "Developed RESTful APIs serving 500K+ requests daily",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-06",
      gpa: "3.8",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL", "Git", "Agile/Scrum"],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Intermediate" },
  ],
  certifications: [
    { id: "cert1", name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023" },
  ],
};

export type TemplateId = "modern" | "professional" | "simple" | "creative" | "academic" | "developer";

export const templates: { id: TemplateId; name: string; category: string; description: string }[] = [
  { id: "modern", name: "Modern", category: "Modern", description: "Clean, contemporary design with accent colors" },
  { id: "professional", name: "Professional", category: "Professional", description: "Classic layout for corporate roles" },
  { id: "simple", name: "Simple", category: "Simple", description: "Minimal and content-focused" },
  { id: "creative", name: "Creative", category: "Creative", description: "Bold design with unique layout" },
  { id: "academic", name: "Academic", category: "ATS Friendly", description: "Structured for academic positions" },
  { id: "developer", name: "Developer", category: "Modern", description: "Tech-focused with skills emphasis" },
];
