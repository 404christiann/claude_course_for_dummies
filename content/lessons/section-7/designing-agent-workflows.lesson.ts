import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "designing-agent-workflows",
  title: "Designing Practical Agent Workflows",
  section: 7,
  duration: "9 min",
  objectives: [
    "Combine scope, readiness checks, harnesses, and validation into a repeatable agent workflow",
    "See how a strong workflow supports both non-engineer operators and engineer implementers",
    "Draft a practical workflow prompt for real agentic engineering work in a shared codebase",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Agentic engineering at scale is not one clever prompt. It is a repeatable workflow that keeps agents oriented, bounded, and provable from start to finish.",
      subtext:
        "By this point you have seen the failures, the audit, and the harnesses. The final step is turning them into an operating rhythm teams can use again and again on real product work.",
    },
    {
      type: "diagram",
      title: "The practical agent workflow",
      steps: [
        {
          id: "frame",
          label: "Frame",
          headline: "Define the job and the ownership",
          color: "teal",
          explanation:
            "Start with the task, the owned files, the out-of-scope areas, and the output shape. This protects the workflow before the repo exploration even begins.",
          example:
            "Example: 'Rewrite only these four lesson config files, use the current block system, and report any registry follow-up instead of editing it.'",
        },
        {
          id: "audit",
          label: "Audit",
          headline: "Check the path before moving fast",
          color: "blue",
          explanation:
            "Confirm the entry points, current pattern, and proof path. If the repo is missing something important, name that early instead of discovering it halfway through the task.",
          example:
            "Example: read the lesson schema and current interactive lesson examples, then confirm whether a targeted validation command exists.",
        },
        {
          id: "runway",
          label: "Runway",
          headline: "Use or build the right harness",
          color: "amber",
          explanation:
            "If a repeated friction point shows up, use the existing harness or propose the smallest new one that would help. The goal is to make safe execution easier than improvisation.",
          example:
            "Example: rely on a lesson-only validation command and a closeout template instead of re-explaining those steps from scratch.",
        },
        {
          id: "close",
          label: "Close",
          headline: "Prove the work and hand it off cleanly",
          color: "violet",
          explanation:
            "End with evidence, changed-file clarity, and explicit follow-up. A workflow is only complete when the next person can continue without re-solving the orientation problem.",
          example:
            "Example: list the four lesson files, note the validation result, and flag any wiring still owned by another agent.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Run a full agent workflow on a shared product task",
      description:
        "A team needs a new lesson section built inside an active app with multiple contributors. Choose the strongest workflow move at each stage.",
      steps: [
        {
          id: "sim-frame",
          label: "Frame",
          context:
            "The product lead says, 'We need Section 7 to feel as strong as the best interactive lessons, but do not disrupt other agents.'",
          prompt: "claude",
          terminal:
            "Claude Code: Before I start, I should convert that direction into an executable workflow with clear ownership and boundaries.",
          question: "What framing is strongest?",
          choices: [
            {
              id: "frame-owned",
              label:
                "Name the exact files, current pattern references, out-of-scope shared areas, and expected validation or follow-up",
              rationale:
                "This gives the workflow a reliable container before implementation starts.",
            },
            {
              id: "frame-infer",
              label:
                "Assume the likely boundaries and hope they match what the team meant",
            },
            {
              id: "frame-broaden",
              label:
                "Treat the request as permission to improve the whole section system if better ideas appear",
            },
          ],
          correctChoiceId: "frame-owned",
          explanation:
            "Workflows start with framing because shared codebases punish unspoken ownership assumptions. Clear framing prevents accidental overreach and makes collaboration safer.",
          hint:
            "Choose the option that makes the assignment executable without hidden interpretation.",
        },
        {
          id: "sim-audit",
          label: "Audit",
          context:
            "The task is framed, but you still need to confirm that the repo provides the right pattern and proof path for the work.",
          prompt: "claude",
          terminal:
            "Claude Code: I should validate the approach before I move fast. If the current pattern or proof step is unclear, that is part of the workflow risk.",
          question: "What should happen next?",
          choices: [
            {
              id: "audit-relevant",
              label:
                "Inspect the source-of-truth files and the nearest strong examples, then confirm the narrowest relevant validation path",
              rationale:
                "This creates a grounded execution plan instead of relying on stale assumptions.",
            },
            {
              id: "audit-memory",
              label:
                "Skip re-checking because the same general system was used in a previous section",
            },
            {
              id: "audit-delay",
              label:
                "Avoid validating the approach until after the edits are complete",
            },
          ],
          correctChoiceId: "audit-relevant",
          explanation:
            "A workflow audit is a small investment that prevents large rework. It refreshes the mental model and confirms how the work will be proved at the end.",
          hint:
            "Pick the move that reduces the chance of building against the wrong pattern.",
        },
        {
          id: "sim-runway",
          label: "Runway",
          context:
            "During the work, you notice the same friction point that earlier tasks hit: proving content-only changes is still more manual than it should be.",
          prompt: "claude",
          terminal:
            "Claude Code: I can finish this task, but I should also think about whether an existing harness covers this or whether I should note a lightweight improvement.",
          question: "What is the best workflow behavior?",
          choices: [
            {
              id: "runway-use-note",
              label:
                "Use the best available harness now, and if a small missing harness would help future tasks, note it as follow-up instead of silently expanding scope",
              rationale:
                "This preserves delivery while still improving the system over time.",
            },
            {
              id: "runway-rebuild",
              label:
                "Pause the assignment and redesign the whole workflow platform before finishing the owned task",
            },
            {
              id: "runway-ignore",
              label:
                "Ignore the friction entirely because it is someone else's problem",
            },
          ],
          correctChoiceId: "runway-use-note",
          explanation:
            "Practical workflows balance execution and improvement. They use the current runway, then surface the next best harness without hijacking the task.",
          hint:
            "Choose the option that protects scope while still creating momentum for system improvement.",
        },
        {
          id: "sim-close",
          label: "Close",
          context:
            "The files are edited, the targeted proof step has run, and another teammate will handle any remaining integration work.",
          prompt: "claude",
          terminal:
            "Claude Code: The workflow should end in a way the team can trust and continue from immediately.",
          question: "What makes the closeout strongest?",
          choices: [
            {
              id: "close-complete",
              label:
                "Summarize the exact files changed, the proof run and result, and the remaining next-step ownership outside scope",
              rationale:
                "This preserves both trust and continuity, which is the real goal of a team workflow.",
            },
            {
              id: "close-polished",
              label:
                "Write a polished recap of the lesson quality without mentioning validation or follow-up",
            },
            {
              id: "close-minimal",
              label:
                "Say the task is done and leave the rest for the team to rediscover",
            },
          ],
          correctChoiceId: "close-complete",
          explanation:
            "A workflow closes the loop with evidence and ownership clarity. That is what makes agent work composable across people, branches, and future sessions.",
          hint:
            "Pick the answer that makes the next handoff almost frictionless.",
        },
      ],
      completionMessage:
        "You just ran the full Section 7 workflow: frame the task, audit the path, use the runway, then close with proof and ownership clarity.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A practical agent workflow is a reusable sequence, not a one-time performance. It helps a team get the same benefits from agents repeatedly even when the people, tasks, or code slices change.",
        "Notice how this workflow supports both audiences. Non-engineers can frame the task, define boundaries, and ask for proof. Engineers can deepen the audit, improve the harnesses, and tune the validation path. Both lanes reinforce the same system.",
        "That is the real meaning of agentic engineering at scale: shaping the workflow so good agent behavior becomes normal, inspectable, and easier to repeat than improvisation.",
      ],
      engineerDepth: [
        "In practice, this workflow often gets captured in repo conventions, starter prompts, `CLAUDE.md`, automation hooks, or lightweight operating docs that define how common task types should gather, act, verify, and hand off.",
        "The workflow should stay concrete. If it becomes too broad, agents lose the very context that made the pattern dependable in the first place.",
      ],
    },
    {
      type: "comparison",
      title: "One-shot prompting vs. designed workflow",
      left: {
        label: "One-shot prompting",
        content:
          "Ask the agent for the task, hope it reads the right files, hope it validates, and clean up the confusion afterward if needed.",
        annotations: [
          "Too much depends on interpretation in the moment",
          "No shared sequence the team can reuse",
          "Failures repeat because the system never changed",
        ],
      },
      right: {
        label: "Designed workflow",
        content:
          "Frame the owned work clearly, audit the current pattern and proof path, use or note the right harness, then close with evidence and next-step ownership.",
        annotations: [
          "Turns good agent behavior into a repeatable sequence",
          "Supports both operators and implementers",
          "Improves team trust and reuse across sessions",
        ],
      },
      insight:
        "The workflow wins because it makes reliability a system property, not a lucky outcome from one especially careful prompt.",
    },
    {
      type: "classification",
      title: "Workflow step or workflow drift?",
      instruction:
        "Sort each action based on whether it belongs in a strong practical agent workflow.",
      categories: [
        { id: "step", label: "Workflow step", color: "teal" },
        { id: "drift", label: "Workflow drift", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Defining exact owned files and out-of-scope areas before editing",
          correctCategory: "step",
        },
        {
          id: "i2",
          text: "Assuming the current pattern is unchanged from memory",
          correctCategory: "drift",
        },
        {
          id: "i3",
          text: "Confirming the narrowest relevant proof path early",
          correctCategory: "step",
        },
        {
          id: "i4",
          text: "Expanding scope to fix every workflow problem discovered mid-task",
          correctCategory: "drift",
        },
        {
          id: "i5",
          text: "Ending with evidence and a clear handoff for the next owner",
          correctCategory: "step",
        },
        {
          id: "i6",
          text: "Reporting success without naming what still remains outside scope",
          correctCategory: "drift",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Build a practical agent workflow prompt",
      description:
        "Use these fields to design a repeatable workflow for a real team task, not just a one-off request.",
      fields: [
        {
          id: "task",
          label: "Owned task",
          placeholder:
            "e.g. create the four Section 7 interactive lesson configs in the course app",
          hint: "State the concrete deliverable and the owned surface.",
        },
        {
          id: "audit",
          label: "What to inspect first",
          placeholder:
            "e.g. product docs, lesson schema, strongest current examples, and the narrowest relevant validation path",
          hint: "Name the current pattern and proof path before execution starts.",
        },
        {
          id: "runway",
          label: "Harnesses or supports",
          placeholder:
            "e.g. use the lesson block system, any lesson-only validation command, and a standard closeout format",
          hint: "Call out the runway that should make safe execution easier.",
        },
        {
          id: "close",
          label: "Definition of done",
          placeholder:
            "e.g. edit only the owned files, run targeted validation if feasible, and report changed files plus out-of-scope follow-up",
          hint: "Close with proof and handoff expectations.",
        },
      ],
      template:
        "Task: {task}.\n\nBefore editing, inspect {audit}.\n\nUse this runway: {runway}.\n\nDone means: {close}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What makes an agent workflow practical instead of merely impressive sounding?",
          options: [
            "It is broad enough to apply to every task without changes",
            "It gives a repeatable sequence for framing, auditing, executing, and proving work",
            "It depends on the strongest model available",
            "It avoids mentioning out-of-scope work so the summary stays short",
          ],
          correctIndex: 1,
          explanation:
            "Practical workflows help teams reproduce good outcomes. They are concrete enough to guide real work from start to finish.",
        },
        {
          question:
            "Which statement best reflects the Section 7 mindset?",
          options: [
            "If the prompt is strong enough, the workflow around it does not matter much",
            "Agent reliability comes mostly from luck and experience",
            "Design the workflow so orientation, boundaries, proof, and handoff are part of the system",
            "Only engineers can operate an agent workflow well",
          ],
          correctIndex: 2,
          explanation:
            "Section 7 is about system design for agent work. Reliability improves when those workflow ingredients are built in rather than left to chance.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "Great agent work at scale comes from designed workflows, not heroic prompting.",
      note:
        "When the task is framed clearly, the repo is auditable, the harnesses are useful, and the closeout proves the result, agents become much easier for teams to trust repeatedly.",
    },
  ],
};

export default config;
