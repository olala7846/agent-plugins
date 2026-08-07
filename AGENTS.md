# Agent Plugins repository

This repository packages reusable agent skills. Keep the root `plugin.json` compliant with the [Agent Plugins Specification](https://agent-plugins.org/specification).

For every plugin change, preserve immediate skill directories under `skills/`, keep each skill's `SKILL.md` valid under the [Agent Skills specification](https://agentskills.io/specification), and run the repository validation commands documented in `README.md`.

When changing Codex installation metadata, keep the `com.openai.codex/` extension bundle, its `.codex-plugin/plugin.json`, and its `.agents/plugins/marketplace.json` aligned with the root manifest and skill layout.

## Review

Review plugin changes against the [Agent Plugins Specification](https://agent-plugins.org/specification) and the [Agent Skills specification](https://agentskills.io/specification). Confirm the root manifest schema, immediate `skills/*/SKILL.md` discovery, reverse-domain extension layout, and the matching Codex skill copy. Run every validation command documented in `README.md`, then report each finding with its file location and the relevant specification section.
