---
name: ui-critique
description: Critique an existing UI, wireframe, or mockup against user tasks, usability heuristics, accessibility, and platform conventions.
---

# UI Critique

Evaluate a design independently and give actionable feedback without redesigning or implementing it unless explicitly requested.

## Workflow

1. **Establish context.** Identify the target interface, platform, audience, critical tasks, requirements, and available evidence. Inspect the actual UI or supplied artifacts whenever possible.
2. **Walk primary flows.** Assess discoverability, navigation, information hierarchy, feedback, interaction affordances, input/focus behavior, error recovery, and clarity of important states.
3. **Check consistency and access.** Consider established patterns, design-system alignment, readability, contrast, keyboard access, screen-reader semantics where inspectable, and platform-specific conventions.
4. **Prioritize findings.** For each actionable issue give its location, evidence or failure scenario, user impact, severity, and a focused recommendation. Separate confirmed observations from hypotheses and subjective preferences.
5. **Summarize the verdict.** Lead with the highest-impact problems, then strengths, unresolved questions, and specific verification still needed. Say explicitly when the interface was not rendered or interactively tested.

## Boundaries

- Do not confuse personal aesthetic preference with a usability defect.
- Do not infer accessibility compliance from screenshots alone.
- Do not turn a critique into an unsolicited redesign or source-code change.
- If a new direction must be explored, hand off to `ui-design` or `prototype` through the primary agent.
