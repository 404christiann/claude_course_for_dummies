import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "built-in-vs-custom-skills",
  title: "Built-in Skills vs Custom Skills",
  section: 3,
  duration: "6 min",
  objectives: [
    "Know when a built-in skill is already the right tool for the job",
    "Recognize when your team needs a custom skill because the workflow is repo-specific",
    "Finish Section 3 with a practical rule for choosing the right level of reuse",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Section 3 ends with the decision layer: after you can spot and design reusable workflows, which ones actually need custom skills?",
      subtext:
        "Built-in skills already cover many common workflows. Custom skills matter when your repo, team rules, or output format need a reusable method that the default system cannot infer well enough on its own.",
    },
    {
      type: "diagram",
      title: "How to choose between built-in and custom",
      steps: [
        {
          id: "start-default",
          label: "Start with default coverage",
          headline: "Check whether Claude already knows the job shape",
          color: "teal",
          explanation:
            "Many common workflows are already covered by built-in skills or strong default behavior: repo walkthroughs, browser verification, bug triage, PR review, and straightforward product tasks.",
          example:
            "If the task is 'review this PR for regressions' or 'open localhost and verify the page loads,' built-in workflows are often the right first move.",
        },
        {
          id: "spot-gap",
          label: "Spot the repo-specific gap",
          headline: "Look for the repeated part Claude will not learn automatically",
          color: "amber",
          explanation:
            "A custom skill is justified when your team keeps needing the same repo rules, same scripts, same templates, or same output shape for a workflow that generic behavior does not cover cleanly.",
          example:
            "Examples: your release-note format, your internal QA checklist, your repo-onboarding order, or a domain-specific compliance review sequence.",
        },
        {
          id: "package-selectively",
          label: "Package only the durable part",
          headline: "Create a custom skill when it clearly reduces drift",
          color: "violet",
          explanation:
            "Do not build a custom skill just because a task is important. Build it when the method is stable, repeated, and specific enough that preserving it will improve future sessions.",
          example:
            "A good custom skill might say exactly which files to inspect first, which helper script to run, what summary format to return, and what fallback to use if the script is missing.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Choose the right skill source",
      description:
        "A small team is deciding whether to rely on built-in skill coverage or create a custom skill. Pick the best move at each step so the workflow stays simple without becoming generic.",
      steps: [
        {
          id: "sim-browser-verify",
          label: "Covered already",
          context:
            "A teammate wants Claude Code to open the local app, check that the page loads, and report whether the key interaction is visible.",
          prompt: "claude",
          terminal:
            "Task:\n- open localhost\n- inspect the page\n- report whether the expected UI is present\n\nClaude Code: This is already a common workflow with existing browser-verification behavior.",
          question: "What is the best move?",
          choices: [
            {
              id: "use-built-in",
              label:
                "Use the built-in workflow first and avoid creating a custom skill unless repeated repo-specific gaps appear",
              rationale:
                "Start with the strongest default coverage before inventing new skill surface area.",
            },
            {
              id: "custom-too-soon",
              label:
                "Create a custom skill immediately because any repeated task should always become a custom skill",
            },
            {
              id: "skip-skill",
              label:
                "Avoid skill use completely and force every browser step to be re-explained manually",
            },
          ],
          correctChoiceId: "use-built-in",
          explanation:
            "Built-in skills are the right default when the workflow is already common, well-supported, and not tightly bound to repo-specific rules.",
          hint:
            "Choose the option that avoids unnecessary custom infrastructure when the default path is already strong.",
        },
        {
          id: "sim-release-format",
          label: "Repo-specific gap",
          context:
            "Every lesson migration in this repo needs the same internal release-summary format: learner-facing changes, exact file changed, QA status, and follow-up outside scope.",
          prompt: "claude",
          terminal:
            "Repeated team request:\n- summarize the migrated lesson\n- use our internal release format\n- include follow-up outside owned files\n\nClaude Code: I can do this, but the exact structure and review standard are specific to this team.",
          question: "What does that suggest?",
          choices: [
            {
              id: "custom-release",
              label:
                "This is a good custom-skill candidate because the format, boundaries, and proof standard repeat in a repo-specific way",
              rationale:
                "Custom skills shine when the workflow is stable but specific to how this team works.",
            },
            {
              id: "built-in-only",
              label:
                "Keep relying on generic behavior because built-in coverage should handle every writing task equally well",
            },
            {
              id: "memory-everything",
              label:
                "Put the full workflow into memory layers only and avoid ever turning it into a skill",
            },
          ],
          correctChoiceId: "custom-release",
          explanation:
            "The repeated structure is the clue. Once the output shape and review checklist become durable and repo-specific, a custom skill can preserve that method cleanly.",
          hint:
            "Look for the option that packages a repeated team-specific method, not just repeated subject matter.",
        },
        {
          id: "sim-overbuild",
          label: "Stay selective",
          context:
            "Now someone proposes a single giant skill called `team-everything` that should cover onboarding, QA, release notes, repo analysis, and bug triage.",
          prompt: "claude",
          terminal:
            "Proposed custom skill:\n- team-everything\n- use for all product work\n- includes many unrelated workflows\n\nClaude Code: This would give me one broad instruction set, but the trigger and default path would become fuzzy.",
          question: "What is the best response?",
          choices: [
            {
              id: "split-narrow",
              label:
                "Keep custom skills narrow and split them by repeated workflow instead of creating one catch-all skill",
              rationale:
                "Selective, high-signal skills compose better than one giant ambiguous skill.",
            },
            {
              id: "giant-skill",
              label:
                "Approve the giant skill because broader always means more reusable",
            },
            {
              id: "never-custom",
              label:
                "Avoid custom skills entirely because one bad proposal means they are not useful",
            },
          ],
          correctChoiceId: "split-narrow",
          explanation:
            "The goal is not 'more custom skills' or 'fewer custom skills.' The goal is the right custom skill at the right level of scope.",
          hint:
            "Pick the option that protects clarity, activation conditions, and dependable defaults.",
        },
      ],
      completionMessage:
        "You just used the real decision rule: start with built-in coverage, create custom skills only for repeated repo-specific workflow gaps, and keep them narrow. That closes the Section 3 arc from spotting repeated work to packaging only the reusable part that truly earns a custom workflow.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Built-in skills are your default because they already encode common workflows and reduce the amount of custom infrastructure you have to maintain. That is usually the fastest path to a solid result.",
        "Custom skills become worth it when a repeated workflow depends on repo-specific instructions, internal templates, team rules, or a fixed output format that Claude should inherit every time.",
        "The mistake on one side is overbuilding custom skills too early. The mistake on the other side is refusing to package anything, even when the team keeps repeating the same repo-specific method by hand. The healthiest habit is to move through the same sequence you practiced in this section: spot the repeat, define the workflow, and only then decide whether the default system already covers it well enough.",
      ],
      engineerDepth: [
        "A practical heuristic: if two different engineers would still need to restate the same repo-specific workflow details every time, a custom skill may reduce drift. If the workflow is already generic and well-supported, start with built-in coverage.",
        "Treat custom skills like maintainable product surface area. They should have a clear trigger, a stable default workflow, and a visible payoff. If you cannot name those pieces, you probably do not need a new skill yet.",
      ],
    },
    {
      type: "comparison",
      title: "Overbuilding custom skills vs. choosing the right layer",
      left: {
        label: "Custom skill too early",
        content:
          "Make a new skill for any task that feels important, even if the workflow is already common and built-in coverage is good enough.",
        annotations: [
          "Creates maintenance overhead without clear payoff",
          "Makes the skill system noisier and harder to trust",
          "Confuses 'important task' with 'repo-specific repeated workflow'",
        ],
      },
      right: {
        label: "Built-in first, custom when justified",
        content:
          "Start with built-in coverage for common workflows. Add a custom skill only when a repeated repo-specific method keeps needing the same instructions, assets, and quality bar.",
        annotations: [
          "Keeps the system simple by default",
          "Packages only the durable workflow gap",
          "Makes each custom skill easier to activate and maintain",
        ],
      },
      insight:
        "The right question is not 'Can we make a custom skill?' It is 'What repeated repo-specific workflow would actually become more reliable if we did?' That is the final filter for everything Section 3 has taught.",
    },
    {
      type: "classification",
      title: "Built-in first or custom skill candidate?",
      instruction:
        "Sort each scenario based on whether built-in coverage is probably enough or a custom skill is more justified.",
      categories: [
        { id: "built-in", label: "Built-in first", color: "teal" },
        { id: "custom", label: "Custom skill candidate", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Open localhost, inspect the UI, and report whether the target interaction appears",
          correctCategory: "built-in",
        },
        {
          id: "i2",
          text: "Prepare your team's exact lesson-release summary format after every migration",
          correctCategory: "custom",
        },
        {
          id: "i3",
          text: "Give a read-only walkthrough of a repo for initial orientation",
          correctCategory: "built-in",
        },
        {
          id: "i4",
          text: "Run a repo-specific QA checklist that always uses the same internal script and fallback notes",
          correctCategory: "custom",
        },
        {
          id: "i5",
          text: "Review a straightforward PR for bugs and regressions",
          correctCategory: "built-in",
        },
        {
          id: "i6",
          text: "Follow your team's fixed compliance-review sequence with exact output fields and approval pauses",
          correctCategory: "custom",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Test whether a custom skill is justified",
      description:
        "Use this builder to turn a repeated workflow into a short decision memo before you create a custom skill, so the section ends on a practical decision rule instead of theory.",
      fields: [
        {
          id: "workflow",
          label: "Repeated workflow",
          placeholder: "e.g. prepare the team lesson-release summary after each migration",
          hint: "Name the task pattern, not one temporary case.",
        },
        {
          id: "builtIn",
          label: "What built-in coverage already handles",
          placeholder: "e.g. reading files and summarizing changes are already common defaults",
          hint: "Start from the default system, not from scratch.",
        },
        {
          id: "gap",
          label: "Repo-specific gap",
          placeholder: "e.g. our exact summary format, follow-up checklist, and out-of-scope rules repeat every time",
          hint: "Name the stable part Claude will not infer reliably on its own.",
        },
        {
          id: "payoff",
          label: "Why a custom skill would help",
          placeholder: "e.g. it would preserve the same structure and proof standard across every release summary",
          hint: "Say what drift or re-briefing it removes.",
        },
      ],
      template:
        "Repeated workflow: [workflow].\n\nBuilt-in coverage already helps with: [builtIn].\n\nRepo-specific gap: [gap].\n\nA custom skill is justified if it improves this repeated workflow by: [payoff].",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "When is a custom skill usually more justified than relying only on built-in skills?",
          options: [
            "Whenever the task feels important",
            "Whenever Claude Code uses any tools at all",
            "When a repeated workflow depends on repo-specific instructions, assets, or output standards",
            "Whenever a built-in skill already handles the task well",
          ],
          correctIndex: 2,
          explanation:
            "Custom skills are most useful when they package a repeated repo-specific method that generic behavior does not preserve reliably enough on its own.",
        },
        {
          question:
            "What is the healthiest default before creating a custom skill?",
          options: [
            "Assume every repeated task should get its own custom skill immediately",
            "Start with built-in coverage and create a custom skill only when a clear repeated gap remains",
            "Avoid all skills until the repo is completely documented",
            "Create one giant custom skill for every team workflow",
          ],
          correctIndex: 1,
          explanation:
            "Built-in skills are the default because they already cover many common workflows. Custom skills should earn their existence by closing a repeated, specific gap.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Built-in skills are the default. Custom skills are for repeated repo-specific workflow gaps that deserve a reusable method.",
      note:
        "The best custom skill is narrow, dependable, and clearly worth maintaining. That is the full Section 3 progression: identify repeated work, define the skill structure, shape the reusable workflow, then choose the right layer of reuse.",
    },
  ],
};

export default config;
