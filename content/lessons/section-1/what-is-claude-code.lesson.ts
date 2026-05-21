import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "what-is-claude-code",
  title: "What Claude Code Is",
  section: 1,
  duration: "5 min",
  objectives: [
    "Understand what makes Claude Code different from a regular AI chatbot",
    "See the basic flow Claude Code follows after you ask for a change",
    "Know why Section 1 starts with tiny, verifiable tasks instead of big asks",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Claude Code is useful because it can do the work with you, not just talk about it.",
      subtext:
        "Most AI tools give you text to copy-paste. Claude Code can read your files, make edits, run commands, and report what happened directly in your terminal. Section 1 is about learning that workflow in small, low-risk steps.",
    },
    {
      type: "diagram",
      title: "What happens after you ask Claude Code to help?",
      steps: [
        {
          id: "ask",
          label: "You ask",
          headline: "Give it a concrete job",
          color: "teal",
          explanation:
            "You give Claude Code a concrete task in plain English, like fixing a bug or updating copy. You do not need to manually script every step, but you do want to be clear about the outcome.",
          example:
            'You: "Read this project, change the pricing button text to Start Free, and tell me which file you edited."',
        },
        {
          id: "work",
          label: "Claude works",
          headline: "Reads context and takes action",
          color: "amber",
          explanation:
            "Claude Code checks the relevant files, makes the targeted change, and uses your project tools directly in the terminal. This is what makes it feel closer to a teammate than a chatbot.",
          example:
            "Reads the homepage component.\nFinds the pricing button.\nUpdates the label in the right file.",
        },
        {
          id: "report",
          label: "You review",
          headline: "Review the result",
          color: "violet",
          explanation:
            "Instead of handing you a code snippet to paste, Claude Code reports what it changed and whether it verified the result. That makes the output much easier to inspect and trust.",
          example:
            'Reports back: "Updated the pricing button text in app/page.tsx."',
        },
      ],
    },
    {
      type: "comparison",
      title: "Chatbot vs. Claude Code",
      left: {
        label: "Regular AI chatbot",
        content:
          "You: How do I change a pricing button label?\n\nAI: Here's an example snippet you could use:\n\n[code block]\n\nYou'd still need to find the real file and apply it yourself.",
        annotations: [
          "You still have to find the right file",
          "You paste the code manually",
          "You run and test it yourself",
        ],
      },
      right: {
        label: "Claude Code",
        content:
          'You: Change the pricing button label to Start Free.\n\nClaude Code reads the relevant file, makes the edit,\nand reports back what changed:\n\n"Done — updated the button label in app/page.tsx."',
        annotations: [
          "Finds and reads the relevant file itself",
          "Makes the edit directly",
          "Reports the result for you to review",
        ],
      },
      insight:
        "Claude Code closes the distance between idea and execution. Instead of generating advice for you to carry out, it can act in the workspace and then tell you what happened.",
    },
    {
      type: "classification",
      title: "Advice or direct action?",
      instruction:
        "Sort each example based on whether the tool is only giving guidance or actually taking action in your workspace.",
      categories: [
        { id: "advice", label: "Advice only", color: "amber" },
        { id: "action", label: "Direct action", color: "teal" },
      ],
      items: [
        {
          id: "i1",
          text: "Suggests button copy you could paste into your app yourself",
          correctCategory: "advice",
        },
        {
          id: "i2",
          text: "Reads the homepage file, updates the button label, and reports the changed path",
          correctCategory: "action",
        },
        {
          id: "i3",
          text: "Explains how to inspect a React component but leaves your workspace untouched",
          correctCategory: "advice",
        },
        {
          id: "i4",
          text: "Runs a command in your project and tells you the result",
          correctCategory: "action",
        },
      ],
    },
    {
      type: "explanation",
      paragraphs: [
        "Claude Code is an AI agent that runs in your terminal. It can inspect files, use your project tools, make changes, and show its work as it goes.",
        "That is why this course starts with small tasks and explicit review. The goal is not to throw huge problems at Claude Code on day one. The goal is to understand the basic workflow well enough that you can trust what it is doing and guide it effectively.",
        "In the next lesson, you will use that mindset during installation and your first session: get the tool working, give it one tiny job, and watch the loop happen end to end.",
      ],
      engineerDepth: [
        "Under the hood, Claude Code is using tools rather than only generating text. It reads files, executes shell commands, and reports each step in a visible sequence, which is why the terminal experience matters so much.",
        "It also works best when the task is scoped to a real workspace and a clear proof point. That becomes the through-line for Section 1: understand the tool, watch the loop, then learn how to steer and approve safely.",
      ],
    },
    {
      type: "prompt-builder",
      title: "Turn a vague request into a first good Claude Code task",
      description:
        "Fill in the task, scope, and review step to create a request Claude Code can execute inside a real workspace.",
      fields: [
        {
          id: "task",
          label: "Task",
          placeholder: "e.g. change the pricing button text to Start Free",
          hint: "Say what change you want made.",
        },
        {
          id: "scope",
          label: "Where to work",
          placeholder: "e.g. the homepage component or pricing section",
          hint: "Point Claude Code to the most relevant area first.",
        },
        {
          id: "verify",
          label: "Review step",
          placeholder: "e.g. tell me which file changed and what you updated",
          hint: "Tell it what proof you want back.",
        },
      ],
      template:
        "{task}.\n\nStart by reading {scope}.\n\nWhen you're done, {verify}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question: "What is the key difference between Claude Code and a regular AI chatbot?",
          options: [
            "Claude Code gives longer, more detailed answers",
            "Claude Code can take direct action on your files and codebase",
            "Claude Code only works with Python projects",
            "Claude Code requires an internet connection to function",
          ],
          correctIndex: 1,
          explanation:
            "Claude Code can read files, write code, run commands, and verify results — it acts, rather than just advising.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Claude Code is an agent in your workspace, not just a text generator in a chat box.",
      note: "Section 1 starts small on purpose: first understand the workflow, then run a tiny real task, then learn how to steer it safely.",
    },
  ],
};

export default config;
