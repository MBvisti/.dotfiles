---
name: technical-design
description: Develop a compact, code-oriented technical design for consequential changes and present it for critique and explicit approval before implementation.
---

# Technical Design

Turn agreed behavior into a reviewable technical approach. Optimize for shared understanding, not document length or simulated progress.

## When to use

Use for meaningful interface changes, data contracts, architecture boundaries, migrations, complex error paths, or multiple plausible technical approaches. Routine changes can go straight to `feature`.

## Workflow

1. **Ground in reality.** Read requirements, inspect affected code and project constraints, and identify the design decision. Use scout, researcher, or oracle via the primary agent when helpful.
2. **Show the proposed code shape.** Use only the views that clarify the decision: types and signatures, key module boundaries, file layout, call/control flow, state transitions, data ownership, and error paths. Label proposed structures as proposals, not existing code. Use `show-me` when a compact visual would help.
3. **Compare trade-offs.** Explain the simplest viable approach, relevant alternatives, costs, risks, invariants, and migration or compatibility considerations. Follow the Laziness Protocol; avoid speculative architecture.
4. **Define proof.** Name observable acceptance checks, integration boundaries, and what would falsify the proposed design. Identify any uncertainty better answered by a `prototype`.
5. **Review with the user.** Present a concise code-oriented design suitable for annotation in Plannotator when available; incorporate critique and revise. Make consequential decisions explicit.
6. **End with a bounded handoff.** Suggest the first independently observable implementation increment and its approval boundary. Stop before writing production code.

## Boundaries

- A reviewed or approved design is not blanket authorization to implement the whole specification.
- Do not generate extensive task trees or documentation merely to appear comprehensive.
- Delegate only from the primary agent; specialist agents provide evidence or recommendations.
