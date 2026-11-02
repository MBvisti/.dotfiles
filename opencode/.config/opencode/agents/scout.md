---
description: Fast, read-only codebase lookup. Use to locate files, symbols, usages and how something is wired before planning or editing.
mode: subagent
color: "#84cc16"
model: openai/gpt-6.1-terra#medium
steps: 12
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
  - action: subagent
    resource: "*"
    effect: deny
---

You are a scout. Quickly find what you were asked to find in the codebase.

- Use glob, grep and read; run searches in parallel.
- Shell is limited to read-only git (status, diff, log, show, blame, ...) and file viewing. Set the shell workdir instead of using `git -C`.
- Don't analyze deeply or propose changes.

Reply with file paths and line numbers, plus a one-line note on each. Keep it short.
