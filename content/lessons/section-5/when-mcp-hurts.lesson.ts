import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "when-mcp-hurts",
  title: "When MCP Hurts",
  section: 5,
  duration: "8 min",
  objectives: [
    "Recognize the main failure modes of tool use: unnecessary overhead, scope drift, noisy results, and false confidence",
    "Distinguish between tasks that should stay simple and tasks that truly need a tool",
    "Write a prompt that prevents Claude Code from overusing MCP",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Tools are powerful, but the wrong tool at the wrong moment can make a task slower, noisier, and less trustworthy.",
      subtext:
        "MCP is not automatically helpful just because it is available. Good agentic work still depends on judgment about when to stay simple and when to reach outside the chat.",
    },
    {
      type: "diagram",
      title: "Four ways MCP can hurt a workflow",
      steps: [
        {
          id: "overhead",
          label: "Overhead",
          headline: "The tool adds more work than value",
          color: "teal",
          explanation:
            "Some questions can be answered directly from the current context. Pulling in a tool for those tasks wastes time and breaks momentum.",
          example:
            "Example: searching another system for a definition that is already explained in the lesson.",
        },
        {
          id: "drift",
          label: "Scope drift",
          headline: "The tool request expands the task",
          color: "blue",
          explanation:
            "A vague tool request can turn one focused question into a broad investigation. That often creates more output, not more clarity.",
          example:
            "Example: asking the browser tool to inspect the entire site when you only need to verify one lesson page.",
        },
        {
          id: "noise",
          label: "Noise",
          headline: "The result is too broad to be useful",
          color: "amber",
          explanation:
            "Tools can return a lot of information. If the request is not focused, Claude Code may get a pile of weak signals instead of the one answer the task really needed.",
          example:
            "Example: running a repo-wide search without naming the feature path or file area you care about.",
        },
        {
          id: "confidence",
          label: "False confidence",
          headline: "Using a tool can still lead to shallow conclusions",
          color: "violet",
          explanation:
            "A tool result is only as good as the question asked and the reasoning applied afterward. Tool use does not replace interpretation, verification, or boundaries.",
          example:
            "Example: reading one log line and declaring the whole system healthy without checking the relevant failure details.",
        },
      ],
    },
    {
      type: "comparison",
      title: "Tool-happy prompt vs. disciplined prompt",
      left: {
        label: "Tool-happy prompt",
        content:
          "Use whatever tools you have to inspect the app, search the repo, check the browser, and tell me anything important.",
        annotations: [
          "No concrete question or success condition",
          "Invites scope drift across multiple systems",
          "Makes noisy output more likely than a clear answer",
        ],
      },
      right: {
        label: "Disciplined prompt",
        content:
          "Only use a tool if the answer depends on current external evidence. For this task, stay in-chat unless you discover a specific evidence gap that requires browser verification or repo search.",
        annotations: [
          "Sets a default toward simplicity",
          "Defines the condition that justifies tool use",
          "Keeps MCP attached to a real need instead of habit",
        ],
      },
      insight:
        "The disciplined version treats MCP as a precise instrument, not a personality trait.",
    },
    {
      type: "classification",
      title: "Healthy restraint or unhealthy tool use?",
      instruction:
        "Sort each action based on whether it shows good judgment about when not to use MCP.",
      categories: [
        { id: "restraint", label: "Healthy restraint", color: "teal" },
        { id: "unhealthy", label: "Unhealthy tool use", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Answer a concept question directly when the lesson already contains the needed context",
          correctCategory: "restraint",
        },
        {
          id: "i2",
          text: "Launch three tools because the task feels important even though the evidence is already present",
          correctCategory: "unhealthy",
        },
        {
          id: "i3",
          text: "Narrow a browser check to one route and one interaction",
          correctCategory: "restraint",
        },
        {
          id: "i4",
          text: "Ask a tool to report anything interesting across the whole app",
          correctCategory: "unhealthy",
        },
        {
          id: "i5",
          text: "Stay in-chat until a specific evidence gap appears",
          correctCategory: "restraint",
        },
        {
          id: "i6",
          text: "Treat tool output as automatically correct without interpreting it",
          correctCategory: "unhealthy",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Catch the moment when tool use starts hurting",
      description:
        "Claude Code is helping on a lesson task. Choose the response that keeps the workflow sharp instead of tool-heavy.",
      steps: [
        {
          id: "sim-concept",
          label: "Overhead",
          context:
            "A learner asks for a plain-English explanation of why checkpoints exist in the lesson system.",
          prompt: "claude",
          terminal:
            "Learner: Why do checkpoint blocks exist?\n\nClaude Code: I can answer this from the lesson context I already have. Reaching for a tool would add steps without adding better truth.",
          question: "What should Claude Code do?",
          choices: [
            {
              id: "concept-direct",
              label:
                "Answer directly in plain English and skip tools because no outside evidence is needed",
              rationale:
                "This preserves flow and avoids unnecessary overhead.",
            },
            {
              id: "concept-tool",
              label:
                "Search connected systems anyway so the explanation feels more authoritative",
            },
            {
              id: "concept-browser",
              label:
                "Open the browser and inspect the lesson page before answering the conceptual question",
            },
          ],
          correctChoiceId: "concept-direct",
          explanation:
            "If the task is already solvable from the present context, using MCP can hurt by slowing the learner down and adding noise.",
          hint:
            "Pick the option that keeps the answer proportional to the actual question.",
        },
        {
          id: "sim-drift",
          label: "Scope drift",
          context:
            "A teammate asks whether one localhost lesson page still renders after a content change.",
          prompt: "claude",
          terminal:
            "Claude Code: I do need browser verification here, but the request should stay focused on the one lesson page and its critical blocks.",
          question: "Which browser request is safest?",
          choices: [
            {
              id: "drift-narrow",
              label:
                "Open that lesson route, confirm the expected blocks render, and note any console errors tied to this page",
              rationale:
                "This uses MCP, but with enough scope discipline to keep the result useful.",
            },
            {
              id: "drift-sitewide",
              label:
                "Crawl the entire site and look for any issue that might somehow relate",
            },
            {
              id: "drift-random",
              label:
                "Open a few pages at random to get a general feel for quality",
            },
          ],
          correctChoiceId: "drift-narrow",
          explanation:
            "Tool use becomes harmful when it silently expands the assignment. Good prompts keep the evidence request tight.",
          hint:
            "Choose the option that answers the real question without turning it into a site audit.",
        },
        {
          id: "sim-confidence",
          label: "False confidence",
          context:
            "A log tool returns one green success line, but the deployment page also shows a warning summary higher up.",
          prompt: "claude",
          terminal:
            "Tool result:\n- One step shows success\n- Warning summary indicates a later issue still needs review\n\nClaude Code: The tool returned evidence, but I still have to interpret it carefully.",
          question: "What is the strongest conclusion?",
          choices: [
            {
              id: "confidence-careful",
              label:
                "Summarize the mixed result honestly and inspect the warning before declaring the deployment healthy",
              rationale:
                "Tool use should improve rigor, not become an excuse for shallow certainty.",
            },
            {
              id: "confidence-green",
              label:
                "Report success immediately because a green line is good enough",
            },
            {
              id: "confidence-ignore",
              label:
                "Discard the tool result entirely because it contains too much information",
            },
          ],
          correctChoiceId: "confidence-careful",
          explanation:
            "MCP does not remove the need for judgment. Claude Code still has to interpret results and avoid overstating certainty.",
          hint:
            "Pick the answer that respects the evidence without oversimplifying it.",
        },
      ],
      completionMessage:
        "You practiced the restraint side of tool use: stay simple when you can, stay narrow when you must use a tool, and stay honest about what the result really proves.",
    },
    {
      type: "explanation",
      paragraphs: [
        "The most common MCP mistake is not technical. It is judgment drift. People start reaching for tools because they are available, not because they are needed.",
        "That usually hurts in four ways: it adds overhead to simple tasks, expands the scope of focused work, creates noisy outputs that are hard to use, and can even create false confidence if the tool result is read too quickly.",
        "The cure is simple but important: default to the smallest workflow that can answer the question well. Bring in MCP only when there is a real evidence or access gap that simpler reasoning cannot close.",
      ],
      engineerDepth: [
        "In practice, good teams often phrase this as a boundary rule: stay in-chat for conceptual reasoning and local transformations; use tools for external state, verification, and targeted searches that materially improve confidence.",
        "If a tool call would be hard to justify in one sentence, that is often a sign the request is too broad or the tool is unnecessary.",
      ],
    },
    {
      type: "prompt-builder",
      title: "Prevent unnecessary tool use",
      description:
        "Use this prompt shape when you want Claude Code to stay disciplined and only reach for MCP when it is truly justified.",
      fields: [
        {
          id: "task",
          label: "Task",
          placeholder:
            "e.g. explain the difference between the hook and takeaway blocks",
          hint: "Start with the actual job to be done.",
        },
        {
          id: "defaultMode",
          label: "Default mode",
          placeholder:
            "e.g. stay in-chat unless the answer depends on current external evidence",
          hint: "Set the simple path first.",
        },
        {
          id: "allowedGap",
          label: "When a tool is allowed",
          placeholder:
            "e.g. only if a browser check is needed to verify live page behavior",
          hint: "Name the specific evidence gap that would justify MCP.",
        },
        {
          id: "reporting",
          label: "How to report tool use",
          placeholder:
            "e.g. explain why the tool was needed and summarize the evidence briefly",
          hint: "Keep the workflow reviewable and intentional.",
        },
      ],
      template:
        "Help with this task: {task}. Default to this mode: {defaultMode}. Use MCP only if {allowedGap}, and if you do, {reporting}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question: "Which behavior best shows that MCP is hurting instead of helping?",
          options: [
            "Using a browser tool to verify a live interaction",
            "Searching the repo for a file you cannot otherwise locate",
            "Launching tools even though the answer is already present in the current lesson context",
            "Checking fresh deployment status before reporting success",
          ],
          correctIndex: 2,
          explanation:
            "That is pure overhead. The tool adds motion without adding new truth.",
        },
        {
          question: "What is the healthiest default before using MCP?",
          options: [
            "Assume tools are needed for any important task",
            "Use the smallest workflow that can answer the question well",
            "Open as many systems as possible so nothing is missed",
            "Treat tool output as more trustworthy than reasoning",
          ],
          correctIndex: 1,
          explanation:
            "Good judgment starts from proportionality. Simpler paths are better unless a real evidence gap requires more.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "MCP hurts when it replaces judgment with motion.",
      note:
        "Default to the smallest workflow that can do the job well. The final lesson in this section shows one of the strongest high-value cases for tools: browser automation and verification.",
    },
  ],
};

export default config;
