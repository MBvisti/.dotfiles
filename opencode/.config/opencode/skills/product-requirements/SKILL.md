---
name: product-requirements
description: Clarify a product or feature problem, scope, user workflows, and acceptance criteria; produce a concise PRD only when useful.
---

# Product Requirements

Define what should be built and why, without prematurely deciding its technical implementation.

## Workflow

1. **Understand the problem.** Identify the user, job to be done, current pain, desired outcome, and why it matters. Inspect existing product context rather than inventing needs.
2. **Bound the scope.** Describe target workflows, required behaviors, relevant constraints, non-goals, and important edge cases. Distinguish known facts, assumptions, and decisions needing user input.
3. **Define acceptance.** Write concrete, observable acceptance criteria in user-facing terms. Prefer a small meaningful increment over an open-ended product roadmap.
4. **Challenge assumptions.** Surface conflicting requirements, unknowns, and alternatives. Ask only questions that change important decisions; otherwise state reasonable assumptions for review.
5. **Present for approval.** Provide a compact requirements outline or PRD sized to the uncertainty: problem, outcomes, users, scope/non-goals, workflows, acceptance criteria, and open decisions. Use Plannotator for discussion and annotation if available and useful.

## Boundaries

- A PRD is an optional output, not mandatory paperwork.
- Avoid detailed data models, API signatures, or implementation sequencing; use `technical-design` for consequential technical choices.
- When proposed behavior needs real-world exploration, use `prototype`.
- Stop at requirements review; do not treat a PRD as authorization to implement.
