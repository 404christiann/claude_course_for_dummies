import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "common-failure-points",
  title: "Common Failure Points at Scale",
  section: 7,
  duration: "8 min",
  objectives: [
    "Recognize the repeatable ways agent work breaks down once tasks span more files, people, and checks",
    "Separate surface-level mistakes from system-level causes like fuzzy ownership, weak verification, and poor handoffs",
    "Write a stronger request that reduces the most common scale failures before the work begins",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Small agent tasks fail loudly. Large agent workflows fail quietly unless you design against the usual breakpoints.",
      subtext:
        "At scale, the problem is rarely that the model cannot write code. The bigger problem is drift: unclear scope, shallow evidence, brittle validation, and handoffs that leave the next person guessing.",
    },
    {
      type: "diagram",
      title: "The four failure points that show up first",
      steps: [
        {
          id: "scope",
          label: "Scope",
          headline: "The task quietly expands",
          color: "teal",
          explanation:
            "A request that starts narrow becomes a rewrite because the boundaries were never made explicit. Agents often interpret nearby cleanup as permission unless the task says otherwise.",
          example:
            "Example: a lesson edit turns into changes across shared components, registry wiring, and adjacent content that no one assigned.",
        },
        {
          id: "evidence",
          label: "Evidence",
          headline: "The agent acts on a thin mental model",
          color: "blue",
          explanation:
            "Scale amplifies bad assumptions. If the repo map, owner files, or target pattern are unclear, the agent can sound confident while following the wrong path.",
          example:
            "Example: copying an outdated lesson pattern because the agent never checked which example the team currently treats as strongest.",
        },
        {
          id: "verify",
          label: "Verify",
          headline: "Done means 'looks right' instead of 'proved right'",
          color: "amber",
          explanation:
            "Weak verification is one of the fastest ways to ship agent drift. If there is no narrow check, success becomes a style judgment instead of evidence.",
          example:
            "Example: reporting completion on a new lesson config without running a file-level validation or confirming it matches the supported block schema.",
        },
        {
          id: "handoff",
          label: "Handoff",
          headline: "The next person inherits ambiguity",
          color: "violet",
          explanation:
            "Even solid work becomes fragile when the closeout omits what changed, what was not touched, and what still needs follow-up. Teams then re-open the same questions in the next session.",
          example:
            "Example: 'Finished the lesson' gives less value than 'edited only these files, validated this way, and registry wiring remains out of scope.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Stabilize a scaling agent task before it drifts",
      description:
        "A team is using agents across a shared course app. Choose the move that best prevents the most common scale failures at each stage.",
      steps: [
        {
          id: "sim-scope",
          label: "Scope",
          context:
            "The request says, 'Improve the Section 7 lessons and clean up anything nearby that looks inconsistent.'",
          prompt: "claude",
          terminal:
            "Claude Code: I can edit the four assigned lessons, but the phrase 'anything nearby' could expand this into a broad cleanup with unclear ownership.",
          question: "What is the best next move?",
          choices: [
            {
              id: "scope-tighten",
              label:
                "Restate the task with explicit owned files, out-of-scope areas, and any follow-up that should be reported instead of changed",
              rationale:
                "This removes hidden scope expansion before the work begins.",
            },
            {
              id: "scope-explore",
              label:
                "Start editing adjacent files too so the result feels more complete",
            },
            {
              id: "scope-ignore",
              label:
                "Assume everyone shares the same definition of nearby and proceed",
            },
          ],
          correctChoiceId: "scope-tighten",
          explanation:
            "At scale, the best first move is often shrinking ambiguity. Explicit ownership is one of the highest-leverage protections against drift and merge pain.",
          hint:
            "Pick the move that makes collaboration safer before touching code.",
        },
        {
          id: "sim-evidence",
          label: "Evidence",
          context:
            "The task is now scoped, but the repo has older lesson files and newer interactive lesson files mixed together.",
          prompt: "claude",
          terminal:
            "Claude Code: I should confirm which lesson pattern is current before I mirror the wrong structure.",
          question: "How should the agent gather evidence?",
          choices: [
            {
              id: "evidence-current",
              label:
                "Read the lesson schema and inspect the strongest current interactive examples before drafting anything",
              rationale:
                "This builds the right mental model from the current source of truth.",
            },
            {
              id: "evidence-familiar",
              label:
                "Use whichever old example looks easiest to copy since it will probably be close enough",
            },
            {
              id: "evidence-blind",
              label:
                "Write the lessons from memory because the general pattern is already known",
            },
          ],
          correctChoiceId: "evidence-current",
          explanation:
            "Scale punishes stale assumptions. Current evidence matters more than familiarity when a codebase contains multiple generations of patterns.",
          hint:
            "Choose the option that refreshes the agent against the active system, not an older remembered one.",
        },
        {
          id: "sim-verify",
          label: "Verify",
          context:
            "The new lesson files are drafted and read cleanly, but no one has checked whether the configs are actually valid.",
          prompt: "claude",
          terminal:
            "Claude Code: The content looks right, but I still need a narrow proof step before I report completion.",
          question: "Which closeout is strongest?",
          choices: [
            {
              id: "verify-targeted",
              label:
                "Run the most targeted validation available for the owned files, then report the result with any remaining limitations",
              rationale:
                "This turns 'looks good' into evidence without widening the task.",
            },
            {
              id: "verify-visual",
              label:
                "Skip validation because the files look similar to the existing lessons",
            },
            {
              id: "verify-broaden",
              label:
                "Run unrelated broad cleanup work so the update feels more substantial",
            },
          ],
          correctChoiceId: "verify-targeted",
          explanation:
            "A targeted proof step is the simplest way to reduce false confidence. The right validation is usually narrow, relevant, and easy to explain.",
          hint:
            "Look for evidence tied directly to the files you own.",
        },
        {
          id: "sim-handoff",
          label: "Handoff",
          context:
            "Another agent owns registry wiring and lesson ordering. Your work is limited to the content files.",
          prompt: "claude",
          terminal:
            "Claude Code: I finished my files. The last risk is leaving the team without a precise handoff.",
          question: "What should the final report include?",
          choices: [
            {
              id: "handoff-clear",
              label:
                "List the exact files changed, note the validation result, and call out the registry follow-up that remains outside scope",
              rationale:
                "This preserves momentum for the next person without pretending the workflow is complete end to end.",
            },
            {
              id: "handoff-brief",
              label:
                "Say the section is done and assume the next agent can figure out the rest",
            },
            {
              id: "handoff-expand",
              label:
                "Quietly modify the registry too so the report can sound more complete",
            },
          ],
          correctChoiceId: "handoff-clear",
          explanation:
            "At scale, handoff quality is part of the work. Clear closeouts keep teams from paying the same orientation cost again in the next session.",
          hint:
            "The best answer improves the whole workflow without crossing ownership lines.",
        },
      ],
      completionMessage:
        "You prevented the common scale failures in order: tighten scope, refresh the evidence, prove the result, and leave a handoff the next agent can trust.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Most agent failures at scale are not model failures first. They are workflow failures. The agent was given loose ownership, stale examples, weak validation, or a closeout that hid what still needed to happen.",
        "That is why agentic engineering feels different from one-off prompting. You are not only asking for output. You are designing the conditions that make the output dependable across repeated tasks and multiple collaborators.",
        "This matters for non-engineers too. You do not need to know the whole codebase to improve agent performance. Often the highest-value move is just naming the scope, the source of truth, and the proof step more clearly.",
      ],
      engineerDepth: [
        "On larger teams, these failure points often map to operational gaps: no stable entry docs, no narrow validation script, no fixture data for safe tests, and no closeout format that captures ownership plus follow-up.",
        "If the same failure keeps repeating, treat it as a system design problem. The answer is usually a better harness, audit, or workflow, not a longer one-time prompt.",
      ],
    },
    {
      type: "comparison",
      title: "Brittle agent task vs. scale-safe agent task",
      left: {
        label: "Brittle request",
        content:
          "Improve the Section 7 lessons, make them stronger, and fix anything else related while you are in there.",
        annotations: [
          "No owned files or out-of-scope boundary",
          "No source of truth for the current lesson pattern",
          "No proof step or handoff expectation",
        ],
      },
      right: {
        label: "Scale-safe request",
        content:
          "Rewrite only the four Section 7 lesson config files using the current LessonConfig block system and the Section 4 interaction-first pattern. Do not edit shared components, registry wiring, or course data. If feasible, run a targeted validation on the owned files and report any remaining follow-up outside scope.",
        annotations: [
          "Clear ownership and collaboration guardrail",
          "Clear pattern source and implementation target",
          "Clear validation plus handoff requirement",
        ],
      },
      insight:
        "The safer version does not add complexity. It removes ambiguity in the exact places large agent workflows usually break.",
    },
    {
      type: "classification",
      title: "Failure point or protection?",
      instruction:
        "Sort each item based on whether it increases agent drift at scale or helps prevent it.",
      categories: [
        { id: "failure", label: "Failure point", color: "amber" },
        { id: "protection", label: "Protection", color: "teal" },
      ],
      items: [
        {
          id: "i1",
          text: "A task that names the owned files explicitly",
          correctCategory: "protection",
        },
        {
          id: "i2",
          text: "Relying on whichever old example seems familiar",
          correctCategory: "failure",
        },
        {
          id: "i3",
          text: "A targeted validation step before reporting done",
          correctCategory: "protection",
        },
        {
          id: "i4",
          text: "A final summary that hides what remains out of scope",
          correctCategory: "failure",
        },
        {
          id: "i5",
          text: "A note explaining what changed and what the next agent still owns",
          correctCategory: "protection",
        },
        {
          id: "i6",
          text: "A prompt that quietly invites cleanup across unrelated files",
          correctCategory: "failure",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Build a scale-safe agent task",
      description:
        "Use these fields to turn a broad request into a task that resists the most common failure points.",
      fields: [
        {
          id: "goal",
          label: "Concrete job",
          placeholder:
            "e.g. rewrite the four Section 7 lesson configs into the interactive lesson system",
          hint: "Name the actual deliverable, not just the general direction.",
        },
        {
          id: "sources",
          label: "Source of truth",
          placeholder:
            "e.g. read the course spec, lesson types, and the strongest current Section 4 lessons first",
          hint: "Point the agent at the current pattern before it drafts.",
        },
        {
          id: "boundary",
          label: "Ownership boundary",
          placeholder:
            "e.g. only edit these four files; do not touch registry, course data, or shared components",
          hint: "State what the agent owns and what it should report instead of changing.",
        },
        {
          id: "proof",
          label: "Proof step",
          placeholder:
            "e.g. run a targeted validation if feasible and summarize any out-of-scope follow-up",
          hint: "Close the loop with evidence and handoff quality.",
        },
      ],
      template:
        "{goal}.\n\nBefore editing, {sources}.\n\nScope: {boundary}.\n\nBefore reporting success, {proof}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "Which issue is most likely to cause quiet drift in a shared agent workflow?",
          options: [
            "A short task with a clear owned-file boundary",
            "A request that sounds polished but never defines what is out of scope",
            "A targeted validation command tied to the files changed",
            "A closeout that lists follow-up for another agent",
          ],
          correctIndex: 1,
          explanation:
            "Hidden scope is a classic source of quiet drift because the agent has to invent the boundary on its own.",
        },
        {
          question:
            "What usually turns agent work from 'probably right' into something teams can trust?",
          options: [
            "A broader prompt with more adjectives",
            "A stronger model alone",
            "A relevant proof step and a precise handoff",
            "Letting the agent clean up whatever it notices",
          ],
          correctIndex: 2,
          explanation:
            "Trust comes from evidence and clarity, not just more output. A proof step plus handoff keeps the work inspectable and repeatable.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "At scale, agent failures usually start as workflow ambiguity before they show up as code mistakes.",
      note:
        "The next lesson turns that insight into a practical repo audit so you can spot where your codebase helps agents and where it quietly fights them.",
    },
  ],
};

export default config;
