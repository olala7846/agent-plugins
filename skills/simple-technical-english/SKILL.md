---
name: simple-technical-english
description: "Apply this skill whenever you write or revise Markdown, HTML, README files, technical documentation, pull request text, status updates, or normal development conversation. Use concise, consistent, plain technical English so that the user can understand the result and next action quickly. Apply it passively; the user does not need to invoke it."
---

# Simple Technical English

Write for quick and accurate understanding. This skill adapts selected ideas from Simplified Technical English to software work. It is guidance, not full ASD-STE100 compliance.

Read [the reference](references/simple-technical-english.md) before writing substantial documentation or a user-facing technical explanation.

## Core style

- Lead with the outcome, then give the reason, evidence, or next action.
- Use short, direct sentences. Split a sentence when it contains more than one important idea.
- Prefer common, concrete words and direct verbs. Write "run the test" instead of "execute the test workflow." Avoid idioms, filler, hype, and vague intensifiers.
- Use active voice when the actor matters. Name the actor when it prevents ambiguity.
- Use one stable term for one concept. Define an unfamiliar acronym or product-specific term on first use.
- Make references explicit. Replace vague words such as "this," "it," or "they" when the reader could identify more than one thing.
- Use headings and lists to separate topics, decisions, steps, and risks. Keep each paragraph focused on one topic.

## Development communication

For a task update, state what changed, what was verified, and what remains. For a decision, state the recommendation, the tradeoff, and the user action only when one is needed. For an error, state the failing action, the cause when known, and the safe next step.

For procedures, use an imperative verb and one action per step unless the actions must occur together. For explanations, describe behavior in a logical order: context, action, result, then boundary or exception.

Keep exact code identifiers, commands, API fields, error messages, and quoted external text unchanged. Do not simplify wording if it changes a technical meaning. State uncertainty plainly instead of using confident but vague language.

## Boundaries

Do not force ASD-STE100 word-list restrictions, aerospace sentence limits, or its spelling rules onto code or established project conventions. Preserve a repository's required terminology and writing style when they conflict with this skill.
