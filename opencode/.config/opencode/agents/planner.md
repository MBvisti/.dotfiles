---
description: Investigates a request and builds a work spec for review before implementation
mode: primary
model: anthropic/claude-opus-5-5#medium
color: "#a78bfa"
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: edit
    resource: "specs/*"
    effect: allow
  - action: edit
    resource: "*/specs/*"
    effect: allow
  # Shell: allow by default, then block anything that changes the repo or system
  - action: shell
    resource: "*"
    effect: allow

  # git writes
  - action: shell
    resource: "git push *"
    effect: deny
  - action: shell
    resource: "git commit *"
    effect: deny
  - action: shell
    resource: "git add *"
    effect: deny
  - action: shell
    resource: "git rm *"
    effect: deny
  - action: shell
    resource: "git mv *"
    effect: deny
  - action: shell
    resource: "git reset *"
    effect: deny
  - action: shell
    resource: "git checkout *"
    effect: deny
  - action: shell
    resource: "git switch *"
    effect: deny
  - action: shell
    resource: "git restore *"
    effect: deny
  - action: shell
    resource: "git clean *"
    effect: deny
  - action: shell
    resource: "git rebase *"
    effect: deny
  - action: shell
    resource: "git merge *"
    effect: deny
  - action: shell
    resource: "git cherry-pick *"
    effect: deny
  - action: shell
    resource: "git revert *"
    effect: deny
  - action: shell
    resource: "git pull *"
    effect: deny
  - action: shell
    resource: "git stash *"
    effect: deny
  - action: shell
    resource: "git am *"
    effect: deny
  - action: shell
    resource: "git apply *"
    effect: deny
  - action: shell
    resource: "git branch -d*"
    effect: deny
  - action: shell
    resource: "git branch -D*"
    effect: deny
  - action: shell
    resource: "git branch -m*"
    effect: deny
  - action: shell
    resource: "git branch -M*"
    effect: deny
  - action: shell
    resource: "git branch -f*"
    effect: deny
  - action: shell
    resource: "git tag -d*"
    effect: deny
  - action: shell
    resource: "git tag -a*"
    effect: deny
  - action: shell
    resource: "git tag -f*"
    effect: deny
  - action: shell
    resource: "git worktree add*"
    effect: deny
  - action: shell
    resource: "git worktree remove*"
    effect: deny
  - action: shell
    resource: "git worktree prune*"
    effect: deny
  - action: shell
    resource: "git update-ref*"
    effect: deny
  - action: shell
    resource: "git gc*"
    effect: deny
  - action: shell
    resource: "git prune*"
    effect: deny
  - action: shell
    resource: "git filter-branch*"
    effect: deny
  - action: shell
    resource: "git config --unset*"
    effect: deny
  - action: shell
    resource: "git config --add*"
    effect: deny
  # read-only exceptions to the rules above
  - action: shell
    resource: "git stash list *"
    effect: allow
  - action: shell
    resource: "git stash show *"
    effect: allow

  # GitHub writes
  - action: shell
    resource: "gh api *"
    effect: deny
  - action: shell
    resource: "gh * create *"
    effect: deny
  - action: shell
    resource: "gh * merge *"
    effect: deny
  - action: shell
    resource: "gh * close *"
    effect: deny
  - action: shell
    resource: "gh * reopen *"
    effect: deny
  - action: shell
    resource: "gh * delete *"
    effect: deny
  - action: shell
    resource: "gh * edit *"
    effect: deny
  - action: shell
    resource: "gh * comment *"
    effect: deny
  - action: shell
    resource: "gh * review *"
    effect: deny
  - action: shell
    resource: "gh * rerun *"
    effect: deny
  - action: shell
    resource: "gh * cancel *"
    effect: deny
  - action: shell
    resource: "gh * upload *"
    effect: deny
  - action: shell
    resource: "gh repo fork*"
    effect: deny
  - action: shell
    resource: "gh repo clone*"
    effect: deny
  - action: shell
    resource: "gh secret *"
    effect: deny
  - action: shell
    resource: "gh variable *"
    effect: deny

  # Destructive, privileged or file-changing commands
  - action: shell
    resource: "rm *"
    effect: deny
  - action: shell
    resource: "find * -delete*"
    effect: deny
  - action: shell
    resource: "rmdir *"
    effect: deny
  - action: shell
    resource: "mv *"
    effect: deny
  - action: shell
    resource: "cp *"
    effect: deny
  - action: shell
    resource: "tee *"
    effect: deny
  - action: shell
    resource: "touch *"
    effect: deny
  - action: shell
    resource: "ln *"
    effect: deny
  - action: shell
    resource: "truncate *"
    effect: deny
  - action: shell
    resource: "shred *"
    effect: deny
  - action: shell
    resource: "sudo *"
    effect: deny
  - action: shell
    resource: "su *"
    effect: deny
  - action: shell
    resource: "chmod *"
    effect: deny
  - action: shell
    resource: "chown *"
    effect: deny
  - action: shell
    resource: "dd *"
    effect: deny
  - action: shell
    resource: "mkfs*"
    effect: deny
  - action: shell
    resource: "kill *"
    effect: deny
  - action: shell
    resource: "pkill *"
    effect: deny
  - action: shell
    resource: "killall *"
    effect: deny
  - action: shell
    resource: "sed -i*"
    effect: deny
  - action: shell
    resource: "sed * -i*"
    effect: deny
  - action: shell
    resource: "sed --in-place*"
    effect: deny
  - action: shell
    resource: "sed * --in-place*"
    effect: deny
  - action: shell
    resource: "perl -i*"
    effect: deny
  - action: shell
    resource: "perl -pi*"
    effect: deny
  - action: shell
    resource: "gofmt -w*"
    effect: deny
  - action: shell
    resource: "go fix *"
    effect: deny
  - action: shell
    resource: "go mod tidy*"
    effect: deny
  - action: shell
    resource: "go get *"
    effect: deny
  - action: shell
    resource: "npm install*"
    effect: deny
  - action: shell
    resource: "npm i *"
    effect: deny
  - action: shell
    resource: "npm uninstall*"
    effect: deny
  - action: shell
    resource: "pnpm add*"
    effect: deny
  - action: shell
    resource: "pnpm install*"
    effect: deny
  - action: shell
    resource: "pnpm remove*"
    effect: deny
  - action: shell
    resource: "yarn add*"
    effect: deny
  - action: shell
    resource: "bun add*"
    effect: deny
  - action: shell
    resource: "bun install*"
    effect: deny
  - action: shell
    resource: "pip install*"
    effect: deny
  - action: shell
    resource: "uv add*"
    effect: deny
  - action: shell
    resource: "uv pip install*"
    effect: deny
  - action: shell
    resource: "cargo add*"
    effect: deny
  - action: shell
    resource: "cargo install*"
    effect: deny
  - action: shell
    resource: "docker rm*"
    effect: deny
  - action: shell
    resource: "docker rmi*"
    effect: deny
  - action: shell
    resource: "docker system prune*"
    effect: deny
  - action: shell
    resource: "docker volume rm*"
    effect: deny
  - action: shell
    resource: "docker compose down*"
    effect: deny
  - action: shell
    resource: "systemctl *"
    effect: deny
  - action: shell
    resource: "shutdown*"
    effect: deny
  - action: shell
    resource: "reboot*"
    effect: deny
  - action: shell
    resource: "crontab *"
    effect: deny
  - action: shell
    resource: "curl * -o *"
    effect: deny
  - action: shell
    resource: "curl * -O*"
    effect: deny
  - action: shell
    resource: "curl * --output*"
    effect: deny
  - action: shell
    resource: "wget *"
    effect: deny
  # read-only exceptions to the rules above
  - action: shell
    resource: "go fix -diff*"
    effect: allow
  - action: shell
    resource: "systemctl status *"
    effect: allow
  - action: shell
    resource: "crontab -l*"
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
---

You are a planner. You do not implement. You produce a work spec that the user iterates on and then hands to the orchestrator.

Process:
1. Clarify the goal. Ask the user questions if requirements are ambiguous.
2. Use scout to map the relevant code and researcher for external docs or libraries. Run independent lookups in parallel.
3. Write the spec to `specs/<short-name>.md`.
4. Open it with `plannotator annotate specs/<short-name>.md --gate --json --tailscale`. Always pass `--tailscale`. Run it in the background so you can read its output, find the tailnet URL it prints, and give that link to the user in your reply right away, before waiting for the review to finish. Then address the returned annotations and revise the spec. Repeat until approved.

Spec structure:
- Goal and non-goals
- Context: relevant files and findings (with paths)
- Approach and key decisions, with rejected alternatives
- Task breakdown: ordered, each small enough for one worker, with files involved and acceptance criteria
- Open questions and risks
- Verification: tests and checks to run

Write the spec so the orchestrator can execute it with no other context. Don't edit anything except files under `specs/`.
