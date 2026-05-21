import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "auditing-for-ai-readiness",
  title: "Auditing for AI Readiness",
  section: 7,
  duration: "8 min",
  objectives: [
    "Identify the repo traits that make agent work easier to start, safer to execute, and easier to verify",
    "Distinguish high-leverage readiness gaps from lower-priority cleanup",
    "Build a simple audit prompt that reveals whether a codebase is ready for dependable agent help",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Before you ask agents to move faster, check whether the codebase is easy to understand, easy to test, and easy to constrain.",
      subtext:
        "AI readiness is not about adding 'AI' to the repo. It is about whether a newcomer can find the map, follow the task path, validate the change, and stop at the right boundary without heroics.",
    },
    {
      type: "diagram",
      title: "The four-part AI-readiness audit",
      steps: [
        {
          id: "map",
          label: "Map",
          headline: "Can an agent orient quickly?",
          color: "teal",
          explanation:
            "A ready codebase has obvious entry points: repo docs, naming that matches the product, and a clear place to start reading for the feature at hand.",
          example:
            "Example: a short root guide plus lesson content folders that make it obvious where interactive lessons live.",
        },
        {
          id: "surface",
          label: "Surface",
          headline: "Are boundaries easy to state?",
          color: "blue",
          explanation:
            "Agents work better when the repo exposes clean seams. It should be easy to say which files own content, which files own shared UI, and which files are risky or out of scope.",
          example:
            "Example: content configs live separately from shared renderers, so a lesson task can stay in content files only.",
        },
        {
          id: "proof",
          label: "Proof",
          headline: "Is there a cheap way to verify work?",
          color: "amber",
          explanation:
            "Readiness rises when validation is discoverable and targeted. An agent should not need a full-day build just to prove one small content or workflow change.",
          example:
            "Example: a quick typecheck, lint target, or file-level content validation script for lesson configs.",
        },
        {
          id: "friction",
          label: "Friction",
          headline: "What forces avoidable guessing?",
          color: "violet",
          explanation:
            "The audit should also reveal what slows agents down: hidden scripts, missing fixtures, unclear local setup, or logic that can only be tested by manually clicking around.",
          example:
            "Example: if validation requires remembering a custom command no docs mention, that is a readiness gap even if the command exists.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Audit a repo before assigning more agent work",
      description:
        "You are deciding whether a product is ready for broader agent use. Choose the strongest audit move at each step.",
      steps: [
        {
          id: "sim-map",
          label: "Map",
          context:
            "A teammate says the repo is 'probably fine for agents' because humans already know where everything is.",
          prompt: "claude",
          terminal:
            "Claude Code: Human familiarity is not the same as AI readiness. I should check whether a new session could orient quickly from the repo itself.",
          question: "What should the audit inspect first?",
          choices: [
            {
              id: "map-entry",
              label:
                "Look for the fastest path to orientation: docs, folder naming, scripts, and one or two obvious source-of-truth files",
              rationale:
                "This tests whether the repo can teach itself to a fresh agent session.",
            },
            {
              id: "map-history",
              label:
                "Assume prior team knowledge is enough and skip repo orientation entirely",
            },
            {
              id: "map-refactor",
              label:
                "Begin restructuring the repo immediately before confirming the actual gaps",
            },
          ],
          correctChoiceId: "map-entry",
          explanation:
            "A readiness audit starts with orientation because every later task depends on that first mental model. If the repo cannot introduce itself, agent reliability falls fast.",
          hint:
            "Pick the move that tests the repo from the perspective of a new session, not an expert teammate.",
        },
        {
          id: "sim-surface",
          label: "Surface",
          context:
            "You find content files, renderers, and shared utilities mixed together in ways that make ownership hard to describe.",
          prompt: "claude",
          terminal:
            "Claude Code: This repo may still work for humans, but agents will struggle if task boundaries are hard to name cleanly.",
          question: "What is the most useful audit conclusion?",
          choices: [
            {
              id: "surface-boundaries",
              label:
                "Flag unclear ownership seams as an AI-readiness issue because they make scoping and safe delegation harder",
              rationale:
                "Good agent work depends on being able to separate what should change from what should not.",
            },
            {
              id: "surface-ignore",
              label:
                "Treat the mixing as harmless since the app still runs today",
            },
            {
              id: "surface-blanket",
              label:
                "Declare the whole repo unworkable for agents with no nuance or prioritization",
            },
          ],
          correctChoiceId: "surface-boundaries",
          explanation:
            "AI readiness is about delegation quality as much as code quality. Unclear seams create hidden scope and make safe assignment harder.",
          hint:
            "Choose the option that ties the repo shape directly to agent usability.",
        },
        {
          id: "sim-proof",
          label: "Proof",
          context:
            "The team says there is validation, but no one can name a quick command for just the lesson files or just the content layer.",
          prompt: "claude",
          terminal:
            "Claude Code: If proof exists only as tribal knowledge or as a slow all-or-nothing process, the repo is less ready than the team thinks.",
          question: "How should the audit rate this?",
          choices: [
            {
              id: "proof-gap",
              label:
                "Mark it as a readiness gap and recommend a discoverable, narrow proof path for common agent tasks",
              rationale:
                "Cheap verification is one of the best multipliers for dependable agent work.",
            },
            {
              id: "proof-pass",
              label:
                "Count it as fully ready because some kind of validation exists somewhere",
            },
            {
              id: "proof-skip",
              label:
                "Ignore verification and focus only on whether the content looks understandable",
            },
          ],
          correctChoiceId: "proof-gap",
          explanation:
            "A repo is not truly ready if the proof path is hidden, fragile, or too expensive for normal iteration. Discoverable validation is part of the product for agents.",
          hint:
            "Look for the option that reduces the cost of proving small changes.",
        },
        {
          id: "sim-friction",
          label: "Friction",
          context:
            "You now have several findings, but the team needs a short action list rather than a vague declaration that the repo is 'not AI ready yet.'",
          prompt: "claude",
          terminal:
            "Claude Code: The audit should end with the highest-leverage fixes, not just criticism.",
          question: "What makes the audit most useful?",
          choices: [
            {
              id: "friction-priority",
              label:
                "Prioritize the top blockers to orientation, scoping, and proof so the team knows what to fix first",
              rationale:
                "A useful audit turns findings into an actionable readiness roadmap.",
            },
            {
              id: "friction-everything",
              label:
                "List every rough edge with equal weight and leave prioritization for later",
            },
            {
              id: "friction-binary",
              label:
                "Give only a pass or fail score without explaining the causes",
            },
          ],
          correctChoiceId: "friction-priority",
          explanation:
            "Readiness audits should create momentum. Prioritized fixes help teams move from insight to practical improvement instead of sitting with a long undifferentiated backlog.",
          hint:
            "Pick the answer that helps the next step happen immediately.",
        },
      ],
      completionMessage:
        "You ran the audit like an operator: test the map, inspect the seams, check the proof path, then prioritize the friction that most limits safe agent work.",
    },
    {
      type: "explanation",
      paragraphs: [
        "AI readiness is really onboarding readiness plus validation readiness. If a repo is easy for a newcomer to understand and easy to verify in small pieces, it is usually much easier for agents too.",
        "The audit is not meant to shame a codebase. It is meant to reveal where the team is accidentally relying on memory, oral tradition, or expensive trial and error. Those are manageable problems once they are visible.",
        "This is helpful for both non-engineers and engineers. A non-engineer can still ask, 'Where should the agent start reading?' and 'How would it prove this worked?' Those two questions uncover a surprising amount of readiness truth.",
      ],
      engineerDepth: [
        "Common readiness wins include better root docs, stable file ownership boundaries, predictable script names, fixture data for common flows, and narrow checks that can run locally before a broader pipeline.",
        "A readiness audit should usually stop short of redesigning the whole system. The goal is to identify the few repo improvements that will most improve agent reliability per unit of effort.",
      ],
    },
    {
      type: "comparison",
      title: "Generic codebase review vs. AI-readiness audit",
      left: {
        label: "Generic review",
        content:
          "The repo is a little messy in places, but overall it seems workable and we can probably use agents more.",
        annotations: [
          "No test of how a fresh session would orient",
          "No focus on scoping seams or verification cost",
          "No prioritized readiness fixes",
        ],
      },
      right: {
        label: "AI-readiness audit",
        content:
          "A fresh agent can find lesson content quickly, but ownership boundaries between content and shared UI are still inconsistent, and there is no obvious narrow validation command for lesson-only changes. Priority fixes: document the content entry path, clarify ownership seams, and add a discoverable proof step for content edits.",
        annotations: [
          "Evaluates onboarding from a new-session perspective",
          "Connects repo shape to delegation quality",
          "Ends with a short prioritized improvement list",
        ],
      },
      insight:
        "A readiness audit is stronger because it measures whether agents can work safely and efficiently, not just whether the codebase feels decent to people who already know it.",
    },
    {
      type: "classification",
      title: "Readiness strength or readiness gap?",
      instruction:
        "Sort each condition based on whether it helps agents work dependably or forces more guessing.",
      categories: [
        { id: "strength", label: "Readiness strength", color: "teal" },
        { id: "gap", label: "Readiness gap", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "A clear file path for where lesson content lives",
          correctCategory: "strength",
        },
        {
          id: "i2",
          text: "Validation exists but only one teammate remembers how to run it",
          correctCategory: "gap",
        },
        {
          id: "i3",
          text: "Shared UI and content ownership are easy to separate in prompts",
          correctCategory: "strength",
        },
        {
          id: "i4",
          text: "A small lesson change requires a huge all-app proof process every time",
          correctCategory: "gap",
        },
        {
          id: "i5",
          text: "Root docs point new contributors to the fastest orientation files",
          correctCategory: "strength",
        },
        {
          id: "i6",
          text: "Teams describe readiness with vibes instead of concrete findings",
          correctCategory: "gap",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Build an AI-readiness audit prompt",
      description:
        "Use these fields to ask an agent for a practical readiness review instead of a vague opinion.",
      fields: [
        {
          id: "surface",
          label: "Repo slice",
          placeholder:
            "e.g. audit the course-app lesson content system for AI readiness",
          hint: "Keep the audit scoped to a real surface or workflow.",
        },
        {
          id: "entry",
          label: "Where to start reading",
          placeholder:
            "e.g. root docs, lesson type definitions, lesson content folders, and validation scripts",
          hint: "Point the audit toward the files that reveal orientation and proof paths.",
        },
        {
          id: "criteria",
          label: "Readiness criteria",
          placeholder:
            "e.g. evaluate orientation speed, ownership seams, validation discoverability, and friction points",
          hint: "Name the lenses you want the audit to use.",
        },
        {
          id: "output",
          label: "Desired output",
          placeholder:
            "e.g. summarize strengths, gaps, and top 3 fixes that would improve agent reliability",
          hint: "Ask for prioritized action, not just observations.",
        },
      ],
      template:
        "{surface}.\n\nStart with {entry}.\n\nAudit for: {criteria}.\n\nReturn: {output}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "Which sign most strongly suggests a codebase is not yet AI ready?",
          options: [
            "The repo has a lot of files",
            "A fresh session cannot easily find where to start or how to verify a small change",
            "Some modules use different naming styles",
            "The team still writes docs for humans",
          ],
          correctIndex: 1,
          explanation:
            "File count alone is not the core issue. The real problem is when orientation and proof depend on insider knowledge instead of the repo teaching the workflow clearly.",
        },
        {
          question:
            "What usually makes an audit actionable instead of merely descriptive?",
          options: [
            "A single score with no explanation",
            "A long list of all possible problems",
            "A prioritized set of fixes tied to orientation, scope, or verification",
            "A promise that agents will improve once models get better",
          ],
          correctIndex: 2,
          explanation:
            "Actionable audits connect the findings to the next improvements. Prioritization is what turns a review into a roadmap.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "A codebase is AI ready when a fresh agent can orient fast, stay in bounds, and prove small changes without guesswork.",
      note:
        "The next lesson shows how teams close the biggest readiness gaps by building lightweight harnesses instead of relying on perfect prompting alone.",
    },
  ],
};

export default config;
