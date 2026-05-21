"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Section } from "@/lib/course-data";

interface Props {
  sections: Section[];
  totalLessons: number;
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function InViewFadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function LandingPage({ sections, totalLessons }: Props) {
  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-50 px-6 py-4 backdrop-blur-sm border-b border-border"
        style={{ backgroundColor: "rgba(248,247,244,0.92)" }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-heading font-bold text-foreground tracking-tight">
            Claude Code Course
          </span>
          <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
            <Link
              href="/course"
              className="text-sm font-semibold transition-colors flex items-center gap-1"
              style={{ color: "#0F766E" }}
            >
              Start learning <span>→</span>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative max-w-3xl mx-auto px-6 pt-24 pb-20">
        {/* Soft teal glow blob */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle at center, #0F766E12, transparent 70%)" }}
        />

        <FadeUp delay={0.05}>
          <span
            className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6 border"
            style={{ backgroundColor: "#CCFBF1", color: "#0F766E", borderColor: "#99F6E4" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#0F766E" }} />
            Free · Self-paced · No signup required
          </span>
        </FadeUp>

        <FadeUp delay={0.12}>
          <h1 className="font-heading text-5xl sm:text-6xl font-extrabold text-foreground leading-[1.08] tracking-tight mb-6">
            Learn Claude Code
            <br />
            <span className="gradient-text">from scratch.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl font-light" style={{ color: "#6B7280" }}>
            A practical, self-paced course covering Claude Code fundamentals,
            context engineering, skills, MCPs, parallel agents, and agentic
            engineering through short, hands-on lessons with guided exercises.
          </p>
        </FadeUp>

        <FadeUp delay={0.28}>
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              <Link
                href="/course"
                className="inline-flex items-center justify-center text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
                style={{ backgroundColor: "#0F766E", boxShadow: "0 8px 24px #0F766E2A" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0D6B63")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0F766E")}
              >
                Start the course
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              <Link
                href="/course"
                className="inline-flex items-center justify-center border font-medium px-7 py-3.5 rounded-xl transition-colors"
                style={{ borderColor: "#E7E5E4", color: "#1F2937", backgroundColor: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F3F2EF")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                View curriculum
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>

      {/* Stats */}
      <InViewFadeUp>
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: sections.length, label: "Sections" },
              { value: totalLessons, label: "Lessons" },
              { value: 4, label: "Hours", suffix: "h" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-5 border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E7E5E4" }}
              >
                <p className="font-heading text-3xl font-extrabold tracking-tight" style={{ color: "#1F2937" }}>
                  <Counter target={stat.value} suffix={stat.suffix ?? ""} />
                </p>
                <p className="text-sm mt-1 font-medium" style={{ color: "#6B7280" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </InViewFadeUp>

      {/* Curriculum */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <InViewFadeUp>
          <h2 className="font-heading text-2xl font-bold mb-2 tracking-tight" style={{ color: "#1F2937" }}>
            What you&apos;ll learn
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#6B7280" }}>
            {sections.length} sections, {totalLessons} lessons, designed to take you from zero to practical agent workflows.
          </p>
        </InViewFadeUp>

        <div className="grid sm:grid-cols-2 gap-3">
          {sections.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 2) * 0.06 + Math.floor(i / 2) * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 p-5 rounded-2xl border bg-card shadow-sm transition-all cursor-default"
              style={{ borderColor: "#E7E5E4" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#99F6E4"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px #0F766E10"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E7E5E4"; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-xl text-xs font-extrabold font-heading flex items-center justify-center border"
                style={{ backgroundColor: "#CCFBF1", color: "#0F766E", borderColor: "#99F6E4" }}
              >
                {s.id}
              </span>
              <div>
                <p className="font-semibold text-sm leading-snug" style={{ color: "#1F2937" }}>{s.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{s.lessons.length} lessons</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <InViewFadeUp>
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div
            className="relative rounded-3xl overflow-hidden border p-8 sm:p-10"
            style={{ borderColor: "#99F6E4", background: "linear-gradient(135deg, #CCFBF130 0%, #FFFFFF 60%, #F8F7F4 100%)" }}
          >
            <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" />
            <div className="relative">
              <h2 className="font-heading text-xl font-bold mb-3 tracking-tight" style={{ color: "#1F2937" }}>
                How each lesson works
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[
                  { step: "01", title: "Why it matters", desc: "Every lesson opens with the real-world reason this concept exists." },
                  { step: "02", title: "Concept + Example", desc: "Plain-English explanation paired with a concrete, runnable example." },
                  { step: "03", title: "Exercise + Check-off", desc: "A short exercise to apply what you learned, then mark it done." },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="bg-white/90 backdrop-blur rounded-2xl p-4 border shadow-sm"
                    style={{ borderColor: "#E7E5E4" }}
                  >
                    <p className="text-xs font-bold mb-2 font-heading tracking-widest" style={{ color: "#0F766E" }}>{item.step}</p>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1F2937" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-xs text-center" style={{ color: "#9CA3AF" }}>
                Progress is saved locally — no account needed.
              </p>
            </div>
          </div>
        </section>
      </InViewFadeUp>

      {/* Final CTA */}
      <InViewFadeUp>
        <section className="max-w-3xl mx-auto px-6 pb-28 text-center">
          <h2 className="font-heading text-3xl font-extrabold mb-4 tracking-tight" style={{ color: "#1F2937" }}>
            Ready to start?
          </h2>
          <p className="mb-8 text-base" style={{ color: "#6B7280" }}>
            Free, no signup, no fluff. Just you, your terminal, and {totalLessons} practical lessons.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            className="inline-block"
          >
            <Link
              href="/course"
              className="inline-flex items-center gap-2 text-white font-bold px-9 py-4 rounded-2xl transition-colors text-base"
              style={{ backgroundColor: "#0F766E", boxShadow: "0 12px 32px #0F766E30" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0D6B63")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0F766E")}
            >
              Get started — it&apos;s free
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </section>
      </InViewFadeUp>

      <footer className="border-t py-8 text-center text-sm" style={{ borderColor: "#E7E5E4", color: "#9CA3AF" }}>
        Free · No ads · No signup · Made for learners
      </footer>
    </div>
  );
}
