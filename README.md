# olala7846-agent-plugins

A skills-only [Agent Plugin](https://agent-plugins.org/specification) maintained by [Hsin-Cheng Chao](https://github.com/olala7846). Version `0.3.0` adds Mermaid-rendered, offline-safe diagrams to `quiz-me` reports.

## Included skills

- [`quiz-me`](skills/quiz-me/SKILL.md): writes an evidence-based HTML change report to a temporary file, then adaptively quizzes the user with a transparent scorecard before they merge or declare substantial work complete.
- [`repo-init`](skills/repo-init/SKILL.md): interactively initializes repository guidance, including a client-aware user-scoped simple-technical-English policy and a repository-scoped alternative.
- [`spacex-simplify`](skills/spacex-simplify/SKILL.md): applies a SpaceX-inspired engineering review loop to plans, pull requests, specifications, code changes, and architecture proposals.

## Usage

Install this repository with an Agent Plugins-compatible client. The package contains no MCP component; its capabilities are the immediate child skills in `skills/`.

Invoke a skill explicitly when your client supports it, for example:

```text
/quiz-me Quiz me on PR #123 before I merge it.
```

## Development setup

To prepare a clean worktree, use Node.js 22 or later and run:

```sh
./bootstrap.sh
```

The script installs the pinned local validation tools. This repository has no Git hook configuration to install. Run `npm run validate` after a plugin change.

## Validation

The repository validates its manifest, package layout, and every bundled skill in GitHub Actions. Run the same checks locally after bootstrapping:

```sh
npm run validate
```

`plugin.json` uses the Agent Plugins v1.0.0 schema. Each packaged skill is an immediate child of `skills/` and follows the [Agent Skills specification](https://agentskills.io/specification).
