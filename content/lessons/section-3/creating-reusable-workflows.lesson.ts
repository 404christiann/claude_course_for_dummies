import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "creating-reusable-workflows",
  title: "Creating Reusable Workflows",
  section: 3,
  duration: "8 min",
  objectives: [
    "Recognize when a repeated Claude Code task should become a reusable workflow",
    "Understand the ingredients that make a workflow reliable instead of vague",
    "Practice turning a one-off request into a repeatable workflow template with clear verification",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Now that the structure of a skill is clear, the next question is what makes a workflow reusable enough to deserve that structure.",
      subtext:
        "If a job repeats, the goal is not to remember the perfect prompt forever. The goal is to package the scope, steps, and verification so Claude Code can run the same playbook with less drift.",
    },
    {
      type: "diagram",
      title: "What a reusable workflow needs",
      steps: [
        {
          id: "trigger",
          label: "Trigger",
          headline: "Know when to use it",
          color: "teal",
          explanation:
            "A workflow starts with a repeatable situation, not just a clever prompt. You should be able to say when this workflow applies and when it does not.",
          example:
            "Example: 'Use this whenever we publish a new lesson and need a consistent release summary for the team.'",
        },
        {
          id: "scope",
          label: "Scope",
          headline: "Name the inputs and boundaries",
          color: "blue",
          explanation:
            "Claude Code works better when the workflow points to the right files, constraints, and output shape. Reuse comes from clarity, not from keeping it generic.",
          example:
            "Example: 'Read the changed lesson file, keep the summary under five bullets, and do not modify any content while preparing the note.'",
        },
        {
          id: "steps",
          label: "Steps",
          headline: "Give the repeatable sequence",
          color: "amber",
          explanation:
            "The workflow should describe the main Gather, Act, and Verify rhythm so Claude Code does not invent a new process each time.",
          example:
            "Example: 'Inspect the lesson diff, extract learner-facing changes, draft the summary, then check it against the release-note format.'",
        },
        {
          id: "verification",
          label: "Verify",
          headline: "Define what done looks like",
          color: "violet",
          explanation:
            "A reusable workflow is only trustworthy if it ends with a concrete check. Otherwise you are reusing a guess, not a system.",
          example:
            "Example: 'Confirm the summary covers what changed, what learners should notice, and any follow-up the team still needs.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Turn a repeated task into a workflow",
      description:
        "A course team keeps asking Claude Code to prep release notes after lesson migrations. Choose the best move at each step so the task becomes reusable instead of repeatedly improvised.",
      steps: [
        {
          id: "sim-identify-pattern",
          label: "Pattern",
          context:
            "For the third time this week, the team needs a short release summary after a lesson migration. The request is always similar: what changed, what learners should notice, and any follow-up for other agents.",
          prompt: "claude",
          terminal:
            "Recent requests:\n- summarize the migrated lesson changes\n- note any interactive blocks added\n- flag follow-up wiring work if needed\n\nClaude Code: This looks like a repeated task pattern rather than a one-off request.",
          question: "What is the best next move?",
          choices: [
            {
              id: "pattern-workflow",
              label:
                "Capture the repeated task as a reusable workflow with clear inputs, output format, and verification",
              rationale:
                "The task is repeating with the same structure, which is exactly when a workflow starts paying off.",
            },
            {
              id: "pattern-memory",
              label:
                "Keep answering from scratch and trust that the conversation history will be enough",
            },
            {
              id: "pattern-broaden",
              label:
                "Create one giant workflow for every documentation and content task in the product",
            },
          ],
          correctChoiceId: "pattern-workflow",
          explanation:
            "Reusable workflows are for repeated jobs with a stable shape. The goal is to package a proven pattern before repetition turns into inconsistency.",
          hint:
            "Pick the option that reduces re-explaining without making the workflow so broad that it becomes fuzzy.",
        },
        {
          id: "sim-tighten-scope",
          label: "Scope",
          context:
            "Now you need to define what the workflow should read and what it should produce each time.",
          prompt: "claude",
          terminal:
            "Draft workflow idea:\n- read the changed lesson work\n- prepare a team-facing summary\n- mention any follow-up outside the owned file\n\nClaude Code: I need tighter boundaries so I know exactly what to inspect and what output to return.",
          question: "Which workflow definition is strongest?",
          choices: [
            {
              id: "scope-strong",
              label:
                "Read the owned lesson file and the lesson spec context, summarize learner-facing changes in 3 to 5 bullets, and call out any required registry wiring or validation follow-up",
              rationale:
                "This gives Claude Code clear inputs, a bounded output shape, and the right collaboration guardrails.",
            },
            {
              id: "scope-vague",
              label:
                "Review whatever seems relevant and write a helpful summary in any format",
            },
            {
              id: "scope-overreach",
              label:
                "Inspect the whole app, improve any weak lessons you find, and then summarize everything that changed",
            },
          ],
          correctChoiceId: "scope-strong",
          explanation:
            "Reusable workflows work because they are precise. Strong scope tells Claude Code what to read, what not to touch, and how the result should look.",
          hint:
            "The best answer is specific enough that two different sessions would behave similarly.",
        },
        {
          id: "sim-add-verification",
          label: "Verify",
          context:
            "The workflow already has a trigger, inputs, and output format. One piece is still missing.",
          prompt: "claude",
          terminal:
            "Current workflow draft:\n1. Read the lesson file and relevant spec context\n2. Extract the key learner-facing changes\n3. Write a short team summary\n\nClaude Code: Before this is reusable, I should know how to confirm the summary is complete and consistent.",
          question: "What verification makes this workflow stronger?",
          choices: [
            {
              id: "verify-checklist",
              label:
                "Check that the summary covers the interaction pattern, the main concept taught, any unresolved follow-up outside scope, and the exact file changed",
              rationale:
                "That turns the workflow into a reliable checklist instead of a best-effort recap.",
            },
            {
              id: "verify-feeling",
              label:
                "Stop once the summary feels about right and sounds polished",
            },
            {
              id: "verify-expand",
              label:
                "Add more paragraphs so the workflow seems comprehensive even without a checklist",
            },
          ],
          correctChoiceId: "verify-checklist",
          explanation:
            "Verification is what makes the workflow portable. The workflow is reusable because it preserves the quality bar, not just the wording.",
          hint:
            "Choose the option that defines a visible completion standard rather than relying on taste.",
        },
      ],
      completionMessage:
        "You just built the backbone of a reusable workflow: a repeatable trigger, explicit scope, a stable sequence, and a definition of done that keeps quality from drifting. The last lesson in the section uses that same logic to decide when built-in skill coverage is already enough and when a custom skill is worth maintaining.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A reusable workflow is not just a saved prompt. It is a repeatable operating pattern for a job Claude Code sees again and again. Good workflows reduce re-briefing, preserve quality, and make outcomes more consistent across sessions.",
        "The most common mistake is going too broad. People try to make one workflow cover every writing task, every bug fix, or every review. That usually removes the very details Claude Code needs to stay grounded. Reusable does not mean universal.",
        "The sweet spot is a task with a stable trigger, clear boundaries, a small sequence of steps, and a visible verification rule. If those pieces are present, the workflow can help both beginners and experienced engineers get to a clean result faster. Once you can recognize that sweet spot, you are ready to make a smarter build-vs-buy decision about skills.",
      ],
      engineerDepth: [
        "In practice, reusable workflows often become `SKILL.md` files, checklist-style handoff prompts, or durable repo instructions that tell Claude Code how to gather, act, and verify in a specific recurring job.",
        "The leverage comes from standardizing the process, not from hiding judgment. A good workflow still leaves room for local evidence, but it removes the need to rediscover the same boundaries and output format every time.",
      ],
    },
    {
      type: "comparison",
      title: "Vague repeat request vs. reusable workflow",
      left: {
        label: "Repeated from scratch",
        content:
          "Summarize the lesson changes for the team and mention anything important.",
        annotations: [
          "No trigger for when this workflow applies",
          "No file boundary or output format",
          "No verification for whether the summary is complete",
        ],
      },
      right: {
        label: "Reusable workflow",
        content:
          "When a lesson migration is complete, read the owned lesson file and relevant lesson spec context, write a 3 to 5 bullet release summary, include learner-facing changes and out-of-scope follow-up, then confirm the summary names the exact file changed and any registry or validation follow-up.",
        annotations: [
          "Clear trigger: lesson migration complete",
          "Clear scope and output shape",
          "Clear verification checklist before claiming done",
        ],
      },
      insight:
        "The second version is reusable because it carries forward the decision-making structure, not just the phrasing, which is the key signal you will use in the custom-vs-built-in decision next.",
    },
    {
      type: "classification",
      title: "Signal or noise for a reusable workflow?",
      instruction:
        "Sort each item into whether it strengthens a reusable workflow or adds avoidable noise.",
      categories: [
        { id: "signal", label: "Workflow signal", color: "teal" },
        { id: "noise", label: "Workflow noise", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "A clear statement of when to use the workflow",
          correctCategory: "signal",
        },
        {
          id: "i2",
          text: "A vague instruction to look wherever seems helpful",
          correctCategory: "noise",
        },
        {
          id: "i3",
          text: "A short checklist for verifying the output before reporting success",
          correctCategory: "signal",
        },
        {
          id: "i4",
          text: "One giant workflow meant to cover every kind of task in the repo",
          correctCategory: "noise",
        },
        {
          id: "i5",
          text: "An explicit output format such as bullets, files, or follow-up notes",
          correctCategory: "signal",
        },
        {
          id: "i6",
          text: "Relying on memory of previous chats instead of writing the workflow ingredients down",
          correctCategory: "noise",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Draft a reusable workflow template",
      description:
        "Use the fields below to turn a repeated task into a workflow Claude Code can run with less drift before you decide whether it needs a custom skill at all.",
      fields: [
        {
          id: "trigger",
          label: "When to use it",
          placeholder:
            "e.g. whenever a lesson migration is complete and the team needs a short release summary",
          hint: "Name the repeatable situation that should trigger the workflow.",
        },
        {
          id: "scope",
          label: "What to read and what not to touch",
          placeholder:
            "e.g. read the owned lesson file and spec context only; do not modify other files",
          hint: "Make the boundaries explicit so the workflow stays safe and consistent.",
        },
        {
          id: "steps",
          label: "Repeatable sequence",
          placeholder:
            "e.g. inspect the lesson config, extract learner-facing changes, write the summary, check for out-of-scope follow-up",
          hint: "Describe the stable Gather, Act, and Verify rhythm.",
        },
        {
          id: "verification",
          label: "How to confirm it is done",
          placeholder:
            "e.g. verify the summary includes the exact file changed, key interaction updates, and any follow-up needed outside scope",
          hint: "State the observable completion bar, not just the desired tone.",
        },
      ],
      template:
        "Use this workflow when: {trigger}.\n\nScope: {scope}.\n\nSequence: {steps}.\n\nBefore reporting success, verify: {verification}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What usually makes a reusable workflow trustworthy instead of vague?",
          options: [
            "Making it broad enough to cover every related task",
            "Keeping the steps short but adding clear scope and verification",
            "Relying on Claude Code to infer the right files each time",
            "Writing the workflow once and never revisiting it",
          ],
          correctIndex: 1,
          explanation:
            "Reusable workflows succeed when they preserve the important structure: where to look, how to proceed, and how to verify the result.",
        },
        {
          question:
            "When should you turn a task into a reusable workflow?",
          options: [
            "When it repeats with a stable shape and quality bar",
            "Only after it has already caused a major failure",
            "Whenever a prompt sounds clever",
            "Only for engineer-only tasks with code examples",
          ],
          correctIndex: 0,
          explanation:
            "The best candidate is a job that keeps coming back with the same basic trigger, boundaries, and expected outcome.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "A reusable workflow is a repeatable job packaged with the right trigger, boundaries, sequence, and verification.",
      note:
        "If you still have to re-explain the scope and quality bar every time, the workflow is not reusable yet. If it is reusable, the next question is whether built-in coverage already handles it or a custom skill should preserve it.",
    },
  ],
};

export default config;
