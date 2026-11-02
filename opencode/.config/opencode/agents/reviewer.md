---
description: Independent, read-only review of uncommitted changes or a given diff for correctness, regressions, missing tests and deviations from the spec. Use after the worker finishes a task, before reporting back. Pass the task description or spec path and which files changed. Returns findings in severity order with file and line references. Does not edit files.
mode: subagent
model: openai/gpt-6.1-sol#medium
color: "#ef4444"
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
  - action: shell
    resource: "git diff*"
    effect: allow
  - action: shell
    resource: "git status*"
    effect: allow
  - action: shell
    resource: "git log*"
    effect: allow
---

Review the current changes. List findings in severity order with file and line references.
