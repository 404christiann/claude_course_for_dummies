export interface Lesson {
  slug: string;
  title: string;
  duration: string;
  section: number;
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

export const sections: Section[] = [
  {
    id: 1,
    title: "Foundations",
    lessons: [
      { slug: "what-is-claude-code", title: "What Claude Code Is", duration: "5 min", section: 1 },
      { slug: "the-agentic-loop", title: "The Agentic Loop: Gather → Act → Verify", duration: "7 min", section: 1 },
      { slug: "installing-claude-code", title: "Installing Claude Code and First Session", duration: "8 min", section: 1 },
      { slug: "commands-shortcuts-permissions", title: "Commands, Shortcuts, and Permissions", duration: "6 min", section: 1 },
    ],
  },
  {
    id: 2,
    title: "Context Engineering",
    lessons: [
      { slug: "context-window-and-memory", title: "Context Window and Working Memory", duration: "6 min", section: 2 },
      { slug: "fresh-and-condensed-context", title: "Fresh and Condensed Context", duration: "5 min", section: 2 },
      { slug: "memory-layers", title: "Memory Layers: CLAUDE.md, Second Brain, Auto Memory", duration: "8 min", section: 2 },
      { slug: "context-management-habits", title: "Context Management Habits", duration: "5 min", section: 2 },
    ],
  },
  {
    id: 3,
    title: "Skills and Repeatable Workflows",
    lessons: [
      { slug: "what-skills-are", title: "What Skills Are", duration: "5 min", section: 3 },
      { slug: "anatomy-of-a-skill", title: "Anatomy of a SKILL.md", duration: "7 min", section: 3 },
      { slug: "creating-reusable-workflows", title: "Creating Reusable Workflows", duration: "8 min", section: 3 },
      { slug: "built-in-vs-custom-skills", title: "Built-in Skills vs Custom Skills", duration: "5 min", section: 3 },
    ],
  },
  {
    id: 4,
    title: "Real Repo Work",
    lessons: [
      { slug: "onboarding-to-a-codebase", title: "Onboarding to a New Codebase", duration: "7 min", section: 4 },
      { slug: "using-plan-mode-before-acting", title: "Using Plan Mode Before Acting", duration: "6 min", section: 4 },
      { slug: "producing-useful-artifacts", title: "Producing Useful Artifacts", duration: "5 min", section: 4 },
      { slug: "turning-vague-requests-into-durable-rules", title: "Turning Vague Requests into Durable Rules", duration: "7 min", section: 4 },
    ],
  },
  {
    id: 5,
    title: "MCPs and Tooling",
    lessons: [
      { slug: "what-mcp-is", title: "What MCP Is", duration: "8 min", section: 5 },
      { slug: "when-mcp-helps", title: "When MCP Helps", duration: "8 min", section: 5 },
      { slug: "when-mcp-hurts", title: "When MCP Hurts", duration: "8 min", section: 5 },
      { slug: "browser-automation", title: "Browser Automation and Verification Workflows", duration: "9 min", section: 5 },
    ],
  },
  {
    id: 6,
    title: "Parallel Work and Scale",
    lessons: [
      { slug: "worktrees", title: "Worktrees and Safe Parallel Isolation", duration: "7 min", section: 6 },
      { slug: "multi-agent-workflows", title: "Multi-Agent Workflows", duration: "8 min", section: 6 },
      { slug: "hooks-and-notifications", title: "Hooks and Notifications", duration: "7 min", section: 6 },
      { slug: "validation-loops", title: "Validation Loops", duration: "8 min", section: 6 },
    ],
  },
  {
    id: 7,
    title: "Agentic Engineering",
    lessons: [
      { slug: "common-failure-points", title: "Common Failure Points at Scale", duration: "8 min", section: 7 },
      { slug: "auditing-for-ai-readiness", title: "Auditing for AI Readiness", duration: "8 min", section: 7 },
      { slug: "building-harnesses", title: "Building Harnesses That Reduce Friction", duration: "8 min", section: 7 },
      { slug: "designing-agent-workflows", title: "Designing Practical Agent Workflows", duration: "9 min", section: 7 },
    ],
  },
];

export const allLessons: Lesson[] = sections.flatMap((s) => s.lessons);

export function getLessonBySlug(slug: string): Lesson | undefined {
  return allLessons.find((l) => l.slug === slug);
}

export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((s) => s.lessons.some((l) => l.slug === slug));
}

export function getNextLesson(slug: string): Lesson | undefined {
  const idx = allLessons.findIndex((l) => l.slug === slug);
  return idx >= 0 ? allLessons[idx + 1] : undefined;
}

export function getPrevLesson(slug: string): Lesson | undefined {
  const idx = allLessons.findIndex((l) => l.slug === slug);
  return idx > 0 ? allLessons[idx - 1] : undefined;
}

export const totalLessons = allLessons.length;
