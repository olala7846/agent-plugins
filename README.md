# olala7846-agent-plugins

A skills-only [Agent Plugin](https://agent-plugins.org/specification) maintained by [Hsin-Cheng Chao](https://github.com/olala7846). Its Codex-specific package is isolated under the `com.openai.codex/` client-extension namespace required by the open specification.

## Included skills

- [`spacex-simplify`](skills/spacex-simplify/SKILL.md): applies a SpaceX-inspired engineering review loop to plans, pull requests, specifications, code changes, and architecture proposals.
- [`quiz-me`](skills/quiz-me/SKILL.md): creates an evidence-based HTML change report and adaptively quizzes the user before they merge or declare substantial work complete.

## Install in Codex CLI

Clone the repository, then add its Codex extension bundle as a local marketplace source:

```sh
git clone https://github.com/olala7846/agent-plugins.git
cd agent-plugins
codex plugin marketplace add ./com.openai.codex
codex
```

At the Codex prompt, enter `/plugins`, select the **olala7846-agent-plugins** marketplace, install **olala7846-agent-plugins**, and ensure it is enabled. Start a new Codex session after installation.

Use the skill explicitly with:

```text
$spacex-simplify Review this implementation plan and identify unnecessary complexity.
```

Codex can also select the skill automatically when a request matches its description.

To update the cloned source and refresh the marketplace later, run:

```sh
git pull --ff-only
codex plugin marketplace upgrade olala7846-agent-plugins
```

If you already have this repository checked out, run the marketplace command from its root:

```sh
codex plugin marketplace add ./com.openai.codex
```

The package contains no MCP component; installation only makes the bundled skill available. Codex uses `com.openai.codex/.codex-plugin/plugin.json` to discover its extension package and `com.openai.codex/.agents/plugins/marketplace.json` to register the local marketplace. The root `plugin.json` remains the cross-client Agent Plugins v1.0.0 manifest.

## Validation

The repository validates the manifest against the official schema and checks the skills-only layout in GitHub Actions. Run the same checks locally with Node.js 22 or later:

```sh
curl --fail --silent --show-error --location \
  https://agent-plugins.org/schemas/1.0.0/plugin.schema.json \
  --output /tmp/plugin.schema.json
npx --yes ajv-cli@5.0.0 validate --spec=draft2020 \
  -s /tmp/plugin.schema.json -d plugin.json
node --test test/plugin-layout.test.mjs
npx --yes skills-ref@0.1.5 validate skills/spacex-simplify
npx --yes skills-ref@0.1.5 validate skills/quiz-me
npx --yes skills-ref@0.1.5 validate com.openai.codex/skills/spacex-simplify
npx --yes skills-ref@0.1.5 validate com.openai.codex/skills/quiz-me
```

`plugin.json` uses the Agent Plugins v1.0.0 schema. Each packaged skill is an immediate child of `skills/` and follows the [Agent Skills specification](https://agentskills.io/specification). For Codex packaging and marketplace behavior, see OpenAI's [plugin packaging guide](https://developers.openai.com/plugins/build/plugins) and [plugin usage guide](https://learn.chatgpt.com/docs/plugins).
