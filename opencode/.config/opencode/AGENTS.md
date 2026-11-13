# Documentation/Specs/Plans/

Don't save documents to /tmp for any documentation, plans, roadmaps or elements you need to keep track of work. All files should be stored in the directory you are operating within.


# File changes

Use the read, edit and write tools to read, create and change files. Don't use programming languages (Python, Perl, Ruby, PHP, Lua, inline Node/Bun/Deno) for file work or one-off scripts; they are blocked by policy. Standard shell tools such as `sed`, `awk`, `jq`, `grep`, `rm` and `mv` are fine.

Don't read secrets: `.env` files, SSH/GPG keys, credential and token files, or environment variables holding keys. Reading them prompts the user; if you need a value, ask for it instead.

# Git conventions

## Commits

Use Conventional Commits: `type(scope): subject`.

- Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `build`, `ci`.
- Scope is optional; use the affected package or area.
- Subject: imperative mood, lowercase, no trailing period, under 72 characters.
- Use the body to explain why, not what. Mark breaking changes with `!` after the type or a `BREAKING CHANGE:` footer.

## Branches

Name branches `<type>/<short-kebab-description>`, using the same types as commits. Example: `feat/spec-review-flow`.

## Squashing

Branches are squash-merged. The pull request title becomes the commit on the main branch, so it must follow the commit format above.

- Don't squash, rebase, amend or otherwise rewrite history yourself unless asked.
- If a repository's own `AGENTS.md` sets different commit rules, follow the repository.

# Presentation

Write human-facing plans and Plannotator content at a high level: explain outcomes, decisions, tradeoffs and affected codebase areas (such as authentication, storage or the review UI). Include individual source-file paths, symbols, line references or file-by-file implementation steps only when the user explicitly asks for that detail. This applies to plans, summaries, walkthroughs, questions and Inbox messages; it does not hide source diffs or files the user asked to review. Keep detailed implementation instructions in separate agent-facing specs, not in an unsolicited appendix to the human review. Artifact links and handoff paths remain appropriate for opening or locating deliverables.

Open user-facing review artifacts in Plannotator with `--tailscale`. Use `--gate --json` when requesting approval. Run in the background, read startup output, and immediately reply with the exact printed tailnet URL alone. Report startup failures instead of claiming readiness. Address returned annotations; dismissal is not approval.

Default HTML artifacts to dark mode.

<!-- plannotator-inbox:start v9 · added by Plannotator. Remove it in the Inbox's Settings or with `plannotator uninstall` -->
## Plannotator Inbox

The person keeps a Plannotator Inbox on this computer: a window where they read what agents send and answer when they can.
If you have a `plannotator_inbox` tool or a `plannotator-inbox` MCP server, use its `send_message` to ask a decision only they can make (as a `:::question` block) or to hand over finished long work (a short summary with its pictures in place, `![alt](path)` in the body, and the files to read in `attachments`). Then keep working.
A decision inside a report or summary still goes in a `:::question` block, one block per decision.
When you mention an issue or PR outside the repo you started in, write owner/repo#123 or its full URL every time; a bare #123 links to your own repo.
Their reply comes back to this session by itself where your agent supports that; otherwise read the thread later with `read_thread`.
Be proactive about Inbox updates and about replying to the person through the Inbox when you think they would want you to. Don't withhold important updates or decisions, and don't batch updates to send later: proactivity is better than procrastination.
One thread per work stream, unless the person says otherwise.
A decision you sent to the Inbox stays there. When the person writes in this chat, say what is waiting there (a short summary and the thread's link), but never also ask it in the chat with a blocking question tool (AskUserQuestion or similar): that blocks the chat and splits the answer. Ask in the chat only about something new they raised here that needs no pictures or files, or when they ask for it.
Before reply_to into a thread you have not read in this context window, call read_thread with no id and match the subject.
In a `:::question` block, keep the choices in their natural order and never move your recommendation first; put it on its own line after the choices as `Recommended: <label>`, and never write "(recommended)" in a choice label.
<!-- plannotator-inbox:end -->
