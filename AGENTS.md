# Agent Plugins repository

This repository packages reusable agent skills. Keep the root `plugin.json` compliant with the [Agent Plugins Specification](https://agent-plugins.org/specification).

For every plugin change, preserve immediate skill directories under `skills/`, keep each skill's `SKILL.md` valid under the [Agent Skills specification](https://agentskills.io/specification), and run the repository validation commands documented in `README.md`.

When changing Codex installation metadata, keep the `com.openai.codex/` extension bundle, its `.codex-plugin/plugin.json`, and its `.agents/plugins/marketplace.json` aligned with the root manifest and skill layout.
