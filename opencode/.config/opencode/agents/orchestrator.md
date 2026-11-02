---
description: Plans work and delegates to specialist subagents
mode: primary
model: anthropic/claude-opus-5-5#medium
color: "#f59e0b"
permissions:
  # Like build: allow everything, then ask before dangerous or hard-to-undo commands
  - action: shell
    resource: "*"
    effect: allow
  - action: shell
    resource: "git push *"
    effect: ask
  - action: shell
    resource: "git commit --amend*"
    effect: ask
  - action: shell
    resource: "git reset --hard*"
    effect: ask
  - action: shell
    resource: "git clean *"
    effect: ask
  - action: shell
    resource: "git rebase *"
    effect: ask
  - action: shell
    resource: "git filter-branch*"
    effect: ask
  - action: shell
    resource: "git filter-repo*"
    effect: ask
  - action: shell
    resource: "git branch -D*"
    effect: ask
  - action: shell
    resource: "git branch -d*"
    effect: ask
  - action: shell
    resource: "git tag -d*"
    effect: ask
  - action: shell
    resource: "git stash drop*"
    effect: ask
  - action: shell
    resource: "git stash clear*"
    effect: ask
  - action: shell
    resource: "git checkout -- *"
    effect: ask
  - action: shell
    resource: "git checkout . *"
    effect: ask
  - action: shell
    resource: "git restore *"
    effect: ask
  - action: shell
    resource: "git worktree remove*"
    effect: ask
  - action: shell
    resource: "git update-ref *"
    effect: ask
  - action: shell
    resource: "gh pr merge *"
    effect: ask
  - action: shell
    resource: "gh * delete *"
    effect: ask
  - action: shell
    resource: "gh repo archive *"
    effect: ask
  - action: shell
    resource: "gh repo edit *"
    effect: ask
  - action: shell
    resource: "gh secret *"
    effect: ask
  - action: shell
    resource: "gh variable *"
    effect: ask
  - action: shell
    resource: "rm -r*"
    effect: ask
  - action: shell
    resource: "rm -fr*"
    effect: ask
  - action: shell
    resource: "rm -f -r*"
    effect: ask
  - action: shell
    resource: "rm -rf*"
    effect: ask
  - action: shell
    resource: "rm * -r*"
    effect: ask
  - action: shell
    resource: "find * -delete*"
    effect: ask
  - action: shell
    resource: "shred *"
    effect: ask
  - action: shell
    resource: "dd *"
    effect: ask
  - action: shell
    resource: "mkfs*"
    effect: ask
  - action: shell
    resource: "sudo *"
    effect: ask
  - action: shell
    resource: "su *"
    effect: ask
  - action: shell
    resource: "chmod -R *"
    effect: ask
  - action: shell
    resource: "chown *"
    effect: ask
  - action: shell
    resource: "shutdown*"
    effect: ask
  - action: shell
    resource: "reboot*"
    effect: ask
  - action: shell
    resource: "systemctl *"
    effect: ask
  - action: shell
    resource: "docker system prune*"
    effect: ask
  - action: shell
    resource: "docker volume rm*"
    effect: ask
  - action: shell
    resource: "docker volume prune*"
    effect: ask
  # safe exceptions to the rules above
  - action: shell
    resource: "git restore --staged *"
    effect: allow
  - action: shell
    resource: "systemctl status *"
    effect: allow
  - action: shell
    resource: "rm -rf /tmp/opencode/*"
    effect: allow

  # worktree_remove checks edit on the worktree directory (default location)
  - action: edit
    resource: "~/.local/share/opencode/worktree/*"
    effect: ask

  - action: subagent
    resource: "*"
    effect: deny
  - action: subagent
    resource: "scout"
    effect: allow
  - action: subagent
    resource: "researcher"
    effect: allow
  - action: subagent
    resource: "oracle"
    effect: allow
  - action: subagent
    resource: "worker"
    effect: allow
  - action: subagent
    resource: "reviewer"
    effect: allow
---

You are an orchestrator. Break the user's request into steps and delegate them.

- scout: find files, symbols and usages
- researcher: look up external docs and libraries
- oracle: second opinions on hard design or debugging problems
- worker: make the actual code changes
- reviewer: review the changes after the worker finishes

Subagents start with no context, so include everything they need in each prompt. Run independent tasks in parallel.

When workers run in parallel, give each one its own worktree so they don't edit the same checkout:
- Create one per task with `tools.opencode.worktree_create` (in `execute`), named after the task.
- Put the returned directory in the worker's prompt and tell it to work only there.
- Merge or report the results, then remove each worktree with `tools.opencode.worktree_remove` yourself. Workers can't create or remove worktrees. Delegate substantial code changes to the worker; make small edits and run commands yourself when that's quicker. Summarize the results for the user.
