"use client";

import type { CSSProperties, ReactNode } from "react";

interface Props {
  title?: string;
  headerNote?: string;
  headerRight?: ReactNode;
  children: ReactNode;
  prompt?: string | false;
  minHeight?: number;
  frameClassName?: string;
  bodyClassName?: string;
  bodyStyle?: CSSProperties;
}

export default function LessonTerminal({
  title = "claude-code-terminal",
  headerNote,
  headerRight,
  children,
  prompt = "$",
  minHeight,
  frameClassName = "",
  bodyClassName = "",
  bodyStyle,
}: Props) {
  return (
    <div className={`flex flex-col ${frameClassName}`}>
      <div
        className="flex flex-col gap-2 rounded-t-xl border px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
        style={{ backgroundColor: "#0F172A", borderColor: "#1F2937" }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#F87171" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FBBF24" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#34D399" }} />
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <span className="min-w-0 truncate text-[11px] font-mono" style={{ color: "#9CA3AF" }}>
              {title}
            </span>
            {headerNote && (
              <span
                className="max-w-full rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                style={{ borderColor: "#1F2937", color: "#6B7280", backgroundColor: "#111827" }}
              >
                {headerNote}
              </span>
            )}
          </div>
        </div>
        {headerRight && <div className="flex justify-start sm:justify-end">{headerRight}</div>}
      </div>

      <div
        className={`overflow-x-auto rounded-b-xl border p-4 ${bodyClassName}`}
        style={{
          backgroundColor: "#1A1F2E",
          borderColor: "#134E4A",
          boxShadow: "inset 0 0 0 1px rgba(52,211,153,0.08)",
          minHeight,
          ...bodyStyle,
        }}
      >
        {prompt ? (
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 font-mono text-xs" style={{ color: "#34D399" }}>
              {prompt}
            </span>
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
