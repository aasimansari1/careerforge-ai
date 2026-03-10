"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, X, Sparkles, Zap, Crown } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic tools",
    icon: Zap,
    color: "border-border",
    cta: "Get Started",
    ctaStyle: "border border-border hover:bg-muted",
    features: [
      { text: "3 resume exports/month", included: true },
      { text: "5 basic templates", included: true },
      { text: "Resume Score tool", included: true },
      { text: "ATS Scanner (limited)", included: true },
      { text: "Cover letter builder (1/month)", included: true },
      { text: "All 30 AI tools", included: false },
      { text: "All 40+ templates", included: false },
      { text: "Unlimited AI responses", included: false },
      { text: "Chrome extension", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Premium",
    price: "$12",
    period: "/month",
    description: "Everything you need to land the job",
    icon: Crown,
    color: "border-primary shadow-lg shadow-primary/10",
    badge: "Most Popular",
    cta: "Start 7-Day Free Trial",
    ctaStyle: "gradient-bg text-white hover:opacity-90",
    features: [
      { text: "Unlimited resume exports", included: true },
      { text: "All 40+ premium templates", included: true },
      { text: "All 30 AI-powered tools", included: true },
      { text: "Unlimited ATS scans", included: true },
      { text: "Unlimited cover letters", included: true },
      { text: "AI Interview Practice", included: true },
      { text: "Job Tracker dashboard", included: true },
      { text: "Chrome extension", included: true },
      { text: "Unlimited AI responses", included: true },
      { text: "Priority support", included: true },
    ],
  },
  {
    name: "Annual",
    price: "$7",
    period: "/month",
    description: "Best value — save 42%",
    icon: Sparkles,
    color: "border-emerald-500/50",
    badge: "Best Value",
    cta: "Start 7-Day Free Trial",
    ctaStyle: "bg-emerald-600 text-white hover:bg-emerald-700",
    features: [
      { text: "Everything in Premium", included: true },
      { text: "Billed annually ($84/year)", included: true },
      { text: "Save 42% vs monthly", included: true },
      { text: "Resume import from LinkedIn", included: true },
      { text: "AI job recommendations", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Resume A/B testing", included: true },
      { text: "Team collaboration", included: true },
      { text: "Custom branding", included: true },
      { text: "Dedicated support", included: true },
    ],
  },
];

const faqs = [
  { q: "Can I try Premium for free?", a: "Yes! All paid plans include a 7-day free trial. Cancel anytime before the trial ends and you won't be charged." },
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any time through account settings. Your access continues until the end of the billing period." },
  { q: "Are refunds available?", a: "We don't offer refunds for unused portions, but you can cancel anytime. We recommend starting with the free trial to ensure the platform fits your needs." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment system." },
  { q: "Do you offer team plans?", a: "Yes! The Annual plan includes team collaboration features. Contact us for custom enterprise pricing for teams of 10+." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl font-bold sm:text-4xl">Simple, Transparent <span className="gradient-text">Pricing</span></h1>
            <p className="mt-3 text-muted-foreground">Start free. Upgrade when you need more power.</p>
          </motion.div>

          {/* Plans */}
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border ${plan.color} bg-card p-6`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-bg px-3 py-0.5 text-xs font-bold text-white">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-4">
                  <plan.icon className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <Link href="/signup" className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${plan.ctaStyle}`}>
                  {plan.cta}
                </Link>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2 text-sm">
                      {f.included ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : (
                        <X className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                      )}
                      <span className={f.included ? "" : "text-muted-foreground/60"}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between p-4 text-left text-sm font-medium">
                    {faq.q}
                    <span className="text-muted-foreground">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
