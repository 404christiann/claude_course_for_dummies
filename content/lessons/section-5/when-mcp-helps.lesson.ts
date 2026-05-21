import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "when-mcp-helps",
  title: "When MCP Helps",
  section: 5,
  duration: "8 min",
  objectives: [
    "Recognize the highest-value situations for MCP: fresh data, system access, real-world verification, and repetitive manual work",
    "Distinguish between helpful tool use and unnecessary tool use",
    "Write a task request that uses MCP only where it meaningfully improves the outcome",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "The best MCP moments are not flashy. They are the moments where outside evidence or access clearly beats guessing.",
      subtext:
        "If Claude Code already has what it needs, a tool may add little. If the task depends on fresh state, a connected system, or a repeatable action, MCP can save real time and reduce expensive mistakes.",
    },
    {
      type: "diagram",
      title: "Four strong signals that MCP will help",
      steps: [
        {
          id: "fresh",
          label: "Fresh data",
          headline: "The answer can change",
          color: "teal",
          explanation:
            "When the question depends on the latest status, output, or record, Claude Code needs a tool to fetch current information instead of relying on stale context.",
          example:
            "Example: checking the latest build log, deployment status, or live content entry.",
        },
        {
          id: "access",
          label: "System access",
          headline: "The source lives somewhere else",
          color: "blue",
          explanation:
            "Sometimes the important information is in another system entirely. MCP helps when Claude Code needs a defined path into that system rather than a description of it.",
          example:
            "Example: searching a connected drive, opening a design file, or reading a ticket from a project tracker.",
        },
        {
          id: "verify",
          label: "Verification",
          headline: "The result should be checked, not assumed",
          color: "amber",
          explanation:
            "MCP shines when the task needs proof: a page rendering correctly, a route returning the expected result, or a deployment truly succeeding.",
          example:
            "Example: using browser automation to confirm the lesson flow works after an edit.",
        },
        {
          id: "repeatable",
          label: "Repeatable action",
          headline: "A tool can do the boring part reliably",
          color: "violet",
          explanation:
            "If the work involves repeated searching, checking, or moving through steps, a tool often reduces friction and keeps the human focused on decisions instead of mechanics.",
          example:
            "Example: opening several pages to check the same interaction pattern after a content update.",
        },
      ],
    },
    {
      type: "comparison",
      title: "Helpful tool use vs. unnecessary tool use",
      left: {
        label: "Unnecessary MCP",
        content:
          "Use a browser tool to explain what a checkpoint block is and whether it is usually helpful in a lesson.",
        annotations: [
          "The answer is conceptual and already available in the lesson context",
          "The tool adds effort without adding better evidence",
          "A plain explanation would be faster and cleaner",
        ],
      },
      right: {
        label: "Helpful MCP",
        content:
          "Use the browser tool to verify whether the checkpoint block actually appears and works on the current lesson page after the content update.",
        annotations: [
          "The task depends on current page state",
          "The tool produces evidence that code reading alone may not provide",
          "Verification is the real goal, not explanation",
        ],
      },
      insight:
        "MCP helps most when it changes the quality of the answer, not just the style of the workflow.",
    },
    {
      type: "classification",
      title: "High-value MCP use or low-value MCP use?",
      instruction:
        "Sort each task based on whether MCP clearly improves the outcome.",
      categories: [
        { id: "high", label: "High-value MCP", color: "teal" },
        { id: "low", label: "Low-value MCP", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Check a deployment log to find the latest build error",
          correctCategory: "high",
        },
        {
          id: "i2",
          text: "Ask a search tool to define a term already explained in the lesson",
          correctCategory: "low",
        },
        {
          id: "i3",
          text: "Use browser automation to confirm a localhost interaction actually works",
          correctCategory: "high",
        },
        {
          id: "i4",
          text: "Open multiple systems even though the whole task can be solved from one provided file",
          correctCategory: "low",
        },
        {
          id: "i5",
          text: "Search a large repo for the single config file that controls a known behavior",
          correctCategory: "high",
        },
        {
          id: "i6",
          text: "Call a tool just to make the workflow feel more advanced",
          correctCategory: "low",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Choose the right MCP moment",
      description:
        "A teammate keeps asking Claude Code for help across different situations. Pick the moments where tool use creates a real advantage.",
      steps: [
        {
          id: "sim-status",
          label: "Fresh data",
          context:
            "The team asks whether the newest deployment passed after a content push five minutes ago.",
          prompt: "claude",
          terminal:
            "Teammate: Did the newest deployment pass?\n\nClaude Code: That answer depends on a current external system, so I should not answer from memory or code alone.",
          question: "What is the strongest move?",
          choices: [
            {
              id: "status-check",
              label:
                "Use the deployment or logs tool to check the latest status before answering",
              rationale:
                "This is classic high-value MCP because the answer changes over time.",
            },
            {
              id: "status-assume",
              label:
                "Assume it probably passed because the lesson file looked valid locally",
            },
            {
              id: "status-explain",
              label:
                "Describe how deployments usually work without checking the actual one",
            },
          ],
          correctChoiceId: "status-check",
          explanation:
            "Fresh status questions are one of the clearest cases for MCP because the system of record is outside the conversation.",
          hint:
            "Pick the move that goes to the live source instead of filling the gap with confidence.",
        },
        {
          id: "sim-concept",
          label: "Concept only",
          context:
            "A learner asks what a prompt-builder block is supposed to teach.",
          prompt: "claude",
          terminal:
            "Learner: What is the point of the prompt-builder block?\n\nClaude Code: This is a conceptual lesson question, not a question about current external state.",
          question: "Should Claude Code use MCP here?",
          choices: [
            {
              id: "concept-no",
              label:
                "No. A clear in-chat explanation is enough because the needed context is already present",
              rationale:
                "Not every question needs a tool, especially when the answer is already in the lesson content.",
            },
            {
              id: "concept-search",
              label:
                "Yes. Search external systems anyway so the answer feels more complete",
            },
            {
              id: "concept-browser",
              label:
                "Yes. Open the lesson page even though the learner asked for a conceptual explanation",
            },
          ],
          correctChoiceId: "concept-no",
          explanation:
            "A strong agent does not overuse tools. If the answer is already available in context, simple explanation usually beats tool overhead.",
          hint:
            "Choose the option that preserves momentum when no evidence gap exists.",
        },
        {
          id: "sim-verify",
          label: "Verification",
          context:
            "After an edit, the team asks whether a mini-simulation still renders and advances correctly.",
          prompt: "claude",
          terminal:
            "Team request: Verify the mini-simulation still renders and advances correctly.\n\nClaude Code: The task is not only to describe the implementation. It is to confirm the behavior.",
          question: "Why does MCP help here?",
          choices: [
            {
              id: "verify-proof",
              label:
                "Because browser verification can produce evidence about the actual interaction instead of relying on expected behavior from code",
              rationale:
                "Verification is stronger when the current UI is observed directly.",
            },
            {
              id: "verify-theory",
              label:
                "Because a tool always gives a better explanation, even when no evidence is needed",
            },
            {
              id: "verify-style",
              label:
                "Because using a tool makes the workflow look more professional even if it changes nothing",
            },
          ],
          correctChoiceId: "verify-proof",
          explanation:
            "This is high-value MCP because the tool changes the confidence level of the answer. It gives proof, not just theory.",
          hint:
            "Look for the option where the tool improves truth, not optics.",
        },
      ],
      completionMessage:
        "You identified the real payoff pattern: use MCP when it adds fresh evidence, system reach, meaningful verification, or relief from repetitive manual work.",
    },
    {
      type: "explanation",
      paragraphs: [
        "The easiest way to spot a good MCP moment is to ask one question: does a tool materially improve the truth or usefulness of the answer? If yes, use it. If not, stay simple.",
        "MCP tends to help most in four situations: the answer changes over time, the source lives in another system, the result needs verification, or the task includes repeatable steps that a tool can handle more reliably than a person doing them by hand.",
        "This matters for both non-engineers and engineers. Non-engineers get a clearer rule for when to trust tool use. Engineers get a workflow heuristic that keeps tools tied to real evidence instead of novelty.",
      ],
      engineerDepth: [
        "High-value MCP often shows up around logs, tickets, browser verification, repo search, design references, deployment systems, and structured data sources. The common thread is that the tool changes the evidence quality, not just the surface workflow.",
        "A useful prompt pattern is: state the goal, name the source of truth, constrain the scope, and ask for evidence before conclusions.",
      ],
    },
    {
      type: "prompt-builder",
      title: "Frame a high-value MCP request",
      description:
        "Use this when you know tool use will help and you want Claude Code to stay focused.",
      fields: [
        {
          id: "task",
          label: "Task",
          placeholder:
            "e.g. verify whether the latest content deployment succeeded",
          hint: "State the real question you need answered.",
        },
        {
          id: "reason",
          label: "Why MCP helps",
          placeholder:
            "e.g. the answer depends on fresh deployment status outside the current chat",
          hint: "Name the evidence gap so the tool use feels intentional.",
        },
        {
          id: "source",
          label: "Source of truth",
          placeholder: "e.g. deployment logs or the localhost browser view",
          hint: "Point to the system or tool that can close the gap.",
        },
        {
          id: "constraint",
          label: "Scope and output",
          placeholder:
            "e.g. check only the latest deployment and summarize the evidence before proposing any fix",
          hint: "Keep the tool work bounded and easy to review.",
        },
      ],
      template:
        "Help with this task: {task}. MCP should help here because {reason}. Use {source}, and {constraint}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question: "Which task is the clearest high-value MCP use?",
          options: [
            "Explaining a lesson concept already shown in the current content",
            "Checking whether the latest deployment passed",
            "Rephrasing a short objective sentence",
            "Comparing two prompts that are already visible in the lesson",
          ],
          correctIndex: 1,
          explanation:
            "Deployment status is external, fresh, and evidence-based, which makes it one of the strongest reasons to use MCP.",
        },
        {
          question: "What is the best quick test for whether MCP helps?",
          options: [
            "Use it whenever the task feels important",
            "Use it whenever a tool is available",
            "Use it when a tool materially improves evidence, access, verification, or repeated manual work",
            "Use it only for engineering tasks",
          ],
          correctIndex: 2,
          explanation:
            "Good tool use is value-based, not excitement-based. The right question is whether the tool changes the quality of the outcome.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "MCP helps when it improves the truth, reach, or reliability of the work in front of you.",
      note:
        "The next lesson covers the other side of the coin: how tool use becomes costly when it adds noise, delay, or false complexity.",
    },
  ],
};

export default config;
