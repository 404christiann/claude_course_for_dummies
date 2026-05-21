import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "memory-layers",
  title: "Memory Layers",
  section: 2,
  duration: "6 min",
  objectives: [
    "Understand the difference between session context and durable memory layers",
    "Know which facts belong in `CLAUDE.md`, a second-brain note, or auto memory",
    "Practice storing project knowledge in the layer that makes future sessions easier",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Not every useful fact should stay trapped inside one chat thread.",
      subtext:
        "Strong Claude Code workflows separate temporary session context from durable memory. The goal is simple: put the right knowledge in the right layer so future work starts faster and with fewer repeated explanations.",
    },
    {
      type: "diagram",
      title: "Three durable memory layers",
      steps: [
        {
          id: "claude-md",
          label: "CLAUDE.md",
          headline: "Project rules Claude should see early",
          color: "teal",
          explanation:
            "`CLAUDE.md` is for durable instructions that should shape how Claude Code works in this project again and again. Think workflow rules, repo conventions, important boundaries, and preferred validation habits.",
          example:
            "Examples: 'Use `rg` for search', 'Do not touch generated files', 'Run the targeted test before claiming a fix is done', or 'Ask before changing production configs.'",
        },
        {
          id: "second-brain",
          label: "Second brain",
          headline: "External notes humans can revisit",
          color: "amber",
          explanation:
            "A second-brain note is for richer project knowledge that is still worth preserving, but does not need to be injected into every Claude Code session automatically.",
          example:
            "Examples: architecture notes, stakeholder decisions, onboarding summaries, bug investigations, or a clean handoff note for tomorrow's work.",
        },
        {
          id: "auto-memory",
          label: "Auto memory",
          headline: "Lightweight remembered preferences",
          color: "violet",
          explanation:
            "Auto memory is best for recurring preferences or personal working style. It helps future sessions start from your norms without requiring a giant project document every time.",
          example:
            "Examples: 'Prefer short final answers', 'Explain code at a high level first', or 'State the exact files before editing on UI-heavy tasks.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Store the fact in the right layer",
      description:
        "A team is using Claude Code across multiple sessions. Choose the best home for each piece of information so it stays useful without cluttering every thread.",
      steps: [
        {
          id: "sim-project-rule",
          label: "Project rule",
          context:
            "A repo has one hard rule: never edit files inside `generated/`; always update the source config and regenerate instead.",
          prompt: "claude",
          terminal:
            "Team note:\n- `generated/` files are committed output\n- direct edits get overwritten later\n- this rule should affect future code changes\n\nClaude Code: This sounds like a durable project instruction, not just a one-off chat detail.",
          question: "Where should this fact live first?",
          choices: [
            {
              id: "rule-claude-md",
              label: "Put it in `CLAUDE.md` as a project working rule",
              rationale:
                "This rule should shape future edits automatically, so it belongs in the project-level instruction layer.",
            },
            {
              id: "rule-second-brain",
              label: "Put it only in a long architecture note",
            },
            {
              id: "rule-auto-memory",
              label: "Save it only as auto memory about the user's style",
            },
          ],
          correctChoiceId: "rule-claude-md",
          explanation:
            "This is exactly what `CLAUDE.md` is for: durable repo-specific guidance that should influence future sessions before Claude starts editing.",
          hint:
            "Pick the layer that should reliably affect future work inside this project.",
        },
        {
          id: "sim-investigation",
          label: "Investigation note",
          context:
            "After debugging a flaky test, the team now understands three contributing factors, the files involved, and the safest next experiment for tomorrow.",
          prompt: "claude",
          terminal:
            "Debug summary:\n- failure appears only when cache warming is skipped\n- `tests/cache.spec.ts` and `lib/cache/bootstrap.ts` were involved\n- tomorrow's next step is to isolate startup ordering\n\nClaude Code: This seems worth preserving, but not all of it needs to become a standing project rule.",
          question: "What is the best home for this?",
          choices: [
            {
              id: "invest-second-brain",
              label:
                "Write a second-brain handoff note with the findings, files, and next step",
              rationale:
                "This keeps the investigation durable and reusable without bloating every future session automatically.",
            },
            {
              id: "invest-claude-md",
              label:
                "Promote the whole debugging transcript into `CLAUDE.md`",
            },
            {
              id: "invest-auto-memory",
              label:
                "Store the findings only as auto memory about how the user likes tests explained",
            },
          ],
          correctChoiceId: "invest-second-brain",
          explanation:
            "A clean external note is the right move when the information is useful and reusable, but too specific or temporary to become a universal project rule.",
          hint:
            "Choose the layer that preserves useful detail without forcing it into every future task.",
        },
        {
          id: "sim-preference",
          label: "Working preference",
          context:
            "A user repeatedly asks for the exact files being edited before any code changes and prefers concise final summaries afterward.",
          prompt: "claude",
          terminal:
            "Repeated workflow preference:\n- announce exact files before editing\n- keep final writeups concise\n\nClaude Code: This pattern is stable across tasks, but it is more about how the user likes to collaborate than about the repo itself.",
          question: "Where does this belong best?",
          choices: [
            {
              id: "pref-auto-memory",
              label: "Save it as auto memory about collaboration preferences",
              rationale:
                "This preference should carry across future sessions, even outside one specific task, without becoming a repo rule.",
            },
            {
              id: "pref-claude-md",
              label:
                "Write it only into this repo's `CLAUDE.md` even if it is really a user-wide preference",
            },
            {
              id: "pref-second-brain",
              label:
                "Hide it inside a project note that Claude may not see again for a while",
            },
          ],
          correctChoiceId: "pref-auto-memory",
          explanation:
            "Collaboration habits and user preferences fit auto memory best. They are durable, but they are about how to work with the person, not how this repo itself works.",
          hint:
            "Pick the layer for recurring user preferences rather than project-specific implementation rules.",
        },
      ],
      completionMessage:
        "You just separated project rules, reusable project notes, and recurring preferences. That separation is what makes memory helpful instead of noisy.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Memory layers matter because one session should not have to rediscover the same durable facts over and over. If a rule, preference, or project decision keeps coming up, it probably deserves a home outside the chat thread.",
        "The trick is not to save everything. `CLAUDE.md` should stay high-signal and instruction-like. A second-brain note can hold richer context and handoff detail. Auto memory should stay focused on repeated preferences and collaboration patterns.",
        "When teams get this right, future sessions start faster, prompts become shorter, and Claude Code spends less time relearning boundaries that were already known.",
      ],
      engineerDepth: [
        "A useful test is: should this information shape most future actions in this repo? If yes, it may belong in `CLAUDE.md`. If it is valuable context but not a standing rule, it usually belongs in a project note or handoff doc instead.",
        "The main failure mode is overloading the memory system. A bloated `CLAUDE.md` becomes background noise, and dumping every investigation into memory makes future sessions less precise rather than more capable.",
      ],
    },
    {
      type: "comparison",
      title: "Bad memory placement vs. strong memory placement",
      left: {
        label: "Everything saved everywhere",
        content:
          "The team copies whole transcripts into `CLAUDE.md`, mixes temporary debugging notes with permanent rules, and stores personal preferences inside project instructions.",
        annotations: [
          "Project rules become harder to notice",
          "Temporary notes get treated like permanent truth",
          "Future sessions inherit clutter instead of clarity",
        ],
      },
      right: {
        label: "Each fact has a clear home",
        content:
          "Standing repo instructions live in `CLAUDE.md`, richer investigations live in second-brain notes, and recurring user preferences live in auto memory.",
        annotations: [
          "Project rules stay visible and actionable",
          "Longer notes remain available without flooding every task",
          "Claude Code gets cleaner guidance at the right level",
        ],
      },
      insight:
        "Memory becomes powerful when it is selective. The goal is durable leverage, not durable clutter.",
    },
    {
      type: "classification",
      title: "Which layer should hold it?",
      instruction:
        "Sort each item into the best durable memory layer.",
      categories: [
        { id: "claude-md", label: "`CLAUDE.md`", color: "teal" },
        { id: "second-brain", label: "Second brain", color: "amber" },
        { id: "auto-memory", label: "Auto memory", color: "violet" },
      ],
      items: [
        {
          id: "i1",
          text: "Never edit `dist/` directly; update the source package and rebuild",
          correctCategory: "claude-md",
        },
        {
          id: "i2",
          text: "A handoff note summarizing what was learned during a search-ranking bug investigation",
          correctCategory: "second-brain",
        },
        {
          id: "i3",
          text: "The user prefers short final answers and wants exact files named before edits",
          correctCategory: "auto-memory",
        },
        {
          id: "i4",
          text: "A repo convention to run targeted tests before broader test suites",
          correctCategory: "claude-md",
        },
        {
          id: "i5",
          text: "An onboarding note explaining the billing architecture and key service boundaries",
          correctCategory: "second-brain",
        },
        {
          id: "i6",
          text: "A repeated preference for read-only analysis before implementation on UI tasks",
          correctCategory: "auto-memory",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Capture a durable memory note",
      description:
        "Use this template to turn a repeated fact into a clean memory artifact instead of leaving it buried in a thread.",
      fields: [
        {
          id: "fact",
          label: "Fact to preserve",
          placeholder: "e.g. never edit generated files directly",
          hint: "Write the durable thing you do not want to re-explain later.",
        },
        {
          id: "layer",
          label: "Best memory layer",
          placeholder: "e.g. `CLAUDE.md`",
          hint: "Choose the layer that matches the type of fact.",
        },
        {
          id: "reason",
          label: "Why it belongs there",
          placeholder: "e.g. it should shape future repo edits automatically",
          hint: "Explain the placement, not just the fact itself.",
        },
      ],
      template:
        "Preserve this durable fact: {fact}.\n\nBest layer: {layer}.\n\nWhy: {reason}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "Which statement best describes a good use of `CLAUDE.md`?",
          options: [
            "Store every debugging transcript so no detail is lost",
            "Keep repo-specific rules and durable working instructions Claude should see again",
            "Use it mainly for personal communication preferences across unrelated projects",
            "Avoid it entirely because memory always creates clutter",
          ],
          correctIndex: 1,
          explanation:
            "`CLAUDE.md` works best as a high-signal layer for durable repo guidance, not as an archive of everything that happened.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Good memory systems do not save everything. They save the right fact in the right layer.",
      note: "Next, you will turn that idea into daily habits that keep Claude Code sessions clean and dependable.",
    },
  ],
};

export default config;
