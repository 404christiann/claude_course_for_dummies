import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "what-skills-are",
  title: "What Skills Are",
  section: 3,
  duration: "7 min",
  objectives: [
    "Explain a skill as a reusable workflow package, not just a markdown note",
    "Decide when repeated Claude Code work should stay in a prompt versus become a skill",
    "Prepare for the next lesson by naming the job, workflow, and done signal a skill needs",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Section 3 starts here: a skill is how a repeated good workflow becomes something Claude Code can reuse on purpose.",
      subtext:
        "If you keep re-explaining the same job, context, and quality bar, you do not have a prompting problem anymore. You have a workflow worth packaging, and the next lessons will show how to package it well.",
    },
    {
      type: "diagram",
      title: "What a skill actually packages",
      steps: [
        {
          id: "repeatable-job",
          label: "Repeatable job",
          headline: "One task pattern shows up again and again",
          color: "teal",
          explanation:
            "A skill starts with repetition. The same kind of request keeps coming back, often with the same setup, the same rules, and the same quality bar.",
          example:
            "Examples: triage a bug report, onboard to a repo before editing, review a PR for regressions, or prepare a release summary from a fixed set of files.",
        },
        {
          id: "workflow-package",
          label: "Workflow package",
          headline: "You package the instructions Claude should inherit",
          color: "amber",
          explanation:
            "The skill holds the durable part of the workflow: what the job is, how to approach it, what assets or files matter, and what good output looks like.",
          example:
            "Instead of retyping 'read the issue, inspect the touched files, look for regressions, and summarize findings first,' you store that operating pattern once.",
        },
        {
          id: "guided-reuse",
          label: "Guided reuse",
          headline: "The next task starts from a better baseline",
          color: "violet",
          explanation:
            "A skill does not replace the current task prompt. It upgrades the starting behavior so Claude Code enters the task with the right workflow already loaded.",
          example:
            "You still provide today's bug, PR, or feature request. The skill contributes the repeatable method for handling that kind of work well.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Decide when work becomes a skill",
      description:
        "A small product team keeps asking Claude Code to help with incoming bug reports. Guide the team from repeated prompting to a reusable skill so you can separate the durable workflow from the temporary case details.",
      steps: [
        {
          id: "spot-pattern",
          label: "Spot the pattern",
          context:
            "Each week, a teammate asks Claude Code to triage new bug reports in the same app using nearly the same steps and output format.",
          prompt: "claude",
          terminal:
            "Team routine for bug triage:\n- read the bug report\n- inspect the touched feature area\n- check recent related files\n- look for an existing test\n- reply with findings, likely cause, and next safest move\n\nClaude Code: I can follow those steps, but I am being re-briefed with the same workflow every time.",
          question: "What does that repetition suggest?",
          choices: [
            {
              id: "pattern-skill",
              label:
                "This is a strong skill candidate because the workflow repeats even when the individual bug changes",
              rationale:
                "Skills are for repeated patterns. The specific bug varies, but the operating procedure stays stable.",
            },
            {
              id: "pattern-prompt",
              label:
                "Keep retyping the full workflow each time because every bug is technically different",
            },
            {
              id: "pattern-memory",
              label:
                "Put each new bug report into long-term memory so Claude Code remembers every future triage case",
            },
          ],
          correctChoiceId: "pattern-skill",
          explanation:
            "A skill fits when the method is stable across many tasks. The bug report itself is task-specific, but the triage workflow is durable.",
          hint:
            "Look for the part that repeats across tasks, not the part that changes from ticket to ticket.",
        },
        {
          id: "package-right",
          label: "Package it",
          context:
            "The team now wants to create a `bug-triage` skill that helps Claude Code start each triage session in the right mode.",
          prompt: "claude",
          terminal:
            "Proposed skill contents:\n- goal: triage a new bug safely\n- instructions: read the report, inspect likely files, check for tests, summarize findings first\n- output format: likely cause, confidence, next step\n\nOpen question: what belongs inside the skill versus inside today's prompt?",
          question: "What belongs inside the skill?",
          choices: [
            {
              id: "package-durable",
              label:
                "The repeatable triage workflow, expected output shape, and any durable repo-specific rules that apply every time",
              rationale:
                "Skills should hold stable guidance that improves every future run of the same kind of task.",
            },
            {
              id: "package-ticket",
              label:
                "This week's exact bug description, temporary hypotheses, and every log snippet from the current issue",
            },
            {
              id: "package-everything",
              label:
                "The whole project history, all team preferences, and every adjacent workflow so nothing is ever missing",
            },
          ],
          correctChoiceId: "package-durable",
          explanation:
            "A good skill stores the durable method, not the temporary case details. Current bug specifics should stay in the live prompt where they belong.",
          hint:
            "Choose the option that would still be useful next month when the ticket is different.",
        },
        {
          id: "reuse-well",
          label: "Reuse it well",
          context:
            "The `bug-triage` skill exists now. A new bug arrives: learners sometimes lose checkpoint progress after refreshing the lesson page.",
          prompt: "claude",
          terminal:
            "Skill loaded: bug-triage\n\nClaude Code already knows the workflow:\n- inspect the report\n- read the likely feature area\n- check related tests\n- summarize findings before broadening scope\n\nClaude Code: I am ready for the current bug details.",
          question: "What is the best way to use the skill now?",
          choices: [
            {
              id: "reuse-task",
              label:
                "Use the skill and still provide the current bug, the relevant lesson-progress area, and how to verify the outcome",
              rationale:
                "Skills improve the baseline, but the current task still needs scope and proof.",
            },
            {
              id: "reuse-alone",
              label:
                "Invoke the skill without any current bug details because the skill should handle everything by itself",
            },
            {
              id: "reuse-ignore",
              label:
                "Ignore the skill and start from scratch so Claude Code does not inherit any assumptions",
            },
          ],
          correctChoiceId: "reuse-task",
          explanation:
            "A skill is reusable guidance, not a substitute for the present task. The best sessions combine the skill's durable workflow with today's concrete scope and verification step.",
          hint:
            "The winning choice keeps both pieces in play: reusable method and current-task specifics.",
        },
      ],
      completionMessage:
        "You just separated durable workflow from temporary task details. That distinction is the heart of what skills are, and it sets up the next lesson: what a strong `SKILL.md` needs in order to carry that workflow well.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A skill is not just extra documentation. It is a reusable operating pattern that Claude Code can load when a certain kind of job appears. The point is not to save typing for its own sake. The point is to preserve a good method.",
        "That matters for non-engineers because it reduces intimidation. Instead of inventing the process from scratch every time, they can rely on a stable guided workflow. It matters for engineers because it reduces prompt churn and makes repeated work more consistent across sessions and teammates.",
        "The simplest test is this: if the same kind of request keeps needing the same setup, the same instructions, and the same output format, you are probably looking at a future skill. Once you can see that pattern clearly, the next step is deciding what belongs inside the skill itself.",
      ],
      engineerDepth: [
        "In practice, a skill often centers on a `SKILL.md` file, but the important concept is broader than one file extension. The real unit is a reusable workflow package: instructions, references, optional assets, and clear criteria for what a good result looks like.",
        "Skills should stay narrow. If a skill tries to solve every adjacent problem, it becomes noisy and less trustworthy. Small, high-signal skills compose better than one giant 'do everything in this repo' skill.",
      ],
    },
    {
      type: "comparison",
      title: "One-off prompt vs. skill-backed workflow",
      left: {
        label: "Repeated one-off prompting",
        content:
          "Every new task restates the same workflow: where to look, how to reason, what output shape to use, and which checks matter.",
        annotations: [
          "Good instructions get retyped and drift over time",
          "Teammates may use different quality bars for the same kind of task",
          "Beginners have to rediscover the workflow every time",
        ],
      },
      right: {
        label: "Skill-backed prompting",
        content:
          "The repeated workflow is packaged once, then each new prompt only adds the current task, scope, and proof step.",
        annotations: [
          "Durable process stays consistent across sessions",
          "Today's prompt can stay shorter and more specific",
          "Claude Code starts from a stronger workflow baseline",
        ],
      },
      insight:
        "A skill does not remove the need for a good task prompt. It removes the need to keep re-inventing the reusable part of the task, which is exactly what Section 3 keeps building on from here.",
    },
    {
      type: "classification",
      title: "Belongs in the skill or belongs in today's prompt?",
      instruction:
        "Sort each item based on whether it is durable workflow guidance or current-task-specific context.",
      categories: [
        { id: "skill", label: "Belongs in the skill", color: "teal" },
        { id: "prompt", label: "Belongs in today's prompt", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Always summarize findings before proposing a broad refactor",
          correctCategory: "skill",
        },
        {
          id: "i2",
          text: "This bug happens after a learner refreshes the lesson page on Safari",
          correctCategory: "prompt",
        },
        {
          id: "i3",
          text: "Check for an existing targeted test before adding a new one",
          correctCategory: "skill",
        },
        {
          id: "i4",
          text: "Start by reading the lesson progress state flow and related persistence logic",
          correctCategory: "prompt",
        },
        {
          id: "i5",
          text: "Output the triage result as likely cause, confidence, and next safest move",
          correctCategory: "skill",
        },
        {
          id: "i6",
          text: "Run the checkpoint persistence test after the fix and report the result",
          correctCategory: "prompt",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Outline a simple skill",
      description:
        "Use this builder to define the reusable part of a workflow before the next lesson turns that rough outline into a stronger `SKILL.md` structure.",
      fields: [
        {
          id: "name",
          label: "Skill name",
          placeholder: "e.g. bug-triage or repo-onboarding",
          hint: "Name the repeatable job, not one specific ticket.",
        },
        {
          id: "job",
          label: "Repeated job",
          placeholder: "e.g. safely triage incoming bug reports in the course app",
          hint: "Describe the durable task pattern this skill supports.",
        },
        {
          id: "workflow",
          label: "Core workflow",
          placeholder: "e.g. read the report, inspect likely files, check tests, summarize findings first",
          hint: "List the repeatable method Claude Code should inherit.",
        },
        {
          id: "done",
          label: "Good output looks like",
          placeholder: "e.g. likely cause, confidence, next safest move, and what to verify next",
          hint: "Define the quality bar or output shape.",
        },
      ],
      template:
        "Skill: {name}\n\nThis skill is for: {job}.\n\nDefault workflow:\n{workflow}.\n\nA strong result should include:\n{done}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "Which description best captures what a skill is?",
          options: [
            "A saved bug report that Claude Code can reopen later",
            "A reusable workflow package for a repeated kind of task",
            "A replacement for giving Claude Code the current task details",
            "A way to store every temporary note from a single session",
          ],
          correctIndex: 1,
          explanation:
            "That is the core idea. Skills package the durable method for handling a repeated class of work well.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "A skill packages the reusable method, while today's prompt supplies the current task, scope, and proof.",
      note:
        "That boundary is what keeps skills useful: durable workflow inside the skill, temporary case details inside the live session. Next, you turn that boundary into a concrete `SKILL.md` structure.",
    },
  ],
};

export default config;
