import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "commands-shortcuts-permissions",
  title: "Commands, Shortcuts, and Permissions",
  section: 1,
  duration: "6 min",
  objectives: [
    "Understand the difference between steering work, reviewing work, and approving work",
    "Recognize when permissions are a safety feature instead of friction",
    "Learn the basic interaction habits that make sessions smoother after your first task",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Once your first task works, the next skill is operating the session well.",
      subtext:
        "The mechanics matter: prompts steer the work, session controls keep you oriented, and permissions protect your machine when the task gets more powerful.",
    },
    {
      type: "diagram",
      title: "How a smooth, safe terminal session flows",
      steps: [
        {
          id: "ask",
          label: "Ask",
          headline: "Steer with a clear task",
          color: "teal",
          explanation:
            "You begin by describing what you want Claude Code to do. This is the main steering input. A clear task reduces unnecessary back-and-forth and helps Claude choose the right files or commands.",
          example:
            'Example: "Update the pricing card copy, then run the existing homepage tests."',
        },
        {
          id: "review",
          label: "Review",
          headline: "Watch what Claude Code plans to do",
          color: "amber",
          explanation:
            "As Claude Code reads files and prepares actions, you can follow along in the terminal. This is where shortcuts and session awareness help most: you stay oriented instead of treating the agent like a black box.",
          example:
            "Notice which files it opens, which commands it wants to run, and whether the scope still matches your request.",
        },
        {
          id: "approve",
          label: "Approve",
          headline: "Grant permissions intentionally",
          color: "violet",
          explanation:
            "Some actions need your approval because they affect files, commands, or external systems more directly. Permissions are there to keep you in control, especially when the action is powerful or irreversible.",
          example:
            "A harmless read is different from a destructive shell command. The permission step is where you decide whether the action is still aligned with the task.",
        },
      ],
    },
    {
      type: "comparison",
      title: "Treating permission prompts as noise vs. signal",
      left: {
        label: "Treating permissions like annoyance",
        content:
          "Approve everything immediately without checking what Claude Code is about to do.",
        annotations: [
          "Fast in the moment, risky over time",
          "Makes it harder to catch wrong-file or wrong-command mistakes",
          "Turns the safety system into background noise",
        ],
      },
      right: {
        label: "Treating permissions like guidance",
        content:
          "Use permission prompts as a pause point to confirm the action, the scope, and the reason it needs approval.",
        annotations: [
          "Keeps you aware of what the agent is doing",
          "Helps beginners build confidence in the workflow",
          "Lets engineers catch dangerous actions before they happen",
        ],
      },
      insight:
        "Permissions are not there because Claude Code is failing. They are there because powerful tools should stay under your control.",
    },
    {
      type: "explanation",
      paragraphs: [
        "If the previous lesson was about getting to one small win, this lesson is about repeating that experience without feeling lost. Good sessions feel calm because you know what part of the workflow you are in.",
        "There are three separate pieces to keep straight in a Claude Code session: the task you ask for, the session controls that help you stay efficient, and the permissions that gate more sensitive actions. When people blur those together, sessions start to feel confusing.",
        "A useful mental model is this: prompts tell Claude Code what outcome you want, review habits help you stay oriented, and permissions help you decide whether a specific action should happen right now.",
      ],
      engineerDepth: [
        "For engineers, permission awareness is part of review discipline. If Claude Code suddenly wants to run a command or touch a path that does not match your requested scope, that is signal, not interruption.",
        "For non-engineers, the key idea is simpler: you do not need to memorize every command or shortcut on day one. You mainly need to understand that you can pause, review, and approve intentionally instead of feeling rushed.",
      ],
    },
    {
      type: "classification",
      title: "Steer, review, or approve?",
      instruction:
        "Sort each moment into the part of the workflow it belongs to.",
      categories: [
        { id: "steer", label: "Steer with prompts", color: "teal" },
        { id: "review", label: "Review the session", color: "amber" },
        { id: "approve", label: "Approve intentionally", color: "violet" },
      ],
      items: [
        {
          id: "i1",
          text: "Describe the exact bug you want fixed and how to verify it",
          correctCategory: "steer",
        },
        {
          id: "i2",
          text: "Notice Claude Code is reading a file outside the area you expected",
          correctCategory: "review",
        },
        {
          id: "i3",
          text: "Decide whether to allow an action that needs elevated access",
          correctCategory: "approve",
        },
        {
          id: "i4",
          text: "Check whether the proposed command still matches the task you asked for",
          correctCategory: "review",
        },
        {
          id: "i5",
          text: "Tell Claude Code to focus only on the checkout components and tests",
          correctCategory: "steer",
        },
        {
          id: "i6",
          text: "Pause before allowing a command that could make a broad change",
          correctCategory: "approve",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Write a prompt that is easier to steer and review",
      description:
        "Use the fields below to write a task that keeps the scope tight and makes review easier before any approvals come up.",
      fields: [
        {
          id: "goal",
          label: "Goal",
          placeholder: "e.g. fix the checkout total not updating after a coupon is applied",
          hint: "Be specific about the behavior.",
        },
        {
          id: "scope",
          label: "Scope",
          placeholder: "e.g. only the checkout components and existing checkout tests",
          hint: "Constrain where Claude Code should work first.",
        },
        {
          id: "verify",
          label: "Verification",
          placeholder: "e.g. run the checkout tests and report whether they pass",
          hint: "Ask for a proof point you can review.",
        },
      ],
      template:
        "{goal}.\n\nLimit the work to {scope}.\n\nAfter the change, {verify}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What is the healthiest way to think about permission prompts in Claude Code?",
          options: [
            "They are mostly noise and should be approved as fast as possible",
            "They replace the need for clear prompts",
            "They are a control point where you confirm a sensitive action still makes sense",
            "They only matter for beginners, not for engineers",
          ],
          correctIndex: 2,
          explanation:
            "Permission prompts are a deliberate safety checkpoint. They help you confirm that the next action is appropriate before it happens.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Steer clearly, review as the session unfolds, and approve intentionally when the action gets more sensitive.",
      note: "That operating habit is what turns a one-off first win into a repeatable Claude Code workflow.",
    },
  ],
};

export default config;
