import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "installing-claude-code",
  title: "Installing Claude Code and First Session",
  section: 1,
  duration: "8 min",
  objectives: [
    "Understand the basic setup flow from install to first successful task",
    "Know what a good first session should look like after learning the loop",
    "Avoid common beginner mistakes during setup and first use",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Installation only matters if it gets you to a small first win.",
      subtext:
        "The goal is not just getting Claude Code on your machine. It is getting to one tiny, visible task where you can watch gather, act, and review happen end to end.",
    },
    {
      type: "diagram",
      title: "The setup-to-first-win path",
      steps: [
        {
          id: "install",
          label: "Install",
          headline: "Get Claude Code available in your terminal",
          color: "teal",
          explanation:
            "Follow the official install flow for your environment until the Claude Code command is recognized in your shell. Do not keep moving forward if the command itself is not available yet.",
          example:
            "Success looks like: you can invoke Claude Code from the terminal instead of seeing a command-not-found error.",
        },
        {
          id: "verify-access",
          label: "Verify",
          headline: "Confirm the tool is actually ready in a real folder",
          color: "amber",
          explanation:
            "A clean install still needs a quick reality check. Make sure your terminal can launch Claude Code and that you can start a session in a real folder you care about or safely explore.",
          example:
            "Open a small practice repo or a scratch folder so your first task is safe and easy to inspect.",
        },
        {
          id: "first-task",
          label: "First task",
          headline: "Give it one tiny, reviewable job",
          color: "violet",
          explanation:
            "Your first session should be deliberately small: explain a folder, change one label, or make a tiny low-risk edit. That lets you focus on how the tool behaves instead of debugging a huge request.",
          example:
            'Try something like: "Read this project and explain the main folders" or "Change this button label and tell me which file you edited."',
        },
      ],
    },
    {
      type: "comparison",
      title: "A strong first session vs. a frustrating one",
      left: {
        label: "Frustrating first session",
        content:
          'Install Claude Code, open a giant unfamiliar repo, and immediately ask: "Re-architect this app."',
        annotations: [
          "Too much scope before you know the workflow",
          "Hard to tell whether setup or prompting is the problem",
          "No small success to build confidence",
        ],
      },
      right: {
        label: "Strong first session",
        content:
          'Install Claude Code, open a small folder, and ask: "Read this project, explain the key files, then change one label and tell me what changed."',
        annotations: [
          "Confirms install and basic tool access",
          "Lets you watch gather -> act -> review clearly",
          "Small enough to review with confidence",
        ],
      },
      insight:
        "The first session is really a trust-building exercise. Keep the task small enough that you can easily tell whether Claude Code understood the workspace and completed the job correctly.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A good setup flow ends with evidence, not just a finished install command. If Claude Code starts in your terminal and completes one small task in a real folder, your setup is working in the way that matters.",
        "This is where the previous lesson becomes practical. You already know Claude Code is valuable because it can act in the workspace. Now you are proving that workflow works on your machine.",
        "Beginners often make the first session too ambitious. Engineers sometimes make it too abstract. In both cases, the fix is the same: start with a tiny task you can inspect end to end.",
      ],
      engineerDepth: [
        "For engineers, the fastest confidence check is to use a low-risk repo or sandbox folder and ask Claude Code to read a specific file, make one minimal change, and then report or verify the result. That confirms shell access, file access, and the basic loop in one pass.",
        "If anything goes wrong, isolate the failure. A command-not-found issue is a setup issue. A confusing result inside a large repo is usually a scoping or prompting issue. Separate those problems instead of debugging both at once.",
      ],
    },
    {
      type: "classification",
      title: "What belongs in a first session?",
      instruction:
        "Sort each task by whether it is a smart first-session task or something better saved for later.",
      categories: [
        { id: "good-first", label: "Good first session", color: "teal" },
        { id: "later", label: "Better later", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Ask Claude Code to explain the main folders in a small repo",
          correctCategory: "good-first",
        },
        {
          id: "i2",
          text: "Ask for a full authentication rewrite in an unfamiliar production app",
          correctCategory: "later",
        },
        {
          id: "i3",
          text: "Change one piece of UI text and review the edited file",
          correctCategory: "good-first",
        },
        {
          id: "i4",
          text: "Hand Claude Code a vague request with no review or verification step",
          correctCategory: "later",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Build your first-session prompt",
      description:
        "Create a low-risk first task that helps you confirm Claude Code is installed and behaving the way you expect.",
      fields: [
        {
          id: "workspace",
          label: "Workspace",
          placeholder: "e.g. this small practice repo or a scratch folder",
          hint: "Pick a place where a tiny edit is safe.",
        },
        {
          id: "task",
          label: "First task",
          placeholder: "e.g. explain the main files and change one button label",
          hint: "Keep it small enough to review quickly.",
        },
        {
          id: "verify",
          label: "What success looks like",
          placeholder: "e.g. tell me which file changed and what command you ran to verify it",
          hint: "Ask for a visible proof point.",
        },
      ],
      template:
        "Open {workspace}.\n\nStart by reading the relevant files, then {task}.\n\nWhen you're done, {verify}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "Which first task is most useful right after installing Claude Code?",
          options: [
            "Ask it to rebuild the largest feature in your codebase",
            "Ask it to complete one small, easy-to-review task in a safe folder",
            "Skip the first task and assume the install worked",
            "Only ask theoretical questions without letting it inspect files",
          ],
          correctIndex: 1,
          explanation:
            "A tiny real task gives you the clearest signal that Claude Code is installed, can access the workspace, and can complete the loop successfully.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "The install is only complete when Claude Code succeeds at one small task in a real workspace.",
      note: "Next, you learn how to keep that session smooth and safe with better steering, review habits, and permission awareness.",
    },
  ],
};

export default config;
