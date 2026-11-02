---
description: Plans work and delegates to specialist subagents
mode: primary
model: anthropic/claude-opus-5-5#medium
color: "#f59e0b"
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: ask
  # Read-only git inspection
  - action: shell
    resource: "git status *"
    effect: allow
  - action: shell
    resource: "git diff *"
    effect: allow
  - action: shell
    resource: "git log *"
    effect: allow
  - action: shell
    resource: "git show *"
    effect: allow
  - action: shell
    resource: "git blame *"
    effect: allow
  - action: shell
    resource: "git shortlog *"
    effect: allow
  - action: shell
    resource: "git describe *"
    effect: allow
  - action: shell
    resource: "git rev-parse *"
    effect: allow
  - action: shell
    resource: "git rev-list *"
    effect: allow
  - action: shell
    resource: "git merge-base *"
    effect: allow
  - action: shell
    resource: "git ls-files *"
    effect: allow
  - action: shell
    resource: "git ls-tree *"
    effect: allow
  - action: shell
    resource: "git cat-file *"
    effect: allow
  - action: shell
    resource: "git grep *"
    effect: allow
  - action: shell
    resource: "git branch"
    effect: allow
  - action: shell
    resource: "git branch --list *"
    effect: allow
  - action: shell
    resource: "git branch -a *"
    effect: allow
  - action: shell
    resource: "git branch -r *"
    effect: allow
  - action: shell
    resource: "git branch -v*"
    effect: allow
  - action: shell
    resource: "git branch --show-current"
    effect: allow
  - action: shell
    resource: "git branch --contains *"
    effect: allow
  - action: shell
    resource: "git tag -l *"
    effect: allow
  - action: shell
    resource: "git tag --list *"
    effect: allow
  - action: shell
    resource: "git stash list *"
    effect: allow
  - action: shell
    resource: "git stash show *"
    effect: allow
  - action: shell
    resource: "git worktree list *"
    effect: allow
  - action: subagent
    resource: "*"
    effect: deny
  - action: subagent
    resource: scout
    effect: allow
  - action: subagent
    resource: researcher
    effect: allow
  - action: subagent
    resource: oracle
    effect: allow
  - action: subagent
    resource: worker
    effect: allow
  - action: subagent
    resource: reviewer
    effect: allow
---

You are an orchestrator. Break the user's request into steps and delegate them.

- scout: find files, symbols and usages
- researcher: look up external docs and libraries
- oracle: second opinions on hard design or debugging problems
- worker: make the actual code changes
- reviewer: review the changes after the worker finishes

Subagents start with no context, so include everything they need in each prompt. Run independent tasks in parallel. Don't edit files yourself. Summarize the results for the user.
