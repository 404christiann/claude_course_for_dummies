import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "fresh-and-condensed-context",
  title: "Fresh and Condensed Context",
  section: 2,
  duration: "5 min",
  objectives: [
    "Know when to keep working in the current session and when to start a fresh one",
    "Understand what a useful condensed handoff should preserve from a longer session",
    "Practice turning a sprawling thread into a short, reusable restart prompt",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Once you understand working memory, the next skill is knowing how to recover when a session gets messy.",
      subtext:
        "Fresh context gives Claude Code a clean slate. Condensed context carries forward only the facts, decisions, and next step that still matter.",
    },
    {
      type: "comparison",
      title: "Fresh context vs. condensed context",
      left: {
        label: "Fresh context",
        content:
          "Start a new session with a small, clean prompt when the old thread has too much drift, too many abandoned ideas, or the new task is meaningfully different.",
        annotations: [
          "Best for task switches or heavily cluttered sessions",
          "Removes stale assumptions from the active context",
          "Needs a clear restart prompt so Claude Code can re-gather intentionally",
        ],
      },
      right: {
        label: "Condensed context",
        content:
          "Summarize the important facts, decisions, files, and next action from a longer session when you still need continuity but not all the noise.",
        annotations: [
          "Best when the task is the same but the thread got long",
          "Preserves what was learned without dragging forward everything",
          "Works like a compact handoff into the next loop",
        ],
      },
      insight:
        "Fresh context is a reset. Condensed context is a selective carry-forward. The skill is asking one question first: is this still the same job?",
    },
    {
      type: "mini-simulation",
      title: "Choose reset or compression",
      description:
        "A lesson author has been working with Claude Code for a while. Decide whether the next move should be a fresh session or a condensed handoff.",
      steps: [
        {
          id: "same-task-long-thread",
          label: "Long thread",
          context:
            "The session is 40 messages long, but the task is still the same lesson rewrite. The team has already decided the hook, the example, and the files to edit.",
          prompt: "claude",
          terminal:
            "Current state:\n- Task is still the same lesson rewrite\n- Useful decisions already made\n- Recent messages include some repetition and dead ends\n\nClaude Code: I can continue here, but a short handoff would probably be cleaner.",
          question: "What is the best next move?",
          choices: [
            {
              id: "same-task-condense",
              label:
                "Create a short condensed handoff with the decisions, files, and next edit to make",
              rationale:
                "The task has continuity, so you want to preserve the good context without all the thread noise.",
            },
            {
              id: "same-task-random-reset",
              label:
                "Start a completely fresh session with no mention of the earlier decisions",
            },
            {
              id: "same-task-keep-everything",
              label:
                "Stay in the long session because more history always improves the next answer",
            },
          ],
          correctChoiceId: "same-task-condense",
          explanation:
            "When the task is the same but the thread is bloated, condensed context is the better move. You keep the valuable decisions and drop the clutter.",
          hint:
            "Preserve continuity without preserving every turn of the conversation.",
        },
        {
          id: "new-task-shift",
          label: "Task shift",
          context:
            "The original session was about rewriting a lesson, but now you want Claude Code to debug a build failure in another part of the app.",
          prompt: "claude",
          terminal:
            "Earlier session topics:\n- lesson structure\n- tone and pacing\n- interaction blocks\n\nNew goal:\n- debug a failing build in a different app area\n\nClaude Code: This sounds like a different problem space than the current thread.",
          question: "What should you do here?",
          choices: [
            {
              id: "new-task-fresh",
              label:
                "Start a fresh session focused on the build failure and point Claude Code to the failing area",
              rationale:
                "A new task deserves a clean active context instead of inheriting a lot of stale lesson-writing history.",
            },
            {
              id: "new-task-condense-irrelevant",
              label:
                "Condense the lesson-writing thread and include it anyway before asking about the build failure",
            },
            {
              id: "new-task-mix",
              label:
                "Keep everything in one thread so Claude Code can connect unrelated tasks",
            },
          ],
          correctChoiceId: "new-task-fresh",
          explanation:
            "Fresh context is the right move when the task truly changes. You want Claude Code to gather the right evidence for the new problem instead of carrying over stale assumptions.",
          hint:
            "Pick the option that gives the new problem its own clean working memory.",
        },
        {
          id: "good-handoff",
          label: "Handoff",
          context:
            "You do need a condensed handoff. The challenge is deciding what belongs in it.",
          prompt: "claude",
          terminal:
            "Goal: restart the same lesson migration in a cleaner session.\n\nPossible handoff ingredients:\n- exact files in scope\n- key design decisions already agreed on\n- known blocker or unresolved question\n- every dead-end idea discussed earlier",
          question: "What makes the best condensed context?",
          choices: [
            {
              id: "handoff-compact",
              label:
                "Keep only the task, owned files, confirmed decisions, current status, and next step",
              rationale:
                "A condensed handoff should be compact and actionable, not a replay of the whole session.",
            },
            {
              id: "handoff-everything",
              label:
                "Paste the full session transcript so nothing is lost",
            },
            {
              id: "handoff-vague",
              label:
                "Write a vague one-liner with no files, decisions, or next action",
            },
          ],
          correctChoiceId: "handoff-compact",
          explanation:
            "Good condensed context preserves the durable parts: what you are doing, where, what is already decided, what changed, and what should happen next.",
          hint:
            "Choose the option that feels like a clean baton pass, not an archive dump.",
        },
      ],
      completionMessage:
        "You used the right recovery move for each situation: condense when continuity matters, reset when the task changes or the thread is too stale.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Use fresh context when the old session is carrying too many assumptions, abandoned directions, or unrelated topics. It gives Claude Code a clean start and forces the new task to gather evidence intentionally.",
        "Use condensed context when the task is still the same but the thread has become noisy. It works like a short handoff note: what the task is, what was learned, what decisions are fixed, what files matter, and what should happen next.",
        "The mistake to avoid is carrying thread history forward by default. Long sessions are not automatically better sessions. Sometimes the smartest move is to restart with less.",
      ],
      engineerDepth: [
        "A strong condensed handoff usually includes scope, file paths, accepted constraints, current implementation status, known failure signals, and the immediate next verification step. That keeps the next loop concrete.",
        "For teams, condensed context also improves collaboration between agents or between people and agents. It separates durable facts from conversational churn, which makes handoffs much more reliable.",
      ],
    },
    {
      type: "classification",
      title: "Fresh start or condensed handoff?",
      instruction:
        "Sort each situation into the better context move.",
      categories: [
        { id: "fresh", label: "Fresh context", color: "teal" },
        { id: "condensed", label: "Condensed context", color: "violet" },
      ],
      items: [
        {
          id: "i1",
          text: "You are switching from lesson writing to debugging an auth issue in another app area",
          correctCategory: "fresh",
        },
        {
          id: "i2",
          text: "The task is unchanged, but the session is long and full of repeated discussion",
          correctCategory: "condensed",
        },
        {
          id: "i3",
          text: "You need to preserve file scope, decisions, and the next step for a clean restart",
          correctCategory: "condensed",
        },
        {
          id: "i4",
          text: "The current thread has drifted so far that its assumptions no longer match the new job",
          correctCategory: "fresh",
        },
        {
          id: "i5",
          text: "You want to continue the same fix tomorrow and only need the files, decisions, and next verification step",
          correctCategory: "condensed",
        },
        {
          id: "i6",
          text: "You are moving from a UI copy pass to a production outage in a separate service",
          correctCategory: "fresh",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Write a condensed restart prompt",
      description:
        "Use the fields below to turn a long session into a short, clean handoff for Claude Code.",
      fields: [
        {
          id: "task",
          label: "Current task",
          placeholder: "e.g. migrate the context lesson into the interactive lesson system",
          hint: "State the exact job that is still active.",
        },
        {
          id: "scope",
          label: "Files or area in scope",
          placeholder: "e.g. content/lessons/section-2/context-window-and-memory.lesson.ts only",
          hint: "Keep the workspace boundary explicit.",
        },
        {
          id: "decisions",
          label: "Decisions to preserve",
          placeholder: "e.g. interaction first, short explanation, no broad redesign",
          hint: "Keep only confirmed decisions, not every explored idea.",
        },
        {
          id: "nextStep",
          label: "Immediate next step",
          placeholder: "e.g. tighten the simulation copy, then verify the checkpoint and takeaway",
          hint: "End with one obvious next action.",
        },
      ],
      template:
        "Continue this task: {task}.\n\nScope: {scope}.\n\nKeep these decisions: {decisions}.\n\nNext step: {nextStep}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "When is condensed context better than a completely fresh session?",
          options: [
            "When the task has changed completely",
            "When you want to preserve a long transcript word for word",
            "When the task is still the same, but the session needs a shorter, cleaner handoff",
            "When Claude Code should figure out the scope without any guidance",
          ],
          correctIndex: 2,
          explanation:
            "Condensed context is for preserving the durable parts of the same task without dragging the entire old session forward.",
        },
        {
          question:
            "What belongs in a good condensed handoff?",
          options: [
            "Every explored idea and dead end from the original session",
            "The task, the scope, confirmed decisions, current status, and the next step",
            "Only the file names, with no explanation of what changed",
            "A vague note that says to keep going from where things stopped",
          ],
          correctIndex: 1,
          explanation:
            "A good handoff keeps durable facts and the immediate next move, not a replay of the entire conversation.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Use fresh context to reset stale threads, and use condensed context to carry forward only the facts and decisions that still matter.",
      note: "The next lesson builds on this by showing which memory layers should hold those durable facts over time.",
    },
  ],
};

export default config;
