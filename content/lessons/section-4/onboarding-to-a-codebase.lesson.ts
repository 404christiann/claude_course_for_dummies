import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "onboarding-to-a-codebase",
  title: "Onboarding to a New Codebase",
  section: 4,
  duration: "8 min",
  objectives: [
    "Recognize the first moves that help Claude Code understand an unfamiliar repo without guessing",
    "Set safe boundaries for a first session so onboarding stays focused instead of sprawling",
    "Write a repo-onboarding prompt that names where to look, what to avoid, and how to confirm understanding",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Section 4 starts with one job: build the right map before Claude Code touches an unfamiliar repo.",
      subtext:
        "A strong first session is not about reading everything. It is about locating the entry points, tracing the feature path, setting boundaries, and confirming understanding before any broader action begins.",
    },
    {
      type: "diagram",
      title: "Step 1: the four-part onboarding pass",
      steps: [
        {
          id: "orient",
          label: "Orient",
          headline: "Find the repo map",
          color: "teal",
          explanation:
            "Start with the files that explain how the app is shaped: the root directories, package scripts, routing structure, and any local docs. Claude Code should look for the map before diving into implementation details.",
          example:
            "Example: read the repo root, `package.json`, `README`, and the top-level app folders before opening five random components.",
        },
        {
          id: "trace",
          label: "Trace",
          headline: "Follow the task path",
          color: "blue",
          explanation:
            "After the repo map is clear, trace only the flow related to the task. That usually means following the user-facing surface to the logic, data, and tests that support it.",
          example:
            "Example: start at the lesson page, then trace into the lesson renderer, block components, and progress state instead of reading the whole product.",
        },
        {
          id: "boundaries",
          label: "Boundaries",
          headline: "State what is in and out",
          color: "amber",
          explanation:
            "First-session quality comes from constraints. Claude Code should know which files it owns, which areas are out of scope, and whether the task is read-only, implementation, or review.",
          example:
            "Example: 'Only update the Section 4 lesson config. Do not touch the registry or shared components.'",
        },
        {
          id: "confirm",
          label: "Confirm",
          headline: "Prove the mental model",
          color: "violet",
          explanation:
            "Before claiming progress, Claude Code should show that it understands the repo slice: what it found, how the feature flows, and what check will confirm the work is valid.",
          example:
            "Example: summarize the lesson flow, note the block types in use, and run a targeted validation that catches schema or syntax mistakes.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Guide Claude Code through a first repo pass",
      description:
        "You are starting a real Section 4-style repo task in a Next.js learning product. Choose the best move at each stage so Claude Code builds a useful mental model before it edits anything.",
      steps: [
        {
          id: "sim-orient",
          label: "Orient",
          context:
            "The team asks for a lesson migration in an unfamiliar course app. Claude Code has not seen the repo before.",
          prompt: "claude",
          terminal:
            "You: Migrate the Section 4 lesson into the current interactive lesson system.\n\nClaude Code: Before I write content, I should inspect the product docs, lesson schema, and a few existing migrated lessons so I understand the structure I am joining.",
          question: "What should Claude Code do first?",
          choices: [
            {
              id: "orient-strong",
              label:
                "Read the product docs, lesson types, and a couple of existing lesson configs that already match the new system",
              rationale:
                "This builds the repo map and reveals the target pattern before any implementation starts.",
            },
            {
              id: "orient-random",
              label:
                "Open whichever component files look interesting and hope the structure becomes clear along the way",
            },
            {
              id: "orient-write",
              label:
                "Start drafting the new lesson immediately since the details can be inferred later",
            },
          ],
          correctChoiceId: "orient-strong",
          explanation:
            "Strong onboarding starts with repo orientation. Claude Code needs the product direction, schema, and active examples before it can safely match the existing system.",
          hint:
            "Pick the move that reduces ambiguity earliest instead of relying on intuition.",
        },
        {
          id: "sim-trace",
          label: "Trace",
          context:
            "Claude Code now understands that lessons are plain TypeScript configs built from a small set of supported blocks.",
          prompt: "claude",
          terminal:
            "Claude Code found:\n- lesson config files in `content/lessons`\n- supported block shapes in `lib/lesson-types.ts`\n- Section 1 to 3 examples that follow the current interaction-first pattern\n\nClaude Code: Next I should trace how this specific lesson should behave rather than reading the entire app.",
          question: "What is the best next move?",
          choices: [
            {
              id: "trace-targeted",
              label:
                "Follow the task path through the nearest examples: inspect the strongest current lesson patterns and mirror their block order, pacing, and tone",
              rationale:
                "This traces the relevant feature slice without expanding the scope to the full product.",
            },
            {
              id: "trace-everything",
              label:
                "Audit every lesson, component, and route in the app before deciding how one lesson should be written",
            },
            {
              id: "trace-backend",
              label:
                "Ignore the lesson examples and focus on unrelated backend files since the app may need them later",
            },
          ],
          correctChoiceId: "trace-targeted",
          explanation:
            "Tracing means following the task path, not the whole codebase. The strongest move is to study the closest working examples and adapt the new lesson to that pattern.",
          hint:
            "Choose the option that stays close to the feature you are actually changing.",
        },
        {
          id: "sim-boundaries",
          label: "Boundaries",
          context:
            "Claude Code is ready to implement the new lesson, but several adjacent files could also be updated if it were not careful.",
          prompt: "claude",
          terminal:
            "Claude Code: I can add the new lesson config now. I also notice the registry does not yet include Section 4 files, but the assignment says I only own one lesson file.",
          question: "How should Claude Code proceed?",
          choices: [
            {
              id: "boundaries-safe",
              label:
                "Implement the owned lesson file only, leave registry wiring untouched, and note any follow-up outside scope after the edit",
              rationale:
                "This respects collaboration boundaries while still surfacing what another agent may need to do next.",
            },
            {
              id: "boundaries-expand",
              label:
                "Update the registry and any nearby lesson files too so the migration feels more complete",
            },
            {
              id: "boundaries-rewrite",
              label:
                "Refactor the shared lesson schema to better fit the new content before adding the lesson",
            },
          ],
          correctChoiceId: "boundaries-safe",
          explanation:
            "Safe onboarding includes obeying ownership boundaries. Claude Code should solve the assigned file cleanly and clearly call out any out-of-scope wiring instead of editing it.",
          hint:
            "The best answer improves the owned task without creating avoidable merge risk.",
        },
        {
          id: "sim-confirm",
          label: "Confirm",
          context:
            "The lesson config is written. Now Claude Code needs to prove the result matches the current system instead of assuming the file is valid.",
          prompt: "claude",
          terminal:
            "New lesson file drafted with hook, diagram, mini-simulation, explanation, comparison, classification, prompt-builder, checkpoint, and takeaway blocks.\n\nClaude Code: Before I report success, I should run a targeted check that catches schema or syntax mistakes and confirm any remaining follow-up outside my file.",
          question: "What is the strongest closeout?",
          choices: [
            {
              id: "confirm-validate",
              label:
                "Run a targeted validation if feasible, then summarize what changed, what could not be wired from this file alone, and the exact file touched",
              rationale:
                "This confirms both technical validity and collaboration handoff quality.",
            },
            {
              id: "confirm-describe",
              label:
                "Skip validation and only describe the lesson content in a polished summary",
            },
            {
              id: "confirm-ship",
              label:
                "Mark the work complete because the config looks similar to the other lessons",
            },
          ],
          correctChoiceId: "confirm-validate",
          explanation:
            "Onboarding is not complete until Claude Code proves the mental model held up in the actual file. Validation plus a clear handoff closes the loop.",
          hint:
            "Look for the option that produces evidence, not just confidence.",
        },
      ],
      completionMessage:
        "You just practiced the right first-session rhythm: orient to the repo, trace the relevant path, respect boundaries, then prove your understanding with a targeted check.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Onboarding to a new codebase is mostly a search problem. The job is not to read everything. The job is to find the smallest set of files that explains how this part of the product works.",
        "This is the first move in the Section 4 arc. Before Claude Code can plan well or leave a useful handoff, it needs a focused mental map of the repo slice that matters right now.",
        "Beginners often assume they need total understanding before starting. Engineers often make the opposite mistake and move too fast. The better middle path is a focused onboarding pass: identify the map, trace the feature, define the boundary, and then move.",
        "A strong onboarding prompt does not just say what to build. It tells Claude Code where to look first, what not to touch, and how to confirm it understood the assignment correctly.",
      ],
      engineerDepth: [
        "In a real repo, good onboarding usually starts with structural files such as `package.json`, top-level route or app folders, shared config, and one or two nearby examples that already implement the target pattern.",
        "If validation is available, keep it narrow on the first pass. A lesson migration might justify a targeted typecheck, content check, or file-level syntax check before you escalate to broader app validation.",
      ],
    },
    {
      type: "comparison",
      title: "Vague repo-entry prompt vs. scoped onboarding prompt",
      left: {
        label: "Weak first-session prompt",
        content:
          "Update the lesson to match the new system and improve anything else that looks outdated.",
        annotations: [
          "No entry points for Claude Code to read first",
          "No boundary around which files are safe to change",
          "No validation or handoff requirement before reporting done",
        ],
      },
      right: {
        label: "Strong onboarding prompt",
        content:
          "Create the Section 4 lesson config for `Onboarding to a New Codebase`. Start by reading the product docs, `lib/lesson-types.ts`, and a few migrated lesson configs. Only edit the owned lesson file. If feasible, run a targeted validation afterward and report any registry follow-up outside scope.",
        annotations: [
          "Clear entry points for onboarding",
          "Clear file boundary and collaboration guardrail",
          "Clear expectation for validation and follow-up",
        ],
      },
      insight:
        "The strong version teaches Claude Code how to join the repo safely. It gives a map, a boundary, and a definition of done before any edits begin.",
    },
    {
      type: "classification",
      title: "Helpful onboarding move or premature move?",
      instruction:
        "Sort each action based on whether it strengthens first-session onboarding or jumps ahead too early.",
      categories: [
        { id: "helpful", label: "Helpful onboarding", color: "teal" },
        { id: "premature", label: "Premature move", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Inspect the lesson schema before drafting a new lesson config",
          correctCategory: "helpful",
        },
        {
          id: "i2",
          text: "Modify adjacent files that were not assigned because they might need cleanup too",
          correctCategory: "premature",
        },
        {
          id: "i3",
          text: "Study one or two nearby migrated lessons that already match the target system",
          correctCategory: "helpful",
        },
        {
          id: "i4",
          text: "Read the entire app before acting on a tightly scoped lesson task",
          correctCategory: "premature",
        },
        {
          id: "i5",
          text: "State the exact owned file before editing it",
          correctCategory: "helpful",
        },
        {
          id: "i6",
          text: "Assume the mental model is correct without running any targeted check",
          correctCategory: "premature",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Build a safe onboarding prompt",
      description:
        "Use these fields to create the first prompt in the Section 4 sequence: one that helps Claude Code enter a new repo without wandering or overreaching.",
      fields: [
        {
          id: "goal",
          label: "What needs to change",
          placeholder:
            "e.g. migrate the onboarding lesson into the interactive lesson system",
          hint: "State the concrete job Claude Code should accomplish.",
        },
        {
          id: "entry",
          label: "Where to look first",
          placeholder:
            "e.g. read the product docs, lesson types, and 2 migrated lesson configs",
          hint: "Name the files that create the quickest useful mental model.",
        },
        {
          id: "boundary",
          label: "Scope and constraints",
          placeholder:
            "e.g. only edit the owned lesson file; do not touch registry wiring",
          hint: "Make ownership, safety, and out-of-scope areas explicit.",
        },
        {
          id: "verify",
          label: "How to confirm understanding",
          placeholder:
            "e.g. run a targeted validation if feasible and summarize any follow-up outside scope",
          hint: "Close with an observable check or handoff expectation.",
        },
      ],
      template:
        "{goal}.\n\nStart by reading {entry}.\n\nConstraints: {boundary}.\n\nBefore reporting success, {verify}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What is usually the best first goal when onboarding Claude Code into a new codebase?",
          options: [
            "Read every file so nothing is missed",
            "Find the smallest set of files that explains the relevant feature path",
            "Start coding quickly and let errors reveal the structure later",
            "Refactor the surrounding architecture while the repo is fresh",
          ],
          correctIndex: 1,
          explanation:
            "Strong onboarding is about building a focused mental model, not exhaustive reading. You want the shortest path to understanding the feature you actually need to change.",
        },
        {
          question:
            "Which detail most helps Claude Code avoid overreaching in a first session?",
          options: [
            "A broad invitation to improve anything related",
            "A note that the repo is large and complex",
            "An explicit file boundary and out-of-scope statement",
            "A request for polished writing in the final summary",
          ],
          correctIndex: 2,
          explanation:
            "Clear boundaries are what keep first-session work safe and collaborative. They prevent Claude Code from turning onboarding into uncontrolled expansion.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "Onboarding to a new codebase means building the right map first, not reading everything.",
      note:
        "Give Claude Code entry points, boundaries, and a validation target. Once the map is clear, the next move is deciding whether the task needs Plan Mode before edits begin.",
    },
  ],
};

export default config;
