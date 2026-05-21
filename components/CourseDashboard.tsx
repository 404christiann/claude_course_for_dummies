"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "@/lib/course-data";
import { getCompletedSlugs, getLastVisited } from "@/lib/progress";
import { Badge } from "@/components/ui/badge";

interface Props {
  sections: Section[];
  totalLessons: number;
}

export default function CourseDashboard({ sections, totalLessons }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [lastVisited, setLastVisited] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCompleted(getCompletedSlugs());
    setLastVisited(getLastVisited());
    setMounted(true);
  }, []);

  const pct = Math.round((completed.length / totalLessons) * 100);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="backdrop-blur-sm border-b px-6 py-4 sticky top-0 z-10"
        style={{ backgroundColor: "rgba(248,247,244,0.92)", borderColor: "#E7E5E4" }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-bold tracking-tight transition-colors"
            style={{ color: "#1F2937" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#0F766E")}
            onMouseLeave={e => (e.currentTarget.style.color = "#1F2937")}
          >
            Claude Code Course
          </Link>
          <span className="text-sm font-medium" style={{ color: "#6B7280" }}>
            {completed.length} / {totalLessons} complete
          </span>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Progress card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl border shadow-sm p-6 mb-8"
          style={{ borderColor: "#E7E5E4" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-heading text-lg font-bold tracking-tight" style={{ color: "#1F2937" }}>
                Your Progress
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
                {completed.length === 0
                  ? `Start with section 1 of ${sections.length} below`
                  : `${completed.length} of ${totalLessons} lessons completed`}
              </p>
            </div>
            <motion.span
              key={pct}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-heading text-2xl font-extrabold tracking-tight"
              style={{ color: "#0F766E" }}
            >
              {pct}%
            </motion.span>
          </div>

          {/* Animated progress bar */}
          <div className="h-2.5 rounded-full overflow-hidden mb-4" style={{ backgroundColor: "#E7E5E4" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(to right, #0F766E, #059669)" }}
              initial={{ width: 0 }}
              animate={{ width: mounted ? `${pct}%` : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          {lastVisited ? (
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Continue where you left off:{" "}
              <Link href={`/course/lesson/${lastVisited}`} className="font-semibold hover:underline" style={{ color: "#0F766E" }}>
                Resume lesson →
              </Link>
            </p>
          ) : (
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Ready to begin?{" "}
              <Link href={`/course/lesson/${sections[0].lessons[0].slug}`} className="font-semibold hover:underline" style={{ color: "#0F766E" }}>
                Start Lesson 1 →
              </Link>
            </p>
          )}
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, sectionIdx) => {
            const sectionCompleted = section.lessons.filter((l) => completed.includes(l.slug)).length;
            const allDone = sectionCompleted === section.lessons.length;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + sectionIdx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border shadow-sm overflow-hidden"
                style={{ borderColor: "#E7E5E4" }}
              >
                {/* Section header */}
                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#F3F2EF" }}>
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-xl text-xs font-extrabold font-heading flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#CCFBF1", color: "#0F766E", border: "1px solid #99F6E4" }}
                    >
                      {section.id}
                    </span>
                    <h2 className="font-heading font-bold tracking-tight" style={{ color: "#1F2937" }}>
                      {section.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatePresence>
                      {allDone && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs font-semibold">
                            ✓ Complete
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!allDone && sectionCompleted > 0 && (
                      <Badge className="border-0 text-xs font-semibold" style={{ backgroundColor: "#CCFBF1", color: "#0F766E" }}>
                        In progress
                      </Badge>
                    )}
                    <span className="text-xs font-medium tabular-nums" style={{ color: "#9CA3AF" }}>
                      {sectionCompleted}/{section.lessons.length}
                    </span>
                  </div>
                </div>

                {/* Lessons */}
                <ul className="divide-y" style={{ borderColor: "#F3F2EF" }}>
                  {section.lessons.map((lesson, idx) => {
                    const done = completed.includes(lesson.slug);
                    const isCurrent = lesson.slug === lastVisited;

                    return (
                      <motion.li
                        key={lesson.slug}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Link
                          href={`/course/lesson/${lesson.slug}`}
                          className="flex items-center justify-between px-6 py-3.5 transition-colors group"
                          style={{ backgroundColor: isCurrent ? "#CCFBF120" : "transparent" }}
                          onMouseEnter={e => { if (!isCurrent) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F8F7F4"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = isCurrent ? "#CCFBF120" : "transparent"; }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.span
                              animate={done ? { scale: [1, 1.2, 1] } : {}}
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border transition-colors"
                              style={done
                                ? { backgroundColor: "#059669", borderColor: "#059669", color: "white" }
                                : { borderColor: "#E7E5E4", color: "#9CA3AF" }
                              }
                            >
                              {done ? "✓" : <span className="text-[10px]">{idx + 1}</span>}
                            </motion.span>
                            <span
                              className="text-sm font-medium transition-colors"
                              style={done ? { color: "#9CA3AF", textDecoration: "line-through" } : { color: "#1F2937" }}
                            >
                              {lesson.title}
                            </span>
                            {isCurrent && (
                              <span className="text-xs font-semibold" style={{ color: "#0F766E" }}>
                                ← last visited
                              </span>
                            )}
                          </div>
                          <span className="text-xs flex-shrink-0 ml-4 font-medium" style={{ color: "#9CA3AF" }}>
                            {lesson.duration}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
