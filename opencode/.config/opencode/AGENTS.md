# Response preferences

- In chat, refer to local files with plain filenames or paths in backticks, not clickable Markdown links or `file://` URLs. Include the directory when needed. Don't make a file link the only way to get the answer.

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

## Laziness Protocol

Prefer the simplest correct solution that satisfies the requirements with the least unnecessary complexity.

- Reuse existing code, patterns, and dependencies before introducing new ones.
- Avoid speculative abstractions, frameworks, indirection, and architectural layers.
- Prefer straightforward, local implementations over premature generalization.
- Introduce abstractions only when justified by concrete requirements or demonstrated duplication.
- Implement only what is needed now; do not design for hypothetical future use cases.
- Minimize the scope of changes and avoid unrelated refactoring.
- Never sacrifice correctness, clarity, or maintainability merely to reduce code or effort.

**Simplicity is the default. Complexity must justify itself.**
