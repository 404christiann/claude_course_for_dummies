import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "worktrees",
  title: "Worktrees and Safe Parallel Isolation",
  section: 6,
  duration: "7 min",
  objectives: [
    "Explain why worktrees make parallel AI work safer than sharing one messy branch",
    "Recognize the setup pattern that keeps tasks isolated by directory, branch, and goal",
    "Write a scoped prompt that tells Claude Code when to use a separate worktree and what to keep inside it",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "Parallel work only feels fast when each task has its own safe lane.",
      subtext:
        "Worktrees give Claude Code separate directories for separate jobs. That means fewer collisions, cleaner reviews, and a much lower chance that one experiment leaks into another task.",
    },
    {
      type: "diagram",
      title: "Safe parallel setup in four moves",
      steps: [
        {
          id: "split",
          label: "Split",
          headline: "Give each job its own workspace",
          color: "teal",
          explanation:
            "A worktree creates another checked-out copy of the repo tied to its own branch. Each task gets its own place to work instead of competing inside one directory.",
          example:
            "Example: keep the main course app untouched while a new lesson draft lives in a separate worktree folder.",
        },
        {
          id: "name",
          label: "Name",
          headline: "Match the branch to the task",
          color: "blue",
          explanation:
            "Clear names reduce confusion when several agents or teammates are moving at once. The branch and directory should make the assignment obvious.",
          example:
            "Example: `section-6-worktrees` is easier to review than `test-branch-2`.",
        },
        {
          id: "contain",
          label: "Contain",
          headline: "Keep each change inside its lane",
          color: "amber",
          explanation:
            "Isolation only works if the task stays scoped. Claude Code should not drift into unrelated files just because they are nearby.",
          example:
            "Example: one worktree owns the Section 6 lesson file, while another handles registry wiring later.",
        },
        {
          id: "compare",
          label: "Compare",
          headline: "Review clean diffs before merging",
          color: "violet",
          explanation:
            "The payoff of worktrees is clean comparison. You can evaluate one task at a time instead of untangling overlapping edits from a shared branch.",
          example:
            "Example: review the lesson-content branch separately from the branch that adds validation or registration.",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Choose the safer parallel setup",
      description:
        "You have two AI tasks at once: drafting a new lesson and experimenting with a separate validation script. Choose the setup that keeps the work parallel without letting the changes bleed together.",
      steps: [
        {
          id: "sim-need",
          label: "Need",
          context:
            "Both tasks touch the same repo, but they have different goals and may finish at different times.",
          prompt: "claude",
          terminal:
            "Task A: write the new interactive lesson config.\nTask B: test a validation workflow that may get thrown away.\n\nClaude Code: If I do both inside one branch and one directory, the session may become hard to review and harder to unwind.",
          question: "What is the strongest first move?",
          choices: [
            {
              id: "need-worktrees",
              label:
                "Create separate worktrees so each task has its own directory and branch before either task begins",
              rationale:
                "This creates clean isolation up front and keeps experimentation from contaminating the shipping task.",
            },
            {
              id: "need-one-branch",
              label:
                "Keep both tasks in one branch and rely on careful memory to remember which files belong to which idea",
            },
            {
              id: "need-main",
              label:
                "Do the safer task first on the main branch and hope the second task stays small",
            },
          ],
          correctChoiceId: "need-worktrees",
          explanation:
            "Worktrees shine when multiple tasks need to move in parallel. The safest setup is separate directories and branches before the overlap begins.",
          hint:
            "Choose the option that reduces merge risk instead of asking the human to mentally track it all.",
        },
        {
          id: "sim-scope",
          label: "Scope",
          context:
            "The lesson-writing worktree is ready. Claude Code now sees a registry file that also needs an update before the lesson can appear in the app.",
          prompt: "claude",
          terminal:
            "Owned worktree: `section-6-worktrees`\nOwned task: create the lesson file only\n\nClaude Code: I can see the next dependency, but that does not mean I should expand this worktree's assignment.",
          question: "How should Claude Code respond?",
          choices: [
            {
              id: "scope-contain",
              label:
                "Finish the owned lesson file in this worktree, then note registry wiring as a separate follow-up or a different worktree",
              rationale:
                "This keeps the branch honest and preserves the reason the worktree exists in the first place.",
            },
            {
              id: "scope-expand",
              label:
                "Update the registry here too, since the file is already visible and the branch is open",
            },
            {
              id: "scope-refactor",
              label:
                "Refactor adjacent lesson files so the whole section feels more consistent before reporting back",
            },
          ],
          correctChoiceId: "scope-contain",
          explanation:
            "Worktrees are not just about extra folders. They are about preserving task boundaries so each unit of work stays easy to review and merge.",
          hint:
            "Pick the answer that keeps the branch purpose narrow and legible.",
        },
        {
          id: "sim-close",
          label: "Close",
          context:
            "The lesson branch is complete. Another agent handled the validation experiment in a separate worktree.",
          prompt: "claude",
          terminal:
            "Worktree A: lesson content complete\nWorktree B: validation experiment still under review\n\nClaude Code: I should report the lesson branch clearly without mixing in unverified work from the other branch.",
          question: "What is the best close-out?",
          choices: [
            {
              id: "close-clean",
              label:
                "Summarize the exact file changed in this worktree, what was verified here, and what remains in the other branch",
              rationale:
                "This keeps evidence and ownership separated, which is the whole point of parallel isolation.",
            },
            {
              id: "close-combine",
              label:
                "Present both branches as one finished outcome so the overall project sounds more complete",
            },
            {
              id: "close-ignore",
              label:
                "Only mention the lesson branch and omit the still-open follow-up in the other worktree",
            },
          ],
          correctChoiceId: "close-clean",
          explanation:
            "Parallel isolation only helps if the reporting stays isolated too. Clean branch-level summaries make later review and merge decisions much easier.",
          hint:
            "Choose the option that preserves branch truth instead of polishing over uncertainty.",
        },
      ],
      completionMessage:
        "You used worktrees the right way: separate the jobs, contain the scope, and report each branch on its own terms.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A worktree is a second working copy of the same repository connected to a different branch. In plain English, it gives Claude Code another safe desk to work from without disturbing the first one.",
        "This matters once AI work starts to scale. One agent may be writing lesson content while another tests a validation command or explores a risky idea. If both live in the same branch, the cleanup cost rises fast.",
        "For non-engineers, the core idea is simple: one task, one lane. For engineers, the deeper benefit is operational clarity. Separate worktrees produce cleaner diffs, simpler reviews, and fewer accidental collisions.",
      ],
      engineerDepth: [
        "Worktrees are especially valuable when a task is long-running, experimental, or likely to wait on review while other work continues. They reduce branch thrash and make it easier to compare, test, or discard one path without disturbing another.",
        "The mistake to avoid is thinking a worktree alone guarantees safety. The branch still needs a clear goal, clear file ownership, and a clean close-out.",
      ],
    },
    {
      type: "comparison",
      title: "Shared branch chaos vs. isolated worktree flow",
      left: {
        label: "Everything in one branch",
        content:
          "Draft the lesson, test a validation script, and wire the registry in the same directory so nothing gets forgotten.",
        annotations: [
          "Overlapping changes become hard to review",
          "Experimental work can contaminate shipping work",
          "Rollback and ownership both get blurry",
        ],
      },
      right: {
        label: "Separate worktrees by task",
        content:
          "Keep the lesson draft in its own worktree and branch. Put validation experiments or follow-up wiring in separate worktrees with their own summaries and review path.",
        annotations: [
          "Each branch has one clear purpose",
          "Experiments stay easy to discard or revisit",
          "Reviews and merges stay cleaner",
        ],
      },
      insight:
        "The safer setup is not the one with fewer folders. It is the one with less ambiguity.",
    },
    {
      type: "classification",
      title: "Good candidate for a separate worktree or not necessary yet?",
      instruction:
        "Sort each scenario based on whether it clearly benefits from separate parallel isolation.",
      categories: [
        { id: "yes", label: "Use a worktree", color: "teal" },
        { id: "no", label: "Same workspace is fine", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "A risky experiment that may be thrown away while the main task still needs to ship cleanly",
          correctCategory: "yes",
        },
        {
          id: "i2",
          text: "A tiny wording tweak in the only file you are already editing",
          correctCategory: "no",
        },
        {
          id: "i3",
          text: "Two agents working on different repo slices at the same time",
          correctCategory: "yes",
        },
        {
          id: "i4",
          text: "A single short task with no meaningful chance of branch overlap",
          correctCategory: "no",
        },
        {
          id: "i5",
          text: "A change that will sit in review while another task needs to continue immediately",
          correctCategory: "yes",
        },
        {
          id: "i6",
          text: "Reading docs before making your first local edit",
          correctCategory: "no",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Ask Claude Code to isolate the work safely",
      description:
        "Use this prompt builder when the task should happen in its own branch and workspace instead of sharing a busy directory.",
      fields: [
        {
          id: "task",
          label: "Task to isolate",
          placeholder:
            "e.g. draft the Section 6 worktrees lesson using the current lesson block system",
          hint: "Name the job that should live in its own lane.",
        },
        {
          id: "why",
          label: "Why separate isolation helps",
          placeholder:
            "e.g. another agent is handling validation work in parallel and I do not want the changes mixed together",
          hint: "State the collision risk or coordination reason.",
        },
        {
          id: "scope",
          label: "What stays inside this lane",
          placeholder:
            "e.g. only create the owned lesson file and report registry follow-up separately",
          hint: "Say what this worktree owns and what it does not.",
        },
        {
          id: "closeout",
          label: "How to report back",
          placeholder:
            "e.g. summarize the exact file changed, validation run here, and any follow-up that belongs to another branch",
          hint: "Define the branch-level handoff you want at the end.",
        },
      ],
      template:
        "{task}.\n\nUse a separate worktree for this because {why}.\n\nInside this worktree, {scope}.\n\nWhen finished, {closeout}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What is the main safety benefit of using a worktree for parallel AI work?",
          options: [
            "It makes every task automatically faster",
            "It isolates changes so parallel tasks stay easier to review, test, and unwind",
            "It removes the need for branch names or scope",
            "It lets Claude Code edit more files at once",
          ],
          correctIndex: 1,
          explanation:
            "Worktrees help because they reduce overlap and confusion. They make parallel work cleaner, not magically effort-free.",
        },
        {
          question:
            "What should happen if a needed follow-up appears outside the owned worktree scope?",
          options: [
            "Expand the branch quietly so the task feels more complete",
            "Ignore it forever",
            "Keep the current lane clean and report the follow-up separately",
            "Rewrite the worktree goal to cover the new file too",
          ],
          correctIndex: 2,
          explanation:
            "The worktree stays valuable when its purpose stays narrow. Follow-up can be surfaced without collapsing the isolation boundary.",
        },
      ],
    },
    {
      type: "takeaway",
      text: "When AI work runs in parallel, one task per worktree is the cleanest default.",
      note:
        "Isolation is not about extra ceremony. It is about making review, rollback, and collaboration safer.",
    },
  ],
};

export default config;
