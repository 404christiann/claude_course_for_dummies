import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "what-mcp-is",
  title: "What MCP Is",
  section: 5,
  duration: "8 min",
  objectives: [
    "Explain MCP in plain language as a bridge between Claude Code and external tools or data sources",
    "Recognize the core MCP flow: request, tool boundary, returned result, and next action",
    "Write a prompt that asks Claude Code to use a tool intentionally instead of vaguely hoping it will know more",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "MCP matters because Claude Code becomes far more useful when it can reach the right tool at the right time.",
      subtext:
        "Without tools, Claude Code can only reason over the context already in front of it. With MCP, it can ask connected systems for fresh information or take a specific action through a defined boundary.",
    },
    {
      type: "diagram",
      title: "The simple MCP flow",
      steps: [
        {
          id: "request",
          label: "Request",
          headline: "Start with a real need",
          color: "teal",
          explanation:
            "An MCP interaction begins when the task needs something outside the current conversation, such as a file search, a browser check, or live data from another system.",
          example:
            "Example: 'Check the latest deployment log' or 'Open the local lesson page and verify the checkpoint renders.'",
        },
        {
          id: "boundary",
          label: "Boundary",
          headline: "Use a defined tool instead of guessing",
          color: "blue",
          explanation:
            "MCP gives Claude Code a structured way to ask a tool for help. That is safer and clearer than inventing facts or pretending it can see a system it cannot access directly.",
          example:
            "Example: use the browser tool to inspect a page instead of describing how the page probably looks.",
        },
        {
          id: "result",
          label: "Result",
          headline: "Bring back evidence",
          color: "amber",
          explanation:
            "The tool returns something concrete: search results, page content, logs, a screenshot, or another structured result Claude Code can reason over.",
          example:
            "Example: the browser tool returns the visible UI state and any console errors instead of a guess.",
        },
        {
          id: "act",
          label: "Act",
          headline: "Use the result to decide the next move",
          color: "violet",
          explanation:
            "MCP is not the goal by itself. The point is to use the returned evidence to make a better plan, produce a safer edit, or verify the work more confidently.",
          example:
            "Example: after reading the deployment log, Claude Code decides whether to fix a build issue or move on.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "See the difference between reasoning alone and reasoning with a tool",
      description:
        "You are helping Claude Code answer a real task. Choose when a tool boundary is needed instead of a purely text-based answer.",
      steps: [
        {
          id: "sim-need",
          label: "Need",
          context:
            "A teammate asks, 'Can you verify the lesson page actually renders correctly on localhost right now?'",
          prompt: "claude",
          terminal:
            "Teammate: Can you verify the lesson page actually renders correctly on localhost right now?\n\nClaude Code: I can explain what should render, but if the task is to verify the current page state, I need fresh evidence from a tool instead of relying on expectations.",
          question: "What is the strongest response?",
          choices: [
            {
              id: "need-tool",
              label:
                "Use a browser tool to inspect the running page because current visual state is outside the chat context",
              rationale:
                "This reaches for the right source of truth instead of guessing from code alone.",
            },
            {
              id: "need-guess",
              label:
                "Assume the page renders if the component code looks reasonable",
            },
            {
              id: "need-generalize",
              label:
                "Answer with generic browser troubleshooting tips without checking the page",
            },
          ],
          correctChoiceId: "need-tool",
          explanation:
            "MCP is useful when the task depends on information Claude Code cannot already see. Current UI state is one of the clearest examples.",
          hint:
            "Pick the option that closes the evidence gap instead of talking around it.",
        },
        {
          id: "sim-boundary",
          label: "Boundary",
          context:
            "Claude Code knows it needs a tool, but the request should still stay focused.",
          prompt: "claude",
          terminal:
            "Claude Code: I should ask the browser tool for the page state I need, not launch a broad unrelated investigation.",
          question: "Which tool request is best?",
          choices: [
            {
              id: "boundary-specific",
              label:
                "Open the lesson page, confirm the core blocks render, and note any console errors or broken interactions",
              rationale:
                "This request is specific enough to produce useful evidence without expanding the scope.",
            },
            {
              id: "boundary-broad",
              label:
                "Inspect the whole site and report every possible issue you can find",
            },
            {
              id: "boundary-vague",
              label:
                "Check whatever seems important and let me know what happens",
            },
          ],
          correctChoiceId: "boundary-specific",
          explanation:
            "Good MCP use still needs scope. The tool should be pointed at a real question, not used as an excuse to wander.",
          hint: "Choose the option with a concrete verification target.",
        },
        {
          id: "sim-result",
          label: "Result",
          context:
            "The browser tool returns a concrete page state and reveals one missing checkpoint block.",
          prompt: "claude",
          terminal:
            "Browser result:\n- Lesson page loads\n- Hook and diagram render\n- Checkpoint block is missing from the bottom of the lesson\n- No console errors\n\nClaude Code: Now I have evidence instead of a hunch.",
          question: "What should Claude Code do with that result?",
          choices: [
            {
              id: "result-use",
              label:
                "Use the tool result to update the diagnosis and next step, such as checking whether the lesson config or registry wiring caused the missing block",
              rationale:
                "The evidence should directly shape the next action.",
            },
            {
              id: "result-ignore",
              label:
                "Ignore the result and continue with the original assumption about the page",
            },
            {
              id: "result-repeat",
              label:
                "Keep re-running the same browser check without narrowing the issue",
            },
          ],
          correctChoiceId: "result-use",
          explanation:
            "Tool use only creates value when the returned evidence changes your next move. MCP is about informed action, not tool activity for its own sake.",
          hint:
            "Pick the option that turns evidence into a sharper plan.",
        },
      ],
      completionMessage:
        "You just used MCP the right way: identify the evidence gap, choose a focused tool request, then let the returned result drive the next step.",
    },
    {
      type: "explanation",
      paragraphs: [
        "In plain English, MCP is the layer that lets Claude Code use connected tools and data sources through a structured interface. It is how the agent moves from only reading the current conversation to interacting with the outside systems that matter for the task.",
        "This matters because many real tasks depend on fresh information. A deployment status, a browser state, a file search, or a support system lookup may all live outside the prompt. MCP gives Claude Code a safe way to ask for that information instead of improvising.",
        "For non-engineers, the easiest mental model is simple: Claude Code is the reasoner, and MCP is the tool bridge. For engineers, the important idea is that the tool boundary is explicit, which makes access, outputs, and scope far more reliable than hidden magic.",
      ],
      engineerDepth: [
        "You do not need to memorize protocol details to use MCP well in practice. What matters most is knowing when your task needs external evidence and which tool boundary can provide it.",
        "The best prompts usually name both the task and the expected tool behavior: what to check, where to look, and what counts as a useful result.",
      ],
    },
    {
      type: "comparison",
      title: "Treating Claude Code like it already knows vs. asking it to use a tool",
      left: {
        label: "Weak assumption",
        content:
          "Can you tell me whether the lesson page is broken and whether the latest deployment succeeded?",
        annotations: [
          "Assumes Claude Code already has fresh runtime and deployment knowledge",
          "Does not point to a tool or source of evidence",
          "Makes guessing more likely than verification",
        ],
      },
      right: {
        label: "Strong MCP-aware request",
        content:
          "Use the browser tool to verify the lesson page on localhost and use the deployment or log tool to check the latest build status. Summarize the evidence before suggesting fixes.",
        annotations: [
          "Names the needed tools and sources of truth",
          "Separates visual verification from deployment verification",
          "Asks for evidence before conclusions",
        ],
      },
      insight:
        "The stronger version does not make Claude Code smarter by wording alone. It makes the evidence path explicit.",
    },
    {
      type: "classification",
      title: "Needs MCP or can stay in-chat?",
      instruction:
        "Sort each task based on whether it depends on an external tool or can be handled from the existing lesson context alone.",
      categories: [
        { id: "mcp", label: "Needs MCP", color: "teal" },
        { id: "chat", label: "Can stay in chat", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Verify how a localhost lesson page looks right now",
          correctCategory: "mcp",
        },
        {
          id: "i2",
          text: "Explain the difference between a hook block and a checkpoint block",
          correctCategory: "chat",
        },
        {
          id: "i3",
          text: "Check the latest deployment log for a build failure",
          correctCategory: "mcp",
        },
        {
          id: "i4",
          text: "Rewrite a vague lesson objective into clearer language",
          correctCategory: "chat",
        },
        {
          id: "i5",
          text: "Search a large repo for the exact file that renders the lesson footer",
          correctCategory: "mcp",
        },
        {
          id: "i6",
          text: "Compare two prompt phrasings already shown inside the lesson",
          correctCategory: "chat",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Ask for tool use without being vague",
      description:
        "Use this template when the task depends on information or actions outside the current conversation.",
      fields: [
        {
          id: "goal",
          label: "Task goal",
          placeholder:
            "e.g. verify whether the lesson page renders correctly on localhost",
          hint: "State the outcome you need, not just the general topic.",
        },
        {
          id: "tool",
          label: "Tool or source",
          placeholder: "e.g. browser tool, repo search tool, deployment logs",
          hint: "Name the best evidence path if you know it.",
        },
        {
          id: "scope",
          label: "What to check",
          placeholder:
            "e.g. confirm the hook, checkpoint, and takeaway render with no console errors",
          hint: "Keep the request focused so the result is actionable.",
        },
        {
          id: "output",
          label: "What to report back",
          placeholder:
            "e.g. summarize the evidence first, then suggest the most likely next step",
          hint: "Define the format of the answer you want back.",
        },
      ],
      template:
        "Use the {tool} to help with this task: {goal}. Focus on: {scope}. Then {output}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question: "What is the simplest practical definition of MCP in this course?",
          options: [
            "A way to make prompts sound more technical",
            "A bridge that lets Claude Code use connected tools and data sources through a defined interface",
            "A replacement for planning and verification",
            "A feature only engineers need to care about",
          ],
          correctIndex: 1,
          explanation:
            "MCP matters because it gives Claude Code a structured tool boundary for tasks that require external evidence or actions.",
        },
        {
          question:
            "When does a task most clearly call for MCP instead of a text-only answer?",
          options: [
            "When you want Claude Code to sound more confident",
            "When the answer depends on current information or systems outside the prompt",
            "When the task feels complicated even if all the needed context is already present",
            "When you want a longer explanation",
          ],
          correctIndex: 1,
          explanation:
            "The signal is not complexity alone. The real signal is an evidence gap that lives outside the current chat context.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "MCP is the bridge that lets Claude Code stop guessing and start checking.",
      note:
        "Use it when the task needs outside evidence. The next lesson is about recognizing the situations where that bridge creates the biggest payoff.",
    },
  ],
};

export default config;
