# Agent Plugins repository

This repository packages reusable agent skills. Keep the root `plugin.json` compliant with the [Agent Plugins Specification](https://agent-plugins.org/specification).

For every plugin change, preserve immediate skill directories under `skills/`, keep each skill's `SKILL.md` valid under the [Agent Skills specification](https://agentskills.io/specification), and run the repository validation commands documented in `README.md`.

## Review

Review plugin changes against the [Agent Plugins Specification](https://agent-plugins.org/specification) and the [Agent Skills specification](https://agentskills.io/specification). Confirm the root manifest schema and immediate `skills/*/SKILL.md` discovery. Run every validation command documented in `README.md`, then report each finding with its file location and the relevant specification section.
