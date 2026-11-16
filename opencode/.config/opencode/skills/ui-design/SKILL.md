---
name: ui-design
description: Design usable interfaces and interaction flows for web, desktop, mobile, or TUI, producing reviewable proposals rather than implementation.
---

# UI Design

Design the user experience and interface appropriate to the target platform. The primary agent may delegate exploration to `designer`; the skill describes the workflow, not an execution role.

## Workflow

1. **Understand the task.** Establish users, primary tasks, environment, platform conventions, constraints, and what success looks like. Inspect the existing product and design system first.
2. **Map interaction.** Define information hierarchy, navigation, key actions, states, feedback, errors, and recovery. For TUI include keyboard and focus behavior; for graphical interfaces consider input methods and responsive layouts.
3. **Explore deliberately.** Research established patterns when needed. Produce one strong direction by default; compare variants where the decision is genuinely uncertain. Use `prototype` for questions that require live interaction to resolve.
4. **Create reviewable artifacts.** Provide the smallest useful representation: user flow, wireframe, component tree, annotated mockup, or interactive prototype. Reuse existing components and visual conventions when appropriate.
5. **Evaluate the proposal.** Consider clarity, consistency, accessibility, keyboard navigation, contrast, error handling, empty/loading states, and platform fit. Distinguish visual judgment from usability actually observed with users.
6. **Present the decision.** Show the proposal, rationale, trade-offs, unresolved product choices, and what would need approval before implementation.

## Boundaries

- Do not silently change product requirements or implement production UI.
- Do not introduce a new design system when the existing one is sufficient.
- Use `ui-critique` to audit an existing or proposed interface independently.
