import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

const hasMermaidCli = spawnSync('mmdc', ['--version'], { encoding: 'utf8' }).status === 0;

test('locally renders an accessible, self-contained Mermaid SVG for a quiz report', { skip: !hasMermaidCli }, () => {
  const directory = mkdtempSync(join(tmpdir(), 'quiz-me-mermaid-'));
  const sourcePath = join(directory, 'report.mmd');
  const svgPath = join(directory, 'report.svg');

  try {
    writeFileSync(sourcePath, [
      'flowchart LR',
      '  accTitle: Quiz report flow',
      '  accDescr: Evidence is rendered into an offline report before the adaptive quiz.',
      '  A[Review target] --> B[Evidence] --> C[Adaptive quiz]',
    ].join('\n'));

    execFileSync('mmdc', ['-i', sourcePath, '-o', svgPath, '-b', 'transparent'], {
      stdio: 'pipe',
    });

    const svg = readFileSync(svgPath, 'utf8');
    assert.match(svg, /background-color: transparent/);
    assert.match(svg, /<title[^>]*>Quiz report flow<\/title>/);
    assert.match(svg, /<desc[^>]*>Evidence is rendered into an offline report before the adaptive quiz\.<\/desc>/);
    assert.match(svg, /aria-labelledby=/);
    assert.match(svg, /aria-describedby=/);
    assert.doesNotMatch(svg, /<script\b|<(?:image|use)\b[^>]+(?:href|src)=["']https?:/i);
    assert.doesNotMatch(svg, /class=["'][^"']*edge-animation/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
