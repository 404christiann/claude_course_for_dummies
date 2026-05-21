"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { PromptField } from "@/lib/lesson-types";
import LessonTerminal from "@/components/lesson-blocks/LessonTerminal";

interface Props {
  title: string;
  description: string;
  fields: PromptField[];
  template: string;
}

const SURFACE_BORDER = "#E7E5E4";
const SURFACE_DIVIDER = "#F3F2EF";
const HEADER_BG = "#0F172A";
const HEADER_BADGE_BG = "#134E4A";
const HEADER_BADGE_TEXT = "#5EEAD4";
const MUTED_TEXT = "#9CA3AF";
const BODY_TEXT = "#374151";
const ACTIVE_TEAL = "#0F766E";

function buildPrompt(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || `[${key}]`);
}

function isComplete(fields: PromptField[], values: Record<string, string>): boolean {
  return fields.every((f) => (values[f.id] ?? "").trim().length > 0);
}

export default function PromptBuilderBlock({ title, description, fields, template }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const assembled = buildPrompt(template, values);
  const completedCount = fields.filter((field) => (values[field.id] ?? "").trim().length > 0).length;
  const complete = isComplete(fields, values);
  const hasStarted = fields.some((f) => (values[f.id] ?? "").trim().length > 0);

  function handleCopy() {
    navigator.clipboard.writeText(assembled).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
      style={{ borderColor: SURFACE_BORDER }}
    >
      <div
        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6"
        style={{ backgroundColor: HEADER_BG }}
      >
        <div className="flex items-start gap-3">
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]"
            style={{ backgroundColor: HEADER_BADGE_BG, color: HEADER_BADGE_TEXT }}
          >
            Prompt Builder
          </span>
          <div>
            <p className="font-heading text-sm font-bold leading-tight" style={{ color: "#F9FAFB" }}>
              {title}
            </p>
            {description && (
              <p className="mt-1 text-[11px] leading-relaxed" style={{ color: MUTED_TEXT }}>
                {description}
              </p>
            )}
          </div>
        </div>

        <div
          className="w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold"
          style={{
            borderColor: hasStarted ? "#134E4A" : "#1F2937",
            color: hasStarted ? "#A7F3D0" : "#6B7280",
            backgroundColor: "#111827",
          }}
        >
          {completedCount}/{fields.length} complete
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white p-5 sm:p-6 lg:border-r" style={{ borderColor: SURFACE_DIVIDER }}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p
              className="font-heading text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: MUTED_TEXT }}
            >
              Fill in the blanks
            </p>
            <p className="text-[11px]" style={{ color: hasStarted ? ACTIVE_TEAL : MUTED_TEXT }}>
              {hasStarted ? "Each answer updates the prompt live." : "Add a few specifics to guide the agent."}
            </p>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => {
              const isFilled = (values[field.id] ?? "").trim().length > 0;
              return (
                <div
                  key={field.id}
                  className="rounded-xl border p-4 transition-colors"
                  style={{
                    borderColor: isFilled ? "#99F6E4" : SURFACE_BORDER,
                    backgroundColor: isFilled ? "#F0FDFA" : "#FCFCFB",
                  }}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      className="block font-heading text-[11px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: BODY_TEXT }}
                    >
                      {field.label}
                    </label>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: isFilled ? "#CCFBF1" : "#F3F4F6",
                        color: isFilled ? ACTIVE_TEAL : "#6B7280",
                      }}
                    >
                      {isFilled ? "Added" : `Step ${index + 1}`}
                    </span>
                  </div>

                  {field.hint && (
                    <p className="mb-2 text-[11px] leading-relaxed" style={{ color: MUTED_TEXT }}>
                      {field.hint}
                    </p>
                  )}

                  <input
                    type="text"
                    value={values[field.id] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors"
                    style={{
                      borderColor: isFilled ? ACTIVE_TEAL : SURFACE_BORDER,
                      color: "#1F2937",
                      backgroundColor: "white",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = ACTIVE_TEAL)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = isFilled ? ACTIVE_TEAL : SURFACE_BORDER)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="flex flex-col p-5 sm:p-6"
          style={{ background: "linear-gradient(180deg, #111827 0%, #0F172A 100%)" }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p
              className="font-heading text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "#6B7280" }}
            >
              Terminal Preview
            </p>
            <p className="text-[11px]" style={{ color: complete ? "#6EE7B7" : "#6B7280" }}>
              {complete ? "Ready to copy" : "Placeholders stay visible until filled"}
            </p>
          </div>

          <LessonTerminal
            headerNote="Live prompt"
            minHeight={190}
            frameClassName="flex-1"
            headerRight={
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                  style={{
                    borderColor: hasStarted ? "#134E4A" : "#1F2937",
                    color: hasStarted ? "#6EE7B7" : "#6B7280",
                    backgroundColor: "#111827",
                  }}
                >
                  {complete ? "Ready" : "Draft"}
                </span>
                <AnimatePresence>
                  {complete && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleCopy}
                      className="rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors"
                      style={{
                        backgroundColor: copied ? "#065F46" : "#1F2937",
                        color: copied ? "#6EE7B7" : "#9CA3AF",
                        border: `1px solid ${copied ? "#065F46" : "#374151"}`,
                      }}
                    >
                      {copied ? "Copied" : "Copy"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            }
            bodyStyle={{
              color: hasStarted ? "#86EFAC" : "#6B7280",
              borderColor: hasStarted ? "#134E4A" : "#1F2937",
              boxShadow: hasStarted ? "inset 0 0 0 1px rgba(52,211,153,0.08)" : "none",
              transition: "color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            <div className="font-mono text-[12px] leading-[1.85] whitespace-pre-wrap">
              {assembled}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="ml-1 inline-block"
                style={{ color: hasStarted ? "#34D399" : "#4B5563" }}
              >
                ▋
              </motion.span>
            </div>
          </LessonTerminal>

          <p className="mt-3 text-[11px] leading-relaxed" style={{ color: hasStarted ? "#6EE7B7" : "#6B7280" }}>
            {complete
              ? "This prompt now has the task, scope, and expected output spelled out."
              : hasStarted
                ? "Keep going until each placeholder becomes a concrete instruction."
                : "Learners can watch weak prompts turn into specific instructions as they type."}
          </p>
        </div>
      </div>
    </div>
  );
}
