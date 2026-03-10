"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

const links = {
  Product: [
    { name: "Resume Builder", href: "/dashboard/builder" },
    { name: "Cover Letter Builder", href: "/dashboard/cover-letter" },
    { name: "AI Tools", href: "/dashboard/tools" },
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
  ],
  Resources: [
    { name: "Blog", href: "/blog" },
    { name: "Resume Examples", href: "/templates" },
    { name: "ATS Guide", href: "/blog" },
    { name: "Interview Tips", href: "/blog" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="gradient-bg flex h-8 w-8 items-center justify-center rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">CareerForge <span className="gradient-text">AI</span></span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Build your perfect resume with AI. Land interviews 20x faster.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-3 text-sm font-semibold">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CareerForge AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
