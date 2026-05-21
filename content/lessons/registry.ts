/**
 * Static lesson config registry.
 * Add an entry here whenever you create a new .lesson.ts file.
 * Next.js/webpack requires statically analyzable imports — no dynamic require().
 */
import type { LessonConfig } from "@/lib/lesson-types";

import whatIsClaudeCode from "./section-1/what-is-claude-code.lesson";
import theAgenticLoop from "./section-1/the-agentic-loop.lesson";
import installingClaudeCode from "./section-1/installing-claude-code.lesson";
import commandsShortcutsPermissions from "./section-1/commands-shortcuts-permissions.lesson";
import contextWindowAndMemory from "./section-2/context-window-and-memory.lesson";
import freshAndCondensedContext from "./section-2/fresh-and-condensed-context.lesson";
import memoryLayers from "./section-2/memory-layers.lesson";
import contextManagementHabits from "./section-2/context-management-habits.lesson";
import whatSkillsAre from "./section-3/what-skills-are.lesson";
import anatomyOfASkill from "./section-3/anatomy-of-a-skill.lesson";
import creatingReusableWorkflows from "./section-3/creating-reusable-workflows.lesson";
import builtInVsCustomSkills from "./section-3/built-in-vs-custom-skills.lesson";
import onboardingToACodebase from "./section-4/onboarding-to-a-codebase.lesson";
import usingPlanModeBeforeActing from "./section-4/plan-mode.lesson";
import producingUsefulArtifacts from "./section-4/producing-useful-artifacts.lesson";
import turningVagueRequestsIntoDurableRules from "./section-4/turning-vague-requests-into-durable-rules.lesson";
import whatMcpIs from "./section-5/what-mcp-is.lesson";
import whenMcpHelps from "./section-5/when-mcp-helps.lesson";
import whenMcpHurts from "./section-5/when-mcp-hurts.lesson";
import browserAutomation from "./section-5/browser-automation.lesson";
import worktrees from "./section-6/worktrees.lesson";
import multiAgentWorkflows from "./section-6/multi-agent-workflows.lesson";
import hooksAndNotifications from "./section-6/hooks-and-notifications.lesson";
import validationLoops from "./section-6/validation-loops.lesson";
import commonFailurePoints from "./section-7/common-failure-points.lesson";
import auditingForAiReadiness from "./section-7/auditing-for-ai-readiness.lesson";
import buildingHarnesses from "./section-7/building-harnesses.lesson";
import designingAgentWorkflows from "./section-7/designing-agent-workflows.lesson";

export const lessonConfigs: Record<string, LessonConfig> = {
  "what-is-claude-code": whatIsClaudeCode,
  "the-agentic-loop": theAgenticLoop,
  "installing-claude-code": installingClaudeCode,
  "commands-shortcuts-permissions": commandsShortcutsPermissions,
  "context-window-and-memory": contextWindowAndMemory,
  "fresh-and-condensed-context": freshAndCondensedContext,
  "memory-layers": memoryLayers,
  "context-management-habits": contextManagementHabits,
  "what-skills-are": whatSkillsAre,
  "anatomy-of-a-skill": anatomyOfASkill,
  "creating-reusable-workflows": creatingReusableWorkflows,
  "built-in-vs-custom-skills": builtInVsCustomSkills,
  "onboarding-to-a-codebase": onboardingToACodebase,
  "using-plan-mode-before-acting": usingPlanModeBeforeActing,
  "producing-useful-artifacts": producingUsefulArtifacts,
  "turning-vague-requests-into-durable-rules": turningVagueRequestsIntoDurableRules,
  "what-mcp-is": whatMcpIs,
  "when-mcp-helps": whenMcpHelps,
  "when-mcp-hurts": whenMcpHurts,
  "browser-automation": browserAutomation,
  worktrees,
  "multi-agent-workflows": multiAgentWorkflows,
  "hooks-and-notifications": hooksAndNotifications,
  "validation-loops": validationLoops,
  "common-failure-points": commonFailurePoints,
  "auditing-for-ai-readiness": auditingForAiReadiness,
  "building-harnesses": buildingHarnesses,
  "designing-agent-workflows": designingAgentWorkflows,
};
