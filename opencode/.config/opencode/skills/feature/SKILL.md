---
name: feature
description: Implement an authorized production feature or increment with scoped delegation, real-surface verification, and a review checkpoint.
---

# Feature

Deliver one authorized, independently observable increment of production behavior. Own coordination, integration, and verification; return the result for user review before starting another increment.

## Workflow

1. **Ground the work.** Establish the requested behavior, acceptance criteria, relevant architecture, and project conventions. Inspect affected code; use scout or researcher when helpful. Follow `AGENTS.md` and its Laziness Protocol.
2. **Bound the increment.** Choose the smallest meaningful result that can be observed and reviewed, not an arbitrary file-sized task. An approved design does not authorize implementing the entire specification. Resolve dependencies and seek approval for consequential product, interface, or architectural decisions before implementing them.
3. **Coordinate selectively.** The primary agent alone delegates. Use designer for interface questions, oracle for hard trade-offs, worker for substantial implementation, tester for verification, and reviewer for independent review when warranted. Supply scope, context, constraints, ownership, and expected evidence. Parallelize only genuinely independent work; isolate worker worktrees and coordinate shared mutable targets.
4. **Implement simply.** Reuse existing patterns and dependencies. Avoid speculative abstractions, unrelated refactors, and scope expansion. Integrate each completed piece before proceeding.
5. **Verify the actual result.** Run relevant checks and exercise behavior on the intended surface. Passing compilation or a proxy test alone is not proof of correct behavior. Investigate failures, assess independent findings, and mark skipped or inconclusive checks explicitly.
6. **Return for review.** Show what changed, how to try it, observed verification, limitations, and remaining decisions. Stop after the authorized increment; do not automatically start the next one.

## Boundaries

- A straightforward, fully authorized feature may be one increment. Do not make increments artificially tiny.
- The primary agent may handle trivial edits directly; delegation is not mandatory.
- Do not create extra planning documents, commits, or pull requests unless useful or requested.
- When the direction itself is uncertain, use `prototype` or `technical-design` first.
