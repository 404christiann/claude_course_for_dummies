import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "using-plan-mode-before-acting",
  title: "Using Plan Mode Before Acting",
  section: 4,
  duration: "8 min",
  objectives: [
    "Explain when Plan Mode is the safest first move before Claude Code edits anything",
    "Recognize the difference between a useful implementation plan and a vague summary",
    "Write a Plan Mode prompt that sets scope, asks for a short plan, and preserves collaboration boundaries",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Once Claude Code has the repo map, Plan Mode decides whether the next move should be a pause before the first edit.",
      subtext:
        "Use it when the task has real scope, tradeoffs, or coordination risk. The goal is not to delay forever. The goal is to turn the onboarding map into a safe, agreed path before action starts.",
    },
    {
      type: "diagram",
      title: "Step 2: turn the repo map into a safe plan",
      steps: [
        {
          id: "orient",
          label: "Orient",
          headline: "Inspect the real terrain first",
          color: "teal",
          explanation:
            "Claude Code reads the relevant files, finds the moving parts, and surfaces how the feature or workflow is currently shaped before proposing changes.",
          example:
            "Example: before migrating a lesson, it reads the lesson spec, neighboring lesson configs, and the lesson block types to see what patterns already exist.",
        },
        {
          id: "boundaries",
          label: "Boundaries",
          headline: "Name what is in and out of scope",
          color: "blue",
          explanation:
            "A strong plan makes the file boundary, ownership constraints, and likely follow-up explicit so the session stays collaborative instead of opportunistic.",
          example:
            "Example: 'I will only edit the owned lesson file. Registry wiring and cross-file validation will be reported as follow-up instead of changed here.'",
        },
        {
          id: "sequence",
          label: "Sequence",
          headline: "Propose the smallest sensible path",
          color: "amber",
          explanation:
            "Plan Mode should turn a fuzzy request into a short ordered path: what to inspect, what to build, and how to validate without overcommitting.",
          example:
            "Example: 'First mirror the best existing lesson pattern, then write the new config, then sanity-check it against the supported block types.'",
        },
        {
          id: "alignment",
          label: "Align",
          headline: "Get agreement before edits start",
          color: "violet",
          explanation:
            "The plan gives the human a chance to catch wrong assumptions, approve tradeoffs, or redirect priorities before code changes begin.",
          example:
            "Example: 'The owned file path does not exist yet, so I will create it in place and leave registry updates to the owning agent unless you want me to expand scope.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Use Plan Mode on a real lesson migration",
      description:
        "You already onboarded the repo slice. Now you are guiding Claude Code on a scoped content migration with ownership constraints. Choose the best move at each stage so the session stays safe, intentional, and useful.",
      steps: [
        {
          id: "sim-when-to-plan",
          label: "When",
          context:
            "A teammate asks for a new Section 4 lesson with strong interaction quality, but says you are not alone in the repo and you only own one file.",
          prompt: "claude",
          terminal:
            "Task: migrate the Section 4 lesson 'Using Plan Mode Before Acting'.\nConstraints: use current block types only, stay within the owned file, do not overwrite another agent's work.\n\nClaude Code: Before I edit anything, I should inspect the docs, the lesson system, and the actual file boundary.",
          question: "Why is Plan Mode the right first move here?",
          choices: [
            {
              id: "when-scope",
              label:
                "Because the task has product constraints, pattern-matching work, and ownership boundaries that should be understood before any edits",
              rationale:
                "This is exactly where planning helps: there is enough complexity that jumping straight into edits could create drift or step on someone else's work.",
            },
            {
              id: "when-skip",
              label:
                "Because Plan Mode should be used for every Claude Code task, even trivial one-file typo fixes",
            },
            {
              id: "when-speed",
              label:
                "Because planning lets Claude Code postpone action until the user gets tired and lowers the quality bar",
            },
          ],
          correctChoiceId: "when-scope",
          explanation:
            "Plan Mode is most helpful when the task has meaningful scope, multiple constraints, or collaboration risk. It is not mandatory for every tiny edit, but it is valuable here.",
          hint:
            "Choose the answer that treats planning as a risk-reduction tool, not as a ritual for every task.",
        },
        {
          id: "sim-good-plan",
          label: "Plan",
          context:
            "Claude Code has read the spec docs and inspected the lesson patterns. Now it needs to report a short plan before editing.",
          prompt: "claude",
          terminal:
            "Findings:\n- Section 4 lessons are not present yet\n- Existing lessons use reusable block configs in TypeScript\n- The strongest pattern is an early interactive block, brief explanation, a practical exercise, checkpoint, and takeaway\n\nClaude Code: I can now propose the implementation path before making changes.",
          question: "Which plan is strongest?",
          choices: [
            {
              id: "plan-strong",
              label:
                "Create the owned lesson file, mirror the strongest existing lesson structure, keep to supported block types, and report registry wiring as out-of-scope follow-up",
              rationale:
                "This plan reflects the actual findings, respects boundaries, and gives the user a clear path with no hidden scope expansion.",
            },
            {
              id: "plan-vague",
              label:
                "Improve the lesson experience however seems best and then see what else in the course could be cleaned up",
            },
            {
              id: "plan-overreach",
              label:
                "Rewrite the Section 4 system, register the lesson, and rebalance the neighboring pages so everything feels more cohesive",
            },
          ],
          correctChoiceId: "plan-strong",
          explanation:
            "A useful plan is short, evidence-based, and boundary-aware. It should tell the human what will happen next and what will not happen yet.",
          hint:
            "Pick the option that is concrete enough to approve and narrow enough to execute safely.",
        },
        {
          id: "sim-after-plan",
          label: "After",
          context:
            "The lesson file has been written. You still need to close the loop without stepping beyond ownership.",
          prompt: "claude",
          terminal:
            "Work completed in the owned lesson file.\n\nClaude Code: I should verify what I can from within scope, then summarize the change and name any follow-up that requires another file.",
          question: "What is the best close-out move?",
          choices: [
            {
              id: "after-verify",
              label:
                "Sanity-check the lesson against the current `LessonConfig` types, summarize the interaction design, and flag registry wiring as a separate follow-up",
              rationale:
                "This closes the loop on the owned work while staying honest about what still needs another file or another agent.",
            },
            {
              id: "after-hide",
              label:
                "Say the lesson is fully done without mentioning that it still needs to be registered elsewhere",
            },
            {
              id: "after-cross",
              label:
                "Quietly update the registry too, since it is probably small and nobody will mind",
            },
          ],
          correctChoiceId: "after-verify",
          explanation:
            "Plan Mode should lead to a clean handoff: verify what changed, report what remains, and avoid silently expanding scope after agreement.",
          hint:
            "The best answer keeps trust high by separating finished work from follow-up work.",
        },
      ],
      completionMessage:
        "You just used Plan Mode the way it is meant to work: inspect first, make boundaries visible, propose a short path, then act with fewer surprises.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Plan Mode is not a fancy extra step. It is a control surface for tasks where the cost of a wrong first move is higher than the cost of a short pause. If the request has multiple constraints, unclear file boundaries, or collaboration risk, planning first usually saves time overall.",
        "In the Section 4 flow, this lesson comes right after onboarding. First Claude Code builds the map. Then it decides whether that map is enough to act directly or whether the task needs a short planning checkpoint first.",
        "The strongest plans are short and operational. They say what Claude Code will inspect, what it intends to change, how it will validate within scope, and what follow-up may still exist outside scope. That gives both beginners and engineers one obvious next step without turning the lesson into a wall of prose.",
        "The weakest plans sound polished but do not reduce uncertainty. If the plan does not mention concrete files, boundaries, or a validation path, it is probably still too vague to protect the session from drift.",
      ],
      engineerDepth: [
        "In practice, Plan Mode is especially useful before repo onboarding, multi-file refactors, UI migrations, release work, and any task with ownership constraints. It gives you a chance to catch missing dependencies, dirty-worktree risk, or out-of-scope registry wiring before edits start.",
        "For small, local, reversible changes, planning can be lightweight. The point is not ceremony. The point is matching the amount of upfront thinking to the amount of downside if Claude Code guesses wrong.",
      ],
    },
    {
      type: "comparison",
      title: "Thin plan vs. action-ready plan",
      left: {
        label: "Thin plan",
        content:
          "I'll review the lesson system, make the updates, and let you know when I'm done.",
        annotations: [
          "No file boundary or ownership guardrail",
          "No explanation of what will be inspected",
          "No indication of what validation is possible",
        ],
      },
      right: {
        label: "Actionable plan",
        content:
          "I'll read the spec docs and surrounding lesson configs, create the owned Section 4 lesson file using current block types only, keep registry changes out of scope, then sanity-check the config against the lesson type definitions before I summarize follow-up.",
        annotations: [
          "Names the inputs and the exact owned file",
          "Shows what will be changed and what will stay untouched",
          "Includes a clear validation and handoff path",
        ],
      },
      insight:
        "The second plan builds trust because it turns onboarding context into an action-ready path before edits begin.",
    },
    {
      type: "classification",
      title: "Good reason to use Plan Mode or not necessary yet?",
      instruction:
        "Sort each situation based on whether it clearly benefits from Plan Mode first.",
      categories: [
        { id: "plan", label: "Use Plan Mode", color: "teal" },
        { id: "direct", label: "Direct action is fine", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "A multi-file feature update with unclear ownership across several agents",
          correctCategory: "plan",
        },
        {
          id: "i2",
          text: "A one-line typo fix in the file you already own and understand",
          correctCategory: "direct",
        },
        {
          id: "i3",
          text: "A lesson migration where the referenced file path may not exist yet",
          correctCategory: "plan",
        },
        {
          id: "i4",
          text: "Changing one button label after the user already named the exact file and text",
          correctCategory: "direct",
        },
        {
          id: "i5",
          text: "A refactor request that needs tradeoff discussion before code changes begin",
          correctCategory: "plan",
        },
        {
          id: "i6",
          text: "Reordering two lines in a small function after reviewing the local context",
          correctCategory: "direct",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Turn onboarding into a Plan Mode prompt",
      description:
        "Use these fields to ask Claude Code for orientation and a short implementation path before any edits happen.",
      fields: [
        {
          id: "goal",
          label: "What needs to happen",
          placeholder:
            "e.g. create the Section 4 lesson config for Using Plan Mode Before Acting",
          hint: "State the outcome you want, not just the topic.",
        },
        {
          id: "scope",
          label: "Scope and boundaries",
          placeholder:
            "e.g. stay strictly within content/lessons/section-4/plan-mode.lesson.ts and do not touch registry files",
          hint: "Name the owned files and collaboration constraints up front.",
        },
        {
          id: "inspection",
          label: "What to inspect first",
          placeholder:
            "e.g. read the lesson spec docs, lesson type definitions, and nearby lesson configs before editing",
          hint: "Tell Claude Code what context should shape the plan.",
        },
        {
          id: "validation",
          label: "What the plan should include",
          placeholder:
            "e.g. give me a short plan, then validate the lesson config against current block types and summarize any out-of-scope follow-up",
          hint: "Ask for the validation and handoff path, not just the build step.",
        },
      ],
      template:
        "{goal}.\n\nBefore editing, {inspection}.\n\nScope: {scope}.\n\nUse Plan Mode first: give me a short implementation plan, then after the change {validation}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What makes Plan Mode especially valuable before acting?",
          options: [
            "It gives Claude Code permission to avoid making decisions",
            "It helps surface scope, constraints, and validation before edits begin",
            "It replaces the need for concrete file inspection",
            "It is mainly for making responses sound more professional",
          ],
          correctIndex: 1,
          explanation:
            "Plan Mode adds value when it reduces risk and ambiguity. The point is to make the next action clearer and safer, not to avoid action entirely.",
        },
        {
          question:
            "Which plan is strongest for a collaborative codebase?",
          options: [
            "One that quietly handles any extra files it discovers",
            "One that stays vague so it can adapt later",
            "One that names the owned file, the inspection path, and any out-of-scope follow-up",
            "One that focuses mostly on tone and polish",
          ],
          correctIndex: 2,
          explanation:
            "In a shared repo, the best plan is explicit about boundaries and honest about what still needs another file or another owner.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "Use Plan Mode when the task has enough scope, risk, or collaboration complexity that a wrong first edit would cost more than a short pause.",
      note:
        "A good plan is brief, concrete, and boundary-aware. Once the path is clear and the work is done, the final Section 4 move is leaving behind a useful artifact someone else can act on.",
    },
  ],
};

export default config;
