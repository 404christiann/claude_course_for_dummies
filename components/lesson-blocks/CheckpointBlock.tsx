"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { CheckpointQuestion } from "@/lib/lesson-types";

interface Props {
  questions: CheckpointQuestion[];
  onPass: () => void;
}

type QuestionState = "unanswered" | "correct" | "wrong";

export default function CheckpointBlock({ questions, onPass }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<QuestionState>("unanswered");
  const [allPassed, setAllPassed] = useState(false);

  const q = questions[current];

  function handleSelect(idx: number) {
    if (state === "correct") return;
    setSelected(idx);
    if (idx === q.correctIndex) {
      setState("correct");
      if (current === questions.length - 1) {
        setTimeout(() => setAllPassed(true), 500);
        onPass();
      }
    } else {
      setState("wrong");
    }
  }

  function handleNext() {
    setCurrent((c) => c + 1);
    setSelected(null);
    setState("unanswered");
  }

  function handleRetry() {
    setSelected(null);
    setState("unanswered");
  }

  if (allPassed) {
    return (
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "#059669" }}
      >
        <div className="px-5 py-3" style={{ backgroundColor: "#059669" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest font-heading" style={{ color: "rgba(255,255,255,0.65)" }}>
            ✦ Quick checkpoint
          </p>
        </div>
        <div className="bg-white px-5 py-6 text-center">
          <p className="font-heading font-bold text-base mb-1" style={{ color: "#059669" }}>
            ✓ Checkpoint complete
          </p>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            You&apos;re ready to mark this lesson complete.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E7E5E4" }}>
      {/* Dark header */}
      <div className="flex flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between" style={{ backgroundColor: "#1F2937" }}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest font-heading" style={{ color: "#4B5563" }}>
            ✦ Quick checkpoint
          </p>
          <p className="mt-1 text-[11px]" style={{ color: "#6B7280" }}>
            One fast check before you mark the lesson complete.
          </p>
        </div>
        <div className="text-right">
          {questions.length > 1 && (
            <p className="text-[10px]" style={{ color: "#4B5563" }}>
              {current + 1} / {questions.length}
            </p>
          )}
          <p className="mt-1 text-[10px]" style={{ color: "#6B7280" }}>
            Low pressure
          </p>
        </div>
      </div>

      <div className="bg-white px-5 py-5">
        {/* Question */}
        <p className="font-heading font-semibold text-[15px] leading-snug mb-4" style={{ color: "#1F2937" }}>
          {q.question}
        </p>

        {/* Options — border-only state changes, no background fills */}
        <div className="space-y-2 mb-4">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === q.correctIndex;

            let borderColor = "#E7E5E4";
            let textColor = "#374151";
            let letterColor = "#9CA3AF";
            let letterBorderColor = "#E7E5E4";

            if (isSelected && state === "correct") {
              borderColor = "#059669"; textColor = "#059669";
              letterColor = "#059669"; letterBorderColor = "#059669";
            } else if (isSelected && state === "wrong") {
              borderColor = "#EF4444"; textColor = "#DC2626";
              letterColor = "#EF4444"; letterBorderColor = "#EF4444";
            } else if (state === "correct" && isCorrect && !isSelected) {
              borderColor = "#059669"; textColor = "#059669";
              letterColor = "#059669"; letterBorderColor = "#059669";
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleSelect(idx)}
                whileHover={state !== "correct" ? { x: 2 } : {}}
                whileTap={state !== "correct" ? { scale: 0.99 } : {}}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-colors"
                style={{ borderColor, backgroundColor: "white", color: textColor }}
              >
                <span
                  className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors"
                  style={{ borderColor: letterBorderColor, color: letterColor }}
                >
                  {isSelected && state === "correct" ? "✓"
                    : isSelected && state === "wrong" ? "✗"
                    : String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback — left border accent on neutral bg */}
        <AnimatePresence>
          {state !== "unanswered" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg px-4 py-3 mb-4"
              style={
                state === "correct"
                  ? { borderLeft: "3px solid #059669", backgroundColor: "#FAFAF9" }
                  : { borderLeft: "3px solid #EF4444", backgroundColor: "#FAFAF9" }
              }
            >
              {state === "correct" ? (
                <p className="text-sm" style={{ color: "#374151" }}>
                  <span className="font-semibold" style={{ color: "#059669" }}>Correct. </span>
                  {q.explanation}
                </p>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm" style={{ color: "#374151" }}>
                    Not quite — give it another try.
                  </p>
                  <button
                    onClick={handleRetry}
                    className="text-xs font-bold px-3 py-1 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                  >
                    Retry
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {state === "correct" && current < questions.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="text-sm font-bold px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#0F766E", color: "white" }}
          >
            Next question →
          </motion.button>
        )}
      </div>
    </div>
  );
}
