# olala7846-agent-plugins

A skills-only [Agent Plugin](https://agent-plugins.org/specification) maintained by [Hsin-Cheng Chao](https://github.com/olala7846).

## Included skills

- [`quiz-me`](skills/quiz-me/SKILL.md): writes an evidence-based HTML change report to a temporary file, then adaptively quizzes the user with a transparent scorecard before they merge or declare substantial work complete.
- [`spacex-simplify`](skills/spacex-simplify/SKILL.md): applies a SpaceX-inspired engineering review loop to plans, pull requests, specifications, code changes, and architecture proposals.

## Usage

Install this repository with an Agent Plugins-compatible client. The package contains no MCP component; its capabilities are the immediate child skills in `skills/`.

Invoke a skill explicitly when your client supports it, for example:

```text
/quiz-me Quiz me on PR #123 before I merge it.
```

## Validation

The repository validates its manifest, package layout, and every bundled skill in GitHub Actions. Run the same checks locally with Node.js 22 or later:

```sh
curl --fail --silent --show-error --location \
  https://agent-plugins.org/schemas/1.0.0/plugin.schema.json \
  --output /tmp/plugin.schema.json
npx --yes ajv-cli@5.0.0 validate --spec=draft2020 \
  -s /tmp/plugin.schema.json -d plugin.json
node --test test/plugin-layout.test.mjs
npx --yes skills-ref@0.1.5 validate skills/quiz-me
npx --yes skills-ref@0.1.5 validate skills/spacex-simplify
```

`plugin.json` uses the Agent Plugins v1.0.0 schema. Each packaged skill is an immediate child of `skills/` and follows the [Agent Skills specification](https://agentskills.io/specification).
