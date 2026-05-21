import type { LessonConfig } from "@/lib/lesson-types";

const config: LessonConfig = {
  slug: "turning-vague-requests-into-durable-rules",
  title: "Turning Vague Requests into Durable Rules",
  section: 4,
  duration: "8 min",
  objectives: [
    "Explain why vague feedback creates drift while durable rules create repeatable quality",
    "Recognize the parts of a useful rule: intent, boundary, quality bar, and reuse language",
    "Write a scoped instruction that turns one-off feedback into a rule Claude Code can follow again later",
  ],
  blocks: [
    {
      type: "hook",
      headline:
        "A vague request might fix one moment. A durable rule improves the next ten moments too.",
      subtext:
        "When feedback stays fuzzy, Claude Code has to guess again on the next task. Durable rules turn taste, constraints, and quality expectations into instructions the system can reuse.",
    },
    {
      type: "diagram",
      title: "How vague feedback becomes a durable rule",
      steps: [
        {
          id: "intent",
          label: "Intent",
          headline: "Name what you actually want",
          color: "teal",
          explanation:
            "Start by translating the complaint into the real outcome. Claude Code needs to know the user-facing result you want, not just that something feels off.",
          example:
            "Example: instead of 'this lesson feels messy,' say 'make the lesson feel more guided, spacious, and interactive.'",
        },
        {
          id: "boundary",
          label: "Boundary",
          headline: "Add where the rule applies",
          color: "blue",
          explanation:
            "A durable rule needs a scope. It should say whether the instruction applies to one file, one surface, all lessons, or a specific interaction pattern.",
          example:
            "Example: 'For lesson content configs, keep blocks concise and use only supported interactive block types.'",
        },
        {
          id: "quality-bar",
          label: "Quality bar",
          headline: "Describe what good looks like",
          color: "amber",
          explanation:
            "Claude Code performs better when the quality signal is concrete. Name the behavior or experience to preserve, not just the thing to avoid.",
          example:
            "Example: 'Every lesson should offer an interaction early, keep explanations brief, and end with a clear checkpoint and takeaway.'",
        },
        {
          id: "reuse",
          label: "Reuse",
          headline: "Phrase it so it can guide future work",
          color: "violet",
          explanation:
            "The final step is wording the instruction as a reusable rule instead of a one-time reaction. That makes it portable across future sessions and collaborators.",
          example:
            "Example: 'Default to interaction-first lesson flows. Avoid long article-style explanations unless the task explicitly calls for reference material.'",
        },
      ],
    },
    {
      type: "mini-simulation",
      title: "Coach Claude Code from fuzzy feedback to a reusable rule",
      description:
        "You are refining a lesson in a shared course app. Choose the best move at each step so the feedback becomes a rule Claude Code can follow again, not just a temporary fix.",
      steps: [
        {
          id: "sim-intent",
          label: "Intent",
          context:
            "A teammate reviews a draft lesson and says, 'This still feels too much like a long article.'",
          prompt: "claude",
          terminal:
            "Teammate feedback: 'This still feels too much like a long article.'\n\nClaude Code: I should not treat that as a styling complaint only. I need to infer the desired learning experience before I rewrite the lesson.",
          question: "What is the strongest next move?",
          choices: [
            {
              id: "intent-translate",
              label:
                "Translate the feedback into a clearer outcome like 'make the lesson interaction-first, shorter in explanation, and easier to move through step by step'",
              rationale:
                "This turns a reaction into a usable intent statement that can guide real implementation choices.",
            },
            {
              id: "intent-cosmetic",
              label:
                "Assume it only means the typography should look more exciting and start changing visual styling",
            },
            {
              id: "intent-ignore",
              label:
                "Keep the structure the same and only shorten a few sentences so the comment is technically addressed",
            },
          ],
          correctChoiceId: "intent-translate",
          explanation:
            "Durable rules begin with intent. Claude Code needs to understand the experience the teammate wants, not just the words they used to complain about the current draft.",
          hint:
            "Choose the option that reduces ambiguity about the target experience before edits begin.",
        },
        {
          id: "sim-boundary",
          label: "Boundary",
          context:
            "You now know the team wants lessons to feel more guided and interactive, but not every surface in the app should be rewritten the same way.",
          prompt: "claude",
          terminal:
            "Claude Code: I have the desired direction. Next I should define where this instruction applies so I do not turn one lesson note into an app-wide rewrite.",
          question: "Which boundary is strongest?",
          choices: [
            {
              id: "boundary-scoped",
              label:
                "Apply the rule to lesson content configs and lesson blocks, not to every page or shared UI component in the app",
              rationale:
                "This keeps the instruction reusable while still scoped to the surface where the feedback actually matters.",
            },
            {
              id: "boundary-global",
              label:
                "Treat the comment as permission to redesign every page to match the same new style",
            },
            {
              id: "boundary-none",
              label:
                "Skip boundaries so Claude Code can decide case by case what else should probably change",
            },
          ],
          correctChoiceId: "boundary-scoped",
          explanation:
            "A durable rule needs a clear application zone. Scoped rules are easier to trust, easier to reuse, and far less likely to create accidental drift.",
          hint:
            "Pick the option that preserves reuse without silently expanding scope.",
        },
        {
          id: "sim-quality",
          label: "Quality bar",
          context:
            "The rule is now scoped to lesson content, but it still needs a concrete definition of what 'better' means.",
          prompt: "claude",
          terminal:
            "Claude Code: I should define what good lesson behavior looks like in observable terms so I can apply it consistently.",
          question: "What quality bar is most useful?",
          choices: [
            {
              id: "quality-concrete",
              label:
                "Say that lessons should introduce interaction early, keep explanation blocks brief, use visually consistent terminal-style learning surfaces, and end with a low-pressure checkpoint",
              rationale:
                "This gives Claude Code specific behaviors to create and preserve instead of a vague sense of polish.",
            },
            {
              id: "quality-subjective",
              label:
                "Say that lessons should feel nicer, smarter, and more premium without defining those words",
            },
            {
              id: "quality-minimal",
              label:
                "Say that lessons should not be bad and trust Claude Code to know what that means",
            },
          ],
          correctChoiceId: "quality-concrete",
          explanation:
            "Concrete quality bars make rules durable. They describe what the lesson should do, which helps both non-engineers and engineers evaluate the result without guessing.",
          hint:
            "Look for observable behaviors, not taste words alone.",
        },
        {
          id: "sim-reuse",
          label: "Reuse",
          context:
            "You are ready to phrase the final instruction so it can guide future lesson work, not only this one fix.",
          prompt: "claude",
          terminal:
            "Claude Code: I can now convert the feedback into a reusable rule that captures intent, scope, and quality expectations.",
          question: "Which final phrasing is strongest?",
          choices: [
            {
              id: "reuse-rule",
              label:
                "For lesson content work, default to interaction-first flows with concise explanation blocks, consistent terminal-style interactive surfaces, and one clear checkpoint before completion. Avoid long article-style sections unless reference depth is explicitly requested.",
              rationale:
                "This is reusable, scoped, and concrete enough to guide future work without reopening the same debate each time.",
            },
            {
              id: "reuse-once",
              label:
                "Make this lesson less boring and try not to do this again next time",
            },
            {
              id: "reuse-overreach",
              label:
                "Every surface in the entire app should be redesigned to feel more interactive from now on",
            },
          ],
          correctChoiceId: "reuse-rule",
          explanation:
            "The best durable rule is reusable and bounded. It gives a default behavior, a quality bar, and an exception case without becoming so broad that it breaks unrelated work.",
          hint:
            "Choose the rule another agent could apply tomorrow without needing the full backstory.",
        },
      ],
      completionMessage:
        "You turned subjective feedback into a reusable rule: clarify intent, add scope, define the quality bar, then phrase it so future work improves too.",
    },
    {
      type: "explanation",
      paragraphs: [
        "Teams often give feedback in shorthand: 'make it cleaner,' 'this feels off,' or 'do less of that.' Those comments are useful signals, but they are not durable instructions yet. If Claude Code only reacts to the surface wording, the same confusion comes back on the next task.",
        "A durable rule captures the deeper pattern behind the feedback. It says what outcome matters, where the instruction applies, what quality bar to aim for, and what tradeoff to avoid. That makes the next session faster because Claude Code no longer has to rediscover the preference from scratch.",
        "This is especially important in shared codebases and shared products. Non-engineers need plain language they can trust. Engineers need enough precision to implement without drift. Durable rules bridge those two needs by turning taste into repeatable operating guidance.",
      ],
      engineerDepth: [
        "In practice, durable rules often belong in recurring prompts, planning instructions, repo notes, or collaboration norms such as `CLAUDE.md`. The wording should be stable enough to reuse but narrow enough that it does not override task-specific constraints.",
        "A good test is portability: could another agent apply the rule in a new lesson, a new branch, or a future session without hearing the original conversation? If not, the rule is probably still too tied to the moment.",
      ],
    },
    {
      type: "comparison",
      title: "One-off reaction vs. durable rule",
      left: {
        label: "One-off reaction",
        content:
          "This lesson feels too dense. Make it better and keep the design cleaner.",
        annotations: [
          "The desired outcome is implied but not defined",
          "No scope tells Claude Code where the guidance applies",
          "No quality bar explains what 'better' or 'cleaner' means",
        ],
      },
      right: {
        label: "Durable rule",
        content:
          "For lesson content work, default to interaction-first flows with concise explanation blocks, clear progression, and consistent terminal-style interactive surfaces. Keep the lesson usable for both non-engineers and engineers, and avoid long article-style sections unless the task explicitly asks for reference depth.",
        annotations: [
          "Names the surface where the rule applies",
          "Defines concrete behaviors to preserve",
          "Adds an exception so the rule stays practical instead of rigid",
        ],
      },
      insight:
        "The durable version is stronger because it can guide future work without requiring the original conversation every time.",
    },
    {
      type: "classification",
      title: "Durable rule ingredient or still too vague?",
      instruction:
        "Sort each statement based on whether it helps turn feedback into a reusable rule.",
      categories: [
        { id: "durable", label: "Durable rule ingredient", color: "teal" },
        { id: "vague", label: "Still too vague", color: "amber" },
      ],
      items: [
        {
          id: "i1",
          text: "Name the surface where the instruction applies, such as lesson content configs or terminal components",
          correctCategory: "durable",
        },
        {
          id: "i2",
          text: "Make it feel way better somehow",
          correctCategory: "vague",
        },
        {
          id: "i3",
          text: "Describe the concrete quality bar, like earlier interaction and shorter explanation blocks",
          correctCategory: "durable",
        },
        {
          id: "i4",
          text: "Trust Claude Code to figure out what cleaner means later",
          correctCategory: "vague",
        },
        {
          id: "i5",
          text: "Phrase the instruction so another future task can use it too",
          correctCategory: "durable",
        },
        {
          id: "i6",
          text: "Apply the comment everywhere in the app even if the feedback came from one lesson",
          correctCategory: "vague",
        },
      ],
    },
    {
      type: "prompt-builder",
      title: "Turn feedback into a durable rule",
      description:
        "Use these fields to convert a vague request into a reusable instruction Claude Code can apply on future lesson work.",
      fields: [
        {
          id: "feedback",
          label: "Original vague feedback",
          placeholder:
            "e.g. this lesson feels too much like a long article",
          hint: "Start with the real comment or complaint you heard.",
        },
        {
          id: "intent",
          label: "Desired outcome",
          placeholder:
            "e.g. make the lesson feel guided, spacious, and interactive",
          hint: "Translate the reaction into the user experience you actually want.",
        },
        {
          id: "scope",
          label: "Where the rule applies",
          placeholder:
            "e.g. apply this to lesson content configs and interactive lesson blocks",
          hint: "Keep the rule scoped to the right surface.",
        },
        {
          id: "quality",
          label: "What good looks like",
          placeholder:
            "e.g. interaction early, concise explanation blocks, terminal surfaces that share the same visual language, and one clear checkpoint",
          hint: "Define observable qualities, not just taste words.",
        },
      ],
      template:
        "Feedback I am trying to resolve: {feedback}.\n\nTurn this into a durable rule for future work.\n\nIntent: {intent}.\nScope: {scope}.\nQuality bar: {quality}.\n\nWrite the final instruction as a reusable default, not a one-time fix.",
    },
    {
      type: "checkpoint",
      questions: [
        {
          question:
            "What most often makes a rule durable instead of merely reactive?",
          options: [
            "It uses stronger adjectives so the preference feels serious",
            "It captures intent, scope, and a concrete quality bar that can be reused later",
            "It stays broad so Claude Code has maximum freedom to interpret it",
            "It avoids exceptions because strict rules are always better",
          ],
          correctIndex: 1,
          explanation:
            "Durable rules reduce repeat ambiguity. They work because they preserve the important preference in a scoped, reusable form.",
        },
        {
          question:
            "Which instruction is best for a shared interactive course product?",
          options: [
            "Make the whole app nicer whenever you notice something off",
            "Shorten some text and hope the same issue does not come back",
            "For lesson work, default to interaction-first structure and concise explanations unless deeper reference content is explicitly requested",
            "Do whatever seems most creative in the moment",
          ],
          correctIndex: 2,
          explanation:
            "The strongest option is reusable, scoped to lesson work, and clear about the default plus the exception case.",
        },
      ],
    },
    {
      type: "takeaway",
      text:
        "A durable rule is feedback that learned how to survive the next task.",
      note:
        "When a request feels vague, do not just patch the moment. Extract the intent, add the scope, define what good looks like, and phrase it so future work starts stronger.",
    },
  ],
};

export default config;
