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
- Don't push; the user pushes.
- If a repository's own `AGENTS.md` sets different commit rules, follow the repository.
