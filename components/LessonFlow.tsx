"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { LessonConfig, LessonBlock } from "@/lib/lesson-types";
import { Lesson, Section } from "@/lib/course-data";
import {
  markComplete,
  markIncomplete,
  isComplete,
  setLastVisited,
  hasPassedCheckpoint,
  markCheckpointPassed,
  toggleBookmark,
  isBookmarked,
} from "@/lib/progress";
import { Badge } from "@/components/ui/badge";

import InteractiveDiagramBlock from "@/components/lesson-blocks/InteractiveDiagramBlock";
import CheckpointBlock from "@/components/lesson-blocks/CheckpointBlock";
import ComparisonBlock from "@/components/lesson-blocks/ComparisonBlock";
import PromptBuilderBlock from "@/components/lesson-blocks/PromptBuilderBlock";
import ClassificationBlock from "@/components/lesson-blocks/ClassificationBlock";
import MiniSimulationBlock from "@/components/lesson-blocks/MiniSimulationBlock";

interface Props {
  config: LessonConfig;
  lesson: Lesson;
  section: Section | null;
  next: Lesson | null;
  prev: Lesson | null;
}

// ── Lab block classification ───────────────────────────────────
const LAB_BLOCK_TYPES = new Set<LessonBlock["type"]>([
  "diagram",
  "comparison",
  "classification",
  "prompt-builder",
  "mini-simulation",
]);

type LessonPhase = "read" | "interact" | "check" | "wrap";

function getBlockPhase(block: LessonBlock): LessonPhase {
  switch (block.type) {
    case "diagram":
    case "comparison":
    case "classification":
    case "prompt-builder":
    case "mini-simulation":
      return "interact";
    case "checkpoint":
      return "check";
    case "takeaway":
      return "wrap";
    default:
      return "read";
  }
}

function getPhaseCopy(phase: LessonPhase) {
  switch (phase) {
    case "interact":
      return {
        label: "Try it",
        title: "Use the concept before moving on",
      };
    case "check":
      return {
        label: "Checkpoint",
        title: "Do one quick check before completion",
      };
    case "wrap":
      return {
        label: "Takeaway",
        title: "Land the rule you should remember",
      };
    default:
      return {
        label: "Read",
        title: "Get the idea in plain English first",
      };
  }
}

// ── Inline prose renderers ────────────────────────────────────

function HookSection({ headline, subtext }: { headline: string; subtext: string }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12">
      <p className="text-[11px] font-bold uppercase tracking-widest mb-3 font-heading" style={{ color: "#0F766E" }}>
        In this lesson
      </p>
      <h2 className="font-heading text-2xl font-extrabold mb-3 tracking-tight leading-snug" style={{ color: "#1F2937" }}>
        {headline}
      </h2>
      <p className="text-[16px] leading-[1.8]" style={{ color: "#6B7280" }}>
        {subtext}
      </p>
    </div>
  );
}

function ExplanationSection({
  paragraphs,
  engineerDepth,
}: {
  paragraphs: string[];
  engineerDepth?: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-9">
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[16px] leading-[1.8]" style={{ color: "#374151" }}>
            {p}
          </p>
        ))}
      </div>
      {engineerDepth && engineerDepth.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-full rounded-xl border px-4 py-3 text-left transition-colors"
            style={{
              color: "#1F2937",
              borderColor: open ? "#0F766E" : "#D7EDE8",
              backgroundColor: open ? "#F0FBF8" : "#F7FCFA",
              boxShadow: open ? "0 0 0 1px rgba(15,118,110,0.05)" : "none",
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border text-[10px] font-bold"
                style={{
                  borderColor: open ? "#0F766E" : "#99F6E4",
                  color: open ? "white" : "#0F766E",
                  backgroundColor: open ? "#0F766E" : "#CCFBF1",
                }}
              >
                {open ? "−" : "+"}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-widest font-heading" style={{ color: "#0F766E" }}>
                    Engineer Depth
                  </p>
                  <span className="text-[11px] font-medium" style={{ color: "#6B7280" }}>
                    {open ? "Hide" : "Show"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold leading-snug" style={{ color: "#1F2937" }}>
                  For engineers who want the implementation-level view
                </p>
                <p className="mt-1 text-[13px] leading-relaxed" style={{ color: "#6B7280" }}>
                  Commands, tool-use behavior, and how this concept maps to real codebase work.
                </p>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className="mt-3 rounded-xl border bg-white px-4 py-4 space-y-3"
                  style={{ borderColor: "#D7EDE8", boxShadow: "0 6px 18px rgba(15,118,110,0.06)" }}
                >
                  {engineerDepth.map((p, i) => (
                    <p key={i} className="text-[14px] leading-relaxed" style={{ color: "#4B5563" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function TakeawaySection({ text, note }: { text: string; note?: string }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-9">
      <div className="pl-4 border-l-4" style={{ borderColor: "#0F766E" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-2 font-heading" style={{ color: "#0F766E" }}>
          ✦ Key takeaway
        </p>
        <p className="font-heading font-bold text-[17px] leading-snug" style={{ color: "#1F2937" }}>
          {text}
        </p>
        {note && (
          <p className="text-[14px] mt-2 leading-relaxed" style={{ color: "#6B7280" }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Block dispatcher ──────────────────────────────────────────

function BlockRenderer({
  block,
  onCheckpointPass,
}: {
  block: LessonBlock;
  onCheckpointPass: () => void;
}) {
  switch (block.type) {
    case "hook":
      return <HookSection headline={block.headline} subtext={block.subtext} />;
    case "explanation":
      return <ExplanationSection paragraphs={block.paragraphs} engineerDepth={block.engineerDepth} />;
    case "diagram":
      return <InteractiveDiagramBlock title={block.title} steps={block.steps} />;
    case "comparison":
      return <ComparisonBlock title={block.title} left={block.left} right={block.right} insight={block.insight} />;
    case "prompt-builder":
      return <PromptBuilderBlock title={block.title} description={block.description} fields={block.fields} template={block.template} />;
    case "classification":
      return <ClassificationBlock title={block.title} instruction={block.instruction} categories={block.categories} items={block.items} />;
    case "mini-simulation":
      return (
        <MiniSimulationBlock
          title={block.title}
          description={block.description}
          steps={block.steps}
          completionMessage={block.completionMessage}
        />
      );
    case "checkpoint":
      return (
        <div className="max-w-2xl mx-auto px-4 py-6 sm:py-7">
          <CheckpointBlock questions={block.questions} onPass={onCheckpointPass} />
        </div>
      );
    case "takeaway":
      return <TakeawaySection text={block.text} note={block.note} />;
    default:
      return null;
  }
}

// ── Main LessonFlow component ─────────────────────────────────

export default function LessonFlow({ config, lesson, section, next, prev }: Props) {
  const [done, setDone] = useState(false);
  const [checkpointPassed, setCheckpointPassed] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const hasCheckpoint = config.blocks.some((b) => b.type === "checkpoint");

  useEffect(() => {
    queueMicrotask(() => {
      setDone(isComplete(config.slug));
      setCheckpointPassed(hasPassedCheckpoint(config.slug));
      setBookmarked(isBookmarked(config.slug));
    });
    setLastVisited(config.slug);
  }, [config.slug]);

  function handleCheckpointPass() {
    markCheckpointPassed(config.slug);
    setCheckpointPassed(true);
  }

  function handleToggleComplete() {
    if (done) {
      markIncomplete(config.slug);
      setDone(false);
      setJustCompleted(false);
    } else {
      markComplete(config.slug);
      setDone(true);
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 2000);
    }
  }

  function handleToggleBookmark() {
    setBookmarked(toggleBookmark(config.slug));
  }

  const canComplete = !hasCheckpoint || checkpointPassed || done;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="lesson-page-shell min-h-screen"
      style={{
        backgroundColor: "#F8F7F4",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] opacity-90"
        style={{
          background:
            "radial-gradient(circle at top center, rgba(15,118,110,0.11) 0%, rgba(15,118,110,0.05) 16%, transparent 44%), radial-gradient(circle at 14% 2%, rgba(15,118,110,0.045) 0%, transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(248,247,244,0) 100%)",
        }}
      />
      {/* Nav */}
      <nav
        className="sticky top-0 z-10 border-b px-4 sm:px-6 py-3 backdrop-blur-md"
        style={{ backgroundColor: "rgba(248,247,244,0.92)", borderColor: "#E7E5E4" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm" style={{ color: "#9CA3AF" }}>
            <Link href="/" className="font-heading font-bold transition-opacity hover:opacity-60" style={{ color: "#1F2937" }}>
              Claude Code Course
            </Link>
            <span>/</span>
            <Link href="/course" className="min-w-0 truncate transition-opacity hover:opacity-60">
              {section?.title ?? "Lessons"}
            </Link>
          </div>
          <motion.button
            onClick={handleToggleBookmark}
            whileTap={{ scale: 0.92 }}
            className="w-auto rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
            style={
              bookmarked
                ? { borderColor: "#FCD34D", backgroundColor: "#FFFBEB", color: "#B45309" }
                : { borderColor: "#E7E5E4", color: "#9CA3AF" }
            }
          >
            {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </motion.button>
        </div>
      </nav>

      {/* ── Lesson header — editorial, no card ── */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lesson-surface max-w-3xl mx-auto relative overflow-hidden rounded-[28px] px-5 py-7 sm:px-7 sm:py-8"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(248,247,244,0.96) 62%, rgba(204,251,241,0.18) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 right-[-56px] h-52 w-52 rounded-full"
            style={{ background: "radial-gradient(circle at center, rgba(15,118,110,0.14) 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(15,118,110,0.12) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 75%)",
            }}
          />
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] font-heading"
                style={{ borderColor: "#99F6E4", backgroundColor: "#CCFBF1", color: "#0F766E" }}
              >
                Interactive lesson
              </span>
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                style={{ borderColor: "#E7E5E4", backgroundColor: "#FFFFFF", color: "#6B7280" }}
              >
                Engineer depth optional
              </span>
            </div>
          {section && (
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3 font-heading" style={{ color: "#0F766E" }}>
              Section {section.id} · {section.title}
            </p>
          )}
          <h1 className="font-heading text-3xl sm:text-[2.15rem] font-extrabold tracking-tight mb-2 leading-[1.05]" style={{ color: "#1F2937" }}>
            {config.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="text-sm" style={{ color: "#8E8A83" }}>{config.duration}</span>
            <AnimatePresence>
              {done && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs font-semibold">✓ Complete</Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {config.objectives.length > 0 && (
            <div className="mt-6 rounded-2xl border px-4 py-4" style={{ borderColor: "#E7E5E4", backgroundColor: "rgba(255,255,255,0.82)" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3 font-heading" style={{ color: "#0F766E" }}>
                What you&apos;ll learn
              </p>
              <ul className="space-y-2.5">
                {config.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: "#CCFBF1", color: "#0F766E" }}
                    >
                      {i + 1}
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>
        </motion.div>
      </div>

      {/* ── Lesson body — mixed width, divider rhythm ── */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {config.blocks.map((block, i) => {
          const isLab = LAB_BLOCK_TYPES.has(block.type);
          const prevBlock = config.blocks[i - 1];
          const prevIsLab = prevBlock ? LAB_BLOCK_TYPES.has(prevBlock.type) : false;
          const phase = getBlockPhase(block);
          const prevPhase = prevBlock ? getBlockPhase(prevBlock) : null;
          const phaseCopy = getPhaseCopy(phase);
          const showDivider = i > 0;
          const showPhaseHeader = i > 0 && prevPhase !== phase;
          const blockSpacingClass =
            block.type === "hook"
              ? "py-1"
              : block.type === "explanation"
              ? "py-3 sm:py-4"
              : block.type === "takeaway"
              ? "py-5 sm:py-6"
              : block.type === "checkpoint"
              ? "py-6 sm:py-7"
              : isLab
              ? "py-7 sm:py-9"
              : "py-4 sm:py-5";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.035, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className={blockSpacingClass}
            >
              {showDivider && (
                <div className="max-w-3xl mx-auto">
                  {showPhaseHeader ? (
                    <div className="mb-7 sm:mb-8">
                      <div className="lesson-divider mb-4" />
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] font-heading"
                          style={{
                            borderColor: phase === "interact" || phase === "check" ? "#99F6E4" : "#E7E5E4",
                            backgroundColor: phase === "interact" || phase === "check" ? "#ECFDF5" : "#FFFFFF",
                            color: phase === "interact" || phase === "check" ? "#0F766E" : "#6B7280",
                          }}
                        >
                          {phaseCopy.label}
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                          {phaseCopy.title}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="lesson-divider mb-5 sm:mb-6" style={{ opacity: isLab !== prevIsLab ? 1 : 0.72 }} />
                  )}
                </div>
              )}
              <BlockRenderer block={block} onCheckpointPass={handleCheckpointPass} />
            </motion.div>
          );
        })}
      </div>

      {/* ── Completion area ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-8">
        <div className="lesson-divider mb-8 max-w-3xl mx-auto" />
        <div className="max-w-3xl mx-auto">
          <div className="lesson-surface rounded-[24px] px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] font-heading mb-2" style={{ color: "#0F766E" }}>
                  Finish this lesson
                </p>
                <p className="font-heading text-xl font-bold leading-tight" style={{ color: "#1F2937" }}>
                  {done ? "You’ve locked this lesson in." : "Complete the checkpoint, then mark this lesson done."}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={done ? "complete-state" : canComplete ? "ready-state" : "locked-state"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: done ? "#047857" : canComplete ? "#6B7280" : "#9CA3AF" }}
                  >
                    {done
                      ? next
                        ? "Nice work. You can head straight into the next lesson or undo completion if you clicked this too early."
                        : "Nice work. You’ve finished this lesson and can head back to the course overview whenever you’re ready."
                      : canComplete
                      ? "You’ve done the required interaction. Mark it complete when you’re ready to move forward."
                      : "Answer the checkpoint question above before this lesson can be completed."}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.button
                onClick={handleToggleComplete}
                disabled={!canComplete}
                aria-label={done ? `Toggle completion for ${lesson.title}` : `Mark ${lesson.title} complete`}
                whileHover={canComplete ? { scale: 1.015 } : {}}
                whileTap={canComplete ? { scale: 0.975 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-heading font-bold text-sm transition-colors"
                style={
                  !canComplete
                    ? { backgroundColor: "#E7E5E4", color: "#B0AFA9", cursor: "not-allowed" }
                    : done
                    ? { backgroundColor: "#D1FAE5", color: "#059669" }
                    : { backgroundColor: "#0F766E", color: "white" }
                }
              >
                <AnimatePresence mode="wait">
                  {justCompleted ? (
                    <motion.span key="done-flash" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                      Lesson complete
                    </motion.span>
                  ) : done ? (
                    <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Completed - click to undo</motion.span>
                  ) : (
                    <motion.span key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Mark lesson complete</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? (
            <motion.div whileHover={{ x: -2 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                href={`/course/lesson/${prev.slug}`}
                className="lesson-surface block h-full rounded-[22px] p-5 transition-colors"
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0F766E"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E7E5E4"; }}
              >
                <p className="text-[11px] mb-1 font-medium" style={{ color: "#9CA3AF" }}>← Previous</p>
                <p className="text-sm font-semibold font-heading leading-snug" style={{ color: "#1F2937" }}>{prev.title}</p>
              </Link>
            </motion.div>
          ) : <div />}

          {next ? (
            <motion.div whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                href={`/course/lesson/${next.slug}`}
                className="lesson-surface block h-full rounded-[22px] p-5 transition-colors sm:text-right"
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0F766E"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E7E5E4"; }}
              >
                <p className="text-[11px] mb-1 font-medium" style={{ color: "#9CA3AF" }}>Next →</p>
                <p className="text-sm font-semibold font-heading leading-snug" style={{ color: "#1F2937" }}>{next.title}</p>
              </Link>
            </motion.div>
          ) : (
            <div className="flex items-center justify-start sm:justify-end">
              <Link href="/course" className="text-sm font-semibold font-heading" style={{ color: "#0F766E" }}>
                Back to course →
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
