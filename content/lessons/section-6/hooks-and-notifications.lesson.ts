import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "hooks-and-notifications",
  title: "Hooks and Notifications",
  section: 6,
  duration: "7 min",
  objectives: [
    "Explain how hooks and notifications help humans stay aware without watching every AI step live",
    "Recognize the difference between useful signals and noisy interruptions",
    "Write a prompt that tells Claude Code what events should trigger a human check-in",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Once work runs in parallel, you need signals that matter more than constant watching.",
      subtext:
        "Hooks and notifications let Claude Code surface the moments a human should care about: permission requests, failures, completions, and checkpoints. The goal is awareness without micromanagement.",
    },
    {
      type: "diagram",
      title: "What a useful notification loop looks like",
      steps: [
        {
          id: "event",
          label: "Event",
          headline: "Choose the moments that matter",
          color: "teal",
          explanation:
            "Not every internal step deserves human attention. Good hooks fire on meaningful events like blocked progress, risky actions, or finished milestones.",
          example:
            "Example: notify the human when validation fails or when a scoped lesson file is ready for review.",
        },
        {
          id: "signal",
          label: "Signal",
          headline: "Make the message easy to scan",
          color: "blue",
          explanation:
            "A good notification says what happened, where it happened, and whether action is needed now. Short, concrete messages reduce cognitive load.",
          example:
            "Example: 'Validation failed in `validation-loops.lesson.ts`; review needed before completion.'",
        },
        {
          id: "response",
          label: "Response",
          headline: "Tell the human what to do next",
          color: "amber",
          explanation:
            "Signals work best when they come with an obvious next action. Otherwise the human still has to reconstruct the context before responding.",
          example:
            "Example: 'Approve escalation, inspect the failing file, or let the agent keep working in scope.'",
        },
        {
          id: "noise",
          label: "Noise control",
          headline: "Avoid alerting on every tiny step",
          color: "violet",
          explanation:
            "Too many notifications teach people to ignore them. The system should surface only high-value moments, not every file read or every passing thought.",
          example:
            "Example: do not notify on every paragraph drafted if the human only needs milestone updates.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Tune the alerting strategy",
      description:
        "Several agents are working across Section 6 in parallel. Choose the hooks and notifications that keep the human informed without burying them in noise.",
      steps: [
        {
          id: "sim-trigger",
          label: "Trigger",
          context:
            "You can notify on every step, or only when something important happens.",
          prompt: "claude",
          terminal:
            "Possible events:\n- each file read\n- each paragraph drafted\n- permission needed\n- validation failed\n- task complete\n\nClaude Code: I should notify on high-value events, not on every internal motion.",
          question: "Which trigger set is strongest?",
          choices: [
            {
              id: "trigger-strong",
              label:
                "Notify on permission requests, failures, and meaningful completion checkpoints",
              rationale:
                "These are the events most likely to need a human decision or review.",
            },
            {
              id: "trigger-all",
              label:
                "Notify on every file open and every reasoning step so the human misses nothing",
            },
            {
              id: "trigger-none",
              label:
                "Disable notifications entirely because good agents should never interrupt",
            },
          ],
          correctChoiceId: "trigger-strong",
          explanation:
            "Useful notifications are selective. They protect attention for the moments where awareness changes what the human should do next.",
          hint:
            "Choose the option that treats attention as scarce and valuable.",
        },
        {
          id: "sim-message",
          label: "Message",
          context:
            "A validation step just failed in one owned file, and the human needs to decide whether to pause the task or let the agent keep investigating.",
          prompt: "claude",
          terminal:
            "Event: validation failed\nFile: `hooks-and-notifications.lesson.ts`\n\nClaude Code: The message should be concrete enough that the human knows what happened without reopening the whole session first.",
          question: "What notification is best?",
          choices: [
            {
              id: "message-clear",
              label:
                "Validation failed in `hooks-and-notifications.lesson.ts`. I stayed within scope and can keep investigating, or you can review the file now.",
              rationale:
                "It names the event, the file, and the next action clearly.",
            },
            {
              id: "message-vague",
              label:
                "Something may be wrong. Please check when you have time.",
            },
            {
              id: "message-long",
              label:
                "Paste the full raw command output, stack traces, and internal reasoning without summarizing the issue",
            },
          ],
          correctChoiceId: "message-clear",
          explanation:
            "The best notification is short but actionable. It saves time by packaging the relevant context in one glanceable message.",
          hint:
            "Pick the option that answers what happened, where, and what now.",
        },
        {
          id: "sim-overload",
          label: "Noise",
          context:
            "The human says they feel buried by updates from several parallel agents.",
          prompt: "claude",
          terminal:
            "Current behavior: notify on every intermediate milestone, every passed check, and every small content change.\n\nClaude Code: The system has crossed from visibility into noise.",
          question: "What should change?",
          choices: [
            {
              id: "overload-reduce",
              label:
                "Keep only decision-worthy alerts and bundle routine progress into fewer milestone updates",
              rationale:
                "This preserves awareness while respecting the human's limited attention.",
            },
            {
              id: "overload-more",
              label:
                "Add even more detail so the human can learn to filter it manually",
            },
            {
              id: "overload-random",
              label:
                "Send alerts at unpredictable times so they feel less repetitive",
            },
          ],
          correctChoiceId: "overload-reduce",
          explanation:
            "Alert design is part of workflow design. Strong systems make important events visible and routine events lightweight.",
          hint:
            "Choose the option that keeps signals valuable instead of louder.",
        },
      ],
      completionMessage:
        "You tuned the workflow toward meaningful awareness: strong triggers, clear messages, and less noise.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Hooks and notifications are how AI workflows talk back at the right moments. They let the human step away from constant supervision while still staying informed about important progress, blockers, and decisions.",
        "The key is selectivity. A good system does not notify on every action. It notifies when awareness changes what the human should do next.",
        "For non-engineers, you can think of notifications as status lights. Green means things are moving. Yellow means attention may be needed soon. Red means the workflow is blocked or risky. Engineers often implement richer signals, but the principle is the same.",
      ],
      engineerDepth: [
        "Hooks are often most valuable around permission boundaries, validation outcomes, long-running task milestones, and handoff-ready completions. Those moments carry coordination value.",
        "Noisy notification systems fail the same way noisy logs do: they train people to ignore them. The quality bar is not maximum visibility. It is useful visibility.",
      ],
    },
    {
      type: "comparison",
      title: "Notification spam vs. meaningful signals",
      left: {
        label: "Too noisy",
        content:
          "Notify the human on every internal step so nothing is hidden from them.",
        annotations: [
          "Attention gets exhausted quickly",
          "Important alerts blend into routine progress",
          "The human still has to figure out what matters",
        ],
      },
      right: {
        label: "Meaningful signal design",
        content:
          "Notify only when the workflow hits a decision point, failure, permission request, or review-ready milestone, and make each message easy to act on.",
        annotations: [
          "Attention stays available for important moments",
          "Signals are easier to trust",
          "Next steps are obvious",
        ],
      },
      insight:
        "The best notification system is not the loudest one. It is the one people still pay attention to.",
    },
    {
      type: "classification",
      title: "Useful signal or avoidable noise?",
      instruction:
        "Sort each example based on whether it deserves human attention in a scaled AI workflow.",
      categories: [
        { id: "signal", label: "Useful signal", color: "teal" },
        { id: "noise", label: "Avoidable noise", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "A notification that validation failed in a specific owned file",
          correctCategory: "signal",
        },
        {
          id: "i2",
          text: "An alert for every paragraph the agent drafts",
          correctCategory: "noise",
        },
        {
          id: "i3",
          text: "A message that a permission request needs approval before progress can continue",
          correctCategory: "signal",
        },
        {
          id: "i4",
          text: "A stream of every internal reasoning turn regardless of user impact",
          correctCategory: "noise",
        },
        {
          id: "i5",
          text: "A bundled milestone update that says a lesson file is complete and ready for review",
          correctCategory: "signal",
        },
        {
          id: "i6",
          text: "A ping each time the agent opens a nearby file during routine exploration",
          correctCategory: "noise",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Tell Claude Code when to notify you",
      description:
        "Use this builder to define alert rules that keep you informed without turning the session into constant interruption.",
      fields: [
        {
          id: "task",
          label: "Task in motion",
          placeholder:
            "e.g. create the Section 6 hooks and notifications lesson inside the owned file only",
          hint: "State the work that is happening.",
        },
        {
          id: "events",
          label: "Events worth alerting on",
          placeholder:
            "e.g. permission requests, validation failures, and review-ready completion",
          hint: "Choose the moments that actually change what you need to do.",
        },
        {
          id: "format",
          label: "What each message should include",
          placeholder:
            "e.g. tell me what happened, which file it affects, and whether action is needed now",
          hint: "Design the signal, not just the trigger.",
        },
        {
          id: "noise",
          label: "What not to notify on",
          placeholder:
            "e.g. routine file reads and small drafting steps unless they create a blocker",
          hint: "Explicitly remove low-value interruptions.",
        },
      ],
      template:
        "While working on {task}, notify me only for {events}.\n\nEach notification should {format}.\n\nDo not notify me for {noise}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What makes a hook or notification genuinely useful?",
          options: [
            "It provides maximum detail every time",
            "It fires on events that matter and tells the human what changed",
            "It appears as often as possible so the workflow feels active",
            "It avoids mentioning concrete files or actions",
          ],
          correctIndex: 1,
          explanation:
            "Useful signals are selective and actionable. They help the human respond at the right moments instead of watching everything live.",
        },
        {
          question:
            "What is the healthiest response to notification overload?",
          options: [
            "Increase the alert frequency until nothing is missed",
            "Replace routine alerts with fewer milestone or decision-point messages",
            "Hide all errors to keep the stream calm",
            "Let each agent invent its own alert rules with no shared pattern",
          ],
          correctIndex: 1,
          explanation:
            "Strong systems protect attention. Reducing low-value alerts makes important alerts more visible, not less.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Notify on moments that change decisions, not on every internal step.",
      note:
        "At scale, good awareness feels calm and useful. Bad awareness feels like spam.",
    },
  ],
};

export default config;
