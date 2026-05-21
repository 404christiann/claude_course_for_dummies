// ─────────────────────────────────────────────────────────────
// Lesson block type definitions
// Each block is a plain TypeScript object — no MDX frontmatter
// complexity. Lesson configs live in content/lessons/**/*.lesson.ts
// ─────────────────────────────────────────────────────────────

// ── Shared ────────────────────────────────────────────────────

export interface DiagramStep {
  id: string;
  label: string;
  /** Short headline shown in the step button */
  headline: string;
  /** Explanation shown in the detail panel when this step is active */
  explanation: string;
  /** Optional concrete example shown below the explanation */
  example?: string;
  /** Tailwind-compatible color token for the step accent */
  color?: "teal" | "amber" | "violet" | "blue" | "rose";
}

export interface CheckpointQuestion {
  question: string;
  options: string[];
  /** 0-based index of the correct answer */
  correctIndex: number;
  /** Shown after correct answer */
  explanation: string;
}

export interface ComparisonSide {
  label: string;
  content: string;
  /** Optional list of annotations highlighting what's wrong/right */
  annotations?: string[];
}

export interface PromptField {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
}

export interface ClassificationItem {
  id: string;
  text: string;
  /** The correct category id this item belongs to */
  correctCategory: string;
}

export interface ClassificationCategory {
  id: string;
  label: string;
  color?: "teal" | "amber" | "violet" | "blue";
}

export interface SimulationChoice {
  id: string;
  label: string;
  /** Optional learner-facing note shown only after this option is selected */
  rationale?: string;
}

export interface SimulationStep {
  id: string;
  /** Short stage label for progress pills and terminal notes */
  label: string;
  /** Optional one-line framing above the question */
  context?: string;
  /** Session output revealed when this step becomes active */
  terminal: string;
  /** Prompt token shown in the terminal; false hides the prompt gutter */
  prompt?: string | false;
  /** What the learner should predict or classify next */
  question: string;
  choices: SimulationChoice[];
  /** The correct choice id for this step */
  correctChoiceId: string;
  /** Reinforcement shown after the correct choice */
  explanation: string;
  /** Optional hint surfaced after a wrong answer */
  hint?: string;
}

// ── Block definitions ─────────────────────────────────────────

export type HookBlock = {
  type: "hook";
  headline: string;
  /** 1–2 sentence payoff — why this lesson matters */
  subtext: string;
};

export type DiagramBlock = {
  type: "diagram";
  title: string;
  steps: DiagramStep[];
};

export type ExplanationBlock = {
  type: "explanation";
  /** Plain text paragraphs — kept short (2-4 max per the spec) */
  paragraphs: string[];
  /** Optional engineer-depth paragraphs shown inside a collapsible */
  engineerDepth?: string[];
};

export type ComparisonBlock = {
  type: "comparison";
  title: string;
  left: ComparisonSide;
  right: ComparisonSide;
  /** Optional callout summarising why right is better */
  insight?: string;
};

export type PromptBuilderBlock = {
  type: "prompt-builder";
  title: string;
  description: string;
  fields: PromptField[];
  /** Template string — use {fieldId} placeholders */
  template: string;
};

export type ClassificationBlock = {
  type: "classification";
  title: string;
  instruction: string;
  categories: ClassificationCategory[];
  items: ClassificationItem[];
};

export type MiniSimulationBlock = {
  type: "mini-simulation";
  title: string;
  description: string;
  steps: SimulationStep[];
  /** Optional final payoff once the learner completes every step */
  completionMessage?: string;
};

export type CheckpointBlock = {
  type: "checkpoint";
  questions: CheckpointQuestion[];
};

export type TakeawayBlock = {
  type: "takeaway";
  text: string;
  /** Optional short supporting note */
  note?: string;
};

export type LessonBlock =
  | HookBlock
  | DiagramBlock
  | ExplanationBlock
  | ComparisonBlock
  | PromptBuilderBlock
  | ClassificationBlock
  | MiniSimulationBlock
  | CheckpointBlock
  | TakeawayBlock;

// ── Lesson config ─────────────────────────────────────────────

export interface LessonConfig {
  slug: string;
  title: string;
  /** Section number within the current seven-section course */
  section: number;
  duration: string;
  objectives: string[];
  blocks: LessonBlock[];
}
