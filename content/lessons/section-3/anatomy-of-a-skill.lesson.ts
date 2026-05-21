import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "anatomy-of-a-skill",
  title: "Anatomy of a `SKILL.md`",
  section: 3,
  duration: "7 min",
  objectives: [
    "Identify the parts of a strong `SKILL.md` and what each part is responsible for",
    "Explain why a good skill defines both when to use it and how to execute it",
    "Turn the idea of a reusable skill into a concrete structure Claude can actually follow",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Once you know a workflow deserves to become a skill, the next question is simple: what has to be inside the file?",
      subtext:
        "A strong `SKILL.md` turns the reusable method from the last lesson into something Claude can activate, follow, and recover with if the ideal path is blocked.",
    },
    {
      type: "diagram",
      title: "The four parts of a strong `SKILL.md`",
      steps: [
        {
          id: "trigger",
          label: "When to use it",
          headline: "Trigger on the right problem",
          color: "teal",
          explanation:
            "A good skill starts by defining the situation it is for. That keeps Claude from overusing the skill on unrelated work and helps it activate the workflow at the right moment.",
          example:
            "Example: 'Use this skill when the user wants to triage a GitHub pull request, review failing checks, or respond to actionable feedback.'",
        },
        {
          id: "workflow",
          label: "What to do",
          headline: "Give Claude a step-by-step path",
          color: "amber",
          explanation:
            "The core of the file should be an execution sequence, not motivational prose. Claude needs ordered steps, decision points, and a clear default path through the task.",
          example:
            "Example: '1. Inspect the PR summary. 2. Read unresolved review comments. 3. Group findings by severity. 4. Implement selected fixes. 5. Re-run verification.'",
        },
        {
          id: "resources",
          label: "What to reuse",
          headline: "Point to scripts, templates, and references",
          color: "violet",
          explanation:
            "If a workflow depends on a template, a helper script, or a specific reference file, the skill should point there explicitly. Reuse is what turns a workflow into leverage.",
          example:
            "Example: 'If `templates/review-response.md` exists, use it. If `scripts/render_report.ts` exists, run it instead of rebuilding the report format by hand.'",
        },
        {
          id: "guardrails",
          label: "How to stay safe",
          headline: "Include decision rules and fallback behavior",
          color: "blue",
          explanation:
            "Strong skills define what to do when the ideal path fails: missing files, ambiguous scope, blocked tools, or risky side effects. This is what makes the workflow dependable instead of brittle.",
          example:
            "Example: 'If the referenced file is missing, say so briefly and continue with the nearest safe fallback. If the task could change production data, stop and confirm before proceeding.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Repair a weak skill file",
      description:
        "A team wrote a rough `SKILL.md` for code review work, but Claude keeps using it inconsistently. Choose the best upgrade at each step so the skill becomes genuinely reusable.",
      steps: [
        {
          id: "sim-trigger",
          label: "Trigger",
          context:
            "The current file begins with: 'This skill helps with GitHub stuff.' Claude sometimes invokes it for bug triage, release notes, and issue grooming.",
          prompt: "claude",
          terminal:
            "Current `SKILL.md` opening:\n- This skill helps with GitHub stuff\n- Use it when needed\n\nClaude: I know the domain, but I do not know the exact situations that should activate this workflow.",
          question: "What is the best first improvement?",
          choices: [
            {
              id: "trigger-specific",
              label:
                "Replace it with concrete trigger cases like PR review, unresolved comments, and failing checks",
              rationale:
                "A skill becomes usable when Claude can recognize the situations it was designed for.",
            },
            {
              id: "trigger-longer",
              label:
                "Keep the trigger vague but add a longer paragraph about why GitHub matters",
            },
            {
              id: "trigger-trust",
              label:
                "Leave it broad and trust Claude to infer the right moments automatically",
            },
          ],
          correctChoiceId: "trigger-specific",
          explanation:
            "The first job of a skill is activation. If Claude cannot tell when the skill applies, the rest of the file is less reliable no matter how good it is.",
          hint:
            "Pick the option that narrows the use case instead of expanding the description.",
        },
        {
          id: "sim-workflow",
          label: "Workflow",
          context:
            "The next section says: 'Review the code and fix anything important.' Different sessions now produce different approaches and different levels of depth.",
          prompt: "claude",
          terminal:
            "Current instruction block:\n- Review the code\n- Fix anything important\n\nClaude: I understand the goal, but there is no stable sequence for how to inspect, prioritize, or verify the work.",
          question: "What change makes the skill more reusable?",
          choices: [
            {
              id: "workflow-ordered",
              label:
                "Add an ordered workflow with inspect, classify findings, implement chosen fixes, and verify",
              rationale:
                "A skill should encode the repeatable path, not just the desired outcome.",
            },
            {
              id: "workflow-shorter",
              label:
                "Shorten it even more so Claude can improvise each time",
            },
            {
              id: "workflow-examples",
              label:
                "List three possible review styles without saying which one to prefer",
            },
          ],
          correctChoiceId: "workflow-ordered",
          explanation:
            "Reusable skills reduce variability by giving Claude a default sequence. That sequence can still branch, but the default path should be explicit.",
          hint:
            "The strongest answer turns an intention into an operational checklist.",
        },
        {
          id: "sim-guardrails",
          label: "Guardrails",
          context:
            "The skill references a helper script that is sometimes absent in newer repos. When it is missing, Claude stalls or abandons the workflow.",
          prompt: "claude",
          terminal:
            "Reference in `SKILL.md`:\n- Run `scripts/review-pr.ts`\n\nProblem:\n- some repos do not contain that script\n\nClaude: I need guidance for what to do when the preferred asset is unavailable.",
          question: "How should the skill handle this?",
          choices: [
            {
              id: "guardrails-fallback",
              label:
                "Add a fallback rule: if the script is missing, say so and continue with the manual review workflow",
              rationale:
                "Fallback behavior keeps the skill useful even when one resource is unavailable.",
            },
            {
              id: "guardrails-remove",
              label:
                "Delete the script reference entirely so the file never depends on reusable assets",
            },
            {
              id: "guardrails-stop",
              label:
                "Tell Claude to stop immediately whenever any referenced file is missing",
            },
          ],
          correctChoiceId: "guardrails-fallback",
          explanation:
            "Good skills are resilient. They prefer reuse when it exists, but they also explain how to continue safely when the best path is blocked.",
          hint:
            "Choose the option that preserves the workflow instead of making it fragile.",
        },
      ],
      completionMessage:
        "You turned a vague note into a real skill: clear trigger, explicit workflow, reusable assets, and a fallback when the ideal path is blocked. With that structure in place, the next lesson asks how to design workflows worth reusing in the first place.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A `SKILL.md` is most useful when it stores operational judgment that you want Claude to reuse across many similar tasks. That means the file should answer two practical questions fast: when should this workflow activate, and what should happen next?",
        "The biggest mistake is writing a skill like a reminder to yourself instead of an instruction set for Claude. 'Help with repo onboarding' sounds reasonable to a human, but Claude needs sharper boundaries, a default sequence, and references to the exact assets that make the workflow repeatable.",
        "The payoff is consistency. When a good skill fires, beginners get guided structure instead of blank-page paralysis, and engineers get a faster path to the same high-signal workflow they would otherwise have to restate by hand. Once that structure feels clear, you are ready to think one level higher again: what makes an entire workflow reusable instead of vague?",
      ],
      engineerDepth: [
        "In practice, strong skills often encode tool choice, file search order, validation expectations, and fallback rules. The goal is not to make Claude rigid. The goal is to make its first good move more likely and its failure modes more recoverable.",
        "A useful test is this: if two different sessions use the skill on similar tasks, will they start from the same operating assumptions? If not, the file probably needs clearer triggers, more explicit steps, or stronger guardrails.",
      ],
    },
    {
      type: "comparison",
      title: "Weak skill anatomy vs. strong skill anatomy",
      left: {
        label: "Vague note",
        content:
          "Use this skill for onboarding. Read the codebase, understand it, and help the user.",
        annotations: [
          "No trigger cases, so activation is fuzzy",
          "No ordered workflow, so execution varies wildly",
          "No reusable references or fallback behavior",
        ],
      },
      right: {
        label: "Reusable skill",
        content:
          "Use this skill when the user wants a read-only repo walkthrough or architecture orientation. First inspect the top-level structure, then trace data flow, then identify validation commands, then summarize risks and next-entry files. Reuse `templates/repo-walkthrough.md` if present; otherwise continue with the same sequence manually.",
        annotations: [
          "Trigger conditions are concrete",
          "The workflow is ordered and easy to repeat",
          "Resource reuse and fallback are both defined",
        ],
      },
      insight:
        "A strong skill does more than describe a domain. It gives Claude a stable playbook for operating inside that domain, which is what lets reusable workflows stay consistent over time.",
    },
    {
      type: "classification",
      title: "Which part of the skill is this?",
      instruction:
        "Sort each line into the part of `SKILL.md` it belongs to.",
      categories: [
        { id: "trigger", label: "When to use it", color: "teal" },
        { id: "workflow", label: "What to do", color: "amber" },
        { id: "resources", label: "What to reuse", color: "violet" },
        { id: "guardrails", label: "How to stay safe", color: "blue" },
      ],
      items: [
        {
          id: "i1",
          text: "Use this skill when the user asks to debug failing GitHub Actions checks on a pull request",
          correctCategory: "trigger",
        },
        {
          id: "i2",
          text: "Start by inspecting the failing checks, then read the related code, then reproduce locally if feasible",
          correctCategory: "workflow",
        },
        {
          id: "i3",
          text: "If `scripts/collect-logs.ts` exists, run it before manually gathering build output",
          correctCategory: "resources",
        },
        {
          id: "i4",
          text: "If the task could change production infrastructure, pause and ask for confirmation before proceeding",
          correctCategory: "guardrails",
        },
        {
          id: "i5",
          text: "Use `templates/retro.md` when preparing the final handoff note",
          correctCategory: "resources",
        },
        {
          id: "i6",
          text: "If the preferred file is missing, say so briefly and continue with the nearest safe fallback",
          correctCategory: "guardrails",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Draft the spine of a new skill",
      description:
        "Fill in the core pieces and the block below will assemble a simple `SKILL.md` outline you can build from before the next lesson zooms out to workflow design.",
      fields: [
        {
          id: "useCase",
          label: "When to use it",
          placeholder: "e.g. when the user wants a read-only architecture walkthrough of a new repo",
          hint: "Name the situations that should trigger this skill.",
        },
        {
          id: "workflow",
          label: "Default workflow",
          placeholder:
            "e.g. inspect structure, trace data flow, identify validation paths, summarize risks and next files",
          hint: "Write the repeatable sequence Claude should follow.",
        },
        {
          id: "assets",
          label: "References or assets",
          placeholder:
            "e.g. use templates/repo-walkthrough.md and scripts/index-files.ts if they exist",
          hint: "Point to reusable files, scripts, or templates.",
        },
        {
          id: "fallback",
          label: "Fallback rule",
          placeholder:
            "e.g. if the template is missing, continue manually with the same sequence and say so briefly",
          hint: "Explain how Claude should proceed when the ideal path is blocked.",
        },
      ],
      template:
        "Use this skill when {useCase}.\n\nDefault workflow:\n{workflow}.\n\nReuse:\n{assets}.\n\nFallback:\n{fallback}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What makes a `SKILL.md` meaningfully different from a vague reminder note?",
          options: [
            "It uses more technical wording and longer explanations",
            "It gives Claude clear activation conditions, a repeatable workflow, and fallback behavior",
            "It tries to cover every possible edge case in the repo",
            "It avoids referencing scripts or templates so Claude stays flexible",
          ],
          correctIndex: 1,
          explanation:
            "A real skill is operational. It tells Claude when to use the workflow, how to run it, and how to continue safely if the best path is unavailable.",
        },
        {
          question:
            "A skill says 'Use `scripts/report.ts` to generate the output' but never explains what to do if that file is missing. What is the main weakness?",
          options: [
            "The skill is too short to be useful",
            "The skill has a brittle dependency because it lacks fallback behavior",
            "The skill should remove all asset references entirely",
            "The skill needs a longer introductory paragraph",
          ],
          correctIndex: 1,
          explanation:
            "Referenced assets are great, but the file also needs a safe fallback so the workflow still works when the preferred helper is absent.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "A strong `SKILL.md` says when to activate, what sequence to follow, what to reuse, and how to recover.",
      note:
        "If one of those four parts is missing, the skill is probably closer to a note than a workflow. Next, you will use this structure to judge whether a workflow is reusable enough to package at all.",
    },
  ],
};

export default config;
