import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "context-management-habits",
  title: "Context Management Habits",
  section: 2,
  duration: "6 min",
  objectives: [
    "Build a repeatable set of habits for starting, steering, and closing Claude Code sessions",
    "Recognize behaviors that quietly pollute context even when the task sounds reasonable",
    "Practice writing a simple session brief that keeps one task, one scope, and one proof step in view",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Good sessions are usually the result of good habits, not better improvisation.",
      subtext:
        "Most context problems do not come from one dramatic mistake. They come from small habits like mixing tasks, skipping summaries, and letting side quests pile up. Clean habits keep Claude Code sharp.",
    },
    {
      type: "diagram",
      title: "A healthy session rhythm",
      steps: [
        {
          id: "start-narrow",
          label: "Start narrow",
          headline: "Define one job and one search surface",
          color: "teal",
          explanation:
            "Open the session with the exact behavior you care about, the smallest useful file area, and the proof step. This gives Claude Code a crisp first move instead of a vague search problem.",
          example:
            "Instead of 'clean up auth', say 'Fix the logout redirect loop in `app/auth/logout` and run the related auth test after the change.'",
        },
        {
          id: "protect-focus",
          label: "Protect focus",
          headline: "Do not let adjacent work sneak into the same loop",
          color: "amber",
          explanation:
            "When new ideas show up mid-session, decide whether they help the current task. If they do not, park them. Focus is usually lost gradually, not all at once.",
          example:
            "A bug fix thread suddenly becomes a redesign, a refactor, and an analytics cleanup. The healthy habit is to park those ideas and finish the current loop first.",
        },
        {
          id: "close-cleanly",
          label: "Close cleanly",
          headline: "Verify, summarize, and preserve the durable parts",
          color: "violet",
          explanation:
            "A clean ending proves the change, states what happened, and captures any durable rule or note that future work should inherit.",
          example:
            "Run the relevant check, note the file changed, and save any recurring repo rule or handoff detail to the right memory layer.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Coach a session back into shape",
      description:
        "A learner is using Claude Code on a real product task. Choose the habit that keeps the session reliable as new pressure and distractions appear.",
      steps: [
        {
          id: "habit-start",
          label: "Start",
          context:
            "The real task is to fix a lesson progress bug where completion is not saved after a learner finishes a checkpoint.",
          prompt: "claude",
          terminal:
            "You: Fix the progress bug.\n\nClaude Code: I can help, but I should understand which lesson state path and persistence flow are involved.",
          question: "What is the best opening habit here?",
          choices: [
            {
              id: "start-brief",
              label:
                "Name the exact bug, point to the lesson progress flow, and ask for a relevant verification step",
              rationale:
                "This creates a clean session brief: one task, one scope, one proof step.",
            },
            {
              id: "start-broad",
              label:
                "Ask Claude Code to read the whole learning app and suggest any improvements it notices",
            },
            {
              id: "start-mixed",
              label:
                "Combine the bug fix with ideas for onboarding polish and dashboard redesign in the same message",
            },
          ],
          correctChoiceId: "start-brief",
          explanation:
            "Strong habits begin by reducing ambiguity before the session grows. That means one job, the likely files, and how success will be proven.",
          hint:
            "Choose the option that makes Claude Code's first read obvious instead of expansive.",
        },
        {
          id: "habit-drift",
          label: "Drift",
          context:
            "During the bug fix, the learner remembers a separate copy issue, a future analytics event cleanup, and a possible dashboard redesign.",
          prompt: "claude",
          terminal:
            "Claude Code: I found the likely save-state issue.\n\nNew requests arrive in the same thread:\n- improve empty-state copy\n- rename some analytics events\n- rethink dashboard lesson cards\n\nClaude Code: I can explore those, but they are separate from this persistence bug.",
          question: "What is the healthiest habit now?",
          choices: [
            {
              id: "drift-park",
              label:
                "Park the side quests, keep the current thread on the progress bug, and finish verification first",
              rationale:
                "Parking adjacent work protects focus and lowers the chance of a scattered implementation.",
            },
            {
              id: "drift-stack",
              label:
                "Keep adding each idea into the same session so everything gets handled at once",
            },
            {
              id: "drift-abandon",
              label:
                "Abandon the bug fix immediately and switch the whole session to the redesign idea",
            },
          ],
          correctChoiceId: "drift-park",
          explanation:
            "Context management is often about restraint. A parked idea is not lost work. It is protected work that will get a cleaner session later.",
          hint:
            "Pick the habit that keeps the current loop alive instead of opening three new loops.",
        },
        {
          id: "habit-close",
          label: "Close",
          context:
            "The fix is in place and the relevant checkpoint persistence test passes. You want the session to end in a way that helps future work too.",
          prompt: "claude",
          terminal:
            "Claude Code: I patched the completion save flow and the relevant check is now passing.\n\nClaude Code: The same thread also surfaced one durable lesson: lesson progress bugs tend to involve the checkpoint completion state and local persistence sync.",
          question: "What closing habit is best?",
          choices: [
            {
              id: "close-summarize",
              label:
                "Summarize the fix, note the verified result, and preserve any durable rule or handoff detail separately",
              rationale:
                "This closes the loop cleanly and turns useful leftovers into durable context instead of leaving them buried.",
            },
            {
              id: "close-dump",
              label:
                "Paste the entire thread into project instructions so no detail is lost",
            },
            {
              id: "close-skip",
              label:
                "End the session without any summary because the passing test is enough",
            },
          ],
          correctChoiceId: "close-summarize",
          explanation:
            "A healthy close proves the result and captures durable context selectively. That makes the next session easier without dragging forward all the noise.",
          hint:
            "Look for the option that combines verification, clarity, and selective preservation.",
        },
      ],
      completionMessage:
        "You protected the session at all three points that matter most: opening, drift, and closeout. That is what context-management habits look like in real work.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Context management is rarely one fancy trick. It is a handful of repeatable habits: start with one clear job, keep the active scope small, park side quests, verify before broadening, and save durable facts outside the thread.",
        "These habits help beginners because they reduce overwhelm and make the next action obvious. They help engineers because they reduce flailing, scope creep, and half-finished sessions that never cleanly prove anything.",
        "The biggest mindset shift is this: not every good idea belongs in the current session. Good habits decide what the current loop is, protect it, and close it before opening another one.",
      ],
      engineerDepth: [
        "In practice, good habits often sound like operational guardrails: one task per thread, one verification target per change, explicit file scope, and a parking lot for adjacent work. Those habits scale especially well when multiple agents or teammates are involved.",
        "The final habit is preservation discipline. Only promote durable facts into memory layers. If a note is temporary, keep it local to the task. If it is durable, store it intentionally instead of assuming you will remember it later.",
      ],
    },
    {
      type: "comparison",
      title: "Reactive session vs. disciplined session",
      left: {
        label: "Reactive habits",
        content:
          "The session starts vaguely, expands whenever a new thought appears, and ends as soon as the code looks plausible.",
        annotations: [
          "Claude Code spends time guessing where to look",
          "Unrelated work pollutes the active context",
          "Useful decisions often disappear into the transcript",
        ],
      },
      right: {
        label: "Disciplined habits",
        content:
          "The session begins with a narrow brief, parks unrelated ideas, verifies the current change, and stores only durable context for later.",
        annotations: [
          "The first file reads are easier to predict",
          "Focus stays aligned with the current loop",
          "Future sessions inherit only high-signal context",
        ],
      },
      insight:
        "Great context management looks calm from the outside because the habits are doing the work before chaos can accumulate.",
    },
    {
      type: "classification",
      title: "Helpful habit or context-damaging habit?",
      instruction:
        "Sort each behavior based on whether it improves session quality.",
      categories: [
        { id: "helpful", label: "Helpful habit", color: "teal" },
        { id: "damaging", label: "Damaging habit", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "State one clear task, the likely files, and the proof step before Claude starts",
          correctCategory: "helpful",
        },
        {
          id: "i2",
          text: "Keep adding adjacent fixes because they seem related enough",
          correctCategory: "damaging",
        },
        {
          id: "i3",
          text: "Park redesign ideas while finishing the current bug-fix loop",
          correctCategory: "helpful",
        },
        {
          id: "i4",
          text: "Skip a summary because the transcript will always be there later",
          correctCategory: "damaging",
        },
        {
          id: "i5",
          text: "Capture durable rules or handoff notes outside the thread after verification",
          correctCategory: "helpful",
        },
        {
          id: "i6",
          text: "Treat every interesting thought as something the current session should solve",
          correctCategory: "damaging",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Write a clean session brief",
      description:
        "Use this small template whenever you want Claude Code to start with better habits built in.",
      fields: [
        {
          id: "task",
          label: "Current task",
          placeholder: "e.g. fix the lesson progress save bug after checkpoint completion",
          hint: "Keep it to one job, not a bundle of jobs.",
        },
        {
          id: "scope",
          label: "Start with these files or area",
          placeholder: "e.g. the lesson progress state flow and related persistence check",
          hint: "Give the smallest useful first search surface.",
        },
        {
          id: "verify",
          label: "How to prove it worked",
          placeholder: "e.g. run the relevant progress test and report the result",
          hint: "Close the loop up front instead of hoping it happens later.",
        },
        {
          id: "park",
          label: "What to park for later",
          placeholder: "e.g. copy polish and dashboard redesign ideas",
          hint: "Name the side quests so they do not silently invade the session.",
        },
      ],
      template:
        "{task}.\n\nStart by reading {scope}.\n\nAfter the change, {verify}.\n\nIf unrelated issues come up, park these for later: {park}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "Which habit best protects Claude Code from context sprawl during a task?",
          options: [
            "Add every related idea to the current thread while it is already open",
            "Park adjacent work and finish the current verified loop first",
            "Avoid summaries because memory layers can always be added later",
            "Let Claude Code decide the task boundary without any help",
          ],
          correctIndex: 1,
          explanation:
            "Parking adjacent work is one of the strongest context habits because it preserves focus without losing the idea.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Context stays healthy when your habits do: one task, tight scope, verified close, durable notes saved intentionally.",
      note: "Section 2 is really about this operational discipline: choose what enters the session, what gets parked, and what deserves to survive beyond the thread.",
    },
  ],
};

export default config;
