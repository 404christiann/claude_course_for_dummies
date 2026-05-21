import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "multi-agent-workflows",
  title: "Multi-Agent Workflows",
  section: 6,
  duration: "8 min",
  objectives: [
    "Explain when multiple agents help and when they only create extra coordination cost",
    "Recognize the roles that make multi-agent work safer: coordinator, specialist, and reviewer",
    "Write a prompt that divides work clearly across agents without overlapping ownership",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Adding more agents does not create scale by itself. Clear division of labor does.",
      subtext:
        "Multi-agent workflows work best when each agent has a narrow job, a clean handoff, and a coordinator who keeps the pieces aligned. Without that structure, parallel work just creates parallel confusion.",
    },
    {
      type: "diagram",
      title: "How healthy multi-agent work stays coordinated",
      steps: [
        {
          id: "coordinator",
          label: "Coordinator",
          headline: "One agent holds the overall map",
          color: "teal",
          explanation:
            "Someone needs to understand the whole task, assign boundaries, and keep track of what is still open. That role prevents duplicated effort and missed dependencies.",
          example:
            "Example: one agent reads the section spec, assigns the four lesson files, and tracks which follow-up files remain out of scope.",
        },
        {
          id: "specialists",
          label: "Specialists",
          headline: "Each agent owns a narrow slice",
          color: "blue",
          explanation:
            "Parallelism is strongest when each agent has one clear job. The assignment should name the file boundary, the quality bar, and what not to touch.",
          example:
            "Example: one agent owns the worktrees lesson while another owns hooks and notifications.",
        },
        {
          id: "handoff",
          label: "Handoff",
          headline: "Outputs need a shared format",
          color: "amber",
          explanation:
            "If every agent reports differently, the coordinator has to reconstruct the story manually. A consistent handoff reduces coordination drag.",
          example:
            "Example: each agent reports files changed, validation run, and follow-up outside scope.",
        },
        {
          id: "review",
          label: "Review",
          headline: "One final pass checks the seams",
          color: "violet",
          explanation:
            "Even good parallel work can leave mismatched tone, duplicated logic, or broken assumptions at the edges. A final reviewer closes those gaps.",
          example:
            "Example: review whether all Section 6 lessons share the same pacing, terminal style, and progression from isolation to validation.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Design a clean multi-agent split",
      description:
        "A Section 6 release needs four new lessons, but multiple agents will help. Choose the coordination moves that keep the work parallel without creating overlap or drift.",
      steps: [
        {
          id: "sim-split",
          label: "Split",
          context:
            "You have four lesson files and one shared system. Several agents are available right now.",
          prompt: "claude",
          terminal:
            "Goal: ship Section 6 lessons on safe parallel work.\nRisk: multiple agents touching adjacent content at once.\n\nClaude Code: I should divide the work into independently ownable slices instead of telling everyone to improve Section 6 broadly.",
          question: "What is the strongest assignment style?",
          choices: [
            {
              id: "split-clear",
              label:
                "Assign one agent per lesson file with explicit scope, required docs to read first, and a rule not to edit shared components",
              rationale:
                "This creates clean ownership and lowers the chance of duplicated or conflicting edits.",
            },
            {
              id: "split-broad",
              label:
                "Tell all agents to improve Section 6 however they think makes sense, then combine the best parts later",
            },
            {
              id: "split-shared",
              label:
                "Have every agent edit all four lessons so the tone stays naturally consistent",
            },
          ],
          correctChoiceId: "split-clear",
          explanation:
            "Multi-agent systems need smaller, clearer jobs than solo work does. Narrow file ownership is the simplest strong default.",
          hint:
            "Pick the option that minimizes overlap before it happens.",
        },
        {
          id: "sim-handoff",
          label: "Handoff",
          context:
            "The agents are working in parallel. Soon the coordinator will need to combine the outputs and spot anything still missing.",
          prompt: "claude",
          terminal:
            "Agent A will report in paragraphs.\nAgent B wants to paste raw command output.\nAgent C plans to send only a sentence.\n\nClaude Code: If handoffs are inconsistent, the coordination burden shifts back onto the reviewer.",
          question: "What should the coordinator do?",
          choices: [
            {
              id: "handoff-template",
              label:
                "Require a shared handoff shape: exact files changed, what was added, validation run, and follow-up outside scope",
              rationale:
                "A shared template makes the multi-agent output composable and easier to trust.",
            },
            {
              id: "handoff-flex",
              label:
                "Let each agent report however they want so the process feels less rigid",
            },
            {
              id: "handoff-silent",
              label:
                "Skip handoffs and read the diffs manually at the very end",
            },
          ],
          correctChoiceId: "handoff-template",
          explanation:
            "Good parallel work needs a common output format. Otherwise the coordinator spends the savings on cleanup.",
          hint:
            "Choose the option that makes the pieces easier to combine.",
        },
        {
          id: "sim-seams",
          label: "Seams",
          context:
            "All four lesson files are done, but the sequence still needs one last quality pass before the section feels unified.",
          prompt: "claude",
          terminal:
            "Outputs complete:\n- `worktrees.lesson.ts`\n- `multi-agent-workflows.lesson.ts`\n- `hooks-and-notifications.lesson.ts`\n- `validation-loops.lesson.ts`\n\nClaude Code: Parallel execution saved time, but now I need to check the seams between the lessons.",
          question: "What is the strongest final move?",
          choices: [
            {
              id: "seams-review",
              label:
                "Run a final section-level review for tone, progression, repeated ideas, and missing cross-lesson links before calling the release coherent",
              rationale:
                "This catches edge mismatches without erasing the benefits of the parallel split.",
            },
            {
              id: "seams-merge",
              label:
                "Assume the files are coherent because each one looked good on its own",
            },
            {
              id: "seams-rewrite",
              label:
                "Rewrite all four lessons from scratch in one file so the section definitely matches itself",
            },
          ],
          correctChoiceId: "seams-review",
          explanation:
            "Multi-agent success is not just about parallel completion. It is about coordinated completion. The final seam check is what makes the section feel intentional.",
          hint:
            "Look for the option that checks integration rather than starting over.",
        },
      ],
      completionMessage:
        "You built a healthy multi-agent flow: one coordinator, narrow assignments, shared handoffs, and a final seam review.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A multi-agent workflow is just a coordinated way to divide one larger task into smaller owned jobs. The value comes from reducing waiting time, not from making the system feel more complex.",
        "The simplest useful pattern is coordinator, specialists, reviewer. One agent holds the whole map, several agents own narrow slices, and someone checks the seams at the end.",
        "For beginners, the core lesson is not technical. It is organizational. When too many people or agents share a fuzzy job, confusion expands faster than output. Clear ownership beats raw parallelism.",
      ],
      engineerDepth: [
        "The best splits follow file boundaries, system boundaries, or artifact boundaries. The worst splits follow vague themes like 'improve quality' or 'make this whole area better.'",
        "Parallel speedups disappear quickly if agents share mutable surfaces, depend on undocumented assumptions, or report in inconsistent formats. Coordination is part of the architecture, not an afterthought.",
      ],
    },
    {
      type: "comparison",
      title: "Agent swarm vs. coordinated workflow",
      left: {
        label: "Unstructured swarm",
        content:
          "Several agents improve the same section at once and sort out conflicts after the fact.",
        annotations: [
          "Ownership is unclear",
          "Overlap and drift are likely",
          "Final integration becomes expensive",
        ],
      },
      right: {
        label: "Coordinated workflow",
        content:
          "A coordinator assigns one owned slice per agent, defines the handoff format, and runs a final seam review before the work is treated as complete.",
        annotations: [
          "Each agent has a narrow lane",
          "Handoffs are predictable",
          "Integration becomes an explicit final step",
        ],
      },
      insight:
        "More agents help only when the coordination design is strong enough to keep their work composable.",
    },
    {
      type: "classification",
      title: "Healthy multi-agent move or coordination smell?",
      instruction:
        "Sort each statement based on whether it improves a parallel workflow or makes it harder to manage.",
      categories: [
        { id: "healthy", label: "Healthy workflow", color: "teal" },
        { id: "smell", label: "Coordination smell", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Assign one agent to one owned file or slice with explicit boundaries",
          correctCategory: "healthy",
        },
        {
          id: "i2",
          text: "Ask multiple agents to broadly improve the same surface at the same time",
          correctCategory: "smell",
        },
        {
          id: "i3",
          text: "Require the same summary format from each agent at handoff time",
          correctCategory: "healthy",
        },
        {
          id: "i4",
          text: "Assume the seams will work out if each agent is talented enough",
          correctCategory: "smell",
        },
        {
          id: "i5",
          text: "Run a final review that checks progression and duplicated ideas across outputs",
          correctCategory: "healthy",
        },
        {
          id: "i6",
          text: "Let every agent decide for themselves whether shared components are in scope",
          correctCategory: "smell",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Draft a clean multi-agent assignment",
      description:
        "Use this builder when you want parallel help without overlapping ownership or muddy handoffs.",
      fields: [
        {
          id: "goal",
          label: "Shared goal",
          placeholder:
            "e.g. create the four Section 6 lessons about safe parallel work and scale",
          hint: "State the larger outcome the team is collectively moving toward.",
        },
        {
          id: "slice",
          label: "Owned slice for this agent",
          placeholder:
            "e.g. only edit `content/lessons/section-6/multi-agent-workflows.lesson.ts`",
          hint: "Name the exact lane for this one agent.",
        },
        {
          id: "inputs",
          label: "Required inputs to read first",
          placeholder:
            "e.g. read the course plan, interactive spec, lesson types, and strongest Section 4 examples before editing",
          hint: "Give each agent the same orientation base.",
        },
        {
          id: "handoff",
          label: "Expected handoff format",
          placeholder:
            "e.g. report exact files changed, what was added, targeted validation run, and any follow-up outside scope",
          hint: "Shared handoffs make the outputs easier to combine later.",
        },
      ],
      template:
        "Shared goal: {goal}.\n\nYour owned slice: {slice}.\n\nBefore editing, {inputs}.\n\nWhen finished, {handoff}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What usually makes a multi-agent workflow safer?",
          options: [
            "Giving every agent broad freedom over the same files",
            "Using as many agents as possible",
            "Clear ownership, shared handoffs, and a final seam review",
            "Avoiding any coordination so the agents can move faster",
          ],
          correctIndex: 2,
          explanation:
            "Parallel help works when the pieces are ownable, the outputs are composable, and someone checks how the pieces fit together.",
        },
        {
          question:
            "What is the coordinator's core job?",
          options: [
            "To do all the coding personally",
            "To hold the overall map, assign boundaries, and track what is still open",
            "To rewrite every agent's work from scratch",
            "To remove all checkpoints so agents can move independently",
          ],
          correctIndex: 1,
          explanation:
            "The coordinator protects the workflow from overlap and missing seams. The role is about alignment more than raw implementation.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Parallel agents help most when the work is split into clear lanes with clear handoffs.",
      note:
        "Coordination is not overhead to remove. It is the structure that makes scale trustworthy.",
    },
  ],
};

export default config;
