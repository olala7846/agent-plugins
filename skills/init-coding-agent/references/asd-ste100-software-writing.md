# Simple Technical English for Software Work

This reference adapts selected ASD-STE100 Issue 9 writing rules. It does not require full ASD-STE100 compliance. Use it to make agent conversations, Markdown, HTML, pull requests, and software documents easy to read, check, and act on.

## Choose clear words

- Prefer common, concrete words. Write `use`, `start`, `stop`, `check`, `change`, and `show` when they state the meaning. Avoid inflated words such as `leverage`, `utilize`, `facilitate`, or `robust` unless a precise technical meaning requires them.
- Avoid slang, metaphor, hype, filler, and vague intensifiers. Replace “very fast,” “clean,” or “works well” with an observed behavior, a measured result, or the evidence that supports the claim.
- Use one stable name for one item, command, file, API field, state, or process. Do not alternate between near-synonyms such as “job,” “task,” and “workflow” when they mean the same thing.
- Preserve exact code identifiers, commands, error messages, API fields, and quoted external text. Do not simplify a term when that could alter its technical meaning.
- Define an acronym, project-specific term, or uncommon word on first use when the reader may not know it. Use the defined term consistently after that.

## Build direct sentences

- Give one main idea in each sentence. Split a sentence when it joins separate actions, conditions, results, or decisions.
- Put the subject and verb close together. State who performs an action when the actor matters: “The workflow validates `plugin.json`,” not “`plugin.json` is validated,” if the workflow is relevant context.
- Prefer “The test fails because the directory is missing” to “The test failure is caused by the absence of the directory.”
- Use `if`, `when`, `before`, `after`, `because`, and `therefore` to show a real relationship. Do not connect unrelated ideas with “and” merely because they appear in the same update.

## Make references and scope clear

- Do not use “this,” “it,” “they,” “former,” or “latter” when more than one earlier noun can fit. Repeat the specific noun: “The layout test reads the `skills/` directory,” not “It reads the directory.”
- Distinguish facts, inferences, proposals, and unknowns. Use phrases such as “the test confirms,” “the diff suggests,” “I recommend,” and “not yet verified” when they accurately describe the evidence level.
- Name a boundary directly. State what is included, excluded, unchanged, or deferred. Do not make the reader infer scope from an incomplete list of changes.

## Write procedures and updates

- Start a procedure step with an imperative verb: “Run the layout test.” Give one action per step unless the actions must occur together.
- Put a condition before the action when it controls whether the reader can safely perform it: “If the branch contains local work, commit or stash the work before switching branches.”
- Keep instructions separate from explanation. Put the action in the step. Put the reason, caution, result, or background in the next sentence, a note, or a short paragraph.
- In a development update, state the outcome first. Then state what changed, what evidence verifies the result, and what remains. Do not make the reader reconstruct status from raw command output.
- In a decision, state the recommendation, its main tradeoff, and a requested user action only when one is needed. Keep alternatives focused on decisions the user can meaningfully make.
- In an error report, state the failed action, the observed result, the known or suspected cause, and the safe next action. Do not present a guessed cause as confirmed fact.

## Structure explanations

- Give information gradually. Start with the goal, change, or result. Then explain the mechanism, evidence, and limits, unless the reader needs a safety condition first.
- Keep one topic in each paragraph. Start a new paragraph when the topic, actor, time, or decision changes.
- Use a short list when separate facts would otherwise form a long sentence. Order items by execution sequence, importance, or scope.
- Explain behavior in a stable order: context, action, result, then boundary or exception. This helps the reader distinguish normal behavior from edge cases.

## State risk and uncertainty

- For a user-impacting risk, state the condition, the required action, and the consequence. Example: “Before deleting generated files, confirm the directory path. The command can remove uncommitted output.”
- Put the most important restriction near the action it affects. Do not use “be careful” without stating what can fail and how to avoid it.
- Say what is known, inferred, or not yet verified. Plain uncertainty is more useful than confident but vague language.
- Preserve repository conventions when they conflict with this guidance. A documented project term or required format is clearer than a rewritten approximation.

## Scope of this adaptation

ASD-STE100 also defines an approved-word dictionary, detailed grammar rules, aerospace-specific terminology, and strict sentence limits. This software adaptation does not apply those controls. It keeps the practices that help agents and developers: clear terms, direct verbs, short sentences, explicit references, one-action procedures, gradual explanations, and consistent wording.

Source context: ASD-STE100 Issue 9, Part 1, sections 1, 3, 4, 5, 6, and 9.
