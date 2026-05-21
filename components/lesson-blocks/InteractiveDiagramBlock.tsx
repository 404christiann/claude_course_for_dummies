"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { DiagramStep } from "@/lib/lesson-types";
import LessonTerminal from "@/components/lesson-blocks/LessonTerminal";

const COLORS = {
  teal:   { solid: "#0F766E", light: "#CCFBF1", border: "#0F766E", shadow: "rgba(15,118,110,0.2)" },
  amber:  { solid: "#D97706", light: "#FEF3C7", border: "#D97706", shadow: "rgba(217,119,6,0.2)"  },
  violet: { solid: "#7C3AED", light: "#EDE9FE", border: "#7C3AED", shadow: "rgba(124,58,237,0.2)" },
  blue:   { solid: "#2563EB", light: "#DBEAFE", border: "#2563EB", shadow: "rgba(37,99,235,0.2)"  },
  rose:   { solid: "#E11D48", light: "#FFE4E6", border: "#E11D48", shadow: "rgba(225,29,72,0.2)"  },
};

const SURFACE_BORDER = "#E7E5E4";
const SURFACE_DIVIDER = "#F3F2EF";
const HEADER_BG = "#0F172A";
const HEADER_BADGE_BG = "#134E4A";
const HEADER_BADGE_TEXT = "#5EEAD4";

interface Props {
  title: string;
  steps: DiagramStep[];
}

export default function InteractiveDiagramBlock({ title, steps }: Props) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "");

  const activeIdx = steps.findIndex((s) => s.id === activeId);
  const activeStep = steps[activeIdx] ?? steps[0];
  const color = COLORS[activeStep?.color ?? "teal"];

  function goNext() {
    if (activeIdx < steps.length - 1) setActiveId(steps[activeIdx + 1].id);
  }
  function goPrev() {
    if (activeIdx > 0) setActiveId(steps[activeIdx - 1].id);
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
      style={{ borderColor: SURFACE_BORDER }}
    >
      <div
        className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6"
        style={{ backgroundColor: HEADER_BG }}
      >
        <div className="flex items-start gap-3">
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]"
            style={{ backgroundColor: HEADER_BADGE_BG, color: HEADER_BADGE_TEXT }}
          >
            Interactive diagram
          </span>
          <div>
            <p className="font-heading text-sm font-bold" style={{ color: "#F9FAFB" }}>
              {title}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              Move step by step to see how the explanation and example change.
            </p>
          </div>
        </div>

        <div
          className="w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold"
          style={{ borderColor: "#1F2937", backgroundColor: "#111827", color: "#A7F3D0" }}
        >
          Step {activeIdx + 1} of {steps.length}
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
          {steps.map((step, i) => {
            const isActive = step.id === activeId;
            const c = COLORS[step.color ?? "teal"];
            return (
              <motion.button
                key={step.id}
                onClick={() => setActiveId(step.id)}
                whileHover={!isActive ? { y: -1 } : {}}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex flex-col items-start rounded-xl border-2 px-4 py-3.5 text-left transition-colors duration-150"
                style={
                  isActive
                    ? {
                        borderColor: c.solid,
                        backgroundColor: c.solid,
                        boxShadow: `0 4px 14px ${c.shadow}`,
                      }
                    : {
                        borderColor: "#E7E5E4",
                        backgroundColor: "white",
                      }
                }
              >
                <span
                  className="text-[9px] font-bold uppercase tracking-widest mb-1 font-heading"
                  style={{ color: isActive ? "rgba(255,255,255,0.55)" : "#C4C3BC" }}
                >
                  Step {i + 1}
                </span>
                <span
                  className="font-heading font-extrabold text-[15px] leading-tight"
                  style={{ color: isActive ? "white" : "#1F2937" }}
                >
                  {step.label}
                </span>
                <span
                  className="text-[11px] mt-1 leading-snug"
                  style={{ color: isActive ? "rgba(255,255,255,0.7)" : "#C4C3BC" }}
                >
                  {step.headline}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Detail panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: SURFACE_BORDER }}
          >
            <div
              className="flex flex-col gap-2 border-b px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between"
              style={{ backgroundColor: "#FAFAF9", borderColor: SURFACE_DIVIDER }}
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] leading-relaxed">
                <span className="font-bold font-heading uppercase tracking-[0.12em]" style={{ color: color.solid }}>
                  {activeStep?.label}
                </span>
                <span className="font-normal tracking-normal" style={{ color: "#9CA3AF" }}>
                  {activeStep?.headline}
                </span>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: color.light, color: color.solid }}
              >
                {activeIdx === steps.length - 1 ? "Loop complete" : "Follow the loop"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div
                className="p-5 flex flex-col bg-white"
                style={activeStep?.example ? { borderRight: `1px solid ${SURFACE_DIVIDER}` } : {}}
              >
                <div
                  className="mb-4 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-semibold"
                  style={{ backgroundColor: color.light, color: color.solid }}
                >
                  Why this step matters
                </div>
                <p className="text-[14px] leading-[1.8] flex-1" style={{ color: "#374151" }}>
                  {activeStep?.explanation}
                </p>

                <div
                  className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ borderColor: SURFACE_DIVIDER }}
                >
                  <motion.button
                    onClick={goPrev}
                    disabled={activeIdx === 0}
                    whileTap={activeIdx > 0 ? { scale: 0.95 } : {}}
                    className="w-full rounded-lg px-3 py-2 text-xs font-bold transition-colors sm:w-auto"
                    style={
                      activeIdx === 0
                        ? { color: "#D1D0CC", cursor: "not-allowed" }
                        : { color: "#6B7280", backgroundColor: "#F3F4F6" }
                    }
                  >
                    ← Back
                  </motion.button>

                  {activeIdx < steps.length - 1 ? (
                    <motion.button
                      onClick={goNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full rounded-lg px-4 py-2 text-left text-xs font-bold sm:w-auto sm:text-center"
                      style={{ backgroundColor: color.solid, color: "white" }}
                    >
                      Next: {steps[activeIdx + 1].label} →
                    </motion.button>
                  ) : (
                    <span
                      className="w-full rounded-lg px-3 py-2 text-center text-xs font-semibold sm:w-auto"
                      style={{ backgroundColor: "#F0FDF4", color: "#059669" }}
                    >
                      ✓ All steps covered
                    </span>
                  )}
                </div>
              </div>

              {activeStep?.example && (
                <div
                  className="flex flex-col p-5"
                  style={{ background: "linear-gradient(180deg, #111827 0%, #0F172A 100%)" }}
                >
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p
                      className="font-heading text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "#6B7280" }}
                    >
                      Terminal Example
                    </p>
                    <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                      Concrete output for this step
                    </p>
                  </div>
                  <LessonTerminal
                    headerNote="Example"
                    minHeight={220}
                    frameClassName="flex-1"
                    headerRight={
                      <span
                        className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                        style={{ borderColor: "#1F2937", color: "#6B7280", backgroundColor: "#111827" }}
                      >
                        {activeStep.label}
                      </span>
                    }
                  >
                    <pre className="font-mono text-xs leading-[1.85] whitespace-pre-wrap" style={{ color: "#86EFAC" }}>
                        {activeStep.example}
                    </pre>
                  </LessonTerminal>
                  <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "#6B7280" }}>
                    The example panel keeps the same terminal language used elsewhere in the lesson so learners can recognize “real output” immediately.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
