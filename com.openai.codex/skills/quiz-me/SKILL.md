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

Before the first quiz round, give the user a self-contained HTML report. Return it as HTML in the response; create a `.html` file only when the user asks for a saved artifact or names a destination.

The report must contain:

1. A plain-language overview of the goal and final outcome.
2. The important behavior changes, including before-and-after intuition.
3. The code paths, interfaces, data, configuration, tests, and risks that matter to using or reviewing the change.
4. A concise map from claims to evidence.
5. A short "What this does not change" section.
6. A preview of the quiz scope, without revealing the answers.

Use semantic HTML with headings, lists, tables where useful, and accessible labels. Keep it self-contained: no external scripts, stylesheets, tracking, or embedded secrets. Make the report readable for someone who did not author the change.

## Adaptive quiz loop

Run at most five rounds. Ask one to three questions per round; use fewer when one focused question teaches more than three shallow ones. Number questions and wait for the user's answers before scoring the round.

Choose questions that test understanding of the change's actual behavior:

- Start with purpose, user-visible behavior, and major flow.
- Then probe boundaries, failure modes, invariants, dependencies, and tradeoffs revealed by the user's answers.
- Use concrete scenarios and "what happens if" questions rather than recall of filenames or line numbers.
- Do not ask trick questions or ask about behavior unsupported by the evidence.

After each answer set, mark every answer **Correct**, **Partially correct**, or **Incorrect**. For partial or incorrect answers, explain the missing or mistaken reasoning, cite the relevant evidence, and give the correct mental model. Briefly acknowledge correct reasoning too, so the user knows what to retain.

Use the score to adapt the next round:

- Deepen areas answered partially or incorrectly, beginning with their consequence for correctness, safety, or merge risk.
- Move to a different important area when the user demonstrates solid understanding.
- Stop early when the user has answered every material area perfectly; do not pad the quiz.
- Stop after round five even if gaps remain, then recommend a focused follow-up quiz for the unresolved area.

## Verdict

End with a concise knowledge map: demonstrated understanding, corrected gaps, and any untested material area. Give exactly one verdict:

- **Ready to proceed** only when every scored answer is correct and all material areas were covered.
- **Follow-up quiz needed** when a focused area remains unclear or was not covered.
- **Do not merge or claim completion yet** when an answer reveals a material misunderstanding, unresolved risk, or failed validation.

For either non-ready verdict, name the next focused quiz topic and the evidence the user should review first. Do not say the user has passed perfectly merely because the quiz ran out of rounds.
