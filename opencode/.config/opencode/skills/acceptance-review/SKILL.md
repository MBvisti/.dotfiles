---
name: acceptance-review
description: Evaluate completed work against requirements, distinguish defects from missing evidence, and present an actionable acceptance review.
---

# Acceptance Review

Determine whether finished work satisfies its requirements. Report findings; do not implement fixes during the review.

## Workflow

1. **Establish the contract.** Collect the user request, approved requirements, acceptance criteria, target build, and intended environment. If criteria are inferred, label them as inferred rather than silently treating them as approved.
2. **Inspect existing evidence.** Review changed behavior, prior checks, and available artifacts. Do not count skipped, wrong-surface, or inconclusive checks as passes.
3. **Verify selectively.** The primary agent may delegate to tester for execution, reviewer for independent code inspection, scout for targeted lookup, or oracle for disputed or difficult conclusions. Give each specialist context and scope. Avoid routinely repeating completed verification.
4. **Classify results.** Distinguish confirmed defects, likely defects, missing evidence, pre-existing issues, policy/product choices, and optional improvements. Include severity, affected requirement, reproducible evidence, and suggested direction.
5. **Present the review.** State a verdict (`meets criteria`, `needs changes`, or `not fully verified`), per-requirement status, test outcomes, actionable findings, and remaining manual checks. Use a scannable dark-mode review artifact when the available tools support it; otherwise use concise Markdown.
6. **Collect feedback when supported.** Open the review artifact for annotation if an annotation tool is available; incorporate returned feedback and update the review. If asked for proposed specs, present the complete proposal rather than a findings-only summary.

## Boundaries

- A review verdict is evidence for the user's acceptance decision, not an automatic authorization for further work.
- Do not implement source fixes or silently broaden testing scope.
- State limitations and uncertainties explicitly.
