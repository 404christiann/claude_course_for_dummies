import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "context-window-and-memory",
  title: "Context Window and Working Memory",
  section: 2,
  duration: "6 min",
  objectives: [
    "Understand the difference between everything Claude Code could access and the smaller context it is actively using",
    "Recognize when a session is losing focus because the working set is too broad or too noisy",
    "Write prompts that give Claude Code a smaller, more useful starting context",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Claude Code can only think with the context that is currently in the session.",
      subtext:
        "Your repo may contain hundreds of files, but Claude Code only reasons from the files, instructions, and outputs it has actually pulled into view. Good context engineering is deciding what deserves that limited attention right now.",
    },
    {
      type: "diagram",
      title: "Project knowledge vs. active working memory",
      steps: [
        {
          id: "whole-project",
          label: "Whole project",
          headline: "Everything exists, but not everything is loaded",
          color: "teal",
          explanation:
            "Your codebase, docs, tests, and notes all exist as possible sources of truth. Claude Code may be able to search them, but it is not actively reasoning over all of them at once.",
          example:
            "A repo may contain app code, scripts, old experiments, test fixtures, and product docs. Most of that should stay outside the current task unless it becomes relevant.",
        },
        {
          id: "active-context",
          label: "Active context",
          headline: "Only some information is currently in play",
          color: "amber",
          explanation:
            "The active context is the slice Claude Code is actually using right now: the files it read, the rules you gave it, the terminal output it saw, and the recent conversation.",
          example:
            "If it just read `components/PricingCard.tsx`, `lib/billing.ts`, and the failing test output, that is the working set driving the next move.",
        },
        {
          id: "working-memory",
          label: "Working memory",
          headline: "That active slice must stay coherent",
          color: "violet",
          explanation:
            "When too many unrelated details pile up, Claude Code has a harder time staying crisp about the task at hand. The goal is not maximum context. The goal is the right context, in the right order, for one clear job.",
          example:
            "Mixing onboarding notes, design ideas, migration plans, and an urgent bug fix into one session often leads to vague plans or overly broad edits.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Keep the session's working memory clean",
      description:
        "You only need to fix one dashboard bug, but the session starts to sprawl. Choose the move that keeps the active context tight and useful.",
      steps: [
        {
          id: "scope-start",
          label: "Start",
          context:
            "The task is to fix a bug where the dashboard filter resets after a page refresh.",
          prompt: "claude",
          terminal:
            "You: Fix the dashboard filter reset bug after refresh.\n\nClaude Code: I can help. I should inspect the filter component, the persisted state logic, and the related tests first.",
          question: "What is the best way to start the session?",
          choices: [
            {
              id: "start-tight",
              label:
                "Point Claude Code to the filter UI, persistence logic, and related tests only",
              rationale:
                "This keeps the first working set small and directly relevant to the bug.",
            },
            {
              id: "start-broad",
              label:
                "Ask Claude Code to read the whole dashboard folder plus every analytics helper first",
            },
            {
              id: "start-history",
              label:
                "Paste a long backlog of unrelated product notes into the same session before it reads code",
            },
          ],
          correctChoiceId: "start-tight",
          explanation:
            "The best starting context is the smallest set of real evidence that can explain the behavior. That gives Claude Code clarity without flooding its working memory.",
          hint:
            "Choose the option that narrows the first read to the evidence most likely to explain this one bug.",
        },
        {
          id: "drift-middle",
          label: "Drift",
          context:
            "Halfway through the session, the conversation has expanded into performance concerns, a possible redesign, and a future analytics refactor.",
          prompt: "claude",
          terminal:
            "Claude Code has read the filter files and identified the likely bug.\n\nNew messages in the same session now mention:\n- future dashboard redesign ideas\n- possible query-performance cleanup\n- analytics naming inconsistencies\n\nClaude Code: I can explore those too, but they are broader than the current fix.",
          question: "What move best protects the session's working memory?",
          choices: [
            {
              id: "drift-refocus",
              label:
                "Refocus the session on the refresh bug and save the redesign and refactor ideas for later",
              rationale:
                "This keeps the active context aligned with the current task instead of stacking unrelated goals.",
            },
            {
              id: "drift-expand",
              label:
                "Ask Claude Code to solve the bug, redesign the filter UI, and rename analytics events in the same pass",
            },
            {
              id: "drift-ignore",
              label:
                "Keep piling on new goals because more context always makes the answer better",
            },
          ],
          correctChoiceId: "drift-refocus",
          explanation:
            "Working memory degrades when one task mutates into three. Context engineering often means saying 'not now' to relevant but separate ideas.",
          hint:
            "Pick the option that protects the current task from turning into a grab bag of adjacent work.",
        },
        {
          id: "finish-proof",
          label: "Finish",
          context:
            "Claude Code has a likely fix ready. You want the session to end with a reliable, reviewable result.",
          prompt: "claude",
          terminal:
            "Claude Code: I found the reset issue. The persisted filter state is restored after the default state assignment, so the saved choice gets overwritten.\n\nClaude Code: I can patch that next and verify it.",
          question: "What should you ask for now?",
          choices: [
            {
              id: "finish-verify",
              label:
                "Apply the targeted fix and run the relevant filter persistence test or refresh check",
              rationale:
                "This keeps the working set anchored to the task all the way through verification.",
            },
            {
              id: "finish-broaden",
              label:
                "Pause the fix and audit every persistence pattern across the app before changing anything",
            },
            {
              id: "finish-assume",
              label:
                "Skip verification because the diagnosis sounds convincing enough",
            },
          ],
          correctChoiceId: "finish-verify",
          explanation:
            "A strong session keeps the context narrow through the end: diagnose the issue, make the smallest useful fix, and verify the exact behavior you cared about.",
          hint:
            "The right answer finishes the current loop instead of opening a much larger one.",
        },
      ],
      completionMessage:
        "You kept the session focused by controlling what entered working memory. That is the heart of context engineering: not more information, but better-scoped information.",
    },
    {
      type: "explanation",
      paragraphs: [
        "The context window is the total room available for the current task. Working memory is the smaller part of that room Claude Code is actively leaning on for its next decision.",
        "That distinction matters because beginners often try to tell Claude Code everything they know, while engineers often point it at huge folders, giant logs, and multiple goals at once. In both cases, the session gets less focused, not more capable.",
        "A cleaner session starts with the files and instructions most likely to explain the problem in front of you. If new information becomes relevant, bring it in deliberately. If it does not help the current task, keep it out for now.",
      ],
      engineerDepth: [
        "In practice, active context is built from recent messages, system rules, files read during the session, terminal output, and any memory files or notes Claude Code was told to use. All of that competes for attention.",
        "A strong prompt usually constrains the first search surface, names the current goal, and asks for a proof step. That preserves clarity while still letting Claude Code expand context later if the evidence requires it.",
      ],
    },
    {
      type: "classification",
      title: "Helpful context or noisy context?",
      instruction:
        "Sort each item based on whether it improves the current working memory for a focused bug fix.",
      categories: [
        { id: "helpful", label: "Helpful now", color: "teal" },
        { id: "noisy", label: "Noise for now", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "The component where the bug appears and the test that covers it",
          correctCategory: "helpful",
        },
        {
          id: "i2",
          text: "A future redesign idea that is not part of the current task",
          correctCategory: "noisy",
        },
        {
          id: "i3",
          text: "Recent terminal output showing the failing check",
          correctCategory: "helpful",
        },
        {
          id: "i4",
          text: "Three unrelated feature requests from the backlog",
          correctCategory: "noisy",
        },
        {
          id: "i5",
          text: "The persistence helper that the component already depends on",
          correctCategory: "helpful",
        },
        {
          id: "i6",
          text: "A broad request to clean up the whole dashboard while fixing the bug",
          correctCategory: "noisy",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Build a tighter context-starting prompt",
      description:
        "Fill in the task, the smallest useful starting area, and the proof step so Claude Code begins with a clean working set.",
      fields: [
        {
          id: "task",
          label: "Task",
          placeholder: "e.g. fix the dashboard filter reset after refresh",
          hint: "Name the exact behavior you care about.",
        },
        {
          id: "startingContext",
          label: "Start here",
          placeholder: "e.g. the filter component, persistence helper, and related test",
          hint: "Give the smallest useful first search surface.",
        },
        {
          id: "verify",
          label: "Proof step",
          placeholder: "e.g. run the filter persistence test and report the result",
          hint: "Close the loop with a visible signal.",
        },
      ],
      template:
        "{task}.\n\nStart by reading {startingContext}.\n\nAfter the change, {verify}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What is the healthiest way to think about context when using Claude Code?",
          options: [
            "More context is always better, even if it is unrelated",
            "Claude Code should read the entire repo before every task",
            "The goal is to give Claude Code the smallest useful context for the current job",
            "Working memory only matters for non-engineers",
          ],
          correctIndex: 2,
          explanation:
            "Good context engineering keeps the active context relevant, coherent, and narrow enough for the current task.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Claude Code works best when its working memory contains the right context for one job, not every possible detail.",
      note: "Next, you will decide what to do when a session starts to sprawl: reset with fresh context or carry forward a condensed handoff.",
    },
  ],
};

export default config;
