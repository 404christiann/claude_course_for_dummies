"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { ComparisonSide } from "@/lib/lesson-types";
import LessonTerminal from "@/components/lesson-blocks/LessonTerminal";

interface Props {
  title: string;
  left: ComparisonSide;
  right: ComparisonSide;
  insight?: string;
}

export default function ComparisonBlock({ title, left, right, insight }: Props) {
  const [activeSide, setActiveSide] = useState<"left" | "right">("right");
  const active = activeSide === "left" ? left : right;
  const activeTone =
    activeSide === "left"
      ? { border: "#EF4444", badgeBg: "#7F1D1D", badgeText: "#FCA5A5", muted: "#B91C1C" }
      : { border: "#059669", badgeBg: "#064E3B", badgeText: "#6EE7B7", muted: "#047857" };

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E7E5E4" }}>
      {/* Dark header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-3 sm:px-6" style={{ backgroundColor: "#1F2937" }}>
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ backgroundColor: "#92400E", color: "#FDE68A", letterSpacing: "0.08em" }}
        >
          Compare
        </span>
        <p className="font-heading font-bold text-sm" style={{ color: "#F9FAFB" }}>
          {title}
        </p>
      </div>

      <div className="bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm" style={{ color: "#6B7280" }}>
            Inspect both versions, then compare what changes once the prompt closes the loop.
          </p>
          <span
            className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ borderColor: "#E7E5E4", color: "#9CA3AF", backgroundColor: "#FAFAF9" }}
          >
            Choose a version
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { key: "left" as const, side: left, border: "#EF4444", noteBg: "#7F1D1D", noteText: "#FCA5A5" },
            { key: "right" as const, side: right, border: "#059669", noteBg: "#064E3B", noteText: "#6EE7B7" },
          ].map(({ key, side, border, noteBg, noteText }) => {
            const isActive = activeSide === key;
            return (
              <motion.button
                key={side.label}
                type="button"
                onClick={() => setActiveSide(key)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="rounded-xl border p-3 text-left transition-shadow"
                style={{
                  borderColor: isActive ? border : "#E7E5E4",
                  backgroundColor: "#FFFFFF",
                  boxShadow: isActive ? `0 10px 28px ${border}20` : "none",
                }}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: border }} />
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] font-heading" style={{ color: "#6B7280" }}>
                      {side.label}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: isActive ? noteBg : "#F3F4F6",
                      color: isActive ? noteText : "#9CA3AF",
                    }}
                  >
                    {isActive ? "Selected" : "Inspect"}
                  </span>
                </div>

                <LessonTerminal
                  title="prompt-review"
                  headerNote={key === "left" ? "Incomplete" : "Loop complete"}
                  prompt={false}
                  bodyStyle={{
                    borderColor: isActive ? border : "#1F2937",
                    boxShadow: isActive ? `inset 0 0 0 1px ${border}22` : "inset 0 0 0 1px rgba(52,211,153,0.08)",
                  }}
                >
                  <pre className="font-mono text-xs leading-[1.85] whitespace-pre-wrap" style={{ color: "#E5E7EB" }}>
                    {side.content}
                  </pre>
                </LessonTerminal>
              </motion.button>
            );
          })}
        </div>

        <div
          className="mt-5 rounded-xl border px-4 py-4"
          style={{ borderColor: "#E7E5E4", backgroundColor: "#FAFAF9" }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] font-heading" style={{ color: activeTone.muted }}>
              What to notice
            </p>
            <span
              className="rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
              style={{ backgroundColor: activeTone.badgeBg, color: activeTone.badgeText }}
            >
              {active.label}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {active.annotations?.map((annotation, index) => (
              <li key={index} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                <span className="mt-0.5 text-xs font-bold" style={{ color: activeTone.border }}>
                  {activeSide === "left" ? "↑" : "✓"}
                </span>
                {annotation}
              </li>
            ))}
          </ul>

          {activeSide === "right" && insight && (
            <div className="mt-4 border-l-2 pl-4" style={{ borderColor: "#0F766E" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1 font-heading" style={{ color: "#0F766E" }}>
                Why it works
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                {insight}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
