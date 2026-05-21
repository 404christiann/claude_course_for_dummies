import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "validation-loops",
  title: "Validation Loops",
  section: 6,
  duration: "8 min",
  objectives: [
    "Explain why scaled AI work needs validation loops instead of one final hope-based check",
    "Recognize the sequence of a strong loop: predict, test, inspect, adjust",
    "Write a prompt that asks Claude Code to validate its work in narrow, repeatable passes",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "At small scale, you can sometimes catch mistakes by eye. At larger scale, you need loops that prove the work.",
      subtext:
        "Validation loops keep Claude Code from drifting too far before reality pushes back. The stronger the loop, the faster the system finds mistakes, learns, and self-corrects.",
    },
    {
      type: "diagram",
      title: "The four-part validation loop",
      steps: [
        {
          id: "predict",
          label: "Predict",
          headline: "Say what should be true",
          color: "teal",
          explanation:
            "Before testing, Claude Code should know what success looks like. That makes the validation purposeful instead of random.",
          example:
            "Example: the new lesson file should match `LessonConfig`, use supported block types, and fit the Section 6 arc.",
        },
        {
          id: "test",
          label: "Test",
          headline: "Run the narrowest useful check",
          color: "blue",
          explanation:
            "Start with the smallest validation that can catch the most likely mistake. Narrow checks are faster and easier to interpret.",
          example:
            "Example: run a targeted TypeScript or lint check on the lesson content area before broader app validation.",
        },
        {
          id: "inspect",
          label: "Inspect",
          headline: "Read the result, not just the exit code",
          color: "amber",
          explanation:
            "A failed check is feedback, not just a stop sign. Claude Code should understand what broke and whether the failure is real, expected, or unrelated.",
          example:
            "Example: see whether a lesson file has a schema typo or whether the failure comes from an unrelated pre-existing issue.",
        },
        {
          id: "adjust",
          label: "Adjust",
          headline: "Change the work, then loop again",
          color: "violet",
          explanation:
            "Validation matters because it changes the next move. The loop is complete only when the result drives a specific correction or a more confident close-out.",
          example:
            "Example: fix the bad block shape, rerun the targeted check, then report what passed and what remains outside scope.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Close the loop instead of guessing",
      description:
        "A new Section 6 lesson is drafted. Choose the validation moves that help Claude Code catch problems early and report the result honestly.",
      steps: [
        {
          id: "sim-first-check",
          label: "First check",
          context:
            "The lesson looks visually similar to nearby files, but it has not been validated yet.",
          prompt: "claude",
          terminal:
            "Draft complete: `validation-loops.lesson.ts`\n\nClaude Code: Before I declare success, I should run the narrowest useful check that can confirm the config actually fits the current system.",
          question: "What is the strongest next step?",
          choices: [
            {
              id: "first-targeted",
              label:
                "Run a targeted validation against the lesson content or TypeScript shape before expanding to broader checks",
              rationale:
                "This tests the most likely failure mode quickly and keeps the signal easy to interpret.",
            },
            {
              id: "first-skip",
              label:
                "Skip validation because the file matches the general pattern by eye",
            },
            {
              id: "first-broad",
              label:
                "Jump straight to the broadest possible full-app verification even if a narrower check would answer the question first",
            },
          ],
          correctChoiceId: "first-targeted",
          explanation:
            "Validation loops work best when they begin small and purposeful. That gives you fast feedback without creating avoidable noise.",
          hint:
            "Choose the option that tests the local assumption most directly.",
        },
        {
          id: "sim-failure",
          label: "Failure",
          context:
            "The targeted check fails. Now Claude Code needs to learn from the result instead of treating it like a generic red light.",
          prompt: "claude",
          terminal:
            "Validation output: block type mismatch in one section of the lesson config.\n\nClaude Code: I should inspect the exact mismatch, correct it, and rerun the relevant check before I summarize the work.",
          question: "What response is strongest?",
          choices: [
            {
              id: "failure-inspect",
              label:
                "Read the failure carefully, fix the specific mismatch, and rerun the same targeted check to confirm the correction",
              rationale:
                "This turns the failure into a learning loop rather than a vague sense that something went wrong.",
            },
            {
              id: "failure-ignore",
              label:
                "Assume the validator is probably noisy and report success anyway",
            },
            {
              id: "failure-random",
              label:
                "Start changing unrelated blocks until the error maybe disappears",
            },
          ],
          correctChoiceId: "failure-inspect",
          explanation:
            "A useful loop treats failures as specific feedback. The goal is not merely to stop. The goal is to improve the work with evidence.",
          hint:
            "Pick the option that turns the error into a focused correction path.",
        },
        {
          id: "sim-closeout",
          label: "Closeout",
          context:
            "The lesson now passes the targeted check, but broader registration work is still outside this file's scope.",
          prompt: "claude",
          terminal:
            "Rerun result: targeted validation passed\nRemaining limitation: the lesson still needs separate registration elsewhere\n\nClaude Code: I can now report what the loop proved and what it did not prove.",
          question: "What is the best summary?",
          choices: [
            {
              id: "closeout-honest",
              label:
                "State the exact file changed, the targeted validation that passed, and the separate follow-up still needed outside scope",
              rationale:
                "This keeps the closeout evidence-based and honest about remaining system work.",
            },
            {
              id: "closeout-perfect",
              label:
                "Say the whole feature is complete because the local check passed",
            },
            {
              id: "closeout-minimal",
              label:
                "Only say the lesson was updated, without mentioning what was validated",
            },
          ],
          correctChoiceId: "closeout-honest",
          explanation:
            "Validation loops build trust when the reporting mirrors the evidence. Passing one check is useful, but it is not permission to overclaim.",
          hint:
            "Choose the option that separates validated truth from remaining follow-up.",
        },
      ],
      completionMessage:
        "You closed the loop correctly: define success, test narrowly, learn from the result, and report only what the evidence supports.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Validation loops are how AI work stays grounded in reality. Instead of making one big guess and checking at the end, the workflow keeps asking, 'What should be true now, and how can I prove it?'",
        "The loop matters even for small tasks, but it becomes essential as work scales. Multiple agents, multiple branches, and multiple follow-ups create too many places for silent errors to hide.",
        "For beginners, this can feel like a confidence tool: do not trust the draft just because it sounds good. For engineers, it is also an operations tool: narrow validation makes debugging faster and results more credible.",
      ],
      engineerDepth: [
        "Strong validation loops often move from narrow to broad. Start with file shape, schema, or local behavior. Expand only when the smaller checks pass or when the risk justifies a wider pass.",
        "The close-out should mirror the loop. Say what was expected, what was checked, what passed or failed, and what still remains outside the current evidence.",
      ],
    },
    {
      type: "comparison",
      title: "Hope-based shipping vs. validation loop",
      left: {
        label: "Hope-based approach",
        content:
          "The file looks right, so report success and trust that anything major will surface later.",
        annotations: [
          "No explicit success criteria",
          "No evidence before close-out",
          "Mistakes can survive until much later",
        ],
      },
      right: {
        label: "Validation loop",
        content:
          "Define what should be true, run a narrow check, inspect the result, correct what failed, then report only what the evidence supports.",
        annotations: [
          "Validation has a clear purpose",
          "Failures become targeted feedback",
          "Close-out stays more trustworthy",
        ],
      },
      insight:
        "A good loop does more than catch mistakes. It changes the next move while the task is still cheap to fix.",
    },
    {
      type: "classification",
      title: "Validation loop habit or weak shortcut?",
      instruction:
        "Sort each behavior based on whether it strengthens self-correcting work.",
      categories: [
        { id: "loop", label: "Validation loop habit", color: "teal" },
        { id: "shortcut", label: "Weak shortcut", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Name the concrete success conditions before running a check",
          correctCategory: "loop",
        },
        {
          id: "i2",
          text: "Skip testing because the output looks similar to a nearby file",
          correctCategory: "shortcut",
        },
        {
          id: "i3",
          text: "Rerun the targeted check after fixing the exact failure",
          correctCategory: "loop",
        },
        {
          id: "i4",
          text: "Treat any failure as annoying noise and move on",
          correctCategory: "shortcut",
        },
        {
          id: "i5",
          text: "Report what the validation proved and what it did not prove yet",
          correctCategory: "loop",
        },
        {
          id: "i6",
          text: "Use one passed local check to claim the entire system is finished",
          correctCategory: "shortcut",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Ask Claude Code for a self-correcting validation loop",
      description:
        "Use this builder when you want Claude Code to prove the work in small steps instead of jumping straight to a broad final claim.",
      fields: [
        {
          id: "task",
          label: "Task being validated",
          placeholder:
            "e.g. create the Section 6 validation loops lesson in the owned file",
          hint: "Name the work that needs evidence.",
        },
        {
          id: "success",
          label: "What should be true",
          placeholder:
            "e.g. the file should match LessonConfig, use supported blocks, and fit the section arc",
          hint: "Define success before checking it.",
        },
        {
          id: "check",
          label: "First narrow validation step",
          placeholder:
            "e.g. run a targeted type or lint check on the lesson content area before broader validation",
          hint: "Start with the smallest strong signal.",
        },
        {
          id: "report",
          label: "How to close the loop",
          placeholder:
            "e.g. if something fails, inspect and fix it, rerun the check, then report exactly what passed and what remains outside scope",
          hint: "Ask for correction plus evidence-based reporting.",
        },
      ],
      template:
        "{task}.\n\nSuccess should mean: {success}.\n\nFirst, {check}.\n\nThen {report}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What is the core job of a validation loop?",
          options: [
            "To delay shipping for as long as possible",
            "To turn assumptions into tested evidence and use the result to guide the next move",
            "To replace human judgment entirely",
            "To make the workflow look more technical",
          ],
          correctIndex: 1,
          explanation:
            "Validation loops are valuable because they create evidence and then use that evidence to steer the work, not because they add ceremony.",
        },
        {
          question:
            "Why start with a narrow check before a broader one?",
          options: [
            "Because broad checks are never useful",
            "Because narrow checks are faster, easier to interpret, and often catch the local mistake directly",
            "Because passing one narrow check proves the whole system is done",
            "Because validation should avoid concrete files whenever possible",
          ],
          correctIndex: 1,
          explanation:
            "Narrow checks create faster feedback and cleaner debugging. Broader validation still matters, but usually after the local assumptions are stable.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "At scale, do not just ask Claude Code to finish the work. Ask it to prove the work in loops.",
      note:
        "Predict, test, inspect, adjust. That rhythm is what makes AI workflows self-correcting instead of wishful.",
    },
  ],
};

export default config;
