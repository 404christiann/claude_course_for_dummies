import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "browser-automation",
  title: "Browser Automation and Verification Workflows",
  section: 5,
  duration: "9 min",
  objectives: [
    "Explain why browser automation is one of the highest-value tool workflows in an interactive product",
    "Recognize a practical verify flow: open, inspect, interact, confirm, and report",
    "Write a verification prompt that keeps browser checks targeted and useful",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Reading code can tell you what should happen. Browser verification tells you what did happen.",
      subtext:
        "That difference matters a lot in interactive products. Browser automation is one of the most practical MCP workflows because it helps Claude Code verify real UI behavior instead of stopping at theory.",
    },
    {
      type: "diagram",
      title: "A practical browser verification loop",
      steps: [
        {
          id: "open",
          label: "Open",
          headline: "Go to the exact surface that matters",
          color: "teal",
          explanation:
            "Start at the real route or page tied to the task. Verification gets weaker when the browser check is broad or disconnected from the assignment.",
          example:
            "Example: open the specific lesson page you just changed instead of browsing the app casually.",
        },
        {
          id: "inspect",
          label: "Inspect",
          headline: "Check the important state first",
          color: "blue",
          explanation:
            "Look for the core evidence quickly: does the page load, do the expected blocks appear, and are there any obvious console or render failures?",
          example:
            "Example: confirm the hook, diagram, checkpoint, and takeaway are present before going deeper.",
        },
        {
          id: "interact",
          label: "Interact",
          headline: "Trigger the behavior that matters",
          color: "amber",
          explanation:
            "Interactive products need more than static inspection. Click, advance, or input the specific action the learner would perform.",
          example:
            "Example: progress through a mini-simulation and confirm the next step reveals correctly.",
        },
        {
          id: "report",
          label: "Report",
          headline: "Turn observations into a usable result",
          color: "violet",
          explanation:
            "The final step is not a screenshot dump. Summarize what passed, what failed, and what the next action should be if something broke.",
          example:
            "Example: 'Page loaded, checkpoint works, mini-simulation stalls on step 2, no console errors.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Run a targeted browser verification pass",
      description:
        "You just updated a lesson config in the course app. Choose the best move at each step so Claude Code verifies the real learner experience without drifting into a full site audit.",
      steps: [
        {
          id: "sim-open",
          label: "Open",
          context:
            "The assignment was to update one lesson in Section 5, and now the team wants a quick browser verification.",
          prompt: "claude",
          terminal:
            "Team request: Please verify the new Section 5 lesson page.\n\nClaude Code: I should open the exact lesson route I changed, not wander through unrelated pages first.",
          question: "What is the strongest first move?",
          choices: [
            {
              id: "open-targeted",
              label:
                "Open the specific Section 5 lesson page that was edited and start there",
              rationale:
                "This keeps verification tied to the actual scope of work.",
            },
            {
              id: "open-random",
              label:
                "Open a few random pages to build a general impression of the app",
            },
            {
              id: "open-everything",
              label:
                "Crawl every lesson page before checking the one you changed",
            },
          ],
          correctChoiceId: "open-targeted",
          explanation:
            "Strong browser automation stays aligned with the exact task boundary. Verification gets weaker when the target surface is vague.",
          hint:
            "Choose the option that produces the fastest relevant evidence.",
        },
        {
          id: "sim-inspect",
          label: "Inspect",
          context:
            "The lesson page loads. You now need the first proof that the basic content shape is intact.",
          prompt: "claude",
          terminal:
            "Browser view:\n- Page loads\n- Header visible\n- Lesson body rendered\n\nClaude Code: Before I click deeper, I should confirm the expected lesson blocks are present and note any obvious errors.",
          question: "What should Claude Code inspect first?",
          choices: [
            {
              id: "inspect-core",
              label:
                "Verify the expected core blocks and scan for visible errors or missing sections",
              rationale:
                "This confirms the lesson structure before testing interactions.",
            },
            {
              id: "inspect-style",
              label:
                "Spend most of the pass comparing small spacing details on unrelated parts of the page",
            },
            {
              id: "inspect-global",
              label:
                "Jump to other routes immediately because this page already loaded",
            },
          ],
          correctChoiceId: "inspect-core",
          explanation:
            "Inspection should first answer the biggest question: did the target page render the expected content shape correctly?",
          hint:
            "Pick the option that confirms the main learning surface before polishing concerns.",
        },
        {
          id: "sim-interact",
          label: "Interact",
          context:
            "The page structure looks right, but the lesson includes an interactive checkpoint and a mini-simulation.",
          prompt: "claude",
          terminal:
            "Claude Code: Static rendering is not enough here. I need to interact with the page the way a learner would.",
          question: "Which interaction pass is best?",
          choices: [
            {
              id: "interact-key",
              label:
                "Advance the mini-simulation and checkpoint through their core path, then note whether they respond correctly",
              rationale:
                "This tests the highest-value learner interactions without expanding the scope.",
            },
            {
              id: "interact-all",
              label:
                "Test every possible page behavior even if it is unrelated to the lesson task",
            },
            {
              id: "interact-none",
              label:
                "Skip interaction because the components probably work if they rendered once",
            },
          ],
          correctChoiceId: "interact-key",
          explanation:
            "Interactive lessons require interaction-based verification. Rendering alone cannot prove the learner flow works.",
          hint:
            "Choose the option that matches the real experience a learner would have.",
        },
        {
          id: "sim-report",
          label: "Report",
          context:
            "The browser pass is complete and you found one broken checkpoint transition.",
          prompt: "claude",
          terminal:
            "Verification result:\n- Page loads\n- Core blocks present\n- Mini-simulation advances correctly\n- Checkpoint transition breaks after answer selection\n- No console errors\n\nClaude Code: I should turn this into a concise verification summary that helps the next action happen quickly.",
          question: "What is the best closeout?",
          choices: [
            {
              id: "report-concise",
              label:
                "Summarize what passed, what failed, and the likely next debugging area without padding the report with unrelated detail",
              rationale:
                "A useful verification report creates momentum toward the next fix.",
            },
            {
              id: "report-dump",
              label:
                "Paste every browser observation in raw form and let the team sort it out",
            },
            {
              id: "report-hide",
              label:
                "Report only that the page mostly works so the update can move forward",
            },
          ],
          correctChoiceId: "report-concise",
          explanation:
            "Verification is strongest when it produces a focused, actionable handoff instead of either noise or false reassurance.",
          hint:
            "Pick the answer that makes the next debugging move easier.",
        },
      ],
      completionMessage:
        "You just practiced a real browser verification workflow: open the exact target, inspect the key state, interact with the critical path, and report only the evidence that matters.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Browser automation is one of the strongest MCP workflows in this course because interactive products are full of things code alone cannot fully prove. A lesson page may compile and still fail the learner if a checkpoint does not advance or a block quietly disappears.",
        "That is why browser verification belongs in the agentic loop. It gives Claude Code a way to compare expectation against reality. The goal is not to inspect everything. The goal is to verify the exact surface and behavior that the task changed.",
        "This workflow also supports both audiences well. Non-engineers get confidence that the visible experience was actually checked. Engineers get a targeted way to catch UI and flow regressions before broader handoff or deployment.",
      ],
      engineerDepth: [
        "The highest-value browser checks are usually narrow and hypothesis-driven: one route, one interaction path, one success condition. Broad exploratory browsing often produces more noise than signal.",
        "A good verification report usually includes page load status, key UI presence, interaction result, visible errors, and the smallest plausible next debugging area if something failed.",
      ],
    },
    {
      type: "comparison",
      title: "Code-only confidence vs. verified confidence",
      left: {
        label: "Code-only confidence",
        content:
          "The lesson config looks correct, so the page should probably work.",
        annotations: [
          "Describes expectation, not observed behavior",
          "Misses rendering and interaction regressions",
          "Can sound reassuring without real evidence",
        ],
      },
      right: {
        label: "Verified confidence",
        content:
          "I opened the lesson route, confirmed the core blocks render, advanced the mini-simulation, and found one checkpoint transition bug with no console errors.",
        annotations: [
          "Grounded in observed page behavior",
          "Separates what passed from what failed",
          "Creates a sharper next debugging step",
        ],
      },
      insight:
        "Browser automation is valuable because it upgrades confidence from probable to observed.",
    },
    {
      type: "prompt-builder",
      title: "Write a focused browser verification prompt",
      description:
        "Use this when you want Claude Code to verify the real learner experience without turning the check into a vague site audit.",
      fields: [
        {
          id: "surface",
          label: "Target surface",
          placeholder:
            "e.g. the Section 5 browser automation lesson page on localhost",
          hint: "Name the exact route or page you want checked.",
        },
        {
          id: "coreChecks",
          label: "Core checks",
          placeholder:
            "e.g. page loads, expected lesson blocks appear, no visible errors",
          hint: "Start with the basic evidence you need first.",
        },
        {
          id: "interaction",
          label: "Critical interaction",
          placeholder:
            "e.g. advance the mini-simulation and answer the checkpoint once",
          hint: "Include the learner action that matters most.",
        },
        {
          id: "report",
          label: "Report format",
          placeholder:
            "e.g. summarize what passed, what failed, and the likely next debugging area",
          hint: "Ask for a concise result, not a raw observation dump.",
        },
      ],
      template:
        "Use browser automation to verify {surface}. Check that {coreChecks}. Then {interaction}, and {report}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question: "Why is browser automation such a strong MCP workflow in this course?",
          options: [
            "Because it makes the app feel more advanced",
            "Because it can verify actual UI behavior that code reading alone cannot fully prove",
            "Because it should replace all other forms of validation",
            "Because only engineers can understand it",
          ],
          correctIndex: 1,
          explanation:
            "Browser verification is powerful because it checks observed behavior, especially in interactive products.",
        },
        {
          question: "What makes a browser verification request strongest?",
          options: [
            "It asks the tool to look for anything interesting across the whole site",
            "It targets one surface, checks the key state, tests the critical interaction, and reports concise evidence",
            "It focuses mostly on decorative details before checking functionality",
            "It assumes interaction works if the page loaded once",
          ],
          correctIndex: 1,
          explanation:
            "The best browser checks are narrow, evidence-driven, and tied directly to the learner behavior that matters.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "Browser automation is one of the clearest ways Claude Code can verify reality instead of only predicting it.",
      note:
        "Use it like a focused verification instrument: target the exact route, test the critical path, and report evidence that helps the next action happen quickly.",
    },
  ],
};

export default config;
