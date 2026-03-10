"use client";

import { useState } from "react";
import { Settings, User, Bell, Shield, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Profile */}
      <div className="rounded-xl border border-border bg-card p-6 mb-4">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><User className="h-4 w-4 text-primary" /> Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>
        <button onClick={() => toast.success("Profile saved!")} className="gradient-bg mt-4 rounded-lg px-4 py-2 text-xs font-medium text-white">Save Changes</button>
      </div>

      {/* Subscription */}
      <div className="rounded-xl border border-border bg-card p-6 mb-4">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><CreditCard className="h-4 w-4 text-primary" /> Subscription</h2>
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <div>
            <p className="text-sm font-medium">Free Plan</p>
            <p className="text-xs text-muted-foreground">Basic templates and limited AI tools</p>
          </div>
          <a href="/pricing" className="gradient-bg rounded-lg px-4 py-2 text-xs font-medium text-white">Upgrade</a>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-6 mb-4">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><Bell className="h-4 w-4 text-primary" /> Notifications</h2>
        <div className="space-y-3">
          {["Email notifications", "Job match alerts", "Weekly resume tips"].map((n) => (
            <label key={n} className="flex items-center justify-between">
              <span className="text-sm">{n}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary" />
            </label>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
        <h2 className="font-semibold flex items-center gap-2 mb-4 text-red-500"><Shield className="h-4 w-4" /> Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-3">Once you delete your account, there is no going back.</p>
        <button className="rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10">Delete Account</button>
      </div>
    </div>
  );
}
