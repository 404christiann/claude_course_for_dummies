import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "producing-useful-artifacts",
  title: "Producing Useful Artifacts",
  section: 4,
  duration: "6 min",
  objectives: [
    "Explain what makes a Claude Code output useful after the session ends",
    "Recognize the difference between a vague recap and a durable artifact someone else can act on",
    "Practice framing a request so Claude Code produces a clear, reusable engineering artifact",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "After onboarding the repo and planning the work, the session still is not complete until it leaves behind something another person can use.",
      subtext:
        "Useful artifacts turn a one-time chat into durable progress: a plan, handoff note, checklist, summary, or decision record that still helps when the terminal window is closed.",
    },
    {
      type: "diagram",
      title: "Step 3: turn finished work into a durable handoff",
      steps: [
        {
          id: "audience",
          label: "Audience",
          headline: "Know who needs it",
          color: "teal",
          explanation:
            "A useful artifact is written for a real next reader: you tomorrow, a teammate, a reviewer, or a non-technical stakeholder. If the audience is fuzzy, the artifact usually becomes generic.",
          example:
            "Example: a teammate needs a short migration summary with exact files changed and follow-up work still outside scope.",
        },
        {
          id: "structure",
          label: "Structure",
          headline: "Package the signal clearly",
          color: "blue",
          explanation:
            "Useful artifacts organize the important information so someone can scan them quickly. They name the task, what changed, what still matters, and what action comes next.",
          example:
            "Example: a handoff note with sections for scope, files touched, validation run, and open questions.",
        },
        {
          id: "evidence",
          label: "Evidence",
          headline: "Ground it in observable facts",
          color: "amber",
          explanation:
            "The artifact should reflect what actually happened, not just what Claude Code intended to do. Concrete details make the output trustworthy and easier to reuse.",
          example:
            "Example: 'Updated the lesson config in one file and verified the TypeScript shape matches existing lesson patterns.'",
        },
        {
          id: "next-step",
          label: "Next step",
          headline: "Make the handoff actionable",
          color: "violet",
          explanation:
            "A durable artifact reduces the next person's decision load. It should make clear whether the work is done, needs review, or needs a follow-up in another file or system.",
          example:
            "Example: 'Lesson config is ready, but registry wiring is still needed in a separate file outside current ownership.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Turn a finished task into a useful artifact",
      description:
        "You already onboarded the repo, planned the work, and completed a lesson migration. Choose the best next move at each step so the result is reusable for the rest of the team instead of trapped inside the session.",
      steps: [
        {
          id: "sim-audience",
          label: "Audience",
          context:
            "A product lead and another agent need to know what changed in the lesson and what, if anything, still needs to happen outside the owned file.",
          prompt: "claude",
          terminal:
            "Work complete:\n- migrated the lesson to the interactive config system\n- stayed inside the owned file\n- checked the current block patterns first\n\nClaude Code: I should leave behind an artifact, not just a 'done' message.",
          question: "What artifact is most useful here?",
          choices: [
            {
              id: "artifact-targeted",
              label:
                "A short migration summary naming the exact file changed, the learner-facing improvements, and any out-of-scope follow-up",
              rationale:
                "This matches the real audience and gives the team the information they need to continue safely.",
            },
            {
              id: "artifact-generic",
              label: "A one-line note that says the lesson was updated successfully",
            },
            {
              id: "artifact-raw",
              label:
                "A pasted dump of the whole session transcript so others can read everything themselves",
            },
          ],
          correctChoiceId: "artifact-targeted",
          explanation:
            "Useful artifacts are audience-shaped. The best choice gives collaborators the signal they need without forcing them to reconstruct the work from scratch.",
          hint:
            "Pick the option that helps the next person act quickly, not the option that simply proves activity happened.",
        },
        {
          id: "sim-structure",
          label: "Structure",
          context:
            "Now you need to decide what the artifact should include so it can stand on its own.",
          prompt: "claude",
          terminal:
            "Draft summary:\n- lesson improved\n- interactive blocks added\n- looks more aligned now\n\nClaude Code: This is too vague. I need a structure that preserves the actual decisions.",
          question: "Which structure is strongest?",
          choices: [
            {
              id: "structure-strong",
              label:
                "Include the exact file changed, the main interaction pattern, the concept the lesson now teaches, and any follow-up outside scope",
              rationale:
                "That structure captures the change, the learner impact, and the next action in a compact format.",
            },
            {
              id: "structure-fluffy",
              label:
                "Keep it high-level and positive so it sounds polished, even if details are omitted",
            },
            {
              id: "structure-overload",
              label:
                "Include every implementation detail from every lesson file you inspected, even if it was not changed",
            },
          ],
          correctChoiceId: "structure-strong",
          explanation:
            "The artifact becomes durable when it keeps the critical facts and drops the noise. Strong structure helps both non-engineers and engineers find what matters fast.",
          hint:
            "The best answer preserves decision-ready details without becoming a transcript.",
        },
        {
          id: "sim-evidence",
          label: "Evidence",
          context:
            "You are about to finalize the artifact. It sounds clean, but it still needs a stronger trust signal.",
          prompt: "claude",
          terminal:
            "Current summary draft:\n- migrated Producing Useful Artifacts into the lesson config system\n- centered the lesson on durable outputs and handoff quality\n- noted a follow-up outside the owned file\n\nClaude Code: Before I report success, I should make sure the artifact reflects what I actually verified.",
          question: "What makes the artifact more trustworthy?",
          choices: [
            {
              id: "evidence-verified",
              label:
                "State what was actually validated, such as matching current block types and confirming the file shape is consistent with nearby lessons",
              rationale:
                "Evidence turns a recap into something a teammate can trust without re-running the whole investigation immediately.",
            },
            {
              id: "evidence-confident",
              label:
                "Use confident wording like 'fully complete' without mentioning what was checked",
            },
            {
              id: "evidence-future",
              label:
                "Describe the checks you would probably run later instead of the ones you already performed",
            },
          ],
          correctChoiceId: "evidence-verified",
          explanation:
            "Useful artifacts separate verified facts from unverified assumptions. That distinction is what makes the output reliable in real repo work.",
          hint:
            "Choose the option that reports observable evidence, not just tone.",
        },
      ],
      completionMessage:
        "You turned finished work into a durable artifact: audience-aware, structured, evidence-based, and clear about the next step. That is how Claude Code output keeps creating value after the session ends.",
    },
    {
      type: "explanation",
      paragraphs: [
        "A useful artifact is any output that helps someone continue the work without replaying the whole conversation. In practice, that might be a plan, a migration summary, a handoff note, a checklist, a bug reproduction write-up, or a decision record.",
        "This is the closing move in the Section 4 arc. Onboarding gives Claude Code the map. Plan Mode gives it a safe path. The artifact is what preserves the outcome after the terminal session ends.",
        "The key idea is durability. If the output only makes sense while the full chat is still fresh in your head, it is not a strong artifact yet. Strong artifacts preserve scope, important facts, and the next action in a form another person can use quickly.",
        "This matters for both beginners and engineers. Beginners need low-confusion outputs they can follow later. Engineers need artifacts grounded in exact files, validations, and unresolved follow-up so collaboration stays safe and efficient.",
      ],
      engineerDepth: [
        "In repo work, the most common artifact failure is reporting activity instead of outcome. 'I looked at some files and updated things' is weaker than naming the file changed, the pattern followed, and the specific follow-up still needed elsewhere.",
        "A good artifact often mirrors the agentic loop. It records what context was gathered, what action was taken, and what was verified, then packages that information in the format the team actually needs.",
      ],
    },
    {
      type: "comparison",
      title: "Chat recap vs. durable handoff",
      left: {
        label: "Weak recap",
        content:
          "Updated the lesson and made it more interactive. Everything should be good now.",
        annotations: [
          "Does not name the exact file changed",
          "No learner-facing detail about what improved",
          "No evidence or next-step signal",
        ],
      },
      right: {
        label: "Useful artifact",
        content:
          "Updated `content/lessons/section-4/producing-useful-artifacts.lesson.ts` into the interactive lesson config format. The lesson now teaches how to turn Claude Code sessions into durable artifacts using a diagram, mini-simulation, classification, and prompt-builder flow. Validation focused on matching current block types and nearby lesson patterns. Registry wiring is still a follow-up outside the owned file.",
        annotations: [
          "Names the exact file changed",
          "Explains the learner-facing interaction and concept",
          "Separates verified work from out-of-scope follow-up",
        ],
      },
      insight:
        "The second version is useful because someone else can immediately understand the change, trust the scope, and know what happens next.",
    },
    {
      type: "classification",
      title: "Useful artifact or low-value output?",
      instruction:
        "Sort each item based on whether it increases the long-term usefulness of the session output.",
      categories: [
        { id: "useful", label: "Useful artifact", color: "teal" },
        { id: "low-value", label: "Low-value output", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "A handoff note that names the exact file changed and the open follow-up outside scope",
          correctCategory: "useful",
        },
        {
          id: "i2",
          text: "A polished summary that never mentions what was actually verified",
          correctCategory: "low-value",
        },
        {
          id: "i3",
          text: "A checklist another teammate can use to continue the task tomorrow",
          correctCategory: "useful",
        },
        {
          id: "i4",
          text: "A vague statement that the work is basically done",
          correctCategory: "low-value",
        },
        {
          id: "i5",
          text: "A migration summary that explains the learner-facing interaction added to the lesson",
          correctCategory: "useful",
        },
        {
          id: "i6",
          text: "A full transcript dump with no synthesis or next-step guidance",
          correctCategory: "low-value",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Ask for the final handoff artifact",
      description:
        "Fill in the fields below to draft the final prompt in the Section 4 sequence: one that tells Claude Code what artifact to leave behind after the task.",
      fields: [
        {
          id: "task",
          label: "Task completed",
          placeholder: "e.g. migrate the lesson into the interactive config system",
          hint: "State the job Claude Code is doing.",
        },
        {
          id: "artifact",
          label: "Artifact needed",
          placeholder:
            "e.g. a short handoff summary with exact file changed, learner-facing updates, and open follow-up",
          hint: "Name the output format the next person actually needs.",
        },
        {
          id: "audience",
          label: "Who it is for",
          placeholder: "e.g. another agent and the product lead",
          hint: "Useful artifacts are shaped by the next reader.",
        },
        {
          id: "verify",
          label: "What to confirm",
          placeholder:
            "e.g. confirm the summary only includes verified changes and clearly separates out-of-scope follow-up",
          hint: "Define the quality bar so the artifact is trustworthy.",
        },
      ],
      template:
        "Complete this task: {task}.\n\nWhen you finish, produce {artifact} for {audience}.\n\nBefore reporting success, {verify}.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What usually separates a useful artifact from a generic recap?",
          options: [
            "It uses more polished language",
            "It is longer and includes most of the transcript",
            "It preserves the key facts, audience, and next action in a reusable format",
            "It avoids mentioning anything still unfinished",
          ],
          correctIndex: 2,
          explanation:
            "Useful artifacts reduce future confusion. They keep the signal someone needs to trust the work and continue from the right place.",
        },
        {
          question:
            "Which follow-up belongs in a useful artifact after a scoped file-only task?",
          options: [
            "Pretend the rest of the system is already updated",
            "Name any required next step outside the owned file",
            "Skip follow-up notes so the summary feels complete",
            "Add unrelated ideas that could improve the app later",
          ],
          correctIndex: 1,
          explanation:
            "A durable artifact should make scope boundaries visible. That includes calling out the next required step if it lives outside the current ownership area.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "A useful artifact is not 'what happened in the chat.' It is the smallest durable output that helps the next person understand the work, trust the result, and know what happens next.",
      note:
        "If someone has to reread the whole session to use your output, the artifact still needs work. That is why real repo work ends with a handoff, not just a completed edit.",
    },
  ],
};

export default config;
