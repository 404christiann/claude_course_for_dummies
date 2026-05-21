"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ClassificationItem, ClassificationCategory } from "@/lib/lesson-types";

const COLORS = {
  teal:   { solid: "#0F766E", light: "#CCFBF1", text: "#0F766E" },
  amber:  { solid: "#D97706", light: "#FEF3C7", text: "#D97706" },
  violet: { solid: "#7C3AED", light: "#EDE9FE", text: "#7C3AED" },
  blue:   { solid: "#2563EB", light: "#DBEAFE", text: "#2563EB" },
};

interface Props {
  title: string;
  instruction: string;
  categories: ClassificationCategory[];
  items: ClassificationItem[];
}

export default function ClassificationBlock({ title, instruction, categories, items }: Props) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAssigned = items.every((item) => assignments[item.id]);

  function assign(itemId: string, categoryId: string) {
    if (submitted) return;
    setAssignments((prev) => ({ ...prev, [itemId]: categoryId }));
  }

  function handleSubmit() {
    if (!allAssigned) return;
    setSubmitted(true);
  }

  function handleReset() {
    setAssignments({});
    setSubmitted(false);
  }

  const correctCount = submitted
    ? items.filter((item) => assignments[item.id] === item.correctCategory).length
    : 0;
  const allCorrect = correctCount === items.length;

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E7E5E4" }}>
      {/* Dark header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-3 sm:px-6" style={{ backgroundColor: "#1F2937" }}>
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ backgroundColor: "#4C1D95", color: "#DDD6FE", letterSpacing: "0.08em" }}
        >
          Exercise
        </span>
        <p className="font-heading font-bold text-sm" style={{ color: "#F9FAFB" }}>
          {title}
        </p>
      </div>

      <div className="bg-white p-5 sm:p-6">
        {/* Instruction + category key */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <p className="text-sm" style={{ color: "#6B7280" }}>{instruction}</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => {
              const c = COLORS[cat.color ?? "teal"];
              return (
                <span
                  key={cat.id}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: c.solid, color: "white" }}
                >
                  {cat.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Items grid — 2-col on sm+, collapses to 1-col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          {items.map((item) => {
            const assignedCat = categories.find((c) => c.id === assignments[item.id]);
            const isCorrect = submitted && assignments[item.id] === item.correctCategory;
            const isWrong = submitted && assignments[item.id] && assignments[item.id] !== item.correctCategory;
            const correctCat = categories.find((c) => c.id === item.correctCategory);

            // Border-only state after submit — no background tints
            let borderColor = "#E7E5E4";
            if (isCorrect) borderColor = "#059669";
            if (isWrong) borderColor = "#EF4444";

            return (
              <div
                key={item.id}
                className="rounded-lg border px-3.5 py-3 bg-white transition-colors"
                style={{ borderColor }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-2.5">
                  <p className="text-sm leading-snug sm:flex-1" style={{ color: "#1F2937" }}>
                    {item.text}
                  </p>
                  {!submitted && (
                    <div className="flex flex-wrap gap-1.5 sm:max-w-[48%] sm:justify-end">
                      {categories.map((cat) => {
                        const c = COLORS[cat.color ?? "teal"];
                        const isSelected = assignments[item.id] === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => assign(item.id, cat.id)}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors"
                            style={
                              isSelected
                                ? { backgroundColor: c.solid, borderColor: c.solid, color: "white" }
                                : { backgroundColor: "white", borderColor: "#E7E5E4", color: "#9CA3AF" }
                            }
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {submitted && (
                    <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
                      {isWrong && assignedCat && (
                        <span className="text-[11px] line-through" style={{ color: "#9CA3AF" }}>
                          {assignedCat.label}
                        </span>
                      )}
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: isCorrect ? "#059669" : "#374151" }}
                      >
                        {isCorrect ? `✓ ${correctCat?.label}` : `→ ${correctCat?.label}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit / result */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button
                onClick={handleSubmit}
                disabled={!allAssigned}
                className="text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
                style={
                  allAssigned
                    ? { backgroundColor: "#0F766E", color: "white" }
                    : { backgroundColor: "#F3F4F6", color: "#B0AFA9", cursor: "not-allowed" }
                }
              >
                {allAssigned ? "Check answers" : `Assign all ${items.length} items to continue`}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 rounded-lg border-l-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              style={{
                borderColor: allCorrect ? "#059669" : "#D97706",
                backgroundColor: "#FAFAF9",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: allCorrect ? "#059669" : "#D97706" }}>
                {allCorrect
                  ? `✓ Perfect — ${correctCount}/${items.length} correct`
                  : `${correctCount}/${items.length} correct — correct answers shown above`}
              </p>
              <button
                onClick={handleReset}
                className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors"
                style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
