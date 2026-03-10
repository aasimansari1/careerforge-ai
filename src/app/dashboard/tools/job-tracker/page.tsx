"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Briefcase, Calendar, MapPin, ExternalLink, Trash2, Filter } from "lucide-react";

type Status = "applied" | "interview" | "offer" | "rejected" | "saved";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: Status;
  date: string;
  url: string;
  salary: string;
}

const statusColors: Record<Status, string> = {
  saved: "bg-gray-500/10 text-gray-500",
  applied: "bg-blue-500/10 text-blue-500",
  interview: "bg-amber-500/10 text-amber-500",
  offer: "bg-emerald-500/10 text-emerald-500",
  rejected: "bg-red-500/10 text-red-500",
};

const initialJobs: Job[] = [
  { id: "1", title: "Senior Software Engineer", company: "Google", location: "Mountain View, CA", status: "interview", date: "2026-03-05", url: "#", salary: "$180k-$250k" },
  { id: "2", title: "Full Stack Developer", company: "Meta", location: "Remote", status: "applied", date: "2026-03-03", url: "#", salary: "$160k-$220k" },
  { id: "3", title: "Staff Engineer", company: "Stripe", location: "San Francisco, CA", status: "offer", date: "2026-02-28", url: "#", salary: "$200k-$280k" },
  { id: "4", title: "Backend Engineer", company: "Netflix", location: "Los Gatos, CA", status: "applied", date: "2026-03-07", url: "#", salary: "$170k-$240k" },
  { id: "5", title: "Frontend Engineer", company: "Airbnb", location: "San Francisco, CA", status: "rejected", date: "2026-02-20", url: "#", salary: "$150k-$210k" },
  { id: "6", title: "Platform Engineer", company: "Vercel", location: "Remote", status: "saved", date: "2026-03-08", url: "#", salary: "$140k-$190k" },
];

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);
  const counts = {
    all: jobs.length,
    saved: jobs.filter((j) => j.status === "saved").length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interview: jobs.filter((j) => j.status === "interview").length,
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" /> Job Tracker
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Track and manage all your job applications.</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="gradient-bg flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white">
          <Plus className="h-4 w-4" /> Add Job
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {(["all", "saved", "applied", "interview", "offer", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-lg border p-3 text-center transition ${filter === s ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
          >
            <p className="text-lg font-bold">{counts[s]}</p>
            <p className="text-xs capitalize text-muted-foreground">{s}</p>
          </button>
        ))}
      </div>

      {/* Add Job Form */}
      {showAdd && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mb-6 rounded-xl border border-border bg-card p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const newJob: Job = {
              id: Date.now().toString(),
              title: (form.elements.namedItem("title") as HTMLInputElement).value,
              company: (form.elements.namedItem("company") as HTMLInputElement).value,
              location: (form.elements.namedItem("location") as HTMLInputElement).value,
              salary: (form.elements.namedItem("salary") as HTMLInputElement).value,
              url: "#",
              status: "saved",
              date: new Date().toISOString().split("T")[0],
            };
            setJobs([newJob, ...jobs]);
            setShowAdd(false);
          }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input name="title" placeholder="Job Title" required className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input name="company" placeholder="Company" required className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input name="location" placeholder="Location" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input name="salary" placeholder="Salary Range" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <div className="sm:col-span-2 lg:col-span-4 flex gap-2">
              <button type="submit" className="gradient-bg rounded-lg px-4 py-2 text-xs font-medium text-white">Save Job</button>
              <button type="button" onClick={() => setShowAdd(false)} className="rounded-lg border border-border px-4 py-2 text-xs font-medium hover:bg-muted">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Job List */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map((job) => (
            <div key={job.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{job.title}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span>{job.company}</span>
                  <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{job.location}</span>
                  <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{job.date}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">{job.salary}</span>
              <select
                value={job.status}
                onChange={(e) => setJobs(jobs.map((j) => j.id === job.id ? { ...j, status: e.target.value as Status } : j))}
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[job.status]} border-0 outline-none cursor-pointer`}
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
              <button onClick={() => setJobs(jobs.filter((j) => j.id !== job.id))} className="rounded p-1 text-muted-foreground hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
