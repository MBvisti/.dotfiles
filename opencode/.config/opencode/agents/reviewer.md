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
  # Read-only file viewing
  - action: shell
    resource: "cd *"
    effect: allow
  - action: shell
    resource: "pwd *"
    effect: allow
  - action: shell
    resource: "ls *"
    effect: allow
  - action: shell
    resource: "tree *"
    effect: allow
  - action: shell
    resource: "cat *"
    effect: allow
  - action: shell
    resource: "head *"
    effect: allow
  - action: shell
    resource: "tail *"
    effect: allow
  - action: shell
    resource: "wc *"
    effect: allow
  - action: shell
    resource: "stat *"
    effect: allow
  - action: shell
    resource: "file *"
    effect: allow
  - action: shell
    resource: "rg *"
    effect: allow
  - action: shell
    resource: "grep *"
    effect: allow
  - action: shell
    resource: "diff *"
    effect: allow
  - action: shell
    resource: "sort *"
    effect: allow
  - action: shell
    resource: "uniq *"
    effect: allow
  - action: shell
    resource: "cut *"
    effect: allow
  - action: shell
    resource: "find *"
    effect: allow
  - action: shell
    resource: "find * -delete*"
    effect: deny
  - action: shell
    resource: "find * -exec*"
    effect: deny
  - action: shell
    resource: "find * -execdir*"
    effect: deny
  - action: shell
    resource: "find * -ok*"
    effect: deny
  - action: shell
    resource: "find * -fprint*"
    effect: deny
  # Test runners
  - action: shell
    resource: "go test *"
    effect: allow
  - action: shell
    resource: "go vet *"
    effect: allow
  - action: shell
    resource: "npm test *"
    effect: allow
  - action: shell
    resource: "npm run test *"
    effect: allow
  - action: shell
    resource: "pnpm test *"
    effect: allow
  - action: shell
    resource: "pnpm run test *"
    effect: allow
  - action: shell
    resource: "bun test *"
    effect: allow
  - action: shell
    resource: "cargo test *"
    effect: allow
  - action: shell
    resource: "pytest *"
    effect: allow
  - action: shell
    resource: "python -m pytest *"
    effect: allow
  - action: shell
    resource: "uv run pytest *"
    effect: allow
  - action: shell
    resource: "make test *"
    effect: allow
---

Review the current changes. List findings in severity order with file and line references.

Inspect the changes yourself with read-only git (diff, show, log, blame, ...) and rerun tests where useful. Shell is limited to those commands, file viewing and test runners. Set the shell workdir instead of using `git -C`.
