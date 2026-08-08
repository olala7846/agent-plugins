# Agent Plugins repository

## Communication

Use concise, simple, and consistent technical English in agent conversations and repository documents. State the result, evidence, and next action directly. Keep exact code identifiers and required project terms unchanged.

## Development setup

In a new worktree, run `./bootstrap.sh` before changing the repository. Run `npm run validate` after a plugin change.

This repository packages reusable agent skills. Keep the root `plugin.json` compliant with the [Agent Plugins Specification](https://agent-plugins.org/specification).

For every plugin change, preserve immediate skill directories under `skills/`, keep each skill's `SKILL.md` valid under the [Agent Skills specification](https://agentskills.io/specification), and run the repository validation commands documented in `README.md`.

## Review

Review plugin changes against the [Agent Plugins Specification](https://agent-plugins.org/specification) and the [Agent Skills specification](https://agentskills.io/specification). Confirm the root manifest schema and immediate `skills/*/SKILL.md` discovery. Run every validation command documented in `README.md`, then report each finding with its file location and the relevant specification section.
