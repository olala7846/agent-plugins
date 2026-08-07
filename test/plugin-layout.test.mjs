import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const pathFromRoot = (path) => join(root.pathname, path);

function assertAgentSkill(skillPath, skillName) {
  const skill = readFileSync(skillPath, 'utf8');
  const frontmatter = skill.match(
    /^---\r?\nname: ([^\r\n]+)\r?\ndescription: ([^\r\n]+)\r?\n---\r?\n/,
  );

  assert.ok(frontmatter, `${skillPath} must begin with YAML frontmatter`);
  const [, name, description] = frontmatter;
  assert.equal(name, skillName);
  assert.match(name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(description.trim().length > 0);
  assert.ok(description.length <= 1024);
  assert.ok(skill.slice(frontmatter[0].length).trim().length > 0);
  assert.doesNotMatch(skill, /sapcex-simplify/);
  return skill;
}

test('declares the expected Agent Plugin manifest', () => {
  const manifest = JSON.parse(readFileSync(pathFromRoot('plugin.json'), 'utf8'));

  assert.deepEqual(manifest, {
    $schema: 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
    name: 'olala7846-agent-plugins',
    version: '1.0.0',
    description: 'A collection of agent skills maintained by olala7846.',
    author: {
      name: 'Hsin-Cheng Chao',
      email: 'olala7846@gmail.com',
      url: 'https://github.com/olala7846',
    },
    homepage: 'https://github.com/olala7846/agent-plugins',
    repository: 'https://github.com/olala7846/agent-plugins',
    license: 'ISC',
    keywords: ['agent-plugin', 'agent-skills', 'software-engineering'],
    extensions: {
      'com.openai.codex': { pluginRoot: './com.openai.codex' },
    },
  });
});

test('contains only immediately discoverable, complete skills', () => {
  const skillsRoot = pathFromRoot('skills');
  const entries = readdirSync(skillsRoot, { withFileTypes: true });

  const skillNames = ['quiz-me', 'spacex-simplify'];
  assert.deepEqual(entries.map((entry) => entry.name).sort(), skillNames);
  assert.ok(entries.every((entry) => entry.isDirectory()));

  for (const skillName of skillNames) {
    assert.ok(existsSync(join(skillsRoot, skillName, 'SKILL.md')));
    assertAgentSkill(join(skillsRoot, skillName, 'SKILL.md'), skillName);
  }
});

test('does not retain the legacy installer or an MCP component', () => {
  for (const path of [
    'src',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'eslint.config.js',
    '.lintstagedrc',
    '.husky/pre-commit',
    '.agents/plugins/marketplace.json',
    '.codex-plugin/plugin.json',
    'mcp.json',
    'cli-usage.png',
  ]) {
    assert.equal(existsSync(pathFromRoot(path)), false, `${path} must be absent`);
  }
});

test('is installable from its Codex marketplace', () => {
  const codexManifest = JSON.parse(
    readFileSync(pathFromRoot('com.openai.codex/.codex-plugin/plugin.json'), 'utf8'),
  );
  const marketplace = JSON.parse(
    readFileSync(pathFromRoot('com.openai.codex/.agents/plugins/marketplace.json'), 'utf8'),
  );

  assert.equal(codexManifest.name, 'olala7846-agent-plugins');
  assert.equal(codexManifest.skills, './skills/');
  assert.deepEqual(marketplace.plugins, [
    {
      name: 'olala7846-agent-plugins',
      source: { source: 'local', path: './' },
      policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' },
      category: 'Productivity',
    },
  ]);

  for (const skillName of ['quiz-me', 'spacex-simplify']) {
    const extensionSkill = assertAgentSkill(
      pathFromRoot(`com.openai.codex/skills/${skillName}/SKILL.md`),
      skillName,
    );
    const rootSkill = readFileSync(pathFromRoot(`skills/${skillName}/SKILL.md`), 'utf8');
    assert.equal(extensionSkill, rootSkill);
  }
});
