---
name: quiz-me
description: "Use this skill whenever the user asks to be quizzed about a completed task, a pull request, an implementation, or a long agent session; asks whether they understand a change before merging; or invokes /quiz-me. First create an evidence-based HTML change report, then run a short adaptive quiz that establishes whether their knowledge is sufficient to proceed."
---

# Quiz Me

Help the user understand work that has just been completed before they merge a pull request or treat the work as complete. The goal is understanding, not a trivia contest: locate the boundary of the user's knowledge, explain gaps with evidence, and decide whether it is safe to proceed.

## Establish the review target

Identify the completed work before asking questions. Prefer the PR, branch diff, commits, task summary, changed files, tests, and relevant existing code paths. If the target is ambiguous, ask the user to identify the PR, branch, commit range, or task.

Read enough surrounding code to explain behavioral consequences, not merely the diff. Record the evidence behind each important claim: file paths, tests, commands, interfaces, and affected workflows. Do not invent behavior from a diff when the existing code is the source of truth.

## HTML change report

Before the first quiz round, write a self-contained HTML report to a unique temporary file under `/tmp`. Use `mktemp /tmp/quiz-me-XXXXXX.html` when shell access is available; otherwise choose a non-overwriting `/tmp/quiz-me-<timestamp>.html` path. Return the file path and a short summary in the conversation, not the full HTML.

The report must contain:

1. A plain-language overview of the goal and final outcome.
2. The important behavior changes, including before-and-after intuition.
3. The code paths, interfaces, data, configuration, tests, and risks that matter to using or reviewing the change.
4. A concise map from claims to evidence.
5. A short "What this does not change" section.
6. A preview of the quiz scope, without revealing the answers.

Use semantic HTML with headings, lists, tables where useful, and accessible labels. Keep it self-contained: no external scripts, stylesheets, tracking, or embedded secrets. Make the report readable for someone who did not author the change. Treat the file as disposable: never add it to the repository or commit it. If `/tmp` is unavailable, ask the user for a destination instead of pasting the full report into the conversation.

### Report presentation

Use the same simple, light theme for every report. Include this fixed CSS in a `<style>` element in the report `<head>`; do not invent a new theme, color palette, or decorative styling for each report:

```css
:root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #1f2937; background: #ffffff; }
body { max-width: 960px; margin: 0 auto; padding: 32px 20px; line-height: 1.55; background: #ffffff; }
h1, h2, h3 { color: #111827; line-height: 1.25; }
h1 { border-bottom: 2px solid #d1d5db; padding-bottom: 0.4rem; }
section { margin: 2rem 0; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.65rem; border: 1px solid #d1d5db; text-align: left; vertical-align: top; }
th { background: #f3f4f6; }
code { padding: 0.1rem 0.25rem; border-radius: 3px; background: #f3f4f6; }
figure { margin: 1.5rem 0; padding: 1rem; border: 1px solid #d1d5db; border-radius: 6px; background: #f9fafb; }
svg { display: block; width: 100%; height: auto; }
figcaption { margin-top: 0.75rem; color: #4b5563; }
.summary { padding: 1rem; border-left: 4px solid #2563eb; background: #eff6ff; }
```

Use the existing semantic elements to organize content. Do not add themes, gradients, animations, dark-mode rules, custom fonts, or ornamental UI components. Keep any report-specific CSS limited to a necessary layout or accessibility correction.

### Tables and diagrams

Use a table when it makes an exact comparison, claim-to-evidence map, or repeated field mapping easier to scan. Use a diagram only when it makes a relationship, sequence, hierarchy, or branching flow materially clearer than prose or a short list. Do not add either as decoration.

For diagrams, use a small, self-contained inline SVG inside a `<figure>` with a `<figcaption>`. Make each SVG accessible with `role="img"`, a `<title>`, and a `<desc>` (or equivalent accessible name and description). Keep labels concise, use the fixed report colors, and include the same essential information as nearby text when it is material.

Do not load Mermaid or another diagram library in the report. When a Mermaid-style flow would be useful, translate the needed flow into inline SVG before writing the report. This preserves the report's self-contained, offline-safe behavior while supporting readable flow diagrams.

### Preferred hybrid pre-quiz summary

Before asking the first quiz question, prefer this hybrid report order:

1. A `<section class="summary">` with the goal, final outcome, and the most important before-and-after change.
2. One small inline SVG diagram when a material flow, relationship, hierarchy, or branching decision needs clarification.
3. A claim-to-evidence table covering the important behavior, tests or validation, and material risks.
4. The "What this does not change" section and the preview of the quiz scope.

The summary and evidence table are the default. Omit the diagram when it would not add clarity; do not force one into a simple report. Keep the hybrid summary concise and complete before beginning the adaptive quiz loop.

## Adaptive quiz loop

Run at most five rounds. Ask one to three questions per round; use fewer when one focused question teaches more than three shallow ones. Number questions and wait for the user's answers before scoring the round.

Choose questions that test understanding of the change's actual behavior:

- Start with purpose, user-visible behavior, and major flow.
- Then probe boundaries, failure modes, invariants, dependencies, and tradeoffs revealed by the user's answers.
- Use concrete scenarios and "what happens if" questions rather than recall of filenames or line numbers.
- Do not ask trick questions or ask about behavior unsupported by the evidence.

After each answer set, mark every answer **Correct**, **Partially correct**, or **Incorrect**. Score them transparently: correct is **1 point**, partially correct is **0.5 points**, and incorrect is **0 points**. For partial or incorrect answers, explain the missing or mistaken reasoning, cite the relevant evidence, and give the correct mental model. Briefly acknowledge correct reasoning too, so the user knows what to retain.

Use the score to balance coverage and depth:

- Cover the major areas before spending another question on a partial answer: purpose and primary flow, important boundaries or failure modes, and validation or merge risk.
- Deepen a partial answer only when it exposes a wrong mental model or affects correctness, safety, behavior, or merge risk. Otherwise, record the correction and move to a different material area.
- Prioritize an incorrect answer over a partial answer, and prioritize material impact over minor implementation detail.
- Stop early when every material area is covered and the pass criteria are met; do not pad the quiz.
- Stop after round five even if gaps remain, then recommend a focused follow-up quiz for the unresolved area.

## Verdict

End with a concise knowledge map: demonstrated understanding, corrected gaps, and any untested material area. Include a scorecard with each question's topic, result, points, and the total as both points and percentage. Give exactly one verdict:

- **Ready to proceed** when the user scores at least **80%**, every material area was covered, and no material question was scored incorrect.
- **Follow-up quiz needed** when the score is below 80%, a material area was not covered, or a material question was incorrect. Name one focused next topic rather than reopening every partial answer.
- **Do not merge or claim completion yet** when the work has an unresolved correctness, safety, or merge-risk misunderstanding, or validation failed.

For either non-ready verdict, name the next focused quiz topic and the evidence the user should review first. A partial answer alone does not require a follow-up quiz when the user meets the pass criteria and its correction is non-material.
