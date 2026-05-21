"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LessonTerminal from "@/components/lesson-blocks/LessonTerminal";
import type { SimulationStep } from "@/lib/lesson-types";

interface Props {
  title: string;
  description: string;
  steps: SimulationStep[];
  completionMessage?: string;
}

type StepState = "idle" | "correct" | "wrong";

export default function MiniSimulationBlock({
  title,
  description,
  steps,
  completionMessage = "You completed the full workflow. The important pattern is not speed, it is closing the loop before moving on.",
}: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [stepState, setStepState] = useState<StepState>("idle");
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);

  const activeStep = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFinished = steps.length > 0 && completedStepIds.length === steps.length;

  if (!activeStep) {
    return null;
  }

  function handleSelect(choiceId: string) {
    if (stepState === "correct" || isFinished) return;

    setSelectedChoiceId(choiceId);

    if (choiceId === activeStep.correctChoiceId) {
      setStepState("correct");
      setCompletedStepIds((prev) =>
        prev.includes(activeStep.id) ? prev : [...prev, activeStep.id]
      );
      return;
    }

    setStepState("wrong");
  }

  function handleContinue() {
    if (isLastStep) return;
    setCurrentStep((prev) => prev + 1);
    setSelectedChoiceId(null);
    setStepState("idle");
  }

  function handleRetry() {
    setSelectedChoiceId(null);
    setStepState("idle");
  }

  const activeChoice = activeStep.choices.find((choice) => choice.id === selectedChoiceId);
  const progressCount = isFinished ? steps.length : currentStep + (stepState === "correct" ? 1 : 0);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E7E5E4" }}>
      <div className="px-6 py-3 flex items-center gap-3" style={{ backgroundColor: "#1F2937" }}>
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ backgroundColor: "#083344", color: "#67E8F9", letterSpacing: "0.08em" }}
        >
          Simulate
        </span>
        <div className="min-w-0">
          <p className="font-heading font-bold text-sm leading-tight" style={{ color: "#F9FAFB" }}>
            {title}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
            {description}
          </p>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const isActive = index === currentStep && !isFinished;
              const isComplete = completedStepIds.includes(step.id);

              return (
                <div
                  key={step.id}
                  className="rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{
                    borderColor: isComplete ? "#0F766E" : isActive ? "#2563EB" : "#E7E5E4",
                    backgroundColor: isComplete ? "#F0FDFA" : isActive ? "#EFF6FF" : "#FAFAF9",
                    color: isComplete ? "#0F766E" : isActive ? "#2563EB" : "#9CA3AF",
                  }}
                >
                  {isComplete ? "✓ " : ""}
                  {step.label}
                </div>
              );
            })}
          </div>

          <span
            className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ borderColor: "#E7E5E4", color: "#6B7280", backgroundColor: "#FAFAF9" }}
          >
            {progressCount} / {steps.length} resolved
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-xl border px-4 py-4 sm:px-5 sm:py-5" style={{ borderColor: "#E7E5E4", backgroundColor: "#FCFCFB" }}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] font-heading" style={{ color: "#2563EB" }}>
                Next move
              </p>
              {!isFinished && (
                <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
                  Step {currentStep + 1}
                </p>
              )}
            </div>

            {!isFinished ? (
              <>
                {activeStep.context && (
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {activeStep.context}
                  </p>
                )}

                <p className="mt-3 font-heading font-semibold text-[16px] leading-snug" style={{ color: "#1F2937" }}>
                  {activeStep.question}
                </p>

                <div className="mt-4 space-y-2.5">
                  {activeStep.choices.map((choice) => {
                    const isSelected = selectedChoiceId === choice.id;
                    const isCorrect = choice.id === activeStep.correctChoiceId;

                    let borderColor = "#E7E5E4";
                    let textColor = "#374151";
                    let badgeColor = "#9CA3AF";

                    if (isSelected && stepState === "wrong") {
                      borderColor = "#EF4444";
                      textColor = "#B91C1C";
                      badgeColor = "#EF4444";
                    } else if (isCorrect && stepState === "correct") {
                      borderColor = "#059669";
                      textColor = "#047857";
                      badgeColor = "#059669";
                    } else if (isSelected) {
                      borderColor = "#2563EB";
                      textColor = "#1D4ED8";
                      badgeColor = "#2563EB";
                    }

                    return (
                      <motion.button
                        key={choice.id}
                        type="button"
                        onClick={() => handleSelect(choice.id)}
                        whileHover={stepState !== "correct" ? { x: 2 } : {}}
                        whileTap={stepState !== "correct" ? { scale: 0.99 } : {}}
                        className="w-full rounded-xl border px-4 py-3 text-left transition-colors"
                        style={{ borderColor, backgroundColor: "white" }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full border text-[10px] font-bold"
                            style={{ borderColor: badgeColor, color: badgeColor }}
                          >
                            {stepState === "correct" && isCorrect
                              ? "✓"
                              : stepState === "wrong" && isSelected
                                ? "✗"
                                : String.fromCharCode(65 + activeStep.choices.indexOf(choice))}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                              {choice.label}
                            </p>
                            {isSelected && choice.rationale && stepState === "correct" && (
                              <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#6B7280" }}>
                                {choice.rationale}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {stepState !== "idle" && (
                    <motion.div
                      key={`${activeStep.id}-${stepState}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-xl px-4 py-3"
                      style={{
                        backgroundColor: "#FAFAF9",
                        borderLeft: stepState === "correct" ? "3px solid #059669" : "3px solid #EF4444",
                      }}
                    >
                      {stepState === "correct" ? (
                        <>
                          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                            <span className="font-semibold" style={{ color: "#059669" }}>
                              Correct.
                            </span>{" "}
                            {activeStep.explanation}
                          </p>
                          {activeChoice?.rationale && (
                            <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "#6B7280" }}>
                              {activeChoice.rationale}
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                            That choice would move too early or miss a useful signal.
                          </p>
                          {activeStep.hint && (
                            <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "#6B7280" }}>
                              Hint: {activeStep.hint}
                            </p>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex items-center gap-3">
                  {stepState === "wrong" && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                    >
                      Try again
                    </button>
                  )}

                  {stepState === "correct" && !isLastStep && (
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="text-sm font-bold px-4 py-2 rounded-lg"
                      style={{ backgroundColor: "#0F766E", color: "white" }}
                    >
                      Reveal next step →
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="mt-3 rounded-xl border px-4 py-4" style={{ borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" }}>
                <p className="font-heading font-semibold text-[16px]" style={{ color: "#166534" }}>
                  Simulation complete
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#166534" }}>
                  {completionMessage}
                </p>
              </div>
            )}
          </div>

          <div>
            <LessonTerminal
              title="claude-session"
              headerNote={isFinished ? "Loop closed" : activeStep.label}
              prompt={activeStep.prompt}
              minHeight={320}
              bodyStyle={{ color: "#86EFAC" }}
            >
              <div className="space-y-4 font-mono text-[12px] leading-[1.85]">
                {steps.slice(0, isFinished ? steps.length : currentStep + 1).map((step, index) => {
                  const revealed = completedStepIds.includes(step.id) || index === currentStep || isFinished;
                  const isActive = !isFinished && index === currentStep;

                  return (
                    <div key={step.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                          style={{
                            borderColor: revealed ? (isActive ? "#2563EB" : "#0F766E") : "#1F2937",
                            color: revealed ? (isActive ? "#93C5FD" : "#6EE7B7") : "#4B5563",
                            backgroundColor: revealed ? "rgba(15,23,42,0.8)" : "rgba(17,24,39,0.65)",
                          }}
                        >
                          {revealed && completedStepIds.includes(step.id) ? "✓ " : ""}
                          {step.label}
                        </span>
                        {isActive && stepState === "correct" && (
                          <span className="text-[10px]" style={{ color: "#93C5FD" }}>
                            ready for next move
                          </span>
                        )}
                      </div>
                      <pre
                        className="whitespace-pre-wrap rounded-xl border px-3 py-3"
                        style={{
                          borderColor: isActive ? "#1D4ED8" : "#134E4A",
                          backgroundColor: isActive ? "rgba(30,41,59,0.6)" : "rgba(15,23,42,0.45)",
                        }}
                      >
                        {step.terminal}
                      </pre>
                    </div>
                  );
                })}
              </div>
            </LessonTerminal>
          </div>
        </div>
      </div>
    </div>
  );
}
