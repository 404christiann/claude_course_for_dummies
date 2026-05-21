import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "the-agentic-loop",
  title: "The Agentic Loop",
  section: 1,
  duration: "7 min",
  objectives: [
    "Name the three phases Claude Code goes through on every task",
    "Explain why verification is the step most people skip",
    "Write a task prompt that includes all three phases",
  ],
  blocks: [
    {
      type: "hook",
      headline: "Every Claude Code task follows the same three-step loop.",
      subtext:
        "Gather context, take action, verify the result. Miss any one of those steps and you get guesswork instead of engineering.",
    },
    {
      type: "diagram",
      title: "The Gather → Act → Verify Loop",
      steps: [
        {
          id: "gather",
          label: "Gather",
          headline: "Read before writing",
          color: "teal",
          explanation:
            "Claude Code reads the files, imports, tests, and configs relevant to your task before touching anything. This is how it avoids breaking code it didn't mean to change.",
          example:
            'You: "Add rate limiting to the API."\n\nClaude Code reads: routes/api.ts, middleware/auth.ts,\npackage.json (checks for existing rate-limit libs),\nand the existing test suite.',
        },
        {
          id: "act",
          label: "Act",
          headline: "Make the targeted change",
          color: "amber",
          explanation:
            "Once it understands the context, Claude Code writes or edits code. It targets the smallest change that solves the problem — not a rewrite of everything it touched.",
          example:
            "Claude Code installs express-rate-limit, adds\nthe middleware in the right place, and updates\nthe relevant types — nothing more.",
        },
        {
          id: "verify",
          label: "Verify",
          headline: "Prove it works",
          color: "violet",
          explanation:
            "Claude Code runs your tests, checks the types, or does whatever verification step you specified. If something fails, it loops back to Gather — reads the error, understands it, tries again.",
          example:
            'Runs: npm test -- --grep "rate limit"\n\nAll 3 tests pass.\nReports back: "Done — rate limiting added, tests green."',
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Run the loop on a real task",
      description:
        "You are guiding Claude Code through a small bug fix. Choose the next best move at each point so the session stays grounded and actually closes the loop.",
      steps: [
        {
          id: "sim-gather",
          label: "Gather",
          context:
            "A learner reports that the newsletter form says 'Thanks for subscribing' even when the email field is blank.",
          prompt: "claude",
          terminal:
            'You: Fix the newsletter form bug where it shows a success message for blank emails.\n\nClaude Code: I can help. Before I change anything, I need to inspect the form component and the related submit logic.',
          question: "What should Claude Code do first?",
          choices: [
            {
              id: "gather-read",
              label:
                "Read the newsletter form component, its submit handler, and any existing validation tests",
              rationale:
                "This gives Claude Code the real behavior, the real files, and the current safety net before it edits anything.",
            },
            {
              id: "gather-edit",
              label: "Start adding a regex check directly in the component right away",
            },
            {
              id: "gather-report",
              label: "Reply that the bug is probably caused by missing frontend validation",
            },
          ],
          correctChoiceId: "gather-read",
          explanation:
            "Gather comes first. Claude Code should inspect the actual files and tests before deciding what the bug is or how to fix it.",
          hint:
            "The best next move is the one that reduces guessing before any code changes happen.",
        },
        {
          id: "sim-act",
          label: "Act",
          context:
            "Claude Code has now read `NewsletterForm.tsx` and sees the submit handler sets success state before checking whether the trimmed email is empty.",
          prompt: "claude",
          terminal:
            "Claude Code read:\n- components/NewsletterForm.tsx\n- lib/newsletter/submit.ts\n- newsletter form tests\n\nFinding: success state is set before the empty-email guard.\n\nClaude Code: I found the issue. The blank-email path needs to return before success state is set.",
          question: "What is the best action now?",
          choices: [
            {
              id: "act-targeted",
              label:
                "Move the empty-email guard ahead of the success state and keep the rest of the flow unchanged",
              rationale:
                "This is a targeted fix: it addresses the specific behavior without rewriting the form or changing unrelated logic.",
            },
            {
              id: "act-rewrite",
              label: "Rewrite the entire form submission flow to use a new validation library",
            },
            {
              id: "act-more-research",
              label: "Stop and scan the rest of the app for every other form before fixing this one",
            },
          ],
          correctChoiceId: "act-targeted",
          explanation:
            "Act should be the smallest useful change that solves the discovered problem. This keeps the session focused and reduces the chance of collateral breakage.",
          hint:
            "Pick the option that fixes the reported bug with the least unnecessary surface area.",
        },
        {
          id: "sim-verify",
          label: "Verify",
          context:
            "The code change is in place. Now Claude Code needs to prove the fix works instead of just describing what it changed.",
          prompt: "claude",
          terminal:
            'Patch applied to `components/NewsletterForm.tsx`.\n\nClaude Code: The blank-email guard now returns before the success message is set.\n\nClaude Code: Next I should confirm the bug is fixed and nothing nearby broke.',
          question: "How should Claude Code close the loop?",
          choices: [
            {
              id: "verify-tests",
              label:
                "Run the existing newsletter form tests or the relevant validation check, then report whether they pass",
              rationale:
                "Verification turns 'I changed it' into 'I proved it works,' which is what makes the loop reliable.",
            },
            {
              id: "verify-summary",
              label: "Stop here and summarize the fix without running anything",
            },
            {
              id: "verify-ship",
              label: "Mark the task done because the code looks correct on inspection",
            },
          ],
          correctChoiceId: "verify-tests",
          explanation:
            "Verify is what closes the loop. Claude Code should run the relevant check, see the result, and only then claim the task is done.",
          hint:
            "The right answer includes an observable signal, not just confidence in the code change.",
        },
      ],
      completionMessage:
        "You just ran the full loop: read the right context, make the smallest useful change, then prove it worked. That pattern is what separates agentic engineering from educated guessing.",
    },
    {
      type: "explanation",
      paragraphs: [
        "The loop is simple, but most people unintentionally skip the Verify step when writing prompts. They describe what they want done, but don't tell Claude Code how to confirm it worked. Without a verification step, Claude Code can only report what it tried — not what it achieved.",
        "The mini-simulation above shows the practical rhythm: read the real context first, make the smallest change that fits the evidence, then look for a concrete signal that proves the result. That is the full Gather → Act → Verify loop in action.",
        "The more explicitly you define the verification, the more reliable the result. 'Add validation' is a task. 'Add validation and run the existing form tests' is a task with a loop.",
      ],
      engineerDepth: [
        "Internally, the loop corresponds to Claude Code's tool-use sequence: file-reading tools (Gather), edit/shell tools (Act), and test/shell tools (Verify). Each call is visible in your terminal as it happens, so you can interrupt mid-loop if you see the wrong direction.",
        "The loop can recurse. If the Verify step fails, Claude Code treats the error output as new Gather input and re-enters the loop. You can watch this happen in real time — Claude Code will explain what the error means and what it's going to try differently.",
      ],
    },
    {
      type: "comparison",
      title: "Weak prompt vs. loop-complete prompt",
      left: {
        label: "No verification step",
        content: "Fix the bug in the checkout flow.",
        annotations: [
          "Claude Code doesn't know how to confirm it worked",
          "No existing tests? It might not run any",
          "You won't know if it introduced a regression",
        ],
      },
      right: {
        label: "Loop-complete prompt",
        content:
          "Fix the bug in the checkout flow where the total doesn't update when a coupon is applied. Run the existing checkout tests afterward and confirm they pass.",
        annotations: [
          "Gather: checkout flow + coupon logic are the scope",
          "Act: fix the specific described behaviour",
          "Verify: run tests, report pass/fail",
        ],
      },
      insight:
        "The second prompt doesn't just describe the problem — it closes the loop. Claude Code knows what 'done' looks like, which means it can tell you when it gets there (or when it can't).",
    },
    {
      type: "classification",
      title: "Gather, Act, or Verify?",
      instruction:
        "Each line describes something Claude Code does during a task. Sort each one into the correct phase.",
      categories: [
        { id: "gather", label: "Gather", color: "teal" },
        { id: "act", label: "Act", color: "amber" },
        { id: "verify", label: "Verify", color: "violet" },
      ],
      items: [
        {
          id: "i1",
          text: "Reads your existing test file to understand what's already covered",
          correctCategory: "gather",
        },
        {
          id: "i2",
          text: "Edits the component to fix the broken prop type",
          correctCategory: "act",
        },
        {
          id: "i3",
          text: "Runs npm test and checks that all tests pass",
          correctCategory: "verify",
        },
        {
          id: "i4",
          text: "Checks package.json to see which version of React is installed",
          correctCategory: "gather",
        },
        {
          id: "i5",
          text: "Writes a new API route handler in routes/payments.ts",
          correctCategory: "act",
        },
        {
          id: "i6",
          text: "Runs the TypeScript compiler to check for type errors",
          correctCategory: "verify",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Write a loop-complete prompt",
      description:
        "Fill in all three parts to assemble a prompt that gives Claude Code a full Gather → Act → Verify loop.",
      fields: [
        {
          id: "task",
          label: "What to do",
          placeholder: "e.g. add input validation to the signup form",
          hint: "Describe the change you want made.",
        },
        {
          id: "location",
          label: "Where to look",
          placeholder: "e.g. components/SignupForm.tsx and its related tests",
          hint: "Name the file(s) or area Claude Code should read first.",
        },
        {
          id: "verify",
          label: "How to verify",
          placeholder: "e.g. run the existing form tests and confirm they pass",
          hint: "Tell Claude Code how to confirm it worked.",
        },
      ],
      template:
        "{task}.\n\nStart by reading {location}.\n\nOnce done, {verify}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "A developer asks Claude Code: 'Refactor the payment module.' What critical part of the agentic loop is missing from this prompt?",
          options: [
            "The Gather step — no files are specified for Claude Code to read",
            "The Act step — the task doesn't say what kind of refactor to do",
            "The Verify step — there's no way for Claude Code to confirm the refactor worked",
            "Nothing is missing — Claude Code can figure out the rest on its own",
          ],
          correctIndex: 2,
          explanation:
            "Without a verification step, Claude Code has no way to confirm the refactor succeeded or didn't break anything. Adding 'run the existing payment tests afterward' closes the loop.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "Gather → Act → Verify. The loop only works when all three steps are present.",
      note: "Next time you write a Claude Code prompt, check for the verification step before you hit enter.",
    },
  ],
};

export default config;
