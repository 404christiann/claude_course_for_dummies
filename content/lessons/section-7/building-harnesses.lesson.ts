import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "building-harnesses",
  title: "Building Harnesses That Reduce Friction",
  section: 7,
  duration: "8 min",
  objectives: [
    "Understand what an agent harness is and why small guardrails often outperform longer prompts",
    "Recognize the kinds of harnesses that improve orientation, validation, and safe iteration",
    "Design a lightweight harness plan for a recurring workflow in a shared codebase",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "If the repo keeps making agents guess, do not just write a better prompt. Build a better runway.",
      subtext:
        "A harness is any tool, fixture, script, or narrow workflow aid that makes the right path easier to follow and the wrong path harder to take. Good harnesses reduce friction before the model has to improvise around it.",
    },
    {
      type: "diagram",
      title: "What a practical harness usually provides",
      steps: [
        {
          id: "entry",
          label: "Entry",
          headline: "A clean way in",
          color: "teal",
          explanation:
            "Some harnesses make orientation faster: starter docs, stable commands, or sample task entry points that show where the workflow begins.",
          example:
            "Example: a short content-authoring guide that tells an agent which lesson files, schemas, and examples to read first.",
        },
        {
          id: "fixture",
          label: "Fixture",
          headline: "A safe thing to run against",
          color: "blue",
          explanation:
            "Fixtures, sample inputs, and deterministic test data let agents practice or validate against something stable instead of live complexity.",
          example:
            "Example: a known lesson config or test fixture that exercises the content renderer without requiring the whole app state.",
        },
        {
          id: "command",
          label: "Command",
          headline: "A narrow proof path",
          color: "amber",
          explanation:
            "The highest-leverage harness is often a small validation command. It lets the agent confirm one slice of work quickly instead of hiding behind broad app-wide checks.",
          example:
            "Example: a lesson-only validation or typecheck command that proves content files are structurally valid.",
        },
        {
          id: "report",
          label: "Report",
          headline: "A standard way to close out",
          color: "violet",
          explanation:
            "Closeout templates are harnesses too. They make handoffs consistent by asking for changed files, proof run, and remaining follow-up every time.",
          example:
            "Example: an end-of-task checklist that always records what was edited, what was validated, and what remains out of scope.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Choose the right harness for the recurring pain",
      description:
        "A team keeps seeing the same agent friction in lesson work. Pick the harness that best reduces the underlying problem at each stage.",
      steps: [
        {
          id: "sim-entry",
          label: "Entry",
          context:
            "New sessions repeatedly spend too long figuring out where lesson content starts and which examples are current.",
          prompt: "claude",
          terminal:
            "Claude Code: The friction is not only model ability. The repo does not provide a fast, dependable entry path for this workflow.",
          question: "What harness would help most first?",
          choices: [
            {
              id: "entry-guide",
              label:
                "Add a short orientation guide naming the schema, the lesson folders, and the strongest current examples",
              rationale:
                "This lowers the repeated cost of finding the map on every fresh session.",
            },
            {
              id: "entry-biggerprompt",
              label:
                "Keep rewriting a longer kickoff prompt each time without changing the repo aids",
            },
            {
              id: "entry-random",
              label:
                "Let each agent decide its own onboarding style from scratch",
            },
          ],
          correctChoiceId: "entry-guide",
          explanation:
            "When orientation is the recurring pain, a stable entry harness beats repeated re-briefing. It moves knowledge from memory into the workflow itself.",
          hint:
            "Pick the option that solves the shared repo problem, not just one conversation.",
        },
        {
          id: "sim-fixture",
          label: "Fixture",
          context:
            "Agents can draft lesson configs, but verifying them sometimes depends on navigating the full app manually.",
          prompt: "claude",
          terminal:
            "Claude Code: I need a smaller surface to test against so validation does not require the whole product every time.",
          question: "Which harness helps most?",
          choices: [
            {
              id: "fixture-sample",
              label:
                "Create or document a stable sample lesson path or fixture that exercises the content flow predictably",
              rationale:
                "This shrinks the test surface and makes repeated checks less fragile.",
            },
            {
              id: "fixture-hope",
              label:
                "Trust visual inspection alone because manual verification is annoying",
            },
            {
              id: "fixture-refactor",
              label:
                "Pause everything for a full platform rewrite before improving the workflow",
            },
          ],
          correctChoiceId: "fixture-sample",
          explanation:
            "Fixtures reduce variance. They give agents something stable to validate against, which increases confidence without requiring broad or slow end-to-end checks every time.",
          hint:
            "Look for the option that makes the same workflow easier to repeat safely.",
        },
        {
          id: "sim-command",
          label: "Command",
          context:
            "The team's most common complaint is that agents finish work without proving it, mostly because no one knows the shortest relevant validation command.",
          prompt: "claude",
          terminal:
            "Claude Code: This friction calls for a proof harness, not just a reminder to be careful.",
          question: "What is the best fix?",
          choices: [
            {
              id: "command-targeted",
              label:
                "Expose a discoverable narrow validation command for the common task and teach agents to use it by default",
              rationale:
                "Cheap proof is one of the strongest ways to improve reliability at scale.",
            },
            {
              id: "command-broad",
              label:
                "Require the full slow validation suite for every tiny change even when it discourages normal use",
            },
            {
              id: "command-none",
              label:
                "Accept that validation is optional because good agents should know when code looks correct",
            },
          ],
          correctChoiceId: "command-targeted",
          explanation:
            "The right harness lowers the cost of doing the right thing. A narrow proof command makes verification the easy default rather than an extra burden.",
          hint:
            "Choose the option that changes behavior by reducing friction, not by adding lectures.",
        },
        {
          id: "sim-report",
          label: "Report",
          context:
            "Even after better validation, the team still loses time because handoffs vary wildly from one session to the next.",
          prompt: "claude",
          terminal:
            "Claude Code: I should standardize the closeout too. Handoff inconsistency is a workflow problem, and workflows can be harnessed.",
          question: "Which harness is strongest here?",
          choices: [
            {
              id: "report-template",
              label:
                "Use a simple closeout template that always captures changed files, proof run, and remaining follow-up",
              rationale:
                "This turns handoff quality into a repeatable system instead of a memory test.",
            },
            {
              id: "report-freeform",
              label:
                "Let every agent summarize however it prefers so the wording feels natural",
            },
            {
              id: "report-hidden",
              label:
                "Skip the details and only mention problems if someone asks later",
            },
          ],
          correctChoiceId: "report-template",
          explanation:
            "A closeout template is a harness because it protects the next workflow step. It preserves context without requiring the next person to reverse-engineer the previous session.",
          hint:
            "Pick the option that reduces repeated orientation cost for the team.",
        },
      ],
      completionMessage:
        "You matched the harness to the friction: faster entry, safer fixtures, cheaper proof, and clearer closeout. That is how teams make agents easier to trust over time.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A harness is not necessarily a big framework. Often it is a small, practical improvement that reduces repeated confusion in a workflow. That could be a guide, a fixture, a script, or a reporting template.",
        "The key idea is leverage. Every time you fix the environment instead of re-explaining the same thing, the next agent task gets easier too. This is usually more durable than relying on one unusually careful prompt.",
        "For non-engineers, the mental model is simple: if agents keep stumbling in the same place, build a guardrail there. For engineers, the question becomes which guardrail reduces the most risk per unit of effort.",
      ],
      engineerDepth: [
        "High-leverage harnesses are usually small and local: scoped validation scripts, deterministic fixtures, task-specific docs, and closeout checklists. They improve common flows without demanding a full platform redesign.",
        "A good harness should make success cheaper, not just more correct. If the safe path remains expensive, teams will drift back toward skipping it under time pressure.",
      ],
    },
    {
      type: "comparison",
      title: "Prompt harder vs. harness smarter",
      left: {
        label: "Prompt harder",
        content:
          "Please be very careful, find the right lesson files, validate properly, and leave a useful summary. Do not miss anything.",
        annotations: [
          "Pushes more responsibility into memory and interpretation",
          "Does not reduce the actual workflow friction",
          "Likely needs to be repeated again next time",
        ],
      },
      right: {
        label: "Harness smarter",
        content:
          "Document the lesson entry path, provide a lesson-only validation command, keep a stable sample fixture, and use a short closeout template for every content task.",
        annotations: [
          "Moves knowledge into the system",
          "Makes safe behavior cheaper and more repeatable",
          "Improves future sessions, not just this one",
        ],
      },
      insight:
        "Prompts still matter, but harnesses create the environment where good prompts reliably work.",
    },
    {
      type: "classification",
      title: "Harness or repeated workaround?",
      instruction:
        "Sort each item based on whether it meaningfully reduces workflow friction or just patches around it one more time.",
      categories: [
        { id: "harness", label: "Harness", color: "teal" },
        { id: "workaround", label: "Repeated workaround", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "A stable command for validating a lesson-only change",
          correctCategory: "harness",
        },
        {
          id: "i2",
          text: "Writing the same long warning about validation in every prompt",
          correctCategory: "workaround",
        },
        {
          id: "i3",
          text: "A documented sample file path that new sessions can inspect first",
          correctCategory: "harness",
        },
        {
          id: "i4",
          text: "Skipping proof because the full app check feels too heavy",
          correctCategory: "workaround",
        },
        {
          id: "i5",
          text: "A short closeout checklist used across similar tasks",
          correctCategory: "harness",
        },
        {
          id: "i6",
          text: "Trusting each agent to remember the workflow norms from chat history",
          correctCategory: "workaround",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Design a lightweight harness plan",
      description:
        "Use these fields to decide what small supports would make a recurring agent workflow safer and faster.",
      fields: [
        {
          id: "workflow",
          label: "Recurring workflow",
          placeholder:
            "e.g. editing and validating lesson content files in the course app",
          hint: "Name the repeated task you want to improve.",
        },
        {
          id: "friction",
          label: "Main repeated friction",
          placeholder:
            "e.g. new sessions struggle to orient and no one knows the shortest proof command",
          hint: "Describe the workflow pain, not just the symptom once.",
        },
        {
          id: "harness",
          label: "Best small harnesses",
          placeholder:
            "e.g. entry guide, lesson-only validation command, sample fixture, closeout template",
          hint: "Choose the smallest supports that would most improve the flow.",
        },
        {
          id: "impact",
          label: "Why these help",
          placeholder:
            "e.g. lower onboarding time, reduce skipped validation, and improve handoffs across agents",
          hint: "Tie the harnesses to the friction they remove.",
        },
      ],
      template:
        "Workflow: {workflow}.\n\nCurrent friction: {friction}.\n\nRecommended harnesses: {harness}.\n\nExpected impact: {impact}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What is usually the strongest reason to build a harness?",
          options: [
            "To make prompts longer and more detailed",
            "To reduce repeated workflow friction in a way future sessions can reuse",
            "To replace all human judgment from the process",
            "To avoid writing any documentation at all",
          ],
          correctIndex: 1,
          explanation:
            "Harnesses pay off because they improve the environment for repeated work. They reduce recurring confusion rather than handling one isolated moment.",
        },
        {
          question:
            "Which option best reflects a good harness strategy?",
          options: [
            "Add the smallest guardrail that makes the safe path easier for a common task",
            "Build a huge platform overhaul before fixing any small friction",
            "Keep the system the same and just remind agents to be careful",
            "Only focus on handoffs and ignore validation entirely",
          ],
          correctIndex: 0,
          explanation:
            "Good harnesses are usually practical and targeted. They make repeated success cheaper without waiting for a massive redesign.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "When agents keep stumbling in the same place, improve the runway instead of repeating the warning.",
      note:
        "The final Section 7 lesson combines failure awareness, readiness audits, and harnesses into a practical agent workflow you can use across real team tasks.",
    },
  ],
};

export default config;
