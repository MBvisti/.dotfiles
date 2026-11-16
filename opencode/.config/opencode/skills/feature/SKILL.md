---
name: feature
description: Implement production-ready features through scoped delegation and incremental verification
---

Turn a user request or approved specification into a working, verified feature. Own coordination, architectural consistency, and integration.

## Workflow

1. **Understand the feature**
   - Establish requirements, acceptance criteria, and relevant project constraints.
   - Trace the affected subsystem and existing conventions. Use scout or researcher when useful.
   - Identify consequential product or architectural decisions and seek user approval before committing to them.
   - Keep planning proportional to the scope. Avoid unnecessary specifications and documentation.

2. **Define the implementation**
   - Break the feature into the smallest independently verifiable increments.
   - Identify dependencies, shared interfaces, and opportunities for parallel execution.
   - Resolve blocking decisions before delegation.
   - Give each worker explicit requirements, scope, constraints, and success criteria.
   - Use oracle for difficult decisions and designer for interface design when useful.

3. **Implement incrementally**
   - Delegate substantial implementation to worker. Handle trivial changes directly when simpler.
   - Parallelize independent work when beneficial. Isolate concurrent workers in separate worktrees.
   - Coordinate ownership of shared files, services, and mutable infrastructure.
   - Keep changes focused and consistent with existing architecture.
   - Do not introduce consequential architectural changes without approval.

4. **Verify each increment**
   - Verify behavior on the actual target surface.
   - Use tester for execution and reviewer for independent evaluation when warranted.
   - Assess evidence and investigate failures without unnecessarily repeating completed work.
   - Treat missing, inconclusive, or wrong-surface verification as unverified.
   - Integrate verified increments before proceeding.
   - Seek user feedback before continuing when behavior or direction remains uncertain.

5. **Complete the feature**
   - Verify the integrated result against acceptance criteria.
   - Review the final changes and resolve actionable findings within scope.
   - Report what was implemented, verification results, remaining limitations, and decisions requiring user input.

## Principles

- Favor working software over extensive planning documents.
- Keep feedback loops short and changes independently verifiable.
- Delegate when isolation or specialization provides value, not by default.
- The primary agent owns delegation, integration, and coordination.
- Preserve user authority over consequential product and architectural decisions.
- Do not expand the scope without authorization.

