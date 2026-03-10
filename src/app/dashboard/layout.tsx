"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  FileText, LayoutDashboard, PenTool, Wrench, Briefcase,
  Settings, Sun, Moon, Menu, X, LogOut, ChevronLeft
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Resume Builder", href: "/dashboard/builder", icon: FileText },
  { name: "Cover Letter", href: "/dashboard/cover-letter", icon: PenTool },
  { name: "AI Tools", href: "/dashboard/tools", icon: Wrench },
  { name: "Job Tracker", href: "/dashboard/tools/job-tracker", icon: Briefcase },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex h-full flex-col ${mobile ? "w-64" : collapsed ? "w-16" : "w-64"} border-r border-border bg-card transition-all duration-300`}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="gradient-bg flex h-7 w-7 items-center justify-center rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold">CareerForge <span className="gradient-text">AI</span></span>
          </Link>
        )}
        {collapsed && (
          <div className="gradient-bg mx-auto flex h-7 w-7 items-center justify-center rounded-lg">
            <FileText className="h-4 w-4 text-white" />
          </div>
        )}
        {!mobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-1 text-muted-foreground hover:bg-muted hidden lg:block">
            <ChevronLeft className={`h-4 w-4 transition ${collapsed ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {(!collapsed || mobile) && item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-2 space-y-1">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-muted">
          {theme === "dark" ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
          {(!collapsed || mobile) && (theme === "dark" ? "Light Mode" : "Dark Mode")}
        </button>
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-muted">
          <LogOut className="h-4 w-4 shrink-0" />
          {(!collapsed || mobile) && "Sign Out"}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-border px-4 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="gradient-bg flex h-7 w-7 items-center justify-center rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold">CareerForge <span className="gradient-text">AI</span></span>
          </Link>
          <div className="w-9" />
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
