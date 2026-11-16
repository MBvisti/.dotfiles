---
name: prototype
description: Resolve uncertain UI, UX, architecture, or technical decisions with fast, disposable experiments and observed evidence.
---

# Prototype

Use a prototype to answer a specific decision, not to produce production code. Optimize for learning, speed, and direct observation.

## Workflow

1. **Name the uncertainty.** State the decision to make, candidate hypotheses, and the observation that would distinguish them. If the solution is already settled, use `feature` instead.
2. **Explore selectively.** Inspect relevant prior art or existing constraints. Use designer, researcher, or oracle through the primary agent when useful. Consider multiple alternatives only when comparison will improve the decision; ask for direction first when the design space is broad.
3. **Build the cheapest useful experiment.** Work in an isolated scratch area, away from production source and shared targets. Choose minimal tooling: static mockups, a small script, a lightweight UI, or an instrumented reproduction. Avoid production abstractions, generalized infrastructure, and unnecessary tests. Do not mutate live systems without authorization.
4. **Observe the real question.** For UI, render and interact with variants on the relevant surface; capture screenshots when useful. For technical choices, record actual output, behavior, or measurements. Mark unobserved claims and environmental limitations.
5. **Present and stop.** Show the variants or hypothesis tested, evidence, trade-offs, recommendation, scratch location, and open decision. State that artifacts are disposable. Ask the user to select a direction before production implementation.

## Boundaries

- The prototype is not a hidden first phase of production implementation.
- Do not automatically transfer scratch code into the product.
- The primary agent owns delegation and decisions requiring user approval.
- After a direction is approved, use `feature` for the production build.
