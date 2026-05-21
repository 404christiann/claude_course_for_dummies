"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Lesson, Section } from "@/lib/course-data";
import { LessonFrontmatter } from "@/lib/lessons";
import {
  markComplete,
  markIncomplete,
  isComplete,
  setLastVisited,
  toggleBookmark,
  isBookmarked,
} from "@/lib/progress";
import { Badge } from "@/components/ui/badge";

interface Props {
  slug: string;
  lesson: Lesson;
  section: Section | null;
  children: React.ReactNode; // rendered MDX passed from server page
  frontmatter: LessonFrontmatter | null;
  next: Lesson | null;
  prev: Lesson | null;
}

export default function LessonReader({
  slug,
  lesson,
  section,
  children,
  frontmatter,
  next,
  prev,
}: Props) {
  const [done, setDone] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    setDone(isComplete(slug));
    setBookmarked(isBookmarked(slug));
    setLastVisited(slug);
  }, [slug]);

  function handleToggleComplete() {
    if (done) {
      markIncomplete(slug);
      setDone(false);
      setJustCompleted(false);
    } else {
      markComplete(slug);
      setDone(true);
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 1800);
    }
  }

  function handleToggleBookmark() {
    const result = toggleBookmark(slug);
    setBookmarked(result);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}
    >
      {/* Sticky nav */}
      <nav className="sticky top-0 z-10 backdrop-blur-sm border-b px-6 py-3" style={{ backgroundColor: "rgba(248,247,244,0.92)", borderColor: "#E7E5E4" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-900 transition-colors font-semibold font-heading">
              Claude Code Course
            </Link>
            <span>/</span>
            <Link href="/course" className="hover:text-gray-700 transition-colors">
              {section?.title ?? "Lessons"}
            </Link>
          </div>
          <motion.button
            onClick={handleToggleBookmark}
            whileTap={{ scale: 0.92 }}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              bookmarked
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-gray-200 text-gray-400 hover:bg-gray-50"
            }`}
          >
            {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </motion.button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl border px-8 py-12 shadow-sm" style={{ borderColor: "#E7E5E4" }}>
        {/* Lesson header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          {section && (
            <p className="text-xs font-bold uppercase tracking-widest mb-3 font-heading" style={{ color: "#0F766E" }}>
              Section {section.id} · {section.title}
            </p>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
            {frontmatter?.title ?? lesson.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-400 font-medium">{lesson.duration} read</span>
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs font-semibold">
                    ✓ Complete
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Objectives */}
          {frontmatter?.objectives && frontmatter.objectives.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-6 p-5 rounded-2xl border"
              style={{ backgroundColor: "#CCFBF130", borderColor: "#99F6E4" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3 font-heading" style={{ color: "#0F766E" }}>
                What you&apos;ll learn
              </p>
              <ul className="space-y-2">
                {frontmatter.objectives.map((obj, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2.5">
                    <span className="mt-0.5 font-bold flex-shrink-0" style={{ color: "#0F766E" }}>→</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10" />

        {/* MDX content */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="prose-none"
        >
          {children ?? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10 text-center">
              <p className="text-amber-700 font-semibold font-heading text-lg mb-1">
                Content coming soon
              </p>
              <p className="text-amber-600 text-sm">
                This lesson is being written. Check back soon!
              </p>
            </div>
          )}
        </motion.article>

        {/* Complete button */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <motion.button
            onClick={handleToggleComplete}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
            className="relative w-full sm:w-auto px-8 py-3.5 rounded-2xl font-heading font-bold text-sm transition-all overflow-hidden"
            style={done
              ? { backgroundColor: "#D1FAE5", color: "#059669" }
              : { backgroundColor: "#0F766E", color: "white", boxShadow: "0 8px 24px #0F766E2A" }
            }
          >
            <AnimatePresence mode="wait">
              {justCompleted ? (
                <motion.span
                  key="confetti"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  🎉 Lesson complete!
                </motion.span>
              ) : done ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  ✓ Complete — click to undo
                </motion.span>
              ) : (
                <motion.span
                  key="todo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  Mark lesson complete
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Prev / Next nav */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <motion.div whileHover={{ x: -3 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                href={`/course/lesson/${prev.slug}`}
                className="block p-5 rounded-2xl border transition-all group h-full"
                style={{ borderColor: "#E7E5E4" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#99F6E4"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#CCFBF118"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E7E5E4"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = ""; }}
              >
                <p className="text-xs mb-1.5 font-medium" style={{ color: "#9CA3AF" }}>← Previous</p>
                <p className="text-sm font-semibold leading-snug font-heading transition-colors" style={{ color: "#1F2937" }}>
                  {prev.title}
                </p>
              </Link>
            </motion.div>
          ) : (
            <div />
          )}

          {next ? (
            <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                href={`/course/lesson/${next.slug}`}
                className="block p-5 rounded-2xl border transition-all group text-right h-full"
                style={{ borderColor: "#E7E5E4" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#99F6E4"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#CCFBF118"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E7E5E4"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = ""; }}
              >
                <p className="text-xs mb-1.5 font-medium" style={{ color: "#9CA3AF" }}>Next →</p>
                <p className="text-sm font-semibold leading-snug font-heading transition-colors" style={{ color: "#1F2937" }}>
                  {next.title}
                </p>
              </Link>
            </motion.div>
          ) : (
            <div className="flex items-center justify-end">
              <Link
                href="/course"
                className="text-sm font-semibold hover:underline font-heading" style={{ color: "#0F766E" }}
              >
                Back to course →
              </Link>
            </div>
          )}
        </div>
        </div>{/* end white card */}
      </div>
    </motion.div>
  );
}
